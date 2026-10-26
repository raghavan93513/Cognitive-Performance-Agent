---
title: "Rajkomar 2018 — Deep Learning with EHRs"
category: 30-course
tags: [course, reading, clinical-data, fhir, ml]
aliases: ["Scalable and accurate deep learning with electronic health records"]
sources: ["https://www.nature.com/articles/s41746-018-0029-1"]
summary: Google/UCSF/UChicago represent entire raw EHRs as FHIR-based sequences, so deep models predict mortality, readmission, stay length and diagnoses at two sites without hand-picked features.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 02
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Rajkomar 2018 — Deep Learning with EHRs

> [!cite] Alvin Rajkomar, Eyal Oren, Kai Chen, et al. *Scalable and accurate deep learning with electronic health records.* npj Digital Medicine, 2018. https://www.nature.com/articles/s41746-018-0029-1
> Assigned in [[30-course/weeks/week-02-clinical-records-and-fhir|Week 2 — Clinical Records and FHIR]].

## Core idea

- Traditional EHR prediction models require curating a few predictor variables by hand, which is labour-intensive and **throws away most of each record**.
- The authors represent **each patient's entire raw EHR** in a FHIR-based format, as a time-ordered sequence of events including free-text notes. Deep learning models then learn directly from it **without site-specific data harmonisation**.
- Their pipeline turns raw EHR data into FHIR output without manual feature mapping, so the system is easier to deploy at a new hospital.

## Key findings

- Data: de-identified records from two US academic medical centres, covering 216,221 hospitalisations of adults staying at least 24 h (114,003 unique patients). Unrolled, this came to 46,864,534,945 data points ("tokens"), including notes.
- The average admission had about 137,882 tokens at admission and 216,744 at discharge, so records grow quickly during a stay.
- Reported performance (AUROC):
  - In-hospital mortality at 24 h after admission: 0.95 (Hospital A) and 0.93 (Hospital B). The 28-factor augmented Early Warning Score baseline was lower.
  - 30-day unplanned readmission at discharge: 0.77 and 0.76, versus 0.70 and 0.68 for the modified HOSPITAL score.
  - Long length of stay at 24 h: 0.86 and 0.85, versus 0.76 and 0.74 for the modified Liu model.
  - All discharge diagnoses: frequency-weighted AUROC 0.90 at discharge, 0.87 and 0.86 at admission.
- The deep models beat the traditional, clinically used models in every case.
- An attribution case study highlighted which parts of a patient's chart drove a mortality prediction (the deep model gave 19.9% versus 9.3% for aEWS, and the patient died 10 days later).
- The authors list limitations: the study is retrospective, accurate predictions do not automatically improve care, and prospective trials are needed.

## Why the course assigned it

- Week 2 teaches how clinical records are structured and how FHIR makes them machine-readable. Rajkomar shows the **payoff**: once records sit in a standard container, models can use the whole record across sites. ^[inferred]
- It also previews themes the course returns to: AUROC is not clinical impact ([[30-course/readings/kelly-2019-clinical-impact-ai|Kelly 2019]]), and interpretability builds trust ([[30-course/weeks/week-08-hci-interface-trust-uncertainty|Week 8]]). ^[inferred]

## What this means for us

- **Keep the raw record, not just engineered features.** Our [[05-data/data-pipeline|data pipeline]] should store raw-but-validated observations in a canonical schema, so later models can learn features we did not think of. ^[inferred]
- We should not copy the deep-learning approach. We will have few students and few sessions, so the [[04-agent-engine/performance-model|performance model]]'s plan (rules, then regularised scikit-learn) fits our data better than sequence models. ^[inferred]
- Their honest comparison against **simple clinical baselines** is a model for our [[15-research/evaluation-plan|evaluation plan]]: any watch-informed model must beat a "fixed break schedule" or "laptop-only" baseline. ^[inferred]
- Attributions behind each prediction support the "show the reason and sources" rule in [[08-frontend/student-interface-and-feedback|student interface and feedback]]. ^[inferred]

## Read status

- **Full text** read from nature.com (open access) on 2026-10-26: abstract, Results and Discussion/limitations. Methods were skimmed.
