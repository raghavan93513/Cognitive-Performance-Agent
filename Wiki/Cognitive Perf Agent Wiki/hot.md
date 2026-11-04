---
title: Hot Cache
updated: 2026-11-05T01:00:00Z
---

# Hot Cache

*A ~500-word semantic snapshot of recent activity. Updated after every major write operation.*

## Recent Activity

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

- **Build the synthetic-data generator.** First milestone is one sample day for the Nov 6 proposal slide. See [[05-data/synthetic-data-generator]].
- **Proposal prep, due Nov 6** (design studio Oct 30). Checklist on [[30-course/deliverables/part-2-proposal-presentation]].
- **Decide scope.** Lean desktop pilot or production plan. The course readings lean towards the lean choices: Postgres first, SQL retrieval before pgvector. See [[24-synthesis/design-comparison]].
- **Open decisions** grew to 16, including choosing retrieval by measured precision/recall, escalation to a human, and which data goes to a hosted LLM. See [[24-synthesis/open-decisions]].

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
