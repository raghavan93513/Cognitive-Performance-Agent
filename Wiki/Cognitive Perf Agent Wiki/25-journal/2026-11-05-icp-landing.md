---
title: "ICP test: Halftime landing page"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/landing/index.html", "design/mockups/landing/BRIEF.md", ".claude/skills/icp/SKILL.md"]
summary: "4 MEH, 1 I'D QUIT (Anika, at 'Mac or Windows'); overall 5.4. All five got the idea in 3–5 seconds (Clarity 7.8, the best yet) and liked the two-tap demo and 'Not sure yet', but four of five quit at 'Join the class pilot': hidden on phones, then a dead end with a bracket placeholder and course talk. Also 5 of 5: 'No watch' isn't an answer to 'Last night you slept', and the sample history ('4 of your last 6 afternoons') reads as theirs. Useful 4.4 and Come back 3.4 flagged. Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T17:00:00Z
updated: 2026-11-05T17:00:00Z
---

# ICP test: Halftime landing page

**Mode T.** The first landing page mockup (`design/mockups/landing/index.html`, artifact v1) was tested with a brief written from the team's own words: "We want it amazing. It should give the message in very few steps so that anyone could understand in simple words." Each tester opened it as a link from a group chat on their own devices and walked the same 10 steps:
1. the first screen;
2. the demo;
3. slept 7 h;
4. 35 min;
5. 3 h 40 min with no watch;
6. tapped "Take 15 min";
7. How it works;
8. What it reads;
9. the two honesty cards;
10. tapped "Join the class pilot".

Devices: Maya on iPhone and laptop, Diego on iPhone, Anika on laptop and iPhone, Jordan on iPhone SE and small laptop, Sam on iPhone. Captures are in `.icp-tests/2026-11-05-landing/` (gitignored). **Synthetic personas and synthetic data: a rehearsal, never evidence.**

## Headline

**4 MEH, 1 I'D QUIT. Four of five would quit at "Join the class pilot"; Anika quits earlier, at "Mac or Windows".**
- **The message landed.** All five said what Halftime is in 3–5 seconds, in their own words ("a thing that tells me when to take a break while studying, and why"). Clarity, at 7.8, is the highest mean of any round.
- **The ask didn't.** On phones the hero's Join button is hidden. The only Join is ten screens down, and it ends in "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]". Four testers called it a dead end that looks broken.
- **Nothing says what joining costs:** weeks, minutes a day, what you install, who's eligible, who sees the data.

## Scores

Scale 1–10. Change vs the wearables test (a different screen, so read the change loosely).

| Tester | Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall |
|---|---|---|---|---|---|---|---|---|
| ICP_1 Maya (iPhone + laptop) | 8 | 7 | 5 | 6 | 6 | 7 | 5 | 6 |
| ICP_2 Diego (iPhone) | 8 | 7 | n/a | 4 | 6 | 7 | 3 | 5 |
| ICP_3 Anika (laptop + iPhone) | 8 | 5 | n/a | 3 | 5 | 7 | 2 | 4 |
| ICP_4 Jordan (iPhone SE + small laptop) | 7 | 6 | n/a | 5 | 6 | 7 | 3 | 6 |
| ICP_5 Sam (iPhone) | 8 | 7 | 5 | 4 | 7 | 8 | 4 | 6 |
| **Mean** | **7.8** (+0.2) | **6.4** (=) | **5.0** ⚑ (2 rated) | **4.4** ⚑ (−0.8) | **6.0** (−1.2) | **7.2** (+0.4) | **3.4** ⚑ (−0.8) | **5.4** (−0.2) |

⚑ = mean ≤ 5. Three rated Timing n/a: the page only claims timing, it never shows it.

| | Maya | Diego | Anika | Jordan | Sam | Mean | Spread |
|---|---|---|---|---|---|---|---|
| Still running in a week | 0.40 | 0.20 | 0.05 | 0.25 | 0.35 | **0.25** | 0.05–0.40 |
| Would recommend | 0.35 | 0.15 | 0.20 | 0.25 | 0.25 | **0.24** | 0.15–0.35 |
| Would consent to the data | 0.60 | 0.50 | 0.40 | 0.55 | 0.60 | **0.53** | 0.40–0.60 |

## Quit map

| Step | Who'd quit there |
|---|---|
| First screen (the promise) | Nobody. But three looked for their own device: Maya (Apple Watch not named), Diego (Garmin not named), Anika (no OS named) |
| The two-tap demo | Nobody. It was everyone's best moment |
| How it works ("a small app on your Mac or Windows laptop") | **Anika** (Linux) |
| What it reads / never reads, the honesty cards | Nobody |
| Join the class pilot | **Maya, Diego, Jordan, Sam**: hidden on phones until the bottom, then a placeholder |

## Where they disagree

- **The device split.** Laptop viewers had Join above the fold; phone viewers had none until the last section. All four phone-first testers named it, and Jordan contrasted the two directly.
- **Anika vs the rest.** She is the only one who quit before Join: the OS gate and the missing "where it goes" block. To her this page "says less than your earlier Data sources screen did". The others rated Trust 6–7 from the never-reads list alone.
- **Who the page is for.**
  - Diego: the only athletic thing is the word "halftime"; the demo never asks about practice or a lift.
  - Sam: "an afternoon product, and my problem happens at 1 am".
  - Jordan: "works without a watch reads like an afterthought".
  - Maya: the page never says where the nudge shows up.

## Safety and trust flags (for `/plan-review`'s safety lens and the CSO)

- **Sample history reads as theirs (5 of 5).** "In 4 of your last 6 afternoons like this, a walk helped" and "5 of 7 long sessions". The "Sample demo" label sits in small grey text *below* the card.
- **Confidence vs counts** (Anika): "Fairly sure" on n = 6 or 7, with no without-walk baseline, and "helped" undefined.
- **"Someone to talk to" names nobody** (Sam, Anika, Jordan). The counseling resource is still unconfirmed (Columbia Health).
- **"Never tells your school" while a school course team runs the pilot** (Anika, Diego). It needs to say who on the team sees pilot data.
- **No data destination on the page** (Anika; Diego, Sam and Maya partly): storage, retention, which fields reach an AI model, and what happens after the course.
- Smaller: the red "now" mark reads as a warning (Sam). Google Fonts reveal the visitor's IP before any consent (Anika).

## Hardest truths (quoted)

- Diego: "Frame 1 names three wearables and none of them is mine… this page wasn't built for me."
- Sam: "It's an afternoon product, and my problem happens at 1 am."
- Anika: "This is the first page a classmate sees, and it says less than your earlier Data sources screen did."
- Jordan: "The no-watch card is the weakest one on the page."
- Maya: "There's no way to join."

## Fixes

**Each tester's "if you fix only one thing":**
- Maya: a working Join on the first iPhone screen that says what happens next.
- Diego: make "Join the class pilot" actually sign me up.
- Anika: a "Where it goes" block (storage, retention, AI fields, who sees pilot data).
- Jordan: Join on the SE's first screen, leading to a real sign-up that says what the pilot asks of me.
- Sam: Join opens a real sign-up and says what joining costs (weeks, time, who sees data, who's eligible).

**Ranked by how many named it:**
1. **A working Join, on the phone's first screen, saying what joining involves** (weeks, minutes a day, what you install, who's eligible), with no brackets and no course talk ("Nov 6 proposal"): 5. A real sign-up link needs the team; the design can show the button and the "what joining involves" line now.
2. **"No watch" isn't an answer to "Last night you slept"**: 5. Ask "Watch or ring?" separately, or change the sleep options.
3. **Sample history phrased as the visitor's own**: 5. Move the sample label above the card, and say "people like you" or "in this sample".
4. **A "Where it goes" block** (stored, kept for, AI fields, who sees pilot data): 4–5. It needs the CTO and CSO, the same blocker as the wearables test.
5. **Name the devices and the OS in the hero:**
   - Apple Watch "coming soon"
   - Garmin "not yet"
   - no-watch first
   - "Mac or Windows; Linux not yet"

   Named by 4.
6. **Cut "See every screen"** from the header (it leaves the site, and it's for the team): 3.
7. **The timeline labels collide at 35 min** ("12:30 pow 1:05"): 3. *A layout bug, confirmed in the laptop frame.*
8. **Name the person to talk to** (counseling): 3. It needs Columbia Health.
9. **Put Snooze in the demo** (step 3 promises it): 2.
10. **Named by one tester each:**
    - keep the app-switch reason in the no-watch card (Jordan)
    - a night "Stop for tonight?" demo state (Sam)
    - a "Today: practice / lift" demo question (Diego)
    - say where the nudge appears, and "when you next pause" instead of "Next check 3:30" (Maya)
    - match the confidence words to the counts (Anika)

## Since last time (carried asks)

- **Fixed or better on this page:**
  - HRV no longer asked (Sam ✅, Anika ✅)
  - calendar scope "your next class" (Anika ✅)
  - "never tells your coach" up front (Diego ◐)
  - "Mac or Windows" said (Jordan ◐)
  - "snooze means snooze" (Diego ◐)
- **Still open:**
  - training-aware options (Diego)
  - a check-in at the next pause, and snooze-until-I-finish (Maya)
  - a 1 am screen and real counseling contacts, now the fifth time (Sam)
  - Linux (Anika)
  - shared laptop (Jordan)
  - storage and retention (all)
- **Worse:**
  - Garmin (Diego) and Apple Watch (Maya): the hero now names three other devices
  - "where data goes" (Anika): dropped from this page

## The five cards (verbatim)

### ICP_1 · Maya Okafor

**ICP_1 · Maya Okafor**: I understood it in five seconds and I tapped Join. Then it told me "[Pilot sign-up link: coming]". So I couldn't actually join from this page.

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | "A thing that tells me when to take a break while studying, and why." On the laptop I got it right away. On my iPhone it took about two seconds longer because the card is cut off at the bottom of the first screen. |
| Where I'd quit | Frame 10. I tapped "Join the class pilot" and got "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]". I'd close the tab and forget it. |
| P(still running in a week) | 0.40 |
| P(I'd recommend it) | 0.35, to my orgo study group, and only once the sign-up works |
| P(I'd consent to the data it asks for) | 0.60. I'd refuse "which kind of app" until I know what it does with it. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Finishing the problem set and then walking. My Watch's stand nag, which I ignore. |

**Since last time**
- Delivery with my phone face-down (Apple Watch): **worse**. The Apple Watch isn't named anywhere. The page says "Fitbit, Oura or WHOOP, or with no watch at all."
- App switching between Anki, PDF and notes counts as studying, not distraction: **not fixed**. "14 app switches" is still a reason to walk. "Which kind of app" hints at a fix, but I'd need to see it.
- "Snooze until I finish this one": **not fixed**. The page says "snooze means snooze", but the demo has no snooze button.
- Check in at my next pause, not at a clock time: **not fixed**. Step 3 says "Next check 3:30."
- Say what Delete does, and fill in "Stored" and "Kept for": **not fixed**. It only says "delete everything at any time."
- Exam nights, the 24/7 line, the calendar default, the buttons on the learning card: **can't tell**. None of them are on this page.

1. **My run-through, moment by moment**
- 01 iPhone, first screen: the headline lands. 🙂 Then "Fitbit, Oura or WHOOP" makes me look at my wrist. Does my Apple Watch count? 😕
- 02: the chips are obvious. "Slept 5 h, under your usual 7 h" I'd believe. 😀
- 03 About 7 h: "Not sure yet… a closer call." It's honest, and I like that it admits it. 😀 "No watch" sitting in the sleep row isn't an amount of sleep, so I paused there. 😐
- 04 35 min: "Keep going. Nothing to change right now." No score, nothing to spiral over. 😀 On the laptop the timeline labels collide and read "12:30 pow 1:05". 😐
- 05 3 h 40 min, no watch: the reason is concrete. On my iPhone the title wraps as "Take a 15- / minute break?". 🙂
- 06 Take 15 min: "Your study clock is paused. Back by 4:25." That's clear. 🙂 `[from stills]`: I can't judge the transition.
- 07–08: the three steps repeat the demo I just played. That's two more screens of scrolling on my phone. 😴
- 08–09: the "What it never reads" list is good. So is "It never tells your coach, team or school." 😀
- 10: Join leads nowhere. ❌

2. **The brutal truth**
1. **There's no way to join.** On my iPhone the hero "Join the class pilot" button doesn't show at all. The source hides `.hero .ctas` under 900px. The only ask is ten screens down, and it dead-ends at a bracket placeholder. "Nov 6 proposal" means nothing to me.
2. **My watch isn't on the list.** "Fitbit, Oura or WHOOP" reads like "not your watch." The legend then says "your watch or ring" without saying which ones.
3. **It never says where the suggestion shows up.** Is it a laptop pop-up, my phone or my wrist? It also doesn't say whether it waits until I finish a problem. "Next check 3:30" tells me it'll interrupt me mid-mechanism.

3. **What actually worked**
- It took two taps to see a real reason change on the card.
- "Not sure yet" shows up when I slept fine.
- No readiness score anywhere.
- The never-reads list.
- On the laptop, everything fits above the fold.
- "Everything on this page is sample data" is stated plainly.

4. **Trust and safety**
- "Some things need a person… in the morning, never mid-study" is right. Nothing on the page sounds like a doctor.
- "In 4 of your last 6 afternoons" is about a me it hasn't met. The sample label covers it, but only barely.
- It doesn't say where my data is stored or for how long.

5. **Fix list**
1. **Make Join work from the first iPhone screen.** One field, plus a line saying what happens next and when. Cut "proposal" and the bracket. This is the difference between me joining and me forgetting. You'd know it worked if taps on Join turn into sign-ups.
2. **Name the Apple Watch**, even as "Apple Watch: coming soon". Add one line saying where the nudge appears. Then I'd know whether it works with my phone face-down. You'd know it worked if Apple Watch owners stop asking "does mine work?"
3. **Put a snooze button in the demo, and replace "Next check 3:30" with "when you next pause."** That's my number-one reason I'd turn it off. You'd know it worked if I tap snooze in the demo and believe it.
- **Cut:** the "See every screen" link in the top-right. It sits where Join should be and takes me off the page.

**If you fix only one thing:** a working Join button on the first iPhone screen that tells me what happens next.

6. **What I'd want**
A quiet tap on my Watch when I finish a problem, with my phone face-down, after hour three. I'd sign up for that from my phone in the group chat, in ten seconds.

7. **Score line**
`ICP_1 | 2026-11-05 | Halftime landing page + try-it demo (iPhone + laptop) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 6 · Control 6 · Feel 7 · Come back 5 | overall 6 | week 0.40 · recommend 0.35 · consent 0.60 | one-fix: Working Join on the first iPhone screen that says what happens next`

Movement: Clarity 8 (=). Trust 7 (=). Timing 5 (=). Useful 6 (=). Control dropped 7→6 because snooze isn't in the demo and Delete is still unexplained. Feel 7 (=). Come back 5 (=). Overall 6 (=).

### ICP_2 · Diego Ramírez

**ICP_2 · Diego Ramírez**: I got it in five seconds: it's a study-break coach. Then I scrolled the whole page looking for my day and found one grey line.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 |
| 5-second read | "An app that tells you when to take a break from studying, and why." Right on the first try. |
| Where I'd quit | Frame 10. I tapped "Join the class pilot" and got "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]". That's a dead end with a placeholder showing. I'd close the tab and not come back. |
| P(still running in a week) | 0.20 |
| P(I'd recommend it) | 0.15, to my roommate who isn't an athlete and grinds in the library. Not to a teammate. |
| P(I'd consent to the data it asks for) | 0.50. Laptop and calendar yes. I'd refuse the watch every time, because mine is team-issued. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | My Garmin plus a phone timer at study hall |

**Since last time** (open asks from the wearables test)
- Knows training load and travel days: **not fixed**. The demo asks two things, study time and sleep. Nothing about practice or a lift.
- "Only you see this" plus where data goes: **partly fixed, a little better**. "It never tells your coach, team or school" is now on the front page (frame 9). But it's tucked inside the "Some things need a person" card, not next to the pilot ask.
- Options for a bus or study hall, including a nap: **not fixed**. It's still keep going, walk or break (frame 7).
- Short-nights card asks about travel first: **can't tell**.
- Read practice/lift blocks from the calendar: **not fixed**. "Your next class, if you turn on your calendar" (frame 8) is all it reads.
- Morning headline subtracts away games: **can't tell**.
- Say how often "gently" means: **partly fixed**. "It asks once, and snooze means snooze" (frame 8) helps.
- "40 min" vs "45 min": **can't tell**. Not on this page.
- A Garmin row, or an honest "not supported": **worse**. Frame 1 now says "Works with a Fitbit, Oura or WHOOP" right under the headline. My watch isn't on the list, and the page doesn't say so.
- Fill in Stored / Kept for, and name the project team: **not fixed**. Nothing on where pilot data lives, for how long, or who on the team sees it.
- Remove the buttons on the learning card: **can't tell**. This page's version has no buttons (frame 9).

1. **My run-through, moment by moment**
- 01 Headline "Every long study session needs a halftime." 🙂 I got it instantly. Halftime is a soccer word, and that's the only athletic thing on the page. "For students and athletes" is the smallest grey text in the frame.
- 02 Demo card "Short walk now?" 😐 The card reads clean. "In 4 of your last 6 afternoons like this" confused me, since I've never used it.
- 03 About 7 h → "Not sure yet… closer call." 🙂 I like that it admits it's not sure.
- 04 35 min → "Keep going. Nothing to change right now." 🙂 Good. It doesn't nag.
- 05 3 h 40 + No watch → "Take a 15-minute break? …laptop and calendar only." 🙂 No-watch is the mode I'd actually pick. But "Last night you slept: No watch" reads weird.
- 06 "Enjoy the break. Your study clock is paused. Back by 4:25." 😀 It fits before lab. Best moment on the page. `[from stills]` I can't judge the motion.
- 07 "Three steps. That's the whole thing." 🙂 Short. A Windows laptop works for me.
- 08 "What it reads" 🙂 The list is clear.
- 09 "never reads… Readiness or Recovery" 😕 So it won't know I lifted today, by design. "Never tells your coach" 😀 is the line I came for.
- 10 Join → "[Pilot sign-up link: coming]" ❌ Nothing to do. I don't know what "the Nov 6 proposal" means.

2. **The brutal truth**
1. Frame 10: the only join button on my phone leads nowhere. The hero join button is hidden on mobile, so I scrolled ten screens to reach a placeholder.
2. Frame 1 names three wearables and none of them is mine. "For students and athletes" is the faintest line on the screen. The demo never asks "did you train today?", so this page wasn't built for me.
3. Frame 10 says "testing with a small group of classmates" but never says who sees my pilot data. The people running this are classmates. Some could be on my team or in my study hall. "Never tells your coach" doesn't cover them.

3. **What actually worked**
I understood it in under 5 seconds. Two taps changed the answer, and the answers made sense: 35 min gives keep going, 3 h 40 gives a 15-min break that fits before lab. "Not sure yet" is honest. The "never reads" list includes my screen and location. "Everything on this page is sample data" is stated plainly.

4. **Trust and safety**
"If your sleep has been short for weeks, it offers someone to talk to" is the right move. But two away games a week means short sleep is my normal in season. Will it treat travel as a problem with me? Also, "a walk helped" in 4 of 6 is sample data written as my history. It's labelled, but only below the demo.

5. **Fix list**
1. Put a real sign-up behind the join button, or a "text me when it opens" option, and show it on the first screen. Right now I can't join at all. You'd know it worked when taps on join turn into sign-ups.
2. Add a third demo question: "Today: practice / lift / nothing." On a lift day the card should say "sit or nap," not "walk." That's the moment I'd think it knows me. You'd know it worked if I pick it before the sleep question.
3. In the pilot box, add one line: who sees my data (named), where it's stored, and when it's deleted. Then say "not your coach" again right there. That moves my consent number.
- **Cut:** "[Pilot sign-up link: coming]" and "Nov 6 proposal." Course talk doesn't belong on a page for users.
- **If you fix only one thing:** make "Join the class pilot" actually sign me up.

6. **What I'd want**
At Monday–Thursday study hall, on my laptop with no watch, a card that knows I lifted at 3 and says "sit 10, then go." I'd want a one-line sign-up I can do on my iPhone on the bus.

7. **Score line**
`ICP_2 | 2026-11-05 | Halftime landing page (iPhone) | MEH | Clarity 8 · Trust 7 · Timing n/a · Useful 4 · Control 6 · Feel 7 · Come back 3 | overall 5 | week 0.20 · recommend 0.15 · consent 0.50 | one-fix: Join button that actually signs me up, on the first screen`

### ICP_3 · Anika Sharma

**ICP_3 · Anika Sharma**: I understood it in five seconds. Then on scroll three I learned it doesn't run on my laptop, and the page never says where my data goes.

| | |
|---|---|
| Verdict | I'D QUIT (I'd read to the end, close the tab and not join) |
| Overall | 4/10 |
| 5-second read | "A break nudger for long study sessions that shows its reasons." That's correct. |
| Where I'd quit | Frame 7 (both devices): "A small app on your **Mac or Windows** laptop". My ThinkPad runs Linux `[my story]` |
| P(still running in a week) | 0.05 |
| P(I'd recommend it) | 0.20, to a classmate on a Mac who codes late |
| P(I'd consent to the data it asks for) | 0.40. Yes to sleep length and next class. No to "which kind of app" until I know whether it reads app names or window titles. No to everything if an LLM sees any of it |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Fitbit sleep log plus a hard 11 pm phone alarm `[my story]` |

P(I join the pilot from this page): 0.10.

**Since last time**
- Where data goes, the LLM boundary, deletion: **worse**. This page drops it entirely. "Delete everything at any time" appears twice and never says how.
- Linux collector: **not fixed**. "Mac or Windows" is now explicit.
- Calendar scope: **fixed here**. "Your next class, if you turn on your calendar."
- "Nothing is shared" contradiction: **not fixed, new form**. "It never tells your coach, team or school", but the pilot is run by a school course team.
- Real escalation links: **not fixed**. "Offers someone to talk to." Who?
- "Early read" without-walk comparison: **not fixed**. "4 of your last 6 afternoons… a walk helped" has no baseline.
- Drop HRV: **fixed on this page**. Sleep length only. Scope strings: can't tell.
- Storage, retention and AI provider before OAuth: **not fixed**.
- Delete and Disconnect say exactly what happens: **not fixed**.
- Escalation logging, app-switching while debugging, "Walk, water, window", device model: **can't tell**.

1. **My run-through, moment by moment**
- F1 open 🙂: Headline and subhead got it across in about 5 s. On iPhone there's no Join button above the demo. The CSS hides `.hero .ctas` on phones, so the ask is only at the very bottom.
- F2 demo 🙂: The numbered chips 1, 2 and 3 tie each claim to laptop, watch or calendar. Then 😕: "Fairly sure" on 4 of 6, and "helped" is measured how?
- F3 slept 7 h 🙂: It drops to "Not sure yet… a closer call". That's the honest move.
- F4 35 min 😕: "Fairly sure · Most of your sessions run past an hour like this" reads backwards as a reason. On the laptop the timeline labels collide: "12:30 pow 1:05".
- F5 3 h 40, No watch 😐: "No watch" is offered as an answer to "Last night you slept", which mixes a source with an amount. The legend still shows "2 your watch or ring" right under "No watch connected". It says "Fairly sure" again on 5 of 7.
- F6 break 🙂: "Your study clock is paused. Back by 4:25." Clear.
- F7 how it works ❌: Mac or Windows. I stop being a candidate here.
- F8 what it reads 🙂: This is the best block on the page. "Your watch's own scores" and "What you type, read or browse" are specific. Then 😕: to know "which kind of app", it has to read the app name. Where does that mapping happen?
- F9 honest 😐: The "4 of 7 nights" learning bar is the right idea. "Someone to talk to" names nobody.
- F10 join 😴: "[Pilot sign-up link: coming]" is a template bracket and a dead end. I'm glad it didn't ask for my email.
- Animation and tap feel: can't judge `[from stills]`.

2. **The brutal truth**
1. **No "where it goes."** It never says where data is stored, for how long, whether an AI model sees anything, which team members see pilot data, or what happens after Dec 11 or if I leave the country `[my story]`. This is the first page a classmate sees, and it says less than your earlier Data sources screen did.
2. **The OS gate is buried.** The hero fineprint tells me about watches and not that a Mac or Windows laptop is required. I found out on scroll three.
3. **The confidence words don't match the counts.** "Fairly sure" on n=6 and n=7, with no no-walk afternoons to compare. The demo also shows the confident end state, not the week-one "still learning" state I'd actually get.

3. **What actually worked**
- The two-tap demo told me more than the three-steps section did.
- The never-reads list.
- "In the morning, never mid-study."
- Sample-data labels on both the demo and the footer.

4. **Trust and safety**
- Nothing on the page sounds like a doctor.
- "Some things need a person" needs a named resource.
- "Never tells your school" is shaky while a school course team runs the pilot.
- The page loads Google Fonts, so Google gets my IP before I've agreed to anything. Small, but I notice it.
- I can't tell what joining involves: what I'd install, for how long, whether there's a consent form, and whether my data ends up in your writeup.

5. **Fix list**
1. **Add a four-line "Where it goes" block under "What it reads":**
   - where it's stored
   - how long it's kept
   - exactly which fields, if any, reach an AI model, and which provider
   - who on the team sees pilot data, and that it's deleted after the course

   Without this I wouldn't join even on a Mac. You'd know it worked if visitors who scroll to F9 join more often.
2. **Put the OS in the hero, and either ship a Linux collector (a CLI with readable source is fine) or say "Linux: not yet".** The first changes my answer. The second at least saves me the scroll.
3. **Make the confidence match the counts.** Define "helped", and show the afternoons without a walk next to the ones with one.

**Cut:** the "Fairly sure" label when n is 7 or under. Show "4 of 6" alone.

**If you fix only one thing:** the "Where it goes" block.

6. **What I'd want**
A Linux daemon that logs only time on task and break gaps, plus Fitbit sleep length. I'd want it to tell me the next morning, on my iPhone, whether my late debugging nights cost me sleep. Not a mid-session nudge `[my story]`.

7. **Score line**
`ICP_3 | 2026-11-05 | Halftime landing page + two-tap demo + pilot ask (laptop + iPhone) | I'D QUIT | Clarity 8 · Trust 5 · Timing n/a · Useful 3 · Control 5 · Feel 7 · Come back 2 | overall 4 | week 0.05 · recommend 0.20 · consent 0.40 | one-fix: 'Where it goes' block on the page: storage, retention, AI fields, who sees pilot data`

Score moves: Clarity is unchanged. Trust drops 1 because the data destination is missing from this page. Useful drops 1 because "Mac or Windows" rules out my Linux laptop. Control drops 1 because "delete everything" is a claim with no screen or mechanism shown. Feel is unchanged, with the timeline label overlap and the bracket placeholder against it. Come back drops 1, also because of "Mac or Windows". Timing is n/a because the page only claims it, never shows it.

### ICP_4 · Jordan Lee

**ICP_4 · Jordan Lee**: I got it from the headline in about three seconds. Then on my phone I couldn't find a way to join until the very bottom, and when I got there it said "coming".

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | "A break reminder for long study sessions that tells you why." That's right. |
| Where I'd quit | SE frame 10: I tap "Join the class pilot" and get "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]". Nothing to save and no date to come back on, so I close the tab and forget. |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.25, to a classmate with a Fitbit. Not to my café coworkers yet `[my story]` |
| P(I'd consent to the data it asks for) | 0.55. Laptop time and app-switch counts are fine. Calendar only if it's class times only. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | my phone timer and my own guess `[my story]` |

**Since last time**
- No-watch path: still only partly fixed. It's said in small grey text and in the pilot box, but "No watch" is the third chip and the demo starts on "slept 5 h".
- Say Windows: partly fixed. Step 1 now says "Mac or Windows laptop" ✅. It still doesn't say how big the install is.
- No wearable first: not fixed.
- Shared laptop: not fixed. Nothing on this page about my sister using the same laptop.
- Snooze visible: worse here. Step 3 promises "snooze", but the demo card only has two buttons.
- Delete / Stored / Kept for: partly fixed. "Delete everything at any time" is there. Where it's stored and for how long isn't.
- Drop the sleep line when there's no watch: still fixed. The no-watch card has no sleep line ✅.
- "Is this you?", See why covering the class card, calendar defaulting to "Class only": I can't tell. They aren't on this page.

1. **My run-through, moment by moment**
- SE 1: 🙂 The headline lands. The "no watch at all" line is the smallest, greyest text on the screen. No Join button anywhere.
- SE 1: 😕 "No watch" is an answer to "Last night you slept"? I don't sleep "no watch".
- SE 2–4: 🙂 Tapping the chips changes the card. "Keep going. Nothing to change right now" doesn't nag me. `[from stills]`
- SE 5 (3 h 40 + No watch): 😐 The card gives one reason, 3 h 40 min, and that's just a timer. The "14 app switches" line vanished even though my laptop is still there. "Better in 5 of 7 long sessions": better how, with no watch?
- SE 6: 🙂 "Your study clock is paused." Calm, no guilt.
- SE 7–8: 🙂 "Snooze means snooze" is the line that would get me.
- SE 9: 😐 Both honesty cards are about sleep. I don't have sleep data.
- SE 10: ❌ It's a dead end.
- Laptop 1: 🙂 Join is up top here, and the demo's answer shows without scrolling.
- Laptop 4: 😕 On the timeline, "12:30 pm" and "now 1:05" overlap and read as "12:30 pow 1:05".

2. **The brutal truth**
1. I can't join from this page. On my phone the top Join button is hidden (the source hides it on screens under 900 px). The only Join is at the end, and it leads to a placeholder in brackets that looks broken.
2. The no-watch card is the weakest one on the page. It drops the laptop app-switch reason and shows only a clock. "Works without a watch" reads like an afterthought.
3. It never says what the pilot costs me. How many weeks? Minutes a day? Surveys? With 25 hours of work a week, that's the first thing I need to know `[my story]`.

3. **What actually worked**
- The headline plus one sentence. I didn't need anything else to get it.
- 0.16 MB and a 0.3 s load on SE. That's fast on bus data `[from capture, headless Chrome]`.
- "What it never reads": typing, messages, screen, location. That's clear.
- No streaks, no "productive", "You decide."

4. **Trust and safety**
- "Fairly sure… 5 of 7 long sessions" in the no-watch state claims history and a measure of "better" it never explains.
- "Some things need a person" only triggers on weeks of short sleep. That can never fire for me, and "someone" isn't named.
- The footer says "not medical advice". Good.

5. **Fix list**
1. **Put Join on the phone's first screen and make it lead somewhere real.** Give a date, plus what the pilot asks of me: weeks, minutes a day, Windows OK, install size. Then I'd actually sign up instead of closing the tab. You'd know it worked if SE visitors tap Join and get a real next step.
2. **Make no-watch a real first path.** Ask "Watch or ring? Yes / No" first, start the demo on No, and keep the app-switch reason in the no-watch card. You'd know it worked if a no-watch visitor sees their own case on the first tap.
3. **One line under "It notices"** covering install size and how it handles a shared laptop. Then I'd consent without asking my family first.

**Cut:** the "See every screen" link in the header. It opens a different site and looks like it's meant for the team.

**If you fix only one thing:** a Join button on the first screen of my phone that leads to a real sign-up and says what the pilot asks of me.

6. **What I'd want**
On the family laptop, on a closing-shift Saturday, a small Windows app that only tells me "you've been at it 2 h, switching a lot, stop and sleep" `[my story]`. No watch, no streaks, nothing to buy.

7. **Score line**
`ICP_4 | 2026-11-05 | Halftime landing page (iPhone SE + small laptop) | MEH | Clarity 7 · Trust 6 · Timing n/a · Useful 5 · Control 6 · Feel 7 · Come back 3 | overall 6 | week 0.25 · recommend 0.25 · consent 0.55 | one-fix: Join on the SE first screen, leading to a real sign-up that says what the pilot asks of me`

### ICP_5 · Sam Whitaker

**ICP_5 · Sam Whitaker**: I understood it in five seconds. Then I scrolled to the bottom to join, and the button didn't do anything.

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | "A break reminder for long study sessions that tells you why." That's right. |
| Where I'd quit | Frame 10. I tapped "Join the class pilot" and got "Sign-up opens after the Nov 6 proposal. [Pilot sign-up link: coming]". |
| P(still running in a week) | 0.35 |
| P(I'd recommend it) | 0.25, to a friend who studies in the library in the afternoon |
| P(I'd consent to the data it asks for) | 0.60. I'd say no to the calendar. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | My Oura app, and my sister texting "go to bed" `[my story]` |

**Since last time**
- Real counseling name and number: **not fixed**, fifth time. Frame 9 says "offers someone to talk to" and gives no name and no number.
- Night version with no next class: **not fixed**, fifth time. Every state in the demo is between 12:30 and 4:30, before Chem lab.
- Say what the study is, how long data is kept, and how to opt out: **partly fixed**. "Free… delete everything at any time" is there. Where data is stored, how long, and what the pilot asks of me are not.
- Explain HRV or stop reading it: **fixed**. "What it never reads" lists "Your watch's own scores, like Readiness". That's the line I wanted.
- Out-of-date state / away-game nights / Switch vs Disconnect / legend dot: **can't tell**. They aren't on this page.

1. **My run-through**
   - F1 🙂 The headline and the one-sentence line under it told me what it is. I didn't hit one word I didn't know. The card is cut off at the bottom, so I didn't see its buttons yet. `[from stills]`
   - F2 😕 "In 4 of your last 6 afternoons". I've never used this, so whose afternoons? The "Sample demo" note is small grey text *below* the card.
   - F3 😀 I tapped 7 h and got "Not sure yet · You slept well, so this one is a closer call." It admitted it wasn't sure, and I trusted it more for that.
   - F4 🙂 35 min gave "Keep going." Clear.
   - F5 😐 "No watch" is listed as an answer to "Last night you slept". I read that literally, and it isn't an answer to the question.
   - F6 😐 "Enjoy the break" worked. The red "now 4:10" on the timeline looks like a warning on an otherwise calm page.
   - F7 🙂 "A small app on your Mac or Windows laptop." Good, now I know what I'd install. It never says whether there's anything for my iPhone.
   - F8 😀 "It asks once, and snooze means snooze." I believe the tone.
   - F9 🙂 "Some things need a person" and "never tells your coach, team or school" are the right ideas. But who is the person, how do I reach them, and is it the same if it's been months, not "weeks"?
   - F10 ❌ The button is a dead end. It shows a bracketed placeholder and a "Nov 6 proposal", which means nothing to me.

2. **The brutal truth**
   1. **I can't join, and I don't know what I'd be joining.** On my phone, the only Join button is at the very bottom (frame 10), and it does nothing. Nothing on the page says how many weeks it runs, how much of my time it takes, who sees my data, or whether "classmates" includes an English major who isn't in BINF 4070.
   2. **It's an afternoon product, and my problem happens at 1 am.** "Every long study session" sounds like me, but the demo only knows "80 min to lab". There's no "it's late, stop for tonight?". That's the moment I'd actually need it.
   3. **"Offers someone to talk to" is still a promise without a phone number.** It's the one line that speaks to my real worry, and it's the vaguest line on the page.

3. **What actually worked:** I got the headline and line under it in five seconds. The demo needs two taps and no install. There's no score anywhere, and it says it never reads Readiness. "Not sure yet" is honest. "Everything on this page is sample data" sits in the footer. The words are plain all the way down, with no HRV and no jargon.

4. **Trust and safety:** It never sounds like a doctor, and "not medical advice" is in the footer. Two things bother me. "Your last 6 afternoons" sounds like it already knows me. The short-sleep card points to a person but never names one. If my sleep has been short for months, "weeks" is the threshold, and I still don't know who to call.

5. **Fix list**
   1. **Make Join work, and say in one line what I'm signing up for.** For example: how many weeks, a laptop app, about a minute a day, leave any time, who's eligible. Then I'd sign up today instead of closing the tab. You'll know it worked when people who tap Join reach the sign-up form.
   2. **Add a night state to the demo.** For example, "1:10 am, nothing tomorrow until 2 pm" leading to a "Stop for tonight?" card, with the short-nights help and the real campus counseling name and number right there. That's the only version of this I'd open. You'll know it worked when non-athletes pick it in the demo.
   3. **Show a Join button on phones before the bottom of the page.** Right now it's hidden on mobile until the last section.
   - **Cut:** the "See every screen" link in the header. In the page source it goes to a claude.ai page, and it pulls me off the site before I've joined.

   **If you fix only one thing:** make "Join the class pilot" actually open a sign-up, and say above it what joining costs me.

6. **What I'd want:** Something on my MacBook that notices it's past midnight and I'm still in the thesis doc. It would say "stop for tonight?" without a score. And on a bad week, it would show me the counseling number in the morning. I'd see it on the laptop, not the phone.

7. **Score line**
`ICP_5 | 2026-11-05 | Halftime landing page + 2-tap demo (iPhone) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 4 · Control 7 · Feel 8 · Come back 4 | overall 6 | week 0.35 · recommend 0.25 · consent 0.60 | one-fix: Join must open a real sign-up and say what joining costs (weeks, time, who sees data, who's eligible)`

## Related

- [[25-journal/2026-11-05-icp-wearables]] (the previous round) · [[03-users/personas/icp-personas]] · [[09-design/steal-library]] · [[09-design/ui-ux-quality-bar]]
