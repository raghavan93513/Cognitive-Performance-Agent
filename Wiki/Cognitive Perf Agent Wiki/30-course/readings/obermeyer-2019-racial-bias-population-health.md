---
title: "Obermeyer 2019 — Racial Bias in a Population-Health Algorithm"
category: 30-course
tags: [course, reading, bias, ethics, ml]
aliases: ["Dissecting racial bias in an algorithm used to manage the health of populations"]
sources: ["https://doi.org/10.1126/science.aax2342"]
summary: A widely used care-management algorithm predicted cost instead of illness. Because less is spent on Black patients, it under-ranked them. Proxy-label choice is a major source of algorithmic bias.
provenance:
  extracted: 0.5
  inferred: 0.5
  ambiguous: 0.0
base_confidence: 0.45
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 13
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Obermeyer 2019 — Racial Bias in a Population-Health Algorithm

> [!cite] Ziad Obermeyer, Brian Powers, Christine Vogeli, Sendhil Mullainathan. *Dissecting racial bias in an algorithm used to manage the health of populations.* Science, 2019. https://doi.org/10.1126/science.aax2342
> Assigned in [[30-course/weeks/week-13-privacy-safety-ethics-integration|Week 13 — Privacy, Safety, Ethics and Integration]].

## Core idea

- Health systems use commercial algorithms to pick out patients with complex needs for extra care-management help. The authors studied one **widely used algorithm, typical of the industry, affecting millions of patients**.
- **At the same risk score, Black patients were considerably sicker than White patients**, judged by signs of uncontrolled illness.
- **Mechanism:** the algorithm predicts **health-care costs**, not illness. Unequal access to care means **less money is spent on Black patients** with the same needs, so cost is a biased proxy for health.

## Key findings

- Fixing the disparity would raise the share of Black patients selected for extra help **from 17.7% to 46.5%** (from the abstract).
- Cost *looked like* a good proxy for health by some measures of predictive accuracy, yet it produced large racial bias. The bias is invisible if you only check accuracy.
- General lesson: **choosing convenient, seemingly effective proxies for ground truth** can be a major source of algorithmic bias in many settings.
- From general knowledge of the paper ^[inferred]:
  - The study used the algorithm's own scores alongside detailed patient health data from one large health system.
  - The authors worked with the manufacturer, and retraining on a health-based label rather than cost greatly reduced the bias.
  - The model did not use race as an input. Bias entered through the **label**.

## Why the course assigned it

- Week 13 covers the **privacy, safety and bias rules** around health data before teams red-team and integrate their systems. Obermeyer is the landmark case showing bias can come from *what you predict*, not only from *who is in the data*. ^[inferred]
- It completes a thread from Week 3: [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding 2020]] shows bias in a **sensor**, and Obermeyer shows bias in a **label**. ^[inferred]

## What this means for us

- **Our label is a proxy too.** The [[04-agent-engine/performance-model|performance model]] predicts a defined task outcome, such as accuracy dropping on the study task. That is a proxy for "should take a break" or "cognitive fatigue". We must state that gap explicitly and check it, for example against self-reported fatigue. ^[inferred]
- **Watch for access-like confounders.** Students with heavier workloads, jobs or worse sleep conditions may show different baselines. A model trained on "who performed well" can learn privilege rather than fatigue. ^[inferred]
- **Audit by subgroup, at equal scores.** Copy Obermeyer's method in the [[12-research/evaluation-plan|evaluation plan]]: at the same predicted risk, do different groups have the same actual outcomes? ^[inferred]
- Not using a sensitive attribute as input does **not** make a model fair. The fairness section of [[10-trust-safety/privacy-and-consent|privacy and consent]] should say so. ^[inferred]
- The choice of target metric is already flagged on [[24-synthesis/open-decisions|open decisions]]. This paper is the strongest argument for treating that choice as an ethical decision, not just a technical one. ^[inferred]

## Read status

- **Abstract only** (via Europe PMC / PubMed metadata) on 2026-10-26. The full text is paywalled at Science. Details beyond the abstract are from general knowledge and marked ^[inferred].
