# ICP testing 1 · build 2026-11-14 (9b4zaiimv) · full journey, 2 days, phone + laptop

> **Synthetic test, not research.** One made-up persona (ICP_6 Ethan Park) judged real screens of the app filled with
> made-up data. His answers are hypotheses to check with real classmates, never evidence, and may not be quoted as a real
> person's words. Method: `../FRAMEWORK.md`. How it ran: `SETUP.md`. His full answers (A1–N8): `REPORT-persona.md`.

| | |
|---|---|
| Persona | ICP_6 · Ethan Park: 24, MS Data Science at Columbia, club rower (6 am practice ×6/week), WHOOP 4.0, Notion · Google Calendar · Todoist · Forest |
| Devices | iPhone 15 (390×844) and MacBook Air in Chrome (1440×900), Chrome emulation |
| Tested | Landing → sign-up (9 steps) → tour → every tab on the phone → laptop log-in and setup → Night tab with 30 made-up WHOOP nights → a Halftime-timed session with suggestion, See why, walk, check-in, survey → day 2: phone check, new night, changed bedtime, a fixed 25/5 session, History, You, `/desktop` |
| Captured | 105 screens, 0 console errors, 0 failed steps in the final walks |

## Headline (unsoftened)
**I'D QUIT · overall 4/10 · NPS 3 · Sean Ellis: not disappointed · P(still using in a week) 0.15 · SUS 52.5 · UMUX-Lite 3/7 and 5/7.**
- **Where he'd quit:** day 2 morning on the iPhone. The Night tab said "Your WHOOP connects on a laptop", and History said
  "None yet" the morning after a session he'd done on the laptop under the same name.
- **The hard blocker before that:** the laptop sync asks him to turn off his phone's Bluetooth. His WHOOP is paired to
  his phone, and he reads Recovery every morning.
- **His one-line summary:** "A 50-minute study timer that shortens when you slept badly, and shows its working." He
  already has that, in Forest.
- **If you fix only one thing (his):** a **stop-for-tonight** call from tomorrow's first calendar event: "Practice at 6:00.
  Stop by 10:45 for 7 h." It's the decision he gets wrong every week, and neither WHOOP nor Forest makes it. The sample
  week already shows this card ("Stop for tonight? Class at 9:30 am"); the real app doesn't.

## Scores (the ICP scale, 1–10)
| Clarity | Trust | Timing | Useful | Control | Feel | Come back | Overall |
|---|---|---|---|---|---|---|---|
| 6 | 5 | 4 [from stills] | **3** | 6 | 6 | **2** | 4 |

P(recommend) 0.15, to a laptop-only student with no wearable and no timer habit. P(consent) 0.55: he'd refuse mouse paths
and IP/location, and pick "Use it without sharing".

## What worked (his top 3, specific)
1. **See why**: "rule v0 … a starting rule the team chose, the same for everyone". "The most honest screen in the app."
2. **How these are worked out**: the method, browser-only storage, "Delete WHOOP data from this computer". "The most trustworthy screen."
3. **"Is this when you slept? Yes / Change"**: one tap, and an editable window that recomputes.
Also kept: the What-it-reads step with its "Never" list, the walk/break screen, the consent screen's completeness, the
check-in's questions 2 and 3, and the laptop's recent-sessions list.

## Findings, ranked by impact, with what kind of fix each is
Checked against the code by the session that ran the round. **Bug** = wrong or contradictory, fix in place.
**Design** = Heramb's lane. **Team** = changes what's collected, scope or claims.

| # | Finding (screen) | Kind | Checked |
|---|---|---|---|
| 1 | **No stop-for-tonight.** At 8 pm, setup says "Your next stop · Nothing after" with Calendar connected; it never looks at tomorrow's 6 am practice (31-d1-laptop-setup-session). Exists only in the sample week (40-d1-history-sample). | Team (needs a real calendar read; none is built) | ✓ sample calendar is today-only |
| 2 | **Phone and laptop never meet.** The phone shows no night and no sessions the next morning (47, 48-d2). Login on the laptop re-runs setup (02–18-d1-laptop). | Team (nights/sessions on the server; consent text) | ✓ by design today |
| 3 | **Bluetooth sync fights the phone's WHOOP app** ("If your phone is still paired, turn its Bluetooth off", 20-d1-laptop-night-connect). He'd stop the first evening he has to do it. | Team/CTO (WHOOP's official API for members, or test whether the 4.0 accepts a second connection) | ✓ instruction is ours |
| 4 | **"That's your usual" on a 5 h 04 night**, then "first break 10 min sooner because you slept under 6 hours" (22-d1-laptop-night). A personal usual built from a short-sleep month makes short sleep look normal, and 7 h 40 read as "over your usual". | Design + CSO (add an absolute floor, e.g. under 7 h never reads "usual"; this is also where escalation would live) | ✓ (the made-up month was mostly short practice-day nights) |
| 5 | **Training isn't used.** Setup shows "Morning practice · 1 h 20 min · avg 146 bpm" (19-d1-setup) and it never returns; his core question is training vs study fatigue. | Team (research the metric; WHOOP workouts aren't read today) | ✓ |
| 6 | **See why contradicts itself**: "It can't see your laptop or a real watch yet" under reason 2 "WHOOP 4.0 · read at 8:02 pm" (34-d1-laptop-why). | **Bug** · **fixed 2026-11-15** (now "It can't see your laptop yet." when the sleep came from a watch) | ✓ |
| 7 | **Consent is stale**: "What isn't: Anything from a real watch or calendar. Those numbers are sample data" (28/29-d1-laptop-consent) after a real WHOOP sync. | **Bug** · **fixed 2026-11-15** (with a watch connected: "Your watch's readings. They stay on this computer…" and "Anything from a real calendar") | ✓ |
| 8 | **WHOOP story mismatch**: setup says "WHOOP 5.0 connected … through your WHOOP account" (17–19, 23); the Night tab says WHOOP 4.0, Bluetooth, "No WHOOP account is used". | **Bug** · **fixed 2026-11-15** (setup now says WHOOP 4.0, "Your WHOOP connects on your laptop", Bluetooth, no WHOOP account, sample nights until the laptop syncs) | ✓ |
| 9 | **The tour sells a screen he never gets**: a full dashboard (pill, session line, Body today, calendar), then an empty "Ready to study?" (24–35-d1). | Design | ✓ |
| 10 | **"Share with the team" is ON before any consent** on the phone (42-d1-you). Usage analytics are on by default by an earlier decision; to him it felt sneaky. | Team (the 2026-11-06 default) | ✓ |
| 11 | **`/desktop` is still all sample** after 20 sessions and a real sync ("slept 5 h 10", Orgo, Team lift), and it shows a phone-pickups lane never declared in setup (57-d2). | Design (hide or label it until real) | ✓ |
| 12 | **Landing says "Built for Fitbit first"**, two scrolls above a table naming WHOOP (02, 07-d1-landing). | Team (approved copy, 2026-11-13) | ✓ |
| 13 | **History counts fixed-timer breaks as "suggestions taken"** ("14 of 18"), and shows no pattern, only a list (25-d1-laptop-history). | Design (separate the arms; one pattern line when there's enough) | ✓ (`study.js:922`) |
| 14 | **Check-in question 1 is a placeholder** ("A short task goes here", 38-d1). | Team (open decision #2) | ✓ |
| 15 | **Home Screen banner on every iPhone setup step** (09–23-d1-setup), and the phone-first landing for a laptop-first user. | Design | ✓ |
| 16 | **The Demo tab** reads as "a fifth tab of fiction" for a real user (44, 45-d1). | Design (move under You) | — |
| 17 | Small: "Halftime is listening" (to what?); "Agree and join" floats over a consent line (28). The role chips' "unclear selected state" (10-d1-setup-about-picked) was **not a bug**: the frame caught the 0.15 s colour fade; settled, the selected chip is solid black. | Design | ✓ (chips checked in a browser) |

**Not real findings (test artifacts):** the red "Test speed ×60" line and "Back by 8:03 pm" times (sessions ran at 60×);
"Notifications aren't switched on" (local copy; they're on live); day 2's "1 h" highlighted (the walk's frame was taken
before it tapped "45 min"); sample-calendar content (the app's own sample).

## What he wants it to become (after the mission reveal)
- **The link he most wants found:** hard morning training (WHOOP workout length and average HR) → 3–5 pm focus. Then
  3-night sleep debt → late-night problem-set efficiency, and the reverse: what time he stops studying → the next short
  night before 6 am practice.
- **What he'd let it measure:** app-kind switching rate (kinds only), time to the first switch, idle gaps, actual vs
  planned length, when he stops at night; tomorrow's first event; today's workouts. Not phone pickups. Never keystrokes.
- **How he'd want a finding told:** once, weekly, in History, with its n and how sure it is ("Early read: on 6 of 8 days
  after a hard morning row, your afternoon block ended 25 min early"), then a change to the plan, never a new score.
- **Who it's for, in his view, as it stands:** a laptop-only student with no wearable and no timer habit who needs a reason
  before taking a break. **Who shouldn't use it:** WHOOP users who check the phone app daily; anyone living in an IDE with the
  browser buried; anyone already sleeping short ("That's your usual" tells them it's fine).

## Suggested next steps (the team decides)
- **Quick bugs in our lane:** #6, #7 and #8 **fixed on 2026-11-15** (local; checked with a walk of the setup and a WHOOP session); #17's chips were a capture artifact. Deployed 2026-11-15 (halftime-study-h4yjdd071).
- **Design calls for Heramb:** #4 an absolute sleep floor (with the CSO), #9 tour, #11 `/desktop`, #13 History, #15, #16.
- **Team decisions:** #1 a real calendar read and a stop-for-tonight rule, #2 nights and sessions on the server, #3 WHOOP
  access route, #5 training as a candidate metric, #10 analytics default, #12 landing copy, #14 the study task.
- **Round 2:** the same persona after the quick fixes (to see what moved), plus a second persona with no wearable (the
  group he says it suits), then real classmates using `FRAMEWORK.md` §4 as the interview guide.

## Files in this round
`SETUP.md` · `REPORT-persona.md` (all of A1–N8, diary, score line) · `MISSION.md` · `screens/` · `sheets/` · `walks/` · `rerun/`

## Fixes applied after this round (2026-11-15, Heramb chose; deployed 2026-11-15 as halftime-study-h4yjdd071)
Heramb picked 1–9 and 12 of the quick UI/UX list and left out "move Demo under You" and the landing's Fitbit line.
| Finding | What changed | Where |
|---|---|---|
| #4 "That's your usual" on short sleep | Under 7 h never reads plain "usual": "Short, and short has been your usual lately"; row word "Under 7 h · your usual lately". 7 h+ above usual is "A full night, longer than your usual lately". Before 7 nights: "That's under 7 hours." | `site/assets/night-tab.js` |
| #13 "Suggestions taken" counted fixed-timer breaks | Tile is "Halftime suggestions taken" (Halftime-timed sessions only); fixed-timer sessions get their own line | `site/assets/study.js` |
| #17 "Halftime is listening" | "Halftime is timing this session · It uses this timer and last night's sleep…" | `site/assets/study.js` |
| #17 consent buttons over the last line | Extra space under the consent screen | `tools/site/build-app.py` |
| #14 placeholder check-in question | Skipped until the team picks the task: the check-in is "1 of 2", "2 of 2" | `site/assets/study.js` |
| #15 Home Screen banner on every setup step | Landing page and setup's first step only (setup moves by pushState, now watched) | `site/assets/install-tip.js` |
| #11 `/desktop` all sample | Top-bar link reads "Sample: every source on one clock"; the phone-pickups lane says "sample data" | `build-app.py`, `site/desktop.html` |
| #9 tour vs the real first screen | The tour's last step: "That was a sample afternoon. Yours starts when you press Start studying…"; the start screen shows "Last night: 5 h 04 min of sleep, from your WHOOP 4.0 · See last night" when synced | `site/assets/tour.js`, `study.js` |
| Phone Night tab useless | With nothing synced, the phone leads with "Your WHOOP syncs on a laptop…" and "Type last night's sleep", then shows the sample night right away | `site/assets/night-tab.js` |
| N8 "which timer am I getting?" | Session setup says which timer this session uses before it starts | `site/assets/study.js` |
Checked: both round-1 walks re-run (phone 48 frames, laptop 57), 0 console errors; tests pass (night 48, study rule, data 22).
