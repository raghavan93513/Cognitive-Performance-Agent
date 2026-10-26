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
updated: 2026-10-26T20:30:00Z
---

# Open Decisions

Questions the two design documents leave open or answer differently. Update this page as the team decides. Move each item to **Decided** with the date and rationale.

## Open

1. **Scope of the first build.** Lean desktop pilot or mobile + web + desktop? → [[24-synthesis/design-comparison|Design comparison]] ^[ambiguous]
2. **The study task.** Which single repeatable task produces the performance labels (e.g. timed quiz, coding exercise, reading comprehension)? It is step 1 of the [[02-product/roadmap|roadmap]], and nothing else can be validated without it. ^[inferred]
3. **The prediction target and threshold.** The exact outcome (e.g. accuracy dropping below X in the next interval) must be pre-registered. → [[04-agent-engine/performance-model|Performance model]]
4. **Watch integration.** Google Health, HealthKit or Health Connect, and which physical device(s) the participants will wear. → [[05-data/data-sources|Data sources]] ^[ambiguous]
5. **What the Evidence agent retrieves.** Personal history (SQL), a curated research corpus (pgvector), or both. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]] ^[ambiguous]
6. **Target desktop OS.** The foreground-app adapter is OS-specific, and Alexa notes the duration depends on it. ^[inferred]
7. **Background jobs.** Postgres task list or a managed queue. → [[05-data/data-pipeline|Data pipeline]] ^[ambiguous]
8. **Which LLM provider** sits behind LangGraph / the provider adapter. Neither doc names one. ^[inferred]
9. **Randomization level.** Per session/block or per participant. → [[15-research/evaluation-plan|Evaluation plan]]
10. **Students vs athletes.** The README names both audiences, but both designs only describe study sessions. Is an athlete use case in scope for the pilot? ^[inferred]
11. **Research approval.** Does the pilot count as human-subject research that needs institutional review? → [[13-trust-safety/privacy-and-consent|Privacy and consent]]
12. **When do we escalate to a human?** The course grades whether the assistant "knows when to escalate to a human". Neither design covers this (e.g. persistent poor sleep, signs of distress). → [[30-course/project-requirements|Project requirements]] ^[inferred]

### Raised by the course material (2026-10-26)

13. **How to choose the Evidence agent's retrieval.** Week 6 says to measure precision@k and recall@k on 20–50 labelled questions, comparing plain SQL, BM25, pgvector and a hybrid. Filter by user *before* ranking. This would settle #5. → [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6]] ^[inferred]
14. **Does minute-level watch data need a time-series store?** Week 7 treats it as time-series data. Plain Postgres is probably fine at pilot scale, but decide deliberately. → [[21-concepts/time-series-feature-extraction|Time-series feature extraction]] ^[inferred]
15. **Do we want a "what if" model?** Dr. Heydari's agent design includes a world model that predicts the effect of an action (e.g. what a walk would do). Ours only predicts performance. → [[30-course/guest-talks/ali-heydari-physiological-world-models|Guest talk]] ^[inferred]
16. **Which user data, if any, goes to a hosted LLM?** Name this data flow explicitly in [[13-trust-safety/privacy-and-consent|Privacy and consent]]. Week 5 lists semantic-operator privacy leaks and prompt injection as risks. ^[inferred]

## Decided

*Nothing yet.*

## Sources

- [[31-decks/raghavan-architecture-deck]]
- [[31-decks/alexa-kafka-system-design]]
