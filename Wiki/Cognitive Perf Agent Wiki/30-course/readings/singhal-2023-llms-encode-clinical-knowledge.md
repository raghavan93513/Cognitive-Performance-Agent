---
title: "Singhal 2023 — LLMs Encode Clinical Knowledge (Med-PaLM)"
category: 30-course
tags: [course, reading, llm, evaluation, ethics]
aliases: ["Large language models encode clinical knowledge", "Med-PaLM", "MultiMedQA"]
sources: ["https://doi.org/10.1038/s41586-023-06291-2"]
summary: Introduces the MultiMedQA benchmark and a multi-axis human evaluation. Flan-PaLM aces exam-style questions but fails on long-form answers, and instruction prompt tuning (Med-PaLM) narrows the gap.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 06
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Singhal 2023 — LLMs Encode Clinical Knowledge (Med-PaLM)

> [!cite] Karan Singhal, Shekoofeh Azizi, Tao Tu, et al. *Large language models encode clinical knowledge.* Nature, 2023. https://doi.org/10.1038/s41586-023-06291-2
> Assigned in [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6 — Embeddings, Vector Search and RAG]].

## Core idea

- Automated benchmarks such as multiple-choice accuracy do not show whether an LLM is safe for clinical use. The authors build **MultiMedQA**, a benchmark of seven medical QA datasets:
  - six existing ones: MedQA (USMLE-style), MedMCQA, PubMedQA, LiveQA, MedicationQA and MMLU clinical topics;
  - one new one, **HealthSearchQA**, made of commonly searched consumer health questions.
- They add a **human evaluation framework** in which clinicians and lay users rate answers on several axes:
  - agreement with scientific consensus;
  - likelihood and extent of possible harm;
  - comprehension, knowledge recall and reasoning;
  - completeness;
  - bias;
  - relevance and helpfulness.

## Key findings

- **Exams are not enough.** Flan-PaLM (540B), using few-shot, chain-of-thought and self-consistency prompting, reached state of the art on the multiple-choice sets, including **67.6% on MedQA**, more than 17% above the previous best.
- **Long-form answers reveal gaps:**
  - Clinicians judged only **61.9%** of Flan-PaLM's long-form answers aligned with scientific consensus. Med-PaLM reached **92.6%**, against **92.9%** for clinician-written answers.
  - **29.7%** of Flan-PaLM's answers were rated as potentially leading to harm, against **5.9%** for Med-PaLM and **5.7%** for clinicians.
- **Instruction prompt tuning**, a parameter-efficient alignment method that uses a few clinician-written exemplars, produced **Med-PaLM**. It is promising but still inferior to clinicians on several axes.
- **Uncertainty and deferral:** using agreement among self-consistency samples as an uncertainty signal, the model became more accurate on the questions it did not defer. Withholding low-confidence answers helps.
- Comprehension, recall and reasoning improve with model scale and instruction prompt tuning.
- The authors list needed capabilities, starting with **grounding responses in authoritative sources** (the RAG link) and expressing uncertainty.

## Why the course assigned it

- Week 6 begins with **prompting LLMs for health tasks and seeing where they go wrong**, before RAG. Singhal shows that the failures appear in open-ended answers and harm ratings, not in exam scores. ^[inferred]
- It motivates retrieval: the paper itself names grounding as a next step, which is what [[30-course/readings/lewis-2020-rag|Lewis 2020]] and [[30-course/readings/gao-2024-rag-survey|Gao 2024]] supply. ^[inferred]

## What this means for us

- **Evaluate the LLM's words, not just the model's predictions.** The [[15-research/evaluation-plan|evaluation plan]] should include a small human rating of agent explanations (accurate? overclaiming? potentially harmful? helpful?) modelled on Singhal's axes. ^[inferred]
- **Deferral is a feature.** The selective-prediction result supports our [[04-agent-engine/performance-model|performance model]] design of returning an estimate plus uncertainty, or abstaining. The LLM layer should also be allowed to say "not enough evidence". ^[inferred]
- **Wellness framing still matters.** Students may ask health questions. Our scope in [[13-trust-safety/privacy-and-consent|privacy and consent]] (non-medical, no diagnosis) avoids the high-harm territory Singhal measures. ^[inferred]

## Read status

- **Full text** read from nature.com (open access) on 2026-10-26: abstract, introduction, key results, the uncertainty/selective-prediction section and the limitations. Methods were skimmed.
