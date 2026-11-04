# PRODUCT.md: design context for every UI task

Read this before any design, mockup, polish or animation work. It is short on purpose. The details live in the wiki (`Wiki/Cognitive Perf Agent Wiki/`). This file is the one-page brief that design skills (`/uiux`, `/mockup`, `/polish`, `/crit`, `/emil-design-eng`, `/prompt-motion`) load first. The idea of a durable PRODUCT.md comes from Impeccable (Apache-2.0, Paul Bakaus); the content is ours.

## What it is
A wellness assistant for students and athletes. It reads watch signals (sleep, heart rate, steps) and laptop activity, and answers one question: **"Should I keep going, take a short walk, or take a break?"** Every answer shows **its reason, its sources and how sure it is**, and it says **"not enough data"** when it doesn't know. It's a BINF 4070 final project (proposal Nov 6, demo Dec 11). We want people to remember it and keep using it.

## Who uses it, and when
- A student mid-study at a laptop, tired and focused, who doesn't want to be interrupted. An athlete between training and study hall, mostly on a phone. Sometimes the same person at 1 am.
- **US college students on iPhones** (Safari now; an installed web app or native iOS app later). Design for iOS conventions and iPhone sizes from the SE (375 px) to the Pro Max (430 px); laptops vary (Mac and Windows). There's no budget-Android audience.
- They aren't technical. Some have no wearable at all (the laptop-only path). Some are anxious about grades or sleep. Five synthetic stand-ins: `.claude/agents/icp-1.md` … `icp-5.md`.

## Surfaces and their mode
| Surface | Mode | What success looks like |
|---|---|---|
| Suggestion card, history, data sources, privacy controls | **Operate** | Done in seconds, understood without help, trusted. Precision and restraint. |
| Onboarding and consent | Operate, first run | Knows what's collected and why, says yes or no by choice |
| Proposal slides, showcase page, demo video | **Persuade** | A grader gets the idea in 5 seconds and remembers one frame |
| Wiki, writeup | Read | Understood quickly |
Ambition shows as **precision** on Operate surfaces and as **one bold idea** on Persuade surfaces. Never the other way round.

## The one question per screen
- Card: *"What should I do right now, and why?"* The largest thing on it is the suggestion in words, then the reason. It is never a score.
- History: *"Did the breaks help?"*
- Data sources: *"What is it collecting, and is it working?"*
Each screen leads with **one finding** (e.g. "You've been going 2 h 40 min on 5 h sleep"), placed next to the action it drives.

## Tone
Calm, plain, kind, honest. A thoughtful friend who is good with data, not a coach or a doctor. Short sentences, reading grade ≤ 8. No hype verbs (unlock, supercharge, optimise your brain). No guilt, no streaks, no badges.

## Hard rules (from the course grading criteria and `CLAUDE.md`)
1. Reason and sources visible on every suggestion. 2. Uncertainty in words or a range, never false precision; "not enough data" is a designed state. 3. No diagnosis words, and no red/green verdicts on the body. 4. A kind "talk to someone" state for persistent poor sleep or distress. 5. Arrives once; snooze really snoozes; manual break controls always work. 6. What's collected is visible, pausable and deletable. 7. Synthetic data is labelled "Sample data". 8. WCAG AA, 44 px targets, never colour alone, reduced motion respected, the user's text size respected; works from iPhone SE to Pro Max (safe areas, no input zoom) and down to a 1366 px laptop.

## Motion
Purposeful and quiet. UI motion under 300 ms with ease-out, nothing from `scale(0)`, nothing bounces, no animation on frequent or keyboard actions, transform and opacity only. Every movement has a reduced-motion fallback. Save "delight" for rare moments: the first suggestion, a week of data. Rules: `/emil-design-eng`, `/review-animations`, `/prompt-motion`.

## Visual system
**Not decided yet.** Directions come from `/mockup`, and the team picks one. Until then:
- One accent colour with a defined meaning.
- One text face plus tabular figures for numbers.
- Opaque surfaces with tone steps.
- No gradients, glows or glass.
- Light or dark chosen for the scene (a library at night vs a bright café), not by category habit.

Record the decision in `DESIGN.md` beside this file once the team picks.

## What makes it unforgettable (the bar)
Every screen should feel made for this product and nobody else's. The card's **reason plus honest uncertainty** is the signature: no wellness app does it well. Find one signature move that only this product could own (a way of showing "how sure" that people remember), and spend the boldness there, not on decoration.
