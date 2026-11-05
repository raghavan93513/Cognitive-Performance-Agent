---
title: "ICP test: wearable setup, sync states and Data sources"
category: 25-journal
tags: [journal, users, icp]
sources: ["design/mockups/suggestion-card-v3/island-forecast.html", ".claude/skills/icp/SKILL.md"]
summary: "5 of 5 MEH; overall 5.6 (from 5.4). Nobody quit during setup; 'No wearable' as an equal choice landed. All five flagged the '[confirm]' placeholders in 'Where your data goes' (stored, kept for, the study) as the consent blocker. New: Garmin missing, 'this MacBook' for Windows/Linux users, 'Class + games' on by default for non-athletes, HRV asked for but never used, and 'Nothing is shared' contradicting the disclosed AI writer and project team. Synthetic testers: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T13:00:00Z
updated: 2026-11-05T13:00:00Z
---

# ICP test: wearable setup, sync states and Data sources

**Mode T.** The new wearable screens (gallery v9) were tested, with each persona walking setup using **the wearable they actually own**:
- **Maya:** Apple Watch, which isn't connectable yet, so she went with no wearable.
- **Diego:** a team-issued Garmin, which isn't on the list, so he went with no wearable.
- **Anika:** Fitbit.
- **Jordan:** no wearable.
- **Sam:** Oura.

Each walk was 8 frames on their own devices: choose source, connect or laptop-only, then a suggestion, See why, out-of-date or reconnect (device owners), first days or Keep going (no wearable), and Data sources (top and bottom). Captures are in `.icp-tests/2026-11-05-wearables/` (gitignored). **Synthetic personas and synthetic data: a rehearsal, never evidence.**

## Headline

**5 of 5 MEH** (Sam "closer to I'D USE IT"). Overall **5.6** (from 5.4). **Nobody quit during setup.** The setup itself works:
- "Optional. Halftime works without it" and "No wearable" as an equal choice (all five)
- "never the device's own scores like Readiness or Recovery" (Sam, Diego)
- the out-of-date fallback (Anika, Sam)

**The blocker is consent, not setup.** All five stopped at **"Where your data goes"**, because "Stored", "Kept for" and "the project team sees de-identified study data" are still `[confirm]` placeholders. Three of them (Sam, Maya, Anika) had not realised it was a study until the last line of Settings.

| Where they'd stop or quit | Who |
|---|---|
| Before Google sign-in ("Go to Google"): no storage or retention shown before consent | Anika |
| Data sources "Laptop · this MacBook" (they're on Windows / Linux) | Jordan (quit); Anika (flagged) |
| Bottom of Data sources: `[confirm]` placeholders, the study surprise | Sam (would disconnect the ring), Maya (won't sign up for real), Diego (holds off on further consent) |
| In daily use (unchanged) | Maya at "check in again around 4:05"; Diego at the first walk on a lift day |

## Scores (change vs re-test 2)

| Persona | Wearable used | Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall |
|---|---|---|---|---|---|---|---|---|---|
| ICP_1 Maya | none (Apple Watch "later") | 8 | 7 | 5 | 6 | 7 | 7 (−1) | 5 | 6 (=) |
| ICP_2 Diego | none (Garmin missing) | 8 | 7 | 6 | 4 | 8 (+1) | 7 | 4 | 5 (=) |
| ICP_3 Anika | Fitbit | 8 | 6 | 5 | 4 | 6 (+1) | 7 | 3 | 5 (=) |
| ICP_4 Jordan | none | 7 | 6 | 6 | 6 (+1) | 7 | 6 (−1) | 4 (+1) | 6 (+1) |
| ICP_5 Sam | Oura | 7 | 6 (−1) | 5 | 6 | 8 | 7 | 5 | 6 (=) |
| **Mean** | | 7.6 | 6.4 (−0.2) | 5.4 | 5.2 (+0.2) | 7.2 (+0.4) | 6.8 (−0.4) | **4.2 ⚑** (+0.2) | 5.6 (+0.2) |

⚑ = mean ≤ 5. Only **Come back** is still flagged; Useful has crossed 5.

| Probability | Maya | Diego | Anika | Jordan | Sam | Mean (was) | Spread |
|---|---|---|---|---|---|---|---|
| Still running in a week | 0.40 | 0.25 | 0.20 | 0.30 | 0.40 | 0.31 (0.30) | 0.20–0.40 |
| Would recommend | 0.30 | 0.15 | 0.15 | 0.20 | 0.30 | 0.22 (0.21) | 0.15–0.30 |
| Would consent to the data | 0.60 | 0.55 | 0.50 | 0.50 | 0.70 | 0.57 (0.55) | 0.50–0.70 |

"Somewhat disappointed" if it vanished: 2 (Maya, Sam).

## Where they disagree

- **Going without a wearable:**
  - Diego and Maya were *relieved*: "my coach can't see what I never connected"; "I'd rather it never shows me 'slept 5 h 10 min' in exam week".
  - Jordan wants "No wearable" listed *first*, not last and cut off on the iPhone SE.
  - Sam and Anika do want their device connected, but with less data taken (no HRV).
- **The weekly reconnect:** Sam finds it calm. Anika would tolerate it for two weeks, then tap Later.
- **Buttons on the "learning" card:** Diego and Maya see "suggestions start after…" plus Walk / Keep going buttons as a contradiction. Jordan liked having the choice on day 1.

## Safety and trust flags (for `/plan-review`'s safety lens and the CSO)

- **Contradiction (worse, Anika):** the short-nights card still says "only you see this" and "Nothing is shared", while Data sources now discloses the AI writer and the project team. Absolute claims must match the disclosure.
- **The study is disclosed last** (Sam, Maya, Anika): "de-identified study data" first appears at the bottom of Settings. Consent for the pilot belongs in setup.
- **"De-identified" may be re-identifiable:** daily sleep plus session and class times (Anika); a small D1 population (Diego) `[unverified]`.
- **Delete and Disconnect are undefined** (Anika, Sam, Jordan, Maya). They don't say whether the token is revoked, what happens to stored sleep and server copies, or whether there's a confirmation. In the mockup Delete has no action.
- **Counseling links are still placeholders** (Sam, fourth time; Anika).
- **Team-issued Garmin:** could a team admin see that he connected Halftime? (Diego) `[unverified]`
- **Google's consent screen may name broader scopes** ("heart rate" vs "HRV") than our copy (Anika) `[unverified]`. Show the exact scope strings.
- **No diagnosis language was found** by any tester.

## Hardest truths (quoted)

- Sam: "I can't trust a blank."
- Anika: "You ask for consent before you disclose anything."
- Diego: "Apple Watch gets a 'coming later' row and the watch my whole team wears gets nothing."
- Jordan: "The no-watch fix means nothing if the laptop part needs a Mac."
- Maya: "The wearable work doesn't touch the thing that would make me delete it."

## Fixes

**"If you fix only one thing":**
- Maya: check in at my next natural pause, not 4:05, plus "snooze until I finish this one".
- Diego: the calendar reads practice, lift and travel blocks, so the card offers sit or nap instead of walk.
- Anika: real Stored and Kept-for answers, shown **before** "Go to Google".
- Jordan: say Windows works on the first setup screen, and put "No wearable" first.
- Sam: replace every `[confirm]` on the short-nights card and in "Where your data goes".

**Ranked by how many named it:**
1. **Fill "Where your data goes"** (stored, kept for, what the study is and who the project team is) and show the short version in setup, before connecting: **5 of 5**. Needs real answers from the CTO and CSO.
2. **Say exactly what Delete and Disconnect do** (token revoked, stored data wiped or kept, server copies gone within N days, a confirmation): 4 (Anika, Sam, Jordan, Maya).
3. **Calendar default "Class only"** unless you say you're on a team; don't show "away-game nights" to non-athletes: 4 (Maya, Jordan, Anika, Sam).
4. **Name the real device and laptop:** a Garmin row, even "not supported, here's why", with a team-issued warning (Diego); the real Fitbit model (Anika has a Charge); Windows and Linux, not "this MacBook" (Jordan, Anika): 3.
5. **Explain HRV in one sentence, or stop asking for it until a reason uses it:** 2 (Sam, Anika).
6. **Remove the Walk / Keep going buttons from the learning card:** 2 (Diego, Maya).
7. **The last row of a scrolling island sits on its rounded bottom edge and looks clipped** (See why on SE and iPhone): 2 (Jordan, Maya). A layout bug from the footer fix.
8. **Make the short-nights card's privacy wording match the disclosure** ("only you see this" / "Nothing is shared"): 1 (Anika), but it's an honesty flag.
9. Named by one each:
   - "No wearable" first in the list (Jordan)
   - the out-of-date state saying what to do: "Open the Oura app to sync" (Sam)

**Unchanged scope blockers:**
- pause-based check-ins (Maya)
- training-aware options (Diego)
- a 1 am screen (Sam)
- a Linux collector (Anika)

## Since last time

**Fixed:**
- the ring is named, the sleep dot is cut, and the badge no longer breaks the sentence (Sam)
- the sleep line is dropped from Keep going without a wearable (Jordan)
- 40 vs 45 min (Diego, Maya)
- Snooze in See why (Maya)
- calendar and location shown as sources, "This looks wrong" works (Anika)

**Partly fixed:**
- the no-watch path, which is right in words but listed last (Jordan)
- shared-laptop handling (Jordan)
- the data-path screen, which exists but is full of placeholders (Anika)
- Linux and Fitbit, where Fitbit now connects but Linux doesn't (Anika)

**Worse:** "Nothing is shared" now contradicts the disclosure (Anika).

**Not fixed:** each persona's scope blocker, the counseling links, and "Walk, water, window" (Anika).

---

## The five cards (verbatim)

### ICP_1 · Maya Okafor

The one wearable I own is the one you can't connect, so I picked "No wearable". Honestly, that was a relief. The problem is still the 4:05 check-in, not the setup.

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 |
| 5-second read | "Pick where your sleep comes from, or skip it." Clear in 5 seconds. |
| Where I'd quit | Not during setup. I'd stall at the bottom of Data sources (frame 8): "Kept for: [How long: confirm with CTO]" is blank, and I wouldn't sign up for real until it has an answer. I'd actually quit the same place as last time: "I'll check in again around 4:05" (frame 6), landing in the middle of a mechanism. |
| P(still running in a week) | 0.40 |
| P(I'd recommend it) | 0.30, to my lab partner who also does 4-hour blocks |
| P(I'd consent to the data it asks for) | 0.60. Laptop app-type: yes. Calendar: "Class only". I'd refuse "Class + games" (I have no games, so why read 14 days back?). |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | Nothing on a timer. Energy drink at hour 3, and my own gut. |

**Since last time**
- Delivery with my phone face-down (a Watch tap at a natural pause): **not fixed**. Frame 1 now lists Apple Watch as "Needs the Halftime iPhone app · coming later", so it isn't even on the way yet.
- Switching between Anki, PDF and notes is work, not drift: **not fixed**. "14 app switches" is still reason 2. With no wearable it now carries even more of the reason.
- "Snooze until I finish this one": **not fixed**. It's still "Snooze 20 min" (frames 4 and 5).
- Keep-going check-in waits for my next pause: **not fixed**. It still says "around 4:05" (frame 6).
- Pre-mark exam nights from the calendar: **can't tell**. It wasn't in my walk.
- "40 min" vs "45 min" to lab: **fixed**. The header says "45 min to Chem lab" and the chip says "45 min from now" (frame 4).
- 24/7 line on the sleep card: **can't tell**. I saw no sleep card without a wearable.
- Snooze visible with See why open: **fixed**. Frame 5 shows "Snooze 20 min · This looks wrong · Hide why". On iPhone, though, that row sits on the card's rounded bottom edge and looks clipped.
- Cut "we'll keep this card around, gently": **can't tell**. It wasn't shown.
- The earlier fixes still hold: no location, no Today bar, "Early read" is defined.

1. **My run-through, moment by moment:**
   - Frame 1, choose source 🙂: "Optional. Halftime works without it" means no guilt. Apple Watch says "Later". Wait, "Needs the Halftime iPhone app"? Then what am I using right now?
   - Frame 2, laptop only 😀: Two taps and I'm done. "No wearable needed." Good.
   - Frame 3, learning 😕: It says suggestions haven't started, then gives me "Keep going / Walk 5 min" buttons anyway. That's a mixed message. `[from stills]` I can't tell whether this card pops up at 3:45 on its own.
   - Frame 4, suggestion 🙂: "2 h 40 min" plus "back by 3:50, well before lab". I'd believe that. Nothing about my body. 
   - Frame 5, See why 🙂: "Sleep · not connected · suggestions use your laptop and calendar" is honest. I'd actually rather it never shows me "slept 5 h 10 min" during exam week.
   - Frame 6, keep going ❌: "Around 4:05" on a clock, not when I finish the problem. Same wall as last time.
   - Frame 7, Data sources 🙂: "Never what you type, read or browse." Toggles I can turn off. "Class + games" is on by default for me, a bio major.
   - Frame 8, where it goes 😐: Two placeholders in brackets. Then "the project team sees de-identified study data". So I'm in a study? That's the first time I've heard it, on the last line of Settings.
   - Laptop frames 😐: It's a phone card centered on my MacBook. `[from stills]` I still can't see how it reaches me on the laptop either: tab, menu bar, or notification.

2. **The brutal truth:**
   1. Frame 6: "I'll check in again around 4:05." The wearable work doesn't touch the thing that would make me delete it. And with the Watch "coming later", the face-down-phone problem has no answer at all.
   2. Frame 8: "Stored" and "Kept for" are exactly the two lines I'd read, and both are brackets. The study disclosure should be in setup, not buried at the bottom of Settings.
   3. Frame 1: Apple Watch says "Needs the Halftime iPhone app". That made me unsure whether what I'm holding is the app.

3. **What actually worked:** "No wearable" is a real first-class choice (frame 1), with a single "Choose" and no nagging afterwards. The Sleep row in See why says "not connected" instead of guessing. "Location · never used · never asks for one." "Delete all my data" is visible without digging, though I'd need to see what happens after the tap.

4. **Trust and safety:** Nothing sounded like a diagnosis. "Talk to someone" sits in the footer on every frame, and I like that. The AI-writer example, "slept 5 h 10 min, usual 7 h", is the kind of number that would make me spiral. Fine as an example, but it shows what's coming if I ever connect sleep. Delete has no visible confirmation, and doesn't say whether it also removes the study copy.

5. **Fix list:**
   1. **Check in at my next natural pause (laptop idle, or I leave Anki), not at 4:05, and add "Snooze until I finish this one."** That's the version of my Watch ask you can build without a Watch. I'd stop dismissing it out of reflex. You'd know it worked if I don't tap "Got it" within 2 seconds of the check-in.
   2. **Fill in "Stored" and "Kept for", and say "this is a study, the team sees de-identified data" at setup.** My consent goes from 0.60 to about 0.75. You'd know it worked if I can say how long my data is kept without opening Settings.
   3. **Ask "Do you have games?" at setup, or default to "Class only".** It shouldn't read 14 days of my calendar for games I don't play.
   - **Cut:** the "Keep going / Walk 5 min" buttons on the learning card (frame 3).
   - **If you fix only one thing:** check in at my next pause instead of at a clock time. That replaces my old Watch-tap ask, because frame 1 says the Watch is "coming later".

6. **What I'd want:** Laptop and calendar only, no sleep numbers. A single quiet nudge on the MacBook when I finish a problem, at around 2.5 hours, and silence during the 48 hours before an exam unless I ask.

7. **Score line:**
`ICP_1 | 2026-11-05 | Wearables: setup (no wearable), suggestions without sleep, Data sources (iPhone + laptop) | MEH | Clarity 8 · Trust 7 · Timing 5 · Useful 6 · Control 7 · Feel 7 · Come back 5 | overall 6 | week 0.40 · recommend 0.30 · consent 0.60 | one-fix: Check in at my next natural pause (not 4:05) + "snooze until I finish this one"`

How the scores moved, and why: Feel went from 8 to 7 because the Snooze row on iPhone sits on the card edge. Control stayed at 7: the new page explains what it collects, but "where it goes" is blank. Week went from 0.40 to 0.40, because setup was never what would make me quit. My one-fix changed only because the product now shows the Watch as "coming later".

### ICP_2 · Diego Ramírez

My watch isn't on your list. Not even "coming later". So I picked "No wearable", and honestly that's fine with me, because my coach can't see what I never connected.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 (no change) |
| 5-second read | Frame 1: "pick your sleep tracker". I looked for Garmin, didn't find it, and tapped No wearable. |
| Where I'd quit | Not during setup. At frame 8 I'd stop before turning anything else on, because of the brackets. In real use I'd quit at the first "Short walk now?" on a lift day. |
| P(still running in a week) | 0.25 |
| P(I'd recommend it) | 0.15, maybe to a non-athlete in study hall |
| P(I'd consent to the data it asks for) | 0.55 for laptop and calendar "Class + games". I'd hold off on "project team sees de-identified study data" until it says who that is. |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Garmin app plus study hall's own clock |

**Since last time**
- Knows training load and travel days: **not fixed**. Calendar reads "next class, plus away games" only to leave travel nights out of sleep. Nothing about practice or lifts. With no wearable it knows nothing about my legs.
- "Only you see this" and where watch data goes, on every card: **not fixed on the card**. "Never your coach, team or school" now exists, but only at the bottom of Data sources (frame 8), with "[confirm with CSO]" in the same sentence.
- Options for a bus or study hall, including a nap: **not fixed**. Frame 4 is still Walk 5 min / Keep going.
- Short-nights card asks about travel before counseling: **can't tell**. No sleep card on the no-wearable path.
- Read practice, lift and game blocks from the calendar for the main card: **not fixed**. The toggle only offers "Class + games" or "Class only".
- Morning headline subtracts away games: **can't tell**. No morning card shown. The calendar text suggests the mechanism exists.
- Say how often "gently" means: **can't tell**. The word isn't on any frame. Frame 6 does say "check in again around 4:05", which is the kind of answer I wanted.
- "40 min" vs "45 min" to lab: **fixed**. It's 45 everywhere in frames 3–6.

1. **My run-through, moment by moment**
- 01 Choose source: Fitbit, Oura, WHOOP, Apple Watch "Later". No Garmin, and no line saying why. 😕 I tapped No wearable.
- 01 footer: "Never... the device's own scores like Readiness or Recovery." Good. That's the stuff the staff reads. 🙂
- 02 Laptop only: "No wearable needed." No guilt trip. 🙂 Done.
- 03 Learning: it says suggestions start after session 3, then shows Walk 5 min / Keep going buttons anyway. Which is it? 😐
- 04 Suggestion: organic chemistry, chem lab, walk. Still someone else's day. 😴
- 05 See why: "Sleep · not connected" shown honestly, and "Early read" is defined as under 10 afternoons. 🙂
- 06 Keep going: "Your call." Fine. 🙂
- 07 Data sources: toggles, "Class only" option, "Location · never used". That's real control. 😀
- 08 Bottom: "Stored [confirm with CTO]", "Kept for [confirm with CTO]", "[confirm with CSO]". ❌ for consent today.
- Reconnect and not-synced states: not on my path, so n/a. Motion and timing: `[from stills]`.

2. **The brutal truth**
1. Frame 1 has no Garmin. Apple Watch gets a "coming later" row and the watch my whole team wears gets nothing `[my story]`. That's the clearest sign this was built for someone else.
2. Going without a wearable makes my core problem worse. Laptop plus class-and-games calendar can't tell a lift day from a boring day, so frame 4 will tell me to walk on dead legs, or on a bus.
3. Frame 8 puts the sentence I've been asking for ("Never your coach, team or school") next to "[confirm with CSO]". Half a promise reads as no promise. And "de-identified" in a class with few D1 athletes might still point to me `[unverified]`.

3. **What actually worked**
- "Optional. Halftime works without it" on frame 1. No-wearable is a first-class choice, not a fail state.
- "Class only" lets me keep my game schedule out.
- "Location never used". Travel weeks make that matter to me.
- "This looks wrong" and "Delete all my data" are both visible without digging.

4. **Trust and safety**
Nothing sounds like a diagnosis, and "Talk to someone" is on every frame. The "Early read" label is honest. The brackets are the trust problem: I can't agree to storage I can't see. If you ever add Garmin, tell me whether whoever manages a team-issued account could see that I connected Halftime `[unverified]`.

5. **Fix list**
1. **Add "Practice + lifts" to the Calendar choices** (opt-in) so the main card offers sit or nap, not walk, after training or on the bus. *Why:* it's the only way no-wearable me gets a suggestion I'd follow. *Know it worked:* on a lift-day sample, frame 4 never says walk.
2. **Fill the three brackets** and name "the project team". *Why:* takes my consent from "wait" to yes on laptop and calendar. *Know it worked:* no "[confirm" left on frame 8.
3. **Give Garmin a row**, even "not supported, here's why", plus a team-issued warning. *Why:* I'd stop feeling like a guest. *Know it worked:* athlete testers pick a row in 5 s without asking "where's Garmin?".
- **Cut:** the Walk 5 min / Keep going buttons on the learning card (frame 3). They contradict "suggestions start after your third study session".

**If you fix only one thing:** let the calendar read practice, lift and travel blocks, so the card offers sit or nap instead of walk on those days.

6. **What I'd want**
At 7 pm study hall after a lift, on my laptop, a card that says "you trained this afternoon, sit, 10 min eyes closed" and "only you see this". On the bus, "nap 20, study the last 20". No watch connected. I'm fine with that.

7. **Score line**
`ICP_2 | 2026-11-05 | Wearables setup, no-wearable path + Data sources (iPhone; Garmin not offered) | MEH | Clarity 8 · Trust 7 · Timing 6 · Useful 4 · Control 8 · Feel 7 · Come back 4 | overall 5 | week 0.25 · recommend 0.15 · consent 0.55 | one-fix: Calendar reads practice/lift/travel blocks so the card offers sit or nap, not walk`

Score moves: Control 7→8 (Data sources toggles, "Class only", location never used, delete). Everything else is unchanged. Trust stays at 7: the coach line is new, but the brackets take it back.

New asks for my ledger: Garmin row or an honest "not supported" with a team-issued warning · fill Stored / Kept for / name "the project team" · remove the buttons on the learning card.

### ICP_3 · Anika Sharma

You built the screen I asked for three times. The two answers I actually need on it are still in square brackets, and you ask for my Google sign-in before I can even reach it.

| | |
|---|---|
| Verdict | MEH |
| Overall | 5/10 |
| 5-second read | "Pick a sleep source or skip it." Clear and honest. Frame 1 is the best onboarding screen you've shown me. |
| Where I'd quit | Frame 2, at "Go to Google". I won't grant OAuth to an unverified app before I know where the data is stored and for how long. When I do find that page (frame 8), it says `[Server and region: confirm with CTO]` and `[How long: confirm with CTO]`. |
| P(still running in a week) | 0.20 |
| P(I'd recommend it) | 0.15, and only to a classmate on a Mac with a Fitbit |
| P(I'd consent to the data it asks for) | 0.50. I'd give it sleep length. I'd refuse HRV (asked for, never used) and "Class + games" |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | The Fitbit app's sleep view, plus a Pomodoro timer on my ThinkPad `[my story]` |

**Since last time**
- Where data goes, the LLM boundary, deletion: **partly fixed.** The screen exists and "The AI writer sees" is a real answer. Stored and Kept for are placeholders. Delete is a bare red link.
- Linux laptop collector and Fitbit support: **partly fixed.** Fitbit now connects. The laptop card still says "this MacBook", and nothing mentions Linux.
- Calendar and location as sources: **fixed.** Calendar has a toggle, and Location says "never used".
- Calendar scope (14 days): **fixed** in words, and "Class only" exists. But "Class + games" is selected by default, and I don't play on any team.
- "Only you see this" / "Nothing is shared" absolute claims: **worse.** The escalation text in the page still says both. Data sources now admits the AI writer and the project team see data. The two contradict each other.
- Real escalation links: **not fixed.** The page still has `[Campus counseling, 24/7: confirm]`, and the footer "Talk to someone" leads nowhere.
- "This looks wrong" → "That was one task", and it learns: **fixed** in the page text ("editor and docs", "It'll learn from this"). Not in my frames.
- App switching while debugging counts as work: **can't tell.** I still have to correct it after the fact.
- Cut "Walk, water, window": **not fixed.** It's still in the page.
- "Early read" needs a without-walk comparison: **not fixed.** It's still "4 of 6 … after a walk" with no comparison.
- Is the escalation flag logged anywhere: **not fixed.** Data sources doesn't mention it.

1. **My run-through, moment by moment**
- F1, choose source 😀: "Optional", "No wearable" as an equal row, and "never the device's own scores". Exactly right.
- F2, before Google 🙂 then ❌: warning me about "unverified app" ahead of time is honest, and so are "fewer than 100 testers" and "read only". But no scope names are shown, and there's no link to where the data goes. I'd stop here.
- F3, connected 😕: "Fitbit Air connected." I own a Charge `[my story]`. Is it even reading the right device? "Night 1 of 7" is honest.
- F4, See why 🙂: Sleep is sourced as "Fitbit Air · synced 38 min ago · usual about 7 h". Good provenance. HRV appears nowhere, so why ask for it?
- F5, out of date 😀: "Sleep is left out today: … hasn't synced since yesterday 7:42 am." This is the honest fallback I want.
- F6, reconnect 🙂: a weekly OAuth round trip. I'd tolerate it for two weeks, then hit Later. I can't tell from stills if this is a push or only in-app `[from stills]`.
- F7, Data sources 😐: the toggles are real control. On iPhone, "Where your data goes" is the last card, and only its heading shows above the fold.
- F8, bottom ❌: two brackets, and "Delete all my data" says nothing about what it deletes. In the page code the button has no action at all.

2. **The brutal truth**
1. You ask for consent before you disclose anything. Frame 2 sends me to Google, and storage and retention only appear after I've connected (F3 → Data sources). Even there, frame 8's answers are brackets.
2. Deletion isn't believable yet. "Delete all my data" (F8) says nothing about server copies, the Google token, the AI provider's logs, how long it takes, or what receipt I get. "Disconnect" (F7) doesn't say whether it revokes the token or wipes the sleep you've already stored.
3. You collect more than you use, and you don't know my devices. HRV is requested (F1, F2) and never shown as a reason (F4). "Fitbit Air" isn't my device, "this MacBook" isn't my laptop, and "Class + games" is on by default for me.

3. **What actually worked**
- F1's "no wearable" path.
- F2 warning me about Google's "unverified app" screen before I see it.
- F5 dropping sleep openly instead of guessing.
- "The AI writer sees: short summaries only … Never raw data or app names." That is the right boundary, stated plainly.

4. **Trust and safety**
- "De-identified study data": daily sleep plus session times plus class times is re-identifiable. Say "pseudonymised", or say what you remove.
- The AI writer line doesn't name the provider or say whether it keeps prompts.
- Google's consent screen may say "heart rate" rather than "HRV", which would be broader than what you told me `[unverified]`. Show me the exact scope strings.
- No diagnosis language anywhere. Good.

5. **Fix list**
1. **Put real answers in Stored and Kept for, and show them in three lines on F2 before "Go to Google"** (server and region, retention, AI provider and its log policy). That would move me from Back to Go to Google. You'd know it worked when pilot testers tap through without asking "where does this go?".
2. **Make Delete and Disconnect say exactly what happens**: token revoked, stored sleep kept or wiped, server and backups gone within N days, and a timestamped confirmation. That's the line between trying it and not. You'd know it worked when a tester's export comes back empty after Delete.
3. **Drop the HRV scope until a reason uses it, and list Google's exact scope names on F2.** Asking for less makes me say yes faster. You'd know it worked when consent completion goes up.
- **Cut:** "Class + games" as the default for anyone not on a team.

**If you fix only one thing:** fill in Stored and Kept for, and show them before "Go to Google".

6. **What I'd want**
Sleep from my Charge in the morning on my iPhone, and a session nudge on my ThinkPad at 11 pm when I'm deciding whether to chase a bug `[my story]`. Without a Linux collector, I only get half of this app.

7. **Score line**
`ICP_3 | 2026-11-05 | Wearables setup, sync states, Data sources (laptop + iPhone, Fitbit) | MEH | Clarity 8 · Trust 6 · Timing 5 · Useful 4 · Control 6 · Feel 7 · Come back 3 | overall 5 | week 0.20 · recommend 0.15 · consent 0.50 | one-fix: real Stored + Kept-for answers shown before 'Go to Google'`

Score moves vs. re-test 2: Control +1 (per-source toggles, Class only, Disconnect, Location never). Consent 0.45 → 0.50. Everything else held:
- Trust stays at 6: the brackets and the contradiction with "Nothing is shared" cancel out the honest sync handling.
- Come back stays at 3: there's still no Linux support.

### ICP_4 · Jordan Lee

Finally, a screen that says "No wearable needed" in green. Then Data sources says "this MacBook", and I'm on my family's Windows laptop.

| | |
|---|---|
| Verdict | MEH |
| Overall | 6/10 (up from 5) |
| 5-second read | Setup asking which expensive band I own. |
| Where I'd quit | Data sources, the line "Laptop · on · this MacBook" (frame 07). Nothing I saw says Windows works. If it's Mac-only, I'm out before step 1, which I never saw. |
| P(still running in a week) | 0.30 |
| P(I'd recommend it) | 0.20, to my study-group friend with a MacBook |
| P(I'd consent to the data it asks for) | 0.50. I'd say yes to laptop plus calendar "Class only". I'd refuse "Class + games", and I'd hold off while storage and retention say "[confirm…]" |
| If it vanished tomorrow I'd be | not disappointed |
| What I'd use instead | Phone timer plus my class schedule in Google Calendar |

**Since last time**
- No-watch path shown first (asked 3 times): **partly fixed.** The words are right: "Optional. Halftime works without it", then "No wearable needed." Suggestions now start after 3 study sessions with no sleep gate. But "No wearable" is the *last* of 5 rows, under four branded devices, and on my SE it's cut off at the bottom edge.
- Shared-laptop handling ("not me" / pause): **partly fixed.** The page text has "That wasn't me: Someone else was on this laptop", but it's behind See why → This looks wrong. I never saw it on my SE frames. The Laptop toggle in Data sources works as a pause.
- "Is this you?" on the pill when the laptop wakes: **partly fixed.** Per the page text it only shows up *after* I report "That wasn't me". It's not on by default for a shared laptop.
- See why covers the class card on the small laptop: **not fixed.** In frame 05 the card runs to the bottom of the screen and the Chem lab card is gone.
- Keep Snooze visible when See why is open: **not fixed.** On the laptop it's half-clipped at the bottom edge. On my SE the frame ends mid-sentence ("never what you type, read or browse") and I can't see Snooze, Hide why or any button.
- Drop the sleep line from Keep going when there's no sleep data: **fixed.** Frame 06 only mentions 2 h 40 and 14 app switches.
- "40 min" vs "45 min": **can't tell from my frames.** The page text now says "Back by 3:50, still 40 min before lab", and that adds up.
- Calendar source/consent, numbers that agree, define "helped", cut the tally: still fixed.

1. **My run-through, moment by moment**
- 01 Choose source (SE): 😕 Fitbit, Oura, WHOOP, Apple Watch, and two of them say "uses your membership". It reads like a price list. My option is last and cut off.
- 02 Laptop only: 🙂 "No wearable needed." in green, and two buttons. That's the screen I've been asking for.
- 03 First days: 🙂 "2 of 3 sessions". It's a count, not a streak, so nothing breaks. I still get Keep going / Walk 5 min on day 1.
- 04 Suggestion: 🙂 Built only from laptop and calendar. "Early read" is honest.
- 05 See why (SE): 😕 Sleep says "not connected", fine, but the card is cut off and there's no way out on screen. `[from stills]`, so maybe it scrolls.
- 06 Keep going: 😀 "Your call." No guilt.
- 07 Data sources: ❌ "this MacBook". "Class + games" is pre-selected, and I don't play anything.
- 08 Bottom: 😐 "Location never used" is good. But "Stored", "Kept for" and "Who else sees it" all say "[confirm…]".

2. **The brutal truth**
1. "on · this MacBook" (frame 07). The no-watch fix means nothing if the laptop part needs a Mac. I'd also need to see how big the laptop install is and whether it slows a 1366×768 Windows machine. Nothing shown answers that.
2. Step 2 makes my path the leftover option. It sits below Apple Watch "Later" and is cut off on the SE. I heard that as "this is for people with bands".
3. "Where your data goes" has blanks exactly where my consent questions are: where it's stored and how long it's kept. "Delete all my data" is red and clear, but I don't know what happens when I tap it.

3. **What actually worked**
"No wearable needed." Suggestions that don't wait on sleep. "Your call. I'll check in again around 4:05." Data sources saying "Never what you type, read or browse" and "never asks for" location. No nagging to buy a device: "Add a sleep source" just sits there.

4. **Trust and safety**
Nothing sounds like a doctor. "Talk to someone" stays in the footer. One small thing: the "AI writer sees" example is a sleep line ("slept 5 h 10 min"), which doesn't apply to me. "The project team sees de-identified study data [confirm with CSO]" needs an actual answer before I'd tap yes.

5. **Fix list**
1. Say "Windows and Mac" (or browser-only) on setup and in Data sources, and show my actual device and the install size. This decides whether I start at all. You'd know it worked if Windows users finish setup.
2. Put "No wearable" as the first option, or as a button above the device list. Then I don't scroll past four brands to find myself. You'd know it worked if no-wearable people pick it without scrolling.
3. Fill in Stored and Kept for, and say what Delete does: instant or not, and whether there's a confirm step. I'd consent faster. You'd know it worked if consent goes up and fewer people stop on frame 08.

**Cut:** "Class + games" as the default for people with no games on their calendar. Default to "Class only".

**If you fix only one thing:** tell me on the first setup screen that it runs on a Windows laptop.

6. **What I'd want**
Kitchen table, 9 pm after a shift, on the Windows laptop. The pill tells me how long I've been at it and when my next class is, and asks "Is this you?" whenever the laptop wakes, because my brother uses it too `[my story]`. On the phone I'd only check the card. I'd never add a sleep source, and that's fine.

7. **Score line**
`ICP_4 | 2026-11-05 | Wearables: setup, no-wearable path, Data sources (iPhone SE + small laptop) | MEH | Clarity 7 · Trust 6 · Timing 6 · Useful 6 · Control 7 · Feel 6 · Come back 4 | overall 6 | week 0.30 · recommend 0.20 · consent 0.50 | one-fix: Say Windows works on the first setup screen; no-wearable option first`

Score moves: Useful 5→6 and Come back 3→4 because suggestions now start without a watch. Feel 7→6 because See why on the SE is clipped with no buttons, and the device list reads like a price list. Overall 5→6. Clarity, Trust, Timing and Control are unchanged.

### ICP_5 · Sam Whitaker

The first screen promising never to touch my Readiness score almost won me over. Then the page about where my data goes was mostly blanks in square brackets.

| | |
|---|---|
| Verdict | MEH (closer to I'D USE IT) |
| Overall | 6/10 |
| 5-second read | "An app asking for my ring's sleep, and it says I can skip it." |
| Where I'd quit | I wouldn't quit setup. At frame 8, "Where your data goes", I'd go back and tap **Disconnect** on the ring if the real app still said "Stored: [Server and region: confirm with CTO]". I'd keep laptop only. |
| P(still running in a week) | 0.40 |
| P(I'd recommend it) | 0.30, to my sister, not to anyone in my seminar |
| P(I'd consent to the data it asks for) | 0.70. I'd refuse "de-identified study data" until someone tells me what study. |
| If it vanished tomorrow I'd be | somewhat disappointed |
| What I'd use instead | The Oura app (which I dread), plus nothing |

**Since last time**
- Name every source, ring not "watch": **fixed**. Frame 3 says "Oura Ring · synced 38 min ago".
- Cut the sleep dot on the See-why slider: **fixed**. The sleep row in frame 3 has no slider at all.
- The chip breaking "in [1]" mid-sentence: **fixed**. Chips now come after the value ("2 h 40 min [1], with").
- Real counseling name and number, no brackets: **not fixed**, fourth time. Frame 6 still says "[Counseling booking: confirm]" and "[Campus counseling, 24/7: confirm]".
- A night version with no next class: **not fixed**, fourth time. Worse in one way: the page now says in writing that the short-nights card comes "only in the morning". The "Talk to someone" link at the bottom is on every frame, so help is at least reachable at 1 am.
- SAFETY, marking exams must not turn the card off: **fixed in the page's words** (not in my frames). It says "Exam and deadline nights still count."
- Legend dot blue, marks on nights dark: **can't tell**. The nights picker isn't in my frames.
- Earlier fixes (Keep going, 'break', 'Why am I seeing this?', 'Not now', travel picker) still hold where I could see them.

1. **My run-through, moment by moment**
- F1 Choose source 😀: "Optional. Halftime works without it." Then the small print: never "the device's own scores like Readiness or Recovery". That line is why I'd connect. 😕 at "uses your Oura membership": does this cost my parents money? I don't know. "Heart-rate variability (HRV)" spells out the letters but still doesn't tell me what it is.
- F2 Connected 🙂: no number, no grade. "Night 1 of 7" is honest. The seven bars look a bit like a streak I could fail.
- F3 See why 🙂: Oura Ring is named, and 5 h 10 min against "usual about 7 h" reads as a fact, not a grade. 😕 It reads my HRV, but HRV appears in none of the four reasons. So why take it?
- F4 Out of date 😐: "Sleep is left out today" is honest. It doesn't tell me what to *do*. I wouldn't know to open the Oura app to make it sync `[unverified]`.
- F5 Reconnect 😀: plain, calm, "everything else carries on". `[from stills]` I can't tell if this pops up or waits for me, and I never saw Oura's own sign-in screen.
- F6 Short nights 🙂/😕: the headline sounds like a person. It's what I asked for. Then "the 3 away-game nights". I don't play sports `[my story]`, so it feels like someone else's life. And the two brackets sit right where the help should be.
- F7 Data sources 🙂: "Location: never used" and "never what you type, read or browse" are clear. 😕 The ring has an on/off switch *and* a Disconnect button. I read literally: what's the difference?
- F8 Bottom ❌: Stored: bracket. Kept for: bracket. Who else sees it: "de-identified study data [confirm with CSO]". I didn't know I was in a study. "The AI writer" is which company? "Delete all my data" never says what happens next. I'd need to see that.

2. **The brutal truth**
1. Frame 8 is the answer to your own question ("would you trust what it does with your data?"), and three of its four answers are blank. I can't trust a blank.
2. The help card (F6) still has no real place or phone number after four rounds. Of everything here, it's the one most likely to matter to me on a bad night.
3. You take my HRV and never show it in a reason. You don't explain it in a sentence either. Taking something you don't use is how apps lose me.

3. **What actually worked**
"Never… Readiness" on F1 and again on F7. The No wearable option sits alongside the others, not as a buried link. F4 and F5 leave sleep out rather than guess. F6's "Want to talk it over with someone?" and the page's line "It's not a diagnosis".

4. **Trust and safety**
Nothing sounded like a doctor. The missing counseling contact is a safety gap, not a detail. "Study data" showing up only at the bottom of Settings feels like consent I never gave.

5. **Fix list**
1. **Fill every bracket on F6 and F8.** Name the real counseling service and number, say where my data is stored and for how long, say what the study is, and give me an opt-out. *Why:* it decides whether I keep the ring connected. *How you'd know:* a tester can answer "where's my sleep stored and for how long?" from that page alone.
2. **A 1 am version.** "Stop for tonight?" with the short-nights help on it, and no next class. *Why:* that's when I'm actually awake and stuck `[my story]`. *How you'd know:* testers open it after midnight.
3. **F4: tell me what to do.** Add "Open the Oura app to sync", and explain HRV in one sentence. *How you'd know:* nobody asks "what's HRV?" or "why is sleep missing?".

**Cut:** reading HRV, unless a reason actually uses it.

**If you fix only one thing:** replace every "[confirm]" on the short-nights card and on "Where your data goes" with real answers.

6. **What I'd want**
On my iPhone, around 1 am, with the laptop still open: one quiet screen saying "you've been at it a while, maybe stop", plus a real number to call if the nights keep going like this. And my ring connected without its morning grade ever showing up.

7. **Score line**
`ICP_5 | 2026-11-05 | Wearables: setup, out-of-date sync, reconnect, short nights, Data sources (iPhone, Oura) | MEH (closer to I'D USE IT) | Clarity 7 · Trust 6 · Timing 5 · Useful 6 · Control 8 · Feel 7 · Come back 5 | overall 6 | week 0.40 · recommend 0.30 · consent 0.70 | one-fix: Replace every [confirm] on the short-nights card and 'Where your data goes' with real answers`

Score moves: Trust 7→6, because frame 8's blanks plus the surprise "study data" outweigh the gain from naming the ring. Consent 0.65→0.70, because of the "never Readiness" promise. Everything else is unchanged.

## Related

- [[25-journal/2026-11-05-icp-island-forecast-retest2]] (previous round) · [[03-users/personas/icp-personas|ICP Personas]] · [[25-journal/25-journal|Journal hub]] · [[05-data/data-sources|Data sources]]
