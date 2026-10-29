'use client';

import React from 'react';
import { useThaw } from '@/lib/store';
import { Activity as ActivityIcon, CheckCircle2, Timer, Coffee, Zap } from 'lucide-react';

export default function ActivityPage() {
  const { activities } = useThaw();

  const getIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return CheckCircle2;
      case 'focus_session': return Timer;
      case 'rest_session': return Coffee;
      default: return Zap;
    }
  };

  return (
    <div className="flex-1 px-6 md:px-12 py-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-white">Activity & Reflection History</h1>
        <p className="text-sm text-thaw-300 mt-1">A neutral log of your completed steps, focus sessions, and rest moments.</p>
      </div>

      <div className="space-y-4">
        {activities.map(act => {
          const Icon = getIcon(act.type);
          return (
            <div key={act.id} className="glass-panel p-5 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sage-500/20 text-sage-300 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm">{act.title}</h3>
                  {act.details && <p className="text-xs text-thaw-300 mt-0.5">{act.details}</p>}
                </div>
              </div>
              <span className="text-xs text-thaw-400">
                {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}

        {activities.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-3xl">
            <p className="text-thaw-300">No activity recorded yet today. Take your first small step!</p>
          </div>
        )}
      </div>
    </div>
  );
}
