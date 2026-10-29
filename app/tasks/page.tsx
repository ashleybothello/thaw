'use client';

import React, { useState } from 'react';
import { useThaw, Task } from '@/lib/store';
import { CheckSquare, Plus, Trash2, Calendar, Sparkles, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TasksPage() {
  const { tasks, addTask, deleteTask, toggleTaskComplete } = useThaw();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('Today');
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);
  const [energyRequired, setEnergyRequired] = useState(2);
  const [isFlexible, setIsFlexible] = useState(true);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title,
      description,
      deadline,
      estimatedMinutes,
      energyRequired,
      isFlexible
    });
    setTitle('');
    setDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 px-6 md:px-12 py-8 max-w-5xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white">My Tasks</h1>
          <p className="text-sm text-thaw-300 mt-1">Manage what is on your plate without guilt or shame.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl bg-sage-500 text-thaw-950 font-medium hover:bg-sage-400 transition flex items-center gap-2 text-sm shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add New Task
          </button>
        </div>
      </div>

      {/* Add Task Modal / Form */}
      {showAddModal && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl mb-8 border border-sage-500/30">
          <h3 className="text-xl font-serif text-white mb-4">Create a New Task</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs text-sage-300 mb-1">Task Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Prepare Database Architecture Diagram"
                className="w-full bg-thaw-900 border border-thaw-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-sage-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-sage-300 mb-1">Description / Notes (Optional)</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Add any helpful context or breakdown notes..."
                className="w-full bg-thaw-900 border border-thaw-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-sage-500 h-20 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-sage-300 mb-1">Deadline</label>
                <input
                  type="text"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  placeholder="e.g., Tomorrow, Friday"
                  className="w-full bg-thaw-900 border border-thaw-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-sage-300 mb-1">Estimated Duration (mins)</label>
                <input
                  type="number"
                  value={estimatedMinutes}
                  onChange={e => setEstimatedMinutes(Number(e.target.value))}
                  className="w-full bg-thaw-900 border border-thaw-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-sage-300 mb-1">Spoons Required (1-5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={energyRequired}
                  onChange={e => setEnergyRequired(Number(e.target.value))}
                  className="w-full bg-thaw-900 border border-thaw-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sage-500 text-thaw-950 font-medium hover:bg-sage-400 text-sm transition"
              >
                Save Task
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 rounded-xl glass-panel text-white hover:bg-thaw-800 text-sm transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task Lists */}
      <div className="space-y-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
              task.completed ? 'opacity-60 bg-thaw-900/30' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleTaskComplete(task.id)}
                className={`mt-1 w-6 h-6 rounded-lg border transition flex items-center justify-center ${
                  task.completed 
                    ? 'bg-sage-500 border-sage-500 text-thaw-950 font-bold' 
                    : 'border-sage-400 hover:bg-sage-500/20'
                }`}
              >
                {task.completed && '✓'}
              </button>
              <div>
                <h3 className={`font-serif text-lg text-white ${task.completed ? 'line-through text-thaw-400' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-xs text-thaw-300 mt-1">{task.description}</p>
                )}
                <div className="flex items-center gap-3 mt-3 text-xs text-sage-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {task.deadline || 'Flexible'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {task.estimatedMinutes} mins
                  </span>
                  <span className="flex items-center gap-1 text-amber-300">
                    🥄 {task.energyRequired} spoons
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <Link
                href="/sequencer"
                className="p-2 rounded-xl glass-panel text-sage-300 hover:text-white hover:bg-thaw-800 transition"
                title="Deconstruct with AI"
              >
                <Sparkles className="w-4 h-4" />
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 rounded-xl glass-panel text-red-400 hover:text-red-300 hover:bg-red-950/30 transition"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-3xl">
            <p className="text-thaw-300 mb-4">No tasks found.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 rounded-xl bg-sage-500 text-thaw-950 font-medium text-sm"
            >
              Add your first task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
