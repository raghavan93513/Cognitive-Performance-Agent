---
title: "Spike: laptop minutes on picked sites with a Chrome/Edge extension (route C)"
category: 25-journal
tags: [journal, privacy, engineering, frontend, data]
sources: [tools/spikes/laptop-use/README.md, tools/spikes/laptop-use/extension/manifest.json, tools/spikes/laptop-use/extension/background.js, tools/spikes/laptop-use/extension/tally.js, tools/spikes/laptop-use/halftime-bridge.js, tools/spikes/laptop-use/test/run.mjs, tools/spikes/laptop-use/test/tally.test.mjs, site/vercel.json, site/assets/study.js, "24-synthesis/declutter-brief-2026-11-15.md"]
summary: "Route C works on a Mac: a 2-permission extension splits each session into picked sites / other tabs / other apps / away; Halftime gets 4 totals, never sites. Windows untested. ~13–18 h."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: supporting
created: 2026-11-15T22:30:00Z
updated: 2026-11-15T23:45:00Z
relationships:
  - target: "[[24-synthesis/declutter-brief-2026-11-15]]"
    type: related_to
---

# Spike: laptop minutes on picked sites (route C)

**Question.** Can a small Chrome/Edge extension count the minutes a student spends on sites they picked (Instagram,
TikTok, YouTube…) during a Halftime study session? Can it send Halftime only minute totals, with no URLs, titles or
site names? Route C in [[24-synthesis/declutter-brief-2026-11-15|the declutter brief]]. Time box: 2 days. Kill rule: dropped
if it doesn't work on two team laptops by about Nov 21.

**Who and when.** Spike session, 2026-11-15, for Heramb. Collecting this from any tester is a **team decision**
(CLAUDE.md) and needs updated consent text first (CSO). Nothing in `site/` changed, and nothing is committed.

## Verdict: GO so far, but the kill-rule test isn't done ^[inferred]

- **Works on a Mac.** The prototype loads unpacked with a fixed ID. Under the live site's CSP, the Halftime page starts
  and ends a session through it. Every moment of a session lands in one of four buckets: **picked sites, other tabs,
  outside the browser, away (screen locked)**. Halftime gets the four whole-minute totals and nothing else. Minutes per
  picked site stay on the laptop for the student's own view (added the same evening at Heramb's request).
- **Tested:** 9 of 9 unit checks, 14 of 14 headless end-to-end checks and 15 of 15 headed ones pass in Chrome for
  Testing 152 on macOS. The headed run samples macOS's own record of the frontmost app every 0.15 s and checks that
  "outside the browser" matches it. With Finder brought to the front for about 3 s, the extension counted 4 outside and
  macOS showed 3.1 s, within rounding. Earlier runs on a desktop in use caught WhatsApp and Claude taking the front, and
  the extension counted exactly those stretches as outside.
- **Not yet shown:** Windows, Edge, branded Google Chrome loaded by hand through `chrome://extensions`, a real
  Instagram or YouTube tab, and a lid close or screen lock. The kill rule needs **one Windows laptop and one more Mac by
  Nov 21**. Each takes about 15 minutes with the manual steps below.
- **Cost to pilot-ready by Dec 4:** about **13–18 team-hours** with load-unpacked installs, or about 17–22 h plus an
  unknown review wait with an unlisted Web Store listing (table below). This is close to the brief's ~10–15 h.
- **The honest limit:** it sees browser tabs only. It answers "Instagram is a browser tab" for laptop users. It says
  nothing about the phone, native apps or Safari, so route A or B is still needed for the phone.

## How it works

1. The tester picks sites once, on the extension's "Which sites pull you away?" page (11 choices: Instagram, TikTok,
   YouTube, X, Reddit, Facebook, Snapchat, Netflix, Twitch, Pinterest, Discord). For each pick, Chrome asks to allow
   that site.
2. When the tester presses Start in Halftime, the page sends the extension `{ type: "start", id: <session UUID>, maxMin: 360 }`
   (`study.js` already makes this random ID).
3. The extension wakes on tab switches, address changes, window focus changes and screen lock. Each time it asks
   *where is the student right now?* and starts timing the answer:

   | Bucket | How it's known | What the extension learns |
   |---|---|---|
   | Picked sites | The front tab's hostname matches a pick | Which pick, kept on the laptop only |
   | Other tabs (Canvas, Docs, Gmail, the Halftime tab…) | A tab is in front but isn't a pick | Nothing: the browser hides its address |
   | Outside the browser (Word, Zoom, games…) | No browser window is focused | Nothing |
   | Away | The screen is locked | Nothing |

   It reads a tab's address only to get its hostname, and only on picked sites.
4. At the end, the page sends `{ type: "end", id }` and gets
   `{ ok: true, picked_min: 7, other_min: 5, outside_min: 0, away_min: 0 }`. The page would log one event:
   `study_laptop { study, picked_min, other_min, outside_min, away_min }`. "Discard" keeps nothing. No extension means
   `null`, which is **"not measured"** and must never be read as 0.
5. The toolbar popup shows the student the same four numbers and their own minutes per site (e.g. "YouTube 12 min,
   Instagram 5 min"), with the line "Only you see the per-site minutes. They stay on this laptop."

### How the extension learns a session started: `externally_connectable` (proposed)

| Option | Permission warning | CSP change | Verdict |
|---|---|---|---|
| **`externally_connectable`**: the page calls `chrome.runtime.sendMessage(EXT_ID, …)` | None | **None.** This is browser messaging, not a network request, so `connect-src 'self'` doesn't apply. Tested under the live CSP header with 0 violations | **Use this** |
| A content script on the Halftime origin, plus `postMessage` | "Read and change your data on halftime-study.vercel.app" | None | Costs a warning for no gain |
| The extension posts to `/api/collect` itself | Host permission for Halftime | None (the page's CSP doesn't govern the extension) | Adds a network path; the page already has one |

So **`site/vercel.json` needs no change.** The page only needs the extension's ID. The manifest's public `key` fixes the
ID to `hgenhjkhjkkoenmjmggocollkdbdlond` for load-unpacked. A Web Store copy gets the store's ID: either add it to the
page's list (`halftime-bridge.js` takes several IDs) or copy the store's public key into the manifest. Only
`https://halftime-study.vercel.app` (plus localhost in the spike build, to be removed for the pilot) can message it.
Other sites see no `chrome.runtime` (tested), and no other extension can connect. Vercel preview URLs can't be listed,
because Chrome refuses `*.vercel.app` wildcards ^[inferred], so test against production or localhost.

The proposed hook points in `study.js` (`begin2`, `endSession`, and setup's "Laptop minutes: on / not installed") are
written out at the top of `tools/spikes/laptop-use/halftime-bridge.js`.

## Permissions, each justified

| Permission | Shown at install? | Why |
|---|---|---|
| `storage` | No warning | Keeps the picks, the running count and the last result on the laptop. The service worker is stopped when idle, so state can't live in memory |
| `idle` | No warning | Used only to stop counting while the screen is locked. Otherwise a picked tab left open when the lid closes would count the whole sleep |
| Optional host access, one site at a time (12 patterns such as `*://*.instagram.com/*`) | **Asked when the tester picks each site.** Chrome's wording is expected to be close to "Read and change your data on all instagram.com sites" ^[inferred] (not seen: the test pre-grants it because a script can't click the prompt) | This is the only way to know the front tab's site **without seeing every site**. The browser hides all other addresses from the extension. Unpicking a site removes the access |
| `externally_connectable` (a manifest key, not a permission) | No warning | Lets only the Halftime page ask for the totals |
| `"incognito": "not_allowed"` | n/a | Private windows are never counted |

**Rejected:**
- `tabs`, `history` and `webNavigation`: each shows "Read your browsing history" and exposes every URL.
- `activeTab`: needs a click on every tab.
- `scripting` and content scripts: they would read pages.
- `alarms`: not needed, because counting is driven by events.
- Any network access: the extension makes no requests, and the test checks for network code.

The warning wording is scarier than what the extension does, so the consent text and the picker must say plainly that
Halftime gets four totals per session, never which site. One honest caveat: on a picked site, that access would let
the extension read the tab's title (an Instagram title can include a person's name). The code never reads titles, and
the test checks none are stored, but the consent text should say this.

## What's stored, and what leaves the laptop

- **On the laptop** (`chrome.storage.local`, checked in the test):
  - `picks`: the picked domains.
  - During a session, `session`: `{ id, startAt, endBy, ms: {picked, other, outside, away}, sites: {picked domain: ms}, cur, since }`.
  - Afterwards, `last`: `{ id, picked_min, other_min, outside_min, away_min, sites: {picked domain: min} }`, for the
    popup. Only the last session is kept.
  - No URLs, titles, page content, other sites' names, or timestamps per site. "Forget my picks and counts" clears all
    of it and removes the site access.
- **Leaves the laptop:** the four totals, to the Halftime page at the end of a session. The page would send Halftime's
  server four integers per session. Nothing ever says which site; the test checks the reply's keys.

## What these numbers can and can't tell us ^[inferred]

- **Can:** within one student, compare sessions after short nights with sessions after usual ones. Example: picked-site
  minutes per hour of study, with n shown, computed by code (CLAUDE.md rule 3). It also gives the Halftime-vs-25/5 arms
  an objective outcome next to the self-reported check-in.
- **Can't:** say whether "other tabs" or "outside the browser" was work. Docs, Gmail and a game all look the same,
  which is the privacy design. So the laptop numbers are **distraction minutes, not productivity**. Productivity comes
  from the check-in ("did you finish what you planned?", the task score), never from the screen.
- **Weak spots:**
  - With ~12 nights per person, many links will say "not enough data".
  - The phone, often the bigger pull, isn't covered.
  - Whether testers will install an extension is unknown, so ask the first 2–3 before building the `study.js` hook.
- **Still sensitive:** four integers per session, linked to sleep and a study ID, describe someone's habits. They are
  covered by consent and "Delete my data" like the rest.

## Install without the public Web Store

**A. Load unpacked (recommended for a team-guided pilot).** It's free, needs no review, and works today. About 7 steps:
1. Download the zip the team shares and unzip it. Mac: double-click it. Windows: right-click, then **Extract All**.
   Keep the folder: the browser runs the extension from it.
2. Open `chrome://extensions` (Edge: `edge://extensions`).
3. Turn on **Developer mode**. In Chrome the switch is top right; in Edge it's in the left sidebar.
4. Click **Load unpacked** and choose the folder.
5. Puzzle-piece menu → pin **Halftime laptop minutes**.
6. Click it → **Pick sites** → tap each site → **Allow**.
7. Halftime's setup would then show "Laptop minutes: on".

Catches:
- "Developer mode" sounds alarming, and a teammate should sit with each tester.
- School-managed laptops may block it by policy.
- Updates mean replacing the folder and clicking reload.
- Edge may warn about developer-mode extensions at startup ^[inferred]. Check this on Windows.

**B. Unlisted Chrome Web Store listing.** Testers get one link and three taps.
- **Team setup, once:**
  - Register as a developer ($5, one-time).
  - Upload the zip, then add an icon, a screenshot and the privacy-practices answers: single purpose, why each
    permission is needed, and a data-use certification. A privacy-policy URL could be a page on the Halftime site.
  - Set visibility to **Unlisted** and submit.
- **Review:** unlisted items get the same review as public ones. Google only says to contact support after two weeks
  pending. Guides say 1–3 business days, and longer when an item asks for site access.
- **Tester, Chrome:** open the link → **Add to Chrome** → **Add extension** → pin → pick sites → Allow.
- **Tester, Edge:** open the same link → **Allow extensions from other stores** → **Add to Chrome** → **Add extension**.
- Edge Add-ons also has a **Hidden** listing (link only) with its own certification. It isn't needed, since Edge can
  install from the Chrome Web Store.

**Recommendation** ^[inferred]: use A for the first 2–5 testers, installed with a teammate. Submit B by about Nov 24 only
if the pilot needs testers the team can't sit with, so the review wait can't block Dec 4.

## Mac vs Windows, Chrome vs Edge

The code is the same: Chrome and Edge share Chromium's extension APIs (`tabs`, `windows`, `idle`, `storage`,
`externally_connectable`). The only documented focus quirk (an extra "no window" event between Chrome windows) is on
some Linux window managers, not Mac or Windows. **Tested:** macOS, Chrome for Testing 152. **Untested:** Windows, Edge,
and branded Chrome. Branded Chrome 137+ ignores `--load-extension`, so the automated test uses Chrome for Testing; the
APIs are the same. Brave, Arc, Vivaldi and Opera are Chromium-based and will probably work ^[inferred]. They weren't
tried.

## What it misses

- **The phone.** It's the bigger pull for most testers ([[25-journal/2026-11-15-icp-three-problems|ICP panel]]).
  Routes A, B and F cover it.
- **Native laptop apps:** the Discord, Spotify, Messages or WhatsApp apps, games, and the TikTok or Netflix apps where
  installed.
- **Safari on Mac**, the default browser for many Mac students. A Safari version would need Xcode, an Apple developer
  account and an app wrapper. Firefox isn't covered either: it doesn't let web pages message extensions this way, so it
  would need a content script.
- **Private windows** (by design), and other Chrome profiles.
- **A picked site that isn't the front tab:** a video in picture-in-picture, audio in a background tab, or a second
  monitor while another window has focus.
- **It overcounts** when a picked tab is in front but the student is on their phone or away without locking.
- **Sites not on the list.** Adding one means one line in `sites.js`, one in the manifest, and a reload.
- **Sleep without a lock** (lid closed with "require password" off): an open stretch could count the sleep, up to the
  session's 6 h cap. Not tested.

## Team-hours to pilot-ready by Dec 4 (estimates) ^[inferred]

| Item | Hours |
|---|---|
| Hook into `study.js` (start, end, discard, setup status) + `study_laptop` event + `/admin` column | 3–4 |
| Consent and privacy-sheet text + CSO review (team decision on collecting it) | 2 |
| Icons, picker and popup copy pass, a short "Laptop minutes" install page on the site | 2–3 |
| Test on 2 team laptops (Mac + Windows, Chrome + Edge) with real Instagram/YouTube, lock and lid-close | 2–3 |
| Package the zip and write install steps (route A) | 1 |
| Link-card rule reads the four totals, treating `null` as "not measured" (part of the Algorithm Card work) | 2 |
| Optional: split break minutes from focus minutes (still totals only, no sites) | 1–2 |
| **Total, route A** | **13–18** |
| Route B on top: developer account, listing, privacy policy page, justifications, review back-and-forth | +4, plus review wait |

## Reproduce

Commands, files and manual steps: `tools/spikes/laptop-use/README.md`. Unit tests: `node tools/spikes/laptop-use/test/tally.test.mjs`.
End to end: `node tools/spikes/laptop-use/test/run.mjs`, adding `--headed` on a Mac for the app-switch check against
macOS's frontmost-app record. It uses a
throwaway profile with local synthetic pages only, never the live site.

## Related

[[24-synthesis/declutter-brief-2026-11-15|Declutter brief]] · [[25-journal/2026-11-15-boardroom-three-problems|Boardroom: three problems]] · [[25-journal/2026-11-15-icp-three-problems|ICP panel: three problems]] · [[25-journal/2026-11-13-real-study-sessions|Real study sessions]]
