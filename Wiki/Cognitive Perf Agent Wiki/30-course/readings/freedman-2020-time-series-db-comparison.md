---
title: "Time-Series DBs for Low-Power Sensor Networks (listed as Freedman 2020)"
category: 30-course
tags: [course, reading, time-series, database, infrastructure]
aliases: ["Comparative analysis of time-series databases for low-power sensor networks", "Comparative Analysis of Time Series Databases in the Context of Edge Computing for Low Power Sensor Networks", "Grzesik & Mrozek 2020"]
sources: ["https://doi.org/10.1007/978-3-030-50426-7_28", "https://doi.org/10.3390/s20082110"]
summary: Benchmarks TimescaleDB, InfluxDB, Riak TS, PostgreSQL and SQLite on a Raspberry Pi for sensor data. Plain PostgreSQL was fastest at inserts and most queries. Course citation looks wrong.
provenance:
  extracted: 0.65
  inferred: 0.25
  ambiguous: 0.1
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 07
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Time-Series DBs for Low-Power Sensor Networks (listed as "Freedman 2020")

> [!cite] As listed by the course: Freedman et al. *Comparative analysis of time-series databases for low-power sensor networks.* Sensors, 2020. https://doi.org/10.3390/s20082110
> **Paper actually found:** Piotr Grzesik, Dariusz Mrozek. *Comparative Analysis of Time Series Databases in the Context of Edge Computing for Low Power Sensor Networks.* ICCS 2020, Lecture Notes in Computer Science, pp. 371–383. https://doi.org/10.1007/978-3-030-50426-7_28
> Assigned in [[30-course/weeks/week-07-time-series-multimodal-features|Week 7 — Time-Series, Multimodal Data and Feature Extraction]].

> [!warning] Citation mismatch
> The course's DOI (10.3390/s20082110) returned "not found" from doi.org and Crossref on 2026-10-26. A title search finds the very similar ICCS 2020 paper by **Grzesik and Mrozek**, not "Freedman et al." in *Sensors*. This page summarises the Grzesik and Mrozek paper on the assumption that it is the intended reading. ^[ambiguous] Worth confirming with course staff.

## Core idea

- Edge devices in IoT sensor networks need a local database to buffer and analyse readings before sending aggregates to the cloud. Which database performs best on a **low-cost single-board computer**?
- The authors benchmark three time-series databases (**TimescaleDB, InfluxDB, Riak TS**) and two relational ones (**PostgreSQL, SQLite**) on a **Raspberry Pi**, used as the edge router of a 6LoWPAN environmental-monitoring network.
- Workload: 10 simulated sensors, each sending air-quality and weather readings (NO₂, PM2.5, PM10, temperature, pressure, humidity, with location and sensor tags) **every 15 s for 24 h**, giving 28,800 data points. Inserts were tested one by one and in batches of 10, followed by three read queries.

## Key findings

- **Inserts, one by one:** PostgreSQL 260 points/s, TimescaleDB 230, Riak TS 191, InfluxDB 54 and SQLite about 8.
- **Batching helps a lot:** up to **8.65× more** points per second (InfluxDB).
- **Reads:** Riak TS was 20–40× slower than the rest and was dropped from the charts.
  - InfluxDB won the first, simple aggregation query.
  - **PostgreSQL** was fastest on the min/max aggregation (48 ms, against InfluxDB 70, TimescaleDB 72 and SQLite 81) and on the threshold-count query (15 ms, against InfluxDB 29, TimescaleDB 39 and SQLite 40).
- **Overall:** at this small scale, plain **PostgreSQL performed best in almost every case**. Apart from Riak TS, all databases answered the test queries in under 80 ms on average. A Raspberry Pi can serve as a small edge aggregation node.
- The related-work section reports an earlier result that TimescaleDB pulls ahead of plain Postgres only **at the scale of millions of rows**, and can be slower for simple indexed lookups because of planning overhead.

## Why the course assigned it

- Week 7 covers storing **high-frequency wearable data** and choosing a store for it. This paper gives a concrete, small-scale benchmark that pushes back on "you need a specialised time-series database". ^[inferred]
- Read with [[30-course/readings/timescale-2024-glooko|Timescale/Glooko]], it shows that the right store depends on scale: Glooko works with billions of points, this paper with tens of thousands. ^[inferred]

## What this means for us

- **Supports our PostgreSQL choice.** A student pilot generates data volumes much closer to this benchmark than to Glooko. Plain PostgreSQL, as both designs on [[07-backend/tech-stack|tech stack]] agree, is the evidence-backed default. ^[inferred]
- **Batch writes.** Watch syncs and laptop telemetry should be written in batches by the ingestion job in [[05-data/data-pipeline|data pipeline]], not row by row. ^[inferred]
- **Edge buffering idea.** The laptop agent could keep a small local SQLite buffer for offline periods and upload in batches. SQLite is slow for inserts here, but fine for a buffer of a few minutes of events. ^[inferred]
- These are 2020 versions on a Raspberry Pi, so treat the numbers as directional. ^[inferred]

## Read status

- **Full text** of the Grzesik and Mrozek chapter read on 2026-10-26 (Springer open-access HTML): abstract, related work, methods and all results. The course-listed *Sensors* DOI could not be resolved, so if a different "Freedman et al." paper was intended, it was **not read**.
