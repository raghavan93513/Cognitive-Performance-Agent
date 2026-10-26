---
title: Data Pipeline
category: concepts
tags: [data, backend, architecture]
aliases: [prepare and store, ingestion]
relationships:
  - target: "[[projects/cognitive-performance-agent/concepts/data-sources]]"
    type: uses
  - target: "[[projects/cognitive-performance-agent/concepts/performance-model]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: How raw watch and laptop records are validated, deduplicated, time-aligned and stored in PostgreSQL, plus the canonical observation schema and freshness/missingness rules.
provenance:
  extracted: 0.85
  inferred: 0.05
  ambiguous: 0.1
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Data Pipeline

Stage 2 of the [[projects/cognitive-performance-agent/concepts/system-architecture|system architecture]]: **Receive → Clean → Store → Summarize**. The goal is reliable, time-aligned records that every later step can reuse, and that stop duplicate, stale or mismatched measurements from becoming model inputs.

## Steps

1. **Validate and save.** FastAPI/Pydantic checks input shape and consent. PostgreSQL stores measurements, sessions, decisions and outcomes. Repeated uploads are deduplicated, and every read is limited to the signed-in user.
2. **Align the signals.** pandas summarizes the past **5- and 15-minute** study windows. Sleep and overnight HRV attach as daily context. Missing values are preserved, and only data that arrived **before** the recommendation is used, so there's no future leakage.
3. **Summarize.** The output is one clean study summary: behaviour metrics, available watch context, timestamps and missing-data flags.

## Alexa's 8-step ingestion flow

1. Authenticate the user and validate integration scope and consent.
2. Receive or fetch provider records through a source-specific adapter.
3. Normalize timestamps, units, metric names, source IDs and quality metadata.
4. Validate range, schema, ownership and provider constraints. Quarantine invalid records without discarding diagnostic metadata.
5. Deduplicate using provider IDs or stable source/time/value keys.
6. Persist observations plus an **outbox event** in one transaction.
7. Publish processing work. Workers compute features and update freshness/coverage idempotently.
8. Persist feature-window versions and model predictions with source references, then request policy evaluation.

## Canonical observation schema

| Field | Purpose |
|---|---|
| `user_id` | Internal subject ID. Never use email as the join key. |
| `source` | e.g. HealthKit, Health Connect, wearable API, desktop collector |
| `metric` | Canonical name, e.g. `resting_heart_rate`, `sleep_duration`, `app_switch_count` |
| `value` / `unit` | Numeric or typed value with an explicit unit |
| `observed_at` | When it happened, in UTC, with source timezone metadata |
| `received_at` | When the backend got it. Used for lag and freshness. |
| `source_record_id` | Provider ID or stable dedup key |
| `quality_status` | validated / stale / incomplete / rejected … |
| `schema_version` | Version of the data contract |

## Freshness, coverage, missingness

- Each source exposes its last successful sync, latest observation time, coverage over the window and a reason code for missing data.
- **A lack of data is not evidence of a normal value.** Unavailable, denied, stale and sync-failed states stay distinct and are never silently treated as zero.
- Store timestamps in UTC. Feature windows define their boundaries explicitly, including daylight-saving behaviour.

## Background processing

- **Raghavan:** a small Python task runner reads a to-do list saved in PostgreSQL, handles slow wearable imports and retries. Repeating a task must not duplicate its result. "No separate queue service is needed initially."
- **Alexa:** a managed durable queue (Redis/Celery if appropriate) with retry and dead-letter semantics. ^[ambiguous]

## Sources

- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck]] — slide 5
- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design]] — §5, §6
