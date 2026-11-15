# Re-running round 1

1. `node tools/site/serve.mjs 3021` (local, no database key: nothing is recorded).
2. Rebuild the step files with the generator inlined (replace `<<seed.js>>` with the contents of `seed.js`):
   ```bash
   python3 - <<'PY'
   import json; seed = open("seed.js").read()
   for dev in ("phone", "laptop"):
       st = json.load(open(f"{dev}-steps.json"))
       for s in st:
           if "eval" in s and s["eval"].startswith("<<seed.js>>"): s["eval"] = seed + s["eval"][len("<<seed.js>>"):]
       json.dump(st, open(f"/tmp/{dev}-steps.json", "w"))
   PY
   ```
3. From the repo root, one device per process:
   `node tools/qa/device-walk.mjs --url=http://localhost:3021/ --steps=/tmp/phone-steps.json --devices=iphone --port=8851 --out=<dir>`
   `node tools/qa/device-walk.mjs --url=http://localhost:3021/ --steps=/tmp/laptop-steps.json --devices=laptop --port=8853 --out=<dir>`
Clicks wait about 0.7 s each: the app ignores taps that come faster than a person's (a double-tap guard).
