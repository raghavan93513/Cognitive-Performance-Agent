---
title: Hot Cache
updated: 2026-10-26T19:30:00Z
---

# Hot Cache

*A ~500-word semantic snapshot of recent activity. Updated after every major write operation.*

## Recent Activity

- [2026-10-26] INIT: vault created for the Cognitive Performance Agent, routed with `@cogperf`.
- [2026-10-26] Ingested the repo's README and both system-design PDFs. This produced the project hub, 12 component pages (architecture, data sources, pipeline, model, agents, UI/feedback, evaluation, privacy, DB/API, stack, roadmap, ops), a design comparison, an open-decisions list, 2 source summaries, and 5 global pages (HRV, RAG, LangGraph, two team members).

## Active Threads

- **Pick a design.** Raghavan's lean Electron pilot or Alexa's mobile + web + desktop production plan. See [[projects/cognitive-performance-agent/synthesis/design-comparison]].
- **Pick the study task and prediction target.** Nothing can be validated without them. See [[projects/cognitive-performance-agent/synthesis/open-decisions]].
- **Resolve what the Evidence agent retrieves:** personal history via SQL, or a research corpus via pgvector.

## Key Takeaways

- The project is design-only; there is no code in the repo yet.
- Watch = context, laptop = behaviour, study task = measured performance.
- Numeric code produces the estimate. The LLM agents only propose an action, and deterministic policy code decides.
- When data is thin it abstains with "Not enough data", and manual break controls stay available.
- Two separate hypotheses to test: watch data improves prediction, and adaptive breaks beat fixed breaks. A negative result simplifies the product.

## Flagged Contradictions

- Clients: Electron-only (Raghavan) vs React Native + Next.js + desktop (Alexa).
- Watch API: Google Health vs HealthKit/Health Connect.
- Background jobs: Postgres task list vs managed queue.
- Evidence agent: personal history (SQL) vs approved research snippets (pgvector).
