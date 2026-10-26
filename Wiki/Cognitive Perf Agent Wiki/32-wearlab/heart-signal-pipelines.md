---
title: "WearLab: Heart Signal Pipelines (PPG, HRV, SpO₂, ECG)"
category: 32-wearlab
tags: [wearlab, physiology, wearables, signal-processing]
aliases: [Photon Journey, WearLab heart rate pipeline, WearLab HRV lab, WearLab SpO2 lab, WearLab ECG lab]
relationships:
  - target: "[[32-wearlab/32-wearlab]]"
    type: related_to
  - target: "[[21-concepts/photoplethysmography]]"
    type: implements
  - target: "[[21-concepts/heart-rate-variability]]"
    type: implements
  - target: "[[21-concepts/blood-oxygen-spo2]]"
    type: implements
  - target: "[[21-concepts/ecg-and-atrial-fibrillation]]"
    type: implements
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: related_to
sources: ["wearlab/docs/PLAN.md", "wearlab/README.md", "wearlab/src/journey/ppg.ts", "wearlab/src/journey/tissue.ts", "wearlab/src/journey/chapters.ts", "wearlab/scripts/test-journey.ts", "wearlab/src/lab/labs/heart.tsx", "wearlab/src/lab/labs/hrv.tsx", "wearlab/src/lab/labs/spo2.tsx", "wearlab/src/lab/labs/ecg.tsx", "wearlab/src/lab/ecg-model.ts", "wearlab/scripts/test-ecg.ts", "wearlab/src/data/library/content-sense.ts", "wearlab/src/data/library/content-convert-think.ts", "wearlab/src/data/topics.ts", "https://wearlab-learn.vercel.app"]
summary: Stage-by-stage parameters of WearLab's light-and-heart code (Photon Journey PPG sim, heart/HRV/SpO₂/ECG labs), what its tests guarantee, and what we should copy for HR quality.
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

# WearLab: Heart Signal Pipelines

Everything in [[32-wearlab/32-wearlab|WearLab]] that turns light or electricity into a heart number. There are five pieces of code:

1. **Photon Journey** (`/journey`). A 13-chapter cinematic driven by one deterministic simulation, `src/journey/ppg.ts`, plus a Monte-Carlo photon tracer, `src/journey/tissue.ts`.
2. **Heart rate lab** (`src/lab/labs/heart.tsx`, topic `/how/heart`). A second, *spectral* HR pipeline built around walking and running.
3. **HRV lab** (`src/lab/labs/hrv.tsx`). Beats, then gaps, then successive differences, then RMSSD.
4. **SpO₂ lab** (`src/lab/labs/spo2.tsx`). Red and infrared light, the ratio of ratios, and a calibration line.
5. **ECG lab** (`src/lab/labs/ecg.tsx` + `src/lab/ecg-model.ts`). An Apple-style 30 s single-lead recording and AFib check.

The concept background is on [[21-concepts/photoplethysmography|PPG]], [[21-concepts/heart-rate-variability|HRV]], [[21-concepts/blood-oxygen-spo2|Blood oxygen (SpO₂)]] and [[21-concepts/ecg-and-atrial-fibrillation|ECG and AFib]]. Physical parts (LEDs, photodiodes, AFE, electrodes) are on [[32-wearlab/teardowns-and-parts|Teardowns and parts]].

I ran the two headless test scripts read-only (`node --experimental-strip-types`). `test-journey.ts` passed all checks and `test-ecg.ts` reported "44 passed, 0 failed". The "probe" numbers below come from small scratch scripts that import WearLab's code without changing it. They are my measurements, not claims WearLab makes. ^[inferred]

---

## 1. Photon Journey: the PPG pipeline (`ppg.ts`)

`PpgSim` is the whole heart-rate chain in one class: heart → blood volume → returned light → photodiode current → AFE (LED-on minus LED-off, ADC) → band-pass → NLMS motion cancel → peak detection → intervals → bpm. **The displayed bpm is measured from the simulated light, never copied from the "true" heart** (file header and PLAN §4.1). It is seeded (`mulberry32`) and therefore repeatable. It has no DOM or three.js dependency.

### Stage by stage

| # | Stage | What the code does | Real parameters |
|---|---|---|---|
| 0 | Sampling | One `step()` per sample | **`FS = 25` samples/s**. The chapter text says real watches use about 25–100 |
| 1 | Heart | Rate eases toward the target. Each beat's interval gets a breathing wobble plus noise | Easing time constant 4 s. Interval × (1 + 0.03·sin(2πt/4.2 s) + 0.008·Gaussian) |
| 2 | Pulse shape | Fast systolic rise, slower fall, and a reflected wave | Gaussian systole at phase 0.17, reflected wave at 0.47 (amplitude 0.32) |
| 3 | Optics | More blood means less light back: `led = DC·breathing·(1 − perfusion·bv) + motion artefact` | **Perfusion (AC/DC): green 2%, red 0.6%, IR 0.9%**. Return per mA of LED at the lightest tone: green 0.55, red 0.9, IR 1.0 µA/mA, scaled by the melanin pass from `tissue.ts` |
| 4 | LED auto-gain (AGC) | Brightens the LED when less light returns (darker skin, other colour). A hard reset (LED colour, skin tone or ambient-cancel change) re-runs a one-shot calibration; otherwise the drive tracks slowly | **Target 8 µA photocurrent, LED 1–40 mA**, tracking time constant 0.8 s |
| 5 | Ambient light | Sunlight through moving shade | About 28 µA of ambient. Shade flips every 0.25–0.9 s |
| 6 | ADC | Quantised reading with the LED on and with it off | **16-bit, 50 µA full scale**. Noise 0.006 + 0.002·√ambient µA |
| 7 | AFE ambient cancel | `x = on − off` when enabled, otherwise `on` | Toggle `ambientCancel` |
| 8 | Band-pass | Two RBJ biquads (high-pass, then low-pass), primed on start-up. Output flipped so beats point up | **0.5–4 Hz = 30–240 bpm** |
| 9 | Motion cancel | NLMS adaptive filter on the band-passed accelerometer. **It only learns while the wrist is really moving** (reference power > taps × 0.01, about 0.1 g rms) | **`NLMS = { taps: 16, mu: 0.2, eps: 0.05 }`** |
| 10 | Peak detection | Local maximum above an adaptive threshold, outside the refractory window, with parabolic sub-sample interpolation. **After a reset it listens for 1 s before counting** | Threshold = 0.4 × envelope (the envelope decays with a 2 s time constant). **Refractory = 0.55 × median gap, clamped to 0.28–0.6 s** (0.3 s before a median exists) |
| 11 | Interval gate | Gaps outside the range are dropped. The buffer keeps the last 12 | Accepted gap 0.28–2.0 s |
| 12 | bpm | 60 ÷ median of the last 5 gaps (needs at least 3), then smoothed | Exponential smoothing **α = 0.35** toward the new value |
| 13 | Quality flag | `quality()`: **`lost`** if no peak for more than 3 s or fewer than 3 gaps. Otherwise uses the coefficient of variation (CV) of the last 5 gaps | **CV < 0.10 good, < 0.20 fair, else poor** |
| 14 | "--" while re-measuring | Any settings change (soft reset) clears the gaps and sets `bpm = null`, which the face shows as "--". bpm also goes null when no peak has arrived for more than 3 s (once more than 3 s have passed since the reset) | PLAN §4.1: "as real watches do" |

Motion model: arm swing at **1.42 Hz** (±2% wobble), which is about **85 bpm**. The accelerometer sees the fundamental plus a 2nd harmonic. The optical artefact is "the same motion, shifted and scaled", dominated by the 2nd harmonic at about 2.84 Hz (about 170 bpm). That is why the uncancelled reading locks near 166 bpm in the tests.

### The tissue Monte-Carlo model (`tissue.ts`)

- **Wrist slice:** a superellipse (flat on top), with layers epidermis 0–0.22 mm (drawn about 2× real), dermis 0.22–2.1 mm, fat 2.1–5.5 mm, then muscle and tendons. Radius, ulna, tendons, and radial and ulnar arteries sit on the palm side. The watch sits on the back of the wrist, so **no big artery is under the sensor**.
- **Vessels under the sensor:** 27 capillaries (about 0.44 mm deep), 11 arterioles (about 1.72 mm), 10 venules, 2 veins. They swell with the pulse by a fraction of their radius: capillary 0.22, arteriole 0.34, venule 0.03, vein 0. The code says this is exaggerated so it can be seen.
- **Photon walk (2-D):** Lambertian emission bent by the lens. 6% Fresnel reflection off the glass, caught by the light barrier. Melanin absorption on the way in and again on the way out. Exponential step lengths (mean free path green 0.45, red 0.55, IR 0.6 mm). Absorption by blood vessels and background tissue. Photons exit to a photodiode (at ±4.9 mm, ±1.1 mm wide) or escape.
- **Optics per colour** (`OPTICS`): green 530 nm, red 660 nm, IR 880 nm. Melanin absorption per tone (Light / Medium / Brown / Deep): green 0.03 / 0.13 / 0.29 / 0.45, red 0.015 / 0.05 / 0.12 / 0.20, IR 0.01 / 0.03 / 0.07 / 0.12. The code states the numbers are "tuned for a readable 2-D picture, but their ORDER follows real tissue optics." `ppg.ts` reads its melanin numbers from here, so the 3D picture and the signal agree.
- **Observed run** (from the test's printout): green returns 1.7% of photons, 42.1% are eaten by blood, and returned photons reached a mean max depth of 1.46 mm. Red: 6.6% / 11.9% / 2.06 mm. IR: 5.6% / 19.3% / 2.13 mm. Green on tones 0→3 returns 2.2 → 1.7 → 1.1 → 0.7%.
- ^[ambiguous] In the photon tracer, IR returns slightly *less* than red (5.6% vs 6.6%), but the signal model's `RETURN` table has IR > red (1.0 vs 0.9). The test only checks that both beat green, so the two models don't fully agree on that ordering. The tracer's "pulse strength" (green AC/DC 21.3%) is also far larger than the signal model's 2% perfusion, because the vessel swelling is exaggerated for the visuals.

### What `scripts/test-journey.ts` guarantees

| Scenario | Pass condition | Observed (my run) |
|---|---|---|
| Clean signal, HR 42–190 bpm (10 rates × seeds 1, 7, 42) | Mean error < max(2 bpm, 2% of HR) and never "--" over 20 s, after 20 s of warm-up | Mean error 0.12–1.53 bpm, all "good" |
| Every LED colour × 4 skin tones, still and indoors | Mean error < 2.5 bpm, no "--". LED current never falls as skin gets darker | Error 0.36–0.44. Green LED 15.5 → 19.2 → 28.9 → **40.0 mA** |
| Green on the deepest tone | Hits the 40 mA limit, and DC falls below target (3–8 µA) | 40.0 mA, 6.62 µA vs the 8 µA target. **It still reads correctly** |
| Sunlight, ambient cancel ON | Error < 2.5 | 0.44 |
| Sunlight, ambient cancel OFF | Must go wrong (error > 8, or more than 5 s of "--", or poor) | Watch 51.0 vs heart 71.5 (error 23.65). Quality shows *fair*. Raw signal > 20 µA vs about 8 µA of LED light |
| Running, motion cancel OFF | Error > 15 (locks onto arm rhythm) | Reads 166.1 vs 71.5 (error 99) and **quality says "good"** |
| Running, motion cancel ON, after 30 s learning | Error < 3 at 72 bpm. Error < 3.5 at 60/100/120/140/160 | 0.27–1.86 |
| HR change 60→140→55 | Within 3 bpm after 30 s | Passed |
| Every "fix" (motion cancel on, ambient cancel on, LED colour, skin tone, 72→150 bpm) | Settles within 3 bpm and stays there 5 s, in ≤ 6 s | 0.5–5.5 s |
| Determinism | Same seed gives the same reading | Passed |
| Photon ordering | Blood eats more green. Red and IR return from deeper and more of them come back. A heartbeat returns less light. Pulse stronger in green. Darker skin returns less green | All passed |

**The documented ~85 bpm blind spot.** The test explicitly skips HR ≈ 85 with motion: "Near 85 bpm the heart beats in step with the arm swing, 1.42 Hz. That is a real blind spot of motion cancelling and the Journey says so." The *motion* chapter tells users: "if your heart beats in step with your arm swing, the two look the same."

Probe of the blind spot (motion + cancel on, 30 s learning, 20 s measured, seeds 1 and 7): ^[inferred]
- HR 70–75: error ≤ 0.55 bpm.
- HR 80: error 7–11 bpm.
- HR 83–90: error 16–36 bpm, with displayed values between 92 and 146.
- HR 95: error 0.7–3.5 bpm.
- In the 80–90 band, quality was "good" in 0–8 of the 20 s and "poor" in 4–11. **The reading never blanked to "--".**

So the blind band is roughly ±5 bpm around the arm-swing rate. The quality flag only partly warns, and it never suppresses the number.

### Photon Journey chapters (`chapters.ts`)

Nine "stops": LED, Window, Skin, Blood, Photodiode, AFE chip, Accelerometer, Processor, Screen. The 13 chapters are listed below. The "try" controls are in brackets.

1. **hook**: "Your watch says {bpm}. How does it know?"
2. **underside**: turn it over. Green LEDs in the middle, a ring of photodiodes and a light barrier. Red/IR are for SpO₂, plus an ECG ring electrode.
3. **flash**: an LED emits about 530 nm photons. The sim takes 25 readings/s *(fire)*.
4. **cut**: slice the wrist. The watch reads only the top couple of millimetres of tiny vessels.
5. **window**: lens and back crystal. The barrier catches light reflected off the glass.
6. **scatter**: "Lost in the fog". Banana-shaped paths. Darker skin makes the LEDs turn up *(LED colour, skin tone)*.
7. **pulse**: "The squeeze". About a 2% dip per beat. DC vs AC, perfusion index *(heart rate)*.
8. **catch**: the photodiode turns light into microamps.
9. **afe**: "Clean it up". The ADC samples 25 times a second, and the LED-off reading is subtracted *(sunlight)*.
10. **motion**: "Hold still! (You won't)". An LMS adaptive filter that needs a few seconds to learn, and its blind spot *(running)*.
11. **beats**: peaks, then gaps, then the median of the last few gaps. The text notes real watches add frequency analysis and ML and update about once a second *(heart rate)*.
12. **screen**: the number becomes OLED light again.
13. **finale**: "You followed one heartbeat".

Chapters reset the controls to a known state when they open (for example, sunlight off before the motion lesson). Photon counters restart per chapter and on each LED or skin-tone change (PLAN §4.3).

---

## 2. Heart rate lab: a spectral pipeline (`heart.tsx`)

This is a different algorithm from the Journey's. It works on an 8 s window instead of beat-by-beat peaks. It is the one that directly models **walking**.

- **Input:** 8 s of green PPG plus accelerometer at **25 Hz**. Scenarios: still at 64 bpm; **walk at 96 bpm with cadence 112 steps/min**; run at 142 bpm with cadence 168. Arm swing = cadence ÷ 2.
- **Strap fit:** *snug* or *loose*. Loose means less skin light plus leaking room light, a pulse ripple of 2.6 instead of 9 (so **0.52% vs 2.05%** of DC), 2.6× more motion artefact, and a coupling that keeps changing (a 0.21 Hz wobble).
- **Stages:**
  1. Raw light. The heartbeat is about 2% of the steady level.
  2. Zero-phase **0.5–4 Hz** band-pass (forward and backward, mirrored ends).
  3. Accelerometer, band-passed the same way.
  4. **Motion cancellation:** a least-squares FIR fit (8 taps, spaced 2 samples apart, ridge 1e-3), fitted once per clip. The lab says a watch adapts continuously (for example with LMS).
  5. **Hann-windowed spectrum from 30 to 240 bpm. Pick the tallest peak.** "Right" means within 5 bpm of truth. "Cadence lock" means within 4 bpm of step rate.
- **Goal:** "Get the real pulse while running". Done only with *run + correction on + snug*.
- **Probe of every combination** ^[inferred]:

| Movement | Fit | Correction | Reads | Truth |
|---|---|---|---|---|
| Still | snug or loose | either | 64 | 64 |
| Walk | snug | off | **112 (= step cadence)** | 96 |
| Walk | snug | on | 96 | 96 |
| Walk | loose | off | 112 | 96 |
| Walk | loose | on | **124** | 96 |
| Run | snug | off | 168 (= cadence) | 142 |
| Run | snug | on | 142 | 142 |
| Run | loose | on | 155 | 142 |

The lab's own captions: "Arm swing at {cadence} steps a minute is also inside 0.5–4 Hz, so it slips straight through this filter." It also says real watches "track your heart rate over time and distrust sudden jumps."

---

## 3. HRV lab (`hrv.tsx`)

- **Signal:** 30 s of **ECG-style** beats at 250 Hz. Each RR interval = mean + breathing (respiratory sinus arrhythmia, RSA) + jitter. The lab notes that "many watches use the light sensor's pulse instead, which has blurrier beat timing."
- **States** (HR / RSA ms at 15 breaths/min / RSA at 6 breaths/min / jitter ms): relaxed 58 / 52 / 140 / 30; normal 70 / 30 / 118 / 18; stressed 88 / 16 / 68 / 16; workout 100 / 8 / 38 / 11. The *slow breathing* toggle switches from 0.25 Hz (15/min) to 0.1 Hz (6/min).
- **Beat detection:** samples above 0.5, at least 0.25 s apart, with parabolic sub-sample refinement.
- **RR intervals** = successive beat times × 1000 ms. **Successive differences** ΔRR. **RMSSD = √(mean ΔRR²)**. HR = 60000 ÷ mean RR.
- **Verdict bands:** ≥ 50 ms "high … relaxed and well recovered"; 30–50 "ordinary"; < 30 "low". The page adds: "Typical resting RMSSD: relaxed 50–80 ms, stressed 15–25 ms", "compare it with your own usual baseline", and "real watches measure for at least a minute, often over several minutes of sleep."
- **Goal:** "Get a relaxed, high HRV (above 50 ms)".
- **Probe output** ^[inferred] (RMSSD normal breathing → slow breathing): relaxed 57.7 → 67.1, normal 36.6 → 46.8, stressed 18.8 → 24.3, workout 11.7 → 14.5. The detector found every beat, so measured RMSSD matched the true RMSSD within 0.3 ms.

**What breaks it.** The lab itself has no artefact switch, because it uses a clean ECG trace. Its fragilities are:
- **Breathing rate.** Slow breathing alone raised RMSSD by about 3–10 ms in the same state. That is a confounder for anyone comparing readings. ^[inferred]
- **Missed or extra beats.** A probe on the "normal" state (RMSSD 36.6 ms): dropping **one** beat gave **221 ms**, inserting one spurious beat gave 104 ms, and ±20 ms alternating timing jitter (a stand-in for blurry PPG peaks) gave 92 ms. ^[inferred] This is why the course pipeline has a "handle artifacts" step that the lab skips. WearLab's One Night band (`band.ts`) does it by keeping a gap only if it matches its neighbours. See [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]].
- **Short windows.** 30 s is used "to keep the charts readable".

Lab stages: (1) find every heartbeat, (2) time between beats (a tachogram with breathing bands), (3) beat-to-beat changes, (4) RMSSD as one number, (5) what your HRV means.

---

## 4. SpO₂ lab (`spo2.tsx`): ratio of ratios

- **Signal:** 6 s of red and IR PPG at 25 Hz, pulse at 70 bpm. Scenes: sea level **98%**, hike at about 3,000 m **90%**, very high above 5,000 m **84%**.
- **Physics stand-in:** IR perfusion `PI_IR = 0.008`, scaled by contact (0.35 + 0.65 × fit). The red ripple = R_true × IR ripple. DC: IR 1000, red 620 ("AC/DC takes care of that"). Noise grows with (1 − fit)².
- **Motion:** about the same 1.3 Hz and 2.1 Hz wobble added to both colours (IR × 1.05).
- **Pipeline:**
  1. Raw red and IR.
  2. DC = mean. AC = 2√2 × RMS of the zero-phase 0.5–4 Hz band-pass.
  3. **R = (AC_red / DC_red) ÷ (AC_IR / DC_IR).**
  4. **Calibration line SpO₂ ≈ 110 − 25 × R** (capped at 100). The lab calls it a "simplified textbook" line and says "real devices use their own curves, measured in the lab on real people."
  5. Quality check.
- **Quality rule:** the reading is trusted only if **not moving** (the accelerometer check) **and** the red/IR AC correlation is **≥ 0.9** (`MATCH_MIN`). Otherwise the lab says "The watch would not show it."
- **Goal:** "Show a low reading like at very high altitude (under 90%)", which needs a trusted reading.
- **Probe** ^[inferred]:
  - Still at sea level: fit ≥ 40% gives 97.3–98% with match ≥ 0.94. Fit 30% gives match 0.87, which is flagged. Fit 0% gives a 91.8% reading.
  - **Moving:** the reading lands at 85.6–89.2% *whatever the true value* (98, 90 or 84), because R is dragged toward about 0.83–0.98. **The red/IR match stays at 0.98–1.00 while moving.**
  - So the shape-similarity check cannot detect motion. Only the separate accelerometer gate catches it.

Stages: (1) red and IR pulses, (2) split ripple from steady, (3) ratio of ratios, (4) calibration curve, (5) reading and quality check. The lab closes with: watches "are wellness gadgets, not medical devices." There is no SpO₂ journey yet. PLAN "Next ideas" lists one ("red vs infrared ratio").

---

## 5. ECG lab (`ecg-model.ts` + `ecg.tsx`): Apple-style AFib check

The lab uses what Apple publishes as published: a **30 s single-lead recording (similar to lead I)** between the back crystal and the Digital Crown, plus **ECG app 2.0's result categories and heart-rate bands**. Apple doesn't publish its sampling rate or classifier. So **512 Hz** is "what researchers report", and detection plus the rhythm test are an "open stand-in" built on the **ESC 2020 definition of AFib** (a strip of at least 30 s with irregular R-R intervals and no discernible repeating P waves). Cited sources: FDA De Novo DEN180044, FDA 510(k) K201525 (ECG app 2.0), Apple's Dec 2020 arrhythmia white paper, and Apple's support page.

**Heart rate bands:** `LOW = 50`, `FAST = 100`, `HIGH = 150` bpm.

**Six hearts** (`RHYTHMS`): sinus at about 68; AFib at about 95 (independent random gaps of 0.4–0.9 s, no P waves, fibrillation ripple at 6.3 and 4.7 Hz); trained athlete at about 44; after a run at about 118; after a sprint at about 160; ectopic (an early beat every 7th, then a compensatory pause).

**User controls:** finger on the crown (without it, no closed circuit and only amplifier noise), arm resting vs held up (baseline wander 0.08 vs 0.55 mV, muscle noise 0.015 vs 0.2), high-pass, low-pass, and the threshold slider (10–90%).

**Pipeline:**

1. **Record:** P-Q-R-S-T Gaussians in mV, 512 × 30 samples.
2. **High-pass:** subtract a moving average about 0.6 s wide (removes baseline drift).
3. **Low-pass:** moving average over 8 samples (about 16 ms; removes muscle "fizz").
4. **Beat detection:** local peaks ≥ threshold × the tallest |y|, at least **250 ms** apart (the taller one is kept).
5. **Reading:**
   - RR intervals and bpm.
   - **Irregularity** = mean |ΔRR| ÷ mean RR. Above **0.12** counts as irregular.
   - **P-wave score:** average all beats aligned on R, then take the peak 260–140 ms before R as a share of the R height. **≥ 0.05** means a P wave is present.
   - **Noise:** second-difference roughness away from the QRS (±60 ms) × 40 ÷ mean R. Above **0.8** counts as too noisy.
6. **Classify** (the eight verdicts):
   - Fewer than 8 beats or noise > 0.8 → **Poor recording**
   - bpm < 50 → **Low heart rate**
   - bpm > 150 → **Heart rate over 150**
   - irregular and no P wave → **Atrial fibrillation** (or **AFib – high heart rate** at 100–150)
   - regular and P wave present → **Sinus rhythm** (or **High heart rate – no AFib** at 100–150)
   - anything else → **Inconclusive**

**Probe with a good setup** (still, both filters, threshold 0.5) ^[inferred]:
- Sinus: 68.1 bpm, irregularity 0.034, P 0.103.
- AFib: 97.3 bpm, irregularity 0.240, P 0.000.
- Athlete: 44.0 bpm, "Low heart rate".
- After a run: 118, "High heart rate – no AFib".
- Sprint: 160, "over 150".
- Ectopic: irregularity 0.228 with P 0.067, so **Inconclusive**.
- The default setup (arm up, no filters, threshold 0.3) reads **Poor recording** (noise 4.36). High-pass alone gives Poor recording. Low-pass alone or a still arm alone gives Inconclusive.

**`test-ecg.ts` guarantees** (44 checks):
- Every rhythm gets its true verdict from a clean recording and finds every beat (±1).
- A moving arm without filters is always "Poor recording", and with both filters it reads right.
- No finger means no reading.
- Sinus is 60–75 bpm with irregularity < 0.08 but > 0.01 (the breathing wobble).
- AFib irregularity is more than 3× sinus, with P < 0.02 vs > 0.08.
- Too low a threshold (0.15) counts T waves as beats and loses the sinus verdict.
- Goals ("clean sinus while moving", "catch AFib") are reachable but not met by the default.

The verdict card quotes Apple's 2020 study (K201525): among classifiable recordings, AFib was detected **98.5%** of the time and sinus was called correctly **99.3%** of the time.

Lab stages: (1) 30 s of electricity, (2) clean it, (3) find every beat, (4) is the rhythm regular?, (5) the verdict.

---

## Where WearLab agrees or disagrees with the course (BINF 4070 Week 3)

Course view: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]] and [[21-concepts/photoplethysmography|PPG]].

- **Agrees: PPG ≠ ECG.** WearLab keeps optical HR and electrical ECG as separate pipelines with separate parts. It says "An optical sensor sees blood; an ECG sees the electrical wave."
- **Agrees, and makes it concrete: motion at the pulse frequency defeats filtering.** Course slide p. 21 uses 1.5 Hz. WearLab's blind spot is at 1.42 Hz (85 bpm), and the heart lab shows cadence lock while walking. This is the same "signal crossover" that [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent et al. 2020]] describe.
- **Different estimator, same principle.** The course computes pulse rate as 60 / *mean* IBI. The Journey uses 60 / *median* of the last 5 gaps plus smoothing, and the heart lab uses a *spectral peak*. Both illustrate the course's "every step is a vendor choice" (p. 5). ^[inferred]
- **Skin tone.** The course slide is ambiguous. WearLab's model reads HR correctly on all four tones, because the AGC raises the LED (to the 40 mA cap on deep skin with green) at a cost in light and battery. That fits Bent's "no significant effect" finding, but it is a design assumption, not evidence. ^[inferred]
- **HRV.** WearLab computes RMSSD exactly as the course defines it, on an ECG-style trace (the course's reference). It *omits* the course's "handle artifacts" step in the HRV lab.

## What this means for the Cognitive Performance Agent

^[inferred] This whole section is our application.

- **HR quality behaviour worth copying:**
  - Show **"--" / "not enough signal"** rather than a stale or imputed number. WearLab blanks bpm after a context change and after 3 s without a beat, and needs at least 3 intervals before it shows anything.
  - Grade **good / fair / poor** from interval consistency (CV < 0.10 / < 0.20).
  - We only get 5-minute point samples through Google Health (see [[05-data/data-sources|Data sources]]), so we can't run `quality()` ourselves. The equivalents per feature window are: sample count, `motionContext`, and steps in the window. Label a window "not enough signal" when it has 0 samples or only ACTIVE samples. → [[05-data/data-pipeline|Data pipeline]]
- **Use an independent motion channel to judge HR, not HR's own plausibility.** The SpO₂ probe shows a signal-shape check passes during motion, and the Journey reports "good" while locked on the arm (166 vs 71.5). Our gate must come from steps or `motionContext`.
- **Cadence-lock guard for the "short walk" suggestion.** Brisk walking cadence (about 100–120 steps/min) overlaps typical walking HR, which is exactly where WearLab's heart lab reads 112 for a true 96. Concretely:
  - Treat any HR sample taken while steps > 0 as unreliable.
  - Flag samples where |HR − steps/min| < 5 as possible cadence lock.
  - Judge whether a walk "worked" from the follow-up task, plus HR only from SEDENTARY samples a few minutes after walking stops.
  - This matches [[15-research/evaluation-plan|Evaluation plan]] and the existing warning on [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]].
- **Synthetic HR for the demo:** `PpgSim` is plain TypeScript, seeded, with no DOM. It ran an hour of simulation in about 0.18 s in my probe, so a full day takes about 4 s.
  - Approach: drive `sim.set({ hr, motion })` from a scripted day (study blocks, a walk), then sample `sim.bpm` and `sim.quality()` every 300 s to mimic Google Health point samples, with realistic artefacts (cadence lock, "--" gaps).
  - Caveats: `hr` is an input you script (there is no physiology model). The motion is a fixed 1.42 Hz *running* swing (there is no walking mode). And there is no LICENSE file, so ask Heramb before copying.
  - For overnight RMSSD, the One Night `night.ts` generator is the better source (see [[32-wearlab/what-we-reuse|What we reuse]]).
- **Don't copy absolute HRV bands.** The HRV lab's ≥ 50 / 30–50 / < 30 ms verdicts conflict with our personal-baseline rule on [[21-concepts/heart-rate-variability|HRV]]. Keep baseline-relative change. Breathing rate alone shifts RMSSD.
- **SpO₂ and ECG are out of scope** for decisions. WearLab itself frames them as wellness or regulated features, which supports our guardrail that the LLM never describes our data as ECG or diagnosis. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]

## Sources

- `wearlab/docs/PLAN.md` §4 (Photon Journey), §9 build status, Next ideas. `wearlab/README.md`.
- `wearlab/src/journey/ppg.ts`, `tissue.ts`, `chapters.ts`. `wearlab/scripts/test-journey.ts` (run read-only, all passed).
- `wearlab/src/lab/labs/heart.tsx`, `hrv.tsx`, `spo2.tsx`, `ecg.tsx`. `wearlab/src/lab/ecg-model.ts`. `wearlab/scripts/test-ecg.ts` (44 passed).
- `wearlab/src/data/library/content-sense.ts` (led-green, led-red, led-ir, photodiode, sensor-module, ecg-electrode, crown-electrode). `content-convert-think.ts` (afe, ecg-afe). `wearlab/src/data/topics.ts` (heart, hrv, spo2, ecg).
- Live app: https://wearlab-learn.vercel.app (Photon Journey at `/journey`, topics at `/how/heart`, `/how/hrv`, `/how/spo2`, `/how/ecg`).
- Probe scripts (scratch, not in the vault) imported the files above unchanged. All "probe" numbers are from them.
