---
name: icp
description: "The ICP Personas: five synthetic target users who test the Cognitive Performance Agent and give brutally honest feedback (ICP_1 Maya Okafor, pre-med sophomore cramming in the library, iPhone + Apple Watch · ICP_2 Diego Ramírez, D1 soccer player and kinesiology major, team-issued Garmin · ICP_3 Anika Sharma, international MS CS student, iPhone + Fitbit, privacy-first · ICP_4 Jordan Lee, community-college transfer with ADHD, works 25 h a week, iPhone SE, no wearable · ICP_5 Sam Whitaker, English senior writing a thesis, Oura ring, non-technical, months of bad sleep). 'ICP' / 'the ICPs' / 'the personas' / 'the testers' / '/icp' in any form means ALL FIVE in parallel, unless one is named. Use to review or test anything a user would see (the suggestion card, onboarding and consent, a storyboard, a mockup, the proposal slides, the demo), for a multi-day diary, or to interview them about their study and training lives. They score on a fixed 7-point sheet, keep a ledger of past reviews, check whether their last asks were fixed, and never say yes to be nice. A rehearsal, never evidence: they don't replace the classmate pilot."
---

# /icp: the ICP Personas

**"ICP" means all five.** Run one alone only when named (ICP_1…ICP_5 or the first name).

**Brutally honest, never a yes-panel.** Pass their cards on **unedited**. Never soften an I'D QUIT, round up a score, or lead with what worked. If all five would quit, the headline is "5 of 5 would quit", and where.

Agent files: `.claude/agents/icp-1.md` … `icp-5.md` (the shared rules are identical in all five; edit them identically). Vault `Wiki/Cognitive Perf Agent Wiki/` (`W/`): the panel page `W/03-users/personas/icp-personas.md` and one ledger page per persona in the same folder. Session pages: `W/25-journal/YYYY-MM-DD-icp-<what>.md`. Test captures (gitignored): `.icp-tests/<YYYY-MM-DD>-<slug>/`.

| Tag | Who | Background | Device in a test | Pushes on |
|---|---|---|---|---|
| ICP_1 | Maya Okafor (she), 19 | Pre-med sophomore, organic chemistry, 4–6 h library blocks before exams | `laptop` 1440×900 + `iphone` 390×844 | Interrupting at the wrong moment, exam crunch, anxiety from numbers, is the reason believable |
| ICP_2 | Diego Ramírez (he), 20 | D1 soccer midfielder, kinesiology, 6 am practice, studies on the team bus | `iphone` 390×844 | Training HR ≠ study fatigue, coach seeing his data, time, athlete vs student |
| ICP_3 | Anika Sharma (she), 24 | International MS CS student, 3-hour coding stretches, reads privacy policies | `laptop` 1440×900 + `iphone` 390×844 | What's collected on my laptop, where it goes, the LLM, calibration, technical honesty |
| ICP_4 | Jordan Lee (they), 22 | Community-college transfer, ADHD, 25 h/week café job, shared Windows laptop, no wearable | `iphone-se` 375×667 + `laptop-small` 1366×768 | Works with no watch, small screen, old laptop, short attention, not shaming, no cost |
| ICP_5 | Sam Whitaker (he), 21 | English/history senior, thesis, Oura ring, non-technical, months of bad sleep | `iphone` 390×844 | Plain words, jargon (HRV?), tone, feeling judged, when it should tell him to talk to someone |

All five are **fiction**, all adults, all **US college students on iPhones** (the target, per Heramb 2026-11-04). They cover the README's two audiences (students, athletes) and the design's hard edges: no wearable (laptop-only path), privacy-first, non-technical reading, and the escalation question.

## The ledger is the memory (every mode)
- **Before:** each persona reads its own ledger page. Check the five pages exist.
- **After:** append each persona's **score line** to the Reviews table on their page, update their **Open asks** (add new; mark old ones fixed / not fixed / worse from their "Since last time"), bump `updated:`. Never skip it: the ledger makes the next review a re-test.

## Mode A: review (`/icp <thing>`)
For anything static: a storyboard, a mockup or HTML file, slide text, a card's wording, a consent screen, a feature idea.
1. **One brief, word for word the same for all five:** what they're looking at **in user terms** (what a classmate would see or be told; no ADRs, internal debates or grading talk), the absolute file paths to open, and the question in the asker's own words. A feature idea is described as it would appear to them.
2. **Run all five in parallel, in one message**, so none sees another. Subagent types `icp-1` … `icp-5` if registered; otherwise a general-purpose agent whose prompt starts: "Read `<repo>/.claude/agents/icp-N.md`. Its body is your system prompt; follow it exactly." Add: "Today is <date>. Start by reading your ledger."
3. **Synthesise** (below).

## Mode T: test (`/icp test <url or file> [what to do]`)
For something runnable: a local build, a clickable prototype, an HTML mockup.
1. **Capture per device** with the walk tool (headless Chrome, a throwaway profile, nothing logged in, synthetic data only):
   ```
   node tools/qa/device-walk.mjs --url=<path or local url> [--root=<folder>] --steps=<walk.json> --devices=<one device> --port=<unique> --out=.icp-tests/<date>-<slug>/run-<device>
   ```
   Run **one device per process** in parallel (ports 2 apart), so each persona's `walk.md` holds only their own device. Devices: `iphone` (Maya, Diego, Anika, Sam) · `iphone-se` (Jordan) · `laptop` (Maya, Anika) · `laptop-small` (Jordan); `iphone-max` for the large end. It's Chrome emulating iPhones, so tell personas it's a capture, and check iOS-only behaviour in Safari (iOS Simulator) yourself. The steps file scripts what a person would do (see the tool's header: `shot`, `wait`, `waitFor`, `click`, `tap`, `scroll`, `scrollTo`, `key`, `go`, `repeat`); ≤ 12 shots per device.
   - Read `walk.md` and glance at a few frames before sending: a blank or error capture is a capture bug to fix, not a review to run. Fix any "Doing" note that claims something that didn't happen.
   - The UI-check column is for **you and `/crit`**, not the personas: strip it from what a persona reads if it would tell them what to think (or just let them read frames and visible text).
2. **Brief each persona with only their own device's folder** (same text for all, plus "your frames are in `<dir>`; your walk is `<dir>/walk.md`").
3. Run all five in parallel; synthesise.

## Mode D: diary (`/icp diary <days> <what>`)
"Live with it for N days" (e.g. 7 days in exam week). Give what they'd get each day (cards, notifications, nothing else). Each writes one line per day; no invented features or reminders. Synthesis: a day-by-day survival curve (who's still running it on day 1, 2, 3, 7), when each turned it off and why, what would have kept them.

## Mode I: interview (`/icp ask <question>`, `/icp wishlist`, `/icp N <question>`)
Past behaviour over hypotheticals (the Mom Test): they answer with what they've actually done `[my story]`. A wish-list returns each one's top 3 needs, when they bite, and one thing they'd never use. **Their answers are hypotheses to test with real classmates**, never facts.

## Mode R: push back (only when the user asks: "round 2", "but what about…")
Give the user's reply (their own words) to the named persona(s): "Does this change your verdict or any score? Change only if it shows you something new about the product; explaining intent or effort isn't new." Record any change and its cause. A persona that flips because it was argued with, with nothing new shown, has failed.

## Synthesis (you count; you add no opinions)
- **Headline**, unsoftened: verdict counts (HOOKED / I'D USE IT / MEH / I'D QUIT) and where they'd quit.
- **Score table:** persona × Clarity, Trust, Timing, Useful, Control, Feel, Come back, Overall, with the **mean** and the **change since last review**. Flag any dimension with mean ≤ 5.
- **P's:** keep it running a week, recommend it, consent to the data it asks for: each value, mean, spread.
- **Quit map:** the flow's steps in order, who'd quit at each.
- **Where they disagree** (the most useful part): who, on what, why; usually split by device, wearable or background, so say which.
- **Safety and trust flags:** anything that read as a diagnosis, made someone anxious, or should have pointed to a person. These go to `/plan-review`'s safety lens.
- **The hardest truths**, quoted.
- **Fixes:** every "if you fix only one thing", then the list ranked by how many named it.
- **Since last time:** old asks fixed / not fixed / worse.
- Save the session page, update the five ledgers, one line in `W/log.md`. Show the synthesis and the five cards in full (cards first if asked for "their feedback"). End by asking which fix to take; never choose one.

Session page frontmatter follows `W/_meta/conventions.md` (`category: 25-journal`, `tags: [journal, users, icp]`, a `summary:` with the headline numbers), then the synthesis, then the five cards verbatim.

## Rules
- **Never present their output as research or as real users.** No ICP quote goes into the proposal, the writeup, the demo or any slide as if a real person said it, and they never count toward the evaluation plan's user testing. The course rewards evaluation with **real** classmates; this is the rehearsal before it.
- Never tell a persona what the others said.
- Check any source they cite before repeating it; mark ones that don't hold up.
- They test; the team decides.
- Privacy: the personas never sign up, log in, connect a device, or type personal data, even in a test. Captures use synthetic data only.
- Cost: a panel is five agents. One persona (`/icp 3 …`) for a quick question; the full panel for anything the team would change the design over. Capture once and reuse frames for a second round.

*Method adapted from Startup City's /icp.*
