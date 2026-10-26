---
title: Student Interface and Feedback
category: 08-frontend
tags: [frontend, evaluation, students]
aliases: [student interface, show suggestion, accept snooze decline]
relationships:
  - target: "[[04-agent-engine/multi-agent-decision]]"
    type: uses
  - target: "[[15-research/evaluation-plan]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: Stage 5. Show the action, reason and sources; the student accepts, snoozes or declines; a comparable follow-up task measures what happened. Closes the feedback loop.
provenance:
  extracted: 0.85
  inferred: 0.05
  ambiguous: 0.1
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Student Interface and Feedback

Stage 5 of the [[07-backend/system-architecture|system architecture]]: **Suggestion → Student choice → Later task → History**. It gives the student control and closes the feedback loop.

## What the student sees

- The suggested action (**continue / short walk / break**), the **reason**, the **sources/evidence** and the **uncertainty**.
- Start/pause collection and the status of each data source.
- Accept, snooze or decline buttons.
- Manual break controls stay available even when the system says "Not enough data".

## Which app shows it ^[ambiguous]

- **Raghavan:** React inside the same Electron app that collects laptop data. "A separate Next.js website is not needed for the first build."
- **Alexa:** a React Native mobile app plus a Next.js web app. Its core screens are onboarding and consent, data-source connections, current recommendation and rationale, action feedback, task session and outcome entry, history, privacy controls, and account export/deletion. The web app also serves researcher workflows and experiment administration.

## Recording the choice

- Keep **accept / snooze / decline** separate from whether the break was **actually completed**.
- Use a **stable recommendation ID** so retries don't create duplicate prompts.
- A declined suggestion is a valid response.
- Intervention events tracked: shown, accepted, snoozed, completed, ignored, cancelled.

## Measuring what happened

- Record a **comparable follow-up task** after the suggestion.
- Report accuracy and speed separately, and include break time in fixed-wall-clock comparisons.
- A missing follow-up stays missing and is not filled in.
- Responses and outcomes are saved in PostgreSQL, and later sessions use this history.

How these outcomes are used to judge the product is on [[15-research/evaluation-plan|Evaluation plan]].

## Sources

- [[31-decks/raghavan-architecture-deck]] — slide 8
- [[31-decks/alexa-kafka-system-design]] — §4.1–4.2, §9.1
