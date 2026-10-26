---
title: Tech Stack
category: 07-backend
tags: [architecture, backend, frontend, infrastructure]
aliases: [stack, tools, technology choices]
relationships:
  - target: "[[22-entities/langgraph]]"
    type: uses
  - target: "[[24-synthesis/design-comparison]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: The tools each design proposes. Both agree on FastAPI, PostgreSQL, pandas, scikit-learn and an LLM layer; they disagree on clients, queue, vector search and infrastructure.
provenance:
  extracted: 0.8
  inferred: 0.05
  ambiguous: 0.15
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Tech Stack

Both designs choose tools for **project fit**. Raghavan's deck notes that industry use supports a tool's maturity but "does not prove prediction accuracy".

## Agreed by both designs

| Tool | Role |
|---|---|
| **Python + FastAPI + Pydantic** | Backend API, data validation, analysis code in one place; reject malformed sensor records |
| **PostgreSQL** | One database for measurements, history, outcomes, decisions |
| **pandas** | Time alignment, rolling window summaries, missing data |
| **scikit-learn** | Regularized, reproducible models once task labels exist; rules before that |
| **One LLM API + agent orchestration** | LangGraph in Raghavan's deck; Alexa's doc specifies a provider adapter with structured outputs |
| **React** | UI (inside Electron, or via React Native / Next.js) |

Agent orchestration details: [[22-entities/langgraph|LangGraph]].

## Where they differ ^[ambiguous]

| Concern | Raghavan (lean pilot) | Alexa (production plan) |
|---|---|---|
| Clients | Electron + TypeScript desktop app only | React Native mobile + Next.js web + desktop collector |
| Watch integration | Google Health / participant exports | Apple HealthKit + Android Health Connect |
| Background work | Python task runner on a Postgres to-do list | Managed durable queue (Redis/Celery if fitting) |
| Retrieval | Plain SQL | pgvector (exact search first, HNSW later) |
| Object storage | — | Managed object store for model artifacts, exports |
| Identity | — | Managed OIDC/OAuth provider |
| Containers / IaC | — | Docker on a managed platform; Terraform |
| Observability | — | OpenTelemetry |

Raghavan's deck explicitly calls a separate vector DB, queue platform and Kubernetes **unnecessary for the initial pilot**. Alexa's doc also rules out Kubernetes and microservices early, but does include the managed queue, object store and pgvector from the start.

## Industry evidence cited (Raghavan's deck)

Electron → VS Code / Slack · React → Meta · FastAPI → Uber Ludwig · PostgreSQL → GitLab · pandas → AWS SDK for pandas · scikit-learn → Spotify · LangGraph → Vodafone.

See [[24-synthesis/design-comparison|Design comparison]] for which to pick.

## Sources

- [[31-decks/raghavan-architecture-deck]] — slide 9
- [[31-decks/alexa-kafka-system-design]] — §1, §5
