---
title: "Week 03 — Wearable Sensors and Measurements"
category: 30-course
tags: [course, week, wearables, data]
aliases: [Week 03, Lecture 03, Health Data Sources II]
sources: ["binf4070-2026/week-03/slides-03.pdf", "binf4070-2026/week-03/lab-03.ipynb", "binf4070-2026/week-03/data/heart-rate.json", "binf4070-2026/week-03/data/sleep.json", "binf4070-2026/week-03/data/steps.json", "personal-health-agent.github.io/src/content/weeks/03-sensors-signals.md"]
summary: How IMU and PPG signals become steps, HR, HRV and sleep, why they are estimates, and the exact Google Health v4 Fitbit JSON our pipeline must parse.
provenance:
  extracted: 0.78
  inferred: 0.18
  ambiguous: 0.04
base_confidence: 0.66
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
week: 3
date: 2026-09-25
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 03 — Wearable Sensors and Measurements

> [!info] Fri 25 Sep 2026 · "Health Data Sources II: Wearable Sensors and Measurements"
> **Objective (course site):** see how raw sensor signals become steps, heart rate and sleep, and learn why the numbers on your dashboard are *estimates, not ground truth*.
> Slides: `binf4070-2026/week-03/slides-03.pdf` (54 pp.) · Lab: `binf4070-2026/week-03/lab-03.ipynb` · Data: `week-03/data/{steps,heart-rate,sleep}.json`

**Why this week matters most for us:** our product reads watch HR, HRV, sleep and steps through Google Health. This lecture explains how each of those numbers is produced, where it breaks, and the lab shows the exact JSON we will ingest. Companion concept pages: [[21-concepts/photoplethysmography|Photoplethysmography (PPG)]] and [[21-concepts/wearable-measurement-error|Wearable measurement error]].

Lecture outline (p. 2): (1) motion sensors and step counting, (2) PPG, heart rate and HRV, (3) sleep stages and metrics, (4) time processing and data quality, (5) data access through APIs and OAuth.

## Lecture: key ideas

### 0. A dashboard number hides a pipeline (pp. 3–5)

- A Fitbit Sense teardown shows skin-facing optical windows (light into and out of tissue) and motion chips inside the case. Software, not the sensor, turns readings into metrics (pp. 3–4).
- The chain is: **physical phenomenon → sensor → digital samples → time index → quality checks → filtering → window → features → model → displayed metric → API record** (p. 5).
- **Every arrow is a choice that can change the result** (p. 5). This is the thesis of the week.

### 1. Motion sensors and step counting (pp. 6–17)

**The IMU (inertial measurement unit)** (p. 7):
- **Accelerometer** gives acceleration on x/y/z, *including gravity*. **Gyroscope** gives angular rate (°/s). Together they make a **six-axis** IMU. An optional **magnetometer** helps with heading.
- The accelerometer does **not** directly measure speed or position.

**Sensor fusion** (p. 8): the gyroscope predicts orientation changes, gravity/magnetic references correct them, and estimated gravity is subtracted to get *linear* acceleration. At rest, gravity's magnitude stays near 1 g.

**Magnitude** (p. 9): `sqrt(ax² + ay² + az²)` removes orientation dependence but keeps gravity. Worked example: (0.7, 1.0, 0.6) g gives 1.36 g.

**Rule-based step counter** (pp. 10–13), "before the machine-learning era":
1. Combine or orient the axes.
2. Filter out gravity and irrelevant frequencies. High-pass removes slow gravity/drift, band-pass keeps a cadence range, low-pass suppresses fast variation (p. 11).
3. Detect candidate peaks using **prominence** (rise above the local baseline) and **spacing** (minimum gap between kept peaks) (p. 12).
4. Require plausible cadence or persistence.

Worked teaching rule (p. 13): keep peaks with prominence ≥ 0.20 g and spacing ≥ 0.40 s. Six candidates give **4 steps**. One is rejected as too small (0.12 g) and one as too close (0.38 s after the previous peak).

**Step-count errors** (p. 14):

| Scenario | What happens | Error type |
|---|---|---|
| Pushing a cart | Reduced wrist motion means a real step is missed | False negative |
| Vibrating bus | Vibration peaks are counted as steps | False positive |

"Periodicity alone does not establish walking." Stricter rules reject vibration but miss real steps when gait or wrist placement changes (p. 14).

**Learned step counters** (pp. 15–17):
- Neural networks take x/y/z acceleration (or magnitude) and output steps.
- They are trained on acceleration windows synced to reference labels.
- Two output designs: a *walking/not-walking* classifier plus a separate counter, or a *direct count* (which must avoid double-counting across windows) (p. 16).
- The open-source **OxWearables stepcount** tool combines a learned walking detector with peak counting. The state of the art uses IMU foundation models (p. 16).

| Decision | Explicit rules | Neural model |
|---|---|---|
| Data | Examples to tune and test | Representative labels to train and test |
| Inspection | Trace thresholds and filters | Inspect predictions and failure cases |
| New people, gait, placement | Recheck against a reference | Test transfer; retrain if needed |
| Device resources | Cost of filters/rules | Cost of model inference |

"Learning can reduce manual feature design; preprocessing, labels, and counting rules still matter" (pp. 16–17).

### 2. PPG, heart rate and HRV (pp. 18–23)

Full mechanism on [[21-concepts/photoplethysmography|Photoplethysmography]]. The key points:

- **PPG measures an optical signal affected by peripheral blood-volume change.** LEDs light the tissue and a photodetector measures returned light. Peaks support pulse-interval estimates (p. 19).
- **ECG measures cardiac electrical activity; PPG does not.** PPG gives *peripheral pulse timing*. ECG events and diagnoses need different evidence (pp. 19–20).
- **Pulse rate = 60 / mean inter-beat interval.** Worked example: intervals of 0.83, 0.80 and 0.87 s give a mean of 0.833 s, so **72.0 bpm**. **Missed or extra peaks change the intervals and the displayed rate** (p. 20).
- **Motion can mimic the pulse** (p. 21). Wrist motion changes contact and the optical path. If the motion rhythm matches the pulse rhythm (e.g. both at 1.5 Hz), *frequency filtering alone cannot separate them*. Concurrent accelerometry and signal-quality checks help, "but the result remains method-dependent."
- **HRV** is the variation in time between heartbeats (p. 22). An **NN interval** spans successive *normal* beats, measured between ECG R peaks. The pipeline is: detect beats → handle artifacts → compare intervals. **Wrist PPG uses pulse timing, so its HRV estimates can differ from ECG** (p. 22).

**HRV features** (p. 23). Synthetic example: NN = 800, 840, 900, 860, 800 ms.

| Feature | Definition | Example value |
|---|---|---|
| SDNN | Sample SD of NN intervals (overall spread) | 42.43 ms (mean 840 ms) |
| RMSSD | Root mean square of successive NN differences (beat-to-beat change) | 50.99 ms |
| pNN50 | % of adjacent NN pairs differing by more than 50 ms | 2/4 = 50% |
| LF / HF | Power in low- and high-frequency bands, and their ratio | — |

Python packages that compute these from a list of IBIs: **NeuroKit2** and **HeartPy** (p. 23). See [[21-concepts/heart-rate-variability|Heart rate variability]].

### 3. Sleep stages and metrics (pp. 24–29)

**Stage labels** (p. 25):

| Clinical stage | Meaning | App label |
|---|---|---|
| N1 | Sleep onset | Core (Apple) / Light (Fitbit, Oura) |
| N2 | Established sleep | Core / Light |
| N3 | Slow-wave sleep | Deep |
| REM | Rapid eye movement | REM |

So a consumer "Light" label merges N1 and N2.

**Duration and efficiency** (p. 26). Teaching night: in bed 23:00–07:00 = 480 min time in bed (TIB). Sleep latency is 20 min and WASO (wake after sleep onset) is 40 min.
- Total sleep time (TST) = 480 − 20 − 40 = **420 min**.
- **Sleep efficiency = TST / TIB × 100 = 87.5%**.

**Polysomnography (PSG) is ground truth** (p. 27). It combines EEG (brain), EOG (eyes) and chin EMG (muscle), which support stage scoring, plus breathing and SpO₂. It is "much richer than PPG."

**PPG-only staging is rough** (p. 28). In the Wulterkens et al. hypnograms, PPG-algorithm staging against PSG (4 classes: Wake/REM/N1-N2/N3) reaches **κ ≈ 0.53–0.71 and accuracy ≈ 69–83%** in patients with sleep-disordered breathing or insomnia. Multimodal models add motion, pulse/HRV, SpO₂ and skin temperature, and their inputs are model-specific.

**Digital phenotyping** (p. 29, Onnela & Rauch 2016) means quantifying everyday behavioural and physiological patterns from personal devices:
- motion and steps → when activity happens
- resting HR and HRV → change *under comparable resting conditions*
- sleep duration and timing → amount and schedule

"The pattern alone is not a diagnosis." Fewer steps, later sleep and changed resting HR can each have several causes.

### 4. Time processing and data quality (pp. 32–41)

- **The time index reveals broken cadence** (p. 33). At 50 Hz the nominal gap is 20 ms. An observed 70 ms gap could be missing samples, clock jitter, buffering or a pause. A fixed-rate filter no longer gets the cadence it assumes.
- **Downsampling** (p. 34) averages into coarser bins (e.g. 2 s means). **A bin with 0/2 support stays missing.** It is never zero.
- **Upsampling** (p. 35) adds grid points that **are not new observations**. Interpolate only within a gap limit (2 s in the example) and leave longer gaps missing.
- **Quality control comes before features** (p. 36). Filter baseline wander and out-of-band noise, run signal-quality assessment to reject unusable windows, then detect landmarks (pulse peaks). **Parameters and rejected windows remain part of provenance.**
- **Error changes with activity and device** (p. 37, Bent et al. 2020): see [[21-concepts/wearable-measurement-error|Wearable measurement error]]. Error varied by device and activity, and activity increased error on average. Fit, placement, perfusion, hardware and algorithm all matter. An exercise claim needs evaluation during exercise. **Evidence about clinical pulse oximetry cannot be transferred automatically to consumer wrist pulse rate.**
- **Missingness is device- and activity-specific** (p. 38). **Coverage** is the fraction of expected windows with a usable value (48/60 = 80%). Accuracy is computed only on the values that exist, so **good accuracy can coexist with poor coverage.**
- **Daily join** (p. 39) at a grain of one person-day in local time:

| Clinical/EHR | Everyday sensor | Self-report |
|---|---|---|
| Hemoglobin 10.8 g/dL, specimen 09:10, final | Resting HR 75 bpm, daily estimate, wear coverage 18.5 h, method DERIVED | Fatigue 7/10 at 21:05, recall "today", note "Slept poorly" |

The shared date aligns the records, but **it does not make them simultaneous or show that one caused another.**

- **Evaluate the exact claim** (p. 40). Fill in: *"How accurately and consistently does device X estimate metric Y for population Z during context A, compared with reference R, at coverage C?"* Then measure misses, false detections, absolute error, coverage and subgroup performance.
- **Five-step evaluation** (p. 41):
  1. Inspect records: keep source, time, units and grain.
  2. Specify processing: filters, windows, thresholds, model versions.
  3. Check usable coverage: report gaps and rejected windows.
  4. Evaluate against a reference suited to the population and context.
  5. Report with evidence, alternatives and uncertainty visible.

### 5. Data access: Google Health API and OAuth (pp. 42–48)

- **Flow** (p. 43): Fitbit → phone sync → Google Health account (cloud) → authorized API request → JSON records. **Sync puts records in the account; app consent decides which records code may request.**
- **OAuth = delegated authorization** (p. 44). The app gets limited access without the user's password.
  1. Register a client with Google, which issues a client ID; you register the callback URL.
  2. Each user grants scopes. Registration alone grants no data access.
  3. Google sends a code to the callback, which is exchanged for tokens.
  4. The access token (a temporary credential) is presented to read the permitted records.
- **Hotel analogy** (p. 45): Google is the hotel, the data is in your room, and the third-party app is your representative. The receipt is the code, the expiring pass is the access token. The third party is responsible for registering a secure app.
- **Course flow** (pp. 46–47): the course registered the OAuth client "BINF 4070 Personal Health Data Access". A **hosted helper** holds the client identity and renews tokens. Students store a matching pair in Colab Secrets: `GOOGLE_HEALTH_REFRESH_TOKEN` and `GOOGLE_HEALTH_HELPER_TOKEN`. Each person's tokens reach only their own data. Slide p. 46: **"When you want to provide service to your users: You will be the one who registered the third-party app and host the helper!"**
- **DataPoint envelope** (p. 48). Read from the outside in: `dataSource` (origin and `recordingMethod`, e.g. `PASSIVELY_MEASURED`; `platform: FITBIT`), then **one typed payload** (`heartRate`, `steps`, `sleep`, or daily derived metrics) that defines its own value and time shape.
- Students can borrow a **Fitbit Air**. Synthetic data is a complete, equally graded path (pp. 31, 49–53).

## Lab — Fitbit data, visualizations, and an AI summary

Lab parts (p. 53 and the notebook): **0** API setup or sample path → **1** retrieve one day and choose a step source → **2** plot steps, HR and sleep → **3** generate an OpenAI summary and check it against the evidence → **4** take-home selected-day analysis.

### Part 0 — setup

- Live access goes through the course OAuth helper. To use live data, students grant **all three read scopes: activity (steps), health metrics (HR), and sleep.** The course app requests **no medical-record scopes**.
- The credential check reports availability but never prints values. Credentials never go into cells, outputs, URLs or AI tools. If exposed, revoke the app in Google Account connections and re-authorize.
- `list_health_data(type, day, force_sample)` handles token refresh (cached in memory, renewed 60 s before expiry) and pagination. **A live error stops the cell. It never silently substitutes sample data.**

### Part 1 — retrieve, and choose ONE step source

- `GET https://health.googleapis.com/v4/users/me/dataTypes/{type}/dataPoints`, where `{type}` is `steps`, `heart-rate` or `sleep`.
- **An empty response means "no observations", not a measured zero.**
- The sample includes a second, overlapping **fictional import stream**. Its `packageName` is `edu.columbia.binf4070.synthetic.import`, with `recordingMethod: MANUAL`. **Adding both sources would double-count.**
- The code reports per-package totals, requires exactly one package (`com.google.fitbit`), and **excludes unattributed points** (no `application.packageName`). The result is a "raw per-source sum, not an official reconciled daily total."

### Part 2 — plots (TODO: one plotting line each)

- **Steps:** bars sized to actual interval widths on local clock time. The sample has 144 ten-minute bars, and the largest starts at 18:50 with 668 steps.
- **HR:** expect 144 point samples, 57–118 bpm. **"Each value is a point measurement, not a ten-minute mean."** A connecting line does not tell you what happened between samples.
- **Sleep:** bars of `summary.stagesSummary` minutes (Awake 40, Light 228, Deep 83, REM 103). Light + Deep + REM = 414 = `minutesAsleep`. Don't re-add the aggregate totals. Classic records may use other categories, and unknown labels stay visible.

### Part 3 — AI summary and evidence check

- Part 3 has its **own** live/synthetic switch, so a Part 1 live demo doesn't also authorize sending data to OpenAI. The **full source-filtered responses** go to the model (`gpt-5.6-luna` via the Responses API, `store=False`, which the notebook notes is *not* a zero-retention guarantee).
- The system prompt requires the model to:
  - report steps, HR and sleep
  - keep the step total labelled as a raw per-source sum
  - say when data is missing
  - describe variation *without inferring cause, activity or health status*
  - not repeat DataPoint names, timestamps or device metadata
  - not diagnose or give medical advice
- A prompt/cost preview (tiktoken, $0.20 per M input tokens) must run before the request. Changing inputs invalidates it.
- The student then quotes a numerical claim from the output, compares it with an `summary_evidence` field (step sum, HR count/min/max, sleep session), and names one thing the records cannot establish.

### Part 4 — take-home (homework)

- Fitbit holders use their own day. Others download the public detailed sample (2026-09-10), a fictional day for a 24-year-old male student.
- **4.2 Steps:** build interval and *observed* cumulative step tables. Credit counts at interval ends. Widths and ordering use physical time. **Missing intervals are not zeros**, so leave gaps between coverage groups.
- **4.3 HR:** a raw-point scatter plus a **time-based trailing mean** (e.g. `"30min"`, `closed="right"`, so the current point is included and the left edge excluded), a minimum sample count, and a `window_sample_count`. Don't join lines across gaps longer than the window. Students explain what smoothing hides.
- **4.4 Sleep:** a stage timeline from the reported stage intervals, using each endpoint's own offset. **"Never reconstruct chronology from summary totals."** The public sample has a summary only, so a separately labelled practice session is used.
- **4.5–4.6:** compact JSON goes to two LLM requests. One is a day summary with student-written rules separating observed counts from missing intervals, raw from smoothed HR, and sleep summary from stage intervals. The other describes a pattern with a numerical comparison and a stated limitation.
- Before submission, strip names, exact dates, device metadata and prompt previews.

### Exact Google Health v4 data shapes (what our pipeline will consume)

Common envelope for every DataPoint:

```text
{ "name": "users/me/dataTypes/<type>/dataPoints/<id>",
  "dataSource": { "recordingMethod": PASSIVELY_MEASURED | MANUAL | DERIVED(p.39),
                  "application": {"packageName": "com.google.fitbit"},
                  "device": {"manufacturer", "displayName"},
                  "platform": "FITBIT" },
  "<payload>": {...} }
List response: { "dataPoints": [...], "nextPageToken": "" }   // token may be "" or absent
```

| Type (URL path / JSON key) | Time shape | Value fields | Filter field (per local date) | Max pageSize |
|---|---|---|---|---|
| `steps` / `steps` | `interval`: startTime, endTime (UTC Z), startUtcOffset, endUtcOffset, civilStartTime, civilEndTime | `count` (string) | `steps.interval.civil_start_time` | 10000 |
| `heart-rate` / `heartRate` | `sampleTime`: physicalTime, utcOffset, civilTime | `beatsPerMinute` (string); `metadata.motionContext` (ACTIVE / SEDENTARY), `metadata.sensorLocation` (WRIST) | `heart_rate.sample_time.civil_time` | 10000 |
| `sleep` / `sleep` | `interval` as for steps; the session is assigned to the date it **ends** | `type` (STAGES); `stages[]` {startTime, endTime, offsets, `type`}; `metadata` {processed, nap, manuallyEdited, stagesStatus}; `summary` {minutesInSleepPeriod, minutesAsleep, minutesAwake, `stagesSummary[]` {type, minutes, count}} | `sleep.interval.civil_end_time` | 25 |

Parsing rules the lab enforces:
- **Numbers arrive as strings.** `"78"`, `"250"`, `"402"`.
- `utcOffset` is a string in seconds (`"-14400s"` = UTC−4).
- `civilTime` is a nested `{date:{year,month,day}, time:{hours,minutes,seconds}}`.
- Local time = physicalTime + offset. **If the offset is absent, local time cannot be established.**
- Sort and compute durations on **physical (UTC) time**, and display on recorded local time. A clock change can repeat an hour.
- **List responses are newest-first** across all application sources.
- **A true-zero step point may omit `count`**, so treat a missing count as `"0"` only for a returned point. An *absent* point is still missing.
- Sleep stage types are `AWAKE`, `LIGHT`, `DEEP`, `REM`. Classic records use `RESTLESS` and `ASLEEP`. Anything else is shown as "Unrecognized".
- The pagination loop errors if a `nextPageToken` repeats.

**Public `week-03/data/*.json` files** (schema and sampling only):

| File | Points | Sampling | Notes |
|---|---|---|---|
| `steps.json` | 1440 | One 1-minute interval per minute, 00:00–23:59 local | Single source `com.google.fitbit`; every point has a `count` (zeros explicit); offset `-14400s` throughout |
| `heart-rate.json` | 288 | One point sample every **5 min** (all gaps 300 s) | `motionContext` is SEDENTARY or ACTIVE on every point; `sensorLocation` WRIST |
| `sleep.json` | 1 | One session, 23:48 → 07:12 local | `type: STAGES`, `stagesStatus: SUCCEEDED`, but **no `stages[]` and no `stagesSummary`**: summary minutes only (444 in period / 402 asleep / 42 awake) |

All three use device `displayName` "Fictional Course Fitbit". The in-notebook class sample is coarser: 10-minute step intervals, 10-minute HR points, a full stage list, and a day (Sep 22) deliberately with no HR. ^[ambiguous] In the synthetic data, `motionContext` is set by an authored rule (bpm ≥ 95 → ACTIVE). Real Fitbit semantics for this field aren't explained in the course.

## Readings

- [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent et al. 2020 — Sources of inaccuracy in wearable optical HR sensors]] (*npj Digital Medicine*). Its Figures 2 and 3 are slides 37–38.
- [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding et al. 2020 — Racial bias in pulse oximetry measurement]] (*NEJM*). The lecture cites it only indirectly (p. 37 caution against transferring pulse-oximetry evidence).

## What this means for us

- **Our watch numbers are vendor estimates with unknown processing.** Every displayed value went through the p. 5 pipeline with choices we can't see. We should store `dataSource` (packageName, device, recordingMethod) with every observation and treat values as estimates. ^[inferred] → [[05-data/data-pipeline|Data pipeline]]
- **Our 5-/15-minute feature windows may contain very little HR.** The public sample has one HR point every 5 minutes, and the lab stresses that these are point samples, not means. A 5-minute window may hold zero or one HR value. Data arrives via phone → cloud sync, so it isn't a live reading. We should report `window_sample_count` and coverage per window, like Part 4.3. ^[inferred] → [[05-data/data-sources|Data sources]], [[04-agent-engine/performance-model|Performance model]]
- **HR during a "short walk" is the least trustworthy HR we will collect.** Activity raises PPG error (p. 37) and motion can mimic the pulse (p. 21). Don't use walk-time HR as evidence that a break "worked". Prefer task-performance labels, which our design already favours. ^[inferred] → [[15-research/evaluation-plan|Evaluation plan]]
- **Step sources must be selected, not summed.** Our Alexa ingestion flow deduplicates by provider ID or stable keys. That doesn't stop double-counting when two *applications* write overlapping step intervals. We need a per-user "selected step source" rule and must exclude unattributed points. ^[inferred]
- **Missing ≠ zero ≠ normal.** This matches our pipeline rule ("a lack of data is not evidence of a normal value") and adds concrete cases: an empty list, an absent point, and a present point with an omitted `count` are three different things. ^[inferred]
- **Timestamps:** store physical UTC plus the per-record `utcOffset`, as both our canonical schema (`observed_at` UTC plus source timezone metadata) and the lab do. Never assume a geographic timezone. Sleep sessions belong to their end date. ^[inferred]
- **HRV gap:** the lab never fetches HRV. Slide p. 48 only says "daily derived metrics" payloads exist, and p. 22 warns that wrist-PPG HRV can differ from ECG. Our [[21-concepts/heart-rate-variability|HRV page]] relies on overnight RMSSD from Google Health, so we must look up that data type's shape ourselves. ^[inferred]
- **Sleep stages are rough** (κ ≈ 0.5–0.7 against PSG). Use sleep duration and timing as context. Don't build features on Deep/REM minutes. Note that the public sample has summary-only sleep with no stages. ^[inferred]
- **We are the third-party app.** For real users we must register our own Google OAuth client and host the token-refresh service (p. 46), request only activity, health-metric and sleep scopes, and keep refresh tokens server-side. ^[inferred] → [[13-trust-safety/privacy-and-consent|Privacy and consent]], [[07-backend/system-architecture|System architecture]]
- **LLM summaries must be evidence-checked.** The lab's system-prompt rules (no cause/activity/health-status inference, no diagnosis, label missing data, don't repeat metadata) are a ready template for our Signal agent's guardrails. The lab sends full records to OpenAI. Our design sends only minimal derived context, which is stricter and should stay that way. ^[inferred] → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]
- **The claim template (p. 40) is our evaluation sentence**, e.g. "How accurately does Fitbit Air RMSSD estimate overnight HRV for students during sleep, against reference R, at coverage C?" ^[inferred]

## Likely quiz material

- What an accelerometer measures (acceleration including gravity, not speed or position), what a gyroscope measures, and what "six-axis" means.
- Computing the magnitude, and why it reduces orientation dependence but keeps gravity.
- The four steps of a rule-based step counter; prominence vs spacing; working through the 6 → 4 peak example.
- False positive (bus vibration) vs false negative (pushing a cart); why periodicity ≠ walking.
- PPG vs ECG: optical blood-volume vs electrical activity; pulse rate = 60 / mean IBI.
- Why motion at the same frequency as the pulse defeats frequency filtering.
- Definitions of NN interval, SDNN, RMSSD, pNN50 and LF/HF, and computing each from a short IBI list.
- N1/N2 = Light (Core), N3 = Deep; TIB, latency, WASO, TST, sleep efficiency (420/480 = 87.5%).
- What PSG records (EEG, EOG, EMG, breathing, SpO₂) and why it's ground truth.
- Downsampling vs upsampling; interpolated points are not observations; empty bins stay missing.
- Coverage = usable / expected windows; accuracy and coverage are separate.
- The "device X, metric Y, population Z, context A, reference R, coverage C" sentence.
- The OAuth roles (client ID, callback, scopes, code, access token, refresh token); registration ≠ consent.
- The DataPoint envelope: `dataSource` plus one typed payload. Empty response = no observations.

## See it working: WearLab

Our own [[32-wearlab/32-wearlab|WearLab]] app simulates this week's pipelines end to end, with tested code you can break and fix: optical HR in [[32-wearlab/heart-signal-pipelines|Heart-signal pipelines]], and steps and sleep in [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]]. Where WearLab and the slides disagree, the WearLab pages say so. ^[inferred]

## Sources

- `binf4070-2026/week-03/slides-03.pdf`: pipeline p. 5; IMU pp. 7–9; step counter pp. 10–17; PPG/HR pp. 19–21; HRV pp. 22–23; sleep pp. 25–29; time and quality pp. 33–41; API/OAuth pp. 43–48; lab pp. 50–53. Slides 19–21, 28, 37 and 38 were also viewed as images for figure content.
- `binf4070-2026/week-03/lab-03.ipynb`: cells 2–6 (setup, synthetic generators, API client), 7–21 (Parts 1–2), 22–31 (Part 3), 32–52 (Part 4), 53 (troubleshooting).
- `binf4070-2026/week-03/data/{steps,heart-rate,sleep}.json`: schema and sampling inspected programmatically. No values copied beyond the summaries above.
- `personal-health-agent.github.io/src/content/weeks/03-sensors-signals.md`: date, objective, readings.
- Hub: [[30-course/30-course|Course hub]] · previous [[30-course/weeks/week-02-clinical-records-and-fhir|Week 02]] · next [[30-course/weeks/week-04-team-formation-and-project-scoping|Week 04]] · related [[30-course/weeks/week-07-time-series-multimodal-features|Week 07 (time series)]]
