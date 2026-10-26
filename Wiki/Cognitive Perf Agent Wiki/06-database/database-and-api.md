---
title: Database and API
category: 06-database
tags: [backend, database, api]
aliases: [data model, endpoints, schema]
relationships:
  - target: "[[05-data/data-pipeline]]"
    type: related_to
  - target: "[[10-trust-safety/privacy-and-consent]]"
    type: related_to
sources: [System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf, System Design/Cognitive_Performance_Architecture.pdf]
summary: Proposed PostgreSQL entities (observations, predictions, recommendations, outcomes, consents…) and the illustrative /v1 REST endpoints from Alexa's design. Nothing is implemented yet.
provenance:
  extracted: 0.95
  inferred: 0.05
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Database and API

Proposed data model and API, mostly from [[31-decks/alexa-kafka-system-design|Alexa's design doc]] (§9). Its own caveat: these are *proposed interface examples, not claims about an existing implementation.* Raghavan's deck only says PostgreSQL holds measurements, history, sessions, decisions, task results and the saved background-task list.

## Core entities

| Entity | Purpose |
|---|---|
| `users` / `roles` | Identity linkage and authorization context |
| `consents` | Purpose-specific permissions, policy version, timestamp, revocation state |
| `device_connections` | Provider, scopes, token references, sync status, last success |
| `observations` | Canonical source observations + quality metadata (schema on the Data pipeline page) |
| `feature_windows` | Versioned aggregate features with source references and coverage |
| `personal_baselines` | Versioned per-user reference distributions/parameters |
| `model_predictions` | Target definition, score/probability, uncertainty, model version, feature-window ID |
| `recommendations` | Candidate and displayed recommendation, rationale, timestamps, expiry |
| `policy_decisions` | Allow/deny/modify result, reason codes, policy version |
| `intervention_events` | Shown, accepted, snoozed, completed, ignored, cancelled |
| `task_sessions` / `task_outcomes` | Task metadata, accuracy, task time, recovery time, outcome provenance |
| `experiment_assignments` | Randomization arm, assignment time, protocol version |
| `evidence_sources` / `evidence_chunks` | Approved sources, excerpts, citations, versioning, embeddings |
| `audit_events` / `outbox_events` | Security-relevant actions; reliable async event delivery |

The `observations` field-by-field schema is on [[05-data/data-pipeline|Data pipeline]].

## API surface (illustrative)

| Endpoint | Purpose |
|---|---|
| `POST /v1/integrations/{source}/connect` | Begin source authorization/connection |
| `POST /v1/integrations/{source}/sync` | Request a sync; returns job status instead of blocking |
| `GET /v1/data/quality` | Per-source freshness, coverage, reason codes |
| `GET /v1/readiness/latest` | Latest eligible prediction with model version + uncertainty |
| `POST /v1/recommendations/evaluate` | Request an evaluation for a task/session/trigger |
| `GET /v1/recommendations/{id}` | Read a persisted recommendation + policy status |
| `POST /v1/recommendations/{id}/feedback` | Record accept / snooze / reject / other feedback |
| `POST /v1/tasks/sessions` | Create a task session |
| `POST /v1/tasks/sessions/{id}/outcomes` | Attach measured outcomes |
| `GET /v1/history` | Authorized recommendation + outcome history |
| `GET /v1/evidence/{id}` | Evidence metadata and provenance |
| `POST /v1/account/data-deletion` | Start an auditable deletion workflow |

## Protections

User-scoped parameterized queries, strict validation, row-level security as defence in depth, separate migration/service roles, and audit logs for consent changes, exports and deletions. See [[10-trust-safety/privacy-and-consent|Privacy and consent]].

## Sources

- [[31-decks/alexa-kafka-system-design]] — §6.1, §9
- [[31-decks/raghavan-architecture-deck]] — slides 1, 5
