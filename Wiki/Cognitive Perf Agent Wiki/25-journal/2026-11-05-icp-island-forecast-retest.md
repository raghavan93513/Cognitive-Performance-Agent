---
title: "ICP re-test: Island + Forecast after the top-four fixes"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/suggestion-card-v3/island-forecast.html", "25-journal/2026-11-05-icp-island-forecast.md", ".claude/skills/icp/SKILL.md"]
summary: "Re-test: still 5 of 5 MEH, but overall mean 4.8 → 5.4 and every mean up (Trust 4.4 → 5.8). The Keep-going contradiction is fixed 5 of 5. Every 'fix only one thing' now names a different, personal blocker (Watch delivery, training days, data flow, no watch, night). Still flagged: Useful 5.0, Come back 4.0. Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T08:30:00Z
updated: 2026-11-05T08:30:00Z
---

# ICP re-test: Island + Forecast after the top-four fixes

**Mode T, round 2.** The same design was re-tested after the team (Heramb) chose "fix the top four" from [[25-journal/2026-11-05-icp-island-forecast]]. Each persona's capture was 12 frames on their own device(s): studying → suggestion → See why (top and bottom) → Keep going → walking → pill tapped → first week → morning short-nights card → "Why am I seeing this?" → travel/shifts → Not now. Captures are in `.icp-tests/2026-11-05-island-forecast-retest/` (gitignored). Each persona read their own ledger first and marked their open asks. **Synthetic personas and synthetic data: a rehearsal, never evidence.**

## Headline

**Still 5 of 5 MEH** (Sam says "closer to I'D USE IT"). The overall mean went **4.8 → 5.4**, and every mean rose; Trust gained the most (+1.4).
- **All four fixes landed.** The Keep-going contradiction is confirmed fixed by 5 of 5. "Helped" is defined (4 of 4 who asked), the calendar source is named, and the morning-only card works.
- **What is left is personal.** Each persona's "if you fix only one thing" now names a different blocker: Watch delivery (Maya), training days (Diego), where data goes (Anika), no watch (Jordan), a 1 am screen (Sam).

**Where they'd quit:**

| Step | Who'd quit there |
|---|---|
| Before F1, at the consent or data screen (not shown) | Anika |
| F2 suggestion | Diego (the second time it shows on the bus or after a lift). Anika, if she got past consent (14 switches = debugging). |
| F5 Keep going ("check in again around 4:05") | Maya (a clock-based check-in mid-mechanism in exam week) |
| F8 first week | Jordan (gated on sleep; no watch) |
| Not in these frames | Sam (his hour, 1 am with no next class, wasn't shown) |

## Scores (change vs first test)

| Persona | Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall |
|---|---|---|---|---|---|---|---|---|
| ICP_1 Maya | 8 (+1) | 7 (+1) | 5 | 6 | 7 | 7 (+1) | 5 | 6 (=) |
| ICP_2 Diego | 8 (+1) | 6 (+2) | 6 (+1) | 4 | 6 (+1) | 7 | 4 | 5 (+1) |
| ICP_3 Anika | 8 (+1) | 5 (+1) | 5 | 4 | 5 | 7 | 3 | 5 (+1) |
| ICP_4 Jordan | 7 (+1) | 5 (+1) | 6 | 5 | 7 (+1) | 7 | 3 | 5 (=) |
| ICP_5 Sam | 7 | 6 (+2) | 5 | 6 (+1) | 8 (+1) | 7 (+1) | 5 (+1) | 6 (+1) |
| **Mean** | **7.6** (+0.8) | **5.8** (+1.4) | 5.4 (+0.2) | **5.0 ⚑** (+0.2) | 6.6 (+0.6) | 7.0 (+0.4) | **4.0 ⚑** (+0.2) | **5.4** (+0.6) |

⚑ = mean ≤ 5. Still flagged: **Useful** and **Come back**. Trust and Overall are no longer flagged.

| Probability | Maya | Diego | Anika | Jordan | Sam | Mean (was) | Spread |
|---|---|---|---|---|---|---|---|
| Still running in a week | 0.38 | 0.25 | 0.20 | 0.25 | 0.40 | 0.30 (0.26) | 0.20–0.40 |
| Would recommend | 0.30 | 0.15 | 0.10 | 0.20 | 0.30 | 0.21 (0.16) | 0.10–0.30 |
| Would consent to the data | 0.65 | 0.45 | 0.40 | 0.50 | 0.65 | 0.53 (0.47) | 0.40–0.65 |

If it vanished: **2 × "somewhat disappointed"** (Maya, Sam; was 1), 3 × "not disappointed".

## The four fixes, as the testers marked them

| Fix | Status |
|---|---|
| 1. Keep going no longer contradicts sleep | **Fixed, 5 of 5** |
| 2. Calendar named, location dropped | Fixed for Maya and Jordan. **Partly** for Anika (no consent toggle shown) and Sam (sleep still says "watch"; he wears a ring). |
| 3. "Helped" defined, "Early read" | Fixed for Maya, Diego, Anika and Jordan. Anika adds that there's no without-walk comparison, so the 4 of 6 could be switching falling back on its own. |
| 4. Short-nights card reworked | Fixed for Maya (morning, offer first) and Sam ("Why", "Not now"). **Better but not fixed** for Diego (the travel option is the 4th item, under counseling). Anika: the links are still placeholders. |

## Where they disagree

- **The Keep-going card restating the reasons:** Maya now reads it as a guilt trip. Diego, Jordan, Sam and Anika call it guilt-free and honest.
- **The "Mostly travel, games or work shifts?" off-ramp:**
  - Diego and Jordan would use it.
  - Sam fears it's too easy an escape ("tempted to tap… just to make it stop") and wants to pick the nights.
  - Maya (exams) and Anika (deadlines) find their own reason missing from the list.
- **"Walk, water, window.":** Jordan and Sam like it; Anika would cut it again.
- **The blockers split cleanly by background:** device habit (Maya), sport (Diego), privacy (Anika), no wearable (Jordan), night owl (Sam). There's no common fix left in the top slot.

## Safety and trust flags (for `/plan-review`'s safety lens)

- **Placeholder counseling links**, named by 4 of 5. A dead link when tapped is a safety failure. These stay blocked until Columbia Health confirms the details.
- **The travel/shifts off-ramp could hide real distress** (Sam). Fix: let the person pick which nights, keep "Talk to someone" in view, and add "exams/deadlines" as a reason without dropping the nights.
- **"Only you see this" says who sees the screen, not where the data goes** (Anika). She needs storage, the LLM boundary, retention and delete, and asks whether the escalation flag is logged anywhere.
- **Athlete data path:** counseling must stay campus counseling, never athletics, and nothing may go back to the team Garmin account (Diego).
- **No diagnosis language was found** by any tester. "It's not a diagnosis" landed well (Sam, Anika).

## Hardest truths (quoted)

- Maya: "You didn't fix the thing that decides whether I ever see it: my phone is face-down."
- Anika: "'Nothing is shared' and 'only you see this' only say who sees the screen."
- Sam: "I'd be tempted to tap 'travel or shifts' just to make it stop, and then my 12 nights disappear."
- Diego: "It still thinks I'm a chem major in a library."
- Jordan: "For me Sunday never comes."

## Fixes

**"If you fix only one thing"** (all five different):
- Maya: a Watch tap at the end of a problem, phone face-down.
- Diego: training-aware options (on lift/practice/travel days, sit or nap, not walk).
- Anika: a "Where this goes" screen (storage, LLM fields, retention, delete).
- Jordan: suggestions start without a watch (laptop + calendar from day 1).
- Sam: a 1 am "stop for tonight?" card, with short-nights help reachable then.

**Ranked by how many named it:**
1. **The first-week card says "1 h 50 min in"** next to a 2:40 clock: 4 (Maya, Anika, Jordan, Sam). Now the most-named open item.
2. **Drop "refill" and the Today bar**, and use one word ("break"): 4 (Maya, Jordan, Sam, Diego).
3. **Short-nights off-ramp:** pick which nights, add exams/deadlines, read games/travel from the calendar: 4 (Sam, Maya, Anika, Diego).
4. **Placeholder counseling links made real:** 4 (blocked on Columbia Health).
5. **App switching as work.** "This looks wrong" should let you say "that was one task" and learn from it: 3 (Maya, Anika, Jordan).
6. **Say "watch or ring"** and name the sleep source (Oura, Fitbit, Garmin): 2 (Sam, Anika).
7. **Data path on the card / a "Where this goes" screen:** 2 (Anika, Diego).
8. **Named by one each:**
   - "Snooze until I finish this one", with the check-in at the next pause (Maya)
   - with-walk vs without-walk comparison (Anika)
   - "not me" on a shared laptop (Jordan)
   - cut the sleep dot on the slider (Sam)
   - cut "Walk, water, window" (Anika)

**Not a product issue:** Anika saw See why's top and bottom frames as identical on the laptop, because the panel fits and nothing scrolled.

## Changes made after this re-test (2026-11-05)

The team (Heramb) chose "the next three". These are applied to `design/mockups/suggestion-card-v3/island-forecast.html` and published as gallery version 6. The ledger asks stay open until the next re-test.

1. **The first-week card** now says "2 h 40 min in", matching the clock and the session line.
2. **"Refill" is gone.**
   - The Today tally ("4 h 05 min · 1 refill") is removed.
   - The walk label reads "a break, in progress".
   - The gallery text no longer says "refill".
3. **Pick-the-nights flow:** "Some were travel, games, shifts or exams?" opens "Which nights were they?":
   - Three reason chips: travel or games, work shifts, exams or deadlines.
   - A 14-night grid you tap. Each night keeps its own reason.
   - Away games from the calendar start marked (blue dot), and you can untick them.
   - A live tally.
   - **The guard Sam asked for:** if 5 or more of the unmarked nights are still short and that's at least half, it says "That still looks like a lot" and keeps the card. Otherwise it says there are too few nights to call it a pattern and checks again next week. "Talk to someone" stays on screen either way.

**Checked:** 14 frames on each of iPhone SE, iPhone and Pro Max, including taps through the night grid. No failed checks and no console errors.

**Not done:**
- app switching treated as work, and "This looks wrong" learning from it
- naming the sleep device (watch or ring)
- the data-path screen
- each persona's personal blocker
- real counseling links (blocked on Columbia Health)

## Since last time (first test → re-test)

- Overall 4.8 → 5.4, week 0.26 → 0.30, recommend 0.16 → 0.21, consent 0.47 → 0.53.
- **Asks fixed:**
  - Keep going contradiction (all)
  - "helped" defined (Maya, Diego, Anika, Jordan)
  - six dots cut (Diego)
  - calendar/location disclosed (Maya, Jordan)
  - escalation timing and framing (Maya)
  - "Why am I seeing this?" wired (Sam)
  - "Not now" behaviour (Sam)
- **Asks partly fixed:**
  - calendar toggle (Anika)
  - sources named, but "watch" vs ring (Sam)
  - travel asked before counseling, but buried (Diego)
- **Asks not fixed:** everything ranked 5th and below in the first test, plus each persona's personal blocker.
- **Worse:** none. Sam notes "refill" vs "End break" is now two words for one thing.

---

## The five cards (verbatim)

### ICP_1 · Maya Okafor

You fixed what I complained about on the screen. You didn't fix the thing that decides whether I ever see it: my phone is face-down.

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | A study timer that, after a while, asks me to take a 5-minute walk before lab |
| Where I'd quit | Frame 5, "I'll check in again around 4:05." In exam week that check-in lands in the middle of a mechanism, and that's the Pomodoro bell I already quit `[my story]` |
| P(still running in a week) | 0.38 |
| P(I'd recommend it) | 0.30, to my lab partner, who studies like I do `[my story]` |
| P(I'd consent to the data it asks for) | 0.65. Calendar and watch sleep are yes. The laptop app-switch tracking is a maybe, until I know it doesn't count Anki ↔ PDF as drifting |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | Nothing. The energy drink at hour 3 and my watch's stand nag, which I ignore `[my story]` |

**Since last time**
- Delivery when my phone is face-down (a Watch tap at a natural pause): **not fixed.** Nothing in the frames or the page mentions my wrist. The pill sits at the top of the phone screen. On the laptop it sits on a narrow page in the middle of a browser tab I wouldn't have open.
- Short-nights card never mid-session, offer first: **fixed.** It's morning-only ("never while you're studying"), and the headline asks "Want to talk it over with someone?"
- Numbers agree across screens: **not fixed.** Keep going now says "under your usual 7 h", which matches See why. But first week still says "1 h 50 min in" while the session line behind it runs 1:05 to 3:45.
- Where "Chem lab, 6 min walk away" comes from: **fixed.** The walk distance is gone. It now says "calendar · you turned this on · we never use your location".
- Define "helped": **fixed.** "Your app switching settled back to usual after a walk", and "Early read means under 10 afternoons like this."
- Switching between Anki, PDF and notes is work: **not fixed.** "14 app switches, usual 5–8" is still reason #2. "We only see which kind of app" doesn't tell me study apps are grouped. There's a "This looks wrong" button, but I can't see what it does.
- "Snooze until I finish this one": **not fixed.** It's still "Snooze 20 min", plus a clock-based 4:05 check-in.
- Cut the Today / refill bar: **not fixed.** It's still in frames 1 and 6, and "refill" has spread to "A refill, in progress".

1. **My run-through**
- 01 studying: 🙂 Big 2:40 and "No break yet this session." I'd never look, though: the phone is face-down.
- 02 suggestion: 🙂 "Short walk now? 5 minutes fits. Back by 3:50, well before lab." That's a reason I'd believe. Opening "by itself" at 3:45: I can't tell whether it waited for a pause `[from stills]`.
- 03–04 See why: 😀 Sources, sync times, "usual" ranges, no score. This is the best screen.
- 05 keep going: 😕 "Your call" and then the reasons again, which is a guilt trip. The 4:05 check-in is a timer.
- 06–07 walking: 🙂 Countdown pill, "Walk, water, window." "+5 min" is good.
- 08 first week: 😐 It's honest that it's learning, but the 1 h 50 doesn't match the line behind it.
- 09 morning card: 🙂 It came in the morning, not mid-session, with a person first and no diagnosis.
- 10–12: 🙂 "Not now" means 7 days off, and walks continue. That's a snooze I trust.

2. **The brutal truth**
1. It still assumes I'm looking at the screen. On frame 2, the one moment that matters, I'd miss it.
2. Every timer is fixed: "Snooze 20 min" (frame 2), "check in around 4:05" (frame 5). Interruptions come on the clock, not when I finish a problem.
3. Frame 9 lets me explain short nights as "travel, games or work shifts". My reason is exam week. Telling me to see counseling because I'm cramming would make me roll my eyes, then hit Not now forever.

3. **What actually worked:** See why is the best version of this screen so far: four numbered sources, each with its device and freshness. "Early read" is defined, and "we never use your location" is stated. The walk lands before lab instead of being a generic break. No percentages, so I didn't spiral.

4. **Trust and safety:** The morning card is handled right: not a diagnosis, a person first, "You choose if and when." But "[Campus counseling, 24/7: confirm]" is a placeholder. If that link is dead the one time I tap it, that's worse than not offering it. Reason #2 still looks like the app judging my focus from flipping between Anki and my PDF.

5. **Fix list**
1. **Deliver to my wrist at the end of a problem.** One Watch tap, with the walk card on the phone if I flip it over. That's the difference between it reaching me and me never knowing it ran. How you'd know: in the pilot, the share of suggestions answered within 2 min while the phone was face-down.
2. **"Snooze until I finish this one"**, and the Keep-going check-in waits for the next pause, not 4:05. Then I stop dismissing it out of reflex. How you'd know: fewer snooze-then-Pause-suggestions in a row.
3. **Group my study apps as one task** and say so in See why. Add "exams" to the frame 9 options. Then the 14-switches reason stops feeling wrong. How you'd know: "This looks wrong" taps drop.
- **Cut:** the Today bar and the word "refill".

**If you fix only one thing:** show me how this reaches me through my Watch, at the end of a problem, with my phone face-down.

6. **What I'd want:** A Watch tap at hour 2–3 of a library block, when I've just finished a problem: "5 min walk fits before lab." I'd glance at See why on the phone only if I doubted it. And something in the morning before an exam that helps me choose between sleep and one more late night, without a score.

7. **Score line**
`ICP_1 | 2026-11-05 | Island + Forecast retest (iPhone + laptop) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 6 · Control 7 · Feel 7 · Come back 5 | overall 6 | week 0.38 · recommend 0.30 · consent 0.65 | one-fix: Deliver via a Watch tap at the end of a problem, phone face-down`

Score movement since last time: Clarity +1 (the "5 minutes fits, back by 3:50" line). Trust +1 (calendar source shown, location gone, "early read" defined). Feel +1 (the walk countdown, morning-only sleep card). Timing, Useful, Control and Come back are unchanged: delivery and snooze timing weren't touched.

### ICP_2 · Diego Ramírez

It's more honest than last time. It still thinks I'm a chem major in a library, not a guy who lifted at 2 and has study hall at 7.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 (was 4) |
| 5-second read | A study timer with a countdown to my next class that wants me to take a walk |
| Where I'd quit | Frame 2, "Short walk now?", the second time it shows up while I'm on the bus or my legs are dead after a lift. That's when I tap "Pause suggestions" and don't come back. |
| P(still running in a week) | 0.25 (was 0.20) |
| P(I'd recommend it) | 0.15, to a non-athlete roommate who studies in the library, not to a teammate |
| P(I'd consent to the data it asks for) | 0.45 (was 0.40). Laptop and calendar yes. Watch I'd refuse until it says where my Garmin data comes from and that nothing goes back to the team account. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Phone timer plus my Garmin's sleep screen |

**Since last time** (open asks from 2026-11-05)
- Knows training load and travel days: **not fixed**. Frames 2–5 never mention practice, lifting or games. The only nod is the manual "Mostly travel, games or work shifts?" button in frame 9.
- "Only you see this" plus where watch data goes, on every card: **not fixed**. "Only you see this" and "Nothing is shared" appear only on the morning sleep card (frames 9–12). The main card in frame 3 just says "watch · synced 38 min ago". Which watch? Synced from whose account?
- Keep going contradicts the suggestion's sleep: **fixed**. Frame 5 says "The reasons haven't changed… under your usual 7 h" and leaves the call to me. That's the right tone.
- Options that work on a bus or in study hall, including a nap: **not fixed**. Still Walk 5 min / Keep going / Snooze. Frame 7's "Walk, water, window" assumes I can get up.
- Define "helped" in "4 of 6": **fixed**. It now says "app switching settled back to usual after a walk", and "Early read" is defined as under 10 afternoons.
- Short-nights card asks about travel before counseling: **not fixed, but better**. The travel question is on the first screen now, but it's the fourth option in a dashed box under a big white "Talk to someone now".
- Cut the six-dot meter: **fixed**. It's gone.

1. **My run-through**
- F1, clock and lab countdown: 🙂 Clear. I'd glance at it in study hall.
- F2, "Short walk now?": 😐 Reasons with numbered sources, good. A walk is still the only real move. `[from stills]` I can't judge how the pill opening feels.
- F3/F4, See why: 🙂 Usual ranges, sync times, "never what you type, read or browse". Real.
- F5, Keep going: 😀 No guilt trip, and "next check 4:05" is on the line.
- F6/F7, walk countdown: 🙂 The paused study clock is smart. "+5 min" and "Make it small" are fine.
- F8, first week: 🙂 "4 of 7 nights, suggestions start around Sunday" is honest. Still, my Garmin has months of my nights. Why wait a week?
- F9, short nights: 😕 12 of 14 nights under 6 h in season is away games `[my story]`. Counseling is still the headline.
- F10–F12: 🙂 "Not a diagnosis", morning only, a 7-day backoff. Good.

2. **The brutal truth**
1. Frame 2 suggests the same walk after a 6 am practice plus a lift as after a lazy Sunday. Sleep counts as a reason but training load doesn't. That's the exact confusion I asked about.
2. Frame 3's watch row doesn't tell me the data path. My Garmin is team-issued and the staff reviews it every Monday `[my story]`. Until the main card says "only you see this, nothing goes back to Garmin or the team", I don't connect it.
3. Every option assumes I can stand up and leave. On the bus or in mandatory study hall, a 5-minute walk isn't real, so I'd snooze every time and the app learns nothing.

3. **What actually worked**
- Frame 5's honest "Keep going" screen.
- "Early read" now has a definition.
- Frame 11 says those nights won't count, in one tap.
- "This looks wrong", "Pause suggestions" and "Talk to someone" are on every screen.
- The counseling is campus counseling, not athletics. Keep it that way. A team sports psych reports to staff, and I'd never tap that.

4. **Trust and safety**
- "[Campus counseling, 24/7: confirm]" is a visible placeholder. If it isn't a real 24/7 line when someone taps it at 2 am, that's a safety failure, not a typo.
- Frame 11's "We'll mark those" doesn't say which nights. All 12? I'd want to pick them.
- No diagnosis language anywhere. Good.

5. **Fix list**
1. **Read practice, lift and game blocks from the calendar I already turned on. On those days, swap the walk for "sit, eyes off the screen 5 min" or a 20-min nap before study hall.** I'd tap something instead of snoozing. You'd know it worked if snooze rates on athletes' training days fall.
2. **Put one line under the watch row on the main card: which account it reads from, "only you see this", "nothing written back to Garmin or your team".** That's what moves my watch consent. You'd know if athletes connect the watch more often.
3. **If the calendar shows games or travel on those nights, ask about travel first or leave them out automatically.** Then I don't get pointed to counseling over bus nights. You'd know if athletes tap "Not now" less often.
- **Cut:** the TODAY bar ("4 h 05 min · 1 refill"). The green sliver means nothing without a label, and it doesn't change what I do.

**If you fix only one thing:** make it know my training days and give me a sit-down or nap option instead of a walk.

6. **What I'd want**
On my iPhone at study hall, 7 pm on lift days: "You lifted at 2 and slept 5 h. Do the reading now, save the paper for tomorrow morning." On the bus: "Nap or study? You've got 40 min." Don't build anything that touches the team's athlete app.

7. **Score line**
`ICP_2 | 2026-11-05 | Island + Forecast retest (iPhone) | MEH | Clarity 8 · Trust 6 · Timing 6 · Useful 4 · Control 6 · Feel 7 · Come back 4 | overall 5 | week 0.25 · recommend 0.15 · consent 0.45 | one-fix: training-aware options (lift/practice/travel days → sit or nap, not walk)`

Moves since last time:
- Clarity +1: Early read is defined and the Keep going screen is clear.
- Trust +2: honest Keep going, defined "helped", sources with sync times.
- Timing +1: the sleep card shows only in the morning, backs off for 7 days, and gives a set check-in time.
- Control +1: "This looks wrong", the travel tag, and the 7-day Not now.
- Useful, Feel and Come back unchanged: the options still don't fit my day.

### ICP_3 · Anika Sharma

You fixed the thing I said to fix first, and it shows. The thing that decides whether I install it at all is still missing.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 (was 4) |
| 5-second read | A study timer with a black pill that tells me to take a walk before lab |
| Where I'd quit | Before frame 01, at a consent or data screen you still haven't shown me. If I got past that: frame 02, the first time "14 app switches" is really me going IDE → terminal → docs while debugging |
| P(still running in a week) | 0.20 (no change; nothing shown runs on my Linux ThinkPad or reads my Fitbit) |
| P(I'd recommend it) | 0.10, maybe to a friend in a lecture-heavy major on a Mac |
| P(I'd consent to the data it asks for) | 0.40 (was 0.35, up because of "we never use your location"). I'd allow calendar and app category. I'd refuse sleep until I see where it goes |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Fitbit's sleep view plus my own 11 pm cutoff (which I break) `[my story]` |

**Since last time**
- Keep going contradicts the suggestion's sleep → **fixed.** Frame 05 says "5 h 10 min of sleep, under your usual 7 h". Same numbers as the suggestion, no flip.
- Calendar and location as sources, as separate toggles → **partly fixed.** "calendar · you turned this on · we never use your location" is disclosed. I still haven't seen a toggle.
- Define "helped", drop "Fairly sure" → **fixed.** It's now "Early read", which means under 10 afternoons, and the outcome is "switching settled back to usual".
- Where data goes, the LLM boundary, deletion → **not fixed.** Not one word about any of them.
- Linux collector and Fitbit → **not fixed.** The sleep row just says "watch".
- Real escalation links → **not fixed.** "[Campus counseling, 24/7: confirm]" is still a placeholder.
- First-week "1 h 50 min" vs the 2:40 clock → **not fixed.** Frame 08 still says "1 h 50 min in" over a 1:05 → 3:45 session line.
- Switching while debugging is work → **not fixed.** 14 switches is still a reason. "This looks wrong" can't say why: it has no action in the page source.
- Cut "Walk, water, window" → **not fixed** (frame 07).

1. **My run-through**
- 01 Pill and big clock: I can read it in two seconds. 🙂
- 02 Suggestion: the reasons are clean and the chips are numbered. At 3:45 with 14 switches I'm probably mid-bug. 😐 `[from stills]`
- 03/04 See why: the rows I wanted, each with a source, how fresh it is and a usual range. The frames are identical because nothing scrolled. On the iPhone the panel covers the Chem lab card. 😀
- 05 Keep going: consistent with the suggestion, and "Your call." 🙂 Small glitch: "2 h 40 min in [1] and" reads badly with the chip.
- 06 Walk pill: the clock honestly pauses at 2:40. 🙂
- 07 "Walk, water, window." Still there. 😴
- 08 First week: the number conflicts with the clock. 😕
- 09 Morning escalation: two placeholder links. "Talk to someone now", a 24/7 line, is the first option offered for short sleep. 😕
- 10 "It's not a diagnosis." Good. 🙂
- 11 The travel/games/shifts off-ramp doesn't fit me. My short nights are deadlines, by choice. 😐
- 12 Not now: 7 days, and walk suggestions continue. Clear. 🙂

2. **The brutal truth**
1. This is my second review and I still can't tell whether my sleep leaves my phone, whether an LLM sees it, or how to delete it. "Nothing is shared" and "only you see this" (frame 09) only say who sees the screen. They say nothing about where the data goes.
2. "In 4 of your last 6 afternoons… settled back to usual after a walk" has no comparison. You trigger on high switching, and high switching falls back on its own (regression to the mean) `[unverified for my data]`. The label is honest now, but the claim is unproven.
3. The escalation card in frame 09 is still a mockup of help, not help. Its off-ramp has no option for "it's my deadlines".

3. **What actually worked**
- The See why rows. "watch · synced 38 min ago" and "laptop · 1 min ago" are exactly the provenance I asked for.
- "we only see which kind of app you're in, never what you type, read or browse". It's specific enough that I could test it.
- Keep going (frame 05) is now consistent and doesn't guilt me.

4. **Trust and safety**
- No diagnosis language. Good.
- A 24/7 counseling line as the top rung for short sleep feels heavy to me. Being an international student, I'd want to know whether that flag gets logged anywhere `[my story]`.
- 12 of 14 nights is computed somewhere. Say where.

5. **Fix list**
1. **A "Where this goes" screen linked from See why.** Per source: where it's stored, whether any field goes to an LLM and which fields, how long it's kept, and a delete button. This decides my consent. You'd know it worked if I can answer "does my sleep leave my phone?" in 10 seconds.
2. **Give "Early read" a comparison:** with a walk x/y vs without a walk x/y, and say so when there's no difference. Then I'd trust the walk. You'd know it worked when the without-walk number shows up.
3. **"This looks wrong" → "that was one task (debugging)".** Then it should learn that IDE, terminal and docs count as one task. That's what keeps it from interrupting me. You'd know it worked if I get fewer prompts during debugging after I mark it.
- **Cut:** "Walk, water, window."

**If you fix only one thing:** the "Where this goes" screen, covering storage, the LLM boundary and delete.

6. **What I'd want:** an 11 pm check on my ThinkPad. It would tell me whether to push on the bug or stop, using my Fitbit sleep data, and everything would stay on my phone.

7. `ICP_3 | 2026-11-05 | Island + Forecast retest (laptop + iPhone) | MEH | Clarity 8 · Trust 5 · Timing 5 · Useful 4 · Control 5 · Feel 7 · Come back 3 | overall 5 | 0.20 · 0.10 · 0.40 | one-fix: Show where data goes, the LLM boundary and delete`

Score moves: Clarity 7→8 because the Keep going card is consistent and Early read is defined. Trust 4→5 for the provenance rows and the honest label. Overall 4→5. The others didn't move because none of my blockers (data flow, Linux, Fitbit) changed.

### ICP_4 · Jordan Lee

It's calmer and more honest than last time. But the first-week screen still says "learning your usual sleep", and I don't have a watch, so for me Sunday never comes.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 |
| 5-second read | A study stopwatch with a countdown to my next class |
| Where I'd quit | Frame 08 (first week): "Still learning your usual sleep · 4 of 7 nights · Suggestions start around Sunday." No watch means no nights, so no suggestions. I'd quit on day 1. |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.20, to a classmate who has an Apple Watch |
| P(I'd consent to the data it asks for) | 0.50. Laptop app-type and calendar are OK. I'd refuse laptop tracking on the shared family laptop until it knows when it's me. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | My phone timer and the bus time `[my story]` |

**Since last time**
- A no-watch path, shown first: **not fixed**. Every frame assumes a watch: reason 3 "watch · synced 38 min ago", the first-week gate on sleep, and the morning card on sleep.
- Source and consent for calendar and location: **fixed**. See why, row 4 says "calendar · you turned this on · we never use your location".
- Numbers that agree: **not fixed**. The suggestion and Keep going now match (2 h 40 min). The first-week card says "1 h 50 min in" while the clock behind it says 2:40 and the line runs from 1:05 to now 3:45.
- Shared-laptop handling ('not me' / pause): **not fixed**. "This looks wrong" is two taps deep, and I can't see what it does. There's no "not me".
- Define 'helped': **fixed**. "your app switching settled back to usual after a walk", plus "Early read means under 10 afternoons."
- Cut the Today / refill tally: **not fixed**. It's gone on my phone but still on the laptop ("TODAY · 4 H 05 MIN · 1 REFILL"), and both show "A REFILL, IN PROGRESS".

1. **My run-through**
- 01 studying (SE): big 2:40, a line to lab, plenty of empty space. I know what it is. 🙂
- 02 suggestion: "Short walk now? 5 minutes fits. Back by 3:50." Clear, and the buttons are big for my thumb. Reason 3 is sleep I'd never have. 😐
- 03–04 See why: it scrolls on the SE, and the buttons are cut off in 03. "never what you type, read or browse" is the line that makes me OK with the laptop part. 🙂
- 05 Keep going: "Your call. I'll check in again around 4:05." No guilt. Good. 😀
- 06–07 walking: "Walk, water, window." Short. "Lab's still 40 min away" when it's 3:46 is a bit off. Can't judge the pill shrinking `[from stills]`. 🙂
- 08 first week: gated on sleep. ❌
- 09–12 morning sleep card: kind, "not a diagnosis", and "work shifts?" is something I'd tap `[my story]`. But it's sleep-only, so it never fires for me. The counseling lines are still placeholders "[...: confirm]". 😐
- Laptop 01: the Today tally with "1 refill" is a score, and scores make me feel behind. 😕

2. **The brutal truth**
1. Frame 08: there's no way into this for me without a watch. I asked last time and it's unchanged.
2. Shared laptop: session time and app switches come from a laptop my family uses. Nothing in any frame lets me say "that wasn't me".
3. Frame 08 contradicts itself (1 h 50 vs 2:40 on the same screen). If one number is wrong, I stop believing the 14 app switches too.

3. **What actually worked**: "Keep going" without guilt. "Not now" means 7 days. "Talk to someone" is always in the footer. The walk drawn onto the line ("walk · back 3:50"). "Early read" with 4 of 6 defined. The phone version dropped the tally. The page loaded in 0.2 s and 0.6 MB, but on a fast machine; I'd need to see the laptop helper running on my old laptop.

4. **Trust and safety**: The morning card is careful and points me to a person. That's the right call. The counseling placeholders need real names before anyone sees them. Nothing in it sounds like a diagnosis.

5. **Fix list**
1. **A laptop + calendar-only path.** The first week starts on day 1 without sleep, reason 3 shows "no watch, skipped", and the first screen says it works without a watch. That's the difference between me quitting on day 1 and trying it for a week. You'd know it worked when you can show me frame 02 with no watch in it.
2. **"Is this you?"** on the pill when the laptop wakes up, and one-tap "not me" pauses tracking. Then I'd consent to the laptop part.
3. **Make the first-week numbers match the clock.**
**Cut:** the laptop "Today · 1 refill" tally and the "a refill, in progress" label.
**If you fix only one thing:** let suggestions start without a watch.

6. **What I'd want**: The pill on the family laptop at the kitchen table, using only laptop time, app switches and my calendar. One "it's me" tap when I sit down. One honest nudge before my bus. Don't build anything that reads my café shift schedule from work. I'd tap "shift night" myself `[my story]`.

7. **Score line**
`ICP_4 | 2026-11-05 | Island + Forecast retest (iPhone SE + small laptop) | MEH | Clarity 7 · Trust 5 · Timing 6 · Useful 5 · Control 7 · Feel 7 · Come back 3 | overall 5 | week 0.25 · recommend 0.20 · consent 0.50 | one-fix: suggestions start without a watch (laptop + calendar only from day 1)`

Moves: Clarity +1 (the walk on the line reads instantly). Trust +1 ("helped" defined, calendar source shown; held back by the 1 h 50 mismatch). Control +1 (Keep going is guilt-free, Not now lasts 7 days, Pause is in the footer). Timing, Useful, Feel and Come back are unchanged because the no-watch blocker is unchanged.

### ICP_5 · Sam Whitaker

The morning card finally talks to me like a person. But I write at 1 am, and there's still nothing here for 1 am.

| | |
|---|---|
| Verdict | MEH (closer to I'D USE IT than last time) |
| Overall | 6/10 (up from 5) |
| 5-second read | A study timer with a black pill that tells me when to take a walk |
| Where I'd quit | Not in these frames. The risk is the hour I actually write, after midnight with no class coming, and nobody showed me that screen. I'd need to see it. |
| P(still running in a week) | 0.40 (up from 0.30) |
| P(I'd recommend it) | 0.30, to one friend in my thesis cohort, because of the morning card |
| P(I'd consent to the data it asks for) | 0.65 (up from 0.55). "Never what you type, read or browse" and "we never use your location" helped. I'd still hold off on the calendar. |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | My Oura app and my sister |

**Since last time**
- Keep going contradicted the sleep: **fixed.** Frame 5 says "Your call… The reasons haven't changed… 5 h 10 min of sleep, under your usual 7 h." That's honest and it doesn't scold me.
- A night version with no next class: **not fixed.** Every frame is built around Chem lab at 4:30.
- Name every source / does my Oura count as "watch": **half fixed.** The calendar and "never use your location" are named now (frame 3). Sleep still says "watch" in frames 3 and 10. I wear a ring, so I still don't know if this works for me.
- Rename "refill" to "break": **not fixed, and now it's mixed.** The screen says "1 REFILL" and "A REFILL, IN PROGRESS" while the button says "End break" (frames 6–7). Two words for one thing.
- Wire up "Why am I seeing this?": **fixed.** Frame 10 is plain and kind: "It's not a diagnosis. It's a nudge to talk to a person."
- "Not now" shouldn't drop back into walk prompts forever: **fixed.** Frame 12 says it comes back in 7 days, and "Talk to someone" stays at the bottom.
- Cut the sleep dot on the See-why slider: **not fixed.** It's still there in frame 3, a dot sitting left of my "usual." It reads like a grade.

1. **My run-through, moment by moment**
- 01 Studying: a big 2:40 clock. It's a clock, not a score, so I'm fine with it. 🙂
- 02 Suggestion: "Short walk now? 5 minutes fits." Plain. "Early read" next to "4 of 6 afternoons" is honest. 🙂
- 03–04 See why: I understood every word. The sleep slider dot still stings. 😐
- 05 Keep going: it respects my choice and doesn't pretend I slept fine. 😀
- 06–07 Walk: "Walk, water, window." I like that line. Then "refill" again. 🙂 `[from stills]`. I can't judge how the pill shrinks.
- 08 First week: "Still learning your usual sleep" is good. Then it says "1 h 50 min in" while the line below it runs from 1:05 to 3:45, which is 2 h 40. Which one is true? 😕
- 09 Short nights: "Want to talk it over with someone?" This is the screen I asked for. "Nothing is shared." 😀 But "[Campus counseling, 24/7: confirm]": does tapping it confirm something? Does it call someone? I read brackets literally. 😕
- 10 Why: clear. 😀
- 11 Travel/shifts: one tap and "we… won't count them." Which nights? All 12? 😕
- 12 Not now: 7 days, and it says so. 🙂

2. **The brutal truth**
1. No night screen. My bad hours are late `[my story]`, and frame 10 says the talk-to-someone card shows "only in the morning, never while you're studying." So at 1 am all I'd get is the walk card. A walk is the wrong answer at 1 am.
2. Frame 11 is too easy an escape. I'm someone who hasn't told anyone but my sister `[my story]`. I'd be tempted to tap "travel or shifts" just to make it stop, and then my 12 nights disappear.
3. The numbers don't line up in frame 8 (1 h 50 vs 2 h 40). After that I'd squint at every number.

3. **What actually worked:** Frames 9 and 10, which together are the first time this app sounds like someone who cares. Frame 5's "Your call." "Early read" explained in plain words in frame 3. "Talk to someone" sitting at the bottom of every screen.

4. **Trust and safety:** No diagnosis language anywhere. Good. Pointing me to a person after two weeks is the right call. The brackets in frame 9 have to become a real name and number before anyone like me sees it. Calling the ring a "watch" makes me doubt it reads my data at all.

5. **Fix list**
1. **A late-night card:** no class ahead, sleep short, so ask "Stop for tonight?" with the reason, and let the short-nights card show up then too if I've had many. That's when I'm on the laptop, so it's the one moment that would change what I do. You'd know it worked if testers who work at night stop more sessions after midnight.
2. **Say "ring" or "Oura" wherever it says "watch."** Otherwise I assume it doesn't work with mine and never connect it. You'd know it worked if ring owners connect sleep at setup.
3. **Frame 11 should show the nights it will drop and let me pick them.** I'd stop using it to make the card go away. You'd know it worked if fewer people tap it, and those who do drop fewer nights.

Cut: the slider dots in See why. The words already say it.

**If you fix only one thing:** build the 1 am screen.

6. **What I'd want:** On my iPhone at night, one plain line when I've been writing too long on too little sleep: "Stop for tonight?" Then, some morning, the frame 9 card with a real counseling number on it. I don't want a streak or a readiness number. I already get a number every morning from my ring.

7. **Score line**
`ICP_5 | 2026-11-05 | Island + Forecast retest (iPhone) | MEH | Clarity 7 · Trust 6 · Timing 5 · Useful 6 · Control 8 · Feel 7 · Come back 5 | overall 6 | week 0.40 · recommend 0.30 · consent 0.65 | one-fix: a late-night "stop for tonight?" card, with short-nights help reachable then too`

Score moves: Trust +2 (Keep going and "Why" fixed; pulled down by ring=watch and 1 h 50/2 h 40). Useful +1 and Feel +1 (the morning card). Control +1 ("Not now" says when it comes back; location named). Come back +1. Timing and Clarity unchanged (no night version; mismatched minutes).

## Related

- [[25-journal/2026-11-05-icp-island-forecast]] (first test) · [[03-users/personas/icp-personas|ICP Personas]] · [[25-journal/25-journal|Journal hub]]
