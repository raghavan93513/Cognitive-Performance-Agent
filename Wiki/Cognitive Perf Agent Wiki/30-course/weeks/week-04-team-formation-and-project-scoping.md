---
title: "Week 04 — Team Formation and Project Scoping"
category: 30-course
tags: [course, week, project]
aliases: [Week 04, Lecture 04, Project Scoping Studio]
sources: ["binf4070-2026/week-04/slides-04.pdf", "binf4070-2026/week-04/lab-04.ipynb", "personal-health-agent.github.io/src/content/weeks/04-team-formation.md"]
summary: Pitch day. Defines a PHA, restates capstone rules (3–4 people, ≥1 data source, LLM/RAG/agent + UI) and milestones, then Ali Heydari's talk. Anchors our project scope.
provenance:
  extracted: 0.8
  inferred: 0.2
  ambiguous: 0.0
base_confidence: 0.66
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 4
date: 2026-10-02
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 04 — Team Formation and Project Scoping

> [!info] Fri 2 Oct 2026 · "Team Formation + Project Scoping Studio"
> **Objective (course site):** team up, shape your project idea, and learn what separates health AI that works in the real world from projects that quietly fail.
> Slides: `binf4070-2026/week-04/slides-04.pdf` (13 pp.) · Lab: `binf4070-2026/week-04/lab-04.ipynb` (reflection only)
> Guest talk (final hour, online): [[30-course/guest-talks/ali-heydari-physiological-world-models|Dr. Ali Heydari — Physiological world models]]

Outline (p. 2): (1) revisit the capstone project, (2) student project-idea pitches, (3) guest lecture by Dr. Ali Heydari.

## Lecture: key ideas

### What a Personal Health Assistant (PHA) is (pp. 3–4)

- **Definition** (p. 3): a PHA *combines authorized personal health data and computational tools to help a person inspect patterns, ask questions, and prepare decisions. Its claims remain traceable to evidence and bounded by intended use.*
- Many current PHAs use a generative-AI agent, or a **team of specialized agents**, to connect users with data and tools.
- **Terminology:** the course uses **assistant** for the user-facing role and **agent** for one possible implementation. "Personal Health Agent" is a common alternative term, but the PHA vision predates LLMs (p. 3).
- Further reading on the slide: *The Anatomy of a Personal Health Agent*, Heydari et al. 2025, arXiv 2508.20148. The guest speaker is the lead author.
- **Course goal** (p. 4): a PHA whose outputs are **personalized, dynamic, inspectable, safe, and aligned with users.**

### Capstone rules (pp. 5–6)

| Requirement | Detail (slides) |
|---|---|
| Team | 3–4 people, ideally mixed backgrounds (the class is balanced health / CS) |
| Focus | A specific **target user group** and **question** |
| Data | At least one of (1) clinical/EHR, (2) everyday sensors, (3) self-report. **Multiple modalities are encouraged and preferred.** |
| AI | Build an **LLM, RAG, or agent component** with a **usable interface** |
| Format | Any reasonable format: website, mobile, desktop, CLI, or something creative |
| Milestones | W4 pitch and team formation → **W9 proposal with low-fidelity presentation** → **W14 demo and poster; write-up due Dec 16** |

Full details are at `personal-health-agent.github.io/project-details/`. See [[30-course/project-requirements|Project requirements]], [[30-course/deliverables/part-2-proposal-presentation|Part 2 — proposal presentation]] and [[30-course/deliverables/part-3-final-showcase|Part 3 — final showcase]].

### The three sources, joined daily (p. 7, repeated from Week 3 p. 39)

The example person-day (local time, 2026-09-18) puts an EHR hemoglobin result, a sensor-derived resting HR (method DERIVED, 18.5 h wear coverage) and a self-reported fatigue score side by side. **The date aligns them for analysis but doesn't make them simultaneous or causal.** Details in [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]].

### Pitch prompt (p. 8)

Each idea gets 2–3 minutes plus 1–2 minutes of Q&A, and answers three questions:
1. **Who is it for, and what question do they have?**
2. **What data would help answer that question?**
3. **What would your PHA help the target user do?**

During the break (p. 10), students continue conversations with people whose ideas interested them, as a team-formation mechanism.

## Lab

`lab-04.ipynb` is a three-field reflection, not a coding lab (slide p. 11):
- `classmates_reflection`: what you learned from classmates' pitches
- `guest_reflection`: what you learned from the guest lecture, citing specific moments that changed your thinking
- `ai_use`: how you used AI, or "I did not use AI"

The skill being taught is articulating design lessons from others' projects, plus the course's standing AI-use disclosure habit. ^[inferred]

## Readings

- [[30-course/readings/kelly-2019-clinical-impact-ai|Kelly et al. 2019 — Key challenges for delivering clinical impact with AI]] (*BMC Medicine*)
- [[30-course/readings/beede-2020-human-centered-eval-deployed-dl|Beede et al. 2020 — Human-centered evaluation of a deep learning system deployed in clinics]] (*CHI*)

Both serve the objective's "projects that quietly fail" theme. The slides don't discuss them directly. ^[inferred]

## What this means for us

- **Our pitch maps cleanly onto p. 8.** ^[inferred]
  - *Who:* students and athletes doing focused study.
  - *Question:* should I continue, take a short walk, or take a break?
  - *Data:* watch (everyday sensor), laptop behaviour, and study-task performance, plus an optional fatigue check-in (self-report).
  - *Help the user do:* time breaks.
  - See [[01-foundation/project-overview|Project overview]].
- **We satisfy "multiple modalities preferred".** We use the everyday-sensor and self-report categories. We have no clinical/EHR source, which the rules allow. ^[inferred] → [[05-data/data-sources|Data sources]]
- **The PHA definition is our acceptance test.** Claims must be "traceable to evidence and bounded by intended use". That matches our Evidence agent citing records and our policy engine limiting actions to an allowlist and forbidding diagnosis. ^[inferred] → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]
- **"Inspectable" and "safe" are graded qualities.** The interface should show why a suggestion was made and how fresh the data is. ^[inferred] → [[08-frontend/student-interface-and-feedback|Student interface]]
- **Terminology for write-ups:** call the product an *assistant* and our Signal/Evidence/Action components *agents*, matching course usage (p. 3). ^[inferred]
- **Milestone dates drive the [[02-product/roadmap|roadmap]]:** a low-fi proposal at W9, then a demo, poster and write-up (Dec 16). ^[inferred]

## Likely quiz material

- The course's definition of a PHA and its five output qualities (personalized, dynamic, inspectable, safe, aligned).
- Assistant (user-facing role) vs agent (implementation).
- The three data-source categories and the minimum requirement (at least one, multiple preferred).
- Capstone milestones W4 / W9 / W14 and the write-up date of Dec 16.
- A same-date join ≠ simultaneity ≠ causation.

## Sources

- `binf4070-2026/week-04/slides-04.pdf`: PHA definition p. 3; goal p. 4; capstone pp. 5–6; daily join p. 7; pitch questions p. 8; lab p. 11; guest p. 12.
- `binf4070-2026/week-04/lab-04.ipynb`: cells 0–2.
- `personal-health-agent.github.io/src/content/weeks/04-team-formation.md`: date, objective, readings, guest link.
- Hub: [[30-course/30-course|Course hub]] · previous [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]] · next [[30-course/weeks/week-05-relational-document-clinical-stores|Week 05]]
