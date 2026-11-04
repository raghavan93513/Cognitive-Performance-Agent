// Device walk + UI checks (2026-11-04, adapted from Startup City's icp-walk.mjs).
// Walks a page the way a person would, once per device, saves a screenshot and the visible text at each step, and runs
// automatic UI checks on every shot, so /crit, /mockup and /icp review the real screen, not a description.
//
//   node tools/qa/device-walk.mjs --url=<path or http(s) url> [--out=<dir>] [--root=<folder to serve>]
//        [--devices=iphone,iphone-se,iphone-max,laptop,laptop-small] [--steps=<steps.json>] [--port=8841] [--block=<url pattern>,...]
//
// --url   a path ("/", "/card.html?state=nodata") is served from --root (default: the repo root) on 127.0.0.1;
//         a full http(s) url is opened as is. Use local pages and synthetic data only.
// --out   default .crits/<timestamp>/ in the repo (gitignored). Writes <out>/frames/<device>/NN-<name>.jpg,
//         <out>/walk.md (per device: load time, data transferred, console errors, each frame's visible text and
//         check results) and <out>/checks.json.
// Devices. Our users are US college students on iPhones (Heramb, 2026-11-04); each matches an /icp persona's device:
//   iphone        390×844 @3x, touch, iOS UA (iPhone 12–15)           ICP_1 Maya, ICP_2 Diego, ICP_3 Anika, ICP_5 Sam
//   iphone-se     375×667 @2x, touch, iOS UA (the smallest iPhone)    ICP_4 Jordan
//   iphone-max    430×932 @3x, touch, iOS UA (Pro Max / Plus)         — the large end
//   laptop        1440×900                                            ICP_1 Maya, ICP_3 Anika
//   laptop-small  1366×768                                            ICP_4 Jordan
// THIS IS CHROME, NOT SAFARI. It emulates iPhone sizes, touch and the iOS user agent, but WebKit-only behaviour
// (100vh vs the URL bar, input zoom, safe areas, sticky hover, rubber-banding) only shows in Safari: before calling a
// screen done, open it in Safari on the iOS Simulator (the page is reachable at localhost) or on a real iPhone.
// Steps (JSON array; without --steps: the first screen, then again at 4 s):
//   {"shot": "name", "note": "what the person is doing"}   save a frame + visible text + UI checks
//   {"wait": 2000}                                         let the page run
//   {"waitFor": "text:Take a break", "ms": 20000}          until that text is on screen (or "css:#sel")
//   {"click": "text:Snooze"} or {"click": "css:.btn"}      a real click (a tap on phones) on the element's centre
//   {"tap": [0.5, 0.8]}                                    a tap at a point (fractions of the screen, or pixels)
//   {"repeat": {"click": "text:Next", "until": "css:#done", "max": 20, "gap": 800}}
//   {"key": "Enter"} · {"scroll": 600} (≤ 5 means screens) · {"scrollTo": "text:Sources"} · {"go": "/other.html"}
// UI checks (heuristics, not a full audit; a real screen reader and real phones still need a human):
//   bad text (NaN, undefined, null, [object …]) · sideways page overflow · clipped text · tap targets < 44 px on touch
//   devices (< 24 px is a fail) · text contrast below WCAG AA (solid backgrounds only) · images without alt ·
//   buttons and links with no accessible name · visible text under 12 px · iPhone: no mobile viewport meta, zoom
//   disabled (user-scalable=no / maximum-scale=1), inputs under 16 px (iOS Safari zooms into them).
// Draws on the CPU (swiftshader): load and smoothness are rougher than a real GPU; data sizes are exact.
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { mkdirSync, writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, extname, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = normalize(join(fileURLToPath(import.meta.url), '../../..'));
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
if (args.includes('--help') || !opt('url', '')) {
  console.log('usage: node tools/qa/device-walk.mjs --url=<path or url> [--out=dir] [--root=dir] [--devices=iphone,iphone-se,iphone-max,laptop,laptop-small] [--steps=file.json]');
  process.exit(args.includes('--help') ? 0 : 1);
}
const URL_ARG = opt('url', '/');
const ROOT = normalize(resolve(opt('root', REPO)));
const OUT = resolve(opt('out', join(REPO, '.crits', new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-'))));
const PORT = +opt('port', 8841), CDP = PORT + 1000;
const BLOCK = opt('block', '').split(',').filter(Boolean);
const STEPS = opt('steps', '') ? JSON.parse(await readFile(opt('steps', ''), 'utf8'))
  : [{ shot: 'first-screen', note: 'the page as it first appears' }, { wait: 4000 }, { shot: 'at-4s' }];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(CHROME)) { console.error(`Chrome not found at ${CHROME} (set CHROME_BIN)`); process.exit(1); }

const IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';
const DEVICES = {
  iphone: { who: 'ICP_1 Maya · ICP_2 Diego · ICP_3 Anika · ICP_5 Sam', size: [390, 844], dpr: 3, ua: IOS, platform: 'iPhone' },
  'iphone-se': { who: 'ICP_4 Jordan (iPhone SE)', size: [375, 667], dpr: 2, ua: IOS, platform: 'iPhone' },
  'iphone-max': { who: 'the large end (Pro Max / Plus)', size: [430, 932], dpr: 3, ua: IOS, platform: 'iPhone' },
  laptop: { who: 'ICP_1 Maya · ICP_3 Anika', size: [1440, 900], dpr: 1 },
  'laptop-small': { who: 'ICP_4 Jordan (shared Windows laptop)', size: [1366, 768], dpr: 1 },
};
const WANT = opt('devices', 'iphone,laptop').split(',');
for (const d of WANT) if (!DEVICES[d]) { console.error(`unknown device ${d} (have ${Object.keys(DEVICES).join(', ')})`); process.exit(1); }

// ------------------------------------------------------------ static server (paths only, never outside --root)
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.csv': 'text/csv' };
const LIVE = /^https?:\/\//.test(URL_ARG);
const server = LIVE ? null : createServer(async (req, res) => {
  try {
    const p = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (p !== ROOT && !p.startsWith(ROOT + sep)) throw new Error('outside root');
    const f = (await stat(p)).isDirectory() ? join(p, 'index.html') : p;
    res.writeHead(200, { 'Content-Type': TYPES[extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(f));
  } catch { res.writeHead(404); res.end(); }
}).listen(PORT, '127.0.0.1');
const BASE = LIVE ? new URL(URL_ARG).origin : `http://127.0.0.1:${PORT}`;
const full = (u) => (/^https?:\/\//.test(u) ? u : BASE + (u.startsWith('/') ? u : '/' + u));

// ------------------------------------------------------------ Chrome (killed and its profile deleted on any exit)
const profile = mkdtempSync(join(tmpdir(), 'cpa-walk-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP}`, '--remote-debugging-address=127.0.0.1',
  `--user-data-dir=${profile}`, '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars', '--mute-audio',
  '--no-first-run', '--no-default-browser-check', '--window-size=1440,900', 'about:blank'], { stdio: 'ignore', detached: true });
let cleaned = false;
const cleanup = () => {
  if (cleaned) return; cleaned = true;
  try { process.kill(-chrome.pid, 'SIGKILL'); } catch { try { chrome.kill('SIGKILL'); } catch { /* gone */ } } // the whole group: helpers too
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* best effort */ }
  try { server?.close(); } catch { /* closed */ }
};
process.on('exit', cleanup);
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sig, () => { cleanup(); process.exit(130); });
process.on('uncaughtException', (e) => { console.error(e); cleanup(); process.exit(1); });
process.on('unhandledRejection', (e) => { console.error(e); cleanup(); process.exit(1); });

let ws, seq = 0;
const pending = new Map();
let log = null; // the current device's record
for (let i = 0; i < 80 && !ws; i++) {
  try {
    const page = (await (await fetch(`http://127.0.0.1:${CDP}/json`)).json()).find((t) => t.type === 'page');
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch { /* not up yet */ }
  if (!ws) await sleep(250);
}
if (!ws) throw new Error('Chrome did not start');
if (ws.readyState !== WebSocket.OPEN) await new Promise((r) => ws.addEventListener('open', r));
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (!log) return;
  if (m.method === 'Runtime.exceptionThrown') log.errors.push(m.params.exceptionDetails.exception?.description?.split('\n')[0] || m.params.exceptionDetails.text);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') log.errors.push(m.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 200));
  if (m.method === 'Network.loadingFinished') { log.bytes += m.params.encodedDataLength; log.requests++; }
  if (m.method === 'Network.loadingFailed' && !m.params.canceled && !/BLOCKED/.test(m.params.blockedReason || m.params.errorText)) log.errors.push(`failed to load (${m.params.errorText})`);
});
const send = (method, params = {}, ms = 120000) => new Promise((r, rej) => {
  const i = ++seq;
  const to = setTimeout(() => { pending.delete(i); rej(new Error(`CDP timeout: ${method}`)); }, ms);
  pending.set(i, (m) => { clearTimeout(to); m.error ? rej(new Error(`${method}: ${m.error.message}`)) : r(m.result); });
  ws.send(JSON.stringify({ id: i, method, params }));
});
const js = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(`in-page: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
  return r.result?.value;
};
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
if (BLOCK.length) await send('Network.setBlockedURLs', { urls: BLOCK });
await send('Network.setCacheDisabled', { cacheDisabled: true });
const DESK_UA = (await send('Browser.getVersion')).userAgent.replace('HeadlessChrome', 'Chrome');

// ------------------------------------------------------------ in-page helpers
// Visible text, top to bottom (roughly what a screen reader would say on this screen).
const VISIBLE = `(() => {
  const out = [], seen = new Set();
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walk.nextNode());) {
    const t = n.textContent.replace(/\\s+/g, ' ').trim(); if (!t || seen.has(t)) continue;
    const el = n.parentElement; if (!el) continue;
    const s = getComputedStyle(el); if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) continue;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) continue;
    seen.add(t); out.push(t);
  }
  return out.join(' · ').slice(0, 900);
})()`;
// The UI checks, run on what is on screen now. touch = the device is a phone.
const CHECKS = (touch) => `(() => {
  const touch = ${touch ? 'true' : 'false'}, vw = document.documentElement.clientWidth, vh = innerHeight, out = {};
  const add = (k, v) => { (out[k] = out[k] || []).push(v); };
  const vis = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0 && r.bottom > 0 && r.top < vh; };
  const label = (el) => (el.getAttribute('aria-label') || el.innerText || el.getAttribute('title') || el.value || el.getAttribute('alt') || el.tagName.toLowerCase()).replace(/\\s+/g, ' ').trim().slice(0, 40);
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  // bad text
  const bad = (document.body.innerText.match(/\\b(NaN|undefined|Infinity|null)\\b|\\[object [A-Za-z]+\\]/g) || []);
  if (bad.length) add('bad text', [...new Set(bad)].join(', '));
  // sideways overflow
  const sw = document.documentElement.scrollWidth; if (sw > vw + 1) add('page overflows sideways', sw + 'px wide on a ' + vw + 'px screen');
  const all = [...document.querySelectorAll('body *')].filter(vis);
  for (const el of all) {
    const s = getComputedStyle(el);
    // clipped text: its own text is cut by overflow or an ellipsis
    if (ownText(el) && el.scrollWidth > el.clientWidth + 1 && (/(hidden|clip)/.test(s.overflowX) || s.textOverflow === 'ellipsis'))
      add('clipped text', '"' + label(el) + '"');
    if (ownText(el)) {
      const fs = parseFloat(s.fontSize);
      if (fs < 12) add('text under 12 px', '"' + label(el) + '" ' + fs + 'px');
      // contrast against the first solid background up the tree
      const rgb = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
      const fg = rgb(s.color); let bg = null, img = false;
      for (let a = el; a; a = a.parentElement) { const st = getComputedStyle(a); if (st.backgroundImage !== 'none') { img = true; break; } const b = rgb(st.backgroundColor); if (b && b[3] > 0.95) { bg = b; break; } }
      if (!bg && !img) bg = [255, 255, 255, 1];
      if (fg && bg) {
        const mix = fg.map((v, i) => (i < 3 ? v * fg[3] + bg[i] * (1 - fg[3]) : 1));
        const L = (c) => { const [r, g, b] = c.slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
        const l1 = L(mix), l2 = L(bg), ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const large = fs >= 24 || (fs >= 18.66 && +s.fontWeight >= 700);
        if (ratio < (large ? 3 : 4.5)) add('contrast below AA', '"' + label(el) + '" ' + ratio.toFixed(2) + ':1');
      }
    }
  }
  // controls: names and tap targets
  for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=switch], [role=tab], [onclick]')) {
    if (!vis(el)) continue;
    const named = (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title') || (el.innerText || '').trim() || el.value || el.querySelector('img[alt]:not([alt=""])') || (el.id && document.querySelector('label[for="' + el.id + '"]')));
    if (!named) add('control with no name', el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''));
    if (touch) {
      const r = el.getBoundingClientRect();
      const inline = el.tagName === 'A' && el.parentElement && (el.parentElement.innerText || '').length > (el.innerText || '').length + 20;
      if (!inline && (r.width < 44 || r.height < 44)) add(r.width < 24 || r.height < 24 ? 'tap target under 24 px' : 'tap target under 44 px', '"' + label(el) + '" ' + Math.round(r.width) + '×' + Math.round(r.height));
    }
  }
  for (const im of document.querySelectorAll('img')) if (vis(im) && !im.hasAttribute('alt')) add('image without alt', im.getAttribute('src')?.slice(-40) || 'img');
  if (touch) { // iPhone-specific
    const vp = document.querySelector('meta[name=viewport]')?.getAttribute('content') || '';
    if (!/width\\s*=\\s*device-width/.test(vp)) add('no mobile viewport meta', vp || 'missing <meta name=viewport>');
    if (/user-scalable\\s*=\\s*(no|0)|maximum-scale\\s*=\\s*1(\\.0)?(?![\\d.])/.test(vp)) add('zoom disabled', vp);
    for (const f of document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, select'))
      if (vis(f) && parseFloat(getComputedStyle(f).fontSize) < 16) add('input under 16 px (iOS zooms)', label(f) + ' ' + getComputedStyle(f).fontSize);
  }
  const res = {}; for (const [k, v] of Object.entries(out)) res[k] = { n: v.length, eg: [...new Set(v)].slice(0, 5) };
  return res;
})()`;
const FAILS = new Set(['bad text', 'page overflows sideways', 'clipped text', 'tap target under 24 px', 'contrast below AA', 'control with no name', 'image without alt', 'no mobile viewport meta', 'zoom disabled', 'input under 16 px (iOS zooms)']);
const scrollToEl = (sel) => `(() => {
  const want = ${JSON.stringify(sel)}, t = want.replace(/^text:/, '').toLowerCase();
  const el = want.startsWith('css:') ? document.querySelector(want.slice(4))
    : [...document.querySelectorAll('h1, h2, h3, h4, p, button, a, li, label, span')].filter((e) => (e.innerText || '').trim().toLowerCase().includes(t))
      .sort((a, b) => a.innerText.length - b.innerText.length)[0];
  if (!el) return false; el.scrollIntoView({ block: 'center', behavior: 'instant' }); return true;
})()`;
const findEl = (sel) => `(() => {
  const want = ${JSON.stringify(sel)};
  const vis = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && r.bottom > 0 && r.top < innerHeight; };
  let el = null;
  if (want.startsWith('css:')) el = [...document.querySelectorAll(want.slice(4))].find(vis);
  else { const t = want.replace(/^text:/, '').toLowerCase();
    const all = [...document.querySelectorAll('button, a, [role=button], label, summary, input[type=button], input[type=submit], [onclick], [tabindex], li, div, span, p, h1, h2, h3')].filter(vis);
    const hit = all.filter((e) => (e.innerText || e.value || '').trim().toLowerCase().includes(t));
    hit.sort((a, b) => (a.innerText || '').length - (b.innerText || '').length); el = hit[0]; }
  if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
})()`;
let touchy = false;
async function clickAt(x, y) {
  if (touchy) {
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    await sleep(60);
    return send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  }
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
}

// ------------------------------------------------------------ the walk
const md = [`# Device walk: ${URL_ARG}`, '',
  `Captured ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC by \`tools/qa/device-walk.mjs\` (${LIVE ? 'a live url' : `served locally from \`${ROOT.replace(REPO, '.') || '.'}\``}).`,
  'Headless **Chrome** emulating iPhone sizes, not Safari: confirm iOS-only behaviour (URL bar and 100vh, input zoom, safe areas, sticky hover) in Safari on the iOS Simulator or a real iPhone. Load times are rougher than a real device; data sizes are exact. Visible text is what was on screen, top to bottom. UI checks are heuristics: ✗ = a likely defect, ⚠ = worth a look.', ''];
const allChecks = {};
const sum = { frames: 0, fails: 0 };
for (const name of WANT) {
  const dev = DEVICES[name];
  const dir = join(OUT, 'frames', name); mkdirSync(dir, { recursive: true });
  log = { errors: [], bytes: 0, requests: 0 };
  const [w, h] = dev.size, mobile = !!dev.ua;
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dev.dpr, mobile, screenWidth: w, screenHeight: h,
    ...(mobile ? { screenOrientation: { type: 'portraitPrimary', angle: 0 } } : {}) });
  await send('Emulation.setUserAgentOverride', mobile ? { userAgent: dev.ua, platform: dev.platform } : { userAgent: DESK_UA, platform: 'MacIntel' });
  await send('Emulation.setTouchEmulationEnabled', mobile ? { enabled: true, maxTouchPoints: 5 } : { enabled: false });
  touchy = mobile;
  await send('Emulation.setCPUThrottlingRate', { rate: dev.cpu || 1 });
  await send('Network.emulateNetworkConditions', { offline: false, ...(dev.net || { latency: 0, downloadThroughput: -1, uploadThroughput: -1 }) });
  await send('Network.clearBrowserCookies');
  await send('Page.navigate', { url: 'about:blank' }); await sleep(300);
  await send('Storage.clearDataForOrigin', { origin: BASE, storageTypes: 'all' }).catch(() => {});

  const t0 = Date.now(); const at = () => ((Date.now() - t0) / 1000).toFixed(1) + ' s';
  const loaded = new Promise((r) => { const hnd = (e) => { const m = JSON.parse(e.data); if (m.method === 'Page.loadEventFired') { ws.removeEventListener('message', hnd); r(Date.now() - t0); } }; ws.addEventListener('message', hnd); });
  await send('Page.navigate', { url: full(URL_ARG) });
  const loadMs = await Promise.race([loaded, sleep(60000).then(() => null)]);
  const rows = [], detail = []; let n = 0;
  allChecks[name] = [];
  for (const s of STEPS) {
    try {
      if (s.wait) await sleep(s.wait);
      else if (s.go) await send('Page.navigate', { url: full(s.go) });
      else if (s.scroll) await js(`scrollBy({ top: ${+s.scroll <= 5 ? `${+s.scroll} * innerHeight` : +s.scroll}, behavior: "instant" }); true`);
      else if (s.scrollTo) { if (!(await js(scrollToEl(s.scrollTo)))) throw new Error(`not on the page: ${s.scrollTo}`); }
      else if (s.key) { for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: s.key, code: s.key, windowsVirtualKeyCode: { ArrowRight: 39, ArrowLeft: 37, ArrowDown: 40, ArrowUp: 38, Enter: 13, ' ': 32, Escape: 27, Tab: 9 }[s.key] || 0 }); }
      else if (s.tap) { const [vw, vh] = await js('[innerWidth, innerHeight]'); const [x, y] = s.tap.map((v, i) => (v <= 1 ? v * (i ? vh : vw) : v)); await clickAt(x, y); }
      else if (s.repeat) {
        const { click, until, max = 20, gap = 800 } = s.repeat; let k = 0;
        while (!(await js(findEl(until)).catch(() => null)) && k < max) { const q = await js(findEl(click)).catch(() => null); if (q) await clickAt(q.x, q.y); k++; await sleep(gap); }
        if (!(await js(findEl(until)).catch(() => null))) throw new Error(`still not on screen after ${k} taps on ${click}: ${until}`);
        rows.push(`| – | tapped \`${click.replace(/^text:|^css:/, '')}\` ${k}× | ${at()} | | | |`);
      } else if (s.click || s.waitFor) {
        const sel = s.click || s.waitFor, until = Date.now() + (s.ms || (s.click ? 8000 : 20000)); let p = null;
        while (!(p = await js(findEl(sel)).catch(() => null)) && Date.now() < until) await sleep(300);
        if (!p) throw new Error(`not found on screen: ${sel}`);
        if (s.click) { await sleep(120); const q = await js(findEl(sel)); await clickAt(q.x, q.y); }
      } else if (s.shot) {
        const file = `${String(++n).padStart(2, '0')}-${s.shot.replace(/[^a-z0-9-]+/gi, '-')}.jpg`;
        const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
        writeFileSync(join(dir, file), Buffer.from(r.data, 'base64'));
        const checks = await js(CHECKS(mobile)).catch((e) => ({ 'checks failed to run': { n: 1, eg: [e.message.slice(0, 80)] } }));
        const fails = Object.keys(checks).filter((k) => FAILS.has(k)), warns = Object.keys(checks).filter((k) => !FAILS.has(k));
        sum.frames++; if (fails.length) sum.fails++;
        allChecks[name].push({ frame: file, checks });
        const mark = fails.length ? `✗ ${fails.join(', ')}` : warns.length ? `⚠ ${warns.join(', ')}` : '✓';
        rows.push(`| ${n} | \`${file}\` | ${at()} | ${s.note || ''} | ${mark} | ${(await js(VISIBLE).catch(() => '')).replace(/\|/g, '/')} |`);
        for (const [k, v] of Object.entries(checks)) detail.push(`- frame ${n}, ${FAILS.has(k) ? '✗' : '⚠'} **${k}** (${v.n}): ${v.eg.map((x) => x.replace(/\|/g, '/')).join(' · ')}`);
      }
    } catch (e) { rows.push(`| – | step failed: \`${JSON.stringify(s).replace(/\|/g, '/')}\` | ${at()} | ${e.message.replace(/\|/g, '/')} | | |`); }
  }
  md.push(`## ${name}: ${dev.who}`, '',
    `- Screen: ${w}×${h}${mobile ? ` phone @${dev.dpr}x, touch` : ' laptop'}${dev.cpu ? `; CPU ${dev.cpu}× slower` : ''}${dev.net ? '; slow 4G (4 Mbps down, 150 ms)' : ''}`,
    `- Page load event: ${loadMs == null ? 'not within 60 s' : (loadMs / 1000).toFixed(1) + ' s'} · data transferred: ${(log.bytes / 1e6).toFixed(2)} MB in ${log.requests} requests`,
    `- Console errors: ${log.errors.length ? [...new Set(log.errors)].slice(0, 6).map((e) => '`' + e.replace(/`/g, "'") + '`').join(' · ') : 'none'}`, '',
    '| # | Frame | At | Doing | UI checks | Visible text |', '|---|---|---|---|---|---|', ...rows, '',
    ...(detail.length ? ['**UI check details**', '', ...detail, ''] : []));
  console.log(`${name}: ${n} frames, load ${loadMs == null ? '>60' : (loadMs / 1000).toFixed(1)} s, ${(log.bytes / 1e6).toFixed(2)} MB, ${log.errors.length} console errors`);
}
writeFileSync(join(OUT, 'walk.md'), md.join('\n'));
writeFileSync(join(OUT, 'checks.json'), JSON.stringify(allChecks, null, 2));
console.log(`UI checks: ${sum.fails} of ${sum.frames} frames with a likely defect (✗)`);
console.log(`→ ${join(OUT, 'walk.md')}`);
ws.close();
cleanup();
process.exit(0);
