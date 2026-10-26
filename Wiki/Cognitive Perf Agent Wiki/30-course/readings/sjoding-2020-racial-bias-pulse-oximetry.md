---
title: "Sjoding 2020 — Racial Bias in Pulse Oximetry"
category: 30-course
tags: [course, reading, bias, physiology]
aliases: ["Racial bias in pulse oximetry measurement"]
sources: ["https://www.nejm.org/doi/full/10.1056/NEJMc2029240"]
summary: NEJM letter reporting that pulse oximeters missed dangerously low blood oxygen more often in Black than White patients. Shows sensor bias can follow skin tone and cause clinical harm.
provenance:
  extracted: 0.2
  inferred: 0.8
  ambiguous: 0.0
base_confidence: 0.4
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 03
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Sjoding 2020 — Racial Bias in Pulse Oximetry

> [!cite] Michael W. Sjoding, Robert P. Dickson, Theodore J. Iwashyna, Steven E. Gay, Thomas S. Valley. *Racial Bias in Pulse Oximetry Measurement.* New England Journal of Medicine (correspondence), 2020. https://doi.org/10.1056/NEJMc2029240
> Assigned in [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3 — Wearable Sensors and Measurements]].

> [!warning] Text not accessed
> This is a short NEJM letter with no abstract. NEJM blocked automated access, and the free PMC copy (PMC7808260) sits behind a browser check that we did not try to get around. The content below comes from general knowledge of the letter and is marked ^[inferred]. **No figures are given** because we did not read them.

## Core idea

- Pulse oximeters estimate arterial oxygen saturation (SpO₂) optically, by shining light through the skin. Skin pigmentation can affect light absorption, so device calibration may not hold equally for everyone. ^[inferred]
- The authors compared pulse-oximeter readings with **arterial blood gas** measurements (SaO₂, the reference standard) taken close together in hospitalised adults. ^[inferred]

## Key findings

- **Occult hypoxaemia**, where the arterial blood gas shows dangerously low oxygen while the pulse oximeter shows an acceptable value, occurred noticeably more often in **Black patients than White patients**, roughly three times as often. ^[inferred]
- The pattern held in a second, multi-hospital cohort. ^[inferred]
- Because clinicians rely on pulse oximetry to triage and to decide on supplemental oxygen, the bias can lead to **under-treatment** of Black patients. ^[inferred]
- The letter is widely credited with prompting renewed regulatory and clinical attention to oximeter performance across skin tones. ^[inferred]

## Why the course assigned it

- Week 3's lesson is that sensor numbers are **estimates, not ground truth**. Sjoding shows the error can be systematic by group rather than random, with real clinical harm. ^[inferred]
- It deliberately contrasts with [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent 2020]], which found no skin-tone effect for consumer **heart rate**. The Week 3 slides draw the lesson explicitly: evaluate a specific metric, device, population and context, because evidence about clinical pulse oximetry does not automatically carry over to consumer wrist pulse rate (slides p. 37).
- It foreshadows the algorithmic-bias reading in Week 13, [[30-course/readings/obermeyer-2019-racial-bias-population-health|Obermeyer 2019]]. ^[inferred]

## What this means for us

- If we ever use a watch's **SpO₂** reading, it must be treated as unvalidated and kept out of the recommendation logic. That fits the current [[05-data/data-sources|data sources]] scope, which does not depend on SpO₂. ^[inferred]
- Our [[15-research/evaluation-plan|evaluation plan]] should report model error and recommendation rates **by subgroup** (including skin tone where participants consent to share it) and not just one average. ^[inferred]
- "Absence of evidence of bias" for heart rate in Bent is not proof for our specific watch, so a small validation check of our chosen device against a chest strap would be cheap insurance. ^[inferred]
- Recommendations that rest on biased signals can be unfair to some students. [[13-trust-safety/privacy-and-consent|Privacy and consent]] and the fairness checks should name sensor bias explicitly. ^[inferred]

## Read status

- **Landing page and metadata only** (title, authors, journal and year, via Europe PMC). There is no abstract, and the full text was not accessible on 2026-10-26. We also read the Week 3 slide that references this topic (`week-03/slides-03.pdf`, p. 37).
