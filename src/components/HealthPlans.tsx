import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  CheckCircle, 
  Award, 
  Target, 
  Flame, 
  ChevronRight, 
  Activity,
  Clock,
  Coffee,
  Moon,
  ChevronLeft,
  Sparkles,
  Dumbbell,
  ListTodo,
  Smile
} from 'lucide-react';
import { 
  PLAN_DETAILS_EN, 
  PLAN_DETAILS_ES, 
  PLAN_DETAILS_FR, 
  PLAN_DETAILS_HI, 
  PLAN_DETAILS_ZH, 
  PLAN_DETAILS_AR,
  PlanDay,
  PlanWeek,
  PlanMonth
} from '../data/planDetails';

export interface CustomPlanDay {
  day: number;
  focus: string;
  exercise: string;
  breakfast: string;
  breakfastCal: number;
  breakfastProt: number;
  breakfastCarb: number;
  breakfastFat: number;
  lunch: string;
  lunchCal: number;
  lunchProt: number;
  lunchCarb: number;
  lunchFat: number;
  snack: string;
  snackCal: number;
  snackProt: number;
  snackCarb: number;
  snackFat: number;
  dinner: string;
  dinnerCal: number;
  dinnerProt: number;
  dinnerCarb: number;
  dinnerFat: number;
}

export interface CustomPlan {
  title: string;
  subtitle: string;
  goal: string;
  diet: string;
  workout: string;
  culture: string;
  days: CustomPlanDay[];
}

const DEFAULT_CUSTOM_PLAN: CustomPlan = {
  title: "My Custom Wellness Quest",
  subtitle: "A completely tailor-made health blueprint personalized for my routine, favorite foods, and personal fitness targets.",
  goal: "Custom Fitness & Bio-optimization",
  diet: "Personalized nutrition with custom caloric targeting",
  workout: "Tailored movement pattern & active recovery splits",
  culture: "Aligned to my exact daily schedule & local kitchen",
  days: [
    {
      day: 1,
      focus: "Foundation Walk & Clean Proteins",
      exercise: "30-minute steady cardio walk",
      breakfast: "Avocado sourdough toast & double egg whites",
      breakfastCal: 320, breakfastProt: 18, breakfastCarb: 28, breakfastFat: 12,
      lunch: "Spiced quinoa bowl with grilled chicken & greens",
      lunchCal: 450, lunchProt: 24, lunchCarb: 40, lunchFat: 14,
      snack: "Mixed raw walnuts & pumpkin seeds with dark berries",
      snackCal: 180, snackProt: 6, snackCarb: 12, snackFat: 10,
      dinner: "Stir-fried ginger broccoli & lean chicken breast",
      dinnerCal: 380, dinnerProt: 32, dinnerCarb: 15, dinnerFat: 8
    },
    {
      day: 2,
      focus: "Core Activation & Nourishing Bowl",
      exercise: "20-minute bodyweight core flow",
      breakfast: "Mixed berry protein smoothie with almond butter",
      breakfastCal: 290, breakfastProt: 22, breakfastCarb: 20, breakfastFat: 9,
      lunch: "Hearty green lentil soup with warm spelt bun",
      lunchCal: 410, lunchProt: 18, lunchCarb: 48, lunchFat: 6,
      snack: "Greek yogurt cup with organic honey",
      snackCal: 130, snackProt: 12, snackCarb: 10, snackFat: 2,
      dinner: "Herb roasted salmon with steamed asparagus spears",
      dinnerCal: 420, dinnerProt: 30, dinnerCarb: 12, dinnerFat: 16
    }
  ]
};

interface HealthPlansProps {
  onSelectPlan: (planId: "7day" | "1month" | "6month" | "custom") => void;
  activePlanId: string | null;
  onLogMeal?: (meal: {
    itemName: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
    description: string;
    items: any[];
  }) => void;
}

export const HealthPlans: React.FC<HealthPlansProps> = ({ onSelectPlan, activePlanId, onLogMeal }) => {
  const { t, i18n } = useTranslation();
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<"7day" | "1month" | "6month" | "custom" | null>("7day");

  const [dietPreference, setDietPreference] = useState<'all' | 'veg'>(() => {
    const saved = localStorage.getItem('vitalpath_diet_preference');
    return (saved === 'all' || saved === 'veg') ? saved : 'all';
  });

  const saveDietPreference = (pref: 'all' | 'veg') => {
    setDietPreference(pref);
    localStorage.setItem('vitalpath_diet_preference', pref);
  };

  const getFormattedMeal = (mealName: string, preference: 'all' | 'veg'): string => {
    if (preference !== 'veg' || !mealName) return mealName;

    let text = mealName;

    // 1. First, look for parenthesized "(or/o/ou/या/أو/或者 ...)" pattern
    const parenRegex = /([A-Za-z0-9\u00C0-\u017F\s,’"'-]+?)\s*\(\s*(?:or|o|ou|या|أو|或者)\s+([^)]+)\)/gi;
    text = text.replace(parenRegex, (match, before, alternative) => {
      return alternative;
    });

    // 2. Look for non-parenthesized direct alternates like "A or B"
    // English
    text = text.replace(/shredded turkey breast or spicy tempeh/i, "spicy tempeh");
    text = text.replace(/shredded chicken salad or chili lime tilapia/i, "chili lime tempeh");
    text = text.replace(/shredded turkey breast/i, "seasoned tofu scramble");
    text = text.replace(/diced lean chicken/i, "crispy cubed tofu");
    text = text.replace(/baked cod medallions/i, "baked tofu medallions");
    text = text.replace(/shredded turkey breast/i, "smoked protein-rich tofu cubes");
    text = text.replace(/shredded chicken/i, "marinated baked tofu");
    text = text.replace(/chili lime tilapia/i, "chili lime tempeh");
    text = text.replace(/shredded turkey/i, "seasoned seitan scramble");
    text = text.replace(/shredded beef/i, "shredded soy chunks");
    text = text.replace(/lean chicken/i, "organic paneer cubes");
    text = text.replace(/seafood\/omega fats/i, "algal omega-3 oils, walnuts, and chia seeds");

    // Spanish
    text = text.replace(/Pavo al vapor o rodajas de tempeh/i, "rodajas de tempeh");
    text = text.replace(/Pechuga de pollo deshebrada o tilapia/i, "tilapia vegetal (tempeh)");
    text = text.replace(/pechuga de pavo desmenuzada/i, "tofu salteado desmenuzado");
    text = text.replace(/filete de pollo magro/i, "tofu crujiente en cubos");
    text = text.replace(/bacalao al horno/i, "tofu al horno");
    text = text.replace(/pechuga de pavo/i, "tofu gourmet ahumado");
    text = text.replace(/pechuga de pollo/i, "seitán marinado");
    text = text.replace(/pollo desmenuzado/i, "tofu deshilachado al curry");
    text = text.replace(/Pescado azul o aceites ricos en omega-3/i, "Aceites vegetales frescos o semillas de calabaza y chía ricas en omega-3");

    // French
    text = text.replace(/Blanc de dinde poché ou cubes de tempeh/i, "cubes de tempeh");
    text = text.replace(/Poulet émincé à la vapeur ou truite vapeur/i, "tofu de soja bio à la vapeur");
    text = text.replace(/émincé de dinde/i, "émincé de tofu de soja");
    text = text.replace(/dés de poulet magre|dés de poulet maigre/i, "dés de tempeh croustillant");
    text = text.replace(/cabillaud cuit|colin cuit/i, "tofu grillé");
    text = text.replace(/blanc de poulet/i, "tofu biologique");
    text = text.replace(/blanc de dinde/i, "cubes de tempeh marinés");
    text = text.replace(/poulet émincé/i, "seitan émincé");
    text = text.replace(/Poisson gras noble riche en oméga-3/i, "Graines de lin et noix de Grenoble riches en oméga-3");

    // Hindi
    text = text.replace(/लीन चिकन/g, "पनीर");
    text = text.replace(/चिकन/g, "सोया टोफू");
    text = text.replace(/मछली|टर्की|कॉड/g, "पनीर/टोफू");

    // Arabic
    text = text.replace(/شريحة صدر دجاج/g, "شريحة توفو مشوية");
    text = text.replace(/صدر دجاج/g, "توفو عضوي");
    text = text.replace(/بشرائح الدجاج|الدجاج/g, "بالمشروم والتوفو");
    text = text.replace(/السمك|أسماك|السلمون|التونة/g, "التوفو والتيمبي البديل");
    text = text.replace(/دجاج/g, "توفو صويا بالسبانخ");
    text = text.replace(/الدواجن/g, "البروتينات النباتية الصحية");

    // Chinese
    text = text.replace(/瘦鸡肉|鸡肉|鸡胸肉/g, "高钙有机豆腐");
    text = text.replace(/鳕鱼|三文鱼|鲜鱼|鱼肉/g, "香煎天贝");
    text = text.replace(/火鸡肉|火鸡胸/g, "美味大豆蛋白");

    // General cleanup replacements
    text = text.replace(/\bchicken breast\b/i, "marinated organic tofu");
    text = text.replace(/\bturkey breast\b/i, "savory spiced tempeh");
    text = text.replace(/\bcod medallions\b/i, "paneer medallions");
    text = text.replace(/\bsalmon\b/i, "marinated tempeh");
    text = text.replace(/\bshrimp\b/i, "mushrooms");
    text = text.replace(/\bbeef\b/i, "seitan");
    text = text.replace(/\bpork\b/i, "soy chunk");
    
    text = text.replace(/\bpoisson\b/i, "tofu");
    text = text.replace(/\bviande\b/i, "protéine végétale");

    text = text.replace(/\bpescado\b/i, "tofu");
    text = text.replace(/\bcarne\b/i, "proteína vegetal");

    return text;
  };

  // Detailed view states
  const [activeDay, setActiveDay] = useState(1);
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeMonth, setActiveMonth] = useState(1);
  const [loggedMeals, setLoggedMeals] = useState<string[]>([]);
  const [checkedHabits, setCheckedHabits] = useState<{[key: string]: boolean}>({});

  // Custom plan constructor states
  const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingMeal, setEditingMeal] = useState<string | null>(null);

  const [customPlan, setCustomPlan] = useState<CustomPlan>(() => {
    const saved = localStorage.getItem('vitalpath_custom_plan');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.days && parsed.days.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse custom plan, restoring default", e);
      }
    }
    return DEFAULT_CUSTOM_PLAN;
  });

  const saveCustomPlan = (newPlan: CustomPlan) => {
    setCustomPlan(newPlan);
    localStorage.setItem('vitalpath_custom_plan', JSON.stringify(newPlan));
  };

  const currentLang = i18n.language?.split('-')[0] || 'en';

  // Retrieve correct translated data
  const getPlanDataset = () => {
    switch (currentLang) {
      case 'hi':
        return PLAN_DETAILS_HI;
      case 'es':
        return PLAN_DETAILS_ES;
      case 'fr':
        return PLAN_DETAILS_FR;
      case 'zh':
        return PLAN_DETAILS_ZH;
      case 'ar':
        return PLAN_DETAILS_AR;
      default:
        return PLAN_DETAILS_EN;
    }
  };

  const getPlanDetailsSummary = (planId: "7day" | "1month" | "6month" | "custom") => {
    if (planId === "custom") {
      return {
        goal: customPlan.goal || "Custom Health & Fitness Goal",
        diet: customPlan.diet || "Customized Diet Approach",
        workout: customPlan.workout || "Tailored Activity & Exercise Plan",
        culture: customPlan.culture || "Personal Cultural Preference Alignment"
      };
    }
    switch (planId) {
      case "7day":
        return {
          goal: currentLang === 'hi' ? "मेटाबॉलिज्म गति बढ़ाना और वजन नियंत्रण" : 
                currentLang === 'es' ? "Acelerar metabolismo y vitalidad" :
                currentLang === 'fr' ? "Réactiver le tonus musculaire rapide" :
                currentLang === 'ar' ? "تنشيط معدلات الحرق والنشاط البشري" :
                currentLang === 'zh' ? "极速促燃代谢与能量重组" : "Spur metabolism & initial weight refinement",
          diet: currentLang === 'hi' ? "शाकाहारी प्रोटीन, पनीर, सोया, दालें और नींबू पानी" : 
                currentLang === 'es' ? "Proteínas magras, pollo de granja, infusiones detox" :
                currentLang === 'fr' ? "Riche en protéines, petit-déjeuner au kéfir" :
                currentLang === 'ar' ? "البيض المسلوق، صدور الدجاج، البقوليات والتفاح" :
                currentLang === 'zh' ? "精纯高蛋白、时鲜蔬果、燕麦与柠檬温水" : "High lean proteins, leafy greens, warm water, and whole oatmeal",
          workout: currentLang === 'hi' ? "२५ मिनट तेज चलना और सरल सुर्य नमस्कार" : 
                   currentLang === 'es' ? "Cardio ligero, trote suave de 20 minutos" :
                   currentLang === 'fr' ? "Cardio intermittent, marche athlétique matin" :
                   currentLang === 'ar' ? "تمارين هوائية خفيفة لمدة 20 دقيقة" :
                   currentLang === 'zh' ? "20分钟日常有氧激活、快步走或台阶登高" : "20 minutes light interval cardio training or brisk daily jogs",
          culture: currentLang === 'hi' ? "प्राचीन पारंपरिक ऊर्जा स्रोतों के अनुकूल संतुलित योजना" : 
                   currentLang === 'es' ? "Adecuado para el ritmo de vida ocupado moderno" :
                   currentLang === 'fr' ? "Parfait pour un démarrage énergique" :
                   currentLang === 'ar' ? "مناسب تماماً لنمط الحياة اليومي النشط" :
                   currentLang === 'zh' ? "兼容都市快节奏与活力早餐搭配" : "Adapted comprehensively for busy schedules and smart hydration"
        };
      case "1month":
        return {
          goal: currentLang === 'hi' ? "मधुमेह नियंत्रण, कोलेस्ट्रॉल का प्रबंधन और आध्यात्मिक शांति" : 
                currentLang === 'es' ? "Salud cardiovascular, antioxidantes corporales" :
                currentLang === 'fr' ? "Équilibre cardiovasculaire régional et minceur" :
                currentLang === 'ar' ? "تنشيط صحة القلب، تقليل الالتهابات، تصفية البدن" :
                currentLang === 'zh' ? "气血温补、健脾和胃、稳固元气" : "Cardiovascular strengthening, wellness transformation",
          diet: currentLang === 'hi' ? "दाल-चपाती, हरी चटनी, बाजरा, रागी, हल्दी दूध, दही" : 
                currentLang === 'es' ? "Aceite de oliva extra virgen, pescados frescos, frutos secos" :
                currentLang === 'fr' ? "Poissons frais du terroir, huiles vierges de pépin, graines" :
                currentLang === 'ar' ? "التين المجفف، التمر، البندق، زيت الزيتون الصافي والبقول" :
                currentLang === 'zh' ? "温热杂粮粥、参归冬瓜汤、本地清炒蔬菜" : "Heart-friendly oils, seafood stews, traditional root carbs, ancient grain bowls",
          workout: currentLang === 'hi' ? "दैनिक योगासन (भुजंगासन, त्रिकोणासन) और नाड़ी शोधन प्राणायाम" : 
                   currentLang === 'es' ? "Entrenamiento de fuerza controlada, caminatas al atardecer" :
                   currentLang === 'fr' ? "Randonnées de nature régulières, postures de yoga" :
                   currentLang === 'ar' ? "تمارين مفاصل خفيفة ومشي مسائي بعد انكسار الحرارة" :
                   currentLang === 'zh' ? "太极内家拳法、核心深度静态拉伸与慢走" : "Full-body yoga flows, stretching, 45 mins evening strength training sessions",
          culture: currentLang === 'hi' ? "योग दर्शन और भारतीय आयुर्वेदिक रसोई परंपरा पर आधारित" : 
                   currentLang === 'es' ? "Dieta Mediterránea declarada patrimonio cultural" :
                   currentLang === 'fr' ? "Respect du terroir et gastronomie équilibrée" :
                   currentLang === 'ar' ? "يعتمد على النتاج الزراعي الأصيل لبلدان حوض المتوسط" :
                   currentLang === 'zh' ? "东方古法养生学与气血运行周期的精妙契合" : "Traditional culinary traditions prioritized"
        };
      case "6month":
        return {
          goal: currentLang === 'hi' ? "मेटाबॉलिज्म अनुकूलन, वसा बर्निंग, और स्वस्थ ऊर्जा स्तर" : 
                currentLang === 'es' ? "Reconstrucción metabólica, quema de grasa a largo plazo y vitalidad" :
                currentLang === 'fr' ? "Reconstruction métabolique, perte grasse à long terme et vitalité" :
                currentLang === 'ar' ? "إعادة بناء الأيض، حرق الدهون المستدام وزيادة الطاقة الحيوية" :
                currentLang === 'zh' ? "深度代谢重建、可持续脂降与长效抗慢性疲劳" : "Metabolic reconstruction, sustainable fat loss, and long-term vitality",
          diet: currentLang === 'hi' ? "साबुत अनाज, भीगे हुए नट्स, कम ग्लाइसेमिक कार्ब्स, स्वस्थ वसा और हाई-फाइबर आहार" : 
                currentLang === 'es' ? "Régimen balanceado de carbohidratos complejos, grasas saludables, nueces y fibra" :
                currentLang === 'fr' ? "Régime équilibré riche en fibres, graisses saines, oléagineux et glucides complexes" :
                currentLang === 'ar' ? "الكربوهيدرات المعقدة، المكسرات المنقوعة، الألياف العالية والدهون الصحية" :
                currentLang === 'zh' ? "复合碳水化合物、浸泡坚果群、优质深海油脂与高膳食纤维" : "Complex carbohydrates, soaked nuts, high fiber, and healthy omega-3 fatty acids",
          workout: currentLang === 'hi' ? "सप्ताह में ४ बार मध्यम शक्ति व्यायाम और ध्यान" : 
                   currentLang === 'es' ? "Entrenamiento de fuerza moderada 4 veces por semana y meditación" :
                   currentLang === 'fr' ? "Entraînement de force modéré 4x par semaine et méditation" :
                   currentLang === 'ar' ? "تمارين القوة المعتدلة 4 مرات أسبوعياً والتأمل اليومي العميق" :
                   currentLang === 'zh' ? "每周4次心肺阻力联合力量训练、配合深度冥想放松" : "Moderate resistance load training 4x weekly, swimming, and deep breathing",
          culture: currentLang === 'hi' ? "सतत जीवन शैली और समग्र शारीरिक संतुलन के अनुरूप" : 
                   currentLang === 'es' ? "Sincronización de estilo de vida metabólico familiar y sostenible" :
                   currentLang === 'fr' ? "Parfaitement adapté pour l'hygiène métabolique globale" :
                   currentLang === 'ar' ? "ملائم تماماً لمستويات المعيشة الصحية والنشاط العائلي" :
                   currentLang === 'zh' ? "完美契合代谢运行周期、四季平衡与长效日常体能重建" : "Elite metabolic lifestyle coaching synchronized globally"
        };
    }
  };

  // Helper to generate deterministic realistic nutrition based on meal name & type
  const getMealNutrition = (type: 'breakfast' | 'lunch' | 'snack' | 'dinner', name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    let baseCal = 0;
    let baseProt = 0;
    let baseCarb = 0;
    let baseFat = 0;

    switch (type) {
      case 'breakfast':
        baseCal = 280 + (hash % 80); 
        baseProt = 15 + (hash % 10);  
        baseCarb = 35 + (hash % 15);  
        baseFat = 6 + (hash % 6);     
        break;
      case 'lunch':
        baseCal = 420 + (hash % 100); 
        baseProt = 25 + (hash % 15);  
        baseCarb = 40 + (hash % 20);  
        baseFat = 10 + (hash % 8);    
        break;
      case 'snack':
        baseCal = 140 + (hash % 60);  
        baseProt = 8 + (hash % 8);    
        baseCarb = 15 + (hash % 15);  
        baseFat = 4 + (hash % 5);     
        break;
      case 'dinner':
        baseCal = 380 + (hash % 90);  
        baseProt = 28 + (hash % 12);  
        baseCarb = 25 + (hash % 15);  
        baseFat = 8 + (hash % 8);     
        break;
    }

    return {
      calories: baseCal,
      protein: baseProt,
      carbs: baseCarb,
      fats: baseFat
    };
  };

  const handleLogMealClick = (planKey: string, timeKey: 'breakfast' | 'lunch' | 'snack' | 'dinner', mealName: string) => {
    if (!onLogMeal) return;
    const { calories, protein, carbs, fats } = getMealNutrition(timeKey, mealName);
    
    onLogMeal({
      itemName: `${timeKey.toUpperCase()}: ${mealName}`,
      totalCalories: calories,
      totalProtein: protein,
      totalCarbs: carbs,
      totalFats: fats,
      description: `Plan-suggested high-efficiency nutritional log. Included with your active ${planKey} diet planner.`,
      items: [
        {
          name: mealName,
          portionSize: "1 Serving",
          calories,
          protein,
          carbs,
          fats
        }
      ]
    });
    
    // Add to logged meals locally to change UI state instantly
    const logId = `${planKey}-${timeKey}-${mealName}`;
    setLoggedMeals(prev => [...prev, logId]);
  };

  const toggleHabit = (monthNum: number, habitIndex: number) => {
    const key = `month-${monthNum}-habit-${habitIndex}`;
    setCheckedHabits(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isHabitChecked = (monthNum: number, habitIndex: number) => {
    return !!checkedHabits[`month-${monthNum}-habit-${habitIndex}`];
  };

  const getMonthHabitsCompletionRate = (monthNum: number, totalHabits: number) => {
    let completed = 0;
    for (let i = 0; i < totalHabits; i++) {
      if (isHabitChecked(monthNum, i)) completed++;
    }
    return completed;
  };

  const plans = [
    {
      id: "7day" as const,
      titleKey: "plan_7day_title",
      descKey: "plan_7day_desc",
      duration: "7 Days",
      bg: "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100/30 text-emerald-800"
    },
    {
      id: "1month" as const,
      titleKey: "plan_1month_title",
      descKey: "plan_1month_desc",
      duration: "30 Days",
      bg: "bg-indigo-50/50 hover:bg-indigo-50 border-indigo-100/30 text-indigo-800"
    },
    {
      id: "6month" as const,
      titleKey: "plan_6month_title",
      descKey: "plan_6month_desc",
      duration: "6 Months",
      bg: "bg-slate-50/50 hover:bg-slate-50 border-slate-100/30 text-slate-800"
    },
    {
      id: "custom" as const,
      titleKey: "Customizable Health Plan",
      descKey: "custom_plan_desc",
      duration: "Custom Plan",
      bg: "bg-indigo-500/15 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
    }
  ];

  const planDataset = getPlanDataset();

  const cloneFromPreset = (presetId: "7day" | "1month" | "6month") => {
    if (presetId === "7day" && planDataset['7day']) {
      const clonedDays: CustomPlanDay[] = planDataset['7day'].days.map((item: any) => {
        const formattedB = getFormattedMeal(item.breakfast, dietPreference);
        const formattedL = getFormattedMeal(item.lunch, dietPreference);
        const formattedS = getFormattedMeal(item.snack, dietPreference);
        const formattedD = getFormattedMeal(item.dinner, dietPreference);

        const bMacros = getMealNutrition('breakfast', formattedB);
        const lMacros = getMealNutrition('lunch', formattedL);
        const sMacros = getMealNutrition('snack', formattedS);
        const dMacros = getMealNutrition('dinner', formattedD);

        return {
          day: item.day,
          focus: item.focus,
          exercise: item.exercise,
          breakfast: formattedB,
          breakfastCal: bMacros.calories,
          breakfastProt: bMacros.protein,
          breakfastCarb: bMacros.carbs,
          breakfastFat: bMacros.fats,

          lunch: formattedL,
          lunchCal: lMacros.calories,
          lunchProt: lMacros.protein,
          lunchCarb: lMacros.carbs,
          lunchFat: lMacros.fats,

          snack: formattedS,
          snackCal: sMacros.calories,
          snackProt: sMacros.protein,
          snackCarb: sMacros.carbs,
          snackFat: sMacros.fats,

          dinner: formattedD,
          dinnerCal: dMacros.calories,
          dinnerProt: dMacros.protein,
          dinnerCarb: dMacros.carbs,
          dinnerFat: dMacros.fats,
        };
      });

      saveCustomPlan({
        title: dietPreference === 'veg' ? "My Customized Vegetarian Blast Plan" : "My Customized Blast Plan",
        subtitle: dietPreference === 'veg' ? "A completely custom vegetarian high-energy kickstart cloned from the expert metabolic blueprint." : "A completely custom high-energy kickstart cloned from the expert metabolic blueprint and optimized for my ingredients.",
        goal: "Rapid Mitochondrial Activation & Energy Sparking",
        diet: dietPreference === 'veg' ? "High lean plant proteins (tofu / legumes), thermogenic seasoning" : "High lean fiber, thermogenic seasoning, custom pacing",
        workout: "20-30m brisk thermogenic pacing and postural resets",
        culture: "A highly tailored version designed for quick preparation",
        days: clonedDays
      });
      setActiveDay(1);
    } else if (presetId === "1month" && planDataset['1month']) {
      const clonedDays: CustomPlanDay[] = [1, 2, 3, 4, 5, 6, 7].map((num) => {
        const weekData = planDataset['1month'].weeks[Math.floor((num - 1) / 2) % planDataset['1month'].weeks.length] || planDataset['1month'].weeks[0];
        const { breakfast, lunch, snack, dinner } = weekData.meals;

        const formattedB = getFormattedMeal(breakfast, dietPreference);
        const formattedL = getFormattedMeal(lunch, dietPreference);
        const formattedS = getFormattedMeal(snack, dietPreference);
        const formattedD = getFormattedMeal(dinner, dietPreference);

        const bMacros = getMealNutrition('breakfast', formattedB);
        const lMacros = getMealNutrition('lunch', formattedL);
        const sMacros = getMealNutrition('snack', formattedS);
        const dMacros = getMealNutrition('dinner', formattedD);

        return {
          day: num,
          focus: `Mediterranean ${getFormattedMeal(weekData.dietFocus, dietPreference)}`,
          exercise: weekData.activityRoutine,
          breakfast: formattedB,
          breakfastCal: bMacros.calories,
          breakfastProt: bMacros.protein,
          breakfastCarb: bMacros.carbs,
          breakfastFat: bMacros.fats,

          lunch: formattedL,
          lunchCal: lMacros.calories,
          lunchProt: lMacros.protein,
          lunchCarb: lMacros.carbs,
          lunchFat: lMacros.fats,

          snack: formattedS,
          snackCal: sMacros.calories,
          snackProt: sMacros.protein,
          snackCarb: sMacros.carbs,
          snackFat: sMacros.fats,

          dinner: formattedD,
          dinnerCal: dMacros.calories,
          dinnerProt: dMacros.protein,
          dinnerCarb: dMacros.carbs,
          dinnerFat: dMacros.fats,
        };
      });

      saveCustomPlan({
        title: dietPreference === 'veg' ? "My Customized Vegetarian Mediterranean Odyssey" : "My Customized Mediterranean Odyssey",
        subtitle: dietPreference === 'veg' ? "An olive-oil, fresh plant proteins, and full grain traditional feast tweaked with my favorite additions." : "An olive-oil, fresh-fish, and full grain traditional feast tweaked with my favourite additions.",
        goal: "Cardiovascular Resilience & Anti-Inflammatory Nourishment",
        diet: dietPreference === 'veg' ? "Rich extra virgin fats, walnuts, seeds, and local whole legumes" : "Rich extra virgin fats, ocean minerals, local whole legumes",
        workout: "Holistic yoga, continuous dynamic low-impact conditioning",
        culture: "Culturally deep slow food traditional alignment",
        days: clonedDays
      });
      setActiveDay(1);
    }
  };

  const handleAddCustomDay = () => {
    const nextDayNum = customPlan.days.length + 1;
    const newDay: CustomPlanDay = {
      day: nextDayNum,
      focus: `My Healthy Routine Target`,
      exercise: "30-minute balanced movement",
      breakfast: "Overnight chia & berries pudding",
      breakfastCal: 250, breakfastProt: 10, breakfastCarb: 30, breakfastFat: 8,
      lunch: "Mixed avocado and turkey salad bowl",
      lunchCal: 420, lunchProt: 28, lunchCarb: 15, lunchFat: 14,
      snack: "Crunchy green apple & dark chocolate slice",
      snackCal: 120, snackProt: 2, snackCarb: 22, snackFat: 4,
      dinner: "Grilled sea bass with seasonal roasted vegetables",
      dinnerCal: 360, dinnerProt: 32, dinnerCarb: 10, dinnerFat: 10
    };
    saveCustomPlan({
      ...customPlan,
      days: [...customPlan.days, newDay]
    });
    setActiveDay(nextDayNum);
  };

  const handleDeleteLastCustomDay = () => {
    if (customPlan.days.length <= 1) return;
    const copy = [...customPlan.days];
    copy.pop();
    saveCustomPlan({
      ...customPlan,
      days: copy
    });
    if (activeDay > copy.length) {
      setActiveDay(copy.length);
    }
  };

  const updateCustomDayField = (dayIndex: number, field: string, value: any) => {
    const updatedDays = [...customPlan.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      [field]: value
    };
    saveCustomPlan({
      ...customPlan,
      days: updatedDays
    });
  };

  return (
    <div id="health-plans-module" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-md shadow-black/20 transition-all space-y-6">
      
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">
            {t('plansTitle')}
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {t('plansSubtitle')}
          </p>
        </div>
      </div>

      {/* Diet Selector Toggle Button Bar */}
      <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 label-diet-preference">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t('dietPreferenceTitle')}</span>
          </h3>
          <p className="text-xxs text-slate-400 mt-1 flex items-center gap-1">
            <span>Toggle your dietary mode to automatically reformat plans with nutritious, plant-based proteins.</span>
          </p>
        </div>

        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-xl gap-1 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => saveDietPreference('all')}
            className={`px-4 py-2 text-xxs font-extrabold uppercase rounded-lg transition-all tracking-wider cursor-pointer select-diet-all ${
              dietPreference === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🥩 {t('dietPreferenceAll')}
          </button>
          
          <button
            onClick={() => saveDietPreference('veg')}
            className={`px-4 py-2 text-xxs font-extrabold uppercase rounded-lg transition-all tracking-wider cursor-pointer select-diet-veg ${
              dietPreference === 'veg'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/15'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🥦 {t('dietPreferenceVeg')}
          </button>
        </div>
      </div>

      {/* Main selection blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => {
          const isActive = activePlanId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                onSelectPlan(p.id);
                setSelectedPlanDetails(p.id);
                if (p.id === 'custom') {
                  if (activeDay > customPlan.days.length) {
                    setActiveDay(customPlan.days.length);
                  }
                } else {
                  setActiveDay(1);
                }
              }}
              id={`select-p-${p.id}`}
              className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between min-h-[170px] relative overflow-hidden outline-none cursor-pointer ${
                isActive 
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-500/10' 
                  : 'border-slate-800 bg-slate-950/40 hover:bg-slate-950/60'
              }`}
            >
              <div className="space-y-1.5 z-10 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 rounded-full text-slate-300 tracking-wider">
                    {p.id === 'custom' ? `${customPlan.days.length} Days` : p.duration}
                  </span>
                  {isActive && (
                    <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 uppercase px-2 py-0.5 rounded-md">
                      {t('activePlanLabel')}
                    </span>
                  )}
                </div>
                
                <h3 className="text-sm font-extrabold text-white tracking-tight leading-snug break-words">
                  {p.id === 'custom' ? customPlan.title : t(p.titleKey)}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-4 z-10">
                <span>{t('viewFullPlan')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>

              {/* Background accent decor logic */}
              <div className="absolute right-0 bottom-0 translate-y-3 translate-x-3 opacity-[0.03] text-white pointer-events-none">
                <Calendar className="w-24 h-24" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Culturally customized details display panel */}
      {selectedPlanDetails && (
        <div 
          className="bg-slate-950/40 rounded-xl border border-slate-800 p-5 space-y-6 font-sans animate-in fade-in duration-150"
          id="detailed-plan-view"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <h4 className="text-sm font-extrabold text-white">
                {selectedPlanDetails === 'custom' ? customPlan.title : t(plans.find(p => p.id === selectedPlanDetails)?.titleKey || "")} Details
              </h4>
            </div>
            
            <button
              id="activate-details-plan-btn"
              onClick={() => onSelectPlan(selectedPlanDetails)}
              className={`px-3 py-1 text-white font-bold rounded-lg text-xxs transition-colors cursor-pointer ${
                activePlanId === selectedPlanDetails 
                  ? 'bg-emerald-600 hover:bg-emerald-500' 
                  : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {activePlanId === selectedPlanDetails ? '✓ Active Plan' : t('activatePlan')}
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed italic">
            "{selectedPlanDetails === 'custom' ? customPlan.subtitle : t(plans.find(p => p.id === selectedPlanDetails)?.descKey || "")}"
          </p>

          {/* Grid details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="space-y-4">
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 shadow-sm text-indigo-400">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-550 text-[10px] uppercase tracking-wider">{t('planGoal')}</p>
                  <p className="font-semibold text-slate-300 mt-0.5">{getPlanDetailsSummary(selectedPlanDetails).goal}</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 shadow-sm text-emerald-400">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-550 text-[10px] uppercase tracking-wider">{t('planDiet')}</p>
                  <p className="font-semibold text-slate-300 mt-0.5">{getFormattedMeal(getPlanDetailsSummary(selectedPlanDetails).diet, dietPreference)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 shadow-sm text-indigo-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-550 text-[10px] uppercase tracking-wider">{t('planWorkout')}</p>
                  <p className="font-semibold text-slate-300 mt-0.5">{getPlanDetailsSummary(selectedPlanDetails).workout}</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 shadow-sm text-indigo-400">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-550 text-[10px] uppercase tracking-wider">{t('planCultureHighlight')}</p>
                  <p className="font-semibold text-indigo-400 mt-0.5">{getPlanDetailsSummary(selectedPlanDetails).culture}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Core Schedule Interface */}
          <div className="border-t border-slate-800 pt-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h5 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                Interactive Schedule & Daily Planner
              </h5>
            </div>

            {/* IF CUSTOM PLAN: SHOW COMPREHENSIVE CONSTRUCTOR ENGINE */}
            {selectedPlanDetails === 'custom' && (
              <div className="space-y-6" id="interactive-custom-planner">
                {/* Cloning/Templating Controls */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="uppercase text-[10px] tracking-wider font-extrabold">
                        Quick Template Builders
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Clone pre-built schedules and adjust as you please</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to overwrite your current custom plan with a clone of the 7-Day Plan?")) {
                          cloneFromPreset("7day");
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Clone 7-Day Metabolism Plan
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to overwrite your current custom plan with a clone of the 1-Month Plan?")) {
                          cloneFromPreset("1month");
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Clone 1-Month Mediterranean Plan
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Reset current custom plan to blank template?")) {
                          saveCustomPlan(DEFAULT_CUSTOM_PLAN);
                          setActiveDay(1);
                        }
                      }}
                      className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-400 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Reset Plan
                    </button>
                  </div>
                </div>

                {/* General Information Editor Button Toggle */}
                <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-slate-350 tracking-wide">✏️ Customize General Plan Headers</span>
                    <button
                      onClick={() => setEditingGeneral(!editingGeneral)}
                      className="px-3 py-1 text-xxs font-extrabold uppercase tracking-wider bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-750 transition-all cursor-pointer"
                    >
                      {editingGeneral ? "Hide Inputs" : "Show Fields"}
                    </button>
                  </div>

                  {editingGeneral && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1.5 animate-in fade-in duration-100">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Plan Title</label>
                        <input 
                          type="text" 
                          value={customPlan.title} 
                          onChange={(e) => saveCustomPlan({...customPlan, title: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Short Cover Subtitle</label>
                        <input 
                          type="text" 
                          value={customPlan.subtitle} 
                          onChange={(e) => saveCustomPlan({...customPlan, subtitle: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Primary Strategy / Goal</label>
                        <input 
                          type="text" 
                          value={customPlan.goal} 
                          onChange={(e) => saveCustomPlan({...customPlan, goal: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Diet Focus</label>
                        <input 
                          type="text" 
                          value={customPlan.diet} 
                          onChange={(e) => saveCustomPlan({...customPlan, diet: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Exercise Habit Focus</label>
                        <input 
                          type="text" 
                          value={customPlan.workout} 
                          onChange={(e) => saveCustomPlan({...customPlan, workout: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Culture Insight / Personal Notes</label>
                        <input 
                          type="text" 
                          value={customPlan.culture} 
                          onChange={(e) => saveCustomPlan({...customPlan, culture: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-350"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Day Selector list with add/remove buttons */}
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-black uppercase text-slate-200">Interactive Constructor Grid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleAddCustomDay}
                        className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/20 text-emerald-400 rounded-lg text-xxs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>+ Add Day</span>
                      </button>
                      {customPlan.days.length > 1 && (
                        <button 
                          onClick={handleDeleteLastCustomDay}
                          className="px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/20 text-rose-400 rounded-lg text-xxs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>- Delete Last Day</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {customPlan.days.map((d) => {
                      const isCurrent = activeDay === d.day;
                      return (
                        <button
                          key={d.day}
                          onClick={() => setActiveDay(d.day)}
                          className={`px-3.5 py-2.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                            isCurrent 
                              ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30 shadow-md ring-2 ring-indigo-500/10' 
                              : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                          }`}
                        >
                          Day {d.day}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Current Custom Day details editor and visualiser */}
                {customPlan.days[activeDay - 1] && (
                  <div className="space-y-4 animate-in fade-in duration-100" key={activeDay}>
                    {/* Core details editable panel */}
                    <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Theme / Day Focus</label>
                          <input
                            type="text"
                            value={customPlan.days[activeDay - 1].focus}
                            onChange={(e) => updateCustomDayField(activeDay - 1, 'focus', e.target.value)}
                            placeholder="e.g. Core Recovery, Protein Loading"
                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/25 font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Physical Exercise Routine</label>
                          <input
                            type="text"
                            value={customPlan.days[activeDay - 1].exercise}
                            onChange={(e) => updateCustomDayField(activeDay - 1, 'exercise', e.target.value)}
                            placeholder="e.g. 20-minute stretching, evening jog"
                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/25 text-slate-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 4 Interactive Meals */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(['breakfast', 'lunch', 'snack', 'dinner'] as const).map((mealKey) => {
                        const dayObj = customPlan.days[activeDay - 1];
                        const mealName = dayObj[mealKey] || "";
                        const cal = dayObj[`${mealKey}Cal` as keyof CustomPlanDay] as number || 0;
                        const prot = dayObj[`${mealKey}Prot` as keyof CustomPlanDay] as number || 0;
                        const carb = dayObj[`${mealKey}Carb` as keyof CustomPlanDay] as number || 0;
                        const fat = dayObj[`${mealKey}Fat` as keyof CustomPlanDay] as number || 0;

                        const isEditingMeal = editingMeal === `${activeDay}-${mealKey}`;

                        const loggedId = `custom-day-${activeDay}-${mealKey}-${mealName}`;
                        const isLogged = loggedMeals.includes(loggedId);

                        return (
                          <div key={mealKey} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                                  {mealKey === 'breakfast' && <Coffee className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                                  {mealKey === 'lunch' && <Dumbbell className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />}
                                  {mealKey === 'snack' && <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />}
                                  {mealKey === 'dinner' && <Moon className="w-3.5 h-3.5 text-sky-400 animate-pulse" />}
                                  {mealKey}
                                </span>
                                <button
                                  onClick={() => setEditingMeal(isEditingMeal ? null : `${activeDay}-${mealKey}`)}
                                  className="text-xxs font-extrabold uppercase text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 transition-all cursor-pointer"
                                >
                                  {isEditingMeal ? "Close Form" : "Edit Meal"}
                                </button>
                              </div>

                              {!isEditingMeal ? (
                                <div className="space-y-1.5">
                                  <p className="text-xs font-black text-white leading-normal">
                                    {mealName || "No meal configured"}
                                  </p>
                                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 items-center text-[10px] font-bold text-slate-400 bg-slate-950/40 p-2 rounded-lg border border-slate-850/30">
                                    <span className="text-emerald-400 font-extrabold">{cal} kcal</span>
                                    <span className="text-slate-700">•</span>
                                    <span>{prot}g Prot</span>
                                    <span className="text-slate-700">•</span>
                                    <span>{carb}g Carb</span>
                                    <span className="text-slate-700">•</span>
                                    <span>{fat}g Fat</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3 pt-1 animate-in fade-in duration-75">
                                  <div className="space-y-0.5">
                                    <label className="text-[8px] text-slate-550 font-bold uppercase tracking-wide">Custom Menu Item Name</label>
                                    <input
                                      type="text"
                                      value={mealName}
                                      onChange={(e) => updateCustomDayField(activeDay - 1, mealKey, e.target.value)}
                                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-1.5 text-xs focus:border-indigo-500 focus:outline-none font-bold"
                                      placeholder="e.g. Scrambled Eggs & Rye Toast"
                                    />
                                  </div>
                                  
                                  <div className="grid grid-cols-4 gap-1.5">
                                    <div className="space-y-0.5">
                                      <label className="text-[8px] text-slate-500 font-bold uppercase block text-center">Calories</label>
                                      <input
                                        type="number"
                                        value={cal}
                                        onChange={(e) => updateCustomDayField(activeDay - 1, `${mealKey}Cal`, parseInt(e.target.value) || 0)}
                                        className="w-full text-center bg-slate-950 border border-slate-800 text-emerald-450 rounded-lg py-1 text-xs focus:border-indigo-500 focus:outline-none font-black"
                                      />
                                    </div>
                                    <div className="space-y-0.5">
                                      <label className="text-[8px] text-slate-500 font-bold uppercase block text-center">Prot(g)</label>
                                      <input
                                        type="number"
                                        value={prot}
                                        onChange={(e) => updateCustomDayField(activeDay - 1, `${mealKey}Prot`, parseInt(e.target.value) || 0)}
                                        className="w-full text-center bg-slate-950 border border-slate-800 text-slate-200 rounded-lg py-1 text-xs focus:border-indigo-500 focus:outline-none"
                                      />
                                    </div>
                                    <div className="space-y-0.5">
                                      <label className="text-[8px] text-slate-500 font-bold uppercase block text-center">Carb(g)</label>
                                      <input
                                        type="number"
                                        value={carb}
                                        onChange={(e) => updateCustomDayField(activeDay - 1, `${mealKey}Carb`, parseInt(e.target.value) || 0)}
                                        className="w-full text-center bg-slate-950 border border-slate-800 text-slate-200 rounded-lg py-1 text-xs focus:border-indigo-500 focus:outline-none"
                                      />
                                    </div>
                                    <div className="space-y-0.5">
                                      <label className="text-[8px] text-slate-500 font-bold uppercase block text-center">Fat(g)</label>
                                      <input
                                        type="number"
                                        value={fat}
                                        onChange={(e) => updateCustomDayField(activeDay - 1, `${mealKey}Fat`, parseInt(e.target.value) || 0)}
                                        className="w-full text-center bg-slate-950 border border-slate-800 text-slate-200 rounded-lg py-1 text-xs focus:border-indigo-500 focus:outline-none"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <button
                              disabled={isLogged || !mealName}
                              onClick={() => {
                                if (onLogMeal) {
                                  onLogMeal({
                                    itemName: `${mealKey.toUpperCase()}: ${mealName}`,
                                    totalCalories: cal,
                                    totalProtein: prot,
                                    totalCarbs: carb,
                                    totalFats: fat,
                                    description: `Recorded from Custom Wellness Plan: Day ${activeDay}. Focus: ${dayObj.focus}`,
                                    items: [
                                      {
                                        name: mealName,
                                        portionSize: "1 Serving",
                                        calories: cal,
                                        protein: prot,
                                        carbs: carb,
                                        fats: fat
                                      }
                                    ]
                                  });
                                  setLoggedMeals(prev => [...prev, loggedId]);
                                }
                              }}
                              className={`w-full py-2 rounded-xl text-xxs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isLogged 
                                  ? 'bg-slate-950 text-slate-600 border border-slate-850 cursor-not-allowed' 
                                  : !mealName 
                                    ? 'bg-slate-900/50 text-slate-600 border border-dashed border-slate-800 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer hover:shadow-lg'
                              }`}
                            >
                              {isLogged ? "✓ Logged to Tracker" : "+ Log Custom Meal"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* IF 7 DAY PLAN: SHOW 7-DAY NAVIGATION TABS AND MEAL DECKS */}
            {selectedPlanDetails === '7day' && planDataset['7day'] && (
              <div className="space-y-5" id="interactive-7day-planner">
                {/* Horizontal flow of Days */}
                <div className="flex flex-wrap gap-2">
                  {planDataset['7day'].days.map((d: PlanDay) => {
                    const isCurrent = activeDay === d.day;
                    return (
                      <button
                        key={d.day}
                        onClick={() => setActiveDay(d.day)}
                        id={`7day-day-tab-${d.day}`}
                        className={`px-3 py-2 rounded-xl border text-xs font-black transition-all ${
                          isCurrent 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-md ring-2 ring-emerald-500/10' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {currentLang === 'hi' ? `दिन ${d.day}` :
                         currentLang === 'es' ? `Día ${d.day}` :
                         currentLang === 'fr' ? `Jour ${d.day}` :
                         currentLang === 'zh' ? `第 ${d.day} 天` :
                         currentLang === 'ar' ? `اليوم ${d.day}` : `Day ${d.day}`}
                      </button>
                    );
                  })}
                </div>

                {/* Day Focus Card */}
                {planDataset['7day'].days.map((d: PlanDay) => {
                  if (d.day !== activeDay) return null;
                  
                  const meals = [
                    { key: 'breakfast' as const, name: getFormattedMeal(d.breakfast, dietPreference), icon: <Coffee className="w-3.5 h-3.5 text-amber-400" /> },
                    { key: 'lunch' as const, name: getFormattedMeal(d.lunch, dietPreference), icon: <Activity className="w-3.5 h-3.5 text-orange-400" /> },
                    { key: 'snack' as const, name: getFormattedMeal(d.snack, dietPreference), icon: <Coffee className="w-3.5 h-3.5 text-emerald-400" /> },
                    { key: 'dinner' as const, name: getFormattedMeal(d.dinner, dietPreference), icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> }
                  ];

                  return (
                    <div key={d.day} className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-150">
                      {/* focus sub-badge */}
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-extrabold text-white text-xxs uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md">
                            Focus Focus
                          </span>
                          <span className="font-bold text-slate-300">{d.focus}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xxs">
                          <Dumbbell className="w-3.5 h-3.5 text-slate-400" />
                          <span>{d.exercise}</span>
                        </div>
                      </div>

                      {/* Meals list cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {meals.map((m) => {
                          const nut = getMealNutrition(m.key, m.name);
                          const logId = `7day-${m.key}-${m.name}`;
                          const isLogged = loggedMeals.includes(logId);

                          return (
                            <div 
                              key={m.key} 
                              className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-2 flex flex-col justify-between"
                            >
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center text-slate-400">
                                  <div className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-slate-400">
                                    {m.icon}
                                    <span>{m.key}</span>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-400">
                                    {nut.calories} kcal
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-slate-200 leading-relaxed">
                                  {m.name}
                                </p>
                              </div>

                              {/* Estimated macros bullet log */}
                              <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
                                <div className="flex gap-2 text-[9px] font-bold text-slate-400">
                                  <span>P: <span className="text-emerald-400">{nut.protein}g</span></span>
                                  <span>C: <span className="text-amber-400">{nut.carbs}g</span></span>
                                  <span>F: <span className="text-indigo-400">{nut.fats}g</span></span>
                                </div>

                                {onLogMeal && (
                                  <button
                                    onClick={() => handleLogMealClick('7day', m.key, m.name)}
                                    id={`log-7day-${m.key}`}
                                    className={`px-2.5 py-1 text-[9px] font-extrabold rounded-lg transition-all ${
                                      isLogged 
                                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                        : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-transparent'
                                    }`}
                                  >
                                    {isLogged ? 'Synced ✓' : '+ Log Meal'}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* IF 1 MONTH PLAN: SHOW 4 WEEKLY SCHEDULERS */}
            {selectedPlanDetails === '1month' && planDataset['1month'] && (
              <div className="space-y-5" id="interactive-1month-planner">
                {/* 4 Weekly Tabs */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((wk) => {
                    const isCurrent = activeWeek === wk;
                    return (
                      <button
                        key={wk}
                        onClick={() => setActiveWeek(wk)}
                        id={`1month-week-tab-${wk}`}
                        className={`flex-1 px-3 py-2 rounded-xl border text-xs font-black transition-all ${
                          isCurrent 
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 shadow-md ring-2 ring-indigo-500/10' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {currentLang === 'hi' ? `सप्ताह ${wk}` :
                         currentLang === 'es' ? `Semana ${wk}` :
                         currentLang === 'fr' ? `Semaine ${wk}` :
                         currentLang === 'zh' ? `第 ${wk} 周` :
                         currentLang === 'ar' ? `الأسبوع ${wk}` : `Week ${wk}`}
                      </button>
                    );
                  })}
                </div>

                {/* Week Information content */}
                {planDataset['1month'].weeks.map((w: PlanWeek) => {
                  if (w.week !== activeWeek) return null;

                  const weeklyMeals = [
                    { key: 'breakfast' as const, name: getFormattedMeal(w.meals.breakfast, dietPreference), icon: <Coffee className="w-3.5 h-3.5 text-amber-400" /> },
                    { key: 'lunch' as const, name: getFormattedMeal(w.meals.lunch, dietPreference), icon: <Activity className="w-3.5 h-3.5 text-orange-400" /> },
                    { key: 'snack' as const, name: getFormattedMeal(w.meals.snack, dietPreference), icon: <Coffee className="w-3.5 h-3.5 text-emerald-400" /> },
                    { key: 'dinner' as const, name: getFormattedMeal(w.meals.dinner, dietPreference), icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> }
                  ];

                  return (
                    <div key={w.week} className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-150">
                      
                      {/* Key target highlight block */}
                      <div className="bg-slate-950/70 rounded-xl border border-slate-850 p-4 space-y-3">
                        <div className="flex items-center gap-2 text-indigo-400">
                          <Target className="w-4 h-4" />
                          <span className="font-extrabold text-xxs uppercase tracking-wider text-indigo-400">
                            Weekly Focus & Targets
                          </span>
                        </div>
                        <h4 className="text-xs font-extrabold text-white">
                          Goal: {w.keyGoal}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xxs divide-y sm:divide-y-0 sm:divide-x divide-slate-800 pt-2">
                          <div className="space-y-1">
                            <span className="font-bold text-slate-500 uppercase tracking-widest block">Dietary Standard</span>
                            <span className="text-slate-350 font-medium">{getFormattedMeal(w.dietFocus, dietPreference)}</span>
                          </div>
                          <div className="space-y-1 sm:pl-3 pt-2 sm:pt-0">
                            <span className="font-bold text-slate-500 uppercase tracking-widest block">Activity Routine</span>
                            <span className="text-slate-350 font-medium">{w.activityRoutine}</span>
                          </div>
                        </div>
                      </div>

                      {/* Display blueprint meals for this week */}
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide pt-2">
                        Core Daily Meals Blueprint
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {weeklyMeals.map((m) => {
                          const nut = getMealNutrition(m.key, m.name);
                          const logId = `1month-${m.key}-${m.name}`;
                          const isLogged = loggedMeals.includes(logId);

                          return (
                            <div 
                              key={m.key} 
                              className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-2 flex flex-col justify-between"
                            >
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center text-slate-400">
                                  <div className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-slate-400">
                                    {m.icon}
                                    <span>{m.key}</span>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-400">
                                    {nut.calories} kcal
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-slate-200 leading-relaxed">
                                  {m.name}
                                </p>
                              </div>

                              {/* Estimated macros bullet log */}
                              <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
                                <div className="flex gap-2 text-[9px] font-bold text-slate-400">
                                  <span>P: <span className="text-emerald-400">{nut.protein}g</span></span>
                                  <span>C: <span className="text-amber-400">{nut.carbs}g</span></span>
                                  <span>F: <span className="text-indigo-400">{nut.fats}g</span></span>
                                </div>

                                {onLogMeal && (
                                  <button
                                    onClick={() => handleLogMealClick('1month', m.key, m.name)}
                                    id={`log-1month-${m.key}`}
                                    className={`px-2.5 py-1 text-[9px] font-extrabold rounded-lg transition-all ${
                                      isLogged 
                                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                        : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-transparent'
                                    }`}
                                  >
                                    {isLogged ? 'Synced ✓' : '+ Log Meal'}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* IF 6 MONTH PLAN: SHOW 6 MONTH ACCORDIONS & HABITS TRACKER */}
            {selectedPlanDetails === '6month' && planDataset['6month'] && (
              <div className="space-y-5" id="interactive-6month-planner">
                {/* 6 Circular Month Nav Tabs */}
                <div className="flex justify-between gap-1 overflow-x-auto pb-1">
                  {[1, 2, 3, 4, 5, 6].map((mNum) => {
                    const isCurrent = activeMonth === mNum;
                    return (
                      <button
                        key={mNum}
                        onClick={() => setActiveMonth(mNum)}
                        id={`6month-m-tab-${mNum}`}
                        className={`px-3 py-2 rounded-xl border text-xs font-black transition-all text-center min-w-[55px] ${
                          isCurrent 
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 ring-2 ring-indigo-500/10' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {currentLang === 'hi' ? `माह ${mNum}` :
                         currentLang === 'es' ? `Mes ${mNum}` :
                         currentLang === 'fr' ? `Mois ${mNum}` :
                         currentLang === 'zh' ? `${mNum} 月` :
                         currentLang === 'ar' ? `الشهر ${mNum}` : `M ${mNum}`}
                      </button>
                    );
                  })}
                </div>

                {/* Phased Month Focus and Habit Checkboxes */}
                {planDataset['6month'].months.map((m: PlanMonth) => {
                  if (m.month !== activeMonth) return null;
                  
                  const habitsCount = m.habits.length;
                  const completedCount = getMonthHabitsCompletionRate(m.month, habitsCount);
                  const isFullyCompleted = completedCount === habitsCount;

                  return (
                    <div key={m.month} className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-150">
                      
                      {/* Description Panel */}
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
                          <CompassIcon />
                          <span className="uppercase text-xxs tracking-wider font-extrabold text-indigo-400">
                            Phased Curriculum Focus
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-white leading-snug">
                          {currentLang === 'zh' ? `阶段 ${m.month}: ${m.phase}` :
                           currentLang === 'hi' ? `चरण ${m.month}: ${m.phase}` :
                           currentLang === 'es' ? `Fase ${m.month}: ${m.phase}` :
                           currentLang === 'fr' ? `Phase ${m.month}: ${m.phase}` :
                           currentLang === 'ar' ? `المرحلة ${m.month}: ${m.phase}` : `Phase ${m.month}: ${m.phase}`}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xxs pt-1">
                          <div className="space-y-1">
                            <span className="font-extrabold text-slate-500 uppercase tracking-widest block">Dietary Strategy</span>
                            <p className="text-slate-350 leading-relaxed font-semibold">{m.dietStrategy}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="font-extrabold text-slate-500 uppercase tracking-widest block">Exercise Focus</span>
                            <p className="text-slate-350 leading-relaxed font-semibold">{m.fitnessGoal}</p>
                          </div>
                        </div>
                      </div>

                      {/* Habit Tracker checkboxes */}
                      <div className="bg-slate-950/70 border border-slate-850 rounded-xl p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ListTodo className="w-4 h-4 text-emerald-400" />
                            <h5 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                              Daily Habits Checklist
                            </h5>
                          </div>
                          
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-850 px-2.5 py-0.5 rounded-full">
                            Completed: {completedCount}/{habitsCount}
                          </span>
                        </div>

                        {/* Complete feedback celebrating message */}
                        {isFullyCompleted && (
                          <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xxs rounded-xl animate-bounce">
                            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                            <span className="font-bold">
                              All daily metabolic habits completed! Great work on establishing biological continuity! ✨
                            </span>
                          </div>
                        )}

                        <div className="space-y-2.5">
                          {m.habits.map((habit, index) => {
                            const isChecked = isHabitChecked(m.month, index);
                            return (
                              <button
                                key={index}
                                onClick={() => toggleHabit(m.month, index)}
                                id={`6month-habit-btn-${index}`}
                                className="w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs font-bold outline-none cursor-pointer bg-slate-900/60 hover:bg-slate-900 border-slate-800"
                              >
                                <span className={`transition-all leading-normal text-slate-300 ${isChecked ? 'line-through text-slate-550' : ''}`}>
                                  {habit}
                                </span>

                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                  isChecked 
                                    ? 'bg-emerald-500 border-emerald-500 text-slate-900' 
                                    : 'border-slate-700 bg-slate-950'
                                }`}>
                                  {isChecked && <CheckCircle className="w-4.5 h-4.5 text-slate-900 stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

// Internal minimal Icon helper to avoid extra Lucide issues
const CompassIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    className="w-4 h-4"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
