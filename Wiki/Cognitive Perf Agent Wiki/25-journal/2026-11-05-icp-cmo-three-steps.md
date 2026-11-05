---
title: "ICP + CMO review: the landing page's 'Three steps' section"
category: 25-journal
tags: [journal, users, icp, design]
sources: ["design/mockups/landing/index.html", ".icp-tests/2026-11-05-three-steps/", ".claude/skills/icp/SKILL.md", ".claude/agents/cmo.md"]
summary: "Clear but not amazing. All five testers explained the three steps accurately in their own words (Simple 7.8), but none found it memorable (Amazing 5.2): 5 MEH. The only line most would remember is 'snooze means snooze'. All five, and the CMO, caught step 3 contradicting itself ('It asks once' next to 'Next check 3:30'). Four testers and the CMO would cut 'That's the whole thing.' The CMO's verdict is 'not sufficient': the heading and titles never say study, walk or break, and four lines are unconfirmed. The CMO recommends option B, 'It keeps track while you study. You make the call.' Synthetic testers and an AI advisor: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T21:00:00Z
updated: 2026-11-05T21:00:00Z
---

# ICP + CMO review: "Three steps"

**The ask, from Heramb:** is the "Three steps. That's the whole thing." section enough to tell users what we do, in a simple, amazing way?

**Setup:**
- **Five ICPs** (Mode A review). They used fresh captures of landing v3 on their own devices (`.icp-tests/2026-11-05-three-steps/`, gitignored) and all got the same brief: a teach-back from the section only; whether it's enough; Simple and Amazing scores (0–10); what lost them; their own version of one line.
- **The CMO seat**, in parallel, without seeing the ICP results. It got the page, the brief, the copy rules and the boardroom record.

**Synthetic testers and an AI advisor: a rehearsal, never evidence.**

## The section as reviewed (v3)

> **Three steps. That's the whole thing.**
> **1. It notices.** A small app on your Mac or Windows laptop counts how long you've studied and how often you switch apps. If you wear a watch or ring, it reads how you slept. `2 h 40 min · 14 app switches · slept 5 h`
> **2. It suggests, and shows why.** A small black card opens at the top of your iPhone: keep going, a 5-minute walk, or a longer break. Every reason says where it came from and how sure Halftime is. `Short walk now? · Fairly sure`
> **3. You decide.** Walk, keep going, or snooze. It asks once, and snooze means snooze. `Your call. Next check 3:30.`

## Headline

**Clear, not amazing. Five MEH.**
- **It explains the product.** All five explained the steps accurately in their own words, and were sure: "I didn't have to copy the page's sentence". Simple averaged **7.8**.
- **Nobody would remember it.** Amazing averaged **5.2** ⚑. Three testers called "It notices / It suggests / You decide" the outline every app uses. The one line four of them would remember tomorrow is "snooze means snooze". Maya: "The demo card above is the memorable part, not this section."
- **Step 3 contradicts itself (5 of 5 testers, plus the CMO).** "It asks once" sits right above the chip "Your call. Next check 3:30." The chip is also wrong: in the demo, the keep-going reply says 3:35, and 3:30 is the snooze time.
- **The CMO's verdict: not sufficient.** The heading and the three titles, the only lines a phone reader skims, never say *study*, *walk* or *break*. Four lines are unconfirmed today.

## Scores

| Tester (device) | Simple | Amazing | Enough to explain it? | Enough for me? | Verdict |
|---|---|---|---|---|---|
| ICP_1 Maya (iPhone + laptop) | 7 | 5 | Yes, mostly | No: when it asks, what I install | MEH |
| ICP_2 Diego (iPhone) | 8 | 5 | Yes | No: Garmin, phone study, sit or nap | MEH |
| ICP_3 Anika (laptop + iPhone) | 8 | 5 | Yes | No: AI, hit rate, Linux | MEH |
| ICP_4 Jordan (iPhone SE + small laptop) | 8 | 6 | Yes | No-watch example, phone app size, free? | MEH |
| ICP_5 Sam (iPhone) | 8 | 5 | Yes, for afternoons | No: nights, bad-sleep stretches | MEH |
| **Mean** | **7.8** | **5.2** ⚑ | **5 of 5** | **0 of 5** | **5 MEH** |

Each tester's score line goes into their ledger. They're not averaged with the full-page reviews, because this was one section.

## What they said, counted

| Point | Who | Count |
|---|---|---|
| "It asks once" vs "Next check 3:30": once per what? | Maya, Diego, Anika, Jordan, Sam + CMO | 5 + CMO |
| Cut "That's the whole thing." It's filler, and untrue (the next section is the privacy block) | Maya, Diego, Anika, Sam + CMO | 4 + CMO |
| "snooze means snooze" is the one line they'd remember | Diego, Anika, Jordan, Sam | 4 |
| "It notices.": notices what? Sounds like being watched | Maya, Diego, Sam + CMO | 3 + CMO |
| A generic three-step pattern | Maya, Anika, Sam | 3 |
| The step 1 devices are vague: Apple Watch (Maya), Garmin (Diego), the example assumes a watch (Jordan) | Maya, Diego, Jordan + CMO | 3 + CMO |
| What do I install on the phone? | Maya, Jordan | 2 |
| Line breaks: "slept 5 / h" (laptop chip), "a 5- / minute" (SE), step 2 split across the scroll | Jordan, Maya + CMO | 2 + CMO |
| Calendar missing from step 1, though the demo uses it | Maya + CMO | 1 + CMO |
| The demo's source badges 1/2/3 clash with steps 1/2/3 | Maya | 1 |
| The card is explained twice (caption + step 2) | Sam | 1 |
| Whether an AI writes the reason; "Fairly sure" should be the count | Anika | 1 |
| Nothing about nights or weeks of bad sleep | Sam | 1 |

## Where the CMO and the testers differ

- **The skim test vs the full read.** The testers scored Simple 7.8 because they read the bodies. The CMO judged the heading and titles alone, as a phone skimmer would, and failed them. Both hold. The bodies explain the product, and the big type doesn't.
- **"Fairly sure."** The CMO keeps the word in the step 2 chip. Anika wants the count ("4 of 6"). The design rule already says "a word plus a count" (`hot.md`, the 2026-11-05 design studies), so this is Anika's side, backed by the team's own rule.
- **The step 1 chip.** The CMO keeps `slept 5 h`. Jordan wants a chip that works without a watch.

## Facts checked by the clerk

- **Chip 3 mismatch: confirmed.** The demo's keep-going reply uses `clock(t + 25)`, which is 3:35 at 3:10. Snooze uses +20, which is 3:30.
- **"Got it" is a banned button: confirmed.** `COPY.md` line 244 lists it. It's on the demo's 35-minute card.
- **Apple Watch: confirmed.** The boardroom says "drop it from the pilot (HealthKit has no web API) or label it 'file export'".
- **A card at the top of the iPhone needs a native app for a real Live Activity: confirmed** (`hot.md`).
- **"Mac or Windows" is false: confirmed** (boardroom: Mac-only laptop app).

## The CMO's rewrite options (verbatim in the memo below)

- **A, safe.** New heading "How Halftime works", with the current titles and fixed bodies. Still fails the skim test.
- **B, sharp (the CMO's pick).** "It keeps track while you study. You make the call." The steps:
  1. **It keeps track of your study time.**
  2. **It suggests one thing, and shows why.** The body adds "When it doesn't know, it says so."
  3. **You decide.** "Snooze means quiet until the time it shows you." Chip: `Snoozed. I won't ask again until 3:30.`
- **C, bold.** "Keep going, or take a break? It answers in three steps." Titles and chips only, no bodies.

## Fixes, ranked by how many named them

1. **Make step 3 say when it asks again**, and fix the chip (5 + CMO). B does this.
2. **Cut "That's the whole thing."** (4 + CMO)
3. **Replace "It notices."** with a title that says what it tracks (3 + CMO). B: "It keeps track of your study time."
4. **Step 1 devices:** "No watch needed" in plain words, a chip that works without one, and no device names until they're confirmed (3 + CMO).
5. **Fix the line breaks** in the chips and step 2 (2 + CMO).
6. **Singles:**
   - add the calendar to step 1 (Maya + CMO)
   - a count instead of "Fairly sure", and an AI line (Anika; the AI line waits on the team's AI decision)
   - a night example (Sam)
   - "Got it" → another label (CMO, from COPY.md)

**"If you fix only one thing"** (each tester's, unedited):
- Maya: make step 3 say *when* it asks. It should wait until I finish the problem or I stop on my own, not check at a set clock time.
- Diego: in step 1, say in plain words which devices count and that phone study doesn't.
- Anika: in step 2, replace "Fairly sure" with the count you already have, and add one line saying whether an AI writes the reason and what it sees.
- Jordan: make the step 1 example work with no watch (drop "slept 5 h"), and say "no watch needed" outright instead of "if you wear".
- Sam: make step 3 honest about when it asks again.

## The five cards (verbatim)

### ICP_1 · Maya Okafor

**ICP_1 · Maya Okafor**: I got it in one read. I just wouldn't remember it tomorrow, and step 3 still sounds like a Pomodoro bell.

**Since last time** (only the asks this section touches):
- Where the suggestion appears: ◐ partly fixed. Step 2 says "top of your iPhone", but my phone is face-down.
- Apple Watch named: ⬜ not fixed. It only says "watch or ring".
- "Which kind of app": ✅ fixed in "What it reads" below the section (notes, reading, video or chat).
- "Snooze until I finish this one" and "check at the next pause, not a clock time": ⬜ not fixed. "Next check 3:30" is still there.

**1. Teach-back (section only)**
1. My laptop counts how long I've been studying and how much I'm jumping between apps. My watch tells it how I slept. **Sure.**
2. A black card shows up on my iPhone saying walk, keep going or take a break, with the reasons and how sure it is. **Sure** about what it says. **Guessing** whether it's a notification or something else.
3. I pick. If I snooze, it leaves me alone. **Sure** on the words. **Guessing** how long a snooze lasts and whether it waits until I finish a problem.

Text to a friend: "app that tracks how long you've been studying + how you slept and tells you when a 5-min walk is actually worth it, with reasons. you can say no." **Sure.** I wrote it myself, I didn't copy the page.

**2. Is it enough?** Yes, mostly. It says what Halftime does. It doesn't say what it asks of me.
- **What I needed that isn't there:**
  - What I install. A laptop app, and then something on my iPhone too? Two installs, never said.
  - Why app switches matter. It counts them but never says that bouncing between apps means I'm fading.
  - Whether it waits until I finish the problem.
  - Step 1 skips the calendar, but the demo right above uses "80 min to lab".
- **What I'd cut:** "Your call. Next check 3:30." A check at a set clock time is exactly the timer I quit `[my story]`. I'd also cut "That's the whole thing." It's filler.

**3. Scores**
- **Simple: 7.** One read on the laptop. On my iPhone, step 2's sentence breaks across the scroll (frame 02 into 03), so I had to scroll mid-sentence. `[from stills]`
- **Amazing: 5.** Clear, but "It notices. It suggests. You decide." could be any app. Nothing in it is mine. The demo card above ("2 h 40 min, slept 5 h") is the memorable part, not this section.

**4. Lost me**
- The number clash. Right above the heading are badges "1 your laptop · 2 your watch or ring · 3 your calendar". Then come steps 1, 2, 3, which are different things. I read both twice. Same on the laptop.
- "It notices." Notices what? Me? It sounds like surveillance until I read the body.
- "how often you switch apps". So what? It doesn't say why.
- "Your call. Next check 3:30." Is it going to ping me at 3:30 no matter what?

**5. My version (step 3)**
> **You decide.** Walk, keep going, or "not now, I'm mid-problem." It asks once, then stays quiet until you take a break on your own.

Only write that if it's true. If it's really a 3:30 timer, say so honestly and I'll judge it on that.

**6. Short card**
- **Verdict (this section):** MEH
- **If you fix only one thing:** make step 3 say *when* it asks. It should wait until I finish the problem or I stop on my own, not check at a set clock time. "Next check 3:30" is the line that makes me think timer, and I've deleted timers before. `[my story]`

`ICP_1 | 2026-11-05 | Landing "Three steps" section (iPhone + laptop) · Simple 7 · Amazing 5 | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 6 · Control 6 · Feel 7 · Come back 5 | overall 6 (=) | 0.40 · 0.35 · 0.60 | one-fix: Step 3 says it waits until I finish the problem, not "Next check 3:30"`

Overall stays at 6 because nothing I'd do changed. The section explains the product well enough, but my open asks about timing and delivery with the phone face-down are still open.

### ICP_2 · Diego Ramírez

**ICP_2 · Diego Ramírez**: Clean. I got it on one read. I also noticed there isn't one word in it for me.

**1. Teach-back (section only)**
- **Step 1:** An app on my laptop tracks how long I've been studying and how often I jump between apps. If I wear a watch, it also grabs my sleep. *Sure.*
- **Step 2:** A black card pops up at the top of my iPhone. It says keep going, take a 5-minute walk, or take a longer break, and it tells me why and how sure it is. *Sure.*
- **Step 3:** I pick walk, keep going or snooze, and it won't nag me after I snooze. *Mostly sure.* "Next check 3:30" makes me unsure whether "asks once" means once ever or once per check.
- **Text to a friend:** "Laptop app that tracks how long you've been grinding. It pings your phone when you should take a break and tells you why. Doesn't do anything else." *Sure.* I didn't have to copy the page's own sentence to write it.

**2. Is it enough?** For explaining what it does, **yes**. For whether it fits my life, **no.**
- **What I needed that isn't there:**
  - Step 1 says "watch or ring". The first screen names Fitbit, Oura and WHOOP. My Garmin still isn't anywhere.
  - Step 1 only counts the laptop. Half my studying is on my phone on the bus `[my story]`. The section implies phone study isn't counted, but it never says so.
  - Step 2 offers keep going, walk or break. There's no sit and no nap. A 5-minute walk is useless after a lifting day or on a bus.
  - Nothing in the section says who sees the card, and that's the first thing I check.
- **What I'd cut:** The "That's the whole thing." half of the heading. It's filler.

**3. Scores**
- **Simple: 8.** The three short headlines do the job on their own.
- **Amazing: 5.** I'll remember "snooze means snooze" tomorrow. I'll forget the rest. Nothing in it made me want to try it, because none of the options fit my days.

**4. Lost me** (had to read twice)
- "It notices." Notices what? You only find out in the paragraph underneath.
- "It asks once, and snooze means snooze." It's right next to "Next check 3:30." So does it ask once or not?
- "how sure Halftime is". This one was fine once I saw "Fairly sure" in the example. Keep that example.

**5. My version (Step 1)**
> **It counts.** An app on your Mac or Windows laptop counts how long you've studied and how often you switch apps. Studying on your phone doesn't count. A Fitbit, Oura or WHOOP adds last night's sleep. Garmin isn't supported yet.

The last line is the one that matters to me. If it's true, say it. If Garmin works, put it on the list.

**Since last time** (only the asks this section touches)
- Say where the card appears: **fixed.** "Top of your iPhone" is right there in step 2.
- Say that phone study on the bus isn't counted: **partly fixed.** It's only implied by "laptop".
- Garmin row, or an honest "not supported": **not fixed.**
- Training-aware options: **not fixed.** Step 2 still offers only walk or break.
- Who sees my data: **not fixed** in this section. "You choose each source" sits just below it, and it still doesn't say who else sees anything.

**6. Short card**
- **Verdict (this section):** MEH. It's clear, but it's written for someone else.
- **If you fix only one thing:** In step 1, say in plain words which devices count and that phone study doesn't. Whether my Garmin works decides whether I join at all.

`ICP_2 | 2026-11-05 | Landing "Three steps" section teach-back (iPhone) · simple 8 · amazing 5 | MEH | Clarity 8 · Trust 7 · Timing n/a · Useful 4 · Control 7 · Feel 7 · Come back 3 | overall 5 | week 0.20 · recommend 0.15 · consent 0.55 | one-fix: Step 1 names which devices count (Garmin: yes or "not yet") and says phone study isn't counted`

All of the above is from stills. I can't judge any motion or scroll behaviour in the section.

### ICP_3 · Anika Sharma

**ICP_3 · Anika Sharma**: Clear on the first read. But the heading says "that's the whole thing", and the part I care about isn't in it.

**Since last time** (only what this section shows): AI mentioned: not fixed. Confidence words tied to hit rates: worse, because step 2's chip is now just "Fairly sure". 'Kind of app' defined: fixed in the next block ("notes, reading, video or chat, not the app's name"). Linux: not fixed, though step 1 at least says "Mac or Windows" honestly. 'Where it goes' block: not fixed.

**1. Teach-back (from the section only)**
- Step 1: a desktop app on Mac or Windows logs how long my session is and how often I switch apps. If I connect a wearable, it also pulls how long I slept. **Sure.**
- Step 2: it pushes a card to my iPhone that says keep going, a 5-minute walk or a longer break, with a source and a confidence for each reason. **Sure** on what it shows. **Guessing** on how "sure" is calculated.
- Step 3: I pick walk, keep going or snooze, and it doesn't nag. **Sure** about the claim. **Guessing** what "Next check 3:30" means next to "asks once".
- Text to a friend: "Laptop app plus an iPhone card. It watches how long you've been grinding and how jumpy you are, adds your sleep, and tells you when a 5-min walk fits, with reasons. You can ignore it." **Sure.** I didn't have to copy any of the page's sentences.

**2. Is it enough?**
Yes for *what it does*. No for *whether I'd let it*.
Missing:
- Whether an AI writes the "why" in step 2, and what leaves my laptop. Step 2 is exactly where that sentence belongs.
- A hit rate instead of "how sure".
- How "studied" is told apart from "laptop open". My 3-hour debugging stretch is all app switching. `[my story]`

Cut: "That's the whole thing." It isn't the whole thing: the next section is a full privacy block. And with Linux missing, "the whole thing" doesn't include me.

**3. Scores**
- **Simple: 8.** One read, no rereading of the step bodies.
- **Amazing: 5.** "It notices / It suggests / You decide" is the three-step pattern every app uses. The only line I'd remember tomorrow is "snooze means snooze".

**4. Lost me**
- "It asks once, and snooze means snooze." sits right above "Your call. Next check 3:30." So it asks once, then checks again in 20 minutes?
- "how sure Halftime is" → "Fairly sure". How sure is fairly sure? The card up top already says "In 4 of your last 6 afternoons like this, a walk helped." The step throws that number away.
- "counts how long you've studied": studied, or had the lid open?
- "Three steps": two of them are things *it* does. I only take one step.
- `[from stills]` Step 2's circle is filled green and the line between 2 and 3 is half green. I can't tell if that's a progress state or decoration.

**5. My version (step 2)**
> **It suggests, and shows why.** A black card on your iPhone: keep going, a 5-minute walk, or a longer break. Each reason names its source and how often this call has been right for you.
> `Short walk now? · right 4 of the last 6 times`
> [One true sentence on who writes the reason and what it sees, e.g. "The numbers are worked out on your devices; [the AI / no AI] turns them into a sentence and sees only ___."]

I can't write that last line for you. I don't know the true answer, and that's my point.

**6. Short card**
- **Verdict (this section):** MEH. It explains the product clearly, but nothing in it changes my answer on joining.
- **If you fix only one thing:** in step 2, replace "Fairly sure" with the count you already have, and add one line saying whether an AI writes the reason and what it sees.

`ICP_3 | 2026-11-05 | Landing 'Three steps' section (laptop + iPhone) · simple 8 · amazing 5 | MEH | Clarity 8 · Trust 5 · Timing n/a · Useful n/a · Control 5 · Feel 7 · Come back n/a | overall 5 | 0.05 · 0.20 · 0.40 | one-fix: Step 2 chip shows '4 of 6' not 'Fairly sure', plus one line on whether AI writes the reason`

Files read: `.claude/agents/icp-3.md`, my ledger, the brief, both walk files and all six frames.

### ICP_4 · Jordan Lee

**ICP_4 · Jordan Lee**: Finally, a part I get on the first read. It's clear, but it isn't exciting, and the example still assumes I wear a watch.

**Since last time** (from my ledger): "say where the suggestion appears" is **fixed**, because step 2 says iPhone. "No watch first" is **partly fixed**: step 1 says "*If* you wear a watch or ring", but the example chip still says "slept 5 h". I **can't tell** about the joining details or the shared laptop, because this section doesn't show them.

**1. Teach-back (section only)**
- **Step 1:** You put a small app on your laptop. It times how long you've been studying and counts how much you jump between apps. A watch only adds your sleep. *Sure.*
- **Step 2:** When it thinks you need a break, a card pops up on your phone saying keep going, walk 5 min, or take a longer break, with the reasons and how sure it is. *Sure about what it says. Guessing about how it shows up on my SE.* "Small at the top of your iPhone": is that a notification? I'd need to see it on an SE `[from stills]`.
- **Step 3:** You tap walk, keep going, or snooze, and it doesn't nag. *Mostly sure. Guessing* what "asks once" means: once per session? once per hour?
- **The text I'd send a friend:** "laptop app that times your study sesh and pings your phone when a 5 min walk makes sense. you can say no. don't need a watch." *Sure*, and I didn't have to copy the page to write it.

**2. Is it enough?** **Yes**, for what it does. What I needed that isn't there:
- Is there a phone app to download, and how big is it? My phone is full `[my story]`.
- Is it free?
- An example that works with no watch.

What I'd cut: "slept 5 h" from the step 1 chip, and the sentence "Every reason says where it came from and how sure Halftime is." The "Fairly sure" chip under it already shows that.

**3. Scores**
- **Simple: 8.** All three steps fit on one laptop screen. On the SE it takes two scrolls, but every line was readable.
- **Amazing: 6.** "Snooze means snooze" is the one line I'd remember tomorrow, because every focus app I quit kept nagging me `[my story]`. "Three steps. That's the whole thing." is a relief to read, but I wouldn't quote it. Nothing here makes me want it more than the first screen did.

**4. Lost me**
- "Every reason says where it came from and how sure Halftime is." I read it twice. A reason that "says where it came from"?
- "It asks once." Once per what?
- On the SE, "a 5-" breaks at the end of a line and "minute walk" starts the next one. On the laptop the chip breaks as "slept 5" / "h".

**5. My version (step 1):**
> **It notices.** A small app on your laptop (Mac or Windows) times your study session and counts app switches. No watch needed. Got one? It adds your sleep.
> Chip: `2 h 40 min · 14 app switches`

(And if I could change step 3 too: "One ping. Then it leaves you alone.")

**6. Short card**
- **Verdict for this section:** MEH. It explains the product well. It doesn't change whether I'd keep it running.
- **If you fix only one thing:** make the step 1 example work with no watch (drop "slept 5 h"), and say "no watch needed" outright instead of "if you wear".

`ICP_4 | 2026-11-05 | Landing "Three steps" section (iPhone SE + small laptop) · simple 8 · amazing 6 | MEH | Clarity 8 · Trust 7 · Timing n/a · Useful 5 · Control 6 · Feel 7 · Come back 3 | overall 6 (=) | week 0.25 · recommend 0.25 · consent 0.60 | one-fix: Step 1 example with no watch + "No watch needed" in plain words`

(I can't write files, so the team needs to add this line to my ledger.)

### ICP_5 · Sam Whitaker

**ICP_5 · Sam Whitaker**: I got it on the first read. I'd forget it by lunch, and it's still a 3 pm chem-lab story, not my 1 am.

**Since last time** (this section only): named counseling contact: not here, can't tell. 1 am "stop for tonight?" example: not fixed. The only example is "now 3:10", "Chem lab 4:30 pm".

**1. Teach-back (section only)**
- **Step 1:** a small app on my laptop keeps track of how long I've been working and how often I jump between apps. If I connect my Oura, it also checks how long I slept. *(sure)*
- **Step 2:** a black card shows up at the top of my phone. It says keep going, take a 5-minute walk or take a longer break, and it gives the reasons and how sure it is. *(sure about what it says. Guessing about what "opens at the top of your iPhone" means: is it a notification? `[from stills]`)*
- **Step 3:** I tap walk, keep going or snooze, and it doesn't nag. *(guessing. See "Lost me")*
- **Text to a friend:** "It's an app that sees how long you've been on your laptop and how you slept, then tells you on your phone whether to take a quick walk or keep going, and why." *(sure, my own words)*

**2. Is it enough?** Yes, for what it does in the afternoon. No, for me.
- **What's missing:** step 1 says "it reads how you slept", but no step says what it does with a bad night, or a month of them. "That's the whole thing" tells me there's nothing for that. Step 1 also doesn't say it never reads what I write. I write my thesis on this laptop at night, so that's the first thing I'd want to know. The answer is only in the next section, and only by leaving it out of a list. `[my story]`
- **What I'd cut:** the black card gets explained twice, once in the caption above ("This black card is how Halftime shows up") and again in step 2. Keep one. I'd also cut "That's the whole thing." It sounds breezy, and it shuts the door on the night case.

**3. Scores**
- **Simple: 8.** Short sentences and no jargon. "Fairly sure" is in words, not a number, and I noticed that and liked it.
- **Amazing: 5.** "It notices / It suggests / You decide" is the outline every app uses. The one line I'd remember tomorrow is "snooze means snooze."

**4. Lost me**
- "It asks once, and snooze means snooze." The box right under it says "Your call. Next check 3:30." So does it ask once, or does it check again in 20 minutes? I read it three times. Taken literally, those two lines contradict each other.
- "It notices." At 1 am, an app that "notices" me sounds a little like being watched. I read it twice to decide whether it was friendly.

**5. My version (step 1)**
> **It keeps track, not tabs.** A small app on your laptop counts how long you've been working and how often you switch apps. It never sees what you write. If you wear a watch or ring, it checks how many hours you slept, and nothing else.

Step 3, so it stops contradicting itself:
> **You decide.** Walk, keep going, or snooze. If you say keep going, it checks back once in 20 minutes. If you snooze, it stays quiet until the time you picked.

**6. Short card**
- **Verdict (this section):** MEH. It explains itself clearly. It doesn't show me anything for the hours I'm actually struggling.
- **If you fix only one thing:** make step 3 honest about when it asks again. "Asks once" next to "Next check 3:30" is the line that made me trust the rest a little less.

`ICP_5 | 2026-11-05 | Landing "Three steps" section (iPhone) · simple 8 · amazing 5 | MEH | Clarity 8 · Trust 7 · Timing n/a · Useful 4 · Control 7 · Feel 8 · Come back n/a | overall 6 | week n/a · recommend 0.30 · consent 0.65 | one-fix: Step 3 must say plainly when it asks again ("asks once" vs "Next check 3:30")`

## The CMO memo (verbatim)

**CMO → Heramb · Re: "Three steps" section · Review · 2026-11-05**

**1. Verdict:** Not sufficient yet. The step bodies explain the product, but the heading and step titles don't, and four lines aren't confirmed true today.

**2. The test**
- **5 seconds (heading and titles only): fails.** "Three steps. That's the whole thing. / It notices. / It suggests, and shows why. / You decide." never uses the words *study*, *walk* or *break*.
- **Full read: passes,** but the answer only turns up in step 2's body.
- **Reading level and claims: pass.** About grade 2–7 by a rough Flesch-Kincaid count. No hype, and nothing says breaks make anyone smarter or better.

**3. What works, what doesn't**
- **Heading:** the biggest type on the section tells the reader nothing.
- **"It notices.":** vague, and it opens on watching you. The step names two sources, but the demo above cites three (it leaves out the calendar).
- **"It suggests, and shows why.":** the right beat and the best body. It's missing our lead: it says when it doesn't know.
- **"You decide.":** keep it. But "It asks once" sits next to a chip that says "Next check", which reads as a contradiction.
- **Chips:** good, because they show numbers instead of adjectives. Two problems:
  - Chip 3 mixes two demo replies. "Your call" is the reply when you keep going, and the demo gives 3:35 there; 3:30 is the snooze time.
  - On a laptop, chip 1 wraps and leaves "h" alone on the second line.
- **Order:** right.
- **iPhone length:** about 1.7 screens is fine. Phone readers skim the titles, though, so the titles have to carry the meaning.

**4. False or unconfirmed today**
- **"Mac or Windows":** false. The boardroom (2026-11-05) struck it: the laptop app is Mac only.
- **"watch or ring":** unconfirmed. iPhone users will read "watch" as Apple Watch, and the boardroom lists Apple Watch as "Not in this pilot" or "File export only". Only Google/Fitbit is confirmed; nobody has checked Oura or WHOOP.
- **"top of your iPhone":** unconfirmed. How the iPhone part ships is undecided (BRIEF round 3). A card at the top of the screen is a Live Activity, which needs a native app (hot.md).
- **"It asks once":** depends on how the card is delivered. In Safari, push alerts need the user to add it to the Home Screen (COPY.md). "How often you switch apps" also waits on the CTO's laptop collector.

**5. Rewrites** (title · body · chip)

**B. Sharp (my pick):** the titles alone tell the story.
- Heading: **It keeps track while you study. You make the call.**
- It keeps track of your study time. · A small app on your Mac counts how long you've studied and how often you switch apps. If you connect a [Fitbit], it adds how long you slept. · `2 h 40 min · 14 app switches in 20 min · slept 5 h`
- It suggests one thing, and shows why. · Keep going, take a 5-minute walk, or take a longer break. Each reason says where it came from and how sure it is. When it doesn't know, it says so. · `Short walk now? · Fairly sure`
- You decide. · Take the walk, keep going, or snooze. Snooze means quiet until the time it shows you. · `Snoozed. I won't ask again until 3:30.`

**A. Safe:** B's bodies and chips, under the current titles and the heading **How Halftime works.** It fixes the facts with the least change, but it still fails the skim test.

**C. Bold:** the heading **Keep going, or take a break? It answers in three steps.**, then B's titles and chips with no bodies. It takes half the iPhone height, and the demo above has already explained the product.

**Why B:** it is the only option that passes both the skim test and the receipts test, and it puts "when it doesn't know, it says so" where graders look. Every line stays true however the card ends up being delivered. "[Fitbit]" stays in brackets until the team confirms which devices work. Run B past `/icp` before locking it.

**6. Cut:** "That's the whole thing." It spends the biggest type on nothing, and it isn't true: the learning week and "talk to someone" come right after it on the page.

*Aside:* the demo's "Got it" button is on COPY.md's banned list.

## Related

- [[25-journal/2026-11-05-icp-landing-teachback-r2|Teach-back round 2]] · [[25-journal/2026-11-05-boardroom-privacy-blanks|Boardroom: privacy blanks]] · [[03-users/personas/icp-personas|ICP Personas]] · [[25-journal/25-journal|Journal hub]]
