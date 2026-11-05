#!/usr/bin/env node
// Scroll-smoothness profiler: how much work a page does while someone scrolls it and taps it.
//
//   node tools/qa/perf-scroll.mjs --url=/index.html --root=site [--device=iphone|laptop] [--cpu=4] [--runs=2]
//   node tools/qa/perf-scroll.mjs --url=https://halftime-study.vercel.app/ --device=iphone
//
// Headless Chrome (throwaway profile), CPU slowed --cpu times to stand in for a phone. It scrolls the
// whole page top to bottom with real compositor scroll gestures, taps the demo buttons, then reports:
//   frames      rAF frame times while scrolling: median, p95, worst, and % of frames over 33 ms (visible jank)
//   long tasks  main-thread tasks over 50 ms
//   work        Chrome's own counters for the run: layouts, style recalcs, and time in layout, style and script
// Numbers are relative (headless rendering is software, not a GPU): compare before vs after, not with a real phone.
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, extname, normalize, resolve, sep } from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const URL_ARG = opt('url', '/'), ROOT = normalize(resolve(opt('root', '.'))), CPU = +opt('cpu', 4), RUNS = +opt('runs', 2);
const DEV = { iphone: [390, 844, 3, true], 'iphone-se': [375, 667, 2, true], laptop: [1440, 900, 1, false] }[opt('device', 'iphone')];
const PORT = +opt('port', 8851), CDP = PORT + 1000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(CHROME)) { console.error('Chrome not found (set CHROME_BIN)'); process.exit(1); }

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const LIVE = /^https?:\/\//.test(URL_ARG);
const server = LIVE ? null : createServer(async (req, res) => {
  try {
    const p = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (p !== ROOT && !p.startsWith(ROOT + sep)) throw new Error('outside root');
    const f = (await stat(p)).isDirectory() ? join(p, 'index.html') : p;
    res.writeHead(200, { 'Content-Type': TYPES[extname(f).toLowerCase()] || 'application/octet-stream' }); res.end(await readFile(f));
  } catch { res.writeHead(404); res.end(); }
}).listen(PORT, '127.0.0.1');
const TARGET = LIVE ? URL_ARG : `http://127.0.0.1:${PORT}${URL_ARG.startsWith('/') ? '' : '/'}${URL_ARG}`;

const profile = mkdtempSync(join(tmpdir(), 'cpa-perf-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP}`, '--remote-debugging-address=127.0.0.1', `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--mute-audio', '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore', detached: true });
const cleanup = () => { try { process.kill(-chrome.pid, 'SIGKILL'); } catch {} try { rmSync(profile, { recursive: true, force: true }); } catch {} try { server?.close(); } catch {} };
process.on('exit', cleanup); process.on('SIGINT', () => process.exit(130));
process.on('unhandledRejection', (e) => { console.error(e); process.exit(1); });

let ws, seq = 0; const pending = new Map(); const errors = [];
for (let i = 0; i < 80 && !ws; i++) { try { const pg = (await (await fetch(`http://127.0.0.1:${CDP}/json`)).json()).find((t) => t.type === 'page'); if (pg) ws = new WebSocket(pg.webSocketDebuggerUrl); } catch {} if (!ws) await sleep(250); }
if (ws.readyState !== WebSocket.OPEN) await new Promise((r) => ws.addEventListener('open', r));
const trace = []; let traceDone = null;
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Tracing.dataCollected') trace.push(...m.params.value);
  if (m.method === 'Tracing.tracingComplete') traceDone?.();
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description?.split('\n')[0]); });
const send = (method, params = {}) => new Promise((r, rej) => { const i = ++seq; pending.set(i, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : r(m.result))); ws.send(JSON.stringify({ id: i, method, params })); });
const js = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.value;

await send('Page.enable'); await send('Runtime.enable'); await send('Performance.enable', { timeDomain: 'timeTicks' });
const [w, h, dpr, mobile] = DEV;
await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile, screenWidth: w, screenHeight: h });
if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });

const metric = async () => Object.fromEntries((await send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));
const pct = (a, q) => a.length ? a[Math.min(a.length - 1, Math.floor(q * a.length))] : 0;
const results = [];
for (let run = 0; run < RUNS; run++) {
  await send('Emulation.setCPUThrottlingRate', { rate: 1 });
  await send('Page.navigate', { url: TARGET }); await sleep(2500);
  await js('document.fonts ? document.fonts.ready.then(() => 1) : 1'); await sleep(800);
  // recorder: rAF deltas and long tasks, from here on
  await js(`(() => { window.__f = []; window.__lt = []; let last = performance.now();
    const loop = (t) => { window.__f.push(t - last); last = t; requestAnimationFrame(loop); }; requestAnimationFrame(loop);
    try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ type: 'longtask', buffered: false }); } catch {}
    window.__ev = []; try { new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.interactionId) window.__ev.push([e.name, Math.round(e.duration), Math.round(e.processingEnd - e.processingStart)]); })).observe({ type: 'event', durationThreshold: 16 }); } catch {}
    return 1; })()`);
  await send('Emulation.setCPUThrottlingRate', { rate: CPU });
  const m0 = await metric();
  trace.length = 0; await send('Tracing.start', { categories: 'devtools.timeline,disabled-by-default-devtools.timeline', transferMode: 'ReportEvents' });
  const total = await js('document.documentElement.scrollHeight - innerHeight');
  // scroll the whole page in finger-sized flicks, like reading it
  const step = Math.round(h * 0.6);
  for (let y = 0; y < total; y += step) {
    await send('Input.synthesizeScrollGesture', { x: Math.round(w / 2), y: Math.round(h * 0.6), yDistance: -step, speed: 1600, gestureSourceType: mobile ? 'touch' : 'mouse', repeatCount: 1 });
  }
  await sleep(300);
  await new Promise((r) => { traceDone = r; send('Tracing.end'); });
  const sum = (names) => trace.filter((e) => names.includes(e.name) && e.ph === 'X').reduce((a, e) => a + (e.dur || 0), 0) / 1000;
  const paintMs = sum(['Paint']), rasterMs = sum(['RasterTask']), layerMs = sum(['Layerize', 'UpdateLayerTree', 'PrePaint']), paints = trace.filter((e) => e.name === 'Paint').length;
  console.log(`  run ${run + 1}: scroll paint ${Math.round(paintMs)} ms in ${paints} paints · raster ${Math.round(rasterMs)} ms · pre-paint/layers ${Math.round(layerMs)} ms`);
  const mS = await metric(); const fS = await js('window.__f.length'); const ltS = await js('window.__lt.length');
  // back to the demo and tap through it
  await js('document.getElementById("try").scrollIntoView(); 1'); await sleep(400);
  for (const sel of ['.opt[data-v=night]', '.opt[data-v="220"]', '.opt[data-v="0"]', '.opt[data-v=gym]', '.opt[data-v=day]', '[data-act=yes]', '[data-act=back]']) {
    await js(`(() => { const b = document.querySelector('${sel}'); if (!b) return 0; const r = b.getBoundingClientRect(); window.__tap = [r.x + r.width / 2, r.y + r.height / 2]; return 1; })()`);
    const [tx, ty] = await js('window.__tap || [0,0]');
    if (mobile) { await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: tx, y: ty }] }); await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); }
    else { for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: tx, y: ty, button: 'left', clickCount: 1 }); }
    await sleep(650);
  }
  const m1 = await metric();
  await send('Emulation.setCPUThrottlingRate', { rate: 1 });
  const f = (await js('window.__f.slice(2)')).sort((a, b) => a - b), lt = await js('window.__lt');
  const ev = await js('window.__ev'); const taps = {}; for (const [n, d, pr] of ev) { if (!taps[n] || taps[n][0] < d) taps[n] = [d, pr]; }
  console.log(`  run ${run + 1}: slowest tap events (input → next paint, handler): ${Object.entries(taps).map(([n, [d, pr]]) => `${n} ${d}/${pr} ms`).join(', ') || 'none over 16 ms'}`);
  const d = (k) => m1[k] - m0[k];
  const ds = (k) => mS[k] - m0[k];
  console.log(`  run ${run + 1}: scroll ${Math.round(ds('LayoutCount'))} layouts ${Math.round(ds('LayoutDuration') * 1000)} ms, ${Math.round(ds('RecalcStyleCount'))} styles ${Math.round(ds('RecalcStyleDuration') * 1000)} ms, script ${Math.round(ds('ScriptDuration') * 1000)} ms, long tasks ${JSON.stringify(lt.slice(0, ltS).map(Math.round))} | taps: long tasks ${JSON.stringify(lt.slice(ltS).map(Math.round))}`);
  results.push({ frames: f.length, p50: pct(f, .5), p95: pct(f, .95), worst: f[f.length - 1] || 0, jank: f.filter((x) => x > 33.4).length / Math.max(1, f.length),
    longTasks: lt.length, longest: Math.max(0, ...lt), layouts: d('LayoutCount'), styles: d('RecalcStyleCount'),
    layoutMs: d('LayoutDuration') * 1000, styleMs: d('RecalcStyleDuration') * 1000, scriptMs: d('ScriptDuration') * 1000, taskMs: d('TaskDuration') * 1000 });
}
const avg = (k) => results.reduce((s, r) => s + r[k], 0) / results.length;
const r1 = (x) => Math.round(x * 10) / 10;
console.log(`${LIVE ? URL_ARG : URL_ARG + ' (root ' + ROOT + ')'} · ${opt('device', 'iphone')} · CPU ${CPU}× slower · ${RUNS} run(s)`);
console.log(`frames      ${Math.round(avg('frames'))} · median ${r1(avg('p50'))} ms · p95 ${r1(avg('p95'))} ms · worst ${r1(avg('worst'))} ms · janky (>33 ms) ${r1(avg('jank') * 100)}%`);
console.log(`long tasks  ${r1(avg('longTasks'))} · longest ${r1(avg('longest'))} ms`);
console.log(`work        ${Math.round(avg('layouts'))} layouts (${r1(avg('layoutMs'))} ms) · ${Math.round(avg('styles'))} style recalcs (${r1(avg('styleMs'))} ms) · script ${r1(avg('scriptMs'))} ms · all tasks ${r1(avg('taskMs'))} ms`);
console.log(`errors      ${errors.length ? [...new Set(errors)].join(' | ') : 'none'}`);
process.exit(0);
