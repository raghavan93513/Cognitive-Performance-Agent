---
title: Cognitive Performance Agent
category: 01-foundation
tags: [project, agents, wearables, students]
aliases: [CPA, Cognitive Perf Agent]
relationships:
  - target: "[[07-backend/system-architecture]]"
    type: uses
  - target: "[[04-agent-engine/multi-agent-decision]]"
    type: uses
sources: [README.md, System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf, git log]
source_path: /Users/herambchaudhari/Desktop/Cognitive Perf agent/Cognitive-Performance-Agent
summary: Hub page. A wellness agent for students and athletes that uses watch and laptop signals to suggest whether to keep going, walk, or take a break. Design stage only; no code yet.
provenance:
  extracted: 0.8
  inferred: 0.15
  ambiguous: 0.05
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Cognitive Performance Agent

A decision-support and wellness system for **students and athletes**. It answers two questions: *"Should I keep going or take a break?"* and *"When am I most ready to perform at my best?"* It combines opt-in watch data, laptop-activity context and measured task results, then suggests an action: continue, take a short walk, or rest. It is explicitly **not** a medical or diagnostic device.

Repo: <https://github.com/raghavan93513/Cognitive-Performance-Agent>

## Status (as of 2026-10-26)

- **Built as the final project of Columbia's [[30-course/30-course|BINF 4070]]** (Fall 2026). The course's bar is on [[30-course/project-requirements|Project requirements]]. Next milestone: the [[30-course/deliverables/part-2-proposal-presentation|Nov 6 proposal]].
- **Design stage only.** The repo has a one-line README and two system-design PDFs. There is no code yet.
- Two competing designs exist: a lean desktop pilot ([[31-decks/raghavan-architecture-deck|Raghavan's deck]]) and a fuller production plan ([[31-decks/alexa-kafka-system-design|Alexa Kafka's design doc]]). See [[24-synthesis/design-comparison|Design comparison]].
- The team has not yet picked one. See [[24-synthesis/open-decisions|Open decisions]].

## How it works (one study session)

1. **Collect** watch, laptop and task data → [[05-data/data-sources|Data sources]]
2. **Prepare and store** clean, time-aligned records → [[05-data/data-pipeline|Data pipeline]]
3. **Analyze** to get a numeric estimate with uncertainty → [[04-agent-engine/performance-model|Performance model]]
4. **Agents decide** on an action, then code checks it → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]
5. **Show the suggestion** and record the student's choice → [[08-frontend/student-interface-and-feedback|Student interface and feedback]]
6. **Measure the outcome** with a later comparable task → [[15-research/evaluation-plan|Evaluation plan]]

The full picture is on [[07-backend/system-architecture|System architecture]].

## Core hypothesis

Multimodal context may help predict when performance is likely to drop, and personalized breaks may beat a fixed-break schedule. Both designs treat this as **unproven**: the project is set up to test it, and a negative result should simplify the product.

## Cross-cutting topics

- [[13-trust-safety/privacy-and-consent|Privacy and consent]]
- [[07-backend/tech-stack|Tech stack]]
- [[06-database/database-and-api|Database and API]]
- [[14-engineering/deployment-and-operations|Deployment and operations]]
- [[02-product/roadmap|Roadmap]]

## Background concepts

- [[21-concepts/heart-rate-variability|Heart rate variability (HRV)]]
- [[21-concepts/retrieval-augmented-generation|Retrieval-augmented generation (RAG)]]
- [[22-entities/langgraph|LangGraph]]

## Team

- [[22-entities/raghavan-vaidhyaraman|Raghavan Vaidhyaraman]] — repo owner, author of the architecture deck
- [[22-entities/alexa-kafka|Alexa Kafka]] — author of the system design and deployment plan

## Sources

- `README.md` — one-line project statement
- [[31-decks/raghavan-architecture-deck]]
- [[31-decks/alexa-kafka-system-design]]
