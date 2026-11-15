# ICP testing 1: setup

> **Synthetic test, not research.** One made-up persona reviewed real screens of the app with made-up data. Nothing
> here is a real user's opinion, and none of it may be quoted as one (see `../FRAMEWORK.md`).

| | |
|---|---|
| Round | 1 |
| Date | 2026-11-14 |
| Build | The version live at https://halftime-study.vercel.app on 2026-11-14 (Vercel deployment `halftime-study-9b4zaiimv`): the Night tab (WHOOP 4.0) plus the quieter History / Now / Night pass. Not committed to git. The test ran on a local copy of exactly these files (`node tools/site/serve.mjs 3021`), Correction (2026-11-15): the local server still sends analytics to the team's Supabase, because `site/api/_db.js` falls back to the project's public key; the walk's events were stored there marked `test` (they came from 127.0.0.1), apart from real visitors. |
| Persona | ICP_6 · Ethan Park (`.claude/agents/icp-6.md`): 24, MS Data Science at Columbia, club rower (6 am practice six days a week), WHOOP 4.0, Notion / Google Calendar / Todoist / Forest. Fiction. |
| Devices | `iphone` 390×844 (iPhone 15) and `laptop` 1440×900 (MacBook Air, Chrome). Headless Chrome emulation, not Safari. |
| What was tested | The whole journey over two days: landing page → sign-up (9 steps) → tour (9 steps) → every tab on the phone → log-in and setup on the laptop → Night tab with 30 days of WHOOP nights → a Halftime-timed study session (suggestion, See why, the walk, check-in, the 10-question survey) → day 2: phone check, the new night synced, a changed bedtime, a fixed 25/5 session, History, You, `/desktop`. |
| Method | `ICP testing/FRAMEWORK.md` (question bank A–N, mission reveal at M). |

## Day by day (what the walk did)
- **Day 1, phone:** opens the landing page from a link; "Create a demo account"; name Ethan; long sessions: late nights;
  role: student-athlete; agrees to what it reads; "pairs" the laptop with the demo code; picks WHOOP; allows access;
  sees the demo sync; connects Google Calendar (demo); opens Halftime; the 9-step tour; Now, Night (says to sync on a
  laptop) and its sample night, History and its sample week, You, the Demo sheet and one demo moment.
- **Day 1, laptop:** "Log in" with his name (a new browser, so setup runs again); skips the tour; Night tab ("Connect your
  WHOOP"); **sync simulated** (see below): 30 nights appear; "Is this when you slept? Yes"; How these are worked out;
  History with 18 earlier sessions; a 1-hour session on "STAT 5703 problem set 6": consent ("Agree and join"),
  setup (sleep from the WHOOP), the timer, the suggestion "Short walk now?", See why, Start walk, back, End session,
  the check-in (task placeholder → "Mostly" → "No, it fit"), the 10-question survey.
- **Day 2, phone:** Now, Night (still "connects on a laptop"), History.
- **Day 2, laptop:** Night shows the earlier night until a **simulated** sync brings the new one; "Change" the bedtime to
  11:05 pm; a 45-minute session that got the fixed 25/5 timer; its break; End; check-in; History; You; `/desktop`.

## Made-up data (all generated, none real)
- **WHOOP nights:** 30 nights produced by the app's own night calculator from made-up 1-per-second heart rate and beat
  intervals: a rower's month (practice days in bed around 11 pm–12:40 am and up at 5:20–5:40 am; Sunday lie-ins to about
  8:15–8:45 am; a deadline night or two to 5:20 am after a 1:50 am bedtime). Resting HR ~47 bpm, HRV ~92–103 ms.
  Day 1's last night: 12:16 → 5:20 am (5 h 04). Day 2's night: 11:25 pm → 6:45 am (changed to 11:05 pm in the test).
- **Study history:** 18 sessions over the month on the laptop ("STAT 5703 problem set", "Capstone EDA", "ML reading" …),
  both session types, as the app logs them.
- **Calendar:** the app's own sample calendar (Google Calendar, athlete day). No real calendar is read in this build.
- **Sign-up's WHOOP:** the setup screens are a demo ("WHOOP 5.0 connected", sample nights). The Night tab is the part that
  reads a WHOOP 4.0 for real, over Bluetooth on a laptop.

## Simulated, and why
- **The clock:** day 1 ran with the page's clock one day behind (so day 2 could be a real next day).
- **The WHOOP sync button:** a headless browser has no Bluetooth band, so the walk injected the nights the sync would
  have stored, using the same code. Ethan never sees the browser's Bluetooth picker in these frames.
- **Session speed:** sessions ran at 60× (`?speed=60`), so a 1-hour session took a minute; the app labels these
  "test speed" and its clock shows session time.
- **Notifications:** not switched on in the local copy ("Notifications aren't switched on for this prototype yet");
  on the live site they are.

## Not covered
Safari on an iPhone (only Chrome emulation), a real Bluetooth sync, a notification on a locked phone, the laptop app
(not built), real calendar data, more than two days, accessibility with a screen reader.

## Files
- `REPORT.md`: the team summary and the persona's full answers.
- `REPORT-persona.md`: Ethan's answers to every question, in his voice.
- `screens/iphone`, `screens/laptop`: every frame (compressed). `sheets/`: the same frames by stage.
- `walks/*-screens-text.md`: the visible text of each frame (what Ethan read). `walks/*-walk-full.md`: the full walk logs
  with the automatic UI checks (0 console errors; 0 defects on the phone; 0 on the laptop).
- `rerun/`: the walk steps and the made-up-data generator, with how to run them again.
