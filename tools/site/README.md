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
