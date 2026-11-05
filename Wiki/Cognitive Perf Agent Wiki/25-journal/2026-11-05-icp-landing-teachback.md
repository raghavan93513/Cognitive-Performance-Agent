---
title: "ICP teach-back: did the landing page explain itself?"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/landing/index.html", ".icp-tests/2026-11-05-landing/", ".claude/skills/icp/SKILL.md"]
summary: "0 of 5 understood everything. All five explained correctly in their own words what Halftime does (what it does 8.2/10), but all five were guessing at the problem it solves (6.0: the page states the fix, never the problem) and none could say what joining involves (2.0: the page doesn't say). 5 of 5 also didn't know where the suggestion shows up. Their accurate teach-backs repeated two lines the boardroom found false ('Mac or Windows', 'never tells your school'). Review scores unchanged from the morning test (same page): 4 MEH, 1 I'D QUIT, overall 5.4. Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T19:00:00Z
updated: 2026-11-05T19:00:00Z
---

# ICP teach-back: did the landing page explain itself?

**Mode T (teach-back).** The team asked: "did you understand everything about what we are trying to solve and what we are doing here, from the landing page?" The page hadn't changed since the [[25-journal/2026-11-05-icp-landing|morning test]], so the same captures were reused (`.icp-tests/2026-11-05-landing/`, gitignored). Each tester had to **explain the page back in their own words before scoring it**, answering A to F:
- A: the text they'd send a friend
- B: the problem
- C: what it does
- D: what it needs from them
- E: what joining involves
- F: what it won't do

For each answer they gave how sure they were (sure / guessing / no idea) and the frame where they got it. Then they listed what lost them, the moment it clicked, what they're still asking, and three understanding scores. Their usual review card came last. The brief told them to tag anything they knew from memory rather than from the frames. Devices are the same as the morning test. **Synthetic personas and synthetic data: a rehearsal, never evidence.**

The answer key, taken from what the page actually says:
- **Problem:** long study sessions where you push on tired and can't tell when a break would help.
- **What it does:**
  - The laptop app counts study time and app switches.
  - A watch or ring adds sleep (optional), and the calendar adds your next class (optional).
  - It suggests keep going, a 5-minute walk or a longer break, with its reasons, their sources and how sure it is.
  - You decide.
- **Joining:** the page doesn't say. Sign-up isn't open.

## Headline

**0 of 5 understood everything.**

**What they got: what it does.** All five could text a friend an accurate one-line description (8.2/10, every one "sure"). Four got it from the black demo card on the first screen. None got it from the headline alone. Jordan got it at "How it works", because until then they thought it was a phone app.

**What they didn't get:**
- **The problem, 6.0/10, 5 of 5 guessing.** "Every long study session needs a halftime" names the fix, not the problem. Nobody could say what goes wrong if you don't stop. They worked the problem out themselves.
- **Joining, 2.0/10, 5 of 5 "no idea" on length, effort, eligibility and who sees the data.** There's nothing on the page to understand.
- **Where the suggestion shows up, 5 of 5 no idea.** Laptop pop-up, phone notification, or watch? The page never says.

**The page teaches two false lines well.** All five accurately repeated "Mac or Windows" and "it never tells your coach, team or school". The [[25-journal/2026-11-05-boardroom-privacy-blanks|CTO and CSO boardroom]] found both untrue today.

The review scores are identical to the morning test on every tester and every dimension: 4 MEH, 1 I'D QUIT, overall 5.4. It's the same page, so this is consistency, not news.

## Understanding scores (0–10, from the teach-back)

| Tester | The problem | What it does | What joining involves | Understood everything? | Missing, in their words |
|---|---|---|---|---|---|
| ICP_1 Maya | 6 | 8 | 2 | No | where the suggestion appears, whether my Apple Watch counts, what the pilot asks |
| ICP_2 Diego | 6 | 8 | 2 | No | joining is a blank; "athletes" has nothing behind it |
| ICP_3 Anika | 6 | 8 | 2 | No | where my data goes; what the pilot asks |
| ICP_4 Jordan | 6 | 8 | 2 | No | joining is a dead end; the problem is implied, not said; where the nudge lands |
| ICP_5 Sam | 6 | 9 | 2 | No | joining is a blank; the person it points me to has no name |
| **Mean** | **6.0** | **8.2** | **2.0** ⚑ | **0 of 5** | |

## Teach-back accuracy (checked against the page)

| Question | Right? | How sure | Notes |
|---|---|---|---|
| A. Text to a friend | 5 of 5 right | 5 sure | All named the laptop app, study time and app switching, sleep, and the walk/break nudge. 3 of 5 added "class project, not open yet". |
| B. The problem | 5 of 5 roughly right | 5 guessing | All five said the page never states the problem or the harm. Maya named the problem she wished it named: "after hour 3 I can't tell if I'm tired or just bad at this". |
| C. What it does | 5 of 5 right on inputs and choices | sure on inputs; **5 no idea where it appears** | Sam, Anika and Jordan also caught "study clock is paused". |
| D. What it needs | 5 of 5 right | sure, but 4 guessing on "never reads" | On iPhone/SE the "never reads" heading fell between frames, so 4 saw a list of dashes with no heading. This is partly a capture artifact, but a phone scroll can split it the same way. All 5 repeated "Mac or Windows" (**false**, per the boardroom). |
| E. Joining | 5 of 5 right that nothing happens | 5 no idea on the rest | Only "free, works without a watch, delete anytime" came through. |
| F. What it won't do | 5 of 5 right | 5 sure | All 5 repeated "never tells your coach, team or school" (**the school part is false**, per the boardroom). |

**Real misreads the page caused:**
- Sam first read "No watch" under "Last night you slept" as "I didn't sleep".
- On the SE, Jordan read the lab as 12:30. The timeline's end label is hidden at 3 h 40 min, which leaves "until Chem lab · 12:30 pm", and that clashes with "lab at 4:30" one frame earlier.
- Maya read the 1/2/3 source chips as notification counts. She also first took "Your watch's own scores, like Readiness or Recovery" as something it *does* read, because the heading was off-screen.
- Anika caught a contradiction: "your usual 7 h" on the card versus "Still learning your usual sleep · 4 of 7 nights" lower down.

## What lost them (counted)

| Line or part | Who | Count |
|---|---|---|
| "See every screen": every screen of what? | all | 5 |
| The 1/2/3 boxes in the card, explained only below it (off-screen on phones) | all | 5 |
| "which kind of app": does it know I'm on Instagram/TikTok/Word? | all | 5 |
| "Nov 6 proposal", "[Pilot sign-up link: coming]", "BINF 4070", "class pilot": class jargon, looks unfinished, am I eligible? | all | 5 |
| "No watch" as an answer to "Last night you slept" | Maya, Diego, Jordan, Sam | 4 |
| "someone to talk to": who? | Maya, Anika, Jordan, Sam | 4 |
| Timeline: labels collide at 35 min (laptop); end label missing on SE; the empty square | Maya, Diego, Anika, Jordan | 4 |
| "Never reads" heading separated from its list on phones | Maya, Diego, Jordan, Sam | 4 |
| "snooze means snooze", but no Snooze button in the demo; "asks once" per what? | Maya, Diego, Jordan | 3 |
| "Most of your sessions run past an hour like this." isn't a reason (Maya: "read like a guilt line") | Maya, Anika, Sam | 3 |
| "Not sure yet" while the headline still says "Short walk now?" | Maya, Anika | 2 |
| "Next check 3:30": does it check every 20 minutes, even mid-problem? | Maya, Sam | 2 |
| "helped" / "went better", measured how? | Anika, Jordan | 2 |
| "athletes" in the hero, nothing else about athletes | Diego, Anika | 2 |
| "Readiness or Recovery": what are those? | Maya, Jordan | 2 |
| "205 min to lab" (had to do the math); "Back by 4:25" with lab at 4:30 | Diego; Sam | 1 each |

## Still asking (counted, most named first)

1. **Where does the suggestion show up?** Laptop, phone or wrist; Maya studies with her phone face-down. 5 of 5.
2. **What does the pilot ask of me?** Weeks, minutes a day, install size, eligibility for non-classmates, consent. 5 of 5.
3. **Who is the "someone to talk to"?** 4 of 5.
4. **Where is my data stored, how long is it kept, who sees it, does an AI see it?** 4 of 5. Anika's first question: "The page never mentions AI at all."
5. **What does "which kind of app" see: names or window titles?** Asked here by 3; listed as unclear by all 5 above.
6. **Singles:**
   - Apple Watch (Maya)
   - Garmin and practice/lift days (Diego)
   - Linux (Anika)
   - shared family laptop and speed (Jordan)
   - late-night sessions (Sam)
   - how "helped" is measured (Anika, Jordan)

## Review scores (unchanged from the morning test)

| Tester | Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall | Week · Rec · Consent |
|---|---|---|---|---|---|---|---|---|---|
| ICP_1 Maya | 8 | 7 | 5 | 6 | 6 | 7 | 5 | 6 | 0.40 · 0.35 · 0.60 |
| ICP_2 Diego | 8 | 7 | n/a | 4 | 6 | 7 | 3 | 5 | 0.20 · 0.15 · 0.50 |
| ICP_3 Anika | 8 | 5 | n/a | 3 | 5 | 7 | 2 | 4 | 0.05 · 0.20 · 0.40 |
| ICP_4 Jordan | 7 | 6 | n/a | 5 | 6 | 7 | 3 | 6 | 0.25 · 0.25 · 0.55 |
| ICP_5 Sam | 8 | 7 | 5 | 4 | 7 | 8 | 4 | 6 | 0.35 · 0.25 · 0.60 |
| **Mean (change)** | **7.8** (=) | **6.4** (=) | **5.0** ⚑ (=) | **4.4** ⚑ (=) | **6.0** (=) | **7.2** (=) | **3.4** ⚑ (=) | **5.4** (=) | **0.25 · 0.24 · 0.53** (=) |

**Verdicts:** 4 MEH, 1 I'D QUIT.
- **Maya, Diego, Jordan and Sam** quit at frame 10 (Join is a dead end).
- **Anika** quits at frames 8–9: nothing on where the data goes or whether an AI sees it. That moved from "Mac or Windows" this morning; Linux is still a blocker for her.

## Where they disagree

- **The click moment.** Four got it from the first-screen card. Jordan, on the SE, only got it at "How it works": "Before that I thought it was a phone app." The small phone never shows that it's a laptop app until step 7.
- **Anika vs the rest on the worst gap.** Four put Join first. Anika puts "Where it goes" first: she understood joining no worse, but she won't consent without it.

## Safety and trust flags (for `/plan-review`'s safety lens)

- **"Someone to talk to" with no name** (4 of 5). Sam: "That's the one line meant for me." The number stays a placeholder until Columbia Health confirms it.
- **Sample history reads as theirs** (4 of 5): "4 of your last 6 afternoons", "5 of 7 long sessions". "Sample demo" sits only under the card and in the footer.
- **"Never tells your school"** (Anika): "a promise a course project may not be able to keep". This matches the boardroom's finding.

## The hardest truths

- Anika: "'Clear about what it reads' skips the half I care about: where data goes and whether an AI sees it."
- Jordan: "I get what it does. I don't know why I'd need it, and I have no idea what joining means."
- Diego: "'For students and athletes' is the only athlete word on the page."
- Sam: "It gives me a slogan and leaves me to fill in the problem myself."

## Fixes for understanding, ranked by how many named them

The full fix list from the morning test still stands. These are the ones the teach-back points at:

1. **Say what joining involves, and say honestly that sign-up is closed** (5). Per the boardroom, sign-up stays closed until course staff answer. The weeks, effort and eligibility are the team's to set.
2. **State the problem in one plain line under the headline** (5 guessing). The headline names the fix.
3. **Say where the suggestion appears** (5).
4. **Explain the 1/2/3 source chips at the card itself** (5).
5. **Define "which kind of app"** (5).
6. **Cut "See every screen"** (5).
7. **Name the "someone to talk to"** (4). It stays a placeholder until Columbia Health confirms.
8. **Put the sample label above the card** (4).
9. **Replace "No watch" with a "Watch or ring?" question** (4).
10. **Fix the timeline labels:** the 35-min collision, and the end label missing at 3 h 40 min (4).
11. **Keep the "never reads" heading with its list** (4).
12. **Add a "Where it goes" block** (4). Its lines come from the boardroom.

**"If you fix only one thing"** (each tester's, unedited):
- Maya: a working Join on the first iPhone screen that says what happens next.
- Diego: make Join explain what joining costs me, and make it actually sign me up.
- Anika: the "Where it goes" block.
- Jordan: make Join on my phone real, and say what the pilot asks of me.
- Sam: make Join real and say what it costs me.

## Since last time

Nothing changed on the page, so every open ask from the morning test is **not fixed**, as all five confirmed. The ledgers carry them forward, with the new teach-back asks added.

## The five cards (verbatim)

### ICP_1 · Maya Okafor

**ICP_1 · Maya Okafor**: I get what it does now. I still can't join, and it still acts like my Apple Watch doesn't exist.

**Part 1: Teach-back**

**A. The text to a friend.** "it's a laptop thing that tracks how long you've been studying plus your sleep and tells you when a 5 min walk is worth it, and why. class project, not out yet" · **sure** · iPhone 1–2, 7, 10

**B. The problem.** You study for hours, stop noticing you're fried, and then either keep going badly or take a break at a dumb time. It's for "students and athletes", so me in the library. But the page never actually says what the problem is. I worked it out from the headline and the card. It never names my real problem: after hour 3 I can't tell if I'm tired or just bad at this. · **guessing** · iPhone 1 (headline). Never stated outright anywhere.

**C. What it does.** An app on my laptop counts how long I've studied and how often I switch apps. A watch or ring adds last night's sleep. My calendar adds when my next class is. When I've gone long, a card says keep going, walk 5 min or take 15 min, shows the numbers behind it and how sure it is, and I pick. It checks again later. Where does that card actually show up: laptop, phone or wrist? Not said. · **sure** on the inputs, **no idea** on where the card shows up · iPhone 1–5, 7–8

**D. What it needs from me.** I'd install the laptop app (Mac or Windows). Connecting a Fitbit, Oura or WHOOP is optional, and so is the calendar. It reads: study time and breaks, app switches and the kind of app, how long I slept, and my next class. It doesn't read: what I type or browse, my messages, my screen, my location, or my watch's own scores. The Apple Watch isn't on the list, so I'd guess I count as "no watch". · **sure** on the list, **guessing** on the Apple Watch · laptop 8, iPhone 8–9 (on iPhone the "never reads" heading fell between frames, so I only saw dashes)

**E. Joining.** If I tap Join today, nothing happens. Sign-up opens after "the Nov 6 proposal". It's free, works without a watch, and I can delete everything. How long the pilot runs, what I'd do each day, whether there are surveys: none of that is there. · **sure** nothing happens, **no idea** what the pilot asks · iPhone 10

**F. What it won't do or isn't.** It's not medical advice, it's a student class project, and the demo is fake data. It won't read my typing, messages, screen or location. It won't tell my coach, team or school. It brings up "talk to someone" in the morning, never mid-study. In week one it says it's still learning instead of guessing. · **sure** · iPhone 9–10, laptop 8

**G. Lost me.**
- The grey "1", "2", "3" chips in the card (iPhone 1–2). I thought they were notification counts. On the iPhone the key sits below the fold, and I only found it at frame 3.
- "No watch" as an answer under "Last night you slept" (iPhone 5). That isn't an amount of sleep. I read it twice.
- "Most of your sessions run past an hour like this." (iPhone 4). Is that the reason to keep going? It read like a guilt line.
- "Not sure yet" under a headline that still says "Short walk now?" (iPhone 3). So is it suggesting the walk or not?
- "which kind of app" (iPhone 8). So it knows I opened Instagram? That sits badly next to "never reads what you browse".
- "Your watch's own scores, like Readiness or Recovery" (iPhone 9). With no heading in view, I first read it as something it does read.
- "It asks once, and snooze means snooze." (iPhone 8). Once per what? Snooze for how long? There's no snooze button in the demo.
- "Your call. Next check 3:30." (iPhone 8). For me, 3:30 is mid-mechanism.
- "offers someone to talk to" (iPhone 9). Who? A counselor? A hotline?
- "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]" (iPhone 10). Whose proposal? The brackets make the page look unfinished.
- "See every screen" (iPhone 1). Screens of what?
- On laptop 4, "12:30 pm" and "now 1:05" print on top of each other.

**H. The click moment.** iPhone 2 / laptop 1: the black card. "2 h 40 min, 14 app switches, slept 5 h, under your usual 7 h" is exactly the kind of reason I said I'd believe. The headline alone didn't do it.

**I. Still asking.**
1. Where does the nudge reach me? My phone is face-down.
2. Does my Apple Watch work, or am I "no watch"?
3. What does the pilot ask of me: how many weeks, how much effort a day, any surveys?
4. Does it wait until I finish a problem, or does it ping me at 3:30 no matter what?
5. Are app switches bad? Going Anki → PDF → notes is how I study.
6. Can I turn it down during exam week?
7. Who is the "someone to talk to"?

**J. Scores.** I understood the problem **6** · what it does **8** · what joining involves **2**. Did I understand everything? **No.** Missing: where the suggestion appears, whether my Apple Watch counts, and what the pilot asks of me.

**Part 2: Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | a study-break timer with a sports name |
| Where I'd quit | iPhone 10: Join leads nowhere |
| P(still running in a week) | 0.40 |
| P(I'd recommend it) | 0.35, to my orgo study partner |
| P(I'd consent to the data it asks for) | 0.60. I'd refuse "which kind of app" until I know what it sees |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | nothing, plus an energy drink at hour 3 `[my story]` |

**Since last time** `[from memory]`: the page looks the same as my last look.
- Working Join on the first iPhone screen: **not fixed** (iPhone 1 has no Join button; laptop does).
- Name the Apple Watch: **not fixed** (still only Fitbit, Oura or WHOOP).
- Cut "See every screen": **not fixed**.
- "No watch" as a sleep amount / labels colliding at 35 min: **not fixed** (laptop 4).
- Snooze until I finish this one: **not fixed** (the word is there, the button isn't).
- Check in at my next pause, not "Next check 3:30": **not fixed**.
- Say what Delete does, and what's stored and for how long: **not fixed**.
- Face-down delivery: **not fixed**.

**Run-through** `[from stills]`: 1 😐 big headline, no idea what it is yet, no button · 2 🙂 the card's reason is believable · 3 😕 "Not sure yet" but still says walk · 4 😕 the "past an hour" line · 5 🙂 honest about having no watch · 6 🙂 "study clock is paused" · 7–8 🙂 three steps are clear · 9 😀 the "never tells your coach" line · 10 ❌ dead Join.

**Brutal truth.**
1. The page explains the product but never lets me act on it. iPhone 10 is a placeholder in brackets.
2. I still don't know how the nudge reaches me during a 4-hour library block with my phone face-down.
3. Nothing says it will wait until I finish a problem. "Next check 3:30" says the opposite.

**What worked.** The reason line on the card (iPhone 2). "No watch connected, so this uses your laptop and calendar only" (iPhone 5). The "never reads" list on laptop 8. "Never mid-study" and "never tells your coach" (iPhone 9).

**Trust and safety.** "Fairly sure, 4 of your last 6 afternoons" sounds like real history, but it's sample data. That's only flagged in the footer. "Someone to talk to" needs a name, or it feels hollow.

**Fix list.**
1. Put a Join on the first iPhone screen that says what happens next and what the pilot asks (weeks, minutes a day, free). Without it I'm not signing up. You'd know it worked if taps on it go up.
2. Say where the nudge appears, and name the Apple Watch, even as "coming soon". That decides whether I'd install it. You'd know it worked if I can answer I-1 and I-2.
3. Add "snooze until I finish this one" to the demo card. You'd know it worked if I stop asking about timing.
- **Cut:** "See every screen".
- **If you fix only one thing:** a working Join on the first iPhone screen that says what happens next.

`ICP_1 | 2026-11-05 | Landing page teach-back + review (iPhone + laptop) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 6 · Control 6 · Feel 7 · Come back 5 | overall 6 (=) | week 0.40 · recommend 0.35 · consent 0.60 | one-fix: Working Join on the first iPhone screen that says what happens next and what the pilot asks`

### ICP_2 · Diego Ramírez

**ICP_2 · Diego Ramírez**: I got the idea in five seconds. I still couldn't tell you what joining means, or what it does on my lift days.

**Part 1: Teach-back**

**A. Text to a friend.** "Columbia class project. A laptop app that times your study session and tells you when to walk or keep going, and uses your sleep if you've got a Fitbit/Oura/Whoop. Not open yet." · **sure** · frames 1, 7, 10

**B. The problem.** You grind too long without a break and stop getting anything done, and you don't notice it happening. It's a student problem. The page never actually states the problem. I'm reading it off the headline "Every long study session needs a halftime", which is a solution. It says "students and athletes", but nothing on the page is about athletes. · **guessing** on the problem, **sure** it's about students · frame 1

**C. What it does.**
- A laptop app counts how long I've been studying and how often I switch apps.
- My watch or ring adds last night's sleep. My calendar adds when my next class is.
- It shows a card: keep going, a 5-min walk or a longer break. The card gives numbered sources and a "Fairly sure / Not sure yet" tag.
- I pick one. It checks again later ("Next check 3:30").

Where the card shows up (laptop? phone?) I have no idea. · **sure** on the inputs, **no idea** on where it appears · frames 3–8

**D. What it needs from me.**
- **Install:** a small Mac/Windows app.
- **Optional:** a watch or ring, and the calendar.
- **Reads:** study time and breaks, app switches plus "which kind of app", sleep length, next class.
- **Doesn't read:** messages or screen, location, the watch's own scores.

No iPhone app is mentioned. Garmin isn't listed. · **sure** on the list, **guessing** that the dash list means "doesn't read" (its heading is cut off between frames) · frames 7–9

**E. Joining.** Today, nothing happens. Sign-up isn't open. It's free, it works without a watch, and I can delete everything. How long it runs, what I'd have to do, who on the team sees my data and whether a non-classmate can join: **no idea** · frame 10

**F. What it won't do or isn't.** It isn't medical advice. It won't tell my coach, team or school. It won't read messages, screen or location. It won't raise sleep worries mid-study, only in the morning. It won't guess in the first week. "Snooze means snooze." · **sure** · frames 8–10

**G. Lost me.**
- "Last night you slept · No watch" (frame 1): "No watch" isn't an amount of sleep. I read it twice.
- The little "1 2 3" boxes in the card (frame 1): no meaning until the key under the card in frame 3.
- "Fairly sure" / "Not sure yet" (frames 2–3): sure on what scale?
- "205 min to lab" (frame 4): I had to do the math.
- "which kind of app" (frame 8): does it know the app's name?
- The empty square at the end of the session bar (frame 6).
- "Walk, keep going, or snooze" (frame 8): the demo never showed a snooze button.
- "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]" (frame 10): what proposal? It looks unfinished.
- "class pilot" / "BINF 4070" (frame 10): which class? Am I allowed in?
- "See every screen" (frame 1): unclear what it opens.

**H. Click moment.** Frame 1 for *what* it is. Frame 7 ("A small app on your Mac or Windows laptop") for *how*.

**I. Still asking.**
1. Does it know practice, lifts and travel? Is a walk right after a double?
2. Garmin: yes or no?
3. Where does the card appear? I study on my phone on the bus. Does that count at all?
4. Pilot: how long, what's the effort, who sees my data, where is it stored and for how long?
5. How often does it check?

**J. Understanding scores.** Problem **6** · What it does **8** · Joining **2**. Did I understand everything? **No.** Joining is a blank, and the "athletes" claim has nothing behind it.

**Part 2: Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 |
| 5-second read | Break timer for studying |
| Where I'd quit | Frame 10, "[Pilot sign-up link: coming]" |
| P(still running in a week) | 0.20 |
| P(I'd recommend it) | 0.15, to a non-athlete roommate |
| P(I'd consent to the data it asks for) | 0.50. I'd refuse the calendar until it understands practice blocks |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Garmin + team study hall |

**Since last time** (this looks like the same page I tested earlier today `[from memory]`):
- Training-aware options: ⬜ not fixed
- Calendar reads practice/lift: ⬜ not fixed (it only reads "your next class")
- "Never tells your coach" next to the pilot ask: ◐ still sits in the sleep card above it
- Garmin row: ⬜ not fixed
- Stored / kept for / who sees it: ⬜ not fixed
- Real sign-up on the first screen: ⬜ not fixed
- A "Today: practice/lift" demo question: ⬜ not fixed
- Cut the placeholder and "Nov 6": ⬜ not fixed
- Sample history reads as mine: ◐ "Sample demo with simple rules" sits under the demo, but the card still says "4 of your last 6 afternoons"

**Run-through:**
- Frame 1: 🙂 instant
- Frames 3–4: 😀 the answer changes and gets honest ("closer call")
- Frame 5: 😐 15 minutes with 20 to lab, fine
- Frames 7–8: 🙂 clear
- Frame 9: 🙂 the coach line
- Frame 10: ❌ dead end `[from stills]`

**Brutal truth:**
1. "For students and athletes" (frame 1) is the only athlete word on the page. Every example is Chem lab and a laptop.
2. Join goes nowhere (frame 10). That's exactly where I'd decide.
3. It names Fitbit, Oura and WHOOP, and never says whether Garmin works.

**What worked:** A two-tap demo with sources. "Not sure yet" when I said I slept 7 h. "It never tells your coach, team or school" said plainly. The morning-only "someone to talk to". The name works for a soccer player `[my story]`.

**Trust and safety:** No diagnosis tone. "In 4 of your last 6 afternoons… a walk helped" still reads as my own history.

**Fix list:**
1. Next to Join: how long the pilot runs, the effort, who sees the data (named), how long it's kept, and a working sign-up or "text me when it opens". That's the moment I commit. **How you'd know it worked:** testers answer E correctly from frame 10 alone.
2. A "Today: practice / lift / off" chip that swaps the walk for sit or nap, plus a Garmin status line. **How you'd know:** I can say what it does on a lift day.
3. In "It notices", say where the card shows up and that phone study time isn't counted.

**Cut:** "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]".

**If you fix only one thing:** Make Join explain what joining costs me, and make it actually sign me up.

`ICP_2 | 2026-11-05 | Landing page teach-back (iPhone) | MEH | Clarity 8 · Trust 7 · Timing n/a · Useful 4 · Control 6 · Feel 7 · Come back 3 | overall 5 | week 0.20 · recommend 0.15 · consent 0.50 | one-fix: Join that states pilot length, effort, who sees data, and actually signs me up`

### ICP_3 · Anika Sharma

**ICP_3 · Anika Sharma**: I get what it is in five seconds. I still can't tell where my data goes, and that's the only thing I came to find out.

**Part 1: Teach-back**

Note: my ledger already has a review of this landing page from earlier today. I answered from the frames. Where memory added anything, it's tagged.

**A. Text to a friend.** "Columbia class project. It's a laptop app plus your watch: it tracks how long you've been grinding and how you slept, and pokes you to take a 5-min walk before your next class. Sign-up isn't open yet." · **sure** · frames 1, 7, 10

**B. The problem.** Students and athletes study for hours without stopping, often on short sleep, and can't tell when a break would actually help. · Whose: **sure** (frame 1). What the harm is: **guessing**. The page never says what goes wrong if I don't stop. Is it worse focus? Worse sleep? The headline is a slogan that states the fix, not the problem.

**C. What it does.**
1. The laptop app counts how long I've been at it and how many times I switch apps.
2. The watch or ring gives last night's sleep.
3. The calendar gives my next class.
4. It compares all that to my usual and shows a card: keep going, 5-min walk, or 15-min break. Each reason is tagged with its source number and a confidence word.
5. I pick. A break pauses the study clock. Snooze holds, and it checks again later.

How sure: the inputs are **sure** (frames 1, 7). How often it checks is **guessing** (about every 20 min, from "Next check 3:30", frame 8). Where the card appears (laptop pop-up, phone, watch): **no idea**. How the real version decides: **no idea**. The demo is "simple rules" and the real one "learns" (frame 6).

**D. What it needs from me.**
- **Install:** a laptop app, Mac or Windows only. I'm on Linux, so it doesn't run on my machine.
- **Optional:** a Fitbit, Oura or WHOOP, and my calendar.
- **Reads:** study time and breaks, app-switch count and app type, sleep length, next class.
- **Doesn't read:** typing, browsing, messages, screen, location, or the watch's own scores.

How sure: **sure** (frames 7, 8, laptop 9). Not stated anywhere:
- where data is stored
- whether any AI or cloud service sees it
- how long it's kept
- how it knows "which kind of app" without seeing app names
- whether I need a phone app

**E. Joining.** Today, nothing happens. The Join button leads to "sign-up opens after Nov 6" plus a placeholder. It's free, it works without a watch, and I can delete everything. Pilot length: **guessing**, the rest of the fall. Effort, consent form, who on the team sees my data, whether it goes into a writeup: **no idea**. Frame 10.

**F. What it says it won't do, or isn't.**
- Not medical advice, and not a real product yet: it's a student project and the page is sample data.
- Won't read content or location.
- Won't guess in week one; it says it's still learning.
- Asks once, and snooze sticks.
- The "talk to someone" offer comes in the morning, never mid-study.
- Never tells my coach, team or school.

**sure** · frames 8–10

**G. Lost me.**
- "See every screen" (frame 1): screens of what?
- The number tags "3", "1", "2" inside the card (frame 1). They only made sense once "1 your laptop · 2 your watch or ring · 3 your calendar" showed up below the card. On iPhone that's below the fold.
- "Not sure yet" next to "You slept well, so this one is a closer call." (frame 3): it still says walk. Is it recommending the walk or not? Read it twice.
- "Most of your sessions run past an hour like this." (frame 4): that describes my habit. It isn't a reason to keep going.
- "In 4 of your last 6 afternoons like this, a walk helped." (frame 1): helped by what measure?
- "and which kind of app" (frame 8): how does it know the kind?
- The session bar "12:30 pm … now 4:10" with the red line and the square (frame 6). Took a second look.
- "your usual 7 h" (frame 1) versus "Still learning your usual sleep · 4 of 7 nights" (frame 9). Which is it?
- "offers someone to talk to" (frame 9): who?
- "[Pilot sign-up link: coming]" (frame 10): a raw placeholder.
- "athletes" (frame 1): nothing else on the page is about athletes.

**H. Click moment.** Frame 1. The laptop frame shows the headline and the card side by side.

**I. Still asking, most important first.**
1. Where does my data live, and does any LLM or hosted AI see it? The page never mentions AI at all.
2. Who on the course team sees pilot data, does it end up in a writeup, and is delete real?
3. Is there a Linux collector? Without the laptop app, does it do anything?
4. Does "kind of app" mean it logs app names or window titles?
5. Where does the suggestion appear?
6. How is "Fairly sure" checked against reality, and what does "helped" mean?
7. Who is the person it points me to?
8. Pilot length, effort and consent.

**J. Scores.** Problem **6** · What it does **8** · What joining involves **2**.
Did I understand everything? **No.** The page never says where my data goes or what the pilot asks of me.

**Part 2: Review card**

| | |
|---|---|
| Verdict | I'D QUIT |
| Overall | 4/10 |
| 5-second read | A break nudger for long study sessions |
| Where I'd quit | Frame 8/9, "Clear about what it reads": nothing on where it goes |
| P(still running in a week) | 0.05 (no Linux app) |
| P(I'd recommend it) | 0.20, to a classmate on a Mac |
| P(I'd consent to the data it asks for) | 0.40. I'd refuse "which kind of app" until it's defined |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Fitbit sleep data and a pomodoro timer |

**Since last time** [from memory]. This looks like the same page I reviewed earlier today.
- Where it goes, LLM boundary, deletion: **not fixed**
- Linux named in the hero: **not fixed**
- What joining involves: **not fixed**
- Real escalation resource: **not fixed**
- Confidence word versus counts: **not fixed**
- "Never tells your school" while a course team runs it: **not fixed**
- Calendar scope and no HRV: still fixed

**Run-through.**
- 😀 Frame 1: headline and card. Instantly clear.
- 😕 Frame 3: "Not sure yet" and still pushing the walk.
- 😐 Frame 4: a weak reason for keep going.
- 🙂 Frames 5–6: no-watch mode says what it falls back on. Good.
- 😕 Frame 7: Mac or Windows. Not me.
- 🙂 Frame 8: the reads and never-reads lists are concrete.
- ❌ Frame 9: nothing on storage, AI or retention.
- ❌ Frame 10: Join goes to a placeholder.

**Brutal truth.**
1. "Clear about what it reads" (frame 8) skips the half I care about: where data goes and whether an AI sees it.
2. "Join the class pilot" (frame 10) is a dead end and says nothing about cost in time, consent or who sees what.
3. The confidence words aren't backed. "Fairly sure" sits on 4 of 6 or 5 of 7 sessions, and "helped" is never defined.

**What worked.** The two-column reads / never-reads list (laptop frame 9). No-watch mode stating plainly what it uses. Source tags on every claim. "Everything on this page is sample data."

**Trust and safety.** "Never tells your school" is a promise a course project may not be able to keep. "Someone to talk to" with nobody named is not a referral.

**Fix list.**
1. Add a four-line "Where it goes" block under the reads list: stored where, kept how long, what fields an AI sees (or "no AI"), who on the team sees pilot data. My consent P would go to about 0.6. You'd know it worked when I can answer D without guessing.
2. Make Join say what joining involves: install, length, minutes a week, consent form, writeup use. You'd know it worked when E gets an 8 or higher on teach-back.
3. Define "kind of app" (a category list, and no window titles).

Cut: "See every screen" from the hero.

**If you fix only one thing:** the "Where it goes" block.

`ICP_3 | 2026-11-05 | Landing page teach-back + review (laptop + iPhone) | I'D QUIT | Clarity 8 · Trust 5 · Timing n/a · Useful 3 · Control 5 · Feel 7 · Come back 2 | overall 4 | week 0.05 · recommend 0.20 · consent 0.40 | one-fix: 'Where it goes' block: storage, retention, AI fields, who sees pilot data`

### ICP_4 · Jordan Lee

**ICP_4 · Jordan Lee**: I get what it does. I don't know why I'd need it, and I have no idea what joining means.

**Part 1: Teach-back**

**A. Text to a friend.** "a little laptop app that tracks how long ur studying + how much ur app hopping and tells u when to take a walk before class. no watch needed, free, some columbia class project." · **sure** · frames 1, 5, 7, 10

**B. The problem.** Students (and athletes) grinding through long study sessions without a break, and probably getting worse at it the longer they go. · **guessing** · frame 1, headline only. The page never says what goes wrong if I skip the break. I filled that part in myself.

**C. What it does.** An app on my laptop counts how long I've been studying and how often I switch apps. If I wear a watch or ring, it adds my sleep. If I turn on my calendar, it knows when my next class is. After a while it suggests one of three things (keep going, a 5-minute walk, or a longer break), gives reasons with little numbers that point to the source, and says how sure it is. I pick walk, keep going or snooze. If I take the break, it pauses my study clock and tells me when to be back. · **sure** on the sources (frames 7–8). **No idea** where the suggestion actually pops up: a laptop window, a phone notification, or both.

**D. What it needs.** I'd install the small app on a Mac or Windows laptop. The watch/ring and the calendar are optional. It reads study time and breaks, app switches and "which kind of app", sleep (only with a watch), and my next class (only with the calendar). It never reads what I type, read or browse, my messages or screen, my location, or my watch's scores. · **sure on the laptop** (laptop frames 8–9). On my SE the "never reads" list didn't show up in any frame; frame 8 jumps straight to frame 9. Not stated anywhere: install size, where the data lives, how long it's kept.

**E. Joining.** Nothing happens. It says "Sign-up opens after the Nov 6 proposal" next to a placeholder link. All I know is that it's free, it's a small group, it's "this fall", and I can delete everything. How many weeks, how many minutes a day, what I'd install: **no idea** · frame 10.

**F. What it won't do or isn't.** It's not medical advice. It won't tell my coach, team or school. It won't read my typing, messages, screen or location. It won't guess during the first week. It asks once, and snooze actually snoozes. If my sleep is bad for weeks, it offers a person to talk to, in the morning only. · **sure** · frames 8–10 (the never-reads list was on the laptop only).

**G. Lost me.**
- Frame 1: "See every screen". Every screen of what?
- Frame 1: "Last night you slept · … · No watch". "No watch" isn't an amount of sleep. I read that row twice.
- Frames 2–5 (SE): the little 1/2/3 boxes inside the card. The key that explains them sits below the card, off-screen on my SE, so "before lab 3" read like a count.
- SE frame 6: "Your session · until Chem lab · 12:30 pm". On my SE the 4:30 label is missing, so I read it as lab at 12:30. That clashes with "lab at 4:30" one frame earlier.
- Laptop frame 4: "12:30" and "now 1:05" print on top of each other. Can't read either.
- Frame 5: "your next stretch went better in 5 of 7". Better how? Measured with what, if I have no watch?
- Frame 8: "which kind of app". Does that mean it knows I'm on TikTok?
- Frame 8: "It asks once, and snooze means snooze." Once per what? Read it twice.
- Frame 9: "Still learning your usual sleep · 4 of 7 nights". With no watch, does it ever learn sleep at all?
- Laptop frame 8: "Readiness or Recovery". No clue what those are.
- Frame 10: "Nov 6 proposal", "[Pilot sign-up link: coming]", "BINF 4070". That's class jargon, and the brackets make the page look broken.
- Frame 9: "someone to talk to". Who?

**H. Click moment.** Frame 7, "A small app on your Mac or Windows laptop". Before that I thought it was a phone app. Frame 5 is where I got that it works for me with no watch.

**I. Still asking.**
1. What does the pilot ask of me (weeks, minutes a day, install size), and when does sign-up actually open?
2. Where does the suggestion show up?
3. On a shared family laptop, whose study time is it counting? Does it slow the laptop down?
4. Without a watch, what am I missing? Does "still learning" ever end for me?
5. Where is my data stored, and for how long?
6. How does it know a break "helped"?
7. Who is the "someone"?

**J. Scores.** Problem 6 · What it does 8 · Joining 2. Did I understand everything? **No.** Joining is a dead end, the problem is implied and never said, and I don't know where the nudge lands.

**Part 2: Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 (=) |
| 5-second read | a break-timer website |
| Where I'd quit | Frame 10, the dead Join button |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.25, to my bus-commute study friend |
| P(I'd consent to the data it asks for) | 0.55. I'd refuse "which kind of app" until I know what that means |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | a phone timer `[my story]` |

**Since last time.** The page looks the same as my last landing test `[from memory]`, so the scores hold.
- No-watch path: still third chip, and the demo still opens on "About 5 h". ◐
- Say Windows: says "Mac or Windows", still no install size. ◐
- No wearable first: ⬜
- Shared laptop: never mentioned. ⬜
- Snooze visible: in the words but not on the demo buttons. ⬜
- Delete / stored / kept for: delete is there, the rest isn't. ◐
- Join on the SE first screen + what the pilot asks: ⬜ (the laptop has the button, my SE doesn't)
- Keep the app-switch reason in the no-watch card: frame 5 still drops it. ⬜
- Cut "See every screen" / fix the timeline collision: ⬜ both

1. **Run-through:** frame 1 🙂 says no watch needed · frames 2–4 😐 the numbered boxes confused me · frame 5 😀 "laptop and calendar only" · frame 6 😕 12:30/lab mix-up · frames 7–9 🙂 clear · frame 10 ❌ dead end.
2. **Brutal truth:** (1) Frame 10: Join goes nowhere and says nothing about what I'd commit to. (2) The page never says the problem. The headline is a slogan, not a reason. (3) On my SE the "never reads" list and the Join button weren't in any frame, and those are the two parts I care about most.
3. **What worked:** the frame 5 card. "No watch connected, so this uses your laptop and calendar only" is exactly what I needed to hear. "It never tells your coach, team or school." "Free."
4. **Trust and safety:** "went better in 5 of 7" sounds like real history from a demo, and the only "sample data" label is in the laptop footer. "Someone to talk to" is the right instinct, but it doesn't say who.
5. **Fix list:**
   1. Put Join plus one line on the SE first screen: weeks, minutes a day, MB to install, Windows OK. Make it lead to something real, even an "email me" form. *That changes whether I sign up at all.* You'd know it worked when SE testers can answer E.
   2. Start the demo on "No watch" and keep the app-switch reason in that card.
   3. Add one line in step 2 saying where the suggestion appears.

   **Cut:** "See every screen".

   **If you fix only one thing:** make Join on my phone real, and say what the pilot asks of me.
6. **What I'd want:** on the family laptop, at the kitchen table, after a closing shift, something that tells me to stop and sleep `[my story]`.
7. **Score line:**
`ICP_4 | 2026-11-05 | Landing page teach-back (iPhone SE + small laptop) | MEH | Clarity 7 · Trust 6 · Timing n/a · Useful 5 · Control 6 · Feel 7 · Come back 3 | overall 6 | week 0.25 · recommend 0.25 · consent 0.55 | one-fix: Real Join on the SE first screen that says what the pilot asks (weeks, minutes/day, install size)`

### ICP_5 · Sam Whitaker

**ICP_5 · Sam Whitaker**: I got what it does from the first black card. I still can't tell you what joining means or who the "someone to talk to" is.

Ledger read: `Wiki/Cognitive Perf Agent Wiki/03-users/personas/icp-5-sam-whitaker.md`. It already has a landing-page review from today. Every open ask from that review looks the same in these frames, so I think this is the same build. Everything below comes from frames 01 to 10 unless it's tagged otherwise.

**Part 1: Teach-back**

**A. Text to a friend.** "it's a class project. an app on your laptop clocks how long you've been studying and how much you're flipping between apps, adds your sleep if you wear a ring, and tells you when to take a walk or a break. they want testers." · **sure** · frames 1, 7

**B. The problem.** People study for hours without stopping, get scattered and tired, and push on anyway, especially after a short night. It's a student's problem, and the page also says athletes. · **guessing** · frame 1. The page never says what goes wrong if you don't stop. It gives me a slogan ("needs a halftime") and leaves me to fill in the problem myself.

**C. What it does.** (1) The laptop app counts study time, breaks and app switches. (2) A watch or ring adds how long I slept. (3) The calendar adds when my next class is. (4) It shows a card saying keep going, take a 5-minute walk, or take a 15-minute break. Each reason is numbered to where it came from, and it says how sure it is. (5) I pick, or snooze. If I take the break, it pauses my study clock and tells me when to be back. · **sure** · frames 1–8. Where the card shows up (laptop pop-up? phone?) · **no idea** · nowhere.

**D. What it needs.** I'd install a small app on my Mac or Windows laptop. Connecting a ring or watch is optional, and so is turning on the calendar. It reads my study time and breaks, how often I switch apps and what kind of app, how long I slept, and my next class. · **sure** · frame 8. It doesn't read my messages or screen, my location, or my ring's own scores like Readiness · **guessing** · frame 9. The heading of that dash list fell between frames 8 and 9, so I'm assuming the dashes mean "never".

**E. Joining.** Nothing happens today. Sign-up opens "after the Nov 6 proposal", and the link is a placeholder. It's free, works without a watch, and I can delete everything. How long it lasts, how much effort it takes, who's eligible and who sees my data · **no idea** · frame 10.

**F. What it won't do or isn't.** It won't read the things in that list. It never tells my coach, team or school. It asks once, and a snooze sticks. For the first week it says it's still learning instead of guessing. It isn't medical advice. It's a student project, and the page uses sample data. · **sure** · frames 8–10

**G. Lost me**
- "See every screen" (f1): whose screens? Every screen of what?
- The little boxes "3", "1", "2" inside the card (f1). They look like footnotes, but nothing explains them until the legend below the card (f3, f6).
- "No watch" as an answer to "Last night you slept" (f1, f5). On first read I took it as "I didn't sleep."
- "In 4 of your last 6 afternoons like this, a walk helped." (f2). My afternoons? I've never used it. It's only labelled as a sample below the card (f6) and in the footer (f10).
- "Most of your sessions run past an hour like this." (f4). I read it twice. Is that the reason to keep going?
- "which kind of app" (f8): does it see that I'm in Word, and what I'm writing?
- "Your call. Next check 3:30." (f8): does it check on me every 20 minutes?
- "Back by 4:25." with lab at 4:30 (f6): come back to study for five minutes?
- "class pilot", "classmates", "BINF 4070", "Nov 6 proposal" (f9–10): I'm not in that class. Am I allowed in?
- "[Pilot sign-up link: coming]" (f10) looks like a note somebody forgot to delete.
- "offers someone to talk to" (f9): who?

**H. Click moment.** Frame 1, the black "Short walk now?" card with "2 h 40 min · 14 app switches · slept 5 h". The headline alone didn't get me there.

**I. Still asking**
1. Who is the "someone to talk to"? Campus counseling, a doctor, a hotline? Named how?
2. Does it do anything at night? I write from 11 pm to 2 am `[my story]`. Every example on the page is an afternoon before Chem lab.
3. Can a non-classmate join? What would I do, for how long, who sees my data, and how long is it kept?
4. Where does the card appear?
5. How much does "which kind of app" see?
6. On a thesis day with nothing on the calendar, what does it go by?

**J. Scores.** Problem 6 · What it does 9 · What joining involves 2. Did I understand everything? **No.** Joining is a blank, and the person it would point me to has no name.

**Part 2: Review card**

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | A study-break timer for students |
| Where I'd quit | Frame 10: Join leads to "[Pilot sign-up link: coming]" |
| P(still running in a week) | 0.35 |
| P(I'd recommend it) | 0.25, to my roommate who studies in long blocks |
| P(I'd consent) | 0.60. I'd refuse "which kind of app" until I know what it sees |
| If it vanished | not disappointed |
| Instead | My Oura app, and my sister |

**Since last time** (landing review, earlier today)
- Real counseling name and number: **not fixed** (6th time; f9 still says "someone")
- Night "stop for tonight?" version: **can't tell** here, but the page never mentions nights
- Say what the study is, how long data is kept, how to opt out: **partly** ("delete everything"; nothing on how long it's kept or who sees it)
- Working Join link with what joining involves: **not fixed** (f10)
- Join higher on phones: **not fixed** (no Join in f1)
- Sample labelled above the card: **not fixed** (only under it, f6)
- "No watch" isn't an answer to the sleep question: **not fixed** (f1, f5)
- HRV gone, ring scores under "never reads": **still fixed** (f9)

**Run-through**
- f1–2 (got it): the card makes the idea clear in seconds.
- f3 (fine): "Not sure yet… closer call" is honest.
- f4 (confused): the "past an hour" line.
- f5–6 (fine): "No watch connected, so this uses your laptop and calendar only" is plain and honest.
- f7–8 (good): three steps, and the list of what it reads is clear.
- f9 (relieved, then let down): "never tells your coach, team or school" is good, but "someone" has no name.
- f10 (would quit): a placeholder where Join should be.

**Brutal truth**
1. f10: the only thing the page asks me to do leads nowhere, and I can't tell if I'm eligible.
2. f9: "someone to talk to" with no name, for the sixth time. That's the one line meant for me.
3. Every example is an afternoon before lab. My bad hours are at night, and the page never touches them.

**What worked.** The f1 card. "Your watch's own scores, like Readiness" under what it doesn't read (f9). "It never tells your coach, team or school." No grades, no scores.

**Trust and safety.** Nothing sounded like a diagnosis. "your last 6 afternoons" is written as if it were my data before I've used it. The escalation promise has nothing behind it yet.

**Fix list**
1. Make Join open something real that says weeks, minutes a day, who's eligible, who sees the data and how long it's kept. I'd know whether to sign up. You'd know it worked if testers can say what joining involves.
2. Name the person: "Columbia Counseling and Psychological Services, [number]". That's the line that would make me trust it. You'd know it worked if I could say who it points me to.
3. Show one late-night example. Then I'd see myself in it.

Cut: the "See every screen" link on phones.

**If you fix only one thing:** make Join real and say what it costs me.

`ICP_5 | 2026-11-05 | Landing page teach-back + two-tap demo + pilot ask (iPhone) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 4 · Control 7 · Feel 8 · Come back 4 | overall 6 | week 0.35 · recommend 0.25 · consent 0.60 | one-fix: Join opens a real sign-up that says weeks, effort, eligibility, who sees data`

Scores are unchanged because nothing I'd asked for had changed in these frames.

## Related

- [[25-journal/2026-11-05-icp-landing|ICP test: the landing page (morning)]] · [[25-journal/2026-11-05-boardroom-privacy-blanks|Boardroom: privacy blanks]] · [[03-users/personas/icp-personas|ICP Personas]] · [[25-journal/25-journal|Journal hub]]
