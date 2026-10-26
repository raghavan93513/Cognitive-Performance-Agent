---
title: "Buçinca 2021 — Cognitive Forcing Functions Reduce Overreliance on AI"
category: 30-course
tags: [course, reading, hci, evaluation]
aliases: ["To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making", "cognitive forcing functions"]
sources: ["https://doi.org/10.1145/3449287"]
summary: Explanations alone don't stop overreliance on AI. Cognitive forcing (decide first, wait, or ask to see the AI) reduced it but was liked least, and helped high Need-for-Cognition users more.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 08
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Buçinca 2021 — Cognitive Forcing Functions Reduce Overreliance on AI

> [!cite] Zana Buçinca, Maja Barbara Malaya, Krzysztof Z. Gajos. *To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making.* Proc. ACM HCI (CSCW), 2021. https://doi.org/10.1145/3449287
> Assigned in [[30-course/weeks/week-08-hci-interface-trust-uncertainty|Week 8 — HCI: Interface, Trust and Uncertainty]].

## Core idea

- People using AI decision support often **over-rely** on it, accepting its suggestion even when it is wrong. Adding explanations does not seem to fix this and may make it worse.
- Through the lens of **dual-process theory**, people rarely think analytically about each AI suggestion. They form general heuristics about when to follow the AI.
- **Cognitive forcing functions** come from medical decision-making research. They are interventions that push people into deliberate thinking at the moment of decision.

## Key findings

- **Experiment:** N = 199 participants on a nutrition task. They looked at a photo of a meal and chose an ingredient substitution to lower carbohydrates. A simulated AI gave suggestions and feature-based explanations.
- **Conditions:**
  - No AI.
  - Two simple explainable-AI designs: explanation, and explanation plus confidence ("the AI is X% confident", shown when uncertain).
  - Three cognitive forcing designs:
    - **On demand:** the AI suggestion is hidden until the user clicks to see it.
    - **Update:** the user decides alone first, then sees the AI and may revise.
    - **Wait:** "AI is processing" for 30 seconds before the suggestion appears, so the user forms their own hypothesis.
- Cognitive forcing **significantly reduced overreliance** compared with the simple explainable-AI designs.
- **Trade-off:** the designs that reduced overreliance the most got the **least favourable subjective ratings**.
- **Unequal benefit:** the interventions helped participants **higher in Need for Cognition** (people who enjoy effortful thinking) more. This is an intervention-generated inequality.

## Why the course assigned it

- Week 8 asks how to earn trust **without overstepping**. Buçinca shows that "add an explanation" is not a sufficient trust design, and that the right amount of friction depends on the stakes and on the user. ^[inferred]
- It pairs with [[30-course/readings/amershi-2019-human-ai-guidelines|Amershi 2019]]: Amershi says make clear *why* (G11), and Buçinca warns that explanations alone may not change behaviour. ^[inferred]

## What this means for us

- **Our stakes are low, so friction should be low.** A break suggestion is not a medical decision. Heavy forcing (30-second waits, decide-first) would annoy students and drive them to switch the agent off. Default to a lightweight, dismissible nudge. ^[inferred]
- **But we do want reflection, not blind compliance.** A light "update"-style design could ask "How focused do you feel (1–5)?" *before* showing the suggestion. That is cognitive forcing and also gives a self-report label for the [[04-agent-engine/performance-model|performance model]]. ^[inferred]
- **Measure overreliance.** The [[12-research/evaluation-plan|evaluation plan]] should check whether students accept suggestions regardless of whether those suggestions were good, for example by comparing acceptance with outcomes when the model was wrong. ^[inferred]
- **Watch for unequal benefit.** If the reflective prompts help only already-reflective students, report it. This is a fairness point next to the bias readings. ^[inferred]
- Relevant UI page: [[08-frontend/student-interface-and-feedback|student interface and feedback]]. ^[inferred]

## Read status

- **Full text** (arXiv PDF) read on 2026-10-26: abstract, task design and the condition descriptions (section 3.2). The results and discussion were skimmed, and the abstract was used for the headline results.
