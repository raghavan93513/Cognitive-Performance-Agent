---
title: "Wang 2024 — Survey of LLM-Based Autonomous Agents"
category: 30-course
tags: [course, reading, agents, llm]
aliases: ["A Survey on Large Language Model based Autonomous Agents"]
sources: ["https://arxiv.org/abs/2308.11432"]
summary: Survey proposing a unified agent architecture of profile, memory, planning and action modules, plus agent applications and evaluation. Week 11's map for planning and memory design.
provenance:
  extracted: 0.6
  inferred: 0.4
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 11
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Wang 2024 — Survey of LLM-Based Autonomous Agents

> [!cite] Lei Wang, Chen Ma, Xueyang Feng, Zeyu Zhang, Hao Yang, Jingsen Zhang, Zhiyuan Chen, Jiakai Tang, Xu Chen, Yankai Lin, Wayne Xin Zhao, Zhewei Wei, Ji-Rong Wen. *A Survey on Large Language Model based Autonomous Agents.* Frontiers of Computer Science, 2024. https://arxiv.org/abs/2308.11432
> Assigned in [[30-course/weeks/week-11-agents-planning-memory|Week 11 — Agents: Planning, Memory and Multi-Step Health Questions]].

## Core idea

- Earlier autonomous-agent research trained agents with limited knowledge in isolated environments. LLMs, with web-scale knowledge, made far more general agents possible.
- The survey proposes a **unified construction framework** with four modules:
  - **Profiling:** defines the agent's role or persona.
  - **Memory:** stores and recalls information.
  - **Planning:** breaks tasks into steps and revises plans.
  - **Action:** turns decisions into outputs, tool calls or environment actions.
- It then reviews applications in social science, natural science and engineering, and evaluation strategies (**subjective** evaluation, such as human ratings, and **objective** evaluation, such as metrics and benchmarks), before listing open challenges.

## Key findings

- **Memory is modelled on human memory:**
  - **Short-term memory** is like the content of the context window (in-context information written into the prompt).
  - **Long-term memory** is like an external store, often a vector store, that the agent queries and retrieves from as needed.
  - Agents use one of these structures or a **hybrid** of both.
- **Planning comes in two kinds** ^[inferred]:
  - **Without feedback:** single-path chains, multi-path trees, or external planners.
  - **With feedback:** adjusting the plan from environment, human or model feedback, as ReAct-style loops do.
- **Action** covers goals, how actions are produced (memory recall or plan following), the action space (tools vs the LLM's own knowledge) and action impact. ^[inferred]
- **Open challenges** include role-playing fidelity, generalised human alignment, prompt robustness, hallucination, knowledge boundaries and efficiency. ^[inferred]

## Why the course assigned it

- Week 11 focuses on **planning and memory** for multi-step health questions. This survey gives the vocabulary (profile, memory, planning, action) for designing and debugging such agents, beyond the single ReAct loop in [[30-course/readings/yao-2023-react|Yao 2023]]. ^[inferred]

## What this means for us

Our three-agent design, mapped onto the survey's modules ^[inferred]:

- **Profiling:** the Signal, Evidence and Action agents are role profiles over one LLM (see [[04-agent-engine/multi-agent-decision|multi-agent decision]]). The survey supports that roles are prompts, not separate systems. ^[inferred]
- **Memory:**
  - *Short-term:* the current session's features and the last few recommendations, passed in context. ^[inferred]
  - *Long-term:* the student's past sessions, outcomes and stated preferences, kept in PostgreSQL and retrieved by the Evidence agent. This is the survey's "external store", and it need not be a vector database to start (see [[21-concepts/retrieval-augmented-generation|retrieval-augmented generation]]). ^[inferred]
  - Memory is personal data, so retention and deletion rules from [[13-trust-safety/privacy-and-consent|privacy and consent]] apply to it. ^[inferred]
- **Planning:** keep it **shallow and fixed** (collect, score, retrieve, propose, validate) rather than letting the LLM plan freely. Our task does not need open-ended planning, and a fixed graph is easier to test. ^[inferred]
- **Action:** a tiny, typed action space with a deterministic validator, as on the [[30-course/readings/openai-2024-function-calling|function-calling]] page. ^[inferred]
- **Evaluation:** combine subjective ratings (did the explanation make sense to the student?) with objective outcomes (task accuracy after the suggestion) in the [[15-research/evaluation-plan|evaluation plan]]. ^[inferred]

## Read status

- **Full text** (arXiv HTML) fetched on 2026-10-26. Read the abstract, the framework overview and the memory-module section. Planning, action, applications and challenges were skimmed only, and the bullets drawn from them are marked inferred.
