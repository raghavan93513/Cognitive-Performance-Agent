---
title: "Week 10 — Agents I: Tool Use, Function Calling & API Boundaries"
category: 30-course
tags: [course, week, agents]
aliases: [Week 10, Agents I]
sources: ["personal-health-agent.github.io/src/content/weeks/10-agents-i.md"]
summary: Nov 13 — turn a chatbot into an agent that calls tools, queries data and acts, while staying safe. Maps directly onto our Signal/Evidence/Action agents.
provenance:
  extracted: 0.4
  inferred: 0.6
  ambiguous: 0.0
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 10
date: 2026-11-13
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 10 — Agents I: Tool Use, Function Calling & API Boundaries

> [!info] Fri **Nov 13** · Slides and lab not released yet. · **Objective:** "Turn a chatbot into an agent that can call tools, query your data, and act, while keeping it safe when it does."

## Readings

- [[30-course/readings/schick-2023-toolformer|Schick et al. 2023 — Toolformer]]
- [[30-course/readings/openai-2024-function-calling|OpenAI 2024 — Function calling guide]]

## What this means for us ^[inferred]

- Our agents' tools are: score the current window (Signal), query session history (Evidence), and propose one action from an allowlist (Action). Each needs a typed schema. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]
- "API boundaries": the LLM may call read tools only. The policy engine sits *outside* the LLM and alone decides what is delivered. This is the course's safety framing applied to our design.
- Validate every tool argument server-side, and never let the model write to the database directly.
