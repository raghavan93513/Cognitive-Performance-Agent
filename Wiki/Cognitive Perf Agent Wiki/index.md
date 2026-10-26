---
title: Wiki Index
---

# Wiki Index

*This index is automatically maintained. Last updated: 2026-10-26T19:30:00Z*

**Start here:** [[projects/cognitive-performance-agent/cognitive-performance-agent|Cognitive Performance Agent]], the project hub.

## Projects

- [[projects/cognitive-performance-agent/cognitive-performance-agent|Cognitive Performance Agent]] — Wellness agent for students/athletes: watch + laptop signals → continue / walk / break. Design stage only. ( #project #agents)

### Cognitive Performance Agent — concepts

- [[projects/cognitive-performance-agent/concepts/system-architecture|System Architecture]] — The 5-stage flow and how each design packages it ( #architecture)
- [[projects/cognitive-performance-agent/concepts/data-sources|Data Sources]] — Watch = context, laptop = behaviour, study task = performance; what's never collected ( #data #wearables)
- [[projects/cognitive-performance-agent/concepts/data-pipeline|Data Pipeline]] — Validate, dedupe, time-align, store; canonical observation schema ( #data #backend)
- [[projects/cognitive-performance-agent/concepts/performance-model|Performance Model]] — Rules then scikit-learn; defined task target; estimate + uncertainty or abstain ( #ml)
- [[projects/cognitive-performance-agent/concepts/multi-agent-decision|Multi-Agent Decision]] — Signal / Evidence / Action agents + deterministic policy engine ( #agents #llm)
- [[projects/cognitive-performance-agent/concepts/student-interface-and-feedback|Student Interface and Feedback]] — Accept / snooze / decline, then a comparable follow-up task ( #frontend #evaluation)
- [[projects/cognitive-performance-agent/concepts/evaluation-plan|Evaluation Plan]] — Two tests, randomized vs fixed breaks, release gates ( #evaluation #research)
- [[projects/cognitive-performance-agent/concepts/privacy-and-consent|Privacy and Consent]] — Default-deny collection, consent, RLS, deletion, LLM boundary ( #privacy #security)
- [[projects/cognitive-performance-agent/concepts/database-and-api|Database and API]] — Proposed Postgres entities and /v1 endpoints ( #backend #database)
- [[projects/cognitive-performance-agent/concepts/tech-stack|Tech Stack]] — Agreed tools and where the designs differ ( #architecture #infrastructure)
- [[projects/cognitive-performance-agent/concepts/roadmap|Roadmap]] — Raghavan's 6 proof steps and Alexa's 12-week plan ( #planning)
- [[projects/cognitive-performance-agent/concepts/deployment-and-operations|Deployment and Operations]] — Environments, CI/CD, SLOs, monitoring, scaling ( #infrastructure #devops)

### Cognitive Performance Agent — synthesis

- [[projects/cognitive-performance-agent/synthesis/design-comparison|Design Comparison]] — Lean desktop pilot vs production plan: agreements and conflicts ( #decision #synthesis)
- [[projects/cognitive-performance-agent/synthesis/open-decisions|Open Decisions]] — What the team must decide before building ( #decision #planning)

### Cognitive Performance Agent — references

- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck|Raghavan's Architecture Deck]] — 11-slide lean pilot design, 2026-10-15 ( #reference #design-doc)
- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design|Alexa Kafka's System Design]] — 12-page system design & deployment plan, 2026-10-19 ( #reference #design-doc)

## Concepts

- [[concepts/heart-rate-variability|Heart Rate Variability (HRV)]] — Overnight RMSSD; daily context, not a live focus score ( #physiology #wearables)
- [[concepts/retrieval-augmented-generation|Retrieval-Augmented Generation (RAG)]] — Grounding the LLM in retrieved records; the Evidence agent's job ( #llm #agents)

## Entities

- [[entities/raghavan-vaidhyaraman|Raghavan Vaidhyaraman]] — Repo owner; author of the architecture deck ( #person #team)
- [[entities/alexa-kafka|Alexa Kafka]] — Author of the system design & deployment plan ( #person #team)
- [[entities/langgraph|LangGraph]] — Agent orchestration framework for the three agent roles ( #tool #agents)

## Skills

*None yet.*

## References

*Project references are listed under the project above.*

## Synthesis

*Project synthesis pages are listed under the project above.*

## Journal

*None yet.*

## Meta

- [[_meta/taxonomy|Tag Taxonomy]] — Canonical tag vocabulary for this vault ( #meta)
- [[Welcome]] — The obsidian-wiki framework README: how this wiki is built and maintained ( #meta)
