---
title: "Landing page: built for every screen, hosted on Vercel, made smooth"
category: 25-journal
tags: [journal, design, frontend]
sources: [design/mockups/landing/BRIEF.md, tools/site/README.md]
summary: "Rounds 9–11: 13-size audit and fixes, readable SVG labels everywhere, live on Vercel (halftime-study.vercel.app), scroll work cut ~85%, Safari checked in the simulator."
base_confidence: 0.75
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T21:00:00Z
updated: 2026-11-05T21:00:00Z
---

# Landing page: built for every screen, hosted on Vercel, made smooth

Session log for 2026-11-05 to 2026-11-06. Heramb set the goals and made the hosting calls; AI sessions did the build. The page itself is described in [[09-design/landing-page]].

## 1. Built for laptops, iPhones and foldables (round 9)

**Goal (Heramb):** "build the landing page, make sure it is optimised for laptops, iphones, foldables. find bugs, errors, solve it".

**Tooling:** `tools/qa/device-walk.mjs` gained:
- fold, landscape, 320 px, iPad and desktop presets;
- a `resize` step and a reduced-motion flag;
- SVG text measured at its real on-screen size.

**Fixes:**
- tiny "How it works" labels;
- that section stacking on wide, short screens;
- an oversized day strip;
- honesty cards hidden on short screens (they now unpin);
- 40 px switch buttons, raised to 44 px;
- screen-reader text for the laptop switch;
- `vh` fallbacks for `svh`;
- the page title.

## 2. Small text solved, ready for Vercel (round 10)

- **Readable labels everywhere.** The drawings measure their on-screen scale, so no label is under 12.3 px on any size. The layout makes room where a label grows. A ResizeObserver re-fits it when a fold opens or a phone rotates.
- **`site/` prepared for Vercel:**
  - a CSP and security headers;
  - `noindex` until the team approves the claims;
  - icons and a link-preview card;
  - `tools/site/serve.mjs`, which serves the page locally with the same headers.

## 3. Hosted (Heramb: "host it on. vercel", then "Yes, use the CLI")

- **Live** at https://halftime-study.vercel.app/ (Vercel project `halftime-study`). The Vercel connector couldn't upload a page this size, so it went up with the official Vercel CLI, which Heramb was already signed into.
- **Token removed:** `vercel link` wrote a sign-in token to `site/.env.local`. It was deleted before deploying, and `site/.vercelignore` and `site/.gitignore` now keep `.env*` and `.vercel` out of uploads and git.
- **Checked live:**
  - every response carries the headers;
  - the assets return 200, and the hidden files return 404;
  - the 13-size audit of the live URL was clean.

## 4. Made smooth (round 11; Heramb: "too heavy/laggy, make it smooth")

**Measured** with the new `tools/qa/perf-scroll.mjs`: a whole-page scroll and the demo taps on a CPU slowed 4×, using Chrome's counters and trace.

**Causes:**
- **A forced layout on almost every scroll frame.** About 40 SVG attribute writes per frame, followed by a layout read. Two animation frames per scroll event.
- **A whole-page reflow for 0.5 s on each tap.** The card animated its height.
- **Wasted resize work.** The iPhone address bar's resize events re-ran every fit.

**Fixes:**
- one scroll scheduler, with reads before writes;
- attribute and text writes only when the value changes;
- the card animates its size only on first open, with a compositor fade after that;
- option buttons built once;
- resize work only when the width or scale changes;
- layout containment.

**Results:**
- Scroll layouts fell from ~700 to ~104, and paints from 1,047 to 196.
- Safari (iOS 26.5 simulator): time in the page's frame code fell from 216–360 ms to 105–126 ms per full scroll, with one callback per frame instead of two.
- The live page on a 120 Hz screen had no frame over 20 ms.

**Safari-only bug found and fixed:** the "Talk to someone?" pill was sized on its shorter labels, so it overflowed.

## Still open

- **Physical iPhone.** Only the simulator was used. Heramb ended the smoothness goal (`/goal clear`) after the simulator and measurement evidence; no result from a physical iPhone has been reported.
- **False or unconfirmed claims still on the live page.** Listed in [[09-design/landing-page]]. They need fixing before the link is shared widely.

## Related

- [[25-journal/25-journal|Journal hub]] · [[09-design/landing-page]] · [[11-engineering/deployment-and-operations]] · [[11-engineering/ai-skills]]
