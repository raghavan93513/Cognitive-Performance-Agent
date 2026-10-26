---
title: LangGraph
category: 22-entities
tags: [tool, agents, llm]
aliases: [LangChain LangGraph]
relationships:
  - target: "[[04-agent-engine/multi-agent-decision]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf]
summary: Agent orchestration framework (from LangChain) that Raghavan's deck picks to coordinate the Signal, Evidence and Action agents and their tool calls.
provenance:
  extracted: 0.8
  inferred: 0.2
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: peripheral
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# LangGraph

An agent-orchestration framework from LangChain for building multi-step, multi-role LLM workflows as graphs. ^[inferred]

## Use in the Cognitive Performance Agent

- Coordinates the three roles (Signal, Evidence, Action) and their tool calls in [[04-agent-engine/multi-agent-decision|Multi-agent decision]].
- One LLM can serve all roles, so no separate agent servers are needed.
- Useful for **explicit traces** of how a suggestion was reached. It is not required for the numerical model itself.
- Use it when building the multi-agent demo, which is step 5 of the [[02-product/roadmap|roadmap]].
- Industry evidence cited in the deck: a LangChain customer case study with Vodafone.

Alexa's design doc does not name LangGraph. It specifies an orchestrator and a "provider adapter + structured outputs" layer instead. See [[07-backend/tech-stack|Tech stack]].

## Sources

- [[31-decks/raghavan-architecture-deck]] — slides 7, 9
