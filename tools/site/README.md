# Halftime landing page: hosting on Vercel

The shipped page lives in **`site/`**:
- `index.html`: the page
- `favicon.svg` and `apple-touch-icon.png`
- `og.jpg`: the link preview for group chats
- `robots.txt`
- `vercel.json`: response headers and clean URLs

The design history and every round of changes are in `design/mockups/landing/` (see its BRIEF.md). From round 10 on, edit `site/index.html`.

## Live
**https://halftime-study.vercel.app/** is the Vercel project `halftime-study`, under the team `htcs-projects-98674d83`. It was first deployed 2026-11-05 with the Vercel CLI.

## Deploy
Redeploy from the CLI:
```bash
cd site && npx vercel@latest deploy --prod --yes --scope htcs-projects-98674d83
```
`site/.vercelignore` keeps `.env*` and `.vercel` out of the upload. If `vercel link` writes a `.env.local` token, delete it: a static page doesn't need it.

Or connect GitHub instead: in Vercel, import the repo and set **Root Directory** to `site`, with framework preset **Other** and no build command.

## Before it goes public
- **Indexing is off.** `vercel.json` sends `X-Robots-Tag: noindex, nofollow`, and `robots.txt` disallows everything. Remove both only once the team has approved the page's claims.
- **Claims the boardroom found false or unconfirmed** (`Wiki/.../25-journal/2026-11-05-boardroom-privacy-blanks.md`):
  - "It never tells your coach, team or school": the school part is false.
  - "Works with a Fitbit, Oura or WHOOP": only Fitbit (Google) is confirmed.
  - The 7-night learning bar: the team's proposal is 14 nights.
  - The night and after-practice modes are proposed and not yet scoped.
- **Link previews:** `og:image` points to `https://halftime-study.vercel.app/og.jpg`. If the domain changes, update it.

## Check locally with the same headers
```bash
node tools/site/serve.mjs 3007
```
Then open http://127.0.0.1:3007/. It applies `site/vercel.json`'s headers, including the Content-Security-Policy.

Audit on every screen size:
```bash
node tools/qa/device-walk.mjs --url=http://127.0.0.1:3007/ --devices=phone-320,iphone-se,iphone,iphone-max,iphone-landscape,fold-narrow,fold-cover,fold-open,pixel-fold-open,ipad,laptop-small,laptop,desktop
```

## Check smoothness
```bash
node tools/qa/perf-scroll.mjs --url=/index.html --root=site --device=iphone --runs=2
```
It scrolls the whole page and taps the demo on a CPU slowed 4×, then prints frame times, layouts, paints and tap latency. Compare the numbers before and after a change.

## Regenerate the link preview
Edit `tools/site/og-card.html`, then render it with:
```bash
node tools/qa/device-walk.mjs --root=tools/site --url=/og-card.html --devices=og
```
Save the frame as `site/og.jpg` (1200×630).

## The demo app and its analytics (added 2026-11-06)

The site is now a working phone prototype, all on sample data:
- `/`: the landing page, with **Log in** and **Create a demo account**, and a comparison of wearables, productivity apps and Halftime.
- `/start`: log in, which asks only for a name, or create an account. The setup steps are: about you, what it reads, pairing the laptop app, any wearable or none, the wearable's permission screen, syncing, your data (sample sleep even with no wearable), your next commitment, and done.
- `/app`: the app, built from the round-3 Island + Forecast mockup by `python3 tools/site/build-app.py`. Home shows "Body today" (sleep, heart rate, resting heart rate, HRV, each against your usual) and "Today" (a dummy calendar: a student's day or an athlete's day). History adds 14-night heart charts. The sample numbers live in `site/assets/demo-data.js`, shared with `/start`.
- **The tour** (`site/assets/tour.js`): a welcome card, then 8 spotlight steps. The welcome card has the tagline and the person's wearable vs study apps vs Halftime. It runs right after every new setup, because "Open Halftime" clears localStorage `ht-tour-done`. Logging back in by name doesn't run it. Replay it from the You tab or the Demo sheet. Re-run that script after changing the mockup. The app has tabs for Now, History, You and Demo. The Demo tab jumps to any moment: a walk fits, the first week, a wearable that didn't sync, something looks wrong, or Thursday morning.

### What's recorded
`site/assets/track.js` runs on every page and records:
- screens, and the time spent on each;
- taps (position, target, rage taps, taps on things that don't respond);
- scroll depth and speed;
- **attention**: how long each marked section (`data-attn`) was at least half on screen;
- pointer or finger movement, sampled every 300 ms;
- idle time, tab switches, orientation and resize;
- text selection and copy;
- the name typed at login, but only lengths for other fields;
- device, OS, browser, screen size, language and time zone;
- load speed, LCP, CLS, slow interactions and JS errors.

Each browser gets a visitor id and each tab a session id, so many people at once stay separate. Recording is **on by default**, with no pop-up (Heramb, 2026-11-06). Setup doesn't show an analytics switch (Heramb, 2026-11-06). The landing page footer says usage is recorded, and the You tab's switch in the app stops all sending from that device. Turning it off first sends what was already recorded, plus an `opt_out` row.

### Where it goes, and the admin page
- **Storage.** `site/api/collect.js` adds the IP address and approximate place (from Vercel's headers). It stores each batch with one call to the Supabase project **Heramb Stylist proj**. Everything sits in its own `halftime` schema: `tools/site/supabase.sql` holds the tables and functions, and it can be re-run safely.
- **Locked down.** The tables use row-level security and have no policies, and the schema isn't exposed. The site's key is the project's publishable key (`site/api/_db.js`), so all it can do is call the `halftime_*` functions.
- **Admin page.** **https://halftime-study.vercel.app/admin** is password-protected, in the style of Startup City's admin. Sign-in is checked in the database (bcrypt), and 8 wrong tries lock out that IP for 15 minutes. The session is an HttpOnly cookie that lasts 7 days.
- **Time ranges.** Live 30 min, today, 24 h, 7 days or all. Load-test rows are hidden unless you tick them.
- **Its tabs:**
  - **Pulse:** who's on the site right now and their screen, totals, an activity chart and a feed of milestones.
  - **Funnel:** landing → set up → name → finished setup → app → tour → saw "Short walk now?" → took the walk, plus the student/athlete and wearable split.
  - **Screens:** time per screen, where sessions ended, landing attention and scroll depth.
  - **Tour:** how many reached each step, and where people skipped.
  - **Taps & heat map:** top taps, rage and dead taps, and a heat map of taps drawn over the real screen (`?preview=1` shows a screen with a sample profile and records nothing).
  - **Visitors:** one row per person; click a row for their full timeline.
  - **Devices & places:** devices, places, QR vs direct, and preferences.
  - **Health:** load speed (LCP, CLS), slow taps and JS errors.
  - **Export CSV.**
- **Admins.** Add or reset one in the Supabase SQL editor with `select public.halftime_admin_create('name', 'a long password');`. The website can't call that function. Change your own password on the admin page (Password).
- **At 50 people at once:** each phone sends one small batch about every 15 s (about 3 requests a second in all), and each batch is a single database insert. A failed send stays on the phone and is retried after 30, 60, then 120 s. When a page closes, everything not yet saved goes out with `sendBeacon`, including a batch still on its way. The database stores each event once (unique on session + seq), so a double send is harmless. Load-test rows land with `test = true`. Run the load test with:
  ```bash
  node tools/qa/load-test.mjs --url=https://halftime-study.vercel.app --users=50 --minutes=3
  ```

### Testing locally
```bash
LOG_EVENTS=/tmp/events.jsonl node tools/site/serve.mjs 3007
```
This runs the API too and appends every received event to the file you name. Add `SUPABASE_KEY=<publishable key> ADMIN_INSECURE_COOKIE=1` to use the real database and sign in to `/admin` over plain http.

To test as a returning visitor (the tour already seen), add `{"eval": "localStorage.setItem('ht-tour-done','1'); true"}` to a walk's steps before it opens `/app`.
