'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Coffee, ArrowLeft, Wind, Sparkles } from 'lucide-react';
import { useThaw } from '@/lib/store';

export default function RestPage() {
  const { logActivity } = useThaw();
  const [breathingPhase, setBreathingPhase] = useState<'Inhale (4s)' | 'Hold (4s)' | 'Exhale (4s)'>('Inhale (4s)');

  React.useEffect(() => {
    logActivity('rest_session', 'Entered Rest Sanctuary');
    const interval = setInterval(() => {
      setBreathingPhase(prev => {
        if (prev.includes('Inhale')) return 'Hold (4s)';
        if (prev.includes('Hold')) return 'Exhale (4s)';
        return 'Inhale (4s)';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 px-6 md:px-12 py-12 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center">
      <div className="absolute top-20 left-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs text-sage-300 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>
      </div>

      <div className="w-20 h-20 rounded-full bg-sage-500/20 text-sage-300 flex items-center justify-center mb-6 animate-pulse">
        <Coffee className="w-10 h-10" />
      </div>

      <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Guilt-Free Rest Mode</h1>
      <p className="text-sm text-thaw-300 max-w-md mb-12 leading-relaxed">
        Rest is not a reward for productivity; it is a biological necessity. You are completely safe to pause, breathe, and step away from demands.
      </p>

      {/* Breathing Guide Circle */}
      <div className="glass-panel p-10 rounded-3xl w-full max-w-sm mb-10 border border-sage-500/30 shadow-2xl flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-sage-500/20 border-2 border-sage-400/50 flex items-center justify-center mb-6 animate-bounce">
          <Wind className="w-8 h-8 text-sage-200" />
        </div>
        <p className="text-xs uppercase tracking-widest text-sage-300 font-semibold mb-1">Guided Pacing</p>
        <h3 className="text-2xl font-serif text-white">{breathingPhase}</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/dashboard"
          className="px-8 py-3.5 rounded-full bg-sage-500 text-thaw-950 font-semibold hover:bg-sage-400 transition text-sm shadow-lg"
        >
          I feel ready to return
        </Link>
        <Link
          href="/timer"
          className="px-8 py-3.5 rounded-full glass-panel text-white hover:bg-thaw-800 transition text-sm"
        >
          Switch to Focus Timer
        </Link>
      </div>
    </div>
  );
}
