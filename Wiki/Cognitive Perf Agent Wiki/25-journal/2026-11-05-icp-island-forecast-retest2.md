---
title: "ICP re-test 2: Island + Forecast after the next-three fixes"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/suggestion-card-v3/island-forecast.html", "25-journal/2026-11-05-icp-island-forecast.md", "25-journal/2026-11-05-icp-island-forecast-retest.md", ".claude/skills/icp/SKILL.md"]
summary: "Third look: still 5 of 5 MEH. Overall flat at 5.4 (4.8 → 5.4 → 5.4); Trust up again to 6.6. Useful (5.0) and Come back (4.0) haven't moved in three rounds. Every 'fix only one thing' is unchanged, and each one is a scope decision, not polish. New safety flag: marking nights 'exams or deadlines' can switch the short-nights card off (Sam). Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T10:00:00Z
updated: 2026-11-05T10:00:00Z
---

# ICP re-test 2: Island + Forecast after the next-three fixes

**Mode T, round 3.** The same design was tested again after the team (Heramb) chose "the next three" from [[25-journal/2026-11-05-icp-island-forecast-retest]]. Each persona saw 12 frames on their own device(s): studying → suggestion → See why (top, bottom) → Keep going → walking → pill tapped → first week → morning short-nights card → "Which nights were they?" → Done → "Why am I seeing this?". Captures are in `.icp-tests/2026-11-05-island-forecast-retest2/` (gitignored). Each persona read their ledger first. **Synthetic personas and synthetic data: a rehearsal, never evidence.**

## Headline

**Still 5 of 5 MEH, and the overall score has plateaued:** 4.8 → 5.4 → **5.4**.
- **The three fixes landed.** First-week numbers now agree (confirmed by Maya, Anika, Jordan). "Refill" and the Today tally are gone (Maya, Jordan, Sam). The pick-the-nights grid works: Diego calls it "the best screen in the app" and Sam calls it "real arithmetic".
- **Trust rose again**, to 6.6.
- **Useful (5.0) and Come back (4.0) have barely moved in three rounds** (4.8 → 5.0 → 5.0; 3.8 → 4.0 → 4.0).
- **Every "if you fix only one thing" is the same as last round.** Each one is a scope decision, not a screen polish:
  - Maya: a Watch tap
  - Diego: training-aware options
  - Anika: a "Where this goes" screen
  - Jordan: a no-watch path
  - Sam: a 1 am screen

**Where they'd quit** (unchanged from round 2):

| Step | Who'd quit there |
|---|---|
| Install or consent (not shown) | Anika (no Linux collector, Fitbit not named, no data-path screen) |
| F2 suggestion | Diego (a walk on the bus or after a lift) |
| F5 Keep going ("around 4:05") | Maya (a clock time, not "after this problem") |
| F8 first week | Jordan (waits for sleep data; no watch) |
| Not shown | Sam (the 1 am screen) |

## Scores across three rounds

| Persona | Round 1 | Round 2 | **Round 3** | Round 3 detail (Clarity · Trust · Timing · Useful · Control · Feel · Come back) |
|---|---|---|---|---|
| ICP_1 Maya | 6 | 6 | **6** | 8 · 7 · 5 · 6 · 7 · 8 · 5 |
| ICP_2 Diego | 4 | 5 | **5** | 8 · 7 · 6 · 4 · 7 · 7 · 4 |
| ICP_3 Anika | 4 | 5 | **5** | 8 · 6 · 5 · 4 · 5 · 7 · 3 |
| ICP_4 Jordan | 5 | 5 | **5** | 7 · 6 · 6 · 5 · 7 · 7 · 3 |
| ICP_5 Sam | 5 | 6 | **6** | 7 · 7 · 5 · 6 · 8 · 7 · 5 |

| Mean | Round 1 | Round 2 | **Round 3** |
|---|---|---|---|
| Clarity | 6.8 | 7.6 | 7.6 |
| Trust | 4.4 ⚑ | 5.8 | **6.6** |
| Timing | 5.2 | 5.4 | 5.4 |
| Useful | 4.8 ⚑ | 5.0 ⚑ | **5.0 ⚑** |
| Control | 6.0 | 6.6 | 6.8 |
| Feel | 6.6 | 7.0 | 7.2 |
| Come back | 3.8 ⚑ | 4.0 ⚑ | **4.0 ⚑** |
| Overall | 4.8 ⚑ | 5.4 | **5.4** |
| P(week) | 0.26 | 0.30 | 0.30 |
| P(recommend) | 0.16 | 0.21 | 0.21 |
| P(consent) | 0.47 | 0.53 | **0.55** |
| "Somewhat disappointed" if it vanished | 1 | 2 | **1** (Sam; Maya dropped back) |

## Since last time

**Fixed and confirmed:**
- The first-week card says 2 h 40 (Maya, Anika, Jordan).
- The Today tally and "refill" are gone (Maya, Jordan, Sam).
- You can pick which nights (Sam, Diego).
- "Exams or deadlines" is a reason (Maya, Anika).
- Everything from rounds 1–2 still holds.

**Still not fixed:**
- Each persona's personal blocker.
- App switching treated as work (Maya, Anika).
- Sleep device named, "watch" vs ring and Fitbit (Sam, Anika).
- Real counseling links (all).
- "This looks wrong" does nothing (Anika, Diego, Jordan).
- The sleep dot on the slider (Sam, third time).
- "Walk, water, window" (Anika).

## New in this round

1. **The walk card's "Lab's still 40 min away"** sits above the class card's "45 min from now": 3 (Maya, Diego, Jordan). Cheap fix.
2. **"Exams or deadlines" can switch the short-nights card off** (Sam). His short nights are thesis-deadline nights, which is exactly when he needs to talk to someone. Verified in the source: marking 9 nights drops the card to "check again next week". **Safety flag.**
3. **Calendar scope creep** (Anika). See why says the calendar is on for "next class", but the night grid reads 14 days of past events to pre-mark away games. Maya asks whether her exam dates would pre-mark the same way.
4. **The 24/7 line as the white primary button for "short sleep" feels heavy** (Maya; Anika said the same in round 2). Put booking or 2 quiet minutes first.
5. **"We'll keep this card around, gently"** feels watched (Maya) and doesn't say how often (Diego).
6. **Snooze disappears when See why is open:** 2 (Maya, Jordan).
7. **Diego:** the morning headline should already subtract the away games it knows about ("9 of 11 non-game nights").
8. **Small:**
   - the chip breaks "2 h 40 min in [1]" (Sam)
   - "2:40" first read as a time of day (Sam)
   - the blue legend dot vs dark marks on selected nights (Sam)
   - the "next check 4:05" label is tight at the right edge (Anika)
   - the See why panel covers the class card on the small laptop (Jordan)

## Where they disagree

- **The pick-the-nights grid:**
  - Diego and Sam like it most.
  - Anika objects to the calendar history it reads.
  - Maya wants it to pre-mark exams too.
  - Sam wants exam/deadline nights to not count as an excuse.
- **The calendar:** Diego wants it read *more* (practice, lift and game blocks for the main card). Anika wants it read *less* ("next event only").
- **"Walk, water, window":** Maya, Jordan and Sam like it; Anika would cut it (third time).

## Changes made after this test (2026-11-05)

The team (Heramb) chose "do the quick fixes". These are applied to `design/mockups/suggestion-card-v3/island-forecast.html` and published as gallery version 7. The ledger asks stay open until the next re-test.

1. **Safety (Sam):**
   - Nights marked "exams or deadlines" now stay in the count. Only travel, games and shifts are left out.
   - The grid says "Exam and deadline nights still count. Crunch weeks are a good time to talk to someone too."
   - Checked: marking 6 exam nights still shows "9 of 11", and the card stays.
2. **"This looks wrong" works.** It asks "What looks wrong?" with three choices, and each one gets a "Thanks, noted" reply that says what changes:
   - "That was one task": reason 2 is dropped for the session.
   - "My sleep number is off": sleep is dropped for today.
   - "That wasn't me": the session is removed, and the pill asks "Is this you?" next time.
3. **One lab time:** the walk card says "Back by 3:50, still 40 min before lab". The old "Lab's still 40 min away" contradicted the 45 min on the class card.
4. **Snooze stays in See why**, next to "This looks wrong" and "Hide why".
5. **The sleep card:**
   - "Book a time to talk" is now first. The 24/7 line is second.
   - The headline count already leaves out the 3 away-game nights from the calendar: "9 of your last 11".
   - "Why" matches it.
   - "Keep this card around, gently" now reads "in the morning, at most once a week".
6. **Small honesty fixes:**
   - "watch or ring" everywhere
   - the calendar row says "next class and away games", and the grid says "your calendar's last 14 days"
   - no slider dot on the sleep row
   - the Keep-going sentence no longer breaks on a chip ("you've been at it 2 h 40 min [1] and slept 5 h 10 min [3]")
   - the blue dot stays blue on marked nights

**Not done:** each persona's scope-level blocker (Watch tap, training days, where data goes, no watch, 1 am), plus a with-walk vs without-walk comparison, a Linux collector, and real counseling links. **Not adopted:** pre-marking exam nights from the calendar (Maya). It conflicts with the safety fix, because exam nights now count anyway.

**Checked:** 14–15 frames on each of iPhone SE, iPhone and Pro Max, including taps through the exam-night grid and "This looks wrong". No failed checks and no console errors.

## Safety and trust flags (for `/plan-review`'s safety lens)

- **Deadline nights must not silence the short-nights card** (Sam). Travel, games and shifts can explain sleep loss. Exams and deadlines are themselves a stress signal. Fix: those nights stay counted, and the card says so.
- **The placeholder counseling links** are still named by all five. These are blocked until Columbia Health confirms them.
- **The 24/7 line as the default for sleep** (Maya, Anika): offer booking or quiet minutes first, and keep the 24/7 line one tap away.
- **"Only you see this" / "Nothing is shared" are absolute claims** (Anika). If there's a server, say exactly what it holds.
- **Calendar reads past events beyond the stated purpose** (Anika). This needs consent wording or a narrower scope.
- **No diagnosis language was found** by any tester.

## Hardest truths (quoted)

- Maya: "You fixed the stuff around the edges and left the middle alone."
- Anika: "That's the first of my four questions answered, three reviews in."
- Jordan: "This is the third time I've looked, and every reason on that black card still assumes I own a watch."
- Sam: "Deadlines are the reason I need to talk to someone."
- Diego: "The walk card still thinks I'm a pre-med with a free afternoon."

## Fixes

**"If you fix only one thing"** (all unchanged from round 2):
- Maya: a Watch tap at the end of a problem.
- Diego: training-aware main card (sit or nap on lift, practice and travel days).
- Anika: a "Where this goes" screen.
- Jordan: suggestions start without a watch.
- Sam: a 1 am "stop for tonight?" screen with help a tap away.

**These are design-scope decisions for the team, not polish.** Watch delivery and the no-watch path touch the architecture (HealthKit / native app, ADR scope). The night screen and training awareness change the suggestion engine's states. The data-path screen needs the CTO's and CSO's real answers. Three rounds show polish has stopped moving Useful and Come back.

**Cheap and ranked by count:**
1. "40 vs 45 min" (3)
2. "This looks wrong" does something (3)
3. Exam/deadline nights stay counted (safety; 1, but a flag)
4. Snooze stays visible in See why (2)
5. 24/7 line not the default primary (2)
6. Say how often "gently" means (2)
7. Calendar scope wording (1)
8. Subtract known away games in the headline (1)

---

## The five cards (verbatim)

### ICP_1 · Maya Okafor

You fixed the stuff around the edges and left the middle alone. It still reaches me the same way, at the same moments, and that was always my problem.

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 (=) |
| 5-second read | A study timer with a countdown to lab that wants me to take a walk. |
| Where I'd quit | Frame 5, "I'll check in again around 4:05". In exam week, 4:05 is a clock time, not the end of my problem. The first time it lands halfway through a mechanism I hit Pause suggestions, and I don't turn it back on. |
| P(still running in a week) | 0.40 (from 0.38) |
| P(I'd recommend it) | 0.30, to my orgo lab partner, who crams like I do `[my story]` |
| P(I'd consent to the data it asks for) | 0.65. Watch sleep and calendar are fine. I'd hesitate on the laptop app-switch tracking while it still treats my study apps as drift. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Nothing: an energy drink at hour 3 and my own gut. My Watch's stand nag, which I ignore `[my story]` |

**Since last time**
- Delivery with the phone face-down (Watch tap at a natural pause): **not fixed.** Every frame is still the pill on a phone screen I'm not looking at. The laptop version is a phone-width column in a browser tab, and that tab sits behind Anki.
- Short-nights card never mid-session, leads with the offer: **still fixed.** Frame 12 says "only in the morning, never while you're studying."
- Numbers agree: **fixed.** The first week now says "2 h 40 min in", which matches the clock. One new slip: frame 7 says "Lab's still 40 min away" while the card right under it says "45 min from now."
- "Chem lab" from my calendar, no location: **still fixed.**
- "Helped" defined: **still fixed.**
- Switching between Anki, PDF and notes counts as work: **not fixed.** "14 app switches, usual 5–8" is still reason #2.
- "Snooze until I finish this one": **not fixed.** It's still "Snooze 20 min", and it disappears once "See why" is open (frames 3–4).
- Cut the Today/refill bar: **fixed.** Frame 1 is just the clock, the line and lab. Much calmer.
- Keep-going check-in waits for the next pause: **not fixed.** It still says 4:05.
- "Exams" as a reason: **fixed.** There's an "Exams or deadlines" chip.

1. **My run-through**
- F1 studying: 🙂 Clean. A big 2:40, "No break yet", lab at 4:30. I'd glance and go back to work.
- F2 pill opens: 😐 "Back by 3:50, well before lab" is the right line, because losing time is my real fear. But I can't see how it knew this was a pause `[from stills]`.
- F3–4 See why: 🙂 The usual ranges, "synced 38 min ago" and "never what you type" all read as honest. Then Snooze vanished.
- F5 keep going: 😕 "Around 4:05." That's a timer, and it's the reason I quit the Pomodoro app `[my story]`.
- F6 walking pill: 🙂 A small countdown, and the clock paused at 2:40. Good.
- F7 break tapped: 😀 "Walk, water, window." "+5 min." Then 40 vs 45 min, which I noticed.
- F8 first week: 🙂 It admits it doesn't know my sleep yet, and the progress bar is honest.
- F9 morning card: 😐 12 of 14 nights is true, and it's morning, so OK. But the white button is a 24/7 counseling line, for sleep.
- F10 which nights: 🙂 Exams is there now. The pre-marks are "3 away games" though. I don't have games. Would my orgo exam dates pre-mark the same way?
- F11 done: 😕 "So we'll keep this card around, gently" makes me feel watched.
- F12 why: 🙂 "It's not a diagnosis." Clear.
- Laptop F1–12: 😐 The same phone column centered on a big empty page. It only reaches me if the tab is in front, and it never is.

2. **The brutal truth**
1. Timing hasn't moved in three reviews. Frame 2 says the pill "opens by itself", frame 5 says 4:05, and the snooze says 20 min. None of those is "when I finish this problem."
2. Reason #2 punishes my hardest stretch. Practice problems mean flipping between the PDF, the answer key and Anki. That's when my switching goes up, so that's when it'll decide I'm "at a pause."
3. On the laptop it's a web page. My phone is face-down. Nothing reaches my wrist. So in real life I don't see frame 2 at all.

3. **What actually worked**
"You'll be back by 3:50, well before lab." The paused study clock during the walk. "Early read means under 10 afternoons." The Today bar is gone. The first-week numbers match now.

4. **Trust and safety**
The morning card does point me to a person, which is right. But the top option for "short sleep" is a 24/7 line. I'd want booking a time or 2 quiet minutes on top, and the 24/7 line second. "Keep this card around, gently" sounds like surveillance.

5. **Fix list**
1. **A Watch tap that waits for a pause I signal** (one tap, or my laptop going idle). That's how it would actually reach me. You'd know it worked if pilot users act on more of the suggestions and pause suggestions less.
2. **Swap every clock time (4:05, 20 min) for "after this one."** Then a suggestion never lands mid-mechanism. You'd know it worked if snoozes stop turning into pauses.
3. **Let me mark Anki, PDF and notes as one task.** Then reason #2 is true for me. You'd know it worked if fewer people tap "This looks wrong" on reason #2.

**Cut:** "So we'll keep this card around, gently." (F11)

**If you fix only one thing:** deliver it as a Watch tap at the end of my problem, not a pill on a face-down phone.

6. **What I'd want**
At hour 3 in the library, one buzz on my wrist when I close a problem: "Walk 5, back by 3:50." No phone, no tab.

7. **Score line**
`ICP_1 | 2026-11-05 | Island + Forecast re-test 2 (iPhone + laptop) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 6 · Control 7 · Feel 8 · Come back 5 | overall 6 | week 0.40 · recommend 0.30 · consent 0.65 | one-fix: Watch tap at the end of a problem, phone face-down`

Score moves: Feel 7→8 (Today bar cut, first-week numbers match). Everything else is unchanged, because the four open asks are all about timing and none of them moved.

New asks: pre-mark exam nights from my calendar like the away games are · fix the "40 min" vs "45 min" on frame 7 · make the 24/7 line the second option, not the white primary, on the sleep card · keep Snooze visible when "See why" is open.

### ICP_2 · Diego Ramírez

The away-game nights are finally on my side of the screen. The walk card still thinks I'm a pre-med with a free afternoon.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 (same as last time) |
| 5-second read | A study timer that pops up at the top and tells me to go for a walk |
| Where I'd quit | Frame 2, "Short walk now?" with the white **Walk 5 min** button, the first time it fires on the bus or in Monday–Thursday study hall after a lift day `[my story]` |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.15, to a non-athlete roommate who studies in the library |
| P(I'd consent to the data it asks for) | 0.50: laptop and calendar yes; I'd refuse the watch until it says where Garmin data comes from and that staff can't see it |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Garmin sleep plus my own judgement, and the bus for naps `[my story]` |

**Since last time**
- Knows training load and travel days: **not fixed.** Away games now come from the calendar (frame 10), but the walk card (frames 2–4) has no idea I practised or lifted.
- "Only you see this" plus where watch data goes, on every card: **not fixed.** The morning card says it ("only you see this", "Nothing is shared."). The walk card doesn't, and the watch row (frame 3) still says only "watch · synced 38 min ago". It doesn't say which account it reads, and it doesn't mention staff.
- Keep going contradicts the suggestion's sleep: **fixed, still holds.** Frame 5 says "under your usual 7 h."
- Options for a bus or study hall, including a nap: **not fixed.** It's still Walk / Keep going / Snooze.
- Define "helped": **fixed, still holds.** Frame 3 also defines "Early read" now.
- Short-nights card asks about travel before counseling: **not fixed.** It's still 4th, the dashed button under three counseling options (frame 9).
- Cut the six-dot meter: **fixed, still holds.**
- Read practice, lift and game blocks from the calendar: **not fixed.** It reads games only, and only on the morning card.
- Pick which nights the travel option drops: **fixed.** Frame 10 is exactly what I asked for.
- Cut the Today bar: **can't tell.** A bar is still there, now scoped to the session. This one at least earns its space with "back 3:50".

1. **My run-through**
- F1 clock: 🙂 Clear. But it's org chem and a chem lab. That's not my day.
- F2 suggestion: 😕 The reasons are honest, but the one I'd need ("you lifted at 3") is missing. On the bus this card is useless `[my story]`.
- F3–4 See why: 🙂 "we never use your location" and "never what you type" work. **This looks wrong** is the button I'd hit after a lift. I can't see what it does.
- F5 Keep going: 😀 No guilt, gives a check-in time.
- F6–7 walk: 😐 Fine `[from stills]`. But "Lab's still 40 min away" sits on top of "45 min from now" on the same screen.
- F8 learning: 🙂 Honest. It holds off until Sunday.
- F9 morning card: 😐 Gentle and private. But it already knows 3 of those nights were away games and still opens with "12 of the last 14."
- F10 night picker: 😀 Games pre-marked, and I can fix the rest. Best screen in the app.
- F11 done: 😐 9 of 11 is fair. But "keep this card around, gently" doesn't say how often.
- F12 why: 🙂 "It's not a diagnosis." Good.

2. **The brutal truth**
1. Frame 2: the main card is unchanged for me. "Walk 5 min" is the white primary button on a bus or in a mandatory study hall. Three rounds and no nap, no sit-and-stretch, no "you trained at 6 am."
2. Frame 3, sleep row: "watch" says nothing about my team-issued Garmin. If this reads through the team account, I'm not wearing it while it's on.
3. Frame 9: it knows about the away games (frame 10 proves it) but makes me dig past three counseling buttons before it subtracts them.

3. **What actually worked:** the night picker with calendar-marked games (F10). The 7-day "Not now" in the page text. "This looks wrong" (F3). Keep going never nags (F5).

4. **Trust and safety:** Counseling links are still placeholders ("[Campus counseling, 24/7: confirm]"), so I can't judge them. It points to campus counseling, not athletics, which is right for me `[my story]`. Nothing reads like a doctor. The 40 vs 45 min mismatch (F7) is small, but it's the kind of thing I notice.

5. **Fix list**
1. **Training-aware main card.** When the calendar shows practice, a lift or travel, swap Walk for "Sit and stretch 5" or "Nap 20 on the bus", with the reason "you lifted at 3." The calendar link already exists. *Why:* it's the difference between snoozing it and taking it on 3 nights a week `[my story]`. *How you'd know:* on lift and travel days, accepted cards outnumber snoozes.
2. **Watch line on the walk card:** "your own Garmin login, not the team account · staff never see this." *Why:* that's the only thing stopping me consenting to the watch. *How you'd know:* watch consent among athletes.
3. **Morning card:** subtract known away games before the headline ("9 of 11 non-game nights"), and say how often "gently" means. *How you'd know:* fewer "Not now" taps from athletes.
- **Cut:** "Lab's still 40 min away" (F7). It contradicts the "45 min" on the same screen, and the timeline already shows it.

**If you fix only one thing:** make the main card training-aware. On practice, lift and travel days, offer sit or nap instead of a walk.

6. **What I'd want:** One card on my phone at study hall or on the bus that knows I lifted and says "nap 20" or "push 40 more." It should come from my own Garmin login, never from the team dashboard.

7. **Score line**
`ICP_2 | 2026-11-05 | Island + Forecast re-test 2 (iPhone) | MEH | Clarity 8 · Trust 7 · Timing 6 · Useful 4 · Control 7 · Feel 7 · Come back 4 | overall 5 | week 0.25 · recommend 0.15 · consent 0.50 | one-fix: Training-aware main card (practice/lift/travel days: sit or nap, not walk)`

Score moves: Trust +1 (night picker, location line, "This looks wrong"). Control +1 (night picker, 7-day "Not now", "Nothing is shared" on the morning card). Consent +0.05 (clearer laptop and calendar lines). Everything else is unchanged because the walk card hasn't changed for my days.

### ICP_3 · Anika Sharma

You finally told me what the laptop sees, in one sentence. That's the first of my four questions answered, three reviews in. Three are still blank.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 (held) |
| 5-second read | A study timer with a pill that tells me to take a walk before my next class. |
| Where I'd quit | At install, before frame 1: no Linux collector, and "watch" never names Fitbit. If I got past that, I'd quit at the consent step, because no screen says where my sleep goes. |
| P(still running in a week) | 0.20 |
| P(I'd recommend it) | 0.10, to a Mac-using classmate who studies in long blocks |
| P(I'd consent to the data it asks for) | 0.45 (+0.05). I'd refuse full calendar history. I'd allow next event only. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Fitbit sleep log plus a 50-minute phone timer `[my story]` |

**Since last time**
- Keep going contradicts the sleep reason → **fixed** (frame 5 still says "under your usual 7 h")
- Calendar and location as separate toggles → **not fixed**. "We never use your location" is now in words (frame 3), but there's no toggle. Frame 10 reads two weeks of past calendar events, which is a wider scope than "next class". I can't tell if that's new.
- Define 'helped' / drop 'Fairly sure' → **fixed**
- Where data goes, the LLM boundary, deletion → **not fixed**. The collection line was added, but storage, LLM fields and delete are still missing.
- Linux collector and Fitbit → **not fixed**
- Real escalation links → **not fixed** ("[Campus counseling, 24/7: confirm]")
- First-week 1 h 50 vs 2:40 → **fixed** (frame 8 says 2 h 40)
- App switching while debugging counts as work → **not fixed**
- Cut 'Walk, water, window' → **not fixed** (frame 7)
- 'Early read' needs a without-walk comparison → **not fixed**. The label is defined ("under 10 afternoons") but there's still no baseline.
- 'This looks wrong' → "that was one task" → **not fixed**. In the live page the button does nothing.
- Is the escalation flag logged? → **not fixed**. "Only you see this" is a claim, not an answer.
- Deadlines as a reason → **fixed** ("Exams or deadlines" chip)

1. **My run-through**
- F1 clock + bar: 1:05 → 3:45 = 2:40. It adds up. 🙂
- F2 pill opens: the reasons are numbered and sourced. "14 app switches" would be me in editor↔terminal↔docs mid-bug. 😕 `[from stills]`, I can't judge how it interrupts.
- F3–4 See why: "never what you type, read or browse" is what I asked for. "Which *kind* of app" makes me ask whether names are classified on the device or uploaded. 🙂
- F5 Keep going: respects my call, the reasons stay consistent, and the check-in is at 4:05. 😀 On iPhone the "next check 4:05" label runs past the right edge.
- F6–7 walk: the countdown is clear. The island says "Lab's still 40 min away" while the card under it says "45 min from now". 😐
- F8 first week: the numbers finally match. 🙂
- F9 morning card: I checked it. 12 of 14 under 6 h is correct. The links are placeholders. 😕
- F10 nights: 9 of the other 11 is correct. But it read my calendar history to pre-mark "away games". I turned the calendar on for my next class. ❌
- F11–12: "never while you're studying… not a diagnosis" is the right line. 🙂

2. **The brutal truth**
1. After three reviews, nothing says where my sleep data is stored, which fields reach a hosted LLM, how long it's kept, or how I delete it. "Nothing is shared" (F9) with no mechanism behind it reads as marketing.
2. The calendar does more than it says. F4 says "you turned this on" for next class. F10 scans 14 days of events. That's purpose creep, and it's the thing I'd catch first.
3. My main pattern gets misread. 14 switches in 20 minutes is normal debugging for me `[my story]`, and "This looks wrong" can't correct it.

3. **What actually worked:** Every number I checked is consistent: 2:40 across the clock, bar, card and first week, 12/14 and 9/11. The laptop sentence is plain and specific. "We never use your location." The Keep going screen. Morning-only escalation.

4. **Trust and safety:** "Only you see this" and "Nothing is shared" are absolute claims. If there's a server, the team can see it. A "24/7" counseling button that leads nowhere is worse than no button.

5. **Fix list**
1. **"Where this goes" screen**, linked from See why: on the phone or a server, the exact fields an LLM gets, retention, one delete button that confirms the data is gone. This moves my consent above 0.6. You'll know it worked if I can answer all four in 30 seconds.
2. **Make "This looks wrong" work**, with "that was one task (debugging)", and define what counts as a switch. Without that I snooze F2 by day 3. You'll know it worked if the next debug session doesn't cite switches.
3. **Calendar scope:** say "reads past 14 days" and offer "next event only". Put real links in F9.
- **Cut:** "Walk, water, window."

**If you fix only one thing:** the "Where this goes" screen.

6. **What I'd want:** On my iPhone, at 11 pm, one line: "you're near your usual stop, bug or not." The data would stay on the phone and the LLM would never see it. Laptop data would come from Linux.

7. `ICP_3 | 2026-11-05 | Island + Forecast re-test 2 (laptop + iPhone) | MEH | Clarity 8 · Trust 6 · Timing 5 · Useful 4 · Control 5 · Feel 7 · Come back 3 | overall 5 | week 0.20 · recommend 0.10 · consent 0.45 | one-fix: 'Where this goes' screen: storage, LLM fields, retention, delete`

Trust moved +1 because of the laptop collection line and the fixed 1 h 50 vs 2:40 mismatch. Everything else held: no change in control, timing or platform.

### ICP_4 · Jordan Lee

This is the third time I've looked, and every reason on that black card still assumes I own a watch. I don't.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 (=) |
| 5-second read | A study timer with a bar that runs to my next class. That part I got right away. |
| Where I'd quit | Frame 08, "Still learning your usual sleep · 4 of 7 nights". With no watch that bar never fills, so "Suggestions start around Sunday" never comes. |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.20, to a friend who has an Apple Watch |
| P(I'd consent to the data it asks for) | 0.50. Laptop yes, calendar maybe. The watch part doesn't apply to me. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | The phone's own timer, and my lab alarm |

**Since last time**
- A no-watch path, shown first: **not fixed**. Frame 02 still gives "slept 5 h 10 min" as reason 3. Frame 08 still holds suggestions back until it knows my sleep. Nothing on any screen says what happens without a watch. This is the third time I've asked.
- Numbers that agree: **fixed**. The first week now says 2 h 40 min, which matches 2:40. I counted the nights in frame 10: 12 of 14 under 6 h, and 9 of the other 11. Both are right. One small slip: frame 07 says "Lab's still 40 min away" while the card under it says "45 min from now".
- Shared-laptop handling ("not me" / pause): **not fixed**. There's "Pause suggestions", but no way to say "that wasn't me".
- Cut the Today / refill tally: **fixed**. It's gone on both devices, and "a refill, in progress" now reads "a break, in progress".
- "Is this you?" on the pill when the laptop wakes: **not fixed**.

1. **My run-through:**
- 01 Studying: 🙂 Big 2:40 and a bar to Chem lab. Clear on the SE, nothing cut off.
- 02 Suggestion: 😐 "Short walk now?" reads fast, but one of its three reasons is sleep I can't give it. `[from stills]` I can't tell how it feels when it pops open.
- 03/04 See why: 🙂 Every number names where it came from ("laptop · 1 min ago"). "Never what you type, read or browse" is exactly the line I wanted. On the laptop this panel covers the Chem lab card.
- 05 Keep going: 😀 "OK, keep going. Your call." No guilt.
- 06/07 Walking: 🙂 The pill turns into a countdown, and the study clock pauses at 2:40. "Walk, water, window" is short. Then 40 vs 45 min.
- 08 First week: ❌ "Learning your usual sleep." It's learning something I'll never send it.
- 09 to 12 Morning sleep card: 😐 Fair and kind, and it says "not a diagnosis". There's a "Work shifts" chip, which fits my closing shifts `[my story]`. But it's all built from watch sleep, so I'd never see it.

2. **The brutal truth:**
1. The no-watch path is still missing (frames 02 and 08). If it needs a watch, say so on the first screen. If it doesn't, show me.
2. The family laptop gets treated as only mine. My brother on it at 9 pm turns into my "14 app switches" `[my story]`.
3. On the 1366×768 laptop, the See why panel (frames 03/04) sits on top of the Chem lab card. Also, "Snooze 20 min" disappears while See why is open.

3. **What actually worked:** "Your call." Pausing the study clock during the walk. No streaks anywhere. The numbers finally add up. The page is 0.65 MB, so it might not choke my laptop `[from stills]`; I'd have to try it on the real thing.

4. **Trust and safety:** The morning card points me to a person and says it's not a diagnosis. Good. But "[Campus counseling, 24/7: confirm]" is still a placeholder. If that's not a real number by launch, the card is worse than having no card. "This looks wrong" has no visible result, so I can't tell what tapping it does.

5. **Fix list:**
1. Show a version of frame 02 built only from laptop and calendar, and make frame 08 count study sessions, not nights of sleep. Then I'd keep it past day 1. You'd know it worked if a no-watch tester gets a suggestion on day 1.
2. A one-tap "not me" on the pill when the laptop wakes. Then I'd trust the switch count. You'd know it worked if the count stops including other people's sessions.
3. Fix the laptop overlap, and keep Snooze visible while See why is open.
- **Cut:** the sleep line in the "OK, keep going" text for people with no sleep data.

**If you fix only one thing:** make suggestions start without a watch, from laptop and calendar, on day 1.

6. **What I'd want:** On the family laptop at the kitchen table, before a 4:30 lab: "45 min left, 5-min walk fits." No watch, no sleep score. On the SE I'd just glance at the pill. That's all I need.

7. **Score line:**
`ICP_4 | 2026-11-05 | Island + Forecast retest 2 (iPhone SE + small laptop) | MEH | Clarity 7 · Trust 6 · Timing 6 · Useful 5 · Control 7 · Feel 7 · Come back 3 | overall 5 | week 0.25 · recommend 0.20 · consent 0.50 | one-fix: Suggestions start without a watch (laptop + calendar from day 1)`

How the scores moved: Trust 5→6, because the numbers now agree and I checked the night counts. Everything else is unchanged. The no-watch path and the shared laptop haven't changed, so Useful and Come back stay where they were.

### ICP_5 · Sam Whitaker

The morning sleep card is now the best thing in this app. But I still write at 1 am, and I still haven't seen what it does then.

| | |
|---|---|
| Verdict | MEH (closer to I'D USE IT) |
| Overall | 6/10 (no change) |
| 5-second read | A study timer that tells me when to stand up before class |
| Where I'd quit | At night. Frame 1's line runs "up to your next stop", and at 1 am I have no next stop. I'd need to see that screen. If it says "Short walk now? 5 minutes fits", I quit there. |
| P(still running in a week) | 0.40 |
| P(I'd recommend it) | 0.30, to my sister, for the morning card only |
| P(I'd consent to the data it asks for) | 0.65. I'd hold back the calendar. It does nothing for me at night. |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | The Oura app (which I dread), a bedtime alarm, and texting my sister `[my story]` |

**Since last time**
- Keep going contradicts the sleep it just showed → **fixed**, and still fixed (frame 5: "under your usual 7 h")
- Night version, "stop for tonight?" → **not fixed**. Every frame is an afternoon with a chem lab.
- Name every source → **partly fixed**. Location is back ("we never use your location"). Sleep still says "watch" (frames 3 and 12). I wear a ring.
- Rename "refill" to "break" → **fixed** (frames 6–7: "Walk", "A break, in progress", "End break")
- "Why am I seeing this?" → **fixed**, still works (frame 12)
- "Not now" shouldn't drop me back into walk prompts forever → **fixed**. The page text says 7 days, and "Talk to someone" stays at the bottom.
- Cut the sleep dot on the See-why slider → **not fixed** (frame 3, row 3)
- Travel/shifts shows the nights and lets me pick → **fixed** (frame 10)
- Brackets on the counseling links → **not fixed** (frame 9: "[Campus counseling, 24/7: confirm]")

1. **My run-through, moment by moment**
- F1 studying: big clock, plain words. 🙂 But "2:40" with no label read as a time of day for a second.
- F2 suggestion: "Short walk now?" is clear. "Early read" sounds honest. 🙂 How the pill opens `[from stills]`.
- F3–4 See why: "never what you type, read or browse" is the sentence I needed. The sleep row still sits on a slider with a dot way left of "usual", which is a grade. 😕
- F5 Keep going: "Your call." Good. But "2 h 40 min in [1] and…" made me read "in 1". I read literally, and the chip broke the sentence. 😐
- F6–7 walk: "Walk, water, window." That sounds like a person. 😀 The countdown `[from stills]`.
- F8 first week: "Still learning your usual sleep. Suggestions start around Sunday." Honest. 🙂
- F9 short nights: "Want to talk it over with someone?" first, the walk nowhere. Exactly what I asked for. 😀 Then the most important button says "[...: confirm]". 😕
- F10 which nights: it shows its math, 9 of 11. 🙂 Fourteen orange decimals at 9 am feel like my ring's morning score times fourteen. 😕 The legend has a blue dot, but the marks on the nights are dark.
- F11 done: "That still looks like a lot." Straight, not scolding. 😀
- F12 why: "It's not a diagnosis. It's a nudge to talk to a person." 😀

2. **The brutal truth**
1. **It still lives in someone else's afternoon.** I asked twice for a night version. Frame 1 is built around a class. My bad hours are 11 pm to 2 am, and I've never seen that screen.
2. **The help button is a placeholder.** Frame 9's top choice is "[Campus counseling, 24/7: confirm]". On the morning I'd finally tap it, brackets would tell me nobody checked.
3. **"Exams or deadlines" could explain my problem away** (frame 10). My short nights are thesis-deadline nights. If I mark all of them, does the card go quiet? I can't tell, and it shouldn't. Deadlines are the reason I need to talk to someone.

3. **What actually worked:** Frames 9, 11 and 12, the whole short-nights flow. It leads with a person, says "only you see this", "Nothing is shared", "not a diagnosis", and does real arithmetic in frame 10. "Your call." "Walk, water, window."

4. **Trust and safety:** No diagnosis language anywhere. Good. It points me to a person, which is right. The risks are the placeholder number and a deadline excuse that might switch the card off. "Watch" for my ring makes me wonder if it reads my Oura at all. "14 app switches" worries me: thesis research is switching between my draft and scanned letters all night `[my story]`.

5. **Fix list**
1. **A night screen:** no next class. "Stop for tonight?" with a way to note where I left off, and the short-nights card reachable then, not only at 9:10 am. This decides whether I keep it past week one. You'd know it worked if a 1 am walk-through doesn't end on "5 minutes fits".
2. **A real counseling name and number** in place of the brackets. It's the difference between tapping and not. You'd know if testers tap "Talk to someone now" without asking "is this real?"
3. **Deadline nights don't erase the card.** If I mark "Exams or deadlines", the card should say it's staying and why. Also, say "ring" when it's a ring.
- **Cut:** the sleep dot on the See-why slider. Third time asking.

**If you fix only one thing:** show me the 1 am screen, and make it "stop for tonight?" with help a tap away.

6. **What I'd want:** On my iPhone at night, beside the MacBook, something that says "you've written two hours, the ideas will keep, stop for tonight." Then the morning card on the days that pile up. I don't want a sleep score; I already have one I dread.

7. **Score line**
`ICP_5 | 2026-11-05 | Island + Forecast re-test 2 (iPhone) | MEH (closer to I'D USE IT) | Clarity 7 · Trust 7 · Timing 5 · Useful 6 · Control 8 · Feel 7 · Come back 5 | overall 6 | week 0.40 · recommend 0.30 · consent 0.65 | one-fix: A 1 am 'stop for tonight?' screen with short-nights help reachable then`

Score moves: Trust 6→7, because frame 10 shows its math and frame 12 says "not a diagnosis". The brackets keep it from going higher. Everything else is unchanged, because my top ask (the night version) wasn't touched.

## Related

- [[25-journal/2026-11-05-icp-island-forecast]] (round 1) · [[25-journal/2026-11-05-icp-island-forecast-retest]] (round 2) · [[03-users/personas/icp-personas|ICP Personas]] · [[25-journal/25-journal|Journal hub]]
