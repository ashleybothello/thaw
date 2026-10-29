'use client';

import React from 'react';
import Link from 'next/link';
import { useThaw } from '@/lib/store';
import { Sparkles, Timer, Coffee, CheckSquare, Calendar, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const { energyLevel, setEnergyLevel, tasks, toggleTaskComplete } = useThaw();

  const spoonDescriptions: Record<number, { title: string; desc: string }> = {
    1: { title: 'Very Low Energy', desc: 'Minimal capacity. Focus entirely on rest and basic self-care.' },
    2: { title: 'Low Energy', desc: 'Gentle maintenance tasks only. Keep steps extremely small.' },
    3: { title: 'Steady Capacity', desc: 'Good balance for a few light tasks and a focused session.' },
    4: { title: 'Good Energy', desc: 'Ready for creative work and tackling larger steps.' },
    5: { title: 'High Energy', desc: 'Plentiful capacity. Great time for deep focus or planning ahead.' },
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const currentTask = pendingTasks[0] || {
    title: 'No pending tasks right now',
    description: 'Add a new task or use the AI sequencer to get started.',
  };

  return (
    <div className="flex-1 px-6 md:px-12 py-8 max-w-6xl mx-auto w-full">
      {/* Greeting Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-sage-300 font-medium">Welcome back, student</p>
          <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">
            What feels possible today?
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sequencer"
            className="px-4 py-2.5 rounded-xl bg-sage-500 text-thaw-950 font-medium hover:bg-sage-400 transition flex items-center gap-2 text-sm shadow-lg shadow-sage-900/20"
          >
            <Sparkles className="w-4 h-4" />
            AI Task Sequencer
          </Link>
          <Link
            href="/timer"
            className="px-4 py-2.5 rounded-xl glass-panel text-white hover:bg-thaw-800 transition flex items-center gap-2 text-sm"
          >
            <Timer className="w-4 h-4 text-sage-400" />
            Focus Timer
          </Link>
        </div>
      </div>

      {/* Energy Check-in Section (SpN Spoons Planner) */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl mb-8 border border-thaw-700/50 shadow-glass">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>🥄</span> Spoons Energy Budget
            </div>
            <h2 className="text-2xl font-serif text-white">Daily Energy Check-in</h2>
          </div>
          <p className="text-sm text-thaw-300 max-w-md">
            Adjust your spoons at any time. Recommendations and task sizing will instantly adapt to your capacity.
          </p>
        </div>

        {/* 1-5 Spoons Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((level) => {
            const isSelected = energyLevel === level;
            return (
              <button
                key={level}
                onClick={() => setEnergyLevel(level)}
                className={`p-4 rounded-2xl text-left transition flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-sage-500/20 border-sage-500 text-white shadow-lg'
                    : 'glass-card hover:border-thaw-600 text-thaw-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-xl font-bold text-amber-300">{level}</span>
                  <span className="text-xs text-sage-300">spoon{level > 1 ? 's' : ''}</span>
                </div>
                <p className="text-xs font-medium text-white">{spoonDescriptions[level].title}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-thaw-900/60 border border-thaw-800 flex items-center gap-3 text-sm text-sage-200">
          <span className="text-amber-300 text-lg">💡</span>
          <p>
            <strong className="text-white">Current Capacity ({energyLevel}/5):</strong> {spoonDescriptions[energyLevel].desc}
          </p>
        </div>
      </div>

      {/* Main Grid: Current Focus & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Current Focus Task (Left 2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-sage-300 uppercase tracking-wider font-medium">Your Current Focus</span>
              <span className="text-xs px-3 py-1 rounded-full bg-thaw-800 text-sage-300 border border-thaw-700">
                1 next step
              </span>
            </div>

            <h3 className="text-2xl font-serif text-white mb-2">{currentTask.title}</h3>
            {currentTask.description && (
              <p className="text-thaw-300 text-sm mb-6 leading-relaxed">{currentTask.description}</p>
            )}

            <div className="p-4 rounded-2xl bg-thaw-900/80 border border-sage-500/30 mb-6">
              <p className="text-xs text-sage-400 mb-1">Recommended Starting Micro-Action:</p>
              <p className="text-white font-medium text-sm">
                Open your workspace and spend 2 minutes outlining just the first heading.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/timer"
              className="px-6 py-3 rounded-xl bg-sage-500 text-thaw-950 font-medium hover:bg-sage-400 transition flex items-center gap-2 text-sm shadow-md"
            >
              <Timer className="w-4 h-4" />
              Start 2-Min Focus Timer
            </Link>
            <Link
              href="/sequencer"
              className="px-5 py-3 rounded-xl glass-panel text-white hover:bg-thaw-800 transition text-sm"
            >
              Deconstruct Further
            </Link>
          </div>
        </div>

        {/* Quick Sanctuary / Rest Card (Right 1 col) */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col justify-between bg-gradient-to-br from-thaw-900/80 to-sage-950/40">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sage-500/20 text-sage-300 flex items-center justify-center mb-4">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white mb-2">Feeling Overwhelmed?</h3>
            <p className="text-sm text-thaw-300 leading-relaxed mb-6">
              Rest is not a failure. Step into guilt-free Rest Mode anytime you need to recharge your cognitive capacity.
            </p>
          </div>
          <Link
            href="/rest"
            className="w-full py-3 rounded-xl glass-panel text-center text-sage-200 hover:bg-thaw-800 transition font-medium text-sm flex items-center justify-center gap-2 border border-sage-500/30"
          >
            Enter Rest Sanctuary
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Upcoming Tasks Preview */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-white">Pending Tasks ({pendingTasks.length})</h3>
          <Link href="/tasks" className="text-sm text-sage-300 hover:underline flex items-center gap-1">
            View all tasks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {pendingTasks.slice(0, 3).map(task => (
            <div key={task.id} className="glass-card p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="w-5 h-5 rounded-md border border-sage-400 hover:bg-sage-500/20 transition flex items-center justify-center"
                />
                <div>
                  <h4 className="font-medium text-white text-sm">{task.title}</h4>
                  <p className="text-xs text-thaw-300">{task.deadline || 'Flexible'} • {task.energyRequired} spoons</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-thaw-800 text-sage-300 border border-thaw-700">
                {task.estimatedMinutes ? `${task.estimatedMinutes}m` : 'Quick'}
              </span>
            </div>
          ))}
          {pendingTasks.length === 0 && (
            <p className="text-sm text-thaw-300 text-center py-4">All caught up! No pending tasks right now.</p>
          )}
        </div>
      </div>
    </div>
  );
}
