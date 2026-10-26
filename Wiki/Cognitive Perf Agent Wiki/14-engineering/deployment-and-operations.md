---
title: Deployment and Operations
category: 14-engineering
tags: [infrastructure, devops, reliability]
aliases: [CI/CD, SLOs, monitoring, scaling, deployment]
relationships:
  - target: "[[07-backend/tech-stack]]"
    type: related_to
  - target: "[[07-backend/system-architecture]]"
    type: related_to
sources: [System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: Alexa's plan for environments, CI/CD, migrations, SLO targets, monitoring and staged scaling. Raghavan's deck does not cover operations.
provenance:
  extracted: 0.95
  inferred: 0.05
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: peripheral
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Deployment and Operations

This page comes only from [[31-decks/alexa-kafka-system-design|Alexa's design doc]] (§5.1, §12–14). Raghavan's deck stops at the pilot and does not cover operations.

## Environments

- Separate dev, staging and production projects/accounts.
- Database, queue and internal worker endpoints stay private; only the public API edge is exposed.
- Separate service identities and secrets per environment.
- Encrypted backups with **tested restoration**: "a backup that has never been restored is not a verified recovery plan."

## CI/CD pipeline

1. Formatting, linting, static type checks, unit tests, schema/contract tests.
2. Dependency, container, secret and static security scans.
3. Build immutable versioned container images.
4. Apply migrations to a disposable test DB and verify rollback.
5. Deploy to staging and run integration, end-to-end, ingestion, policy, model-evaluation and failure-injection tests.
6. Promote the **same built artifact** to production after review.
7. Health checks, canary/gradual rollout, post-deploy smoke tests, automated rollback triggers.
8. Version code, configuration, prompts, policy, model and feature schema independently.

**Migrations:** expand-and-contract. Add backward-compatible schema first, deploy code that reads and writes both forms, migrate, then remove old fields later.

## SLOs (illustrative starting targets)

| Metric | Target |
|---|---|
| Monthly API availability | 99.9% |
| Simple API read latency | p95 < 300 ms |
| Recommendation latency | p95 < 5 s when dependencies are healthy |
| Durable ingestion | No acknowledged event lost after durable commit |
| Recommendation provenance | 100% include model and policy versions |
| Recovery objectives | RPO/RTO set and tested before pilot |

## Monitor

API latency and errors, DB saturation, queue depth, retries, dead letters; provider sync success, token-refresh failures, freshness, duplicates; model latency, prediction distribution, drift, abstention rate; LLM latency, cost, schema-validation failures, fallback rate; recommendation outcomes, experiment-arm balance, deletion workflow status. Instrumented with OpenTelemetry, with sensitive payloads redacted.

## Scaling stages

| Stage | Approach | Trigger to move on |
|---|---|---|
| Prototype / early pilot | One modular API, workers, managed Postgres + queue, one wearable route, coarse desktop collector, simple model | Correctness, research workflow, source reliability |
| Growing pilot | More worker concurrency, tuned indexes, partitioning if needed, cached reads | Persistent queue lag, DB load or latency breaches |
| Multiple teams | Extract integration/inference services only where scaling or ownership requires it | Bottlenecks or coupling outweigh added ops cost |
| Mature product | Formal SRE, stronger governance, experiment platform, region decisions | Validated need, workload, compliance |

## Operational ownership

Document owners, escalation and on-call. Maintain runbooks for queue backlog, provider outages, token expiry, DB saturation, LLM outage and deletion failures.

## Sources

- [[31-decks/alexa-kafka-system-design]] — §5.1, §12, §13, §14
