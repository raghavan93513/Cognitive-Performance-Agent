---
title: Time-Series Feature Extraction
category: 21-concepts
tags: [concept, time-series, wearables, features]
aliases: [windowing, tumbling window, sliding window, session window, ASOF join, resampling, time-series database, TSDB]
relationships:
  - target: "[[30-course/weeks/week-07-time-series-multimodal-features]]"
    type: derived_from
  - target: "[[05-data/data-pipeline]]"
    type: related_to
  - target: "[[04-agent-engine/performance-model]]"
    type: related_to
sources: ["binf4070-2026/week-07/slides-07.pdf", "personal-health-agent.github.io/public/weeks/07-exercise.ipynb", "personal-health-agent.github.io/src/content/weeks/07-data-management-iii.md"]
summary: Turning ordered sensor readings into features via windows, LAG, ASOF joins, event runs, baselines and z-normalization, as taught in BINF 4070 Week 7. Basis of our 5/15-min windows.
provenance:
  extracted: 0.65
  inferred: 0.3
  ambiguous: 0.05
base_confidence: 0.64
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Time-Series Feature Extraction

A **time series** is a sequence of observations of one quantity, ordered by time (Week 7 slides p. 5). Feature extraction turns raw readings into summaries an assistant can use, such as means, counts, changes, events, baselines and shape-similarity. As taught in [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]], in SQL on DuckDB.

## Data model

- **Row grain:** one reading from one device. **Key:** `(person_id, device_id, observed_at)` (p. 5).
- **Relations are unordered; time series are ordered.** Every operation must state its ordering (`ORDER BY t`) and its partition (`PARTITION BY person_id`) (pp. 5, 12).
- Wearable APIs deliver several shapes. The lab's Google Health API types:
  - **samples:** HR every 5 s
  - **intervals:** steps per minute
  - **sessions:** sleep and stages, exercise
  - **daily summaries:** resting HR, HRV RMSSD, respiratory rate, skin temperature (lab section 1)

## Data quality comes first

Every analysis assumes complete, correctly timed readings, and real data rarely are (p. 6).

| Problem | Effect | Handling taught or implied |
|---|---|---|
| Gaps (off-wrist, charging, lost signal) | value is **unknown, not 0** | carry `count(*)` per window; `LAG` time-since-previous finds gaps |
| Irregular sampling | unequal counts per window | report n; use time-based frames |
| Duplicates (re-sync) | inflated counts/means | dedupe on the key ^[inferred] |
| Late arrivals | past aggregates change | make windows recomputable ^[inferred] |
| Time zones | UTC daily buckets misassign readings | bucket days in local time (p. 7) |
| Sensor artifacts | e.g. compression lows | plausibility rules ^[inferred] |

## Windows

A **window** is the set of readings an aggregate summarizes, and the window type decides membership (p. 9).

| Type | Definition | SQL (DuckDB) |
|---|---|---|
| Tumbling | fixed, non-overlapping buckets | `GROUP BY time_bucket(INTERVAL 15 MINUTE, t)` |
| Sliding | trailing frame per row, rows not collapsed | `avg(x) OVER (ORDER BY t RANGE BETWEEN INTERVAL 15 MINUTE PRECEDING AND CURRENT ROW)` |
| Session | bounded by inactivity gaps (e.g. > 10 min) | gap flag from `LAG`, then running sum ^[inferred] |

- **`RANGE` (time) vs `ROWS` (count) frames:** after a gap, `ROWS 3 PRECEDING` reaches back across the gap while `RANGE 15 MINUTE` does not (p. 11). For wall-clock features, use `RANGE`.
- **Resampling** to a regular grid is what tumbling `time_bucket` does: one row per bucket, with aggregates and n. The slides don't use the word "resampling". ^[ambiguous]
- **Always report n / coverage** with each aggregate. A fully worn hour of 5-s HR has 720 readings, so fewer means charging or off-wrist (p. 10; lab 2.1).

## Per-row operations

- **`LAG(x)`** gives the previous value in the partition. Use it for **change**, **time since previous** (gap detection) and multi-step rules (p. 13).
- **Event detection = runs of rows.** "Three consecutive readings < 70 mg/dL" is written with `lag(x,1)` and `lag(x,2)` (p. 15).
- **`QUALIFY`** filters on a window-function result, the way `HAVING` filters groups (lab 2.2).

## Aligning series: ASOF JOIN

Different streams (meals vs glucose, HR vs sleep stages, laptop events vs watch) **never share timestamps**, so an equality join returns nothing. `ASOF JOIN … ON a.person = b.person AND a.t >= b.t` attaches the latest right-row at or before each left-row (p. 14). For interval tables, add an end guard (`a.t < b.end_time`) so readings after a stage ends aren't mislabelled (lab 2.3).

## Personal baselines and anomaly flags

- Lab 2.2 uses a trailing **7-day** mean and SD (`ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING`, which excludes today) and computes **z = (x − mean)/sd**, flagging |z| > 2.
- The synthetic data was built so the baseline catches the first two sick days, **misses the third** and raises **one false alarm**. Corroborate across signals (RHR, HRV, respiratory rate, temperature, steps).
- Missing the third day has a cause: anomalous days contaminate the trailing baseline. ^[inferred]

## Shape similarity

**z-normalize** each window (subtract its mean, divide by its SD) to compare **shape, not level**. Use it for post-meal curves, ECG beats and gait cycles. Don't use it when the level matters, e.g. time above a threshold. A window is then a vector, and [[21-concepts/embeddings-and-vector-search|vector search]] finds similar periods (p. 16).

## Storage choices

- The course models time series **as a relation**, "in practice, stored more efficiently" (p. 5). Every lab query runs on a general-purpose analytical engine (DuckDB).
- **Time-series databases** come in through the readings:
  - [[30-course/readings/timescale-2024-glooko|TimescaleDB/Glooko]]: a PostgreSQL extension at billions of points per month.
  - [[30-course/readings/freedman-2020-time-series-db-comparison|Freedman et al. 2020]]: compares TSDBs for low-power sensor networks.
  - The lecture itself doesn't compare engines, and I haven't summarized the readings' findings here. ^[ambiguous]
- Typical TSDB features: time-partitioned storage, compression, retention policies and continuous aggregates. These are the "more efficient" storage the slide alludes to. ^[inferred]

## In the Cognitive Performance Agent

- [[05-data/data-pipeline|Data pipeline]] step 2 summarizes the past **5- and 15-minute** windows. Implement these as **time-based sliding windows** (pandas `rolling('5min')`/`rolling('15min')` on a DatetimeIndex, or SQL `RANGE`), each with **n and coverage**. ^[inferred]
- Expected counts for coverage: at 5-s HR, 60 readings per 5 min and 180 per 15 min. Laptop activity counts per minute. Gaps are "unknown", so the Signal agent must not read them as rest. ^[inferred]
- **Session windows** give "continuous study time": a block ends after N minutes with no input activity. ^[inferred]
- **ASOF joins** align watch readings to laptop events and enforce the "only data before the recommendation" (no-leakage) rule, with a staleness limit. ^[inferred]
- **Personal baselines** ([[04-agent-engine/performance-model|Performance model]], `personal_baselines` in [[06-database/database-and-api|Database and API]]) should learn from the lab's failure. Exclude flagged or ill days, or use robust statistics, so a bad week doesn't become "normal". This matters most for daily context like [[21-concepts/heart-rate-variability|HRV]]. ^[inferred]
- **Time zones:** store UTC plus the local offset, and bucket daily context in local time. This refines the pipeline's "store in UTC" rule. ^[inferred]
- **Storage:** PostgreSQL (optionally TimescaleDB) is sufficient at pilot scale, consistent with [[07-backend/tech-stack|Tech stack]]. ^[inferred]

## Sources

- [[30-course/weeks/week-07-time-series-multimodal-features|Week 07]]: `binf4070-2026/week-07/slides-07.pdf` pp. 4–16, 31.
- `personal-health-agent.github.io/public/weeks/07-exercise.ipynb` section 2 and the setup-cell data generator.
- `personal-health-agent.github.io/src/content/weeks/07-data-management-iii.md` (objective, readings).
