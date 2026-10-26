---
title: "Week 07 — Time-Series, Multimodal Data & Feature Extraction"
category: 30-course
tags: [course, week, time-series, wearables, multimodal]
aliases: [Week 07, Lecture 07, Data Management III]
sources: ["binf4070-2026/week-07/slides-07.pdf", "personal-health-agent.github.io/public/weeks/07-exercise.ipynb", "personal-health-agent.github.io/src/content/weeks/07-data-management-iii.md"]
summary: Time series as ordered readings; tumbling/sliding/session windows, LAG, ASOF joins, events, z-normalized similarity; image data and VLMs. Grounds our Signal agent's 5/15-min windows.
provenance:
  extracted: 0.75
  inferred: 0.2
  ambiguous: 0.05
base_confidence: 0.66
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 7
date: 2026-10-23
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 07 — Time-Series, Multimodal Data & Feature Extraction

> [!info] Fri **Oct 23, 2026** · "Data Management III: Time-Series, Multimodal Data & Feature Extraction"
> **Objective (course site):** close out data management. Handle high-frequency wearable data at scale and turn weeks of raw signal into features an assistant can use. Lab time was reserved for catching up on the data-management stack.
> **Assessment:** **Quiz 1 (in class)** this week.
> **Slides:** `binf4070-2026/week-07/slides-07.pdf` (32 pp., deck title "Time Series and Image Data") · **Lab:** `public/weeks/07-exercise.ipynb` (synthetic Fitbit Air data in DuckDB + image search via Flock/OpenAI).
> Instructors: [[22-entities/xuhai-orson-xu|Xuhai "Orson" Xu]] and [[22-entities/eugene-wu|Eugene Wu]]. Course hub: [[30-course/30-course|BINF 4070]].

The outline has four parts: time-series data, time-series operations, image data and image operations (slides p. 2). Concept page distilled from this week: [[21-concepts/time-series-feature-extraction|Time-series feature extraction]]. The image half reuses [[21-concepts/embeddings-and-vector-search|Embeddings and vector search]] from [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6]].

> [!note] Where time-series databases come in
> The slides teach time series **in SQL on DuckDB** and do not compare storage engines. "Modeled as relation (in practice, stored more efficiently)" on p. 5 is the only nod. The TSDB angle comes from the two readings (TimescaleDB/Glooko and Freedman et al. 2020). ^[ambiguous]

## Lecture: key ideas

### 1. Time-series data (pp. 3–7)

- **Running example** (p. 4): four days of synthetic CGM glucose. A CGM gives one value every 5 min, so **288 readings a day when nothing is missing**. The plot shows a gap, a short dip, a 20-minute low, a 01:00–02:25 gap and a post-dinner walk. The target band is 70–180 mg/dL.
- **Definition** (p. 5): a time series is a sequence of observations of **one quantity, ordered by time**. As a relation, the **row grain** is one reading from one device, with primary key `(person_id, device_id, observed_at)`. **Relations are unordered, but time series are ordered**, so order must be imposed explicitly.
- **What people want from time series** (p. 6): summarize, compare, detect events, relate to other events, find similar patterns and forecast. **Every goal assumes the readings are complete and correctly timed, and often they are not.**
- **Common errors** (p. 7):

| Error | Example | Effect |
|---|---|---|
| Gaps | warm-up, lost signal, watch off wrist | unknown, **not 0** |
| Irregular sampling | more HR readings during exercise | unequal counts per window |
| Duplicates | re-upload after failed sync | inflated counts and averages |
| Late arrivals | phone syncs hours later | yesterday's total changes |
| Clocks / time zones | no UTC offset; daily buckets in UTC | "Monday" gets 238 of 286 readings |
| Sensor artifacts | lying on a CGM during sleep | false lows |

### 2. Time-series operations (pp. 8–16)

- **A window is the set of readings an aggregate summarizes**, and the window type decides which readings are in it (p. 9):
  - **Tumbling:** fixed, non-overlapping buckets (`time_bucket(INTERVAL 15 MINUTE, t)`). The diagram's buckets hold n = 3, 3, **1** (two readings missing) and 3.
  - **Sliding:** a trailing frame ending at each reading (`OVER (RANGE 15 MIN PRECEDING)`).
  - **Session:** a window bounded by gaps, e.g. a new session after a **gap > 10 min**.
- **Tumbling in SQL** (p. 10): `GROUP BY time_bucket(INTERVAL 1 HOUR, observed_at)` with mean/min/max **and `count(*) AS n`**, the readings behind each mean. "n shows which hours are short."
- **Sliding with `OVER`** (p. 11): the window function computes a value for **every row** from nearby rows and, unlike `GROUP BY`, collapses nothing.
  - `RANGE BETWEEN INTERVAL 15 MINUTE PRECEDING AND CURRENT ROW` covers **the last 15 minutes of time**.
  - `ROWS BETWEEN 3 PRECEDING AND CURRENT ROW` covers **the last 4 rows however far back**. At 19:05, after a gap, RANGE averages 18:50 and 19:05 (188.0), while ROWS reaches back to 18:40 across the gap (170.3).
- **`PARTITION BY person_id`** (p. 12) makes each person a separate series, and a window function never crosses partitions. `WINDOW w AS (…)` names a window so several functions can share it.
- **`LAG`** (p. 13) gives the previous row's value (NULL on the first row). It computes **change** and **time since previous**. "The change of 24 took 15 minutes, not 5", and `WHERE since_prev > INTERVAL 5 MINUTE` lists the gaps.
- **ASOF JOIN** (p. 14) matches each left row to the right row with the **nearest time at or before it**, among rows passing the equality conditions (e.g. same person). It aligns meals to glucose readings. An equality join on time returns nothing because the tables never share a timestamp.
- **Event detection** (p. 15): the rule is **three consecutive readings < 70 mg/dL (15 min) = a low-glucose event** (Danne et al., Diabetes Care 2017). It is implemented with `lag(mg_dl,1)` and `lag(mg_dl,2)`. It returns the rows that *complete* a run (Wed 03:00, 03:05, 03:10). Monday's two lows do not qualify. **Events are runs of rows.**
- **Similarity search with z-normalization** (p. 16): subtract each window's mean and divide by its SD, so distance compares **shape, not level**. Raw distances to curve *a* are b = 80.0 and c = 45.8. Normalized, they are b = 0.00 and c = 1.44, so b has the same shape as a.
  - Use it when **shape** matters at any level: a post-meal curve, ECG beat or gait cycle. Skip it when the **level** matters, e.g. time above 180 mg/dL.
  - **Each window is a vector, so Week 6 vector search applies.**

### 3. Image data (pp. 18–20)

- **Three kinds of health images** (p. 19):

| | Scan | Photo | Form image |
|---|---|---|---|
| Example | fundus, X-ray, CT | wound, skin, meal | faxed/scanned lab report |
| Produced by | clinical device under protocol | phone, uncontrolled light | scanner/fax |
| Format | DICOM | JPEG/HEIC with EXIF | PDF/TIFF/JPEG |
| Useful content | pixels + acquisition metadata | appearance, unknown scale/colour | text and layout |
| Typical question | has the lesion changed? | is the wound smaller? | what value was reported? |

- **Definition** (p. 20): an image is a pixel array (rows × cols × channels) **plus metadata** (who, when, how; e.g. `mm_per_pixel`). Labels, regions, text and embeddings are **derived data**, stored as rows keyed back to `image_id`. Example: a wound segment of 12,500 px at 0.2 mm/px is 5.0 cm².

### 4. Image operations (pp. 21–30)

- **Vision-language models** (p. 22): an image encoder turns the image into vectors that the LLM reads alongside text tokens. A VLM can describe, answer questions or extract form fields. **Its output is generated text, so it can be fluent and wrong.**
- **Image embeddings** (p. 23): CLIP-style models (Radford et al., ICML 2021) are trained on image–caption pairs, giving **one shared space** for an image encoder and a text encoder. Text finds images and an image finds similar images: "the Week 6 search, unchanged".
- **Image search with OpenAI** (p. 24): OpenAI embeddings are text-only, so a **VLM captions each photo and the caption is embedded**. Search then runs over the caption vectors.
- **Recognition tasks** (p. 25):
  - **Classification:** one label per image.
  - **Detection:** a box per object (x, y, w, h, label, score).
  - **Segmentation:** a label per pixel, giving a mask and an area in mm².
  - **Depth:** a distance per pixel.
  - Each output is **stored as rows with the model version**, like Week 5's semantic columns.
- **A detector in SQL** (p. 26): register a fine-tuned YOLO wound detector as a DuckDB Python UDF that returns a list of structs, then `unnest` it into one row per box.
- **IoU** (p. 27): intersection over union scores a model box against a grader's box. **≥ 0.5 usually counts as correct.** In the worked example, 900 / 2,300 ≈ 0.39.
- **Form images** (p. 28): OCR gives words, boxes and confidence, and **layout** links "58" to "HbA1c". Week 5's pipeline then normalizes 58 mmol/mol to 7.5%.
- **VLM extraction** (p. 29): ask for JSON fields "exactly as written".
  - The date stays ambiguous (05/06), so Week 5 normalization still applies.
  - A misread digit (58 → 38) is **fluent and plausible**, so **range checks route rows to a review queue**.
  - **Store the image hash, model and prompt with each extracted row.**
- **Failure modes in image data** (p. 30):
  - **Shortcut learning:** pneumonia models could identify the source hospital at >95% accuracy, and AUC fell from 0.93 to 0.82 at another hospital (Zech 2018).
  - **Confounding marks:** skin markings cut melanoma specificity from 84.1% to 45.8% (Winkler 2019).
  - **Unrepresented groups:** three dermatology models had AUC 0.56–0.67 on a diverse set, lowest on the darkest skin (Daneshjou 2022).
  - **Metadata errors:** a wrong laterality tag or missing EXIF rotation.
  - **Text burned into pixels** survives header de-identification.
- **Summary** (p. 31):
  - Order is part of the data, and **time zones and gaps change answers**.
  - Windows, LAG and ASOF joins express most questions.
  - Events are runs of rows, and similar windows are a vector search.
  - For images, query the metadata and derived rows, not the pixels.

## Lab (07-exercise.ipynb)

**Data:** synthetic **Fitbit Air** data for one person over 28 days (Sep 14 – Oct 11, 2026), shaped like **Google Health API** data types:

- **Samples:** `heart_rate`, every 5 s while worn.
- **Intervals:** `steps`, per minute.
- **Sessions:** `sleep` with `sleep_stages` (LIGHT/DEEP/REM/AWAKE), and `exercise`.
- **Daily summaries:** resting HR, HRV `rmssd_ms`, respiratory rate and sleep temperature.

Built-in story: the band charges every morning (about 1 h with no HR), was left off one night (Sep 22, no sleep record), runs happen three evenings a week, and the person is **ill Oct 2–4**. Illness raises RHR and breathing rate, lowers HRV, raises skin temperature and cuts steps.

| Part | What you do | Skill |
|---|---|---|
| 2.1 | Hourly mean HR on Oct 1 with `time_bucket`; add `count(*)`. A fully worn hour = **720** readings | Coverage per window; short hours from charging/off-wrist; how to report a mean on partial data |
| 2.2 | Daily RHR vs a **personal baseline** = mean of the 7 preceding days (`ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING`); compute z = (bpm − mean)/stddev; keep abs(z) > 2 with `QUALIFY` | Rolling personal baselines and anomaly flags. By design the baseline flags Oct 2–3, **misses Oct 4** and raises a **false alarm on Sep 28**. Cross-check against the other daily tables |
| 2.3 | `ASOF JOIN` heart rate to sleep stages, with `WHERE sample_time < end_time`; mean HR and n per stage | Aligning a sample stream to sessions; without the end-time guard, readings after a stage ends get mislabelled |
| 3.1 | `describe_image(path)`: a VLM captions 10 images into `image_captions` | Captions can miss or invent health details |
| 3.2 | Embed captions and search by text ("a breakfast high in sugar", "a skin problem", "an eye exam", …) | Week 6 vector search over images |
| 3.3 | Nearest images to `fundus_normal` by its stored vector | Image-by-example search, but it compares **captions, not pixels** |

**Images in `public/weeks/07-images/`** are 10 openly licensed Wikimedia Commons photos used only as the section 3 search corpus: `chest_xray`, `fundus_normal`, `fundus_retinopathy`, `glucose_meter`, `hives`, `meal_pancakes`, `meal_salad`, `meal_spaghetti`, `pill_bottle` and `stitches`. They cover all three image kinds (scan, photo, form-like object). The pairs test fine distinctions: normal vs retinopathy fundus, sugary vs healthy meal.

## Readings

- [[30-course/readings/timescale-2024-glooko|TimescaleDB 2024 — How Glooko turns 3B+ data points per month into diabetes care]] (Tiger Data blog/docs)
- [[30-course/readings/freedman-2020-time-series-db-comparison|Freedman et al. 2020 — Comparative analysis of time-series databases for low-power sensor networks]] (Sensors)

## What this means for us

This week is the Signal agent's data layer. See [[05-data/data-pipeline|Data pipeline]], [[04-agent-engine/performance-model|Performance model]] and [[04-agent-engine/multi-agent-decision|Multi-agent decision]].

- **Our 5-/15-minute feature windows are sliding *time* windows, not row windows.** Use `RANGE … INTERVAL` semantics, or pandas `rolling('15min')`, never `ROWS`/`rolling(n)`. A watch gap would otherwise silently stretch "the last 15 minutes" back across the gap (p. 11). ^[inferred]
- **Every feature window must carry its `n` / coverage.** A fully worn 5-s HR stream gives 60 readings per 5 min and 180 per 15 min. Report coverage = n / expected, and let the Signal agent treat low-coverage windows as "unknown", **not 0** (p. 7, lab 2.1). This fits the pipeline's "missing values preserved" rule and the `feature_windows` coverage column in [[06-database/database-and-api|Database and API]]. ^[inferred]
- **Session windows map onto study sessions.** A study block ends after a gap of more than X minutes of no keyboard/app activity, which is the course's session window (p. 9). It gives a principled definition of "continuous work time", a key input to the break suggestion. ^[inferred]
- **ASOF JOIN is the correct alignment primitive.** Watch HR, laptop activity and self-reports never share timestamps. Attaching "the latest watch reading at or before each laptop event", with a staleness bound (cf. the lab's `end_time` guard), implements the pipeline's **no-future-leakage** rule directly (p. 14). ^[inferred]
- **Personal baselines: copy the lab's design and its failure.** The trailing-7-day mean/SD z-score is exactly the "rolling personal baselines" in [[04-agent-engine/performance-model|Performance model]]. The lab shows it **misses the third sick day** because the sick days have entered the baseline, and it raises a false alarm. For daily context ([[21-concepts/heart-rate-variability|HRV]], RHR, sleep) consider excluding flagged days from the baseline or using a longer or robust (median/MAD) baseline. Cross-check several signals before flagging. ^[inferred]
- **Time zones: possible conflict with our pipeline page.** [[05-data/data-pipeline|Data pipeline]] says "store timestamps in UTC". The course warns that **daily buckets in UTC** misassign readings ("Monday" gets 238 of 286, p. 7). Storing UTC is fine, but daily context (last night's sleep, today's baseline) must be bucketed in the student's **local** day, with the offset stored per reading. Late arrivals and re-sync duplicates also mean daily features must be recomputable and deduplicated on `(person_id, device_id, observed_at)`. ^[inferred]
- **Event rules as runs** ("N consecutive windows above threshold") are a transparent, testable way to express things like "elevated HR for 3 consecutive 5-min windows while typing". They are more explainable than a single-window spike. ^[inferred]
- **z-normalized window similarity** could later answer "when else did my afternoon look like this?" using the same vector machinery as the Evidence agent. It is nice-to-have, not a pilot need. ^[inferred]
- **Storage choice.** The slides do everything in a relational engine. At our scale (one student, 5-s HR plus per-minute activity), PostgreSQL, optionally with the TimescaleDB extension (the Glooko reading), is enough, consistent with [[07-backend/tech-stack|Tech stack]]. A dedicated TSDB is not needed for the pilot. ^[inferred]
- **Multimodal is out of scope** for the core agent. The VLM lessons still apply to any LLM-extracted field: store model + prompt + input hash, range-check, and route to review (p. 29). That matches our provenance rules for LLM outputs. ^[inferred]

## Likely quiz material

Quiz 1 was held in class this week. These are the likely exam points from this deck:

- Definition of a time series; row grain and primary key; "relations are unordered, time series are ordered".
- The six goals (summarize … forecast) and the six error types with their effects. Gaps are unknown, not 0. Know the UTC daily-bucket example.
- Tumbling vs sliding vs session windows and their SQL forms (`time_bucket`, `OVER (RANGE …)`, gap-defined sessions).
- `RANGE` vs `ROWS` frames across a gap. `GROUP BY` collapses rows; window functions don't.
- `PARTITION BY`, named `WINDOW`, `LAG` for change and gaps, and `QUALIFY` (lab).
- ASOF JOIN semantics (nearest at-or-before, with equality conditions) and why an equality join on time fails.
- Event rule: 3 consecutive < 70 mg/dL readings, written with two `lag`s.
- z-normalization: what it removes (level, scale), when to use it (shape) and when not (level thresholds).
- Image = pixels + metadata, with derived rows. Scan vs photo vs form image.
- VLM definition and its "fluent and wrong" risk. CLIP shared space. Caption-then-embed search.
- Classification / detection / segmentation / depth outputs. IoU calculation and the 0.5 threshold.
- OCR + layout; VLM JSON extraction safeguards (normalize, range check, store hash/model/prompt).
- Image failure modes: shortcut learning, confounding marks, unrepresented skin tones, metadata errors, burned-in text.

## Sources

- `binf4070-2026/week-07/slides-07.pdf`: CGM example p. 4; definition p. 5; goals p. 6; errors p. 7; window types p. 9; time_bucket p. 10; OVER RANGE/ROWS p. 11; PARTITION BY p. 12; LAG p. 13; ASOF p. 14; events p. 15; z-normalization p. 16; image kinds p. 19; image definition p. 20; VLM p. 22; image embeddings p. 23; OpenAI image search p. 24; recognition p. 25; detector UDF p. 26; IoU p. 27; OCR p. 28; VLM extraction p. 29; failure modes p. 30; summary p. 31.
- `personal-health-agent.github.io/public/weeks/07-exercise.ipynb`: sections 1–3 and the setup cell (Fitbit Air data generator story: seed 46, illness Oct 2–4, forgotten night Sep 22).
- `personal-health-agent.github.io/public/weeks/07-images/`: file listing only (images not opened).
- `personal-health-agent.github.io/src/content/weeks/07-data-management-iii.md`: date, objective, Quiz 1, readings.
