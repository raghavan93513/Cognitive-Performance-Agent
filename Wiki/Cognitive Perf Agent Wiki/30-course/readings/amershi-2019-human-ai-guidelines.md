---
title: "Amershi 2019 — Guidelines for Human-AI Interaction"
category: 30-course
tags: [course, reading, hci, design]
aliases: ["Guidelines for Human-AI Interaction", "Microsoft HAI guidelines"]
sources: ["https://doi.org/10.1145/3290605.3300233"]
summary: 18 validated design guidelines for AI-infused products, grouped as Initially, During interaction, When wrong and Over time. Assigned as the Week 8 design checklist for how an assistant should behave.
provenance:
  extracted: 0.65
  inferred: 0.35
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 08
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Amershi 2019 — Guidelines for Human-AI Interaction

> [!cite] Saleema Amershi, Dan Weld, Mihaela Vorvoreanu, Adam Fourney, Besmira Nushi, Penny Collisson, Jina Suh, Shamsi Iqbal, Paul N. Bennett, Kori Inkpen, Jaime Teevan, Ruth Kikin-Gil, Eric Horvitz. *Guidelines for Human-AI Interaction.* CHI 2019. https://doi.org/10.1145/3290605.3300233
> Assigned in [[30-course/weeks/week-08-hci-interface-trust-uncertainty|Week 8 — HCI: Interface, Trust and Uncertainty]].

## Core idea

- AI-infused systems are probabilistic, can be wrong in unpredictable ways, and change as they learn. That breaks classic usability assumptions.
- The authors distilled more than 20 years of human-AI interaction research into **18 generally applicable guidelines**. They validated them in several rounds, including a user study in which **49 design practitioners** tested them against **20 popular AI products**.

## Key findings

The 18 guidelines, in the paper's four phases:

**Initially**
- G1 Make clear what the system can do.
- G2 Make clear how well it can do it, including how often it makes mistakes.

**During interaction**
- G3 Time services based on context, meaning when to act or interrupt given the user's task and environment.
- G4 Show contextually relevant information.
- G5 Match relevant social norms.
- G6 Mitigate social biases.

**When wrong**
- G7 Support efficient invocation.
- G8 Support efficient dismissal.
- G9 Support efficient correction.
- G10 Scope services when in doubt: disambiguate, or **gracefully degrade** when unsure of the user's goal.
- G11 Make clear why the system did what it did.

**Over time**
- G12 Remember recent interactions.
- G13 Learn from user behaviour.
- G14 Update and adapt cautiously.
- G15 Encourage granular feedback.
- G16 Convey the consequences of user actions.
- G17 Provide global controls.
- G18 Notify users about changes.

- The evaluation confirmed the guidelines are relevant across many scenarios, and also exposed gaps where products commonly violate them or where the guidance needs refinement. ^[inferred]

## Why the course assigned it

- Week 8's objective is to design how the assistant talks to a real person: showing uncertainty, knowing when to say "I don't know", and earning trust without overstepping. The design studio produces the storyboard, user flow and low-fidelity prototype for the proposal. Amershi is the checklist for that studio. ^[inferred]

## What this means for us

A guideline-by-guideline audit of our design ^[inferred]:

- **G1/G2:** onboarding must say plainly that the agent suggests continue, walk or break, is wellness-only, and how often its suggestions turn out wrong. See [[08-frontend/student-interface-and-feedback|student interface and feedback]] and [[10-trust-safety/privacy-and-consent|privacy and consent]]. ^[inferred]
- **G3 is our core problem.** *When* to interrupt is the product. Suggestions should come at task boundaries, never mid-question. ^[inferred]
- **G7–G9:** accept, snooze and decline are efficient dismissal and correction. Add "ask now" for invocation. ^[inferred]
- **G10:** matches the abstain path in [[04-agent-engine/performance-model|performance model]]. ^[inferred]
- **G11:** matches "show the reason and sources". ^[inferred]
- **G13–G16:** learning from accept and decline must be cautious and visible, for example "you usually snooze before 11 am, so we'll ask less then". ^[inferred]
- **G17:** a global pause and data controls are already in the privacy design. ^[inferred]
- **G18:** tell students when the model or policy changes mid-study. This also matters for the integrity of the [[12-research/evaluation-plan|evaluation plan]]. ^[inferred]
- **G6:** check that recommendation rates do not differ unfairly across groups, as in the Week 3 and Week 13 bias readings. ^[inferred]

## Read status

- **Full text** of the camera-ready paper read on 2026-10-26 (PDF from Microsoft Research): abstract, introduction and Table 1 (the guidelines). The study details were skimmed.
