---
title: Hot Cache
updated: 2026-11-15T17:10:00Z
---

# Hot Cache

*A ~500-word semantic snapshot of recent activity. Updated after every major write operation.*

## Recent Activity

- [2026-11-15] **Everything since Nov 6 is committed locally** on `heramb-setup+context`, in sorted commits by topic. It is not pushed. Uncommitted `.obsidian` settings and the ICP testing screenshots stay out on purpose.

- [2026-11-15] **Spikes on measuring device use** (routes from the declutter brief). Neither is in `site/` or tested by a real tester.
  - **Phone:** route B (an iOS Shortcuts "app opened/closed" automation posting to our endpoint) works on paper, with caveats. Route D (a dev-signed Family Controls app) works for a few testers, but needs a paid Apple team and a Mac. A two-phone test by Nov 21 decides. See [[25-journal/2026-11-15-spike-phone-use]].
  - **Laptop:** route C is a 2-permission Chrome/Edge extension. It splits a session into picked sites, other tabs, outside the browser and away, and Halftime gets only the four totals. All checks pass on a Mac; Windows and Edge are untested; about 13–18 h to pilot. See [[25-journal/2026-11-15-spike-laptop-use]].

- [2026-11-15] **Heramb's call: Halftime becomes one product that links last night's body to today's phone and laptop use.**
  - The app was "way too cluttered". The brief cuts the 9-step sign-up, the tour, the Demo tab, the fake pairing and Allow screens, and the sample calendar and week. What's left is 4 screens (Today as "the two halves", Session, Check-in, Week) plus a privacy sheet: 5 taps to a timer, down from ~24.
  - The new metric is a comparison with its night count, not a combined score. Code computes it and an LLM only writes the sentence, which fills the missing-LLM gap.
  - Device use is to be measured, not just asked ("we'll find a way"). A web page can't read Screen Time or laptop apps, so routes A–F (page-hidden time, iOS Shortcuts, a browser extension, a native app…) get spikes with a kill rule.
  - Six ICP testers: 4 MEH, 2 I'D QUIT, 4.5/10. They want the link, with n shown, no app names, and a person to talk to.
  - The team (Raghavan, Alexa, Yulee) and the CSO still decide the cuts, the 25/5 arm, the threshold, consent and escalation.
  - Nothing in `site/` has changed. See [[24-synthesis/declutter-brief-2026-11-15]].

- [2026-11-15] **ICP testing 1 and a bug hunt.**
  - **The framework:** a new reusable one (`ICP testing/`), plus a sixth tester, ICP_6 Ethan Park (MS student and club rower, WHOOP).
  - **The test:** a 2-day full journey on phone and laptop, with made-up nights. Verdict I'D QUIT, 4/10, SUS 52.5. The one fix asked for: "stop for tonight" based on tomorrow's calendar.
  - **The fixes:** the quick bugs, a UI/UX batch and 23 of 26 bugs from a bug hunt were fixed and deployed (the local server no longer writes to the live database). Synthetic testers, not research.

- [2026-11-14] **How Halftime's variables connect, and what a wearable can give us.**
  - Rule v0 reads only sleep, the clock and the session end. HRV, resting HR, usual sleep and app switches never reach it and are never logged, so "does watch data help?" can't be tested yet.
  - Research covered ~60 metrics and five brands, and six citations were checked. Sleep length has the best student evidence. Borrow the brands' rules (personal baselines, waiting periods, named "not enough data" reasons), never their composite scores.
  - See [[05-data/variable-map]], [[12-research/wearable-metrics-and-devices]] and [[25-journal/2026-11-13-connecting-the-sources]] (live Fitbit on one computer, the data layer, `/desktop`).

- [2026-11-14] **A Night tab reads Heramb's WHOOP 4.0 over Bluetooth, with no membership.** Bare minimum by his choice: one sentence, what it changes today, the night on a clock, and sleep, resting HR and HRV against your usual. Sleep feeds the study setup (never logged); readings stay in the browser. A phone can't read the band; showing it there needs a team decision. Live at https://halftime-study.vercel.app/app (Night tab), with a quieter History and Now. Not yet run on a real night; not committed. See [[25-journal/2026-11-14-night-tab-whoop]].

- [2026-11-13] **The phone app runs real study sessions.** Live at https://halftime-study.vercel.app/app.
  - The Now tab is your own session: a real timer, one suggestion with reasons and sources, a break countdown, then a 3-question check-in; the SUS after 3 sessions. The sample day moved to the Demo tab.
  - Each session is randomly Halftime's timing or a fixed 25/5 timer; `/admin` → Study compares them.
  - Consent before the first session; "Delete my data" on the You tab; the landing claims were reworded (Heramb).
  - The database part is in (Heramb ran the SQL): notifications are switched on, Delete my data works live. A notification on a physical locked iPhone is still untested. IRB / consent review is still open.

  - **Laptop version:** the same `/app` lays itself out for a laptop (top bar, two columns, the timer in the tab title, keyboard shortcuts, an always-on-top mini timer in Chrome). `/desktop` stays as the every-source-on-one-clock view.
  - **Laptop QA round 2 + MacBook preview:** 9 laptop issues fixed and deployed; `/preview` shows the real app inside a drawn MacBook Air/Pro at true browser-window size (team only). Laptop push now works end to end in a scripted real Chrome (the consent screen used to leave notifications off); not yet re-tried in Heramb's own Chrome.
  See [[25-journal/2026-11-13-real-study-sessions]].

- [2026-11-10] **Written proposal drafted** in a new "Draft" tab of the team's Google Doc (due Nov 11).
  - The team's outline pitched a task manager and left the control group, roles and data source open.
  - The draft keeps the keep-going-or-break pitch. It proposes a Pomodoro control (each person tries both), a study-task outcome, Apple Health or uploaded exports as the Fitbit fallback, first testers on Nov 24, and a roles list.
  - The roles of Raghavan, Alexa and Yulee are guesses to confirm.

  See [[25-journal/2026-11-10-written-proposal-draft]].
- [2026-11-06] **Admin login renamed and a demo script written.**
  - The `/admin` account is now `admin`, with a short password Heramb chose, kept outside the repo. Change it after the handout.
  - The 90-second demo has one main moment, one honesty beat and the QR code at the end. See [[09-design/prototype-demo-script]].

- [2026-11-06] **Analytics now go to Supabase, with an admin page** at https://halftime-study.vercel.app/admin, built like Startup City's.
  - It shows who's on now, the funnel, the tour, a tap heat map on the real screens, and each visitor's timeline.
  - It held up with 50 people at once (0 lost events).
  - A phone QA pass fixed 11 defect groups. The biggest was the no-wearable safety card quoting sleep data.

  See [[25-journal/2026-11-06-demo-app-and-analytics]].

- [2026-11-06] **The demo app has heart data, a dummy calendar, a first-run tour, and a landing comparison chart.** All are live at https://halftime-study.vercel.app/.
  - **Heart data:** sleep, heart rate, resting heart rate and HRV, each against your own usual and shown as context. This is Heramb's decision; the team must confirm it.
  - **Calendar:** a student's day or an athlete's day; the next stop comes from it.
  - **Tour:** runs right after every new setup. A welcome card (the tagline plus your wearable vs study apps vs Halftime) comes first, then 8 spotlight steps on springs.
  - **Analytics:** always on by default, with no pop-up and no setup switch; the You tab can turn it off.
  - **Tested:** 7 devices at once, 0 errors.

  See [[25-journal/2026-11-06-demo-app-and-analytics]].

- [2026-11-06] **The site is now a working demo app**, on sample data, with usage analytics.
  - **The flow:** landing → log in with a name, or create an account → any wearable, or none (sample sleep is shown anyway) → the app, with Now, History, You and Demo tabs.
  - **Analytics:** screens, time, taps, scroll, attention, movement, device, IP address. It goes to the Google Sheet "Halftime prototype analytics", recorded by default with an off switch (the first-visit notice was removed).
  - **Tested:** 7 visitors at once on 7 devices, 0 JS errors.
  - **Not done yet:** the team must deploy the Apps Script and add 2 Vercel env vars before rows reach the sheet.

  See [[25-journal/2026-11-06-demo-app-and-analytics]].
- [2026-11-05] **Every screen stitched into one journey:** https://claude.ai/artifact/YJ7dhaYckaNcexVPUWt3XY.
  - 41 screens, in seven chapters of one student's week: finds it, sets it up, studies with it, isn't sure, gets it wrong, needs a person, owns their data.
  - Each screen opens live in a phone frame.
  - Plus 11 explorations, with the team's picks tagged.
  - **Still missing:** a history view, the laptop app's own screens, and a full first-run consent flow.

  See [[09-design/screen-gallery]].
- [2026-11-05] **The Halftime landing page is live** at https://halftime-study.vercel.app/. It's a demo with sample data, not indexed. See [[09-design/landing-page]].
  - **Words:** rebuilt over 11 rounds from five ICP tests (teach-back ×2, the "Three steps" section with the CMO, moments, hero) and two boardrooms (privacy blanks; leading with late night).
  - **Team picks:**
    - Heramb chose "How it works" direction A, "The thread", played by scroll.
    - Heramb chose the trust sections as "Mix: E then D": a laptop X-ray switch, then scroll-played honesty cards and joining ticks.
  - **Built for every screen:** 13 sizes from a 280 px Fold to desktop. Labels stay at least 12.3 px on screen.
  - **Hosted on Vercel**, with a strict CSP.
  - **Made smooth:**
    - Scroll layouts fell from ~700 to ~104, and paints from 1,047 to 196.
    - In Safari's engine (iOS 26.5 simulator), the page's frame code fell by 61%.
    - A Safari-only pill overflow was fixed.
    - Not checked on a physical iPhone.

  Session: [[25-journal/2026-11-05-landing-build-host-smooth]].
- [2026-11-05] **Suggestion card, round 3: Island + Forecast.** Round 1 (calm cards) was rejected as too plain; from round 2 the team picked the Island, and from round 1 the B Forecast line. The UIUX seat combined them: a Dynamic-Island pill speaks once, the session line shows where a 5-minute walk fits before the next class, and accepting turns the pill into a live countdown. Seven states on three iPhone sizes, all checks pass. Files in `design/mockups/suggestion-card-v3/`. Next: `/icp` and `/crit`, then the CMO locks the words.
- [2026-11-05] **Pre-build study by the CEO, CTO, CMO and CSO, in parallel.** Each wrote a steal file from the steal library plus live research; the synthesis is [[13-team/pre-build-briefing]]. Top unknowns:
  - **IRB:** Columbia's policy exempts only *anonymous*, non-internet course exercises, so ask course staff by Nov 7.
  - **Study task and outcome:** PVT-B is the lead option; decide by Nov 11.
  - **Wearable route:** does Google Health work in Testing mode, and which HRV metric does it return? Spike by Nov 9–11.
  - **Scope:** lean vs production (ADR-002) by Nov 11.
  - **Audience:** students only for Nov 6.

  Corrected Kaur 2020 (the 77% is from a 3-day deployment) and Oura's growth claim.

- [2026-11-05] **The UIUX seat studied every Steal Library product**: about 60 products in 9 parallel studies with about 400 sources. All 12 Steal Cards were corrected and are now `researched`. Headline rules: an easy "keep going" beats persuasion (one sec, PNAS 2023); confidence is a word plus a count; a band of your own range, not a score or gauge (FDA's 2025 letter to WHOOP); consent built as GOV.UK question pages; Live Activities need a native app. See [[09-design/studies/design-studies]].
- [2026-11-05] **Steal library filled.** It has 12 Steal Cards and a study list of about 50 products across wearables, student apps, finance, weather, navigation, games, government and luxury. None has been opened yet; open each before relying on it. See [[09-design/steal-library]].
- [2026-11-05] **The Fitbit Web API was turned off on 2 Nov 2026** (checked on Google's page). Fitbit data now goes through the Google Health API, which has restricted scopes, a 100-user cap while unverified, and ~15-minute sync. Every user must re-consent. This changes watch decision #4. See [[12-research/science-and-tech-evidence]] §0 and §6.
- [2026-11-05] **Five AI advisor seats: CEO, CTO, CMO, CSO (study, consent, safety, claims) and UIUX**, as roles with no personal names, plus `/boardroom`. Each seat has a fictional background in which it lived the problem and worked in the industry. Their knowledge is sourced:
  - [[24-synthesis/market-map]] (markets, who pays, our users in numbers, retention)
  - [[24-synthesis/casebook]] (case studies, good and bad)
  - [[12-research/science-and-tech-evidence]] (breaks reduce fatigue, but evidence they improve demanding cognitive work is null)
  - [[09-design/design-evidence]]

  Protocol and evals: [[13-team/exec-team]], [[13-team/exec-evals]].

- [2026-11-05] **Archived the team's week 8 prototypes**: Raghavan (desktop study-block screen, Canva), Alexa (desktop "Your Performance Right Now" dashboard, Figma) and Yulee (iPhone energy-outlook day ring, Figma). Kept for the record, not as a reference. See [[09-design/team-prototypes-week-8]].
- [2026-11-05] **Target is US college students on iPhones.** Budget-Android assumptions are gone from the personas, rubric, brief and capture tool, which now has iPhone SE, standard and Pro Max sizes plus iOS checks. Added Emil Kowalski's `/mobile-native` and `/apple-design`. Watch decision #4 is updated: Apple Watch means HealthKit, which needs a native iOS app.
- [2026-11-04] **Added an AI skills toolkit** adapted from Startup City: `/decide`, `/plan-review`, `/algo`, `/icp` (five synthetic student and athlete testers), `/review`, `/security`, `/checkpoint`, `/restore` and `/prompt-motion`, plus a root `CLAUDE.md` with ground rules. Then the **design toolkit**: `/uiux` (designer persona), `/mockup`, `/crit` (blind second reviewer), `/teardown`, `tools/qa/device-walk.mjs` (screenshots + automatic UI checks), and a [[09-design/ui-ux-quality-bar|UI/UX quality bar]] with a U1–U8 rubric. Then the **design stack**: Emil Kowalski's motion skills (vendored, MIT), `/polish` (ideas from Impeccable and Taste Skill, nothing installed), a one-page brief at `design/PRODUCT.md`, and [[09-design/design-stack-and-resources|keep/skip verdicts]] on GSAP, anime.js, Magic UI, Smooth UI, Spline, Figma MCP, Mobbin and others. See [[11-engineering/ai-skills]]. Not committed yet.
- [2026-10-26] **Trimmed the company side.** Removed landing page, marketing, business and traction (not needed now). Competitive landscape kept, moved to [[24-synthesis/competitive-landscape]].
- [2026-10-26] **First decision: ADR-001.** We reuse WearLab's simulators for synthetic data. The plan is in [[05-data/synthetic-data-generator]]: seeded student days with a hidden ground truth, plausible, null and laptop-only worlds, 10 scenarios, and milestones to Dec 11.
- [2026-10-26] **Ingested WearLab** (Heramb's 3D wearables-explainer app) into a new `32-wearlab` folder. It added 8 product and pipeline pages, 6 new concept pages (SpO₂, ECG/AF, step counting, sleep staging, recovery/strain, temperature trends), 5 brand pages, a competitive landscape, and a reuse plan. All WearLab tests pass read-only.

## Active Threads

- **Fix the landing page's false or unconfirmed claims before sharing the link:**
  - "never tells your … school";
  - "Fitbit, Oura or WHOOP" (only Fitbit is confirmed);
  - 7 vs 14 learning nights;
  - the unscoped Late night and After practice modes;
  - the unnamed counselor.

  Then lift `noindex`. Also try the page on a real iPhone. See [[09-design/landing-page]].
- **Team calls from the declutter brief:** the cuts, the 25/5 arm, the threshold, consent and escalation (Raghavan, Alexa, Yulee, plus the CSO). See [[24-synthesis/declutter-brief-2026-11-15]].
- **Device-use spikes:** a two-phone test of route B, and route C on two team laptops, by about Nov 21 (kill rule in each note).
- **One rule and its inputs (#19):** rule v0 (absolute) or personal baselines. Also, whether watch values get logged, which changes the consent text. See [[05-data/variable-map]].
- **Build the synthetic-data generator.** By the proposal's timeline: sleep, steps and HR by Nov 13; laptop and task data plus scenarios by Nov 20; 28 days end to end by Dec 4. See [[05-data/synthetic-data-generator]].
- **Confirm the proposal's open items:** roles, first testers on Nov 24, the Fitbit fallback and the study task. See [[24-synthesis/open-decisions]] #2 and #20–22.
- **Change the `/admin` password** to a long one once the handout is over.
- **Decide scope.** Lean desktop pilot or production plan. The course readings lean towards the lean choices: Postgres first, SQL retrieval before pgvector. See [[24-synthesis/design-comparison]].
- **Open decisions** are now at 22, including choosing retrieval by measured precision/recall, escalation to a human, and which data goes to a hosted LLM. See [[24-synthesis/open-decisions]].

## Key Takeaways

- **WearLab can be our synthetic-data generator.** Its night, step and PPG simulators run headless; reusing them is about 1–2 days of work and needs Heramb's OK plus a licence. See [[32-wearlab/what-we-reuse]].
- **Wrist HR locks onto step cadence while walking**, so ignore HR when steps > 0. Use personal baselines: a 28-night look-back and a 14-night learning period.
- The project is the BINF 4070 final project. The course grades grounding with visible sources, honest uncertainty, escalation to a human, a non-technical UI, and safety designed in.
- **Watch data is sparse, synced and noisy.** HR arrives roughly every 5 minutes after cloud sync and is worst during motion, so use it as daily context only. The course labs never fetch HRV, so it's unverified.
- **Pipeline corrections from the course:**
  - bucket daily data by the student's local day;
  - use time-based windows with coverage counts, and treat gaps as unknown, not 0;
  - align sources with as-of joins;
  - pick one step source;
  - add database CHECKs and versioned transformations.
- Retrieved text is untrusted: keep allowlisted typed actions and a policy veto (prompt injection).

## Flagged Contradictions

- Clients: Electron-only (Raghavan) vs RN + Next.js + desktop (Alexa).
- Watch API: Google Health vs HealthKit. Target users are US iPhone users (2026-11-05), so Health Connect is out. Apple Watch means HealthKit, which needs a native iOS app. The course loaner Fitbit favours Google Health.
- Evidence agent: personal history (SQL) vs research corpus (pgvector).
- The course's week 7 reading cites "Freedman et al., *Sensors* 2020", but that DOI doesn't resolve. The matching paper looks like Grzesik & Mrozek, ICCS 2020; confirm with course staff.
