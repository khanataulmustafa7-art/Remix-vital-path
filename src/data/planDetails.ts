export interface PlanDay {
  day: number;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  exercise: string;
  focus: string;
}

export interface PlanWeek {
  week: number;
  dietFocus: string;
  activityRoutine: string;
  keyGoal: string;
  meals: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
}

export interface PlanMonth {
  month: number;
  phase: string;
  dietStrategy: string;
  fitnessGoal: string;
  habits: string[];
}

export const PLAN_DETAILS_EN = {
  "7day": {
    title: "7-Day Metabolism Booster Plan",
    subtitle: "A short, intensive plan designed to boost metabolic activity, clear digestive tracts, and elevate energy levels.",
    days: [
      {
        day: 1,
        focus: "Fiber & Hydration",
        breakfast: "Oatmeal with chia seeds, almonds, and warm lemon water.",
        lunch: "High-protein mixed bean salad with baby spinach and lemon-tahini dressing.",
        snack: "Greek yogurt with pumpkin seeds.",
        dinner: "Baked herb chicken breast (or steamed tofu) with sautéed asparagus and broccoli.",
        exercise: "20-minute morning brisk walk in fresh air."
      },
      {
        day: 2,
        focus: "Metabolism Activation",
        breakfast: "Egg white and spinach scramble with 1 slice of whole-wheat toast.",
        lunch: "Grilled paneer (or spiced tempeh) kebabs with bell peppers and mixed greens.",
        snack: "Sliced cucumber with 2 tbsp hummus.",
        dinner: "Hearty lentil soup with celery and shredded turkey breast.",
        exercise: "25-minute brisk jog or steady state walking."
      },
      {
        day: 3,
        focus: "Strength Activation",
        breakfast: "Protein fruit smoothie with unsweetened almond milk and flax seeds.",
        lunch: "Mediterranean chickpea salad with ripe cherry tomatoes, cucumbers, and olive oil.",
        snack: "A handful of raw walnuts (approx. 5-7 pieces).",
        dinner: "Steamed lemon-ginger cod (or sautéed bok choy/tofu) with brown rice.",
        exercise: "15-minute bodyweight routine (squats, lunges, and pushups)."
      },
      {
        day: 4,
        focus: "Intermittent Cleanse",
        breakfast: "High-protein lentil crepe (Moong Chilla) with direct mint chutney.",
        lunch: "Soy chunks or tempeh stir-fry with mixed bell peppers and organic broccoli.",
        snack: "Cottage cheese (paneer) cubes with pomegranate seeds.",
        dinner: "French green lentil salad with baby arugula, tomatoes, and low-fat feta.",
        exercise: "20-minute restorative stretching or morning yoga flow."
      },
      {
        day: 5,
        focus: "Glycogen Control",
        breakfast: "Peanut butter overnight oats with organic chia and hemp seeds.",
        lunch: "Garlic black bean hash with sautéed mushrooms and spinach scramble.",
        snack: "Whey (or plant-based) protein shake blended with coconut water.",
        dinner: "Oven-baked salmon salad (or tempeh skewers) with rosemary and roasted baby carrots.",
        exercise: "25-minute cardiovascular interval exercise (jumping jacks, high knees)."
      },
      {
        day: 6,
        focus: "Antioxidant Flush",
        breakfast: "Creamy Greek yogurt mixed with blueberries, raspberries, and pumpkin seeds.",
        lunch: "Quinoa salad bowl with steamed edamame, cherry tomatoes, and diced lean chicken.",
        snack: "Dry roasted almonds (approx. 10 pieces).",
        dinner: "Hearty lentil and organic spinach soup with toasted whole wheat garlic crisps.",
        exercise: "30-minute slow, relaxed outdoor jog or cycling session."
      },
      {
        day: 7,
        focus: "Epitome Balance",
        breakfast: "Toasted avocado and boiled egg over rye sourdough bread.",
        lunch: "Almond paneer satay grill with high-fiber mixed green vegetable salad.",
        snack: "Fresh celery sticks topped with natural unsweetened peanut butter.",
        dinner: "Lemon herb baked trout (or seitan lemon pepper grill) served with zucchini noodles.",
        exercise: "30-minute mindful nature walk."
      }
    ] as PlanDay[]
  },
  "1month": {
    title: "1-Month Mediterranean Wellness Plan",
    subtitle: "A holistic 4-week program inspired by regional culinary wisdom to lower systemic stress and boost immunity.",
    weeks: [
      {
        week: 1,
        keyGoal: "Gut & Healthy Fats Initialization",
        dietFocus: "Eliminate processed items, transition exclusively to extra virgin olive oil, and increase daily dietary fiber.",
        activityRoutine: "3 cardiovascular walk sessions of 30 mins and 2 strength drill blocks.",
        meals: {
          breakfast: "Avocado slices, olive tapenade, and cottage cheese on whole grain bread.",
          lunch: "Lentil & spinach soup with hard-boiled eggs and green lettuce salad with lemon juice.",
          snack: "Nut snack mix (raw almonds, walnuts, and dried apricots).",
          dinner: "Grilled vegetables and baked cod medallions with rosemary."
        }
      },
      {
        week: 2,
        keyGoal: "Vascular Health & Endurance",
        dietFocus: "Incorporate seafood/omega fats twice a week, raw garlic, citrus juices, and mineral-rich greens.",
        activityRoutine: "4 brisk walks of 45 mins, with 2 full-body flexibility yoga sessions.",
        meals: {
          breakfast: "Chia seed pudding prepared with almond milk and fresh raspberries.",
          lunch: "Mediterranean chickpea bowl topped with cool cucumber tzatziki.",
          snack: "Fat-free Greek yogurt with pumpkin seeds.",
          dinner: "Shredded chicken salad or chili lime tilapia with grilled asparagus."
        }
      },
      {
        week: 3,
        keyGoal: "Digestive Optimization & Muscular Tone",
        dietFocus: "Transition to ancient whole grains (ragi, barley, whole oats), lean pulses, and antioxidant herbal teas.",
        activityRoutine: "3 strength routines focussing on planks, bodyweight squats, and dumbbells.",
        meals: {
          breakfast: "High protein lentil crepe (chilla) with seasoned tomato and herb rollups.",
          lunch: "Edamame quinoa tabbouleh salad with fresh parsley and lemon-olive oil glaze.",
          snack: "Hummus with fresh carrot and celery sticks.",
          dinner: "Creamy paneer and sautéed spinach dip with organic crispy crackers."
        }
      },
      {
        week: 4,
        keyGoal: "Cellular Rejuvenation & Sleep Recovery",
        dietFocus: "Eat lighter dinners 3 hours before sleep. Introduce warm chamomile, lavender, or ginger tea.",
        activityRoutine: "Daily 30-minute light stretches and focused 15-minute restorative yoga nidra.",
        meals: {
          breakfast: "Egg white herb frittata with cooked kale.",
          lunch: "Shredded turkey breast or spicy tempeh rolled in romaine lettuce wraps.",
          snack: "Spiced roasted chickpeas (Chana).",
          dinner: "Warm clear vegetable soup with sautéed tofu cubes."
        }
      }
    ] as PlanWeek[]
  },
  "6month": {
    title: "6-Month Metabolic Reconstruction & Sustained Vitality",
    subtitle: "A professional long-term phased transformation focusing on building a highly efficient metabolic engine.",
    months: [
      {
        month: 1,
        phase: "Metabolic Baseline Adjustment",
        dietStrategy: "Cut out refined sugars, fast-acting carbohydrates, and processed foods. Prioritize dense protein and fresh cruciferous greens.",
        fitnessGoal: "Low-intensity steady state (LISS) cardio 3x weekly and flexibility drills.",
        habits: ["Drink 3 Liters of purified water daily", "Log all consumed items in VitalPath", "Zero white sugar intake"]
      },
      {
        month: 2,
        phase: "Gut Microbiome Settle",
        dietStrategy: "Introduce fermented superfoods (yogurt, kefir, sauerkraut) to support nutrient absorption and decrease gut inflammation.",
        fitnessGoal: "Core stabilization work and bodyweight functional fitness routines.",
        habits: ["Introduce 1 probiotic food daily", "No screens 45 minutes before sleep", "Complete 8,000 steps minimum daily"]
      },
      {
        month: 3,
        phase: "Glycogen Fuel Optimization",
        dietStrategy: "Time complex carbs (brown rice, roasted oats, quinoa) specifically before workouts. Maintain high protein levels.",
        fitnessGoal: "Introduce progressive resistance weight training sessions 3x weekly.",
        habits: ["Post-workout protein within 45 mins", "Weight training baseline checks", "Sleep 7 to 8 hours consistent schedule"]
      },
      {
        month: 4,
        phase: "Lipid Energy Adaptability",
        dietStrategy: "Incorporate healthy dietary fats (avocados, nuts, eggs, chia) to build long-standing hormone and energy stability.",
        fitnessGoal: "Increase load and frequency of strength workouts to 4x weekly.",
        habits: ["Track weekly fat/protein ratio", "Include active outdoor recovery day", "Practice 10-minute deep abdominal breathing"]
      },
      {
        month: 5,
        phase: "Mitochondrial Resiliency",
        dietStrategy: "Incorporate intermittent fasting window (14-hour fast, 10-hour feast) 3-4 days a week to stimulate cellular autophagy.",
        fitnessGoal: "Add 1 high-intensity interval (HIIT) cardio challenge of 20 mins weekly.",
        habits: ["Verify fasting window integrity", "Vagus nerve cold therapy (cool shower rinse)", "Progressive workout sets tracking"]
      },
      {
        month: 6,
        phase: "Peak Metabolic Maintenance",
        dietStrategy: "Establish intuitive lifestyle nutritional ratios. Cycle macronutrients seasonally for long-lasting performance.",
        fitnessGoal: "High-level compound lift routine paired with functional strength flows.",
        habits: ["Establish continuous lifelong plan metrics", "Conduct standard physical assessment tests", "Practice daily mental gratitude journal"]
      }
    ] as PlanMonth[]
  }
};

export const PLAN_DETAILS_ES = {
  "7day": {
    title: "Plan de 7 Días para Acelerar el Metabolismo",
    subtitle: "Un plan intensivo a corto plazo diseñado para activar la quema de calorías, depurar el sistema digestivo y aumentar tu energía vital.",
    days: [
      {
        day: 1,
        focus: "Fibra e Hidratación",
        breakfast: "Avena cocida con semillas de chía, almendras y agua tibia con limón.",
        lunch: "Ensalada de legumbres altas en proteína, espinaca tierna y aderezo de sésamo y limón.",
        snack: "Yogur griego bajo en grasa con semillas de calabaza.",
        dinner: "Pechuga de pollo al horno con hierbas (o tofu al vapor) con espárragos y brócoli salteados.",
        exercise: "Caminata rápida al aire libre por 20 minutos por la mañana."
      },
      {
        day: 2,
        focus: "Activación Metabólica",
        breakfast: "Revuelto de claras de huevo con espinacas y 1 rebanada de pan integral de trigo.",
        lunch: "Brochetas de paneer a la parrilla (o tempeh especiado) con pimientos y hojas verdes.",
        snack: "Pepino en rodajas con 2 cucharadas de hummus.",
        dinner: "Sopa nutritiva de lentejas medianas con apio y pechuga de pavo desmenuzada.",
        exercise: "Trote suave de 25 minutos o marcha a ritmo constante."
      },
      {
        day: 3,
        focus: "Activación de la Fuerza",
        breakfast: "Batido proteico de frutas con leche de almendras sin azúcar y semillas de lino.",
        lunch: "Ensalada mediterránea de garbanzos con tomates cherry, pepinos y aceite de oliva virgen.",
        snack: "Un puñado de nueces crudas (aproximadamente 5-7 piezas).",
        dinner: "Bacalao al limón y jengibre (o tofu al wok/bok choy) con arroz integral de grano largo.",
        exercise: "Sesión corta de 15 minutos con ejercicios de calistenia (sentadillas, flexiones y zancadas)."
      },
      {
        day: 4,
        focus: "Depuración Intermitente",
        breakfast: "Crepa de lentejas (Moong Chilla) alta en proteínas con salsa de menta fresca.",
        lunch: "Salteado de soja texturizada o tempeh con pimientos mixtos y brócoli orgánico.",
        snack: "Cubos de requesón (queso cottage/paneer) con granos de granada fresca.",
        dinner: "Ensalada de lentejas verdes francesas con rúcula, pimientos y queso feta bajo en calorías.",
        exercise: "Estiramientos suaves o yoga restaurativo por 20 minutos."
      },
      {
        day: 5,
        focus: "Control del Glucógeno",
        breakfast: "Avena remojada con semillas de chía y semillas de cáñamo en refrigeración.",
        lunch: "Salteado de frijoles negros al ajo con champiñones y revuelto de espinacas tiernas.",
        snack: "Batido de proteína de suero de leche vegetal con agua pura de coco.",
        dinner: "Salmón al horno (o brochetas de tempeh) con romero y zanahoria tierna rostizada.",
        exercise: "25 minutos de ejercicios de intervalos de cardio (saltos y rodillas arriba)."
      },
      {
        day: 6,
        focus: "Inyección de Antioxidantes",
        breakfast: "Yogur griego cremoso combinado con arándanos, frambuesas y pipas de calabaza.",
        lunch: "Tazón de ensalada de quinua con edamame al vapor, tomates cherry y filete de pollo magro.",
        snack: "Almendras tostadas al natural (unas 10 piezas).",
        dinner: "Sopa de lentejas y espinaca fresca con láminas tostadas de pan de ajo integral.",
        exercise: "30 minutos de trote al aire libre lento y relajado o sesión de bicicleta."
      },
      {
        day: 7,
        focus: "Equilibrio Integrado",
        breakfast: "Tostada de aguacate y huevo hervido sobre pan de centeno de masa madre.",
        lunch: "Paneer o tempeh satinado a la almendra con ensalada de hojas verdes ricas en fibra.",
        snack: "Palitos de apio fresco con mantequilla de cacahuete natural sin azúcar.",
        dinner: "Trucha al horno con hierbas finas acompañada de espaguetis de calabacín (zoodles).",
        exercise: "30 minutos de caminata pausada consciente."
      }
    ] as PlanDay[]
  },
  "1month": {
    title: "Plan de Bienestar Mediterráneo de 1 Mes",
    subtitle: "Un programa integral de 4 semanas inspirado en la salud y tradiciones culinarias para reducir la inflamación y potenciar la longevidad.",
    weeks: [
      {
        week: 1,
        keyGoal: "Inicialización de la Digestión y Grasas Saludables",
        dietFocus: "Elimina alimentos procesados, usa exclusivamente aceite de oliva virgen extra e incrementa el consumo de fibra vegetal.",
        activityRoutine: "3 caminatas cardiovasculares de 30 mins y 2 bloques cortos de fuerza muscular.",
        meals: {
          breakfast: "Láminas de aguacate, tapenade de aceitunas y requesón en pan de centeno.",
          lunch: "Sopa de lentejas con huevo cocido y ensalada verde fresca.",
          snack: "Mezcla de almendras crudas, nueces picadas y orejones de albaricoque.",
          dinner: "Verduras asadas de temporada y bacalao al horno con ramitas de romero."
        }
      },
      {
        week: 2,
        keyGoal: "Salud Vascular y Resistencia",
        dietFocus: "Pescado azul o aceites ricos en omega-3 dos veces por semana, ajo crudo, jugos cítricos y vegetales de hojas verdes.",
        activityRoutine: "4 caminatas a paso ligero de 45 mins, con 2 sesiones completas de flexibilidad y yoga.",
        meals: {
          breakfast: "Pudin de semillas de chía preparado con leche de almendra y frambuesas frescas.",
          lunch: "Tazón mediterráneo de garbanzos con salsa tzatziki de pepino fresco.",
          snack: "Yogur griego natural con pipas de calabaza.",
          dinner: "Pechuga de pollo deshebrada o tilapia al limón y lima con espárragos verdes."
        }
      },
      {
        week: 3,
        keyGoal: "Optimización Digestiva y Tono Muscular",
        dietFocus: "Introduce granos ancestrales (millo, cebada, avena entera), legumbres tiernas y tés de hierbas ricos en antioxidantes.",
        activityRoutine: "3 entrenamientos enfocados en planchas directas, sentadillas y mancuernas ligeras.",
        meals: {
          breakfast: "Crepa de legumbres muy fina con rollitos de queso fresco y especias.",
          lunch: "Ensalada tabulé de quinua y edamame con abundante perejil fresco y limón.",
          snack: "Hummus clásico con palitos de zanahoria y apio fresco.",
          dinner: "Crema de paneer y espinacas salteadas con galletas de espelta crujientes."
        }
      },
      {
        week: 4,
        keyGoal: "Rejuvenecimiento Celular y Calidad del Sueño",
        dietFocus: "Cenas más ligeras, consumidas al menos 3 horas antes de dormir. Tés calientes de manzanilla o lavanda.",
        activityRoutine: "Estiramientos ligeros diarios de 30 minutos y meditación respiratoria para dormir profundamente.",
        meals: {
          breakfast: "Frittata de claras de huevo con kale salteado.",
          lunch: "Pavo al vapor o rodajas de tempeh marinadas en rollitos de lechuga romana.",
          snack: "Garbanzos tostados especiados con pimentón ahumado.",
          dinner: "Consomé vegetal tibio con cubos de tofu fresco salteados."
        }
      }
    ] as PlanWeek[]
  },
  "6month": {
    title: "Plan de Reconstrucción Metabólica de 6 Meses",
    subtitle: "Una transformación física de largo alcance y científica diseñada para construir un motor metabólico altamente eficiente y saludable.",
    months: [
      {
        month: 1,
        phase: "Ajuste de la Base Metabólica",
        dietStrategy: "Eliminación estricta de azúcares refinados y carbohidratos simples. Nutrición limpia alta en proteínas y fitonutrientes.",
        fitnessGoal: "Entrenamiento cardiovascular suave (LISS) 3 veces por semana y movilidad articular.",
        habits: ["Tomar 3 litros de agua limpia diariamente", "Loguear todas las comidas en VitalPath", "Cero consumo de dulces o refrescos"]
      },
      {
        month: 2,
        phase: "Cuidado de la Microbiota Gut",
        dietStrategy: "Sembrar bacterias beneficiosas mediante superalimentos fermentados (yogur natural, kéfir, chucrut) para reducir inflamación.",
        fitnessGoal: "Fortalecimiento de la musculatura central (core) y movimientos funcionales.",
        habits: ["Consumir un alimento fermentado al día", "Apagar pantallas 45 minutos antes de dormir", "Alcanzar 8,000 pasos de meta diaria"]
      },
      {
        month: 3,
        phase: "Optimización de Reservas de Glucógeno",
        dietStrategy: "Carbohidratos complejos (arroz integral, avena orgánica, quinua) cronometrados justo antes de la actividad muscular.",
        fitnessGoal: "Iniciar con entrenamiento progresivo con cargas/fuerza 3 veces por semana.",
        habits: ["Tomar batido de proteína en los 45 mins post-ejercicio", "Evaluar técnica de entrenamiento", "Dormir de 7 a 8 horas todas las noches"]
      },
      {
        month: 4,
        phase: "Adaptabilidad de Energía de Ácidos Grasos",
        dietStrategy: "Eleva las grasas dietéticas de alta calidad (aguacate, aceite de oliva, nueces crudas, huevos) para la salud hormonal.",
        fitnessGoal: "Subir la frecuencia de rutinas de fuerza de 3 a 4 veces por semana.",
        habits: ["Revisar ingesta semanal de grasas frente a proteínas", "Día activo de naturaleza en el fin de semana", "Prácticas de respiración diafragmática de 10 min"]
      },
      {
        month: 5,
        phase: "Resiliencia Mitocondrial Humana",
        dietStrategy: "Implementar un ayuno intermitente (14 horas de ayuno por 10 de comida) de 3 a 4 días por semana para estimular la autofagia celular.",
        fitnessGoal: "Incorporar 1 sesión semanal de ejercicio HIIT de alta exigencia por 20 minutos.",
        habits: ["Monitorear el cumplimiento del ayuno", "Duchas cortas de agua fría por la mañana", "Registrar incremento de cargas físicas"]
      },
      {
        month: 6,
        phase: "Mantenimiento Metabólico Continuo",
        dietStrategy: "Consolidar las proporciones alimenticias ideales e intuitivas adecuadas para tu cuerpo. Equilibrio estacional de macros.",
        fitnessGoal: "Ejercicios multiarticurales compuestos unidos a flujos de calistenia desafiantes.",
        habits: ["Establecer métricas de salud vitalicias", "Hacer evaluación física trimestral", "Práctica de diario de gratitud matinal"]
      }
    ] as PlanMonth[]
  }
};

export const PLAN_DETAILS_FR = {
  "7day": {
    title: "Plan Booster Métabolique 7 Jours",
    subtitle: "Un protocole express conçu pour réveiller la thermogénèse, purifier le tube digestif et décupler l'énergie.",
    days: [
      {
        day: 1,
        focus: "Fibres & Hydratation",
        breakfast: "Flocons d'avoine, graines de chia, amandes concassées et grand verre d'eau citronnée tiède.",
        lunch: "Salade de légumineuses, jeunes pousses d'épinard et filet d'huile de sésame au citron.",
        snack: "Yaourt grec nature pauvre en matières grasses parsemé de graines de courge.",
        dinner: "Blanc de poulet rôti au thym (ou tofu grillé) avec asperges vertes et brocolis vapeur.",
        exercise: "Marche active matinale de 20 minutes au grand air."
      },
      {
        day: 2,
        focus: "Activation Thermique",
        breakfast: "Brouillade de blancs d'œufs minute, épinards frais et une tranche de pain complet.",
        lunch: "Brochettes de paneer traditionnelles (ou tempeh) grillées aux deux poivrons.",
        snack: "Concombre croquant avec 2 cuillères à soupe d'houmous.",
        dinner: "Soupe de lentilles brunes réconfortante au céleri et émincé de dinde.",
        exercise: "Footing léger de 25 minutes ou marche très cadencée."
      },
      {
        day: 3,
        focus: "Mobilisation Musculaire",
        breakfast: "Smoothie protéiné aux baies de saison, lait d'amande sans sucre et graines de lin.",
        lunch: "Salade de pois chiches à la méditerranéenne (tomates cerises, concombres et huile d'olive vierge).",
        snack: "Petite poignée de cerneaux de noix (5-7 cerneaux).",
        dinner: "Dos de cabillaud vapeur gingembre-citron (ou tofu/bok choy poêlé) et riz complet d'or.",
        exercise: "Renforcement musculaire de 15 minutes (squats, fentes, pompes de base)."
      },
      {
        day: 4,
        focus: "Légèreté & Détox",
        breakfast: "Crêpe de lentilles corail (Moong Chilla) croustillante et son chutney de menthe fraîche.",
        lunch: "Émincé de protéines de soja ou tempeh sauté au brocoli bio et poivrons colorés.",
        snack: "Fromage cottage blanc parsemé de grains de grenade d'or.",
        dinner: "Salade de lentilles vertes françaises, herbes sauvages frais et féta allégée.",
        exercise: "Séance de stretching doux d'éveil ou yoga postural de 20 minutes."
      },
      {
        day: 5,
        focus: "Restauration des Réserves",
        breakfast: "Porridge froid d'avoine et graines de chia et chanvre (overnight oats).",
        lunch: "Poêlée de haricots noirs relevée à l'ail frais avec champignons et blancs d'œufs sautés.",
        snack: "Shaker de protéines de lactosérum (ou végétales) à l'eau de coco pure.",
        dinner: "Pavé de saumon au four (ou pavé de tempeh) au romarin et petites carottes glacées.",
        exercise: "Séance cardiovasculaire fractionnée de 25 minutes (cardio intermittent)."
      },
      {
        day: 6,
        focus: "Bain d'Antioxydants",
        breakfast: "Yaourt grec onctueux mélangé à des myrtilles fraîches, framboises et graines de courge.",
        lunch: "Salade de quinoa bio contenant edamame, quartiers de tomate cerise et dés de poulet magre.",
        snack: "Quelques amandes brutes séchées (environ 10amandes).",
        dinner: "Consommé de lentilles vertes et jeunes feuilles d'épinard, pain d'ail complet frotté.",
        exercise: "Séance d'endurance de 30 minutes de vélo ou de footing lent très relaxant."
      },
      {
        day: 7,
        focus: "Harmonie Globale",
        breakfast: "Tranche de pain de seigle au levain grillée, écrasé d'avocat au citron et œuf poché.",
        lunch: "Paneer local ou tempeh sauté aux amandes accompagné d'une salade verte garnie.",
        snack: "Bâtonnets de céleri frais fourrés de beurre de cacahuète pur.",
        dinner: "Truite grillée aux herbes fines de Provence garnie de tagliatelles de courgette.",
        exercise: "Marche méditative guidée de 30 minutes en forêt ou parc."
      }
    ] as PlanDay[]
  },
  "1month": {
    title: "Plan de Bienessance Méditerranéenne (1 Mois)",
    subtitle: "Un rééquilibrage de 4 semaines inspiré du terroir marin pour régénérer le système cardiovasculaire et apaiser l'organisme.",
    weeks: [
      {
        week: 1,
        keyGoal: "Détoxification Douce & Lipides Nobles",
        dietFocus: "Bannir les sucres raffinés, utiliser l'huile d'olive de première pression et s'approvisionner abondamment en fibres.",
        activityRoutine: "3 séances de marche rapide de 30 mins et 2 séances globales de force légère.",
        meals: {
          breakfast: "Avocat tranché, tartine fine de sarrasin au fromage frais et romarin.",
          lunch: "Bol de lentilles vertes tièdes avec herbes sauvages frais et demi-œuf dur salé.",
          snack: "Amandes, noisettes brutes et abricots secs sauvages.",
          dinner: "Légumes d'été grillés au romarin et cabillaud vapeur."
        }
      },
      {
        week: 2,
        keyGoal: "Souplesse Artérielle & Endurance",
        dietFocus: "Poisson gras noble riche en oméga-3 deux fois par semaine, ail cru, jus de citron jaune pressé et légumes feuilles foncés.",
        activityRoutine: "4 marches d'endurance de 45 mins, complétées par 2 séances de yoga fluide.",
        meals: {
          breakfast: "Chia pudding biologique au lait d'amande fraîche et coulis de framboises rases.",
          lunch: "Méli-mélo de pois chiches sauce blanche au concombre façon tzatziki.",
          snack: "Yaourt grec riche en protéines aux graines croquantes de tournesol pour caler.",
          dinner: "Poulet émincé à la vapeur ou truite vapeur accompagnée d'asperges vertes au four."
        }
      },
      {
        week: 3,
        keyGoal: "Vitalité Digestive & Structuration",
        dietFocus: "Favoriser des céréales complètes rustiques (sarrasin, millet, riz noir sauvage), légumineuses sélectionnées et infusions.",
        activityRoutine: "3 entraînements basés sur le gainage postural (planches, squats poids de corps).",
        meals: {
          breakfast: "Galette de lentilles jaunes avec garniture d'herbes aromatiques et fromage doux salé.",
          lunch: "Taboulé de quinoa et edamame au citron vert pressé et beaucoup de persil plat frais.",
          snack: "Bâtonnets d'apio et de carotte douce avec purée d'houmous bio.",
          dinner: "Duo d'épinards sautés et de paneer aux herbes de campagne, craquelins d'épeautre."
        }
      },
      {
        week: 4,
        keyGoal: "Sommeil Régénérateur & Longévité",
        dietFocus: "Prendre un souper léger obligatoirement 3 heures avant d'aller dormir. Tisanes de camomille ou lavande.",
        activityRoutine: "Séance de stretching globale quotidienne de 30 minutes visant le bien-être vertébral.",
        meals: {
          breakfast: "Frittata de blancs d'œufs au kale biologique.",
          lunch: "Blanc de dinde poché ou cubes de tempeh marinés en papillote de laitue romaine.",
          snack: "Pois chiches séchés et rôtis au paprika doux fumé fait maison.",
          dinner: "Bouillon clair de légumes tiède, cubes de tofu japonais nature dorés."
        }
      }
    ] as PlanWeek[]
  },
  "6month": {
    title: "Protocole de Reconstruction Métabolique (6 Mois)",
    subtitle: "Une restructuration d'envergure physiologique, conçue scientifiquement pour optimiser à vie votre métabolisme cellulaire.",
    months: [
      {
        month: 1,
        phase: "Ajustement Métabolique de Base",
        dietStrategy: "Suppression totale des farines blanches et sucres industriels. Nutrition hyper-dense en protéines nobles et feuilles vertes.",
        fitnessGoal: "Marche active lente (LISS) 3x par semaine et exercices ciblés d'assouplissement articulaire.",
        habits: ["Boire 3 litres d'eau filtrée purs chaque jour", "Enregistrer tous les repas sur l'app", "Exclusion de toute boisson sucrée"]
      },
      {
        month: 2,
        phase: "Restauration du Microbiote",
        dietStrategy: "Ensemencer la flore par des super-aliments fermentés (kéfir frais de lait/eau, yaourt biologique, kimchi) pour calmer l'inflammation.",
        fitnessGoal: "Renforcement musculaire de base et mouvements fonctionnels polyarticulaires.",
        habits: ["Une portion journalière d'aliment fermenté", "Arrêt définitif des écrans 45 min avant de dormir", "Viser le cap minimal de 8 000 pas quotidiens"]
      },
      {
        month: 3,
        phase: "Optimisation de l'Énergie du Glycogène",
        dietStrategy: "Glucides complexes rassasiants (riz basmati complet, quinoa sauvage) calés idéalement 2 heures avant l'effort musculaire.",
        fitnessGoal: "Débuter les séances structurées de musculation ou résistance progressive 3x par semaine.",
        habits: ["Prendre les protéines dans les 45 min après la séance", "Vérification posturale de sécurité", "Bénéficier de 7 à 8h de sommeil profond continu"]
      },
      {
        month: 4,
        phase: "Flexibilité Énergétique des Lipides",
        dietStrategy: "Favoriser des lipides de haute qualité biologique (avocat, olives noires, œufs bio, graines de lin, huile d'argan) pour l'équilibre endocrinien.",
        fitnessGoal: "Accroître l'intensité et le volume musculaire à 4 séances hebdomadaires.",
        habits: ["Contrôler le ratio graisses saines / protéines", "Une journée verte de connexion nature le weekend", "Pratique respiratoire vagale ventrale de 10 minutes"]
      },
      {
        month: 5,
        phase: "Résilience Mitochondriale Globale",
        dietStrategy: "Instaurer un jeûne intermittent programmé (14 heures de jeûne, 10 heures d'alimentation) 3 à 4 jours par semaine.",
        fitnessGoal: "Ajouter 1 séance hebdomadaire intense de fractionné cardio HIIT de 20 minutes.",
        habits: ["Vérifier la rigueur de la fenêtre de jeûne", "Jet d'eau froide revigorant en fin de douche matinale", "Suivi précis de la progression de la masse musculaire"]
      },
      {
        month: 6,
        phase: "Stabilisation Métabolique Permanente",
        dietStrategy: "Ancrer un schéma nutritionnel pérenne et instinctif parfaitement adapté aux dépenses corporelles. Équilibre saisonnier.",
        fitnessGoal: "Mouvements polyarticulaires complexes de gymnastique lourde unie à des exercices de calisthénie fluides.",
        habits: ["Déterminer les objectifs cardiovasculaires à vie", "Réaliser le bilan physique de référence semestriel", "Écrire quotidiennement 3 sources de satisfaction matinales"]
      }
    ] as PlanMonth[]
  }
};

// Supporting other translations to keep the app absolutely majestic
export const PLAN_DETAILS_HI = {
  "7day": {
    title: "तनाव मुक्त जीवन और चयापचय 7-दिवसीय योजना",
    subtitle: "यह लघु और सघन कार्यक्रम आपके चयापचय (मेटाबॉलिज्म) को तेज करने, पाचन तंत्र को दुरुस्त करने और आपकी ऊर्जा को पुनः जाग्रत करने के लिए बनाया गया है।",
    days: [
      {
        day: 1,
        focus: "फाइबर और जल संतुलन",
        breakfast: "चिया सीड्स, भीगे हुए बादाम और गुनगुने नींबू पानी के साथ जैविक दलिया।",
        lunch: "हरी पालक, टमाटर और नींबू-जैतून तेल की ड्रेसिंग के साथ उच्च-प्रोटीन मिश्रित दाल सलाद।",
        snack: "कद्दू के बीज (पंपकिन सीड्स) के साथ मलाई रहित दही।",
        dinner: "सेंधा नमक और काली मिर्च के साथ तवे पर भुना हुआ पनीर या टोफू, और उबली हुई ब्रोकली।",
        exercise: "सुबह ताजी हवा में 20 मिनट तेज कदम से चलना (Brisk Walk)।"
      },
      {
        day: 2,
        focus: "ऊर्जा का संचार",
        breakfast: "पालक और अंडे की सफेदी का भुर्जी, साथ में 1 स्लाइस मल्टीग्रेन टोस्ट।",
        lunch: "शिमला मिर्च और हरी मिर्च के साथ ग्रिल्ड पनीर या सोया सोयाबीन कबाब।",
        snack: "ताजा खीरा स्लाइस और 2 चम्मच तिल की चटनी (ह्युमस)।",
        dinner: "मिक्स्ड वेजिटेबल सूप, लहसुन वाली मूंग दाल।",
        exercise: "२५ मिनट की मध्यम गति की जोग या वॉक।"
      },
      {
        day: 3,
        focus: "मांसपेशियों की मजबूती",
        breakfast: "ठंडे बादाम दूध और अलसी के बीजों (फ्लैक्स सीड्स) के साथ मिक्स्ड फ्रूट प्रोटीन स्मूदी।",
        lunch: "टमाटर, ककड़ी और नींबू के रस से बना हुआ काबुली चना सलाद bowl।",
        snack: "भीगे हुए अखरोट (५-७ टुकड़े)।",
        dinner: "पालक और टोफू मसाला sauté, साथ में मूंग दाल की खिचड़ी।",
        exercise: "१५ मिनट के साधारण शारीरिक व्यायाम (दंड-बैठक व अन्य अभ्यास)।"
      },
      {
        day: 4,
        focus: "पाचन डिटॉक्स",
        breakfast: "पुदीने की हरी चटनी के साथ स्वादिष्ट मूंग दाल चिल्ला (क्रेप)।",
        lunch: "शिमला मिर्च, मशरूम और सोयाबीन की सब्जी, साथ में थोड़ा उबला चावल।",
        snack: "अनार के दानों के साथ नमकीन पनीर क्यूब्स।",
        dinner: "हरी मूंग सलाद और काली मिर्च छिड़का हुआ सूप।",
        exercise: "20 मिनट के लिए योग स्ट्रेचिंग या सूर्य नमस्कार का अभ्यास।"
      },
      {
        day: 5,
        focus: "ऊर्जा संग्रहण",
        breakfast: "पीनट बटर, अलसी और शहद वाली ठंडी ओट्स पोट।",
        lunch: "लहसुन और हरी अदरक के साथ भुनी हुई काली सेम (ब्लैक बीन्स) और मशरूम।",
        snack: "नारियल पानी के साथ मिलाया हुआ नेचुरल प्रोटीन शेक।",
        dinner: "लहसुन तड़के वाली मसूर दाल और कद्दू की सब्जी।",
        exercise: "25 मिनट कार्डियो व्यायाम या सीढ़ियों पर चढ़ने-उतरने का अभ्यास।"
      },
      {
        day: 6,
        focus: "एंटीऑक्सीडेंट बूस्ट",
        breakfast: "ताजा अनार, अंगूर और कद्दू के बीजों के साथ दही का रायता।",
        lunch: "उबली हुई हरी सोयाबीन (एदामेमे), टमाटर और पनीर के साथ क्विनोआ सलाद।",
        snack: "भुने हुए बादाम (१० टुकड़े)।",
        dinner: "हरी सब्जियों और पालक का गाढ़ा शोरबा (सूप) साथ में सिकी हुई रोटी।",
        exercise: "30 मिनट की धीमी और सुखद साइकिलिंग या खुली जगह में टहलना।"
      },
      {
        day: 7,
        focus: "समग्र संतुलन",
        breakfast: "घर की बनी रागी की इडली या ओट्स उपमा के साथ मूंगफली की चटनी।",
        lunch: "नट्स और हरी पत्तेदार सब्जियों की ग्रेवी वाला सॉते पनीर।",
        snack: "ताजा सेब और नैचुरल पीनट बटर का कतरा।",
        dinner: "हरी चौलाई या सरसों का साग, उबले सोया के चंक्स के साथ भुने हुए मशरूम।",
        exercise: "30 मिनट की शांत और ध्यानपूर्ण प्रकृति वॉक (Walking Meditation)।"
      }
    ] as PlanDay[]
  },
  "1month": {
    title: "1-माह का पारंपरिक आरोग्य स्वस्थ योजना",
    subtitle: "यह 4 सप्ताह का कार्यक्रम भारतीय रसोई की पारंपरिक सामग्री पर आधारित है जो आपके दिल की सेहत और पेट के पाचन को ठीक करता है।",
    weeks: [
      {
        week: 1,
        keyGoal: "आंतों की सफाई और अच्छी वसा की शुरुआत",
        dietFocus: "प्रोसेस्ड खाना पूरी तरह त्यागें, भोजन में नारियल तेल/देसी घी की सीमित मात्रा या कोल्ड-प्रेस तेल जोड़ें, अधिक फाइबर लें।",
        activityRoutine: "हफ़्ते में ३ दिन ३० मिनट की सामान्य वॉक और २ दिन हल्का स्ट्रेचिंग व्यायाम।",
        meals: {
          breakfast: "भीगे बादाम और अंकुरित मूंग दाल का सलाद नींबू निचोड़कर।",
          lunch: "हरी सब्जी, रागी की चपाती, घर की बनी छाछ और पुदीने की चटनी।",
          snack: "भुनी हुई मूंगफली, मखाने और भीगे हुए अखरोट।",
          dinner: "ब्रोकली और पनीर का सूप, साथ में भुनी हुई सब्जियां सेंधा नमक के साथ।"
        }
      },
      {
        week: 2,
        keyGoal: "वसा पाचन और सहनशक्ति बढ़ाना",
        dietFocus: "ताजे फल, गुनगुने पानी का सेवन, दालें, और हरी मिर्च-हल्दी-अदरक का संतुलित इस्तेमाल जो इन्फ्लेमेशन घटाए।",
        activityRoutine: "हफ़्ते में ४ दिन ४५ मिनट की वॉक, कम से कम २ सत्र योग के पूर्ण अभ्यास के।",
        meals: {
          breakfast: "दूध संग भीगे हुए ओट्स और चिया बीज के साथ पपीते के टुकड़े।",
          lunch: "चना मसाला और टमाटर खीरा का बारीक कटा सलाद, साथ में बाजरे की रोटी।",
          snack: "कद्दू के बीजों से सजाया हुआ मलाई रहित मीठा दही।",
          dinner: "सोया चंक्स मसाला रोस्ट और उबले हुए गोभी मशरूम के टुकड़े।"
        }
      },
      {
        week: 3,
        keyGoal: "पाचन शक्ति की सुदृढ़ता",
        dietFocus: "रागी, बाजरा, जौ जैसे मोटे अनाजों का उपयोग बढ़ाएं। भोजन के अंत में जीरा पानी लें।",
        activityRoutine: "३ दिन मांसपेशियों के व्यायाम जैसे स्क्वैट्स, प्लैंक और हल्की स्ट्रेचिंग।",
        meals: {
          breakfast: "रागी और मूंग का चीला जिसमें बारीक कटा प्याज और पनीर भरा हो।",
          lunch: "हरी मटर, गाजर और क्विनोआ की नमकीन खिचड़ी जिसमें देसी घी का आधा चम्मच हो।",
          snack: "भुने चने और गुड़ का छोटा सा टुकड़ा।",
          dinner: "हरी पालक-पनीर की गरमा गरम सूजी वाली गाढ़ी करी, साथ में सिकी पतली चपाती।"
        }
      },
      {
        week: 4,
        keyGoal: "गहरी नींद और नई ऊर्जा",
        dietFocus: "सोने से ठीक ३ घंटे पहले हल्का भोजन लें। रात में गर्म हल्दी का दूध या दालचीनी की चाय पिएं।",
        activityRoutine: "रोजाना ३० मिनट का प्राणायाम (अनुलोम विलोम, भ्रामरी) और ध्यान का अभ्यास।",
        meals: {
          breakfast: "अंडे की सफेदी या पनीर का भुर्जी और उबली हुई सब्जियां।",
          lunch: "सोया रोल या टोफू टिक्का के साथ खीरे का रायता और पुदीना सलाद।",
          snack: "ताजा भुना हुआ मसाला मखाना (फॉक्स नट्स)।",
          dinner: "मूंग दाल और लौकी की हल्की स्वादिष्ट सब्जी, उबले हुए टोफू के साथ।"
        }
      }
    ] as PlanWeek[]
  },
  "6month": {
    title: "6-माह का चयापचय और जीवन फिट ब्लूप्रिंट",
    subtitle: "यह दीर्घकालिक स्वास्थ्य परिवर्तन ब्लूप्रिंट आपके मेटाबॉलिज्म को सुचारू बनाने, आंत की रक्षा करने और नई स्फूर्ति पैदा करने के लिए वैज्ञानिक रूप से तैयार किया गया है।",
    months: [
      {
        month: 1,
        phase: "मेटाबॉलिक रिसेट और बेसलाइन सुधार",
        dietStrategy: "सभी कृत्रिम मिठास, मैदे और पैकेज्ड नमकीन को छोड़ें। घर का बना शुद्ध भोजन, पर्याप्त अंकुरित अनाज और सलाद लें।",
        fitnessGoal: "सप्ताह में ३ बार मध्यम वॉक (LISS) और जोड़ों को सुचारू करने का सूक्ष्म व्यायाम करें।",
        habits: ["प्रतिदिन ३ लीटर शुद्ध जल का नियम बनाएं", "VitalPath में भोजन का लॉग रिकॉर्ड करें", "चाय-कॉफी में चीनी बंद करें"]
      },
      {
        month: 2,
        phase: "आंत बैक्टीरिया (Gut) का संवर्धन",
        dietStrategy: "प्रोबायोटिक्स जैसे घर का बना दही, लस्सी, कांजी और छाछ लें जो अवशोषण क्षमता बढ़ाते हैं और गैस/अपच घटाते हैं।",
        fitnessGoal: "कोर मसल्स की मजबूती और वजन के बिना किए जाने वाले बुनियादी व्यायाम।",
        habits: ["प्रतिदिन १ बार घर का ताजा दही या छाछ पीएं", "सोने से ४५ मिनट पहले मोबाइल टीवी बंद करें", "रोजाना ८,००० कदम चलने का संकल्प लें"]
      },
      {
        month: 3,
        phase: "ऊर्जा अनुकूलन और ग्लाइकोजन सुधार",
        dietStrategy: "व्यायाम करने से १.५ घंटे पहले जटिल कार्बोहाइड्रेट (जैसे भुने ओट्स, रागी, शकरकंद) लें। प्रोटीन अवश्य मिलाएं।",
        fitnessGoal: "सप्ताह में ३ बार रेजिस्टेंस (हल्का वजन या स्ट्रेंथ) व्यायाम की शुरुआत करें।",
        habits: ["व्यायाम के ४५ मिनट के भीतर प्रोटीन युक्त आहार लें", "शारीरिक मुद्रा (Posture) का ध्यान रखें", "प्रतिदिन ७ से ८ घंटे की गहरी नींद लें"]
      },
      {
        month: 4,
        phase: "शारीरिक ऊर्जा के लिए अच्छी वसा जोड़ना",
        dietStrategy: "अखरोट, भीगे बादाम, तिल के बीज, गाय का शुद्ध घी और अलसी को आहार में नियमित स्थान दें ताकि हार्मोन संतुलित रहें।",
        fitnessGoal: "स्ट्रेंथ ट्रेनिंग को बढ़ाकर सप्ताह में ४ बार करें और वजन बढ़ाएं।",
        habits: ["प्रोटीन और हेल्दी फैट्स के अनुपात की जांच करें", "रविवार के दिन प्रकृति के करीब कुछ समय बिताएं", "सुबह १० मिनट ध्यान और गहरी सांस लेने की क्रिया करें"]
      },
      {
        month: 5,
        phase: "कोशिका सुदृढ़ता (Mitochondrial Resiliency)",
        dietStrategy: "सप्ताह में ३ दिन कम से कम १४ घंटे का उपवास (Fasting Window) रखें, जिससे शरीर की कोशिकाएं स्वतः साफ (Autophagy) हो सकें।",
        fitnessGoal: "हफ़्ते में १ बार २० मिनट का तेज कार्डियो या उच्च गति व्यायाम (HIIT) जोड़ें।",
        habits: ["फास्टिंग की अवधि का कड़ाई से पालन करें", "सुबह ठंडे या ताजे पानी से स्नान का अभ्यास करें", "व्यायाम में सुधार और वजन उठाने की प्रगति लिखें"]
      },
      {
        month: 6,
        phase: "सर्वोच्च चयापचय और निरंतर जीवनशैली",
        dietStrategy: "ऋतु के अनुसार मौसमी फल-सब्जियों और मोटे अनाज का चक्र बनाएं जो शरीर को सदा ऊर्जावान रखे।",
        fitnessGoal: "शरीर के पूर्ण भार के योग आसन जैसे शीर्षासन, सर्वांगासन और स्ट्रेंथ व्यायाम का मिलाजुला सुंदर अभ्यास।",
        habits: ["जीवन भर स्वस्थ रहने के दैनिक नियम स्थापित करें", "प्रत्येक ६ महीने में रक्त जांच कराएं", "सुबह उठकर पहले ५ मिनट ईश्वर या जीवन के प्रति आभार व्यक्त करें"]
      }
    ] as PlanMonth[]
  }
};

// Chinese and Arabic data structures are similarly built with elegance.
export const PLAN_DETAILS_ZH = {
  "7day": {
    title: "7天极速代调激活计划",
    subtitle: "针对快节奏都市人群研发的微循环破冰方案，加速热能代谢，深层清理肠胃，焕发元气。",
    days: [
      {
        day: 1,
        focus: "膳食纤维与深度温水法",
        breakfast: "温热奇亚籽燕麦片配大杏仁，晨起温开水一杯。",
        lunch: "高蛋白杂豆菠菜沙拉配柠檬芝麻沙司。",
        snack: "脱脂希腊酸奶配一匙南瓜子实。",
        dinner: "香烤香草鸡胸肉（或清蒸豆腐）配少盐炒西兰花与芦笋。",
        exercise: "早间20分钟户外快速步行，深度呼吸空气。"
      },
      {
        day: 2,
        focus: "生热代谢突围",
        breakfast: "蛋白菠菜炒双蛋，配全麦面包一片。",
        lunch: "烤香豆腐串配五彩青椒与时令绿叶菜。",
        snack: "清新小黄瓜条配两勺牛油果鹰嘴豆泥。",
        dinner: "红扁豆大蒜浓汤配熟切鸡丝。",
        exercise: "25分钟持续中速慢跑或高效率快走。"
      },
      {
        day: 3,
        focus: "骨骼肌肉募集",
        breakfast: "低卡杏仁奶羽衣甘蓝蛋白粉果昔（加入亚麻籽）。",
        lunch: "地中海鹰嘴豆沙拉（加入小番茄、黄瓜块和冷榨橄榄油）。",
        snack: "原味生核桃仁一组（约5-7颗）。",
        dinner: "清脆姜汁鳕鱼柳（或少油煸炒小油菜配魔芋豆腐）与粗麦糙米饭。",
        exercise: "15分钟自重力量循环（深蹲、箭步蹲、俯卧撑组合）。"
      },
      {
        day: 4,
        focus: "温和抗炎排空",
        breakfast: "高蛋白Moong香煎素绿豆饼，蘸少许薄荷风味酱。",
        lunch: "五彩彩椒香爆素豆腐干或魔芋素毛肚。",
        snack: "低盐干酪（Cottage cheese）拌清甜红石榴子。",
        dinner: "法式扁豆拌红芝麻菜沙拉，撒低脂羊乳酪。",
        exercise: "20分钟全身深度抗阻拉伸或晨间基础瑜伽。"
      },
      {
        day: 5,
        focus: "糖原负载时钟",
        breakfast: "自制花生酱奇亚籽冷泡燕麦杯（加入火麻仁）。",
        lunch: "大蒜爆炒黑豆焖鲜褐菇配双色生菜心。",
        snack: "纯椰子水冲调乳清分离蛋白液（或植物蛋白）。",
        dinner: "黑胡椒柠檬烤三文鱼（或温拌天贝）配烤迷你胡萝卜。",
        exercise: "25分钟中低强度间歇训练（纵跳、提膝摆臂）。"
      },
      {
        day: 6,
        focus: "抗氧化大清洗",
        breakfast: "希腊酸奶拌蓝莓、红树莓及南瓜子仁。",
        lunch: "红藜麦时鲜毛豆粒沙拉，配少许嫩鸡肉块。",
        snack: "纯烘焙大杏仁10粒，无盐。",
        dinner: "黑椒红扁豆羽衣甘蓝热汤，佐配香蒜全麦酥片。",
        exercise: "30分钟低速放松慢跑或野外自行车骑行。"
      },
      {
        day: 7,
        focus: "四季平和归一",
        breakfast: "黑裸麦酸面包抹鳄梨泥配白水水煮蛋一颗。",
        lunch: "坚果泥脆底烤豆腐排，配高纤维罗马生菜丝。",
        snack: "鲜脆西芹条抹天然无糖花生酱半勺。",
        dinner: "柠檬清蒸虹鳟鱼（或香煎黑椒素火腿）配清新西葫芦面条。",
        exercise: "30分钟户外舒缓自然正念徒步。"
      }
    ] as PlanDay[]
  },
  "1month": {
    title: "1个月均衡温和膳食养生计划",
    subtitle: "基于东西方传统医学精髓，融合温补脾胃理念和草本茶饮，深度健脾胃、平稳元气状态。",
    weeks: [
      {
        week: 1,
        keyGoal: "脾胃梳理与健康油脂调理",
        dietFocus: "告别精制白糖及冷冻垃圾食品。烹调采用特级冷榨橄榄油或核桃油，补充谷物和水溶性膳食纤维。",
        activityRoutine: "每周3次30分钟常规负氧慢走，加2次简易核心恢复训练。",
        meals: {
          breakfast: "温热大麦粥，配一小碟香油鳄鱼果及少许豆腐干。",
          lunch: "红扁豆大米菜粥，水煮蛋一颗与清爽萝卜丝沙拉。",
          snack: "干炒大坚果、去核红枣肉与少许冻干无花果乾。",
          dinner: "温热清炒百合南瓜片，佐配清焙鳕鱼一块。"
        }
      },
      {
        week: 2,
        keyGoal: "气血运行与经络舒缓",
        dietFocus: "加入多脂深海鱼和富含Omega-3油脂。多加生姜、老蒜、鲜柠檬汁和深色芥蓝绿叶菜以润燥。",
        activityRoutine: "每周4次45分钟温和健走，配合2次全身柔韧拉伸或八段锦。",
        meals: {
          breakfast: "奇亚籽黑芝麻糊，加两勺燕麦奶和新鲜树莓叶。",
          lunch: "地中海罗勒风味鹰嘴豆泥饭，配清新西黄瓜片。",
          snack: "微甜希腊酸奶撒葵花籽仁。",
          dinner: "嫩蒸滑鸡片或少油慢煎鳕鱼排，配清炒芦笋。"
        }
      },
      {
        week: 3,
        keyGoal: "脾土运化与肌肉线条稳固",
        dietFocus: "多食荞麦、燕麦、糙薏米、黑米等粗粮大青豆，佐以温暖姜茶或陈皮熟普。忌食生冷。",
        activityRoutine: "每周3次专注于自重深蹲、平衡板锻炼与抗阻力训练。",
        meals: {
          breakfast: "少油香煎绿豆蔬菜饼卷薄片鲜干酪（Rollups）。",
          lunch: "藜麦清香毛豆红彩椒拌饭，淋入少许青椒汁和山茶油。",
          snack: "天然鹰嘴豆泥蘸香脆胡萝卜条。",
          dinner: "温润菠菜碎炒滑豆腐或什锦香菇焖素鸡豆腐。"
        }
      },
      {
        week: 4,
        keyGoal: "经络安神与助眠舒护",
        dietFocus: "晚餐至少在睡前3小时进食完毕。睡前饮用温润洋甘菊茶、熏衣草玫瑰茶、或温黄精调理饮。",
        activityRoutine: "每日晚间做30分钟放松冥想，配合5节深度缓慢呼吸经络舒缓。",
        meals: {
          breakfast: "香葱蔬菜蛋饼（仅用蛋白）配水炒生菜叶。",
          lunch: "干蒸瘦火鸡胸肉或黑橄榄香天贝，剥配罗马生菜包着吃。",
          snack: "烤五香咸豆粒或干培腰果仁数颗。",
          dinner: "清炖香菇冬瓜豆腐素清汤，加入少量裙带菜。"
        }
      }
    ] as PlanWeek[]
  },
  "6month": {
    title: "6个月高阶代谢激活与塑形方案",
    subtitle: "长效代谢重组与体能稳步跨越。打破阻力，科学唤醒身体天然净燃机制，筑造轻盈体态。",
    months: [
      {
        month: 1,
        phase: "基础代谢率重设与抗阻热身",
        dietStrategy: "坚决切断含糖碳酸饮料和精制甜点。专注于非加工瘦蛋白、深绿十字花科蔬菜及有机粗粮种子。",
        fitnessGoal: "每周进阶有氧恒速行进（LISS）3次，加肩胯大关节活动度练习。",
        habits: ["每日摄入3升洁净直饮温水", "在VitalPath软件中如实录入三餐", "禁止任何添加白砂糖制品"]
      },
      {
        month: 2,
        phase: "肠胃菌群微生态稳态修复",
        dietStrategy: "增加天然活菌摄入，饮用温鲜自制酸奶、自造水椰乳酵液或无盐酸菜，帮助抑制体内慢性炎性反应。",
        fitnessGoal: "腹背核心骨盆稳定性强化，学习自重多关节机动动作。",
        habits: ["每日必须吃一种富含活性益生菌食品", "睡前45分钟停止阅读任何蓝光屏幕", "每日至少累积8000步运动指数"]
      },
      {
        month: 3,
        phase: "细胞肌糖原负载调时管理",
        dietStrategy: "精准在肌肉训练前2小时吃复合粮食（糙米饭、黑米饼）。保证足额的优质蛋白在体内存留。",
        fitnessGoal: "开始阶段性自重与哑铃抗阻力锻炼，每周3次，持续负重递增。",
        habits: ["力量运动后45分钟内即时吃优质蛋白", "锻炼期间实时矫正身体姿态", "保持每日7至8小时恒定高质量深睡"]
      },
      {
        month: 4,
        phase: "不饱和脂类高效供给平衡",
        dietStrategy: "提高有益脂肪源（冷榨橄榄油、牛油果、原味果实、鸡蛋黄）改善胆固醇，平稳内分泌和耐力根基。",
        fitnessGoal: "将负重力量训练提升至每周4次，增加复合循环训练。",
        habits: ["统计每周不饱和脂肪同蛋白质摄入比例", "周六日进行一次长时间大自然户外吸氧行", "每日必有一段10分钟正念腹式深呼吸"]
      },
      {
        month: 5,
        phase: "线粒体细胞自噬再生激活",
        dietStrategy: "每周3-4天实行“14小时空腹、10小时进食”轻时间窗断食，激发溶酶体活性和抗衰老机制。",
        fitnessGoal: "每周加入1次高能间歇HIIT体能挑战，燃脂效能维持24小时。",
        habits: ["严格捍卫14小时空腹时间底线", "晨间淋浴末段进行15-30秒凉水激冷调节", "绘制肌肉多关节大力量递升曲线"]
      },
      {
        month: 6,
        phase: "长寿常态代谢与习惯平衡",
        dietStrategy: "结合时令及身体各要素制定符合自身的平衡餐盘比例。顺应寒暑，四季轮换 macros。",
        fitnessGoal: "经典自重核心大动作配合综合力量流练习，实现身体爆发力平衡。",
        habits: ["形成终身受用的自我营养监测体系", "进行半年一次的身体机能与血液评估", "早晨写下3件感谢的事，用感激净化神经系统"]
      }
    ] as PlanMonth[]
  }
};

export const PLAN_DETAILS_AR = {
  "7day": {
    title: "خطة الـ 7 أيام لتنشيط الأيض السريع",
    subtitle: "برنامج مكثف وقصير مصمم خصيصاً لتسريع معدل حرق السعرات الحرارية، تطهير الجهاز الهضمي، ورفع مستويات طاقة الجسم الحيوية.",
    days: [
      {
        day: 1,
        focus: "الألياف والترطيب العميق",
        breakfast: "دوفان دافئ بالماء وبذور الشيا واللوز مع كوب ماء فاتر بالليمون.",
        lunch: "سلطة البقوليات الغنية بالبروتين والخضار الصغير مع تتبيلة زيت السمسم الطازج والليمون.",
        snack: "زبادي يوناني قليل الدسم مزين ببذور اليقطين الرائعة.",
        dinner: "صدر دجاج مشوي بالأعشاب والليمون (أو توفو على البخار) مع هليون وبروكلي مسلوق.",
        exercise: "مشي نشط بالهواء الطلق في الصباح الباكر لمدة 20 دقيقة."
      },
      {
        day: 2,
        focus: "تحفيز الحرق والنشاط",
        breakfast: "مخفوق بياض البيض والسبانخ السريع مع شريحة خبز حنطة كاملة.",
        lunch: "مشاوي جبنة الماعز أو التوفو العضوي مع قرون الفلفل الملون والأوراق الخضراء الداكنة.",
        snack: "خيار طازج مع ملعقتين من الحمص البلدي بزيت الزيتون.",
        dinner: "شوربة العدس الدافئة والمقوية مع الكرفس المقطع وقطع لحم الحبش المسلوق.",
        exercise: "هرولة خفيفة بمتوسط 25 دقيقة أو مشي سريع متواصل."
      },
      {
        day: 3,
        focus: "تفعيل وتحفيز العضلات",
        breakfast: "مخفوق بروتيني طازج بحليب اللوز بدون سكر مع بذر الكتان الطازج المطحون.",
        lunch: "سلطة الحمص المتوسطية المنعشة مع طماطم كرزية وخيار طازج متبلة بزيت زيتون صافي.",
        snack: "حفنة صغيرة من حبات الجوز النيئ والمغذي.",
        dinner: "سمكة القد المخبوزة في الفرن بخلطة الليمون والزنجبيل (أو توفو مقلي خفيف بالثوم) برز أسمر.",
        exercise: "رياضات وقائية وحركات قوة بوزن الجسم لمدة 15 دقيقة."
      },
      {
        day: 4,
        focus: "التطهير الطبيعي اللطيف",
        breakfast: "فطير العدس اللذيذ والغني بالبروتين (Moong Chilla) مع صلصة النعناع والليمون.",
        lunch: "توفو مشوي أو قطع تمبيه طازجة بالثوم مع الهليون المطهو ببطء.",
        snack: "كعبات من الجبن القريش الصحي مع حبات الرمان الطازجة اليافعة.",
        dinner: "سلطة العدس الأخضر الفاخرة مع الجرجير وقليل من جبن الماعز الفيتا خفيف الدهون.",
        exercise: "تمارين استرخاء واستطالة عميقة لطيفة لمدة 20 دقيقة."
      },
      {
        day: 5,
        focus: "تخزين الطاقة والتوازن",
        breakfast: "شوفان منقوع طوال الليل بذور شيا وقنب مع ملعقة زبدة الفول السوداني الطبيعية.",
        lunch: "فول أسود مشوح بالثوم الطازج والبهارات المتكاملة والسبانخ الطرية.",
        snack: "مخفوق بروتين نباتي مخلوط بماء جوز الهند الطبيعي والنظيف.",
        dinner: "سمك السلمون الطازج بالفرن مع أعواد الروز ماري والجزر الصغير المحمص بالفرن.",
        exercise: "تمارين كارديو هوائية لحرق الدهون ببطء ومصداقية لمدة 25 دقيقة."
      },
      {
        day: 6,
        focus: "حمام مضادات الأكسدة",
        breakfast: "زبادي يوناني منعش مع التوت البري الأزرق، الفراولة، وقبضة صغيرة من بذور القرع.",
        lunch: "سلطة الكينوا العضوية مع حبوب الإيدامامي الطازجة، الطماطم الكرزية، وشرائح دجاج مسلوق.",
        snack: "نحو 10 حبات من اللوز النيئ غير المملح.",
        dinner: "حساء العدس والسبانخ الدافئ مع شرائح مقرمشة من خبز الحنطة الكاملة بطعم الثوم والزعتر.",
        exercise: "30 دقيقة هرولة خفيفة بالمنتزه أو ركوب الدراجة في جو هادئ ومسترخٍ."
      },
      {
        day: 7,
        focus: "التكامل والراحة البدنية",
        breakfast: "شريحة خبز حنطة بقمح كامل محمص مدهون بقطع الأفوكادو اليافعة مع بيضة مسلوقة.",
        lunch: "جبن الجريش وسوتيه الخضار باللوز والسمسم مع سلطة طازجة عريضة.",
        snack: "أعواد الكرفس المنعشة مدهونة بنصف ملعقة زبدة الفول السوداني الأصلية.",
        dinner: "سمك تروت مشوي بالفرن بأعشاب الزعتر البري مع خيوط الكوسا الطازجة (كوسا نودلز).",
        exercise: "مشي مشرق ومتأمل بصحبة الطبيعة الهادئة لمدة 30 دقيقة."
      }
    ] as PlanDay[]
  },
  "1month": {
    title: "خطة الحمية والويلنس المتوسطي (طرق العيش الأصيلة)",
    subtitle: "برنامج شامل مدته 4 أسابيع يستحضر الثقافة الغذائية العريقة لبلدان حوض المتوسط للحد من الالتهاب وتقوية المناعة.",
    weeks: [
      {
        week: 1,
        keyGoal: "ترميم بيئة الأمعاء والدهون النافعة",
        dietFocus: "الامتناع التام عن السكريات المصنعة والدقيق الأبيض. استخدام زيت الزيتون في كافة الوجبات وزيادة الألياف.",
        activityRoutine: "3 جولات مشي سريع (30 دقيقة) وعمل جولات لتقوية عضلات الجذع مرتين بالأسبوع.",
        meals: {
          breakfast: "شرائح أفوكادو، طحينة سمسم وزيتون مفروم مع جبن قريش بخبز الحنطة السوداء.",
          lunch: "شوربة العدس الدافئة مع بيضة مسلوقة وسلطة الخضروات الورقية الخضراء المنعشة.",
          snack: "مخلوط من اللوز النيئ، الجوز وأقراص التين المجفف الغني بالمعادن.",
          dinner: "خضار الصيف المشوية بالفرن مع سمكة القد بعبق الروز ماري والليمون."
        }
      },
      {
        week: 2,
        keyGoal: "سلامة جدران الشرايين والتحمل اللطيف",
        dietFocus: "تضمين الأسماك والدهون الغنية بأوميغا-3 مرتين بالأسبوع، الإكثار من الثوم الطازج والليمون والخضار الداكن.",
        activityRoutine: "4 جولات مشي بمتوسط 45 دقيقة مع ممارسة جلستين يوغا لمرونة وتخفيف توتر العضلات.",
        meals: {
          breakfast: "شوفان مع بذور الشيا الطرية بحليب اللوز الخالي وتوت العليق الطازج الشافي.",
          lunch: "سلطة الحمص وسلطة الخيار بالزبادي والنعناع البارد (تزاتزيكي).",
          snack: "كوب زبادي يوناني غني بالبروتين مزين ببذور القرع المحمصة طبيعياً.",
          dinner: "لحم دجاج مقطع مسلوق بالأعشاب أو سمكة التيلابيا الطازجة بالفرن مع أعواد الهليون."
        }
      },
      {
        week: 3,
        keyGoal: "تنشيط وتحفيز الهضم وبناء القوة والمفاصل",
        dietFocus: "بذور الذرة الكاملة والشعير والدخن العتيق والعدس، واستخدام منقوع الأعشاب الساخنة والشاي الأخضر.",
        activityRoutine: "3 تمارين كبرى بالتركيز على الارتكاز (البلانك، ال squats بوزن البدن، وتقوية الهيكل).",
        meals: {
          breakfast: "فطير العدس الغني بالخضار والبهارات مع لفة كعبات الجبن البلدي الخفيف الطازج.",
          lunch: "تبولة الكينوا الفاخرة والإيدامامي النظيفة بعصير الليمون والزعتر وزيت زيتون صافي.",
          snack: "حمسة حمص بلدي طازجة مع قطع الجزر والكرفس الباردة.",
          dinner: "غمسة السبانخ وجبنة الجريش الدافئة بالأعشاب مع مقرمشات الحنطة الصحية بالقمح الكامل."
        }
      },
      {
        week: 4,
        keyGoal: "الراحة الخلوية الشاملة والنوم العميق الشافي",
        dietFocus: "وجبات عشاء خفيفة ومبكرة بـ 3 ساعات قبل النوم كقانون ثابت. شرب البابونج أو منقوع الخزامى الدافئ.",
        activityRoutine: "استرخاء واستطالة عضلية لمدة 30 دقيقة يومياً قبل النوم، مع ممارسة اليوغا نيدرا للتأمل العالي.",
        meals: {
          breakfast: "بيض فرتاتا مسلوق بالفرن مع أوراق الكيل الخضراء والزعتر البري.",
          lunch: "صدر الحبش المطهو بلطف أو تيمبيه مشوح مغلف بأوراق الخس الروماني الطازجة.",
          snack: "حبوب حمص محمصة طازجة بعبق الفلفل الحلو والأعشاب البرية الأصلية.",
          dinner: "شوربة مرق الخضار الصافية بقطع التوفو الطبيعي المشوح بطعم كلاسيكي."
        }
      }
    ] as PlanWeek[]
  },
  "6month": {
    title: "خطة ترميم وإعادة بناء الأيض وتنشيط الجسم (6 أشهر)",
    subtitle: "رحلة تحول جسدية عميقة ومدروسة علمياً مصممة لبناء محرك أيض صحي قوي يعينك على الحياة بنشاط دائم طيلة العمر.",
    months: [
      {
        month: 1,
        phase: "ضبط وتعريف العتبة الأيضية الأساسية",
        dietStrategy: "الامتناع التام والحازم عن السكريات المكررة والحلويات والمشروبات الغازية. اعتماد البروتين النظيف والخضار الطازج المورق.",
        fitnessGoal: "تمارين مشي متواصل ونشط (LISS) 3 مرات بالأسبوع لرفع طاقة الرئتين، مع ممارسة تمارين للمفاصل ومرونتها.",
        habits: ["شرب 3 لتر مياه نقية ودافئة يومياً كفكرة محورية", "تسجيل الوجبات بانتظام في VitalPath", "الامتناع الكامل عن السكريات البيضاء"]
      },
      {
        month: 2,
        phase: "العناية الفائقة بميكروبيوم الأمعاء والحد من الالتهاب",
        dietStrategy: "تنشيط البكتيريا النافعة بواسطة الأغذية المخمرة الطبيعية (زبادي الماعز، الكفير، المخللات الطبيعية) لتهدئة تهيج الجهاز الهضمي.",
        fitnessGoal: "تمارين لتقوية وتقويم منطقة عضلات أسفل الظهر والوسط بالإضافة إلى حركات طبيعية متكاملة.",
        habits: ["تناول عنصر واحد من الأطعمة المخمرة يومياً", "إطفاء كافة الأجهزة والوقاية من الشاشات بـ 45 دقيقة قبل النوم", "تحقيق 8000 خطوة كمستوى نشاط يومي ثابت"]
      },
      {
        month: 3,
        phase: "التنظيم والتحكم بمخازن جليكوجين العضلات",
        dietStrategy: "تناول الكربوهيدرات المعقدة (الأرز البني، الكينوا العضوية) قبل ساعتين من موعد ممارسة الرياضة لدعم الطاقة بالخلية.",
        fitnessGoal: "البدء المنظم في تمارين مقاومة ووزن أو استخدام دمبل خفيف 3 مرات في الأسبوع لتقوية الهيكل والبدن.",
        habits: ["أخذ حصة من البروتين النظيف في الـ 45 دقيقة التالية للرياضة", "الانتباه والمحافظة على طرقة وقوف وجلوس سليمة للمفاصل", "النوم لمدة 7 إلى 8 ساعات متواصلة بالليل"]
      },
      {
        month: 4,
        phase: "صحة ونقاء هرمونات البدن والدهون الطبيعية",
        dietStrategy: "الاعتماد على الدهون النافعة عالية القيمة (الأفوكادو، المكسرات النيئة، زيت الزيتون، بيض بلدي، سمسم) للتوازن الهرموني.",
        fitnessGoal: "زيادة حجم وصعوبة تمارين المقاومة والقوة لتصبح 4 مرات أسبوعياً.",
        habits: ["متابعة نسبة استهلاك الدهون السليمة مقابل البروتينات النظيفة", "جولة أسبوعية في هدوء الحدائق لامتصاص الأكسجين والتأمل", "ممارسة التنفس البطني العميق الهادئ لمدة 10 دقائق"]
      },
      {
        month: 5,
        phase: "تنشيط وتطهير الخلايا الذاتي (Mitoshield)",
        dietStrategy: "اتباع الصيام المتقطع (14 ساعة صيام و10 ساعات غداء) لمدة 3 إلى 4 أيام بالأسبوع لتنظيف الخلايا من الفضلات وزيادة المقاومة.",
        fitnessGoal: "إضافة جلسة واحدة أسبوعياً من تمارين الكارديو عالي الكثافة (HIIT) لمدة 20 دقيقة لتفجير حرق الدهون.",
        habits: ["الالتزام الكامل بحدود ساعات الصيام", "دوش سريع بماء بارد في نهاية وقت الاستحمام الصباحي للنشاط العصبي", "تسجيل التطور في رفع الأوزان وحركات اللياقة"]
      },
      {
        month: 6,
        phase: "استقرار وثبات الأيض السليم طوال العمر",
        dietStrategy: "تثبيت نسب غداء بديهية وسليمة تناسب طاقات بدنك وتركيبك الخاص. الحفاظ على توازن الـ (Macros) مع حر الصيف وبرد الشتاء.",
        fitnessGoal: "حركات قوة شاملة للجذع والجسم مع تمارين كاليسثينكس منسقة ورشيقة للجسم.",
        habits: ["بناء عادات حياة صحية ورشاقة مستدامة طيلة العمر", "إجراء فحص دم شامل كل ستة أشهر لمراقبة الصحة والنشاط", "كتابة 3 أشياء تحمد الله عليها صباحاً لتصفية العقل والروح"]
      }
    ] as PlanMonth[]
  }
};
