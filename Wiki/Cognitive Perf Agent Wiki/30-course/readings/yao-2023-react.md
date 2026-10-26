---
title: "Yao 2023 — ReAct: Reasoning + Acting"
category: 30-course
tags: [course, reading, agents, llm]
aliases: ["ReAct: Synergizing Reasoning and Acting in Language Models", "ReAct"]
sources: ["https://arxiv.org/abs/2210.03629"]
summary: ReAct interleaves reasoning traces with actions (e.g., Wikipedia search), cutting hallucination versus chain-of-thought and making agent trajectories inspectable. Week 11's core agent loop.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 11
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Yao 2023 — ReAct: Reasoning + Acting

> [!cite] Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao. *ReAct: Synergizing Reasoning and Acting in Language Models.* ICLR 2023. https://arxiv.org/abs/2210.03629
> Assigned in [[30-course/weeks/week-11-agents-planning-memory|Week 11 — Agents: Planning, Memory and Multi-Step Health Questions]].

## Core idea

- Reasoning (chain-of-thought) and acting (generating action plans) had been studied separately. **ReAct** has the LLM produce **interleaved reasoning traces and actions**: Thought, then Action, then Observation, repeated.
- Reasoning helps the model form, track and update plans and handle exceptions. Actions let it gather information from external sources such as a knowledge-base API or an environment.
- The method uses prompting only, with one or two in-context examples.

## Key findings

- **Knowledge tasks (HotpotQA, FEVER) with a simple Wikipedia API:**
  - ReAct reduced the **hallucination and error propagation** of chain-of-thought (CoT).
  - Exact-match / accuracy:
    - Standard prompting: 28.7 / 57.1
    - CoT: 29.4 / 56.3
    - CoT with self-consistency: 33.4 / 60.4
    - Act-only: 25.7 / 58.9
    - ReAct: 27.4 / 60.9
  - The best results came from **combining** methods: CoT-SC→ReAct scored 34.2 / 64.6, and ReAct→CoT-SC scored 35.1 / 62.0.
- **Failure-mode analysis on HotpotQA:** hallucination was a major failure mode for CoT (56% of its failures in the sample) but 0% for ReAct. ReAct's main weaknesses were **uninformative search results** (23%) and reasoning loops.
- **Decision-making tasks (ALFWorld, WebShop):** ReAct beat imitation- and reinforcement-learning methods by an absolute success rate of 34% and 10% respectively.
- Trajectories are more **interpretable and trustworthy**, because a human can read why each action was taken.

## Why the course assigned it

- Week 11's objective is to build agents that **break a hard health question into steps and remember context**, and to **debug them when their reasoning goes wrong**. ReAct is the canonical step-by-step loop, and its readable traces are what make debugging possible. ^[inferred]
- The failure analysis (bad retrieval, loops) is a ready-made debugging checklist for the lab. ^[inferred]

## What this means for us

- **Use a bounded, ReAct-style loop inside the agents, not open-ended autonomy.** The Signal agent can think, call `get_features`, observe, call `score`, then summarise. Cap the number of steps and leave the final action to policy code in [[04-agent-engine/multi-agent-decision|multi-agent decision]]. ^[inferred]
- **Log the trace.** Storing Thought/Action/Observation for each recommendation gives the "show the reason and sources" view in [[08-frontend/student-interface-and-feedback|student interface and feedback]] and an audit trail in [[06-database/database-and-api|database and API]]. ^[inferred]
- **Expect ReAct's failure modes.** If retrieval returns nothing useful (missing watch data, no past sessions), the agent must abstain rather than loop or guess. This matches the "evidence retrieval down" rule. ^[inferred]
- [[22-entities/langgraph|LangGraph]] is a natural way to implement a bounded, inspectable ReAct graph. ^[inferred]

## Read status

- **Full text** (arXiv PDF) read on 2026-10-26: abstract, method, Table 1 (HotpotQA/FEVER results) and Table 2 (failure modes). The ALFWorld and WebShop details were taken from the abstract.
