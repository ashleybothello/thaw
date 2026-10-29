# Thaw Architecture Overview

## System Architecture

Thaw is structured as a modern full-stack web application using Next.js App Router.

```
┌────────────────────────────────────────────────────────┐
│                   Next.js Frontend                     │
│  (Landing, Dashboard, Tasks, Sequencer, Timer, Rest)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   State Layer                          │
│     (ThawContext + LocalStorage persistence)           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                  API Route Layer                       │
│              (/api/sequence/route.ts)                  │
└──────────────────┬───────────────────┬─────────────────┘
                   │                   │
                   ▼                   ▼
        ┌────────────────────┐ ┌──────────────────┐
        │ RAG Strategy Engine│ │ Anthropic/Gemini │
        │   (lib/rag.ts)     │ │   AI Provider    │
        └────────────────────┘ └──────────────────┘
```

## Data Flow & Persistence
- User state (tasks, energy level, activity history) is maintained in React Context and persisted in browser LocalStorage.
- AI task sequencing requests are routed through `/api/sequence`, where relevant non-clinical strategies are retrieved via RAG and injected into the LLM prompt. If no API key is present, a deterministic fallback ensures uninterrupted demo functionality.
