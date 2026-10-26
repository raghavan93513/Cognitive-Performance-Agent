---
title: Wearable Measurement Error
category: 21-concepts
tags: [concept, wearables, data-quality, evaluation]
aliases: [wearable accuracy, sensor error, coverage, missingness, wearable bias]
relationships:
  - target: "[[21-concepts/photoplethysmography]]"
    type: related_to
  - target: "[[05-data/data-pipeline]]"
    type: related_to
  - target: "[[15-research/evaluation-plan]]"
    type: related_to
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: derived_from
sources: ["binf4070-2026/week-03/slides-03.pdf", "binf4070-2026/week-03/lab-03.ipynb"]
summary: Why wearable steps, HR, HRV and sleep are estimates. Covers motion, device, fit, skin tone, missingness, source overlap and time handling, plus how the course says to evaluate a claim.
provenance:
  extracted: 0.75
  inferred: 0.2
  ambiguous: 0.05
base_confidence: 0.64
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Wearable Measurement Error

The core message of [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]]: **the numbers on a wearable dashboard are estimates, not ground truth** (course objective). Each one is the output of a pipeline, and "every arrow encodes a choice that can change the result" (slides p. 5).

## Ground truth vs device estimate

| Metric | Device estimate from | Reference ("ground truth") taught |
|---|---|---|
| Steps | Wrist accelerometer plus a rule or learned counter (pp. 10–17) | Observed steps / labelled walking periods (p. 16) |
| Heart rate | Wrist PPG pulse timing (pp. 19–20) | ECG (p. 37, Bent et al. ECG-HR) |
| HRV | PPG inter-beat intervals (p. 22) | ECG R-R / NN intervals (p. 22) |
| Sleep stages | Motion + PPG (± SpO₂, skin temperature) models (p. 28) | Polysomnography: EEG, EOG, chin EMG (p. 27) |

## Sources of error, as taught

### 1. Motion

- **PPG:** wrist motion changes contact and the optical path. A motion rhythm at the pulse frequency **cannot be removed by frequency filtering** (p. 21). See [[21-concepts/photoplethysmography|PPG]].
- **Activity increased HR error on average** across devices (p. 37). In the plotted Bent et al. data, consumer-device MAE against ECG is roughly 5–10 bpm at rest and higher during activity, with large between-device differences. ^[ambiguous] These figures are approximate readings off the slide's chart.
- An **exercise claim needs evaluation during exercise** (p. 37).

### 2. Step-count false positives and false negatives

- **False negative:** pushing a cart reduces wrist motion, so real steps are missed (p. 14).
- **False positive:** vibration on a bus is counted as steps (p. 14).
- "Periodicity alone does not establish walking." Stricter thresholds trade false positives for misses, especially when gait or wrist placement changes (pp. 12–14).
- Learned counters fail when transferred to new people, gaits or placements unless retested (p. 17).

### 3. Device, hardware and algorithm

- Error **varied across devices** (p. 37). "Fit, placement, perfusion, hardware, and algorithms can matter."
- The algorithm is a hidden variable. Filters, windows, thresholds and model versions all change the output, so they belong in provenance (pp. 36, 41).

### 4. Skin tone and population

- Slide p. 37 reproduces Bent et al. Figure 2, which plots **error by device, Fitzpatrick skin tone (I–VI) and activity**. The slide's bullets attribute error to device and activity. They make no explicit skin-tone claim. ^[ambiguous]
- Rule taught: **evaluate a specific metric, device, population and context.** "Evidence about clinical pulse oximetry cannot be transferred automatically to consumer wrist pulse rate" (p. 37). This is the link to the [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding et al. 2020]] reading on racial bias in pulse oximetry: bias found in one optical measurement must be tested, not assumed, in another, and vice versa. ^[inferred]
- Subgroup performance is one of the failures you must measure (p. 40).

### 5. Missingness and coverage

- **Coverage = usable windows / expected windows**, e.g. 48/60 = 80% (p. 38).
- Missingness is **device- and activity-specific** (p. 38, Bent et al. Figure 3).
- Accuracy is computed only on values that exist, so **good accuracy can coexist with poor coverage** (p. 38).
- Lab rules (lab-03):
  - an empty API response = **no observations, not a measured zero**
  - missing intervals are not zeros
  - downsampled bins with no support stay missing (p. 34)
  - interpolated points "are not new observations" (p. 35)

### 6. Time handling

- Irregular gaps (e.g. 70 ms at a nominal 50 Hz) can mean dropped samples, clock jitter, buffering or a pause. They break fixed-rate filters (p. 33).
- Lab rules:
  - Sort and compute durations on physical UTC time, and display with each record's own `utcOffset`.
  - If the offset is missing, local time cannot be established.
  - Overnight sleep spans two dates, and a clock change can repeat an hour.

### 7. Source overlap and aggregation

- Multiple applications can write **overlapping step records**. **Summing sources double-counts.** Pick one `application.packageName` and exclude unattributed points. The result is a "raw per-source sum, not an official reconciled daily total" (lab Part 1.2).

### 8. Sampling and summary artefacts

- HR via the API is a **point sample** (every 10 min in the class sample, every 5 min in the public homework file). It is not a window mean, and a connecting line says nothing about what happened between samples (lab Part 2.2).
- Smoothing (a trailing mean) hides short changes. Students must justify the window and the minimum sample count (lab Part 4.3).
- **Sleep summary totals cannot reconstruct the stage chronology** (lab Part 4.4). PPG-based stages are rough: κ ≈ 0.53–0.71 against PSG (p. 28). Consumer "Light" merges N1 and N2 (p. 25).

### 9. Interpretation errors

- A daily join of EHR, sensor and self-report records aligns them by date, but **doesn't make them simultaneous or causal** (p. 39).
- Digital-phenotype changes (fewer steps, later sleep, changed resting HR) have several possible causes. "The pattern alone is not a diagnosis" (p. 29).
- LLM summaries must be checked claim by claim against evidence fields, and must not infer cause, activity or health status (lab Part 3).

## How to evaluate a wearable claim (course method)

1. Write the claim precisely: **"How accurately and consistently does device X estimate metric Y for population Z during context A, compared with reference R, at coverage C?"** (p. 40)
2. Measure the failures that matter: misses, false detections, absolute error, coverage and subgroup performance (p. 40).
3. Follow the five steps (p. 41):
   1. Inspect records (keep source, time, units, grain).
   2. Specify processing.
   3. Check usable coverage.
   4. Evaluate against an appropriate reference.
   5. Report with uncertainty visible.

## Implications for the Cognitive Performance Agent

- **Store quality context with every value.** Keep `dataSource` (package, device, recordingMethod), `motionContext`, per-window sample count and coverage. Our canonical schema has `source` and `quality_status`, but nothing for motion context or window coverage counts yet. ^[inferred] → [[05-data/data-pipeline|Data pipeline]]
- **Add a step-source selection rule.** Dedup by provider ID does not prevent cross-application double counting. ^[inferred]
- **Keep "unavailable", "zero" and "normal" distinct.** This is already a pipeline rule, now with course-backed failure cases. ^[inferred]
- **Don't treat walk-time HR as evidence that a break worked.** Use task-performance labels, which our design already makes primary. ^[inferred] → [[15-research/evaluation-plan|Evaluation plan]]
- **Write our own claim sentence(s) using the p. 40 template** in the evaluation plan, including the subgroup (skin tone, wrist placement) and coverage parts. ^[inferred]
- **Tell the user the data's age and coverage** in the interface ("based on 2 HR readings in the last 15 min, synced 20 min ago"). ^[inferred] → [[08-frontend/student-interface-and-feedback|Student interface]]

## Sources

- `binf4070-2026/week-03/slides-03.pdf`: pp. 5, 10–17, 19–23, 25–29, 33–41 (pp. 21, 28 and 37–38 viewed as images).
- `binf4070-2026/week-03/lab-03.ipynb`: Parts 1.2, 2.2, 3, 4.2–4.4, troubleshooting table.
- Course readings: [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent et al. 2020]] · [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding et al. 2020]].
