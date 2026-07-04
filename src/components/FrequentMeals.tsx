import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScannedMeal } from '../types';
import { Bookmark, Plus, Trash2, Zap, Utensils } from 'lucide-react';

interface FrequentMealsProps {
  meals: Omit<ScannedMeal, 'id' | 'scannedAt'>[];
  onLogMeal: (meal: Omit<ScannedMeal, 'id' | 'scannedAt'>) => void;
  onDeleteFrequent: (index: number) => void;
}

export const FrequentMeals: React.FC<FrequentMealsProps> = ({ meals, onLogMeal, onDeleteFrequent }) => {
  const { t } = useTranslation();

  return (
    <div id="frequent-meals-module" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-md shadow-black/20 transition-all space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
          <Bookmark className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">
            {t('frequentMealsTitle')}
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {t('frequentMealsSubtitle')}
          </p>
        </div>
      </div>

      {meals.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 bg-slate-950/20 text-slate-400 space-y-3">
          <Utensils className="w-10 h-10 text-slate-700 mx-auto" />
          <p className="text-sm font-semibold font-sans text-slate-300">No frequent meals saved</p>
          <p className="text-xs font-sans max-w-[340px] mx-auto leading-relaxed text-slate-500">
            {t('frequentMealsEmpty')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meals.map((meal, index) => (
            <div 
              key={index} 
              className="group bg-slate-950/40 hover:bg-slate-950/60 p-4 rounded-xl border border-slate-800 hover:border-indigo-550/30 transition-all flex flex-col justify-between"
              id={`frequent-meal-card-${index}`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-sm font-bold text-slate-200 leading-snug group-hover:text-indigo-400 transition-colors">
                    {meal.itemName}
                  </h3>
                  <button
                    id={`delete-frequent-btn-${index}`}
                    onClick={() => onDeleteFrequent(index)}
                    className="p-1 text-slate-500 hover:text-rose-455 hover:bg-rose-950/20 rounded-md transition-colors shrink-0"
                    title={t('deleteMealBtn')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xxs text-slate-400 leading-relaxed font-sans line-clamp-2">
                  {meal.description || "No description provided."}
                </p>

                {/* Scanned Ingredients chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {meal.items.slice(0, 3).map((it, idx) => (
                    <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded-md text-[10px] text-slate-400 border border-slate-800 font-sans">
                      {it.name}
                    </span>
                  ))}
                  {meal.items.length > 3 && (
                    <span className="bg-slate-900 px-2 py-0.5 rounded-md text-[10px] text-slate-500 border border-slate-800">
                      +{meal.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom control panel */}
              <div className="border-t border-slate-800/60 mt-4 pt-3 flex items-center justify-between">
                <div className="font-mono text-left">
                  <p className="text-xs font-extrabold text-slate-200">{meal.totalCalories} kcal</p>
                  <p className="text-[9px] text-slate-500">P:{meal.totalProtein}g • C:{meal.totalCarbs}g • F:{meal.totalFats}g</p>
                </div>

                <button
                  id={`relog-frequent-btn-${index}`}
                  onClick={() => onLogMeal(meal)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold rounded-lg text-xxs flex items-center gap-1 transition-all shadow-md shadow-indigo-950/20"
                >
                  <Zap className="w-3 h-3 fill-white" />
                  <span>{t('logAgainBtn')}</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
