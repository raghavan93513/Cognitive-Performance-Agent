---
title: "Week 08 — HCI for Personal Health Assistants: Interface, Trust & Uncertainty"
category: 30-course
tags: [course, week, hci, design]
aliases: [Week 8, Design studio]
sources: ["personal-health-agent.github.io/src/content/weeks/08-hci.md"]
summary: Oct 30 design studio — show uncertainty, say "I don't know", earn trust without overstepping; produces the storyboard, user flow and low-fi prototype for the proposal.
provenance:
  extracted: 0.5
  inferred: 0.5
  ambiguous: 0.0
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
week: 8
date: 2026-10-30
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 08 — HCI: Interface, Trust & Uncertainty

> [!info] Fri **Oct 30** · Slides and lab **not released yet** (as of Oct 26). Update this page when they come out.
> **Objective:** "Design how your assistant talks to a real person: showing uncertainty, knowing when to say 'I don't know', and earning trust without overstepping. The design studio produces the storyboard, user flow, and low-fidelity prototype you bring to next week's proposal."

## Readings

- [[30-course/readings/amershi-2019-human-ai-guidelines|Amershi et al. 2019 — Guidelines for Human-AI Interaction]] (CHI)
- [[30-course/readings/bucinca-2021-cognitive-forcing|Bučinca et al. 2021 — To Trust or to Think: Cognitive Forcing Functions]] (CSCW)

## What to walk out with

1. **Storyboard.** A student mid-study gets a suggestion and acts on it.
2. **Core user flow.** Start session → work → suggestion card → accept / snooze / decline → follow-up task → history.
3. **Low-fidelity prototype** of the suggestion card and the "Not enough data" state.

All three go into the [[30-course/deliverables/part-2-proposal-presentation|Nov 6 proposal]].

## What this means for us ^[inferred]

- The **suggestion card** is our whole product surface. It must show the action, the reason, the evidence and the uncertainty without reading like a diagnosis. → [[08-frontend/student-interface-and-feedback|Student interface]]
- **Saying "I don't know"** is already our abstain state. Design it as a first-class screen, not an error.
- **Trust without overstepping:** we recommend and never act. Snoozing or declining must cost the student nothing.
- **Cognitive forcing** (Bučinca) suggests sometimes asking the student how they feel *before* showing our estimate, so they don't just defer to it. That's a possible experiment arm for [[15-research/evaluation-plan|Evaluation plan]].
- Interruptions are themselves a cost to focus. Rate limits and quiet hours are a design concern, not only a policy concern. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]

## Related

- [[09-design/09-design|09-design]] · [[30-course/30-course|Course hub]]
