---
title: Landing page (Halftime)
category: 09-design
tags: [design, frontend, infrastructure]
sources: [design/mockups/landing/BRIEF.md, site/index.html, tools/site/README.md]
summary: "The Halftime landing page: live at halftime-study.vercel.app, what each section does, which parts the team picked, rounds 1–11, hosting, performance, and what's still open."
base_confidence: 0.7
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: core
created: 2026-11-05T21:00:00Z
updated: 2026-11-06T07:00:00Z
---

# Landing page (Halftime)

> **Answers:** What is the landing page, where does it live, what did the team decide, and what's still open?

**Live:** https://halftime-study.vercel.app/. It's hosted on Vercel and set to `noindex`, so search engines don't list it, but anyone with the link can open it. The source is `site/index.html`. The design history, round by round, is in `design/mockups/landing/BRIEF.md`. The design copy is `design/mockups/landing/index.html`, which matches the site except for its head tags.

**Who it's for:** a tired student who taps a link in a group chat, on an iPhone, between classes, and a course grader on a laptop. The page answers one question: "What is this, and would it help me?" (`design/mockups/landing/BRIEF.md`).

## Sections, top to bottom

1. **Hero.**
   - Headline: "Every long study session needs a halftime."
   - Problem line: "Two hours into studying, it's hard to tell if you need a break or should push on."
   - A live two-tap demo. You pick when you're studying (Afternoon / Late night / After practice), how long you've been at it, and last night's sleep. A black "island" card answers with its reasons, numbered sources and how sure it is, and offers Snooze 20 min. Everything is labelled "Sample card · made-up data".
2. **How it works, in four steps.** This is direction A, "The thread", played as you scroll:
   1. It notices.
   2. It reads your watch, carefully.
   3. It suggests, and shows why.
   4. You decide.
3. **How it compares** (added 2026-11-06). Headline: "Your watch knows your body. Your study apps know your hours. Halftime connects them to your day." A table compares wearables (WHOOP, Fitbit, Oura), productivity apps (focus timers, to-dos, blockers) and Halftime on five rows: sleep and heart data, the study session, your day, when to take a break, and why it's suggesting. On phones each row becomes a card. Mint arcs draw once above the column headers. A note says features vary by app.
4. **Clear about what it reads.** A sample laptop with a "What you see / What Halftime sees" switch, beside the "What it reads" and "What it never reads" lists.
5. **Honesty cards.**
   - A learning bar that fills to 7 of 7 nights.
   - A day strip where the "Talk to someone?" offer skips the late-night study block and lands at 8 am.
6. **Sign-up isn't open yet.** The four "joining means" lines tick in as you scroll. "How long it runs" and "Who can join" show as dashes.

## Team decisions (who decided)

The page went through rounds 1–11 between 2026-11-05 and 2026-11-06; the BRIEF has the full record. All other wording is proposed by AI seats and waits for the team to lock it.

- **"How it works" as direction A, "The thread":** Heramb, "lets do A". See [[09-design/design-crit-log]].
- **Trust sections as a mix of E then D** (E's laptop switch, then D's scroll-played honesty cards and joining ticks): Heramb, "Mix: E then D".
- **A comparison chart, wearables vs productivity apps vs Halftime:** Heramb, 2026-11-06 ("we do a mix of both, and we are the layer connecting your health+productivity to your life"). The column contents describe each category in general; check them before the page goes public.
- **Host it on Vercel, using the Vercel CLI:** Heramb, "host it on. vercel" and "Yes, use the CLI".
- **Rounds 9–11:** goals Heramb set:
  - optimise the page for laptops, iPhones and foldables;
  - make it smooth.

## How it's built

- **One self-contained HTML file.** Only Google Fonts loads from outside (Geist and Geist Mono).
- **Pure functions of scroll.** The scroll pieces are written as `seek(p)`, following the [[11-engineering/ai-skills|/prompt-motion]] method. `?hw=`, `?tr2=` and `?tr3=` freeze frames for captures. Reduced motion shows every end state.
- **Readable labels at every size.** Every SVG label stays at least 12.3 px on screen. The page measures each drawing's scale, then enlarges the text and makes room for it. ^[inferred]
- **Smooth scrolling** (round 11): one shared scroll scheduler (one frame per scroll; reads before writes). It writes attributes and text only when they change. The demo card animates its size only the first time it opens; new words fade in through the Web Animations API. Resizes only trigger work when the width or the drawing's scale changes.
- **Hosting** (`site/vercel.json`):
  - a strict Content-Security-Policy (only this site and Google Fonts), plus nosniff, HSTS, a referrer policy and a permissions policy;
  - `X-Robots-Tag: noindex` and `robots.txt` disallow;
  - a favicon, an Apple touch icon and a 1200×630 link-preview card.

  How to deploy, check and redeploy: `tools/site/README.md`. More in [[11-engineering/deployment-and-operations]].

## Quality checks

- **Screen sizes:** `tools/qa/device-walk.mjs` covers 13 sizes:
  - phones: 320 px, iPhone SE, iPhone, iPhone Pro Max, iPhone landscape;
  - folds: the first Fold's cover screen, a Z Fold cover, a Z Fold unfolded, a Pixel Fold unfolded;
  - larger screens: iPad mini, two laptop sizes, a 1920 px desktop.

  It also covers a fold opening and a phone rotating (`resize` steps) and reduced motion. The latest full walk had 0 console errors and 0 defects on every size.
- **Smoothness:** `tools/qa/perf-scroll.mjs` measures a whole-page scroll and the demo taps.

  | Measure | Before round 11 | After |
  |---|---|---|
  | Layouts while scrolling (iPhone size, CPU 4× slower) | ~700 | ~104 |
  | Paints while scrolling (iPhone size, CPU 4× slower) | 1,047 | 196 |
  | Time in the page's frame code, iPhone Safari (iOS 26.5 simulator) | 216–360 ms | 105–126 ms |

  A full scroll of the live page on a 120 Hz screen had no frame over 20 ms.
- **Safari on iPhone (simulator):** the address bar, the pinned sections and the demo taps work. One Safari-only bug was fixed: the "Talk to someone?" pill overflowed.

## Open (for the team)

- **Claims that are false or unconfirmed are still on the page.** Fix them before sharing widely; see [[25-journal/2026-11-05-boardroom-privacy-blanks]].
  - "never tells your coach, team or school": the school part is false.
  - "Works with a Fitbit, Oura or WHOOP": only Fitbit (Google) is confirmed.
  - The learning bar says 7 nights; the proposal is 14.
  - The Late night and After practice modes aren't scoped. The CEO's recommendation is night only, with After practice gated on Dec 1; see [[25-journal/2026-11-05-boardroom-late-night-lead]].
  - The counselor is unnamed until Columbia Health confirms.
- **Not checked on a physical iPhone.** Simulator Safari only.
- **When the claims are approved,** remove `noindex` and the `robots.txt` disallow.
- **Words not locked yet:**
  - the headline (3 of 5 ICPs rewrote it as "Push on, or stop?");
  - the device line;
  - a line on what the laptop app records and where it goes.

## Related

- [[09-design/09-design|Design hub]] · [[25-journal/2026-11-05-landing-build-host-smooth]] · [[25-journal/2026-11-05-icp-hero]] · [[25-journal/2026-11-05-icp-landing-teachback-r2]] · [[09-design/ui-ux-quality-bar]]
