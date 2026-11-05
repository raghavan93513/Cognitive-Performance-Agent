---
title: Open Decisions
category: 24-synthesis
tags: [decision, planning, synthesis]
aliases: [open questions, decisions to make, blockers]
relationships:
  - target: "[[24-synthesis/design-comparison]]"
    type: derived_from
  - target: "[[02-product/roadmap]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf, binf4070-2026/weeks-01-07]
summary: Decisions the team must make before building, such as scope, study task, watch API, target metric, evidence-agent meaning and desktop OS. Each links to the page with the detail.
provenance:
  extracted: 0.4
  inferred: 0.5
  ambiguous: 0.1
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T19:30:00Z
updated: 2026-11-05T05:00:00Z
---

# Open Decisions

Questions the two design documents leave open or answer differently. Update this page as the team decides. Move each item to **Decided** with the date and rationale.

## Open

1. **Scope of the first build.** Lean desktop pilot or mobile + web + desktop? → [[24-synthesis/design-comparison|Design comparison]] ^[ambiguous]
2. **The study task.** Which single repeatable task produces the performance labels (e.g. timed quiz, coding exercise, reading comprehension)? It is step 1 of the [[02-product/roadmap|roadmap]], and nothing else can be validated without it. ^[inferred] **Lead option (CSO, 2026-11-05):** PVT-B (3 min), with 2–3 familiarisation runs, because practice effects reach d = 0.36–1.19. It measures alertness, not studying, so state that. See [[13-team/pre-build-briefing|Pre-build briefing]].
3. **The prediction target and threshold.** The exact outcome (e.g. accuracy dropping below X in the next interval) must be pre-registered. → [[04-agent-engine/performance-model|Performance model]]
4. **Watch integration.** Google Health, HealthKit or Health Connect, and which physical device(s) the participants will wear. → [[05-data/data-sources|Data sources]] ^[ambiguous] **Input 2026-11-05 (Heramb):** the target users are **US college students on iPhones**, so Health Connect (Android) drops out. That leaves two routes. **Apple Watch** data lives in **HealthKit**, which has no web or cloud API: reading it needs a native iOS app (or a small companion app, or user exports). **Fitbit, Garmin, Oura and Whoop** sync to their own cloud APIs, which a web or Electron app can read with OAuth, whatever phone the user has. This is still the team's call; `/decide` it with the course loaner Fitbit and the Dec 11 deadline in mind. ^[inferred] **New fact 2026-11-04 (checked on Google's page):** the **Fitbit Web API was turned off on 2 Nov 2026** (calls return `410 Gone`). Fitbit data now goes through the **Google Health API**, where most scopes are restricted and unverified apps are capped at 100 users. In Testing mode, refresh tokens reportedly expire after 7 days, which needs verifying. Sync is about every 15 minutes, and every user must re-consent. The cloud limits per vendor: Oura allows 10 users before approval and needs a membership; WHOOP's sandbox allows 10; Garmin business access is reportedly paused. Details: [[12-research/science-and-tech-evidence|Science and tech evidence]] §0 and §6.
5. **What the Evidence agent retrieves.** Personal history (SQL), a curated research corpus (pgvector), or both. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]] ^[ambiguous]
6. **Target desktop OS.** The foreground-app adapter is OS-specific, and Alexa notes the duration depends on it. ^[inferred]
7. **Background jobs.** Postgres task list or a managed queue. → [[05-data/data-pipeline|Data pipeline]] ^[ambiguous]
8. **Which LLM provider** sits behind LangGraph / the provider adapter. Neither doc names one. ^[inferred]
9. **Randomization level.** Per session/block or per participant. → [[12-research/evaluation-plan|Evaluation plan]]
10. ~~**Students vs athletes.**~~ **Answered 2026-11-05 by Heramb: students and athletes**, both in scope for the proposal and the pilot. Confirm with the team. All four advisor seats had recommended students only for Dec 11, and their dissent is recorded in [[13-team/pre-build-briefing|Pre-build briefing]] §3. What it implies:
    - the pilot must actively enrol athletes to say anything about them;
    - athlete HRV logic needs its own gate, because low HRV in training can mean good adaptation (CTO, CSO);
    - no coach view, and nothing reaches staff (casebook B9);
    - design and evaluation work grows.
11. **Research approval.** Does the pilot count as human-subject research that needs institutional review? → [[10-trust-safety/privacy-and-consent|Privacy and consent]] **New fact 2026-11-05 (checked against the policy PDF):** Columbia's IRB policy "Students as Researchers" (effective 16 Mar 2012) lets a course project skip IRB submission only if it meets all four criteria, including **anonymous** data collection. It also says "Research conducted over the internet will not be permitted under this category". Exempt projects still go to the IRB for a determination, and an instructor may request one class-wide determination. A pilot linking wearable data to named classmates looks like it needs review ^[inferred]. The CSO's question list for course staff is in [[13-team/cso-steal-file|CSO steal file]] §F, and the plan is in [[13-team/pre-build-briefing|Pre-build briefing]].
12. **When do we escalate to a human?** The course grades whether the assistant "knows when to escalate to a human". Neither design covers this (e.g. persistent poor sleep, signs of distress). → [[30-course/project-requirements|Project requirements]] ^[inferred]

### Raised by the course material (2026-10-26)

13. **How to choose the Evidence agent's retrieval.** Week 6 says to measure precision@k and recall@k on 20–50 labelled questions, comparing plain SQL, BM25, pgvector and a hybrid. Filter by user *before* ranking. This would settle #5. → [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6]] ^[inferred]
14. **Does minute-level watch data need a time-series store?** Week 7 treats it as time-series data. Plain Postgres is probably fine at pilot scale, but decide deliberately. → [[21-concepts/time-series-feature-extraction|Time-series feature extraction]] ^[inferred]
15. **Do we want a "what if" model?** Dr. Heydari's agent design includes a world model that predicts the effect of an action (e.g. what a walk would do). Ours only predicts performance. → [[30-course/guest-talks/ali-heydari-physiological-world-models|Guest talk]] ^[inferred]
16. **Which user data, if any, goes to a hosted LLM?** Name this data flow explicitly in [[10-trust-safety/privacy-and-consent|Privacy and consent]]. Week 5 lists semantic-operator privacy leaks and prompt injection as risks. ^[inferred]

### Raised by WearLab (2026-10-26)

17. ~~**Reuse WearLab's simulators as our synthetic-data generator?**~~ **Decided 2026-10-26: yes.** See [[20-decisions/adr-001-reuse-wearlab-simulators-for-synthetic-data|ADR-001]].
18. **Which device do participants wear?** The course lends a Fitbit Air, which WearLab's Fitbit catalog doesn't cover. Confirm the model, and whether it reports overnight HRV. → [[22-entities/fitbit|Fitbit]] ^[inferred] **Update 2026-11-05 (CTO):** the Fitbit Air reports HRV, per Google's launch post. Google Health returns it as RMSSD (ms). Confirm by pulling one real night (pre-build briefing P1).
19. **Absolute or personal thresholds?** WearLab's HRV lab uses absolute bands (≥ 50 / < 30 ms), while our design uses personal baselines. Proposed: personal baselines with a 28-night look-back and a 14-night learning period. → [[04-agent-engine/performance-model|Performance model]] ^[inferred]

## Decided

- **2026-10-26 — Reuse WearLab's simulators for synthetic data** (was #17). → [[20-decisions/adr-001-reuse-wearlab-simulators-for-synthetic-data|ADR-001]] · plan: [[05-data/synthetic-data-generator|Synthetic data generator]]

## Sources

- [[31-decks/raghavan-architecture-deck]]
- [[31-decks/alexa-kafka-system-design]]
