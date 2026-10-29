'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Zap, Compass, Coffee } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        {/* Background atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-thaw-800/80 border border-thaw-700/50 text-sage-300 text-xs md:text-sm mb-6 shadow-glass">
          <Sparkles className="w-4 h-4 text-sage-400" />
          <span>A gentle co-pilot for getting unstuck</span>
        </div>

        <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white mb-6 leading-[1.15]">
          You don't have to do it all. <br />
          <span className="text-sage-300 italic">Just find your next small step.</span>
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-thaw-300 mb-10 leading-relaxed">
          Thaw helps university students and neurodivergent minds move through task paralysis and overwhelm with flexible planning, AI-assisted micro-steps, and guilt-free rest.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-sage-500 text-thaw-950 font-semibold hover:bg-sage-400 transition shadow-xl shadow-sage-900/30 flex items-center justify-center gap-2 text-base"
          >
            Find my next step
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/sequencer"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white hover:bg-thaw-800/80 transition flex items-center justify-center gap-2 text-base"
          >
            Try AI Task Sequencer
          </Link>
        </div>

        {/* Hero preview card */}
        <div className="mt-16 w-full max-w-4xl glass-panel rounded-2xl p-6 md:p-8 border border-thaw-700/40 text-left shadow-2xl relative">
          <div className="absolute -top-3 right-6 bg-sage-500 text-thaw-950 text-xs font-semibold px-3 py-1 rounded-full">
            Live Preview
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-thaw-800/60">
            <div>
              <p className="text-xs text-sage-300 uppercase tracking-wider">Today's Energy Check-in</p>
              <h2 className="text-xl font-serif text-white">How is your battery feeling right now?</h2>
            </div>
            <div className="flex items-center gap-2 bg-thaw-900 px-4 py-2 rounded-xl border border-thaw-700/40 text-amber-300 text-sm">
              <span>🥄</span>
              <span className="font-medium">3 / 5 Spoons (Steady Capacity)</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-xs text-sage-400 mb-1">Current Focus Task</p>
              <h3 className="font-medium text-white text-sm">Prepare assignment outline</h3>
              <p className="text-xs text-thaw-300 mt-2">1 next small action ready</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-xs text-sage-400 mb-1">Recommended Micro-Start</p>
              <h3 className="font-medium text-white text-sm">Open document & type title</h3>
              <p className="text-xs text-sage-300 mt-2">Duration: 2 minutes</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-xs text-sage-400 mb-1">Alternative Option</p>
              <h3 className="font-medium text-white text-sm">Guilt-Free Rest Mode</h3>
              <p className="text-xs text-thaw-300 mt-2">Step away without penalty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Philosophy */}
      <section className="py-20 px-6 md:px-12 bg-thaw-900/50 border-t border-b border-thaw-800/40">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Conventional productivity apps were built for neurotypical consistency.
          </h2>
          <p className="text-thaw-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-16">
            Rigid schedules, alarms, shaming overdue labels, and broken streaks often deepen executive dysfunction and task paralysis. Thaw takes a different approach: empathy, adjustable spoon budgeting, and microscopic friction reduction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-sage-500/20 text-sage-300 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">1. Check In Gently</h3>
              <p className="text-sm text-thaw-300 leading-relaxed">
                Start by measuring your daily capacity on a 1–5 spoons scale. Recommendations instantly adapt to your actual energy, not idealized expectations.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-sage-500/20 text-sage-300 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">2. Melt Overwhelm</h3>
              <p className="text-sm text-thaw-300 leading-relaxed">
                Our RAG-powered AI task sequencer breaks intimidating projects into 2-minute starting steps grounded in non-clinical cognitive science.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-sage-500/20 text-sage-300 flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">3. Rest Without Guilt</h3>
              <p className="text-sm text-thaw-300 leading-relaxed">
                Rest is built in as a first-class citizen. Step into calming scenic environments with breathing guidance whenever you need to recharge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto glass-panel p-10 md:p-14 rounded-3xl border border-sage-500/30">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
            Ready to experience a gentler way to plan?
          </h2>
          <p className="text-thaw-300 mb-8 max-w-xl mx-auto">
            Step into Thaw and discover how one small action can break the cycle of paralysis.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-sage-500 text-thaw-950 font-semibold hover:bg-sage-400 transition shadow-xl text-lg"
          >
            Launch Thaw Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
