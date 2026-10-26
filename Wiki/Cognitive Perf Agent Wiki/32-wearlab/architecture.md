---
title: WearLab architecture
category: 32-wearlab
tags: [wearlab, architecture, frontend, engineering, design]
aliases: [WearLab stack, WearLab build, WearLab design tokens]
relationships:
  - target: "[[32-wearlab/32-wearlab]]"
    type: related_to
  - target: "[[32-wearlab/product-tour]]"
    type: related_to
  - target: "[[32-wearlab/teardowns-and-parts]]"
    type: related_to
  - target: "[[32-wearlab/what-we-reuse]]"
    type: related_to
sources: ["wearlab/package.json", "wearlab/index.html", "wearlab/vite.config.ts", "wearlab/src/App.tsx", "wearlab/src/main.tsx", "wearlab/src/lib/types.ts", "wearlab/src/data/", "wearlab/src/store/progress.ts", "wearlab/src/three/", "wearlab/src/index.css", "wearlab/src/components/", "wearlab/scripts/", "https://wearlab-learn.vercel.app"]
summary: "How WearLab is built: a Vite + React 19 + R3F single-page app, data-first part trees, a browser-only store, headless TS tests, a Blender glTF path, Vercel hosting and a dark chunky UI."
provenance:
  extracted: 0.8
  inferred: 0.16
  ambiguous: 0.04
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# WearLab architecture

WearLab is a static single-page app with no backend. Everything it shows is TypeScript data plus deterministic simulations that run in the browser. For what a visitor sees, read [[32-wearlab/product-tour|the product tour]] first.

## Stack and versions

From `package.json`, which names the package `wearlab` at version 0.1.0 with `"type": "module"`:

| Layer | Package | Version range |
|---|---|---|
| UI | react, react-dom | ^19.3.0 |
| Routing | react-router-dom | ^7.18.4 |
| 3D | three | ^0.186.1 |
| 3D in React | @react-three/fiber | ^9.8.1 |
| 3D helpers | @react-three/drei | ^10.7.8 |
| Bloom and tone mapping | @react-three/postprocessing / postprocessing | ^3.1.2 / ^6.39.5 |
| State | zustand | ^5.0.15 |
| Animation | motion | ^13.4.4 |
| Build | vite, @vitejs/plugin-react | ^8.3.1, ^6.1.1 |
| CSS | tailwindcss, @tailwindcss/vite | ^4.3.3 |
| Types | typescript, @types/three | ^7.0.2, ^0.186.0 |

- **Scripts:**
  - `dev` runs `vite` on port 5173 with `host: true`.
  - `build` runs `tsc -b && vite build`.
  - `typecheck` and `preview` are also defined.
- **`motion` looks unused.** I found no import of the `motion` package anywhere in `src`. Animation is handled by CSS keyframes and per-frame damping in three.js. ^[ambiguous]
- **tsconfig:** targets ES2022 with `moduleResolution: bundler`, `strict`, and `allowImportingTsExtensions`. That last setting is why the scripts can import `src/**/*.ts` directly under Node's `--experimental-strip-types`.

## App shell and routing

- **Entry:** `main.tsx` renders `<App/>` in `StrictMode`.
- **Routing:** `App.tsx` wraps everything in a **`HashRouter`**. Every screen is `lazy()`-loaded behind `Suspense`, and Vite splits it into per-route chunks in `dist/assets`.
- **Two route groups:**
  - **Full-screen** (no shell): `/quiz/:lessonId`, `/journey`, `/journey/step`, `/journey/sleep`, `/history/:brand`.
  - **Inside `<Shell/>`**: index (Home), `devices`, `devices/:deviceId`, `parts`, `parts/:kind`, `how`, `how/:topicId`, `history`, `history/compare`.
- **Legacy redirects:** a small `Redirect` component keeps the old addresses working (`/explore`, `/codex`, `/labs/:id` → topic of that lab, `/lesson/:id` → `/quiz/:id`, `/timeline`, `/time-machine`). Any unknown path goes to `/`.
- **Screen state lives in the URL query:**
  - Teardown uses `?open=…&sel=…`.
  - Time Machine uses `?lane=…&g=…`.
  - Journeys use `?c=<chapter>`.
  - So any view is a shareable link. ^[inferred]

## Data-first design

The schema lives in `src/lib/types.ts`. Its header comment says: "Everything the app shows is data shaped by these types."

- **Seven layers (`Cat`):** sense, convert, think, talk, power, show, protect. Each has a fixed colour, a tint and a blurb (`CATS`).
- **`PartNode` tree** (`src/data/devices/watch.ts` and `others.ts`). Each node has:
  - `id`;
  - an optional `kind` (a library key; defaults to `id`);
  - geometry as data, through `shape`, which is a union of 12 shape kinds (slab, box, cyl, annulus, coil, dome, frame, torus, band, flatband, strap, sphere), in millimetres with Y up;
  - `mat` (a `MatKey`), `pos`/`rot`;
  - an `explode` offset, used while its parent is open;
  - `instances` for repeated LEDs or pads;
  - a label `anchor`;
  - an optional camera `view`.
  - `src/data/devices/index.ts` adds `findPath`, `findNode`, `flatten`, `kindOf` and `partCount`.
- **Explain library keyed by part kind** (`src/data/library/`):
  - `manifest.ts` lists all **96** kinds, each with its layer, optional inside view and optional algorithms.
  - Four content files hold the explain cards, keyed by id: `content-sense`, `content-convert-think`, `content-talk-power` and `content-show-protect`.
  - `index.ts` merges them into `LIBRARY`. `lib(id)` throws on an unknown id.
  - Because cards are keyed by kind, an IMU explains itself the same way in every device.
- **`topics.ts`:**
  - 17 `Topic`s, each with a question, summary, journeys, lab, parts and quiz ids.
  - `DEVICE_QUIZZES`.
  - `homeOf()` / `homePath()` (where a quiz lives) and `topicOfLab()`.
- **`brands.ts`:** five `Brand`s with `status`, `types`, `topics`, `to`, `history` and an optional `keyTopic`. A brand with `status: 'ready'` appears on Home, Devices and History automatically.
- **`links.ts`:** cross-links computed from data "so they never go stale":
  - `measuresOf(device)` counts only a measurement topic's **sense-layer** parts, unless the topic lists `devices` explicitly. For example, a band has an IMU but does not do fall detection.
  - `devicesWith(kind)`, `topicsOfPart(kind)` and `devicesFor(topic)`.
- **`concepts.ts`:** 49 concept ids that exercises are tagged with.
- **Glob loading:** `src/data/curriculum/tier*.ts`, `src/inside/views/*.tsx` and `src/lab/labs/*.tsx` are all picked up with `import.meta.glob`. Adding a file registers it.

## Progress store (browser only)

`src/store/progress.ts` is a zustand store wrapped in `persist`.

- **Contents:** `done` (quiz id → timestamp) and `journeys` (journey id → timestamp), plus `markDone`, `markJourney` and `reset`.
- **Storage:** key `wearlab-progress`, version 2. Zustand's `persist` uses `localStorage` by default. ^[inferred]
- **Migration:** going from v1 ("the game: XP, chips, battery, streaks…") keeps only what was finished.
- **No network:** I found no `fetch`, analytics or account code in `src`. The only URLs are citation links in the journey, lab and Time Machine data.

## 3D rendering (`src/three`)

- **`DeviceView.tsx`:**
  - A React Three Fiber `<Canvas>` with `dpr [1,2]`, fov 32, ACES filmic tone mapping at exposure 1.25, and `localClippingEnabled`.
  - drei `CameraControls` with `smoothTime 0.45` fly the camera to the opened node. Lighting comes from drei `Environment` with `Lightformer`s.
  - **Explode and ghost:** each part's position is damped (`THREE.MathUtils.damp`) towards its base plus `explode × k`. Opacity is damped to fade out parts that are not in focus. Highlights lerp the emissive colour toward the part's layer colour.
  - **Slice mode** sets `clippingPlanes`. **X-ray** ghosts everything but the selection.
  - **Labels:** a DOM overlay projected every frame through a "label bus", with numbered badges and leader lines.
  - The same component also serves "tap" and "build" quiz exercises, through its `candidates`, `reveal` and `hidden` props.
- **`geometry.ts`** turns each `Shape` into cached BufferGeometry (rounded rects, `RoundedBoxGeometry`, extrusions).
- **`materials.ts`** builds `MatKey` materials, including procedural canvas textures such as PCB copper traces.
- **Postprocessing:** the journeys (`JourneyCanvas`, `StepCanvas`, `SleepCanvas`) and the Time Machine (`TimeCanvas`) have their own scenes. Photon and One Night add `@react-three/postprocessing` Bloom and ToneMapping.
- **Simulation code is separate from 3D code.** The simulations are pure TypeScript, so they can be tested headless:
  - `src/journey/ppg.ts` and `tissue.ts`;
  - `src/steps/{body,sensor,counter,sim}.ts`;
  - `src/sleep/{night,band,classify,model.gen}.ts`;
  - `src/timemachine/{model,compare,quiz}.ts`;
  - `src/lab/*-model.ts`.
  - The pipelines themselves are covered in [[32-wearlab/heart-signal-pipelines|Heart signal pipelines]] and [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]].

## Curriculum validator and headless tests (`scripts/`)

All scripts run with `node --experimental-strip-types scripts/<name>.ts` and need no build. On 2026-10-26 I ran the read-only ones under Node 22.23.1:

| Script | What it checks | Result |
|---|---|---|
| validate-curriculum.ts | Tiers, quizzes and links (rules listed on the curriculum page) | 52 quizzes, 409 items, "All good." |
| test-journey.ts | PPG pipeline and photon optics | "All Photon Journey checks passed." |
| test-steps.ts | Body, sensor and step counter | 51 passed |
| test-sleep.ts | Night, body, band and staging | 80 passed |
| test-timemachine.ts | Five brand catalogs, layout, morphs, history facts | 27,231 passed |
| test-compare.ts | Compare brands | 617 passed |
| test-recovery.ts | Strain and recovery maths | 43 passed |
| test-ecg.ts | Synthetic ECG and AF check | 44 passed |
| test-battery.ts | fēnix 8 battery table | 31 passed |
| test-temp.ts | Temperature trend alert | 21 passed |

The validator's rules are listed in [[32-wearlab/curriculum-and-quizzes|Curriculum and quizzes]].

Two scripts **write files**, and I did not run them:

- `train-sleep.ts` regenerates `src/sleep/model.gen.ts` from 14 simulated training nights.
- `export-devices.ts` writes `blender/devices.json`.

## Blender glTF pipeline

1. `scripts/export-devices.ts` dumps all five `PartNode` trees, geometry included, to `blender/devices.json`.
2. `blender -b -P scripts/blender_build.py [-- device …]` rebuilds each part as a named, parented, bevelled mesh. Materials come from presets of base colour, metallic, roughness, emission and alpha.
3. Each part's `kind` is stored as a custom property. That exports to glTF *extras* and becomes three.js `userData`.
4. The output is `blender/<device>.glb` and `.blend`. The files present are dated 2026-09-25: watch.glb 1.42 MB, band 506 KB, ring 481 KB, strap 187 KB, clip 177 KB.

PLAN §9 says the app **still renders procedural meshes**. Swapping in the `.glb` files part by part is listed under "Next ideas".

## Deployment

- **Host:** Vercel. Live at https://wearlab-learn.vercel.app.
- **Secrets not read:** a `.vercel/` project link and `.env.local` exist, and both are gitignored with `.env*`. I deliberately did not open them.
- **No `vercel.json`.** With hash routing, the static `dist/` needs no server rewrites. ^[inferred]
- **Last local build:** `dist/` holds a build dated 2026-10-20. The largest chunks are a `materials-*.js` of about 1.0 MB (probably bundling three.js ^[inferred]), `index-*.js` of about 282 KB, and `InsidePlayer-*.js` of about 189 KB.

## Git history

There are four commits, all on **2026-09-27** (UTC−4):

| Commit | Time | Message | Size |
|---|---|---|---|
| 6c55608 | 10:15 | wearlab: a 3D app for learning how wearables work | 171 files, +38,446 |
| 62f4cc8 | 11:13 | Add Garmin: round-watch Time Machine and a battery budget lab | 27 files |
| 3944b63 | 20:21 | Add Apple Watch: portrait Time Machine and an ECG lab for atrial fibrillation | 23 files |
| 210abc4 | 20:40 | Add Compare brands: every brand on one clock | 8 files |

The first commit already contains Fitbit, WHOOP and Oura. The working tree also has an uncommitted `.gitignore` edit and an untracked `tsconfig.tsbuildinfo`. Those predate this ingest and were left untouched.

## Visual language

The tokens are defined in `src/index.css` under `@theme`, with the comment "dark mode only". `index.html` sets `theme-color #0B0F19`, and `color-scheme: dark`.

- **Surfaces:**
  - bg `#0B0F19`;
  - surface `#141A28`;
  - raised `#1D2536`;
  - line `#232C40`;
  - stroke `#2A3448`.
- **Text:**
  - ink `#EEF1F7`;
  - slate `#B9C1D0`;
  - muted `#97A1B5`;
  - dim `#5B6680`.
- **Accents:**
  - coral `#FF4F6D`;
  - cyan `#2DD4EF`;
  - amber `#FFC53D`;
  - violet `#8B6CFF`, with text variant `#A996FF`;
  - sky `#5EA8FF`;
  - pink `#F472D0`;
  - LED green `#3DF5A0`.
  - Coral, cyan, amber and violet also have `-dk` shades, which are used for button edges.
- **Layer colours** (`CATS` in `types.ts`): Sense is cyan, Convert pink, Think violet, Talk sky, Power amber, Show coral, Protect grey `#97A1B5`. The same colours appear in 3D highlights, Parts filters and label badges.
- **Fonts** (Google Fonts in `index.html`):
  - **Fredoka** 500–700 for display;
  - **Nunito** 600–900 for body;
  - **JetBrains Mono** 500/700 for numbers and specs.
  - Body weight defaults to 700. The whole UI is deliberately heavy and rounded.
- **Chunky UI:**
  - `.btn-chunky` with `components/ui/Button.tsx` gives a solid fill with a darker 5 px bottom edge (3 px when small). The button nudges down 1 px when pressed.
  - Button tones are coral, cyan, amber, violet and ghost.
  - Cards use large radii (`rounded-2xl`/`3xl`).
  - Focus rings are a 3 px cyan outline.
  - The logo is "wear" + coral "lab".
- **Motion:**
  - CSS keyframes `wl-pulse`, `wl-bob`, `wl-glow`, `wl-flow`, `wl-pop`, `wl-shake`, `wl-spin` and `wl-cut` (the fade used for journey cuts).
  - All of them are switched off under `prefers-reduced-motion`. Reduced motion is also checked in 14 other places in `src`.
- **"Blip" mascot:** PLAN A1.2 lists one, but no Blip component or asset exists in `src`. It looks like a leftover from the game era. ^[ambiguous]

## What this means for the Cognitive Performance Agent

^[inferred]
- **Front-end stack.** If we build the student UI as React inside Electron (one option in [[08-frontend/student-interface-and-feedback|Student interface and feedback]]), WearLab's React 19 + Vite + Tailwind v4 + zustand setup is a working template from a teammate. Its explainers could even be embedded or deep-linked through hash routes.
- **Data-first and computed cross-links** carry over to our agent. Keeping signal definitions, thresholds and explanations as typed data, and checking them with a validator script, is the same discipline our deterministic policy code needs. See [[04-agent-engine/multi-agent-decision|Multi-agent decision]].
- **The headless-test pattern** fits our numeric model well: seeded, deterministic simulations with numeric assertions, run with plain Node. See [[12-research/evaluation-plan|Evaluation plan]].
- **Privacy posture.** WearLab stores only quiz and journey completion, in the browser, with no network calls. That is a useful baseline to compare against when we design consent for real biometric data. See [[10-trust-safety/privacy-and-consent|Privacy and consent]].
- **Caveat:** WearLab is a teaching tool with no API, auth or database. None of its architecture covers our ingestion path ([[05-data/data-pipeline|Data pipeline]]).

## Sources

- `wearlab/package.json`, `wearlab/index.html`, `wearlab/vite.config.ts`, `wearlab/tsconfig.json`, `wearlab/.gitignore`
- `wearlab/src/App.tsx`, `wearlab/src/main.tsx`, `wearlab/src/lib/types.ts`, `wearlab/src/store/progress.ts`
- `wearlab/src/data/devices/index.ts`, `wearlab/src/data/library/{index,manifest}.ts`, `wearlab/src/data/{topics,brands,links,concepts}.ts`
- `wearlab/src/three/{DeviceView.tsx,geometry.ts,materials.ts}`, `wearlab/src/index.css`, `wearlab/src/components/ui/Button.tsx`, `wearlab/src/components/shell/Shell.tsx`
- `wearlab/scripts/*.ts`, `wearlab/scripts/blender_build.py`, `wearlab/blender/`
- `wearlab/docs/PLAN.md` (§3, §8, §9), `wearlab/README.md`, `git log` (read-only)
- Live app: https://wearlab-learn.vercel.app
