---
title: Hot Cache
updated: 2026-10-26T21:50:00Z
---

# Hot Cache

*A ~500-word semantic snapshot of recent activity. Updated after every major write operation.*

## Recent Activity

- [2026-10-26] **Ingested WearLab** (Heramb's 3D wearables-explainer app) into a new `32-wearlab` folder. It added 8 product and pipeline pages, 6 new concept pages (SpO₂, ECG/AF, step counting, sleep staging, recovery/strain, temperature trends), 5 brand pages, a competitive landscape, and a reuse plan. All WearLab tests pass read-only.
- [2026-10-26] **Restructured into a startup-style vault.** It now has 17 company domains (01–17), a knowledge layer (20–25) and context (30 course, 31 decks), with a hub page per folder. The 22 existing pages moved and their links were rewritten.
- [2026-10-26] **Ingested the whole BINF 4070 course.** That covers weeks 1–7 slides and labs (358 slide pages), weeks 5–7 exercises, the schedule, the project requirements and the guest talk. It produced 13 week pages, 26 reading pages, 8 new concept pages, deliverable pages, staff pages and a requirements gap check.

## Active Threads

- **Proposal prep, due Nov 6** (design studio Oct 30). Checklist on [[30-course/deliverables/part-2-proposal-presentation]].
- **Decide scope.** Lean desktop pilot or production plan. The course readings lean towards the lean choices: Postgres first, SQL retrieval before pgvector. See [[24-synthesis/design-comparison]].
- **Open decisions** grew to 16, including choosing retrieval by measured precision/recall, escalation to a human, and which data goes to a hosted LLM. See [[24-synthesis/open-decisions]].

## Key Takeaways

- **WearLab can be our synthetic-data generator.** Its night, step and PPG simulators run headless; reusing them is about 1–2 days of work and needs Heramb's OK plus a licence. See [[32-wearlab/what-we-reuse]].
- **Wrist HR locks onto step cadence while walking**, so ignore HR when steps > 0. Use personal baselines: a 28-night look-back and a 14-night learning period.
- The project is the BINF 4070 final project. The course grades grounding with visible sources, honest uncertainty, escalation to a human, a non-technical UI, and safety designed in.
- **Watch data is sparse, synced and noisy.** HR arrives roughly every 5 minutes after cloud sync and is worst during motion, so use it as daily context only. The course labs never fetch HRV, so it's unverified.
- **Pipeline corrections from the course:**
  - bucket daily data by the student's local day;
  - use time-based windows with coverage counts, and treat gaps as unknown, not 0;
  - align sources with as-of joins;
  - pick one step source;
  - add database CHECKs and versioned transformations.
- Retrieved text is untrusted: keep allowlisted typed actions and a policy veto (prompt injection).

## Flagged Contradictions

- Clients: Electron-only (Raghavan) vs RN + Next.js + desktop (Alexa).
- Watch API: Google Health vs HealthKit/Health Connect. The course loaner Fitbit favours Google Health.
- Evidence agent: personal history (SQL) vs research corpus (pgvector).
- The course's week 7 reading cites "Freedman et al., *Sensors* 2020", but that DOI doesn't resolve. The matching paper looks like Grzesik & Mrozek, ICCS 2020; confirm with course staff.
