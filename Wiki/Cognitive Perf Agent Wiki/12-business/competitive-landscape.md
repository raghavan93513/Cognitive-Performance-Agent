---
title: Competitive landscape
category: 12-business
tags: [business, competitor, wearables, marketing, synthesis]
aliases: [competitors, market landscape, wearable market, positioning]
relationships:
  - target: "[[12-business/12-business]]"
    type: related_to
  - target: "[[32-wearlab/brand-histories]]"
    type: derived_from
  - target: "[[01-foundation/project-overview]]"
    type: related_to
sources:
  - "wearlab/src/timemachine/compare.ts"
  - "wearlab/src/timemachine/fitbits.ts"
  - "wearlab/src/timemachine/whoops.ts"
  - "wearlab/src/timemachine/ouras.ts"
  - "wearlab/src/timemachine/garmins.ts"
  - "wearlab/src/timemachine/apples.ts"
  - "wearlab/src/data/brands.ts"
  - "https://wearlab-learn.vercel.app/history/compare"
summary: Who measures what among Fitbit, WHOOP, Oura, Garmin and Apple, where they already claim readiness/recovery/stress, and how the Cognitive Performance Agent differs. Positioning is inferred.
provenance:
  extracted: 0.45
  inferred: 0.5
  ambiguous: 0.05
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Competitive landscape

The wearable market as it affects **our** product. The hardware facts come from WearLab's brand catalogs and Compare page ([[32-wearlab/brand-histories|Brand histories]]). The positioning is our synthesis. We are **not** building a device. We build on top of one, and the five brands below are both our data sources and the products our users already compare us with. ^[inferred]

## Who measures what

WearLab's `compare.ts` defines 18 capabilities. The first model of each brand to have each one is shown below; "—" means no model of that brand in WearLab's catalog has it. "First" means first among the 66 models in the app, so earlier models outside the app aren't counted (Garmin's LTE, SpO2, ECG and solar each have a sourced earlier model noted in `compare.ts`). Wake dates are when hardware that shipped switched off was turned on.

| Capability | Garmin | Fitbit | Apple | WHOOP | Oura |
|---|---|---|---|---|---|
| Built-in GPS | Forerunner 201 (2003) | Surge (2015) | Series 2 (2016) | — | — |
| Altimeter | fēnix (2012) | Ultra (2011) | Series 3 (2017) | — | — |
| Bluetooth to phone | fēnix (2012) | One (2012) | Watch (2015) | Original (2015) | Gen 1 (2015) |
| NFC | Forerunner 645 Music (2018) | Flex (2013) | Watch (2015) | — | — |
| Colour screen | Forerunner 620 (2013) | Blaze (2016) | Watch (2015) | — | — |
| Wi-Fi | Forerunner 620 (2013) | Ionic (2017) | Watch (2015) | — | — |
| Optical heart rate | Forerunner 225 (2015) | Surge (2015) | Watch (2015) | Original (2015) | Gen 1 (2015) |
| Wireless charging | — | — | Watch (2015) | 4.0 (2021) | Gen 1 (2015) |
| Speaker | fēnix 8 AMOLED (2024) | Sense (2020) | Watch (2015) | — | — |
| Skin conductance (EDA) | — | Sense (2020) | — | Original (2015) | — |
| Skin temperature | Forerunner 970 (2025) | Sense (2020) | Series 8 (2022) | 4.0 (2021) | Gen 1 (2015) |
| Mobile network | fēnix 8 Pro (2025) | — | Series 3 (2017) | — | — |
| Blood oxygen | Forerunner 945 (2019) | Ionic (2017; on 2020) | Series 6 (2020) | 4.0 (2021) | Gen 3 (2021; on 2022) |
| ECG | fēnix 7 Pro (2023; on Oct 2023) | Sense (2020) | Series 4 (2018; on Dec 2018) | — | — |
| Solar charging | fēnix 6 Pro Solar (2020) | — | — | — | — |
| Ultra Wideband | — | — | Series 6 (2020) | — | — |
| Two-frequency GPS | fēnix 7 Sapphire Solar (2022) | — | Ultra (2022) | — | — |
| Satellite messaging | fēnix 8 Pro (2025) | — | Ultra 3 (2025) | — | — |

Caveats:

- WHOOP's ECG lives on the **WHOOP MG** (May 2025), which WearLab models as an event, not a model, so it shows "—" here.
- Oura Gen 1's wireless charging is drawn, not published.

## The physiological core is now shared

For the signals our agent uses, every brand covers the same ground: **optical HR** (since 2015 for all five), overnight HRV, sleep, skin temperature (all five by 2025) and SpO2 (all five by 2022). See [[21-concepts/photoplethysmography|PPG]], [[21-concepts/heart-rate-variability|HRV]], [[21-concepts/sleep-staging|Sleep staging]], [[21-concepts/skin-temperature-trends|Skin temperature trends]] and [[21-concepts/blood-oxygen-spo2|Blood oxygen (SpO2)]]. Competing on *sensing* is pointless for us. The differences are in the interpretation layer and the form factor. ^[inferred]

## Each brand's core promise

From WearLab's brand cards (`brands.ts`), with our reading of the promise:

- **Fitbit:** "From a clip-on step counter to a smartwatch with ECG." Everyday activity and health tracking, now inside Google. It is also the device and API our course uses. → [[22-entities/fitbit|Fitbit]]
- **WHOOP:** "A screenless band worn day and night, built around Strain and Recovery." Recovery-guided training, sold as a membership. → [[22-entities/whoop|WHOOP]]
- **Oura:** "A smart ring that reads your finger." Sleep, temperature and readiness from night-time trends against your normal. → [[22-entities/oura|Oura]]
- **Garmin:** "GPS watches for runners and adventurers." Weeks of battery, navigation and training load. → [[22-entities/garmin|Garmin]]
- **Apple Watch:** "The smartwatch with a Digital Crown." A general smartwatch with clinically cleared heart features (ECG, irregular rhythm). → [[22-entities/apple-watch|Apple Watch]]

## Where they already claim readiness, recovery or stress

Dated features from the catalogs. They show that "how ready or stressed am I?" is already answered by incumbents:

| Brand | Feature (catalog date) | What it uses |
|---|---|---|
| WHOOP | Recovery score; breathing rate added (Jul 2020) | Overnight HR, HRV, breathing rate |
| WHOOP | Stress Monitor, 0–3 (29 Mar 2023) | HR + HRV vs two-week normal, motion removed |
| Garmin | Body Battery, Training Effect (via Firstbeat, acquired 30 Jun 2020) | Firstbeat analytics |
| Garmin | HRV Status, Training Readiness (fēnix 7 beta, 28 Jun 2022) | Overnight HRV vs your normal; morning score |
| Oura | Daytime Stress (10 Oct 2023) | HR, HRV, motion, temperature |
| Oura | Symptom Radar (Dec 2024) | Temperature, breathing rate, resting HR, HRV, inactivity |
| Fitbit | Sense 2: "all-day stress sensing" (Sep 2022) | EDA electrodes, HR |
| Apple | Irregular rhythm notifications, ECG (6 Dec 2018) | Optical HR; crown ECG (FDA De Novo) |

Fitbit's card in WearLab also lists "recovery" among its topics, but the catalog has no dated Fitbit readiness event. Apple's catalog has no readiness or stress feature. ^[ambiguous]

## Where the Cognitive Performance Agent is different

Our product, per [[01-foundation/project-overview|Project overview]]: combine opt-in watch data, laptop-activity context and measured study-task results, then suggest **continue, a short walk, or a break**.

1. **Not another device.** We read the watch the user already owns (Google Health, and possibly HealthKit or Health Connect: [[05-data/data-sources|Data sources]]). None of the five brands sees what the user is doing on a laptop. ^[inferred]
2. **The outcome is measured performance, not a body score.** Incumbents predict "recovery" or "readiness" from physiology alone. We predict and then *check* performance on a repeatable study task, so a suggestion can be validated against what actually happened after it. See [[04-agent-engine/performance-model|Performance model]] and [[15-research/evaluation-plan|Evaluation plan]]. ^[inferred]
3. **Laptop behaviour as context.** Idle time and foreground-app categories, with never keystrokes, titles or URLs. No wearable brand has this signal. See [[13-trust-safety/privacy-and-consent|Privacy and consent]]. ^[inferred]
4. **Agentic suggestions with sources and abstention.** The Signal, Evidence and Action agents plus deterministic policy code give a concrete in-session action with the evidence behind it, and say "not enough data" when coverage is poor, rather than always showing a score. See [[04-agent-engine/multi-agent-decision|Multi-agent decision]] and [[08-frontend/student-interface-and-feedback|Student interface and feedback]]. ^[inferred]
5. **Students first.** The brands are built for athletes (WHOOP, Garmin), sleepers (Oura) or everyone (Apple, Fitbit). Study sessions are not their use case. ^[inferred]
6. **Staying non-medical.** Apple, Fitbit, Garmin and WHOOP each have FDA-cleared ECG features in the catalog. We should avoid any claim that sounds diagnostic, and say so in our positioning. ^[inferred]

The risk is that an incumbent adds "focus" or "study" modes using phone or computer context. The catalogs show Oura and WHOOP shipping new scores by software every year or two (2020–2024). ^[inferred]

## Adjacent competitors not in WearLab (needs research)

WearLab covers only device makers. These categories compete for the same "help me work better" attention. All are ^[inferred], and **none has been researched yet**:

- **RescueTime-style focus and time trackers:** automatic laptop app-usage tracking and focus sessions, with no physiology. ^[inferred]
- **Rise Science-style sleep and energy apps:** predict daily energy peaks and dips from sleep timing, often using wearable or phone sleep data. ^[inferred]
- **Pomodoro and focus-timer apps:** fixed work/break schedules without any measurement. These are the baseline our break suggestions must beat. ^[inferred]
- **OS-level wellbeing tools** (screen-time dashboards, break reminders). ^[inferred]
- **The brands' own coaching layers** (e.g. AI coaches inside WHOOP, Oura or Garmin apps): not covered by WearLab's hardware catalogs. ^[inferred]

Next step: a short desk review of each, covering what it measures, what it recommends, and whether it validates against performance. Track it on [[12-business/12-business|Business hub]]. ^[inferred]

## What this means for the Cognitive Performance Agent

- Our pitch should lead with **measured study-task performance + laptop context + a sourced, abstaining action**. Better sensing or a new readiness score would be a losing position against five incumbents who already share the same physiological core. ^[inferred]
- Use the capability matrix to pick the **lowest common denominator** of signals: overnight HRV, sleep, resting HR, steps. Then the agent works whichever brand a student owns, starting with the course's Fitbit route. ^[inferred]
- WHOOP's and Garmin's "against your normal" designs support our personal-baseline approach. Cite them as prior art, not as evidence it works for cognition. ^[inferred]

## Sources

- `wearlab/src/timemachine/compare.ts` (`CAPABILITIES`, `arrivals()`, side notes) and `wearlab/scripts/test-compare.ts`
- `wearlab/src/timemachine/{fitbits,whoops,ouras,garmins,apples}.ts` (events cited above)
- `wearlab/src/data/brands.ts` (brand blurbs and key topics)
- Live: https://wearlab-learn.vercel.app/history/compare
- Our pages: [[01-foundation/project-overview|Project overview]], [[05-data/data-sources|Data sources]], [[24-synthesis/design-comparison|Design comparison]]
