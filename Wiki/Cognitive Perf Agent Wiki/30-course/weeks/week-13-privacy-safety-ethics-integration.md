---
title: "Week 13 — Privacy, Safety, Ethics, Governance & Integration"
category: 30-course
tags: [course, week, privacy, security]
aliases: [Week 13, Mock demo, Integration checkpoint]
sources: ["personal-health-agent.github.io/src/content/weeks/13-privacy-integration.md", "https://personal-health-agent.github.io/project-details/"]
summary: Dec 4 — privacy, safety and bias rules for health data; red-team each other's agents; wire the system end to end. Integration checkpoint and mock demo.
provenance:
  extracted: 0.45
  inferred: 0.55
  ambiguous: 0.0
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 13
date: 2026-12-04
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 13 — Privacy, Safety, Ethics, Governance & Integration

> [!info] Fri **Dec 4** · **Integration checkpoint + mock demo**, a rehearsal for the [[30-course/deliverables/part-3-final-showcase|showcase]] · Slides and lab not released yet.
> **Objective:** "Cover the privacy, safety, and bias rules around health data, try to break each other's agents, then wire your own system together end to end."

## Readings

- [[30-course/readings/obermeyer-2019-racial-bias-population-health|Obermeyer et al. 2019 — Racial bias in a population-health algorithm]] (Science)
- [[30-course/readings/greshake-2023-indirect-prompt-injection|Greshake et al. 2023 — Indirect prompt injection]] (AISec)
- [[30-course/readings/owasp-2025-llm-top-10|OWASP 2025 — Top 10 for LLM Applications]]

## What this means for us ^[inferred]

- **Red-teaming:** classmates will try to make our agent diagnose, override a rate limit, or follow instructions planted in retrieved text. Our policy engine and "retrieved text is untrusted" rule are the defences. Test them before Dec 4. → [[13-trust-safety/privacy-and-consent|Privacy and consent]]
- **Bias:** optical HR is less accurate on some skin tones (see [[30-course/weeks/week-03-wearable-sensors-and-measurements|week 3]]), so a model leaning on HR could serve some students worse. Report subgroup performance where we ethically can. → [[15-research/evaluation-plan|Evaluation plan]]
- **Integration by Dec 4** means the full path (collector → backend → model → agents → UI) must already run. Plan the [[02-product/roadmap|roadmap]] backwards from this date, not from Dec 11.
