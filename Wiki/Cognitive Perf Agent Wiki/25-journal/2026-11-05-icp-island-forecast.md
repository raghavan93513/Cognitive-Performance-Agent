---
title: "ICP test: Island + Forecast suggestion card (round 3)"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/suggestion-card-v3/island-forecast.html", ".claude/skills/icp/SKILL.md"]
summary: "5 of 5 MEH, overall mean 4.8/10. All five flagged frame 4 ('Keep going' calls a 5 h 10 night 'your usual sleep'). Quits at F2 (1), F4 (2), F7 (1), F8 (1). Trust 4.4, Useful 4.8, Come back 3.8. Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T07:00:00Z
updated: 2026-11-05T07:00:00Z
---

# ICP test: Island + Forecast suggestion card (round 3)

**Mode T (test).** The round-3 mockup was walked on each persona's own device: 8 frames covering studying → suggestion → See why → Keep going → walking → pill tapped → first week → two weeks of short nights. Captures are in `.icp-tests/2026-11-05-island-forecast/` (gitignored). Synthetic personas, synthetic data. **This is a rehearsal, never evidence.** None of it goes into the proposal or counts as user testing.

## Headline

**5 of 5 MEH. 0 hooked, 0 would use it, 0 outright quit.** Overall mean **4.8 / 10**. Every tester named a quit point:
- **F2, the suggestion opening:** Diego (on the team bus, after training)
- **F4, Keep going:** Anika and Sam
- **F7, first week:** Jordan (no watch, so "learning your sleep" never ends)
- **F8, short nights:** Maya (on the second mid-session showing)

**All five flagged the same bug:** after the suggestion cites 5 h 10 min of sleep against a usual 7 h, tapping "Keep going" says "Steady so far, and your usual sleep". Verified in the source: the keep view hardcodes it.

## Scores

| Persona | Device | Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall |
|---|---|---|---|---|---|---|---|---|---|
| ICP_1 Maya | iPhone + laptop | 7 | 6 | 5 | 6 | 7 | 6 | 5 | 6 |
| ICP_2 Diego | iPhone | 7 | 4 | 5 | 4 | 5 | 7 | 4 | 4 |
| ICP_3 Anika | laptop + iPhone | 7 | 4 | 5 | 4 | 5 | 7 | 3 | 4 |
| ICP_4 Jordan | iPhone SE + small laptop | 6 | 4 | 6 | 5 | 6 | 7 | 3 | 5 |
| ICP_5 Sam | iPhone | 7 | 4 | 5 | 5 | 7 | 6 | 4 | 5 |
| **Mean** | | **6.8** | **4.4 ⚑** | 5.2 | **4.8 ⚑** | 6.0 | 6.6 | **3.8 ⚑** | **4.8 ⚑** |

⚑ = mean ≤ 5. This is the first review for all five, so there is no change since last time.

| Probability | Maya | Diego | Anika | Jordan | Sam | Mean | Spread |
|---|---|---|---|---|---|---|---|
| Still running in a week | 0.35 | 0.20 | 0.20 | 0.25 | 0.30 | 0.26 | 0.20–0.35 |
| Would recommend | 0.25 | 0.10 | 0.10 | 0.15 | 0.20 | 0.16 | 0.10–0.25 |
| Would consent to the data | 0.60 | 0.40 | 0.35 | 0.45 | 0.55 | 0.47 | 0.35–0.60 |

If it vanished: 4 × "not disappointed", 1 × "somewhat disappointed" (Sam, only because of frame 8).

## Quit map

| Step | Who'd quit there |
|---|---|
| F1 studying | none |
| F2 suggestion opens | Diego (on the bus or in study hall after training; a walk is the wrong answer) |
| F3 See why | none (the most-praised screen) |
| F4 Keep going | **Anika, Sam** (the reason contradicts F3's sleep) |
| F5–F6 walking, pill tapped | none |
| F7 first week | Jordan (gated on sleep, and he has no watch) |
| F8 two weeks of short nights | Maya (mid-session, before lab, in exam week) |
| Consent screen (not shown) | Diego and Anika said it could lose them before F2 |

## Where they disagree

- **Frame 8 (escalation), split by background:**
  - **Sam** (months of bad sleep) calls it the best thing in the app; it is his only reason to be disappointed if it vanished.
  - **Maya** (pre-med, exam week) would quit over it: a big bold count mid-session, 45 min before lab.
  - **Diego** (athlete): short nights are away-game travel; ask him first.
  - **Jordan** (no watch) would never see it.
- **"Walk, water, window."** Jordan and Sam loved it; Anika would cut it as filler.
- **The next-stop timeline:** Maya, Diego and Jordan called "back by 3:50, well before lab" the best line. Sam writes at midnight with no next class, so it has nothing to anchor to (Anika's ideal moment is also 11 pm).
- **The six confidence dots:** Jordan finds them honest. Diego would cut them ("reads like a rating"). Anika would hide them below about 10 samples.
- **The Today bar / "1 refill":** Maya and Jordan would cut it (Jordan: "a daily total is how a streak starts"). Sam doesn't know what "refill" means.

## Safety and trust flags (for `/plan-review`'s safety lens)

- **Frame 8:**
  - The headline "12 of your last 14 nights were under 6 hours" shown mid-session reads as a verdict (Maya).
  - It suggests counseling without asking whether the short nights were travel (Diego).
  - Does "Not now" just drop back into walk suggestions? (Sam)
  - "Why am I seeing this?" has no target in the mockup (Sam; verified).
  - Placeholder crisis links were noted by 4 of 5. They are known placeholders until Columbia Health confirms, but a dead link at that moment would be a safety bug.
- **Undisclosed sources:** "Chem lab · 6 min walk away" implies calendar and location access, but the brief says laptop and watch only (Maya, Anika, Jordan, Sam).
- **Who sees it:** "Only you see this" appears only on F8. Diego's watch is team-issued and the staff read sleep; he needs a statement on every card that nothing reaches the team or athletics.
- **No diagnosis language was found** by any tester.

## Hardest truths (quoted)

- Anika: "If the reasons bend to my button, they aren't reasons."
- Sam: "It changed its story to agree with me."
- Maya: "'Halftime' fires at the right moment into a phone nobody's looking at."
- Diego: "Stop sending a guy who ran 10 km this morning on a 'short walk.'"
- Jordan: "Every reason on the card comes from a watch I don't own."

## Fixes

**"If you fix only one thing":**
- Maya: show how the suggestion reaches her with her phone face-down (a Watch tap at the end of a problem).
- Diego: make it training-aware; practice, lift and travel days change the options (sit, nap, flashcards).
- Anika: frame 4. "Keep going" must not flip the reason.
- Jordan: show the no-watch path first.
- Sam: frame 4. Never let his choice change what it says about his sleep.

**Ranked by how many named it:**
1. **Frame 4 contradiction**, "Keep going" calls 5 h 10 "your usual sleep": **5 of 5**.
2. **Disclose calendar and location** as sources, and ask first: 4 (Maya, Anika, Jordan, Sam).
3. **Define "helped"** in "a walk helped in 4 of your last 6", and don't say "Fairly sure" on 6 samples: 4 (Maya, Diego, Anika, Jordan).
4. **Frame 8 rework** (timing, headline, travel check, real links, "Why am I seeing this?" wired up): 4 (Maya, Diego, Sam, Anika).
5. **Frame 7 says "1 h 50 min in"** next to a 2:40 clock: 3 (Maya, Anika, Jordan).
6. **App switching is the work for some people** (Anki and PDF, editor and docs, scans and draft): 3 (Maya, Anika, Sam).
7. **A night version** with no next class ("stop for tonight?"): 2 (Sam, and Anika's ideal moment).
8. **A privacy line on every card**, plus where data goes, the LLM boundary and deletion: 2 (Diego, Anika).
9. Named by one each:
   - the no-watch path (Jordan)
   - training and travel awareness (Diego)
   - delivery when the phone is face-down (Maya)
   - shared-laptop handling (Jordan)
   - a Linux collector and Fitbit support (Anika)
   - "refill" renamed "break" (Sam)

**Cuts named:**
- the Today bar (Maya, Jordan)
- the six dots (Diego)
- "Walk, water, window" (Anika)
- the sleep dot on the See-why slider (Sam)

**Sources the personas cited:**
- Maya: the iPhone 14 (non-Pro) has a notch, not a Dynamic Island, per TechCrunch 2022-09-07. Holds up; the island arrived on all models with the iPhone 15.
- Anika: "Fitbit doesn't write sleep to Apple Health". She marked it `[unverified]`; not checked here.

## Changes made after this test (2026-11-05)

The team (Heramb) chose "fix the top four". Applied to `design/mockups/suggestion-card-v3/island-forecast.html` and published as gallery version 5. Ledger asks stay open until a re-test marks them fixed.

1. **Keep going:** now "OK, keep going. Your call." It restates the same reasons (2 h 40 min, 5 h 10 min under the usual 7 h) and gives the next check at 4:05.
2. **Sources:** the next class is source 4 (calendar, "you turned this on"). Location is never used, so "6 min walk away" is removed. The See-why panel lists all four sources.
3. **Confidence:** "Fairly sure" and the six dots are replaced by an "Early read" tag (under 10 afternoons), and "helped" is defined: app switching settled back to usual after a walk, in 4 of 6.
4. **Talk-to-someone card:**
   - Mornings only, with no session on screen.
   - The headline is the offer; the count comes second.
   - A "Mostly travel, games or work shifts?" option.
   - "Why am I seeing this?" is wired up.
   - "Not now" waits 7 days and leaves walk suggestions alone.
   - Links are still placeholders.
5. **Found while checking:** the open island now scrolls inside itself, so See why's buttons no longer fall off the iPhone SE screen.

Not done (ranked 5th and below):
- the first-week card's 1 h 50 vs 2:40
- app-switching-as-work
- a night version
- a privacy line on every card
- the single-persona asks

## Since last time

First review for all five; there were no earlier asks.

---

## The five cards (verbatim)

### ICP_1 · Maya Okafor

The walk card is the first break prompt I'd actually believe. Then the same app tells me I slept my "usual" one tap later, and drops a giant "12 of 14 nights" on me 45 minutes before lab.

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | A study stopwatch with a Dynamic Island glued on top |
| Where I'd quit | Frame 8 ("12 of your last 14 nights were under 6 hours") the second time it shows up mid-session in exam week. First time I tap Not now, second time Pause suggestions, third time it's deleted. |
| P(still running in a week) | 0.35 |
| P(I'd recommend it) | 0.25, to my orgo lab partner, who crams like me |
| P(I'd consent to the data it asks for) | 0.60. Laptop session time and sleep, yes. I'd refuse location until I knew where "6 min walk away" comes from. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Nothing. Energy drink at hour 3, and the Watch stand nag I already ignore. |

No earlier reviews in my ledger, so there's no "since last time".

**1. My run-through, moment by moment**
- 01 studying 🙂: The giant 2:40 feels like a badge. The "Today" bar and "1 refill" are noise to me at hour 3.
- 02 suggestion 😀: "5 minutes fits. You'll be back by 3:50, well before lab." That's the exact thing I told you I'd believe: hours in plus my sleep. I'd probably walk. How did it know this was a pause and not mid-mechanism? Nothing on screen says. `[from stills]`
- 03 see why 😀: Sync times, my usual ranges, and "Never what you type, read or browse." Good. But 14 switches between Anki, the PDF and my notes is me working, not drifting. I'd tap "This looks wrong."
- 04 keep going 😕: I slept 5 h 10 one screen ago, and now it's "Steady so far, and your usual sleep." Which is it?
- 05 walking 🙂: Clock "paused," not reset. It doesn't punish me for walking.
- 06 pill tapped 🙂: "+5 min" and "End break" are real controls. Do I have to tap End break, or does my laptop notice I'm back? `[from stills]`
- 07 first week 😕: It's honest that suggestions start Sunday. But it says "1 h 50 min in" while the line behind it runs 1:05 to 3:45, which is 2 h 40.
- 08 short nights ❌: The number is the headline, bigger than anything else, at 3:45 with lab in 45. That's the spiral. The links are still "[Campus counseling, 24/7: confirm]" placeholders.
- Laptop 😐: A phone-width strip floating in beige at 1440. The pill sits inside a browser tab, behind my notes, where I'd never see it.

**2. The brutal truth**
1. **I wouldn't see it.** My phone is face-down. My iPhone 14 has a notch, not a Dynamic Island ([TechCrunch](https://techcrunch.com/2022/09/07/the-iphone-14-pro-turns-the-infamous-notch-into-a-dynamic-island/)), so I'd need to see what the "pill opens by itself" moment looks like on my phone. On the laptop it's an in-page pill. "Halftime" fires at the right moment into a phone nobody's looking at. `[my story]`
2. **Frame 8 at the worst moment and the biggest size.** Mid-session, before lab, in exam week, the biggest text on screen is how badly I sleep. Pointing me to a person is right. Leading with the stat at 3:45 pm is wrong.
3. **The numbers contradict each other.** Frame 4 says "usual sleep" after a 5 h 10 night. Frame 7 says 1 h 50 against a 2 h 40 line. I'd stop believing frame 2, which is your best screen.

**3. What actually worked**
Frame 2's reason line. "Back by 3:50, well before lab" turns a break into something that fits my day. "Fairly sure · a walk helped in 4 of your last 6 afternoons" is concrete, though I'd want to know what "helped" means. Also the paused clock, a working "Snooze 20 min," "This looks wrong," and "Still learning… Suggestions start around Sunday" instead of faking it.

**4. Trust and safety**
- Frame 8: right instinct to point to a person. Wrong time and wrong framing. Big bold "under 6 hours" reads like a verdict on me. "Only you see this" and "Why am I seeing this?" are good.
- "Chem lab · 6 min walk away" means calendar and location. Neither is in "laptop + watch." I'd need to see that consent.
- No exam-week behaviour shown. I'd need to see it.

**5. Fix list**
1. **Show how it reaches me with my phone face-down.** One Watch tap after I finish a problem I'd take. You'd know it worked if, in the pilot, most suggestions get opened within 5 minutes.
2. **Never show frame 8 during a session.** Morning only, and lead with "want to talk to someone?", not the count. You'd know it worked if Not now and Pause rates drop on that card.
3. **Make every number agree across frames 2, 4 and 7.** You'd know it worked if nobody taps "This looks wrong" over sleep.
- **Cut:** the "Today · 4 h 05 min · 1 refill" bar.

**If you fix only one thing:** show me (and build) how the suggestion reaches me when my phone is face-down and I'm deep in a problem.

**6. What I'd want**
A wrist tap on my Apple Watch at the end of a problem: "5 min fits, back before lab." Plus "Snooze until I finish this one," not a fixed 20. Sleep news the next morning, never at hour 3. `[my story]`

**7. Score line**
`ICP_1 | 2026-11-05 | Island + Forecast main screen (island-forecast.html), iPhone + laptop | MEH | Clarity 7 · Trust 6 · Timing 5 · Useful 6 · Control 7 · Feel 6 · Come back 5 | overall 6 | week 0.35 · recommend 0.25 · consent 0.60 | one-fix: show how the suggestion reaches me with my phone face-down (Watch tap at a problem's end)`

Timing is scored from stills: I can't judge motion, or how the pill feels when it opens.

### ICP_2 · Diego Ramírez

It looks sharp, and it's clearly built for a pre-med in the library before chem lab. It isn't built for someone who was on the field at 6 am.

| | |
|---|---|
| Verdict | MEH |
| Overall | 4/10 |
| 5-second read | A study stopwatch with a countdown to my next class. That part I got right away. |
| Where I'd quit | Frame 2, "Short walk now?", the first time it opens while I'm on the team bus or in study hall `[my story]`. If the watch consent screen doesn't tell me who sees my sleep, I'd quit before that. |
| P(still running in a week) | 0.20 |
| P(I'd recommend it) | 0.10, to a non-athlete roommate who studies in the library |
| P(I'd consent to the data it asks for) | 0.40. Laptop app-type, yes. Sleep from my team Garmin, no, unless it shows me that sleep never touches the team account. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Garmin app for sleep, phone timer for study blocks |

**Since last time:** first review. My ledger has nothing earlier.

1. **My run-through, moment by moment**
- 01 studying: 🙂 Big "2:40", and the line from 1:05 to now to Chem lab 4:30 with "6 min walk away". I get it in two seconds. Garmin doesn't do that.
- 02 suggestion: 😐 "5 minutes fits. You'll be back by 3:50, well before lab." The time math is good. But "slept 5 h 10 min" says nothing about the 6 am practice I already did. `[my story]` I can't see how it pops open `[from stills]`.
- 03 see why: 🙂 The sources and "usual" ranges are exactly right: laptop, 1 min ago; watch, synced 38 min ago. "This looks wrong" is there. 😕 But "a walk helped in 4 of your last 6 afternoons". Helped how? Measured by what?
- 04 keep going: ❌ "Steady so far, and your usual sleep." One screen earlier it said 5 h 10 min against my usual 7 h. Which one is it?
- 05 walking: 🙂 A pill with "Walk 4:12" and the clock "paused". Clear.
- 06 pill tapped: 🙂 "End break / +5 min / Make it small" is the control I want. "Lab's still 40 min away" adds up.
- 07 first week: 😀 "Still learning your usual sleep. Suggestions start around Sunday." That's honest, and I respect it.
- 08 short nights: 😕 "12 of your last 14 nights were under 6 hours" → counseling. In an away-game stretch, that's the bus getting in late `[my story]`. It never asks whether it's travel.

2. **The brutal truth**
1. **It doesn't know I'm an athlete.** Every screen is "Organic chemistry", "Chem lab" and "Walk 5 min". On a lifting day my legs are dead `[my story]`. A walk isn't the fix, and on a bus it isn't even possible. There's no "nap" option, and no idea of training load anywhere in frames 2–3. "Halftime" is a soccer word, but that's branding. It doesn't know my day.
2. **"Only you see this" shows up only on frame 8.** The card that says I slept 5 h 10 (frame 2) gives no hint who else can see it. My watch is team-issued and the staff reads sleep every Monday `[my story]`. Before I'd connect it, I'd need to see where the watch data comes from and that none of it reaches the athletics department.
3. **Frame 4 contradicts frame 2.** "Your usual sleep" right after 5 h 10 vs 7 h. One mismatch like that and I stop believing the chips.

3. **What actually worked**
- The "this session → now → next stop" line, plus "back by 3:50, well before lab". If the next stop could be "Lift 3:30" or "Bus 5:00", that's the thing my Garmin can't tell me.
- Frame 3's source rows, with sync times and my usual ranges.
- Frame 7 holding back instead of guessing.
- Snooze 20 min, Pause suggestions and "Make it small" are all one tap away.

4. **Trust and safety**
- "4 of your last 6 afternoons like this": "like this" and "helped" aren't defined. That feels made-up even with sample data.
- Frame 8 doesn't sound like a doctor. Good. But it jumps to counseling without asking about travel or games first. It's also unclear whether the counseling link could route through athletics. I'd need to see that.
- "We only see which kind of app you're in" is on frame 3. Nothing equivalent is said for the watch.

5. **Fix list**
1. **Let it know my training.** Tag practice, lift and travel days (or read them from the watch, kept on my phone), and change the options on those days: sit or nap, not walk. *Why:* this is the gap between quitting in a week and keeping it. *Know it worked:* fewer "This looks wrong" taps and snoozes on training days.
2. **Put "only you see this" on every card, plus one line on where the watch data comes from:** never the team account, never staff. *Why:* my consent goes from 0.40 to about 0.70. *Know it worked:* watch-consent rate among athletes.
3. **Fix frame 4, and offer bus or study-hall options** like "3 min eyes off screen" or "switch to flashcards". *Know it worked:* acceptance rate when you're not at a desk.
- **Cut:** the six-dot meter in frame 2. "4 of 6" already says it. The dots just read like a rating.

**If you fix only one thing:** make it know when I trained, and stop sending a guy who ran 10 km this morning on a "short walk."

6. **What I'd want**
Study hall, Monday–Thursday, laptop open, phone on the desk `[my story]`. One glance at the pill should tell me "1 h 10 in, lift at 3:30, your legs are cooked, your head's fine: 20 more minutes." On the bus: "nap or flashcards?" Every card should say it stays off the team dashboard. I don't want counseling pushed at me during an away week. Ask me first.

7. **Score line**
`ICP_2 | 2026-11-05 | island-forecast main screen (iPhone, 8 frames) | MEH | Clarity 7 · Trust 4 · Timing 5 · Useful 4 · Control 5 · Feel 7 · Come back 4 | overall 4 | week 0.20 · recommend 0.10 · consent 0.40 | one-fix: training-aware suggestions (practice/lift/travel days change the options; no walk after a double, offer nap/sit)`

### ICP_3 · Anika Sharma

The "See why" panel is the most honest thing I've seen in a wellness app. Then the next screen contradicts it, and the lab card knows where I am when nobody told me it could.

| | |
|---|---|
| Verdict | MEH |
| Overall | 4/10 |
| 5-second read | A study timer with a fake Dynamic Island that wants me to take a 5-minute walk |
| Where I'd quit | Frame 04, "Keep going… and your usual sleep ③", after frame 03 showed sleep ③ = 5 h 10 vs usual 7 h. If that doesn't lose me, the consent screen will, and I haven't seen it |
| P(still running in a week) | 0.20 |
| P(I'd recommend it) | 0.10, maybe to a classmate who already uses Apple Watch + Mac |
| P(I'd consent to the data it asks for) | 0.35. I'd refuse calendar and location (frame 01's "6 min walk away" needs both) and anything sent to a hosted LLM until you show me the boundary |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Fitbit app for sleep. For breaks, nothing. I push through `[my story]` |

First review, so no earlier asks to check.

**1. My run-through, moment by moment**
- 01 studying 🙂 Clean. Big 2:40, the line to 4:30 is readable at a glance. Then I notice "Chem lab · 6 min walk away." Who gave it my calendar and my location?
- 02 suggestion 🙂 "Back by 3:50, well before lab" is a concrete reason. "4 of your last 6 afternoons" is a count, not a fake 73%. I asked for exactly that. But "Fairly sure" on n=6? No.
- 03 see why 😀 Source, freshness and my usual range for each number. "Never what you type, read or browse." This is the screen I'd trust. It's hidden behind a link.
- 04 keep going ❌ I tap "Keep going" and the app says "Keep going. Nothing to change." So the recommendation folds as soon as I disagree? And it calls 5 h 10 my "usual sleep."
- 05 walking 🙂 The countdown pill and "paused" clock are clear. I can't judge the shrink animation `[from stills]`.
- 06 pill tapped 😐 "End break / +5 min" is fine. "Walk, water, window" is filler.
- 07 first week 😀 "Still learning your usual sleep. Suggestions start around Sunday." Real abstention. But the card says "1 h 50 min in" while the clock behind it says 2:40.
- 08 short nights 😐 Facts, no diagnosis, "Not now" is there. "Only you see this": prove it. Both counseling links are "[confirm]" placeholders, so I couldn't actually reach anyone.

**2. The brutal truth**
1. **Frame 04 breaks the whole grounding story.** One tap flips "walk" into "Nothing to change," and the reason cites sleep that frame 03 flagged as low. If the reasons bend to my button, they aren't reasons.
2. **Undisclosed sources.** The brief says laptop + watch. Frame 01 shows my calendar and a walking distance, so you have location too. I turned location history off on everything `[my story]`. Seeing that before a consent screen is how you lose me.
3. **"Fairly sure" isn't calibrated.** 4/6 with four of six dots lit just restates the count. "Helped" measured how? Fewer app switches after? Also, 14 switches in 20 min is me debugging (editor, terminal, docs), not me fading `[my story]`. It would fire at my worst possible moment.

**3. What actually worked**
Frame 03's per-signal rows (source · age · usual range). The "never what you type, read or browse" line. Frame 07's honest "not yet." "Pause suggestions" visible on every frame. "This looks wrong" as an option.

**4. Trust and safety**
- Frame 08 doesn't sound like a doctor and lets me decline. Good.
- But it shipped with placeholder resources. In a real build, a dead link at that moment is a safety bug, not a typo.
- "Only you see this" is a claim about your servers I can't verify.
- Nothing anywhere says where data goes, whether an LLM sees it, or how I delete it. I'd need to see that.
- I'd also need to know the laptop collector runs on Linux and that a Fitbit works. As far as I know, Fitbit doesn't write sleep to Apple Health `[unverified]`.

**5. Fix list**
1. **Make "Keep going" keep the recommendation honest.** Something like "OK. I still think a walk would help (sleep 5 h 10). Next check 4:05." The test: the reason text never contradicts the chip it cites, in any state.
2. **Show every source before it's used.** Put calendar and location on the consent screen as separate toggles, and badge the lab card "calendar." The test: the consent screen lists exactly the sources the main screen uses.
3. **Replace "Fairly sure" with the count and what "helped" means.** For example, "4 of 6 times, your app switches dropped after a walk." Hide the dots below about 10 samples. The test: I can say what the claim measures without asking.

**Cut:** "Walk, water, window."

**If you fix only one thing:** frame 04. An app that agrees with whatever I tap isn't grounded, and I'd stop reading its reasons.

**6. What I'd want**
At 11 pm on my iPhone, mid-bug: "You've been at this 2 h 50. Last 3 times you pushed past midnight, you slept under 5 h." Then one tap to stop or to snooze 30 min, with nothing interrupting the laptop session. Plus a single page listing every byte collected, and a delete button.

**7. Score line**
`ICP_3 | 2026-11-05 | Island + Forecast main screen (suggestion-card-v3/island-forecast), laptop + iPhone | MEH | Clarity 7 · Trust 4 · Timing 5 · Useful 4 · Control 5 · Feel 7 · Come back 3 | overall 4 | week 0.20 · recommend 0.10 · consent 0.35 | one-fix: "Keep going" must not flip the recommendation or cite low sleep as "usual" (frame 04)`

### ICP_4 · Jordan Lee

The walk part actually gets me. Then every reason on the card comes from a watch I don't own.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 |
| 5-second read | A study timer with a Dynamic Island that tells me when to leave for class |
| Where I'd quit | Frame 7, "Still learning your usual sleep… Suggestions start around Sunday." With no watch there are no nights to learn from, so I'd assume Sunday never comes. I'd delete it that week. |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.15, and only to a friend who already wears an Apple Watch |
| P(I'd consent to the data it asks for) | 0.45. App categories on the laptop are fine. I'd refuse whatever gives it my class schedule and "6 min walk away" (calendar? location?) until it tells me. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | The iPhone Clock timer set for when I have to leave |

**Since last time:** this is my first review, so I have no open asks to check.

1. **My run-through, moment by moment**
- F1 studying (SE): 🙂 Big 2:40, a line to Chem lab. Clear. The bottom half of my small screen is empty.
- F2 suggestion: 😀 "5 minutes fits. You'll be back by 3:50, well before lab." This is the best line in the app. I lose track of time, and it did the math for me.
- F2 reasons: 😕 "slept 5 h 10 min ③". Where from? I don't have a watch.
- F3 see why: 😐 "Sleep last night · watch · synced 38 min ago." So one of the three reasons is the watch. "We only see which kind of app you're in" is good. On my phone the text is about 12 lines, which is the most I'd read.
- F4 keep going: 😕 "Steady so far, and your usual sleep." Two frames ago it said I slept 5 h 10 against a usual of 7. Which one is true?
- F5 walking: 🙂 The pill counting down 4:12 is useful. I can't judge how it springs open or shrinks `[from stills]`.
- F6 pill tapped: 😀 "Walk, water, window. Lab's still 40 min away." Short, and it doesn't judge me.
- F7 first week: ❌ It's learning my *sleep*, and the line says "1 h 50 min in" while the big clock says 2:40.
- F8 short nights: 😐 The tone is fine. But it comes from sleep data, so I'd never see it.
- Laptop (1366×768): 🙂 It's a phone column in the middle of my screen, and it fits. I can't tell what gets installed on the family laptop or whether it slows the machine down. I'd need to see that.

2. **The brutal truth**
1. **None of this was shown without a watch.** F2, F4, F7 and F8 all lean on "③ sleep, watch". My first-week screen counts nights, not study sessions. The support screen (F8) is triggered by sleep, and I'm the one working closing shifts `[my story]`, so I'd never get it.
2. **It knows things you said it doesn't read.** The brief says laptop plus watch. But F1 knows "Chem lab · 4:30 pm" and "6 min walk away". That needs a calendar and my location. Nothing on screen asks for them.
3. **The numbers argue with each other.** F2 says 5 h 10 sleep, F4 says "your usual sleep". F7 says 1 h 50 next to a 2:40 clock. And "a walk helped in 4 of your last 6": helped how, measured by what?

3. **What actually worked**
- "You'll be back by 3:50, well before lab." It ties the break to the next thing I have to do.
- The countdown pill while I'm away.
- There are ways out on every card: Snooze 20 min, Keep going, This looks wrong, Pause suggestions.
- No streaks, and no "unproductive".

4. **Trust and safety**
- F8 says "You choose if and when" and doesn't diagnose me. That's right.
- The counseling lines are still placeholders ("[confirm]"). For me, short nights mostly come from my café shifts `[my story]`, so I'd tap "Not now".
- "Fairly sure" with ●●●●○○ is honest. I just can't see what "helped" means.
- On a shared laptop it would count my brother's app switching as mine `[my story]`. Nothing on screen handles that.

5. **Fix list**
1. **Show the no-watch version as the main walkthrough.** Use laptop-only reasons, and replace the F7 sleep countdown with something like "starts after 3 study sessions". That changes whether I keep it past week one. You'd know it worked if a no-watch tester gets a real suggestion in their first week.
2. **Say where the class time and walk distance come from, and ask first.** Add "not me" or pause for a shared laptop. You'd know it worked if I can name every source after F3.
3. **Make F2, F4 and F7 agree.** Or label them as different days. You'd know it worked if nobody asks "which is it?"

**Cut:** the laptop's "Today · 4 h 05 min · 1 refill" tally. A daily total is how a streak starts.

**If you fix only one thing:** show me the app working with no watch, on the first screen.

6. **What I'd want:** On closing-shift nights at the kitchen table, on the iPhone SE `[my story]`: one line saying "you've been at it 50 min and switching a lot, stop at 11:30 and sleep, class is at 9." Laptop signals only, free, no account. I don't need a dashboard.

7. **Score line**
`ICP_4 | 2026-11-05 | island-forecast main screen (iPhone SE + laptop-small) | MEH | Clarity 6 · Trust 4 · Timing 6 · Useful 5 · Control 6 · Feel 7 · Come back 3 | overall 5 | week 0.25 · recommend 0.15 · consent 0.45 | one-fix: show the no-watch path (laptop-only reasons, first week not gated on sleep)`

### ICP_5 · Sam Whitaker

It's the first one of these that doesn't give me a score, and the two-weeks screen is the thing I asked for. Then the "Keep going" screen said my sleep was normal right after telling me it wasn't.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 |
| 5-second read | A stopwatch for studying with a black pill at the top. |
| Where I'd quit | Frame 4. I tap "Keep going" and it says "Steady so far, and your usual sleep [3]". Thirty seconds earlier, chip 3 said 5 h 10 min against "usual about 7 h". It changed its story to agree with me. After that I wouldn't believe "Fairly sure", and I wouldn't believe frame 8 either. |
| P(still running in a week) | 0.30 |
| P(I'd recommend it) | 0.20, to my sister, only for frame 8 `[my story]` |
| P(I'd consent to the data it asks for) | 0.55. I'd say yes to the app category on my laptop and to sleep. I'd refuse whatever knows "Chem lab · 6 min walk away", because the brief said laptop and watch, never my calendar or my location. |
| If it vanished tomorrow I'd be | somewhat disappointed (because of frame 8 only) |
| What I'd use instead | The Oura app, which I dread, and the iPhone Clock timer `[my story]` |

**Since last time:** This is my first review. My ledger has no earlier asks.

1. **My run-through, moment by moment**
- F1, studying: 🙂 I see a huge "2:40", no grade, and "No break yet this session." I don't know what "1 REFILL" means. Is a refill a break? Water?
- F2, suggestion: 🙂 "Short walk now? … back by 3:50, well before lab." I get it at once. "4 of your last 6 afternoons" is a count I can check, not a grade. But "14 app switches" makes me sound scattered. When I write, I flip between scanned letters and my draft all night, and that switching is the work `[my story]`.
- F3, See why: 😐 I'm glad each number names its device and how fresh it is, and that it says "Never what you type, read or browse." The sleep row puts a white dot far left of a grey "usual" band. That's my morning readiness feeling all over again. And it says "watch". I wear an Oura ring, so does it even read that? I'd need to see it.
- F4, Keep going: ❌ "Nothing to change" plus "your usual sleep", on the same 5 h 10 night. This is where I'd quit.
- F5, walking: 🙂 "2:40 paused", "On a walk. Back at 3:50 pm." It's calm and nothing nags. `[from stills]` I can't tell whether the countdown moves.
- F6, tapped pill: 😀 "Walk, water, window." That sounds like a person. "End break" and "+5 min" are clear.
- F7, first week: 🙂 "Still learning your usual sleep. Suggestions start around Sunday." It's honest. I trust it more for saying it doesn't know yet.
- F8, two weeks of short nights: 😀 then 😕. "Talking it over with someone can help. You choose if and when." and "only you see this" are exactly what I wanted. But the headline "12 of your last 14 nights were under 6 hours." in big bold at 1 am feels like being caught. And "Why am I seeing this?" goes nowhere in the page I read.

2. **The brutal truth**
1. Frame 4 rewrites my sleep to match my choice. I read everything literally, and one false sentence poisons every number on every other screen.
2. The whole screen hangs on "your next stop", which here is Chem lab at 4:30. I write my thesis at midnight with no next class `[my story]`. I can't see what this page shows at 1 am, or whether it ever says "stop for tonight" rather than "walk 5 min". I'd need to see it.
3. It knows my schedule and how far I am from the lab, and nothing on screen says where that comes from. The brief promised laptop and watch only.

3. **What actually worked**
- Frame 8 exists, it puts a person first ("Talk to someone now"), and it lets me choose.
- Frame 7 admits it doesn't know my usual sleep yet.
- "Walk, water, window." in frame 6.
- There's no readiness number anywhere.

4. **Trust and safety**
- Frame 4's "your usual sleep" is invented, and it contradicts chip 3.
- Frame 8's options are placeholders ("[Campus counseling, 24/7: confirm]"), so I can't judge where they lead.
- On the 5 h 10 day in frame 2, the answer is a 5-minute walk. That's fine for one night. I'd want to know that "Not now" in frame 8 doesn't just drop me back into walk suggestions forever.
- Nothing sounded like a doctor. Good.

5. **Fix list**
1. **Make "Keep going" respect the evidence.** Something like: "OK. You slept 5 h 10, so I'll check again at 4:05." Why it matters: then I'd keep believing the other screens. How you'd know: testers who tap Keep going and then See why find no number that disagrees.
2. **Show me the night version**, with no next class, 1 am, thesis writing. Does the pill ever say "stop for tonight"? Why it matters: that's the only time I'd open it. How you'd know: a night frame that I'd tap instead of ignore.
3. **Name every source, and use plain words.** Say where "Chem lab · 6 min walk away" comes from, say whether an Oura ring counts as "watch", and change "refill" to "break". Why it matters: it decides whether I give consent. How you'd know: I can name every source without asking.

**Cut:** the sleep dot sliding left of "usual" in See why. Keep the sleep as words.

**If you fix only one thing:** Frame 4. Never let my choice change what you say about my sleep.

6. **What I'd want**
I'd use it on my iPhone at night while writing on my MacBook. One quiet line around 12:30: "You've been writing 3 h and slept short three nights running. Stop here tonight?" Plus frame 8 when it's been weeks. I don't want any daytime class timeline, and I don't want a sleep gauge.

7. **Score line**
`ICP_5 | 2026-11-05 | Halftime island + forecast main screen (iPhone, 8 frames) | MEH | Clarity 7 · Trust 4 · Timing 5 · Useful 5 · Control 7 · Feel 6 · Come back 4 | overall 5 | week 0.30 · recommend 0.20 · consent 0.55 | one-fix: Keep-going reply must not contradict the sleep it just showed`

## Related

- [[03-users/personas/icp-personas|ICP Personas]] · [[09-design/design-crit-log|Design crit log]] · [[25-journal/25-journal|Journal hub]]
