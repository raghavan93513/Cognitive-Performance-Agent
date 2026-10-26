---
title: Data Pipeline
category: 05-data
tags: [data, backend, architecture]
aliases: [prepare and store, ingestion]
relationships:
  - target: "[[05-data/data-sources]]"
    type: uses
  - target: "[[04-agent-engine/performance-model]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf, binf4070-2026/weeks-01-07]
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
updated: 2026-10-26T20:30:00Z
---

# Data Pipeline

Stage 2 of the [[07-backend/system-architecture|system architecture]]: **Receive → Clean → Store → Summarize**. The goal is reliable, time-aligned records that every later step can reuse, and that stop duplicate, stale or mismatched measurements from becoming model inputs.

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

## Course-driven corrections (weeks 1–7)

Changes our pipeline needs, from [[30-course/30-course|the course]]: ^[inferred]

- **Two clocks.** Keep `observed_at` and `received_at`, and test "what did the app know at time T" by rebuilding features at each cutoff. Week 2's lab uses exactly this pattern. → [[30-course/weeks/week-02-clinical-records-and-fhir|Week 2]]
- **Daily context uses the student's local day.** Store in UTC, but bucket sleep and HRV by the student's local calendar day. UTC daily buckets misassign readings, and sleep is assigned to the day it ends. → [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]]
- **Windows are time-based.** The 5- and 15-minute windows use time ranges, not row counts. Each window carries a reading count and coverage, gaps are unknown rather than 0, and watch and laptop data are aligned with as-of joins so no future data leaks in. → [[21-concepts/time-series-feature-extraction|Time-series feature extraction]]
- **Personal baselines exclude anomalous days.** A plain 7-day z-score in the week 7 lab missed a sick day and raised a false alarm.
- **Record lifecycle and code identity.** Add a per-record status (preliminary or final) and a namespaced metric identity (system + code). → [[21-concepts/fhir|FHIR]], [[21-concepts/medical-coding-systems|medical coding systems]]
- **Dedup across sources, not just within one.** Provider IDs don't stop two apps double-counting steps. Pick one step source per user.
- **Validate in the database too.** Add database CHECK constraints alongside Pydantic. Keep raw provider JSON unchanged for reprocessing, and record the rule or model version on every transformation. → [[30-course/weeks/week-05-relational-document-clinical-stores|Week 5]]
- **Log why data is missing.** Missingness can be informative, for example when the watch is taken off, so give every gap a reason code. → [[30-course/weeks/week-01-personal-health-data-foundations|Week 1]]

## Background processing

- **Raghavan:** a small Python task runner reads a to-do list saved in PostgreSQL, handles slow wearable imports and retries. Repeating a task must not duplicate its result. "No separate queue service is needed initially."
- **Alexa:** a managed durable queue (Redis/Celery if appropriate) with retry and dead-letter semantics. ^[ambiguous]

## Sources

- [[31-decks/raghavan-architecture-deck]] — slide 5
- [[31-decks/alexa-kafka-system-design]] — §5, §6
