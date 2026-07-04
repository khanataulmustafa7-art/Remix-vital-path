import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
const PORT = 3000;

// Simple in-memory cache to guarantee identical image scans return consistent outputs
const scanCache = new Map<string, any>();

/**
 * Adjusts macronutrient values slightly so that the Atwater formula:
 * (Protein * 4) + (Carbohydrates * 4) + (Fats * 9)
 * rounded to the nearest integer matches the targetTraditionalCalories exactly.
 */
function alignMacrosToCalories(p: number, c: number, f: number, targetCalories: number) {
  if (targetCalories <= 0) {
    return { p: 0, c: 0, f: 0 };
  }

  let currentSum = (p * 4) + (c * 4) + (f * 9);
  if (currentSum <= 0) {
    // Standard initialization fallback
    c = targetCalories / 4;
    currentSum = c * 4;
  }

  // Initial proportional scaling
  const ratio = targetCalories / currentSum;
  let finalP = Number((p * ratio).toFixed(1));
  let finalC = Number((c * ratio).toFixed(1));
  let finalF = Number((f * ratio).toFixed(1));

  const canP = p > 0;
  const canC = c > 0;
  const canF = f > 0;

  // Fine-tuning loop (up to 100 cycles to adjust rounding mismatches)
  for (let iter = 0; iter < 100; iter++) {
    const computed = Math.round((finalP * 4) + (finalC * 4) + (finalF * 9));
    const diff = targetCalories - computed;

    if (diff === 0) {
      break;
    }

    const step = diff > 0 ? 0.1 : -0.1;

    // Favor adjusting carbs as it's the primary energy macro, then protein, then fats.
    // Ensure values never dip below 0.
    if (canC && (finalC + step >= 0) && (finalC > 0.5 || (!canP && !canF))) {
      finalC = Number((finalC + step).toFixed(1));
    } else if (canP && (finalP + step >= 0) && (finalP > 0.5 || !canF)) {
      finalP = Number((finalP + step).toFixed(1));
    } else if (canF && (finalF + step >= 0) && finalF > 0.5) {
      finalF = Number((finalF + step).toFixed(1));
    } else {
      // Basic fallback sequence
      if (canC && (finalC + step >= 0)) {
        finalC = Number((finalC + step).toFixed(1));
      } else if (canP && (finalP + step >= 0)) {
        finalP = Number((finalP + step).toFixed(1));
      } else if (canF && (finalF + step >= 0)) {
        finalF = Number((finalF + step).toFixed(1));
      } else {
        if (finalC + step >= 0) {
          finalC = Number((finalC + step).toFixed(1));
        } else if (finalP + step >= 0) {
          finalP = Number((finalP + step).toFixed(1));
        } else if (finalF + step >= 0) {
          finalF = Number((finalF + step).toFixed(1));
        } else {
          break; // Avoid dead loops
        }
      }
    }
  }

  return {
    p: Number(finalP.toFixed(1)),
    c: Number(finalC.toFixed(1)),
    f: Number(finalF.toFixed(1))
  };
}

// High limit for base64 images from camera scans
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize GoogleGenAI client (Server-Side ONLY)
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Meal Scan Endpoint
app.post("/api/scan-meal", async (req, res) => {
  try {
    const { image, mimeType, language = "en" } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image content provided." });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY environment variable is not configured. Please add it to Secrets." 
      });
    }

    // Extract raw base64 data and calculate a SHA-256 hash
    const base64Data = image.split(",")[1] || image;
    const imageHash = crypto.createHash("sha256").update(base64Data).digest("hex");
    const cacheKey = `${imageHash}_${language}`;

    // Cache hit lookup
    if (scanCache.has(cacheKey)) {
      console.log(`[Cache Hit] Serving identical image scan from memory. Key: ${cacheKey.substring(0, 16)}...`);
      return res.json(scanCache.get(cacheKey));
    }

    // Prepare image inline data
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType || "image/jpeg",
      },
    };

    // Guidance text based on requested language
    const langPrompt = `Please analyze this food image and return the output translated and written in the following language: "${language}".
Languages mapping guide:
- en: English
- es: Spanish
- fr: French
- hi: Hindi
- ar: Arabic
- zh: Chinese`;

    const textPart = {
      text: `Identify all the food items in the image, estimate their portion weights or sizes, and calculate their precise nutrient breakdown (protein in grams, carbs in grams, fats in grams).

CRITICAL NUTRITION ACCURACY BASES & EXAMPLES:
Prioritize precise accuracy for common standard ingredients and traditional caloric baselines. For example:
- Greek Yogurt (2% Fat): A standard 150g portion contains roughly 110-130 kcal, 15g Protein, 6g-8g Carbs, and 2.5g-3g Fat.
- Pure Honey: 1 tablespoon (approx. 21g) contains exactly 64 kcal, 0g Protein, 17g Carbs, and 0g Fat.
- Standard Medium Egg: contains exactly 70 kcal, 6g Protein, 0.4g Carbs, and 5g Fat.
- Slices of Bread: standard slice is approx. 80-100 kcal, 3g Protein, 15g-20g Carbs, 1g Fat.
- Standard Cooked White Rice: 1 cup (approx. 150g-160g) is approx. 200 kcal, 4g Protein, 44g Carbs, 0.4g Fat.

CRITICAL CALORIE CALCULATION FORMULA & CONSISTENCY DIRECTION:
You must strictly adhere to the standard Atwater system formula for every item:
Calories = Math.round((Protein * 4) + (Carbohydrates * 4) + (Fats * 9))

For each ingredient:
1. Estimate the precise grams of Protein, Carbs, and Fats based on its traditional portion weight and composition.
2. Ensure that the macronutrient grams align perfectly with the traditional caloric value. If there is a slight mismatch, adjust the estimated macronutrient grams slightly so that (Protein*4) + (Carbs*4) + (Fats*9) exactly equals the displayed total calories for that item.
3. Grand totals (totalCalories, totalProtein, totalCarbs, totalFats) must be the exact mathematical sum of the individual rows!

${langPrompt}

CRITICAL CONSISTENCY GUIDELINE:
To solve calorie discrepancies when scanning identical/similar meals, you MUST apply standard, non-randomized, uniform nutritional values for common identified ingredient portion sizes. Match these common baselines consistently across any plate analysis rather than assigning arbitrary numbers.`,
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        temperature: 0.0, // Force determinism and remove generative randomness
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meal_name: { 
              type: Type.STRING, 
              description: "Main overall dish or meal name, translated to requested language" 
            },
            scanned_items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the scanned item/ingredient" },
                  portion: { type: Type.STRING, description: "Portion size, e.g., '150g', '1 cup', '2 slices'" },
                  calories: { type: Type.NUMBER, description: "Estimated traditional calories" },
                  protein_g: { type: Type.NUMBER, description: "Estimated protein in grams" },
                  carbs_g: { type: Type.NUMBER, description: "Estimated carbs in grams" },
                  fats_g: { type: Type.NUMBER, description: "Estimated fats in grams" },
                },
                required: ["name", "portion", "calories", "protein_g", "carbs_g", "fats_g"]
              },
            },
            totals: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.NUMBER, description: "Sum of calories for all items" },
                protein_g: { type: Type.NUMBER, description: "Sum of protein (g)" },
                carbs_g: { type: Type.NUMBER, description: "Sum of carbs (g)" },
                fats_g: { type: Type.NUMBER, description: "Sum of fats (g)" },
              },
              required: ["calories", "protein_g", "carbs_g", "fats_g"]
            },
            description: { 
              type: Type.STRING, 
              description: "A summary or healthy insight about this meal, translated to the requested language" 
            },
          },
          required: ["meal_name", "scanned_items", "totals", "description"]
        }
      }
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("No response from Gemini API");
    }

    const data = JSON.parse(textResult.trim());
    
    // Strict Atwater Formula Recalculation & Row Alignment
    if (data && Array.isArray(data.scanned_items)) {
      let calcTotalProtein = 0;
      let calcTotalCarbs = 0;
      let calcTotalFats = 0;
      let calcTotalCalories = 0;

      data.scanned_items = data.scanned_items.map((item: any) => {
        const targetCalories = Math.round(Number(item.calories) || 0);
        const originalProtein = Number(item.protein_g !== undefined ? item.protein_g : (item.protein || 0));
        const originalCarbs = Number(item.carbs_g !== undefined ? item.carbs_g : (item.carbs || 0));
        const originalFats = Number(item.fats_g !== undefined ? item.fats_g : (item.fats || 0));

        // Align macronutrient grams perfectly with the traditional target calories of this item
        const aligned = alignMacrosToCalories(originalProtein, originalCarbs, originalFats, targetCalories);

        calcTotalProtein += aligned.p;
        calcTotalCarbs += aligned.c;
        calcTotalFats += aligned.f;
        calcTotalCalories += targetCalories;

        return {
          ...item,
          name: item.name || "Item",
          portion: item.portion || item.portionSize || "1 portion",
          protein_g: Number(aligned.p),
          carbs_g: Number(aligned.c),
          fats_g: Number(aligned.f),
          calories: targetCalories
        };
      });

      // Ensure totals are mathematically exact matches to the individual row sums
      data.totals = {
        protein_g: Number(calcTotalProtein.toFixed(1)),
        carbs_g: Number(calcTotalCarbs.toFixed(1)),
        fats_g: Number(calcTotalFats.toFixed(1)),
        calories: calcTotalCalories
      };
    }
    
    // Save to cache before sending response
    scanCache.set(cacheKey, data);
    
    return res.json(data);

  } catch (error: any) {
    console.error("Error scanning meal:", error);
    return res.status(500).json({ 
      error: "Failed to scan meal. " + (error.message || error)
    });
  }
});

// Secure Support & Feedback Submission Route
app.post("/api/submit-contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Simple validation checks
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is a required field." });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (!subject || !["Bug Report", "Account Issue", "Feature Request", "General Query", "Terms & Conditions"].includes(subject)) {
      return res.status(400).json({ error: "Invalid subject category." });
    }
    if (!message || !message.trim() || message.length < 10) {
      return res.status(400).json({ error: "Message must be at least 10 characters long." });
    }

    console.log(`[Contact Submission] Received feedback from: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message length: ${message.length} chars`);

    // Demonstrating safe usage of an email service provider API like Resend:
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      // In production, this would make an HTTPS call to: https://api.resend.com/emails
      // const response = await fetch("https://api.resend.com/emails", {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Bearer ${resendApiKey}`,
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     from: "Remix VitalPath Support <onboarding@resend.dev>",
      //     to: ["support@remixvitalpath.com"],
      //     subject: `[${subject}] New Support Query from ${name}`,
      //     html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
      //   })
      // });
      console.log("[Resend Integration] API Key is set; simulated direct delivery of feedback payload.");
    }

    return res.json({ 
      success: true, 
      messageId: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("Error submitting support contact:", error);
    return res.status(500).json({ 
      error: "An internal server error occurred while sending your support query. Please try again." 
    });
  }
});

// AI Ticket Resolution Engine (Gemini-Powered)
app.post("/api/ai-solve-ticket", async (req, res) => {
  try {
    const { subject, message, currentCalories, currentDiet, currentLang } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "No message payload provided for AI diagnostic." });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured in Secrets. Unable to execute AI diagnostics." 
      });
    }

    const aiPrompt = `You are the Support AI Agent for VitalPath, a calorie tracking and nutrition SaaS.
We received a support ticket from a user. Your job is to analyze the user's issue and, if possible, recommend a direct automated system-setting action to fix their problem instantly!

Ticket Subject: ${subject}
Ticket Message: "${message}"

Current User Context:
- Daily Calorie Target: ${currentCalories || 2000} kcal
- Diet Preference: ${currentDiet || "Balanced"}
- Language: ${currentLang || "en"}

Please determine if we can resolve their issue automatically using one of these actionTypes:
1. 'SET_CALORIES': If the user is asking to change, increase, decrease, set, reset, or adjust their daily calorie target/budget (e.g., "change my calorie target to 2200", "please set my budget to 2500 kcal"). The actionValue MUST be a string containing only the target number (e.g., "2500").
2. 'SET_DIET': If the user asks to switch, change, or set their diet style/preference (e.g., "I want a Keto diet", "switch me to Vegan", "High-Protein configuration"). The actionValue MUST be exactly one of: "Balanced", "Keto", "Vegan", "High-Protein".
3. 'SET_LANGUAGE': If the user asks to change the system language, translate the interface, or complaints about language (e.g., "please translate to Spanish", "espanol por favor", "put it in French"). The actionValue MUST be exactly one of the two-letter language codes: "en", "es", "fr", "hi", "ar", "zh".
4. 'CLEAR_LOGS': If the user complains about bad food logs, wants to clear their calorie history, delete everything, or start fresh (e.g., "wipe my food history", "clear my scans, I made a mistake", "reset my logs"). The actionValue can be "true".
5. 'EXPLAIN_ONLY': For any general inquiry, bug report, feedback, or legal questions that cannot be solved by changing settings. The actionValue can be null or empty.

Return a highly structured JSON response in the requested schema. Provide a helpful, reassuring, and very clear analysis and resolution.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: aiPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { 
              type: Type.STRING, 
              description: "A friendly analysis of what the user is experiencing or requesting." 
            },
            actionType: { 
              type: Type.STRING, 
              description: "Must be exactly one of: SET_CALORIES, SET_DIET, SET_LANGUAGE, CLEAR_LOGS, EXPLAIN_ONLY" 
            },
            actionValue: { 
              type: Type.STRING, 
              description: "The parameter for the action (e.g. '2200' for SET_CALORIES, 'Keto' for SET_DIET, 'es' for SET_LANGUAGE, 'true' for CLEAR_LOGS, or empty)." 
            },
            resolution: { 
              type: Type.STRING, 
              description: "A polite, concise resolution message showing what was done, or giving direct friendly advice to solve their inquiry." 
            }
          },
          required: ["analysis", "actionType", "actionValue", "resolution"]
        }
      }
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("No response returned from the Gemini Resolution Engine.");
    }

    const data = JSON.parse(textResult.trim());
    return res.json(data);

  } catch (error: any) {
    console.error("AI Ticket diagnostic failed:", error);
    return res.status(500).json({ 
      error: "The AI Support Agent was unable to complete the analysis: " + (error.message || error) 
    });
  }
});

// AI Weekly Summary Critique Route (Gemini-Powered)
app.post("/api/ai-weekly-critique", async (req, res) => {
  try {
    const { logs, targetCalories, dietPreference, currentLang } = req.body;

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured. AI Critique cannot run." 
      });
    }

    // Prepare a structured data string from logs
    const logsBrief = (logs || []).map((log: any) => {
      return `Date: ${log.timestamp ? log.timestamp.split('T')[0] : 'N/A'}, Meal: ${log.itemName || 'Unnamed'}, Calories: ${log.calories || 0} kcal, Protein: ${log.protein || 0}g, Carbs: ${log.carbs || 0}g, Fats: ${log.fats || 0}g`;
    }).join('\n');

    const prompt = `You are a professional nutritionist and performance dietician.
Analyze the user's weekly calorie and macronutrient logs against their goals.
Target Calories Goal: ${targetCalories || 2000} kcal/day
Dietary Preference: ${dietPreference || "Balanced"}
Preferred Language Code: ${currentLang || "en"}

User's logs of foods logged in the past week:
${logsBrief || "No food logs registered yet. (Explain that logging is key!)"}

Provide a highly customized weekly critique and progress report.
Adjust your language to match the Preferred Language Code: ${currentLang || "en"} (e.g. if 'es', write in Spanish, if 'fr', in French, if 'en', in English, etc.).
Assess how well they stayed within +/- 15% of their calorie target, and how well their macronutrients (protein, carbs, fats ratios) align with a standard "${dietPreference}" style.
Rate their adherence score from 0 to 100.
Return a structured JSON object matching the requested schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: "Adherence score from 0 to 100 based on consistency and macro targets alignment." 
            },
            summary: { 
              type: Type.STRING, 
              description: "A 1-2 sentence high-level supportive review of their week." 
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 bullet points outlining what they did well (e.g., hitting protein goal, steady calorie pacing)."
            },
            opportunities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 actionable advice bullet points for the next week."
            },
            nutritionalInsights: {
              type: Type.STRING,
              description: "A deeper paragraph (3-4 sentences) with premium dietician insight on macro-distribution, energy level spikes, or diet style improvement."
            }
          },
          required: ["score", "summary", "strengths", "opportunities", "nutritionalInsights"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response content from Gemini.");
    }

    const critique = JSON.parse(resultText.trim());
    return res.json(critique);

  } catch (error: any) {
    console.error("Weekly AI Critique failed:", error);
    return res.status(500).json({
      error: "Could not generate weekly critique: " + (error.message || error)
    });
  }
});

// Google OAuth Authorization URL Route
app.get("/api/auth/google/url", (req, res) => {
  const origin = (req.query.origin as string) || process.env.APP_URL || `https://${req.get('host')}`;
  const redirectUri = `${origin}/auth/google/callback`;
  
  const googleClientId = process.env.GOOGLE_CLIENT_ID || "MOCK_CLIENT_ID";
  
  const params = new URLSearchParams({
    client_id: googleClientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'select_account',
  });
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  res.json({ url: authUrl, isMock: !process.env.GOOGLE_CLIENT_ID });
});

// Google OAuth Redirect Callback Handler
app.get(["/auth/google/callback", "/auth/google/callback/"], async (req, res) => {
  const { code } = req.query;
  const origin = process.env.APP_URL || `https://${req.get('host')}`;
  const redirectUri = `${origin}/auth/google/callback`;
  
  let profile = {
    name: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop"
  };
  
  let errorMsg = null;
  
  if (code && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    try {
      // Exchange authorization code for token
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: code as string,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code'
        })
      });
      
      const tokens = await tokenRes.json();
      if (tokens.error) {
        throw new Error(tokens.error_description || tokens.error);
      }
      
      // Fetch user info using access_token
      const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${tokens.access_token}` }
      });
      
      if (!userInfoRes.ok) {
        throw new Error("Failed to fetch userinfo from Google.");
      }
      
      const userInfo = await userInfoRes.json();
      profile = {
        name: userInfo.name || "Google User",
        email: userInfo.email,
        picture: userInfo.picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop"
      };
    } catch (e: any) {
      console.error("Google OAuth exchange error:", e);
      errorMsg = e.message || "Failed to authenticate with Google.";
    }
  } else {
    console.log("No GOOGLE_CLIENT_ID detected in environment variables. Simulating successful Google integration.");
  }
  
  res.send(`
    <html>
      <head>
        <title>Google Authentication Complete</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #020617; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { text-align: center; background: #0f172a; padding: 2rem; border-radius: 1rem; border: 1px solid #1e293b; max-width: 400px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3); }
          .spinner { border: 3px solid #1e293b; border-top: 3px solid #6366f1; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin: 0 auto 1rem auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          h2 { margin-top: 0; color: #fff; font-size: 1.25rem; font-weight: 700; }
          p { color: #94a3b8; font-size: 0.875rem; margin-bottom: 0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="spinner"></div>
          <h2>Google Auth Successful</h2>
          <p>Connecting your profile... This window will close automatically.</p>
        </div>
        <script>
          if (window.opener) {
            window.opener.postMessage({ 
              type: 'GOOGLE_AUTH_SUCCESS', 
              profile: ${JSON.stringify(profile)},
              error: ${errorMsg ? JSON.stringify(errorMsg) : 'null'}
            }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script>
      </body>
    </html>
  `);
});

// Configure Vite middleware or static routes
async function setupServer() {
  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up server in DEVELOPMENT mode with Vite Middleware.");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up server in PRODUCTION mode.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  if (process.env.NODE_ENV !== "production" && vite) {
    server.on("upgrade", (req, socket, head) => {
      vite.ws.handleUpgrade(req, socket, head);
    });
  }
}

setupServer();
