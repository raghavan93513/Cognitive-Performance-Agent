---
title: Science and Tech Evidence
category: 12-research
tags: [research, evaluation, physiology, llm, wearables]
aliases: [do breaks help, evidence base, data access reality, CTO dossier]
sources: ["desk research 2026-11-04 (sources listed at the bottom)", "https://developers.google.com/health/about", "https://developers.google.com/health/app-verification"]
summary: "How strong the evidence for breaks, sleep, HRV and adaptive timing is; LLM agent failures; tech failure cases; data access after the Fitbit API turn-off; what a small pilot can show."
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: core
created: 2026-11-04T23:59:00Z
updated: 2026-11-04T23:59:00Z
---

# Science and Tech Evidence

The CTO seat's knowledge base. It covers what the science actually supports, what data we can actually get, and what a classmate pilot can actually show. Desk research from 2026-11-04.

**Evidence grades:**
- **strong:** consistent meta-analyses or large preregistered studies.
- **moderate:** a meta-analysis with caveats, or consistent smaller trials.
- **weak:** few or small studies, lab only, or pre-post designs.
- **contested:** credible findings point opposite ways.

`[secondary]` means the claim comes only from coverage or summaries. `^[inferred]` marks our reasoning.

## 0. Time-sensitive (re-check before relying on it)

> **Update 2026-11-05 (CTO follow-up, checked against Google's setup page):**
> - Testing mode works **without review for up to 100 hand-listed users**: "a cap of 100 users for both testing and production purposes". Only more than 100 users needs the security review.
> - Testing tokens "expire after 7 days".
> - Daily HRV is **RMSSD (ms)**, from the longest sleep over 3 h.
> - The loaner Fitbit Air reports HRV.
> - Users must link a personal Google account in the Google Health app first, because Workspace and LionMail accounts can't link.
> - The legacy Fitbit HRV page gives 30 Oct 2026 as the turn-off date; Google's Health page says 2 Nov.
>
> Details: [[13-team/cto-steal-file|CTO steal file]] §H.

- **The Fitbit Web API was turned off on 2 Nov 2026** (support ended 30 Sep). Old endpoints return `410 Gone`. Every user must re-consent on the **Google Health API**.
- **Gating on the Google Health API** (Google's pages, opened 2026-11-04):
  - "Most scopes … are restricted".
  - "If your app isn't verified, it's limited to 100 users".
  - Restricted scopes need verification plus "an annual security assessment" before going public (CASA, reportedly $500–$4,500 and 2–6 weeks `[secondary]`).
  - Under Google's general OAuth rules, apps in **Testing** status accept only listed test users, and their **refresh tokens expire after 7 days**. Verify this for the Health API before the pilot.
  - So stay in Testing with at most 100 named classmates, and build a weekly re-authorize prompt, or data silently stops on day 8. ^[inferred]
- **Sync latency:** Google says data appears after the device syncs, "about every 15 minutes when the … app is open". Design for 15+ minutes of staleness, not the 5 minutes we assumed.
- **The FDA's General Wellness guidance was revised on 6 Jan 2026.** Escalation copy may say that "evaluation by a healthcare professional may be helpful". It must not name a disease, call anything "abnormal", or give thresholds or treatment.

## 1. Do breaks help? (the core claim)

| Claim | Evidence | Grade |
|---|---|---|
| Micro-breaks (≤ 10 min) reduce fatigue and raise vigour | Albulescu 2022 meta-analysis, N = 2,335: fatigue d = .35, vigour d = .36 | moderate |
| Micro-breaks improve performance on **demanding cognitive tasks** | Same meta-analysis: pooled performance d = .16 (not significant); **cognitive tasks d = −.09**; longer breaks helped more | weak / null |
| Briefly switching away prevents the vigilance decrement | Ariga & Lleras 2011; Helton & Russell 2015 (complete rest beats continuous work). Mechanism disputed | moderate (lab) |
| A "willpower battery" runs out (ego depletion) | 23-lab preregistered replication: d = 0.04 | **strong evidence against** |
| Later in the day lowers test scores; a break helps | All Danish test-takers: −0.9% SD per hour; a 20–30 min break +1.7% SD (Sievertsen 2016) | strong, but tiny, and in schoolchildren |
| Pomodoro beats self-paced breaks | Biwer 2023 (n = 87, one day): Pomodoro felt less fatiguing; output didn't differ. No RCT of classic 25/5 found | contested |
| Work in 90-minute ultradian sprints | Only the sleep cycle is established; waking evidence is weak | weak, near myth |
| Sleep loss harms attention, cumulatively, and people stop noticing | Lim & Dinges 2010 (lapses g = −0.78); Van Dongen 2003 (6 h × 14 nights; sleepiness ratings flatten) | **strong** |
| Sleep across the month predicts grades | Okano 2019 (MIT chemistry, n = 88): ~25% of grade variance; the night before didn't matter | moderate (observational) |
| Overnight wrist HRV predicts next-day study performance | No validation found. Lab HRV *rises* (RMSSD) with time-on-task (Csathó 2024) | **absent** |
| Activity breaks help cognition | Acute exercise g ≈ 0.10 (Chang 2012); breaking up sitting: 3 of 7 studies (Chueh 2022); walking boosts *creative* thinking (Oppezzo 2014) | strong that it's small |
| A phone break restores less | Kang & Kurtzberg 2019 (N = 414) | weak–moderate |
| Caffeine helps alertness; disrupts sleep even 6 h before bed | McLellan 2016; Drake 2013 | strong / moderate |

**What we can honestly promise** ^[inferred]:
- A break will probably leave the student **feeling less fatigued**.
- We **can't** promise better study scores from a 5-minute break.
- Sleep is the strongest lever, and people underestimate their own impairment. That's the reason for objective data plus a study task.
- Recommend the **type** of break: a short walk, phone away.
- Never hard-code "90 minutes" or Pomodoro as science.

## 2. Stress and fatigue detection in the wild

- **Lab models degrade in the field.**
  - cStress: 89% recall in the lab, but **72% accuracy** against field self-reports (Hovsepian 2015).
  - "Near-total lack of reproducibility" across stress studies (Mishra 2020).
  - WESAD (15 people, lab) is a benchmark, not field evidence.
- **Consumer "stress" labels mislead.** In 95 Dutch students, Garmin's Stress Score tracked **positive** arousal, not negative mood; the authors call the label "misleading" (preprint, 2025).
- **HRV validity.**
  - Nocturnal HRV from rings and straps is good for **within-person trends**: Oura Gen 4 CCC 0.99, WHOOP 0.94, Garmin 0.87 (n = 13).
  - Apple Watch underestimated HRV by about 8 ms (n = 39), and reportedly reports SDNN, not RMSSD `[secondary]`.
  - **Never pool HRV across device brands.**
- **Personal baselines win.**
  - HRV varies strongly with age, sex and time of day across 8.2M Fitbit users.
  - A personal model reached 95% vs 68% for a generic one (WESAD).
  - A weekly HRV-variability estimate needs **at least 5 of 7 nights** (Grosicki 2026, about 2M nights).
  - → Keep the 28/14-night baselines, and add a **5-of-7-nights sufficiency gate**.
- **Athletes break naive rules.** Low HRV in a training block can mean good adaptation (Plews 2017). Gate athlete logic separately, or make no athlete claims.

## 3. Adaptive timing (JITAIs)

- **The framework:** decision points, tailoring variables, options, decision rules, and proximal and distal outcomes (Nahum-Shani 2018). Our mapping:
  - decision points: every N minutes of active study;
  - tailoring variables: time-on-task, the study-task trend, sleep debt, overnight HRV against the person's baseline;
  - options: continue, walk, break or nothing;
  - proximal outcome: the next task score and the student's response.
- **HeartSteps** (micro-randomised trial, n = 44): walking suggestions raised next-30-minute steps by 24%. The effect was **large at first and decayed**, and anti-sedentary prompts had no effect.
- **Interruption timing:**
  - Breakpoint delivery cuts frustration (Iqbal & Bailey 2008).
  - Interrupted people work faster but report more stress (Mark 2008).
  - Receptivity models deployed in the wild improved response by **up to 40%** over random timing (Mishra 2021).
- **Closest prior art: Kaur et al., CHI 2020 (Microsoft).** Three weeks of workstation, affect and task data from 25 workers built models that predict **continue / transition / break**. In a **three-day** deployment in week four, users rated the timing of break suggestions **77%** well-timed (transitions 86%). The heuristic control condition was there to rule out novelty, not to compare: the authors say "our goal was not to compare the two conditions". So treat 77% as a feasibility benchmark from a short deployment, not a bar to beat. *(Corrected 2026-11-05 after the CSO checked the paper.)*
- **Adaptive vs fixed breaks:** no RCT shows adaptive timing beats a fixed schedule on cognitive performance. Fixed microbreaks even reduced discomfort more (McLean 2001). JITAI effects on wellbeing are small (g = 0.15, 23 studies). **Our pilot tests an open question.** Frame it as better-timed and more acted-on without hurting output, not as "smarter".

## 4. LLM health agents

- **What credible systems do:** compute in **code** and grade with **expert rubrics**.
  - **PH-LLM** (Nature Medicine 2025) beat experts on sleep and fitness multiple-choice exams.
  - **PHIA** writes and runs code over wearable data. It still got **~16% of numerical questions wrong** (84% accuracy) after 650 hours of expert review.
  - The **Fitbit Gemini coach** (Oct 2025) is multi-agent with a code-writing data-science agent, evaluated on SHARP (safety, helpfulness, accuracy, relevance, personalisation) with 1M+ annotations, and labelled "not a medical device".
  - Apple reportedly scaled back its AI health coach (Feb 2026).
  - **WHOOP Coach** (Sep 2023): built on OpenAI's GPT-4, combined with WHOOP's own algorithms and the member's data `[secondary]` (the press release returned 403). It can be turned off in settings `[described]`. Its scores (Recovery, Strain, Stress Monitor) are computed by WHOOP's own algorithms, so the LLM explains numbers rather than producing them ^[inferred]. Exactly how numbers are passed to the model isn't public.
  - **Oura Advisor** (Mar 2025, opened via Oura's blog): members choose its tone and how often it checks in, can review and delete its "Memories", and are told it "can make mistakes". Oura reports 83% of Labs testers found its answers reliable (company figure). Readiness itself comes from nine named contributors against personal averages (Oura support page). How numbers reach the LLM isn't published.
  - **What's common** ^[inferred]: the score is computed by the company's own algorithm, the LLM sits on top as an explainer, and the user controls tone, memory and opt-out. None of them publishes a number-check or stability test. That's where we can be more honest than incumbents.
- **How they fail:**
  - ChatGPT Health graded a journalist's 10 years of Apple Watch data an **F, and repeated asks swung between F and B** (Jan 2026).
  - GPT-4 referenced numerical data correctly only about 75% of the time (Englhardt 2024).
- **Our rules** ^[inferred]:
  1. The numeric model emits typed JSON: estimate, interval, sufficiency, features, record IDs. The LLM only verbalises it.
  2. Post-check every number in the LLM's text against the JSON. On a mismatch, fall back to a template.
  3. Run a stability check: the same input twice must give the same output.
  4. Deterministic policy picks the action; the LLM never does.
  5. Run a SHARP-style rubric plus trap cases: missing nights, a device change, an athlete with low HRV, prompt injection inside an app title.

## 5. Technical failure cases

| Case | What happened | Lesson |
|---|---|---|
| Google Flu Trends | Overestimated flu in 100 of 108 weeks (2011–13): input drift and overfitting (Lazer 2014) | Inputs drift (firmware, a new watch, API definitions). Version every source; re-baseline after any device change |
| Epic Sepsis Model | External AUC **0.63**; missed 67% of sepsis cases while alerting on 18% of patients (Wong 2021) | Vendor accuracy didn't survive external validation, and alert fatigue followed. Measure our false-alarm rate per student per day, and cap prompts |
| IBM Watson for Oncology | "Unsafe and incorrect" advice, reportedly trained on hypothetical cases `[secondary]` | Synthetic data creates false confidence. Label synthetic results in the demo |
| Babylon Health | Claimed its AI matched GPs on exam-style questions; critics said the evaluation didn't support it; administration in 2023 `[secondary]` | Benchmark wins aren't validity. Never claim "beats coaches" |
| Amazon Halo | Shut down Aug 2023 with refunds and data deletion after "creepy" Body and Tone features | Creepy sensing kills adoption. Its exit (refund plus delete) was the right way to leave |
| Pulse oximetry bias | ~11.7% of Black vs 3.6% of White patients had hidden low oxygen at "normal" readings (Sjoding 2020, `[secondary]`). FDA's 2025 skin-tone guidance **excludes wellness devices** | Optical sensors can be biased, and wellness devices aren't tested for it. Report by subgroup when n allows; never claim fairness |
| WHOOP Blood Pressure Insights | FDA: "not a low-risk function"; disclaimers didn't help (Jul 2025) | A feature is judged by what its outputs *imply*. Our output stays continue/walk/break, never a health status |

## 6. What data a student team can actually get

| Source | Access | Latency | Limits that bite a pilot |
|---|---|---|---|
| **Google Health API** (replaces Fitbit) | Google OAuth; sleep, heart rate (1 s), HRV, daily HRV, daily resting HR, steps; webhooks | ~15 min while the app is open | Unverified: 100 users; Testing: 7-day refresh tokens (verify); which HRV metric it reports is not stated |
| **Oura API v2** | OAuth only (personal tokens deprecated Dec 2025) | ~30 s after the app syncs; sleep only after the app is opened | **10 users** before approval; **an active membership is required** |
| **WHOOP** | OAuth; cycles, recovery, sleep, workouts; v2 webhooks | Webhooks | Sandbox: **10 members**; 100 requests/min |
| **Apple HealthKit** | On device only; **no server API**; needs a native iOS app; hides read denial | When the app runs | No third-party disclosure except to a health service, never for ads. Sending raw values to an LLM is a grey zone |
| **Android Health Connect** | On device; reads 30 days back by default | When the app runs | Background and history permissions |
| **Garmin** | Personal tier (your own data); business applications reportedly **paused since spring 2026** `[secondary]` | n/a | Keep off the critical path |
| **ActivityWatch** (laptop) | MPL-2.0, local-first; AFK and window watchers | Real time, local | **Window titles leak URLs, documents and email subjects.** Map to a category on device and drop the title. Never the browser watcher |
| **Gadgetbridge** | AGPLv3 Android; pairs watches without the vendor cloud | Local | Device support varies |

**Recommendation** ^[inferred]:
- **Primary:** Google Health API in Testing mode, or Oura for at most 10 users.
- **Fallback:** synthetic data from WearLab (ADR-001), plus a manual CSV import.
- **Core path:** laptop-only.
- Keep Garmin off the critical path.
- HealthKit only if someone builds a native iOS app.

## 7. Privacy architecture

- **Minimise at the edge.** Keep laptop data on the laptop and send only 5-minute aggregates (active/idle seconds, app category). Store **daily** watch features rather than raw intraday streams unless a feature needs them.
- **Assume re-identification.** About 95% of adults were re-identified from 20-minute step aggregates plus demographics (Na 2018), and 99.98% of Americans from 15 attributes (Rocher 2019). "Anonymised" pilot data isn't anonymous, so **never commit per-person time series to the public repo**.
- **Regulation.**
  - Not HIPAA (not a covered entity) ^[inferred].
  - The **FTC Health Breach Notification Rule** likely applies (a multi-source health app). Unauthorised *disclosure* counts as a breach; up to $53,088 per violation.
  - Washington's My Health My Data Act applies to any Washington users.
- **LLM providers** (opened 2026-11-04):
  - **OpenAI API:** no training by default; abuse logs kept up to 30 days; zero retention needs sales approval; some endpoints keep state.
  - **Anthropic API:** no training without permission; zero retention through sales; a HIPAA-ready BAA can be self-enabled.
  - **Gemini free tier:** **prompts may be used to improve products and read by human reviewers**, and the terms say not to submit sensitive data. The paid tier isn't used for training. Users must be 18 or older.
  - → Paid tiers only, derived pseudonymous features only, retention terms in the consent form.
- **Deletion means everywhere:** the database, backups, logs, vector stores, the LLM provider's stored state, and revoking upstream OAuth tokens.
- **Local mode:** the model is small enough to run on the laptop and send nothing to a cloud LLM. Worth offering.

## 8. What a classmate pilot can and can't show

- **Power:**
  - With 20 per group, a between-group test detects only **d ≈ 0.89**.
  - The micro-break vigour effect (d = .36) needs ~121 per group, and the performance effect (d = .16) ~613.
  - Within-person: n = 20 detects dz ≈ 0.63; n = 30, about 0.51.

  These are our own normal-approximation figures ^[inferred].
- **Low power inflates the effects you do find** (Button 2013). A "significant" result from 12 classmates is more likely noise or exaggeration.
- **Better designs:**
  - **within-person crossover or N-of-1** (alternate adaptive and fixed blocks in random order);
  - **micro-randomisation** (suggest vs don't at each eligible moment), for proximal effects.
- **Practice effects dominate repeated tasks** (d = 0.36–1.19, Bartels 2010). Use 2–3 familiarisation sessions, counterbalance order, and model the session number. The 3-minute PVT-B stays sensitive to sleep loss.
- **Pre-register** the primary outcome, analysis and stopping rule (Nosek 2018). Report effect sizes with confidence intervals and call it **feasibility and estimation**.
- **It can show:** sync uptime, the share of suggestions delivered, the abstention rate, perceived timing (Kaur's 77% from a 3-day deployment is a feasibility benchmark, not a bar), safety, the false-alarm rate, and within-person effect sizes and spread.
- **It can't show:** better learning or grades, generalisation beyond Columbia classmates, or anything about athletes unless athletes enrol.

## Sources (accessed 2026-11-04)

Breaks, sleep, HRV, exercise:
- Albulescu 2022: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0272460
- Ariga & Lleras 2011: https://doi.org/10.1016/j.cognition.2010.12.007
- Helton & Russell 2015: https://doi.org/10.1016/j.cognition.2014.10.001
- Hagger 2016: https://doi.org/10.1177/1745691616652873
- Sievertsen 2016: https://doi.org/10.1073/pnas.1516947113
- Biwer 2023: https://doi.org/10.1111/bjep.12593
- Duchniewska & Kokoszka 2003: https://doi.org/10.1080/00207450390162001
- Lim & Dinges 2010: https://doi.org/10.1037/a0018883
- Van Dongen 2003: https://doi.org/10.1093/sleep/26.2.117
- Okano 2019: https://doi.org/10.1038/s41539-019-0055-z
- Csathó 2024: https://doi.org/10.1016/j.biopsycho.2023.108727
- Chang 2012: https://doi.org/10.1016/j.brainres.2012.02.068
- Chueh 2022: https://doi.org/10.1136/bmjopen-2021-050458
- Oppezzo 2014: https://doi.org/10.1037/a0036577
- Kang & Kurtzberg 2019: https://doi.org/10.1556/2006.8.2019.21
- McLellan 2016: https://doi.org/10.1016/j.neubiorev.2016.09.001
- Drake 2013: https://doi.org/10.5664/jcsm.3170

Stress and HRV validity:
- cStress: https://doi.org/10.1145/2750858.2807526
- Mishra 2020: https://doi.org/10.1145/3432220
- Garmin stress preprint: https://doi.org/10.31234/osf.io/97pzb_v1
- Dial 2025: https://doi.org/10.14814/phy2.70527
- O'Grady 2024: https://doi.org/10.3390/s24196220
- Natarajan 2020: https://doi.org/10.1016/S2589-7500(20)30246-6
- Grosicki 2026: https://doi.org/10.1152/ajpheart.00738.2025
- Plews 2017: https://doi.org/10.1123/ijspp.2016-0343
- Li & Washington 2024: https://ai.jmir.org/2024/1/e52171

Adaptive timing:
- Nahum-Shani 2018: https://doi.org/10.1007/s12160-016-9830-8
- Klasnja 2019: https://doi.org/10.1093/abm/kay067
- Mark 2008: https://www.interruptions.net/literature/Mark-CHI08.pdf
- Iqbal & Bailey 2008: https://www.interruptions.net/literature/Iqbal-CHI08.pdf
- Kaur 2020: https://microsoft.com/en-us/research/uploads/prod/2020/02/Modeling-Opportune-Moments-for-Transitions-and-Breaks-at-Work.pdf
- Mishra 2021: https://doi.org/10.1145/3463492
- von Lützow 2025: https://doi.org/10.1136/bmjment-2025-301641
- McLean 2001: https://doi.org/10.1016/S0003-6870(00)00071-5

LLM health agents:
- PH-LLM: https://doi.org/10.1038/s41591-025-03888-0
- PHIA: https://arxiv.org/abs/2406.06464
- Fitbit coach: https://research.google/blog/how-we-are-building-the-personal-health-coach/
- Apple coach: https://9to5mac.com/2026/02/05/apple-reportedly-scales-back-plans-for-ai-powered-health-coach/
- ChatGPT Health: https://www.macrumors.com/2026/01/27/chatgpt-apple-health-integration-flaws/
- Englhardt 2024: https://arxiv.org/abs/2311.13063v3

Failure cases:
- Lazer 2014: https://gking.harvard.edu/files/ssrn-id2408560_2.pdf
- Wong 2021: https://doi.org/10.1001/jamainternmed.2021.2626
- Halo: https://www.aboutamazon.com/news/company-news/amazon-halo-discontinued
- FDA pulse oximeters: https://www.fda.gov/news-events/press-announcements/fda-proposes-updated-recommendations-help-improve-performance-pulse-oximeters-across-skin-tones
- WHOOP warning letter: https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/whoop-inc-709755-07142025
- FDA wellness revision (Covington): https://www.cov.com/en/news-and-insights/insights/2026/01/fda-issues-revised-guidance-on-general-wellness-products

Data access:
- Google Health API: https://developers.google.com/health/about · https://developers.google.com/health/app-verification · https://developers.google.com/health/data-types · https://developers.google.com/health/migration
- HealthKit privacy: https://developer.apple.com/documentation/healthkit/protecting-user-privacy
- Health Connect: https://developer.android.com/health-and-fitness/guides/health-connect/develop/read-data
- Oura API: https://cloud.ouraring.com/v2/docs · https://support.ouraring.com/hc/en-us/articles/4415266939155-The-Oura-API
- WHOOP developer docs: https://developer.whoop.com/docs/introduction
- Garmin overview: https://developer.garmin.com/gc-developer-program/overview
- Garmin pause (Terra, `[secondary]`): https://tryterra.co/blog/garmin-connect-developer-program-pause
- ActivityWatch: https://github.com/ActivityWatch/activitywatch
- Gadgetbridge: https://gadgetbridge.org/

Privacy and evaluation:
- Na 2018: https://doi.org/10.1001/jamanetworkopen.2018.6040
- Rocher 2019: https://doi.org/10.1038/s41467-019-10933-3
- FTC breach rule: https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0
- OpenAI data: https://developers.openai.com/api/docs/guides/your-data
- Anthropic retention: https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
- Gemini terms: https://aistudio.google.com/docs/terms
- Button 2013: https://doi.org/10.1038/nrn3475
- Bartels 2010: https://doi.org/10.1186/1471-2202-11-118
- Basner 2011: https://doi.org/10.1016/j.actaastro.2011.07.015
- Nosek 2018: https://doi.org/10.1073/pnas.1708274114

## Related

- [[12-research/12-research|Research hub]] · [[12-research/evaluation-plan|Evaluation plan]] · [[04-agent-engine/performance-model|Performance model]] · [[05-data/data-sources|Data sources]] · [[13-team/exec-team|AI exec team]] · [[24-synthesis/casebook|Casebook]]
