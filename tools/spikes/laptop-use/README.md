# Spike: laptop minutes on picked sites (route C, 2026-11-15)

A Chrome/Edge Manifest V3 extension. During a Halftime study session it puts every moment in one of four buckets:
picked sites, other tabs, outside the browser, and away (screen locked). When the session ends, Halftime gets the four
minute totals. Minutes per picked site stay on the laptop, in the toolbar popup, for the student only. It never reports
which site, URLs, titles or page content, and it makes no network requests.

Write-up, verdict and costs: `Wiki/Cognitive Perf Agent Wiki/25-journal/2026-11-15-spike-laptop-use.md`.

## Files

| File | What it is |
|---|---|
| `extension/manifest.json` | Permissions: `storage`, `idle`; 12 optional site patterns, asked one at a time when the tester picks; `externally_connectable` for the Halftime origin only |
| `extension/background.js` | Service worker: watches tab, window-focus and lock changes and keeps the count |
| `extension/tally.js` | The four buckets and the counting rules (pure, unit-tested) |
| `extension/sites.js` | The 11 pickable sites (X covers x.com and twitter.com, so 12 site patterns) |
| `extension/options.html/.js` | "Which sites pull you away?" picker, plus "Forget my picks and counts" |
| `extension/popup.html/.js` | Toolbar popup: the four totals and your own minutes per site (this or the last session) |
| `halftime-bridge.js` | **Proposed** page-side code for `site/assets/study.js`, with where it would hook in. `site/` is not edited |
| `test/stub-halftime.html` | Local stand-in for the Halftime page (synthetic) |
| `test/run.mjs` | End-to-end test in a throwaway Chrome profile |
| `test/tally.test.mjs` | Unit tests for the counting rules |

## Run the tests

```bash
node tools/spikes/laptop-use/test/tally.test.mjs
```

```bash
node tools/spikes/laptop-use/test/run.mjs
```

`run.mjs` needs Chrome for Testing or Chromium (set `CHROME_BIN`; it finds puppeteer's copy in `~/.cache/puppeteer` by
itself). Branded Google Chrome 137+ ignores `--load-extension`. Add `--headed` on a Mac to also check that bringing
another app to the front counts as "outside the browser". It compares that with macOS's own record of the frontmost app (`lsappinfo`). That run opens a window for about 20 seconds and brings Finder forward once.

## Try it by hand (load unpacked)

1. Open `chrome://extensions` (Edge: `edge://extensions`) and turn on **Developer mode**.
2. Click **Load unpacked** and choose `tools/spikes/laptop-use/extension/`. The ID should be `hgenhjkhjkkoenmjmggocollkdbdlond`.
3. Pin it from the puzzle-piece menu, click it, then **Pick sites** and allow each one.
4. Serve the stub: `node tools/spikes/laptop-use/test/run.mjs` serves it only while it runs. For a manual try, open
   `test/stub-halftime.html` from any local server on `http://localhost:<port>/`, or wire `halftime-bridge.js` into a local
   copy of `site/` served by `node tools/site/serve.mjs`.

The `key` in the manifest is a public key. It only fixes the extension ID so the Halftime page can find it. It is not a
secret, and the matching private key was discarded because load-unpacked doesn't need it.

Before a pilot build, drop `http://localhost/*` and `http://127.0.0.1/*` from `externally_connectable`.
