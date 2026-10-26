---
title: Cognitive Performance Agent
category: project
tags: [project, agents, wearables, students]
aliases: [CPA, Cognitive Perf Agent]
relationships:
  - target: "[[projects/cognitive-performance-agent/concepts/system-architecture]]"
    type: uses
  - target: "[[projects/cognitive-performance-agent/concepts/multi-agent-decision]]"
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

- **Design stage only.** The repo has a one-line README and two system-design PDFs. There is no code yet.
- Two competing designs exist: a lean desktop pilot ([[projects/cognitive-performance-agent/references/raghavan-architecture-deck|Raghavan's deck]]) and a fuller production plan ([[projects/cognitive-performance-agent/references/alexa-kafka-system-design|Alexa Kafka's design doc]]). See [[projects/cognitive-performance-agent/synthesis/design-comparison|Design comparison]].
- The team has not yet picked one. See [[projects/cognitive-performance-agent/synthesis/open-decisions|Open decisions]].

## How it works (one study session)

1. **Collect** watch, laptop and task data → [[projects/cognitive-performance-agent/concepts/data-sources|Data sources]]
2. **Prepare and store** clean, time-aligned records → [[projects/cognitive-performance-agent/concepts/data-pipeline|Data pipeline]]
3. **Analyze** to get a numeric estimate with uncertainty → [[projects/cognitive-performance-agent/concepts/performance-model|Performance model]]
4. **Agents decide** on an action, then code checks it → [[projects/cognitive-performance-agent/concepts/multi-agent-decision|Multi-agent decision]]
5. **Show the suggestion** and record the student's choice → [[projects/cognitive-performance-agent/concepts/student-interface-and-feedback|Student interface and feedback]]
6. **Measure the outcome** with a later comparable task → [[projects/cognitive-performance-agent/concepts/evaluation-plan|Evaluation plan]]

The full picture is on [[projects/cognitive-performance-agent/concepts/system-architecture|System architecture]].

## Core hypothesis

Multimodal context may help predict when performance is likely to drop, and personalized breaks may beat a fixed-break schedule. Both designs treat this as **unproven**: the project is set up to test it, and a negative result should simplify the product.

## Cross-cutting topics

- [[projects/cognitive-performance-agent/concepts/privacy-and-consent|Privacy and consent]]
- [[projects/cognitive-performance-agent/concepts/tech-stack|Tech stack]]
- [[projects/cognitive-performance-agent/concepts/database-and-api|Database and API]]
- [[projects/cognitive-performance-agent/concepts/deployment-and-operations|Deployment and operations]]
- [[projects/cognitive-performance-agent/concepts/roadmap|Roadmap]]

## Background concepts

- [[concepts/heart-rate-variability|Heart rate variability (HRV)]]
- [[concepts/retrieval-augmented-generation|Retrieval-augmented generation (RAG)]]
- [[entities/langgraph|LangGraph]]

## Team

- [[entities/raghavan-vaidhyaraman|Raghavan Vaidhyaraman]] — repo owner, author of the architecture deck
- [[entities/alexa-kafka|Alexa Kafka]] — author of the system design and deployment plan

## Sources

- `README.md` — one-line project statement
- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck]]
- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design]]
