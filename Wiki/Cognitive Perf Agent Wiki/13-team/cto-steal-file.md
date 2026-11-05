---
title: CTO Steal File
category: 13-team
tags: [architecture, wearables, llm, privacy, synthesis]
sources:
  - "[[09-design/steal-library]]"
  - "[[12-research/science-and-tech-evidence]]"
  - "https://developers.google.com/health/about"
  - "https://developers.google.com/health/app-verification"
  - "https://developers.google.com/health/data-types"
  - "https://developers.google.com/health/migration"
  - "https://developers.google.com/identity/protocols/oauth2"
  - "https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities"
  - "https://developer.apple.com/documentation/healthkit/protecting-user-privacy"
  - "https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/"
  - "desk research 2026-11-04 (full list in section G)"
summary: "The CTO's read of the steal library: how each product works technically (public vs inferred), 17 technical cases and 7 anti-cases, top 10 build steals with hours and doors, and the unknowns."
base_confidence: 0.58
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: core
created: 2026-11-05T04:00:00Z
updated: 2026-11-05T04:00:00Z
---

# CTO Steal File

The CTO seat's pass over the [[09-design/steal-library|Steal Library]], plus the technical cases the steal library doesn't cover. The question for every card is the same: **what is actually computed, where, from what data, and can three people build the honest version by Dec 11 on iPhone Safari and a laptop?**

**Labels.** **Public** = a page I opened on 2026-11-04 says it (URL in section G). `[secondary]` = only press, a blog or a forum says it. `^[inferred]` = my reasoning. `[assumption]` = a planning number, not a fact. Exact vendor algorithms are almost never published; my guesses about them are labelled.

This file builds on [[12-research/science-and-tech-evidence|Science and tech evidence]] and [[24-synthesis/casebook|Casebook]] §C (Flu Trends, Epic Sepsis, cStress, ChatGPT Health), which I don't repeat.

---

## A. The steal library through the CTO's eyes

### S-01 Google Flights — "typical" against a range bar

- **Public.** Fares are labelled low, typical or high against "past averages for the same route"; booking-time advice appears only "for searches with reliable trend data"; Google's 2023 figures used fares from Aug 2018–Dec 2019 and Jan 2021–Jul 2023, leaving out 2020 (Google blog). Press adds a sliding bar and about 60 days of price history `[secondary]`. How the band edges are set isn't public.
- **Inference.** A band over comparable itineraries, a reliability gate that hides the insight when history is thin, and an anomalous period excluded. ^[inferred]
- **Build steal.** (1) A robust personal band per signal: median with 25th–75th percentile edges over the student's last 28 valid nights, not mean ± SD, which one sick night skews. (2) The reliability gate: no bar before 14 valid nights, and weekly views need 5 of 7 (Grosicki 2026); below it the row says "Still learning your range (9 of 14 nights)". (3) The 2020 rule: illness, device-change and travel nights stay out of the band.
- **Warning.** Flights compares you to a market; we compare you to yourself. And "typical HRV" says nothing about tonight's studying: no evidence links overnight wrist HRV to next-day study performance.

### S-02 Apple Watch Vitals — speak up only when several signals are off

- **Public** (Apple's guide and developer docs). Overnight heart rate, respiratory rate, wrist temperature, blood oxygen and sleep duration, each against "a typical range". By default it notifies when "at least two of your overnight metrics are outside of your typical range". "Your Apple Watch is not a medical device." HealthKit's HRV is **SDNN**, and samples can carry an algorithm-version key. About 7 nights to set the range `[secondary]`; the range maths isn't public.
- **Why two-of-k matters** (my arithmetic, assuming independent metrics, which they aren't): if each of 5 metrics leaves its 90% band on 10% of normal nights, "alert on any one" fires on ≈ 41% of nights and "alert on two or more" on ≈ 8%. ^[inferred]
- **Build steal.** The reason line mentions sleep or HRV only when at least two overnight signals are outside the student's band, and the laptop signal must still agree before a break is suggested. The Algorithm Card reports the simulated false alarms per student per day in the plausible and null worlds.
- **Warning.** Apple reports SDNN; Google doesn't name its HRV metric (section F); Oura's is reportedly RMSSD. Never pool HRV across sources; store metric name and algorithm version on every row.

### S-03 MyChart lab results — a value, its range, and who to talk to

The range there is a population range shipped by the lab ^[inferred]; the steal is the **escalation pointer**. Escalation is a deterministic rule (for example short sleep on 10 of 14 nights, threshold set by the CSO) that routes to a CSO-approved list of campus resources stored in the database. The LLM never decides whether to escalate, and the copy is a fixed template within the FDA wellness limits (no condition named, nothing called "abnormal").

### S-04 Perplexity — numbered sources next to the claim

- **Public.** Perplexity publishes nothing I could find on its citation pipeline; third-party accounts disagree on whether sources are bound before generation or attributed after `[secondary]`. Liu et al. (2023) audited four generative search engines including Perplexity: only **51.5%** of sentences were fully supported by their citations, and only **74.5%** of citations supported their sentence.
- **Build steal: bind citations at generation.** Code emits claim objects `{template, value, unit, record_ids[]}` only when records support them (WearLab's `insights()` pattern, [[32-wearlab/what-we-reuse|What we reuse from WearLab]] §5). The LLM may only order and phrase claims by claim ID. A validator rejects any sentence with a number but no claim ID, or an unknown ID, and falls back to the template. Each marker opens the record: source, device, measured and received time, quality flag.
- **Warning.** Post-hoc citation makes text look grounded without being grounded.

### S-05 Apple Weather next-hour rain — everyday uncertainty

- **Public.** A minute-by-minute intensity chart shown only when precipitation is present or expected, "provided by Apple using data from national weather services", in certain countries only (Apple support). Users report frequent misses `[secondary]`. The method isn't public; Dark Sky reportedly extrapolated the motion of rain edges `[secondary]`.
- **Inference.** Nowcasting works because radar shows rain already moving: it extrapolates an observed state a short way ahead. ^[inferred]
- **Build steal.** Phrase outputs as short-horizon statements about an observed state ("You've been going 2 h 40 min"). Confidence words come from code, from calibrated bins only. Show the chart only when there's something to show.
- **CTO veto on the current translation.** "Your focus is likely to dip in the next 30 min. Fairly sure." claims a predictive model we don't have; we have no radar for focus. Until study-task labels show calibration on held-out sessions, the honest line is about time-on-task and fatigue (breaks reduce fatigue, d ≈ .35).

### S-06 Garmin Training Readiness and Body Battery — a breakdown of what drove it

- **Public.** Training Readiness combines six inputs (sleep score, recovery time, HRV status, acute load, 3 nights of sleep history, 3 days of stress history), bands the score from Prime to Poor and updates through the day; weights aren't published (Garmin manuals). Firstbeat's 2014 white paper, the method under Stress and Body Battery: beat-by-beat HR over 24 hours; "an individual physiological model" because HRV differs hugely between and within people; stress as sympathetic dominance, recovery as parasympathetic; built on thousands of lab and 100,000+ field assessments; and it states that responses to positive and negative stress are physiologically similar. Garmin's blog: stress "be it negative or positive" drains Body Battery.
- **Build steal.** The breakdown, not the score: three factor rows (session length, app switching, last night's sleep vs need), each taken from a rule that actually fired, so "why" is the real decision trace.
- **Warning.** Firstbeat's own paper explains the Garmin student result: physiology can't tell exam dread from excitement. And Body Battery needs beat-by-beat data; the course's Google Health data gave HR about every 5 minutes. We can't build one and shouldn't.

### S-07 Rise Science — energy across the day

- **Public.** The two-process model (Borbély 1982; reappraised 2016 in *J Sleep Res*): homeostatic sleep pressure (Process S) interacting with a circadian process (Process C). Rise's blog: sleep debt over 14 days against personal need, and an energy schedule with late-morning and late-afternoon peaks. Press says it also uses phone-interaction data `[secondary]`. I found no independent validation of its predictions.
- **Build steal.** 14-night sleep debt against the student's own need is one SQL query and the best-evidenced context feature we have (Van Dongen 2003).
- **Warning.** No daily energy curve: it needs a sleep-need model we can't validate in 5 weeks, and it would make us a worse Rise.

### S-08 Gentler Streak — rest counts

- **Public** `[secondary]`. The "Activity Path" is a band built from about 10 days of logged workouts and intensity; the developer calls it TSB-model based (fitness-fatigue) and says sparse heart rate means "we can't tell the strain".
- **Build steal.** A band shown as "inside your usual", not a target; coverage shown next to every derived value, with features dropped below a coverage floor. A declined suggestion is an event with no penalty field.
- **Warning.** Training-load maths is about exercise. Don't import it into cognition.

### S-09 BeReal — once a day, and people wait for it

- **Public.** Nothing official. Third parties say one random daily time per region, sent to everyone at once `[secondary]`.
- **Build steal.** The *budget*, not the fan-out: a `prompt_budget` row per student per day with a hard cap (2 a day [assumption]), at most one suggestion per session window, snooze that truly suppresses, and hysteresis. The policy enforces it; the LLM can't see it.
- **Warning.** BeReal's scarcity is social; random timing would be wrong for a session-timed prompt. Push on iPhone needs a home-screen web app (S-11).

### S-10 Citymapper — one confident next step

The policy returns an ordered allowlist `[continue, short_walk, break]` with reasons; the UI leads with the first and keeps the rest one tap away. When the policy abstains, the first item is "not enough data", never a guess.

### S-11 Live Activities and the Dynamic Island — the break on the lock screen

- **Public** (ActivityKit docs). Live Activities live in a **native app's widget extension**, started and updated through ActivityKit or ActivityKit push via APNs; up to **8 hours** active plus up to 4 on the lock screen (12 max); static plus dynamic data **≤ 4 KB**; they "can't access the network"; usually started from the foreground; users can switch them off.
- **Public** (WebKit). Web apps get **Web Push only after Add to Home Screen** (iOS 16.4+), with permission asked "in response to direct user interaction"; Badging works; Declarative Web Push arrived in 18.4; every push is visible, never silent. Nothing gives a web app a Live Activity. ^[inferred from absence]
- **Build steal for Dec 11.** An in-page break countdown (Screen Wake Lock if available `[secondary]`), **one** Web Push at break end for students who installed the home-screen app, and an in-app fallback for those who didn't.
- **Warning.** A real Live Activity means Swift, signing, an Apple developer account and TestFlight: a one-way door on team time. Going native would also unlock HealthKit, so decide it once, for both reasons, after Dec 11.

### S-12 Spotify Wrapped — the shareable recap

- **Public** (Spotify Engineering 2020). A **batch** pipeline on Cloud Dataflow over a Bigtable-backed listening store; each story is its own job writing one row per user; decade stats **reused yearly outputs**; fewer shuffles gave ~5× the data for ~25% less cost. For 2025's "Archive" (2026 post): up to five notable days per user picked by the pipeline, an LLM report per day from a distilled smaller model, and judge models grading accuracy, safety, tone and formatting on a ~165k sample.
- **Build steal.** The weekly recap is a nightly job: read `intervention_events` and `task_outcomes`, write one row per student per week, and render the page from that row. The shareable version uses an allowlist of non-health fields.
- **Warning.** Spotify sampled because of volume. With 10–30 students we **check 100% of numbers**.

### Study-list products with a technical lesson

Not cards yet. One line each on what matters for the build. I didn't research the products not listed here.

| Product | What's technically true | Steal or warning for us |
|---|---|---|
| Oura | Readiness has nine named contributors; HRV Balance compares the last 14 days with a 3-month average, weighting recent days more (Oura support). API v2 is OAuth-only; apps get 10 users before approval `[secondary on dates]` | Steal the weighted-recent vs long-term comparison for the baseline card. Warning: 10-user cap and a paid membership per participant |
| WHOOP | Scores come from WHOOP's own algorithms; WHOOP Coach sits on GPT-4 `[secondary]`; developer sandbox of 10 members (evidence page) | Same split we want: algorithm scores, LLM explains |
| Fitbit Daily Readiness | Holds back while learning a baseline (per steal library; not re-checked) | Our "still learning" state is the same mechanism |
| one sec | See case B14. FamilyControls plus Shortcuts automations; PNAS field study | Friction plus an easy "back out" beat a deliberation message |
| Endel, Apple Mindfulness | Adapt to live heart rate; watch haptics | Both need HealthKit or watchOS, so native. Use a web breathing animation ^[inferred] |
| Our World in Data | A Sources tab on every chart | Maps onto `GET /v1/evidence/{id}` (see the database page linked below) |
| Apple privacy labels | Declared data use at a glance | Generate our consent list from the same config the collector reads, so it can't drift from the code ^[inferred] |

The evidence endpoint is specified in [[06-database/database-and-api|Database and API]].

---

## B. Technical cases

Each case: what happened (sourced), the principle, and the steal for us (3 people, Dec 11, iPhone Safari first, Mac and Windows laptops, privacy by design).

### How products like ours are built

**B1. The Fitbit turn-off and the Google Health migration.**
- **What happened** (Google's pages). Fitbit Web API and OAuth endpoints off on **2 Nov 2026** (`410 Gone`). The about page says "All Google Health API scopes are categorized as Restricted, necessitating a privacy and security review"; the verification page says "Most scopes … are restricted" and unverified apps are "limited to 100 users". Tokens "cannot be transferred", so every user re-consents; IDs move to a `healthUserId`; an unlinked account returns `400 FAILED_PRECONDITION / ACCOUNT_NOT_LINKED`.
- **Principle.** A vendor API is a lease; the landlord can change the locks.
- **Steal.** One adapter interface emitting canonical observations; `source`, `source_api_version` and vendor user ID on every row; `ACCOUNT_NOT_LINKED` as a named UI state, not a crash.

**B2. Google's OAuth Testing status.** An external-user-type project in "Testing" "is issued a refresh token expiring in 7 days"; refresh tokens are also capped at 100 per account per client, oldest silently invalidated (Google OAuth docs). *Principle:* the demo will run on day 8 of somebody's consent. *Steal:* store `token_expires_at`, show "Reconnect your watch (expires in 2 days)", and on failure mark the source `stale` so the model falls back to laptop-only and says so. Whether the rule applies to the Health API exactly is unknown (section F).

**B3. HealthKit is on-device and opinionated.**
- **What happened** (Apple's docs). Reads are on device only, with no server API. "An app isn't aware when the user denies permission to read data", so a denial looks like no data. The store is encrypted while the phone is locked, so background reads may fail. Background delivery needs an entitlement and is capped (step count wakes the app at most hourly on iOS); miss the completion handler three times and delivery stops. No disclosure to third parties unless they also provide a health or fitness service; never for ads.
- **Principle.** "No data" and "no permission" look identical. Native buys access, not freshness.
- **Steal.** If we go native: an `unknown_or_denied` missingness code, and a consent line naming any LLM provider that sees HealthKit-derived data. For Dec 11, HealthKit stays off the critical path.

**B4. Health Auto Export: the HealthKit companion pattern.** A paid iOS app reads HealthKit and POSTs JSON or CSV to a URL the user sets, on a schedule; users call the REST automation "a bit flaky" under iOS background limits `[secondary]`. *Principle:* someone else's native app can bridge HealthKit, at the cost of reliability and another vendor in the data path. *Steal:* a stretch path for Apple Watch classmates, but a one-way door (third party, paid, user setup). A manual Apple Health export through CSV import is the safer fallback. ^[inferred]

**B5. Google Fit → Health Connect.** Google deprecated the Fit APIs for turn-down in 2026 and says "there is no alternative to the Fit REST API" `[secondary via search]`. *Principle:* two health-platform migrations from one company in one year. *Steal:* the schema never mirrors a vendor's shape; `observations` is canonical, with raw provider JSON kept beside it ([[05-data/data-pipeline|Data pipeline]]).

**B6. ActivityWatch: local-first desktop tracking.** `aw-watcher-afk` flags AFK after "at least 3 minutes" without input; `aw-watcher-window` records the active app **plus the window title, and the URL on Chrome-based browsers and Safari**; Windows, macOS and Linux X11 (ActivityWatch docs). *Principle:* the best open tool in the space collects, by default, exactly what we promised never to collect. *Steal:* borrow the architecture (local watcher → local buckets → aggregates) and the AFK idea; build a minimal collector that reads only the foreground process or bundle name, maps it to a category **on the device** and drops the name, and sends 5-minute aggregates. Never bundle the window or browser watchers.

**B7. Oura API v2.** OAuth only (personal tokens deprecated; dates conflict `[secondary]`), 10 users before approval, per-data-type consent, membership required (evidence page). *Principle:* a clean API with a tight pilot cap. *Steal:* a second adapter for up to 10 Oura owners, cheap if the adapter interface is right; not before the first adapter works.

### Agent architectures that kept numbers out of the LLM

**B8. PHIA (Google, 2024).** "Multistep reasoning with code generation and information retrieval" over wearable data; **84%** on objective numerical questions after a 650-hour expert evaluation; beat a strong code-generation baseline (arXiv). *Principle:* even with code, about one numerical answer in six was wrong; letting the LLM write the analysis moves the error rather than removing it. *Steal:* **our LLM writes no code at all.** Numeric code is fixed and tested, outputs are typed JSON, and our question is one narrow decision.

**B9. The Fitbit personal health coach (Google, Oct 2025).** A conversational agent, a **data science agent** that calls tools and generates code "as needed", and a domain-expert agent; evaluated with SHARP and over 1M human annotations (Google Research). It doesn't say whether every number comes from code. *Principle:* even the best-resourced team separates "compute" from "talk". *Steal:* our Signal / Evidence / Action split ([[04-agent-engine/multi-agent-decision|Multi-agent decision]]) is the right shape, made stricter: the "data science agent" is plain Python. Borrow SHARP's five axes for a 50-case trap rubric.

**B10. Spotify Wrapped "Archive" (2025).** The pipeline selected the days and numbers; the LLM only wrote the narrative; judges graded a ~165k sample. *Principle:* at scale, the LLM still sits downstream of the numbers. *Steal:* select in SQL, narrate in the LLM, judge the narration: a deterministic number-check on every output, an LLM rubric on a sample.

**B11. Kaur et al. (Microsoft Research, CHI 2020).** Models from about three weeks of sensor and workstation data found opportune moments for transitions and breaks with 85.7% and 77% accuracy; participants liked timely reminders. *Principle:* the closest prior art, and it learned from workstation context. *Steal:* the laptop path is the core, not a fallback; 77% is our perceived-timing benchmark.

### iOS web-app constraints in 2026

**B12. Web Push on iOS.**
- **What happened** (WebKit). Push only for web apps "added to the Home Screen" with a `standalone` or `fullscreen` manifest; permission only after "direct user interaction"; Badging works; Declarative Web Push (18.4) exists partly because ITP can delete a site's data, service worker included. Every push is visible. Background Sync, Periodic Background Sync and Background Fetch are unsupported `[secondary]`.
- **Principle.** On iPhone, a web app is alive only while open, plus visible pushes.
- **Steal.** The server decides when to prompt and sends one visible push; screens recompute from the server on open; the phone never uploads in the background (that's the laptop's job); onboarding includes a tested "Add to Home Screen" step, or push doesn't exist for that student.

**B13. WebKit storage policy.** Origins are "best-effort" and can be evicted, including by ITP after a period without interaction; `persist()` is granted "based on heuristics" (WebKit). *Principle:* phone storage is a cache, not a database. *Steal:* the phone holds a session token and a display cache; truth lives in Postgres and, for raw laptop events, on the laptop.

### Small-team and indie stacks that shipped

**B14. one sec (an indie developer) and the Screen Time API.**
- **What happened.** one sec detects target-app opens through **Shortcuts automations** and uses Screen Time to "completely shield apps" (one sec docs). FamilyControls needs a capability plus a distribution-entitlement request; individual authorization needs the owner's biometric approval; the picker lets users choose apps "without revealing their choices to the app" (Apple). In PNAS (Grüning, Riedel and Lorenz-Spreen 2023; n = 280, 6 weeks), users backed out on 36% of attempts and openings fell 57%; in a preregistered online study (n = 500), the dismiss option worked best and the deliberation message didn't. The developer co-authored the paper. He also reports DeviceActivity thresholds not firing `[secondary, forum]`.
- **Principle.** Control without visibility: you can block apps you can't name.
- **Steal.** Opaque tokens are our laptop privacy model (the server learns categories, never app names). An easy "not now" matters more than persuasive copy. Phone app usage stays out of scope.

**B15. WearLab (our own).** Seeded, headless TypeScript simulators with tests that pass read-only ([[32-wearlab/what-we-reuse|What we reuse from WearLab]]). *Principle:* the fastest small-team stack is the one you already have tests for. *Steal:* ADR-001 stands; the generator emits Google-Health-shaped JSON, so the demo exercises the real ingest path.

**B16. The Firstbeat method.** It needed beat-by-beat data, an individual model and 100,000+ field assessments before shipping stress and recovery (white paper). *Principle:* physiological state estimation is a field-validated product, not a weekend feature. *Steal:* physiological features stay daily context behind sufficiency gates; no intraday state estimation.

**B17. Apple Vitals as a product-level abstain rule.** A platform owner with every sensor still chose silence by default and a multi-signal trigger (S-02). *Principle:* the most data-rich player designs for false alarms first. *Steal:* the policy's first test is the null-world false-alarm rate, before any accuracy number.

### Anti-cases (technical)

**A1. Generative search engines' citations** (Liu et al., 2023). 51.5% of sentences fully supported and 74.5% citation precision, across four engines including Perplexity. *Principle:* a citation UI without a binding guarantee is decoration. *Steal:* bind at generation, validate after (S-04).

**A2. NEDA's "Tessa" chatbot (May 2023).** An eating-disorder helpline's bot gave calorie-deficit and weigh-in advice and was pulled within a day of screenshots surfacing; NEDA said its contractor had added generative features without its knowledge (NPR `[secondary]`). *Principle:* a scripted system went generative and no test noticed; the failure was change control. *Steal:* pin the LLM model ID in config; run the trap suite (missing nights, athlete low HRV, injection in an app category, a distress phrase) on every prompt or model change; keep a kill switch to templates.

**A3. GoodRx and the FTC Health Breach Notification Rule (Feb 2023).** The first HBNR enforcement treated health data shared with advertisers as a "breach": a $1.5M penalty and a permanent ban on sharing health data for ads (law-firm summaries `[secondary]`). *Principle:* an analytics SDK can turn a wellness app into a breach. *Steal:* no third-party analytics, ad or session-replay SDKs; our event log lives in our Postgres; every outbound host is on a reviewed list.

**A4. Strava's global heatmap (Jan 2018).** An "aggregated and anonymized" heatmap of over a billion activities revealed military bases, because nearly all activity there came from personnel `[secondary]`. *Principle:* aggregates of a small, distinctive group re-identify, and 10–30 classmates is exactly that. *Steal:* no cohort dashboards or leaderboards; cohort statistics in the writeup only above a CSO-set minimum n; the shareable recap carries no health values or times of day.

**A5. Zoom's attention tracking (removed April 2020).** Hosts could see when a participant had another window in focus for over 30 seconds during screen-share; Zoom removed it in a privacy push `[secondary]`. *Principle:* foreground-app tracking reads as surveillance once anyone but the user can see it. *Steal:* the student sees the laptop data first ("what we collected today"), no teammate or instructor view of individuals, one-click pause.

**A6. Moffatt v. Air Canada (2024 BCCRT 149).** The airline was held liable for its chatbot's wrong bereavement-fare policy; the argument that the bot was a separate entity failed `[secondary]`. *Principle:* you own what your LLM says. *Steal:* safety, consent and escalation screens are fixed templates; the LLM writes only the number-checked reason sentence.

**A7. Integrations that silently stop** (one sec's DeviceActivity reports, HealthKit giving up after three missed completions, Fitbit's 410; see B1, B3, B14). *Principle:* silence from an integration looks like "the student is fine". *Steal:* a heartbeat per source (`last_success_at`, `last_observation_at`, a staleness threshold of at least 15 minutes for Google Health); stale sources are shown as stale and excluded from the model.

---

## C. CTO principles for this project

1. **Code computes, the LLM explains, the policy decides.** Typed JSON in; every output number checked against it, with a template fallback; a repeat-query stability check. The LLM can't touch the action, the escalation or the budget.
2. **Bind evidence at generation.** Code builds claims from records; the LLM may only cite claim IDs. That's S-04 done right, and the fix for Liu 2023.
3. **Silence is the default output.** Multi-signal triggers, a daily budget, hysteresis, and a null-world false-alarm rate before any accuracy claim.
4. **Personal, robust, gated baselines.** Median and quantiles over 28 valid nights; 14-night learning; a 5-of-7 gate; flagged nights out; re-baseline on any device, metric or algorithm-version change; never pool brands.
5. **The laptop is the core sensor; the watch is context.** Kaur 2020 worked from workstation context. Watch data is 15+ minutes late, may expire on day 8, and has no evidence linking it to study performance. **Laptop-only must demo end to end.**
6. **On iPhone, the server is the brain.** The web app is a view plus visible pushes: no background work, no phone-only storage.
7. **Minimise at the edge.** Categories, not app names; 5-minute aggregates, not events; daily watch features, not intraday streams. The server can't leak what it never received.
8. **Every source has a lease and a heartbeat.** Token expiry, freshness and coverage are states the student sees.
9. **Version everything a number depends on:** source API, metric, algorithm version, transform, model, prompt, LLM model ID.
10. **Synthetic first, labelled always.** Every stage runs on seeded synthetic days, null world included, before a classmate's data touches it.
11. **Two-way doors fast, one-way doors slow.** Collection from people, vendors in the data path, the schema and anything public get an ADR draft first.
12. **The next-model test.** Build what a better LLM won't make free: gates, the number check, the evaluation harness, trust.

---

## D. Top 10 build steals, ranked

Hours are my planning estimates `[assumption]`, for one competent student, including tests. For scale: if each of three people gives about 10 hours a week to the build for the 5 weeks to Dec 11 `[assumption]`, the team has about 150 hours. This list costs about 100 of them, which is why it stops at 10.

| # | Steal (source) | What we build | Hours | Needed by | Door |
|---|---|---|---|---|---|
| 1 | Numbers out of the LLM (PHIA, Fitbit coach, Wrapped) | Typed JSON contract; LLM verbalises; number validator; template fallback; stability check; pinned model ID | 12 | Dec 4 | Two-way (contract shape becomes one-way once data exists) |
| 2 | Record-bound citations (Perplexity done right; WearLab insights) | Claim objects with record IDs; validator; the evidence popover reads one endpoint | 10 | Dec 4 | Two-way |
| 3 | Personal range bar (Google Flights, Vitals) | Baseline card: median and IQR over 28 valid nights, 14-night learning, 5-of-7 gate, flagged-night exclusion; seeded simulation | 12 | Nov 20 | Two-way |
| 4 | "Still learning" and abstain states (Fitbit Readiness, Vitals) | Named abstain reasons (no source, stale, learning, low coverage, expired token); each one has a UI string | 5 | Nov 20 | Two-way |
| 5 | Quiet by default (Vitals two-of-k, BeReal budget, Epic lesson) | Policy rules: two-signal trigger, one prompt per session window, daily cap, snooze, hysteresis; false-alarm metric in the null world | 10 | Dec 4 | Two-way |
| 6 | Source lease and heartbeat (Google Health migration, OAuth Testing) | One adapter interface; Google Health adapter in Testing; token-expiry state and reconnect prompt; freshness per source; CSV import fallback | 18 | Nov 20 spike, Dec 4 done | **One-way** (vendor in the data path; what's collected) |
| 7 | Category-only laptop collector (ActivityWatch architecture, one sec's opaque tokens) | Mac or Windows collector: OS idle time plus foreground process name mapped to a category on device, name dropped, 5-minute aggregates, local "what we collected" view, pause | 20 | Dec 4 | **One-way** (what's collected from real people) |
| 8 | The web-native Live Activity (S-11 via WebKit) | Home-screen PWA manifest; install instructions; one visible Web Push at break end; in-app countdown; fallback without install | 8 | Dec 4 | Two-way |
| 9 | Forecast phrasing plus factor rows (Apple Weather, Garmin) | Confidence words picked by code from calibrated bins (or omitted); three factor rows taken from the rules that fired | 5 | Dec 4 | Two-way |
| 10 | Batch weekly recap (Spotify Wrapped) | Nightly job writes one recap row per student per week; shareable version from an allowlist with no health values | 6 | Dec 11 (stretch) | Two-way |

Cut first if we're late: #10, then #9's calibration (keep factor rows), then #8's push (keep the in-app countdown). Never cut #1, #4 or #5: the course grades those.

---

## E. Anti-steals and warning signs

**Don't steal:**
- **A Live Activity, Endel-style live HR, or phone app usage before Dec 11.** All need a native iOS app, and phone usage also needs a Screen Time entitlement.
- **A Body Battery or any stress, energy or readiness score.** It needs beat-by-beat data, and the method can't tell positive from negative arousal (Firstbeat's own paper).
- **Rise's daily energy curve.** It needs an unvalidated sleep-need model, and it makes us a copy of a competitor.
- **"Your focus is likely to dip"** (S-05 as written) until calibration data exists.
- **ActivityWatch's default watchers.** They record window titles and URLs.
- **Post-hoc citations**, or any citation the LLM chooses freely.
- **Population ranges** presented as "typical for you".
- **Sampling LLM outputs for checks** when we can check all of them.
- **Any analytics SDK.**
- **Cohort heatmaps or leaderboards.**

**Warning signs in our own work:**
- A prompt that contains a raw time series, or the words "calculate" or "decide".
- A number on screen with no record ID behind it.
- A watch shown "connected" with no new observation in 24 hours.
- A demo that only works with the watch connected.
- An unmeasured false-alarm rate.
- A field named `title`, `url` or `window` in the collector's output.
- A synthetic-data "accuracy" quoted without the word "synthetic".
- A model or prompt change merged without the trap suite.
- Anyone's real data in the repo, even "just to test".

---

## F. What we know / what we don't know yet

### Known (with links)

- Fitbit Web API off since 2 Nov 2026; Google Health replaces it; tokens don't transfer; re-consent required. → B1, [[12-research/science-and-tech-evidence|Science and tech evidence]] §0.
- Google Health exposes HRV (`heart-rate-variability`), daily HRV, daily resting HR, sleep sessions and HR with 1-second storage resolution, with webhooks. Sync is automatic, or about every 15 minutes in the background with Bluetooth on. → section G.
- Google OAuth Testing status gives 7-day refresh tokens for external user types. → B2.
- HealthKit is on-device only, hides read denial, and reports HRV as SDNN. → B3.
- iOS Web Push needs a home-screen install and a user tap, and is always visible; there's no background sync. → B12.
- Live Activities need a native app's widget extension; 8 + 4 hours; 4 KB. → S-11.
- ActivityWatch's window watcher records titles and browser URLs. → B6.
- LLM agents miscount even with code (PHIA 84%), and citations are often unsupported (Liu 2023). → B8, A1.
- The two designs and their conflicts. → [[24-synthesis/design-comparison|Design comparison]]. Open questions → [[24-synthesis/open-decisions|Open decisions]].

### Unknown, and how we find out

Owners are proposals; the team decides.

| # | Unknown | What the public sources say | How to find out | Owner (proposed) | By |
|---|---|---|---|---|---|
| U1 | Does the Google Health API work in Testing mode, without review, for a course pilot? | Conflict: the about page says all scopes are restricted and need review; the verification page says unverified apps are limited to 100 users; Google Cloud help says a test build doesn't need verification | 2-hour spike: create a GCP project, consent screen in Testing, add 3 team members as test users, request one sleep and one health-metrics scope, complete OAuth with the loaner Fitbit. In parallel, ask course staff how the week 3 lab's OAuth helper is registered and whether students can be added as test users | CTO drafts the spike; whoever holds the loaner Fitbit runs it | Nov 9 |
| U2 | Which HRV metric does Google Health return (RMSSD? SDNN? over which window)? | The data-types page names HRV and daily HRV but no metric or window | Pull one night through the API from the spike in U1 and read the field names and units. Store the metric name on every row whatever the answer | Same as U1 | Nov 11 |
| U3 | Does the 7-day refresh-token rule apply to the Health API's restricted scopes? Is there a way around it (e.g. an "Internal" user type in a Columbia Google Workspace org)? | The OAuth page states the 7-day rule for Testing plus external; it says nothing Health-specific. Whether Columbia allows internal-type projects is unknown `[assumption]` | Keep the U1 token and try a refresh on day 8. Ask Columbia IT or course staff about internal-type projects. Design for weekly reconnects regardless | CTO | Nov 13 (day 8 after a Nov 5 spike) |
| U4 | iOS Safari PWA push limits in practice: delivery delay, Focus modes, how many students complete Add to Home Screen | WebKit: home screen plus a tap, always visible, no silent push; background sync unsupported `[secondary]` | Ship a one-page test PWA with one push button to 3–5 classmates' iPhones; log send time vs open time for 3 days; count who finished install from our instructions | UIUX for the install screen; CTO for the logging | Nov 20 |
| U5 | Desktop collector OS: Mac, Windows or both? | Open decision #6. ActivityWatch shows both are feasible. Electron offers system idle time across platforms `[assumption — not opened this session]` | A 2-question poll of likely pilot classmates (laptop OS; willingness to install a collector). Then a 4-hour spike reading idle time and the foreground process name on the majority OS | Team (poll); CTO (spike) | Poll Nov 8; spike Nov 15 |
| U6 | The study task (open decision #2) | Evidence page: practice effects d = 0.36–1.19 for repeated tasks; the 3-minute PVT-B stays sensitive to sleep loss | The CSO owns the choice. The CTO needs: per-item correctness, response time in ms, task and version ID, device, and timestamps on both clocks, to size the `task_outcomes` table and the labels | CSO decides; CTO builds logging | Nov 11 (written draft) |
| U7 | Does the course loaner Fitbit Air report overnight HRV at all? | Open decision #18; WearLab's catalog doesn't cover it | Answered by U2 | Same as U1 | Nov 11 |
| U8 | Which LLM provider and tier? | Evidence page: paid API tiers don't train by default; the Gemini free tier may | `/decide` among two paid options on retention terms, structured-output support and cost at 30 students `[assumption: small]` | CTO memo; team decides | Nov 13 |
| U9 | Is the pilot human-subject research needing review? | Open decision #11 | CSO asks course staff and the IRB office. Real-participant collection is gated on the answer | CSO | Nov 11 |

---

## G. Sources

Opened on 2026-11-04 unless marked `[secondary]` (search summaries or press only).

**Data access and platforms**
- Google Health API about: https://developers.google.com/health/about
- Google Health app verification: https://developers.google.com/health/app-verification
- Google Health data types: https://developers.google.com/health/data-types
- Google Health migration guide: https://developers.google.com/health/migration
- Google OAuth 2.0 (refresh-token expiry): https://developers.google.com/identity/protocols/oauth2
- Google Cloud "Unverified apps" help: https://support.google.com/cloud/answer/7454865
- Google Fit migration FAQ: https://developer.android.com/health-and-fitness/health-connect/migration/fit/faq `[secondary via search]`
- HealthKit privacy: https://developer.apple.com/documentation/healthkit/protecting-user-privacy
- HealthKit background delivery: https://developer.apple.com/documentation/healthkit/hkhealthstore/enablebackgrounddelivery(for:frequency:withcompletion:)
- HealthKit HRV (SDNN): https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/heartratevariabilitysdnn
- Health Auto Export wiki: https://github.com/Lybron/health-auto-export/wiki `[secondary]`
- Oura readiness contributors: https://support.ouraring.com/hc/en-us/articles/360057791533 `[secondary via search]`
- ActivityWatch watchers: https://docs.activitywatch.net/en/latest/watchers.html

**iOS and the web**
- ActivityKit, Displaying live data with Live Activities: https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities
- Family Controls: https://developer.apple.com/documentation/familycontrols
- WebKit, Web Push for web apps on iOS and iPadOS: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
- WebKit, Meet Declarative Web Push: https://webkit.org/blog/16535/meet-declarative-web-push/
- WebKit, Updates to storage policy: https://webkit.org/blog/14403/updates-to-storage-policy/
- PWA limits on iOS (MagicBell): https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide `[secondary]`

**Steal-library products**
- Google Flights deals post: https://blog.google/products/travel/google-flights-find-deals/
- Google Flights coverage: https://tomsguide.com/how-to/google-flights-has-a-new-tool-to-find-you-the-cheapest-airfare-every-time `[secondary]`
- Apple Watch Vitals guide: https://support.apple.com/en-lb/guide/watch/apd15aa7ed96
- Apple Weather for Dark Sky users: https://support.apple.com/102594 `[secondary via search]`
- Garmin Training Readiness manual: https://www8.garmin.com/manuals/webhelp/GUID-31D23DBB-57C2-4DF7-A0C9-8D1A00AB4BE7/EN-US/GUID-C21BE0C8-A08E-4DA1-B6C6-2E0E2DDDB372.html `[secondary via search]`
- Firstbeat, Stress and Recovery Analysis Method (2014): https://www.firstbeat.com/wp-content/uploads/2015/10/Stress-and-recovery_white-paper_20145.pdf
- Garmin Body Battery blog: https://www.garmin.com/en-US/blog/fitness/body-battery-thrive/ `[secondary]`
- Borbély et al. 2016, two-process model reappraisal: https://pubmed.ncbi.nlm.nih.gov/26762182/ `[secondary via search]`
- Rise Science on sleep debt: https://www.risescience.com/blog/natural-energy `[secondary]`
- Gentler Streak coverage: https://www.techradar.com/computing/websites-apps/this-fitness-app-shows-apple-a-better-way-to-track-my-workouts `[secondary]`
- BeReal system-design blog: https://thijshavinga-nl.onrender.com/blog/bereal `[secondary]`
- Spotify Unwrapped (2020): https://engineering.atspotify.com/2020/2/spotify-unwrapped-how-we-brought-you-a-decade-of-data
- Spotify, Inside the Archive (2026): https://engineering.atspotify.com/2026/3/inside-the-archive-2025-wrapped `[secondary via search]`
- one sec, connecting apps to Screen Time: https://tutorials.one-sec.app/en/articles/10336706
- Grüning, Riedel & Lorenz-Spreen 2023 (PNAS): https://pmc.ncbi.nlm.nih.gov/articles/PMC9974409 `[secondary via search]`

**Agents and citations**
- PHIA: https://arxiv.org/abs/2406.06464
- Fitbit personal health coach: https://research.google/blog/how-we-are-building-the-personal-health-coach/
- Liu et al. 2023, Evaluating Verifiability in Generative Search Engines: https://arxiv.org/abs/2304.09848
- Kaur et al. 2020 (CHI): https://microsoft.com/en-us/research/uploads/prod/2020/02/Modeling-Opportune-Moments-for-Transitions-and-Breaks-at-Work.pdf `[secondary via search]`

**Anti-cases**
- NEDA Tessa: https://www.npr.org/2023/06/08/1181131532/eating-disorder-helpline-takes-down-chatbot-after-it-gave-weight-loss-advice `[secondary]`
- GoodRx HBNR: https://www.davispolk.com/insights/client-update/ftc-brings-first-enforcement-action-under-health-breach-notification-rule `[secondary]`
- Strava heatmap: https://www.wareable.com/sport/strava-heat-maps-military-bases-5682 `[secondary]`
- Zoom attention tracking: https://www.medianama.com/2020/04/223-zoom-privacy-ios-facebook-attention-tracking/ `[secondary]`
- Moffatt v. Air Canada: https://www.cbsnews.com/news/aircanada-chatbot-discount-customer `[secondary]`
- one sec developer on DeviceActivity: https://developer.apple.com/forums/thread/819997 `[secondary]`

## Related

- [[09-design/steal-library|Steal library]] · [[13-team/exec-team|AI exec team]] · [[12-research/science-and-tech-evidence|Science and tech evidence]] · [[24-synthesis/casebook|Casebook]] · [[04-agent-engine/algorithm-book|Algorithm Book]] · [[05-data/data-sources|Data sources]] · [[24-synthesis/open-decisions|Open decisions]]

---

## H. Unknowns resolved (2026-11-05)

Desk research against primary docs, opened 2026-11-04/05. It answers briefing U4 and U12 (and §F U1, U2, U3, U4, U7). Labels as above: **Public** = a page I opened says it; `[secondary]` = forum, press or vendor blog; `^[inferred]` = my reasoning. Quotes are short excerpts. **The team decides what changes; nothing here edits a decision.**

**Summary**

| # | Question | Status | One line |
|---|---|---|---|
| H1 | Google Health API in Testing, without verification | **Resolved (docs), one spike left** | Yes: up to 100 hand-listed test users, no security review below 100. Users see an "unverified app" warning. |
| H2 | 7-day refresh tokens; Internal user type | **Resolved: 7 days applies. Internal is a dead end.** | Testing + External = 7-day tokens, Health scopes included. Internal needs a Workspace org, and Google Health can't link to a Workspace account. |
| H3 | Which HRV metric | **Resolved for the metric, partly for the window** | RMSSD in ms. Daily = average RMSSD + deep-sleep RMSSD + non-REM HR + entropy. The window isn't stated in the reference; Fitbit's help says main sleep ≥ 3 h. |
| H4 | Does the Fitbit Air report HRV? | **Resolved (docs), API check left** | Yes: Google's launch post lists HRV, and the data-types page lists Air under daily HRV. |
| H5 | iOS Web Push in 2026 | **Partly resolved** | Rules are documented (Home Screen, gesture, always visible, Focus integration, iOS 26 install change). Real-use delay and install rate need the test. |

### H1. Google Health API in Testing status

**What the docs say (Public).**
- Health API setup page (`developers.google.com/health/setup`), "Add test users": new OAuth clients are "in an unverified state with a cap of 100 users for both testing and production purposes". To authorise during this period "you must manually add each user's email address to the Test users list". The Audience page should show Publishing status "Testing" and User type "External". And: "Supporting more than 100 users with the Google Health API requires completion of a third party security review."
- Google Identity, production readiness (`developers.google.com/identity/protocols/oauth2/production-readiness/overview`): in Testing, "Only users explicitly added to the test user allowlist can access the app (limited to a hard cap of 100 test users)." Verification is "Required for public apps that request sensitive and restricted scopes."
- Google Cloud help, Unverified apps (`support.google.com/cloud/answer/7454865`): "if your app is experimental or a test build, you don't need to go through verification".
- Google Cloud help, Manage app audience (`support.google.com/cloud/answer/15549945`): "Google will display a warning message before allowing a specified test user to authorize scopes". Each test user "consumes a project's test user quota once added".
- Health API about page: "All Google Health API scopes are categorized as Restricted, necessitating a privacy and security review for access." App-verification page: "Most scopes for the Google Health API are restricted" and "you must complete verification before your app is publicly available."
- Setup page, "Link Google Health before OAuth consent": each user "must sign in to the Google Health mobile app to link Google Health to their Google Account" first; the app should call `users.getIdentity` to confirm the link.
- Setup page: "Don't use your production Google Cloud project or its OAuth 2.0 client for testing". There is no sandbox and "Google doesn't provide pre-populated sample or mock health data."

**Reconciling the conflict.** The two statements describe different states, so they don't conflict. "Restricted, review required" is the gate to **public** availability and to **more than 100 users**. "Unverified apps are limited to 100 users" is the state **before** that gate. A Testing-status project with listed test users is the documented pre-review path, and the Health setup page walks you through exactly that. ^[inferred: no page says Google adds a separate Health-specific allowlist before testing; none of the setup sections mention one.]

**What it means for us.** A 10–30 classmate pilot fits under the 100 cap with no CASA. Costs: (a) every participant's email is typed into the console by us; (b) every participant clicks past an "unverified app" warning, so the consent and onboarding copy must explain it (CSO and UIUX); (c) every participant needs a **personal** Google account linked in the Google Health app (see H2).

**Left to confirm: the 1-hour spike** (unchanged from §F U1, now with lower risk). Create a non-production GCP project, enable the Google Health API, configure the consent screen as External/Testing, and add 2 team members who have personal Google accounts linked in the Google Health app. Run the "first call with OAuth 2.0 Playground" codelab with one restricted scope. Call `users.getIdentity`, then list `daily-heart-rate-variability`. **Pass** = an unverified-app warning, then a token, then HTTP 200. **Fail** = a scope or project error, which would mean a hidden Health allowlist.

### H2. Refresh-token lifetime, and the Internal user type

**Resolved: the 7-day rule applies, Health scopes included.**
- Google OAuth 2.0 overview (`developers.google.com/identity/protocols/oauth2`): a project "configured for an external user type and a publishing status of 'Testing' is issued a refresh token expiring in 7 days", unless the only scopes are name, email and profile (`userinfo.email`, `userinfo.profile`, `openid`). Health scopes aren't on that list, so the 7-day rule applies. ^[inferred, but direct]
- The Health setup page says it explicitly for this API: in Testing "the refresh tokens issued are time-based and expire after 7 days". Once "In Production", tokens "generally don't expire unless they are revoked or remain unused for a prolonged period (typically six months)."
- Manage app audience: "Authorizations by a test user will expire seven days from the time of consent", and the refresh token "will also expire".

**Possible way around it (not confirmed).** The Health setup page puts the 100-user cap on unverified clients "for both testing and production purposes" and advises publishing "to avoid 7-day token expirations". That suggests an **unverified app In Production** (100 users, warning screen) gets non-expiring tokens. No page states it outright. ^[inferred] Risks: the console may require a verification submission when you publish with restricted scopes; it's a one-way-ish door (publishing changes who can try to authorise), but it's reversible to Testing. **Team decision; I'd design for weekly reconnects whatever the answer.**

**Internal user type: resolved as not usable for Google Health.**
- Internal requires "Projects associated with a Google Cloud Organization", and authorisation is limited to members of that organisation. Users outside it get an `org_internal` error (Manage app audience). For Internal, "Verification is not required" (production readiness).
- Columbia's LionMail is Google Workspace for Education per CUIT `[secondary: search summary of cuit.columbia.edu/email/lionmail; the page returned 403 to my fetch]`.
- **But** Google Health help, "How to move your Fitbit Account to a Google Account" (`support.google.com/fitbit/answer/14237024`): "You can't link your Google Health account to a Google Workspace account."
- So an Internal (Columbia-org) client could only authorise LionMail accounts, and LionMail accounts can't hold Google Health data. ^[inferred: a strong chain from two primary pages.] Internal is a dead end even if CUIT allowed us a project in the Columbia org. Don't spend time asking CUIT.

**The test that settles the production-status workaround (1 hour plus a day-8 check).** In the H1 spike project, after the first successful token, look for `refresh_token_expires_in` in the token response. Google documents that field as the refresh token's remaining lifetime, set "only … when the user grants time-based access". Whether Testing status sets it is ^[inferred, unverified]. Then click "Publish app" and record what the console demands (verification form or not). If it publishes, re-consent one test user and check the field again. Without the field, the fallback is a refresh attempt on day 8 for both tokens.

### H3. Which HRV metric

**Resolved: RMSSD in milliseconds.** From the REST reference (`developers.google.com/health/reference/rest/v4/users.dataTypes.dataPoints`):
- **`daily-heart-rate-variability`** (Daily record) fields:
  - `date`: "Date (in the user's timezone) of heart rate variability measurement."
  - `averageHeartRateVariabilityMilliseconds`: "A user's average heart rate variability calculated using the root mean square of successive differences (RMSSD)…"
  - `deepSleepRootMeanSquareOfSuccessiveDifferencesMilliseconds`: "The root mean square of successive differences (RMSSD) value during deep sleep."
  - `nonRemHeartRateBeatsPerMinute`.
  - `entropy`: Shannon entropy of beat intervals "measured during sleep".
- **`heart-rate-variability`** (Sample record) fields:
  - `sampleTime`, a single time point. The interval it covers isn't documented.
  - `rootMeanSquareOfSuccessiveDifferencesMilliseconds`, valid range [1, 200].
  - `standardDeviationMilliseconds`: "The standard deviation of the heart rate variability measurement". This is **not** labelled SDNN, so don't treat it as Apple-comparable SDNN.
  - Metadata `highFrequencyPower` (0.15–0.4 Hz) and `lowFrequencyPower` (0.04–0.15 Hz).

**The window: partly resolved.**
- The reference doesn't say which period the daily average covers.
- Google Health help, heart rate (`support.google.com/googlehealth/answer/14237938`): Fitbit uses "Root mean square of successive differences (RMSSD)". The "latest HRV measurement is from the longest sleep period over the past 24 hours." "Only sleep periods greater than 3 hours are considered."
- Legacy Fitbit Get HRV Summary (`dev.fitbit.com/.../get-hrv-summary-by-date/`, still online):
  - "main sleep" = "the longest single period of time asleep on a given date".
  - `dailyRmssd` measures "short-term variability in the user's daily heart rate"; `deepRmssd` does so "while in deep sleep".
  - "Data is only processed when the user is still"; a minimum of 3 hours of sleep is needed.
  - A premium subscription "is not needed" for HRV.
- **Mapping** ^[inferred from matching names and definitions]: `dailyRmssd` → `averageHeartRateVariabilityMilliseconds`; `deepRmssd` → `deepSleepRootMeanSquareOfSuccessiveDifferencesMilliseconds`; intraday `rmssd` (plus `hf`/`lf`) → `heart-rate-variability` samples.
- **The migration guide doesn't map HRV.** It doesn't mention dailyRmssd or deepRmssd. Google points to a "Parity Tool" on the Get Started page, which I didn't open.
- **The `[check]` on "the old endpoint was RMSSD during sleep"** is confirmed for deepRmssd and for the main-sleep scope.

**What it means for us.**
- Baseline on **`averageHeartRateVariabilityMilliseconds`**, store **`deepSleep…`** alongside it, and record the metric name and API version on every row (§C, version every input).
- A night under 3 h of sleep gives **no value**, which counts as missing, not 0, against the 5-of-7 gate.
- Never pool with Apple's SDNN or Oura's values.

**Left to confirm (1 hour, after one worn night):** in the H1 spike, pull `daily-heart-rate-variability` and `heart-rate-variability` for one night. Compare the daily value with the Google Health app's HRV screen; it should match if it's the main-sleep value. Count the samples and their spacing to learn the sample window.

### H4. Does the Fitbit Air report HRV?

**Resolved (Public).**
- Google's launch post "Introducing the all-new Fitbit Air" (blog.google, 7 May 2026) lists "heart rate variability, sleep stages and duration" among tracked metrics. HRV isn't tied to a Premium-only footnote; footnote 3 says only that "some" features need Premium.
- The Health API data-types page (`developers.google.com/health/data-types`) lists **Air** among devices for `daily-heart-rate-variability`, `heart-rate-variability`, `daily-resting-heart-rate` and `sleep`.
- Caveat ^[inferred]: the same page lists Alta, Flex 2 and MobileTrack, which have no heart-rate sensor, under `heart-rate-variability`. So the device lists are generic and aren't proof on their own; the launch post is the stronger source.
- "Get started with Google Fitbit Air" help page doesn't mention HRV. Google's store spec pages didn't render for me.

**Left to confirm:** the same one-night pull as H3, from the loaner Air. A non-empty `daily-heart-rate-variability` closes it.

### H5. iOS Web Push in 2026

**Resolved (Public): the rules.**
- **Home Screen only.** WebKit, Web Push for Web Apps on iOS and iPadOS (`webkit.org/blog/13878`, 16 Feb 2023, iOS 16.4): "A web app that has been added to the Home Screen can request permission to receive push notifications".
- **A user gesture.** The request must be "in response to direct user interaction". Apple, Sending web push notifications (developer.apple.com, usernotifications): call the subscribe method "immediately from the gesture's event handler".
- **Always visible.** Apple: "Safari doesn't support invisible push notifications. … If you don't, Safari revokes the push notification permission for your site." WebKit, Meet Declarative Web Push (`webkit.org/blog/16535`, 27 Mar 2025): "no silent push messages are allowed". Declarative Web Push (iOS/iPadOS 18.4+) shows the notification without running service-worker code, and "there is no penalty for service workers failing to display a notification". It exists partly because "ITP deletes all website data for websites you haven't visited in a while", service worker included.
- **Where they show, and Focus.** WebKit 13878: "They show on the Lock Screen, in Notification Center, and on a paired Apple Watch." "Notifications for Home Screen web apps on iPhone and iPad integrate with Focus." So a Study or Sleep Focus can silence us, and that's the user's control, which is correct.
- **Delivery and timing.**
  - Apple's doc: `Urgency` is "very-low, low, normal, or high"; "To attempt to deliver the notification immediately, specify high". `TTL` lets the push service hold a message "for 30 days or fewer"; it "attempts to deliver the notification the next time the device activates and is available online."
  - Delivery to a closed web app goes through APNs to the service worker, or declaratively; WebKit says badges update as the app handles push events "in the background". ^[inferred: no page states it in so many words.]
  - **No public SLA on latency.** Low Power Mode and Wi-Fi delays are reported only by vendors `[secondary: izooto, progressier help pages]`.
- **iOS 26 change.** WebKit Features in Safari 26.0 (`webkit.org/blog/17333`, 15 Sep 2025): "By default, every website added to the Home Screen opens as a web app". It "no longer requires a manifest file", and "there are now zero requirements for 'installability' in Safari". Add to Home Screen is still required for push, but it no longer depends on our manifest being right.
- **iOS 17 / 18.** Nothing push-specific that I found beyond 18.4 Declarative Web Push. Push from a Safari tab still isn't supported on iPhone `[secondary: WebKit staff post relayed on mjtsai.com]`.

**Unresolvable from docs:** real delivery delay, how Focus and Low Power Mode behave in practice, and how many classmates finish Add to Home Screen.

**The 1-hour test** (replaces §F U4's 3-day version as the first step):
1. Deploy a one-page HTTPS web app: a manifest, a service worker, and a "Turn on reminders" button that subscribes with VAPID and posts the subscription to a logging endpoint. Use the Declarative Web Push payload where iOS ≥ 18.4.
2. Give written Add-to-Home-Screen instructions to 3–5 classmates on iPhones and time them. Record iOS version, success (yes/no) and minutes taken.
3. Send 6 pushes at `Urgency: high` over 40 minutes under 4 conditions:
   - app closed, screen locked;
   - Low Power Mode on;
   - a Focus on with our app not allowed;
   - a Focus on with our app allowed.
   Log the server send time against `notificationclick` or the open time, and ask each person to screenshot the lock screen.
4. **Pass for the pilot:** ≥ 80% install success; median send-to-display under 60 s with the app closed; Focus behaves as documented.
5. Repeat one push per day for 3 days to catch subscription loss after idle days (ITP).

### Changes these answers suggest (proposals; the team decides)

1. **§F rows U1, U2, U3 and U7** narrow to the two confirmation spikes above (H1 spike, then the one-night pull). Internal user type: dropped.
2. **The data-access plan:**
   - every participant needs a **personal** Google account linked in the Google Health app;
   - we type their email into the console;
   - they click past the unverified warning;
   - they reconnect weekly unless the production-status test (H2) shows otherwise.
   The CSO's consent text and the UIUX onboarding need all four.
3. **The schema:** a `hrv_daily` row stores `avg_rmssd_ms`, `deep_rmssd_ms`, `nonrem_hr_bpm`, `entropy`, `source_metric`, `api_version`; a night with < 3 h sleep stores **no row**, never 0.
4. **The date to re-check.** The legacy Fitbit HRV page says support ended 30 Sep 2026 and the API was "turned off" on **30 Oct 2026**. Our files say 2 Nov 2026. That's a one-line fix in `12-research/science-and-tech-evidence.md` §0 for whoever owns it. Either way, it's off now.

**Sources for this section** (opened 2026-11-04/05):
- https://developers.google.com/health/setup
- https://developers.google.com/health/about
- https://developers.google.com/health/app-verification
- https://developers.google.com/health/data-types
- https://developers.google.com/health/reference/rest/v4/users.dataTypes.dataPoints
- https://developers.google.com/health/migration
- https://developers.google.com/health/get-started
- https://developers.google.com/identity/protocols/oauth2
- https://developers.google.com/identity/protocols/oauth2/production-readiness/overview
- https://developers.google.com/identity/protocols/oauth2/web-server
- https://support.google.com/cloud/answer/7454865
- https://support.google.com/cloud/answer/15549945
- https://support.google.com/cloud/answer/13464321
- https://support.google.com/fitbit/answer/14237024
- https://support.google.com/googlehealth/answer/14237938
- https://support.google.com/fitbit/answer/14236917
- https://support.google.com/googlehealth/answer/17033101
- https://blog.google/intl/en-nz/products/introducing-the-all-new-fitbit-air/
- https://dev.fitbit.com/build/reference/web-api/heartrate-variability/get-hrv-summary-by-date/
- https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
- https://webkit.org/blog/16535/meet-declarative-web-push/
- https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers (read via its JSON data endpoint)
- `[secondary]`:
  - https://cuit.columbia.edu/email/lionmail (403 to my fetch; search summary only)
  - https://mjtsai.com/blog/?p=49472
  - https://intercom.help/progressier/en/articles/7212230-troubleshooting-web-push-notifications-on-ios
  - https://help.izooto.com/docs/notifications-delayed
