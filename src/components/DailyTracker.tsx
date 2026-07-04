import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DailyLog } from '../types';
import { Trash2, TrendingUp, Sparkles, Flame, Apple, Salad, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface DailyTrackerProps {
  logs: DailyLog[];
  onRemoveLog: (id: string) => void;
  onClearLogs: () => void;
  calorieBudget: number;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({ logs, onRemoveLog, onClearLogs, calorieBudget = 2000 }) => {
  const { t } = useTranslation();
  
  // Target macros (generic parameters)
  const proteinGoal = 130; // 130g
  const carbsGoal = 220;   // 220g
  const fatsGoal = 65;     // 65g

  // Calculations
  const totalCalories = logs.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = logs.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = logs.reduce((sum, item) => sum + item.carbs, 0);
  const totalFats = logs.reduce((sum, item) => sum + item.fats, 0);

  const caloriesRemaining = Math.max(0, calorieBudget - totalCalories);
  const calPercent = Math.min(100, (totalCalories / calorieBudget) * 100);
  const rawCalPercent = calorieBudget > 0 ? (totalCalories / calorieBudget) * 100 : 0;

  const pPercent = Math.min(100, (totalProtein / proteinGoal) * 100);
  const cPercent = Math.min(100, (totalCarbs / carbsGoal) * 100);
  const fPercent = Math.min(100, (totalFats / fatsGoal) * 100);

  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (totalCalories > 0 && totalCalories >= calorieBudget) {
      if (!hasFiredRef.current) {
        hasFiredRef.current = true;

        // Primary celebratory burst
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ec4899']
        });

        // Staggered side blasts
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 45 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 200);

        return () => clearInterval(interval);
      }
    } else {
      hasFiredRef.current = false;
    }
  }, [totalCalories, calorieBudget]);

  return (
    <div id="daily-tracker-module" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-md shadow-black/20 transition-all space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight font-sans">
              {t('dailyTrackerTitle')}
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Synced real-time with AI scan logs
            </p>
          </div>
        </div>
        
        {logs.length > 0 && (
          <button
            id="clear-tracker-logs-btn"
            onClick={onClearLogs}
            className="px-3.5 py-1.5 border border-red-900/30 bg-red-950/20 text-red-000 text-red-400 text-xs font-bold rounded-lg hover:bg-red-950/40 transition-colors font-sans"
          >
            {t('clearLogs')}
          </button>
        )}
      </div>

      {/* Main Budget Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Calorie Stats */}
        <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all duration-500 relative overflow-hidden ${
          totalCalories >= calorieBudget && totalCalories > 0
            ? 'bg-indigo-950/20 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
            : 'bg-slate-950/40 border-slate-800'
        }`}>
          {totalCalories >= calorieBudget && totalCalories > 0 && (
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
          )}

          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">
              {t('calorieBudget')}
            </span>
            <Flame className={`w-4 h-4 ${totalCalories >= calorieBudget && totalCalories > 0 ? 'text-indigo-400 animate-bounce' : 'text-amber-500 animate-pulse'}`} />
          </div>
          
          <div className="flex items-center gap-4 py-1">
            {/* Circular Progress SVG */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                <defs>
                  <linearGradient id="calorieCircularGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="calorieOverLimitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                {/* Background Track */}
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  className="stroke-slate-800"
                  strokeWidth="6"
                  fill="transparent"
                />
                {/* Active Progress */}
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  stroke={totalCalories >= calorieBudget && totalCalories > 0 ? "url(#calorieOverLimitGradient)" : "url(#calorieCircularGradient)"}
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="188.5"
                  strokeDashoffset={188.5 - (Math.min(100, rawCalPercent) / 100) * 188.5}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              {/* Inner Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-black text-white font-mono leading-none">
                  {rawCalPercent.toFixed(0)}%
                </span>
                <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  {totalCalories >= calorieBudget && totalCalories > 0 ? 'done ✨' : 'active'}
                </span>
              </div>
            </div>

            {/* Numeric info */}
            <div className="space-y-1 text-left">
              <p className="text-xl font-black text-white font-mono leading-tight">
                {totalCalories} <span className="text-[10px] text-slate-500 font-normal">/ {calorieBudget} kcal</span>
              </p>
              <div className="text-xxs text-slate-400 font-sans leading-normal">
                {totalCalories >= calorieBudget && totalCalories > 0 ? (
                  <span className="text-indigo-400 font-bold flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
                    Goal Reached!
                  </span>
                ) : (
                  <span>{caloriesRemaining} kcal {t('caloriesRemaining')}</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Status:</span>
            <span className={`font-bold uppercase tracking-wider ${totalCalories >= calorieBudget && totalCalories > 0 ? 'text-indigo-400' : calPercent >= 85 ? 'text-emerald-400' : 'text-slate-400'}`}>
              {totalCalories >= calorieBudget && totalCalories > 0 ? 'Goal Met 🎯' : calPercent >= 85 ? 'On Target' : 'Active'}
            </span>
          </div>
        </div>

        {/* Nutritional Highlights Grid */}
        <div className="md:col-span-2 bg-slate-950/40 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">
            {t('nutritionHighlights')}
          </h3>

          <div className="grid grid-cols-3 gap-4">
            {/* Protein bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-slate-400 font-sans uppercase">{t('protein')}</span>
                <span className="text-xxs font-bold text-indigo-400 font-mono">{totalProtein}/{proteinGoal}g</span>
              </div>
              <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden">
                <div style={{ width: `${pPercent}%` }} className="bg-indigo-500 h-full rounded-full transition-all" />
              </div>
              <p className="text-[9px] text-slate-500 font-mono">{pPercent.toFixed(0)}% completed</p>
            </div>

            {/* Carbs bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-slate-400 font-sans uppercase">{t('carbs')}</span>
                <span className="text-xxs font-bold text-emerald-400 font-mono">{totalCarbs}/{carbsGoal}g</span>
              </div>
              <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden">
                <div style={{ width: `${cPercent}%` }} className="bg-emerald-500 h-full rounded-full transition-all" />
              </div>
              <p className="text-[9px] text-slate-500 font-mono">{cPercent.toFixed(0)}% completed</p>
            </div>

            {/* Fats bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-slate-400 font-sans uppercase">{t('fats')}</span>
                <span className="text-xxs font-bold text-amber-500 font-mono">{totalFats}/{fatsGoal}g</span>
              </div>
              <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden">
                <div style={{ width: `${fPercent}%` }} className="bg-amber-500 h-full rounded-full transition-all" />
              </div>
              <p className="text-[9px] text-slate-500 font-mono">{fPercent.toFixed(0)}% completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Logged Items Stream */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-300 font-sans">
          {t('loggedMealCount')} ({logs.length})
        </h3>
        
        {logs.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-950/20 text-slate-400 space-y-2">
            <Salad className="w-8 h-8 text-slate-700 mx-auto" />
            <p className="text-xs font-sans max-w-[320px] mx-auto leading-relaxed text-slate-500">
              {t('emptyTracker')}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60 max-h-[300px] overflow-y-auto pr-1">
            {logs.map((log) => (
              <div key={log.id} className="flex justify-between items-center py-3 text-sm font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-500/10">
                    <Apple className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">{log.itemName}</p>
                    <p className="text-xxs text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • P:{log.protein}g C:{log.carbs}g F:{log.fats}g
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-slate-300 font-mono shrink-0">
                    +{log.calories} kcal
                  </span>
                  
                  <button
                    id={`delete-log-${log.id}`}
                    onClick={() => onRemoveLog(log.id)}
                    className="p-1 px-1.5 text-slate-500 hover:text-rose-400 rounded-md hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Delete log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
