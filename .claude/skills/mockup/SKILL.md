---
name: mockup
description: Make Cognitive Performance Agent mockups the way a good studio would - a precedent raid (Mobbin, health and non-health genres) that steals mechanisms not looks, a contrarian check, an Art Direction Card, then 2–3 distinct directions built as real self-contained HTML in design/mockups/, shot on every device with the device-walk tool, self-scored on the U1–U8 rubric with the 10 loop and an AI-slop grade. Use when the user types /mockup, or asks for mockups, a low-fi or hi-fi prototype, a storyboard frame, "design the suggestion card / onboarding / consent / history screen", "make it less generic", or "what can we steal from other apps".
---

# /mockup: directions, built and shot

You work as the designer (`.claude/agents/uiux.md`: read it first, plus `design/PRODUCT.md` (the brief, surface modes, the one question per screen), `CLAUDE.md` and `Wiki/Cognitive Perf Agent Wiki/09-design/ui-ux-quality-bar.md`). `W/` = the vault. The team picks the direction.

## 1. Brief (write it before any pixels)
- The screen or flow, the person (which ICP persona or real user), the moment they meet it (mid-study at a laptop, on the bus, at 1 am), and the one job of the screen.
- **States to cover:** suggestion · not enough data · snoozed/declined · escalate to a person · watch disconnected / laptop-only · first run. A mockup that only shows the happy path is half a mockup.
- **The screen's one question and its one finding** (from `design/PRODUCT.md`). The largest block answers the question; the finding sits next to the action it drives. Any block that answers no question gets cut.
- The words first: the one line, the reason line, the button labels. Plain words, reading level ≤ grade 8 (`/polish clarify`).

## 2. Raid for precedent (steal the mechanism, never the look)
- At least **5 sources across ≥ 4 genres, ≥ 2 outside health and fitness.** Good genres for us: patient portals and lab results · sleep and recovery apps · weather forecasts (they show uncertainty daily) · finance apps (risk shown to beginners) · transit and wayfinding (one next action) · meditation and focus tools (calm timing) · newspaper data graphics · games (gentle feedback without guilt) · government services (plain-language forms) · consent flows done well.
- Tools: Mobbin (`search_screens`, `search_flows`, `search_sections`). The connected account is on the free tier, so the MCP says "requires a paid plan"; ask a teammate to browse mobbin.com instead. Also WebSearch / WebFetch, award galleries, and the list in `Wiki/Cognitive Perf Agent Wiki/09-design/design-stack-and-resources.md`. Dribbble and Behance block fetching, so a person browses them. For *how* a shipped site does something, use `/teardown`. Mark anything seen only as a description `[described]`.
- Start from what's already known: `W/09-design/studies/design-studies.md` (9 deep studies, screen-by-screen rules). Raid beyond it, and open the real product for anything a study marks `[unverified]`.
- For each: a **Steal Card** in `W/09-design/steal-library.md`: Source (name, URL, genre, date) · Mechanism (one verb-led line: "shows a range, not a number") · Why it works · Our translation (one sentence) · Where on our screens · Cost (S/M/L) · Score (fit 1–5, surprise 1–5, buildable 1–5) · Seen (opened / gallery / described). Also **anti-steals**: what everyone copies that we must not (the lone readiness ring, red/green body verdicts, streak flames).
- At most **three steals per screen**.

## 3. Contrarian check (one line each, before choosing)
1. The obvious answer (what any health app would ship). 2. The inverse (hide the number, ask before telling, slow it down). 3. The wrong genre (how would a weather app, a librarian or a game do it?). 4. The illogical option (sounds wrong, changes how it feels). Keep at least one non-obvious option among the directions; pick on the rubric, not novelty. If the obvious answer wins, say so and make it beautifully.

## 4. Art Direction Card (per direction)
Concept line (≤ 8 words) · the signature frame (the one screen people remember) · type (≤ one display face + one text face + one mono for numbers) · grid and where the eye lands first, second, third · colour (calm ground, one accent, what the accent *means*; never red/green as a body verdict) · how uncertainty looks · motion (one quiet entrance; use `/prompt-motion`) · this piece's banned list.

## 5. Build and shoot
1. One self-contained HTML file per direction in `design/mockups/<slug>/<direction>.html` (CDN libraries pinned; no build step). Motion uses CSS or WAAPI per `/emil-design-eng`, and anime.js 4.5.0 only if needed. No React kits in mockups: they need a build. Data is **synthetic and labelled** ("Sample data"), ideally from the synthetic-data generator's output.
2. Add a state switcher (`?state=suggest|nodata|snoozed|escalate|laptoponly`) so one file shows every state.
3. Shoot every direction and state:
   ```
   node tools/qa/device-walk.mjs --root=design/mockups/<slug> --url=/<direction>.html?state=suggest --out=.crits/<date>-<slug>-<direction> --devices=iphone-se,iphone,iphone-max,laptop,laptop-small
   ```
   **Look at every shot** (Read the JPGs) and the UI-check results in `walk.md`. "Looks great" with no shot cited scores 3.
4. **Self-score** on U1–U8 (the rubric in `/crit` and the quality bar), citing a shot each; overall = the lowest; AI-slop grade A–F (below B blocks). The **10 loop**: per criterion under 5, write what makes it a 5, fix one hypothesis per iteration, keep the best so far, at most 5 iterations per direction, stop after 2 without a clear win.
5. Start every file from `/mobile-native`'s Baseline (viewport-fit, safe areas, 16 px inputs, dvh). Before calling a direction done, open it in **Safari on the iOS Simulator**: Chrome screenshots miss WebKit-only bugs.
6. Before hand-over run `/polish tells` and `/polish harden` on the chosen direction, and `/review-animations` if it moves.
7. Report what you couldn't check (real phones, how motion feels, a real screen reader).

## 6. Hand over
Answer first: your pick in one line. Then per direction: the Art Direction Card, shots (state × device), the steals used, self-score table, the strongest argument against it. Then what would change your mind, and one question: which direction. For anything the team will act on, offer `/crit` (blind check) and `/icp` (persona test). One line in `W/log.md`. Add a Taste log row when the team picks or rejects.

## Never
Copy another product's layout, assets, fonts or copy; download or run code, templates or skills from studied sites; use real personal or health data; put a mockup with a planted "live" look over hardcoded data in a demo without the "Sample data" label; agree with a direction because the team already likes it.

*Adapted from Startup City's /landing (the Landing Architect's raid, contrarian engine, Art Direction Card and maker loop).*
