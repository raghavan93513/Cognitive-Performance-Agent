---
title: Market Map
category: 24-synthesis
tags: [synthesis, students, wearables, research]
aliases: [market, allied markets, who pays, target market data]
sources: ["desk research 2026-11-04 (sources listed at the bottom)", "https://developers.google.com/health/about"]
summary: "Our markets and allied markets with sourced sizes, who pays, our students and athletes in numbers, GTM patterns, retention benchmarks, and recent changes (Fitbit API off)."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: core
created: 2026-11-04T23:59:00Z
updated: 2026-11-04T23:59:00Z
---

# Market Map

The CEO and CMO seats' knowledge base on markets: where we sit, who pays, what our users' lives look like in numbers, and how products like ours reached students and athletes. Desk research from 2026-11-04.

**How to read the labels:**
- `[unverified]` means the source was seen only in a search snippet or secondary write-up, so open it before quoting.
- `^[inferred]` marks our own synthesis.

Device capabilities and incumbents' readiness and stress features are on [[24-synthesis/competitive-landscape|Competitive landscape]]. Case studies are on [[24-synthesis/casebook|Casebook]].

## 0. Changed recently: know these first

1. **The Fitbit Web API was turned off on 2 Nov 2026.** Support ended 30 Sep 2026. Old endpoints now return `410 Gone`. The replacement **Google Health API** uses Google OAuth, and *all* its scopes are "Restricted", "necessitating a privacy and security review for access" (Google's page, opened 2026-11-04).
   - It offers sleep, heart rate, HRV, daily HRV, daily resting HR and steps.
   - Whether a course project can use it in testing mode without the review is **not stated** on the pages we read. That's an open item for the CTO.
   - The course's Fitbit route needs re-checking now. See [[24-synthesis/open-decisions|Open decisions]] #4 and #18.
2. **FDA rewrote its General Wellness guidance on 6 Jan 2026.**
   - Still wellness: non-invasive estimates (HRV, SpO2, even blood pressure), with optional "talk to a healthcare professional" prompts.
   - Not wellness: anything naming a disease or diagnostic threshold, claiming "medical-grade" or clinical accuracy, giving treatment guidance, or alerting the user toward clinical action.
   - FDA closed its 2025 warning letter to WHOOP on 17 Jun 2026.
3. **WHOOP raised $575M at a $10.1B valuation** (31 Mar 2026). **Oura filed publicly for a Nasdaq IPO** (3 Sep 2026). Whether the IPO priced is `[unverified]`.
4. **A jury found Meta liable** (1 Aug 2025) under California's wiretap law for data its SDK collected from the Flo period app. Third-party SDKs in health apps now carry real legal risk.

## 1. Segments and who pays

| Segment | Size and dynamics (sourced) | Who pays |
|---|---|---|
| Consumer wearables and rings | IDC: about 148M wearables shipped in Q2 2026 (+2.7%); smartwatches 25% of units (−4.2%); rings 0.8% but +37.6%, with Oura holding 67% of rings. Rock Health (Dec 2025, n=8,000): **46% of US adults own a wearable** (13% in 2015), and 26% use one to track sleep | Consumer: hardware, sometimes plus a subscription |
| Recovery and readiness platforms | **WHOOP:** 2.5M+ members, $1.1B bookings run rate (+103%), cash-flow positive in 2025, $199–$359 a year. **Oura** (S-1 as reported): FY2025 revenue $907.9M; $1.21B in the nine months to Jun 2026 (+74%); 5.0M paid members; ~85% 12-month member retention; DAU/MAU ~65% | Consumer subscription; teams and employers buy B2B |
| Focus, productivity and screen time | No reliable sizing. Forest installs and Freedom user counts are self-reported or modelled `[unverified]`. Adjacent: Duolingo has 50.5M DAU and 11.5M paid (Q3 2025). Chegg subscribers fell 31% and revenue 30% in Q1 2025, which Chegg blamed on AI | Consumer freemium or one-time fee |
| Sleep apps | No credible size. Calm's revenue estimates range from $164M to $596M, so don't trust any of them. Rise Science raised $15.5M and charges $60 a year | Consumer subscription, some employers |
| Student mental health (B2B2C) | **TimelyCare:** 400+ campuses, ~3M students. **Uwill:** 400+ colleges `[unverified]`, Headspace's exclusive higher-ed partner since Jun 2024. WashU's first TimelyCare year cost "upwards of $500,000", framed as a one-year "safety net" for counselling waits | **The university**, via the student fee; students use it free |
| College-athletics performance tech | **Catapult:** FY26 revenue $140.7M, 5,500+ teams, >96% retention. **Teamworks:** $235M raised at >$1B `[unverified]`. **WHOOP:** Conference USA's official wearable (2021) and every Penn State athlete via WHOOP Unite (2022), where athletes **opt in** to a team dashboard. **Budget squeeze:** the House v. NCAA settlement lets schools share up to $20.5M a year with athletes | **The athletic department**, sometimes via a sponsor |
| Allied: digital health, corporate wellbeing, EAP | US digital-health venture funding was $14.2B across 482 deals in 2025 (+35%). EAP utilization is typically ~5–9% `[unverified]` | Employer or health plan |

**Who pays, in one line each** ^[inferred]:
- **Consumers** pay only for a daily ritual they care about (Oura's morning, WHOOP's recovery).
- **Universities** buy in one-year trials, through fees, to fix counselling waits, and renew on *use*.
- **Athletic departments** have budget but now weigh it against payments to athletes.
- **Employers** buy widely and see little use: the same trap a campus deal can fall into.

While we're a course project, the realistic paths are free use, open source or research. University and athletics deals need outcome evidence we don't have yet. ^[inferred]

## 2. Our users in numbers

### College students

**ACHA-NCHA III, Spring 2025** (47,194 undergraduates at 96 schools):
- **Stress in the last 30 days:** 50.9% moderate, 25.3% high, only 1.9% none.
- **What hurt academics in the last year:** procrastination 48.8%, stress 38.3%, anxiety 31.5%, **sleep difficulties 23.6%**, depression 21.1%, ADHD 13.5%.
- **Sleep:**
  - 41.9% sleep under 7 hours on weeknights.
  - 75.5% felt tired or sleepy during the day on 3 or more of the last 7 days.
  - Only 44.9% got enough sleep to feel rested on 3 or more of 7 days.
- **Diagnoses ever:** anxiety 35.0%, ADHD 15.6%.
- **Distress and loneliness:** 20.0% screen for serious psychological distress; 48.5% screen positive for loneliness.

**Healthy Minds 2024–25** (84,000+ students):
- Depression is 37% and anxiety 32%, the third straight year of improvement.
- 60% of students with symptoms got treatment.
- Top barriers to treatment: time, cost, and preferring to handle it alone.

**Sleep and grades** (review, correlational): students sleeping 9 hours or more averaged a 3.24 GPA, versus 2.74 at 6 hours or less.

**Wearable ownership at 18–24:** no recent primary US figure was found. Owners skew young. **Plan for roughly half of students having no tracker**, so the laptop-only path is core, not an edge case. ^[inferred]

### Student-athletes

**NCAA GOALS 2019:**
- Division I in-season athletics takes **31–42 hours a week**, plus 29–39 hours of academics.
- 21–33% said difficulties were "piling up so high" they couldn't overcome them.
- 27% of men and 38% of women wished coaches talked more about sleep.

**NCAA wellness study 2022–23** (23,000+ athletes):
- Felt overwhelmed: men 17%, women 44%.
- Academics is the top stressor.

**NCAA Social Environments 2024:**
- Needed mental-health care in the past year: men 22%, women 52%. Actually sought it: 12% and 34%.
- "Nobody can know I am seeking care" would help **36% of men** and 25% of women.

So privacy from coaches and staff is a barrier to getting help, not a nice-to-have. ^[inferred]

## 3. How products reached students and athletes

- **Athlete-first, then everyone.**
  - WHOOP started from a college squash captain's overtraining, then grew through conference and department deals with athlete opt-in dashboards.
  - Rise Science started in Northwestern football, then launched a consumer "energy" app ($60 a year; users opened it 14 of 28 days in beta).
  - Both sell an **outcome** (recovery, energy), not raw data.
- **Organic plus retail.** Oura's marketing lead credits mostly organic celebrity wear and word of mouth, then 4,000+ retail stores. US awareness grew from ~5% (2022) to 30%.
- **Campus ambassadors only after product-market fit.** a16z: "There is no marketing strategy that will fix a product that its core audience won't use!" Start with one campus, one lead and 2–3 ambassadors, recruited through clubs and athletes. Published outcomes are anecdotal.
- **University deals:** slow and annual, often reached faster by plugging into an incumbent vendor (as Headspace did through Uwill).
- **App stores convert poorly.** Akili's over-the-counter app got 126K downloads but only 4.2K active users, about 3%.

## 4. Retention benchmarks (plan around these)

| Benchmark | Number | Source quality |
|---|---|---|
| Median 30-day retention, mental-health apps (93 apps) | **3.3%** (mindfulness 4.7%, trackers 6.1%, peer support 8.9%) | Baumel, JMIR 2019 (opened) |
| Day-30 retention, health and fitness apps | ~3–8% | `[unverified]` commercial benchmarks |
| Wearable abandonment | ~1/3 within 6 months (2013) | `[unverified]`, old, disputed by Fitbit |
| Best case: Oura paid members | ~85% at 12 months, DAU/MAU ~65% | S-1 as reported |

Retention comes from a **daily ritual tied to a moment** (Oura's morning check) or from **social or team structure** (WHOOP Unite), not from content. For us, the moment is the start of a study session. ^[inferred]

## 5. Implied path (if we keep going after Dec 11) ^[inferred]

1. **Course:** a measured classmate pilot. Report retention honestly against the 3.3% baseline, and say what the evidence can and can't show.
2. **Columbia pilot:** one or two clubs or teams, a student lead, 4-week retention. Publish an honest evaluation.
3. **Only then:** the wellness office or athletics, ideally as an add-on to an existing vendor (TimelyCare, Uwill).
4. **Never:** ads or analytics SDKs near health data, clinical claims, or a coach view.

## Sources (opened 2026-11-04 unless marked)

- Google Health API (Fitbit turn-off, restricted scopes, data types): https://developers.google.com/health/about · https://developers.google.com/health/data-types
- FDA general wellness revision (Covington summary): https://cov.com/en/news-and-insights/insights/2026/01/fda-issues-revised-guidance-on-general-wellness-products
- FDA WHOOP closeout: https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/whoop-inc-709755-06172026
- IDC wearables: https://www.idc.com/promo/wearablevendor/vendor
- Rock Health consumer adoption 2025: https://rockhealth.com/?p=41500
- Rock Health 2025 funding: https://rockhealth.com/rock-weekly/2025-year-end-funding-14-2b-raised-across-482-deals/
- WHOOP Series G: https://thenextweb.com/news/whoop-series-g-575m-valuation-ipo-health-platform
- Oura S-1 summary: https://the5krunner.com/2026/09/04/oura-ipo-s1-revenue/
- Oura marketing: https://www.modernretail.co/marketing/doug-sweeny-is-the-marketer-behind-ouras-1b-year/
- Catapult FY26: https://finance.yahoo.com/markets/stocks/articles/catapult-delivers-record-revenue-operating-012300534.html
- WHOOP and Conference USA: https://conferenceusa.com/news/2021/7/14/general-whoop-joins-conference-usa-as-official-fitness-wearable.aspx
- WHOOP Unite at Penn State: https://onwardstate.com/2022/08/16/penn-state-athletics-partners-with-whoop-for-health-insights/
- House v. NCAA: https://www.cbssports.com/college-football/news/house-v-ncaa-settlement-approved-landmark-decision-opens-door-for-revenue-sharing-in-college-athletics
- TimelyCare: https://timelycare.com/about-us/
- TimelyCare at WashU: https://www.studlife.com/news/2021/10/18/wu-partners-with-telehealth-company-timelycare-to-provide-students-with-medical-and-mental-health-safety-net
- Headspace and Uwill: https://bhbusiness.com/2024/06/12/headspace-targets-college-students-with-uwill-partnership/
- Duolingo Q3 2025: https://www.sec.gov/Archives/edgar/data/1562088/000162828025049514/q3fy25duolingo9-30x25share.htm
- Chegg Q1 2025: https://www.edtechinnovationhub.com/news/chegg-q1-2025-revenue-down-30-as-company-restructures-and-explores-strategic-alternatives
- Rise Science: https://news.crunchbase.com/health-wellness-biotech/get-out-of-sleep-debt-rise-science-secures-15-5m-for-app-to-boost-energy-levels/
- ACHA-NCHA Spring 2025: https://www.acha.org/wp-content/uploads/NCHA-IIIb_SPRING_2025_UNDERGRADUATE_REFERENCE_GROUP_INSTITUTIONAL_EXECUTIVE_SUMMARY.pdf
- Healthy Minds 2024–25: https://www.bu.edu/sph/news/articles/2025/college-students-reports-of-depression-anxiety-suicidal-thoughts-continue-move-in-positive-direction
- Sleep and GPA review: https://pmc.ncbi.nlm.nih.gov/articles/PMC4075951
- NCAA GOALS 2019: https://ncaaorg.s3.amazonaws.com/research/goals/2020D1RES_GOALS2020con.pdf
- NCAA wellness study: https://www.espn.com/espn/story/_/id/39106657/less-mental-health-concerns-post-pandemic
- NCAA Social Environments 2024: https://ncaaorg.s3.amazonaws.com/research/socenv/2024RES_SocEnv-FARAPres.pdf
- Akili: https://bhbusiness.com/2023/09/13/akili-bails-on-prescription-digital-therapeutic-route-lays-off-40-of-staff/
- Baumel 2019: https://pmc.ncbi.nlm.nih.gov/articles/PMC6785720/
- a16z ambassadors: https://future.a16z.com/college-ambassador-program-how-to-for-startups/
- Meta and Flo verdict: https://www.lawdragon.com/news-features/2025-08-25-big-tech-on-trial-jury-finds-meta-liable-for-misusing-women-health-data

## Related

- [[24-synthesis/24-synthesis|Synthesis hub]] · [[24-synthesis/competitive-landscape|Competitive landscape]] · [[24-synthesis/casebook|Casebook]] · [[13-team/exec-team|AI exec team]] · [[03-users/personas/icp-personas|ICP personas]]
