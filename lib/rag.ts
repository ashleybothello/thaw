export interface Strategy {
  id: string;
  title: string;
  category: 'initiation' | 'decomposition' | 'low_energy' | 'body_doubling' | 'rest' | 'transition';
  description: string;
  actionableTip: string;
  energySuitability: number[]; // e.g., [1, 2] for low energy or [1,2,3,4,5] for all
  tags: string[];
}

export const KNOWLEDGE_BASE: Strategy[] = [
  {
    id: 'strat-01',
    title: 'The Two-Minute Micro-Start',
    category: 'initiation',
    description: 'Executive dysfunction often distorts the perceived effort of starting. Committing to just two minutes lowers the activation barrier.',
    actionableTip: 'Set a timer for 120 seconds. Open the document or app, write one sentence or create a blank file, then give yourself explicit permission to stop if needed.',
    energySuitability: [1, 2, 3, 4, 5],
    tags: ['starting', 'inertia', 'overwhelm', 'timer']
  },
  {
    id: 'strat-02',
    title: 'Task Dissection (Shrinking the Monster)',
    category: 'decomposition',
    description: 'Vague tasks like "work on essay" signal threat to the brain. Concrete physical actions signal safety.',
    actionableTip: 'Break the task down until a single step takes under 5 minutes and starts with a physical verb (open, type, click, write, fetch).',
    energySuitability: [1, 2, 3, 4, 5],
    tags: ['breaking down', 'steps', 'clarity', 'planning']
  },
  {
    id: 'strat-03',
    title: 'Spoon-Budgeted Pacing',
    category: 'low_energy',
    description: 'When energy is low (1-2 spoons), attempting high-cognitive tasks causes paralysis. Adjust expectations to match current capacity.',
    actionableTip: 'Choose "maintenance" or administrative micro-tasks instead of deep creation. Celebrate any movement as complete success.',
    energySuitability: [1, 2],
    tags: ['low energy', 'spoons', 'burnout', 'gentle']
  },
  {
    id: 'strat-04',
    title: 'Body Doubling & Ambient Presence',
    category: 'body_doubling',
    description: 'Working alongside a calm, non-judgmental presence provides an external anchor against distractibility and wandering thoughts.',
    actionableTip: 'Use a quiet visual focus timer or study alongside a friend without pressure to converse.',
    energySuitability: [2, 3, 4, 5],
    tags: ['focus', 'timer', 'anchor', 'presence']
  },
  {
    id: 'strat-05',
    title: 'Guilt-Free Cognitive Rest',
    category: 'rest',
    description: 'Rest is not a reward for productivity; it is a biological prerequisite for cognitive recovery. Forced grinding deepens paralysis.',
    actionableTip: 'Step away from the screen for 10 minutes. Look out a window, do breathing exercises, or lie down without guilt.',
    energySuitability: [1, 2, 3],
    tags: ['rest', 'recovery', 'burnout', 'guilt-free']
  },
  {
    id: 'strat-06',
    title: 'Friction Reduction & Environment Tuning',
    category: 'transition',
    description: 'Transitioning between tasks requires cognitive switching costs. Minimizing open tabs and visual clutter reduces mental load.',
    actionableTip: 'Close all irrelevant browser tabs, put the phone in another room, and leave only the single required tool open.',
    energySuitability: [2, 3, 4, 5],
    tags: ['environment', 'friction', 'clutter', 'transition']
  }
];

export function retrieveRelevantStrategies(query: string, energyLevel: number, limit: number = 3): Strategy[] {
  const queryLower = query.toLowerCase();
  
  // Score strategies based on keyword matches and energy level
  const scored = KNOWLEDGE_BASE.map(strat => {
    let score = 0;
    
    // Check energy suitability
    if (strat.energySuitability.includes(energyLevel)) {
      score += 3;
    }
    
    // Check keyword matches in title, description, actionableTip, tags
    const text = `${strat.title} ${strat.description} ${strat.actionableTip} ${strat.tags.join(' ')}`.toLowerCase();
    const queryWords = queryLower.split(/\s+/);
    
    queryWords.forEach(word => {
      if (word.length > 2 && text.includes(word)) {
        score += 2;
      }
    });
    
    // Default fallback weight
    score += 1;
    
    return { strat, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.strat);
}
