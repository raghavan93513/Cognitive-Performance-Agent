---
title: "Estrin 2014 — Small Data, Where N = Me"
category: 30-course
tags: [course, reading, data, foundation]
aliases: ["Small data, where N = me", "Estrin 2014"]
sources: ["https://cacm.acm.org/opinion/small-data-where-n-me/"]
summary: Estrin argues that our everyday digital traces are "small data" that can serve as n=me evidence about our own health, if services give the data back to us. Sets the course's personal-data framing.
provenance:
  extracted: 0.6
  inferred: 0.4
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 01
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Estrin 2014 — Small Data, Where N = Me

> [!cite] Deborah Estrin. *Small Data, Where N = Me.* Communications of the ACM (Viewpoint), 2014. https://cacm.acm.org/opinion/small-data-where-n-me/
> Assigned in [[30-course/weeks/week-01-personal-health-data-foundations|Week 1 — Personal Health Data Foundations]].

## Core idea

- Big data and the -omics get the attention, but a second force will reshape health: **small data**, the digital traces each of us leaves while working, shopping, sleeping, eating, moving and communicating.
- Analysed over time for one person, these traces form a personal **"behavioral pulse"**: a signal of subtle but meaningful change in day-to-day behaviour, comparable to a "check engine light".
- This is a new kind of medical evidence, **evidence where n = me**, that complements big-N population studies with data about one person over time.
- The first step is **data liberation**: services that already collect these traces should return them to the person in a usable format, behind a common open architecture (the essay compares it to how HTTP enabled the web).

## Key findings

This is an opinion piece, so its "findings" are arguments:

- EHRs capture what clinicians report about treatment, not what patients do every day; digital traces fill that gap.
- Many chronic conditions (chronic pain, depression, Crohn's and others) vary day to day and change gradually, so people cannot judge whether a treatment works from memory alone. Behavioural traces can show it.
- Estrin explicitly rules out apps doing detailed diagnosis or replacing doctors and family; the aim is personalised insight such as early warning signs or signs of gradual improvement.
- The data already exist, so no new hardware is needed. The obstacles are access, turning noisy data into insight, and regulation (FDA, HIPAA, whether this is medical data or more like a personal diary).
- A personal story about her father's decline (he stopped emailing, his shopping routine changed) shows signals that a behavioural pulse could have caught.
- Open mHealth and Cornell Tech are presented as efforts toward standard interfaces for n=me data.

## Why the course assigned it

- Week 1's objective is to see the big picture of personal health assistants and why health data is fragmented, and to start working with your own Fitbit data. Estrin's essay supplies the "why": your own longitudinal data is valuable, and it is stuck inside services. ^[inferred]
- It introduces the n-of-1 framing the rest of the course builds on: baselines, change over time and personalisation rather than population averages. ^[inferred]

## What this means for us

- Our agent is an n=me system: the [[04-agent-engine/performance-model|performance model]] should compare a student against **their own baseline** (their usual heart rate, sleep and task accuracy), not only against population norms. ^[inferred]
- "Behavioral pulse" maps well onto the laptop-behaviour signals in [[05-data/data-sources|data sources]] (activity patterns, idle time, task performance), as long as we keep the rule that private content such as keystrokes or screenshots is never captured. ^[inferred]
- Estrin's "not diagnosis" stance matches our wellness, non-medical framing in [[13-trust-safety/privacy-and-consent|privacy and consent]]. ^[inferred]
- Data liberation cuts both ways: giving students export and delete of their own data (see [[06-database/database-and-api|database and API]]) is the n=me ethos applied to us. ^[inferred]
- Single-person data is noisy and confounded. Our [[15-research/evaluation-plan|evaluation plan]] uses randomised within-person sessions, the rigorous version of n-of-1 evidence. ^[inferred]

## Read status

- **Full text** of the CACM viewpoint read on 2026-10-26 (cacm.acm.org HTML).
