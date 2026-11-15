// Loads the extension unpacked into a throwaway Chrome profile and checks it end to end against a local stub of the
// Halftime page (never the live site). Nothing is installed: it uses a temporary profile that is deleted afterwards.
//
//   CHROME_BIN=<Chrome for Testing or Chromium binary> node tools/spikes/laptop-use/test/run.mjs [--headed]
//
// Branded Google Chrome 137+ ignores --load-extension, so use Chrome for Testing or Chromium (for example the copy
// puppeteer keeps in ~/.cache/puppeteer/chrome/). The test build is the real extension with three changes:
// "1 minute" = 1 second (tally.js UNIT_MS) so it runs in seconds, a "Test social" site at social.localhost, and that
// site's host permission granted up front (the browser's own "allow" prompt can't be clicked by a script).
//
// Hosts (all 127.0.0.1): localhost = the Halftime stub (served with the live site's CSP from site/vercel.json),
// social.localhost = a picked site, work.localhost = a site that isn't picked, other.localhost = a page that isn't Halftime.
import { createServer } from "node:http";
import { spawn, execFile } from "node:child_process";
import { readFile, cp, writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readdirSync } from "node:fs";
import assert from "node:assert/strict";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXT_SRC = join(HERE, "../extension"), REPO = join(HERE, "../../../..");
const EXPECTED_ID = "hgenhjkhjkkoenmjmggocollkdbdlond";
const HEADED = process.argv.includes("--headed");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  const base = join(process.env.HOME, ".cache/puppeteer/chrome");
  if (existsSync(base)) for (const v of readdirSync(base).sort().reverse()) {
    const p = join(base, v, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
    if (existsSync(p)) return p;
  }
  throw new Error("Set CHROME_BIN to a Chrome for Testing or Chromium binary");
}

// ---- local pages
const csp = JSON.parse(await readFile(join(REPO, "site/vercel.json"), "utf8")).headers[0].headers.find((h) => h.key === "Content-Security-Policy").value;
const page = (t) => `<!doctype html><meta charset=utf-8><title>${t}</title><h1>${t}</h1>`;
const server = createServer(async (req, res) => {
  const host = (req.headers.host || "").split(":")[0], path = new URL(req.url, "http://x").pathname;
  res.setHeader("Content-Type", path.endsWith(".js") ? "text/javascript" : "text/html; charset=utf-8");
  if (host === "localhost" || host === "127.0.0.1") {
    res.setHeader("Content-Security-Policy", csp);
    if (path === "/halftime-bridge.js") return res.end(await readFile(join(HERE, "../halftime-bridge.js")));
    return res.end(await readFile(join(HERE, "stub-halftime.html")));
  }
  if (host === "other.localhost") return res.end(page("Not Halftime") + `<script>window.reach = !!(window.chrome && chrome.runtime && chrome.runtime.sendMessage)</script>`);
  res.end(page(host === "social.localhost" ? "A picked site (synthetic)" : "A site that is not picked (synthetic)"));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const PORT = server.address().port;

// ---- test build of the extension
const work = await mkdtemp(join(tmpdir(), "halftime-ext-"));
const EXT = join(work, "ext"), PROFILE = join(work, "profile");
await cp(EXT_SRC, EXT, { recursive: true });
const man = JSON.parse(await readFile(join(EXT, "manifest.json"), "utf8"));
man.optional_host_permissions.push("*://*.social.localhost/*");
man.host_permissions = ["*://*.social.localhost/*"];
await writeFile(join(EXT, "manifest.json"), JSON.stringify(man, null, 2));
await writeFile(join(EXT, "sites.js"), (await readFile(join(EXT, "sites.js"), "utf8")).replace("export const SITES = [", 'export const SITES = [\n  { label: "Test social", domains: ["social.localhost"] },'));
// test-only trace of every bucket change, kept in session storage (not the local storage the privacy check reads)
await writeFile(join(EXT, "background.js"), (await readFile(join(EXT, "background.js"), "utf8")).replace("  T.observe(s, now, await where());",
  "  const w = await where(); T.observe(s, now, w);\n  { const d = (await chrome.storage.session.get('dbg')).dbg || []; d.push([now - s.startAt, w.bucket]); await chrome.storage.session.set({ dbg: d.slice(-80) }); }"));
await writeFile(join(EXT, "tally.js"), (await readFile(join(EXT, "tally.js"), "utf8")).replace("export const UNIT_MS = 60000;", "export const UNIT_MS = 1000;"));

// ---- Chrome + a minimal CDP client
const CDP_PORT = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(findChrome(), [...(HEADED ? [] : ["--headless=new"]), `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${PROFILE}`,
  `--load-extension=${EXT}`, `--disable-extensions-except=${EXT}`, "--no-first-run", "--no-default-browser-check", "--window-size=1200,800", "about:blank"], { stdio: "ignore" });
let ver;
for (let i = 0; i < 100 && !ver; i++) { await sleep(100); ver = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`).then((r) => r.json()).catch(() => null); }
const ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let seq = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const id = ++seq; pending.set(id, (m) => (m.error ? rej(new Error(method + ": " + m.error.message)) : res(m.result))); ws.send(JSON.stringify({ id, method, params, sessionId })); });
const attach = async (targetId) => (await send("Target.attachToTarget", { targetId, flatten: true })).sessionId;
const evalIn = async (sid, expr, gesture = false) => {
  const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true, userGesture: gesture }, sid);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};
const open = async (url) => { const { targetId } = await send("Target.createTarget", { url }); const sid = await attach(targetId); await send("Runtime.enable", {}, sid); await waitReady(sid); return { targetId, sid }; };
const waitReady = async (sid) => { for (let i = 0; i < 40; i++) { const r = await send("Runtime.evaluate", { expression: "document.readyState === 'complete' && !!document.body && document.body.innerText.length > 0", returnByValue: true }, sid).catch(() => null); if (r && r.result && r.result.value) return sleep(200); await sleep(100); } };
const front = async (t) => { await send("Target.activateTarget", { targetId: t.targetId }); await send("Page.bringToFront", {}, t.sid); };
const swTarget = async () => { for (let i = 0; i < 50; i++) { const { targetInfos } = await send("Target.getTargets"); const t = targetInfos.find((x) => x.type === "service_worker" && x.url === `chrome-extension://${EXPECTED_ID}/background.js`); if (t) return t; await sleep(100); } throw new Error("no extension service worker"); };
const swEval = async (expr) => { const t = await swTarget(); const sid = await attach(t.targetId); try { return await evalIn(sid, expr); } finally { await send("Target.detachFromTarget", { sessionId: sid }).catch(() => {}); } };

const results = []; const check = (name, fn) => Promise.resolve().then(fn).then(() => { results.push(["PASS", name]); console.log("PASS", name); }, (e) => { results.push(["FAIL", name, e.message]); console.log("FAIL", name, "-", e.message); });
const H = `http://localhost:${PORT}/`;

try {
  const stub = await open(H);
  await evalIn(stub.sid, "stub.hello()"); // wakes the service worker
  const extId = EXPECTED_ID;
  await check(`loads unpacked with the fixed ID ${EXPECTED_ID}`, async () => assert.ok(await swTarget()));
  await check("background holds no network code (fetch, XHR, WebSocket, sendBeacon)", async () => {
    for (const f of ["background.js", "tally.js", "options.js", "popup.js", "sites.js"]) assert.doesNotMatch(await readFile(join(EXT_SRC, f), "utf8"), /\bfetch\(|XMLHttpRequest|new WebSocket|sendBeacon|EventSource/, f);
  });
  await check("install-time permissions are only storage + idle (no tabs, history, all-sites)", async () => {
    const p = await swEval("chrome.permissions.getAll()");
    assert.deepEqual(p.permissions.sort(), ["idle", "storage"]);
    assert.deepEqual(p.origins, ["*://*.social.localhost/*"]); // test build only; the real build starts with none
  });

  // Halftime page before any site is picked
  await check("Halftime page reaches the extension under the live CSP (hello → ready:false before picks)", async () => {
    const r = await evalIn(stub.sid, "stub.hello()");
    assert.deepEqual(r, { ok: true, v: 2, ready: false });
    assert.deepEqual(await evalIn(stub.sid, "window.cspViolations"), []);
  });
  await check("a page that isn't Halftime can't reach the extension", async () => {
    const o = await open(`http://other.localhost:${PORT}/`);
    assert.equal(await evalIn(o.sid, "window.reach"), false);
    await send("Target.closeTarget", { targetId: o.targetId });
  });

  // Pick the test site in the options page, as a tester would
  const opt = await open(`chrome-extension://${extId}/options.html`);
  await check("picking a site in the options page stores it", async () => {
    await evalIn(opt.sid, `document.querySelector('[data-label="Test social"]').click()`, true);
    await sleep(500);
    assert.deepEqual(await swEval("chrome.storage.local.get('picks').then(o => o.picks)"), ["social.localhost"]);
    assert.match(await evalIn(opt.sid, "document.getElementById('msg').textContent"), /added/);
  });
  await send("Target.closeTarget", { targetId: opt.targetId });
  await check("hello → ready:true after a pick", async () => assert.equal((await evalIn(stub.sid, "stub.hello()")).ready, true));

  // A session (1 min = 1 s here): Halftime tab 1.5 s, picked 4 s, other site 3 s, picked 3 s with the service worker
  // killed half-way → expect picked ≈ 7, other ≈ 5, outside 0, away 0
  const social = await open(`http://social.localhost:${PORT}/`), workTab = await open(`http://work.localhost:${PORT}/`);
  // headed: make the test browser the front app, or another app on this desktop would (rightly) count as "outside"
  const appPath = findChrome().replace(/\.app\/.*$/, ".app");
  const openApp = (...a) => new Promise((r) => spawn("open", a, { stdio: "ignore" }).on("exit", r));
  if (HEADED && process.platform === "darwin") { await openApp("-a", appPath); await sleep(800); }
  // headed on a Mac: macOS's own record of the frontmost app is the ground truth for "outside the browser"
  const appName = appPath.split("/").pop().replace(/\.app$/, "");
  const frontApp = () => new Promise((r) => execFile("lsappinfo", ["front"], (_e, o) => execFile("lsappinfo", ["info", "-only", "name", String(o).trim()], (_e2, o2) => r(String(o2 || "").replace(/.*=/, "").replace(/"/g, "").trim()))));
  const sampler = () => { const samples = []; let on = true; (async () => { while (on) { samples.push([Date.now(), await frontApp()]); await sleep(150); } })();
    return () => { on = false; let ms = 0; for (let i = 1; i < samples.length; i++) if (samples[i - 1][1] !== appName) ms += samples[i][0] - samples[i - 1][0];
      return { outsideS: Math.round(ms / 100) / 10, apps: [...new Set(samples.map((x) => x[1]))] }; }; };
  const near = (got, want, tol, label) => assert.ok(Math.abs(got - want) <= tol, `${label}: extension ${got}, macOS ${want}`);
  const macOS = HEADED && process.platform === "darwin";
  const stop1 = macOS ? sampler() : null;
  await front(stub);
  const { id } = await evalIn(stub.sid, "stub.start()");
  await sleep(1500); // on the Halftime page: not counted
  await check("focus is visible to the extension in this browser (window focused)", async () => assert.equal(await swEval("chrome.windows.getLastFocused().then(w => w.focused)"), true));
  await front(social); await sleep(4000);
  await front(workTab); await sleep(3000);
  await front(social); await sleep(1500);
  const swNow = await swTarget(); await send("Target.closeTarget", { targetId: swNow.targetId }).catch(() => {}); // Chrome stops idle workers; simulate it
  await sleep(1500);
  await front(stub); await sleep(300);
  const endR = await evalIn(stub.sid, "stub.end()");
  const truth1 = stop1 ? stop1() : null;
  if (HEADED) console.log("   trace (ms since start, bucket):", JSON.stringify(await swEval("chrome.storage.session.get('dbg').then(o => o.dbg)")));
  await check(`end returns only the four totals: picked ≈ 7, other ≈ 5 (got ${JSON.stringify(endR)})`, () => {
    assert.deepEqual(Object.keys(endR).sort(), ["away_min", "ok", "other_min", "outside_min", "picked_min"]);
    if (truth1) { // another app may come to the front on a desktop someone is using; then it must count as outside, as macOS saw it
      console.log("   macOS frontmost apps during session:", truth1.apps.join(", "), "| not the test browser for", truth1.outsideS, "s");
      near(endR.outside_min, truth1.outsideS, 1.5, "outside");
      near(endR.picked_min + endR.other_min + endR.outside_min, 12, 2, "all buckets = session length");
    } else {
      assert.ok(endR.picked_min >= 6 && endR.picked_min <= 8, "picked " + endR.picked_min);
      assert.ok(endR.other_min >= 4 && endR.other_min <= 6, "other " + endR.other_min);
      assert.equal(endR.outside_min, 0);
    }
    assert.equal(endR.away_min, 0);
  });
  await check("asking again for the same session returns the same number; another id gets nothing", async () => {
    assert.deepEqual(await evalIn(stub.sid, "stub.end()"), endR);
    assert.deepEqual(await evalIn(stub.sid, `HalftimeLaptop.ask({type:'end', id:'not-this-session-123'})`), { ok: false });
  });
  await check("what's stored on the laptop: picks + last {id, four totals, minutes per picked site}; no URLs, titles or other hosts", async () => {
    const all = await swEval("chrome.storage.local.get(null)");
    console.log("   stored:", JSON.stringify(all));
    assert.deepEqual(Object.keys(all).sort(), ["last", "picks"]);
    const { ok: _ok, ...totals } = endR;
    assert.deepEqual(all.last, { id, ...totals, sites: { "social.localhost": endR.picked_min } });
    assert.doesNotMatch(JSON.stringify(all), /http|Test|picked site|work\.localhost/);
  });

  // Discard: nothing kept
  await evalIn(stub.sid, "stub.start()"); await front(social); await sleep(1200); await front(stub);
  await check("discard keeps nothing", async () => {
    assert.deepEqual(await evalIn(stub.sid, "stub.discard()"), { ok: true });
    assert.deepEqual(Object.keys(await swEval("chrome.storage.local.get(null)")), ["picks"]);
  });

  // Popup text while a session runs
  await evalIn(stub.sid, "stub.start()"); await front(social); await sleep(2200);
  await check("popup shows the running count and the picked sites", async () => {
    const pop = await open(`chrome-extension://${extId}/popup.html`); await sleep(500);
    const txt = await evalIn(pop.sid, "document.body.innerText");
    console.log("   popup:", txt.replace(/\n+/g, " | "));
    assert.match(txt, /This session so far/); assert.match(txt, /Other tabs/); assert.match(txt, /Outside the browser/);
    assert.match(txt, /Test social\s+\d+ min/); assert.match(txt, /Only you see the per-site minutes/);
    await send("Target.closeTarget", { targetId: pop.targetId });
  });
  await front(stub); await evalIn(stub.sid, "stub.discard()");

  // macOS only, headed only: another app in front moves time to "outside". 2 s picked + 3 s Finder + 2 s picked → picked ≈ 4, outside ≈ 3.
  if (HEADED && process.platform === "darwin") {
    const app = appPath, sh = openApp;
    await sh("-a", app); await sleep(800);
    const stop2 = sampler();
    await evalIn(stub.sid, "stub.start()"); await front(social); await sleep(2000);
    await sh("-a", "Finder"); await sleep(1500);
    const seen = await swEval("chrome.windows.getLastFocused().then(w => w.focused)");
    await sleep(1500);
    await sh("-a", app); await sleep(500); await front(social); await sleep(2000);
    await front(stub);
    const r = await evalIn(stub.sid, "stub.end()"), truth2 = stop2();
    await check(`another app in front counts as outside the browser, matching macOS (Finder in front → focused: ${seen}; got ${JSON.stringify(r)}; macOS: not the test browser for ${truth2.outsideS} s, apps ${truth2.apps.join(", ")})`, () => {
      assert.equal(seen, false);
      assert.ok(r.outside_min >= 2, "outside " + r.outside_min);
      near(r.outside_min, truth2.outsideS, 1.5, "outside");
    });
  }

  await check("Forget my picks and counts clears storage", async () => {
    const o2 = await open(`chrome-extension://${extId}/options.html`);
    await evalIn(o2.sid, "document.getElementById('forget').click()", true); await sleep(500);
    assert.deepEqual(await swEval("chrome.storage.local.get(null)"), {});
  });
} finally {
  ws.close(); chrome.kill(); server.close();
  await sleep(500); await rm(work, { recursive: true, force: true });
}
const failed = results.filter((r) => r[0] === "FAIL").length;
console.log(`\n${results.length - failed}/${results.length} passed${HEADED ? " (headed)" : " (headless)"}`);
process.exit(failed ? 1 : 0);
