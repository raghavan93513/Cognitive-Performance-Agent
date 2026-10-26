---
title: "Beede 2020 — Human-Centered Evaluation of Deployed Deep Learning"
category: 30-course
tags: [course, reading, hci, evaluation]
aliases: ["A human-centered evaluation of a deep learning system deployed in clinics for the detection of diabetic retinopathy"]
sources: ["https://doi.org/10.1145/3313831.3376718"]
summary: Field study of Google's diabetic-retinopathy AI in Thai clinics. Lighting, image quality, connectivity and workflows shaped real-world performance, so human-centered evaluation matters.
provenance:
  extracted: 0.35
  inferred: 0.65
  ambiguous: 0.0
base_confidence: 0.45
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 04
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Beede 2020 — Human-Centered Evaluation of Deployed Deep Learning

> [!cite] Emma Beede, Elizabeth Baylor, Fred Hersch, Anna Iurchenko, Lauren Wilcox, Paisan Ruamviboonsuk, Laura M. Vardoulakis. *A Human-Centered Evaluation of a Deep Learning System Deployed in Clinics for the Detection of Diabetic Retinopathy.* CHI 2020. https://doi.org/10.1145/3313831.3376718
> Assigned in [[30-course/weeks/week-04-team-formation-and-project-scoping|Week 4 — Team Formation and Project Scoping]].

## Core idea

- Deep learning promises better clinical workflows and outcomes, but those gains had not been shown in real clinical settings.
- The authors ran a **human-centred field study** of a deep-learning system for diabetic eye disease screening. They used interviews and observation across **eleven clinics in Thailand** to describe the existing screening workflow, what nurses and clinicians expected from AI-assisted screening, and what happened after deployment.

## Key findings

- From the abstract: **socio-environmental factors affected model performance, nursing workflows and the patient experience.** The authors argue for human-centred evaluation **alongside** prospective accuracy evaluation.
- From general knowledge of the paper ^[inferred]:
  - Photos taken in poorly lit, improvised screening rooms were often judged **ungradable** by the system, which had been built to strict image-quality standards.
  - Slow or unreliable **internet connectivity** delayed uploads and disrupted clinic throughput.
  - Patients whose images were rejected might be told to go to a distant hospital, which was a real burden. Some nurses worked around the system or felt it added work.
  - The study showed that lab accuracy did not predict field usefulness. The **whole socio-technical system** had to be evaluated.

## Why the course assigned it

- Week 4 asks what separates health AI that works in the real world from projects that quietly fail. Beede is the concrete case study that goes with [[30-course/readings/kelly-2019-clinical-impact-ai|Kelly 2019]]'s checklist. ^[inferred]
- It prepares students for Week 8's HCI focus and for the proposal requirement to show a realistic user flow. ^[inferred]

## What this means for us

- **Our "clinic" is a student's desk:** bad watch fit, a dead battery, Bluetooth gaps, or a laptop agent paused by the OS are our version of ungradable images. The system must **degrade gracefully** (for example "not enough data, no suggestion") rather than nag or guess. See the failure rules in [[04-agent-engine/multi-agent-decision|multi-agent decision]]. ^[inferred]
- **Strict quality gates have a cost.** If the [[05-data/data-pipeline|data pipeline]] quality gates reject too much data, students will see the agent as useless. We should measure the abstain rate as a first-class metric in the [[15-research/evaluation-plan|evaluation plan]]. ^[inferred]
- **Observe real use:** add a small qualitative arm (short interviews or think-alouds) to the pilot. Accept, snooze and decline logs from [[08-frontend/student-interface-and-feedback|student interface and feedback]] tell us *what* happened, not *why*. ^[inferred]
- Workflow fit matters more than accuracy, so recommendations should arrive at natural task boundaries, not mid-question. ^[inferred]

## Read status

- **Abstract only** (via Semantic Scholar metadata), on 2026-10-26. The ACM Digital Library blocked automated access. Field details are from general knowledge and marked ^[inferred]. No figures are given.
