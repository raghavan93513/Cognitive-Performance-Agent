# Halftime persona testing: the framework

A repeatable way to put one synthetic tester (an ICP persona, `.claude/agents/icp-N.md`) through Halftime as a real
user would, and to get feedback that can be compared round to round. Written 2026-11-14 for round 1; reuse it as is.

**What this is not.** Persona feedback is a rehearsal, never research. No persona quote goes into the proposal,
writeup, demo or slides as if a real person said it, and it never counts toward the evaluation plan's user testing
(see `.claude/skills/icp/SKILL.md`). Real classmates are the test that counts. All data in a round is made up.

---

## 1. Folder and naming

```
ICP testing/
  FRAMEWORK.md                      this file (the method and the full question bank)
  README.md                         one line per round
  ICP testing N - <build> - <what was tested>/
    REPORT.md                       the persona's answers to every section below, plus the team's summary
    SETUP.md                        build, devices, persona, dummy data, the clock, what was and wasn't run
    screens/                        the frames the persona judged (made-up data only)
    walks/                          walk.md files from tools/qa/device-walk.mjs (visible text per frame)
```
- **N** counts rounds (1, 2, 3 …). **Build** = the date and the Vercel deployment id (or the git commit). **What was
  tested** = the flows in plain words, e.g. "full journey, landing to Night tab, 2 days, phone + laptop".
- Re-test the same persona on the next build to see what moved; a new persona is a new column, not a new method.

## 2. Before the round
1. **Pick or write the persona** (`.claude/agents/icp-N.md`): who, devices, apps they use today, what's on their mind,
   their opinions, their tests. Give them a ledger page (`Wiki/.../03-users/personas/`).
2. **Freeze the build**: deploy or serve one version; note its id. Test locally (`node tools/site/serve.mjs`) so no
   test traffic reaches the real database; with no `SUPABASE_KEY` the local server only logs.
3. **Dummy data**: enough history that the app has something to say (at least 30 days of nights for "your usual",
   a few weeks of sessions, a calendar). Generate it with the app's own code where possible, so the numbers on screen
   are what the app would really compute. Label it "made up" in SETUP.md.
4. **The clock**: if the round spans days, say how days were simulated (the browser clock can be shifted per page).
5. **Devices**: the persona's own (e.g. `iphone` 390×844 and `laptop` 1440×900). Chrome emulates iPhone; WebKit-only
   behaviour needs Safari on the iOS Simulator or a phone: list it under "not covered".

## 3. The run (what the persona does)
Walk it with `tools/qa/device-walk.mjs` (steps JSON per device), shooting every screen. The persona then reviews the
frames and visible text **in order**, as if living through them, answering the questions below at each stage.
Stages, in order:
1. **Five-second look** at the landing page (before reading).
2. **Landing page read.**
3. **Sign-up and setup** (every step).
4. **First open** of the app (and the tour, if it plays).
5. **Core use, day 1**: each tab; the first real study session from start to check-in.
6. **Core use, day 2**: coming back; the new night; a second session; anything they'd do on a second day.
7. **The mission reveal**: only now are they told what the team is trying to do (below), then asked again.
8. **Wrap-up**: scores, standard scales, retention, sharing, the one fix.

The mission statement read to the persona at stage 7, word for word:
> Halftime is trying to bridge the productivity layer (when and how you study, on your laptop and phone) with the health
> layer (your sleep and body, from a watch or ring), so it can tell you when a break would actually help. We're still
> researching which metric best links the two: today only sleep changes the break timing; heart rate and HRV are shown
> as context while we find out whether they predict anything.

---

## 4. The question bank (ask all of it, every round)

Answer in the persona's own voice, specific to a screen or line. Mark guesses from still frames `[from stills]`,
backstory `[my story]`, any outside fact `[source: url]` or `[unverified]`.

### A. Before using it: the person
A1. What do you use today for sleep / body data, and what for studying and planning? What do you pay for?
A2. Walk me through your last real study day. Where did it go wrong, and what did you do about it?
A3. When did you last decide to take (or skip) a break? What made you decide?
A4. What would a tool have to do for you to open it every day?
A5. What's a wellness or focus app you dropped, and exactly when and why?

### B. Five-second test (landing page, before reading)
B1. What is this? Who is it for? What would it do for you?
B2. What's the first thing your eye landed on? The second?
B3. One word for how it feels.

### C. Landing page (read it fully)
C1. In your words: what does it do, and what doesn't it do?
C2. What's the promise? Do you believe it? What's the one claim you doubt?
C3. Which line made you want to try it? Which line made you hesitate?
C4. What question did the page leave unanswered?
C5. What did you expect would happen when you pressed the button?
C6. Would you sign up from here? On which device, right now or later?

### D. Sign-up and setup (each step)
D1. Per step: did you know why it was asking, and was it worth answering? (keep / change / cut)
D2. Where did you hesitate, and where would you have quit?
D3. How long did it feel? Too long / right / too short.
D4. Anything you were asked that you'd refuse in real life? Anything you expected to be asked and weren't?
D5. After setup: what do you now think the app is? Has that changed from the landing page?
D6. Did connecting your watch and calendar feel safe? What did you think would happen to that data?

### E. First open and the tour
E1. First reaction to the first screen. What would you tap first?
E2. Did the tour help, slow you down, or confuse? What did it teach that you'd otherwise miss?
E3. What's clear, what's confusing, what's missing on the first screen?

### F. Each screen (repeat for every screen and state you saw)
F1. What is this screen for, in one sentence?
F2. What's the one thing you look at first? Is that the right thing?
F3. What's useful? What's pointless? What's too much (over-done, repeated, cluttered)?
F4. Any word or number you didn't understand or didn't trust?
F5. Would you change something about what you do because of this screen? What?
F6. Rate it: keep / change / cut.

### G. The core loop: a study session
G1. Starting a session: easy? anything in the way?
G2. The suggestion: did it come at a sensible moment? Was the reason believable? Did you know where the numbers came from?
G3. Would you take the break? Snooze? Ignore? Why?
G4. The check-in after: would you answer it every time? Which question would you skip?
G5. Did the session leave you better off than your current way (timer, nothing, another app)?

### H. The health layer (watch data)
H1. What did the night / body screen tell you that your own watch app doesn't?
H2. Which of its numbers would you act on, and which would you ignore?
H3. Did anything read like a diagnosis, a judgement, or make you anxious?
H4. What did you expect it to do with your watch data that it didn't?
H5. Did it feel like a copy of your watch's app? Where?

### I. Trust, privacy, control
I1. What do you think it collects? Where does it go? Who sees it (coach, school, team, the builders)?
I2. Would you consent to what it asks? What would you refuse?
I3. Could you pause it, change it, or delete it when you wanted? Did you find how?
I4. Anything that felt sneaky, vague, or over-promised?

### J. Across days (diary)
J1. Day 1 vs day 2: did it get more or less useful? Why?
J2. On day 2, what did you open first and why? What did you skip?
J3. What would bring you back on day 3? Day 7? What would make you stop?
J4. When, on which device, and for how long would you use it in a normal week?

### K. Value, retention, willingness
K1. **Sean Ellis:** if you could no longer use it, how would you feel? very / somewhat / not disappointed.
K2. **Retention:** P(still using it in 1 week), P(in 1 month), P(during exams), each 0–1, with the reason.
K3. What would you replace with it, or use alongside it? (named apps)
K4. Would you pay? How much a month? If not, what would it take?
K5. **UMUX-Lite** (1–7): "Its capabilities meet my requirements." "It is easy to use."
K6. **SUS** (1–5, the 10 standard items) for the parts you used.
K7. **NPS** (0–10): how likely are you to recommend it to a friend? Why that number?

### L. Sharing and who it's for
L1. Would you share it? With whom, and what exactly would you say?
L2. Who would use it best and like it most? Describe them (study load, sport, devices, habits).
L3. Who should not use it? Who would it annoy or harm?
L4. What's the one sentence you'd use to explain it to a friend?

### M. After the mission reveal (stage 7)
M1. Does the mission match what you experienced? Where does the app live up to it, and where not yet?
M2. Which link between your body and your studying do you most want it to find? (e.g. short sleep → shorter focus,
    late training → worse evening study, HRV → reading speed)
M3. What would you want it to measure on your laptop or phone to make that link?
M4. Which current screen or feature is closest to the mission, and which is a distraction from it?
M5. If they find the metric, how would you want to be told, and what should change in the app?

### N. Wrap-up
N1. The three things you liked most (specific).
N2. The three things you disliked most (specific).
N3. What felt pointless? What felt overdone?
N4. What's missing that you'd expect from an app like this?
N5. Gut verdict: HOOKED / I'D USE IT / MEH / I'D QUIT, and where you'd quit.
N6. Scores 1–10: Clarity · Trust · Timing · Useful · Control · Feel · Come back · Overall (the ICP scale; anchors in
    `.claude/agents/icp-*.md`).
N7. Fix list (ranked, up to 5), one thing to cut, and **If you fix only one thing:**.
N8. Anything you'd like to ask the team?

---

## 5. The report (REPORT.md)
1. Header: round, build, persona, devices, dates, what was tested, a "synthetic, not research" banner.
2. **Headline** (the team's, unsoftened): verdict, overall, where they'd quit, Sean Ellis, NPS, P(week), the one fix.
3. The persona's answers, section by section (A → N), in their voice, each tied to a named screen.
4. A screen-by-screen table: screen · keep / change / cut · one line why.
5. Scores and scales table (so the next round can show what moved).
6. **Team summary**: findings ranked by impact, with the screen; what's a bug vs a design call vs a team decision;
   what this round couldn't judge.
7. Ledger line appended to the persona's wiki page; one line in `Wiki/.../log.md`; a row in `ICP testing/README.md`.

## 6. Next round checklist
- Re-run with the same persona on the new build; open with "Since last time": each fix → fixed / not / worse.
- Change one thing at a time when possible, so a moved score has a cause.
- Add a second persona whose edge differs (no wearable, Android-less phone only, non-technical, privacy-first).
- Then test with real classmates (the evaluation plan), using sections B–N as the interview guide.
