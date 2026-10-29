'use client';

import React, { useState } from 'react';
import { useThaw } from '@/lib/store';
import { Calendar, RefreshCw, Sparkles, CheckSquare } from 'lucide-react';

export default function PlannerPage() {
  const { tasks, energyLevel } = useThaw();
  const [rebalanced, setRebalanced] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleRebalance = () => {
    setRebalanced(true);
    setTimeout(() => setRebalanced(false), 4000);
  };

  return (
    <div className="flex-1 px-6 md:px-12 py-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white">Adaptive Weekly Planner</h1>
          <p className="text-sm text-thaw-300 mt-1">A flexible weekly view designed around your energy and deadlines.</p>
        </div>
        <button
          onClick={handleRebalance}
          className="px-5 py-2.5 rounded-xl bg-sage-500 text-thaw-950 font-medium hover:bg-sage-400 transition flex items-center gap-2 text-sm shadow-lg"
        >
          <RefreshCw className={`w-4 h-4 ${rebalanced ? 'animate-spin' : ''}`} />
          {rebalanced ? 'Rebalancing...' : 'Rebalance My Week'}
        </button>
      </div>

      {rebalanced && (
        <div className="mb-6 p-4 rounded-2xl bg-sage-500/20 border border-sage-500 text-sage-200 text-sm flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Weekly schedule successfully rebalanced! Flexible tasks were redistributed to protect your low-energy days.</span>
        </div>
      )}

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map((day, index) => {
          const isToday = index === 0; // Monday as today for demo
          const dayTasks = tasks.slice(index % 2, (index % 2) + 2);

          return (
            <div
              key={day}
              className={`glass-panel p-4 rounded-2xl flex flex-col justify-between min-h-[300px] border ${
                isToday ? 'border-sage-500 bg-sage-500/10' : 'border-thaw-700/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-thaw-800">
                  <h3 className="font-serif text-white text-sm">{day}</h3>
                  {isToday && <span className="text-[10px] px-2 py-0.5 rounded-full bg-sage-500 text-thaw-950 font-bold">Today</span>}
                </div>

                <div className="space-y-2">
                  {dayTasks.map(t => (
                    <div key={t.id} className="glass-card p-3 rounded-xl">
                      <h4 className="text-xs font-medium text-white mb-1">{t.title}</h4>
                      <p className="text-[10px] text-sage-300">🥄 {t.energyRequired} spoons • {t.estimatedMinutes || 15}m</p>
                    </div>
                  ))}
                  {dayTasks.length === 0 && (
                    <p className="text-[11px] text-thaw-400 italic text-center py-6">Light schedule (Rest prioritized)</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-thaw-800/50 text-[11px] text-sage-300 flex items-center justify-between">
                <span>Capacity</span>
                <span className="text-amber-300">🥄 {Math.max(2, energyLevel)}/5</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
