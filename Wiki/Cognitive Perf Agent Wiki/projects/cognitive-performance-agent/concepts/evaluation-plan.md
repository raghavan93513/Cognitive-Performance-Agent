---
title: Evaluation Plan
category: concepts
tags: [evaluation, research, ml]
aliases: [experiment design, release gates, how we know it works]
relationships:
  - target: "[[projects/cognitive-performance-agent/concepts/performance-model]]"
    type: related_to
  - target: "[[projects/cognitive-performance-agent/concepts/student-interface-and-feedback]]"
    type: uses
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: How the team will test the two core claims, that watch data improves prediction and that adaptive breaks beat fixed breaks, using randomized sessions, pre-registration and release gates.
provenance:
  extracted: 0.9
  inferred: 0.1
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Evaluation Plan

The project is built to **test a hypothesis**, not to assume it. Both designs footer every claim with "no measured improvement claimed".

## The two separate questions

1. **Prediction:** does watch data improve prediction of task performance beyond laptop-only data?
2. **Intervention:** do adaptive breaks improve task outcomes compared with a **fixed-break baseline**?

These are different tests. A model can predict well while its suggested breaks don't help, and the reverse can also happen. A negative result should **simplify the product**, for example by dropping the wearable.

## Design

- **Pre-register** the primary outcome and analysis plan before looking at intervention effects.
- **Randomize** adaptive vs fixed-break schedules by session/block or by participant. Pick the level by thinking about carryover and contamination, and document why.
- **Freeze the evaluated policy** during a trial. Update models offline only after reviewing results.
- Track task accuracy, task duration, recovery time, intervention completion, adverse or uncomfortable experiences, missing outcomes and usability.
- Run **modality ablations** to measure the extra value of wearable, laptop/phone activity and optional CGM signals.
- Report uncertainty, confidence intervals, exclusions, missingness and subgroup limits. Don't overstate small or exploratory results.

## Causal caution

Recommendation **acceptance is a process measure, not proof of benefit**. Someone may accept advice without improving, or ignore good advice. Measure outcomes independently and keep prediction quality separate from intervention effectiveness.

## Release gates (Alexa)

| Gate | Evidence required before advancing |
|---|---|
| Data readiness | Source permissions work; timestamps/units validated; freshness and missingness visible; dedup tested |
| Model readiness | Participant/time-aware holdout evaluation; calibration and uncertainty assessed; fallback tested |
| Policy readiness | Allowlist, consent, quiet hours, stale-data, rate-limit and failure-path tests pass |
| Pilot readiness | Consent materials, support/contact process, incident response, protocol review complete |
| Scale-up readiness | No material safety/privacy regressions; primary outcome and operational metrics reviewed; versions reproducible |

## Research ethics

If the project involves human-subject research, work out the institutional review, consent, privacy and data-management requirements **before recruiting participants**. See [[projects/cognitive-performance-agent/concepts/privacy-and-consent|Privacy and consent]].

## Sources

- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck]] — slides 8, 10
- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design]] — §10.2, §11
