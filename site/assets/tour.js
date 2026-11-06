/* Halftime first-run tour (site/assets/tour.js). Self-contained: injects its own <style> and DOM on start().
 *
 *   HTTour.start(fromStep = 0)  run the tour; fromStep is an index into the 9 steps or a step id ("card").
 *                               Returns a Promise that resolves "done" | "skip" | "empty".
 *   HTTour.isDone()             localStorage ht-tour-done === "1" (set on finish or Skip)
 *   HTTour.isRunning()          true while the tour is on screen
 *   HTTour.reset()              forget ht-tour-done
 *
 * Motion (prompt-motion + emil-design-eng): ONE shape, a rounded "window" cut out of a dim scrim, carries the eye
 * through every step. It starts as the whole screen, closes onto the first element, then glides and morphs from
 * element to element and opens back to the whole screen at the end: it never fades out and in. Position, size and
 * corner radius are critically damped springs (closed-form step, velocity kept when the target moves mid-flight),
 * read-then-write once per animation frame, and the loop stops as soon as everything has settled. Two one-shot
 * demonstrations inside the window: a mint dot runs the session line up to "now" (step 2), and the source chips are
 * outlined one after another (step 6). Step 1 has no target: the window closes onto the caption itself, which holds the
 * tagline and a small "your wearable vs study apps vs Halftime" table; Halftime's column fills in row by row. No loops, no glows, no bounce. prefers-reduced-motion: everything snaps, the
 * scrim fades, no demonstrations.
 */
(() => {
  "use strict";
  if (window.HTTour) return;

  const KEY = "ht-tour-done";
  const OMEGA = 14; // spring stiffness (rad/s), critically damped: ~0.35 s to look settled, ~0.47 s to 1 %
  const EASE = "cubic-bezier(.23,1,.32,1)";
  const reduceMQ = matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => reduceMQ.matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch { return null; } },
    set() { try { localStorage.setItem(KEY, "1"); } catch {} },
    del() { try { localStorage.removeItem(KEY); } catch {} },
  };
  const track = (type, data) => { try { if (window.HT && typeof HT.event === "function") HT.event(type, data); } catch {} };
  const callGo = (s) => { try { if (typeof window.go === "function") window.go(s); } catch {} };
  const islandEl = () => document.getElementById("island");
  const islandOpen = () => { const i = islandEl(); return !!(i && i.classList.contains("open")); };
  const visible = (el) => { if (!el || !el.isConnected || !el.getClientRects().length) return false; const cs = getComputedStyle(el); return cs.visibility !== "hidden" && cs.display !== "none"; };
  const canIsland = () => typeof window.go === "function" && !!islandEl() && !!document.getElementById("full");

  // ---------------------------------------------------------------- the comparison card (step 1)
  // device names come from a fixed map, never inserted raw from storage
  const DEVICE_NAMES = { fitbit: "Fitbit", oura: "Oura Ring", whoop: "WHOOP", apple: "Apple Watch", garmin: "Garmin" };
  const wearable = () => { try { const p = JSON.parse(localStorage.getItem("ht-profile") || "{}"); return p.sleep === false ? "" : DEVICE_NAMES[p.device] || ""; } catch { return ""; } };
  const CMP_ROWS = [["Sleep and heart", 1, 0], ["Study time", 0, 1], ["Your day and when to break", 0, 0]];
  function cmpHTML() {
    const w = wearable() || "Wearables";
    const mark = (y) => (y ? '<span aria-hidden="true">✓</span><span class="ht-sr">yes</span>' : '<span aria-hidden="true">–</span><span class="ht-sr">no</span>');
    const rows = CMP_ROWS.map(([l, a, b]) => `<tr><th scope="row">${l}</th><td class="${a ? "y" : "n"}">${mark(a)}</td><td class="${b ? "y" : "n"}">${mark(b)}</td><td class="ht-us y">${mark(1)}</td></tr>`).join("");
    return `<table><caption class="ht-sr">${w}, study apps and Halftime compared</caption><thead><tr><td></td><th scope="col">${w}</th><th scope="col">Study apps</th><th scope="col" class="ht-us">Halftime</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
  const cmpBody = () => { const w = wearable(); return w ? `Your ${w} knows your body. Your study apps know your hours. Halftime connects them to your day.` : "Watches and rings know your body. Study apps know your hours. Halftime connects them to your day, and works from your laptop even with no watch."; };

  // ---------------------------------------------------------------- steps
  const STEPS = [
    { id: "compare", center: true, count: "Welcome", title: "Every long study session needs a halftime.", body: cmpBody, table: true, fx: "cmp", els: () => [] },
    { id: "pill", title: "Quiet at the top", body: "This is Halftime. It sits quietly at the top while you study and shows your session time.",
      els: () => [$("#compact")], radius: (r) => r.h / 2, pad: 7 },
    { id: "forecast", title: "Your session line", body: "Your session as a line, from when you started to your next stop. The red mark is now.",
      els: () => [$(".forecast")], fx: "dot", pad: 10 },
    { id: "body", title: "Your body today", body: "From your watch or ring: sleep, resting heart rate and HRV, always compared with your own usual.",
      els: () => [$("#home-body")] },
    { id: "calendar", title: "Your day", body: "Your calendar, so a break only gets suggested when it fits before your next thing.",
      els: () => [$("#home-cal")] },
    { id: "card", island: true, title: "It speaks once", body: "When a break fits, Halftime speaks once. Here: a 5-minute walk.",
      els: () => [islandEl()], pad: 6, top: true },
    { id: "sources", island: true, title: "Every reason has a source", body: "Every reason shows where it came from: 1 laptop, 2 laptop, 3 watch, 4 calendar. Tap one for details.",
      els: () => { const c = $$("#full .chip"); return [...new Set(c.map((x) => x.closest("p") || x))]; }, fx: "chips", radius: () => 16, pad: 8 },
    { id: "decide", island: true, title: "You decide", body: "You decide. Walk, keep going or snooze. It asks once, then stays quiet.",
      els: () => { const a = $("#full .acts"), l = $("#full .links"); return l ? [a, l] : [a]; }, radius: () => 30, pad: 8 },
    { id: "tabs", title: "Everything else", body: "History shows your week. You holds your data sources and settings. Demo jumps to any moment, like a late night or a missed sync.",
      els: () => [$(".tabbar .in") || $(".tabbar")], pad: 4, radius: () => 18 },
  ];
  const available = (st) => {
    if (st.center) return true;
    if (st.island) return canIsland();
    const els = st.els().filter(Boolean);
    return els.length > 0 && els.every((el) => visible(el) && el.getBoundingClientRect().height > 30);
  };

  // ---------------------------------------------------------------- springs (closed-form critically damped step)
  const spring = (p = 0) => ({ p, v: 0, t: p });
  function stepSpring(s, dt) {
    const x = s.p - s.t, b = s.v + OMEGA * x, e = Math.exp(-OMEGA * dt);
    s.p = s.t + (x + b * dt) * e;
    s.v = (s.v - OMEGA * b * dt) * e;
  }
  const snap = (s) => { s.p = s.t; s.v = 0; };
  const still = (s) => Math.abs(s.p - s.t) < 0.25 && Math.abs(s.v) < 4;

  // ---------------------------------------------------------------- style
  const CSS = `
#ht-tour{position:fixed;inset:0;z-index:2147483000;pointer-events:none;font-family:"Geist",system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
#ht-tour .ht-block{position:absolute;inset:0;pointer-events:auto;touch-action:none;background:transparent;-webkit-tap-highlight-color:transparent}
#ht-tour .ht-spot{position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;contain:layout size style;
  box-shadow:0 0 0 2px rgba(142,214,188,.9),0 0 0 200vmax rgba(10,10,10,.62)}
#ht-tour.ht-fade{opacity:0;transition:opacity .2s ease-out}
#ht-tour.ht-fade.ht-in{opacity:1}
#ht-tour .ht-fx{position:absolute;inset:0;pointer-events:none;overflow:hidden}
#ht-tour .ht-dot{position:absolute;left:0;top:0;width:12px;height:12px;border-radius:50%;background:#8ED6BC;border:2px solid #F4F3EF;opacity:0}
#ht-tour .ht-ring{position:absolute;border:2px solid #8ED6BC;border-radius:9px;opacity:0}
#ht-tour .ht-cap{position:absolute;left:0;top:0;width:min(340px,calc(100vw - 24px));pointer-events:auto}
#ht-tour .ht-card{background:#F4F3EF;color:#141414;border-radius:20px;padding:6px 16px 14px;box-shadow:0 12px 32px rgba(0,0,0,.28);
  opacity:0;transform:translateY(6px);transition:opacity .2s ease-out,transform .24s ${EASE}}
#ht-tour.ht-show .ht-card{opacity:1;transform:none}
#ht-tour.ht-out .ht-card{opacity:0;transition:opacity .15s ease-out}
#ht-tour .ht-head{display:flex;align-items:center;justify-content:space-between;margin-right:-10px}
#ht-tour .ht-count{font:500 .75rem/1 "Geist Mono",ui-monospace,Menlo,monospace;color:#0F5E46;margin:0}
#ht-tour .ht-title{font:600 1.0625rem/1.25 "Geist",system-ui,sans-serif;letter-spacing:-.01em;color:#141414;margin:0}
#ht-tour .ht-body{font:400 .9375rem/1.45 "Geist",system-ui,sans-serif;color:#46453F;margin:4px 0 0}
#ht-tour .ht-center .ht-title{font-size:1.375rem;line-height:1.2;letter-spacing:-.02em;text-wrap:balance;margin-top:4px}
#ht-tour .ht-cmp{margin:12px 0 2px}
#ht-tour .ht-cmp[hidden]{display:none}
#ht-tour .ht-cmp table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;font:400 .75rem/1.25 "Geist",system-ui,sans-serif}
#ht-tour .ht-cmp th,#ht-tour .ht-cmp td{padding:7px 4px;text-align:center;vertical-align:middle;border-top:1px solid #DDDAD2}
#ht-tour .ht-cmp thead th,#ht-tour .ht-cmp thead td{border-top:0;font-weight:600;color:#46453F;padding-top:8px}
#ht-tour .ht-cmp tbody th{text-align:left;font-weight:500;color:#141414;padding-left:0;width:34%}
#ht-tour .ht-cmp td.y{color:#0F5E46;font-weight:600;font-size:.9375rem}
#ht-tour .ht-cmp td.n{color:#6E6B64;font-size:.9375rem}
#ht-tour .ht-cmp .ht-us{background:#141414;color:#F4F3EF;border-top-color:#2E2E2B}
#ht-tour .ht-cmp td.ht-us{color:#8ED6BC}
#ht-tour .ht-cmp thead .ht-us{border-radius:12px 12px 0 0;color:#F4F3EF}
#ht-tour .ht-cmp tbody tr:last-child .ht-us{border-radius:0 0 12px 12px}
#ht-tour .ht-btns{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:12px}
#ht-tour button{font:inherit;color:inherit;background:none;border:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}
#ht-tour .ht-skip{min-height:44px;min-width:44px;padding:0 10px;font:500 .8125rem/1 "Geist",system-ui,sans-serif;color:#64625C}
#ht-tour .ht-back{min-height:44px;min-width:64px;padding:0 14px;margin-left:-14px;font:500 .9375rem/1 "Geist",system-ui,sans-serif;color:#141414;border-radius:22px}
#ht-tour .ht-back[aria-hidden="true"]{visibility:hidden}
#ht-tour .ht-next{min-height:44px;min-width:96px;padding:0 20px;border-radius:22px;background:#141414;color:#F4F3EF;font:600 .9375rem/1 "Geist",system-ui,sans-serif;transition:transform .12s ${EASE}}
#ht-tour .ht-next:active{transform:scale(.97)}
#ht-tour button:focus{outline:none}
#ht-tour.ht-kb button:focus-visible{outline:3px solid #0F5E46;outline-offset:2px;border-radius:22px}
#ht-tour .ht-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}
@media (prefers-reduced-motion:reduce){#ht-tour .ht-card{transform:none;transition:opacity .2s ease-out}#ht-tour .ht-next{transition:none}}
`;

  // ---------------------------------------------------------------- state
  let running = false, ending = false, root, styleEl, spot, cap, card, fx, live, elCount, elTitle, elBody, elCmp, btnBack, btnNext, btnSkip;
  let list = [], idx = 0, raf = 0, last = 0, stable = 0, prevRect = null, side = null, capW = 0, capH = 0, capPlaced = false;
  let clips = [], stepT = 0, minSettle = 0, fxDone = false, fxAnims = [], inertSaved = [], ro = null, resolveRun = null, endKind = "";
  const S = { x: spring(), y: spring(), w: spring(), h: spring(), r: spring(), cx: spring(), cy: spring() };
  let safe = { t: 0, r: 0, b: 0, l: 0 };

  function readSafe() {
    const p = document.createElement("div");
    p.style.cssText = "position:fixed;left:0;top:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";
    document.body.appendChild(p);
    const cs = getComputedStyle(p);
    safe = { t: parseFloat(cs.paddingTop) || 0, r: parseFloat(cs.paddingRight) || 0, b: parseFloat(cs.paddingBottom) || 0, l: parseFloat(cs.paddingLeft) || 0 };
    p.remove();
  }

  function build() {
    styleEl = document.createElement("style"); styleEl.id = "ht-tour-style"; styleEl.textContent = CSS; document.head.appendChild(styleEl);
    root = document.createElement("div"); root.id = "ht-tour";
    root.innerHTML = `<div class="ht-block" aria-hidden="true"></div><div class="ht-spot" aria-hidden="true"></div><div class="ht-fx" aria-hidden="true"></div>
<div class="ht-cap" role="dialog" aria-modal="true" aria-labelledby="ht-title" aria-describedby="ht-body"><div class="ht-card">
  <div class="ht-head"><p class="ht-count"></p><button type="button" class="ht-skip">Skip tour</button></div>
  <h2 class="ht-title" id="ht-title"></h2><p class="ht-body" id="ht-body"></p><div class="ht-cmp" hidden></div>
  <div class="ht-btns"><button type="button" class="ht-back">Back</button><button type="button" class="ht-next">Next</button></div>
</div><p class="ht-sr" aria-live="polite" aria-atomic="true"></p></div>`;
    spot = $(".ht-spot", root); cap = $(".ht-cap", root); card = $(".ht-card", root); fx = $(".ht-fx", root); live = $(".ht-sr", root);
    elCount = $(".ht-count", root); elTitle = $(".ht-title", root); elBody = $(".ht-body", root); elCmp = $(".ht-cmp", root);
    btnBack = $(".ht-back", root); btnNext = $(".ht-next", root); btnSkip = $(".ht-skip", root);
    btnNext.addEventListener("click", next); btnBack.addEventListener("click", back); btnSkip.addEventListener("click", () => end("skip"));
    const block = $(".ht-block", root);
    const stop = (e) => { e.preventDefault(); e.stopPropagation(); };
    block.addEventListener("click", stop); // a tap on the scrim does nothing (no accidental skip)
    block.addEventListener("mousedown", (e) => e.preventDefault()); // ...and keeps focus on the caption
    block.addEventListener("wheel", stop, { passive: false });
    block.addEventListener("touchmove", stop, { passive: false });
    cap.addEventListener("wheel", stop, { passive: false });
    cap.addEventListener("touchmove", stop, { passive: false });
    document.body.appendChild(root);
  }

  // ---------------------------------------------------------------- measuring
  function clipAncestors(el) {
    const out = [];
    for (let a = el && el.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== "visible" || cs.overflowY !== "visible") out.push(a);
    }
    return out;
  }
  function measureTarget(st) {
    const els = st.els().filter(Boolean);
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    for (const el of els) { const q = el.getBoundingClientRect(); if (!q.width && !q.height) continue; l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom); }
    if (l === Infinity) return null;
    for (const c of clips) { const q = c.getBoundingClientRect(); l = Math.max(l, q.left); t = Math.max(t, q.top); r = Math.min(r, q.right); b = Math.min(b, q.bottom); }
    const rect = { x: l, y: t, w: Math.max(0, r - l), h: Math.max(0, b - t) };
    let rad;
    if (st.radius) rad = st.radius(rect);
    else { const br = parseFloat(getComputedStyle(els[0]).borderTopLeftRadius) || 0; rad = br || 14; }
    return { ...rect, rad };
  }

  // where the window and the caption go, from the target's rect (pure, no DOM)
  function layout(m, st) {
    const vw = innerWidth, vh = innerHeight, pad = st.pad ?? 8, G = 12;
    const top = safe.t + 10, bot = vh - safe.b - 10;
    let x = Math.max(4, m.x - pad), y = Math.max(4, m.y - pad);
    let x2 = Math.min(vw - 4, m.x + m.w + pad), y2 = Math.min(vh - 4, m.y + m.h + pad);
    let r = m.rad + (st.radius ? 0 : pad);
    const roomBelow = bot - y2 - G, roomAbove = y - G - top;
    const fitsB = capH <= roomBelow, fitsA = capH <= roomAbove;
    if (side === "below" && !fitsB && fitsA) side = "above";
    else if (side === "above" && !fitsA && fitsB) side = "below";
    else if (!side || (!fitsA && !fitsB)) side = fitsB ? "below" : fitsA ? "above" : (st.top || roomBelow >= roomAbove ? "below" : "above");
    // a target taller than the room left: keep the part next to the caption's edge in the window
    if (side === "below" && !fitsB) y2 = Math.max(y + 48, bot - G - capH);
    if (side === "above" && !fitsA) y = Math.min(y2 - 48, top + capH + G);
    const w = Math.max(0, x2 - x), h = Math.max(0, y2 - y);
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    let cy = side === "below" ? y + h + G : y - G - capH;
    cy = Math.max(top, Math.min(bot - capH, cy));
    let cx = x + w / 2 - capW / 2;
    cx = Math.max(12 + safe.l, Math.min(vw - 12 - safe.r - capW, cx));
    return { x, y, w, h, r, cx, cy };
  }

  // ---------------------------------------------------------------- frame loop: read, then write
  function kick() { stable = 0; if (!raf && running) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(now) {
    raf = 0;
    const dt = Math.min(0.064, Math.max(0, (now - last) / 1000)); last = now;
    // READ
    let L;
    if (ending) {
      const vw = innerWidth, vh = innerHeight;
      L = { x: -48, y: -48, w: vw + 96, h: vh + 96, r: 0, cx: S.cx.t, cy: S.cy.t };
    } else {
      const st = list[idx], m = st.center ? null : measureTarget(st);
      if (st.center) {
        // no target: the window becomes the caption card itself, in the middle of the screen
        const vw = innerWidth, vh = innerHeight, top = safe.t + 10, bot = vh - safe.b - 10;
        const cx = Math.max(12 + safe.l, (vw - capW) / 2), cy = Math.max(top, Math.min(bot - capH, (vh - capH) / 2));
        stable++; L = { x: cx, y: cy, w: capW, h: capH, r: 20, cx, cy };
      } else if (m) {
        if (prevRect && Math.abs(m.x - prevRect.x) < 0.5 && Math.abs(m.y - prevRect.y) < 0.5 && Math.abs(m.w - prevRect.w) < 0.5 && Math.abs(m.h - prevRect.h) < 0.5) stable++; else stable = 0;
        prevRect = m;
        L = layout(m, st);
      } else { stable++; L = { x: S.x.t, y: S.y.t, w: S.w.t, h: S.h.t, r: S.r.t, cx: S.cx.t, cy: S.cy.t }; }
    }
    // SIMULATE
    S.x.t = L.x; S.y.t = L.y; S.w.t = L.w; S.h.t = L.h; S.r.t = L.r; S.cx.t = L.cx; S.cy.t = L.cy;
    if (!capPlaced) { snap(S.cx); snap(S.cy); capPlaced = true; }
    const all = Object.values(S);
    if (reduced()) all.forEach(snap); else all.forEach((s) => stepSpring(s, dt));
    // WRITE (transforms on our own fixed layer; size on a layout-contained box)
    const w = Math.max(0, S.w.p), h = Math.max(0, S.h.p);
    spot.style.transform = `translate3d(${S.x.p.toFixed(2)}px,${S.y.p.toFixed(2)}px,0)`;
    spot.style.width = w.toFixed(2) + "px"; spot.style.height = h.toFixed(2) + "px";
    spot.style.borderRadius = Math.max(0, Math.min(S.r.p, w / 2, h / 2)).toFixed(2) + "px";
    cap.style.transform = `translate3d(${S.cx.p.toFixed(2)}px,${S.cy.p.toFixed(2)}px,0)`;
    const settled = all.every(still);
    if (ending) { if (settled || reduced()) return finish(); raf = requestAnimationFrame(frame); return; }
    if (settled && stable >= 8 && now >= minSettle) { all.forEach(snap); onSettle(); return; }
    raf = requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- one-shot demonstrations
  function clearFx() { fxAnims.forEach((a) => { try { a.cancel(); } catch {} }); fxAnims = []; if (fx) fx.textContent = ""; }
  function onSettle() {
    const st = list[idx];
    if (fxDone || !st || !st.fx || reduced()) return;
    fxDone = true;
    if (st.fx === "dot") {
      const tr = $(".forecast .track"), nm = document.getElementById("nowmark");
      if (!tr || !nm) return;
      const a = tr.getBoundingClientRect(), n = nm.getBoundingClientRect();
      const y = a.top + a.height / 2 - 6, x0 = a.left + 3, x1 = n.left + n.width / 2 - 6;
      if (x1 - x0 < 8) return;
      const d = document.createElement("div"); d.className = "ht-dot"; fx.appendChild(d);
      fxAnims.push(d.animate([{ transform: `translate3d(${x0}px,${y}px,0)` }, { transform: `translate3d(${x1}px,${y}px,0)` }], { duration: 900, delay: 120, easing: "cubic-bezier(.45,0,.2,1)", fill: "both" }));
      fxAnims.push(d.animate([{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], { duration: 1260, delay: 120, easing: "linear", fill: "both" }));
      fxAnims[fxAnims.length - 1].onfinish = () => d.remove();
    }
    if (st.fx === "cmp") {
      $$(".ht-cmp .ht-us", root).forEach((c, i) => fxAnims.push(c.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }],
        { duration: 260, delay: 80 + i * 90, easing: EASE, fill: "backwards" })));
    }
    if (st.fx === "chips") {
      const chips = $$("#full .chip").sort((p, q) => (parseInt(p.textContent, 10) || 0) - (parseInt(q.textContent, 10) || 0));
      const rects = chips.map((c) => c.getBoundingClientRect()); // read all, then write
      rects.forEach((q, i) => {
        if (!q.width) return;
        const ring = document.createElement("div"); ring.className = "ht-ring";
        ring.style.cssText = `left:${q.left - 3}px;top:${q.top - 3}px;width:${q.width + 6}px;height:${q.height + 6}px`;
        fx.appendChild(ring);
        const an = ring.animate([{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "scale(1)", offset: 0.33 }, { opacity: 1, transform: "scale(1)", offset: 0.6 }, { opacity: 0, transform: "scale(1)" }],
          { duration: 360, delay: 150 + i * 150, easing: EASE, fill: "both" });
        an.onfinish = () => ring.remove();
        fxAnims.push(an);
      });
    }
  }

  // ---------------------------------------------------------------- steps
  function setText(st) {
    const n = list.length, i = idx;
    const body = typeof st.body === "function" ? st.body() : st.body;
    elCount.textContent = st.count || `${i + 1} of ${n}`;
    elTitle.textContent = st.title; elBody.textContent = body;
    if (st.table) { elCmp.innerHTML = cmpHTML(); elCmp.hidden = false; } else { elCmp.hidden = true; elCmp.textContent = ""; }
    card.classList.toggle("ht-center", !!st.center);
    btnNext.textContent = i === n - 1 ? "Start studying" : "Next";
    btnBack.setAttribute("aria-hidden", i === 0 ? "true" : "false"); btnBack.tabIndex = i === 0 ? -1 : 0;
    live.textContent = `Step ${i + 1} of ${n}. ${st.title}. ${body}`;
  }
  function measureCap() { capW = cap.offsetWidth; capH = cap.offsetHeight; }

  // bring the target on screen with room for the caption (page scroll, or the open card's own scroll)
  function ensureVisible(st) {
    if (st.center) return;
    const behavior = reduced() ? "auto" : "smooth";
    const els = st.els().filter(Boolean); if (!els.length) return;
    const full = document.getElementById("full");
    if (st.island) {
      if (!full) return;
      if (st.id === "card") { if (full.scrollTop > 0) full.scrollTo({ top: 0, behavior }); return; }
      const f = full.getBoundingClientRect();
      let t = Infinity, b = -Infinity;
      els.forEach((el) => { const q = el.getBoundingClientRect(); t = Math.min(t, q.top); b = Math.max(b, q.bottom); });
      const relT = t - f.top + full.scrollTop, relB = b - f.top + full.scrollTop, vis = full.clientHeight;
      let to = full.scrollTop;
      if (relB > full.scrollTop + vis - 60) to = relB - vis + 64;
      if (relT < to + 8) to = Math.max(0, relT - 8);
      if (Math.abs(to - full.scrollTop) > 1) full.scrollTo({ top: to, behavior });
      return;
    }
    const isl = islandEl(), tb = $(".tabbar");
    const topLim = (isl && getComputedStyle(isl).position === "fixed" && !els.includes(isl) && !els.some((e) => isl.contains(e)) ? isl.getBoundingClientRect().bottom : 0) + 8;
    const fixedEl = els.some((e) => { for (let a = e; a; a = a.parentElement) if (getComputedStyle(a).position === "fixed") return true; return false; });
    if (fixedEl) return;
    const botLim = (tb && visible(tb) ? tb.getBoundingClientRect().top : innerHeight) - 8;
    let t = Infinity, b = -Infinity;
    els.forEach((el) => { const q = el.getBoundingClientRect(); t = Math.min(t, q.top); b = Math.max(b, q.bottom); });
    const pad = (st.pad ?? 8) + 12, need = capH + pad;
    const vh = innerHeight, roomB = vh - safe.b - 10 - b, roomA = t - safe.t - 10;
    if (t >= topLim && b <= botLim && (roomB >= need || roomA >= need)) return;
    const h = b - t;
    let desiredTop;
    if (topLim + 8 + h + need <= vh - safe.b - 10) desiredTop = topLim + 8; // caption below
    else if (botLim - h - 8 - need >= safe.t + 10) desiredTop = botLim - 8 - h; // caption above
    else desiredTop = Math.max(topLim, (vh - h) / 2);
    const max = document.documentElement.scrollHeight - innerHeight;
    const to = Math.max(0, Math.min(max, scrollY + (t - desiredTop)));
    if (Math.abs(to - scrollY) > 1) window.scrollTo({ top: to, behavior });
  }

  function show(i) {
    idx = i; const st = list[i];
    clearFx(); fxDone = false; prevRect = null;
    const wasOpen = islandOpen();
    if (st.island && !wasOpen) callGo("walk");
    if (!st.island && wasOpen) callGo("idle");
    stepT = performance.now();
    minSettle = stepT + (st.island && !wasOpen ? 650 : st.island ? 250 : 0);
    setText(st);
    measureCap();
    const els = st.els().filter(Boolean);
    clips = els.length ? clipAncestors(els[0]) : [];
    if (ro) { ro.disconnect(); ro.observe(card); els.forEach((el) => ro.observe(el)); }
    ensureVisible(st);
    if (!reduced() && root.classList.contains("ht-show")) {
      const inner = [elCount, elTitle, elBody];
      inner.forEach((el) => el.animate([{ opacity: 0, transform: "translateY(3px)" }, { opacity: 1, transform: "none" }], { duration: 180, easing: EASE }));
    }
    try { btnNext.focus({ preventScroll: true }); } catch { btnNext.focus(); }
    track("tour_step", { value: st.id });
    kick();
  }
  function next() { if (!running || ending) return; if (idx >= list.length - 1) return end("done"); show(idx + 1); }
  function back() { if (!running || ending || idx === 0) return; show(idx - 1); }

  // ---------------------------------------------------------------- keys, resize, scroll
  function onPointer() { if (root) root.classList.remove("ht-kb"); }
  function onKey(e) {
    if (!running || ending) return;
    const k = e.key;
    if (root && k !== "Shift") root.classList.add("ht-kb"); // focus ring only for people using the keyboard
    if (k === "Escape") { e.preventDefault(); e.stopPropagation(); end("skip"); return; }
    if (k === "ArrowRight") { e.preventDefault(); e.stopPropagation(); next(); return; }
    if (k === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); back(); return; }
    if (k === "Tab") { // keep focus inside the caption
      const f = [btnSkip, btnBack, btnNext].filter((b) => b.tabIndex !== -1);
      const at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      return;
    }
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(k)) e.preventDefault();
  }
  function onResize() { if (!running) return; readSafe(); if (!ending) measureCap(); kick(); }
  function onScroll() { if (running) kick(); }

  function setInert(on) {
    if (on) {
      inertSaved = [];
      for (const el of Array.from(document.body.children)) {
        if (el === root || el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;
        inertSaved.push([el, el.inert]); el.inert = true;
      }
    } else { inertSaved.forEach(([el, was]) => { el.inert = was; }); inertSaved = []; }
  }

  // ---------------------------------------------------------------- start / end
  function prepare() {
    const sheet = document.getElementById("dsheet");
    if (sheet && sheet.classList.contains("on")) { const c = document.getElementById("dclose"); if (c) c.click(); }
    const isl = islandEl(), page = document.getElementById("page");
    if (typeof window.go === "function" && ((isl && (isl.classList.contains("open") || isl.classList.contains("live"))) || (page && page.hidden))) callGo("idle");
  }
  function resolveFrom(from) {
    if (typeof from === "string") { const k = STEPS.findIndex((s) => s.id === from); return k < 0 ? 0 : k; }
    const n = Math.floor(+from || 0); return Math.max(0, Math.min(STEPS.length - 1, n));
  }

  function start(fromStep = 0) {
    if (running) { const k = list.findIndex((s) => STEPS.indexOf(s) >= resolveFrom(fromStep)); if (!ending && k >= 0) show(k); return Promise.resolve("running"); }
    prepare();
    const from = resolveFrom(fromStep);
    list = STEPS.filter(available);
    const first = list.findIndex((s) => STEPS.indexOf(s) >= from);
    if (!list.length || first < 0) return Promise.resolve("empty");
    running = true; ending = false; endKind = ""; side = null; capPlaced = false;
    readSafe(); build();
    // the window starts as the whole screen and closes onto the first element
    const vw = innerWidth, vh = innerHeight;
    Object.assign(S.x, spring(-48)); Object.assign(S.y, spring(-48)); Object.assign(S.w, spring(vw + 96)); Object.assign(S.h, spring(vh + 96)); Object.assign(S.r, spring(0));
    if (reduced()) root.classList.add("ht-fade");
    try { ro = new ResizeObserver(() => { if (running && !ending) { measureCap(); kick(); } }); } catch { ro = null; }
    setInert(true);
    addEventListener("keydown", onKey, true);
    addEventListener("pointerdown", onPointer, true);
    addEventListener("resize", onResize);
    addEventListener("scroll", onScroll, { capture: true, passive: true });
    show(first);
    requestAnimationFrame(() => requestAnimationFrame(() => { if (root) root.classList.add("ht-show", "ht-in"); }));
    return new Promise((r) => { resolveRun = r; });
  }

  function end(kind) {
    if (!running || ending) return;
    ending = true; endKind = kind;
    store.set();
    track(kind === "done" ? "tour_done" : "tour_skip");
    clearFx();
    root.querySelectorAll(".ht-block, .ht-cap").forEach((el) => { el.style.pointerEvents = "none"; }); // the page is usable again at once
    root.classList.add("ht-out"); root.classList.remove("ht-in");
    if (ro) { ro.disconnect(); ro = null; }
    removeEventListener("keydown", onKey, true);
    removeEventListener("pointerdown", onPointer, true);
    removeEventListener("resize", onResize);
    removeEventListener("scroll", onScroll, { capture: true });
    setInert(false);
    if (islandOpen() || (islandEl() && islandEl().classList.contains("live"))) callGo("idle");
    if (scrollY > 0) window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
    if (reduced()) { setTimeout(finish, 220); return; }
    kick();
  }

  function finish() {
    if (!root) return;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    clearFx();
    root.remove(); styleEl && styleEl.remove();
    root = styleEl = spot = cap = card = fx = live = null;
    running = false; ending = false; list = []; clips = [];
    const r = resolveRun; resolveRun = null;
    try { const t = document.querySelector("#compact"); if (t && endKind === "done") t.focus({ preventScroll: true }); } catch {}
    if (r) r(endKind);
  }

  window.HTTour = {
    start,
    isDone: () => store.get() === "1",
    isRunning: () => running,
    reset: () => store.del(),
  };
})();
