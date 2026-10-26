---
title: Heart Rate Variability (HRV)
category: concepts
tags: [physiology, wearables]
aliases: [HRV, RMSSD]
relationships:
  - target: "[[projects/cognitive-performance-agent/concepts/data-sources]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf]
summary: Variation in time between heartbeats, usually reported by watches as overnight RMSSD in ms. The project uses it only as daily context, never as a live focus score.
provenance:
  extracted: 0.6
  inferred: 0.4
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Heart Rate Variability (HRV)

The variation in time between consecutive heartbeats. ^[inferred] Wearables commonly summarize it as **RMSSD** (root mean square of successive differences), in milliseconds. ^[inferred]

## How the Cognitive Performance Agent uses it

- Read as **overnight RMSSD** from the watch, via Google Health in Raghavan's deck.
- Interpreted as a **change from the student's own usual overnight level**, so a personal baseline is needed.
- It is **daily context, not a live focus score**. Don't assume continuous daytime HRV is available.
- Whether HRV improves prediction beyond laptop data is an **open test**, not an assumption. See [[projects/cognitive-performance-agent/concepts/performance-model|Performance model]].
- An LLM must never infer a fatigue score directly from HRV. Numeric code handles it.

## Sources

- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck]] — slides 2, 4, 6 (cites Google Health sleep/vitals data-type docs)
