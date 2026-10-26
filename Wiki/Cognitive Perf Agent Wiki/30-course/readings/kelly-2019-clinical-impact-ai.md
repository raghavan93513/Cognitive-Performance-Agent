---
title: "Kelly 2019 — Key Challenges for Clinical Impact with AI"
category: 30-course
tags: [course, reading, evaluation, bias, ml]
aliases: ["Key challenges for delivering clinical impact with artificial intelligence"]
sources: ["https://doi.org/10.1186/s12916-019-1426-2"]
summary: Why accurate health AI often fails to reach patients. Covers retrospective vs prospective evidence, misleading metrics, dataset shift, confounders, bias, generalisation, regulation and human barriers.
provenance:
  extracted: 0.65
  inferred: 0.35
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 04
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Kelly 2019 — Key Challenges for Clinical Impact with AI

> [!cite] Christopher J. Kelly, Alan Karthikesalingam, Mustafa Suleyman, Greg Corrado, Dominic King. *Key challenges for delivering clinical impact with artificial intelligence.* BMC Medicine, 2019. https://doi.org/10.1186/s12916-019-1426-2
> Assigned in [[30-course/weeks/week-04-team-formation-and-project-scoping|Week 4 — Team Formation and Project Scoping]].

## Core idea

- Healthcare AI research is booming, but few systems have been deployed in practice. This opinion review lists what stands between an accurate model and **real clinical impact**, and what translation requires.
- The challenges fall into three groups: those intrinsic to **machine-learning science**, the **logistics of implementation**, and **human and sociocultural barriers** to adoption.

## Key findings

- **Evidence:** peer-reviewed randomised controlled trials are the gold standard, though not always appropriate or feasible. Most published work is retrospective.
- **Metrics:** the "**AI chasm**" means accuracy does not equal clinical efficacy. AUROC is often not the best measure of clinical applicability and many clinicians find it hard to read. Papers should report sensitivity and specificity at a chosen operating point, plus positive and negative predictive values.
- **Comparing algorithms** is hard, so independent, local and representative test sets are needed.
- **ML-science risks:**
  - **Dataset shift:** data come from a non-stationary environment, and deploying a model can itself change practice. Models need drift monitoring and periodic retraining.
  - **Accidentally fitting confounders:** for example, a skin-lesion classifier keyed on rulers in the photos, the medical version of the "wolves on snow" problem.
  - Poor **generalisation** to new populations and settings.
  - **Algorithmic bias.**
  - Susceptibility to **adversarial attack** or manipulation.
- **Logistics and regulation:** regulation must balance speed of innovation against harm, with careful **post-market surveillance**.
- **Human barriers:** even a perfect algorithm faces adoption barriers. Interpretability is at an early stage, and models that cannot explain themselves undermine trust.
- Further work is needed on bias mitigation, brittleness and generalisability, and interpretability.

## Why the course assigned it

- Week 4's objective is to learn **what separates health AI that works in the real world from projects that quietly fail**, while teams shape their own projects. Kelly is that checklist. ^[inferred]
- The Week 5 slides cite Kelly again when showing that a FHIR resource can pass validation yet carry the wrong meaning, and in the data-cleaning section (slides-05 pp. 14, 77). So the paper's warnings carry into the data-management weeks.

## What this means for us

- **Metrics students can understand:** the [[12-research/evaluation-plan|evaluation plan]] should report outcomes in plain terms, such as how often a "take a walk" suggestion was followed by better task accuracy, alongside precision and recall at our operating threshold, not AUROC alone. ^[inferred]
- **Prospective beats retrospective:** our planned randomised sessions (adaptive vs fixed breaks) are the small-scale equivalent of Kelly's gold standard. Retrospective "the model predicted dips" results alone would not show impact. ^[inferred]
- **Dataset shift is built in:** students' routines change across the semester and exam periods. The [[04-agent-engine/performance-model|performance model]] needs drift checks and a retraining policy, and [[11-engineering/deployment-and-operations|deployment and operations]] should monitor prediction error over time. ^[inferred]
- **Confounders:** time of day, caffeine and task difficulty can all drive both watch signals and accuracy. The study task should control difficulty, or the model may learn "afternoon" instead of "fatigue". ^[inferred]
- Interpretability and human barriers support the rule to show the reason and sources in [[08-frontend/student-interface-and-feedback|student interface and feedback]]. ^[inferred]

## Read status

- **Full text** read from BMC Medicine (open access) on 2026-10-26: abstract, plus the sections on retrospective vs prospective studies, metrics, dataset shift, confounders, interpretability and human barriers. The regulation section was skimmed.
