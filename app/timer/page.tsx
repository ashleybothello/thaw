'use client';

import React, { useState, useEffect } from 'react';
import { useThaw } from '@/lib/store';
import { Timer, Play, Pause, RotateCcw, Coffee, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function TimerPage() {
  const { logActivity } = useThaw();
  const [duration, setDuration] = useState<number>(120); // 2 minutes default starter
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
      logActivity('focus_session', `Completed ${Math.round(duration / 60)} min focus session`);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, duration]);

  const selectDuration = (secs: number) => {
    setIsRunning(false);
    setIsCompleted(false);
    setDuration(secs);
    setTimeLeft(secs);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex-1 px-6 md:px-12 py-12 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-500/20 text-sage-300 text-xs mb-4">
        <Timer className="w-3.5 h-3.5" /> Body-Double Focus Sanctuary
      </div>

      <h1 className="text-3xl md:text-5xl font-serif text-white mb-2">Gentle Focus Timer</h1>
      <p className="text-sm text-thaw-300 mb-8 max-w-lg">
        No pressure, no streaks, no judgment. Just a quiet space to anchor your attention for a few minutes.
      </p>

      {/* Preset Duration Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { label: '2 min (Starter)', secs: 120 },
          { label: '5 min', secs: 300 },
          { label: '10 min', secs: 600 },
          { label: '15 min', secs: 900 },
          { label: '25 min', secs: 1500 },
        ].map(preset => (
          <button
            key={preset.secs}
            onClick={() => selectDuration(preset.secs)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
              duration === preset.secs
                ? 'bg-sage-500 text-thaw-950 shadow-md font-semibold'
                : 'glass-panel text-thaw-300 hover:text-white'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Timer Display Card */}
      <div className="glass-panel p-10 md:p-14 rounded-3xl w-full max-w-md border border-sage-500/30 shadow-2xl relative overflow-hidden mb-8">
        {/* Ambient progress glow */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-sage-500/10 transition-all duration-1000 pointer-events-none"
          style={{ height: `${progressPercent}%` }}
        />

        {isCompleted ? (
          <div className="py-6 space-y-4">
            <CheckCircle className="w-16 h-16 text-sage-400 mx-auto" />
            <h2 className="text-2xl font-serif text-white">Wonderful job!</h2>
            <p className="text-xs text-thaw-300">You anchored your attention successfully.</p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => selectDuration(duration)}
                className="px-5 py-2.5 rounded-xl bg-sage-500 text-thaw-950 font-medium text-xs"
              >
                Again
              </button>
              <Link
                href="/rest"
                className="px-5 py-2.5 rounded-xl glass-panel text-white font-medium text-xs"
              >
                Take a Break
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-6xl md:text-8xl font-serif font-light text-white tracking-wider mb-8">
              {formatTime(timeLeft)}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-8 py-3.5 rounded-full bg-sage-500 text-thaw-950 font-semibold hover:bg-sage-400 transition flex items-center gap-2 text-sm shadow-lg"
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isRunning ? 'Pause' : 'Start Focus'}
              </button>
              <button
                onClick={() => { setIsRunning(false); setTimeLeft(duration); }}
                className="p-3.5 rounded-full glass-panel text-thaw-300 hover:text-white transition"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="text-xs text-thaw-400 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-sage-400" />
        <span>Body-double active: A quiet digital companion is present with you.</span>
      </div>
    </div>
  );
}
