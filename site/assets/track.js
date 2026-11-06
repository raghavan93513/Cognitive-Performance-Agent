/* Halftime prototype analytics. Records how people use the prototype by default (Heramb, 2026-11-06: no pop-up):
   screens, time on each, taps, scrolls, what was on screen and for how long, pointer and touch movement, idle and
   tab switches, device, speed and errors. The server adds the IP address and approximate location. The footer says
   so, and the You tab has an off switch: nothing is sent once someone opts out.
   Events are batched and sent in the background, so the app never waits on analytics: one small request about every
   15 s per visitor (50 people at once ≈ 3 requests a second), retried with backoff if the sheet is busy, and handed
   to sendBeacon when the page goes away.
   Every visitor gets an id (this browser) and every tab a session id, so many people at once stay separate. */
(() => {
  "use strict";
  // ?preview=1 is the admin dashboard showing a screen under its tap heat map: record nothing
  if (/[?&]preview=1(&|$)/.test(location.search)) {
    const no = () => {};
    window.HT = { screen: no, event: no, identify: no, optOut: no, optIn: no, isRecording: () => false, watch: no, flush: no };
    return;
  }
  const ENDPOINT = "/api/collect";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
    sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
  };
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
  let visitor = store.get("ht-visitor"); if (!visitor) { visitor = uid(); store.set("ht-visitor", visitor); }
  let session = store.sget("ht-session"); if (!session) { session = uid(); store.sset("ht-session", session); }
  const optedOut = () => store.get("ht-optout") === "1";
  const consent = () => true; // recording is on by default; opting out (HT.optOut) is the only way to stop it
  const page = location.pathname.replace(/\.html$/, "").replace(/\/$/, "/") || "/";
  let seq = +(store.sget("ht-seq") || 0);
  let screen = "", screenStart = performance.now(), queue = [], maxScroll = 0, lastEv = 0;

  // ---------- device
  const ua = navigator.userAgent;
  const os = /iPhone|iPad|iPod/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Mac OS X/.test(ua) ? "macOS" : /Windows/.test(ua) ? "Windows" : /Linux/.test(ua) ? "Linux" : "other";
  const browser = /CriOS/.test(ua) ? "Chrome iOS" : /FxiOS/.test(ua) ? "Firefox iOS" : /EdgA?\//.test(ua) ? "Edge" : /SamsungBrowser/.test(ua) ? "Samsung" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "other";
  const device = /iPad|Tablet/.test(ua) || (os === "iOS" && navigator.maxTouchPoints > 1 && !/iPhone/.test(ua)) ? "tablet" : /Mobi|iPhone|Android/.test(ua) ? "phone" : "desktop";
  const vp = () => `${innerWidth}x${innerHeight}`;
  const scr = `${screen_w()}x${screen_h()}@${devicePixelRatio || 1}`;
  function screen_w() { return (window.screen && window.screen.width) || 0; }
  function screen_h() { return (window.screen && window.screen.height) || 0; }
  const name = () => store.get("ht-name") || "";

  // ---------- queue and send
  function ev(type, data = {}) {
    if (optedOut()) return;
    seq++; store.sset("ht-seq", String(seq)); lastEv = performance.now();
    queue.push({
      t: new Date().toISOString(), seq, visitor, session, name: name(), device, os, browser, screen: scr, viewport: vp(),
      event: type, page, state: screen, target: data.target || "", x: data.x ?? "", y: data.y ?? "",
      scroll: data.scroll ?? "", dwell: data.dwell ?? "", value: data.value ?? "", ref: document.referrer ? new URL(document.referrer).host : "",
      extra: data.extra ? JSON.stringify(data.extra).slice(0, 1500) : "",
    });
    if (queue.length >= 60) flush();
  }
  // a batch of whole events under ~56 KB (fetch keepalive and sendBeacon both cap a body at 64 KB)
  // a batch of whole events under ~56 KB (a page may only have 64 KB of "send even after the tab closes" requests
  // open at once, and sendBeacon and keepalive fetches share that allowance)
  function take(list) {
    const batch = []; let size = 20;
    while (list.length && batch.length < 150) {
      const n = JSON.stringify(list[0]).length + 1;
      if (batch.length && size + n > 56000) break;
      size += n; batch.push(list.shift());
    }
    return batch;
  }
  const send = (body, keepalive) => fetch(ENDPOINT, { method: "POST", body, headers: { "content-type": "application/json" }, keepalive });
  let inflight = null, backoff = 0, tick = 0;
  function flush(final) {
    if (optedOut() || !consent()) return;
    if (final) {
      // the page is going away: hand everything not yet saved to the browser, including a batch still on its way.
      // The database stores each event once (session + seq), so sending one twice is harmless.
      const all = (inflight || []).concat(queue); queue = [];
      while (all.length) {
        const body = JSON.stringify({ events: take(all) }); let ok = false;
        try { ok = !!navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" })); } catch {}
        if (!ok) { try { send(body, true).catch(() => {}); } catch {} }
      }
      return;
    }
    if (!queue.length || inflight) return;
    const batch = take(queue); inflight = batch;
    // an ordinary request while the page is open, so the "after close" allowance stays free for the final send
    send(JSON.stringify({ events: batch }), false)
      .then((r) => { if (!r.ok && r.status !== 400) throw new Error(String(r.status)); backoff = 0; })
      .catch(() => { // the database was busy or the network dropped: keep the events and try again later
        queue.unshift(...batch);
        if (queue.length > 1500) queue.splice(0, queue.length - 1500);
        backoff = Math.min(3, backoff + 1);
      })
      .finally(() => { if (inflight === batch) inflight = null; });
  }
  setInterval(() => {
    // a heartbeat while the page is open, so "live now" counts people reading without tapping
    if (document.visibilityState === "visible" && performance.now() - lastEv > 45000) ev("hb");
    if (++tick % (1 << backoff) === 0) flush();
  }, 15000); // 15 s, then 30, 60, 120 s while failing

  // ---------- screens (the app calls HT.screen("walk") on every state change) and time on each
  function setScreen(name, extra) {
    const now = performance.now();
    if (screen) ev("screen_leave", { dwell: Math.round(now - screenStart), scroll: maxScroll, value: screen });
    screen = name; screenStart = now; maxScroll = 0; seenNow.clear();
    ev("screen_view", { value: name, extra });
  }

  // ---------- taps: target, position, rage taps, taps on things that don't respond
  const describe = (el) => {
    if (!el || el === document) return "";
    const t = el.closest("[data-track],button,a,[role=button],input,label,select,summary,[data-go]") || el;
    const label = t.getAttribute("data-track") || t.getAttribute("aria-label") || (t.innerText || t.value || "").trim().replace(/\s+/g, " ").slice(0, 60);
    return `${t.tagName.toLowerCase()}${t.id ? "#" + t.id : ""}${t.dataset && t.dataset.go ? "[go=" + t.dataset.go + "]" : ""}:${label}`;
  };
  const interactive = (el) => !!(el && el.closest && el.closest("button,a,input,label,select,textarea,summary,[role=button],[data-go],[data-track],[tabindex]"));
  let taps = [];
  document.addEventListener("pointerdown", (e) => {
    const x = Math.round((e.clientX / innerWidth) * 1000) / 10, y = Math.round((e.clientY / innerHeight) * 1000) / 10;
    const target = describe(e.target), now = performance.now();
    ev(interactive(e.target) ? "tap" : "dead_tap", { target, x, y, extra: { pointer: e.pointerType, pageY: Math.round(e.clientY + scrollY) } });
    taps = taps.filter((t) => now - t.at < 700); taps.push({ at: now, x: e.clientX, y: e.clientY });
    if (taps.length >= 3 && taps.every((t) => Math.hypot(t.x - e.clientX, t.y - e.clientY) < 40)) { ev("rage_tap", { target, x, y }); taps = []; }
  }, { capture: true, passive: true });
  document.addEventListener("click", (e) => { const el = e.target.closest && e.target.closest("a[href]"); if (el) ev("link", { target: describe(el), value: el.getAttribute("href") }); }, { capture: true, passive: true });

  // ---------- form inputs (field names and lengths only, except the name people type to log in)
  document.addEventListener("change", (e) => {
    const el = e.target; if (!el || !el.name && !el.id) return;
    ev("input", { target: describe(el), value: el.dataset.trackValue === "1" ? String(el.value).slice(0, 60) : `len:${String(el.value || "").length}` });
  }, { capture: true, passive: true });

  // ---------- scroll depth (milestones) and scroll speed
  // The page's height is cached, not read per scroll event: reading scrollHeight there can force a layout in the middle
  // of a scroll. It's re-measured when the page or window changes size (a ResizeObserver runs right after layout, so
  // its read is free), and once more if the page has grown past the cached height.
  let lastScrollY = scrollY, lastScrollT = performance.now(), milestones = new Set();
  let scrollH = 0, measuredAt = 0;
  const measureScroll = () => { scrollH = document.documentElement.scrollHeight - innerHeight; measuredAt = performance.now(); };
  measureScroll();
  addEventListener("resize", measureScroll, { passive: true });
  addEventListener("load", measureScroll);
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(measureScroll); ro.observe(document.documentElement);
    const body = () => { if (document.body) ro.observe(document.body); };
    if (document.body) body(); else document.addEventListener("DOMContentLoaded", body);
  }
  addEventListener("scroll", () => {
    const y = scrollY;
    if (y > scrollH && performance.now() - measuredAt > 500) measureScroll(); // grown since (rubber-banding past the end doesn't re-measure every frame)
    const h = scrollH;
    const pct = h > 0 ? Math.round((y / h) * 100) : 100;
    if (pct > maxScroll) maxScroll = pct;
    for (const m of [25, 50, 75, 90, 100]) if (pct >= m && !milestones.has(screen + m)) { milestones.add(screen + m); ev("scroll_depth", { scroll: m }); }
    const now = performance.now();
    if (now - lastScrollT > 1000) { ev("scroll", { scroll: pct, value: Math.round(Math.abs(y - lastScrollY) / ((now - lastScrollT) / 1000)) + "px/s" }); lastScrollY = y; lastScrollT = now; }
  }, { passive: true });

  // ---------- attention: which tracked parts were on screen (at least half visible), and for how long
  const seenNow = new Map();
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    const now = performance.now();
    for (const en of entries) {
      const key = en.target.getAttribute("data-attn");
      if (en.isIntersecting && en.intersectionRatio >= .5) { if (!seenNow.has(key)) seenNow.set(key, now); }
      else if (seenNow.has(key)) { const ms = Math.round(now - seenNow.get(key)); seenNow.delete(key); if (ms > 400) ev("attention", { target: key, dwell: ms }); }
    }
  }, { threshold: [0, .5, 1] }) : null;
  function watch(root = document) { if (!io) return; root.querySelectorAll("[data-attn]").forEach((el) => { if (!el.__htw) { el.__htw = 1; io.observe(el); } }); }
  const mo = "MutationObserver" in window ? new MutationObserver(() => watch()) : null;

  // ---------- movement: pointer or finger path, sampled every 300 ms, sent in chunks
  let path = [], lastMove = 0;
  const onMove = (e) => {
    const now = performance.now(); if (now - lastMove < 300) return; lastMove = now;
    const p = e.touches ? e.touches[0] : e; if (!p) return;
    path.push([Math.round((p.clientX / innerWidth) * 100), Math.round((p.clientY / innerHeight) * 100), Math.round(now / 100)]);
    if (path.length >= 20) { ev("movement", { extra: { path }, value: e.touches ? "touch" : "pointer" }); path = []; }
  };
  addEventListener("pointermove", onMove, { passive: true });
  addEventListener("touchmove", onMove, { passive: true });

  // ---------- idle, tab switches, orientation, resize, text selection, copy
  let lastInput = performance.now(), idle = false;
  const wake = () => { if (idle) { ev("active", { dwell: Math.round(performance.now() - lastInput) }); idle = false; } lastInput = performance.now(); };
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach((t) => addEventListener(t, wake, { passive: true }));
  setInterval(() => { if (!idle && performance.now() - lastInput > 30000) { idle = true; ev("idle", { value: "30s no input" }); } }, 5000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") { ev("tab_hidden", { dwell: Math.round(performance.now() - screenStart) }); if (path.length) { ev("movement", { extra: { path } }); path = []; } flush(true); }
    else ev("tab_visible");
  });
  addEventListener("pagehide", () => { ev("page_exit", { dwell: Math.round(performance.now() - screenStart), scroll: maxScroll }); flush(true); });
  addEventListener("orientationchange", () => ev("orientation", { value: (screen_w() > screen_h()) ? "landscape" : "portrait" }));
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => ev("resize", { value: vp() }), 500); });
  let sel; document.addEventListener("selectionchange", () => { const s = String(getSelection() || ""); if (s.length > 12) { clearTimeout(sel); sel = setTimeout(() => ev("select_text", { value: s.slice(0, 80) }), 800); } });
  document.addEventListener("copy", () => ev("copy", { value: String(getSelection() || "").slice(0, 80) }));

  // ---------- speed and errors
  addEventListener("load", () => setTimeout(() => {
    const n = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    const paint = performance.getEntriesByType ? performance.getEntriesByType("paint").find((p) => p.name === "first-contentful-paint") : null;
    ev("perf", { extra: n ? { ttfb: Math.round(n.responseStart), dom: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), fcp: paint ? Math.round(paint.startTime) : null, transfer: n.transferSize } : {} });
  }, 0));
  try {
    let cls = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) cls += e.value; })).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => { const e = l.getEntries().pop(); if (e) ev("lcp", { value: Math.round(e.startTime) }); }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.interactionId && e.duration > 100) ev("slow_interaction", { value: Math.round(e.duration), target: e.name }); })).observe({ type: "event", durationThreshold: 100 });
    addEventListener("pagehide", () => ev("cls", { value: Math.round(cls * 1000) / 1000 }), { once: true });
  } catch {}
  addEventListener("error", (e) => ev("js_error", { value: String(e.message).slice(0, 200), target: `${(e.filename || "").split("/").pop()}:${e.lineno}` }));
  addEventListener("unhandledrejection", (e) => ev("js_error", { value: String(e.reason).slice(0, 200), target: "promise" }));

  // ---------- public API for the pages
  window.HT = {
    screen: setScreen,
    event: (type, data) => ev(type, data),
    identify(n) { store.set("ht-name", String(n).slice(0, 40)); ev("identify", { value: String(n).slice(0, 40) }); },
    optOut() { ev("consent", { value: "opt_out" }); flush(true); store.set("ht-optout", "1"); queue = []; }, // send what was recorded while on, then stop
    optIn() { try { localStorage.removeItem("ht-optout"); } catch {} store.set("ht-consent", "1"); ev("consent", { value: "opt_in" }); },
    isRecording: () => !optedOut(),
    watch, flush,
  };

  const start = () => {
    ev("page_view", { value: document.title, extra: { lang: navigator.language, tz: Intl.DateTimeFormat().resolvedOptions().timeZone, touch: navigator.maxTouchPoints || 0,
      net: navigator.connection ? navigator.connection.effectiveType : "", dark: matchMedia("(prefers-color-scheme: dark)").matches, reduceMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      returning: !!store.get("ht-seen"), q: location.search.slice(0, 80) } });
    store.set("ht-seen", "1");
    if (!screen) setScreen(page === "/" ? "landing" : page.slice(1));
    watch(); if (mo) mo.observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
