export interface FoodIngredient {
  name: string;
  portionSize: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fats: number;    // in grams
}

export interface ScannedMeal {
  id: string;
  itemName: string;
  items: FoodIngredient[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  description: string;
  scannedAt: string; // ISO String
  imageThumbnail?: string; // base64 string
}

export interface DailyLog {
  id: string;
  timestamp: string; // ISO String
  itemName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface ActivePlan {
  id: "7day" | "1month" | "6month";
  title: string;
  startDate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  targetCalories: number;
  dietPreference: string;
  createdAt: string;
}

export interface UserAccount {
  name: string;
  email: string;
  passwordHash: string; // Simplified for client-side verification
  targetCalories: number;
  dietPreference: string;
  createdAt: string;
}

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
];
