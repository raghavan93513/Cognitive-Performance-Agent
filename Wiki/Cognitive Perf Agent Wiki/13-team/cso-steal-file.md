---
title: CSO Steal File
category: 13-team
tags: [research, evaluation, ethics, synthesis, design]
sources: ["09-design/steal-library.md", "12-research/science-and-tech-evidence.md", "09-design/design-evidence.md", "desk research 2026-11-04 (sources in §G, opened unless marked)"]
summary: "The CSO's read of the steal library: evidence grade and harm per mechanism, 20 study and safety cases plus 7 anti-cases, top 10 study steals, and the unknowns to settle before any pilot."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: core
created: 2026-11-05T04:00:00Z
updated: 2026-11-05T04:00:00Z
---

# CSO Steal File

*From the CSO seat (Chief Science Officer, an AI advisor role). It recommends; the team decides. This is not legal or clinical advice. Every IRB, legal and clinical question below is flagged for course staff, Columbia's IRB or Columbia Health.*

The team asked each seat to "start understanding everything from the steal library". The other seats look at the steal library as a list of things to build. I look at it as a list of claims. Every card says, without saying it, that a mechanism *helps people*. My job is to ask how we know that, who it could hurt, and what a 10–30-person classmate pilot that ends on Dec 11 can learn about it.

Most of this file is good news. The steal library is already pointed in a careful direction: ranges instead of scores, quiet by default, sources visible, rest without guilt. But **the evidence behind those mechanisms is thinner than the cards suggest**, and one finding from my research changes the plan more than any design choice: **Columbia's own IRB policy, read literally, puts a pilot like ours inside IRB review** (§B, case 15). That has to be settled with course staff this week, not in December.

Grades follow [[12-research/science-and-tech-evidence|Science and tech evidence]]: **strong** (consistent meta-analyses or large preregistered studies), **moderate**, **weak**, **contested**, and **absent** (no published validation found). `[secondary]` means I only saw coverage or a summary. `^[inferred]` is my reasoning. Power figures marked "CSO calc" are my own normal-approximation arithmetic.

---

## A. The steal library through the CSO's eyes

### A1. Card by card

| Card | Mechanism | Evidence grade | The possible harm | The steal (CSO version) |
|---|---|---|---|---|
| S-01 Google Flights | Today's value on your own usual-range bar | **Moderate** for range-plus-anchor displays (Zikmund-Fisher 2018) | A personal range normalises a chronic deficit: someone who usually sleeps 5 h sees "in your usual range" | Show the range, but never call personal-normal "good"; escalation looks at persistent patterns, not only the personal baseline |
| S-02 Apple Vitals | Speak only when several signals are off your typical range | **Absent** for Vitals itself; **moderate** for persistence rules in general (Apple Heart Study) | Silence reads as "you're fine"; multi-signal rules still fire on stress, exercise and alcohol | Persistence and convergence before speaking; measure the false-alarm rate on synthetic data first; silence is never labelled "all clear" |
| S-03 MyChart | A value, its range, and a person to talk to | **Moderate** that people want results and visible help; **weak** for any specific trigger | Heavy-handed safety steps make people hide what they feel | A three-rung ladder the student controls; no auto-contact; "Talk to someone" always visible |
| S-04 Perplexity | Numbered inline sources | **Contested** for *appropriate* trust | Citations raise trust even when they are random | Sources are timestamped records, not papers; post-check every number; measure whether students open them |
| S-05 Apple Weather | Phrase it as a forecast | **Moderate** (lab experiments) | Forecasting a quantity nobody has validated | Forecast only what we measure (the task), with calibrated wording checked on data |
| S-06 Garmin | Factor breakdown behind a readiness level | **Absent** for the composite; **moderate** for the HRV input | A validated-looking verdict built on an unvalidated sum | Keep the factor rows, drop the score, claim nothing about "readiness" |
| S-07 Rise | Energy curve from sleep debt and circadian rhythm | **Strong** for the two-process model as sleep science; **absent** for the app's predictions | A daily curve treated as fate | Positioning only. Don't predict energy curves |
| S-08 Gentler Streak | Rest counts; no streak shame | **Moderate** that broken streaks reduce later engagement; **weak** that rest framing improves health | An engagement metric that punishes "not now" | A declined break is data, not non-compliance, in the analysis too |
| S-09 BeReal | One prompt, rarely | **Weak–moderate** (prompt effects decay; receptivity varies) | Too few prompts miss the moment; too many cause alert fatigue | A hard cap per session, and log prompts per person per day as a safety metric |
| S-10 Citymapper | One confident next step | **Weak**; recommendations alone didn't beat plain forecasts (Joslyn 2012) | Over-reliance on a confident card | One action with an equally easy "Keep going"; check acceptance against outcomes |
| S-11 Live Activities | Break countdown on the lock screen | **Absent** | Visible to anyone near the phone; needs a native app | Out of pilot scope (open decision #4) |
| S-12 Spotify Wrapped | Shareable recap | **Weak** (theory, not trials) | A shared recap can identify people; a recap of declines can shame | Turn it into the end-of-pilot debrief: each participant gets their own data back, nothing shared |

The detail behind each row:

**S-01 Range, not a number.** The best evidence is Zikmund-Fisher et al. 2018: 1,618 US adults online, randomised displays of hypothetical lab results. Adding a labelled "harm anchor" line ("Many doctors are not concerned until here") cut intent to contact a doctor urgently for a near-normal ALT from 55.8% to 34.7%, and for creatinine from 56.7% to 35.2%. For platelets the difference wasn't significant (44.2% vs 50.0%). So ranges with an anchor **calm worry about near-normal values**. That is exactly what we want for "a bit below your usual", and exactly what we must *not* do for a persistent pattern. The harm is specific to us: a personal baseline compares a student with themselves. Van Dongen 2003 showed that people under chronic sleep restriction stop rating themselves as sleepier while their performance keeps falling. A "usual range" built on a bad month makes the bad month look normal. ^[inferred] **Steal:** the range bar for daily context, plus a separate rule that looks at absolute persistence ("under 6 h on 9 of the last 14 nights"), worded without disease names or "abnormal" (FDA 2026 wellness guidance, via Covington).

**S-02 Speak only when several signals agree.** I found **no published validation of Apple's Vitals app**. Apple's own wording is that it is not designed to detect illness; coverage reports it needs 7 nights to learn typical ranges `[secondary]`. The closest published evidence is two neighbours. First, the **Apple Heart Study** (Perez 2019): its notification fired only after 5 of 6 irregular tachograms within 48 hours (a persistence rule), and its positive predictive value was 0.84 for notifications that arrived while an ECG patch was being worn. Second, Alavi et al. 2022 (Nature Medicine) ran real-time smartwatch alerts on resting heart rate. People who tested *negative* for COVID still averaged 1.3 alerts per 21-day window, mostly after stress, intense exercise and alcohol `[secondary: from search summaries of the paper]`. The lesson for us: **persistence and convergence work, but students' ordinary lives (exams, practice, a party) trip multi-signal rules.** ^[inferred] **Steal:** the rule shape, plus a measured false-alarm rate per student per week on synthetic worlds before any real person sees an alert.

**S-03 MyChart: value, range, a person.** Patients want results immediately (96% of 8,139 in Steitz 2023, in [[09-design/design-evidence|Design evidence]] §3). On escalation, the evidence says people rarely take the strongest rung: only 2.4% of Wysa users in a confirmed crisis called a helpline, while about half used a safety plan or grounding exercise (company report, in Design evidence §4). The newest evidence is sobering. In a 2025 EMA study of 94 adults with recent suicidal ideation, **59.3% of those who recalled ideation during the study underreported or concealed it**. Among those who thought about concealing, 79.6% said they didn't want the study team to contact them, and 55.1% feared an emergency wellness check. **Safety procedures that feel like surveillance make people hide.** **Steal:** the student owns the ladder. Help is always visible, resources come without a condition, nobody is contacted without the student knowing, and coaches are never notified.

**S-04 Inline sources.** Ding et al. (AAAI 2025): citations increased trust **even when they were random**, and trust *fell* when people actually checked them. Liu et al. 2023 found only 74.5% of generative-search citations supported their sentence (in Design evidence §3). So a citation chip is a trust *lever*, not a trust *justification*. Buçinca 2021 (course reading) adds that explanations alone don't reduce over-reliance. **Grade: contested** for appropriate trust. **Steal:** our "sources" are the student's own records (device, time, sync), every number in the LLM's sentence is checked against the model's JSON, and the think-aloud asks "where did it get this from?" to measure whether sources are found, not just shown.

**Frequency framing ("4 of the last 6 times").** Natural frequencies improve probabilistic reasoning: in the cancer-screening problem, 1 of 24 physicians answered correctly with probabilities and 16 of 24 with natural frequencies (Hoffrage et al., Science 2000) `[secondary: cached text and later citations]`. **Strong** for the format. The harm is ours: with a reference class of six, the frequency is mostly noise but *looks* like evidence. ^[inferred] **Steal:** always show n, and abstain from a frequency statement below a pre-set minimum (I'd propose 8 comparable sessions; this is a proposal for the CTO's abstain rule, not a sourced number).

**S-05 Forecast phrasing.** Joslyn & LeClerc 2012: people given uncertainty estimates made better precaution decisions and trusted the forecast more than people given single-value forecasts. A recommendation alone did no better than a single-value forecast `[secondary: abstract and conference record]`. **Moderate.** The harm: "Your focus is likely to dip in the next 30 min" is a forecast of something nobody has validated. Overnight wrist HRV predicting next-day study performance is graded **absent** in our own evidence page. **Steal:** forecast only the measured target (the study task), and attach a wording ladder ("fairly sure", "not sure") that maps to calibrated probability bins we've checked, not to vibes.

**S-06 Garmin factor breakdown.** I found **no independent peer-reviewed validation** of Training Readiness or Body Battery as composites; what exists is vendor material and blogs `[secondary]`. The HRV *input* is reasonable for within-person trends (Garmin CCC 0.87 against ECG, n = 13; Dial 2025, in our evidence page). **Steal:** factor rows are honest ("session length 2 h 40 min · sleep 5 h 12 min"), but we never sum them into a readiness verdict.

**S-07 Rise and the two-process model.** The two-process model (homeostatic Process S plus circadian Process C) is foundational sleep science. Borbély's 2016 reappraisal says it simulates the timing and intensity of sleep across many protocols and has been applied to fatigue and performance `[secondary: abstract via search]`. Rise says its app is built on it, but cites no validation of its daily energy predictions (Rise "About" page, opened). **Steal:** a positioning line and nothing more. We react to the current session and show uncertainty; we don't draw a curve the evidence can't carry.

**S-08 Rest counts, no streaks.** Silverman & Barasch 2023 (seven studies, Journal of Consumer Research): showing an *unbroken* streak raised later engagement compared with a broken one, more so when people blamed themselves for the break `[secondary: abstract]`. So streaks work as an engagement lever, and breaking them drives drop-off. Duolingo's optimised reminders added only 0.5% daily users (Design evidence §2). Self-compassion correlates with health behaviours at r = .25 (Sirois 2015, 15 samples, N = 3,252, correlational and from the authors' own datasets). **Moderate** that streak-breaking hurts engagement; **weak** that rest framing improves health. **Steal:** in the *analysis*, too, a declined suggestion is a valid response. We never report "compliance" as a success metric.

**S-09 Once, rarely.** HeartSteps (Klasnja 2019, n = 37 analysed): any suggestion raised next-30-minute steps by 66% on day 1, declining about 2% per day until undetectable by day 28. Anti-sedentary prompts had no detectable effect. Receptivity depends on time, phone use and context (Künzler 2019, Design evidence §2). Epic's sepsis model alerted on 18% of patients and taught clinicians to ignore it (Wong 2021). **Weak–moderate.** **Steal:** a cap per session, "snooze really snoozes", and a habituation check: plot response by study day.

**S-10 One next step.** Joslyn 2012 found recommendations alone didn't improve decisions over plain forecasts; Buçinca 2021 shows confident AI suggestions invite over-reliance. **Weak.** **Steal:** one action plus "Keep going" at equal weight, and an over-reliance check: did students accept suggestions the model got wrong?

**S-11 Live Activities.** No evidence either way. It needs a native iOS app. **Out of pilot scope.**

**S-12 Wrapped-style recap.** The idea that reflecting on your own data builds self-knowledge is a theoretical premise (Li, Dey & Forlizzi 2010, a stage model from surveys and interviews), not a tested effect. Later work found people reflect even without designed support (Bentvelzen 2021) `[secondary]`. **Weak.** Harms: aggregates re-identify people (95% from 20-minute step data plus demographics; Na 2018, in our evidence page), and a recap of "breaks you skipped" is a streak in disguise. ^[inferred] **Steal:** the recap becomes the **pilot debrief**. Each participant gets their own data back, with no sharing feature during the study.

### A2. The study list, CSO angle

Rows I'd care about from the ~50-product list. Grades are for the mechanism we'd borrow.

| Product | Mechanism to borrow | Evidence | CSO note |
|---|---|---|---|
| Fitbit Daily Readiness, Oura | Withhold until a baseline is learned ("up to two weeks") | Weak (product design) | Supports our 14-night learning period and abstain-first onboarding |
| WHOOP | Lone 0–100 recovery ring | Anti-steal | No defined outcome behind it; a score can't be pre-registered |
| one sec | Easy dismiss as the active ingredient | Moderate, with a conflict of interest (founder co-authored the PNAS study) `[secondary]` | Cite with the conflict stated |
| Duolingo | Streak guilt | Weak benefit (+0.5% daily users) | Anti-steal |
| Pokémon Sleep, Forest | Game loops | Absent for wellbeing | Engagement isn't benefit |
| How We Feel | 3-second mood check-in | Absent as a measure | A check-in item would need a validated scale if we analyse it |
| Apple privacy labels, ATT | Plain two-layer consent | Weak–moderate (early opt-in reportedly ~4%, `[secondary]`) | Plan the pilot to work laptop-only |
| GOV.UK | Plain-language forms | Strong practice, not trials | The model for our consent form (grade-8 reading level) |
| Strava | Opt-in heatmap | Anti-case | Defaults are the policy |
| Our World in Data | Sources tab on every chart | Weak | Matches "every number has a source" |
| NYT "You Draw It" | Guess, then reveal | Weak | A gentle cognitive-forcing step for the debrief, not the live card |

---

## B. Cases

Twenty cases, then seven anti-cases. Each one: what happened (sourced), the principle, and **the steal for a 10–30-person classmate pilot ending Dec 11**.

### B1. How strong digital-health pilots were designed

**1. HeartSteps micro-randomised trial (Klasnja 2019).** 44 adults recruited, 37 analysed, 6 weeks, up to 5 decision points a day. At each available point: 40% no suggestion, 30% walking, 30% anti-sedentary. The primary proximal outcome was steps in the next 30 minutes. Walking suggestions raised steps by 24% on average, but the effect started high and decayed to nothing by about day 29; anti-sedentary prompts had no detectable effect. **Principle:** randomising *moments* instead of *people* gives a small study real statistical power for proximal effects, and shows decay. **Steal:** micro-randomise "suggest vs don't suggest" at eligible break points (open decision #9). With 20 people × 10 study days × 4 eligible moments, that's about 800 randomised decisions `[CSO calc]`. Pre-register the proximal outcome (task score or self-rated fatigue in the next block) and plot the effect by study day.

**2. Kaur et al., CHI 2020 (Microsoft).** 30 workers recruited, 25 with complete data, 4 weeks: three weeks to build models from hourly self-reports, then a **three-day** deployment. 15 people got model-based suggestions and 10 got pseudo-random heuristic ones. Break suggestions were rated well-timed 77% of the time vs 60.6% for the heuristic. But the allocation **wasn't random**: the heuristic group was the people with less data. Only 11 and 8 people stayed active through the deployment, and the authors say the control was there to check for novelty, "not to compare the two conditions". **Principle:** our benchmark number comes from a 3-day, non-randomised, descriptive comparison. **Steal:** keep 77% as a *feasibility* benchmark for perceived timing, never as an effect we must beat. Run our perceived-timing question on *both* arms, randomised, and report it with its n.

**3. The Apple Heart Study (Perez 2019, NEJM).** 419,297 people recruited in 8 months; 0.52% got an irregular-pulse notification. Only 450 (20.8% of those notified) returned an analysable ECG patch, and 34% of those showed atrial fibrillation. The notification's PPV was 0.84 when it arrived during patch wear. Of notified participants who returned a 90-day survey, 57% had contacted a health-care provider. **Principles:** (a) a persistence rule (5 of 6 readings in 48 h) buys precision; (b) even a huge study loses most people at the follow-up step; (c) an alert creates work for someone else. **Steal:** escalation fires on persistence; we plan for most participants to skip optional steps; and we tell Columbia Health's contact, *before* the pilot, that a handful of students may be pointed their way.

**4. MyHeart Counts (McConnell 2017, JAMA Cardiology).** 48,968 people consented in the US; 41.5% gave 4 of 7 days of motion data, 9.3% all 7, and 10.2% did the 6-minute walk test. The sample skewed young and male, and people's perception of their own activity bore little relation to what the sensors measured. **Principle:** consent is not engagement. Attrition is steep and non-random. **Steal:** report a CONSORT-style flow (invited → consented → familiarised → completed ≥ 70% of sessions), set a minimum data rule *before* the pilot, and analyse everyone randomised.

**5. StudentLife (Wang 2014, Dartmouth).** 48 undergraduates, one 10-week term, passive smartphone sensing linked to PHQ-9 and other surveys. Sleep and conversation correlated with lower depression scores; a 2015 follow-up predicted GPA. It won a 10-year impact award `[secondary: Dartmouth pages and coverage]`. **Principle:** a single term with one class of students is feasible and publishable, but the term itself shapes the data (deadlines, midterms). **Steal:** record calendar context (exam weeks) as a covariate, and state that our pilot sits in the last weeks of term, the most stressful stretch.

**6. Digital phenotyping in students vs the world (Müller 2021, Scientific Reports).** GPS mobility predicted depression with AUC 0.82 in 57 students, but only 0.57 ("only slightly higher than chance") in 5,262 US adults. Subgroup models, clustering, non-linear models and feature selection didn't fix it. **Principle:** a homogeneous student sample flatters a model. **Steal:** any result from our classmates is labelled "Columbia BINF 4070 classmates, n = X", and the writeup says it may not generalise even to other Columbia students.

### B2. Candidate study tasks

**7. PVT-B (Basner 2011).** A 3-minute version of the 10-minute Psychomotor Vigilance Test, with a 355 ms lapse threshold and 1–4 s intervals, validated in 74 adults (31 total sleep deprivation, 43 partial). Effect sizes averaged 22.7% smaller than the full PVT but stayed large for total sleep loss. The paper notes the standard PVT shows no evidence of learning across repetitions, and says PVT-B's validity "still needs to be established" in applied settings. **Steal:** the strongest candidate for open decision #2. It's short, sensitive to sleep loss and resistant to practice. But it measures vigilance, not studying. That is a **proxy gap** we must name (the Obermeyer lesson: bias and error enter through the label). The 355 ms threshold "may depend on PVT hardware", so we must pilot it on students' own laptops and phones.

**8. Practice effects (Bartels 2010).** 36 healthy adults, 7 sessions over a year: practice gains of d = 0.36 to 1.19, largest early, with a plateau after about 3 months of frequent testing. Few tests were immune. **Steal:** 2–3 familiarisation runs before any outcome session, session number in the model, and counterbalanced condition order. **Analysis rule:** never compare an early session with a late one and call the difference an effect.

**9. Stroop and the reliability paradox (Hedge 2018).** Over a three-week retest, the Stroop interference cost had an ICC of .60 to .66 and the flanker cost .40 to .57, lower than their own component reaction times (.66–.74). Robust *group* effects come from low between-person variability, which is exactly what makes them poor at ranking individuals. **Steal:** don't use a difference score (Stroop cost) as a person's fatigue signal. If we use Stroop at all, model raw RTs and accuracy, and estimate within-person reliability in the familiarisation sessions.

**10. n-back (Jaeggi 2010).** The authors concluded the n-back is a weak measure of individual differences because of poor reliability; only 2- and 3-back reached reliability above .80, with ceiling effects at lower loads `[secondary: abstract]`. It's also effortful and feels like a test. **Steal:** a poor first choice for a 3-minute, repeated, mid-study task. Keep it in the "considered and rejected" table in the protocol.

**11. Typing tasks (Giancardo 2015, Scientific Reports).** In 14 volunteers woken from deep sleep, a keystroke-timing classifier detected impairment with AUC about 0.93/0.91; plain typing speed alone gave 0.73/0.79 `[secondary: abstract]`. Tiny sample, sleep inertia rather than daytime fatigue. **Steal:** a typing task would sit uncomfortably with our ground rule "no keystrokes". Even a fixed-text typing test captures key-timing data the consent form must explain. Not recommended for v1. ^[inferred]

### B3. Evidence standards frameworks

**12. NICE Evidence Standards Framework.** Tiers by risk and purpose. In the 2018 version, tier 3a covered preventive behaviour change (smoking, alcohol, eating, sleeping, exercise) and self-management; the refreshed version merged 3a and 3b into tier C, now described as treating and diagnosing conditions and likely regulated `[secondary: Covington 2018, search summaries; NICE pages returned 403]`. **Steal:** we're at the low end (wellness, behaviour support). The honest claim at our tier is "a plausible mode of action that is viewed as useful and relevant" (tier 1 minimum, as quoted by Covington), plus feasibility data. Not effectiveness.

**13. APA App Evaluation Model.** Six steps: background, access, privacy and security, clinical foundation, usability, and integration toward patient goals. The clinical-foundation questions include whether the app has been studied in its intended users across demographics and whether retention is disclosed. The privacy questions include "Can users opt out … or delete their data?" and how the app responds to safety concerns (APA page, opened). **Steal:** use the APA questions as our **pre-pilot self-audit checklist**. It costs about 2 hours and gives the writeup a recognised external frame.

**14. FDA General Wellness guidance (revised 6 Jan 2026).** Non-invasive wellness wearables may say "evaluation by a healthcare professional may be helpful" when outputs fall outside wellness ranges. They may not name diseases, call outputs "abnormal", give clinical thresholds or treatment, or run ongoing disease-management alerts (Covington summary, opened). Covington notes the guidance doesn't define "ranges appropriate for general wellness use". **Steal:** a wording lint for every escalation string ("abnormal", disease names, "diagnose", "clinical" all fail the check). Note for the team: whether our product is a wellness product is a regulatory question for someone qualified, not for this seat.

### B4. Consent and human-subject review

**15. Columbia IRB "Students as Researchers" policy (effective 16 Mar 2012).** The policy text I opened says Columbia applies IRB requirements to **all** human-subjects research by students, federally funded or not, and that "research that may constitute Exempt Research must also be submitted to the IRB for a determination". Course projects skip IRB submission **only** if they meet **all four** criteria: a campus or public setting; only learning research techniques, "not designed to potentially advance the literature"; no more than minimal risk; and **anonymous** data collection (no direct identifiers, no linkable codes, no combination of indirect identifiers that could identify someone). It adds: "Research conducted over the internet will not be permitted under this category." The companion guidance strongly recommends submitting "within the first three weeks of the semester" for same-semester projects. **Why this matters:** a pilot that links wearable data to a person over OAuth and a hosted backend, over several days, looks like it fails the anonymity criterion and the internet clause. ^[inferred] Usability think-alouds with no health data and no identifiers might be different. ^[inferred] **I'm not deciding this. The policy is 2012 and may have been superseded.** **Steal:** email course staff this week with the specific question list in §F, and ask whether the instructor already holds a class-wide determination (the policy allows one). Recruit nobody until the answer is in writing.

**16. The federal definitions.** As quoted inside Columbia's policy: research is "a systematic investigation … designed to develop or contribute to generalizable knowledge"; a human subject is a living person about whom an investigator obtains data "through intervention or interaction" or "identifiable private information"; minimal risk means harm "not greater in and of themselves than those ordinarily encountered in daily life". **Steal:** the course rewards "evaluation with real users", and a writeup that reports effect sizes looks like generalizable knowledge. That tension is exactly what to put in front of course staff, rather than resolving it ourselves.

**17. Consent when the recruiter is a peer.** No single paper here. It's the principle in our non-negotiables, backed by the course's own framing and the dark-pattern advisories in Design evidence §5 ("dark patterns are about effect, not intent"). **Steal:** recruiters are never people who grade the participant. Participation never affects anyone's grade. Withdrawal is one tap, costs nothing, and deletes the data. Recruiting copy is checked line by line against the consent form.

### B5. Safety and escalation in digital mental-health studies

**18. Concealment under safety protocols (2025 EMA study, PMC12530944).** Covered in A1 under S-03: 59.3% underreported or concealed ideation, mostly to avoid study-team contact or a wellness check. 53.5% of those who gave recommendations would only be fully comfortable reporting if some safety procedures were not required. The researchers recommend a standardised consent script, time during consent to discuss reporting concerns, text or call options, and **automated crisis resources as an alternative to staff contact**. **Steal:** we don't screen for suicidality at all. We aren't qualified, and asking would oblige a response we can't staff. ^[inferred] Resources are always visible, and the consent form says plainly what the team will and won't do if a participant writes something worrying.

**19. Safety protocols in youth intensive longitudinal studies (Bai, Babeva, Kim & Asarnow, review).** Nearly all studies used preventive steps before surveys began; studies that assessed suicidality all had staff-led follow-up; there was no evidence that intensive assessment increased ideation, attempts or deaths. The authors propose matching procedures to each study's needs. A separate review (Bentley 2021, 61 studies) found no common approach `[secondary: search summaries]`. **Steal:** a one-page safety procedure: who on the team reads free-text responses, how often, what counts as an emergency, the script, and the numbers, and a **rehearsal before day 1**.

**20. Wysa's crisis data (company report, in Design evidence §4).** About 19,000 users in a confirmed crisis; 2.4% called a helpline; about half used a safety plan or grounding exercise. **Steal:** the three-rung ladder (talk now · book a time · something for right now), with the 2-minute grounding option as a real rung, not a consolation prize.

### B6. Anti-cases

**A1. Lumosity and the FTC (Jan 2016).** Lumos Labs claimed its games improved performance at work and school and could delay cognitive decline, and that science backed this. The FTC called the claims unsupported; Lumos paid $2 million (with a suspended $50 million judgment) and must hold "competent and reliable scientific evidence" before future performance claims. The FTC's consumer-protection director said Lumosity "simply did not have the science to back up its ads" (FTC press release). **Principle:** "improves performance in school" is a regulated claim. **Steal:** our copy never says breaks improve grades, focus or performance. The evidence for performance on demanding cognitive tasks is null (d = −.09, Albulescu 2022).

**A2. Ego depletion (Hagger 2016).** A 23-lab preregistered replication found d = 0.04 for the "willpower battery" (in our evidence page). **Principle:** a famous, intuitive effect can vanish under preregistration. **Steal:** no "mental battery" or "focus fuel" language, and our own result gets the same scrutiny.

**A3. GPS depression models (Müller 2021, case 6).** 0.82 in students, 0.57 in the world. **Steal:** no generalisation claims beyond the sample.

**A4. Tessa, NEDA's chatbot (May–Jun 2023).** An eating-disorder prevention chatbot recommended a 500–1,000-calorie daily deficit and weekly weigh-ins to a user; NEDA took it down within a day. NPR reported the problem arrived when AI capabilities were added to a rule-based design (NPR, opened via search coverage). **Principle:** a safe scripted tool can become unsafe the day an LLM is added. **Steal:** our LLM only verbalises the model's JSON. Allowlisted actions. A red-team set (a student mentions not eating, an athlete cutting weight, self-harm language) runs before the pilot, and every output is logged for the safety reviewer.

**A5. Facebook's emotional contagion study (Kramer 2014, PNAS).** Feeds were manipulated under the platform's data-use policy. PNAS published an Expression of Concern that the study "may have involved practices that were not fully consistent with the principles of obtaining informed consent and allowing participants to opt out". **Principle:** terms of service are not consent, and changing what someone sees *is* an intervention. **Steal:** our randomisation changes what a participant sees, so the consent form says so explicitly: "Sometimes the app will suggest a break at a fixed time and sometimes at a time it chooses; we won't tell you which in the moment."

**A6. Epic Sepsis Model (Wong 2021).** External AUC 0.63; it missed 67% of cases while alerting on 18% of patients (casebook C2). **Steal:** measure our false-alarm rate per student per day, and cap prompts.

**A7. Sham sleep feedback (Gavriloff 2018).** Telling 63 adults with insomnia they had slept badly, falsely, worsened next-day alertness (d = 0.79) and sleepiness (d = 0.55) (Design evidence §1). **Principle:** our output is itself an intervention on how people feel. **Steal:** sleep is context, never a grade; "hide sleep details" is available; and post-pilot we ask whether the card made anyone feel worse.

---

## C. CSO principles for this project

1. **Twelve people can tell us whether it runs and roughly how big the effect might be. They can't tell us it works.** The pilot is feasibility plus estimation. Within-person n = 20 detects dz ≈ 0.63; n = 12 detects about 0.81 (80% power, two-sided α = .05, CSO calc). The plausible effects here are smaller than that.
2. **Pre-register before anyone sees outcome data.** One primary outcome, the analysis, the exclusions and the stopping rule, timestamped (AsPredicted or OSF). Anything changed later is reported as a deviation.
3. **Randomise moments, not people** (HeartSteps), and counterbalance blocks.
4. **Familiarise first.** Practice effects (d up to 1.19) dwarf anything a break could do.
5. **Name the proxy gap.** PVT-B measures vigilance, not learning. The writeup says so in the first paragraph of results.
6. **A benchmark is not a bar.** Kaur's 77% came from 3 days and 11 people without randomisation. We report ours beside it, not against it.
7. **Escalate on persistence and convergence, and on the student's own words.** Never on one night. Every trigger gets a measured false-alarm rate on synthetic data before any person sees it.
8. **Help without surveillance.** Resources are always visible. No auto-contact. No coach or staff notification. Consent says plainly what the team will do.
9. **The output is an intervention.** Telling someone they slept badly can make them feel worse. Ask afterwards.
10. **Consent that is truly free:** grade-8 wording, no recruiter who grades the participant, one-step withdrawal with deletion.
11. **Every claim carries its n and its interval.** Banned from the writeup: "proves", "significant" from the pilot, "improves performance", "clinically validated".
12. **Subgroups:** report them where n allows, and say plainly what we couldn't look at (athletes, skin tone, device brand). Never claim fairness.
13. **The person who wants it to work isn't the only one who analyses it.** A second team member re-runs the pre-registered script blind to condition labels. ^[inferred]

---

## D. Top 10 study and safety steals, ranked

Hours are team hours, my estimate `[assumption]`. Deadlines work back from Dec 11 and the Dec 4 integration checkpoint.

| Rank | Steal | From | Cost | Deadline |
|---|---|---|---|---|
| 1 | Ask course staff the IRB question list; recruit nobody until the answer is in writing | Columbia policy (case 15) | 2 h | Email by Nov 7; answer needed by Nov 14 |
| 2 | Choose the study task: PVT-B as the lead option, with 2–3 familiarisation runs | Basner 2011, Bartels 2010 | 6 h (build and time it on real laptops and phones) | Decide Nov 11 (written draft) |
| 3 | Pre-register one primary outcome, the analysis and the stopping rule | Nosek 2018; principle 2 | 4 h | Before the first participant session (~Nov 18) |
| 4 | Micro-randomise suggest vs don't at eligible moments, within person | HeartSteps | 6 h (policy plus logging) | Nov 18 |
| 5 | Written escalation procedure plus a rehearsed drill; Columbia numbers verified, kept in config | Wysa, EMA concealment study, Bai review | 5 h | Drill done by Nov 20 |
| 6 | False-alarm rate for every trigger on synthetic worlds | Apple Heart Study, Alavi 2022, Epic | 4 h (with the CTO's generator) | Nov 20 |
| 7 | Consent form (grade 8) and recruiting copy matched line by line; recruiter not a grader | Facebook anti-case; Design evidence §5 | 4 h | With the IRB submission, or Nov 14 |
| 8 | Wording lint: FDA 2026 wellness limits plus the banned-claims list | FDA 2026; Lumosity | 2 h | Before the Dec 4 checkpoint |
| 9 | CONSORT-style flow, habituation-by-day plot, and abstention rate as first-class results | MyHeart Counts, HeartSteps, Beede 2020 | 3 h | Analysis script ready Dec 1 |
| 10 | Debrief recap: each participant gets their own data back; exit question "did it make you feel worse?" | Wrapped → debrief; Gavriloff | 3 h | Dec 8 |

Total: about 39 team hours `[assumption]`, the cost of one person for one week. Items 1 and 2 block everything else.

**The draft primary outcome I'd recommend (for the team to decide, #3):** the within-person difference in PVT-B mean response speed (1/RT) at the end of study blocks with adaptive suggestions vs fixed-schedule suggestions. Report it as an effect size with a 95% confidence interval and the spread across people. **Key secondary (exploratory):** self-rated fatigue (the outcome breaks most plausibly move, d ≈ .35 in Albulescu 2022), perceived timing compared with Kaur's 77%, and the feasibility metrics (sync uptime, suggestions delivered, abstention rate, false alarms, safety events). **Why not fatigue as the primary?** It's self-reported and unblinded: people know when they took a break. Why not perceived timing? It's process, not benefit. The trade-off is real; a team member could reasonably choose fatigue instead. ^[inferred]

---

## E. Anti-steals and warning signs

**Anti-steals (never copy these):**
- **A single readiness score.** It has no defined outcome, so it can't be pre-registered or validated.
- **Citation chips as proof.** Random citations raise trust too (Ding 2025).
- **"Improves focus / performance / grades".** That's the Lumosity claim, and the evidence for demanding cognitive work is null.
- **Streaks and "compliance".** Including in the analysis: a declined break isn't a failure.
- **Screening for crisis by asking about suicidality.** We aren't staffed to respond, and heavy procedures cause concealment.
- **Auto-contacting anyone,** and any coach or staff view.
- **Reporting the best of several outcomes,** or any change of outcome after looking without saying so.
- **Pooling HRV across device brands,** or claiming anything about athletes from a non-athlete sample.

**Warning signs (stop and call the CSO and the team):**
- Someone says "let's just look at the data quickly" before pre-registration is timestamped.
- A recruiter is a TA, a grader, or someone a participant can't comfortably refuse.
- The proposal or demo uses "significant", "proves", "validated", "abnormal", or names a disease.
- An escalation trigger fires on synthetic data for more than about 1 in 10 healthy simulated students per week (a proposed threshold to tune, `[assumption]`).
- Response to suggestions falls steadily by study day (habituation): report it, don't hide it.
- More than 20% of planned sessions are missing (a proposed threshold, `[assumption]`): the result becomes a missing-data story, not an effect.
- A participant's free text mentions harm, not eating, or wanting to disappear. The safety procedure runs, and nobody improvises.
- The LLM produces a number that isn't in the model's JSON.
- Recruiting starts before the written IRB and course-staff answer.

---

## F. What we know / what we don't know yet

### Known (with links)

- **The core claim is open.** Micro-breaks reduce fatigue (d = .35) but not performance on demanding cognitive tasks (d = −.09); no RCT shows adaptive beats fixed timing → [[12-research/science-and-tech-evidence|Science and tech evidence]] §1, §3.
- **Power at our scale:** between-group 20 per arm detects only d ≈ 0.89; within-person n = 20 detects dz ≈ 0.63 → evidence page §8; my n = 12 figure is in §C.
- **The closest prior art's 77%** comes from a 3-day, non-randomised deployment → case 2 here; [[24-synthesis/casebook|Casebook]] C8.
- **PVT-B** is a 3-minute test, sensitive to sleep loss, with little learning on the standard PVT → case 7.
- **Practice effects** run d = 0.36–1.19 → case 8.
- **Escalation copy:** FDA's 2026 wellness limits and safe-messaging rules → [[09-design/design-evidence|Design evidence]] §4; case 14.
- **Heavy safety procedures cause concealment** → case 18.
- **Columbia's 2012 policy** sends non-anonymous, internet-based student projects to the IRB → case 15; [[10-trust-safety/privacy-and-consent|Privacy and consent]] has no consent form yet.
- **Wearable numbers are estimates;** HRV is reasonable for within-person trends only → [[21-concepts/wearable-measurement-error|Wearable measurement error]].
- **The evaluation plan's two questions** (prediction vs intervention) and release gates → [[12-research/evaluation-plan|Evaluation plan]]; the abstain rule → [[04-agent-engine/performance-model|Performance model]].
- **Course bar:** evaluation with real users is a "would love to see", while overclaiming and unsafe outputs are "must not have" → [[30-course/project-requirements|Project requirements]].

### Unknown: how to find out, who, by when

Owner names are left for the team to assign. The roles are my suggestion.

| Unknown | Why it matters | How to find out | Who | By when |
|---|---|---|---|---|
| Is IRB review needed (#11)? Does the instructor hold a class-wide determination? Is the 2012 policy current? | It decides whether any real-person pilot can happen before Dec 11 | Email course staff with the question list below; if told to, contact Columbia's IRB office (HRPO) | One team member sends it; the CSO drafts the questions | Send Nov 7; written answer by Nov 14 |
| The study task (#2) | Nothing can be validated without it | Build PVT-B; run it 5 times on 2–3 team laptops and iPhones; check timing jitter and completion time | CTO builds, CSO specifies | Nov 11 |
| The primary outcome and threshold (#3) | It must be fixed before data | Team picks from the §D draft; pre-register it | Team decides; CSO drafts the text | Nov 14 |
| Randomisation level (#9) | Power and carryover | Simulate micro-randomised vs block-crossover on synthetic data; compare detectable effects | CSO and CTO | Nov 14 |
| Practice effects on *our* PVT-B build | Practice could swamp the effect | Familiarisation data from team self-tests (not research data); then 2–3 runs per participant | CSO | Nov 18 |
| Escalation thresholds and their false-alarm rate (#12) | False alarms teach people to ignore us; misses leave people alone | Run each candidate trigger on the synthetic worlds (plausible, null, short-sleeper, athlete); report fires per simulated student per week | CSO specifies; CTO runs; UIUX designs the screens | Nov 20 |
| How common short sleep is among classmates | A "9 of 14 nights under 6 h" trigger could fire for many healthy students | Find a sourced US college sleep prevalence figure (not found in this pass); otherwise treat it as unknown and tune on pilot data, labelled exploratory | CSO | Nov 20 |
| Columbia crisis and counselling numbers | Our pages conflict; a wrong number is a safety failure | Call or email Columbia Health / Counseling and Psychological Services; record date and contact; keep numbers in config | One team member | Nov 20, before any participant |
| Athletes (#10) | Low HRV in training can mean good adaptation (Plews 2017); our classmates are probably not athletes | Ask at recruitment (optional, consented); if fewer than about 5, the writeup says "no athlete conclusions" | CSO | At recruitment |
| Device mix | HRV can't be pooled across brands | Record device per participant; analyse within person only | CTO | At onboarding |
| Habituation over a short pilot | HeartSteps' effect died in about 4 weeks; our pilot is about 2 | Plot response by day; report the slope | CSO | Dec 6 |
| What the consent form must say about the LLM provider | Retention terms differ by provider | CTO confirms provider and retention (#8, #16); CSO writes it into consent | CTO and CSO | Nov 14 |

**Question list for course staff (draft):**
1. Does our classmate pilot count as human-subjects research under Columbia's policy, or as a course exercise? Do you, as instructor, hold a class-wide determination?
2. It would collect identifiable wearable data (sleep, heart rate, HRV) over OAuth into a hosted database for about 2 weeks. Does that change the answer?
3. Is a no-data usability test (think-aloud on synthetic screens, no identifiers) treated differently?
4. If submission is needed, is there a fast route this late in the term, and who is the faculty PI?
5. May classmates in the same course participate, and what rules apply to recruiting peers?
6. Can we report pilot results in the public writeup and repo if only aggregates appear?

If the answer is "submit and wait", the fallback is to run the full protocol on **synthetic data only**, plus whatever usability sessions course staff approve. The writeup then reports a ready-to-run, pre-registered protocol. That is weaker evidence but fully honest, and it passes the course's "must not have" list. ^[inferred]

---

## G. Sources

Opened in this session (2026-11-04) unless marked `[secondary]` or "via vault".

**Pilot design**
- Klasnja 2019, HeartSteps MRT: https://academic.oup.com/abm/article/53/6/573/5091257
- Kaur 2020, CHI: https://www.microsoft.com/en-us/research/uploads/prod/2020/02/Modeling-Opportune-Moments-for-Transitions-and-Breaks-at-Work.pdf
- Perez 2019, Apple Heart Study (eScholarship copy): https://escholarship.org/content/qt5n08v244/qt5n08v244.pdf
- McConnell 2017, MyHeart Counts: https://pubmed.ncbi.nlm.nih.gov/27973671/ `[secondary: abstract via search]`
- Wang 2014, StudentLife: https://studentlife.cs.dartmouth.edu/dataset.html `[secondary]`
- Müller 2021, GPS and depression: https://pmc.ncbi.nlm.nih.gov/articles/PMC8263566/

**Study tasks**
- Basner 2011, PVT-B: https://pmc.ncbi.nlm.nih.gov/articles/PMC3197786/
- Bartels 2010, practice effects: https://pubmed.ncbi.nlm.nih.gov/20846444/ `[secondary: abstract]`
- Hedge 2018, reliability paradox: https://pmc.ncbi.nlm.nih.gov/articles/PMC5990556/
- Jaeggi 2010, n-back validity: https://stafforini.com/works/jaeggi-2010-concurrent-validity-back/ `[secondary]`
- Giancardo 2015, typing and impairment: https://dspace.mit.edu/handle/1721.1/97224 `[secondary]`

**Standards and regulation**
- NICE ESF (Covington 2018 summary; NICE pages returned 403): https://www.covingtonblogs.com/2018/12/12/nice-adopts-evidence-standards-for-the-development-and-assessment-of-digital-health-technologies-dhts/
- APA App Evaluation Model: https://www.psychiatry.org/psychiatrists/practice/mental-health-apps/the-app-evaluation-model
- FDA General Wellness 2026 (Covington): https://www.cov.com/en/news-and-insights/insights/2026/01/fda-issues-revised-guidance-on-general-wellness-products
- Columbia IRB "Students as Researchers" policy: https://gsas.columbia.edu/sites/default/files/content/docs/StudentresearchPolicy.pdf
- Columbia IRB student research guidance (2012): https://research.columbia.edu/sites/default/files/content/HRPO/StudentresearchguidelinesFINAL031612.pdf

**Safety and escalation**
- EMA concealment study (2025): https://pmc.ncbi.nlm.nih.gov/articles/PMC12530944/
- Bai et al., safety in youth ILM research: https://www.suicideinfo.ca/resource/future-directions-for-optimizing-clinical-science-safety-ecological-momentary-assessments-in-suicide-self-harm-research/ `[secondary]`
- Wysa crisis report, safe messaging, Steitz 2023, Gavriloff 2018, Künzler 2019: via vault ([[09-design/design-evidence|Design evidence]] sources)

**Mechanism evidence**
- Zikmund-Fisher 2018, harm anchors: https://pmc.ncbi.nlm.nih.gov/articles/PMC5891666/
- Ding 2025, citations and trust: https://arxiv.org/abs/2501.01303v1
- Hoffrage 2000, natural frequencies: https://doi.org/10.1126/science.290.5500.2261 `[secondary]`
- Joslyn & LeClerc 2012, uncertainty forecasts: https://www.sci.utah.edu/~kpotter/Library/Papers/joslyn:2012:UFID/index.html `[secondary]`
- Silverman & Barasch 2023, broken streaks: https://doi.org/10.1093/jcr/ucac029 `[secondary]`
- Sirois 2015, self-compassion: https://pubmed.ncbi.nlm.nih.gov/25243717/ `[secondary]`
- Borbély 2016, two-process reappraisal: https://doi.org/10.1111/jsr.12371 `[secondary]`
- Rise Science "About": https://www.risescience.com/about-us
- Alavi 2022, smartwatch alerting: https://doi.org/10.1038/s41591-021-01593-2 `[secondary]`
- Apple Vitals coverage: https://www.macrumors.com/2024/10/07/apple-watch-vitals-detects-illness-before-symptoms `[secondary]`
- Li, Dey & Forlizzi 2010, personal informatics: https://ianli.owlstown.net/publications/17-a-stage-based-model-of-personal-informatics-systems `[secondary]`
- Garmin readiness validation: none found (search only) `[secondary]`

**Anti-cases**
- FTC on Lumosity: https://www.ftc.gov/news-events/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges
- Kramer 2014 Expression of Concern: https://pmc.ncbi.nlm.nih.gov/articles/PMC4115552/
- NEDA Tessa: https://www.npr.org/2023/06/08/1181131532/eating-disorder-helpline-takes-down-chatbot-after-it-gave-weight-loss-advice `[secondary: search coverage]`
- Hagger 2016, Wong 2021, Albulescu 2022, Van Dongen 2003, Plews 2017, Na 2018, Button 2013, Nosek 2018: via vault ([[12-research/science-and-tech-evidence|Science and tech evidence]] sources)

**Course readings used:** Beede 2020, Kelly 2019, Obermeyer 2019, Sjoding 2020, Buçinca 2021, Estrin 2014 and Amershi 2019, via `30-course/readings/`.

## Related

- [[09-design/steal-library|Steal library]] · [[13-team/exec-team|AI exec team]] · [[24-synthesis/open-decisions|Open decisions]] · [[12-research/evaluation-plan|Evaluation plan]] · [[10-trust-safety/privacy-and-consent|Privacy and consent]] · [[03-users/ux-research-plan|UX research plan]] · [[04-agent-engine/algorithm-book|Algorithm book]]

---

## H. Unknowns resolved (2026-11-05)

*Desk work by the CSO seat on 2026-11-04 (US Eastern). It covers U10 and U9 from the [[13-team/pre-build-briefing|Pre-build briefing]] §5 as far as public pages and a simulation allow. Nobody has phoned anyone yet.*

### H.1 Columbia counselling and crisis numbers (U10)

**Status of every number below: verified on the official web page, still to be confirmed by phone or email before any participant.** All pages were opened on 2026-11-04 in a browser. Automated fetches of health.columbia.edu return 403, so read them in a browser.

| What | Number | Page (URL) | Notes |
|---|---|---|---|
| **CPS, Morningside: main line and 24/7 phone support** | **212-854-2878** | https://www.health.columbia.edu/content/hours-and-locations | Lerner Hall 8th floor; Mon–Thu 8 a.m.–7 p.m., Fri 8 a.m.–5 p.m.; "Phone support is available 24/7" on the same number |
| Same number, urgent mental-health concern | 212-854-2878 | https://www.health.columbia.edu/content/emergency (page "Last updated: 12/2/2025") | "call CPS immediately … available 24/7" |
| Same number | 212-854-2878 | https://www.health.columbia.edu/content/self-help-and-crisis-resources | "24/7 support for urgent concerns" |
| Same number (Morningside/Manhattanville; also TC and UTS) | 212-854-2878 | https://universitylife.columbia.edu/emergency-mental-health-resources | Also lists it as the out-of-hours on-call clinician for JTS |
| CPS urgent drop-in | (walk-in) | hours-and-locations (above) | Lerner 502, Mon–Thu 5:30–8:00 p.m. (check-in closes 7:30). There's a student-athlete drop-in on Mondays 6–8 p.m. in DFC 321 |
| Who answers CPS after hours | n/a | https://universitylife.columbia.edu/24-7-support (a **2018** post) | A contracted telephone service (Protocall), with a CPS clinician on call. It may be out of date: ask when we call |
| **988 Suicide & Crisis Lifeline** | **988: call, text or chat** | https://www.health.columbia.edu/content/emergency ; https://988lifeline.org/ | 988lifeline.org: call, text or chat, "available 24/7/365". Chat: https://988lifeline.org/chat/ |
| Crisis Text Line | text HOME to 741741 | self-help-and-crisis-resources (above) | 24/7 |
| Emergency | 911 | emergency page (above) | |
| Public Safety, Morningside | 212-854-5555 | emergency page; University Life page | Both pages agree |
| Mount Sinai Morningside ER / psychiatric ER | 212-523-3335 / 212-523-3347 | emergency page | 1111 Amsterdam Ave at 113th St |
| Medical Services (24 h triage) | 212-854-7426 | emergency page; University Life ("after hours, press 4") | Not a mental-health line; listed for completeness |
| **CUIMC students** | 212-305-3400, **option 7** after hours | https://www.studenthealth.cuimc.columbia.edu/about-us/after-hours-care | Answered after hours by TELUS Health Student Support. University Life also lists TELUS at 877-297-1198 (24/7) for CUIMC students |
| **Barnard students**: Furman Counseling Center | 212-854-2092; after hours **option 1** (Psychological Emergency Line) | https://barnard.edu/health-wellness/student-health/afterhours ; https://barnard.edu/health-wellness/student-counseling | Weekdays 9–5; the after-hours line covers "currently registered Barnard students only". Barnard Community Safety: 212-854-6666 |

**Conflicts found.** The CPS number is consistent across all four pages, so the earlier "numbers conflict" note no longer applies to CPS. The conflicts are elsewhere:
1. **Public Safety numbers differ** between the Columbia Health emergency page and the University Life page:
   - Manhattanville: 212-854-5555 vs 212-853-3333;
   - CUIMC: 212-305-7979 vs 212-305-8100;
   - Barnard: 212-854-3362 vs 212-854-6666;
   - Columbia Health gives 212-853-3333 for Teachers College, while University Life gives TC as 212-678-3333.
2. **A typo on Barnard's after-hours page:** campus safety is printed as "1-212-854-666" (a digit missing). Barnard's counselling page gives (212) 854-6666.
3. **Barnard's after-hours number:** search results show some Barnard pages with a "Clinician on Call" at 855-622-1903 `[secondary: search snippet; the Furman page returned 403]`. University Life lists 855-622-1903 for Barnard *primary care* after hours. The two Barnard pages I opened both say 212-854-2092, option 1.
4. **Which campus applies to us:** Morningside, CUIMC and Barnard students each have a different counselling line. The config needs the participant's school, or it should show all three with plain labels. ^[inferred]

**How to settle (before any participant):** one team member calls CPS's main line during office hours (it is not a crisis call) or emails Columbia Health. Ask:
- Is 212-854-2878 the right 24/7 number to give students in a wellness study?
- Who answers after hours?
- Is there a text option?
- What should a study app show CUIMC and Barnard participants?

Record the date, the role of the person who answered (not their name), and the answers. Keep the numbers in config, not code. Re-check the pages the week the pilot starts.

### H.2 How common short sleep is among students (U9, part 1)

| Source | n, method | Figure |
|---|---|---|
| Creswell et al. 2023, PNAS, https://doi.org/10.1073/pnas.2209123120 (full text via Europe PMC, PMC9974458) | 634 first-year students, 3 US universities, Fitbit, about 1 month | **Mean nightly sleep 6 h 37 min, between-person SD 51 min. 19% (Table 4: 107/557) to 21% (Discussion) averaged under 6 h.** Only 5% averaged 8 h or more. About 66% averaged under 7 h (CSO calc from the Table 4 bins) |
| Okano et al. 2019, npj Sci Learn, https://doi.org/10.1038/s41539-019-0055-z (PMC6773696) | 88 students, Fitbit Charge HR, 14-week semester, 89.4% wear | Mean 7 h 8 min. SD of person means 41 min; SD of all nightly samples 1 h 48 min, so **night-to-night SD is about 100 min at most** (CSO calc; includes device error) |
| ACHA-NCHA III Spring 2025 (already in [[24-synthesis/market-map|Market map]] §2) | 47,194 undergraduates, self-report | 41.9% under 7 h on weeknights |

**What this means.**
- **About 1 in 5 students averages under 6 h by wearable** (n = 634, three schools; not Columbia).
- Self-report (41.9% under 7 h) and actigraphy (about 66% under 7 h) differ a lot, so a trigger tuned on one won't transfer to the other. Our trigger runs on device data, so I calibrated it to Creswell.
- **No source found** directly reports students' within-person night-to-night SD, or how often a student has 9 or more short nights in 14. Those are modelled, not known.

### H.3 Escalation false-alarm rate (U9, part 2): simulation, not evidence

- **Files:** `research/algo/escalation-trigger-sim/sim.py` (seeded, standard library only) and `results.md` (full output, seeds 3001–3003, every assumption).
- **Population:** 20,000 synthetic students × 14 nights.
- **Assumed groups:** typical 82%, healthy short sleepers 10%, persistent short sleep 8%. The mixture reproduces Creswell: simulated mean 6.66 h, SD of person means 0.84 h, 17.6% with a 14-night device mean under 6 h.
- **Second signal:** an optional daily one-tap check-in. **How well it separates the groups is assumed, not sourced.**

| Trigger (needs ≥ 10 valid nights) | Flagged / 2 wk (base) | Healthy short sleepers flagged | Persistent group reached | Flags outside persistent group | Flags per 20 students / 2 wk | Weak check-in run: flagged / reached / outside |
|---|---|---|---|---|---|---|
| T1 ≥ 9 of 14 nights < 6 h | 7.4% | 11.2% | 52.7% | 41.5% | 1.47 | 7.3% / 51.7% / 44.0% |
| T2 ≥ 10 of 14 nights < 6 h | 4.5% | 5.4% | 35.5% | 34.9% | 0.89 | 4.3% / 34.7% / 36.3% |
| T3 14-night mean < 5.5 h | 7.5% | 7.3% | 61.1% | 33.0% | 1.49 | 7.3% / 60.9% / 33.8% |
| T5 T1 + ≥ 2 low check-ins | 4.6% | 2.9% | 46.2% | 17.7% | 0.92 | 3.1% / 27.4% / 29.5% |
| T6 T1 + ≥ 3 low check-ins | 3.2% | 0.8% | 36.7% | 7.4% | 0.65 | 1.3% / 12.9% / 20.0% |
| **T8 T3 + ≥ 2 low check-ins** | **5.0%** | **1.8%** | **53.5%** | **13.1%** | **1.01** | **3.3% / 32.9% / 20.9%** |
| T9 ≥ 3 low check-ins alone | 8.7% | 5.8% | 66.6% | 37.1% | 1.73 | 5.3% / 22.4% / 66.3% |

(T4 and T7 and the noise-sensitivity runs are in `results.md`. With noisier nights (x1.5), T8 gives 5.2% flagged, 52.7% reached and 21.0% of flags outside the target.)

**Recommendation (simulation, not evidence; the team decides, #12):**
- **Sleep alone should not escalate.** "9 of 14 nights" flags about 1 in 9 healthy short sleepers, and 4 in 10 of its flags go to students who are coping.
- **Proposed trigger: T8.** The 14-night device mean is under 5.5 h AND the student gave 2 or more low check-ins in the same window, with at least 10 valid nights (otherwise abstain).
  - **Expected flag rate: about 3–5% of participants per two weeks** (about 1 per 20 students per fortnight). About 1 in 8 to 1 in 5 of those flags would go to students who are coping.
  - The card still names nights ("under 6 hours on 10 of the last 14 nights").
- **It reaches only about a third to a half of the target group.** So the always-visible "Talk to someone" link and the student's own words stay the main doors; this trigger is an extra one.
- **A flag only offers the three-rung ladder to the student.** It never contacts anyone else.

### H.4 Still unresolved, and how to settle it

| Open | How to settle | Who / when |
|---|---|---|
| Phone confirmation of CPS 212-854-2878 (24/7), who answers after hours, and what to show CUIMC and Barnard participants | Office-hours call or email to Columbia Health; record the date and the answering role | One team member, by Nov 20 |
| Which Public Safety numbers are current (H.1 conflicts 1–2) | Ask in the same call; or show only 911 and CPS in the app and leave Public Safety out | Same |
| Which campus our participants belong to | One optional onboarding question (school), or show all three counselling lines | Team, with UIUX |
| Students' night-to-night sleep SD | Not found in a source. Measure it in the pilot (exploratory), or find an actigraphy paper reporting the intra-individual SD | CSO, ongoing |
| Whether a check-in separates struggling from coping students (assumption A8 drives T8) | Pilot: the answer rate and the low-answer rate, labelled exploratory. No pilot result should be read as validating the trigger | CSO, at pilot |
| The real flag rate with our devices and our classmates | Log trigger evaluations in the pilot without showing them, then compare with this simulation. The share that would have fired is the flag-rate estimate, with its n. False alarms need the student's own view, e.g. a one-question end-of-study item | CSO and CTO, pilot |
| Rerun on the CTO's generator once it exists (seeds 3000+) | Swap the hand-made population in `sim.py` for generator output | CTO, after Nov 13 |
