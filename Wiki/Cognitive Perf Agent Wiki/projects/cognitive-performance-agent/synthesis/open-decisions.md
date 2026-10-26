---
title: Open Decisions
category: synthesis
tags: [decision, planning, synthesis]
aliases: [open questions, decisions to make, blockers]
relationships:
  - target: "[[projects/cognitive-performance-agent/synthesis/design-comparison]]"
    type: derived_from
  - target: "[[projects/cognitive-performance-agent/concepts/roadmap]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
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
updated: 2026-10-26T19:30:00Z
---

# Open Decisions

Questions the two design documents leave open or answer differently. Update this page as the team decides. Move each item to **Decided** with the date and rationale.

## Open

1. **Scope of the first build.** Lean desktop pilot or mobile + web + desktop? → [[projects/cognitive-performance-agent/synthesis/design-comparison|Design comparison]] ^[ambiguous]
2. **The study task.** Which single repeatable task produces the performance labels (e.g. timed quiz, coding exercise, reading comprehension)? It is step 1 of the [[projects/cognitive-performance-agent/concepts/roadmap|roadmap]], and nothing else can be validated without it. ^[inferred]
3. **The prediction target and threshold.** The exact outcome (e.g. accuracy dropping below X in the next interval) must be pre-registered. → [[projects/cognitive-performance-agent/concepts/performance-model|Performance model]]
4. **Watch integration.** Google Health, HealthKit or Health Connect, and which physical device(s) the participants will wear. → [[projects/cognitive-performance-agent/concepts/data-sources|Data sources]] ^[ambiguous]
5. **What the Evidence agent retrieves.** Personal history (SQL), a curated research corpus (pgvector), or both. → [[projects/cognitive-performance-agent/concepts/multi-agent-decision|Multi-agent decision]] ^[ambiguous]
6. **Target desktop OS.** The foreground-app adapter is OS-specific, and Alexa notes the duration depends on it. ^[inferred]
7. **Background jobs.** Postgres task list or a managed queue. → [[projects/cognitive-performance-agent/concepts/data-pipeline|Data pipeline]] ^[ambiguous]
8. **Which LLM provider** sits behind LangGraph / the provider adapter. Neither doc names one. ^[inferred]
9. **Randomization level.** Per session/block or per participant. → [[projects/cognitive-performance-agent/concepts/evaluation-plan|Evaluation plan]]
10. **Students vs athletes.** The README names both audiences, but both designs only describe study sessions. Is an athlete use case in scope for the pilot? ^[inferred]
11. **Research approval.** Does the pilot count as human-subject research that needs institutional review? → [[projects/cognitive-performance-agent/concepts/privacy-and-consent|Privacy and consent]]

## Decided

*Nothing yet.*

## Sources

- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck]]
- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design]]
