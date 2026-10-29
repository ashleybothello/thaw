# Thaw — A Gentle Co-Pilot for Getting Unstuck

**Thaw** is an AI-powered adaptive planner and executive-function co-pilot designed for university students experiencing task paralysis, overwhelm, or burnout.

---

## Problem Statement & Philosophy

Conventional productivity apps rely on rigid schedules, alarms, shaming overdue labels, and broken streaks. For neurodivergent students or anyone experiencing executive dysfunction, these features often worsen anxiety and paralysis. 

Thaw replaces pressure with:
1. **Spoon Energy Check-in:** A 1–5 spoons scale that adjusts recommendations to daily capacity.
2. **AI-Assisted Micro-Steps:** Turning daunting projects into 2-minute starting steps grounded in RAG cognitive strategies.
3. **Guilt-Free Rest Mode:** First-class rest sanctuaries without punitive scoring or streak guilt.
4. **Privacy-First Architecture:** Local-first storage with transparent data controls.

---

## Key Features

- **Landing Page:** Immersive scenic storytelling introducing the problem and solution.
- **Dashboard:** Centralized hub featuring the Spoon Energy Budget and current focus task.
- **My Tasks:** Interactive task manager with deadlines, spoon requirements, and duration estimates.
- **AI Task Sequencer:** RAG-powered engine providing compassionate acknowledgment and microscopic steps.
- **Focus Timer:** 2-minute starter timer with calm body-double presence.
- **Rest Mode:** Dedicated sanctuary with guided breathing pacer.
- **Adaptive Weekly Planner:** Energy-aware weekly grid with one-click rebalancing.
- **Activity History:** Neutral reflection log of completed work.
- **Settings & Privacy Centre:** Full control over local storage and reduced-motion preferences.

---

## Technology Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS + Lucide Icons + Glassmorphism UI
- **State Management:** React Context + LocalStorage persistence
- **AI & RAG:** Server-side API route with RAG strategy retrieval and Anthropic/Gemini integration (with robust local fallback).

---

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:3000`.

---

## Environment Variables (`.env.example`)

```env
# Optional: Anthropic Claude API Key for Live AI Task Sequencing
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```
