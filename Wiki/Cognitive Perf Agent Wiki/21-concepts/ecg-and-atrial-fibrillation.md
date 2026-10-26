---
title: ECG and Atrial Fibrillation
category: 21-concepts
tags: [concept, physiology, wearables]
aliases: [ECG, EKG, electrocardiogram, AFib, atrial fibrillation, single-lead ECG, ECG app]
relationships:
  - target: "[[21-concepts/photoplethysmography]]"
    type: related_to
  - target: "[[21-concepts/heart-rate-variability]]"
    type: related_to
  - target: "[[32-wearlab/heart-signal-pipelines]]"
    type: related_to
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: related_to
sources: ["wearlab/src/lab/ecg-model.ts", "wearlab/src/lab/labs/ecg.tsx", "wearlab/scripts/test-ecg.ts", "wearlab/src/data/library/content-sense.ts", "wearlab/src/data/library/content-convert-think.ts", "wearlab/src/data/topics.ts", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app"]
summary: What a watch ECG measures, how a 30 s single-lead recording becomes an AFib/sinus verdict (WearLab's Apple-style model), and why our agent must never claim ECG-level evidence.
provenance:
  extracted: 0.7
  inferred: 0.25
  ambiguous: 0.05
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# ECG and Atrial Fibrillation

An **electrocardiogram (ECG)** records the heart's *electrical* activity. Every beat starts as an electrical wave, which shows up at the skin as about **1 mV**. A wearable ECG is **single-lead**: one electrode on the back touches one wrist and a finger of the other hand touches the crown or a side contact. That closes a loop across the chest, giving a view "similar to Lead I" on a hospital ECG. A hospital ECG uses 10 electrodes for 12 views (from the `crown-electrode` and `ecg-electrode` library entries).

It is fundamentally different from [[21-concepts/photoplethysmography|PPG]], which sees *blood volume* at the wrist. Course Week 3 makes the same point: PPG gives peripheral pulse timing, while "ECG events and diagnoses require different evidence" (pp. 19–20).

## Hardware

- **Electrodes:** a metal or conductive back plate plus a crown or finger electrode, kept electrically separate. WHOOP MG puts them in the clasp. Garmin and Apple use the crown or bezel. See [[32-wearlab/brand-histories|Brand histories]].
- **ECG AFE:** an instrumentation amplifier that boosts only the *difference* between the electrodes, with common-mode rejection (typically 80–110 dB) to cancel 50/60 Hz mains hum. It adds filters for drift and muscle noise, an ADC (typically 125–1,000 samples/s), and often hardware R-wave detection and lead-off detection (`ecg-afe` library entry).

## From recording to verdict (WearLab's Apple-style model)

WearLab's ECG lab copies what Apple publishes (a **30 s** recording and ECG app 2.0's categories and heart-rate bands). It fills the rest with an open stand-in based on the **ESC 2020 definition of AFib**: a strip of at least 30 s with irregular R-R intervals and no discernible repeating P waves. Full parameters are on [[32-wearlab/heart-signal-pipelines|Heart signal pipelines]] §5.

1. **Record** 30 s at **512 Hz**. That rate is a researchers' figure; Apple doesn't publish it.
2. **Clean** with a high-pass (subtract a moving average about 0.6 s wide, for baseline drift from breathing or a raised arm) and a low-pass (an average over about 16 ms, for muscle fizz).
3. **Find beats:** peaks above a share of the tallest spike, at least 250 ms apart. If the threshold is too low, T waves get counted as beats.
4. **Judge the rhythm** with two questions:
   - Are the R-R gaps irregular? Mean |ΔRR| ÷ mean RR > 0.12.
   - Is there a P wave? Averaged 140–260 ms before R, at least 5% of the R height.
   - AFib means irregular *and* no P wave.
5. **Verdict** (ECG app 2.0 categories):

| Condition | Verdict |
|---|---|
| Fewer than 8 beats, or too noisy | Poor recording |
| Under 50 bpm | Low heart rate (rhythm not checked) |
| Over 150 bpm | Heart rate over 150 (rhythm not checked) |
| Irregular, no P wave, under 100 bpm | Atrial fibrillation |
| Irregular, no P wave, 100–150 bpm | AFib – high heart rate |
| Regular with P wave, under 100 bpm | Sinus rhythm |
| Regular with P wave, 100–150 bpm | High heart rate – no AFib |
| Anything else (for example, extra beats) | Inconclusive |

WearLab's lab text says ECG app 2.0 "learned to check" the 100–150 bpm band in 2020. It quotes Apple's 2020 study (FDA 510(k) K201525): among classifiable recordings, AFib was caught **98.5%** of the time and sinus rhythm was called correctly **99.3%** of the time. The tests (`scripts/test-ecg.ts`, 44 checks) confirm a moving arm without filters always gives "Poor recording", and that an athlete's healthy 44 bpm reads "Low heart rate", not a problem.

## Atrial fibrillation in one paragraph

In AFib the upper chambers quiver instead of contracting. There are **no P waves**, and beats arrive at **random gaps** ("irregularly irregular"). WearLab's model draws every AFib gap independently between 0.4 and 0.9 s and adds 4.7 and 6.3 Hz fibrillation ripple. Its lab caption: "Worth talking to a doctor." Extra early beats (ectopics) are irregular but keep P waves, so they read **Inconclusive**, not AFib.

## Where sources differ

- The **course** covers ECG only as the *reference* for HR and HRV (NN intervals between R peaks, p. 22), not as a wearable feature. WearLab adds the consumer 30 s spot-check and the AFib classifier. They don't conflict. See [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]].
- ^[ambiguous] WearLab's thresholds (irregularity 0.12, P ≥ 0.05, noise 0.8) are its own teaching choices. Apple's real classifier is unpublished, so these numbers shouldn't be quoted as Apple's.

## What this means for the Cognitive Performance Agent

^[inferred]
- **We have no ECG data and won't ask for it.** Our watch inputs are PPG-derived HR, overnight HRV and sleep ([[05-data/data-sources|Data sources]]). ECG recordings are user-initiated, 30 s, and regulated (FDA-cleared). That puts them outside a wellness agent.
- **Guardrail:** the LLM agents must never describe HR or HRV as "ECG", "rhythm", "arrhythmia" or "AFib", and must never interpret irregular HR samples as a heart condition. This strengthens the existing rule on [[21-concepts/photoplethysmography|PPG]]. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]], [[10-trust-safety/privacy-and-consent|Privacy and consent]]
- **Reusable pattern:** the verdict ladder checks *signal quality first* ("Poor recording" or "Inconclusive" before any physiological claim). Our Signal agent should do the same: refuse to judge a window with too few or too noisy samples before the Evidence agent reasons about it. WearLab's `classify()` in `ecg-model.ts` is a compact model for that ordering.
- ECG is the gold standard for **HRV timing**. Watch-PPG RMSSD is a noisier proxy for it, which is one more reason to use HRV only as baseline-relative daily context. See [[21-concepts/heart-rate-variability|HRV]].

## Sources

- `wearlab/src/lab/ecg-model.ts`: constants, rhythms, filters, detector, reading, classifier and the `ECG_SOURCES` list (FDA DEN180044, FDA K201525, Apple Dec 2020 white paper, Apple support page).
- `wearlab/src/lab/labs/ecg.tsx`: stage text, verdict meanings, the 98.5% / 99.3% quote.
- `wearlab/scripts/test-ecg.ts`: run read-only, 44 passed, 0 failed.
- `wearlab/src/data/library/content-sense.ts` (`ecg-electrode`, `crown-electrode`), `content-convert-think.ts` (`ecg-afe`), `wearlab/src/data/topics.ts` (`ecg`), `wearlab/docs/PLAN.md` (Apple and Garmin ECG timeline; an ECG journey listed as a next idea).
- Live: https://wearlab-learn.vercel.app (`/how/ecg`).
