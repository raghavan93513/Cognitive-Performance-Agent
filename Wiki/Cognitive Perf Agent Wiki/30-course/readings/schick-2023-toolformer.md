---
title: "Schick 2023 — Toolformer"
category: 30-course
tags: [course, reading, agents, llm]
aliases: ["Toolformer: Language Models Can Teach Themselves to Use Tools"]
sources: ["https://arxiv.org/abs/2302.04761"]
summary: An LM teaches itself when and how to call APIs (calculator, QA, search, translation, calendar), keeping only calls that help it predict text. Week 10's origin story for tool use.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 10
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Schick 2023 — Toolformer

> [!cite] Timo Schick, Jane Dwivedi-Yu, Roberto Dessì, Roberta Raileanu, Maria Lomeli, Luke Zettlemoyer, Nicola Cancedda, Thomas Scialom. *Toolformer: Language Models Can Teach Themselves to Use Tools.* NeurIPS 2023. https://arxiv.org/abs/2302.04761
> Assigned in [[30-course/weeks/week-10-agents-tool-use-function-calling|Week 10 — Agents: Tool Use and Function Calling]].

## Core idea

- LMs are a paradox: they solve new tasks from a few examples, yet struggle with **basic arithmetic and factual lookup**, where much smaller, simpler tools excel. The fix is to let the model call tools.
- **Toolformer** learns *which* API to call, *when*, *with what arguments*, and how to use the result in its next-token prediction. Training is **self-supervised** and needs only a handful of demonstrations per API.
- **Method:**
  1. Prompt the LM to annotate text with candidate API calls.
  2. Execute the calls.
  3. **Keep only the calls whose results reduce the LM's loss** on the following tokens.
  4. Fine-tune on the text with those useful calls inlined.

## Key findings

- **Tools used:** a calculator, a question-answering system, two search engines (including Wikipedia search), a machine-translation system and a calendar.
- The model is built on GPT-J (6.7B parameters). It achieved substantially better zero-shot performance on many downstream tasks, often competitive with much larger models, **without losing its core language-modelling ability**.
- **Stated limitations:**
  - It cannot **chain** tools (use one tool's output as input to another), because each tool's calls were generated independently.
  - It cannot use tools **interactively**, for example browsing search results or refining a query.

## Why the course assigned it

- Week 10's objective is to **turn a chatbot into an agent that can call tools, query your data, and act, while keeping it safe**. Toolformer is the research root of "the model decides to call a function". ^[inferred]
- It is paired with the practical [[30-course/readings/openai-2024-function-calling|OpenAI function-calling guide]]: research idea first, then production API. ^[inferred]

## What this means for us

- **Precision belongs in tools, not in the LLM.** Toolformer's premise, that LMs are bad at arithmetic and lookup, is why our Signal agent must call the scoring tool and query features rather than "reason" about raw heart rate. See [[04-agent-engine/multi-agent-decision|multi-agent decision]]. ^[inferred]
- **We will not train tool use.** Modern API models are already tuned for function calling. The design work for us is the **tool surface** (few, typed, narrow tools), not fine-tuning. ^[inferred]
- **Its limitations mark where orchestration is needed.** Chaining and interactive tool use are exactly what [[22-entities/langgraph|LangGraph]] and ReAct-style loops add (see [[30-course/readings/yao-2023-react|Yao 2023]]). ^[inferred]
- **"Keep only calls that help" is a useful evaluation idea.** Log every tool call and check which ones actually changed the recommendation. Calls that never matter are cost and attack surface. ^[inferred]

## Read status

- **Full text** (arXiv PDF) read on 2026-10-26: abstract, introduction, the method overview (Figure 2) and the Limitations section. Experiment tables were skimmed.
