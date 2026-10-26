---
title: "WearLab: motion, sleep and recovery pipelines"
category: 32-wearlab
tags: [wearlab, signal-processing, physiology, wearables, data]
aliases: [One Step pipeline, One Night pipeline, WearLab movement labs, WearLab synthetic nights]
relationships:
  - target: "[[32-wearlab/32-wearlab]]"
    type: related_to
  - target: "[[21-concepts/step-counting]]"
    type: related_to
  - target: "[[21-concepts/sleep-staging]]"
    type: related_to
  - target: "[[21-concepts/recovery-and-strain]]"
    type: related_to
  - target: "[[21-concepts/skin-temperature-trends]]"
    type: related_to
  - target: "[[04-agent-engine/performance-model]]"
    type: related_to
sources: ["https://wearlab-learn.vercel.app", "wearlab/docs/PLAN.md", "wearlab/src/steps/body.ts", "wearlab/src/steps/sensor.ts", "wearlab/src/steps/counter.ts", "wearlab/src/steps/sim.ts", "wearlab/src/steps/chapters.ts", "wearlab/src/sleep/night.ts", "wearlab/src/sleep/band.ts", "wearlab/src/sleep/classify.ts", "wearlab/src/sleep/model.gen.ts", "wearlab/src/sleep/chapters.ts", "wearlab/scripts/train-sleep.ts", "wearlab/scripts/test-steps.ts", "wearlab/scripts/test-sleep.ts", "wearlab/scripts/test-recovery.ts", "wearlab/scripts/test-temp.ts", "wearlab/scripts/test-battery.ts", "wearlab/src/lab/recovery-model.ts", "wearlab/src/lab/temp-model.ts", "wearlab/src/lab/battery-model.ts", "wearlab/src/lab/labs/{steps,sleep,recovery,temp,battery,floors,gps,fall}.tsx", "wearlab/src/data/topics.ts"]
summary: Stage-by-stage account of WearLab's step counter, sleep simulator and stager, recovery/strain, temperature and battery maths, and how we can reuse them for synthetic data and personal baselines.
provenance:
  extracted: 0.72
  inferred: 0.25
  ambiguous: 0.03
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# WearLab: motion, sleep and recovery pipelines

WearLab's movement and sleep content is backed by **pure TypeScript simulations with headless tests**, not just animations. Two cinematic journeys (**One Step**, 16 chapters; **One Night**, 17 chapters) and eight labs (steps, sleep, recovery and strain, skin temperature, battery budget, floors, GPS and fall detection) each run on a small model. These notes describe each model with its real parameters. The final sections say what we can reuse for the [[01-foundation/project-overview|Cognitive Performance Agent]]. Hub: [[32-wearlab/32-wearlab|WearLab]]. Heart and optical pipelines are on [[32-wearlab/heart-signal-pipelines|Heart signal pipelines]].

**Test status.** We ran the five test scripts read-only on Node 22.23 with `node --experimental-strip-types`, with no install needed, on 2026-10-26. Results: steps 51/51, sleep 80/80, recovery 43/43, temperature 21/21, battery 31/31. The sleep suite takes about 6.5 s.

---

## 1. One Step: from heel strike to "+1"

Route `/journey/step`. It has 8 stops: heel → body → wrist → spring → comb → converter → processor → screen. One simulation drives every chart and the 3D walker. Two copies run at once (wrist and hip, in `src/steps/engine.ts`) so the two can be compared live.

### 1.1 The body (`body.ts`)
- 8 activities, each with a cadence in steps per minute: **walk 108, run 166, shuffle 72, trolley 100**. Four activities involve no walking: **still, bus, clap, brush**.
- Walking activities use forward kinematics from gait angles. Standing, bus, clapping and brushing use two-bone inverse kinematics (IK) to hand targets. The body is about 1.75 m tall, and the band is on the left wrist.
- The bus has a floor that moves: a 12 Hz engine buzz plus scripted dips and rebounds, with a random-jolt stretch and a steady **cobbled** stretch on a 24 s route.

### 1.2 The sensor (`sensor.ts`)
- The specific force is the second derivative of the sensor's position, **plus 1 g** (an accelerometer at rest reads +1 g), plus a heel-strike jolt (a 12 Hz ring-down with τ = 35 ms). The body absorbs part of the jolt before it reaches the sensor. Jolt sizes: **hip** walk 0.5, run 1.5, shuffle 0.14 and trolley 0.5 g; **wrist** walk 0.28, run 0.9, shuffle 0.07 and trolley 0.08 g.
- The force is rotated into the band's own x/y/z axes, gets **0.8 mg rms** of noise, then is quantised to **12 bits at ±4 g**. One LSB is about **1.95 mg**, and out-of-range values clip rather than wrap.
- **50 samples per second**. A FIFO sends them in batches of 25 so the processor can sleep.
- MEMS physics for the journey's interior view: the proof mass resonates at **4 kHz**, so x = a/ω₀² gives about **15.5 nm per g**. The comb fingers have a 2 µm gap and 220 fF per side at rest, and the change is a few fF per g.

### 1.3 The counter (`counter.ts`), one sample at a time
| Stage | What it does | Real parameter |
|---|---|---|
| 1. Magnitude | √(x²+y²+z²), which doesn't depend on how the band is worn | about 1 g when still |
| 2. Gravity removal | Subtracts a slow exponential average of the magnitude | about 1.2 s time constant |
| 3. Smoothing | Second-order low-pass (RBJ biquad, Q = 0.707) | 3 Hz at 50 Hz |
| 4. Peak from trough | A bump is measured from the dip before it to its top (peak-to-valley), so the slow arm swing doesn't matter | — |
| 5. Adaptive threshold | 30% of the biggest rise in the last 2 s, never below a floor | floor 0.07 g; fixed 0.25 g when switched off |
| 6. Not too soon | Minimum gap between steps | 0.28 s (about 214 steps/min) |
| 7. Rhythm ("ten in a row") | Counting starts only after **10 steady steps**, which are then added all at once. The code says this is ST LSM6DSL's default debounce. While searching, each gap may differ by up to 40% from the average of the last two. Once counting, a gap may differ by up to 50% from the learned beat | a gap over 1.25 s means you stopped, so the 10-step wait restarts |
| 8. Vertical check | At least **28%** of the last second's movement energy must lie along gravity (up and down) | 50-sample window |

You can switch each stage off in its chapter to see what it fixes.

### 1.4 What fools it, and what the tests show (`test-steps.ts`)
- **Real steps:** walking and running at the wrist and the hip land **within 2%** from three different start times. A hip shuffle is within 3%, and a hip trolley push is within 2%.
- **Clapping and brushing teeth:** 0 false steps in 40 s with everything on (the test allows 1). With the vertical check off, clapping gives **66** and brushing **90** false steps.
- **Bus:** random jolts give **0** false steps. The **steady cobbled stretch adds 27 in 48 s**, as Fitbit's help page says bumpy roads can. Without the rhythm check, the same ride gives 76.
- **Trolley at the wrist:** the hands ride on the handle, so the wrist counts **84–95%** of steps (84, 88 and 95 of 100 from three start times; the test accepts 75–98%) while the hip gets 100 of 100. Fitbit says the total "may be slightly lower".
- **Each stage earns its place.** Without smoothing, running is off by more than 20%. With a fixed threshold, wrist walking misses more than 20% and a hip shuffle drops from 36 of 36 to **0**.
- **Twisting the band** changes the axes by up to 0.42 g, but the magnitude by only 0.002 g, and the count is identical.
- **The first count jumps by exactly 10**, and it does so again after a pause. A mixed morning (walk, clap, stand, walk) stays within 10 steps of the truth.
- **Wrist vs hip:** the hip feels about twice the heel jolt and almost no arm swing, so it is the easier place to count. The wrist needs the adaptive threshold and the vertical check.

> **The steps lab differs from the journey.** `src/lab/labs/steps.tsx` is a simpler 6-second, 50 Hz clip. It drops peaks within **0.25 s**, accepts steps 1.5–3 per second, and needs a run of only **4** evenly spaced peaks (the journey needs 10). Its activities are still, walk, run, wave and car. Quote the journey's numbers for anything precise.

**Course comparison.** [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]] (p. 13) teaches a fixed rule: prominence ≥ 0.20 g and spacing ≥ 0.40 s. WearLab's journey uses an *adaptive* threshold (floor 0.07 g) and a 0.28 s minimum gap. A 0.40 s spacing caps counting at 150 steps/min, so it would undercount WearLab's 166 steps/min run. ^[inferred] Both agree on the failure modes from p. 14: a cart or trolley gives false negatives at the wrist, and a bus gives false positives. WearLab adds that a **rhythm check rejects random bus jolts but not steady cobbles**, which matches the course's warning that "periodicity alone does not establish walking". More on this in [[21-concepts/step-counting|Step counting]].

---

## 2. One Night: from brain stages to the morning report

Route `/journey/sleep`. It has 8 stops: brain → body → wrist → beats → numbers → guess → rules → morning. The pipeline runs in three layers, and the band never sees the lab truth.

### 2.1 The lab's night (`night.ts`): the ground truth
- **8 hours, 23:00 to 07:00**, in **960 pages of 30 s** (epochs). Stages are wake, N1, N2, N3 and REM. The band reports N1 and N2 together as "light", which matches the consumer labels on the Week 3 slides (p. 25).
- There are about **five cycles** of light → deep → light → REM. Deep minutes per cycle are [38, 26, 12, 4, 0] and REM minutes are [10, 18, 24, 30, 34], each varied by ±15%. Brief wake-ups happen at the ends of cycles, plus short arousals, and the last 3 minutes before the alarm are awake.
- **The five kinds of night:**
  | Kind | What changes (code) | Source the code cites |
  |---|---|---|
  | normal | settle 5 min, lie still 9 min, 8 short arousals | — |
  | coffee | settle 12 + still 34 min; deep ×0.6; a 26-min wake-up in cycle 3; HR +2 bpm; 14 arousals | Drake 2013 |
  | alcohol (drinks) | asleep in 3 + 3 min; deep [46, 32, 10, 3, 0]; first REM skipped, REM [0, 11, 20, 24, 28]; more broken second half; HR +4.5 bpm and breathing swing −30%, both fading over 5 h | Ebrahim 2013, Pietilä 2018 |
  | restless | deep ×0.85; 2–5-min wake-ups each cycle; 8 extra wake-ups; 16 arousals | — |
  | awake | lies awake **without moving for 85 min** before sleeping | — |
- **The body in each stage.** Heart-rate offsets from a lying-awake rate (drawn per night as 63 ± 3 bpm) are wake +6, N1 +1.5, N2 −2.5, N3 −6 and REM +1.5. Each stage also has a breathing swing (RSA, largest in N3), slow heart wander (largest in REM and awake), a breathing rate (13.2/min in N3 to 15.8/min in REM) and a breathing irregularity (5% in N3, 17% in REM and awake). The heart slows by 3 bpm over the first 5 h and speeds up again after 6 h. Slow random drifts mean the same stage never looks quite the same twice.
- **Every breath and every heartbeat is generated** from these values, so RMSSD and the breathing wave in the gaps between beats *emerge* from the beats rather than being set. Movement covers fidgeting while awake, roll-overs, stillness in deep sleep and twitches in REM. Wrist skin warms by about 0.9 °C after sleep onset.

### 2.2 The band (`band.ts`): what a wrist device sees
- **Beats from light.** When the movement envelope is above 0.04 g, 60% of beats are lost and the rest are mistimed by about 120 ms. Otherwise beats are timed to within 4 ms.
- **Clean gaps.** A gap is kept only if it is 0.33–1.6 s long and within **20%** of the median of the last 9 clean gaps. A lost beat (a gap twice as long) is rejected.
- **Movement** is sampled 10 times a second with a 0.01 g dead band and summed per page. A page counts as still below 1.2.
- **Sleep period, from movement alone.** It starts at the first stretch where an hour (120 pages) has 8 or fewer moving pages. The code cites Fitbit's help pages for the hour of stillness. It ends at the last 10 still minutes.
- **The six numbers per page:**
  1. **Movement:** log of a weighted sum over ±2 minutes, capped at 2.5.
  2. **Heart rate above the night's lowest:** the page's HR minus `baseHR`, where `baseHR` is the 10th percentile of HR in the sleep period.
  3. **HRV compared with the night:** ln of the 5-minute RMSSD minus the night's median ln RMSSD.
  4. **Breathing irregularity:** spread of breath lengths over ±1 min, with breaths counted from the gaps between beats (resampled at 4 Hz with the slow drift removed). Capped at 0.6.
  5. **Heart wandering:** SD of page HR over ±2 min.
  6. **Hours since the sleep period began.**

  Items 2 and 3 are **within-night personal baselines**, so the features compare across people with very different resting HR and HRV.

### 2.3 Staging (`classify.ts`)
- **Stage odds.** Each of the 4 stages (wake, REM, light, deep) has a Gaussian with a mean and a full 6×6 covariance. Each covariance is **blended 50/50 with the pooled covariance**, so a very tidy stage such as deep sleep doesn't claim every tidy page. Numbers that couldn't be measured are left out of the calculation, not imputed. A per-stage bias is tuned over 12 iterations so that each stage's total over the training nights matches the lab.
- **Rules (Viterbi).** Stage-to-stage transition chances are learned from the same nights, with every transition starting at one sighting. Each page's evidence is weighted **0.35**, because neighbouring pages share their 5-minute HRV and 2-minute breathing windows. The path starts awake (50%), light (45%) or another stage (2.5% each). This step runs in the morning, when the band can look both backwards and forwards.
- **Movement-only mode** uses a single threshold, searched from 0.2 to 4 on the training nights, and says only awake or asleep.
- **Training** (`scripts/train-sleep.ts` → `model.gen.ts`) uses **14 simulated nights**: normal seeds 1–6, coffee 7–8, alcohol 9–10, restless 11–12 and awake 13–14, giving **13,187 pages**. Tests use seeds 101–106, and the journey's "tonight" is seed 101. `test-sleep.ts` checks that no training seed is ever shown or tested, and that `model.gen.ts` is exactly what training produces today.

### 2.4 What the tests guarantee on unseen nights (`test-sleep.ts`, run 2026-10-26)
| Check | Result |
|---|---|
| Page agreement, all 5 kinds × 6 nights | **81%** (the test requires 65–90%; Beattie 2017 found 69% for real people) |
| Normal nights, each | 79, 89, 83, 88, 78 and 83% |
| Normal nights, time asleep | within **3 min** on average |
| Normal nights, deep sleep | off by **28%** a night, with no overall lean (0%) |
| Rules vs page-by-page | 75 → **25** stage changes (the lab has 46); at least as right on 5 of 5 kinds |
| Lying awake | movement alone adds **87 min** of "sleep"; with the heart, **35 min** |
| Coffee | the band sees **45 min** less sleep |
| Drinks | the band shows **48 min** of deep sleep against the lab's 88 (the faster heart hides it) |
| Band's kept gaps and breathing | 99% within **15 ms** of the real gaps; breathing rate within 0.22/min in light and deep sleep |

The trade-off: brief wake-ups get smoothed away, so the band reports fewer of them than the lab.

> **Treat the 81% with caution.** The stager is trained and tested on the *same generator*, so its accuracy is an upper bound on what this method could do, not evidence about real wrists. ^[inferred] The course figure for PPG staging against polysomnography (PSG) is κ ≈ 0.53–0.71 and **accuracy ≈ 69–83%** (Week 3, p. 28).

The **sleep lab** (`src/lab/labs/sleep.tsx`) is separate and simpler. It offers three nights (normal, caffeine, restless) and uses hand-written threshold rules (for example, movement > 6 → awake), then smooths away one-epoch flickers. See [[21-concepts/sleep-staging|Sleep staging]].

---

## 3. Recovery and strain (`src/lab/recovery-model.ts`)

The code says WHOOP publishes the ideas, not the formulas. These numbers are an **open stand-in that behaves the same way, not WHOOP's**.

- **Strain, 0–21.** Heart-rate zones are shares of heart-rate reserve: Z1 50–60% … Z5 90–100%, weighted 1–5. Time at 30–50% counts ×0.5, and below 30% nothing counts. Every day includes 60 min of ordinary moving about at 30–50%. Load = Σ minutes × weight, and strain = 21·ln(1 + load/22) / ln(1 + 1500/22), capped at 21. The scale is logarithmic, so each point costs more than the last.
  - Bands (as WearLab cites WHOOP): light < 10, moderate 10–13, high 14–17, all out 18–21.
  - A rest day scores about 4.3 (the test requires 2–8).
  - Heart-rate strain **undercounts weights**.
- **Sleep need** = 7.6 h + (strain − 5)/10 × 37 min. The code cites WHOOP's member average of 7.6 h and its example that a strain of 15 adds 37 min.
- **Recovery, 1–99%.** Each reading is turned into a z-score **against the person's own usual mean and SD**, signed so that positive means better rested:
  - HRV, weight 0.55
  - resting HR, weight 0.25
  - breathing rate, weight 0.08
  - sleep performance (slept ÷ need) vs 90% ± 8, weight 0.12

  Each z is clamped to ±3. Score = 100 / (1 + e^−(1.2·Σwz + 0.55)), so an ordinary day lands in the mid-60s. Colours: red 1–33, yellow 34–66, green 67–99.
- **What a night does (`nightOf`)** to HRV, resting HR, breathing and skin temperature:
  | Night | HRV | Resting HR | Breathing | Skin temp |
  |---|---|---|---|---|
  | Drinks | −25% | +5 bpm | +0.3 /min | +0.2 °C |
  | Coming down with a cold | −20% | +6 bpm | +1.6 /min | +0.8 °C |

  Short sleep, a strain above 14 and an easy day have smaller effects. Two example people show why the comparison must be personal: Sam (usual HRV 38 ± 6 ms, resting HR 62) and Alex (85 ± 12 ms, resting HR 48).
- Details: [[21-concepts/recovery-and-strain|Recovery and strain]].

## 4. Skin temperature trends (`src/lab/temp-model.ts`)

- **56 nights.** Each night has a reading every 5 min for 8 h (96 samples). The finger warms by about 3.6 °C as you fall asleep, and dips when a hand leaves the covers.
- **One number per night:** the median of the settled readings after the first hour, which ignores the dips.
- **Baseline:** the mean of up to **28 earlier nights**, looking only backwards. There are **no comparisons for the first 14 nights** while the baseline is learned. The code says Oura uses a two-month baseline, and 28 nights is used here because that fits on screen and spans a whole cycle.
- **Patterns:**
  - menstrual cycle: +0.3 °C from day 15 for more than 10 nights
  - cold: +1.0, +0.8, +0.45 and +0.2 °C over 4 nights
  - drinks: +0.35 °C for one night
  - hot room: +0.12 °C
- **Tuning the alert.** About **+0.5 °C** catches the cold on its first night and flags nothing else, wherever in the cycle the cold falls (0.45–0.55 works). +0.15 fires on the warm phase of the cycle, and +1.3 misses the cold. An uneventful month stays within ±0.2 °C.
- Details: [[21-concepts/skin-temperature-trends|Skin temperature trends]].

## 5. Battery budget (`src/lab/battery-model.ts`)

Every number comes from Garmin's **fēnix 8** owner's manual table for the two 47 mm watches. Garmin doesn't publish battery capacity, so the lab works in shares of a full battery per hour (100 ÷ rated hours).

| Mode | Solar (MIP) | Solar + 3 h/day of 50,000 lux sun | AMOLED, wake on gesture | AMOLED, always on |
|---|---|---|---|---|
| Smartwatch | 21 d | 28 d | 16 d | 7 d |
| GPS only | 67 h | 92 h | 47 h | 37 h |
| All systems | 48 h | 49 h | 38 h | 30 h |
| Multi-band | 37 h | 43 h | 35 h | 28 h |
| Max battery | 132 h | 283 h | 81 h | n/a |
| Music | 13 h | — | 10 h | 10 h |

- **Solar.** The smartwatch row implies about **0.40% of the battery per hour of bright sun**, so about 12 h of bright sun a day covers smartwatch use indefinitely. The GPS-only, multi-band and max-battery rows agree within 10%. All systems is the odd one out (48 → 49 h), and the lab says so.
- **MIP vs AMOLED.** Each memory-in-pixel pixel holds its image with almost no power and reflects room light, so the screen is always on. Every AMOLED pixel makes its own light, so keeping it lit is costly. That is why always-on cuts 16 days to 7.
- **Lab goals:**
  - a month on the Solar with 30 min a day of Max battery GPS plus 4.5 h of sun
  - 5 days on an always-on AMOLED with 2 h a day of GPS only or All systems (not multi-band, not music)

## 6. The other movement labs

**Floors (`floors.tsx`).** A barometer measures air pressure, which drops about **0.12 hPa per metre** near sea level. The pipeline:
1. pressure → relative altitude (the lab notes real trackers use the full barometric formula)
2. smoothing, because readings wobble by up to half a metre
3. one floor for every **3 m** of rise above the last low point (a storey is 3.3 m; going down never adds floors)
4. a **step check**: height gained while the accelerometer feels no stepping only moves the reference

Without the step check, a lift (about 1.5 m/s) and a passing weather front (about 3 hPa over 3 h while you sit still) both add false floors.

**GPS (`gps.tsx`).** Satellite signals arrive after **about 67–86 ms**. Distance = speed of light × travel time, so **1 µs of clock error is about 300 m**. Each distance is a circle, and where the circles cross is the fix (trilateration). There are four unknowns (east, north, height and the watch's clock error), so the watch needs at least 4 satellites. The lab offers 2, 3, 4 or 6. A signal bounced off a building adds 120 m of path, which dual-band cuts to about 10 m (simplified). About 3 m of error from the atmosphere and orbit data remains.

**Fall detection (`fall.tsx`).** The lab uses a 4 s window at 40 samples per second and ticks off four clues:
1. a **free-fall dip below 0.5 g**
2. an **impact spike above 3 g**
3. a **wrist turn of 60° or more** (gyroscope)
4. **stillness**: motion under 0.05 g afterwards

A hard clap spikes to about 5 g but turns the wrist only about 12°. Sitting down fast hits only about 1.1 g. A dropped watch tumbles freely, which is not arm-like. The lab notes that real watches use machine-learning models trained on recorded falls. If the person doesn't respond, the watch alerts, counts down and calls for help.

---

## 7. Can we use these as a synthetic-data generator? Yes, with a thin wrapper.

The course gives equal credit to a synthetic-data path ([[30-course/30-course|BINF 4070]]). WearLab's models are **deterministic, seedable, dependency-free TypeScript**. ^[inferred] The relevant files:

| Model | Files | Lines | What it produces |
|---|---|---|---|
| Sleep simulator, band and stager | `src/sleep/night.ts`, `band.ts`, `classify.ts`, `model.gen.ts` | about 1,160 | Per night: 960-page 5-class hypnogram (truth), every heartbeat (about 27–31k), every breath, movement events and posture, per-page HR, breathing and skin temperature, the band's six features per page, the band's 4-class hypnogram, a movement-only hypnogram, and a morning report (time asleep, minutes per stage, awakenings, sleep onset and wake times) |
| Step simulator | `src/steps/body.ts`, `sensor.ts`, `counter.ts`, `sim.ts` | about 690 | 50 Hz 3-axis accelerometer (12-bit counts and g), true heel strikes, counted steps, and the trace of every stage, for 8 activities at wrist or hip |
| Daily physiology | `src/lab/recovery-model.ts` | 215 | `dayTrace()`: minute-by-minute HR from 06:00 to 22:00 for a day's workouts. `nightOf()`: overnight HRV, resting HR, breathing, temperature and sleep performance from strain, sleep, drinks or illness |
| Temperature month | `src/lab/temp-model.ts` | 98 | 56 nights with cycle, cold, drinks and hot-room events, each night's value, the baseline and flags |

**Measured in our scratch run (2026-10-26, Node 22.23).** We imported the modules read-only from a script in the scratchpad:
- 10 nights (5 kinds × seeds 201–202) took **about 1 s in total**.
- 60 s of wrist walking took 57 ms and counted **107 of 108** steps.

Sample nights:

| Kind (seed 201) | Lab asleep (min) | Band asleep (min) | Band deep (min) | Band REM (min) | Median RMSSD (ms) | baseHR (bpm) |
|---|---|---|---|---|---|---|
| normal | 453 | 451.5 | 91 | 140 | 37.6 | 51.7 |
| coffee | 390 | 387.5 | 37 | 112.5 | 27.3 | 55.1 |
| alcohol | 450 | 439 | 95 | 82.5 | 33.3 | 53.0 |
| restless | 419.5 | 417 | 56.5 | 100 | 29.8 | 57.4 |
| awake | 385 | 401 | 71.5 | 81.5 | 33.6 | 50.6 |

The core call is short:

```ts
const n = makeNight('coffee', 1001);      // night.ts: truth + beats + movement
const b = analyse(n);                     // band.ts: six features per 30 s page
const s = stage(b, MODEL);                // classify.ts: band hypnogram (s.smooth)
const r = report(s.smooth);               // asleep, stages, awakenings, onset, wake
```

**What it would take to produce a usable dataset** ^[inferred]:

1. **Copy, don't import.** SRC is read-only, and our repo shouldn't depend on Heramb's Mac. Vendor the 10 files listed above into a `tools/synth/` folder. They need no npm packages. Run them with `node --experimental-strip-types` (Node ≥ 22.6), and call them from Python with `subprocess` reading JSON/CSV. Package.json has no license field, so get Heramb's explicit OK. ^[ambiguous]
2. **Add a person layer.** `makeNight` draws the resting HR fresh each night (63 ± 3 bpm), and nothing persists between nights. Add a `person` parameter (resting HR, HRV scale, usual sleep need, chronotype) and day-to-day carry-over. For example, use `nightOf()` from the recovery model to shift HR and RSA after a hard day, drinks or a cold.
3. **Add a calendar.** Pick a night kind per date from a schedule (exam week → coffee and restless, weekend → drinks, occasional illness), and include missing nights (band off or charging; the Week 7 synthetic data has both). Use **seeds outside 1–14 and 101–106** if we ever want to score WearLab's stager on them.
4. **Free the clock.** `NIGHT_H = 8` and lights-out at 23:00 are module constants. For varied bedtimes, shift timestamps afterwards, or parameterise these in our copy and **retrain** with our copy of `train-sleep.ts`. `test-sleep.ts` fails if the model and generator drift apart. Never run `train-sleep.ts` inside SRC: it writes `model.gen.ts`.
5. **Emit Google-Health-shaped records.** Map the outputs to the shapes in [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]] and [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]]:
   - sleep session with `sleep_stages` LIGHT/DEEP/REM/AWAKE ← `s.smooth`
   - daily resting HR ← `baseHR` (a sleep-HR floor, not the vendor's RHR definition)
   - `rmssd_ms` ← exp(`medLnRmssd`)
   - respiratory rate ← median per-page `br`
   - sleep temperature ← `temp-model`
   - per-minute `steps` and `heartRate` ← an activity schedule

   Keep the simulator's truth (lab stages, true steps) in a separate **label** table so we can measure our own pipeline's error.
6. **Steps at day scale.** The 50 Hz simulator costs about 3.4 s per simulated hour of walking. That is fine for short bursts (for example, verifying that a "short walk" break happened) but heavy for whole days. For per-minute step streams, generate counts from cadence × minutes walked. Apply the error profiles WearLab measured: wrist trolley 84–95%, nothing counted for walks under 10 steps, false steps on steady cobbled roads (27 in 48 s).
7. **Be honest about realism.** It is a teaching model built from published typical effect sizes. Use it to exercise pipelines, data checks, abstention and policy, never to claim our model's accuracy (see [[12-research/evaluation-plan|Evaluation plan]]).

Effort: about 1–2 days for one person to vendor the files, add the person and calendar layers and write the JSON emitter. ^[inferred]

## 8. Personal baselines we should adopt

| Method | Where in WearLab | Window / rule |
|---|---|---|
| Within-night normalisation | `band.ts` | HR minus the night's 10th percentile; ln RMSSD minus the night's median |
| z vs personal usual mean and SD, clamped ±3, weighted multi-signal | `recovery-model.ts` | SD fixed per person (HRV 6 or 12 ms, resting HR 3 or 2.5 bpm) |
| Robust nightly value, trailing mean baseline, learning period, threshold in natural units | `temp-model.ts` | median of settled readings; 28-night trailing mean; 14-night learning; +0.5 °C |

**Compared with the course's 7-day z-score.** The Week 7 lab computes daily resting HR z against the mean and SD of the 7 previous days and flags |z| > 2. It **misses the third sick day** (Oct 4) and **raises a false alarm on Sep 28** ([[30-course/weeks/week-07-time-series-multimodal-features|Week 7]]). WearLab's temperature method avoids both failure modes:
- **The window is 4× longer.** A 4-night cold adds 1.0 + 0.8 + 0.45 + 0.2 = 2.45 °C·nights. Spread over 28 nights that is a baseline shift of about +0.09 °C. Over 7 nights, the first two sick nights alone shift the mean by (1.0 + 0.8)/7 ≈ +0.26. ^[inferred]
- **The threshold is in °C, not SD units.** Sick days entering the window can't inflate the SD and hide day 3. ^[inferred]
- **Nothing is compared during the learning period**, which limits early false alarms from a tiny-n SD. ^[inferred]

Neither WearLab model excludes flagged days from the baseline. The course page suggests doing so, and we should. ^[inferred]

**Proposal for [[04-agent-engine/performance-model|Performance model]]** ^[inferred]:
1. Summarise each night robustly first (median of settled values; a low percentile for HR).
2. Use a **28-day trailing baseline that excludes today and flagged days**, with a **median/MAD** spread or an SD floor.
3. Make **no personal comparison until 14 valid nights** exist. Until then, abstain and use the laptop-only model.
4. Require both |z| ≥ 2 **and** a minimum change in natural units (for example, resting HR +5 bpm or temperature +0.5 °C).
5. Clamp z to ±3, and combine HRV, resting HR, breathing and sleep before acting, not single signals.

## 9. Which signals make sense for "keep studying or take a break"? ^[inferred]

| Signal | Use? | How |
|---|---|---|
| Last night's total sleep vs personal need | **Yes, daily context** | WearLab's band gets time asleep within about 3 min on simulated normal nights. Short sleep lowers the threshold for suggesting a break |
| Sleep timing (onset, wake) | Yes | Late nights and irregular schedules are robust to measure from movement |
| Overnight HRV, resting HR and breathing vs your baseline | **Yes, as a slow prior** | Use a recovery-style composite computed in our numeric code, never by the LLM |
| Skin temperature ≥ +0.5 °C vs baseline | Yes, as a "take it easy" flag only | Never a diagnosis. Never surface or infer the menstrual cycle (+0.3 °C) |
| Steps and sedentary time today | **Yes** | Time since last movement → "short walk". A counted walk confirms the break was taken (it needs 10 steady steps to register) |
| Deep or REM minutes | No | Deep sleep is off by 28% a night even in WearLab's own simulation. Drinks hide deep sleep |
| A vendor recovery % or strain | No | Formulas are unpublished. Strain measures training load (a sitting student scores near a rest day's ~4) |
| Live daytime HRV | No | See the HRV concept page: daily context only |
| Floors, GPS, fall detection | No | Not about cognition, and GPS is a privacy cost (see Privacy and consent) |
| Battery state | Operational only | Charging gaps explain missing HR. An always-on AMOLED dies in about 7 days |

Related: [[21-concepts/heart-rate-variability|HRV]] · [[10-trust-safety/privacy-and-consent|Privacy and consent]]

## What this means for the Cognitive Performance Agent

- **Reuse the generators for our synthetic path and demo.** `night.ts` + `band.ts` + `classify.ts` give realistic nights at about 0.1 s each, and `recovery-model.ts` gives daytime HR and night-to-night physiology. Vendor them with a person layer and a calendar layer (§7). ^[inferred]
- **Adopt the temperature-style baseline** (robust nightly value, 28-day look-back, 14-night learning period, natural-unit threshold). It fixes both failures the course showed for the 7-day z-score. ^[inferred]
- **Use sleep quantity and timing plus the overnight recovery composite as context. Don't use stage minutes.** ^[inferred]
- **WearLab's movement-only failure is the risk for our laptop data.** Lying awake and still added 87 min of "sleep". Laptop idle time is a similarly ambiguous stillness signal, so don't read idle as resting without corroboration. ^[inferred]
- **The step counter's 10-step debounce and wrist-trolley undercount** matter if we verify walk breaks from step counts. A 2-minute walk at 108 steps/min (about 216 steps) is safely countable. ^[inferred]
- Open questions go to [[24-synthesis/open-decisions|Open decisions]]: whether to vendor the code (licence), and whether skin temperature is in scope for privacy reasons. ^[inferred]

## Sources

- WearLab live site: <https://wearlab-learn.vercel.app> (One Step at `/journey/step`, One Night at `/journey/sleep`, labs under each topic).
- `wearlab/docs/PLAN.md` §6 One Step, §7 One Night, §9 build status (C3: 12 of 12 labs).
- Code: `wearlab/src/steps/{body,sensor,counter,sim,engine,chapters}.ts`; `wearlab/src/sleep/{night,band,classify,engine,chapters}.ts` and `model.gen.ts` (structure only); `wearlab/scripts/train-sleep.ts`; `wearlab/src/lab/{recovery-model,temp-model,battery-model}.ts`; `wearlab/src/lab/labs/{steps,sleep,recovery,temp,battery,floors,gps,fall}.tsx`; `wearlab/src/data/topics.ts` (steps, sleep, recovery, temp, floors, location, falls, power).
- Tests run read-only on 2026-10-26: `wearlab/scripts/test-{steps,sleep,recovery,temp,battery}.ts`.
- Cited inside WearLab's code: Drake 2013 (caffeine), Ebrahim 2013 and Pietilä 2018 (alcohol), Beattie 2017 (69% staging agreement), Fitbit help pages (bumpy roads, strollers, an hour of stillness), ST LSM6DSL pedometer defaults, WHOOP public descriptions, Oura's baseline description, Garmin fēnix 8 owner's manual.
- Course: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]] (pp. 10–14, 25–28) and [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]] (lab part 2.2).
