# Screen journey

Every screen we built, stitched into one student's week. The published board is https://claude.ai/artifact/YJ7dhaYckaNcexVPUWt3XY (private: share it from its Share menu).

`index.html` is the board. It expects these files beside it:
- `img/*.jpg`: the captures;
- `live/app.html`: a copy of `../mockups/suggestion-card-v3/island-forecast.html` that also reads its state from the `#hash`;
- `live/landing.html`: a copy of `../mockups/landing/index.html`.

The images and live copies aren't committed. To regenerate them from the repo root:

```bash
node tools/qa/device-walk.mjs --root=design/mockups --url=/suggestion-card-v3/island-forecast.html --steps=design/screen-journey/steps/app-steps.json --devices=iphone --out=.crits/journey-app
node tools/qa/device-walk.mjs --root=design/mockups --url=/landing/index.html --steps=design/screen-journey/steps/land-steps.json --devices=iphone,laptop --out=.crits/journey-landing
node tools/qa/device-walk.mjs --root=design/mockups --url=/suggestion-card/index.html --steps=design/screen-journey/steps/ex-steps.json --devices=iphone --out=.crits/journey-explorations
node tools/qa/device-walk.mjs --root=design/mockups --url=/suggestion-card/index.html --steps=design/screen-journey/steps/exs1-steps.json --devices=iphone --out=.crits/journey-round1
node tools/qa/device-walk.mjs --root=design/mockups --url=/suggestion-card/index.html --steps=design/screen-journey/steps/exs2-steps.json --devices=iphone --out=.crits/journey-round2
```

Then:
1. Resize the frames to 585 px wide (1080 px for laptop frames), and save them as `img/<name>.jpg`. Drop the numeric prefix; laptop frames get a `lap-` prefix.
2. Copy the two mockups into `live/`, plus the round 1 and round 2 directions as `live/v1a.html`, `v1b`, `v1c`, `v2island`, `v2flip` and `v2halftime`, and apply the same hash fix to each. In `app.html`, replace `new URLSearchParams(location.search)` with `new URLSearchParams(location.search || location.hash.slice(1))`.

The "snooze" state has no URL of its own: it returns to the idle pill. The journey shows the idle pill instead.
