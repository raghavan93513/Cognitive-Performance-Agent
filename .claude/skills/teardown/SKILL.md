---
name: teardown
description: Find out how a shipped website or web app really does something - from its own scripts, network calls and files, with evidence - using REA ("Reverse Engineer Anything", the rea MCP server), and turn it into a card in our words. For the Cognitive Performance Agent this means public, logged-out pages of wellness and wearable products (Whoop, Oura, Fitbit, Garmin web pages, focus and study apps), design precedent for /mockup, and our own mockups and builds. Modes - steal <url> (a UI mechanism for a mockup), feature <site> <thing> (client-side how-it-works for the competitive landscape or an Algorithm Card), ours <url or path> (what our own page loads and sends), file <path> (a SQLite file or app bundle). Learn the mechanism, never copy the code. Use when the user types /teardown or asks "how does <site> do <thing>", "what's driving this animation / chart", or "what does our page send".
---

# /teardown: how it really works, with receipts

**Needs REA.** The `rea` MCP server (`npx -y rea-agents@6.7.0 mcp`) and the `reverse-engineer-anything` skill are installed on Heramb's machine, not in this repo. Teammates without it: say so and ask before installing anything. REA's own skill is the playbook for tool routing; this file says **what we use it for, where results go and where the line is**.

## The line (read first, every time)
- **Mechanism, never material.** Find out *how* a thing works (which library, which trigger, which timing, which data flow), then build our own from scratch. Never paste, port or lightly edit another site's code, assets, fonts or copy into anything of ours.
- **Public, logged out, as a visitor.** Only pages anyone can open. Never sign in to someone else's account, pass a paywall, login, bot check or licence check. Never connect a real wearable account, ours or anyone's. Never click a cookie banner's accept: leave it.
- **Raw output stays out of the public repo.** Captures, exported scripts and Evidence JSON go in `.teardowns/<YYYY-MM-DD>-<slug>/raw/` (gitignored). Only the **card**, in our words, goes into the wiki. A quoted snippet is at most 3 lines, only to point at a mechanism.
- **Client side only.** REA sees what ships to the browser. It **cannot** see server-side models, scoring or ranking. Whoop's recovery score or Oura's readiness is computed on their servers or devices: any "how does their score work" answer keeps **Observed / Inferred / Unknown** apart, and the score's maths is almost always Unknown.
- **Our pages: local first.** `ours` runs against a local file or local server, never a deployed site with real users, unless the team asks.

## Before you start
1. **Tools present?** `mcp__rea__*` tools may be deferred: load them with ToolSearch (`+rea capture_browser_scenario`) before the first call. If missing, use the CLI (`npx -y rea-agents@6.7.0 <command>`; ask first if it would download). If something is broken, follow `reverse-engineer-anything/references/connection-and-recovery.md`.
2. **Cost is context, not money.** Results are large. Work summary-first (`detail: "summary"`, then `inspect_analysis_view`). More than 2 sites → hand it to a subagent with a written brief.
3. **Check a tool exists** in the session's real tool list before you name it. No native decompilers are installed; don't install one without a yes.

## The four modes

### `steal <url> [what to look at]` → /mockup, the designer
1. Copy `scenario-template.json` (next to this file) into `raw/`, set `start_url`, add steps. There's no scroll action: use `press` `PageDown` / `End` with a `locator` (`{ "kind": "css", "selector": "body" }`) plus `wait_for_timeout`. Allowed actions: `goto click fill press select_option wait_for wait_for_timeout`. Keep `environment.reduced_motion: "no-preference"`, or the site may turn its motion off.
2. `capture_browser_scenario` (screenshot before and after the key step) → `export_web_scripts` into `raw/scripts/` → `analyze_javascript_application` on its `analysis_input` with `detail: "summary"`. The template already raises the event budgets for real sites. Over ~10 MB REA returns a `resource_constraint` error but keeps the Evidence: run `export_evidence_bundle` to `raw/session-bundle.json` and pull records with `jq`. End every raid with one `export_evidence_bundle`.
3. Name the mechanism: library and version (D3, Chart.js, GSAP, Lottie, plain CSS…), what drives it (time, scroll, pointer, data), timings and easing, and cost (script KB, requests). `grep -l` the exported scripts for the library name first.
4. Write a **Steal Card** in `Wiki/Cognitive Perf Agent Wiki/09-design/steal-library.md` with `Seen: torn down` and the Evidence ID, plus "our translation".

### `feature <site> <the thing>` → competitive landscape, Algorithm Cards
"How does Oura's web dashboard show a readiness range?" Work only on what the client ships and sends.
1. Capture as above. Map the routes, the events it logs (names and payload *shape*, never real user values) and what's computed on the device vs fetched.
2. Answer in three labelled parts: **Observed** (Evidence IDs) · **Inferred** · **Unknown / server-side**. File it in `Wiki/Cognitive Perf Agent Wiki/24-synthesis/competitive-landscape.md` or the relevant Algorithm Card's Prior art.

### `ours <url or path>` → before a demo or a pilot
Our own page through the same lens: script order and weight, **every network call** (does anything leave the machine that shouldn't? health values in a URL or analytics call?), what loads before first paint, console errors. Compare two captures with `compare_web_captures`. Findings that are privacy issues go to `/security`; never edit code from inside a teardown.

### `file <path>` → anyone
SQLite: `inspect_sqlite_database` on a copy, never a live file, and never a file holding real participant data. App bundles / ZIP: `open_binary` → `inspect_artifact` (summary first) → `close_binary`.

## The card (every mode)
```
### <Site/app> — <the thing>   (Seen: torn down · <date> · Evidence <ev_… first 12>)
Mechanism:   <library/version + what drives it, one line>
How it runs: <trigger → computation → what changes on screen / what is sent>
Cost:        <script KB, requests>
Observed / Inferred / Unknown: <three short lines; server-side is always Unknown>
Our translation: <how the MECHANISM serves our student, in our words>
Not taken:   <their code, assets, look, words>
Raw:         .teardowns/<folder>/ (local only)
```
One line in `Wiki/Cognitive Perf Agent Wiki/log.md`.

## Don'ts
Run a teardown behind a login · fill a form on someone else's site beyond a search box · keep their scripts anywhere tracked by git · present inferred as observed · call a client-side read a full answer to "how does their score work" · install decompilers or attach debuggers to processes without a yes · run `rea setup` / `rea update` without showing the dry run first.

*Adapted from Startup City's /teardown, built on REA (morluto/rea).*
