'use client';

import React from 'react';
import { useThaw } from '@/lib/store';
import { Shield, Trash2, Sliders, Sparkles, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const { clearAllData, reducedMotion, setReducedMotion, isDemoMode } = useThaw();
  const [cleared, setCleared] = React.useState(false);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all local Thaw data?')) {
      clearAllData();
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  };

  return (
    <div className="flex-1 px-6 md:px-12 py-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-white">Settings & Privacy Controls</h1>
        <p className="text-sm text-thaw-300 mt-1">Manage your privacy guarantees, data retention, and interface preferences.</p>
      </div>

      {cleared && (
        <div className="mb-6 p-4 rounded-2xl bg-sage-500/20 border border-sage-500 text-sage-200 text-sm">
          All local data has been successfully cleared and reset.
        </div>
      )}

      <div className="space-y-6">
        {/* Privacy Box */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-thaw-700/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sage-500/20 text-sage-300 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white">What Thaw Sees & Stores</h3>
              <p className="text-xs text-sage-300">Privacy-First Architecture</p>
            </div>
          </div>
          <p className="text-sm text-thaw-300 leading-relaxed mb-4">
            Your tasks, energy levels, and activity logs are stored locally in your browser storage (LocalStorage/IndexedDB). Thaw does not track browsing history, capture keystrokes, or transmit raw behavioral telemetry to external servers.
          </p>
          <div className="p-4 rounded-2xl bg-thaw-900 border border-thaw-800 text-xs text-sage-200">
            <strong>AI Sequencer Disclosure:</strong> Task descriptions sent to the AI task sequencer are processed securely on the server and are never used to train public models.
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl">
          <h3 className="text-lg font-serif text-white mb-4">Interface & Accessibility</h3>
          
          <div className="flex items-center justify-between py-3 border-b border-thaw-800">
            <div>
              <h4 className="text-sm font-medium text-white">Reduced Motion Mode</h4>
              <p className="text-xs text-thaw-300">Minimize decorative animations and parallax effects.</p>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={e => setReducedMotion(e.target.checked)}
              className="w-5 h-5 accent-sage-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="text-sm font-medium text-white">Demo Mode</h4>
              <p className="text-xs text-thaw-300">Preload sample tasks and demo state for presentations.</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-sage-500/20 text-sage-300 font-semibold">
              {isDemoMode ? 'Active' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-red-500/20">
          <h3 className="text-lg font-serif text-white mb-2">Data Management</h3>
          <p className="text-sm text-thaw-300 mb-6">Permanently delete all tasks, activity history, and reset energy levels.</p>
          <button
            onClick={handleClear}
            className="px-6 py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition text-sm font-medium flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Clear All Local Data
          </button>
        </div>
      </div>
    </div>
  );
}
