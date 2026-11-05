---
title: "ICP test: 'When is it?' moments demo on the landing page"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/landing/index.html", ".icp-tests/2026-11-05-moments/", ".claude/skills/icp/SKILL.md"]
summary: "Picking your moment moved the panel: 1 I'D USE IT (Sam, late nights only, the first ever), 4 MEH, 0 I'D QUIT (Anika moved up from I'D QUIT). Overall 5.4 → 6.0, Useful 4.6 → 6.0, Come back 3.4 → 4.0, week-one P 0.25 → 0.33. Four of five picked Late night; nobody picked Afternoon, which is the default and the hero's story. 'I'll ask once more at 2:00, then stay quiet' landed with all five. Each tester named one different blocker: Maya, a check-in at her pause on her Apple Watch; Diego, Garmin with 'your coach never sees this'; Anika, a 'Where it goes' block; Jordan, a no-watch card from night one; Sam, a named counselor on the late-night card. Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T22:00:00Z
updated: 2026-11-05T22:00:00Z
---

# ICP test: "When is it?" moments

**Mode T.** The question came from Heramb: "How can we get them to use it, and no MEH?"

**What was built.** The demo now asks **"When is it?"**: Afternoon, Late night, or After practice. Each moment gets its own card:

- **Late night:** "Stop for tonight? Stopping now still gets you 8 h before your 9:30 class." The buttons are "Stop for tonight" and "20 more min". Choosing "20 more min" replies: "I'll ask once more at 2:00, then stay quiet."
- **After practice:** "Sit for 10? You trained today, so this break is a sit, not a walk." Later it becomes "Wrap up for today? The library closes at 10:30."
- **Afternoon:** unchanged (a short walk before lab).

Two smaller changes went in at the same time: the "Got it" button is gone, and the phone chips are shorter.

**How it was tested.**
- **Same walk for everyone:** 12 steps across all three moments, including a no-watch night and Snooze, then How it works and the joining section.
- **Devices:** each tester on their own.
- **Captures:** `.icp-tests/2026-11-05-moments/` (gitignored).
- **Capture glitch:** the step that scrolls to "When is it?" failed (the tool can't scroll to a legend element), so frame 02 repeats frame 01. Every tap after it worked.

**These are proposed modes.** The team hasn't scoped night or practice support yet. **Synthetic personas and synthetic data: a rehearsal, never evidence.**

## Headline

**1 I'D USE IT, 4 MEH, 0 I'D QUIT. The first I'D USE IT in this whole series is Sam's, for late nights only.**

Last full-page review: 4 MEH and 1 I'D QUIT.

- **Late night is the moment.**
  - Four of five chose it (Maya, Anika, Jordan, Sam). Diego chose After practice.
  - **Nobody chose Afternoon**, which is both the demo's default and the hero's story.
- **Two lines did the work:**
  - "I'll ask once more at 2:00, then stay quiet." All five praised it.
  - "Stopping now still gets you 8 h before your 9:30 class." Four of five praised it. Jordan: "That's the math I actually can't do when I'm fried."
- **Useful rose from 4.6 to 6.0.** Come back rose from 3.4 to 4.0, and three testers would now be "somewhat disappointed" if Halftime vanished.
- **Nobody is blocked by the page any more.** Each of them is blocked by one product fact, and it's a different one for each:
  - Maya: it waits for her pause and reaches her Apple Watch.
  - Diego: Garmin works, with "your coach never sees this" beside it.
  - Anika: a "Where it goes" block.
  - Jordan: a no-watch card from night one, not a week of "not enough data yet".
  - Sam: a named counselor on the late-night card when short nights keep coming.

## Scores

| Tester (device) | Moment | Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall | Week · Rec · Consent | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ICP_1 Maya (iPhone + laptop) | Late night | 8 | 7 | 5 | 7 (+1) | 7 (+1) | 7 | 5 | 6 (=) | 0.43 · 0.35 · 0.60 | MEH (top edge) |
| ICP_2 Diego (iPhone) | After practice | 8 | 8 | 6 | 6 (+2) | 8 (+1) | 7 | 4 (+1) | 6 (+1) | 0.30 · 0.20 · 0.55 | MEH (closest yet) |
| ICP_3 Anika (laptop + iPhone) | Late night | 8 | 5 | 6 | 5 (+2) | 5 | 7 | 3 (+1) | 5 (+1) | 0.10 · 0.20 · 0.40 | MEH (was I'D QUIT) |
| ICP_4 Jordan (iPhone SE + small laptop) | Late night, no watch | 8 | 7 | 7 | 6 (+1) | 7 (+1) | 7 | 3 | 6 (=) | 0.30 · 0.30 · 0.60 | MEH (closer) |
| ICP_5 Sam (iPhone) | Late night | 8 | 7 (−1) | 7 (+2) | 6 (+1) | 8 | 8 | 5 (+1) | 7 (+1) | 0.50 · 0.35 · 0.65 | **I'D USE IT** (late nights) |
| **Mean** (vs teach-back r2) | 4 night, 1 practice, 0 afternoon | **8.0** (=) | **6.8** (−0.2) | **6.2** (was 5.0, 2 rated) | **6.0** (+1.4) | **7.0** (+0.6) | **7.2** (=) | **4.0** ⚑ (+0.6) | **6.0** (+0.6) | **0.33** (+0.08) · **0.28** (+0.03) · **0.56** (=) | |

⚑ = mean ≤ 5.

**Score-change check (clerk).** Every move the testers explained ties to something new on the page:
- the moment picker and its cards;
- the "then stay quiet" reply;
- "Not sure yet, only 3 practice days";
- Snooze in the demo.

Two scores went down:
- **Sam, Trust 8 → 7.** "Gets you 7 h" promises sleep, and "your last 6" still reads as his own data.
- **Anika, Trust: unchanged** at 5, because nothing about where her data goes changed.

## Their moment, and what they'd do

- **Maya.** Late night, before an orgo exam.
  - At 2 h 40 she'd tap "20 more min". At 2:00, "with the problem done, I'd probably stop."
  - Blocker: it asks by the clock and reaches a face-down phone.
- **Diego.** After practice.
  - "You trained today, so this break is a sit, not a walk" was "the first time in eight looks that a card has known my legs are dead."
  - He'd still tap Keep going at study hall. At 3 h 40 he'd Wrap up, but for tomorrow's 6 am practice, not the library's closing time.
- **Anika.** Late night.
  - She'd tap "20 more min", and "I'd actually stop at 2:00".
  - Blocker: at midnight, app switching is how she debugs. A card that reads it as tiredness "would fire right when I'm closest to fixing the bug."
- **Jordan.** Late night, no watch. **"I'd stop."**
  - Blocker: the joining card's "at first it mostly says 'not enough data yet'" is "where I'd leave."
  - Wants an "After a shift" moment.
- **Sam.** Late night. **"Yes, just, and only for late nights."**
  - Frame 05 ("then stay quiet") is "the moment I'd trust it".

## What still lost them (counted)

| Point | Who | Count |
|---|---|---|
| App switching as the night's evidence. It's the work (Anki→PDF, debugging, ADHD), not fatigue | Maya, Anika, Jordan | 3 |
| Device not on the list (Apple Watch, Garmin) | Maya, Diego | 2 |
| "Gets you 8 h / 7 h" turns time in bed into sleep. Say "leaves you" | Sam, Anika | 2 |
| At 3 h 40 the night card drops the switch count, but "Fairly sure" still cites switching (a demo bug) | Maya, Anika | 2 |
| The legend still shows "your watch or ring" when No watch is picked | Maya, Jordan | 2 |
| The night's limit should be tomorrow's first thing (6 am practice, 6 am shift), not a fixed bedtime | Diego, Jordan | 2 |
| "your last 6 late nights" / "most practice nights" read as their own history | Sam, Diego | 2 |
| "Fairly sure" doesn't change when the watch is gone | Anika | 1 |
| The red "now 1:40" past "Bed by 1:30" reads as a scold; who set 1:30? | Sam | 1 |
| "Sit" is vague for someone already sitting; no nap, no bus moment | Diego | 1 |
| The step 1 chip still assumes a watch ("slept 5 h") | Jordan | 1 |

## Safety and trust flags (for `/plan-review`'s safety lens)

- **Sam:** a card that sees 5-hour nights and only says "stop for tonight" should, after repeated short nights, offer a named person. This is the 7th time he's asked. The name stays a placeholder until Columbia Health confirms it.
- **Jordan:** nothing in it tells tired apart from "ADHD brain". It should say that switching alone can't tell.
- **Diego:** nothing in this walk says staff can't see "trained today, slept 5 h".
- **No tester read anything as a diagnosis.**

## What it means for "how do we get them to use it"

1. **Lead with late night.** Four of five picked it, and it produced the only I'D USE IT. The afternoon walk is nobody's moment. **Team call:** this changes the product's main story and needs scoping. CEO and CMO are the relevant seats.
2. **The "ask once more, then stay quiet" pattern is the trust builder.** It landed with all five. Make it the rule everywhere, including step 3 of How it works, which still says "asks once" next to "Next check 3:30".
3. **Anchor the night to tomorrow's first commitment** (class, practice, shift) from the calendar. Two testers asked for this.
4. **Make night one useful with no watch.** The calendar bedtime maths needs no learning period, and that's where Jordan quits.
5. **The remaining blockers are product decisions, not copy:**
   - checking in at a pause (Maya)
   - Garmin / Apple Watch (Maya, Diego)
   - "Where it goes" (Anika)
   - a named counselor (Sam)
   - study apps counted as one task (3 testers)

## Demo bugs fixed after this test

These went into artifact v4.

- "Gets you" → "**leaves you** 8 h before your 9:30 class".
- The 3 h 40 night card keeps its app-switch count.
- With no watch, "Fairly sure" drops to "Not sure yet".
- The "your watch or ring" legend chip hides when No watch is picked.

## The five cards (verbatim)

### ICP_1 · Maya Okafor

**ICP_1 · Maya Okafor**: Late night is my moment, and that card finally answers the question I actually have at 12:40. It still doesn't know my phone is face-down or that I'm mid-mechanism.

**1. My moment: Late night.** That's every night before an orgo exam `[my story]`. Frame 03 says "Stopping now still gets you 8 h before your 9:30 class," and that line works on me. It's a concrete trade with no score, and it answers "one more late night or sleep?" At 2 h 40 I'd tap **20 more min**, because I'd be mid-problem. Then frame 05 says "I'll ask once more at 2:00, then stay quiet." That's the first snooze from you I believe. At 2:00, with the problem done, I'd probably stop.
What doesn't land: "On 4 of your last 6 late nights like this, your app switching kept climbing." My switching is Anki to the PDF to my notes. That's the work, not me falling apart. And at 3 h 40 (frame 04) the card drops the switch count but still uses switching as its "Fairly sure" evidence, so the reason and the proof don't match.

**2. Would I use it now?** No, but it's closer. The reason is frame 05: "ask once more at 2:00" runs on the clock, not on my problem, and "small at the top of your iPhone" reaches a phone that's face-down. **What would flip it:** it waits until I pause and taps my Apple Watch.

**3. Since last time**
- Snooze in the demo: **fixed** (Snooze 20 min, plus 20 more min with "then stay quiet").
- Snooze until I finish / ask at my next pause: **not fixed**. It's still clock-based.
- Where the suggestion appears with my phone face-down: **not fixed**.
- Apple Watch named: **not fixed**. "Fitbit, Oura or WHOOP" leaves out my watch, again.
- Switching between Anki, PDF and notes is work: **worse**. It's now the evidence on my card.
- Say what I install: **fixed** ("a small app on your laptop, and adding Halftime to your iPhone").
- Cut 'See every screen': **fixed**.
- 'No watch' isn't an amount of sleep: **not fixed** as a chip. The card handles it honestly though ("No watch connected, so this uses your laptop and calendar only").
- How long the pilot runs: **not fixed** ("we'll put that here").
- Delete, Stored, Kept for, and marking exam nights: **can't tell**, none of them were shown.

| | |
|---|---|
| Verdict | MEH (the top edge of it) |
| Overall | 6/10 |
| 5-second read | A study-break app that asks you what time it is |
| Where I'd quit | Frame 03: a 12:40 card that lands mid-mechanism on a face-down phone `[from stills]` |
| P(still running in a week) | 0.43 |
| P(I'd recommend it) | 0.35, to my orgo study-group friend who pulls all-nighters |
| P(I'd consent to the data it asks for) | 0.60. I'd refuse app-switch counting until it stops reading Anki↔PDF as tiredness |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | Energy drink, my own guess, and turning off Sleep Focus |

**Run-through**
- 01: the afternoon card, "Short walk now?" at 3:10 with 14 switches. In my afternoon that's flashcards. 😐
- 03: Late night, "8 h before your 9:30 class." Finally my question. 😀
- 04: 3 h 40, "It's past 1:30… 7 h." Honest, no guilt. But the "now 1:40" marker runs off the end of the bar. 🙂
- 05: "once more at 2:00, then stay quiet." 😀
- 06–08: After practice, sit not walk. Not me. 😴
- 09: No watch, "laptop and calendar only." Honest. 🙂
- 10: "Snoozed. I won't ask again until 1:00." Fine, but the legend still lists "your watch or ring" when there's no watch. 😐
- 12: Sign-up's closed and there's still no length. 😐

**Brutal truth**
1. It still interrupts by the clock. "2:00" and "1:00" mean nothing to a mechanism I'm halfway through.
2. My device isn't on the list. "Fitbit, Oura or WHOOP" means my Apple Watch isn't invited, and the card goes to a phone I keep face-down.
3. The late-night proof is app switching, which is how I study, not a sign I'm fading. Frame 04 doesn't even show the number it's relying on.

**What worked:** I could pick my moment and the card changed. "Stopping now still gets you 8 h" isn't a score, so I don't spiral. "Ask once more, then stay quiet" is a promise I'd test. "Fairly sure" with no percentage.

**Trust and safety:** No diagnosis language. On the laptop, "offers someone to talk to, in the morning, never mid-study. It never tells your coach, team or school" is exactly right. My one worry: the night before an exam it says "class." I'd need to see what it says when it knows the 9:30 is my exam.

**Fix list**
1. **A check-in at my next pause, on my Apple Watch.** That changes whether it ever reaches me at all. You'd know it worked if the share of 20 more min / Snooze taps drops.
2. **Name the Apple Watch in the first-screen line.** Otherwise I assume it's not for me. You'd know from how many Apple Watch users click through to joining.
3. **Stop using switching as late-night evidence, or let me mark my study apps as one task.** Then I'd believe "Fairly sure." You'd know when I stop tapping Keep going on late-night cards.
**Cut:** the "your watch or ring" legend chip on no-watch cards.
**If you fix only one thing:** the check-in waits for my pause and taps my Apple Watch, not "I'll ask at 2:00."

**What I'd want:** the late-night card on my wrist, the night before orgo, after I finish a problem, saying how much sleep I'd get if I stopped.

**Score changes:** Control 6→7 (a snooze that works and promises quiet), Useful 6→7 (the late-night card answers my actual question). Everything else is the same, because delivery, timing and my watch haven't changed.

`ICP_1 | 2026-11-05 | Landing 'When is it?' moments demo (iPhone + laptop) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 7 · Control 7 · Feel 7 · Come back 5 | overall 6 | week 0.43 · recommend 0.35 · consent 0.60 | one-fix: check in at my next pause on my Apple Watch, not 'ask at 2:00'`

### ICP_2 · Diego Ramírez

**ICP_2 · Diego Ramírez**: First time this page has looked like it knows I had practice today. It still can't read my watch, and I still can't sign up.

**1. My moment**
**After practice.** That's every weeknight for me, at mandatory study hall.

- **1 h 30 (frame 06), "Sit for 10?"** The line that got me was *"You trained today, so this break is a sit, not a walk."* That's the first time in eight looks that a card has known my legs are dead. But I'm already sitting at a desk, so what does "sit" mean? Eyes off the screen? Eat something? And study hall counts my hours, so I'm not leaving for 10 minutes `[my story]`. I'd tap **Keep going**.
- **3 h 40 (frame 08), "Wrap up for today?"** I'd tap **Wrap up**, but not because of what it said. It gave me *"The library closes at 10:30, and you trained today."* My real reason to stop is **6 am practice tomorrow**. The late-night card does that kind of maths for a 9:30 class (frame 04: "still gets you 7 h before your 9:30 class"). The practice card should do it for my 6 am. That's the line that would actually make me close the laptop.
- Late night and Afternoon aren't my moments. A 5-minute walk at 3:10 means nothing on a lifting day.

**2. Would I use it now?**
**No.** The reason is the hero (frame 01): *"Works with a Fitbit, Oura or WHOOP, or with no watch at all."* I wear a Garmin, so I'm a "No watch" user. The "slept 5 h, under your usual 7 h" part, which is half of every card, disappears for me.
**What would flip it:** Garmin supported, with "your coach never sees this" printed right next to it. My Garmin is team-issued.

**3. Since last time (my open asks)**
- Training-aware options (sit or nap, not walk): **◐ partly fixed.** I get "sit, not walk" and a wrap-up on practice nights. No nap, nothing for a lifting day, no travel or bus moment.
- Read practice blocks from my calendar: **◐ partly fixed.** "practice ended at 5:30 [3]" points to the calendar. I can't tell whether lifting sessions count.
- "Today: practice / lift / nothing" demo question: **◐ partly fixed.** "After practice" is there, lift isn't.
- Back up the word "athletes": **◐ partly fixed.** This is the first real backing.
- Garmin row, or an honest "not supported": **⬜ not fixed.**
- Who sees my data, and how long it's kept: **⬜ not fixed.** The joining card (frame 12) still doesn't say.
- "Never tells your coach" next to the joining card: **⬜ not fixed.** I didn't see that line anywhere in this walk.
- A real sign-up, or "tell me when it opens": **⬜ not fixed.** The only button is "Try the demo again".
- Sample history reads as mine: **◐ partly fixed.** It's labelled "Sample demo", but "Most practice nights, you wrap up by 10" still reads like it's about me.
- Phone study on the bus not counted: **◐ partly fixed.** Still only implied.
- Where the card appears: **✅ fixed.** Still there.

**4. Review card**

| | |
|---|---|
| Verdict | MEH (the closest I've been to I'D USE IT) |
| Overall | 6/10 |
| 5-second read | A study break app with a "when is it?" picker |
| Where I'd quit | Frame 01, "Fitbit, Oura or WHOOP". My device isn't on the list |
| P(still running in a week) | 0.30 |
| P(I'd recommend it) | 0.20, to a teammate who wears a WHOOP |
| P(I'd consent to the data it asks for) | 0.55. I'd refuse calendar access if it reads team events without saying who sees them |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Garmin app + study hall timer + my alarm |

**Run-through**
1. Frame 01, hero: 😕 Garmin still missing.
2. Frame 02, Afternoon, "Short walk now?": 😐 not my day.
3. Frames 03–04, Late night: 🙂 "Stopping now still gets you 7 h before your 9:30 class" is real maths. Wrong anchor for me (I have 6 am practice).
4. Frame 05, 20 more: 😀 "I'll ask once more at 2:00, then stay quiet." That's exactly how a snooze should work.
5. Frame 06, After practice: 🙂 "Not sure yet · Only 3 practice days so far." That's honest.
6. Frame 07, Sit: 😐 "Your study clock is paused" is fine. "Sit" is vague.
7. Frame 08, wrap-up: 🙂 there's a Snooze 20 min button. The reason given is the wrong one for me.
8. Frames 09–10, no watch + Snooze: 🙂 "uses your laptop and calendar only" is clear.
9. Frames 11–12: 😕 the joining card still has no length, no who-sees-it, no way to sign up. `[from stills]` I can't judge how the card actually pops up on an iPhone.

**Brutal truth**
1. Garmin isn't supported (frame 01), so for me the sleep half of every card is gone.
2. The practice cards ignore tomorrow's 6 am practice (frame 08). The library's closing time isn't why I stop.
3. "Sit for 10" (frame 06) tells someone who's already sitting to sit. There's no nap, and no bus moment for away weeks.

**What worked:** "sit, not walk" because I trained. "Not sure yet, only 3 practice days" admits what it doesn't know. The snooze copy promises a limit and says what happens next.

**Trust and safety:** Nothing sounds like a doctor. "Most practice nights, you wrap up by 10" sounds like it has watched me, which it hasn't. Nothing in this walk tells me the staff can't see "trained today + slept 5 h".

**Fix list**
1. **Garmin support (or an honest "not yet"), with "your coach never sees this" next to it.** This decides whether I install it at all. You'd know it worked if athletes with a Garmin pick Garmin instead of "No watch".
2. **Use tomorrow's first practice in the after-practice reason** ("Stop by 10:15 to get 7.5 h before 6 am practice"). That turns Wrap up from a guess into a decision. You'd know it worked if people tap Wrap up more on practice nights.
3. **Replace "sit" with something concrete** ("eyes off screen", "eat", "20-min nap") and add an "On the bus" moment.
- **Cut:** "Library closes" as the after-practice reason when tomorrow's practice time is known.

**If you fix only one thing:** support Garmin, and say right there that my coach never sees it.

**Score line**
`ICP_2 | 2026-11-05 | Landing "When is it?" moments demo (Afternoon / Late night / After practice, iPhone) | MEH | Clarity 8 · Trust 8 · Timing 6 · Useful 6 · Control 8 · Feel 7 · Come back 4 | overall 6 | week 0.30 · recommend 0.20 · consent 0.55 | one-fix: Garmin supported, with 'your coach never sees this' beside it`

**Why the scores moved (all because the product changed):**
- Useful 4→6: the after-practice cards change what I'd tap.
- Trust 7→8: "Not sure yet, only 3 practice days so far".
- Control 7→8: the snooze says when it asks next and then stays quiet.
- Timing n/a→6: the moments exist now, but 8:00 at study hall is the wrong slot for me.
- Come back 3→4: the practice cards. Clarity and Feel didn't move.
- Overall 5→6.

### ICP_3 · Anika Sharma

**ICP_3 · Anika Sharma**: Late night is my moment, and that card is the first thing on this page I'd let interrupt me. It still doesn't tell me where my data goes, and it still won't run on my laptop.

**1. My moment: Late night.** At 12:40 the card says "Stop for tonight? Stopping now still gets you 8 h before your 9:30 class." I'd tap "20 more min". The reply is what got me: "I'll ask once more at 2:00, then stay quiet." That's a limit I can plan a debugging session around, and I'd actually stop at 2:00. The line that didn't work: "On 4 of your last 6 late nights like this, your app switching kept climbing." When I'm debugging at midnight I'm switching between editor, terminal and docs all the time. That's the work, not fatigue `[my story]`. In my case that card would fire right when I'm closest to fixing the bug. "Gets you 8 h" is also wrong for me: it's time in bed. After coding I lie awake for an hour `[my story]`.

**2. Would I use it now? No.** The late night card did change one thing: I'd now tolerate the ask at 2:00 (frame 05). What would flip me is a "Where it goes" block on the page: where it's stored, how long it's kept, what any AI sees, and who on the course team sees pilot data. I've asked for it five times. Separately, Linux still blocks me from installing at all.

**3. Since last time**
- 'Where it goes' block: not fixed
- Say whether any AI sees my data: not fixed (the page still never mentions AI)
- Linux, or 'Mac or Windows' in the hero: not fixed (still only in step 1, frame 11)
- Confidence word tied to a count: partly fixed. The afternoon and late night cards now show "4 of your last 6". The after-practice card still says "Fairly sure · Most practice nights…" with no count. And the late night 4/6 counts app switching climbing, not whether stopping helped.
- 'Usual 7 h' vs 'Still learning your usual sleep · 4 of 7 nights': not fixed (laptop frame 12)
- 'Never tells your school' right above 'course staff have to OK': not fixed
- What joining involves: partly fixed, unchanged (length, consent and use in the writeup are still missing)
- Early read with no comparison to not walking: not fixed ("a walk helped". Compared to what?)
- App switching while debugging counted as fatigue: worse. The late night card now leans on it.

**4. Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 (+1) |
| 5-second read | A break nudge I can try with three toggles |
| Where I'd quit | Frame 03, the app-switch evidence firing during a debug session |
| P(still running in a week) | 0.10 |
| P(I'd recommend it) | 0.20, to a classmate on a Mac who studies late |
| P(I'd consent to the data it asks for) | 0.40. I'd refuse until storage, retention and AI fields are named. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Fitbit sleep log plus a 1:30 phone alarm |

**Run-through**
- 01–02 Afternoon card, "Walk 5 min", "a walk helped": 😐 not my time of day
- 03 Late night at 2 h 40: 🙂 the right question at the right hour; app switches as the reason: 😕
- 04 At 3 h 40 the app-switch count disappears from the reason, but the evidence line still cites switching: 😕 so what is the claim based on?
- 05 "Ask once more at 2:00, then stay quiet": 😀
- 06–08 After practice: 😴 I don't train
- 09 No watch: 🙂 says plainly that it's laptop and calendar only. But "Fairly sure" didn't change after a source dropped out. `[from stills]`
- 10 Snooze "until 1:00": 🙂 the time is exact
- 11–12 How it works and joining: 😐 nothing new about where data goes

**The brutal truth**
1. The late night card uses app switching as its signal, and for me that's debugging. It would nag me at the worst possible moment (frame 03).
2. The evidence line counts how often switching kept climbing, not how often stopping helped. "Fairly sure" about the wrong thing.
3. There's still nothing on the page about where my data goes or whether an AI sees it.

**What worked:** The bounded promise in "20 more min" ("then stay quiet"). The no-watch card stating which sources it used. Snooze naming an exact time. Picking the moment makes each card's action fit the moment: stop at night, sit after practice.

**Trust and safety:** "Gets you 8 h" turns time in bed into sleep. "Fairly sure" was identical with and without the watch. "Offers someone to talk to" still names no one.

**Fix list**
1. A four-line 'Where it goes' block. That's what moves my consent from 0.40 to over 0.6. You'd know it worked when testers can repeat back where their data is stored.
2. Let me mark coding apps as one task, or show that switching inside a focus app doesn't count. That stops the false alarm on frame 03. You'd know from how many people tap "This looks wrong" at night.
3. Make the evidence line count outcomes ("on 4 of 6 nights I stopped, I slept X"), not switching.
- **Cut:** the 3 h 40 "past 1:30" card dropping its own evidence.

**If you fix only one thing:** the 'Where it goes' block, above the demo.

**What I'd want:** Late night only, on my ThinkPad and iPhone. One question at my own cutoff time, then silence.

`ICP_3 | 2026-11-05 | Landing 'When is it?' moments demo (laptop + iPhone) | MEH | Clarity 8 · Trust 5 · Timing 6 · Useful 5 · Control 5 · Feel 7 · Come back 3 | overall 5 | week 0.10 · recommend 0.20 · consent 0.40 | one-fix: 'Where it goes' block: storage, retention, AI fields, who sees pilot data`

What changed my scores: Timing went from n/a to 6 and Come back from 2 to 3 because of the late night card's "ask once more at 2:00, then stay quiet". Useful went from 3 to 5 because a late night moment now exists. Trust and Control are unchanged because the data story is unchanged.

### ICP_4 · Jordan Lee

**ICP_4 · Jordan Lee**: The "Late night" card asks the exact question I have at 12:40 after a closing shift. Then the joining card tells me week one is mostly "not enough data yet", and that's where I'd leave.

**1. My moment.** Late night, with No watch. Frame 09 on both devices gave me: "Stop for tonight? Stopping now still gets you 8 h before your 9:30 class." It also said "No watch connected, so this uses your laptop and calendar only." I'd **stop**. The line that did it is "8 h before your 9:30 class". That's the math I actually can't do when I'm fried `[my story]`. "OK, 20 more. I'll ask once more at 2:00, then stay quiet." (frame 05) means I wouldn't turn it off, because there's no nagging and no guilt. "After practice" isn't me. But its logic, "You trained today, so this break is a sit, not a walk", fits seven hours on my feet at the café `[my story]`. I'd want that as "After a shift".

**2. Would I use it now?** No. Frame 12 says "at first it mostly says 'not enough data yet'". A week of nothing is how every focus app lost me `[my story]`. One thing would flip it: give me the no-watch late-night card from night one. The bedtime math from my calendar doesn't need to learn me. The demo already says "Sample demo with simple rules", so ship those rules on day one.

**3. Since last time**
- No-watch card keeps the app-switch reason: **fixed** ("14 app switches in 20 min [1]", frame 09).
- Snooze visible in the demo: **fixed** ("Snooze 20 min", then "I won't ask again until 1:00", frame 10).
- "No cost": **fixed** (frame 12).
- "See every screen" cut: **looks fixed** (I didn't see it in either walk).
- Join on the SE first screen: **partly fixed** (a link is there, but no weeks, minutes a day or install size).
- "No watch" first: **not fixed** (third chip, and the default is "About 5 h").
- Step 1 example without a watch: **not fixed** ("slept 5 h", frame 11).
- Week one with no watch should still give suggestions: **not fixed**. It's honest now, but the honest answer is "mostly nothing."
- Shared laptop: **not fixed**.
- Phone app size: **not fixed** ("adding Halftime to your iPhone", no size).
- SE timeline label and the 35-min collision: **can't tell** (not tapped).

**4. Review card**

| | |
|---|---|
| Verdict | MEH (closer) |
| Overall | 6/10 |
| 5-second read | A break-timer site for long study sessions |
| Where I'd quit | Week one, if it's mostly "not enough data yet" (frame 12) |
| P(still running in a week) | 0.30 |
| P(I'd recommend it) | 0.30, to a café coworker who studies after close `[my story]` |
| P(I'd consent to the data it asks for) | 0.60. I'd refuse calendar beyond class times |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | My phone alarm set for "bed by 1:30" `[my story]` |

**Run-through**
- 01 SE: headline and chips, but no card on the first screen 😐
- 02–03: tapped Late night, "Stop for tonight?" 🙂
- 04: 3 h 40, "It's past 1:30", 7 h left. Plain, not preachy 🙂
- 05: "OK, 20 more… then stay quiet" 😀
- 06–08: After practice. Not mine, but "sit, not a walk" fits a shift 🙂
- 09: No watch. Laptop and calendar only, still a real reason 😀
- 10: Snooze is clear, but the legend still lists "2 your watch or ring" when I said No watch 😕
- 11: Step 1 chip still says "slept 5 h" 😕
- 12: honest, but the slow start kills it for me ❌

**Brutal truth**
1. Frame 12 says the real product is mostly "not enough data yet" at first. My week is exactly when I'd quit.
2. There's no moment for me. Late night assumes the 9:30 class is my constraint. On early-shift days my 6 am shift is `[my story]`. Would it know the shift? I'd need to see that.
3. No watch is still the second-class path: third chip, a watch label in the legend, and "slept 5 h" in step 1.

**What worked**
- "Stop for tonight?" plus bedtime math.
- "Then stay quiet."
- "Enjoy the sit." No streaks and no shame anywhere.
- The page loaded in 0.5 s on SE (0.09 MB). The old laptop is fine.

**Trust and safety**
- No diagnosis language.
- "Fairly sure · 4 of your last 6 late nights" on a no-watch card is fine as sample data. On my ADHD days, app switching climbs anyway, and nothing here tells tired apart from ADHD brain. I'd want it to say that the switching count alone can't tell.
- "8 h before 9:30" from 12:40 is generous (no commute). I take it as roughly right, not exact.

**Fix list**
1. **No-watch late-night card from night one.** Calendar bedtime math, no learning needed. It changes whether I'm there in week two. You'd know it worked if no-watch pilot users see a card in their first 3 nights.
2. **Add an "After a shift" moment, and let the calendar use my shift as the constraint.** That's the night I actually need it. You'd know it worked if I pick that moment.
3. **Fill in the joining card:** weeks, minutes a day, install size of the laptop app and the phone app, and whether a shared laptop works. You'd know it worked if I'd click Join.

**Cut:** the "your watch or ring" legend chip when No watch is selected.

**If you fix only one thing:** give no-watch users the late-night card from night one instead of a week of "not enough data yet."

**What I'd want:** On my iPhone at 12:30 after close, one card saying when to stop so I still sleep before class or shift. Nothing on the other nights.

**Scores** (changed only where the product changed):
- Timing: n/a → 7 `[from stills]`. "Stay quiet" and Snooze are now shown.
- Useful: 5 → 6. The Late night bedtime card answers my real question.
- Control: 6 → 7. Snooze and "20 more" are visible.
- Unchanged: Clarity 8, Trust 7, Feel 7, Come back 3 (the slow start).

`ICP_4 | 2026-11-05 | Landing 'When is it?' moments demo (Afternoon/Late night/After practice, no-watch night, Snooze; iPhone SE + small laptop) | MEH | Clarity 8 · Trust 7 · Timing 7 · Useful 6 · Control 7 · Feel 7 · Come back 3 | overall 6 | week 0.30 · recommend 0.30 · consent 0.60 | one-fix: no-watch late-night card from night one (calendar bedtime math), not a week of 'not enough data yet'`

### ICP_5 · Sam Whitaker

**ICP_5 · Sam Whitaker**: Late night is finally there. I'd tap something on it, which I've never said about this card before.

**1. My moment**
**Late night, no question.** I write between 10 pm and 2 am. I don't have afternoons that look like that, and I don't have practice.

- **Frame 3 (12:40, 2 h 40, about 5 h):** the line that got me was "Stopping now still gets you 8 h before your 9:30 class." It isn't a score. It tells me what I keep if I stop, not what I've lost. Honestly, at 12:40 with a paragraph going, I'd still tap **20 more min**.
- **Frame 5:** "I'll ask once more at 2:00, then stay quiet." That's the line that would actually get me to stop at 2. It promises to ask once and then leave me alone, and I believe it.
- **Frame 4 (1:40):** "Stopping now still gets you 7 h." No, it doesn't. It gets me 7 h *in bed*. I lie awake until 3. On a bad night that line feels like a promise I already know I'll break. "Leaves you 7 h before class" would be honest.

**2. Would I use it now?**
**Yes, just, and only for late nights.** The reason is frame 5: snooze, then one more ask, then quiet. That's a deal I can live with at 1 am. What would make it a firm yes: frame 3 shows I slept 5 h, and the card still says nothing about short nights or a person to talk to.

**3. Since last time**
- 1 am 'stop for tonight?' example → **fixed** (frames 3, 4, 9). This was the one I'd asked for since the first review.
- Say plainly when it asks again → **fixed on the card** ("ask once more at 2:00", "won't ask again until 1:00"). Couldn't tell for step 3 itself.
- Explain the 1/2/3 boxes at the card → **fixed**: the legend sits right under it, and "your watch or ring" covers my Oura.
- 'No watch' as an answer to 'Last night you slept' → **partly fixed.** The card now says "No watch connected, so this uses your laptop and calendar only." The chip label is still wrong.
- Named counseling contact → **not fixed** (7th time). Nothing in this walk.
- Let me choose when the 'someone to talk to' offer comes → **can't tell**. It's never offered.
- 'your' in sample history → **not fixed** ("On 4 of your last 6 late nights").
- Say in step 1 that it never sees what I write → **not fixed**. Frame 11 step 1 only says it counts apps and time.
- Joining: how long, who can join, non-classmates → **not fixed** (frame 12: "we'll put that here before sign-up opens").

**4. Review card**

| | |
|---|---|
| Verdict | I'D USE IT (late nights only) |
| Overall | 7/10 |
| 5-second read | A break reminder for studying |
| Where I'd quit | Didn't, this time. I'd go quiet on it after a week of 5 h nights with no word about a person |
| P(still running in a week) | 0.50 |
| P(I'd recommend it) | 0.35, to a friend in my thesis seminar who also writes at night |
| P(I'd consent to the data it asks for) | 0.65. I'd hold off on the laptop app until it says it never reads my writing |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | A phone alarm at 1:30 that I ignore, and my Oura score that I dread |

**Run-through** (all `[from stills]`; I can't judge how the card arrives or feels on a lock screen)
1. Frame 1 hero: clear. 🙂
2. Frame 2 Afternoon, "Short walk now?": not my life. 😐
3. Frame 3 Late night: "8 h before your 9:30 class". First card that's about my night. 😀
4. Frame 4 3 h 40: "past 1:30" is fine, but "gets you 7 h" overpromises for someone who lies awake. 😕
5. Frame 5 20 more: "then stay quiet". This is the moment I'd trust it. 😀
6. Frames 6–8 After practice: not mine, skipped. 😴
7. Frame 9 no watch: honest about what it's using. 🙂
8. Frame 10 Snooze: plain. 🙂
9. Frame 11 how it works: still doesn't say it won't see my writing. 😕
10. Frame 12 joining: still no length or eligibility. 😐

**Brutal truth**
1. **Frame 3 shows "slept 5 h, under your usual 7 h" and stops there.** If I see that most nights for a month, the only thing it does is keep telling me. It never points me to a person. That's the 7th time I've asked.
2. **Frame 5: the red "now 1:40" running past "Bed by 1:30 am"** reads like a scold at the hour I'm most fragile. And who set 1:30? I'd need to see where I choose that.
3. **Frame 4: "gets you 7 h"** confuses time in bed with sleep.

**What worked:** the late-night moment exists at all. "Stop for tonight?" is a question, not a grade. "I'll ask once more at 2:00, then stay quiet" gives me control. The no-watch line is honest. No HRV, and no score.

**Trust and safety:** It isn't diagnosing me, which is good. But a card that sees 5 h nights and only offers "stop for tonight" should, on repeated short nights, say this might be worth talking to someone about, and name who. It's still missing. "Fairly sure" based on "your last 6 late nights" is sample data presented as if it were mine.

**Fix list**
1. **After several short nights, add one line under the 5 h on the late-night card: campus counseling, named, with how to reach them. Let me hide it or move it away from mornings.** It's the only thing that would make me trust that it knows its limits. You'd know it worked if I tap it or set its timing instead of ignoring it.
2. **Change "gets you 7 h" to "leaves you 7 h before class".** It stops promising me sleep I won't get. Check: I read the line at 1:40 and don't flinch.
3. **Step 1: "It never sees what you write."** That moves my consent from 0.65 toward 0.8. Check: I'd install the laptop app.
- **Cut:** the red past-bedtime marker in frame 5.

**If you fix only one thing:** put a named, reachable person on the late-night card when the short nights keep coming.

`ICP_5 | 2026-11-05 | Landing 'When is it?' moments demo: Afternoon / Late night / After practice, no-watch, snooze (iPhone) | I'D USE IT (late nights only) | Clarity 8 · Trust 7 · Timing 7 · Useful 6 · Control 8 · Feel 8 · Come back 5 | overall 7 | week 0.50 · recommend 0.35 · consent 0.65 | one-fix: named campus counseling line on the late-night card after repeated short nights`

Score moves vs the 'Three steps' review / last full landing review (8 · 8 · 5 · 5 · 8 · 8 · 4): Trust 8→7 because of "gets you 7 h" and "your last 6" still reading as mine. Timing 5→7 and Useful 5→6 because a late-night card now exists with snooze and "then stay quiet". Come back 4→5 for the same reason. Overall 6→7 and verdict MEH→I'D USE IT because the late-night moment was added.

## Related

- [[25-journal/2026-11-05-icp-cmo-three-steps|ICP + CMO: Three steps]] · [[25-journal/2026-11-05-icp-landing-teachback-r2|Teach-back round 2]] · [[25-journal/2026-11-05-boardroom-privacy-blanks|Boardroom: privacy blanks]] · [[03-users/personas/icp-personas|ICP Personas]] · [[25-journal/25-journal|Journal hub]]
