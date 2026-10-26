---
title: Design Comparison
category: 24-synthesis
tags: [architecture, decision, synthesis]
aliases: [Raghavan vs Alexa, two designs]
relationships:
  - target: "[[31-decks/raghavan-architecture-deck]]"
    type: derived_from
  - target: "[[31-decks/alexa-kafka-system-design]]"
    type: derived_from
  - target: "[[24-synthesis/open-decisions]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: Side-by-side of Raghavan's lean desktop pilot and Alexa's production-grade plan. Same logic, very different scope; they conflict on clients, watch API, queue and what evidence means.
provenance:
  extracted: 0.55
  inferred: 0.3
  ambiguous: 0.15
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Design Comparison

Two design documents sit in the repo's `System Design/` folder. They describe the **same product logic** at very different scope.

- [[31-decks/raghavan-architecture-deck|Raghavan's architecture deck]] (2026-10-15): an 11-slide **lean desktop pilot**.
- [[31-decks/alexa-kafka-system-design|Alexa Kafka's system design]] (2026-10-19): a 12-page **production system design and deployment plan**.

## Where they agree

- Same 5-stage pipeline: collect → prepare/store → analyze → agents decide → show and measure. See [[07-backend/system-architecture|System architecture]].
- Same three agent roles (Signal, Evidence, Action) plus deterministic policy code that the LLM cannot override.
- Numeric code, not the LLM, produces the estimate. Rules come first, then a regularized model.
- A defined task outcome instead of a vague "readiness score". Abstain when data is thin.
- Evaluate against a **fixed-break baseline**, with randomization.
- Default-deny privacy, consent, pause/delete. Wellness framing, not medical.
- FastAPI + PostgreSQL + pandas + scikit-learn.
- No Kubernetes or microservice mesh at the start.

## Where they conflict

| Topic | Raghavan | Alexa |
|---|---|---|
| Clients | One Electron desktop app; "a separate Next.js website is not needed for the first build" | React Native mobile + Next.js web + desktop collector |
| Watch API | Google Health | HealthKit (iOS) + Health Connect (Android) |
| Background jobs | Postgres-backed task list, "no separate queue service" | Managed durable queue |
| Evidence agent retrieves | The user's own past sessions and outcomes (SQL) | Approved research/evidence snippets (pgvector) |
| Infra | None beyond app + backend + DB | Object store, OIDC provider, Docker, Terraform, OpenTelemetry |
| Planning depth | 6-step proof-gated build order | 12-week roadmap, SLOs, API list, DB entities, risk register, CI/CD |

## Reading between the lines ^[inferred]

- Raghavan's deck is the more **realistic first build** for a small student team: one install, one backend, one DB, and a demoable result after step 5.
- Alexa's doc is the stronger **reference for quality rules**: freshness/missingness handling, the canonical observation schema, failure behaviour, LLM safeguards and release gates. Most of those rules cost little and apply to the lean build too.
- A sensible merge: **build Raghavan's scope, adopt Alexa's data contract, failure rules and safeguards**, and keep the mobile/web apps, managed queue and pgvector for after the pilot shows a need.
- The evidence-agent conflict is real and needs deciding. Personal history and a research corpus answer different questions ("what worked for *you*" vs "what does research say"). See [[24-synthesis/open-decisions|Open decisions]].

## Sources

- [[31-decks/raghavan-architecture-deck]]
- [[31-decks/alexa-kafka-system-design]]
