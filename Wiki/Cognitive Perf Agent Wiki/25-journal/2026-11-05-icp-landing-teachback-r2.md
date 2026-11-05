---
title: "ICP teach-back, round 2: landing page with the problem line and honest joining"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/landing/index.html", "design/mockups/landing/BRIEF.md", ".icp-tests/2026-11-05-landing-r2/", ".claude/skills/icp/SKILL.md"]
summary: "Still 0 of 5 understood everything, but both target gaps moved. The problem rose from 6.0 to 7.6 (all five now sure, against all five guessing before) and joining from 2.0 to 5.6. What it does slipped from 8.2 to 7.8. All five still don't know where the suggestion appears, how long the pilot runs, who sees the data, who the 'someone to talk to' is, or what 'which kind of app' means. Review scores barely moved: overall 5.4 (=), Trust 7.0 (+0.6), Come back 3.4 (=), 4 MEH and 1 I'D QUIT. Nobody quits at a broken button any more; the quits are now at missing facts. Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T20:00:00Z
updated: 2026-11-05T20:00:00Z
---

# ICP teach-back, round 2

**Mode T (teach-back), same brief as [[25-journal/2026-11-05-icp-landing-teachback|round 1]].** The page is landing v2 (artifact v2). It has two changes:
1. A bold problem line under the headline: "Two hours into studying, it's hard to tell if you need a break or should push on." The lede after it is shortened.
2. The dead-end Join is replaced:
   - a "What joining involves" button on laptop, and a fine-print link on phones;
   - a closing section, "Sign-up isn't open yet.", which says course staff have to OK the study, gives a four-item "If it opens, joining means:" list, and adds "How long it runs and who can join: we'll put that here before sign-up opens.";
   - one button, "Try the demo again".

The words are in `design/mockups/landing/BRIEF.md`. The walk is the same 10 steps as before, except step 10 now scrolls to the joining section (there's nothing to tap). Fresh captures are in `.icp-tests/2026-11-05-landing-r2/` (gitignored). **Synthetic personas and synthetic data: a rehearsal, never evidence.**

## Headline

**Still 0 of 5 understood everything. Both fixes moved the needle, but not far enough.**
- **The problem: 6.0 → 7.6.** All five now say it confidently, where all five were guessing before. Most of them quote or paraphrase the bold line. Anika: "sure, but I can only say it by restating the subhead. The page states the problem and never says what it costs you to get it wrong."
- **Joining: 2.0 → 5.6.** All five now repeat the four-item list correctly. What holds the score down is what the page openly defers: how long, minutes a day, who can join. On top of that, all five asked who sees the data, and two asked for a way to be told when sign-up opens.
- **What it does: 8.2 → 7.8.** Maya dropped from 8 to 7. Cutting "notices when you've been at it a while" from the lede may have thinned the *how*; that's my inference, not something a tester said.
- **Still 5 of 5: where the suggestion appears.** This is now the biggest gap that copy alone can fix.

**Review scores barely moved:**
- overall 5.4 (=), Clarity 8.0 (+0.2), Trust 7.0 (+0.6), Come back 3.4 (=);
- verdicts still 4 MEH and 1 I'D QUIT.

**What changed is where they quit.** Nobody quits at a broken button any more. Each now quits at a missing fact:
- Maya: her Apple Watch isn't named.
- Anika: no "where it goes".
- Sam: the "someone to talk to" has no name.
- Diego and Jordan: no pilot length, and no way to raise a hand.

## Understanding scores (0–10)

| Tester | The problem | What it does | What joining involves | Understood everything? | Missing, in their words |
|---|---|---|---|---|---|
| ICP_1 Maya | 8 (+2) | 7 (−1) | 6 (+4) | No | where or when the suggestion interrupts me; what the pilot asks per day and for how long |
| ICP_2 Diego | 7 (+1) | 8 (=) | 5 (+3) | No | who sees my data, how long the pilot runs, whether Garmin and training days count |
| ICP_3 Anika | 7 (+1) | 8 (=) | 6 (+4) | No | where my data goes and whether an AI sees it |
| ICP_4 Jordan | 8 (+2) | 8 (=) | 6 (+4) | No | where the suggestion pops up; how long and how much effort joining takes |
| ICP_5 Sam | 8 (+2) | 8 (=) | 5 (+3) | No | who the "person" is, where the card appears, how long joining takes and who's eligible |
| **Mean** | **7.6** (+1.6) | **7.8** (−0.4) | **5.6** (+3.6) | **0 of 5** | |

How sure they were on B (the problem): **5 sure**, against 5 guessing in round 1.

**The click moment moved earlier for Jordan.** On the SE it came at frame 1 or 2, where in round 1 it was frame 7: "Last time it took until step 7." The others clicked at:
- Diego: frame 1.
- Anika: frame 2, then frame 7 for *how*. "Until 'A small app on your Mac or Windows laptop' I thought this was a website."
- Maya and Sam: frame 3, when switching to 7 h of sleep changed the card's answer.

## Teach-back accuracy (checked against the page)

- **A, B, C, E, F:** all five accurate. Everyone repeated the new joining list correctly.
- **D:** all five repeated "Mac or Windows". It's still on the page at "How it works" and still **false** per the boardroom. Diego: "so my old Windows laptop works".
- **Maya:** paraphrased the slow start as "a week of 'not enough data yet'". The joining list says "at first"; the "first week" wording comes from the honesty card above it.
- **"Not medical advice":** 4 of 5 never saw it (Maya, Diego, Anika, Sam). It's only in the footer, which is below the last phone frame. That's a capture limit, but also a finding: the line exists only in the footer.

## What still lost them (counted)

| Line or part | Who | Count (round 1) |
|---|---|---|
| Where the suggestion appears (laptop pop-up? phone?) | all | 5 (5) |
| "which kind of app": app names, Instagram vs Canvas? | all | 5 (5) |
| "offers someone to talk to": who? | all | 5 (4) |
| "See every screen" | Maya, Diego, Anika, Jordan | 4 (5) |
| "snooze means snooze", but no Snooze button in the demo | Maya, Diego, Anika, Sam | 4 (3) |
| "12:30 pm" under "until Chem lab" read as the lab time; laptop labels collide at 35 min | Maya, Jordan, Sam | 3 (4) |
| "Most of your sessions run past an hour like this." isn't a reason | Maya, Diego, Anika | 3 (3) |
| "a walk helped" / "went better", measured how? | Maya, Anika, Jordan | 3 (2) |
| The 1/2/3 boxes before the key | Diego, Jordan | 2 (5) |
| "No watch" as an answer to "Last night you slept" | Maya, Sam | 2 (4) |
| "Not sure yet" while it still asks "Short walk now?" | Diego, Anika | 2 (2) |
| "Still learning your usual sleep · 4 of 7 nights": mine? does it ever finish with no watch? | Diego, Anika, Jordan | 3 (1) |
| **New:** "never tells your … school" one block above "Our course staff have to OK the study" | Anika, Diego | 2 |
| **New:** no way to be told when sign-up opens | Diego, Anika | 2 |
| Gone: "Nov 6 proposal", "[Pilot sign-up link: coming]", "BINF 4070" as a sign-up blocker | (none) | 0 (5) |

## Still asking (counted)

1. **Where does the suggestion show up, and does it wait for a pause?** 5 of 5.
2. **How long the pilot runs, minutes a day, who can join.** 5 of 5. The page defers this honestly, but it's the decision point.
3. **Who sees my data, where it's stored, how long it's kept, whether an AI sees it.** 5 of 5. Anika again puts it first.
4. **Who the "someone to talk to" is.** 5 of 5.
5. **Device singles:**
   - Apple Watch (Maya)
   - Garmin and practice/lift days (Diego)
   - Linux (Anika)
   - shared family laptop and install size (Jordan)
   - 1 am thesis nights (Sam)

## Review scores

| Tester | Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall | Week · Rec · Consent |
|---|---|---|---|---|---|---|---|---|---|
| ICP_1 Maya | 8 | 7 | 5 | 6 | 6 | 7 | 5 | 6 | 0.40 · 0.35 · 0.60 |
| ICP_2 Diego | 8 | 8 (+1) | n/a | 4 | 7 (+1) | 7 | 3 | 5 | 0.20 · 0.15 · 0.55 |
| ICP_3 Anika | 8 | 5 | n/a | 3 | 5 | 7 | 2 | 4 | 0.05 · 0.20 · 0.40 |
| ICP_4 Jordan | 8 (+1) | 7 (+1) | n/a | 5 | 6 | 7 | 3 | 6 | 0.25 · 0.25 · 0.60 |
| ICP_5 Sam | 8 | 8 (+1) | 5 | 5 (+1) | 8 (+1) | 8 | 4 | 6 | 0.35 · 0.30 · 0.65 |
| **Mean (change)** | **8.0** (+0.2) | **7.0** (+0.6) | **5.0** ⚑ (=) | **4.6** ⚑ (+0.2) | **6.4** (+0.4) | **7.2** (=) | **3.4** ⚑ (=) | **5.4** (=) | **0.25** (=) · **0.25** (+0.01) · **0.56** (+0.03) |

⚑ = mean ≤ 5.

**Verdicts:** 4 MEH, 1 I'D QUIT (Anika at frame 8). Maya moved from "not disappointed" to "somewhat disappointed" if it vanished.

**Score-change check (clerk's note, per the persona rules).**
- **Backed by a real change on the page:**
  - Diego's Trust and Control: the made-up-data line, the placeholders gone, and "stop anytime" with optional connections in the new list.
  - Jordan's Clarity: the problem line.
  - Sam's Trust and Control, in part: the made-up-data line and "stop whenever" are new.
- **Not backed by a change:**
  - Sam's **Useful +1**, which he gives because "a person is now promised". That line was already on the round-1 page.
  - Sam marks the 1/2/3 key "fixed at the card". The key's position didn't change.
  - I've recorded both as given and haven't edited them.

## Where they disagree

- **What blocks joining.** Diego and Jordan want the deferred facts now (length, minutes a day, eligibility, a notify-me). Anika wants "where it goes". Sam wants a named person. Maya wants to know where it interrupts her. Each one maps to their own life, and they no longer converge on a single fix the way they did on the dead Join.
- **The no-watch path (Jordan).** On the no-watch card, the app-switch reason is gone, and "a slow start of 'not enough data yet'" reads as two weeks of just a clock: "That's the two weeks where I quit everything." Nobody else raised this.

## Safety and trust flags (for `/plan-review`'s safety lens)

- **"Someone to talk to" with no name** (5 of 5). Diego: "If it's the team trainer, that's the coaching staff again." The number stays a placeholder until Columbia Health confirms it.
- **New, from Sam:** a morning-only offer lands at his worst moment: "Morning is when my ring score ruins my day… let me choose when."
- **"Never tells your school" next to "course staff have to OK the study"** (Anika, Diego). The new honest copy makes the boardroom's false line more visible.
- **"Not medical advice"** is only in the footer (4 didn't see it on phones).
- **Sample history still reads as theirs** (Sam, Maya: "your last 6 afternoons").

## The hardest truths

- Anika: "That was my ask in three tests in a row."
- Jordan: "I can't sign up for something with unknown weeks and minutes a day around 25 hours of shifts."
- Maya: "You still never say where the suggestion appears or that it waits for me to finish a problem. That's my whole fear."
- Sam: "A promise of a person with no name is worse than no promise."

## Fixes, ranked by how many named them

**Copy the page can carry now:**
1. **Say where the suggestion appears** (5). This is a product fact the team must confirm. The island mockup shows a laptop notch; don't promise "waits for a pause" unless the build does it.
2. **Define "which kind of app"** (5). A category list, and no window titles; check this against the collector's design.
3. **Cut "See every screen"** (4).
4. **Snooze:** add a Snooze button to the demo cards, or cut "snooze means snooze" (4).
5. **Move "not medical advice"** up from the footer (4).
6. **Timeline:** the "12:30 pm" start label and the 35-min collision (3).

**Needs the team:**
7. **Pilot length, minutes a day, eligibility** (5).
8. **A "Where it goes" block** (5). The boardroom's proposed lines are ready.
9. **Name the person** (5). It stays a placeholder until Columbia Health confirms.
10. **A notify-me** (2). It would collect emails, so per the boardroom it stays off until course staff answer.
11. **Strike "Mac or Windows" and "never … school"** (boardroom). Both are still on the page.

**"If you fix only one thing"** (each tester's, unedited):
- Maya: say on the first screen where the suggestion appears and that it waits until I finish the problem.
- Diego: the joining card states the pilot length and who sees my data, and has a "tell me when it opens" button.
- Anika: a "Where it goes" block: storage, retention, AI fields, who sees pilot data.
- Jordan: replace "we'll put that here" with how long, minutes a day and who can join.
- Sam: name who "someone to talk to" is, and let me pick when it's offered.

## Since last time (round 1 → round 2)

- ✅ **Problem line:** 5 of 5 now state it, and are sure.
- ✅ **Dead-end Join and bracket placeholder:** gone. 0 of 5 flag them.
- ◐ **Joining:** the list is understood; length, effort, eligibility and who sees the data are still missing.
- ◐ **Join on the phone's first screen:** the fine-print link was seen by Jordan, Sam and Anika.
- ⬜ **Not fixed:** where it appears · "which kind of app" · named person · "See every screen" · snooze in the demo · timeline labels · "No watch" chip · sample history · where it goes · devices (Apple Watch, Garmin, Linux) · the two false lines.

## The five cards (verbatim)

### ICP_1 · Maya Okafor

**ICP_1 · Maya Okafor**: I finally know what problem you're solving. I still don't know where this thing would pop up while I'm mid-mechanism, or whether my Apple Watch even counts.

**Part 1: Teach-back**

**A. Text to a friend.** "it's like a laptop app that tracks how long you've been studying + how you slept and tells you when to take a walk vs keep going. shows you why. not out yet, it's a class project"
Sure · frames 1, 7, 10.

**B. The problem.** After a couple of hours of studying you can't tell whether you need a break or should push through. It's the student's problem, mine included. Athletes get mentioned but nothing on the page is about training. Sure · frame 1, the bold line.

**C. What it does.** 1) An app on my laptop counts how long I've been at it and how often I switch apps. 2) If I connect a watch or ring, it adds last night's sleep. If I connect my calendar, it knows when my next class is. 3) It suggests keep going, a 5-minute walk or a longer break, with numbered reasons that point to the source. 4) I tap walk, keep going or snooze, and the study clock pauses during a break.
Sure on steps 1–4 (frames 2, 5, 6, 7, 8). Where the suggestion actually shows up (a laptop pop-up? my phone?) and whether it waits for me to finish a problem: **no idea**, nowhere.

**D. What it needs from me.** Install the laptop app (Mac or Windows). The watch/ring and calendar are optional. It reads study time, breaks, app switches and "which kind of app", sleep length and my next class. It doesn't read what I type, read or browse, my messages, my screen, my location, or my watch's own scores.
Sure · frames 8 and 9 (laptop). Whether my **Apple Watch** works: guessing no, because it names Fitbit, Oura and WHOOP only (frame 1).

**E. Joining.** If I tapped it today, nothing would happen: sign-up isn't open until course staff OK the study. If it opens: install the laptop app, connect things only if I want to, put up with a week of "not enough data yet", no cost, quit anytime. How long it runs and who can join: the page says it'll add that later.
Sure on what joining involves (frame 10) · how long and how much effort per day: no idea.

**F. What it says it won't do or isn't.** It doesn't read my content, screen or location. It never tells my coach, team or school. It won't guess in the first week. It won't bring up "talk to someone" mid-study. Everything on the page is made-up data. It's a wellness tool, not medical advice. Sure · frames 9 and 10. The "not medical advice" line is only in the laptop footer; I never saw it on iPhone.

**G. Lost me.**
- "See every screen" (frame 1): screens of what?
- "which kind of app" (frame 8): does Anki vs Instagram count differently? Still undefined.
- "In 4 of your last 6 afternoons like this, a walk helped" (frame 2): helped how, measured how? And "your" afternoons, when I've never used it?
- "Most of your sessions run past an hour like this." (frame 4): read it twice. I don't see why that makes it "Fairly sure" I should keep going.
- "Your call. Next check 3:30." (frame 8): is that what snooze does? The demo has no snooze button.
- "Last night you slept · No watch" (frame 5): no watch isn't an amount of sleep.
- iPhone frame 6: "until Chem lab" sits over "12:30 pm", and for a second I read 12:30 as the lab time.
- "It still fits before lab at 4:30" (frame 5): back at 4:25 gives me 5 minutes to pack up and walk to lab. Not sure that counts as fitting.
- "offers someone to talk to" (frame 9): who?

**H. Click moment.** iPhone frame 3. Switching sleep to 7 h changed "Fairly sure" to "Not sure yet". That's when I got that it reacts to my night, not just a timer.

**I. Still asking.**
1. Where does it reach me, and does it wait until I finish a problem? (My phone is face-down.) [my story]
2. Does my Apple Watch SE work?
3. How many weeks is the pilot, and how many minutes a day?
4. What's stored, where, for how long, and who on the team sees it?
5. Is flipping between Anki, a PDF and notes counted against me? [my story]
6. What does it do in exam week?

**J. Scores.** Problem **8** · what it does **7** · joining **6**. Did I understand everything? **No.** I still don't know where or when the suggestion interrupts me, or what the pilot asks per day and for how long.

**Part 2: Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | a break-timer that explains itself |
| Where I'd quit | frame 1, "Fitbit, Oura or WHOOP". That's not my watch. |
| P(still running in a week) | 0.40 |
| P(I'd recommend it) | 0.35, to my orgo study partner [my story] |
| P(I'd consent to the data) | 0.60. I'd refuse "which kind of app" until it's defined. |
| If it vanished tomorrow | somewhat disappointed |
| What I'd use instead | nothing, plus an energy drink at hour 3 [my story] |

**Since last time:**
- **Fixed:** the problem in one line.
- **Partly fixed:** honest "sign-up isn't open" on the first iPhone screen, with a joining list. No working Join, but no brackets or "proposal" either.
- **Not fixed:**
  - where the suggestion appears
  - Apple Watch named
  - "which kind of app"
  - app switching between study apps counted as distraction
  - "snooze until I finish this one"
  - next pause instead of "Next check 3:30"
  - what Delete does, plus "Stored" and "Kept for"
  - cut "See every screen"
  - "No watch" as a sleep option
  - timeline labels colliding at 35 min (laptop frame 4, "12:30 now 1:05" overlap)

**Run-through:**
- Frame 1: good, finally the problem in plain words. Then I wondered whether my Apple Watch is out.
- Frames 2–5: good. The reasons with numbered sources I'd believe. "Fairly sure" and "Not sure yet" instead of a percentage don't scare me.
- Frame 6: fine. The paused clock is a nice touch.
- Frames 7–8: confused at "Next check 3:30" and "which kind of app".
- Frame 9: good. "In the morning, never mid-study" is exactly right for me. [my story]
- Frame 10: fine. Honest, but the two things I'd decide on (how long, who can join) are blank.

**Brutal truth:**
1. You still never say where the suggestion appears or that it waits for me to finish a problem. That's my whole fear, and the page is silent (frames 1–10).
2. My watch isn't on the list (frame 1).
3. Snooze is promised in step 3 (frame 8) but there's no snooze button anywhere in the demo.

**What worked:** the bold problem line (frame 1). Confidence words instead of scores. The reasons with sources. "Never mid-study" (frame 9). An honest, made-up-data joining box (frame 10).

**Trust and safety:** nothing sounds like a doctor. "a walk helped" (frame 2) is the claim I'd poke: it needs to say how it knows. "Someone to talk to" needs a who.

**Fix list:**
1. One line under the hero saying where the card shows up on my laptop and that it waits for a pause. Then add a "Snooze till I finish" button to the demo. That's what would make me install it. You'll know it worked if my next teach-back answers C with "sure".
2. Say Apple Watch yes / no / later next to Fitbit, Oura and WHOOP. Without that I assume I'm a "no watch" user.
3. Fill in pilot length, minutes per day, what's stored and for how long.
- **Cut:** "See every screen".

**If you fix only one thing:** say on the first screen where the suggestion appears and that it waits until I finish the problem.

`ICP_1 | 2026-11-05 | Landing page r2 teach-back (iPhone + laptop) · understood problem 8 · does 7 · joining 6 | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 6 · Control 6 · Feel 7 · Come back 5 | overall 6 | week 0.40 · recommend 0.35 · consent 0.60 | one-fix: First screen says where the suggestion appears and that it waits until I finish the problem`

### ICP_2 · Diego Ramírez

**ICP_2 · Diego Ramírez**: I get what it is now. It's still built for someone with chem lab, not for someone with practice.

**Part 1: Teach-back**

**A. Text to a friend.** "It's a laptop app some students are making. It watches how long you've been studying and tells you to keep going or take a quick walk, and it shows why. You can't sign up yet, it's only a demo." · sure · frames 1, 7, 10

**B. The problem.** A couple of hours into studying, you can't tell whether you're done or should keep grinding. It's the problem of whoever studies long stretches on a laptop. The page says "athletes" too, but nothing on it is about athletes. · problem: sure (frame 1) · the athlete part: guessing, since nowhere backs it up

**C. What it does.** The laptop app counts your study time and how often you switch apps. A watch or ring adds how long you slept, and the calendar adds your next class. It shows a card that says keep going, a 5-minute walk or a 15-minute break, with numbered tags for the source of each reason and a label for how sure it is. You tap walk, keep going or snooze, and it checks again later. My guess is every 20 minutes, because "Next check 3:30" comes after a 3:10 card. Where the card shows up (laptop pop-up? phone?): no idea. · sure on the steps (frames 1–8) · no idea on where it appears

**D. What it needs.** Install: a small app on Mac or Windows, so my old Windows laptop works. Optional: a watch or ring (Fitbit, Oura, WHOOP) and the calendar. It reads study time and breaks, app switches "and which kind of app", sleep length and your next class. It doesn't read messages or screen, location, or the watch's own scores like Recovery. From the watch it only lists sleep, so I don't think it reads heart rate (guessing). Garmin: no idea, it's not named. · sure (frames 7–9) · no idea on Garmin. I never saw a heading over the "doesn't read" list; I worked it out from the dashes vs the checkmarks `[from stills]`.

**E. Joining.** There's no Join button. The only button at the end is "Try the demo again", so today nothing would happen and I couldn't even leave my number. If it opens: install the laptop app, connect things only if I want, a slow start of "not enough data yet", free, stop anytime. Length: they say it's coming. Effort per day: not said. Who sees my data: not said. · sure · frame 10

**F. What it won't do.** It won't read messages, screen, location or watch scores. It never tells my coach, team or school. It won't guess in the first week. It won't bring up "someone to talk to" mid-study. It asks once and snooze means snooze. Right now it isn't real: made-up data, waiting on course staff to OK it. · sure · frames 8–10. I never saw "not medical" stated.

**G. Lost me.**
- "See every screen" (frame 1): a gallery? an app? I read it twice.
- The grey 1, 2, 3 boxes inside the card (frames 1–2). They only made sense once I hit the legend, "1 your laptop · 2 your watch or ring · 3 your calendar" (frames 3/6).
- "Short walk now?" next to "Not sure yet … this one is a closer call" (frame 3). If it's not sure, why is it asking?
- "Most of your sessions run past an hour like this." (frame 4). Is that the reason I should keep going?
- "Walk, keep going, or snooze" (frame 8). The demo cards have no snooze button (frames 3–5).
- "which kind of app" (frame 8). Does it log app names, like Instagram vs Canvas?
- "Still learning your usual sleep · 4 of 7 nights" (frame 9). Is that mine or an example?
- "It never tells your coach, team or school." (frame 9). It sits inside the "needs a person" card. Does it cover all my data or just that one feature?
- "Our course staff have to OK the study" (frame 10). Is this an app or a class study?

**H. Click moment.** Frame 1: the card under the hero ("5 minutes fits. Back by 3:15"). Frame 7 is where I understood where the data comes from.

**I. Still asking**
1. Who on the team or course staff sees my pilot data, where is it stored, and for how long?
2. Does my Garmin work, yes or no?
3. Does it know I lifted or had practice, or will it tell me to walk after a double session?
4. Where does the card appear, and does studying on my phone on the bus count?
5. How long is the pilot, and how many minutes a day?
6. How do I hear when it opens?

**J. Scores.** Problem 7 · What it does 8 · Joining 5. Did I understand everything? **No.** I still don't know who sees my data, how long the pilot runs, or whether Garmin and training days count.

**Part 2**

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 |
| 5-second read | a study-break timer with a demo |
| Where I'd quit | frame 10: "How long it runs and who can join: we'll put that here", and the only button is "Try the demo again" |
| P(still running in a week) | 0.20 |
| P(I'd recommend it) | 0.15, to a non-athlete roommate who studies on a laptop |
| P(I'd consent) | 0.55. I'd refuse the watch if it means the team Garmin. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Garmin sleep plus a phone timer in study hall `[my story]` |

**Since last time** `[from memory]`
- Not fixed: training-aware options · practice/lift blocks from the calendar · Garmin row or "not supported" · stored / kept for / who sees it · "Today: practice/lift" demo · back up "athletes" · define "which kind of app"
- Partly fixed: "never tells your coach" is closer to the end, but still not in the joining list · sign-up is now honest on screen 1, but there's no notify-me · "Sample demo with simple rules" sits under the card, after I've already read "4 of your last 6" as mine · the joining card now states the effort, but not the length or who sees it · the laptop-only data source implies bus phone study isn't counted, but the page never says where the card appears
- Fixed: "[Pilot sign-up link: coming]" and "Nov 6 proposal" are gone

**Run-through** `[from stills]`: 1 🙂 the hero is clear · 2–3 😐 "Not sure yet" but it still pushes a walk · 4 🙂 · 5 🙂 "No watch connected, so this uses your laptop and calendar only" is honest · 6 🙂 · 7 😀 now I know the source · 8–9 🙂 the read list · 10 ❌ dead end.

**Brutal truth**
1. Nothing knows I'm an athlete. Every example is chem lab, and the only options are walk, break or keep going (frames 1, 7).
2. "Works with a Fitbit, Oura or WHOOP" (frame 1). My watch is still missing, with no honest "not supported".
3. The joining card has no length, no "who sees it" and no way to raise my hand (frame 10).

**What worked:** the joining list is concrete (frame 10). "Everything here is a demo with made-up data" is straight with me. The demo times all add up to lab at 4:30 (frames 1, 4, 5). The "doesn't read" list includes the watch's Recovery score, which I actually like.

**Trust and safety:** "offers someone to talk to" (frame 9) never names the someone. If it's the team trainer, that's the coaching staff again. That's a finding, not a detail.

**Fix list**
1. The joining card names who sees my data, where it's kept and for how long, and repeats "never your coach" there. That moves my consent, and you'll know it worked when I can answer I-1.
2. Name Garmin, or say "not supported". Then I can answer D.
3. Add one athlete case to the demo (a practice/lift toggle that changes the options to sit or nap), or drop "athletes".
**Cut:** "See every screen".
**If you fix only one thing:** the joining card states the pilot length and who sees my data, and has a "tell me when it opens" button.

**What I'd want:** on my phone at study hall Mon–Thu, a card that knows I lifted today `[my story]`.

`ICP_2 | 2026-11-05 | Landing page r2 teach-back (newer version, iPhone) · understood problem 7 · does 8 · joining 5 | MEH | Clarity 8 · Trust 8 · Timing n/a · Useful 4 · Control 7 · Feel 7 · Come back 3 | overall 5 | week 0.20 · recommend 0.15 · consent 0.55 | one-fix: Joining card states pilot length, who sees my data, and a tell-me-when-it-opens button`

Moves vs last: Trust +1 (honest "made-up data" and "sample demo" labels, placeholders gone) · Control +1 (turn off or delete any source, connections optional, stop anytime) · consent +0.05 · everything else unchanged.

### ICP_3 · Anika Sharma

**ICP_3 · Anika Sharma**: You told me more about the pilot, and still nothing about where my data goes. On my ThinkPad I still can't use it.

**Part 1: Teach-back**

**A. Text to a friend.** "Student class project. A Mac/Windows laptop app, plus your sleep tracker if you have one, that tells you when to take a break mid-study and says why. Not open yet, and no Linux, so not for me." · sure · frames 1, 7, 10

**B. The problem.** Partway through a long session you can't tell whether a break would help or whether to push on. It's framed as a student and athlete problem. · sure, but I can only say it by restating the subhead. The page states the problem and never says what it costs you to get it wrong. That's a finding. · frame 1

**C. What it does.** A laptop app times the session and counts app switches. A watch or ring supplies last night's sleep, and the calendar supplies when the next class starts. A card offers keep going, a 5-min walk or a 15-min break, with numbered sources and a confidence label. I pick one. A break pauses the study clock. It checks again later ("Next check 3:30"). · sure on the logic, **no idea where the card actually shows up**: a laptop popup? my phone? · frames 2–8

**D. What it needs.** Install the laptop app (Mac/Windows). Fitbit, Oura, WHOOP and calendar are optional. It reads study time and breaks, app-switch rate and "kind of app", sleep length, and the next class. It doesn't read typing, browsing, messages, the screen, location, or the watch's own scores. · sure on the lists. Account? Phone app? No idea · frames 7–9

**E. Joining.** Nothing happens, because there's no Join. Sign-up is closed, there's no waitlist and no way to be told when it opens. The only button is "Try the demo again". If it opens: install the laptop app, connect things only if I want to, expect a slow start of mostly "not enough data yet", free, quit anytime. Length and eligibility: "we'll put that here". Consent form, who sees pilot data, use in the writeup: nowhere. · sure · frame 10

**F. Won't do / isn't.** Doesn't read the things listed above (frames 8–9). Says so instead of guessing in week one, and never brings up the support offer mid-study (frame 9). "Never tells your coach, team or school" (frame 9). Asks once, and snooze is respected (frame 8). No real data until course staff approve it (frame 10). Not medical advice: laptop footer only, I didn't see it in my iPhone frames (laptop frame 10).

**G. Lost me.**
- "See every screen" (frame 1): screens of what?
- "Not sure yet" + "You slept well, so this one is a closer call." (frame 3): "yet" made me think it was still learning. It's a confidence label. I read it twice.
- "Fairly sure" + "Most of your sessions run past an hour like this." (frame 4): that's a base rate, not a reason to keep going.
- "a walk helped" (frame 2): helped by what measure?
- "which kind of app" (frame 8): categories or window titles?
- "slept about your usual 7 h" (frame 3) vs "Still learning your usual sleep · 4 of 7 nights" (frame 9)
- "snooze means snooze" (frame 8): no card in frames 2–5 has a snooze button.
- "delete everything" (frame 8): delete it from where?
- "offers someone to talk to" (frame 9): who?
- "never tells your … school" (frame 9) next to "Our course staff have to OK the study" (frame 10)

**H. Click moment.** Frame 2 for *what* it is. Frame 7 for *how*: until "A small app on your Mac or Windows laptop" I thought this was a website.

**I. Still asking.**
1. Where does data go: on the laptop or a server, and who runs it? Does any AI write those reason sentences, and with which fields?
2. Who sees pilot data? Retention? What happens if I leave the country after the course?
3. Linux?
4. How often is "Fairly sure" right? How is "helped" measured?
5. Pilot length, eligibility, consent form, a way to be notified.
6. What exactly "kind of app" records.
7. Who "someone to talk to" is.

**J.** Problem 7 · Does 8 · Joining 6. Did I understand everything? **No.** Missing: where my data goes and whether an AI sees it.

**Part 2: Review card**

| | |
|---|---|
| Verdict | I'D QUIT |
| Overall | 4/10 |
| 5-second read | A break-timer for studying that explains itself |
| Where I'd quit | Frame 8: a "What it reads" list with no "where it goes" |
| P(still running in a week) | 0.05 (no Linux build) |
| P(I'd recommend it) | 0.20, to a classmate on a Mac |
| P(I'd consent) | 0.40. I'd refuse "kind of app" until it's defined |
| If it vanished tomorrow | not disappointed |
| What I'd use instead | Fitbit sleep log + a 50-min timer |

**Since last time**
- AI mentioned: ⬜ not fixed
- 'Kind of app' defined: ⬜ not fixed
- Usual 7 h vs 4 of 7 nights: ⬜ not fixed
- Where data goes / LLM / deletion: ⬜ not fixed
- 'Where it goes' block: ⬜ not fixed
- OS in hero: ⬜ not fixed
- Linux: ⬜ not fixed
- What joining involves: ◐ partly fixed (install, optional connections, slow start, cost, stop. Still missing: length, consent, writeup use)
- Real escalation resource: ⬜ not fixed
- Confidence words vs counts: ⬜ not fixed (frame 4 got worse)
- 'Never tells your school': ⬜ not fixed, sharper now that course staff sit one block below

**Run-through** `[from stills]`
1. 🙂 Frame 1. Clear hero, and Fitbit is named.
2. 🙂 Frame 2. Numbered sources are good.
3. 😕 Frame 3. "Not sure yet" reads like a status, not a confidence level.
4. 😕 Frame 4. "Fairly sure", on a base rate.
5. 🙂 Frame 5. Says honestly that no watch means laptop and calendar only.
6. 🙂 Frame 6. The break pauses the clock.
7. ❌ Frame 7. "Mac or Windows". I'm out.
8. 😐 Frames 8–9. Good "never reads" list, but the destination is missing.
9. 🙂 Frame 10. An honest "not open yet".

**Brutal truth**
1. Frames 8–9 tell me what it reads and never where it goes, or whether an AI sees it. That was my ask in three tests in a row.
2. Confidence labels aren't tied to anything. "Fairly sure" sits on 4/6, 5/7 and "most sessions" alike (frames 2, 4, 5).
3. "Never tells your school" sits right above "course staff have to OK the study" (frames 9–10). Who sees pilot data?

**What worked.** Frame 10 is plain and true: made-up data, no cost, slow start, length still TBD. "What it never reads" (laptop frame 8) is specific. The session bar's times add up across every frame.

**Trust and safety.** "Someone to talk to" with no name or link. The no-medical-advice footer was missing from my iPhone frames.

**Fix list**
1. Four lines under "What it reads": stored where, kept how long, what the AI sees (or "no AI"), who sees pilot data. That moves my consent and decides whether I'd forward it. It's working when the testers can answer teach-back question I-1 without guessing.
2. Tie each confidence word to a hit rate ("Fairly sure = right about 2 in 3"). That's the only way I'd trust a "Keep going".
3. Put "Mac or Windows (no Linux yet)" in the hero, so I find out in 5 seconds instead of at frame 7.

Cut: "snooze means snooze", until a card actually has a snooze button.

**If you fix only one thing:** a "Where it goes" block: storage, retention, AI fields, who sees pilot data.

`ICP_3 | 2026-11-05 | Landing page r2 teach-back (laptop + iPhone) · understood problem 7 · does 8 · joining 6 | I'D QUIT | Clarity 8 · Trust 5 · Timing n/a · Useful 3 · Control 5 · Feel 7 · Come back 2 | overall 4 (=) | 0.05 · 0.20 · 0.40 | one-fix: 'Where it goes' block: storage, retention, AI fields, who sees pilot data`

### ICP_4 · Jordan Lee

**ICP_4 · Jordan Lee**: Okay, now I get what it is. I still can't tell if joining fits my week, and that's the part I actually need to know.

**Part 1: Teach-back**

**A. Text to a friend:** "it's a free laptop app some students are making. it tracks how long you've been studying and how much you're jumping between apps, then tells you when a quick walk or a break fits before your next class. not out yet, it's just a demo." · **sure** · frames 1, 2, 7, 10 (I only saw "Columbia student project" in the laptop footer, frame 10)

**B. The problem:** After a couple of hours of studying you can't tell whether you need a break or should keep pushing. It's for students and athletes doing long sessions. Mine is close but not the same: I can't tell tired from ADHD-brain. · **sure** · frame 1 (bold line)

**C. What it does:** A laptop app counts my study time and app switches. If I connect them, it also uses sleep from a watch or ring and my next class from my calendar. It shows a card: keep going, a 5-min walk, or a 15-min break, with numbered reasons and how sure it is. I pick walk, keep going or snooze. It asks once, then checks again later. If I take the break, the clock pauses. · **sure** on the steps · frames 2–8. **Where the card pops up** (laptop corner? phone?): **guessing** laptop · nowhere. **How it knows I'm studying and not watching Netflix:** **no idea** · nowhere.

**D. What it needs:** A small app on my Mac or Windows laptop. A watch/ring (Fitbit, Oura, WHOOP) and a calendar are optional. It reads study time and breaks, how often I switch apps and what kind of app, sleep only if connected, and my next class only if the calendar is on. It doesn't read typing, browsing, messages, my screen, location or the watch's own scores. · **sure** · frames 7, 8, laptop frame 9. On the SE frames I never saw the "never reads" box; it jumped from frame 8 to 9. Anything on my iPhone? **guessing** no · nowhere.

**E. Joining:** I can't join today. Sign-up is closed until course staff OK it. If it opens: install the laptop app, connect extras only if I want, a slow start of mostly "not enough data yet", free, quit anytime. How long it runs, minutes a day, install size, who's allowed: **no idea**. The page says they'll add it later. · **sure** on what's there · frame 10

**F. Won't do / isn't:** It won't read typing, browsing, messages, screen or location (laptop 9). It won't guess; it says when it doesn't know (9). It never tells your coach, team or school (9). The "someone to talk to" offer only comes in the morning, never mid-study (9). It asks once (8). It's not live and the data is made up (10). It's not medical advice (laptop 10 footer only). Nothing about streaks either way. · **sure**

**G. Lost me:**
- "See every screen" (frame 1): I still don't know what that is.
- The little boxed "3", "1", "2" in the card (SE 2–5): the key "1 your laptop · 2 your watch or ring · 3 your calendar" sits below the card and off-screen on the SE. I read "lab 3" as a footnote.
- "12:30 pm" under the session bar (SE 6): I read it as lab time again. I only worked out it's my start time from "20 min to lab".
- "12:30 pm" and "now 1:05" print on top of each other (laptop 4).
- "Your study clock is paused" (6): what clock? Do I start it?
- "and which kind of app" (8): does it see app names?
- "went better in 5 of 7 long sessions" (5): better how?
- "Still learning your usual sleep · 4 of 7 nights" (9): I have no watch. Does that ever finish for me?
- "offers someone to talk to" (9): who?
- "Next check 3:30" (8): how often does it check?

**H. Click moment:** SE frame 1 (the bold line plus "suggests a short break… shows you why"). It locked in at frame 2 when the card appeared. Last time it took until step 7 [from memory].

**I. Still asking:**
1. How many weeks, how many minutes a day, and who can join? Can someone outside your class join?
2. Where does the suggestion show up? Do I need anything on my phone?
3. On a shared family laptop, whose app switches does it count? How big is the install, and does it slow the laptop?
4. With no watch, what do I get in week one besides "not enough data yet"?
5. How long does snooze last? How long is my data kept?
6. Who is the "someone to talk to"?

**J. Scores:** Understood the problem **8** · understood what it does **8** · understood what joining involves **6**. **Did I understand everything? No.** Missing: where the suggestion pops up, and how long and how much effort joining takes.

**Part 2: Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | A study-break helper with a demo |
| Where I'd quit | Frame 10, "A slow start… mostly says 'not enough data yet'". With no watch, week one is just a clock. |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.25, to a classmate who studies in the library for hours |
| P(I'd consent) | 0.60. I'd refuse "which kind of app" on the shared laptop until it can tell it's me. |
| If it vanished tomorrow | not disappointed |
| What I'd use instead | phone timer and my shift schedule [my story] |

**Since last time:**
- ✅ Plain problem line: fixed (frame 1).
- ◐ Join on the SE first screen: partly. There's a link now, but weeks, minutes a day and install size are still missing.
- ◐ Where the suggestion appears: partly. Frame 7 says laptop app, but not where the card shows.
- ⬜ Not fixed:
  - SE timeline lab label
  - laptop label collision at 35 min
  - "See every screen"
  - "No watch" is still the third chip, and the demo opens on "About 5 h"
  - no-watch card still drops the app-switch reason (frame 5 shows only "3 h 40 min")
  - snooze isn't in the demo cards
  - shared laptop
- ◐ Windows and delete: partly. Windows is said in frame 7; nothing on install size or how long data is kept.

**Run-through:**
- 1 🙂 Plain and short.
- 2–4 🙂 The card reads fast on the SE, and "Not sure yet" felt honest.
- 5 😕 No-watch card: just my hours and lab time. It got thinner.
- 6 😀 "Enjoy the break." No guilt.
- 7–9 🙂 The "never reads" list is good, but I only saw it on the laptop.
- 10 😐 Honest, but I can't decide anything from it.

**Brutal truth:**
1. Frame 10 dodges the question that decides whether I join: "How long it runs and who can join: we'll put that here". I can't sign up for something with unknown weeks and minutes a day around 25 hours of shifts [my story].
2. The no-watch path is the weakest one. Frame 5 drops the app switches, and week one is "not enough data yet". That's the two weeks where I quit everything [my story].
3. It never says where the card appears, or what happens on a laptop my family also uses.

**What worked:** "Sign-up isn't open yet" on the SE first screen. Saying the data is made up. "It never tells your coach, team or school." "Enjoy the break." No streaks anywhere.

**Trust and safety:** "went better in 5 of 7" with no measure feels made up, even with sample data. "Someone to talk to" needs a name, like campus counseling.

**Fix list:**
1. Fill in the join line now: weeks, minutes a day, install MB, Windows, who's eligible. With that, I could actually decide; you'd know it worked if my joining score passed 8.
2. No-watch card keeps the app-switch reason, and week one gives laptop-only suggestions. That decides whether I last past day 3.
3. Step 2 should say where the card pops up and how a shared laptop is handled.

**Cut:** "See every screen".

**If you fix only one thing:** replace "we'll put that here" with how long, minutes a day and who can join.

`ICP_4 | 2026-11-05 | Landing page r2 teach-back (iPhone SE + small laptop) · understood problem 8 · does 8 · joining 6 | MEH | Clarity 8 · Trust 7 · Timing n/a · Useful 5 · Control 6 · Feel 7 · Come back 3 | overall 6 | week 0.25 · recommend 0.25 · consent 0.60 | one-fix: Fill in weeks, minutes/day, install size and who can join on the joining card now`

### ICP_5 · Sam Whitaker

**ICP_5 · Sam Whitaker**: I get it now. It's still a 3 pm tool, though, and I'm a 1 am person.

**Part 1: Teach-back**

**A. Text to a friend.** "Students made it. A laptop app tracks how long you've been studying and, if you wear a ring, how you slept, then tells you when a walk or a break makes sense and shows you why. It's not open yet, it's only a demo." · **sure** · frames 1, 7, 10

**B. The problem.** You're deep into a long study session and can't tell whether to stop or keep pushing. It's a student's problem (athletes too, apparently). · **sure** · frame 1. My own problem (months of short sleep) only gets one card, at frame 9.

**C. What it does.** The laptop app counts how long I've studied and how often I switch apps. The ring gives it my sleep and the calendar gives it my next class. It shows a card saying keep going, take a walk, or take a longer break, with numbered reasons that say where each one came from and how sure it is. I pick. It checks again later ("Next check 3:30"). · **sure** · frames 3, 7, 8. How it decides: the demo uses "simple rules" and the real one "learns what's usual". Beyond that I'm **guessing** (frame 6).

**D. What it needs.** A small app on my Mac. The Oura ring and the calendar are optional. It reads study time and breaks, app switching and "which kind of app", how long I slept, and my next class. It doesn't read my messages, my screen, my location, or the ring's own scores like Readiness. · **sure** · frames 8, 9, 10. Where the card actually shows up, on my laptop or my phone: **no idea**. I saw that nowhere.

**E. Joining.** If I tapped today, nothing would happen, because sign-up isn't open. If it opens, I'd install the laptop app, maybe connect my ring, and sit through a slow start of "not enough data yet". It's free and I can stop anytime. How long it runs, who can join, and how much time it takes a day: **no idea**. The page says it'll add those later. · **sure** about what's there · frame 10

**F. What it won't do.** It won't read messages, screen, location or ring scores. It won't tell my coach, team or school. It won't guess in the first week. It won't bring up the "talk to someone" offer mid-study. Real data doesn't go in until course staff OK it. · **sure** · frames 9, 10. I never saw a line saying it isn't medical advice.

**G. Lost me.**
- "No watch" as an answer to "Last night you slept" (frame 1). I read it twice. That's not an amount of sleep.
- "12:30 pm" under "until Chem lab" (frame 6). I first read it as the lab's time.
- "snooze means snooze" (frame 8). No demo card had a snooze button, so where is it?
- "which kind of app" (frame 8). Does it know I'm in Word and not Safari?
- "Sample demo with simple rules" (frame 6). What rules?
- "Next check 3:30" (frame 8). What's a "check"?
- "offers someone to talk to" (frame 9). Who?

**H. Click moment.** Frame 3. The "Not sure yet, you slept well, so this one is a closer call" card, with the 1/2/3 key right under it.

**I. Still asking.**
1. Who is the "someone to talk to"? Campus counseling? A number?
2. Does it ever say "stop for tonight" at 1 am?
3. Does the card show up on my phone or my laptop?
4. How long does the pilot run, can a non-classmate join, and how many minutes a day does it take?
5. How long is my data kept, and who on the team sees it?
6. Does thesis writing count as "studying"? Every example has a Chem lab.

**J. Scores.** Problem 8 · What it does 8 · Joining 5. Did I understand everything? **No.** The page never says who the "person" is, where the card appears, or how long joining takes and who's eligible.

**Part 2: Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | A break timer for studying that explains itself |
| Where I'd quit | Frame 9: "someone to talk to" with no name behind it |
| P(still running in a week) | 0.35 |
| P(I'd recommend it) | 0.30, to a pre-med friend with labs |
| P(I'd consent to the data it asks for) | 0.65. I'd refuse the calendar |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Oura app (which I dread) and my sister |

**Since last time.**
- Real counseling name and number: ◐ partly. A person is promised now (frame 9), but there's still no name or number. 6th time asking.
- Night "stop for tonight?" version: ⬜ not fixed, 6th time. Every example is 1:05, 3:10 or 4:10 in the afternoon.
- 1/2/3 boxes explained at the card: ✅ fixed (frame 3).
- Join higher up on phones: ✅ fixed (frame 1).
- Working Join with what's involved and who's eligible: ◐ partly. What's involved is there; how long and who can join are missing.
- Study, retention, opt-out: ◐ partly. "stop whenever" and "delete everything" are there; how long data is kept is not.
- Non-classmate can join: ⬜ not fixed (it's deferred, but honestly).
- "your last 6 afternoons": ◐ partly. The sample label exists but sits below the card, and "your" is still there (frame 2).
- "No watch" as a sleep answer: ⬜ not fixed.

**Run-through.**
- Frames 1–2: 🙂 I knew what it was in seconds.
- Frame 3: 😀 "Not sure yet" felt honest.
- Frame 5: 🙂 It says plainly that there's no watch.
- Frame 9: 😕 "Some things need a person" was the line I've wanted, then it gave no person.
- Frame 10: 🙂 Honest that it isn't open, but joining is half-explained.
- Motion and timing: can't judge `[from stills]`.

**Brutal truth.**
1. "Offers someone to talk to" (frame 9) points at nobody. A promise of a person with no name is worse than no promise.
2. All the demo times are afternoons with a Chem lab. I write at 1 am with no next class `[my story]`, so none of it touches my night.
3. Joining (frame 10) still can't tell me weeks, minutes a day, or eligibility.

**What worked.** "Not sure yet… closer call" (frame 3). "never tells your coach, team or school" (frame 9). Ring scores listed as never read. "made-up data", stated plainly.

**Trust and safety.** Morning is when my ring score ruins my day `[my story]`, so a morning-only offer of help lands at my worst moment. Let me choose when. "In 4 of your last 6 afternoons" (frame 2) still claims a history I don't have. Snooze is promised but never shown.

**Fix list.**
1. Name the person on frame 9: "your campus counseling center," what the card would actually say, and an after-hours line. That's the only part that's for me. You'll know it worked when I can say who it would send me to.
2. Add one 1 am example with no class and a "stop for tonight?" card. Then I'd try it on a thesis night. You'll know it worked when I pick a night chip.
3. Fill in "How long it runs and who can join," plus minutes a day and how long data is kept. Then I'd decide on joining instead of shrugging.

Cut: "your" from the demo's history lines.

**If you fix only one thing:** name who "someone to talk to" is, and let me pick when it's offered.

`ICP_5 | 2026-11-05 | Landing page r2 teach-back (iPhone) · understood problem 8 · does 8 · joining 5 | MEH | Clarity 8 · Trust 8 · Timing 5 · Useful 5 · Control 8 · Feel 8 · Come back 4 | overall 6 | week 0.35 · recommend 0.30 · consent 0.65 | one-fix: Name who 'someone to talk to' is (campus counseling, how to reach them) and let me choose when it's offered`

Score moves since the last landing review: Trust +1 (honest "made-up data" line and "never tells your school"), Useful +1 (a person is now promised), Control +1 ("stop whenever", "delete everything"). Everything else is unchanged.

## Related

- [[25-journal/2026-11-05-icp-landing-teachback|Teach-back round 1]] · [[25-journal/2026-11-05-icp-landing|ICP test: the landing page (morning)]] · [[25-journal/2026-11-05-boardroom-privacy-blanks|Boardroom: privacy blanks]] · [[03-users/personas/icp-personas|ICP Personas]] · [[25-journal/25-journal|Journal hub]]
