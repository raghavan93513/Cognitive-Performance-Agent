---
title: "Guest Talk — Ali Heydari: Physiological World Models for Personal Health Agents"
category: 30-course
tags: [course, guest-talk, agents, wearables]
aliases: [Heydari talk, From Passive Sensing to Actionable Futures, Week 4 guest talk]
sources: ["personal-health-agent.github.io/src/content/guest-speakers/ali-heydari.md", "personal-health-agent.github.io/src/pages/guest-speaker-ali-heydari.astro", "binf4070-2026/week-04/slides-04.pdf", "https://arxiv.org/abs/2508.20148"]
summary: Google Research talk on wearable foundation models, action-conditioned sensor world models, and a PHA split into data-science, domain-expert and coach agents, mirroring our Signal/Evidence/Action.
provenance:
  extracted: 0.6
  inferred: 0.35
  ambiguous: 0.05
base_confidence: 0.58
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 4
date: 2026-10-02
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Guest Talk — Ali Heydari: Physiological World Models

> [!info] Week 4 guest talk · Fri 2 Oct 2026 · Online · final hour of [[30-course/weeks/week-04-team-formation-and-project-scoping|Week 04]]
> **Title:** *From Passive Sensing to Actionable Futures: Towards Autonomous Personal Health Agents Powered by Physiological World Models*
> **Speaker:** Dr. Ali Heydari, Senior Research Scientist, Google Research

> [!warning] Source limits
> This page is built from the **course website abstract and bio** and the Week 4 slide that announces the talk (p. 12). There is no recording, transcript or talk slides in the course repos, so what was actually said live is not captured. The paper details come from the arXiv abstract of *The Anatomy of a Personal Health Agent*, which slide p. 3 of Week 4 cites as recommended reading.

## Abstract (paraphrased)

**The problem.** Consumer wearables are everywhere, yet everyday health management is still *reactive, fragmented, and disconnected from clinical reality*. Turning passive physiological streams into a trustworthy Personal Health Agent requires bridging three gaps:
- raw continuous sensing ↔ clinical ground truth
- raw sensing ↔ predictive physiological dynamics
- raw sensing ↔ empathetic behaviour change

**The proposed paradigm** has three stages:

1. **Perception: hidden physiology in sensor streams.** Wearable foundation models can detect silent cardiometabolic risk, e.g. **pre-symptomatic insulin resistance**, before standard lab markers shift.
2. **Prediction: a sensor world model.** Retrospective risk detection isn't enough for proactive care. The agent must model how the body *evolves* and how *feasible and impactful* a behaviour change would be. Physiology is treated as an **action-conditioned dynamical system** that can simulate **multi-week physiological trajectories** and project how candidate changes in **sleep and exertion** would perturb a person's future health state. This is *counterfactual simulation*.
3. **Action: collaborative multi-agent architecture.** Perception and prediction feed a system that **decouples statistical time-series reasoning, evidence-based clinical synthesis, and motivational health coaching into specialized collaborating agents**. This closes the loop from continuous sensing to sustainable behaviour change.

## Speaker bio

- Senior Research Scientist at **Google Research**. Works on health AI, foundation models for health data, multi-agent systems, and agentic self-improvement for scientific discovery.
- Research goal: combine foundation models (including LLMs) with mathematical modelling and clinical data to build scalable, accessible agentic health systems.
- Before Google: **NIH NRSA (F31) fellow at UC Merced**. His PhD covered deep learning and numerical methods for modelling complex biological systems.
- **Lead author of *The Anatomy of a Personal Health Agent*** (Heydari et al. 2025, arXiv 2508.20148). It couples specialist agents for wearable sensor analysis, clinical domain reasoning and behavioural health coaching, and it underpins the **Google Health Coach** in the new **Google Health** app.
- Other work: insulin-resistance phenotyping from wearables, **SensorWM** (Sensor World Model), **SensorFM** (Sensor Foundation Model), **SoftAdapt** (adaptive optimization), and generative deep learning for computational biology.

## The PHA paper in brief (from the arXiv abstract)

- Three categories of consumer health need, each served by a specialist sub-agent:

| Sub-agent | Role (paper abstract) |
|---|---|
| Data science agent | Analyses personal time-series data from wearables and health records |
| Health domain expert agent | Integrates health and contextual data into accurate, personalized insights |
| Health coach agent | Turns insights into guidance using a specified psychological strategy, and tracks progress |

- Evaluated per sub-agent and as a full system across **10 benchmark tasks**, with **7,000+ annotations** and about **1,100 hours** of expert and end-user effort.
- The design was informed by analysis of web-search and health-forum queries plus user and expert input.

## Comparison with our Signal / Evidence / Action agents

Our design is on [[04-agent-engine/multi-agent-decision|Multi-agent decision]]. Mapping ^[inferred]:

| Heydari PHA | Our agent | Similarity | Difference |
|---|---|---|---|
| Data science agent (time-series reasoning) | Signal agent | Both read numeric wearable features, trends, gaps and uncertainty | Ours reads a precomputed score from the performance model and must not compute fatigue itself. His agent does the statistical analysis. |
| Health domain expert (clinical evidence synthesis) | Evidence agent | Both ground claims in evidence | Ours retrieves the user's own history and/or approved research snippets (RAG) with citations. His does clinical-domain reasoning over health records. |
| Health coach (motivational guidance) | Action agent | Both turn insight into a next step | Ours chooses from a fixed allowlist (continue / short walk / break), gated by a deterministic policy engine. His runs a full coaching dialogue with a psychological strategy and progress tracking. |
| Sensor world model (counterfactual simulation) | none | — | We predict *current* performance. We do not simulate how a break changes future state. |

Why this matters for us:
- **External validation of our decomposition.** A Google Research system shipped in a consumer product splits roles the same way we do: data, evidence, action. That's a strong citation for our proposal and final write-up. ^[inferred] → [[30-course/deliverables/part-2-proposal-presentation|Proposal presentation]]
- **Time-series reasoning should be numeric code, not free LLM text.** The talk's phrase "statistical time-series reasoning" supports keeping fatigue and HRV calculations in code, which our [[04-agent-engine/performance-model|performance model]] already requires. ^[inferred]
- **The coaching layer is our weakest analogue.** His Coach agent uses an explicit behaviour-change strategy and tracks progress. Our Action agent only picks a label. Two cheap upgrades: phrase suggestions with a named strategy (e.g. implementation intentions), and track whether suggested breaks are taken, which our outcome logging partly does. ^[inferred] → [[08-frontend/student-interface-and-feedback|Student interface]]
- **"Counterfactual" is the honest framing for break benefit.** Our open question, "does a walk improve the next block?", is a small action-conditioned prediction. We answer it empirically with task labels ([[12-research/evaluation-plan|Evaluation plan]]), not with a learned world model. Calling it a future extension is reasonable. ^[inferred] → [[24-synthesis/open-decisions|Open decisions]]
- **Evaluation scale is a contrast, not a target.** The paper used 10 tasks and about 1,100 expert/user hours. We should borrow the *structure* (evaluate each agent separately, then the whole system), not the scale. ^[inferred]
- **Ground-truth warning.** The talk's first gap (sensing ↔ clinical ground truth) restates Week 3: wearable values are estimates. See [[21-concepts/wearable-measurement-error|Wearable measurement error]]. ^[inferred]
- ^[ambiguous] Whether Google Health's PHA uses one LLM for all roles (as we plan with [[22-entities/langgraph|LangGraph]]) or separate models isn't stated in the abstract.

## Likely discussion / quiz points

- The three stages: perception (wearable foundation models), prediction (an action-conditioned sensor world model), and action (multi-agent collaboration).
- What "action-conditioned dynamical system" and "counterfactual simulation" mean here: simulating future physiology under candidate sleep and exertion behaviours.
- The three specialist roles of the PHA and why the course cites the paper when defining a PHA.

## Sources

- `personal-health-agent.github.io/src/content/guest-speakers/ali-heydari.md`: title, abstract, bio.
- `personal-health-agent.github.io/src/pages/guest-speaker-ali-heydari.astro`: page layout only (week, date, location rendering). No extra content.
- `binf4070-2026/week-04/slides-04.pdf`: p. 3 (paper citation in the PHA definition), p. 12 (talk announcement).
- arXiv 2508.20148 abstract (Heydari, Gu, Srinivas et al.), read 2026-10-26. The full text was not read.
