/* Halftime analytics admin (the page is site/admin.html, the server is site/api/admin.js, the data shapes are
   halftime_admin_data in tools/site/supabase.sql). Vanilla JS, no libraries (CSP: script-src 'self').
   Every value that came from a visitor (names, tap targets, pages, error messages) goes through esc() before it
   becomes HTML. Sample prototype data only. */
(() => {
  "use strict";

  // ------------------------------------------------------------------ small helpers
  const $ = (id) => document.getElementById(id);
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ESC[c]);
  const num = (v) => { const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN; return Number.isFinite(n) ? n : null; };
  const n0 = (v) => num(v) ?? 0;
  const fmt = (v, digits = 0) => { const n = num(v); return n === null ? "—" : n.toLocaleString("en-US", { maximumFractionDigits: digits }); };
  const pct = (part, whole) => (n0(whole) > 0 ? Math.round((n0(part) / n0(whole)) * 100) + "%" : "—");
  const plural = (n, one, many) => `${fmt(n)} ${n0(n) === 1 ? one : many || one + "s"}`;
  const arr = (v) => (Array.isArray(v) ? v : []);
  const obj = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
  const shortId = (v) => String(v || "").slice(0, 6) || "—";
  const who = (name, visitor) => (name ? String(name) : shortId(visitor));

  // times, always in New York time
  const TZ = "America/New_York";
  const F_TIME = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
  const F_TIMES = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit", second: "2-digit" });
  const F_DAY = new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short", day: "numeric" });
  const F_DAY_UTC = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", month: "short", day: "numeric" }); // 1-day bins start at New York midnight
  const F_YMD = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
  const ampm = (s) => s.replace(/[\s ]*([AP])M$/i, (m, a) => " " + a.toLowerCase() + "m");
  const parseT = (t) => {
    if (t == null || t === "") return null;
    const d = new Date(typeof t === "string" ? t.replace(/(\.\d{3})\d+/, "$1").replace(" ", "T") : t);
    return Number.isNaN(d.getTime()) ? null : d;
  };
  const sameDay = (d) => F_YMD.format(d) === F_YMD.format(new Date());
  const tShort = (t) => { const d = parseT(t); return d ? ampm(F_TIME.format(d)) : "—"; };
  const tSec = (t) => { const d = parseT(t); return d ? ampm(F_TIMES.format(d)) : "—"; };
  const tDay = (t) => { const d = parseT(t); return d ? F_DAY.format(d) : "—"; };
  const when = (t) => { const d = parseT(t); return !d ? "—" : sameDay(d) ? tShort(d) : `${F_DAY.format(d)}, ${tShort(d)}`; };
  const ago = (t) => {
    const d = parseT(t); if (!d) return "—";
    const s = Math.round((Date.now() - d.getTime()) / 1000);
    if (s < 5) return "just now";
    if (s < 60) return `${s} s ago`;
    if (s < 3600) return `${Math.floor(s / 60)} min ago`;
    if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
    return `${Math.floor(s / 86400)} d ago`;
  };
  const dur = (sec) => { const s = num(sec); if (s === null) return "—"; if (s < 90) return `${fmt(s, 1)} s`; if (s < 5400) return `${fmt(s / 60, 1)} min`; return `${fmt(s / 3600, 1)} h`; };
  // midnight in New York today, as a UTC instant
  const nyMidnight = (now) => {
    const p = {};
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23" })
      .formatToParts(new Date(now)).forEach((x) => { p[x.type] = +x.value; });
    const off = Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second) - Math.floor(now / 1000) * 1000;
    return Date.UTC(p.year, p.month - 1, p.day) - off;
  };

  // labels
  const RANGE_WORDS = { live: "in the last 30 minutes", today: "today", "24h": "in the last 24 hours", "7d": "in the last 7 days", all: "so far" };
  const WEARABLES = { none: "No wearable", fitbit: "Fitbit", oura: "Oura Ring", whoop: "WHOOP", apple: "Apple Watch", garmin: "Garmin", unknown: "Not recorded" };
  const ROLES = { student: "Student", athlete: "Athlete", unknown: "Not recorded" };
  const SETUP_ORDER = ["login", "account", "about", "reads", "laptop", "wearable", "permission", "syncing", "data", "calendar", "done"];
  const TOUR_ORDER = ["compare", "pill", "forecast", "body", "calendar", "card", "sources", "decide", "tabs"];
  const TOUR_LABEL = { compare: "Welcome", pill: "Pill", forecast: "Forecast", body: "Body", calendar: "Calendar", card: "Card", sources: "Sources", decide: "Decide", tabs: "Tabs" };
  const wearLabel = (k) => WEARABLES[k] || (k ? String(k) : "Not recorded");
  const roleLabel = (k) => ROLES[k] || (k ? String(k) : "Not recorded");
  const pageLabel = (p) => (p === "/" ? "Landing" : p === "/start" ? "Setup" : p === "/app" ? "App" : p ? String(p) : "—");
  const where = (page, state) => [pageLabel(page), state].filter(Boolean).join(" · ");

  // ------------------------------------------------------------------ extra CSS (only what admin.html lacks)
  const style = document.createElement("style");
  style.textContent = `
    .vh{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
    th button.sort{all:unset;cursor:pointer;display:inline-flex;gap:4px;align-items:center}
    th button.sort:focus-visible{outline:2px solid var(--mint-ink);outline-offset:2px;border-radius:4px}
    th.n button.sort{justify-content:flex-end}
    tr.click:focus-visible td{background:var(--mint-bg)}
    tr.click:focus-visible{outline:2px solid var(--mint-ink);outline-offset:-2px}
    .feed div > *{min-width:0;overflow-wrap:anywhere}
    .feed time{color:var(--ink3);font-family:var(--mono);font-size:.75rem;line-height:1.5}
    .tl .ev{grid-template-columns:86px minmax(0,110px) minmax(0,1fr)}
    .tl .ev > *{min-width:0;overflow-wrap:anywhere}
    .tl .ev .k{font-family:var(--mono);font-size:.75rem}
    .tl .ev .d{color:var(--ink3)}
    .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 12px}
    .row input[type=search]{flex:1 1 220px;min-width:0}
    .hd{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:0 0 14px}
    .hd h2{margin:0;font-size:1.125rem;letter-spacing:-.01em;overflow-wrap:anywhere}
    .sum{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;font-size:.8125rem;margin:0 0 14px}
    .sum dt{color:var(--ink3)}
    .sum dd{margin:0;min-width:0;overflow-wrap:anywhere}
    .stack{display:grid;gap:14px}
    .pw{display:grid;gap:12px;max-width:380px}
    .ok{color:var(--mint-ink);font-size:.875rem;margin:0;min-height:1.2em}
    .kpi small{display:block;font-size:.75rem;color:var(--ink3);margin-top:2px}
    .heat .side{display:grid;gap:10px;align-content:start;min-width:0}
    .heat.wide{grid-template-columns:1fr}
    .phone.desk{justify-self:stretch}
    .legend i.ring{background:transparent;border:2px solid #D43A2F;width:10px;height:10px}
    td .tag + .tag{margin-left:4px}
    .val .drop{display:block;text-align:right}
    @media (max-width:560px){
      select{font-size:16px}
      .tl .ev{grid-template-columns:82px minmax(0,92px) minmax(0,1fr);gap:6px}
      .funnel .brow,.brow{grid-template-columns:minmax(0,1fr) auto}
      .brow .trk{grid-column:1/-1;grid-row:2}
      .brow .lab{white-space:normal}
    }
  `;
  document.head.appendChild(style);

  // ------------------------------------------------------------------ server
  class AuthError extends Error {}
  async function call(op, body, signal) {
    const r = await fetch(`/api/admin?op=${encodeURIComponent(op)}`, {
      method: "POST", credentials: "same-origin", signal, cache: "no-store",
      headers: { "Content-Type": "application/json", "X-Admin": "1" }, body: JSON.stringify(body || {}),
    });
    let data = null;
    try { data = await r.json(); } catch { data = null; }
    return { status: r.status, data: data || {} };
  }
  const rangeArgs = (extra) => Object.assign({ range: S.range, tests: S.tests }, extra || {});
  async function data(view, args, signal) {
    const r = await call("data", { view, args: args || rangeArgs() }, signal);
    if (r.status === 401) { showLogin(); throw new AuthError("auth"); }
    if (r.status === 503) { showLogin(r.data.message || "The analytics database isn't connected yet."); throw new AuthError("setup"); }
    if (r.status !== 200 || r.data.error) throw new Error(`load ${view}: ${r.status} ${r.data.error || ""}`);
    return r.data;
  }

  // ------------------------------------------------------------------ state, kept in the hash: #pulse/today[/tests]
  const VIEWS = ["pulse", "funnel", "screens", "tour", "taps", "visitors", "devices", "health"];
  const RANGES = ["live", "today", "24h", "7d", "all"];
  const S = { view: "pulse", range: "today", tests: false };
  const ui = { sort: { key: "views", dir: -1 }, q: "", heatKey: null, heatDesk: false, visitors: [], showMove: false };
  function readHash() {
    const [v, r, t] = location.hash.replace(/^#/, "").split("/");
    S.view = VIEWS.includes(v) ? v : "pulse";
    S.range = RANGES.includes(r) ? r : "today";
    S.tests = t === "tests";
  }
  function writeHash() {
    const h = `#${S.view}/${S.range}${S.tests ? "/tests" : ""}`;
    if (location.hash !== h) history.replaceState(null, "", h);
  }
  function syncControls() {
    document.querySelectorAll("#range [data-r]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.r === S.range)));
    document.querySelectorAll("#tabs [data-v]").forEach((b) => { if (b.dataset.v === S.view) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    $("tests").checked = S.tests;
  }

  // ------------------------------------------------------------------ loading and auto-refresh
  const view = $("view");
  let ctl = null, timer = 0, signedIn = false, lastOk = 0, cleanups = [];
  const every = () => (S.view === "pulse" ? 10000 : 30000);
  function setStatus(ok) {
    $("sdot").className = ok ? "dot" : "dot off";
    $("stext").textContent = ok ? `Updated ${tSec(new Date())} · auto-refresh ${every() / 1000} s` : "Couldn't load, retrying";
  }
  function schedule() {
    clearTimeout(timer);
    if (!signedIn || document.hidden) return;
    timer = setTimeout(() => load(false), every());
  }
  function stop() { clearTimeout(timer); if (ctl) ctl.abort(); ctl = null; }
  function unmount() { cleanups.forEach((f) => { try { f(); } catch { /* gone */ } }); cleanups = []; }

  // user = the person changed the tab or range (cancel what's loading); otherwise a timer tick (skip if busy)
  async function load(user) {
    if (!signedIn) return;
    clearTimeout(timer);
    if (ctl) { if (!user) return; ctl.abort(); }
    const c = (ctl = new AbortController());
    const v = S.view;
    if (view.dataset.v !== v) {
      unmount(); view.dataset.v = v; view.innerHTML = `<p class="empty">Loading…</p>`;
    }
    try {
      const d = await data(v, rangeArgs(), c.signal);
      if (c !== ctl) return;
      const keep = remember();
      await RENDER[v](d, c);
      if (c !== ctl) return;
      restore(keep);
      lastOk = Date.now();
      setStatus(true);
    } catch (e) {
      if (c !== ctl || e instanceof AuthError || (e && e.name === "AbortError")) return;
      console.error("[admin]", e);
      if (view.querySelector(":scope > .empty")) view.innerHTML = `<p class="empty">Couldn't load this section. Trying again shortly.</p>`;
      setStatus(false);
    } finally {
      if (c === ctl) { ctl = null; schedule(); }
    }
  }
  // keep focus (and the caret in a text box) across a refresh
  // and where each sideways-scrolling table and the feed were scrolled to
  function remember() {
    const pos = [...view.querySelectorAll(".scroll,.feed")].map((e) => [e.scrollLeft, e.scrollTop]);
    const a = document.activeElement;
    if (!a || !view.contains(a) || !a.dataset || !a.dataset.k) return { pos };
    return { pos, k: a.dataset.k, s: a.selectionStart, e: a.selectionEnd };
  }
  function restore(keep) {
    if (!keep) return;
    const boxes = [...view.querySelectorAll(".scroll,.feed")];
    if (boxes.length === keep.pos.length) boxes.forEach((e, i) => { e.scrollLeft = keep.pos[i][0]; e.scrollTop = keep.pos[i][1]; });
    if (!keep.k) return;
    const el = [...view.querySelectorAll("[data-k]")].find((x) => x.dataset.k === keep.k);
    if (!el || el === document.activeElement) return;
    el.focus({ preventScroll: true });
    if (keep.s != null && typeof el.setSelectionRange === "function") { try { el.setSelectionRange(keep.s, keep.e); } catch { /* not a text box */ } }
  }
  document.addEventListener("visibilitychange", () => {
    if (!signedIn) return;
    if (document.hidden) { clearTimeout(timer); return; }
    if (Date.now() - lastOk > every()) load(false); else schedule();
  });

  // ------------------------------------------------------------------ building blocks
  const card = (title, sub, body, extra = "") => `<section class="card"${extra}>${title ? `<h2>${esc(title)}</h2>` : ""}${sub ? `<p class="sub">${esc(sub)}</p>` : ""}${body}</section>`;
  const empty = (msg) => `<p class="empty">${esc(msg)}</p>`;
  const kpi = (label, value, warn, small) => `<div class="kpi${warn ? " warn" : ""}"><b>${esc(value)}</b><span>${esc(label)}</span>${small ? `<small>${esc(small)}</small>` : ""}</div>`;
  const fill = (frac, m) => `<div class="trk" aria-hidden="true"><div class="fill${m ? " m" : ""}" style="transform:scaleX(${Math.max(0, Math.min(1, frac || 0)).toFixed(4)})"></div></div>`;
  // rows: [{label, n, val, title, drop}]
  function bars(rows, opts = {}) {
    if (!rows.length) return empty(opts.empty || "Nothing in this range yet.");
    const base = opts.base || Math.max(1, ...rows.map((r) => n0(r.n)));
    return `<div class="bars${opts.cls ? " " + opts.cls : ""}">${rows.map((r) => `<div class="brow"><span class="lab" title="${esc(r.title || r.label)}">${esc(r.label)}</span>${fill(n0(r.n) / base, opts.mint)}<span class="val">${esc(r.val != null ? r.val : fmt(r.n))}${r.drop ? `<span class="drop">${esc(r.drop)}</span>` : ""}</span></div>`).join("")}</div>`;
  }
  // a plain table: cols [{h, n (numeric), cls}], rows: arrays of already-escaped cell HTML
  function table(cols, rows, opts = {}) {
    if (!rows.length) return empty(opts.empty || "Nothing in this range yet.");
    const th = cols.map((c) => `<th${c.n ? ' class="n"' : ""} scope="col">${esc(c.h)}</th>`).join("");
    const tr = rows.map((r, i) => `<tr${opts.rowAttr ? opts.rowAttr(i) : ""}>${r.map((cell, j) => `<td${cols[j].n ? ' class="n"' : ""}>${cell}</td>`).join("")}</tr>`).join("");
    return `<div class="scroll"><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
  }
  const trunc = (s, max = 280) => `<div class="trunc" style="max-width:${max}px" title="${esc(s)}">${esc(s || "—")}</div>`;
  const tag = (s, kind) => `<span class="tag${kind ? " " + kind : ""}">${esc(s)}</span>`;

  // ------------------------------------------------------------------ Pulse
  const STEP_MS = { live: 60e3, today: 30 * 60e3, "24h": 30 * 60e3, "7d": 6 * 3600e3, all: 864e5 };
  const ORIGIN = Date.UTC(2026, 0, 1, 5); // the SQL bins from midnight Jan 1, 2026 in New York (EST, UTC−5)
  function bucketSeries(series, rng) {
    const step = STEP_MS[rng] || 30 * 60e3, now = Date.now();
    const align = (t) => ORIGIN + Math.floor((t - ORIGIN) / step) * step;
    const pts = arr(series).map((r) => ({ t: parseT(r[0]), v: n0(r[1]), e: n0(r[2]) })).filter((r) => r.t).map((r) => ({ t: align(r.t.getTime()), v: r.v, e: r.e }));
    let start = rng === "live" ? now - 30 * 60e3 : rng === "today" ? nyMidnight(now) : rng === "24h" ? now - 864e5 : rng === "7d" ? now - 7 * 864e5 : pts.length ? pts[0].t : now;
    start = align(start);
    const end = align(Math.max(now, pts.length ? pts[pts.length - 1].t : now));
    if ((end - start) / step > 400 || end < start) return pts;
    const by = new Map(pts.map((p) => [p.t, p]));
    const out = [];
    for (let t = start; t <= end; t += step) out.push(by.get(t) || { t, v: 0, e: 0 });
    return out;
  }
  function drawChart(host, series, rng) {
    const pts = bucketSeries(series, rng);
    if (!pts.length || pts.every((p) => !p.v)) { host.innerHTML = empty(`No visits ${RANGE_WORDS[rng]} yet.`); return; }
    const W = Math.max(240, Math.round(host.clientWidth || 600)), H = 150, L = 30, B = 20, T = 8;
    const max = Math.max(1, ...pts.map((p) => p.v));
    const n = pts.length, bw = (W - L) / n, gap = bw > 6 ? Math.min(4, bw * 0.25) : 0;
    const y = (v) => T + (H - T - B) * (1 - v / max);
    const day = rng === "7d" || rng === "all";
    const lab = (t) => (rng === "all" ? F_DAY_UTC.format(new Date(t)) : day ? `${tDay(t)} ${tShort(t).replace(":00", "")}` : tShort(t));
    const unit = rng === "live" ? "minute" : day ? (rng === "7d" ? "6 hours" : "day") : "30 minutes";
    const rects = pts.map((p, i) => p.v ? `<rect x="${(L + i * bw + gap / 2).toFixed(1)}" y="${y(p.v).toFixed(1)}" width="${Math.max(1, bw - gap).toFixed(1)}" height="${Math.max(1, H - B - y(p.v)).toFixed(1)}" rx="${bw > 8 ? 2 : 0}" style="fill:var(--ink)"><title>${esc(`${rng === "all" ? F_DAY_UTC.format(new Date(p.t)) : day ? when(p.t) : tShort(p.t)} · ${plural(p.v, "visitor")} · ${plural(p.e, "event")}`)}</title></rect>` : "").join("");
    const xl = [0, Math.floor((n - 1) / 2), n - 1].filter((v, i, a) => a.indexOf(v) === i);
    const xt = xl.map((i, k) => `<text x="${(L + i * bw + (k === 0 ? 0 : k === xl.length - 1 ? bw : bw / 2)).toFixed(1)}" y="${H - 5}" text-anchor="${k === 0 ? "start" : k === xl.length - 1 ? "end" : "middle"}">${esc(lab(pts[i].t))}</text>`).join("");
    host.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(`Visitors per ${unit}, highest ${fmt(max)}`)}">
      <line x1="${L}" x2="${W}" y1="${H - B + 0.5}" y2="${H - B + 0.5}" style="stroke:var(--line)"/>
      <line x1="${L}" x2="${W}" y1="${T + 0.5}" y2="${T + 0.5}" style="stroke:var(--line);stroke-dasharray:2 3"/>
      <text x="${L - 6}" y="${T + 4}" text-anchor="end">${esc(fmt(max))}</text><text x="${L - 6}" y="${H - B}" text-anchor="end">0</text>
      ${rects}${xt}</svg>`;
  }
  function feedLine(f) {
    const n = who(f.name, f.visitor), v = f.value, ev = f.event;
    switch (ev) {
      case "screen_view":
        if (f.page === "/") return `${n} opened the landing page`;
        if (f.page === "/start") return `${n} reached setup · ${v || "start"}`;
        if (f.page === "/app") return /^tab_/.test(v || "") ? `${n} opened the ${String(v).slice(4)} tab` : `${n} opened the app · ${v || "home"}`;
        return `${n} opened ${f.page || "a page"}${v ? " · " + v : ""}`;
      case "account_created": return `${n} finished setup${v ? " · " + wearLabel(v) : ""}`;
      case "identify": return `${v || n} typed a name`;
      case "tour_done": return `${n} finished the tour`;
      case "tour_skip": return `${n} skipped the tour`;
      case "rage_tap": return `${n} · rage tap on ${f.target || "the screen"}${f.state ? " (" + f.state + ")" : ""}`;
      case "js_error": return `${n} · JS error: ${v || "unknown"}`;
      case "calendar_connected": return `${n} connected a calendar${v ? " · " + v : ""}`;
      case "consent": return v === "opt_out" ? `${n} turned analytics off` : v === "opt_in" ? `${n} turned analytics back on` : `${n} changed analytics consent`;
      default: return `${n} · ${ev || "event"}`;
    }
  }
  function renderPulse(d) {
    const active = arr(d.active), feed = arr(d.feed);
    const activeT = table(
      [{ h: "Who" }, { h: "Where" }, { h: "Device" }, { h: "City" }, { h: "Last seen", n: true }],
      active.map((a) => [esc(who(a.name, a.visitor)), trunc(where(a.page, a.state), 220), esc([a.device, a.os].filter(Boolean).join(" · ") || "—"), esc(a.city || "—"), esc(ago(a.last))]),
      { empty: "Nobody is on the site right now.", rowAttr: (i) => ` class="click" tabindex="0" data-k="a:${esc(active[i].visitor)}" data-vis="${esc(active[i].visitor)}"` });
    const feedH = feed.length
      ? `<div class="feed">${feed.map((f) => { const t = parseT(f.at); return `<div><time>${t && !sameDay(t) ? esc(tDay(t)) + "<br>" : ""}${esc(tShort(f.at))}</time><span>${esc(feedLine(f))}</span></div>`; }).join("")}</div>`
      : empty(`No milestones ${RANGE_WORDS[S.range]} yet.`);
    const errors = n0(d.errors), rage = n0(d.rage);
    view.innerHTML = `<div class="stack">
      <div class="grid g2">
        ${card("", "", `<div class="live"><b>${esc(fmt(n0(d.now)))}</b><span class="lbl">Live now · ${n0(d.now) === 1 ? "person" : "people"} active in the last 2 minutes</span></div><div style="margin-top:12px">${activeT}</div>`)}
        ${card("Visitors over time", `People per ${S.range === "live" ? "minute" : S.range === "7d" ? "6 hours" : S.range === "all" ? "day" : "30 minutes"}, ${RANGE_WORDS[S.range]}`, `<div id="chartHost"></div>`)}
      </div>
      <div class="kpis">
        ${kpi("Visitors", fmt(d.visitors))}${kpi("Sessions", fmt(d.sessions))}${kpi("Typed a name", fmt(d.named))}${kpi("Events", fmt(d.events))}
        ${kpi("Avg minutes per session", d.avg_minutes == null ? "—" : fmt(d.avg_minutes, 1))}${kpi("Came from the QR code", fmt(d.qr))}
        ${kpi("Rage taps", fmt(rage), rage > 0)}${kpi("JS errors", fmt(errors), errors > 0)}
      </div>
      ${card("What people did", `Latest milestones ${RANGE_WORDS[S.range]}`, feedH)}
    </div>`;
    const host = $("chartHost");
    drawChart(host, d.series, S.range);
    let w = host.clientWidth;
    const ro = new ResizeObserver(() => { if (Math.abs(host.clientWidth - w) > 4) { w = host.clientWidth; drawChart(host, d.series, S.range); } });
    ro.observe(host); cleanups.push(() => ro.disconnect());
  }

  // ------------------------------------------------------------------ Funnel
  function renderFunnel(d) {
    const steps = arr(d.steps).map((s) => ({ label: String(s[0] || ""), n: n0(s[1]) }));
    const base = (steps[0] && steps[0].n) || Math.max(0, ...steps.map((s) => s.n));
    const rows = steps.map((s, i) => {
      const prev = i ? steps[i - 1].n : null, lost = prev != null ? prev - s.n : 0;
      return { label: s.label, n: s.n, val: `${fmt(s.n)} · ${pct(s.n, base)}`, drop: prev != null && lost > 0 ? `−${fmt(lost)} (${pct(lost, prev)})` : "" };
    });
    const funnel = base > 0 ? bars(rows, { cls: "funnel", base }) : empty(`No visitors ${RANGE_WORDS[S.range]} yet.`);
    const fromObj = (o, label) => Object.entries(obj(o)).map(([k, v]) => ({ label: label(k), n: n0(v) })).sort((a, b) => b.n - a.n);
    const roles = fromObj(d.roles, roleLabel), wear = fromObj(d.wearables, wearLabel);
    const totalR = roles.reduce((a, r) => a + r.n, 0), totalW = wear.reduce((a, r) => a + r.n, 0);
    roles.forEach((r) => { r.val = `${fmt(r.n)} · ${pct(r.n, totalR)}`; });
    wear.forEach((r) => { r.val = `${fmt(r.n)} · ${pct(r.n, totalW)}`; });
    const setup = arr(d.setup_steps).map((s) => ({ key: String(s[0] || ""), label: String(s[0] || "—"), n: n0(s[1]) }))
      .sort((a, b) => { const ia = SETUP_ORDER.indexOf(a.key), ib = SETUP_ORDER.indexOf(b.key); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || b.n - a.n; });
    view.innerHTML = `<div class="stack">
      ${card("Funnel", `People who reached each step ${RANGE_WORDS[S.range]}. The bar is the share of people who opened the landing page; red is the drop from the step before.`, funnel)}
      <div class="grid g3">
        ${card("Role", "People who finished setup", bars(roles, { empty: "Nobody finished setup in this range yet." }))}
        ${card("Wearable", "What they said they wear", bars(wear, { empty: "Nobody finished setup in this range yet." }))}
        ${card("Setup screens reached", "People who saw each setup screen", bars(setup, { mint: true, empty: "Nobody opened setup in this range yet." }))}
      </div>
    </div>`;
  }

  // ------------------------------------------------------------------ Screens
  const SCREEN_COLS = [
    { k: "page", h: "Page" }, { k: "screen", h: "Screen" }, { k: "people", h: "People", n: true }, { k: "views", h: "Views", n: true },
    { k: "avg_s", h: "Avg s", n: true }, { k: "median_s", h: "Median s", n: true }, { k: "avg_scroll", h: "Avg scroll", n: true },
  ];
  function screensTable(list) {
    if (!list.length) return empty(`No screens viewed ${RANGE_WORDS[S.range]} yet.`);
    const { key, dir } = ui.sort, col = SCREEN_COLS.find((c) => c.k === key) || SCREEN_COLS[3];
    const sorted = list.slice().sort((a, b) => {
      const x = a[col.k], y = b[col.k];
      const c = col.n ? (num(x) ?? -Infinity) - (num(y) ?? -Infinity) : String(x == null ? "" : x).localeCompare(String(y == null ? "" : y));
      return c * dir;
    });
    const th = SCREEN_COLS.map((c) => {
      const on = c.k === col.k, sort = on ? (dir > 0 ? "ascending" : "descending") : "none";
      return `<th${c.n ? ' class="n"' : ""} scope="col" aria-sort="${sort}"><button class="sort" type="button" data-sort="${c.k}" data-k="sort:${c.k}">${esc(c.h)}<span aria-hidden="true">${on ? (dir > 0 ? "↑" : "↓") : ""}</span></button></th>`;
    }).join("");
    const tr = sorted.map((s) => `<tr><td>${esc(pageLabel(s.page))}</td><td>${trunc(s.screen, 200)}</td><td class="n">${esc(fmt(s.people))}</td><td class="n">${esc(fmt(s.views))}</td><td class="n">${esc(fmt(s.avg_s, 1))}</td><td class="n">${esc(fmt(s.median_s, 1))}</td><td class="n">${s.avg_scroll == null ? "—" : esc(fmt(s.avg_scroll)) + "%"}</td></tr>`).join("");
    return `<div class="scroll"><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
  }
  function renderScreens(d) {
    const list = arr(d.screens).map(obj);
    const exits = arr(d.exits), total = exits.reduce((a, e) => a + n0(e[2]), 0);
    const exitT = table([{ h: "Page" }, { h: "Screen" }, { h: "Sessions", n: true }, { h: "Share", n: true }],
      exits.map((e) => [esc(pageLabel(e[0])), trunc(e[1], 220), esc(fmt(e[2])), esc(pct(e[2], total))]), { empty: `No sessions ${RANGE_WORDS[S.range]} yet.` });
    const att = arr(d.attention).map((a) => ({ label: String(a[0] || "—"), n: n0(a[1]), val: `${dur(a[1])} · ${plural(a[2], "person", "people")}` }));
    const depth = new Map();
    arr(d.scroll).forEach((r) => { const m = n0(r[1]); depth.set(m, (depth.get(m) || 0) + n0(r[2])); });
    const scrollRows = [25, 50, 75, 90, 100].map((m) => ({ label: `${m}% of the page`, n: depth.get(m) || 0, val: plural(depth.get(m) || 0, "session") }));
    const anyScroll = scrollRows.some((r) => r.n);
    view.innerHTML = `<div class="stack">
      ${card("Screens", "Time on each screen, from when it opened to when it closed. Click a heading to sort.", `<div id="scrT">${screensTable(list)}</div>`)}
      <div class="grid g2">
        ${card("Where sessions ended", "The last screen each session saw", exitT)}
        ${card("Landing page attention", "Total time each section was at least half on screen", bars(att, { empty: `No landing page reading ${RANGE_WORDS[S.range]} yet.` }))}
        ${card("Landing page scroll depth", "Sessions that scrolled at least this far", anyScroll ? bars(scrollRows, { mint: true, base: Math.max(1, scrollRows[0].n, ...scrollRows.map((r) => r.n)) }) : empty(`No landing page scrolling ${RANGE_WORDS[S.range]} yet.`))}
      </div>
    </div>`;
    $("scrT").addEventListener("click", (e) => {
      const b = e.target.closest("[data-sort]"); if (!b) return;
      const k = b.dataset.sort, c = SCREEN_COLS.find((x) => x.k === k);
      ui.sort = ui.sort.key === k ? { key: k, dir: -ui.sort.dir } : { key: k, dir: c && c.n ? -1 : 1 };
      const sc = $("scrT").querySelector(".scroll"), left = sc ? sc.scrollLeft : 0;
      $("scrT").innerHTML = screensTable(list);
      const sc2 = $("scrT").querySelector(".scroll"); if (sc2) sc2.scrollLeft = left;
      const nb = $("scrT").querySelector(`[data-sort="${k}"]`); if (nb) nb.focus({ preventScroll: true });
    });
  }

  // ------------------------------------------------------------------ Tour
  function renderTour(d) {
    const started = n0(d.started), done = n0(d.done), skipped = n0(d.skipped);
    const by = new Map(arr(d.steps).map((s) => [String(s[0]), n0(s[1])]));
    const order = TOUR_ORDER.concat([...by.keys()].filter((k) => !TOUR_ORDER.includes(k)));
    const rows = order.map((k) => ({ label: TOUR_LABEL[k] || k, n: by.get(k) || 0, val: `${fmt(by.get(k) || 0)} · ${pct(by.get(k) || 0, started)}` }));
    const sk = arr(d.skipped_at).map((s) => ({ label: s[0] ? TOUR_LABEL[s[0]] || String(s[0]) : "Before the first step", n: n0(s[1]) }));
    view.innerHTML = `<div class="stack">
      <div class="kpis">
        ${kpi("Started the tour", fmt(started))}${kpi("Finished", fmt(done), false, started ? `${pct(done, started)} of those who started` : "")}
        ${kpi("Skipped", fmt(skipped), false, started ? `${pct(skipped, started)} of those who started` : "")}${kpi("Replays", fmt(d.replays), false, "Taps on a tour button")}
      </div>
      <div class="grid g2">
        ${card("Tour steps", "People who reached each step, and the share of those who started", started ? bars(rows, { base: Math.max(1, started) }) : empty(`Nobody started the tour ${RANGE_WORDS[S.range]} yet.`))}
        ${card("Where people skipped", "The step on screen when they skipped", bars(sk, { empty: `Nobody skipped the tour ${RANGE_WORDS[S.range]}.` }))}
      </div>
    </div>`;
  }

  // ------------------------------------------------------------------ Taps and the heat map
  const PREVIEW_PAGES = new Set(["/", "/app", "/start"]);
  function previewUrl(page, state) {
    const st = state ? String(state) : "";
    if (page === "/app") return `/app?preview=1&state=${encodeURIComponent(!st || /^tab_/.test(st) ? "idle" : st)}`;
    if (page === "/start") return `/start?preview=1${st ? "#" + encodeURIComponent(st) : ""}`;
    if (page === "/") return "/?preview=1";
    return null; // only our own pages go in the frame
  }
  const HEAT_INK = "#141414", HEAT_DEAD = "#D9822B", HEAT_RAGE = "#D43A2F";
  const heat = { points: [], box: null, frame: null, canvas: null, ro: null, url: null, desk: null, n: 0, gen: 0 };
  async function renderTaps(d, c) {
    const top = arr(d.top), rage = arr(d.rage), dead = arr(d.dead), screens = arr(d.screens);
    const tables = `<div class="stack">
      ${card("Top taps", `What people tapped most ${RANGE_WORDS[S.range]}`, table([{ h: "Page" }, { h: "Target" }, { h: "Taps", n: true }, { h: "People", n: true }],
        top.map((t) => [esc(pageLabel(t[0])), trunc(t[1], 360), esc(fmt(t[2])), esc(fmt(t[3]))]), { empty: `No taps ${RANGE_WORDS[S.range]} yet.` }))}
      <div class="grid g2">
        ${card("Rage taps", "Three or more quick taps in one spot", table([{ h: "Where" }, { h: "Target" }, { h: "Count", n: true }],
          rage.map((t) => [esc(where(t[0], t[1])), trunc(t[2], 240), esc(fmt(t[3]))]), { empty: `No rage taps ${RANGE_WORDS[S.range]}.` }))}
        ${card("Dead taps", "Taps on things that don't respond", table([{ h: "Where" }, { h: "Target" }, { h: "Count", n: true }],
          dead.map((t) => [esc(where(t[0], t[1])), trunc(t[2], 240), esc(fmt(t[3]))]), { empty: `No dead taps ${RANGE_WORDS[S.range]}.` }))}
      </div></div>`;
    if (!$("tapsTables")) {
      view.innerHTML = `<div class="stack"><div id="tapsTables"></div><section class="card" id="heatCard"><h2>Heat map</h2><p class="sub">Where people tapped on one screen, drawn over that screen with a sample profile</p><div id="heatBody"></div></section></div>`;
      heat.box = heat.frame = heat.canvas = null; heat.url = null;
    }
    $("tapsTables").innerHTML = tables;
    const body = $("heatBody");
    if (!screens.length) {
      body.innerHTML = empty(`No taps with a position ${RANGE_WORDS[S.range]} yet.`);
      heat.box = heat.frame = heat.canvas = null; heat.url = null;
      return;
    }
    const keyOf = (s) => JSON.stringify([s[0] || "", s[1] || ""]);
    if (!ui.heatKey || !screens.some((s) => keyOf(s) === ui.heatKey)) ui.heatKey = keyOf(screens[0]);
    const opts = screens.map((s) => `<option value="${esc(keyOf(s))}"${keyOf(s) === ui.heatKey ? " selected" : ""}>${esc(`${where(s[0], s[1] || "")} (${fmt(s[2])})`)}</option>`).join("");
    let sel = $("heatSel");
    if (!sel) {
      body.innerHTML = `<div class="row">
          <label class="vh" for="heatSel">Screen</label><select id="heatSel" data-k="heatSel"></select>
          <div class="seg" role="group" aria-label="Device"><button type="button" data-dev="phone" data-k="dev:phone">Phone</button><button type="button" data-dev="desk" data-k="dev:desk">Laptop</button></div>
        </div>
        <div class="heat" id="heatWrap"><div class="phone" id="heatBox"></div><div class="side"><div class="legend" id="heatLegend"></div><p class="small muted" id="heatCount" style="margin:0"></p><p class="note" id="heatNote" style="margin:0"></p></div></div>`;
      sel = $("heatSel");
      sel.addEventListener("change", () => { ui.heatKey = sel.value; loadHeat(); });
      body.querySelector(".seg").addEventListener("click", (e) => { const b = e.target.closest("[data-dev]"); if (!b) return; ui.heatDesk = b.dataset.dev === "desk"; setupFrame(); drawHeat(); });
    }
    if (sel.dataset.sig !== opts) { sel.innerHTML = opts; sel.dataset.sig = opts; }
    sel.value = ui.heatKey;
    await loadHeat(c);
  }
  const heatPick = () => { try { const a = JSON.parse(ui.heatKey || "[]"); return [String(a[0] || ""), String(a[1] || "")]; } catch { return ["", ""]; } };
  async function loadHeat(c) {
    const [page, state] = heatPick();
    const my = ++heat.gen;
    setupFrame();
    try {
      const d = await data("heat", rangeArgs({ page, state }), c && c.signal);
      if (my !== heat.gen) return;
      heat.points = arr(d.points); heat.n = n0(d.n);
      drawHeat();
    } catch (e) {
      if (e instanceof AuthError || (e && e.name === "AbortError")) throw e;
      if (my !== heat.gen) return;
      heat.points = []; heat.n = 0;
      const cnt = $("heatCount"); if (cnt) cnt.textContent = "Couldn't load the taps for this screen.";
      if (c) throw e;
    }
  }
  function setupFrame() {
    const box = $("heatBox"); if (!box) return;
    const [page, state] = heatPick();
    const desk = !!ui.heatDesk, url = PREVIEW_PAGES.has(page) ? previewUrl(page, state) : null;
    document.querySelectorAll("#heatBody [data-dev]").forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.dev === "desk") === desk)));
    box.className = desk ? "phone desk" : "phone";
    $("heatWrap").classList.toggle("wide", desk);
    if (heat.box !== box || heat.url !== url || heat.desk !== desk) {
      if (heat.ro) heat.ro.disconnect();
      box.innerHTML = "";
      heat.frame = null;
      if (url) {
        const f = document.createElement("iframe");
        f.src = url; f.title = `Preview of ${where(page, state)}`; f.tabIndex = -1; f.setAttribute("aria-hidden", "true");
        f.setAttribute("sandbox", "allow-scripts allow-same-origin"); f.setAttribute("referrerpolicy", "same-origin");
        box.appendChild(f); heat.frame = f;
      }
      const cv = document.createElement("canvas"); cv.setAttribute("aria-hidden", "true");
      box.appendChild(cv);
      heat.box = box; heat.canvas = cv; heat.url = url; heat.desk = desk;
      let w = 0;
      heat.ro = new ResizeObserver(() => { if (Math.abs(box.clientWidth - w) > 1) { w = box.clientWidth; drawHeat(); } });
      heat.ro.observe(box);
      cleanups.push(() => { if (heat.ro) heat.ro.disconnect(); heat.ro = null; heat.box = null; });
    }
    const note = $("heatNote");
    if (note) {
      const bits = [];
      if (page === "/") bits.push("Landing taps are placed by where they were on screen, not on the page, so they're approximate.");
      if (page === "/app" && /^tab_/.test(state || "")) bits.push(`The ${String(state).slice(4)} tab can't be opened on its own, so the main screen is shown behind these taps.`);
      if (!url) bits.push("There's no preview for this page, so the taps are drawn on a blank screen.");
      bits.push("Positions are a share of each visitor's screen, so different screen sizes line up only roughly.");
      note.textContent = bits.join(" ");
    }
  }
  function drawHeat() {
    const box = heat.box, cv = heat.canvas; if (!box || !cv || !box.isConnected) return;
    const desk = !!ui.heatDesk, W0 = desk ? 1440 : 390, H0 = desk ? 900 : 844;
    const cs = getComputedStyle(box), bt = parseFloat(cs.borderTopWidth) || 0, bb = parseFloat(cs.borderBottomWidth) || 0;
    const w = box.clientWidth; if (!w) return;
    const s = w / W0, cw = W0 * s, ch = H0 * s;
    box.style.aspectRatio = "auto"; box.style.height = `${ch + bt + bb}px`;
    if (heat.frame) { Object.assign(heat.frame.style, { width: `${W0}px`, height: `${H0}px`, transform: `scale(${s})` }); }
    Object.assign(cv.style, { width: `${cw}px`, height: `${ch}px`, right: "auto", bottom: "auto" });
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr);
    const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cw, ch);
    const pts = heat.points.filter((p) => (p[3] === "desktop") === desk);
    const ink = HEAT_INK, warn = HEAT_DEAD, red = HEAT_RAGE; // the previewed pages are light-only, so fixed colours
    const r = Math.max(4, (desk ? 18 : 11) * s * (desk ? 1 : 1.6));
    const counts = [0, 0, 0];
    ctx.globalCompositeOperation = "source-over";
    for (const kind of [0, 1, 2]) {
      for (const p of pts) {
        if (n0(p[2]) !== kind) continue;
        const x = (n0(p[0]) / 100) * cw, y = (n0(p[1]) / 100) * ch;
        if (x < -r || y < -r || x > cw + r || y > ch + r) continue;
        counts[kind]++;
        ctx.beginPath(); ctx.arc(x, y, kind === 2 ? r * 1.2 : r, 0, Math.PI * 2);
        if (kind === 2) { ctx.globalAlpha = 0.85; ctx.lineWidth = 2; ctx.strokeStyle = red; ctx.stroke(); }
        else { ctx.globalAlpha = kind === 1 ? 0.35 : 0.18; ctx.fillStyle = kind === 1 ? warn : ink; ctx.fill(); }
      }
    }
    ctx.globalAlpha = 1;
    const other = heat.points.length - pts.length;
    const leg = $("heatLegend");
    if (leg) leg.innerHTML = `<span><i style="background:${ink};box-shadow:0 0 0 1px var(--ink3)"></i>Tap ${esc(fmt(counts[0]))}</span><span><i style="background:${warn}"></i>Dead tap ${esc(fmt(counts[1]))}</span><span><i class="ring"></i>Rage tap ${esc(fmt(counts[2]))}</span>`;
    const cnt = $("heatCount");
    if (cnt) {
      const dev = desk ? "laptop" : "phone", alt = desk ? "phone" : "laptop";
      cnt.textContent = !heat.points.length ? `No taps on this screen ${RANGE_WORDS[S.range]}.`
        : !pts.length ? `No ${dev} taps on this screen. ${plural(other, alt + " tap")} — switch to ${alt === "laptop" ? "Laptop" : "Phone"} to see them.`
        : `${plural(pts.length, dev + " tap")} on this screen${other ? `, plus ${fmt(other)} on ${alt === "laptop" ? "laptops" : "phones"}` : ""}${heat.n >= 4000 ? " (the latest 4,000)" : ""}.`;
    }
  }

  // ------------------------------------------------------------------ Visitors and the visitor drawer
  const STAGE_TAG = { "saw suggestion": "m", "finished tour": "m" };
  function visitorRows(list) {
    const q = ui.q.trim().toLowerCase();
    const shown = q ? list.filter((v) => [v.name, v.city, v.region, v.country, v.ip, v.device, v.os, v.browser, v.visitor].some((x) => x && String(x).toLowerCase().includes(q))) : list;
    const cols = [{ h: "Name" }, { h: "Stage" }, { h: "Role" }, { h: "Wearable" }, { h: "Place" }, { h: "Device" }, { h: "Sessions", n: true }, { h: "Events", n: true },
      { h: "Minutes", n: true }, { h: "First seen" }, { h: "Last seen" }, { h: "QR" }, { h: "Errors", n: true }];
    const rows = shown.map((v) => [
      v.name ? esc(v.name) : `<span class="muted">—</span> <span class="tiny muted mono">${esc(shortId(v.visitor))}</span>`,
      tag(v.stage || "landing only", STAGE_TAG[v.stage] || ""),
      esc(v.role ? roleLabel(v.role) : "—"), esc(v.wearable ? wearLabel(v.wearable) : "—"),
      esc([v.city, v.region].filter(Boolean).join(", ") || "—"),
      esc([v.device, v.os, v.browser].filter(Boolean).join(" · ") || "—"),
      esc(fmt(v.sessions)), esc(fmt(v.events)), esc(v.minutes == null ? "—" : fmt(v.minutes, 1)),
      `<span style="white-space:nowrap">${esc(when(v.first))}</span>`, `<span style="white-space:nowrap">${esc(ago(v.last))}</span>`,
      v.qr ? tag("QR", "m") : "", n0(v.errors) ? tag(fmt(v.errors), "w") : esc("0"),
    ]);
    const msg = list.length ? `Nobody matches "${ui.q.trim()}".` : `No visitors ${RANGE_WORDS[S.range]} yet.`;
    return { html: table(cols, rows, { empty: msg, rowAttr: (i) => ` class="click" tabindex="0" data-k="v:${esc(shown[i].visitor)}" data-vis="${esc(shown[i].visitor)}"` }), n: shown.length };
  }
  function renderVisitors(d) {
    ui.visitors = arr(d).map(obj);
    if (!$("vq")) {
      view.innerHTML = `<section class="card"><h2>Visitors</h2><p class="sub" id="vsub"></p>
        <div class="row"><label class="vh" for="vq">Search visitors</label><input type="search" id="vq" data-k="vq" placeholder="Search name, city, IP or device" autocomplete="off" spellcheck="false"></div>
        <div id="vt"></div></section>`;
      $("vq").value = ui.q;
      $("vq").addEventListener("input", (e) => { ui.q = e.target.value; paint(); });
    }
    function paint() {
      const r = visitorRows(ui.visitors);
      $("vt").innerHTML = r.html;
      $("vsub").textContent = ui.visitors.length ? `${plural(ui.visitors.length, "person", "people")} ${RANGE_WORDS[S.range]}${ui.q.trim() ? `, ${fmt(r.n)} shown` : ""}${ui.visitors.length >= 500 ? " (the latest 500)" : ""}. Tap a row for their timeline.` : `Everyone who visited ${RANGE_WORDS[S.range]}.`;
    }
    paint();
  }
  // open a visitor's drawer from any row with data-vis (Visitors table, or the live list on Pulse)
  function rowOpen(e) {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    const tr = e.target.closest("tr[data-vis]"); if (!tr || !view.contains(tr)) return;
    if (e.type === "keydown") e.preventDefault();
    const id = tr.dataset.vis;
    const known = ui.visitors.find((v) => v.visitor === id);
    openVisitor(known || { visitor: id }, tr);
  }
  view.addEventListener("click", rowOpen);
  view.addEventListener("keydown", rowOpen);

  const HIDDEN_EVENTS = new Set(["movement", "hb"]);
  function evDetail(e) {
    const bits = [];
    const w = where(e.page, e.state);
    if (w) bits.push(esc(w));
    if (e.target) bits.push(`<span class="d">${esc(e.target)}</span>`);
    if (e.value != null && e.value !== "" && !(e.event === "screen_view" && e.value === e.state)) bits.push(`<span class="d">${esc(e.value)}</span>`);
    if (e.dwell != null && ["screen_leave", "attention", "tab_hidden", "page_exit", "active"].includes(e.event)) bits.push(`<span class="d">${esc(dur(n0(e.dwell) / 1000))}</span>`);
    if (e.scroll != null && ["screen_leave", "scroll_depth", "scroll", "page_exit"].includes(e.event)) bits.push(`<span class="d">scroll ${esc(fmt(e.scroll))}%</span>`);
    if (e.x != null && e.y != null && /tap/.test(e.event || "")) bits.push(`<span class="d">at ${esc(fmt(e.x, 1))}%, ${esc(fmt(e.y, 1))}%</span>`);
    return bits.join(" · ") || `<span class="d">—</span>`;
  }
  function timeline(events) {
    if (!events.length) return empty("No events for this visitor.");
    const shown = ui.showMove ? events : events.filter((e) => !HIDDEN_EVENTS.has(e.event));
    if (!shown.length) return empty("Only movement and heartbeats so far.");
    const groups = [], by = new Map();
    for (const e of shown) {
      const k = e.session || "—";
      if (!by.has(k)) { const g = { k, list: [] }; by.set(k, g); groups.push(g); }
      by.get(k).list.push(e);
    }
    return `<div class="tl">${groups.map((g) => {
      const first = g.list[g.list.length - 1], last = g.list[0];
      return `<div class="ses">Session ${esc(shortId(g.k))} · ${esc(when(first.at))} to ${esc(tShort(last.at))} · ${esc(plural(g.list.length, "event"))}</div>${g.list.map((e) => `<div class="ev"><span class="mono tiny">${esc(tSec(e.at))}</span><span class="k">${esc(e.event || "—")}</span><span>${evDetail(e)}</span></div>`).join("")}`;
    }).join("")}</div>`;
  }
  async function openVisitor(v, opener) {
    const id = v.visitor;
    const title = v.name ? String(v.name) : `Visitor ${shortId(id)}`;
    openDrawer(`<div class="hd"><h2 id="dTitle">${esc(title)}</h2><button class="iconbtn" type="button" data-close>Close</button></div>
      <dl class="sum" id="dSum"></dl>
      <label class="chk" style="margin:0 0 6px"><input type="checkbox" id="dMove"${ui.showMove ? " checked" : ""}> <span id="dMoveL">Show movement and heartbeats</span></label>
      <div id="dTl"><p class="empty">Loading their timeline…</p></div>`, opener, "dTitle");
    panel.dataset.vis = id; // a late answer for someone else is dropped
    const sum = (latest) => {
      const s = Object.assign({}, latest || {}, Object.fromEntries(Object.entries(v).filter(([, x]) => x != null && x !== "")));
      const rows = [
        ["IP", s.ip], ["Place", [s.city, s.region, s.country].filter(Boolean).join(", ")], ["Device", [s.device, s.os, s.browser].filter(Boolean).join(" · ")],
        ["Viewport", s.viewport], ["Stage", s.stage], ["Role", s.role ? roleLabel(s.role) : ""], ["Wearable", s.wearable ? wearLabel(s.wearable) : ""],
        ["First seen", s.first ? when(s.first) : ""], ["Last seen", s.last ? `${when(s.last)} (${ago(s.last)})` : ""],
        ["Visits", s.sessions != null ? `${plural(s.sessions, "session")} · ${plural(s.events, "event")}` : ""], ["Visitor id", id],
      ].filter((r) => r[1]);
      const el = $("dSum"); if (el) el.innerHTML = rows.map((r) => `<dt>${esc(r[0])}</dt><dd${r[0] === "IP" || r[0] === "Visitor id" ? ' class="mono tiny"' : ""}>${esc(r[1])}</dd>`).join("");
    };
    sum(null);
    let events = [];
    const paint = () => {
      const tl = $("dTl"); if (!tl) return;
      const hidden = events.filter((e) => HIDDEN_EVENTS.has(e.event)).length;
      $("dMoveL").textContent = `Show movement and heartbeats${hidden ? ` (${fmt(hidden)})` : ""}`;
      tl.innerHTML = timeline(events) + (events.length >= 1500 ? `<p class="note">Showing their latest 1,500 events.</p>` : "");
    };
    $("dMove").addEventListener("change", (e) => { ui.showMove = e.target.checked; paint(); });
    try {
      const d = await data("visitor", { visitor: id, tests: S.tests });
      if (!$("dTl") || $("panel").dataset.vis !== id) return;
      events = arr(d.events).map(obj);
      const latest = events.find((e) => e.ip || e.device) || null;
      if (!v.name) { const nm = events.find((e) => e.name); if (nm) $("dTitle").textContent = nm.name; }
      sum(latest);
      paint();
    } catch (e) {
      if (e instanceof AuthError) return;
      const tl = $("dTl"); if (tl) tl.innerHTML = empty("Couldn't load their timeline. Close and try again.");
    }
  }

  // ------------------------------------------------------------------ the drawer
  const drawer = $("drawer"), panel = $("panel");
  let opener = null;
  function openDrawer(html, from, labelId) {
    opener = from || document.activeElement;
    panel.innerHTML = html;
    delete panel.dataset.vis;
    if (labelId) { panel.setAttribute("aria-labelledby", labelId); panel.removeAttribute("aria-label"); }
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
    const f = panel.querySelector("[data-close]"); if (f) f.focus();
  }
  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.hidden = true; panel.innerHTML = ""; delete panel.dataset.vis;
    document.body.style.overflow = "";
    if (opener && opener.isConnected) opener.focus();
    else if (opener && opener.dataset && opener.dataset.k) { const el = [...view.querySelectorAll("[data-k]")].find((x) => x.dataset.k === opener.dataset.k); if (el) el.focus(); }
    opener = null;
  }
  drawer.addEventListener("click", (e) => { if (e.target === drawer || e.target.closest("[data-close]")) closeDrawer(); });
  document.addEventListener("keydown", (e) => {
    if (drawer.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeDrawer(); return; }
    if (e.key === "Tab") { // keep focus inside the drawer
      const f = [...panel.querySelectorAll("button,input,select,textarea,a[href],[tabindex]:not([tabindex='-1'])")].filter((x) => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ------------------------------------------------------------------ Devices and places
  function renderDevices(d) {
    const dev = arr(d.devices), vps = arr(d.viewports), places = arr(d.places), src = arr(d.sources), prefs = obj(d.prefs);
    const devT = table([{ h: "Device" }, { h: "OS" }, { h: "Browser" }, { h: "People", n: true }],
      dev.map((r) => [esc(r[0] || "—"), esc(r[1] || "—"), esc(r[2] || "—"), esc(fmt(r[3]))]), { empty: `No visitors ${RANGE_WORDS[S.range]} yet.` });
    const vpB = bars(vps.map((r) => ({ label: r[0] ? String(r[0]).replace("x", " × ") : "Unknown", n: n0(r[1]), val: plural(r[1], "person", "people") })), { empty: `No visitors ${RANGE_WORDS[S.range]} yet.` });
    const placeT = table([{ h: "City" }, { h: "Region" }, { h: "Country" }, { h: "People", n: true }],
      places.map((r) => [esc(r[2] || "—"), esc(r[1] || "—"), esc(r[0] || "—"), esc(fmt(r[3]))]), { empty: `No visitors ${RANGE_WORDS[S.range]} yet.` });
    const srcB = bars(src.map((r) => ({ label: String(r[0] || "Unknown"), n: n0(r[1]), val: plural(r[1], "person", "people") })), { mint: true, empty: `No page views ${RANGE_WORDS[S.range]} yet.` });
    view.innerHTML = `<div class="stack">
      <div class="kpis">${kpi("Use dark mode", fmt(prefs.dark), false, "people")}${kpi("Reduce motion", fmt(prefs.reduce_motion), false, "people")}${kpi("Came back", fmt(prefs.returning), false, "people seen before on this browser")}</div>
      <div class="grid g2">
        ${card("Devices", "People by device, system and browser", devT)}
        ${card("How they arrived", "QR code, typed or bookmarked, or a link from another site", srcB)}
        ${card("Places", "From the IP address, so it's approximate", placeT)}
        ${card("Screen sizes", "Browser window sizes in CSS pixels", vpB)}
      </div>
    </div>`;
  }

  // ------------------------------------------------------------------ Health
  const lcpTag = (ms) => { const n = num(ms); return n === null ? "" : n <= 2500 ? tag("good", "m") : n <= 4000 ? tag("ok") : tag("poor", "w"); };
  const clsTag = (v) => { const n = num(v); return n === null ? "" : n <= 0.1 ? tag("good", "m") : n <= 0.25 ? tag("ok") : tag("poor", "w"); };
  function renderHealth(d) {
    const lcp = arr(d.lcp), cls = arr(d.cls), slow = arr(d.slow), load = arr(d.load), errors = arr(d.errors);
    const ms = (v) => (num(v) === null ? "—" : `${fmt(Math.round(num(v)))} ms`);
    const lcpT = table([{ h: "Page" }, { h: "p50", n: true }, { h: "p75", n: true }, { h: "" }, { h: "Samples", n: true }],
      lcp.map((r) => [esc(pageLabel(r[0])), esc(ms(r[1])), esc(ms(r[2])), lcpTag(r[2]), esc(fmt(r[3]))]), { empty: `No page loads measured ${RANGE_WORDS[S.range]} yet.` });
    const clsT = table([{ h: "Page" }, { h: "p75", n: true }, { h: "" }, { h: "Samples", n: true }],
      cls.map((r) => [esc(pageLabel(r[0])), esc(fmt(r[1], 3)), clsTag(r[1]), esc(fmt(r[2]))]), { empty: `No layout shift measured ${RANGE_WORDS[S.range]} yet.` });
    const loadT = table([{ h: "Page" }, { h: "p50", n: true }, { h: "Samples", n: true }],
      load.map((r) => [esc(pageLabel(r[0])), esc(ms(r[1])), esc(fmt(r[2]))]), { empty: `No page loads measured ${RANGE_WORDS[S.range]} yet.` });
    const slowT = table([{ h: "Page" }, { h: "Interaction" }, { h: "Count", n: true }, { h: "Slowest", n: true }],
      slow.map((r) => [esc(pageLabel(r[0])), trunc(r[1], 200), esc(fmt(r[2])), esc(ms(r[3]))]), { empty: `No interactions slower than 100 ms ${RANGE_WORDS[S.range]}.` });
    const errT = table([{ h: "Message" }, { h: "Where" }, { h: "Count", n: true }, { h: "People", n: true }, { h: "Last seen" }],
      errors.map((r) => [trunc(r[0], 320), trunc(r[1], 160), esc(fmt(r[2])), esc(fmt(r[4])), `<span style="white-space:nowrap">${esc(when(r[3]))}</span>`]), { empty: `No JS errors ${RANGE_WORDS[S.range]}.` });
    const errCount = errors.reduce((a, r) => a + n0(r[2]), 0);
    view.innerHTML = `<div class="stack">
      <div class="kpis">${kpi("JS errors", fmt(errCount), errCount > 0)}${kpi("Turned analytics off", fmt(d.opted_out), false, "people")}</div>
      <div class="grid g2">
        ${card("Largest paint (LCP)", "Time until the main content showed. Good is 2,500 ms or less at p75; over 4,000 ms is poor.", lcpT)}
        ${card("Layout shift (CLS)", "How much the page jumped while loading. Good is 0.1 or less at p75.", clsT)}
        ${card("Full load", "Time until the page finished loading, median", loadT)}
        ${card("Slow interactions", "Taps and keys that took over 100 ms to respond", slowT)}
      </div>
      ${card("JS errors", "Grouped by message and file", errT)}
    </div>`;
  }

  const RENDER = { pulse: renderPulse, funnel: renderFunnel, screens: renderScreens, tour: renderTour, taps: renderTaps, visitors: renderVisitors, devices: renderDevices, health: renderHealth };

  // ------------------------------------------------------------------ Export CSV
  const CSV_HEAD = ["received_at", "ip", "country", "region", "city", "visitor", "session", "name", "device", "os", "browser", "screen", "viewport", "event", "page", "state", "target", "x", "y", "scroll", "dwell", "value", "client_time", "seq", "referrer", "extra"];
  function csvCell(v) {
    let s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // a spreadsheet would run it as a formula
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  async function exportCsv() {
    const btn = $("export");
    if (btn.disabled) return;
    btn.disabled = true; const label = btn.textContent; btn.textContent = "Exporting…";
    try {
      const rows = arr(await data("export", rangeArgs()));
      const csv = "﻿" + [CSV_HEAD.join(",")].concat(rows.map((r) => arr(r).map(csvCell).join(","))).join("\r\n") + "\r\n";
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url; a.download = `halftime-analytics-${S.range}-${F_YMD.format(new Date())}.csv`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      $("stext").textContent = `Exported ${plural(rows.length, "event")}${rows.length >= 50000 ? " (the newest 50,000)" : ""}.`;
    } catch (e) {
      if (!(e instanceof AuthError)) { console.error("[admin]", e); $("sdot").className = "dot off"; $("stext").textContent = "Couldn't export. Try again in a moment."; }
    } finally { btn.disabled = false; btn.textContent = label; }
  }

  // ------------------------------------------------------------------ password
  let me = "";
  function openPassword() {
    openDrawer(`<div class="hd"><h2 id="pwTitle">Change password</h2><button class="iconbtn" type="button" data-close>Close</button></div>
      <form class="pw" id="pwForm" novalidate>
        <input type="text" name="username" autocomplete="username" value="${esc(me)}" hidden>
        <label>Current password<input type="password" id="pwOld" autocomplete="current-password" required></label>
        <label>New password<input type="password" id="pwNew" autocomplete="new-password" minlength="12" required aria-describedby="pwHint"></label>
        <label>New password again<input type="password" id="pwRep" autocomplete="new-password" minlength="12" required></label>
        <p class="tiny muted" id="pwHint" style="margin:0">At least 12 characters. Other signed-in devices will be signed out.</p>
        <p class="err" id="pwErr" role="alert"></p>
        <button class="btn" type="submit">Change password</button>
      </form>`, $("pwbtn"), "pwTitle");
    $("pwForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = $("pwErr"), btn = e.target.querySelector("button[type=submit]");
      const old = $("pwOld").value, nw = $("pwNew").value, rep = $("pwRep").value;
      err.className = "err";
      if (!old) { err.textContent = "Type your current password."; $("pwOld").focus(); return; }
      if (nw.length < 12) { err.textContent = "Use at least 12 characters for the new password."; $("pwNew").focus(); return; }
      if (nw !== rep) { err.textContent = "The new passwords don't match."; $("pwRep").focus(); return; }
      btn.disabled = true; err.textContent = "";
      try {
        const r = await call("password", { old, new: nw });
        if (r.status === 401) { closeDrawer(); showLogin(); return; }
        if (r.data.ok) {
          e.target.reset(); err.className = "ok";
          err.textContent = "Password changed. Other devices were signed out.";
        } else {
          err.textContent = r.data.error === "wrong" ? "Your current password is wrong." : r.data.error === "short" ? "Use at least 12 characters for the new password." : "Couldn't change it. Try again in a moment.";
        }
      } catch { err.textContent = "Couldn't reach the server. Try again in a moment."; }
      finally { btn.disabled = false; }
    });
  }

  // ------------------------------------------------------------------ sign in and out
  function showLogin(msg) {
    signedIn = false; stop(); unmount(); closeDrawer();
    view.innerHTML = ""; delete view.dataset.v;
    $("app").hidden = true; $("login").hidden = false;
    $("loginErr").textContent = msg || "";
    const u = $("user"); if (u && !u.value) u.focus(); else $("pass").focus();
  }
  function showApp(user) {
    signedIn = true; if (user) me = String(user);
    $("login").hidden = true; $("app").hidden = false;
    $("logout").title = me ? `Signed in as ${me}` : "";
    readHash(); writeHash(); syncControls();
    load(true);
  }
  $("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button[type=submit]"), err = $("loginErr");
    const user = $("user").value.trim(), pass = $("pass").value;
    if (!user || !pass) { err.textContent = "Type your username and password."; return; }
    btn.disabled = true; err.textContent = "";
    try {
      const r = await call("login", { user, pass });
      if (r.status === 200 && r.data.ok) { $("pass").value = ""; showApp(r.data.user || user); return; }
      err.textContent = r.data.error === "locked" ? "Too many tries. Wait 15 minutes."
        : r.data.error === "setup" ? (r.data.message || "The analytics database isn't connected yet.")
        : r.data.error === "wrong" ? "Wrong username or password." : "Couldn't sign in. Try again in a moment.";
      $("pass").select();
    } catch { err.textContent = "Couldn't reach the server. Try again in a moment."; }
    finally { btn.disabled = false; }
  });
  $("logout").addEventListener("click", async () => {
    try { await call("logout"); } catch { /* signed out locally either way */ }
    $("user").value = ""; $("pass").value = "";
    showLogin();
  });
  $("pwbtn").addEventListener("click", openPassword);
  $("export").addEventListener("click", exportCsv);

  // ------------------------------------------------------------------ header controls
  $("range").addEventListener("click", (e) => {
    const b = e.target.closest("[data-r]"); if (!b || b.dataset.r === S.range) return;
    S.range = b.dataset.r; writeHash(); syncControls(); load(true);
  });
  $("tests").addEventListener("change", (e) => { S.tests = e.target.checked; writeHash(); syncControls(); load(true); });
  $("tabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-v]"); if (!b || b.dataset.v === S.view) return;
    S.view = b.dataset.v; writeHash(); syncControls(); closeDrawer();
    if (scrollY > 0) scrollTo(0, 0);
    load(true);
  });
  addEventListener("hashchange", () => {
    const before = `${S.view}/${S.range}/${S.tests}`;
    readHash(); syncControls();
    if (signedIn && before !== `${S.view}/${S.range}/${S.tests}`) load(true);
  });

  // On a phone the header wraps to four rows; let the controls scroll away and keep only the tabs pinned.
  const hdr = document.querySelector("header"), nav = $("tabs");
  if (hdr && nav && "ResizeObserver" in window) {
    const fit = () => {
      const off = Math.round(nav.getBoundingClientRect().top - hdr.getBoundingClientRect().top - 6);
      hdr.style.top = off > 60 ? `${-off}px` : "";
    };
    new ResizeObserver(fit).observe(hdr);
  }

  // ------------------------------------------------------------------ start: am I signed in?
  readHash(); syncControls();
  (async () => {
    try {
      const r = await call("data", { view: "me", args: {} });
      if (r.status === 200 && !r.data.error) showApp(r.data.user);
      else showLogin(r.status === 503 ? r.data.message || "The analytics database isn't connected yet." : "");
    } catch {
      showLogin("Couldn't reach the server. Check your connection and reload.");
    }
  })();
})();
