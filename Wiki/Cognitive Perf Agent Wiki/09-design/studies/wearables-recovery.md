---
title: "Study — Wearables and recovery scores"
category: 09-design
tags: [frontend, reference, synthesis, wearables]
sources: ["https://support.ouraring.com/hc/en-us/articles/360057791533", "https://ouraring.com/blog/symptom-radar/", "https://developer.whoop.com/docs/whoop-101", "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/whoop-inc-709755-07142025", "https://support.google.com/fitbit/answer/14236710", "https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html", "https://the5krunner.com/garmin-features/training/training-readiness"]
summary: "WHOOP, Oura, Fitbit/Google Health and Garmin studied from public sources: learning periods, contributor breakdowns, labels, illness flags, AI coaches, user complaints, and what our card should take or avoid."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T01:00:00Z
updated: 2026-11-05T01:00:00Z
---
# Study — Wearables and recovery scores

> Studied by the UIUX seat on 2026-11-05 from public sources (no accounts). "Seen: researched" means docs, store pages, reviews and articles were read, not the app used hands-on.

This page adds to [[09-design/design-evidence|Design evidence]] and doesn't repeat it. That page already covers Oura's learning period, WHOOP's stable red/green score, the Fitbit 2023 redesign and the 2024 readiness paywall change, and the WHOOP 5.0 upgrade row. Read it first.

## Takeaways for our screens

1. **Not-enough-data: every one of the four has a learning period, and the good ones count down.** Fitbit gives no Daily Readiness score until 7 nights of wear and suggests a month for a fuller baseline ([Google support](https://support.google.com/fitbit/answer/14236710)). Oura needs up to two weeks ([Oura](https://support.ouraring.com/hc/en-us/articles/360057791533)). Garmin's HRV Status shows "No Status" for about three weeks ([Garmin manual](https://www8.garmin.com/manuals/webhelp/GUID-4462687B-8DF5-4719-872E-E16754F9D4B0/EN-US/GUID-5247CEC7-AF06-44FB-B6AD-87C53D4F7941.html)). Fitbit users quoted an in-app line asking them to wear the watch "for 1 more night", which is a good countdown. But they also hit "No score" with no reason after an update ([Fitbit community, via search](https://community.fitbit.com/t5/Charge-6/Daily-readiness-keeps-asking-to-wear-device-quot-for-7-more-nights-quot-for/m-p/5666541), [Gadgets & Wearables](https://gadgetsandwearables.com/2024/09/12/daily-readiness-score-non-premium/)). → **Our not-enough-data card:** count down in nights or sessions, name the missing record, say what is still known, and never show a blank. ^[inferred]
2. **Reason and sources: contributors are standard, but nobody links them to the record or shows how much each counted.** Oura lists 9 contributors and Garmin 6. Neither publishes the weighting ([the5krunner](https://the5krunner.com/garmin-features/training/training-readiness)). Garmin forum users still couldn't tell why their score sat low ([Garmin forums](https://forums.garmin.com/outdoor-recreation/outdoor-recreation/f/fenix-7-series/308068/training-readiness---almost-always-low-almost-never-good)). → **Our "Why this suggestion?" sheet:** rank the factors by how much they moved *this* suggestion, and let each one open its timestamped record. That's the gap all four leave. ^[inferred]
3. **The suggestion card: decide when the answer may change, and say so.** WHOOP computes Recovery once on waking and holds it all day ([WHOOP developer docs](https://developer.whoop.com/docs/whoop-101)). Fitbit computes once after you get up ([Google support](https://support.google.com/fitbit/answer/14236710)). Garmin's Training Readiness updates through the day ([Garmin manual](https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html)). Ours is per session, so it is closer to Garmin. Show "updated 14:05" and hold the suggestion steady inside a session window, so it doesn't flicker. ^[inferred]
4. **Labels: words over colour, kind names for the low end.** Oura's lowest band is "Pay Attention", not "poor", and it says 100s are meant to be rare ([Oura blog](https://ouraring.com/blog/readiness-score/)). Garmin runs purple to red, ending in "Poor · Let your body recover" ([Garmin manual](https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html)). WHOOP uses a red/yellow/green traffic light. → **Card and history:** no red on the body, and a low state reads as advice ("a short walk would help"), never a grade. ^[inferred]
5. **Escalate: Oura's Symptom Radar is the best persistence model in the category.** It needs 7 nights in the last 14, looks for several signals shifting together, shows three levels (no / minor / major signs) and names the biometrics that moved. It says what shifted, not why, and says the ring is not a medical device ([Oura](https://ouraring.com/blog/symptom-radar/)). → **Our escalate trigger:** persistence plus agreement between signals, shown as a ladder with the records named. ^[inferred]
6. **Consent and settings: a "Rest Mode" is worth stealing.** Oura's Rest Mode pauses activity goals and scores, keeps a banner showing it's on, asks daily whether the reason still applies, and brings goals back gradually over up to 7 days ([Oura support](https://support.ouraring.com/hc/en-us/articles/360057065433-Rest-Mode)). → **Our "Pause suggestions" control** (exam week, illness, travel): show it's on, check in once a day, resume gently. ^[inferred]
7. **The wellness line is drawn by design, not by a disclaimer.** The FDA's July 2025 warning letter to WHOOP cited a colour-coded gauge with target ranges as evidence that Blood Pressure Insights was diagnostic, and said disclaimers didn't change its intended use ([FDA](https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/whoop-inc-709755-07142025)). → **Every screen:** no colour-coded "target ranges" on body measures. A disclaimer can't rescue a design that looks diagnostic. ^[inferred]
8. **The AI layer: control and humility win, and shallow summaries get mocked.** Oura Advisor lets people choose its tone and how often it checks in, review and delete its "Memories", and says it can make mistakes ([Oura](https://ouraring.com/blog/oura-advisor)). Garmin's paid Active Intelligence was panned for three-sentence restatements of stats ([Running with Rock](https://runningwithrock.com/garmin-connect-first-impressions/)). → **Our LLM text** must add a reason the numbers don't already show, or stay silent. "How often may I interrupt you?" belongs in settings. ^[inferred]

## WHOOP

- **What it is · who · platform · price:** A screenless strap plus app that scores Recovery, Strain and Sleep. It's aimed at athletes and performance-minded adults and runs on iOS and Android. The App Store lists 4.8★ from 93K ratings, age 13+ ([App Store](https://apps.apple.com/us/app/whoop/id933944389)). It's sold as a membership with the hardware included. Third-party sources list One, Peak and Life tiers at $199, $239 and $359 a year; $199 and $359 are confirmed by [Live Science via search](https://www.livescience.com/health/exercise/whoop-mg-fitness-tracker-review) `[unverified on whoop.com, which blocked fetching]`.
- **Seen:** researched (developer docs, App Store listing, FDA letter, TechCrunch, 9to5Google, WHOOP community forum, Reddit mirrors via search). whoop.com pages returned 403, so WHOOP's own "Locker" articles weren't opened.
- **Key screens and flows** (in order, `[described]`): wake → Recovery % with its colour → Strain so far and a Strain Target for the day based on Recovery → Sleep Performance and a Sleep Planner for tonight → Journal (behaviour logging) → WHOOP Coach chat ([App Store](https://apps.apple.com/us/app/whoop/id933944389)). Newer additions include Healthspan ("Pace of Aging"), a 0–3 Stress score with breathwork, and Blood Pressure Insights on the MG tier.
- **Mechanisms:**
  - **One morning verdict, held all day.** Recovery is calculated once each morning and only changes if you edit your sleep ([developer docs](https://developer.whoop.com/docs/whoop-101)).
  - **Recovery sets today's target.** Strain is a non-linear 0–21 scale, and the app turns Recovery into a suggested exertion range (Strain Target) ([App Store](https://apps.apple.com/us/app/whoop/id933944389)). Recovery tells you what to do, not just how you are.
  - **Inputs:** HRV, resting heart rate, respiratory rate and sleep. The developer docs also list skin temperature and blood oxygen. Weighting isn't published.
  - **Behaviour logging:** a Journal of 160+ habits, linked to outcomes.
  - **A conversational coach.** WHOOP Coach launched on 26 Sept 2023 on GPT-4 and uses the member's data and goals ([9to5Google](https://9to5google.com/?p=588040)).
- **Visual style:** traffic-light bands (green 67–100, yellow 34–66, red 0–33) ([developer docs](https://developer.whoop.com/docs/whoop-101)). A dark, dense, athletic look `[unverified: general knowledge, no screenshots opened]`. Strain has named bands instead of colours (Light, Moderate, High, All Out).
- **Copy and tone:** performance and coaching ("primed", "Strain Target"). Red reads as "rest is likely needed" ([developer docs](https://developer.whoop.com/docs/whoop-101)). It's the most "coach" voice of the four. ^[inferred]
- **Numbers, uncertainty, evidence, privacy, escalation:**
  - **Numbers:** a % for Recovery and a decimal for Strain, with no uncertainty shown. The App Store says Recovery runs 1–99% while the developer docs say 0–100% (a small inconsistency).
  - **Privacy:** WHOOP says Coach data is anonymised before the language model sees it, and the host has a zero-retention, zero-training policy. The reviewer didn't verify this ([9to5Google](https://9to5google.com/?p=588040)). The App Store privacy label lists Health & Fitness, location, sensitive info and advertising data as linked to the user ([App Store](https://apps.apple.com/us/app/whoop/id933944389)).
  - **Medical line:** the FDA warning letter of 14 July 2025 called Blood Pressure Insights an unauthorised medical device. It cited the colour-coded target-range gauge and said disclaimers didn't change the intended use ([FDA](https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/whoop-inc-709755-07142025)). WHOOP disputed this, and the FDA later closed the letter after labelling changes ([MobiHealthNews, via search](https://cloudgate.mobihealthnews.com/news/fda-closes-warning-letter-whoop-blood-pressure-insights-feature)) `[closure date unverified]`.
- **What users love / complain about:**
  - **Love:** strain and recovery made simple, and useful insight ([App Store](https://apps.apple.com/us/app/whoop/id933944389)).
  - **Complain:** Bluetooth drops, slow support, weak strength tracking, sleep need that doesn't match how they feel, hard data export ([App Store](https://apps.apple.com/us/app/whoop/id933944389)).
  - **Score vs feeling:** a member saw nine red days in a row while feeling well and getting 90+ sleep scores ([WHOOP community](https://www.community.whoop.com/t/anybody-have-a-sudden-unexplained-string-of-non-recovery/11023)). Reddit threads report red-but-fine and green-but-ill days, and some members treat WHOOP as context, not a decision-maker ([r/whoop mirrors via search](https://reddit.sentinel-team.org/subreddits/whoop/snapshots/2026-01-12T13%3A40%3A24.297313Z)) `[mirror, not reddit.com]`.
  - **Trust:** the 5.0 upgrade-fee reversal ([TechCrunch](https://techcrunch.com/2025/05/11/fitness-tracker-whoop-faces-unhappy-customers-over-upgrade-policy)); see [[09-design/design-evidence|Design evidence]].
- **Steal:**
  - **"State → today's plan."** WHOOP turns Recovery into a target range for the day. → Ours turns the session state into one next action (walk / break / continue). → Suggestion card headline.
  - **Hold the answer steady.** One computation, held all day. → Hold a suggestion steady within a session window, with "updated hh:mm". → Card meta line.
  - **Journal of behaviours.** → An optional one-tap "what happened" tag after a break (caffeine, nap, practice). → History. ^[inferred]
- **Avoid:** the red/yellow/green body verdict. A colour-coded target-range gauge on any body measure (the FDA case). Copy that says "primed" or "all out" to a tired student. A morning number that "decides the day".
- **Open questions:** WHOOP's calibration length (a WHOOP podcast reportedly says 4 days with Recovery greyed out) `[unverified]`. Whether Coach cites which records it used `[unverified]`. Current AI features (a "Daily Outlook" is mentioned by one review) `[unverified]`.

## Oura

- **What it is · who · platform · price:** A smart ring plus app with Readiness, Sleep and Activity scores. It's aimed at wellness-minded adults and is popular for sleep. The App Store lists 4.9★ from 321K ratings, age 9+ ([App Store](https://apps.apple.com/us/app/oura/id1043837948)). Membership price `[unverified]`.
- **Seen:** researched (Oura support and blog, App Store listing, articles via search).
- **Key screens and flows** (in order, per the 3 Oct 2024 redesign; [Oura blog](https://ouraring.com/blog/new-oura-app-experience/)):
  - **Today:** Sleep, Readiness and Activity scores at the top, then a daily highlight chosen by time of day, then a timeline where you add tags, then "Discoveries" linking habits to data.
  - **Vitals:** each metric with *your* baseline range and its top contributors.
  - **My Health:** slow metrics (Cardiovascular Age, Stress Resilience) and weekly, quarterly and yearly reports you can share with a clinician.
  - **Advisor:** chat, reached from Today or from Readiness insight messages.
  - The redesign cut five tabs to three.
- **Mechanisms:**
  - **Named contributors against personal averages.** Readiness has 9 contributors (Resting Heart Rate, HRV Balance, Body Temperature, Recovery Index, Sleep, Sleep Balance, Sleep Regularity, Previous Day Activity, Activity Balance), each judged against your own averages. The "Balance" ones use 14-day weighted averages ([Oura support](https://support.ouraring.com/hc/en-us/articles/360057791533)).
  - **Baseline ranges in Vitals:** shows "what's typical for you and when metrics start to shift" ([Oura blog](https://ouraring.com/blog/new-oura-app-experience/)).
  - **Symptom Radar:** described in takeaway 5. It's on by default, and a flag appears on Today the next morning ([Oura](https://ouraring.com/blog/symptom-radar/)).
  - **Rest Mode:** pauses activity goals, scores and contributors, adjusts insights toward rest, shows a banner, checks in daily, and returns goals gradually ([Oura support](https://support.ouraring.com/hc/en-us/articles/360057065433-Rest-Mode)).
  - **Advisor:** you choose a supportive or direct tone and how often it checks in. Memories can be reviewed and deleted. It's optional and admits it can make mistakes ([Oura](https://ouraring.com/blog/oura-advisor)).
- **Visual style:** the same four bands for every score (Optimal 85–100, Good 70–84, Fair 60–69, Pay Attention 0–59). A red progress bar marks "pay attention" contributors ([Oura blog](https://ouraring.com/blog/readiness-score/)). A crown icon appears on scores of 85+ ([Oura support](https://support.ouraring.com/hc/en-us/articles/360025445574)). Oura describes its design as simple and calls the redesign "Sleeker. Smarter." ([Oura blog](https://ouraring.com/blog/new-oura-app-experience/)). Type and palette `[described]`.
- **Copy and tone:** encouraging and non-judgemental. Low scores are framed as a normal part of life, and the aim is learning, not perfection ([Oura blog](https://ouraring.com/blog/readiness-score/)). Advice is soft ("may benefit from prioritizing rest") ([Oura support](https://support.ouraring.com/hc/en-us/articles/360025445574)). It's the calmest of the four. ^[inferred]
- **Numbers, uncertainty, evidence, privacy, escalation:**
  - **Numbers:** 0–100 scores. There's no uncertainty display, but the learning period is stated (up to two weeks).
  - **Evidence:** contributors show which areas are off, not the timestamped record.
  - **Escalation:** Symptom Radar names the shifted biometrics, says it can be wrong both ways, and warns against changing medication or routines without a doctor ([Oura](https://ouraring.com/blog/symptom-radar/)).
  - **Sharing:** reports can be shared with healthcare providers, so sharing is user-initiated ([Oura blog](https://ouraring.com/blog/new-oura-app-experience/)).
  - **Privacy label:** Health & Fitness, precise location, email and ID are linked to the user, and usage data isn't ([App Store](https://apps.apple.com/us/app/oura/id1043837948)).
  - **Medical status:** the App Store page calls the app a regulated medical device (for its Fertile Window feature) while the description calls the ring general wellness, which is a mixed message ([App Store](https://apps.apple.com/us/app/oura/id1043837948)).
- **What users love / complain about:**
  - **Love:** sleep detail, readiness insights, cycle tracking, fast ring replacement ([App Store](https://apps.apple.com/us/app/oura/id1043837948)).
  - **Complain:** a two-week launch-crash bug with slow support, no way to pick the "main" sleep, the ring breaking during lifting ([App Store](https://apps.apple.com/us/app/oura/id1043837948)).
  - **Score anxiety:** press coverage of "orthosomnia" uses Oura-style scores as the example ([T3, via search](https://www.t3.com/home-living/sleep/sleep-tracking-obsession-opinion)). A claim that Oura added "compassionate" messaging in 2025 because of it is `[unverified]`.
- **Steal:**
  - **"Pay Attention" naming.** A low band that asks for attention instead of grading. → Our low-confidence or low-energy states read as an invitation ("worth a short walk"). → Card copy.
  - **Rest Mode.** → "Pause suggestions" with a visible banner, a daily check-in and a gentle resume. → Privacy controls and settings.
  - **Symptom Radar's structure** (7 of 14 nights, several signals together, 3 levels, names what moved, "what not why"). → The escalate trigger and copy. → Escalate state.
  - **Advisor's tone and frequency choice plus deletable Memories.** → Settings ("How often may I interrupt you?") and "What the agent remembers". → Consent and privacy.
  - **Baseline range per metric (Vitals).** → The S-01 range bar in signal rows. → "Why this suggestion?"
- **Avoid:** a score as the first thing seen on waking. Crowns for high scores, which is gamification ^[inferred]. Red progress bars. Letting many tabs of numbers (Vitals, My Health) creep onto our one-question card.
- **Open questions:** which in-app screens show contributor bars versus words `[described]`. Whether Advisor shows which data it used `[unverified]`. Membership price `[unverified]`.

## Fitbit / Google Health

- **What it is · who · platform · price:** Fitbit trackers and Pixel Watch with an app that became **Google Health** on 19 May 2026, when Fitbit Premium became Google Health Premium ([Google support](https://support.google.com/googlehealth/answer/17068213?hl=en)). The iOS app shows 4.5★ from about 711K ratings, with Premium at $9.99 a month or $79.99 a year ([App Store](https://apps.apple.com/us/app/fitbit-health-fitness/id462638897)). It's mainstream and cheaper, with many student users ^[inferred].
- **Seen:** researched (Google support, Google blog, App Store, Fitbit community threads via search, the5krunner, Android Police).
- **Key screens and flows** (in order): tabs are Today, Fitness, Sleep, Health (Today and Health only without a device) → Daily Readiness on Today → the Sleep tab with sleep score → Sleep Profile, a monthly report → the Gemini-built Google Health Coach for Premium users, 18+ ([Google support](https://support.google.com/googlehealth/answer/17068213?hl=en)). The coach starts with a 5–10 minute onboarding chat about goals, equipment and injuries ([the5krunner](https://the5krunner.com/2026/02/12/fitbit-gemini-ai-coach-ios/)).
- **Mechanisms:**
  - **Waits for a baseline.** No readiness score until 7 nights of wear, with a month suggested for accuracy. It's computed once a day after at least 3 hours of sleep ([Google support](https://support.google.com/fitbit/answer/14236710)).
  - **Inputs:** HRV, resting heart rate and the past week's sleep. In Sept 2024 resting heart rate replaced activity, the score left the paywall, and the bands became Low ≤29, Moderate 30–64, High ≥65 ([Gadgets & Wearables](https://gadgetsandwearables.com/2024/09/12/daily-readiness-score-non-premium/)).
  - **Coach, not a standalone score.** Workout recommendations based only on the score are no longer given; the Premium coach adjusts weekly plans to recovery instead ([Google support](https://support.google.com/fitbit/answer/14236710)).
  - **Sleep Profile:** needs 14+ nights in a month. Reports arrive on the 1st. It scores 10 metrics against typical ranges for your age and gender and gives one of six animals (bear, dolphin, hedgehog, giraffe, parrot, tortoise), which can change month to month ([Android Police](https://www.androidpolice.com/fitbit-latest-premium-feature-assign-sleep-animal-based-sleep-profile/); [Google blog](https://blog.google/products/fitbit/fitbit-sleep-profile-animals/)). The animals were picked with ethnographers to avoid negative associations ([Google blog](https://blog.google/products/fitbit/fitbit-sleep-profile-animals/)).
- **Visual style:** illustrated animal characters for Sleep Profile, with ideal-range markers per metric ([Android Police](https://www.androidpolice.com/fitbit-latest-premium-feature-assign-sleep-animal-based-sleep-profile/)). The rest `[described]`.
- **Copy and tone:** friendly and mainstream. Band text is plain ("Typical recovery…") ([Google support](https://support.google.com/fitbit/answer/14236710)).
- **Numbers, uncertainty, evidence, privacy, escalation:**
  - **Numbers:** a 0–100 readiness score with three bands. Labels may differ between Pixel Watch, other devices and the app.
  - **Waiting state:** the wear countdown is its only uncertainty device.
  - **Medical line:** no medical disclaimer on the readiness page ([Google support](https://support.google.com/fitbit/answer/14236710)).
  - **Privacy label:** the broadest of the four. Linked to the user: Health & Fitness, purchases, location, contacts, search history, sensitive info, used partly for advertising ([App Store](https://apps.apple.com/us/app/fitbit-health-fitness/id462638897)).
  - **Escalation:** none found.
- **What users love / complain about:**
  - **Love:** sleep tracking, motivating reports, the new AI coach (one review) ([App Store](https://apps.apple.com/us/app/fitbit-health-fitness/id462638897)).
  - **Complain:** missing sleep records, step and heart rate accuracy ([App Store](https://apps.apple.com/us/app/fitbit-health-fitness/id462638897)). After the Sept 2024 change, many posts reported lost readiness history, "No score" for days and a "wear 7 more nights" message to people who already wore it nightly ([Fitbit community threads via search](https://community.fitbit.com/t5/iOS-App/Readiness-data-gone-and-no-longer-logging/m-p/5666328)) `[thread bodies not opened; Fitbit community now redirects to Google]`.
  - **Brand:** the brand feels muddled after the acquisition and the account migration was messy ([the5krunner](https://the5krunner.com/2026/02/12/fitbit-gemini-ai-coach-ios/)).
- **Steal:**
  - **"Wait for a baseline" with a countdown.** → "3 more study sessions and I can start suggesting. Until then: manual break controls work." → The learning-period card (first run).
  - **Sleep Profile's monthly cadence and "no perfect type" framing.** → A monthly or weekly recap that describes patterns without grading. → Recap (with S-12).
  - **The score is dropped as a standalone instruction and fed into a plan.** → It validates our "no lone score". → Card.
- **Avoid:** losing or resetting history when the logic changes (version it; see [[09-design/design-evidence|Design evidence]]). "No score" with no reason. Comparing a student to age and gender norms on a main screen. Animal mascots at serious moments. Advertising-linked health data.
- **Open questions:** the exact wording on the readiness tile before the baseline exists `[unverified]`. Whether the Coach cites its data `[unverified]`. How Google Health shows readiness after May 2026 `[unverified]`.

## Garmin Connect

- **What it is · who · platform · price:** A free companion app for Garmin watches. It's aimed at runners, cyclists, triathletes and many college teams ^[inferred]. The App Store lists 4.4★ from about 60K ratings ([App Store](https://apps.apple.com/us/app/garmin-connect/id583446403)). Connect+ (launched 27 March 2025) costs $6.99 a month or $69.99 a year and adds Active Intelligence AI insights; the existing features stayed free ([Running with Rock](https://runningwithrock.com/garmin-connect-first-impressions/)).
- **Seen:** researched (Garmin owner's manuals, Garmin blog, App Store, the5krunner, Garmin forums, Running with Rock).
- **Key screens and flows** (in order):
  - **Watch:** the Morning Report on first wrist-raise after waking, with widgets you choose (Training Readiness, HRV Status, Sleep, Body Battery, weather) ([the5krunner](https://the5krunner.com/garmin-features/training/training-readiness)).
  - **App:** Training Readiness with its factor breakdown and a 30-day trend under Performance Stats ([the5krunner](https://the5krunner.com/garmin-features/training/training-readiness)), then Body Battery, then HRV Status.
  - **Web:** Garmin Connect web shows less factor detail.
- **Mechanisms:**
  - **Training Readiness:** a "score and a short message", calculated continuously through the day from six factors: last night's sleep score, recovery time, HRV status, acute load, 3-night sleep history and 3-day stress history ([Garmin manual](https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html)).
  - **Factor statuses:** each factor carries its own status word. Acute load reads optimal, high, very high or low. HRV reads balanced, unbalanced, low or poor. Sleep and recovery show short badges ([the5krunner 2022](https://the5krunner.com/2022/05/29/garmin-revamps-training-readiness-abilities-with-hrv-status/)). Readiness needs about 3 days of continuous wear including sleep for a number ([same](https://the5krunner.com/2022/05/29/garmin-revamps-training-readiness-abilities-with-hrv-status/)).
  - **Body Battery:** 0–100 "reserve energy", charged by sleep and drained by activity and stress. Food and caffeine don't affect it. It's shown as a graph since midnight, alongside stress bars (blue rest, orange stress, grey too active to measure) ([Garmin manual](https://www8.garmin.com/manuals-apac/webhelp/forerunner255series/EN-SG/GUID-708836C9-AAAC-4D9B-9A71-73361F888AB0-627.html)).
  - **HRV Status:** a 7-day average against a personal baseline range built over 3 weeks. Labels are Balanced, Unbalanced, Low, Poor (well below age norms), and "No Status" until there's enough data ([Garmin manual](https://www8.garmin.com/manuals/webhelp/GUID-4462687B-8DF5-4719-872E-E16754F9D4B0/EN-US/GUID-5247CEC7-AF06-44FB-B6AD-87C53D4F7941.html)). An HRV above baseline isn't automatically good; Garmin says it can mean the body is working overtime to recover ([Garmin blog](https://www.garmin.com/en-CA/blog/?p=31344)).
- **Visual style:** five colour bands for readiness: purple Prime 95–100, blue High 75–94, green Moderate 50–74, orange Low 25–49, red Poor 1–24 ([Garmin manual](https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html)). The app is dense with tiles. Reviewers call the tile layout hard to read and the menus hard to learn ([App Store](https://apps.apple.com/us/app/garmin-connect/id583446403)).
- **Copy and tone:** each band carries a short instruction ("Ready for challenges", "Time to slow down") ([Garmin manual](https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html)). It's training-plan language, an instruction rather than a description ^[inferred].
- **Numbers, uncertainty, evidence, privacy, escalation:**
  - **Uncertainty:** nothing on the score itself, though "No Status" is an honest abstain. No independent validation of the composite has been published ([the5krunner](https://the5krunner.com/garmin-features/training/training-readiness)).
  - **Privacy label:** Health & Fitness, contacts and user content are linked to the user, and location isn't ([App Store](https://apps.apple.com/us/app/garmin-connect/id583446403)).
  - **Escalation:** none.
- **What users love / complain about:**
  - **Love:** the depth of data, a customisable home screen, coaching plans ([App Store](https://apps.apple.com/us/app/garmin-connect/id583446403)).
  - **"Almost always low":** a long forum thread from athletes who feel fine but read low. One user raised the score by changing the sleep goal from 8 h to 7 h. Others are told to check the factor breakdown ([Garmin forums](https://forums.garmin.com/outdoor-recreation/outdoor-recreation/f/fenix-7-series/308068/training-readiness---almost-always-low-almost-never-good)).
  - **Misleading number:** a reviewer got a readiness of 1 during a planned overload block. It meant "don't train hard" but read like "stay in bed". He proposed splitting it into "ready to train" and "ready to train hard", and adding how you feel as an input ([the5krunner](https://the5krunner.com/2023/08/02/garmin-training-readiness-not-accurate-heres-why/)).
  - **Connect+ backlash:** a paywall plus shallow AI. One review reported a cadence note after a hilly run that said nothing about effort ([Running with Rock](https://runningwithrock.com/garmin-connect-first-impressions/)).
- **Steal:**
  - **Factors with their own status words** (S-06). → Three plain rows in "Why this suggestion?": session length, app switching, last night's sleep, each with a word status and a link to its record. → Reason and sources.
  - **"No Status" until the baseline exists.** → Our honest abstain per signal, so the HRV row says "Still learning (day 9 of ~21)". → Signal rows. ^[inferred]
  - **Morning Report on first wrist-raise.** → Arrive at a natural seam, once (S-09). → Notification timing.
  - **Split readiness by intent** (the reviewer's proposal). → Our three-way answer (continue / walk / break) already does this. Keep it. → Card.
- **Avoid:** a five-colour scale that ends in red. A score that moves all day without saying when it changed. Two overlapping energy and readiness numbers (Body Battery vs Training Readiness; see [[09-design/design-evidence|Design evidence]]). Hidden weights. An AI paywall over restated stats.
- **Open questions:** whether the app shows per-factor bars or percentages `[unverified]`. The exact feedback sentences `[unverified]`. Whether team-issued Garmins (ICP_2) let staff see readiness `[unverified]`, which matters for the coach test.

## Steal Card check

**S-06 Garmin Training Readiness: partly confirmed, corrected.** Upgrade `Seen:` from `described` to **researched**.

- **Confirmed:** a readiness level comes with a breakdown of the factors behind it, and factors carry their own status words (HRV balanced/unbalanced, acute load optimal/high, sleep and recovery badges) ([Garmin manual](https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html); [the5krunner](https://the5krunner.com/2022/05/29/garmin-revamps-training-readiness-abilities-with-hrv-status/)).
- **Corrected:**
  - It is **six** named factors, two of them multi-day histories.
  - The level is a 1–100 score in five colour bands (purple to red), each with a short instruction.
  - It updates continuously through the day.
  - It needs overnight wear. HRV Status shows "No Status" for about 3 weeks.
  - Weighting is unpublished.
- **"Why it works" holds only partly.** Users are sent to the breakdown when the number confuses them, but hidden weights still leave them unable to say why ([Garmin forums](https://forums.garmin.com/outdoor-recreation/outdoor-recreation/f/fenix-7-series/308068/training-readiness---almost-always-low-almost-never-good)).
- **Unverified:** per-factor bars or percentages in the app.

Proposed wording:
- **Mechanism:** lists the six factors behind a readiness level, each with its own status word, and holds back a factor ("No Status") until its baseline exists.
- **Why it works:** a surprising verdict becomes checkable. Hidden weights still leave "why?" open, so we rank ours by impact.
- **Our translation:** keep the breakdown, drop the score: three short factor rows (session length, app switching, last night's sleep), each with a word status, its record, and "still learning" when the baseline isn't ready.
- **Seen:** researched (manuals, the5krunner, Garmin forums; app not used).

## Sources

**WHOOP**
- https://developer.whoop.com/docs/whoop-101
- https://apps.apple.com/us/app/whoop/id933944389
- https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/whoop-inc-709755-07142025
- https://cloudgate.mobihealthnews.com/news/fda-closes-warning-letter-whoop-blood-pressure-insights-feature (search result only)
- https://9to5google.com/?p=588040
- https://techcrunch.com/2025/05/11/fitness-tracker-whoop-faces-unhappy-customers-over-upgrade-policy
- https://www.community.whoop.com/t/anybody-have-a-sudden-unexplained-string-of-non-recovery/11023
- https://reddit.sentinel-team.org/subreddits/whoop/snapshots/2026-01-12T13%3A40%3A24.297313Z (Reddit mirror, via search)
- https://www.livescience.com/health/exercise/whoop-mg-fitness-tracker-review (via search)

**Oura**
- https://support.ouraring.com/hc/en-us/articles/360057791533
- https://support.ouraring.com/hc/en-us/articles/360025445574
- https://support.ouraring.com/hc/en-us/articles/360057065433-Rest-Mode
- https://ouraring.com/blog/readiness-score/
- https://ouraring.com/blog/new-oura-app-experience/
- https://ouraring.com/blog/oura-advisor
- https://ouraring.com/blog/symptom-radar/
- https://apps.apple.com/us/app/oura/id1043837948
- https://www.t3.com/home-living/sleep/sleep-tracking-obsession-opinion (via search)

**Fitbit / Google Health**
- https://support.google.com/fitbit/answer/14236710
- https://support.google.com/googlehealth/answer/17068213?hl=en
- https://apps.apple.com/us/app/fitbit-health-fitness/id462638897
- https://gadgetsandwearables.com/2024/09/12/daily-readiness-score-non-premium/
- https://blog.google/products/fitbit/fitbit-sleep-profile-animals/
- https://www.androidpolice.com/fitbit-latest-premium-feature-assign-sleep-animal-based-sleep-profile/
- https://the5krunner.com/2026/02/12/fitbit-gemini-ai-coach-ios/
- https://community.fitbit.com/t5/iOS-App/Readiness-data-gone-and-no-longer-logging/m-p/5666328 (via search; now redirects)
- https://community.fitbit.com/t5/Charge-6/Daily-readiness-keeps-asking-to-wear-device-quot-for-7-more-nights-quot-for/m-p/5666541 (via search; now redirects)

**Garmin**
- https://www8.garmin.com/manuals-apac/webhelp/fenixe/EN-SG/GUID-9C81FC1B-7245-4681-B7C8-677F5175D72B-7644.html
- https://www8.garmin.com/manuals/webhelp/GUID-31D23DBB-57C2-4DF7-A0C9-8D1A00AB4BE7/EN-US/GUID-C21BE0C8-A08E-4DA1-B6C6-2E0E2DDDB372.html
- https://www8.garmin.com/manuals/webhelp/GUID-4462687B-8DF5-4719-872E-E16754F9D4B0/EN-US/GUID-5247CEC7-AF06-44FB-B6AD-87C53D4F7941.html
- https://www8.garmin.com/manuals-apac/webhelp/forerunner255series/EN-SG/GUID-708836C9-AAAC-4D9B-9A71-73361F888AB0-627.html
- https://www.garmin.com/en-CA/blog/?p=31344
- https://apps.apple.com/us/app/garmin-connect/id583446403
- https://the5krunner.com/garmin-features/training/training-readiness
- https://the5krunner.com/2022/05/29/garmin-revamps-training-readiness-abilities-with-hrv-status/
- https://the5krunner.com/2023/08/02/garmin-training-readiness-not-accurate-heres-why/
- https://forums.garmin.com/outdoor-recreation/outdoor-recreation/f/fenix-7-series/308068/training-readiness---almost-always-low-almost-never-good
- https://runningwithrock.com/garmin-connect-first-impressions/

## Related
- [[09-design/steal-library|Steal library]] · [[09-design/design-evidence|Design evidence]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]]
