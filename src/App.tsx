import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ScannedMeal, DailyLog, ActivePlan } from './types';
import { LanguageSelector } from './components/LanguageSelector';
import { MealScanner } from './components/MealScanner';
import { DailyTracker } from './components/DailyTracker';
import { FrequentMeals } from './components/FrequentMeals';
import { HealthPlans } from './components/HealthPlans';
import { TrendsChart } from './components/TrendsChart';
import { TermsModal } from './components/TermsModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ContactForm } from './components/ContactForm';
import { WeeklyReportModal } from './components/WeeklyReportModal';
import { ContactModal } from './components/ContactModal';
import { 
  Heart, 
  Activity, 
  Trash2, 
  LayoutDashboard, 
  BookOpen, 
  Bookmark, 
  Settings, 
  Sparkles,
  Info,
  ShieldCheck,
  User,
  Flame,
  Check,
  Award,
  MessageSquare,
  ArrowRight,
  Lock
} from 'lucide-react';

export default function App() {
  const { t, i18n } = useTranslation();
  
  // Tabs: 'dashboard' | 'plans' | 'frequent' | 'settings'
  const [activeTab, setActiveTab ] = useState<'dashboard' | 'plans' | 'frequent' | 'settings'>('dashboard');

  // Modal open states
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Metabolic Focus States (No Sign Up required)
  const [targetCalories, setTargetCalories] = useState<number>(2000);
  const [dietPreference, setDietPreference] = useState<string>('Balanced');

  // Persistence State
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [frequentMeals, setFrequentMeals] = useState<Omit<ScannedMeal, 'id' | 'scannedAt'>[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>("7day");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  // RTL determination
  const isRtl = i18n.language === 'ar' || i18n.language?.startsWith('ar');

  // Load from local storage
  useEffect(() => {
    try {
      const savedCalories = localStorage.getItem('vitalpath_target_calories');
      if (savedCalories) setTargetCalories(Number(savedCalories));

      const savedDiet = localStorage.getItem('vitalpath_diet_preference');
      if (savedDiet) setDietPreference(savedDiet);

      const savedLogs = localStorage.getItem('vitalpath_daily_logs');
      if (savedLogs) setDailyLogs(JSON.parse(savedLogs));

      const savedFreq = localStorage.getItem('vitalpath_frequent_meals');
      if (savedFreq) setFrequentMeals(JSON.parse(savedFreq));

      const savedPlan = localStorage.getItem('vitalpath_active_plan');
      if (savedPlan) setActivePlanId(savedPlan);
    } catch (e) {
      console.error("Failed loading persistent states from LocalStorage", e);
    }
  }, []);

  // Update localStorage helper
  const updateLogs = (newLogs: DailyLog[]) => {
    setDailyLogs(newLogs);
    localStorage.setItem('vitalpath_daily_logs', JSON.stringify(newLogs));
  };

  const updateFrequent = (newFreq: Omit<ScannedMeal, 'id' | 'scannedAt'>[]) => {
    setFrequentMeals(newFreq);
    localStorage.setItem('vitalpath_frequent_meals', JSON.stringify(newFreq));
  };

  const updateActivePlan = (planId: "7day" | "1month" | "6month" | "custom") => {
    setActivePlanId(planId);
    localStorage.setItem('vitalpath_active_plan', planId);
  };

  // Add meal result to calorie tracking
  const handleAddMealToTracker = (meal: Omit<ScannedMeal, 'id' | 'scannedAt'>) => {
    const newLog: DailyLog = {
      id: Math.random().toString(),
      timestamp: new Date().toISOString(),
      itemName: meal.itemName,
      calories: meal.totalCalories,
      protein: meal.totalProtein,
      carbs: meal.totalCarbs,
      fats: meal.totalFats
    };
    updateLogs([newLog, ...dailyLogs]);
  };

  // Save meal to Favorites repository
  const handleSaveToFrequent = (meal: Omit<ScannedMeal, 'id' | 'scannedAt'>) => {
    // Prevent duplicate entries by name matches
    if (!frequentMeals.some(m => m.itemName.toLowerCase() === meal.itemName.toLowerCase())) {
      updateFrequent([meal, ...frequentMeals]);
    }
  };

  const handleRemoveLog = (id: string) => {
    updateLogs(dailyLogs.filter(log => log.id !== id));
  };

  const handleDeleteFrequent = (index: number) => {
    const copy = [...frequentMeals];
    copy.splice(index, 1);
    updateFrequent(copy);
  };

  const handleClearLogs = () => {
    updateLogs([]);
  };

  const handleResetAllData = () => {
    localStorage.removeItem('vitalpath_daily_logs');
    localStorage.removeItem('vitalpath_frequent_meals');
    localStorage.removeItem('vitalpath_active_plan');
    setDailyLogs([]);
    setFrequentMeals([]);
    setActivePlanId("7day");
    alert(t('allDeleted'));
  };

  // Calculate global summary counts
  const totalCaloriesToday = dailyLogs.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans transition-all selection:bg-indigo-900/40"
    >
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 p-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-900/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">{t('appName')}</span>
                <span className="text-[10px] font-black text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                  SaaS Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">{t('appTagline')}</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              id={`nav-tab-dashboard`}
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border-transparent'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t('navDashboard')}</span>
            </button>

            <button
              id={`nav-tab-plans`}
              onClick={() => setActiveTab('plans')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab === 'plans'
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border-transparent'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('navPlans')}</span>
            </button>

            <button
              id={`nav-tab-frequent`}
              onClick={() => setActiveTab('frequent')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab === 'frequent'
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border-transparent'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{t('navFrequent')}</span>
            </button>

            <button
              id={`nav-tab-settings`}
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab === 'settings'
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border-transparent'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t('navSettings')}</span>
            </button>
          </nav>

          {/* Language selection block */}
          <div className="flex items-center gap-2">
            <button
              id="weekly-progress-report-trigger"
              onClick={() => setIsReportOpen(true)}
              className="px-3 py-2 bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer active:scale-[0.98]"
            >
              <Award className="w-3.5 h-3.5 text-indigo-100" />
              <span>Weekly Report</span>
            </button>

            <LanguageSelector />
          </div>

        </div>
      </header>

      {/* Main Body container */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Dynamic Warning Alert about RTL orientation for Arabic users */}
        {isRtl && (
          <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 rounded-2xl text-xs flex items-center gap-2 font-sans">
            <Info className="w-4 h-4 shrink-0" />
            <span>{t('arabicWarning')}</span>
          </div>
        )}

        {/* Dashboard: active plan indicator */}
        {activePlanId && (
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-5 flex flex-wrap justify-between items-center gap-4 relative overflow-hidden shadow-lg shadow-black/40">
            <div className="space-y-1.5 z-10 text-left">
              <span className="text-[9px] font-black tracking-wider uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full inline-block">
                {t('activePlanLabel')}
              </span>
              <h1 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                {activePlanId === "custom"
                  ? (() => {
                      try {
                        const saved = localStorage.getItem('vitalpath_custom_plan');
                        if (saved) {
                          const parsed = JSON.parse(saved);
                          if (parsed && parsed.title) return parsed.title;
                        }
                      } catch (e) {}
                      return "My Custom Wellness Quest";
                    })()
                  : (activePlanId === "7day" ? t('plan_7day_title') : 
                     activePlanId === "1month" ? t('plan_1month_title') : 
                     t('plan_6month_title'))}
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 max-w-[550px] leading-relaxed">
                Active program aligned with your culture. Scan ingredients daily to stay perfectly computed.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 backdrop-blur-md px-4 py-2.5 rounded-xl text-center shrink-0 z-10 font-mono">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{t('calories')} today</p>
              <p className="text-base font-black text-indigo-400 mt-0.5">{totalCaloriesToday} kcal</p>
            </div>

            {/* Decorative layout design context */}
            <div className="absolute right-0 bottom-0 translate-y-6 translate-x-6 text-white/[0.02] pointer-events-none">
              <Sparkles className="w-32 h-32" />
            </div>
          </div>
        )}

        {/* Toggles between Tabs */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MealScanner 
                onAddMealToTracker={handleAddMealToTracker} 
                onSaveToFrequent={handleSaveToFrequent} 
                frequentMeals={frequentMeals}
                dailyLogs={dailyLogs}
              />
              <TrendsChart logs={dailyLogs} calorieBudget={targetCalories} />
            </div>
            <div className="space-y-6">
              <DailyTracker 
                logs={dailyLogs} 
                onRemoveLog={handleRemoveLog} 
                onClearLogs={handleClearLogs} 
                calorieBudget={targetCalories}
              />
              
              {/* Premium Support / Contact Us Card */}
              <div id="premium-dashboard-help-card" className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-md shadow-black/20 text-left">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/[0.03] rounded-full blur-2xl pointer-events-none" />
                <div className="flex gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 shrink-0 h-9 w-9 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-indigo-400 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                      Need Help or Custom Metrics?
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      Our Gemini AI Support Agent can analyze your custom targets, switch diets, translate languages, or clean logs instantly. File a quick ticket!
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full py-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-indigo-300 font-extrabold uppercase tracking-wider text-[10px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <span>Contact Support Us</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <HealthPlans 
            onSelectPlan={updateActivePlan} 
            activePlanId={activePlanId} 
            onLogMeal={handleAddMealToTracker}
          />
        )}

        {activeTab === 'frequent' && (
          <FrequentMeals 
            meals={frequentMeals} 
            onLogMeal={handleAddMealToTracker}
            onDeleteFrequent={handleDeleteFrequent} 
          />
        )}

        {activeTab === 'settings' && (
          <div id="settings-pannel-view" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-md shadow-black/20 transition-all space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white tracking-tight font-sans">
                {t('settingsTitle')}
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Manage local SaaS parameters, configuration, and developer support
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - System Preferences (col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Interactive Metabolic Targets Configurator */}
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        Configure Metabolic Targets
                      </h3>
                      <p className="text-[10px] text-slate-500">Tune calorie limits and dietary styles instantly</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Daily Calorie Goal</span>
                        <span className="font-extrabold text-indigo-400 font-mono">{targetCalories} kcal</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                        <input
                          type="range"
                          min={1200}
                          max={4500}
                          step={50}
                          value={targetCalories}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setTargetCalories(val);
                            localStorage.setItem('vitalpath_target_calories', String(val));
                          }}
                          className="w-full accent-indigo-500 bg-slate-900 rounded-lg cursor-pointer h-1.5"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs text-slate-400 block">Diet Focus / Preference</span>
                      <div className="grid grid-cols-2 gap-2">
                        {['Balanced', 'Keto', 'Vegan', 'High-Protein'].map((diet) => (
                          <button
                            type="button"
                            key={diet}
                            onClick={() => {
                              setDietPreference(diet);
                              localStorage.setItem('vitalpath_diet_preference', diet);
                            }}
                            className={`p-2 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                              dietPreference === diet
                                ? 'bg-indigo-600/20 border-indigo-500/80 text-white font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-xxs">{diet}</span>
                            {dietPreference === diet && (
                              <span className="p-0.5 bg-indigo-500 rounded-full text-white">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                    {t('settingsLanguage')}
                  </label>
                  <LanguageSelector />
                  <p className="text-xxs text-slate-500 font-sans">Select language dynamically. Interface translates instantly.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                    {t('settingsRegion')}
                  </label>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Auto Cultural Sensitivity Alignment</span>
                    <span className="font-extrabold text-indigo-400 font-sans uppercase">On</span>
                  </div>
                  <p className="text-xxs text-slate-500 font-sans">Automatically customizes diet menus and exercise guidelines based on system rendering language.</p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-slate-300 mb-2">{t('settingsReset')}</h3>
                  <motion.button
                    id="reset-all-system-data-btn"
                    onClick={handleResetAllData}
                    whileHover={{ 
                      scale: [1, 1.03, 0.99, 1.03, 1],
                      boxShadow: [
                        "0 0 0px rgba(239, 68, 68, 0)",
                        "0 0 12px rgba(239, 68, 68, 0.4)",
                        "0 0 4px rgba(239, 68, 68, 0.1)",
                        "0 0 12px rgba(239, 68, 68, 0.4)",
                        "0 0 0px rgba(239, 68, 68, 0)"
                      ]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                    className="px-4 py-2.5 bg-red-950/20 text-red-400 hover:bg-red-950/40 border border-red-900/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Wipe All Cached Food Scanning Records</span>
                  </motion.button>
                  <p className="text-xxs text-slate-500 mt-2 font-sans">Warning: This operation will permanently erase your calorie history and frequent meals library.</p>
                </div>
              </div>

              {/* Right Column - Help & Support Contact Form (col-span-7) */}
              <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-6 lg:pt-0 lg:pl-8">
                <ContactForm 
                  currentCalories={targetCalories}
                  onUpdateCalories={(kcal) => {
                    setTargetCalories(kcal);
                    localStorage.setItem('vitalpath_target_calories', String(kcal));
                  }}
                  currentDiet={dietPreference}
                  onUpdateDiet={(diet) => {
                    setDietPreference(diet);
                    localStorage.setItem('vitalpath_diet_preference', diet);
                  }}
                  onClearLogs={handleClearLogs}
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Styled Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-bold text-slate-400">{t('appName')} AI Companion</span>
            <span>© 2026</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
            <a href="#dashboard" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} className="hover:text-slate-200 text-slate-450 transition-colors"> Calorie Panel </a>
            <a href="#plans" onClick={(e) => { e.preventDefault(); setActiveTab('plans'); }} className="hover:text-slate-200 text-slate-450 transition-colors"> Nutrition </a>
            <a href="#frequent" onClick={(e) => { e.preventDefault(); setActiveTab('frequent'); }} className="hover:text-slate-200 text-slate-450 transition-colors"> Saved Plates </a>
            <span className="text-slate-800 hidden sm:inline" aria-hidden="true">|</span>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="hover:text-indigo-400 text-slate-400 cursor-pointer transition-colors border-none bg-transparent p-0 flex items-center gap-1 font-semibold focus:outline-none"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span>Contact Us</span>
            </button>
            <span className="text-slate-800 hidden sm:inline" aria-hidden="true">|</span>
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-indigo-400 text-slate-400 cursor-pointer transition-colors border-none bg-transparent p-0 flex items-center gap-1 font-semibold focus:outline-none"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Terms & Conditions</span>
            </button>
            <span className="text-slate-800 hidden sm:inline" aria-hidden="true">|</span>
            <button 
              id="privacy-policy-trigger"
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-indigo-400 text-slate-400 cursor-pointer transition-colors border-none bg-transparent p-0 flex items-center gap-1 font-semibold focus:outline-none"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Privacy Policy</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Compliance / Legal Terms & Conditions Modal Overlay */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Security / Privacy Policy Modal Overlay */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      {/* Weekly Progress Report Modal Overlay */}
      <WeeklyReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        logs={dailyLogs}
        targetCalories={targetCalories}
        dietPreference={dietPreference}
      />

      {/* Premium Support / Helpdesk Modal Overlay */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        currentCalories={targetCalories}
        onUpdateCalories={(kcal) => {
          setTargetCalories(kcal);
          localStorage.setItem('vitalpath_target_calories', String(kcal));
        }}
        currentDiet={dietPreference}
        onUpdateDiet={(diet) => {
          setDietPreference(diet);
          localStorage.setItem('vitalpath_diet_preference', diet);
        }}
        onClearLogs={handleClearLogs}
      />
    </div>
  );
}
