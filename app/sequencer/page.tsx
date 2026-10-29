'use client';

import React, { useState } from 'react';
import { useThaw } from '@/lib/store';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Zap, ShieldCheck } from 'lucide-react';

export default function SequencerPage() {
  const { energyLevel, logActivity } = useThaw();
  const [taskInput, setTaskInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [ragContext, setRagContext] = useState<any[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const handleSequence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    setLoading(true);
    setResult(null);
    setCompletedSteps({});

    try {
      const res = await fetch('/api/sequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskDescription: taskInput, energyLevel })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        setRagContext(data.ragContext || []);
        logActivity('task_completed', `Sequenced task: ${taskInput.slice(0, 30)}...`);
      }
    } catch (err) {
      console.error('Sequencer error', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 px-6 md:px-12 py-8 max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-500/20 text-sage-300 text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" /> RAG-Powered Executive Function Co-Pilot
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-white">AI Task Sequencer</h1>
        <p className="text-sm text-thaw-300 mt-2">
          Enter an intimidating or overwhelming task. We will translate it into a 2-minute starting step and gentle, low-friction micro-actions.
        </p>
      </div>

      {/* Input Form */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl mb-8 border border-sage-500/30 shadow-glass">
        <form onSubmit={handleSequence} className="space-y-4">
          <div>
            <label className="block text-xs text-sage-300 mb-2 uppercase tracking-wider font-medium">
              What task feels heavy or overwhelming right now?
            </label>
            <textarea
              value={taskInput}
              onChange={e => setTaskInput(e.target.value)}
              placeholder="e.g., I need to finish my entire college project report by tomorrow and I don't know where to start..."
              className="w-full bg-thaw-900 border border-thaw-700 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-sage-500 h-32 resize-none leading-relaxed"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-sage-200">
              <span className="text-amber-300 text-base">🥄</span>
              <span>Current Spoon Capacity: <strong>{energyLevel}/5</strong></span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-sage-500 text-thaw-950 font-semibold hover:bg-sage-400 transition flex items-center justify-center gap-2 text-sm shadow-lg disabled:opacity-50"
            >
              {loading ? 'Melting Overwhelm...' : 'Generate Small Steps'}
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Result Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Compassionate Acknowledgment */}
          <div className="glass-panel p-6 rounded-3xl border border-sage-500/40 bg-gradient-to-r from-sage-950/40 to-thaw-900/60">
            <p className="text-xs text-sage-300 uppercase tracking-wider font-semibold mb-2">Compassionate Guidance</p>
            <p className="text-white font-serif text-lg leading-relaxed mb-4">"{result.acknowledgment}"</p>
            <div className="p-4 rounded-2xl bg-thaw-900 border border-sage-500/30 flex items-start gap-3">
              <span className="text-amber-300 text-xl">🚀</span>
              <div>
                <p className="text-xs text-sage-400 font-medium">Recommended 2-Minute Micro-Start:</p>
                <p className="text-white text-sm mt-0.5">{result.firstStep}</p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Checklist */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl">
            <h3 className="text-xl font-serif text-white mb-6">Your Low-Friction Action Plan</h3>
            <div className="space-y-3">
              {result.steps?.map((step: any, index: number) => {
                const isDone = completedSteps[step.id];
                return (
                  <div
                    key={step.id || index}
                    onClick={() => toggleStep(step.id || index)}
                    className={`glass-card p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition ${
                      isDone ? 'opacity-50 bg-thaw-900/30' : 'hover:border-sage-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${
                        isDone ? 'bg-sage-500 border-sage-500 text-thaw-950 font-bold' : 'border-sage-400'
                      }`}>
                        {isDone && '✓'}
                      </div>
                      <div>
                        <span className="text-xs text-sage-300 font-semibold">Step {index + 1}</span>
                        <h4 className={`text-sm font-medium text-white ${isDone ? 'line-through text-thaw-400' : ''}`}>
                          {step.title}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-thaw-900 text-sage-300 border border-thaw-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {step.duration || '5 mins'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RAG Strategy Transparency Panel */}
          {ragContext.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-thaw-700/60 bg-thaw-900/40">
              <div className="flex items-center gap-2 text-xs text-sage-300 font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-sage-400" />
                <span>RAG Strategy Engine Sources ({ragContext.length})</span>
              </div>
              <p className="text-xs text-thaw-300 mb-4">
                This plan was tailored using the following non-clinical cognitive science strategies matching your current energy level ({energyLevel}/5):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ragContext.map((strat: any) => (
                  <div key={strat.id} className="glass-card p-3 rounded-xl border border-thaw-800">
                    <h5 className="text-xs font-semibold text-white mb-1">{strat.title}</h5>
                    <p className="text-xs text-thaw-300 leading-relaxed">{strat.actionableTip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
