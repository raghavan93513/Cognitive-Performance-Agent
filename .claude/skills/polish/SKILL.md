---
name: polish
description: Make a Cognitive Performance Agent screen, mockup or component production-grade, with one of five passes - harden (every state and worst-case data), clarify (UX copy), quieter (tone down anything loud, nagging or anxious), tells (remove the habits that make a UI look AI-generated or templated) and floor (the craft checks no detector catches). Works on HTML mockups in design/mockups/ or app code the user points at. Use when the user types /polish [harden|clarify|quieter|tells|floor] <target>, or asks to "polish", "make it production-ready", "fix the copy", "it looks generic / AI-made", "calm it down", or "what states are missing". For a scored review use /crit; for animation use /review-animations.
---

# /polish: production-grade, calm and unmistakably ours

First read `design/PRODUCT.md` (the brief) and `Wiki/Cognitive Perf Agent Wiki/09-design/ui-ux-quality-bar.md`. **The brief wins over taste:** if the team has pinned a look or a word, keep it. **Polish keeps the existing look**: changing direction is `/mockup`'s job, so never split the difference.

Pick the pass from the argument; with none, ask which (one line each, below), never run all silently.

## Before and after every pass
- **Look first:** capture with `node tools/qa/device-walk.mjs --url=<page> [--root=<dir>] --devices=iphone-se,iphone,iphone-max,laptop` and read the shots and the UI-check results. Batch your fixes from one look; don't re-shoot after every tweak.
- **Edit only the target** (a mockup in `design/mockups/`, or files the user named). Ask before changing factual copy, adding claims, or touching app logic.
- **Look again** at the same sizes, then report a Before / After / Why table and anything you couldn't check (real phones, screen readers, how motion feels).

## harden: every state, worst-case data
The design must survive real life, not just the happy path.
- **States:** first run · loading · suggestion (continue / walk / break) · reason and sources open · not enough data · snoozed · declined · escalate to a person · watch disconnected · laptop-only · offline · error in one block · stale data · consent withdrawn. Missing state = build it or list it.
- **Worst-case data:** a 40-character name, a 1-character name, 0 minutes, 14 hours, no sleep logged, 3 sources vs none, a week of nothing, a confidence exactly on the threshold, 200% zoom, a long translated label.
- **Rules:**
  - Loading shows the final layout with flat grey bars at the real sizes: no shimmer, no layout jump when data lands.
  - An error lives inside the block that failed: what failed, when the data was last good, and a Retry.
  - Missing values are a grey dash, never a 0 and never "NaN".
  - A real zero prints normally.
  - A refresh keeps the old values and updates a freshness stamp.
- **Inputs and gestures:** no double-submit; a snooze can't fire twice; an interrupted drag (second finger, scroll cancel, release outside) leaves the control working.

## clarify: copy a tired student understands at a glance
For each state decide: the one fact they need now → the action next → the context that changes the decision → the tone for this moment.
- **Buttons:** a verb plus an object: "Take a 5-min walk", "Snooze 20 min", "Not now". Never "OK", "Submit", "Learn more" or "Get started".
- **Reasons:** concrete and in their units: "You've been going 2 h 40 min and slept 5 h". Never "Your cognitive load is elevated".
- **Uncertainty in words:** "Fairly sure", "Not sure: only 2 nights of data". Explain jargon in one sentence or drop it (HRV).
- **Errors:** what failed, why if known, and how to recover. No codes as the message, no promised causes.
- **Empty states:** separate first use, no data yet, filtered out and failed, each with its next step.
- **Serious moments** (consent, deletion, escalate) are warm and plain, never cute.
- **Consistency:** the same word for the same thing everywhere, so keep a short glossary in `design/PRODUCT.md` if it drifts. Write complete sentences that translate, with no string fragments joined together.

## quieter: calm it down
A wellness tool that shouts is broken.
- One accent colour, used on the data and at most one control. Red appears once per object, only on a real problem. No red/green verdicts on the body.
- One authored motion moment, not a fade-up on every block. Nothing bounces, pulses or loops without meaning. A notification arrives once.
- Scale numbers to the question: a figure under 40 px and a title of 18–32 px on app screens. No 48 px hero metric, and no lone score ring.
- Cut decoration that carries no information: icon tiles, badges, status dots, divider clutter, a second typeface with no job.
- No streaks, no guilt copy, no "You missed your break!".

## tells: remove what makes it look generated
A page with every tell removed and nothing in its place is an empty template. Fix the idea first (the screen's one question and one finding, from `design/PRODUCT.md`), then remove these:
- **Surface:**
  - violet/indigo or any gradient on grounds, buttons or text
  - glow, glass or backdrop blur as decoration
  - cream ground with a terracotta accent
  - neon on near-black
  - a soft grey shadow under every card
  - a coloured left border on callouts
  - a hard offset shadow outside a neobrutalist world
- **Structure:**
  - three identical icon-on-top cards
  - nested cards
  - the hero-metric template (big number, small label, sparkline)
  - an eyebrow or kicker label above headings
  - a pill badge above a title
  - 01/02/03 section numbers
  - everything centred
  - one medium radius on everything
  - nine nearly equal font sizes
  - a modal for something that isn't urgent
- **Dashboards:**
  - "Welcome back 👋"
  - an icon in a tinted circle on every KPI
  - a "+12%" pill everywhere
  - a sparkline on every number
  - rainbow charts (more than four hues)
  - a fat donut with a total in the hole
  - a gradient area chart with dots
  - left-aligned or proportional numbers (use right-aligned tabular figures)
  - uppercase tracked table headers with zebra rows
  - an illustration plus "No data yet" in an empty chart (draw the zero line and one sentence instead)
- **Copy:**
  - unlock, supercharge, seamless, elevate, effortless, cutting-edge, empower
  - "not just X, it's Y"
  - three-part slogans
  - invented stats or testimonials
  - lorem ipsum, John Doe, Acme
- **Motion:**
  - identical fade-up on every section
  - hover lift on every card
  - bounce easing
  - meaningless infinite loops
  - reveals that fail and leave a blank band
- **Monospace** only for real data, IDs or code, never as a "technical" costume. **Emoji** never stand in for icons: use one drawn icon set, one stroke weight.

## floor: the craft checks no detector catches
- **Contrast:** body and placeholder text ≥ 4.5:1; on a coloured surface, tint secondary text from that hue, never grey.
- **Spacing:** tight inside groups, generous between them, more space above a heading than below it.
- **Type:** body measure 45–75 characters; body ≥ 16 px on phones (inputs under 16 px make iOS zoom); tabular figures for anything that changes; headings tracked a little tighter.
- **Depth:** a shadow has an offset and a soft blur, and only floating things get one. A resting card gets a border or a tone step, never both.
- **Browser surfaces:** theme the text selection, the focus ring, the caret, scrollbars and link underline offset from the palette. It's the cheapest sign a page was built, not assembled.
- **iPhone:** our users are on iPhones in Safari, so apply `/mobile-native`'s Baseline: `viewport-fit=cover` and `env(safe-area-inset-*)` for the notch and home indicator, `100dvh`/`100svh` not `100vh`, inputs ≥ 16 px, no tap-highlight flash, `touch-action: manipulation`, hover gated to `(hover: hover) and (pointer: fine)`, `theme-color` per scheme, never disable zoom. Respect the user's text size (rem, not px). 44 px targets. Confirm in Safari on the iOS Simulator.
- **Charts:** one question, one series, one hue. Drawn to scale. A forecast after "now" is dashed and labelled. Axes are faint, and there's no legend for a single series.
- **Coverage:** everything the brief asks for is findable within seconds on the first screen.

## Never
Change the direction or the pinned look; add claims or change facts without asking; use real personal or health data; install packages or run third-party code; touch files outside the target.

*Adapted, in our own words, from Impeccable (Apache-2.0, Paul Bakaus: harden, clarify, quieter, craft floor, modes) and Taste Skill (MIT, Leonxlnx: the dated tells registry and app-screen rules). Neither is installed; their scripts, hooks and telemetry are not used.*
