---
title: Brand histories (WearLab Time Machines and Compare)
category: 32-wearlab
tags: [wearlab, wearables, brand, competitor, synthesis]
aliases: [Time Machines, brand Time Machines, Compare brands, WearLab brand histories]
relationships:
  - target: "[[32-wearlab/32-wearlab]]"
    type: related_to
  - target: "[[12-business/competitive-landscape]]"
    type: related_to
  - target: "[[22-entities/fitbit]]"
    type: related_to
  - target: "[[22-entities/whoop]]"
    type: related_to
  - target: "[[22-entities/oura]]"
    type: related_to
  - target: "[[22-entities/garmin]]"
    type: related_to
  - target: "[[22-entities/apple-watch]]"
    type: related_to
sources:
  - "wearlab/docs/PLAN.md"
  - "wearlab/src/timemachine/model.ts"
  - "wearlab/src/timemachine/catalogs.ts"
  - "wearlab/src/timemachine/fitbits.ts"
  - "wearlab/src/timemachine/whoops.ts"
  - "wearlab/src/timemachine/ouras.ts"
  - "wearlab/src/timemachine/garmins.ts"
  - "wearlab/src/timemachine/apples.ts"
  - "wearlab/src/timemachine/parts.ts"
  - "wearlab/src/timemachine/compare.ts"
  - "wearlab/src/data/brands.ts"
  - "wearlab/scripts/test-compare.ts"
  - "wearlab/scripts/test-timemachine.ts"
  - "https://wearlab-learn.vercel.app/history"
  - "https://wearlab-learn.vercel.app/history/compare"
summary: How WearLab's brand Time Machines are built from sourced part lists, the 66 models across Fitbit, WHOOP, Oura, Garmin and Apple, and what the Compare page derives on one clock.
provenance:
  extracted: 0.85
  inferred: 0.12
  ambiguous: 0.03
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Brand histories (WearLab Time Machines and Compare)

WearLab ([[32-wearlab/32-wearlab|hub]]) has one 3D "Time Machine" per brand at `/history/<brand>` and a **Compare brands** page at `/history/compare`. Each brand's whole hardware history is a data file. Everything you see (what changed, the 3D layout, the quiz questions, the comparison sentences) is computed from that data. The product side of the app is on [[32-wearlab/product-tour|Product tour]], and the 3D parts are on [[32-wearlab/teardowns-and-parts|Teardowns and parts]].

## How the Time Machines work

### The catalog shape

Each brand is a `Catalog` (defined in `src/timemachine/model.ts`) and registered in `CATALOGS` in `src/timemachine/catalogs.ts`. A catalog has:

- **lanes / lines**: one or more product lines (Fitbit: Trackers and Smartwatches; Garmin: Forerunner and fēnix; Apple: Apple Watch and Ultra; WHOOP and Oura: one each). Each line is an ordered list of models (`Gen`).
- **events**: things that happened between launches, per line, of kind `update`, `recall` or `note`. An update can carry `wakes: { part, gens }`, meaning it switched on hardware that was already inside those models.
- a time span (`tMin`, `tMax`), an accent colour, a `pitch` for the entry card, and a `short()` name function.

Each **model** (`Gen`) has an id, line, name, `released` (and sometimes `announced`) date, a `build` (form, size, case material, optional `optics` LED/photodiode counts, ring temperature-sensor count `temps`), a `parts` list drawn from the fixed vocabulary in `src/timemachine/parts.ts`, a headline and story, `why` (reason each new part arrived), `gone` (reason each part left), an optional `off` (parts physically present but permanently disabled), `software` (features that were pure software), `specs` (battery text and `batteryDays`, water rating, weight, `dims` with `dimsFrom: official | review`, ring width/thickness), `facts` ("Good to know") and `sources` (label + URL on every model and every event).

`parts.ts` defines the hardware vocabulary: 56 part ids (processor, accelerometer, heart-rate LEDs, red + infrared LEDs, ECG electrodes, EDA, skin temperature, GPS, multi-band GPS, LTE, 5G, satellite, screens, buttons, battery, charging contacts, coil, solar, slide-on battery pack, and more). Some parts are in **swap groups** (display, radio, GNSS, cellular, button), so going from one screen to another is a "swap", not an add plus a remove. `BODY_SENSORS` lists the 14 parts that count as sensors for the trends chart.

### "The data is the truth" (PLAN.md §5.1–5.2)

- **Union of sources.** A model's part list is the union of the brand's own lists: the user manual, the spec page (fitbit.com / Google Store, Apple tech specs, Garmin spec page), and the launch announcement. Where those disagree, the model's facts say so (e.g. the Surge's spec page listed a gyroscope and compass the manual leaves out).
- **Carry over rather than guess.** WHOOP does not list every sensor for every model. Where a sensor isn't mentioned, it is carried over from the model before rather than guessed away, and the facts say so (the WHOOP 5.0's facts note that unchanged parts are carried over from the 4.0).
- **Sizes only when published.** Dimensions are shown only when published, with where they came from (official or a named review). Otherwise the 3D body is an estimate and the Specs panel says "not published". Weights are never compared between models, because some were published with a band and some without.
- **Illustrative LED counts are flagged.** Garmin publishes no LED counts at all. Apple published its LED make-up only from Series 6 (four clusters of green, red and infrared LEDs, four photodiodes). WHOOP published counts only for the 3.0 and 4.0. Oura counts come from teardowns. Where a count is a reviewer's (e.g. the5krunner counting Garmin's Elevate Gen 5 from photos) or purely illustrative, the model's facts say so.
- **Asleep hardware.** Hardware that shipped switched off is modelled as an event that wakes it later. Hardware that is permanently off is listed on the model (`off`): the only one is the Fitbit Sense 2's Wi-Fi ("deactivated, cannot be turned on").
- **Everything else is computed.** Added, removed and swapped parts come only from comparing two part lists, and the written reasons must match that diff exactly. The layout function places every part inside the body. Between launches, parts glide from one layout to the next during the last 0.25 years. The "spot the change" challenge asks one question per launch, with wrong options false by construction.

### Hardware that shipped asleep (events with `wakes`)

| Brand | Models | Hardware | Shipped | Switched on |
|---|---|---|---|---|
| Fitbit | Charge 3 | Red + infrared LEDs (blood oxygen) | Oct 2018 | Jan 2020 |
| Fitbit | Ionic, Versa, Versa 2 | Red + infrared LEDs (blood oxygen) | 2017–2019 | Jan 2020 |
| Apple | Series 4 | ECG electrodes | 21 Sep 2018 | 6 Dec 2018 (watchOS 5.1.2) |
| Oura | Gen 3 | Red LED (blood oxygen) | 15 Nov 2021 | 26 Jul 2022 |
| Garmin | fēnix 7 Pro Sapphire Solar | ECG contacts | 31 May 2023 | 17 Oct 2023 |

Related cases that are *not* modelled as wakes:

- Fitbit's ECG app on the Sense (Oct 2020) and Charge 5 (9 Nov 2021) is an update, but the electrodes already worked for EDA Scan at launch, so nothing "woke".
- An update brought SpO2 and skin temperature variation to the Charge 4 on 22 Mar 2021.
- Apple Blood Oxygen was switched *off* for US Series 9 and Ultra 2 sold from 18 Jan 2024 (Masimo patent ruling). A redesigned version computed on the paired iPhone returned on 14 Aug 2025.
- The Apple Series 2 already held a Bosch air-pressure sensor (iFixit), but Apple didn't advertise an altimeter until Series 3. Oura Gen 3's motion chip has a gyroscope built in that Oura never advertised. Neither is in the part lists.

### Checks

`scripts/test-timemachine.ts` checks data sanity, published sizes, reasons, firmware events, layout and timeline, plus the history facts the stories rely on. `scripts/test-compare.ts` checks the Compare logic. On 2026-10-26 a read-only run gave **27,231 passed / 0 failed** and **617 passed / 0 failed**. PLAN.md §5.3 still says "6,956 checks, all three brands", which is stale now that five brands are in. ^[inferred]

## The brands at a glance

| Brand | Lines | Models | First to last launch | Form | Key topic in WearLab |
|---|---|---|---|---|---|
| Fitbit | Trackers (12), Smartwatches (7) | 19 | Sep 2009 – Oct 2023 | clip, band, watch | none set |
| WHOOP | WHOOP (5) | 5 | Sep 2015 – May 2025 | band, no screen | Recovery and strain |
| Oura | Oura (5) | 5 | Dec 2015 – Jun 2026 | ring | Skin temperature |
| Garmin | Forerunner (11), fēnix (12) | 23 | Nov 2003 – Sep 2025 | watch (round from the 405) | Battery and charging (power budget) |
| Apple | Apple Watch (11), Ultra (3) | 14 | Apr 2015 – Sep 2025 | watch | ECG |

Total: 66 models. Brand cards and key topics come from `src/data/brands.ts`. Each brand there also lists the "How it works" topics its products are known for (e.g. WHOOP: heart, HRV, sleep, recovery, temp, SpO2).

## Fitbit

Pitch: "Drag through 14 years of Fitbits." From a clip-on step counter to a smartwatch with ECG. Brand page: [[22-entities/fitbit|Fitbit]].

**Trackers:** Tracker (29 Sep 2009), Ultra (3 Oct 2011), One (13 Nov 2012), Flex (6 May 2013), Force (10 Oct 2013), Charge (27 Oct 2014), Charge HR (6 Jan 2015), Charge 2 (Sep 2016), Charge 3 (Oct 2018), Charge 4 (13 Apr 2020), Charge 5 (28 Sep 2021), Charge 6 (12 Oct 2023).

**Smartwatches:** Surge (Jan 2015), Blaze (Mar 2016), Ionic (1 Oct 2017), Versa (16 Apr 2018), Versa 2 (15 Sep 2019), Sense (25 Sep 2020), Sense 2 (Sep 2022). Versa 3, Versa 4 and the Google Pixel Watch (13 Oct 2022) appear as events, not models.

Milestones:

- The Tracker had one sensor (an accelerometer) and synced over a 2.4 GHz radio to a base station.
- The Ultra added an altimeter (floors). The One added Bluetooth to a phone. The Flex moved to the wrist and added NFC (used to pair).
- The Force was recalled on 20 Feb 2014 for skin irritation (CPSC announced on 12 Mar 2014).
- The Charge HR added the optical heart sensor, and battery life fell from 7–10 days to 5. The Surge (the first watch) had GPS and heart rate on the wrist.
- Sleep stages (light, deep, REM) reached the Charge 2 by update in Mar 2017.
- The Charge 3 and Ionic carried red + infrared LEDs that slept until Jan 2020.
- The Charge 4 was the first Charge with built-in GPS.
- The Sense was "the most sensors Fitbit ever packed in": ECG + EDA electrodes, a skin temperature sensor, SpO2, GPS, a speaker and a mic.
- The Charge 5 brought colour, electrodes and dropped the altimeter. The Charge 6 brought the button back, "and Google moved in".
- The Sense 2's Wi-Fi is permanently off.
- The Ionic was recalled on 2 Mar 2022 (battery overheating; 78 US burn injuries).

## WHOOP

Pitch: "Ten years of a band with no screen." Brand page: [[22-entities/whoop|WHOOP]].

**Models:** Original WHOOP (Sep 2015), Strap 2.0 (Dec 2016, announced 18 Jul 2016), 3.0 (22 May 2019), 4.0 (8 Sep 2021), 5.0 (8 May 2025). WHOOP MG is an event beside the 5.0.

Milestones:

- No model has a screen (a test checks this).
- The original strap carried heart rate, EDA, device temperature and an accelerometer.
- The slide-on battery pack arrived with the 2.0. The 3.0 promised up to 5 days.
- The strap became free with a $30/month membership on 15 May 2018. Breathing rate joined Recovery in Jul 2020.
- The 4.0 added blood oxygen, skin temperature, haptics and wireless charging (3 green LEDs, 4 photodiodes). It samples HR and motion 52 times a second.
- The Stress Monitor (0–3, against a two-week normal) arrived on 29 Mar 2023. The FDA cleared a WHOOP ECG on 4 Apr 2025.
- The 5.0 promises 14+ days on a charge and is the only WHOOP with a published size.
- The MG puts ECG electrodes in the clasp and adds cuff-calibrated Blood Pressure Insights. WHOOP says the 5.0 lacks the sensors for either.

## Oura

Pitch: "Eleven years of rings, from a chunky ceramic Kickstarter ring to the Ring 5, 40% smaller." Brand page: [[22-entities/oura|Oura]].

**Models:** Gen 1 (Dec 2015, ceramic), Gen 2 (Apr 2018, titanium), Gen 3 (15 Nov 2021), Ring 4 (15 Oct 2024), Ring 5 (4 Jun 2026).

Milestones:

- Gen 1 and Gen 2 used infrared light only.
- Gen 3 added green and red LEDs (red switched on 26 Jul 2022) and seven temperature sensors. Ring 4 is described with one digital temperature sensor.
- Ring thickness: Gen 2 2.55 mm (review), Gen 3 2.7 mm (review), Ring 4 2.88 mm (official), Ring 5 2.28 mm (official). Width is 7.9 mm for Gen 2–4 and 6.09 mm for Ring 5.
- Software events: Natural Cycles uses the ring's temperature (2 Aug 2022), Cycle Insights (Sep 2023), Daytime Stress (10 Oct 2023), Cardiovascular Age (May 2024), Symptom Radar (Dec 2024). A Ring 4 Ceramic note is dated 1 Oct 2025.
- The Gen 1 and Gen 2 temperature-sensor counts and the Gen 1 charging method were never published, so they are marked as estimates. ^[ambiguous]

## Garmin

Pitch: "Twenty-two years of GPS on the wrist, on two lines." Brand page: [[22-entities/garmin|Garmin]].

**Forerunner (11):** 201 (Nov 2003), 305 (Feb 2006), 405 (3 Jan 2008), 620 (Nov 2013), 225 (Jul 2015), 935 (29 Mar 2017), 645 Music (Feb 2018), 945 (30 Apr 2019), 955 Solar (1 Jun 2022), 965 (Mar 2023), 970 (21 May 2025).

**fēnix (12):** fēnix (10 Jul 2012), 2 (Mar 2014), 3 (5 Jan 2015), 3 HR (Feb 2016), 5 Sapphire (4 Jan 2017), 5 Plus (18 Jun 2018), 6 Pro (29 Aug 2019), 6 Pro Solar (8 Jul 2020), 7 Sapphire Solar (18 Jan 2022), 7 Pro Sapphire Solar (31 May 2023), 8 AMOLED (27 Aug 2024), 8 Pro (8 Sep 2025).

Milestones:

- The 201 and 305 had GPS only, with no motion sensor. ANT+ arrived with the 305. The 405 was the first round one.
- Wrist heart rate came on the 225 (a Mio sensor). Garmin's own Elevate sensor followed on the Forerunner 235 (21 Oct 2015).
- Memory-in-pixel screens arrived from the 935 and fēnix 3.
- Garmin bought Firstbeat (Training Effect, VO₂ max, Body Battery) on 30 Jun 2020.
- Multi-band GPS and solar came with the 955 Solar.
- HRV Status and Training Readiness reached the fēnix 7 by beta firmware on 28 Jun 2022.
- AMOLED arrived with the 965 and fēnix 8. The fēnix 7 Pro's ECG woke in Oct 2023.
- The Forerunner 970 added a flashlight, ECG, a speaker and skin temperature.
- LTE and satellite came on the fēnix 8 Pro. Garmin Connect+ ($6.99/month) launched on 27 Mar 2025.

## Apple Watch

Pitch: "Ten years of the Apple Watch, and the Ultra." Brand page: [[22-entities/apple-watch|Apple Watch]].

**Apple Watch (11):** original (24 Apr 2015), Series 2 (16 Sep 2016), 3 (22 Sep 2017), 4 (21 Sep 2018), 5 (20 Sep 2019), 6 (18 Sep 2020), 7 (15 Oct 2021), 8 (16 Sep 2022), 9 (22 Sep 2023), 10 (20 Sep 2024), 11 (19 Sep 2025). Series 1 is an event. From Series 3 the GPS + Cellular model is shown.

**Ultra (3):** Ultra (23 Sep 2022), Ultra 2 (22 Sep 2023), Ultra 3 (19 Sep 2025).

Milestones:

- GPS came on Series 2, and cellular and the altimeter on Series 3.
- Series 4 added ECG (asleep until Dec 2018) and an LTPO screen. Series 5 added the compass.
- Series 6 added blood oxygen and U1 Ultra Wideband, and Force Touch was gone.
- Series 8 added two temperature sensors. Series 10 added depth and water temperature. Series 11 moved to 5G.
- Only the Ultra has dual-frequency GPS, the Action button and the siren. Satellite messaging arrived on the Ultra 3.
- The Apple Heart Study (event 16 Mar 2019) had 419,297 participants. 0.52% got an irregular-rhythm notification, and AF was confirmed 84% of the time when an ECG patch was worn at the same time.

## Compare brands (`src/timemachine/compare.ts`)

All functions here are pure functions of the catalogs, so `scripts/test-compare.ts` can check that every claim is true. "First" always means first among the brands and models *in this app*. `BRAND_ORDER` is Garmin, Fitbit, Apple, WHOOP, Oura.

### One clock

`span()` runs from just before the earliest launch (Forerunner 201, 2003) to just after the latest (Oura Ring 5, Jun 2026). `slotFor(brand, lane)` and `at(slot, t)` give the model each brand had on sale at any moment. `at()` returns null before a brand's first model, e.g. no Oura in mid-2015. On 1 Jan 2018, Apple's latest was Series 3.

### When each brand first got each of the 18 capabilities

`CAPABILITIES` defines 18 capabilities, each as "any of these parts". `arrivals(cap)` finds each brand's earliest model with one of them, plus a wake date if it shipped asleep. Sorted by first arrival:

| Capability | First in app | Then |
|---|---|---|
| Built-in GPS | Garmin Forerunner 201 (Nov 2003) | Fitbit Surge (Jan 2015); Apple Series 2 (Sep 2016) |
| Altimeter | Fitbit Ultra (Oct 2011) | Garmin fēnix (Jul 2012); Apple Series 3 (Sep 2017) |
| Bluetooth to a phone | Garmin fēnix (Jul 2012) | Fitbit One (Nov 2012); Apple Watch (Apr 2015); WHOOP original (Sep 2015); Oura Gen 1 (Dec 2015) |
| NFC radio | Fitbit Flex (May 2013) | Apple Watch (Apr 2015); Garmin Forerunner 645 Music (Feb 2018) |
| Colour screen | Garmin Forerunner 620 (Nov 2013) | Apple Watch (Apr 2015); Fitbit Blaze (Mar 2016) |
| Wi-Fi | Garmin Forerunner 620 (Nov 2013) | Apple Watch (Apr 2015); Fitbit Ionic (Oct 2017) |
| Optical heart rate | Fitbit Surge (Jan 2015) | Apple Watch (Apr 2015); Garmin Forerunner 225 (Jul 2015); WHOOP original (Sep 2015); Oura Gen 1 (Dec 2015) |
| Wireless charging | Apple Watch (Apr 2015) | Oura Gen 1 (Dec 2015); WHOOP 4.0 (Sep 2021) |
| Speaker | Apple Watch (Apr 2015) | Fitbit Sense (Sep 2020); Garmin fēnix 8 AMOLED (Aug 2024) |
| Skin conductance (EDA) | WHOOP original (Sep 2015) | Fitbit Sense (Sep 2020) |
| Skin temperature | Oura Gen 1 (Dec 2015) | Fitbit Sense (Sep 2020); WHOOP 4.0 (Sep 2021); Apple Series 8 (Sep 2022); Garmin Forerunner 970 (May 2025) |
| Mobile network | Apple Series 3 (Sep 2017) | Garmin fēnix 8 Pro (Sep 2025) |
| Blood oxygen | Fitbit Ionic (Oct 2017, woke Jan 2020) | Garmin Forerunner 945 (Apr 2019); Apple Series 6 (Sep 2020); WHOOP 4.0 (Sep 2021); Oura Gen 3 (Nov 2021, woke Jul 2022) |
| ECG | Apple Series 4 (Sep 2018, woke Dec 2018) | Fitbit Sense (Sep 2020); Garmin fēnix 7 Pro (May 2023, woke Oct 2023) |
| Solar charging | Garmin fēnix 6 Pro Solar (Jul 2020) | none |
| Ultra Wideband | Apple Series 6 (Sep 2020) | none |
| Two-frequency GPS | Garmin fēnix 7 Sapphire Solar (Jan 2022) | Apple Ultra (Sep 2022) |
| Satellite messaging | Garmin fēnix 8 Pro (Sep 2025) | Apple Ultra 3 (Sep 2025) |

Notes on the table:

- Neither WHOOP nor Oura ever gets GPS, a screen, NFC, Wi-Fi, ECG or a speaker in the catalogs. WHOOP is the only brand besides Fitbit with EDA.
- Some capabilities carry sourced side notes for earlier models that aren't in the app. Garmin's first LTE was the Forerunner 945 LTE (Jun 2021), its first blood oxygen the fēnix 5X Plus (Jun 2018), its first ECG app the Venu 2 Plus (Jan 2023), and its first solar the fēnix 6X Pro Solar (Aug 2019).
- Optical heart rate goes to the Surge because its date is month-only ("2015-01"), which sorts before the Charge HR's 2015-01-06. PLAN.md calls the Charge HR first on the *tracker* line. Both launched in January 2015. ^[ambiguous]
- Oura Gen 1's wireless charging is drawn, not published (Oura never said how it charged). ^[ambiguous]

### Trends (`METRICS`, `metric()`)

There are four trends: **battery** (published `batteryDays`, everyday mode, log scale), **thickness** (published `dims` depth only, with rings and integrated clips left out), **sensors on the body** (count of `BODY_SENSORS` parts) and **radios** (count of `RADIO_PARTS`). What the data shows:

- **Battery.**
  - Apple: 0.75 days on every model from the original to Series 10, then 1 day on Series 11. The Ultra lines go 1.5 → 1.5 → 1.75.
  - WHOOP: 1.5 (2.0) → 5 (3.0, 4.0) → 14 (5.0).
  - Oura: 3 → 7 → 7 → 8 → 9.
  - Fitbit: between 4 and 10 days throughout.
  - Garmin is in weeks. The Forerunner 620, fēnix and fēnix 3 are 42 days, and the Forerunner 965 is 23 days (about 7 always-on).
- **Thickness.**
  - Apple: 10.5 mm (original) → 11.4 mm (Series 2–3) → 10.7 mm → 9.7 mm (Series 10–11). Ultra 12 mm.
  - Forerunner: 17.53 mm (201) → 12.9 mm (970).
  - fēnix: 17 mm (2) → 13.8 mm (8 AMOLED), then back up to 16 mm on the 8 Pro.
  - Fitbit: Charge 4 12.7 mm → Charge 5/6 11.2 mm; Sense 12.35 mm → Sense 2 11.2 mm.
  - WHOOP 5.0: 10.6 mm, the only published WHOOP size.
- **Sensors.** Apple goes 4 → 11, Forerunner 0 → 10, fēnix 3 → 10, Fitbit 1 → 8 (Sense, Sense 2), WHOOP 4 → 7, and Oura 3 → 4.
- **Radios.** The most are on the fēnix 8 Pro and Ultra 3 (7 each). WHOOP and Oura have only Bluetooth (1) throughout.

### The sentences compare.ts derives (`insights()`)

These are built from the arrivals and checked by the test. They name the four biggest leads plus the closest race, and they skip rows where the second brand is known to have had the capability earlier on a model not shown:

1. The Forerunner 201 had built-in GPS in November 2003. The next model here with it, Fitbit's Surge, came 11 years later.
2. The Apple Watch had a speaker in April 2015. The next model here with one, Fitbit's Sense, came 5.5 years later.
3. The Original WHOOP had a skin conductance (EDA) sensor in September 2015. The next model here with one, Fitbit's Sense, came 5 years later.
4. The Oura Ring (Gen 1) had a skin temperature sensor in December 2015. The next model here with one, Fitbit's Sense, came 5 years later.
5. The closest race: satellite messaging arrived on the fēnix 8 Pro (September 2025) and the Apple Watch Ultra 3, 11 days later.

## Differences from our course

- Course week 3 lends students a **Fitbit Air** and uses a Fitbit Sense teardown ([[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]]). WearLab's Fitbit catalog ends at the Charge 6 (Oct 2023) and Sense 2, with the Pixel Watch only as an event. The device our pilot would use is **not** in the Time Machine. ^[inferred]
- The course frames wrist PPG HRV as an estimate that can differ from ECG. WearLab's catalogs make the same split (optical HR vs ECG electrodes) but don't discuss HRV accuracy beyond one WHOOP fact (a 2021 deep-sleep study: HR within 0.4% and HRV within about 2% of a chest ECG). Treat that fact as condition-specific. See [[21-concepts/wearable-measurement-error|Wearable measurement error]]. ^[inferred]

## What this means for the Cognitive Performance Agent

- **The sourcing discipline transfers directly.** Our Evidence agent and our wiki should work the same way: a union of named sources, carry over rather than guess, flag illustrative values, and generate sentences only from data that a test checks. `insights()` is a small, readable model for "claims true by construction". ^[inferred]
- **"Asleep" hardware is a data-availability lesson.** Sensors can ship before their features (SpO2, ECG), and a feature can be switched off by a court ruling (Apple Blood Oxygen in the US, 2024–2025). Our pipeline should key on *which data types are actually present for this user and date*, not on the device model. See [[05-data/data-sources|Data sources]]. ^[inferred]
- **Personal-baseline readings are now the norm.** Oura's temperature, WHOOP's Stress Monitor (two-week normal) and Garmin's HRV Status ("against your normal") all compare you to your own baseline. Our model already plans to, on [[04-agent-engine/performance-model|Performance model]]. ^[inferred]
- **Market context lives elsewhere.** The capability table above feeds [[12-business/competitive-landscape|Competitive landscape]]. What we can lift from WearLab is on [[32-wearlab/what-we-reuse|What we reuse]]. ^[inferred]

## Sources

- `wearlab/docs/PLAN.md` §2.2, §5 (Time Machines, "The data is the truth", checks)
- `wearlab/src/timemachine/model.ts` (Catalog, Gen, LaneEvent, Specs types), `catalogs.ts`, `parts.ts`
- `wearlab/src/timemachine/fitbits.ts`, `whoops.ts`, `ouras.ts`, `garmins.ts`, `apples.ts` (header comments state each brand's sourcing rules; per-model `sources` lists give URLs)
- `wearlab/src/timemachine/compare.ts`, `wearlab/scripts/test-compare.ts`, `wearlab/scripts/test-timemachine.ts` (run read-only 2026-10-26)
- `wearlab/src/data/brands.ts`
- Live: https://wearlab-learn.vercel.app/history and https://wearlab-learn.vercel.app/history/compare
