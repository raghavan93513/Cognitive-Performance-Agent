#!/usr/bin/env python3
"""Build site/app.html (the working phone app) from the round-3 design mockup.

    python3 tools/site/build-app.py

Takes design/mockups/suggestion-card-v3/island-forecast.html (the Island + Forecast the team picked) and adds:
the signed-in profile from setup (name, wearable, athlete), tabs (Now, History, You), a Demo sheet to jump to
any moment, wiring for the buttons that did nothing in the mockup, and analytics (assets/track.js).
Every patch must match exactly once, so a change to the mockup fails loudly instead of silently.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "design/mockups/suggestion-card-v3/island-forecast.html"
OUT = ROOT / "site/app.html"
s = SRC.read_text()


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit(f"patch expected {count}, found {n}: {a[:90]!r}")
    s = s.replace(a, b)


# ---------- head
rep("<title>Halftime · Island + Forecast</title>",
    '<title>Halftime</title>\n<meta name="robots" content="noindex">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">')
rep(".island{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 76px)}",
    ".island{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 150px)}")

CSS = r"""
/* ---- app shell (site build): tabs, history, you, demo sheet, toast ---- */
.page,.settings,.tabview{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 92px)!important}
.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:4;background:var(--paper);border-top:1px solid var(--line);display:flex;justify-content:center;padding:6px max(10px, env(safe-area-inset-right,0px)) calc(env(safe-area-inset-bottom,0px) + 6px) max(10px, env(safe-area-inset-left,0px))}
.tabbar .in{display:grid;grid-template-columns:repeat(4,1fr);width:100%;max-width:520px}
.tabbar button{min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font:500 .75rem/1 var(--ui);color:var(--muted)}
.tabbar button[aria-current="page"]{color:var(--ink)}
.tabbar svg{width:24px;height:24px}
.tabview{max-width:520px;margin:0 auto;min-height:100dvh;padding:calc(env(safe-area-inset-top,0px) + 18px) 20px 0;background:var(--paper)}
.tabview h1{font:650 2rem/1.05 var(--ui);letter-spacing:-.035em}
.tabview .sub2{color:var(--ink2);margin-top:6px}
.hc{background:#fff;border-radius:22px;padding:16px 18px;margin-top:14px}
.hc h2{font:600 1rem/1.2 var(--ui);display:flex;align-items:center;gap:8px}
.hc .smp{margin-left:auto}
.stats3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
.stats3 div{background:var(--paper);border-radius:14px;padding:10px 12px}
.stats3 b{display:block;font:600 1.375rem/1.1 var(--ui);letter-spacing:-.02em}
.stats3 span{font-size:.75rem;color:var(--muted)}
.bars{position:relative;display:flex;align-items:flex-end;gap:4px;height:140px;margin-top:14px}
.bars .b{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:5px;height:100%}
.bars .b i{display:block;width:100%;border-radius:4px;background:var(--ink)}
.bars .b i.lo{background:#8B8983}
.bars .b small{font:500 .75rem/1 var(--mono);color:var(--muted);height:12px;white-space:nowrap}
.bars .usual{position:absolute;left:0;right:0;border-top:2px dashed var(--refill-ink)}
.bars .usual em{position:absolute;right:0;top:-19px;font:500 .75rem/1 var(--mono);font-style:normal;color:var(--refill-ink);background:#fff;padding:2px 4px}
.legend2{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;font-size:.8125rem;color:var(--ink2)}
.legend2 span{display:inline-flex;align-items:center;gap:6px}
.legend2 i{display:inline-block;width:12px;height:12px;border-radius:3px;background:var(--ink)}
.log{list-style:none;margin-top:8px}
.log li{display:grid;grid-template-columns:auto 1fr auto;gap:2px 12px;padding:11px 0;border-top:1px solid var(--line);align-items:baseline}
.log li:first-child{border-top:0}
.log .when{font:500 .75rem/1.2 var(--mono);color:var(--muted);grid-row:span 2;min-width:62px}
.log b{font-weight:600;font-size:.9375rem}
.log .what{grid-column:2;font-size:.8125rem;color:var(--ink2)}
.log .res{grid-row:1;grid-column:3;font:500 .75rem/1 var(--mono);border-radius:6px;padding:4px 6px;background:var(--paper)}
.log .res.took{background:rgba(142,214,188,.35);color:var(--refill-ink)}
.acct{display:flex;gap:14px;align-items:center}
.acct .av{width:52px;height:52px;border-radius:50%;background:var(--ink);color:var(--paper);display:grid;place-items:center;font:600 1.25rem/1 var(--ui)}
.rowbtn{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:52px;text-align:left;border-top:1px solid var(--line);font-weight:500}
.rowbtn:first-of-type{border-top:0}
.rowbtn span{color:var(--muted);font-size:.875rem}
.rowbtn.danger{color:#B42318}
.swt{flex:none;width:50px;height:30px;border-radius:15px;background:var(--line);position:relative;transition:background .2s ease}
.swt::after{content:"";position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .2s var(--ease)}
[aria-checked="true"] .swt{background:var(--refill-ink)}
[aria-checked="true"] .swt::after{transform:translateX(20px)}
.demobtn{position:fixed;left:max(12px, env(safe-area-inset-left,0px));top:calc(env(safe-area-inset-top,0px) + 10px);z-index:4;min-height:44px;padding:0 16px;border-radius:22px;background:var(--ink);color:var(--paper);font:600 .875rem/1 var(--ui);display:inline-flex;align-items:center;gap:8px;box-shadow:0 8px 20px rgba(0,0,0,.18)}
.demobtn::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--refill)}
.scrim{position:fixed;inset:0;z-index:19;background:rgba(20,20,20,.38);opacity:0;pointer-events:none;transition:opacity .2s ease}
.scrim.on{opacity:1;pointer-events:auto}
.dsheet{position:fixed;left:0;right:0;bottom:0;z-index:20;background:var(--paper);border-radius:26px 26px 0 0;max-width:560px;margin:0 auto;max-height:82dvh;overflow:auto;padding:10px 18px calc(env(safe-area-inset-bottom,0px) + 18px);transform:translateY(105%);transition:transform .32s var(--spring)}
.dsheet.on{transform:none}
.dsheet .grab{width:40px;height:5px;border-radius:3px;background:var(--line);margin:4px auto 12px}
.dsheet h2{font:650 1.375rem/1.1 var(--ui);letter-spacing:-.02em}
.dsheet p.s{color:var(--ink2);font-size:.9375rem;margin-top:4px}
.dlist{display:grid;gap:8px;margin-top:14px}
.dlist button{display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;min-height:56px;padding:12px 14px;border-radius:16px;background:#fff;width:100%}
.dlist b{font-weight:600}
.dlist span{font-size:.8125rem;color:var(--muted)}
.dclose{min-height:48px;width:100%;margin-top:10px;font-weight:600;color:var(--ink2)}
.htoast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 80px);transform:translate(-50%,8px);z-index:30;background:var(--ink);color:var(--paper);border-radius:16px;padding:11px 15px;font-size:.9375rem;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s var(--ease);max-width:calc(100% - 32px);text-align:center}
.htoast.on{opacity:1;transform:translate(-50%,0)}
.hello{font:500 .875rem/1 var(--ui);color:var(--muted);margin-bottom:10px}
.paused .slot,.paused .t-slot{opacity:.25}
.quiet{font:300 4rem/1 var(--ui);letter-spacing:-.05em;color:var(--refill);margin-top:8px}
@media (prefers-reduced-motion:reduce){.dsheet,.scrim,.htoast{transition:none}}
"""
rep("</style>", CSS + "</style>")

# ---------- buttons that did nothing in the mockup
rep('<nav class="foot"><button>Talk to someone</button><span class="smp">Sample data</span><button>Pause suggestions</button></nav>',
    '<nav class="foot"><button data-act="talk">Talk to someone</button><span class="smp">Sample data</span><button data-act="pause" class="pausebtn">Pause suggestions</button></nav>')
rep('<nav class="foot" style="margin-top:18px"><button>Talk to someone</button><span class="smp">Sample data</span><button>Pause suggestions</button></nav>',
    '<nav class="foot" style="margin-top:18px"><button data-act="talk">Talk to someone</button><span class="smp">Sample data</span><button data-act="pause" class="pausebtn">Pause suggestions</button></nav>')
rep('<button class="a no">+5 min</button>', '<button class="a no" data-act="plus5">+5 min</button>')
rep('<button class="rung first"><b>Book a time to talk</b>', '<button class="rung first" data-go="escbook"><b>Book a time to talk</b>')
rep('<button class="rung"><b>Talk to someone now</b>', '<button class="rung" data-go="escnow"><b>Talk to someone now</b>')
rep('<button class="rung"><b>Something for right now</b>', '<button class="rung" data-go="escquiet"><b>Something for right now</b>')
rep('const chip = (k, l) => `<button class="chip" aria-label="Source ${k}: ${l}">${k}</button>`;',
    'const chip = (k, l) => `<button class="chip" data-go="why" aria-label="Source ${k}: ${l}. See why">${k}</button>`;')

# ---------- attention areas (what was on screen, for how long)
rep('<section class="hero" aria-label="This session">', '<section class="hero" aria-label="This session" data-attn="now-clock">')
rep('<section class="forecast" aria-label=', '<section class="forecast" data-attn="now-forecast" aria-label=')
rep('<div class="next"><span class="sq"', '<div class="next" data-attn="now-next"><span class="sq"')
rep('<div class="full" id="full"></div>', '<div class="full" id="full" data-attn="island-card"></div>')

# ---------- the signed-in profile from setup (name, wearable, athlete)
rep('const Q = new URLSearchParams(location.search);',
    'const Q = new URLSearchParams(location.search);\n'
    'const PROFILE = (() => { try { return JSON.parse(localStorage.getItem("ht-profile") || "{}"); } catch { return {}; } })();\n'
    'const SUBJ0 = document.getElementById("subj").innerHTML;')
rep('  apple: { name: "Apple Watch", short: "Apple Watch", glyph: "watch", via: "through Apple Health", app: "Health", acct: "Apple Health" },',
    '  apple: { name: "Apple Watch", short: "Apple Watch", glyph: "watch", via: "through Apple Health", app: "Health", acct: "Apple Health" },\n'
    '  garmin: { name: "Garmin Forerunner", short: "Garmin", glyph: "band", via: "through Garmin Connect", app: "Garmin Connect", acct: "your Garmin account" },')
rep('const TEAM = Q.get("team") === "1";', 'const TEAM = Q.get("team") === "1" || PROFILE.role === "athlete";')
rep('let devKey = Q.get("device") || "fitbit";', 'let devKey = Q.get("device") || PROFILE.device || "fitbit";')
rep('const morning = /^(esc|connect|reconnect)/.test(Q.get("state") || "");', 'let morning = /^(esc|connect|reconnect)/.test(Q.get("state") || "");')
rep('  document.getElementById("clock").innerHTML = walking ?',
    '  document.getElementById("subj").innerHTML = SUBJ0; document.getElementById("ctime").textContent = "2:40";\n'
    '  document.getElementById("clock").innerHTML = walking ?')

# ---------- three new card states for the talk-to-someone ladder (sample words; real services to be confirmed)
rep("const V = {", r"""const V = {
  escbook: () => `<div class="status"><span>Halftime · morning</span><span>you choose</span></div>
    <h1 class="q q2">Book a time to talk</h1>
    <p class="why">In the real app this opens your campus counseling booking page. <b>Demo:</b> the service and link are still to be confirmed with Columbia Health.</p>
    <div class="acts"><button class="a yes" data-go="escdone2">Pick a time (demo)</button><button class="a no" data-go="escalate">Back</button></div>`,
  escdone2: () => `<div class="status"><span>Halftime · morning</span><span>booked (demo)</span></div>
    <h1 class="q q2">Thursday, 2:00 pm. You're booked.</h1>
    <p class="why">Sample booking. Halftime won't mention sleep again before then. You can cancel any time.</p>
    <div class="acts"><button class="a yes" data-go="idle">Done</button><button class="a no" data-go="escalate">Back</button></div>`,
  escnow: () => `<div class="status"><span>Halftime · morning</span><span>you choose</span></div>
    <h1 class="q q2">Talk to someone now</h1>
    <p class="why">In the real app this connects you to campus counseling, any time of day. <b>Demo:</b> the number is still to be confirmed with Columbia Health. In an emergency, call 911.</p>
    <div class="acts"><button class="a no" data-go="escalate">Back</button><button class="a no" data-go="idle">Close</button></div>`,
  escquiet: () => `<div class="status"><span>Halftime · two quiet minutes</span><span>breathe slowly</span></div>
    <p class="quiet" id="qt">2:00</p>
    <p class="why">Breathe in for 4, out for 6. Nothing to do but this.</p>
    <div class="acts"><button class="a yes" data-go="idle">Done</button><button class="a no" data-go="escalate">Back</button></div>`,""")

# ---------- every state change goes through here: header mode, tab, analytics
rep('const start = Q.get("state") || "walk";', r"""const _go = go;
go = function (s) {
  morning = /^(esc|connect|reconnect)/.test(s);
  if (window.APP) APP.beforeGo(s);
  _go(s);
  if (window.APP) APP.afterGo(s);
  if (window.HT) HT.screen(s, { device: devKey });
};
const start = Q.get("state") || "idle";""")

# ---------- QA fixes (2026-11-06)
# 1. the card's scroll area matched the old island height, so its bottom buttons were cut off
rep(".island.open .full{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 76px);",
    ".island.open .full{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 150px);")
# 2. "Change source" had no way back; 4. every wearable setup offers is connectable here too
rep("Halftime never sends them anything.</p>`,", "Halftime never sends them anything.</p>\n    <div class=\"links\"><button data-go=\"sources\">Back</button></div>`,")
rep('<div class="src off" aria-disabled="true">${glyph("watch")}<span><b>Apple Watch</b><span>Needs the Halftime iPhone app · coming later</span></span><i>Later</i></div>',
    '<button class="src" data-dev="apple" data-go="connected">${glyph("watch")}<span><b>Apple Watch</b><span>Through Apple Health on this iPhone</span></span><i>Connect</i></button>')
rep('<div class="src off" aria-disabled="true">${glyph("watch")}<span><b>Garmin</b><span>Not in the class pilot yet</span></span><i>Not yet</i></div>',
    '<button class="src" data-dev="garmin" data-go="connected">${glyph("band")}<span><b>Garmin</b><span>Through Garmin Connect</span></span><i>Connect</i></button>')
rep("using just your laptop (Mac or Windows) and calendar.", "using just your laptop and your next class.")
# 5. a device change in the app is saved, and reconnect remembers the last device
rep('const dv = e.target.closest("[data-dev]"); if (dv) devKey = dv.dataset.dev;',
    'const dv = e.target.closest("[data-dev]"); if (dv) { devKey = dv.dataset.dev; if (window.APP) APP.setDevice(devKey); }')
rep('reconnect: () => { const D = dev() || DEVICES.fitbit;', 'reconnect: () => { const D = dev() || DEVICES[PROFILE.lastDevice] || DEVICES.fitbit;')
rep('<div class="acts"><button class="a yes" data-go="connected">Reconnect</button>',
    '<div class="acts"><button class="a yes" data-dev="${Object.keys(DEVICES).find((k) => DEVICES[k] === D)}" data-go="connected">Reconnect</button>')
# 12. no wearable: no sleep answer to "what looks wrong", and honest copy
rep('<button class="rung" data-go="wrongsleep"><b>My sleep number is off</b><span>${dev() ? `It came from your ${dev().name}` : "No sleep source is connected"}</span></button>',
    '${dev() ? `<button class="rung" data-go="wrongsleep"><b>My sleep number is off</b><span>It came from your ${dev().name}</span></button>` : ""}')
rep('wrongtask: () => wrongOk("The apps you were switching between now count as one task. Reason 2 is gone for this session, so this suggestion rests on your time and sleep only. It\'ll learn from this next time too."),',
    'wrongtask: () => wrongOk(`The apps you were switching between now count as one task. Reason 2 is gone for this session, so this suggestion rests on your ${dev() ? "time and sleep" : "study time and next class"} only. It\'ll learn from this next time too.`),')
# pause also holds the pill
rep('document.getElementById("compact").addEventListener("click", () => go("walk"));',
    'document.getElementById("compact").addEventListener("click", () => { if (window.APP && APP.paused()) { APP.toast("Suggestions are paused. Tap Resume suggestions to turn them back on."); return; } go("walk"); });')

SHELL = r"""
<main class="tabview" id="history" hidden aria-label="History">
  <p class="hello" id="h-hello"></p>
  <h1>This week</h1>
  <p class="sub2">Sample data, as Halftime would show it after a week.</p>
  <section class="hc" data-attn="history-stats"><div class="stats3"><div><b>9</b><span>study sessions</span></div><div><b>21 h</b><span>studying</span></div><div><b>6 of 8</b><span>breaks taken</span></div></div></section>
  <section class="hc" data-attn="history-sleep"><h2 id="h-sleep-title">Sleep vs your usual</h2><div class="bars" id="h-bars" role="img"></div>
    <div class="legend2"><span><i></i>6 h or more</span><span><i style="background:#8B8983"></i>under 6 h</span><span><i style="background:none;border-top:2px dashed var(--refill-ink);border-radius:0;height:0;width:14px"></i>your usual</span></div></section>
  <section class="hc" id="h-heart" data-attn="history-heart"></section>
  <section class="hc" data-attn="history-log"><h2>Suggestions <span class="smp">Sample data</span></h2><ul class="log" id="h-log"></ul></section>
  <section class="hc" data-attn="history-sessions"><h2>Study sessions</h2><ul class="log" id="h-sessions"></ul></section>
</main>

<main class="tabview" id="you" hidden aria-label="You">
  <section class="hc acct" data-attn="you-account" style="margin-top:0"><span class="av" id="y-av">?</span><div><h1 id="y-name" style="font-size:1.5rem">You</h1><p class="sub2" id="y-meta" style="margin-top:2px"></p></div></section>
  <section class="hc" data-attn="you-sources"><h2>Your data</h2>
    <button class="rowbtn" data-act="sources-from-you">Data sources <span id="y-src">›</span></button>
    <button class="rowbtn" data-act="setup">Change setup <span>wearable, next class ›</span></button></section>
  <section class="hc" data-attn="you-privacy"><h2>This prototype</h2>
    <button class="rowbtn" role="switch" id="y-rec" aria-checked="true" data-act="rec"><div>Usage analytics<br><span>Screens, taps, time, device, IP address</span></div><i class="swt"></i></button>
    <button class="rowbtn" data-act="tour">Replay the tour <span>›</span></button>
    <button class="rowbtn" data-act="replay">Replay the demo day <span>›</span></button>
    <button class="rowbtn danger" data-act="signout">Sign out</button></section>
  <p class="smp" style="text-align:center;margin-top:16px">Halftime is a wellness tool, not medical advice. Everything here is sample data.</p>
</main>

<div class="scrim" id="scrim"></div>
<section class="dsheet" id="dsheet" role="dialog" aria-modal="true" aria-label="Demo moments" aria-hidden="true">
  <div class="grab" aria-hidden="true"></div>
  <h2>Jump to a moment</h2>
  <p class="s">Real sessions take hours, so the demo lets you skip ahead. Sample data.</p>
  <div class="dlist" id="dlist"></div>
  <button class="dclose" type="button" id="dclose">Close</button>
</section>
<div class="htoast" id="htoast" role="status" aria-live="polite"></div>

<nav class="tabbar" aria-label="Halftime"><div class="in">
  <button type="button" data-tab="now" aria-current="page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="9" width="16" height="6" rx="3"/><path d="M8 19h8"/></svg>Now</button>
  <button type="button" data-tab="history"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 19V11M10 19V6M15 19v-9M20 19v-5"/></svg>History</button>
  <button type="button" data-tab="you"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5"/></svg>You</button>
  <button type="button" id="demobtn" aria-haspopup="dialog" aria-controls="dsheet"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4l9 8-9 8zM15 4l5 8-5 8"/></svg>Demo</button>
</div></nav>
<script src="/assets/track.js"></script>
"""
rep("\n<script>\n// Sample data only.", SHELL + "\n<script>\n// Sample data only.")

APP = r"""
<script>
// App shell for the site: tabs, history, you, the demo sheet, toasts, and the buttons the mockup left empty.
(() => {
  if (!PROFILE.name || !PROFILE.done) { location.replace(PROFILE.name ? "/start#about" : "/start#account"); return; }
  if (PROFILE.signedIn === false) { location.replace("/start#login"); return; }
  const $ = (id) => document.getElementById(id);
  const first = String(PROFILE.name).split(" ")[0];
  const esc = (x) => String(x || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let toastT, paused = false, tab = "now", quietT, lastState = Q.get("state") || "idle", srcFrom = "", plus = 0;
  // "+5 min" during a walk: shift the countdown and the back-by time everywhere they show
  function applyPlus(root) {
    if (!plus) return;
    const back = `3:${String(50 + plus).padStart(2, "0")}`, left = `${4 + plus}:12`;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { const t = n.nodeValue.replace(/\b3:50\b/g, back).replace(/\b4:12\b/g, left); if (t !== n.nodeValue) n.nodeValue = t; }
  }
  const saveProfile = () => { try { localStorage.setItem("ht-profile", JSON.stringify(PROFILE)); } catch {} };
  // the next commitment people chose in setup names the sample day's 4:30 stop (the sample afternoon keeps its times)
  const NEXT = String(PROFILE.next || "Chem lab").replace(/\s+(at\s+)?\d{1,2}(:\d{2})?\s*(am|pm)?$/i, "").trim() || "Chem lab";
  const nextShort = NEXT === "Chem lab" ? "lab" : NEXT.toLowerCase();
  const RENAME = [[/Chem lab/g, NEXT], [/\blab\b/g, nextShort], ...(PROFILE.cal === false ? [[/from your calendar/g, "you added this"], [/calendar · you turned this on/g, "you added this"]] : [])];
  function rename(root) {
    if (NEXT === "Chem lab" && PROFILE.cal !== false) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { let t = n.nodeValue, o = t; for (const [re, to] of RENAME) t = t.replace(re, to); if (t !== o) n.nodeValue = t; }
    root.querySelectorAll("[aria-label]").forEach((el) => { let t = el.getAttribute("aria-label"), o = t; for (const [re, to] of RENAME) t = t.replace(re, to); if (t !== o) el.setAttribute("aria-label", t); });
  }
  function toast(m) { const t = $("htoast"); t.textContent = m; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2400); }
  const views = { history: $("history"), you: $("you") };
  function setTab(t, fromGo) {
    tab = t; clearInterval(quietT);
    document.querySelectorAll("[data-tab]").forEach((b) => b.dataset.tab === t ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
    const app = t === "now";
    views.history.hidden = t !== "history"; views.you.hidden = t !== "you";
    if (!app) { page.hidden = true; settings.hidden = true; island.style.display = "none"; }
    if (!fromGo) { scrollTo(0, 0); if (window.HT) HT.screen("tab_" + t); }
  }
  window.APP = {
    beforeGo(s) { views.history.hidden = true; views.you.hidden = true; clearInterval(quietT); },
    paused: () => paused,
    toast: (m) => toast(m),
    setDevice(k) { if (k === "none" && PROFILE.device && PROFILE.device !== "none") PROFILE.lastDevice = PROFILE.device; PROFILE.device = k; saveProfile(); drawShell(); },
    afterGo(s) {
      rename(full); rename(page);
      if (s === "running" || s === "runopen") { applyPlus(full); applyPlus(page); applyPlus($("liveview")); } else if (s !== "runopen") plus = 0;
      if (!s.startsWith("sources")) lastState = s;
      if (s === "idle" && srcFrom === "you") { srcFrom = ""; setTab("you"); return; }
      tab = s.startsWith("sources") ? "you" : "now";
      document.querySelectorAll("[data-tab]").forEach((b) => b.dataset.tab === tab ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
      if (s === "escquiet") { let left = 120; const q = () => { const el = $("qt"); if (!el) return clearInterval(quietT); el.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`; if (left-- <= 0) { clearInterval(quietT); toast("Two minutes. Nice."); } }; q(); quietT = setInterval(q, 1000); }
    },
  };
  document.querySelector(".tabbar").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]"); if (!b) return; // the Demo button has its own handler
    const t = b.dataset.tab;
    if (t === "now") { go(lastState); return; }
    setTab(t);
  });

  const DEMO = window.HALFTIME_DEMO;
  const role = PROFILE.role === "athlete" ? "athlete" : "student";
  const calOn = PROFILE.cal !== false;
  const calName = calOn ? (DEMO.PROVIDERS[PROFILE.calProvider] || "Google Calendar") : "";
  function spark(vals, usual, unit, label) { // one series, drawn to scale, with your usual as a dashed line
    const W = 300, H = 64, lo = Math.min(...vals, usual) - 3, hi = Math.max(...vals, usual) + 3, x = (i) => 6 + i * ((W - 12) / (vals.length - 1)), y = (v) => H - 8 - ((v - lo) / (hi - lo)) * (H - 20);
    const pts = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    return `<svg class="spark" viewBox="0 0 ${W} ${H + 14}" role="img" aria-label="${label}, last 14 nights: ${vals.join(", ")} ${unit}. Your usual: ${usual} ${unit}.">
      <line x1="6" x2="${W - 6}" y1="${y(usual).toFixed(1)}" y2="${y(usual).toFixed(1)}" stroke="#0F5E46" stroke-width="1.5" stroke-dasharray="4 4"/>
      <polyline points="${pts}" fill="none" stroke="#141414" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${x(vals.length - 1).toFixed(1)}" cy="${y(vals[vals.length - 1]).toFixed(1)}" r="3.5" fill="#141414"/>
      <text x="${W - 6}" y="${(y(usual) - 5).toFixed(1)}" text-anchor="end" font-size="11" fill="#0F5E46" font-family="Geist Mono, monospace">usual ${usual}</text>
      <text x="6" y="${H + 12}" font-size="11" fill="#64625C" font-family="Geist Mono, monospace">${DEMO.NIGHTS[0].d}</text><text x="${W - 6}" y="${H + 12}" text-anchor="end" font-size="11" fill="#64625C" font-family="Geist Mono, monospace">${DEMO.NIGHTS[DEMO.NIGHTS.length - 1].d}</text></svg>`;
  }
  function drawHome() {
    const D = dev(), T = DEMO.today(role), U = DEMO.USUAL, kind = DEMO.HRV_KIND[devKey] || "RMSSD";
    const tile = (l, v, unit, u) => `<div><span class="l">${l}</span><b>${v}<small>${unit}</small></b><span class="u">${u}</span></div>`;
    $("home-body").innerHTML = `<h2>Body today <span class="src2">${D ? esc(D.name) + " · sample" : "Sample · no wearable"}</span></h2>
      <div class="vit">${tile("Sleep last night", "5 h 10", "min", "usual about 7 h")}${tile("Heart rate now", T.hrNow.bpm, "bpm", T.hrNow.note)}${tile("Resting heart rate", T.lastNight.rhr, "bpm", "usual " + U.rhr + " bpm")}${tile("HRV, overnight", T.lastNight.hrv, "ms", kind + " · usual " + U.hrv + " ms")}</div>
      ${T.training ? `<p class="fine2">${esc(T.training.what)} today: ${T.training.dur}, average heart rate ${T.training.avgHr} bpm.</p>` : ""}
      <p class="fine2">${D ? "After short sleep, resting heart rate often runs higher and HRV lower. Shown for context, never as a diagnosis." : "Connect a watch or ring in Data sources to see your own. These are sample numbers."}</p>`;
    const ev = DEMO.calendar(role);
    $("home-cal").innerHTML = calOn
      ? `<h2>Today <span class="src2">${esc(calName)} · sample</span></h2><ol class="ag">${ev.map((e) => `<li class="ev-${e.state}"><span class="at">${e.t}</span><div><b>${esc(e.state === "next" ? NEXT_LABEL(e) : e.what)}${e.state === "next" ? '<span class="tg">next stop</span>' : e.state === "now" ? '<span class="tg">now</span>' : ""}</b><span class="w">${esc(e.where)}</span></div></li>`).join("")}</ol>
        <p class="fine2">${DEMO.week(role).map(([d, w]) => `${d}: ${esc(w)}`).join(" · ")}</p>`
      : `<h2>Today <span class="src2">calendar off</span></h2><p class="fine2" style="margin-top:6px">Next stop: <b>${esc(NEXT)}</b> at 4:30 pm (you typed this). Turn the calendar on in Change setup to see your whole day.</p>`;
  }
  const NEXT_LABEL = (e) => (PROFILE.next && PROFILE.next !== e.stop ? NEXT : e.what);
  function drawShell() {
  const D = dev(), none = !D; drawHome();
  // heart history
  $("h-heart").innerHTML = `<h2>Resting heart rate <span class="smp">${none ? "Sample · no wearable" : esc(D.name) + " · sample"}</span></h2>${spark(DEMO.NIGHTS.map((n) => n.rhr), DEMO.USUAL.rhr, "bpm", "Resting heart rate")}
    <h2 style="margin-top:14px">HRV, overnight <span class="smp">${DEMO.HRV_KIND[devKey] || "RMSSD"}, ms</span></h2>${spark(DEMO.NIGHTS.map((n) => n.hrv), DEMO.USUAL.hrv, "ms", "Overnight HRV")}
    <p class="fine2" style="font-size:.8125rem;color:var(--muted);margin-top:8px">Higher resting heart rate and lower HRV tend to follow your short nights. Context only.</p>`;
  $("h-hello").textContent = `${first}'s week`;
  $("h-sleep-title").innerHTML = none ? `Sleep vs your usual <span class="smp">Sample · no wearable</span>` : `Sleep vs your usual <span class="smp">${esc(D.name)} · sample</span>`;
  const mx = 9, H = 140 - 17;
  $("h-bars").innerHTML = NIGHTS.map((n, i) => `<div class="b"><i class="${n.h < 6 ? "lo" : ""}" style="height:${Math.round((n.h / mx) * H)}px" title="${n.d}: ${n.h} h"></i><small>${i % 2 ? "" : n.d.split(" ")[1]}</small></div>`).join("")
    + `<span class="usual" style="bottom:${Math.round(17 + (7 / mx) * H)}px"><em>usual 7 h</em></span>`;
  $("h-bars").setAttribute("aria-label", "Sleep, last 14 nights: " + NIGHTS.map((n) => `${n.d} ${n.h} hours`).join(", ") + ". Usual about 7 hours.");
  const LOG = [["Today 3:45", "Short walk now?", "2 h 40 min in, 14 switches", "took it", 1], ["Wed 11:50 pm", "Stop for tonight?", "Class at 9:30 am", "20 more min", 0],
    ["Wed 4:10", "Keep going.", "Steady switching", "kept going", 0], ["Tue 2:30", "Short walk now?", "2 h 10 min in", "took it", 1], ["Mon 9:40 pm", "Take a 15-minute break?", "3 h 20 min in", "snoozed", 0],
    ["Mon 3:05", "Still learning your usual sleep.", "Night 6 of 7", "noted", 0]];
  $("h-log").innerHTML = LOG.map(([w, q, why, r, ok]) => `<li><span class="when">${w}</span><b>${q}</b><span class="res${ok ? " took" : ""}">${r}</span><span class="what">${why}</span></li>`).join("");
  const SES = [["Today", "Organic chemistry", "2 h 40 min · 1 break"], ["Wed", "Problem set 7", "3 h 05 min · 2 breaks"], ["Tue", "Organic chemistry", "2 h 15 min · 1 break"], ["Mon", "Bio reading", "3 h 20 min · 1 break"], ["Sun", "Essay draft", "2 h 30 min · 1 break"]];
  $("h-sessions").innerHTML = SES.map(([w, t, d]) => `<li><span class="when">${w}</span><b>${t}</b><span class="what">${d}</span></li>`).join("");

  // ---- you
  $("y-av").textContent = first.slice(0, 1).toUpperCase();
  $("y-name").textContent = PROFILE.name;
  $("y-meta").textContent = [PROFILE.role === "athlete" ? "Student-athlete" : "Student", PROFILE.school, none ? "No wearable" : D.name, calOn ? calName : "Calendar off"].filter(Boolean).join(" · ");
  $("y-rec").setAttribute("aria-checked", window.HT ? HT.isRecording() : false);
  $("dlist").innerHTML = moments(D, none).map(([s, t, d]) => `<button type="button" data-moment="${s}"><b>${esc(t)}</b><span>${esc(d)}</span></button>`).join("");
  }

  const moments = (D, none) => [
    ["walk", "2 h 40 min in: a walk fits", "Halftime speaks once, with its reasons"],
    ["keep", "You keep going", "It checks in once more, later"],
    ["running", "On a 5-minute walk", "The pill becomes a countdown"],
    ["nodata", "Your first week", "It says it's still learning instead of guessing"],
    ...(none ? [["nowear", "No wearable", "Laptop and next class only"]] : [["stale", "Your " + D.short + " didn't sync", "Sleep is left out, and it says so"]]),
    ["wrong", "Something looks wrong", "Tell it what was off"],
    ["escalate", "Thursday morning, after weeks of short sleep", "It offers someone to talk to"],
    ...(none ? [] : [["reconnect", "Reconnect your " + D.short, "Every 7 days"]]),
    ["idle", "Back to the quiet pill", "Nothing to read"],
    ["tour", "Take the tour again", "What each part of the screen does"],
  ];
  drawShell(); rename(page);
  // ---- greeting on the Now screen
  const sj = $("subj"); if (sj) { const hi = document.createElement("p"); hi.className = "hello"; hi.textContent = `Hi ${first}`; document.querySelector(".hero").prepend(hi); }

  // ---- demo moments
  const sheet = $("dsheet"), scrim = $("scrim"); sheet.inert = true;
  const openSheet = (on) => { sheet.classList.toggle("on", on); scrim.classList.toggle("on", on); sheet.setAttribute("aria-hidden", !on); sheet.inert = !on; if (on) { sheet.querySelector("button").focus(); if (window.HT) HT.event("demo_sheet", { value: "open" }); } else $("demobtn").focus(); };
  $("demobtn").addEventListener("click", () => openSheet(true));
  $("dclose").addEventListener("click", () => openSheet(false));
  scrim.addEventListener("click", () => openSheet(false));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet.classList.contains("on")) openSheet(false); });
  $("dlist").addEventListener("click", (e) => { const b = e.target.closest("[data-moment]"); if (!b) return; openSheet(false); if (window.HT) HT.event("demo_jump", { value: b.dataset.moment });
    if (b.dataset.moment === "tour") { if (window.HTTour) { HTTour.reset(); go("idle"); setTimeout(() => HTTour.start(), 350); } return; }
    go(b.dataset.moment); });

  // ---- buttons the mockup left empty, and the you tab
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-act]"); if (!a) return;
    const k = a.dataset.act;
    if (k === "talk") go("escalate");
    else if (k === "pause") { paused = !paused; page.classList.toggle("paused", paused); document.querySelectorAll(".pausebtn").forEach((b) => b.textContent = paused ? "Resume suggestions" : "Pause suggestions"); toast(paused ? "Suggestions paused for 1 hour" : "Suggestions back on"); if (paused) go("idle"); }
    else if (k === "plus5") { if (plus >= 9) { toast("That's the longest this walk can go."); return; } const before = plus; plus += 5; if (plus > 9) plus = 9;
      const back = (p) => `3:${String(50 + p).padStart(2, "0")}`, left = (p) => `${4 + p}:12`;
      for (const root of [full, page, $("liveview")]) { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const t = n.nodeValue.replace(new RegExp(`\\b${back(before)}\\b`, "g"), back(plus)).replace(new RegExp(`\\b${left(before)}\\b`, "g"), left(plus)); if (t !== n.nodeValue) n.nodeValue = t; } }
      toast(`Added ${plus - before} minutes. Back by ${back(plus)} pm.`); }
    else if (k === "setup") location.href = "/start#wearable";
    else if (k === "tour") { if (window.HTTour) { HTTour.reset(); go("idle"); setTimeout(() => HTTour.start(), 350); } }
    else if (k === "replay") { try { sessionStorage.removeItem("ht-played"); } catch {} location.href = "/app"; }
    else if (k === "rec") { const on = a.getAttribute("aria-checked") !== "true"; a.setAttribute("aria-checked", on); if (window.HT) { on ? HT.optIn() : HT.optOut(); } toast(on ? "Usage analytics on" : "Usage analytics off on this device"); }
    else if (k === "signout") { if (window.HT) { HT.event("sign_out"); HT.flush(); } PROFILE.signedIn = false; saveProfile(); location.href = "/"; }
    else if (k === "sources-from-you") { srcFrom = "you"; go("sources"); }
  });

  // ---- first visit in this tab: the quiet pill, then a fast-forward to the moment Halftime speaks
  let played = false; try { played = sessionStorage.getItem("ht-played") === "1"; } catch {}
  // first visit after setup: the tour (once per person); otherwise the quiet pill, then a fast-forward to the moment Halftime speaks
  const touring = () => !!(window.HTTour && HTTour.isRunning());
  if (window.HTTour && !HTTour.isDone() && !Q.get("state")) { try { sessionStorage.setItem("ht-played", "1"); } catch {} setTimeout(() => HTTour.start(), 500); }
  else if (!Q.get("state") && !played) {
    try { sessionStorage.setItem("ht-played", "1"); } catch {}
    let touched = false; addEventListener("pointerdown", () => { touched = true; }, { once: true });
    setTimeout(() => { if (!touched && !touring() && tab === "now") toast("Fast-forward: 2 h 40 min into Organic chemistry"); }, 1300);
    setTimeout(() => { if (!touched && !touring() && !paused && tab === "now" && !island.classList.contains("open")) go("walk"); }, 2900);
  }
})();
</script>
"""
# ---------- heart data, calendar and a richer home (Heramb, 2026-11-06)
rep('<script src="/assets/track.js"></script>\n', '<script src="/assets/track.js"></script>\n<script src="/assets/demo-data.js"></script>\n<script src="/assets/tour.js"></script>\n')
# the home screen: body today and today's calendar, under the next-stop card
rep('<div class="next" data-attn="now-next">', '<div class="next" data-attn="now-next" id="home-next">')
rep('  <nav class="foot"><button data-act="talk">Talk to someone</button>',
    '  <section class="hcard" id="home-body" data-attn="home-body"></section>\n  <section class="hcard" id="home-cal" data-attn="home-cal"></section>\n  <nav class="foot"><button data-act="talk">Talk to someone</button>')
rep(".paused .slot,.paused .t-slot{opacity:.25}", r""".paused .slot,.paused .t-slot{opacity:.25}
.hcard{background:#fff;border-radius:18px;padding:14px 16px;margin-top:10px}
.hcard h2{display:flex;align-items:center;gap:8px;font:600 .9375rem/1.2 var(--ui)}
.hcard h2 .src2{margin-left:auto;font:500 .75rem/1 var(--mono);color:var(--muted)}
.vit{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}
.vit div{background:var(--paper);border-radius:12px;padding:10px 12px;min-width:0}
.vit .l{display:block;font:500 .75rem/1.2 var(--ui);color:var(--ink2)}
.vit b{display:block;font:650 1.375rem/1.15 var(--ui);letter-spacing:-.02em;margin-top:2px}
.vit b small{font:500 .8125rem/1 var(--ui);color:var(--ink2);margin-left:2px}
.vit .u{display:block;font:500 .75rem/1.3 var(--mono);color:var(--muted);margin-top:2px}
.hcard .fine2{font-size:.8125rem;color:var(--muted);margin-top:8px}
.ag{list-style:none;margin-top:8px}
.ag li{display:grid;grid-template-columns:64px 1fr;gap:8px;padding:8px 0;border-top:1px solid var(--line)}
.ag li:first-child{border-top:0}
.ag .at{font:500 .75rem/1.4 var(--mono);color:var(--muted)}
.ag b{display:block;font-weight:600;font-size:.875rem}
.ag span.w{font-size:.75rem;color:var(--muted)}
.ag li.ev-done b{color:var(--muted);font-weight:500}
.ag li.ev-now{background:rgba(142,214,188,.25);border-radius:10px;padding:8px 6px;margin:0 -6px}
.ag .tg{font:600 .75rem/1 var(--mono);color:var(--refill-ink);margin-left:4px}
.speaking .hcard{opacity:.12;filter:blur(3px);transition:opacity .35s ease,filter .35s ease}
.morning .hcard{visibility:hidden}
.spark{display:block;width:100%;height:auto;margin-top:8px;overflow:visible}""")
# data sources: heart data is part of the wearable read now, on by default
rep('<b>Overnight HRV</b><small>Off · not used in suggestions yet</small></span>${sw(false, "Overnight HRV")}</span><span class="cd2">How much the time between heartbeats varies while you sleep. It often dips after short or stressful nights.</span>',
    '<b>Heart rate, resting heart rate, HRV</b><small>On · shown as context, not used in suggestions yet</small></span>${sw(true, "Heart data")}</span><span class="cd2">Heart rate through the day, your resting rate, and overnight HRV (how much the time between heartbeats varies). Each is compared with your own usual. Never a diagnosis.</span>')
rep('card(D.glyph, `Sleep · ${D.name}`,', 'card(D.glyph, `Sleep and heart · ${D.name}`,')
rep("`How long and when you slept, read only. Never the device's own scores. ${hrv}`", "`Sleep, heart rate, resting heart rate and overnight HRV, read only. Never the device's own scores. ${hrv}`")
# "See why": heart data shows as context, honestly marked as not used in this suggestion
rep('  const D = dev(), calN = mode === "none" ? 3 : 4;',
    '  const D = dev(), calN = mode === "none" ? 3 : 4;\n  const heartRow = D && mode === "ok" ? `<div class="row"><span class="k">Heart, last night</span><span class="val">61 bpm · 38 ms</span><span class="m">resting heart rate and HRV (${D.short}) · usual 55 bpm and 49 ms · context only, not used in this suggestion</span></div>` : "";')
rep('    ${mode === "none" ? "" : sleepRow}\n', '    ${mode === "none" ? "" : sleepRow}${heartRow}\n')

# data sources: the calendar card follows setup (on with a provider, or off)
rep('card("calendar", "Calendar", "on", TEAM ? "Your next class, plus away games from the last 14 days so travel nights can be left out." : "Your next class only. On a team? Add games, and nights away can be left out of your sleep.", sw(true, "Calendar"),',
    'card("calendar", "Calendar", PROFILE.cal === false ? "off · you type your next stop" : `on · ${({ google: "Google Calendar", apple: "Apple Calendar", outlook: "Outlook" })[PROFILE.calProvider] || "Google Calendar"}`, PROFILE.cal === false ? "Turn it on in Change setup to see your whole day and let breaks fit around it." : TEAM ? "Event times and titles for today and this week, plus away games so travel nights can be left out of your sleep." : "Event times and titles for today and this week. On a team? Add games, and nights away can be left out of your sleep.", sw(PROFILE.cal !== false, "Calendar"),')

rep("</body>", APP + "</body>")
OUT.write_text(s)
print(f"wrote {OUT.relative_to(ROOT)} ({len(s) // 1024} KB)")
