---
title: WearLab product tour
category: 32-wearlab
tags: [wearlab, product, frontend, wearables, reference]
aliases: [WearLab tour, WearLab routes, WearLab features]
relationships:
  - target: "[[32-wearlab/32-wearlab]]"
    type: related_to
  - target: "[[32-wearlab/architecture]]"
    type: related_to
  - target: "[[32-wearlab/curriculum-and-quizzes]]"
    type: related_to
sources: ["wearlab/README.md", "wearlab/docs/PLAN.md", "wearlab/src/App.tsx", "wearlab/src/screens/Home.tsx", "wearlab/src/data/topics.ts", "wearlab/src/data/brands.ts", "wearlab/src/data/library/manifest.ts", "wearlab/src/lab/labs/", "wearlab/src/inside/views/", "wearlab/src/journey/chapters.ts", "wearlab/src/steps/chapters.ts", "wearlab/src/sleep/chapters.ts", "https://wearlab-learn.vercel.app"]
summary: Every tab, route and feature of WearLab as a visitor meets it, with live hash-route URLs, counts checked against the code, and where README and PLAN have drifted from the code.
provenance:
  extracted: 0.82
  inferred: 0.13
  ambiguous: 0.05
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# WearLab product tour

WearLab is Heramb's dark-mode 3D web app that explains how fitness wearables work. This page walks through it the way a visitor does: the four tabs, then the full-screen experiences that open from them. For how it is built, see [[32-wearlab/architecture|WearLab architecture]]. For the hub, see [[32-wearlab/32-wearlab|WearLab]].

**Routing:** the app uses a `HashRouter` (`src/App.tsx`), so every live address has `#/` in it, for example `https://wearlab-learn.vercel.app/#/how/hrv`. The routes below come from `App.tsx` and the data files. I did not click through the live site for this page, so treat the live URLs as derived from code. ^[inferred]

## The four tabs

The shell (`src/components/shell/Shell.tsx`) shows a 220 px sidebar on desktop and a bottom nav bar on phones. Both hold the same four tabs: **Home, Devices, How it works, History**. PLAN §2 states the organising rule: "every thing lives in exactly one place."

### Home (`#/`)

- Headline "How wearables really work" and three "doors", each with a live count computed from the data (`src/screens/Home.tsx`):
  - **Take one apart** → Devices. Meta line: "5 devices · 96 parts explained". The 96 is `Object.keys(LIBRARY).length`.
  - **See how it measures you** → How it works. Meta line: "11 measurements · 6 hardware topics".
  - **See how Fitbit, WHOOP, Oura, Garmin and Apple got here** → History. Meta line: models and years across all Time Machine catalogs. That works out to **66 models, 2003–2026** (Fitbit 19, WHOOP 5, Oura 5, Garmin 23, Apple 14).
- **Start with a story:** cards for the three journeys (One Step, Photon, One Night).
- **What's inside the app:** the two topic groups, with a chip for every topic.
- **Brands:** five cards. All five have `status: 'ready'` in `src/data/brands.ts`.

### Devices (`#/devices`, `#/devices/:device`, `#/parts`, `#/parts/:kind`)

**Five types of wearable**, simplest first: `clip`, `band`, `ring`, `strap`, `watch` (`DEVICE_ORDER`). Live: `https://wearlab-learn.vercel.app/#/devices/watch`.

- **Teardown screen** (`src/screens/Teardown.tsx`): a 3D model with a breadcrumb trail. Clicking a part selects it. "Open it up" explodes it into its children. The URL keeps state as `?open=<ids>&sel=<id>`, for example `#/devices/watch?open=watch,board&sel=imu`. ^[inferred]
- **Four-level drill-down** (PLAN §1):
  - L0: device.
  - L1: modules.
  - L2: components.
  - L3: "inside" animations.
  - L4: algorithm labs, which live on topic pages.
  - The watch tree goes one level deeper than the others: the SoC, IMU and barometer open into their dies.
- **View modes:**
  - **Explode.**
  - **X-ray:** ghosts everything except the selection.
  - **Slice:** a clipping plane with a "Cut" slider from −1 to 1.
- **Explain panel** on every part:
  - the plain-words card;
  - "See inside it" (opens the inside view);
  - "Part of how it works" (topic links);
  - "Typical numbers";
  - "Deep dive";
  - a fun fact;
  - "Found in" (the other devices that have it).
  - On the device root, the panel also lists "What it measures" (computed in `src/data/links.ts`) and the device's own quizzes.
- **Parts** (`#/parts`): a searchable grid of all **96 part kinds**, filterable by the seven layers (Sense, Convert, Think, Talk, Power, Show, Protect). Each kind has its own page, for example `#/parts/photodiode`.
- **Real products:** brand cards that link to History.

Details of the trees and cards are in [[32-wearlab/teardowns-and-parts|Teardowns and parts]].

### How it works (`#/how`, `#/how/:topic`)

There are **17 topics** in `src/data/topics.ts`: 11 measurements and 6 hardware topics. A topic page has these parts, in order:

1. the question and a short summary;
2. its guided journey (if any);
3. "Try it" (its lab);
4. "The parts that do it";
5. "Check yourself" (its quizzes);
6. "Found in" (devices and brands).

| Group | Topic id (route `#/how/<id>`) | Name | Journey | Lab | Quizzes |
|---|---|---|---|---|---|
| measure | steps | Steps | One Step | steps | 3 |
| measure | heart | Heart rate | Photon | heart | 7 |
| measure | hrv | Heart rate variability | One Night, from chapter "gaps" | hrv | 1 |
| measure | sleep | Sleep | One Night | sleep | 1 |
| measure | recovery | Recovery and strain | none | recovery | 2 |
| measure | spo2 | Blood oxygen | none | spo2 | 1 |
| measure | ecg | ECG | none | ecg | 6 |
| measure | temp | Skin temperature | none | temp | 2 |
| measure | floors | Floors climbed | none | floors | 1 |
| measure | location | Location and direction | none | gps | 3 |
| measure | falls | Fall detection | none | fall | 1 |
| hardware | basics | What every wearable is made of | none | none | 2 |
| hardware | brain | Processor, memory and time | none | none | 4 |
| hardware | power | Battery and charging | none | battery | 6 |
| hardware | radios | Radios and payments | none | none | 2 |
| hardware | screen | Screen, touch and buzz | none | none | 2 |
| hardware | case | Case, fit and water | none | none | 2 |

Topic quizzes add up to 46. The other 6 quizzes live on devices (`DEVICE_QUIZZES`): clip has 2, and band, ring, strap and watch have 1 each. That makes 52.

### History (`#/history`, `#/history/:brand`, `#/history/compare`)

- **Five brand Time Machines**, each a full-screen 3D timeline (`src/screens/TimeMachine.tsx`):
  - `#/history/fitbit`: 19 models on two lines, trackers and smartwatches.
  - `#/history/whoop`: 5 straps.
  - `#/history/oura`: 5 rings.
  - `#/history/garmin`: 23 watches on the Forerunner and fēnix lines.
  - `#/history/apple`: 14 watches on the Apple Watch and Ultra lines.
- **Time Machine features:**
  - Dragging the timeline morphs the device. Parts arrive, swap and leave, each with a reason.
  - Hardware that shipped switched off glows "asleep" until the update that woke it.
  - Views: Outside, X-ray, exploded and true-scale line-up.
  - A "spot the change" challenge.
  - A source link on every fact.
  - Deep links use `?lane=<line>&g=<model>`.
- **Compare brands** (`#/history/compare`) has four sections:
  - "Five brands, one clock": all five side by side in 3D at true scale.
  - "When each brand got it": first arrival of **18 capabilities**.
  - "Over time, together": four shared-axis metrics, namely battery life, thickness, sensors on the body and radios.
  - "What the timeline shows": data-backed sentences.

Brand detail is on [[32-wearlab/brand-histories|Brand histories]].

## Full-screen experiences

### The three journeys

Each journey is a cinematic with chapters. One simulation drives the visuals and the numbers. Reaching the last chapter marks the journey as watched.

| Journey | Route | Chapters | Follows |
|---|---|---|---|
| Photon Journey | `#/journey` | 13 | One flash of green light: LED → glass → skin → blood → photodiode → AFE → accelerometer → processor → screen. Photons are Monte-Carlo traced, and the bpm on the face is measured from the simulated light. |
| One Step | `#/journey/step?c=<chapter>` | 16 | One footstep: heel → body → wrist → spring → comb → converter → processor → screen, plus a wrist-vs-hip comparison. |
| One Night | `#/journey/sleep?c=<chapter>` | 17 | One night of sleep: brain → body → wrist → beats → numbers → guess → rules → morning. Ends with the band's hypnogram next to the lab's as a 3D landscape. |

The chapter counts were checked against `src/*/chapters.ts`, which list the route stops plus the chapters (9+13, 8+16 and 8+17 ids). The HRV topic links into One Night at `#/journey/sleep?c=gaps`. The signal maths is covered in [[32-wearlab/heart-signal-pipelines|Heart signal pipelines]] and [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]].

### The 12 labs (on topic pages)

Every lab is an interactive pipeline with "goals" that quizzes can ask for (`src/lab/labs/*.tsx`).

| Lab | Pipeline (its subtitle) | What you can break, and the fix |
|---|---|---|
| steps | accelerometer → magnitude → smoothing → peaks → rhythm check → steps | Set the peak threshold or minimum step gap wrong and waving or a car ride counts as steps. Goals: count a walk correctly, and stop hand-waving from counting. |
| heart | light → band-pass → motion cancellation → rhythm finder → bpm | Run, or wear the band loose, and the reading locks onto arm swing. Turning on motion correction recovers the pulse. Goal: real pulse while running. |
| spo2 | red + IR → AC/DC → ratio R → calibration curve → SpO₂ | Arm movement and altitude (sea level, hike, very high) change the red/IR ratio. Goal: show a reading under 90%. |
| hrv | beats → gaps → changes → RMSSD | Switch between stressed, workout, normal, relaxed and slow breathing. Goal: a relaxed HRV above 50 ms. |
| floors | pressure → height → smoothing → 3 m climbs → step check | A lift or a storm fakes floors unless "Require steps" is on. Goal: get 3 floors of stairs counted. |
| gps | travel times → distances → circles → clock fix → position | Fewer satellites, tall buildings and receiver clock error spoil the fix. Dual-band L1+L5 helps. Goal: an accurate fix. |
| fall | free-fall dip → impact spike → wrist turn → stillness → alert | Toggle each clue (free fall below 0.5 g, impact above 3 g, wrist turned, lying still, skin detected). Goals: trigger a real fall alert, and clap hard without an alarm. |
| sleep | movement + heart → 30 s epochs → classifier → hypnogram | Normal, caffeine and restless nights, with "Use heart data" on or off, compared against "Sleep lab says". Goal: find a deep-sleep period. |
| recovery | heart rate → zones → Strain; overnight HRV and HR → your normal → Recovery | WHOOP's two scores. Drinks, a coming cold and short sleep pull Recovery down. Goals: strain of 14 or more, and still wake up green after it. |
| temp | nightly readings → one number per night → minus your normal → flag | Oura's approach. A menstrual cycle and a cold both warm the finger. Goal: set the alert so it catches the cold and nothing else. |
| battery | daily use → share of battery → minus the sun → days between charges | Garmin fēnix 8 Solar vs AMOLED, always-on screen, GPS minutes, satellite mode, music and sun level. Goals: a month on the Solar watch with 30 min of training a day, and 5 days with an always-on AMOLED and 2 h of training a day. |
| ecg | finger on crown → 30 s → clean → find beats → regular or not | Apple's approach. Drift, "fizz" (noise) and the beat threshold. Goals: a clean "Sinus rhythm" while the arm moves, and a correctly called atrial fibrillation. |

### 23 inside views

These are narrated, step-by-step animations of the physics inside a part (`src/inside/views/*.tsx`). Each part's explain panel opens one through "See inside it". The 23 are: MEMS accelerometer, MEMS gyroscope, magnetometer, barometer, skin thermistor, photodiode, LED, ECG circuit, EDA (stress sensor), AFE, system-on-chip, memory (RAM vs flash), PMIC, crystal clock, Bluetooth radio, NFC, GNSS, battery ions, wireless charging, haptic LRA, OLED pixel, touch grid and crown encoder.

### Quizzes (`#/quiz/:id`)

There are **52 quizzes with 409 items**: 96 teaching cards and 313 questions. The validator confirmed these counts on 2026-10-26. Each quiz lives in exactly one topic or device. An example is `#/quiz/t3-u2-l2` ("The rhythm between beats", under HRV). See [[32-wearlab/curriculum-and-quizzes|Curriculum and quizzes]].

### Old addresses

`/explore`, `/explore/:id`, `/codex`, `/codex/:id`, `/labs`, `/labs/:id`, `/lesson/:id`, `/timeline` and `/time-machine` all redirect to their new homes. Any unknown path goes to `/`.

## Where README, PLAN and code disagree

- **Part kinds: 91 or 96.** README says Parts "lists all 91 kinds of part". The live Home page and Parts grid show **96**: the manifest has 23 Sense, 4 Convert, 8 Think, 14 Talk, 16 Power, 12 Show and 19 Protect. The five device trees use 91 of them. The other 5 are `uwb`, `ant-radio`, `solar-cell`, `mip-display` and `flashlight`, all brand-only hardware (Apple and Garmin) that was added with those Time Machines. README was probably not updated after the Garmin and Apple commits. ^[inferred]
- **PLAN §2.1 quiz table is stale.** It lists ECG 5, Skin temperature 1 and Battery 5. The code has 6, 2 and 6, and Recovery (2) is missing from the table. The total of 52 still holds.
- **PLAN §2 History row** says "Fitbit today", and its full-screen list names only Fitbit, WHOOP and Oura. The code has five brands plus Compare.
- **PLAN §5.3** says `test-timemachine.ts` runs "6,956 checks, all three brands". Running it read-only on 2026-10-26 gave **27,231 passed**, covering five brands.
- **PLAN §9** is headed "Build status (2026-09-25)" but lists work added on 2026-09-27.
- **README's feature table** gives Time Machine rows only for Fitbit, WHOOP and Oura. Garmin and Apple appear only through their labs.
- **Leftovers from the game:** PLAN A1.2 mentions a "Blip mascot", but there is no Blip anywhere in `src`. PLAN's explain card has a **Feeds** line, but the `algos` field (set on 22 part kinds) is not rendered by `ExplainPanel` or `Parts`. README's last line still points to "the gamification logic". ^[ambiguous]

## What this means for the Cognitive Performance Agent

^[inferred]
- **Ready-made explainers for our signals.** The `#/how/heart`, `#/how/hrv`, `#/how/sleep` and `#/how/steps` pages, plus the Photon, One Step and One Night journeys, explain exactly the four watch signals our agent reads. They could be deep-linked from the "why this suggestion?" rationale in [[08-frontend/student-interface-and-feedback|Student interface and feedback]], so a student can see where an HRV number comes from.
- **Honest-uncertainty framing.** The labs teach that each number is an estimate that breaks in known ways (motion, lying awake still, a loose fit). That matches what [[21-concepts/wearable-measurement-error|Wearable measurement error]] and [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]] want users to understand.
- **Design-language precedent.** WearLab's "one home per idea" organisation and its no-points quizzes give our team a working precedent for a calm, non-gamified student UI.
- **Recovery and temperature labs are vendor-specific.** They teach WHOOP and Oura rules, not ours. Our model should cite them only as context and not copy their bands. See [[04-agent-engine/performance-model|Performance model]].

## Sources

- `wearlab/README.md`, `wearlab/docs/PLAN.md` (§1, §2, §4–§7, §9)
- `wearlab/src/App.tsx`, `wearlab/src/components/shell/Shell.tsx`, `wearlab/src/screens/*.tsx`
- `wearlab/src/data/topics.ts`, `wearlab/src/data/brands.ts`, `wearlab/src/data/links.ts`, `wearlab/src/data/library/manifest.ts`
- `wearlab/src/lab/labs/*.tsx`, `wearlab/src/inside/views/*.tsx`, `wearlab/src/journey/chapters.ts`, `wearlab/src/steps/chapters.ts`, `wearlab/src/sleep/chapters.ts`
- Headless runs on 2026-10-26: `scripts/validate-curriculum.ts` (52 quizzes, 409 items), `scripts/test-timemachine.ts` (27,231 passed)
- Live app: https://wearlab-learn.vercel.app
