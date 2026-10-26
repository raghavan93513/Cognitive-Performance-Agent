---
title: "Timescale 2024 — How Glooko Scales Diabetes Time-Series Data"
category: 30-course
tags: [course, reading, time-series, database, architecture]
aliases: ["How Glooko turns 3B+ data points per month into diabetes care"]
sources: ["https://www.tigerdata.com/blog/how-glooko-turns-3b-data-points-per-month-into-lifesaving-diabetes-healthcare-tiger-data"]
summary: Vendor case study. Glooko moved continuous glucose data from a document DB to TimescaleDB hypertables partitioned per patient-day, with compression and retention. Faster queries, lower cost.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 07
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Timescale 2024 — How Glooko Scales Diabetes Time-Series Data

> [!cite] TimescaleDB / Tiger Data (as told by Per Grapatin, VP Engineering, Glooko). *How Glooko Turns 3B+ Data Points per Month into Lifesaving Diabetes Healthcare with Tiger Data.* Tiger Data blog, 2024. https://www.tigerdata.com/blog/how-glooko-turns-3b-data-points-per-month-into-lifesaving-diabetes-healthcare-tiger-data
> Assigned in [[30-course/weeks/week-07-time-series-multimodal-features|Week 7 — Time-Series, Multimodal Data and Feature Extraction]].

## Core idea

- Glooko is a diabetes platform used by over 1M patients. It ingests more than **100M new data points per day**, mostly timestamped continuous glucose monitor (CGM) readings and patient events. Older devices sample glucose every 5 minutes, newer ones every minute.
- Data residency rules mean storage is split across regional data centres in Germany, Ireland, Canada and the US.
- Glooko moved its largest medical time-series workload from a **document database** to **TimescaleDB**: managed Postgres with time-series extensions.

## Key findings

- **Problems with the document database:**
  - Slow ingestion at more than 74B total CGM records.
  - **Data bloat:** a 30 TB cluster, largely index overhead.
  - **Slow 14- and 90-day rollups** for clinicians.
  - **No retention policies**, so every reading was kept forever.
- **What Timescale added:** automatic time partitioning (hypertables), **incremental materialized views** (continuous aggregates), and policy-based **compression and retention**. Glooko already trusted Postgres but did not want to self-host a HIPAA/GDPR-compliant stack.
- **Design moves:**
  - Hypertables were designed around the real query pattern, **per patient, per day** ("show me the last 90 days").
  - Only analytics fields stay in the hot path, and the rest goes to cheaper storage.
  - Late-arriving data became a normal, supported write pattern.
  - A dedicated **medical data service** now sits between clients and the database, so schema changes do not ripple through every service.
- **Reported results (vendor-reported):** about 40% lower cost, compression ratios around 95% (up to 97%), queries up to 480× faster (from 4 minutes to half a second), and more stable ingestion.
- *Caveat:* this is a vendor case study with no independent benchmark. ^[inferred]

## Why the course assigned it

- Week 7's objective is to **handle high-frequency wearable data at scale** and turn raw signal into usable features. Glooko is a real health company facing exactly that problem: dense sensor streams, clinician-facing rollups and compliance. ^[inferred]
- It contrasts with the Week 5 document-store story ([[30-course/readings/mongodb-2023-edenlab-fhir-server|MongoDB/Edenlab]]). Documents suit nested FHIR resources, but dense time series favour time-partitioned relational storage. ^[inferred]

## What this means for us

- **Our scale is tiny by comparison.** A pilot of tens of students with minute-level watch data is far below where Timescale is needed. Plain PostgreSQL with a `(participant_id, ts)` index, as in [[06-database/database-and-api|database and API]], is fine to start. ^[inferred]
- **Steal the patterns, not the product:** ^[inferred]
  - **Partition and query by participant-day.** Our features (overnight HRV, daily sleep, session windows) are naturally per participant per day or session.
  - **Precompute rollups.** Daily and session features in a materialised table mean the [[04-agent-engine/performance-model|performance model]] never scans raw minute data at decision time.
  - **Retention policies.** Delete or coarsen raw high-frequency data after features are computed. This supports data minimisation in [[10-trust-safety/privacy-and-consent|privacy and consent]].
  - **Handle late-arriving data.** Watch syncs arrive late, so the [[05-data/data-pipeline|data pipeline]] must accept back-filled windows.
  - **A data-service boundary.** Clients talk to our API, never to the database, which matches [[07-backend/system-architecture|system architecture]].
- Since TimescaleDB is a Postgres extension, it remains an easy upgrade path if needed. ^[inferred]

## Read status

- **Full text** of the blog post read on 2026-10-26 (tigerdata.com).
