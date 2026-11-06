---
title: "Demo app with account setup and usage analytics"
category: 25-journal
tags: [journal, frontend, infrastructure]
sources: [tools/site/README.md, tools/site/build-app.py, site/assets/track.js, site/api/collect.js, tools/site/apps-script.gs]
summary: "The site became a working phone prototype on sample data (landing → log in by name or create an account → any wearable or none → the app with tabs and a demo sheet), with full usage analytics to a Google Sheet. Tested with 7 visitors at once."
base_confidence: 0.7
lifecycle: draft
lifecycle_changed: 2026-11-06
tier: supporting
created: 2026-11-06T03:00:00Z
updated: 2026-11-06T08:15:00Z
---

# Demo app with account setup and usage analytics

**Goal (Heramb, 2026-11-06):** a phone website where everyone starts on the landing page, logs in with just a name or walks through creating an account with dummy details, connects any wearable (or none) and still sees data, and uses every screen as planned. It should also collect analytics: IP address, which pages people visit and what they do there, time spent, what they look at and how they move. It has to work with many people at once, without lag or errors.

## What was built

The how-to and setup steps are in `tools/site/README.md`.

- **Landing page:** a **Log in** button, plus **Create a demo account** buttons in the hero and the joining section.
- **`/start`:** log in (just a name), or create an account through these steps:
  1. name and school;
  2. when you study, and student or athlete;
  3. what it reads, with switches;
  4. pairing the laptop app (code HT-4821, demo);
  5. a wearable (no wearable, Fitbit, Oura, WHOOP, Apple Watch or Garmin);
  6. the wearable's permission screen (sample);
  7. syncing;
  8. your sleep for the last 7 nights (sample sleep, even with no wearable);
  9. your next commitment;
  10. done.
- **`/app`:** the round-3 Island + Forecast mockup, made to work by `tools/site/build-app.py`:
  - it uses the profile from setup (name, wearable, athlete);
  - tabs for Now, History (a sample week, sleep against your usual, past suggestions, sessions) and You (account, data sources, analytics switch, replay, sign out);
  - a Demo tab that jumps to any moment;
  - on first open, the pill fast-forwards to "Short walk now?";
  - the mockup's dead buttons now work: Talk to someone, Pause suggestions, +5 min, the source chips, and the three talk-to-someone options (book, talk now, two quiet minutes).
- **Analytics:**
  - `site/assets/track.js` records screens, time on each, taps, rage and dead taps, scroll, attention per section, movement, idle, tab switches, device and speed.
  - `site/api/collect.js` adds the IP address and location from Vercel's headers.
  - `tools/site/apps-script.gs` appends rows to the Google Sheet "Halftime prototype analytics", with tabs for events, visitors and a summary of formulas. A script lock keeps simultaneous visitors from clashing.

## Privacy choices

- **No pop-up (Heramb, 2026-11-06):** the first-visit notice was removed, so recording is on by default. The landing page footer says usage (screens, taps, device, IP address) is recorded, and the You tab has an off switch.
- **No camera.** "Where they look" is measured as time-on-screen per section, plus scroll and pointer or touch paths.
- **Form fields:** only the name typed at login is stored as text; other fields log only their length.
- **Data stays out of the repo.** Rows go to a sheet in Heramb's Drive; secrets live in Vercel env vars.

This follows CLAUDE.md ground rule 5. ^[inferred]

## Testing

- **Full walks** (local server, same headers as Vercel) ran on iPhone, iPhone SE, iPhone Pro Max, a 320 px phone, a Fold cover screen, iPad and laptop, with up to **7 visitors at once**:
  - 0 page JavaScript errors and 0 likely UI defects.
  - Every visitor was recorded separately (visitor and session ids).
  - Every planned screen was reached on the iPhone, Pro Max, Fold, iPad and laptop runs.
- **Speed** (CPU slowed 4×): 15 app taps (tabs, Demo sheet, Why, walk, escalation nights) took 32–48 ms from touch to paint, with no long tasks.
- **Fixes found while testing:**
  - setup's main button stays pinned on small phones;
  - "No wearable" is listed first (as in the round-3 design);
  - Demo became a tab, so it never covers a control;
  - toasts moved off the card;
  - History's labels are 12 px.
- **On Vercel:** the analytics function runs (a preview returned 202).

## Independent QA and the QR code

**Independent QA.** A separate QA agent tapped every control at iPhone and iPhone SE sizes. It found 13 problems the scripted walks missed, and all are now fixed:
- the card cut off its own bottom buttons;
- "Change source" had no way back;
- setup choices (next commitment, sleep switch, device) were ignored in the app;
- Apple Watch and Garmin showed as "not yet";
- a device change in the app didn't stick;
- Back from the sync step looped;
- switching tabs lost a walk in progress;
- a double tap skipped a step;
- the notice covered setup;
- signing out forced the whole setup again, and a new name silently took over someone else's account (there's now an on-page check);
- `/app` opened after a half-finished setup;
- the no-wearable copy was wrong;
- "+5 min" changed nothing.

A second QA pass confirmed the fixes.

**Live.** The final full walk ran against https://halftime-study.vercel.app/ with 0 console errors.

**QR code.** `design/qr/halftime-qr-poster.png` ("See the page → Add your name → Try the app") and `design/qr/halftime-qr.png`:
- they open `/?src=qr`, so analytics can count people who scanned;
- they were made with macOS Core Image at high error correction;
- they were decoded back with Apple's QR detector to confirm the link.

## Mouse and trackpad scrolling (2026-11-06)

**The complaint (Heramb):** scrolling the landing page with a mouse on a laptop felt laggy and buggy.

**Measured in a real browser at 1440×900 with a mouse wheel.** Frame times were fine (0 over 33 ms), so the page wasn't slow. The cause was how it felt:
- a wheel moves the page 100 px per notch, so the scroll-played drawings jumped a step at a time;
- "How it works" and the honesty cards pinned for 4.2 and 2.3 screens, so the page looked stuck for about 40 notches.

**Fixes, for mouse and trackpad users only** (touch and reduced motion still follow the scroll exactly):
- the drawings ease toward the scroll position (90 ms time constant), so each notch now animates over 20–40 frames;
- the pinned sections are shorter: 2.6 and 1.6 screens;
- the app's tab bar no longer uses a backdrop blur, which repainted on every scroll.

**After the fix:** the app's History tab scrolls with a worst frame of 15 ms. All flows still pass on iPhone, laptop and the 320 px phone with 0 errors. Deployed.

## Heart data, calendar and a richer home (2026-11-06)

**Decision (Heramb, 2026-11-06): the wearable read now includes heart data**, not just sleep. It covers heart rate through the day and during workouts, resting heart rate, and overnight HRV, labelled RMSSD or SDNN by device. This changes what data is collected, which CLAUDE.md treats as a **team decision**. It's recorded here; the team needs to confirm it before any real data is collected.
- **Earlier position:** the wearable read was sleep only, with HRV off by default and unused in suggestions (the round-3 mockup, and [[24-synthesis/open-decisions]] #19 on personal baselines).
- **How heart data appears now:**
  - always compared with the person's own usual;
  - shown as **context only** ("not used in this suggestion" in See why);
  - never as a diagnosis.

**The dummy calendar** is a connected Google, Apple or Outlook calendar on sample data.
- **A student's Thursday:** lecture, lunch, study block, **Chem lab 4:30**, study group, with a Monday midterm coming up.
- **An athlete's Thursday:** 6:30 am practice (heart rate 146 bpm average), lecture, study block, **Team lift 4:30**, film session, and Friday travel before an away game at Penn on Saturday.
- **The next stop** on the session line comes from the calendar. Turning the calendar off falls back to a typed next stop.

**What's new on screen:**
- **Home:** "Body today" (sleep, heart rate now, resting heart rate, HRV vs your usual; athletes also see the morning practice) and "Today" (the agenda, with now and next stop marked).
- **History:** 14-night resting heart rate and HRV charts, each drawn against your usual.
- **Setup:** no analytics switch. Recording is always on by default, and setup doesn't mention it (Heramb, 2026-11-06: "we shouldn't even show it in the setup"). The only off switch is on the You tab in the app, and the landing footer says usage is recorded.

**Shared sample numbers:** setup and the app both read `site/assets/demo-data.js`, so they always agree.

**Bug caught in testing:** the agenda's "done" class collided with the mockup's progress bar (also `.done`), which drew past events as tall black blocks. The classes are now prefixed `ev-`.

**Landing copy updated to match:** step 2 and the "What it reads" list now say sleep, heart rate and HRV.

## The tour and the comparison chart (2026-11-06)

**Goal (Heramb):** after the heart data and calendar, "a tutorial thing in the best way showing what screens do what", with prompt-motion animation. Plus a landing-page comparison of WHOOP/Fitbit, productivity apps and Halftime.

**The tour** (`site/assets/tour.js`) starts right after every new account setup, for students and athletes alike. It has 9 steps:
1. **Welcome**: the tagline "Every long study session needs a halftime.", then a small table of *your* wearable (by name, such as Oura Ring or Apple Watch; "Wearables" if you have none) vs study apps vs Halftime, on three rows: sleep and heart, study time, and your day and when to break. Halftime's column fills in row by row. (Heramb, 2026-11-06.)
2. the pill at the top;
3. the session line;
4. Body today;
5. Today (the calendar);
6. the open card, "Short walk now?";
7. the numbered sources;
8. Walk, Keep going or Snooze;
9. the tabs.

**How it moves (prompt-motion):** one spotlight window glides from step to step on critically damped springs, with no bounce or glow. Reduced motion snaps instead. Next, Back, Skip, the arrow keys and Escape all work. It's skipped on later visits, and each new setup brings it back. Logging back in by name doesn't. It can be replayed with "Replay the tour" on the You tab or "Take the tour again" in Demo. **Bug fixed (Heramb's report):** a second account on the same phone never got the tour, because "seen" was remembered per device. Finishing setup now clears it. Retested as a phone that had already seen the tour, on iPhone, SE, Pro Max, 320 px and laptop, as a student (Oura, Apple Watch) and as an athlete (no wearable): 0 errors, and live. It records `tour_step`, `tour_done` and `tour_skip`.

**The comparison chart** sits on the landing page before the trust sections. See [[09-design/landing-page]].

**Testing:**
- The tour passed on iPhone, iPhone SE (athlete, no wearable) and laptop: 0 errors and 0 likely defects, and every step was checked by eye.
- The full regression ran 7 devices at once (iPhone, SE, Pro Max, Fold cover, iPad, laptop, 320 px), with both roles and calendar on and off: 0 JS errors and 0 likely defects. Every screen was reached; only the no-wearable runs skip permission and syncing, as they should.
- **Fix found:** switching analytics off threw away the last few seconds of events recorded while it was on. It now sends them, plus one `opt_out` row, then stops.
- **Deployed:** the live files match local, and live walks (iPhone tour, laptop full flow) had 0 errors.

## Still open

- **The team must finish the sheet setup.** Paste and deploy the Apps Script, then add `SHEET_SECRET` and `SHEET_WEBHOOK_URL` in Vercel. AI sessions aren't allowed to write secrets. Until then, events only reach the Vercel log.
- **Same false or unconfirmed claims as before:** the landing page still has the ones listed in [[09-design/landing-page]].

## Related

- [[09-design/landing-page]] · [[09-design/screen-gallery]] · [[11-engineering/deployment-and-operations]] · [[25-journal/25-journal|Journal hub]]
