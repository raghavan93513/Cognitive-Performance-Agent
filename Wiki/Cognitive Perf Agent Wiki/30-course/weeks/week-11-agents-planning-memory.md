---
title: "Week 11 — Agents II: Planning, Memory & Multi-Step Health Questions"
category: 30-course
tags: [course, week, agents]
aliases: [Week 11, Agents II, Quiz 2]
sources: ["personal-health-agent.github.io/src/content/weeks/11-agents-ii.md"]
summary: Nov 20 (Quiz 2) — agents that plan multi-step health questions and remember context, and how to debug them when their reasoning goes wrong.
provenance:
  extracted: 0.4
  inferred: 0.6
  ambiguous: 0.0
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 11
date: 2026-11-20
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 11 — Agents II: Planning, Memory & Multi-Step Health Questions

> [!info] Fri **Nov 20** · **Quiz 2 (in class, 10%)** · Slides and lab not released yet.
> **Objective:** "Build agents that break a hard health question into steps and remember context, and learn to debug them when their reasoning goes wrong."

## Readings

- [[30-course/readings/yao-2023-react|Yao et al. 2023 — ReAct]]
- [[30-course/readings/wang-2024-llm-agents-survey|Wang et al. 2024 — A Survey on LLM-Based Autonomous Agents]]

## What this means for us ^[inferred]

- **Memory** in our design is the per-student history in PostgreSQL: past sessions, which suggestions were accepted, and outcomes. This is the Evidence agent's job. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]
- **Planning:** "When am I most ready to perform?" (from our README) is a multi-step question. Look at sleep, time-of-day history and past task scores, then answer. It could be our second, chat-style feature after the break suggestion.
- **Debugging reasoning:** persist every agent step (inputs, tool calls, outputs) so a bad suggestion can be traced. Our design already requires full provenance.
