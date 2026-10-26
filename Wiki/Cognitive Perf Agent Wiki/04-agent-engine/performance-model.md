---
title: Performance Model
category: 04-agent-engine
tags: [ml, evaluation, architecture]
aliases: [analyze performance, readiness model, numeric model]
relationships:
  - target: "[[05-data/data-pipeline]]"
    type: uses
  - target: "[[04-agent-engine/multi-agent-decision]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: Stage 3. Predict a defined task outcome (e.g. accuracy dropping) with rules first, then a regularized scikit-learn model, returning an estimate plus uncertainty, or abstaining.
provenance:
  extracted: 0.9
  inferred: 0.1
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Performance Model

Stage 3 of the [[07-backend/system-architecture|system architecture]]: **Study summary → Data check → Numeric model → Result (estimate + uncertainty)**.

## Define a measurable target, not a "brain score"

Both designs reject an unexplained universal "readiness" or productivity score. The target is a defined, observable task outcome. For example: *the probability that task accuracy will fall below a pre-registered threshold in the next task interval*. The exact target and threshold are chosen with the research protocol and validated against real task outcomes.

## Features (start small)

- App switches per active minute
- Idle fraction
- Session duration
- Recent task accuracy
- Then **test** whether sleep, overnight [[21-concepts/heart-rate-variability|HRV]] and movement-adjusted HR improve prediction beyond laptop data alone.

## Modelling approach

1. **Transparent rules first.** These work before enough labels exist, and small pilots can stay in rule-based mode.
2. **Then a regularized scikit-learn model**, such as regularized logistic regression, once independent task labels are collected.
3. **Compare laptop-only vs wearable-enhanced models** on later sessions.
4. Use rolling **personal baselines** where within-person change matters. Keep population-level and personal features distinct.
5. Train offline with **participant-level and time-aware splits**. Never randomly split rows when the same person's sessions could land in both train and test.
6. Measure discrimination **and calibration**. If probabilities are shown, recalibrate as needed.
7. Version data definitions, feature transforms, training code, model artifact and evaluation report together.

**The LLM never computes this score.** Numeric code produces the estimate, and an LLM does not infer fatigue directly from HRV.

## Data check and abstention

- The check asks whether enough recent, valid data exists.
- No watch data → use a validated **laptop-only** model.
- Essential session data missing, or confidence below threshold, or the input is out of distribution → **abstain**: show "Not enough data" / "not enough recent data to personalize a recommendation". Manual break controls stay available.
- Each prediction returns the estimate, uncertainty, model version, feature-window reference and quality flags.

## Drift and release gates (Alexa)

- Track feature distributions, missingness, calibration, subgroup performance and task-outcome relationships.
- Run offline evaluation and a staged rollout before replacing a model, and keep the previous artifact for rollback.
- Recommendation **acceptance alone is not evidence** that the model improves performance.

## Sources

- [[31-decks/raghavan-architecture-deck]] — slide 6
- [[31-decks/alexa-kafka-system-design]] — §7
