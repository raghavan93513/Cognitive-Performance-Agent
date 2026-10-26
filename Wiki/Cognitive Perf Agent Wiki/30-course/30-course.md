---
title: "BINF 4070 — The Future of Personal Health Assistant"
category: 30-course
tags: [course, moc]
aliases: [Course, BINF 4070, COMS 4995 W008, Personal Health Agent course]
sources: ["https://personal-health-agent.github.io/", "https://personal-health-agent.github.io/project-details/", "https://github.com/personal-health-agent/binf4070-2026"]
summary: Hub for the Columbia course our project is built in — staff, schedule, grading, policies, deliverables, weekly pages and readings.
provenance:
  extracted: 0.9
  inferred: 0.1
  ambiguous: 0.0
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# BINF 4070 · COMS 4995 W008 — The Future of Personal Health Assistant

*Multimodal Health Data Management Agents* · Columbia University, Fall 2026 · Fridays 8:40–11:40 AM ET · 1127 Mudd

> [!important] Next up
> - **Fri Oct 30 — Week 8 design studio.** Leave with a storyboard, a core user flow and a low-fidelity prototype. → [[30-course/weeks/week-08-hci-interface-trust-uncertainty|Week 8]]
> - **Fri Nov 6 — Proposal presentation (15%).** 5 min + 3 min feedback; bring a concrete artifact. Written draft due **Wed Nov 11, 11:59 PM ET**. → [[30-course/deliverables/part-2-proposal-presentation|Part 2]]
> - **Fri Nov 20 — Quiz 2** (in class).
> - **Fri Dec 11 — Final showcase.** → [[30-course/deliverables/part-3-final-showcase|Part 3]]

## Why this course exists

Your watch, your doctor and your phone each hold part of your health picture, and none of them talk to each other. In the course, each team builds one agent that could bridge them. It covers what the agent needs to know about health data, how it reasons over that data with LLMs, and how to put it in front of a real person without making things worse. Each week adds one building block: **data sources → storage → retrieval → agents → interface**. The term ends with a working prototype shown at a poster-and-demo showcase.

Students can use a loaner Fitbit and their own data, or take an equivalent synthetic-data path. Teams are deliberately mixed: CS strengths paired with health, informatics and design strengths.

## How our project maps to the course

The [[01-foundation/project-overview|Cognitive Performance Agent]] is our team's final project. The full requirements and grading criteria are on [[30-course/project-requirements|Project requirements]]. In short, the course wants each of our building blocks: ^[inferred]

| Course block | Weeks | Our domain |
|---|---|---|
| Health data sources | 1–3 | 05-data |
| Data management (stores, RAG, time series) | 5–7 | 05-data, 06-database, 04-agent-engine |
| HCI: trust and uncertainty | 8 | 09-design, 08-frontend |
| Agents: tools, planning, memory | 10–11 | 04-agent-engine |
| Privacy, safety, ethics, integration | 13 | 13-trust-safety |

## Schedule

| Week | Date | Topic | Notes |
|---|---|---|---|
| 1 | Sep 11 | Personal Health Data Foundations | Fitbit setup |
| 2 | Sep 18 | Health Data Sources I: Clinical Records & FHIR | |
| 3 | Sep 25 | Health Data Sources II: Wearable Sensors | |
| 4 | Oct 2 | Team Formation + Project Scoping Studio | Guest: Dr. Ali Heydari · Part 1 one-pager due |
| 5 | Oct 9 | Data Management I: Relational, Document & Clinical Stores | |
| 6 | Oct 16 | Data Management II: Embeddings, Vector Search & RAG | |
| 7 | Oct 23 | Data Management III: Time-Series, Multimodal & Features | Quiz 1 |
| 8 | Oct 30 | HCI: Interface, Trust & Uncertainty | Design studio |
| 9 | Nov 6 | Project Proposal Presentations | Part 2 (15%) |
| 10 | Nov 13 | Agents I: Tool Use, Function Calling & API Boundaries | |
| 11 | Nov 20 | Agents II: Planning, Memory & Multi-Step Questions | Quiz 2 |
| 12 | Nov 27 | Thanksgiving — no class | |
| 13 | Dec 4 | Privacy, Safety, Ethics, Governance & Integration | Mock demo / integration checkpoint |
| 14 | Dec 11 | Final Showcase | Part 3 |
| 15 | Dec 16 | Implementation + writeup due (tentative) | |

Week pages:
- [[30-course/weeks/week-01-personal-health-data-foundations|Week 1 — Personal health data foundations]]
- [[30-course/weeks/week-02-clinical-records-and-fhir|Week 2 — Clinical records and FHIR]]
- [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3 — Wearable sensors and measurements]]
- [[30-course/weeks/week-04-team-formation-and-project-scoping|Week 4 — Team formation and project scoping]]
- [[30-course/weeks/week-05-relational-document-clinical-stores|Week 5 — Relational, document and clinical stores]]
- [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6 — Embeddings, vector search and RAG]]
- [[30-course/weeks/week-07-time-series-multimodal-features|Week 7 — Time series, multimodal data and features]]
- [[30-course/weeks/week-08-hci-interface-trust-uncertainty|Week 8 — HCI: interface, trust and uncertainty]]
- [[30-course/weeks/week-09-proposal-presentations|Week 9 — Proposal presentations]]
- [[30-course/weeks/week-10-agents-tool-use-function-calling|Week 10 — Agents I: tool use]]
- [[30-course/weeks/week-11-agents-planning-memory|Week 11 — Agents II: planning and memory]]
- [[30-course/weeks/week-13-privacy-safety-ethics-integration|Week 13 — Privacy, safety, ethics and integration]]
- [[30-course/weeks/week-14-final-showcase|Week 14 — Final showcase]]

Readings: [[30-course/readings/30-course-readings|all course readings by week]]. Guest talk: [[30-course/guest-talks/ali-heydari-physiological-world-models|Dr. Ali Heydari — physiological world models]].

## Grading

| Component | Weight | Notes |
|---|---|---|
| Weekly labs | 20% | 5% in class (10 × 0.5%) + 15% take-home (10 × 1.5%); 12–13 sessions, only 10 required |
| Two quizzes | 20% | Weeks 7 and 11, in class (10% each) |
| Proposal + presentation | 15% | Week 9, in class |
| Demo / showcase | 15% | Week 14 |
| Final implementation | 15% | Due week 15 |
| Writeup + reflection | 15% | Due week 15 |
| Extra credit | +1% | Optional 2-minute pitch before week 4 |

## Policies that affect how we work

- **AI use is expected.** LLMs are part of the stack. Every take-home lab includes a reflection: what you tried, what failed, what you learned, how you used AI. Cite AI help, and **never paste sensitive or personal health data into public tools.**
- **Student health data.** The course has an optional OAuth app ("BINF 4070 Personal Health Data Lab") that gives read-only access to a student's own Google Health activity, heart-rate and sleep data inside their own Colab session. The synthetic path earns equal credit, and consent can be revoked any time.
- **Devices.** A course loaner Fitbit, your own compatible wearable, or synthetic data. Loaners go back at the end of the term.
- **Collaboration.** Labs are individual but you may work through them with teammates. The project is a team of 3–4. Individual reflections are your own.
- **Late work.** 3 grace days for take-home work, then −10%/day. Grace days do **not** apply to the quizzes, the week 9 proposal or the week 14 demo.

## Staff

- [[22-entities/xuhai-orson-xu|Xuhai "Orson" Xu]] — HCI, human-AI interaction and health (DBMI, CUIMC)
- [[22-entities/eugene-wu|Eugene Wu]] — Data systems and AI agents (Columbia CS)
- TAs: **Millie Wu** (office hours Mon 6–7 PM ET, CS Lounge) and **Reya Vir** (office hours Wed 10–11 AM ET, CS Lounge). They run labs, office hours, Slack, grading and the showcase.

## Recommended background (reference, not required)

CS / data: COMS 4111 Databases · COMS 4701 AI · COMS 4705 NLP. Health: BINF G4000/G4002 Methods I–II · PHIN P8105 Data Science I. HCI: COMS 4170 UI Design.

## Where the material lives

- Website: <https://personal-health-agent.github.io/>
- Slides and labs: <https://github.com/personal-health-agent/binf4070-2026> (`week-NN/`). Exercises for weeks 5–7 are in the website repo under `public/weeks/`.
- These are **linked, not copied** into our repo. Our repo is public and the slides belong to the instructors. A read-only clone sits outside the team repo at `Desktop/Cognitive Perf agent/course-reference/`.

## Sources

- Course website home, project-details and guest-talk pages (read 2026-10-26)
- Course repo README and `week-01`…`week-07`
