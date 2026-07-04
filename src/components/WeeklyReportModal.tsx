import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  X, Calendar, Sparkles, TrendingUp, Award, AlertCircle, 
  CheckCircle2, RefreshCw, ChevronRight, Activity, Flame, 
  Cpu, Apple, Compass, Percent, Dumbbell
} from 'lucide-react';
import { DailyLog } from '../types';

interface WeeklyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: DailyLog[];
  targetCalories: number;
  dietPreference: string;
}

interface AICritique {
  score: number;
  summary: string;
  strengths: string[];
  opportunities: string[];
  nutritionalInsights: string;
}

export const WeeklyReportModal: React.FC<WeeklyReportModalProps> = ({
  isOpen,
  onClose,
  logs,
  targetCalories,
  dietPreference
}) => {
  const { t, i18n } = useTranslation();
  const [aiCritique, setAICritique] = useState<AICritique | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive standard targets based on diet preference
  // Macros in percentage: Protein, Carbs, Fats
  const macroTargets = React.useMemo(() => {
    switch (dietPreference) {
      case 'Keto':
        return { protein: 20, carbs: 5, fats: 75 };
      case 'Vegan':
        return { protein: 15, carbs: 60, fats: 25 };
      case 'High-Protein':
        return { protein: 40, carbs: 35, fats: 25 };
      case 'Balanced':
      default:
        return { protein: 30, carbs: 45, fats: 25 };
    }
  }, [dietPreference]);

  // Aggregate past 7 days logs
  const analytics = React.useMemo(() => {
    const today = new Date();
    const last7DaysLogs = logs.filter(log => {
      try {
        const logDate = new Date(log.timestamp);
        const diffTime = Math.abs(today.getTime() - logDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      } catch (e) {
        return false;
      }
    });

    const totalCals = last7DaysLogs.reduce((sum, item) => sum + (item.calories || 0), 0);
    const totalProtein = last7DaysLogs.reduce((sum, item) => sum + (item.protein || 0), 0);
    const totalCarbs = last7DaysLogs.reduce((sum, item) => sum + (item.carbs || 0), 0);
    const totalFats = last7DaysLogs.reduce((sum, item) => sum + (item.fats || 0), 0);

    const loggedDaysCount = new Set(last7DaysLogs.map(log => {
      try {
        return new Date(log.timestamp).toISOString().split('T')[0];
      } catch {
        return '';
      }
    }).filter(d => d !== '')).size;

    const avgCalories = loggedDaysCount > 0 ? Math.round(totalCals / loggedDaysCount) : 0;
    const avgProtein = loggedDaysCount > 0 ? Math.round(totalProtein / loggedDaysCount) : 0;
    const avgCarbs = loggedDaysCount > 0 ? Math.round(totalCarbs / loggedDaysCount) : 0;
    const avgFats = loggedDaysCount > 0 ? Math.round(totalFats / loggedDaysCount) : 0;

    // Estimate actual gram ratios
    const totalGrams = avgProtein + avgCarbs + avgFats;
    const actualProteinPct = totalGrams > 0 ? Math.round((avgProtein / totalGrams) * 100) : 0;
    const actualCarbsPct = totalGrams > 0 ? Math.round((avgCarbs / totalGrams) * 100) : 0;
    const actualFatsPct = totalGrams > 0 ? Math.round((avgFats / totalGrams) * 100) : 0;

    // Days target adherence (+/- 15% range)
    // Group logs by day to calculate days hitting budget
    const dayCaloriesMap: Record<string, number> = {};
    last7DaysLogs.forEach(log => {
      try {
        const dateStr = new Date(log.timestamp).toISOString().split('T')[0];
        dayCaloriesMap[dateStr] = (dayCaloriesMap[dateStr] || 0) + log.calories;
      } catch {}
    });

    const daysWithinRange = Object.values(dayCaloriesMap).filter(cals => {
      const lower = targetCalories * 0.85;
      const upper = targetCalories * 1.15;
      return cals >= lower && cals <= upper;
    }).length;

    return {
      loggedDaysCount,
      totalCals,
      avgCalories,
      avgProtein,
      avgCarbs,
      avgFats,
      actualProteinPct,
      actualCarbsPct,
      actualFatsPct,
      daysWithinRange,
      adherencePercentage: loggedDaysCount > 0 ? Math.round((daysWithinRange / loggedDaysCount) * 100) : 0
    };
  }, [logs, targetCalories]);

  const generateCritique = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai-weekly-critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logs,
          targetCalories,
          dietPreference,
          currentLang: i18n.language || 'en'
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to retrieve AI analysis.");
      }

      const data = await response.json();
      setAICritique(data);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unexpected error occurred during AI analysis.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        id="weekly-report-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        id="weekly-report-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 font-sans text-left"
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 px-6 py-5 border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Award className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Weekly Metabolic Progress Report
              </h3>
              <p className="text-[11px] text-slate-300">
                Nutrient balances & targets computed over the past 7 days
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-6">
          
          {/* Main comparative row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Average Calorie Meter (col-span-7) */}
            <div className="md:col-span-7 bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  Calorie Goal Comparison
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Target: <strong className="text-slate-300">{targetCalories} kcal</strong>
                </span>
              </div>

              {analytics.loggedDaysCount === 0 ? (
                <div className="py-6 text-center text-slate-500">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-bold">No items logged this week</p>
                  <p className="text-[10px] text-slate-500">Scan or add daily meals to view metrics.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Weekly Daily Average</p>
                      <p className="text-xl font-black text-white font-mono">{analytics.avgCalories} <span className="text-xs font-normal text-slate-400">kcal/day</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Weekly Variance</p>
                      {analytics.avgCalories > targetCalories ? (
                        <p className="text-xs font-bold text-rose-400">+{analytics.avgCalories - targetCalories} kcal Surplus</p>
                      ) : (
                        <p className="text-xs font-bold text-emerald-400">-{targetCalories - analytics.avgCalories} kcal Deficit</p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar visual indicator */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800/60 relative">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          analytics.avgCalories > targetCalories * 1.15 ? 'bg-rose-500' :
                          analytics.avgCalories < targetCalories * 0.85 ? 'bg-amber-500' :
                          'bg-indigo-500'
                        }`}
                        style={{ width: `${Math.min((analytics.avgCalories / targetCalories) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100% (Target)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Compliance Stats (col-span-5) */}
            <div className="md:col-span-5 bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
                  Target Adherence Compliance
                </span>
                <div className="flex items-center gap-4 mt-3">
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-slate-900 rounded-full border border-slate-800">
                    <span className="text-xs font-black text-white font-mono">
                      {analytics.adherencePercentage}%
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-white">Consistent Logs</p>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Logged food on <strong>{analytics.loggedDaysCount}</strong> of last 7 days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-900 text-xxs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Target Adherence counts days within +/- 15% of calorie budget</span>
              </div>
            </div>

          </div>

          {/* Macronutrients distribution block */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-500" />
                Macronutrient Alignment vs "{dietPreference}" Diet Goal
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Actual Daily Average Intake
              </span>
            </div>

            {analytics.loggedDaysCount === 0 ? (
              <p className="text-xs text-center text-slate-500 py-3">No recorded macro metrics to visualize yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Protein */}
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xxs font-bold text-indigo-400 flex items-center gap-1">
                      <Dumbbell className="w-3 h-3 text-indigo-400" />
                      Protein
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{analytics.avgProtein}g</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${analytics.actualProteinPct}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>Actual: {analytics.actualProteinPct}%</span>
                      <span>Target: {macroTargets.protein}%</span>
                    </div>
                  </div>
                </div>

                {/* Carbs */}
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xxs font-bold text-emerald-400 flex items-center gap-1">
                      <Apple className="w-3 h-3 text-emerald-400" />
                      Carbohydrates
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{analytics.avgCarbs}g</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${analytics.actualCarbsPct}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>Actual: {analytics.actualCarbsPct}%</span>
                      <span>Target: {macroTargets.carbs}%</span>
                    </div>
                  </div>
                </div>

                {/* Fats */}
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xxs font-bold text-amber-400 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-amber-400" />
                      Healthy Fats
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{analytics.avgFats}g</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${analytics.actualFatsPct}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>Actual: {analytics.actualFatsPct}%</span>
                      <span>Target: {macroTargets.fats}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Advisor Panel (Gemini-Powered) */}
          <div className="bg-gradient-to-br from-indigo-950/20 via-slate-950 to-indigo-950/10 border border-indigo-500/10 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    AI Personal Dietician & Insights
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Real-time Gemini critique of your weekly nutritional habits
                  </p>
                </div>
              </div>

              {!aiCritique && !loading && (
                <button
                  type="button"
                  onClick={generateCritique}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xxs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/10 active:scale-[0.98] flex items-center gap-1.5"
                >
                  <Cpu className="w-3 h-3" />
                  <span>Generate AI Critique</span>
                </button>
              )}
            </div>

            {loading && (
              <div className="py-8 text-center space-y-3.5">
                <RefreshCw className="w-7 h-7 text-indigo-400 animate-spin mx-auto" />
                <div className="space-y-1 max-w-sm mx-auto">
                  <p className="text-xs font-bold text-slate-300">Auditing historical databases...</p>
                  <p className="text-[10px] text-slate-500">
                    Gemini AI is examining calorie limits, macro boundaries, and food category pacing.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-xs text-rose-400">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {aiCritique && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 text-left"
              >
                {/* Score & General feedback */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-slate-900/60 p-4 rounded-xl border border-slate-850">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-tr from-indigo-600 to-emerald-500 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center font-mono">
                      <span className="text-base font-black text-white">{aiCritique.score}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase">SCORE</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/10 px-2 py-0.5 rounded-full inline-block">
                      Dietician Executive Summary
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
                      "{aiCritique.summary}"
                    </p>
                  </div>
                </div>

                {/* Bullets row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-slate-900/40 border border-slate-850 p-3.5 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      👍 Key Successes / Strengths
                    </span>
                    <ul className="space-y-1.5 text-xxs text-slate-400 list-disc pl-4 leading-relaxed font-sans">
                      {aiCritique.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-slate-900/40 border border-slate-850 p-3.5 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      💡 Optimization Targets
                    </span>
                    <ul className="space-y-1.5 text-xxs text-slate-400 list-disc pl-4 leading-relaxed font-sans">
                      {aiCritique.opportunities.map((opp, idx) => (
                        <li key={idx}>{opp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Nutritional insights paragraph */}
                <div className="bg-indigo-950/10 border border-indigo-500/10 p-4 rounded-xl space-y-2.5">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    Deep Nutritional Biometrics Insight
                  </span>
                  <p className="text-xxs text-slate-300 leading-relaxed font-sans">
                    {aiCritique.nutritionalInsights}
                  </p>
                </div>

                {/* Refresh trigger */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={generateCritique}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Recalculate AI Critique
                  </button>
                </div>

              </motion.div>
            )}

            {!aiCritique && !loading && (
              <div className="p-4 bg-slate-900/40 rounded-xl text-center border border-dashed border-slate-800">
                <p className="text-xxs text-slate-500">
                  Ready to audit? Click "Generate AI Critique" above and let Gemini formulate custom advice, compliance scoring, and food timing optimization plans.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-slate-950/50 p-4 border-t border-slate-800/80 text-center text-slate-500 text-[10px] font-mono">
          Powered by Gemini 3.5 Flash Performance Model • VitalPath SaaS Analytics
        </div>
      </motion.div>
    </div>
  );
};
