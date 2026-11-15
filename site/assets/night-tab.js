/* Halftime: the Night tab (added 2026-11-14, Heramb). Last night from a WHOOP 4.0, in three numbers against your usual.
 * Design: design/mockups/night-tab/ (direction A "the night, drawn", with B's one-line sentences). Bare minimum on purpose:
 * one sentence, what it changes today, the night on a clock, three rows. No scores, stages, colours as verdicts.
 *
 * Reading the band needs Chrome or Edge on a computer (Web Bluetooth). On a phone the tab explains that and offers a
 * labelled sample night. Readings and nights stay in this browser; nothing here is sent to the server.
 * QA: /app?night=ok|usual|confirm|learning|nodata|connect|nobt|phone|syncing|error shows that state with sample data.
 */
(function () {
  "use strict";
  const root = document.getElementById("night"); if (!root) return;
  const NT = window.HalftimeNight, WB = window.HalftimeWhoop;
  const Q = new URLSearchParams(location.search);
  const QA = /^(ok|usual|confirm|learning|nodata|connect|nobt|phone|syncing|error)$/.test(Q.get("night") || "") ? Q.get("night") : null;
  const COMPUTER = !/iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) && !(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const MIN = 60000;
  let FORCE = null; // QA only: { computer, bt }
  const isComputer = () => (FORCE ? FORCE.computer : COMPUTER);
  const hasBT = () => (FORCE ? FORCE.bt : !!(WB && WB.supported()));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const clock = (ms) => NT.clockText(ms);
  const dur = (min) => { min = Math.round(min); return `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")} min`; };
  const durShort = (min) => { min = Math.round(min / 10) * 10; return min < 60 ? `${min} min` : min % 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min / 60} h`; };
  const hm = (min) => { min = Math.round(min); return `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}`; };
  const ownerKey = () => { try { return typeof PROFILE !== "undefined" ? String(PROFILE.name || "") + "|" + String(PROFILE.created || "") : ""; } catch { return ""; } };
  const ev = (type, value, extra) => { if (QA || !window.HT || !HT.isRecording || !HT.isRecording()) return; HT.event(type, { value, extra: extra || {} }); };

  let sample = null;      // a sample state the person opened ("See a sample night"), or the QA state
  let syncing = null;     // { stage, records } while a sync runs
  let stopAsked = false, lastErr = null, lastNote = null, editing = false, editErr = "";
  let shown = false;

  // ---------- a sample night, made by the same calculator from made-up readings (labelled Sample data on screen)
  function sampleData(state) {
    let seed = 11; const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    const g = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    const today = NT.dateKey(new Date()), prev = NT.addDays(today, -1);
    const at = (key, h, m) => { const [y, mo, d] = key.split("-").map(Number); return new Date(y, mo - 1, d, h, m).getTime(); };
    const spec = { ok: [0, 40, 6, 30, 54, 61], confirm: [0, 40, 6, 30, 54, 61], usual: [0, 10, 7, 15, 52, 66], learning: [-1, 55, 6, 50, 55, 58], nodata: [0, 40, 6, 30, 54, 61] }[state] || [0, 40, 6, 30, 54, 61];
    const [bh, bm, wh, wm, rhr, rmssd] = spec;
    const tBed = bh < 0 ? at(prev, 23, bm) : at(today, bh, bm), tWake = at(today, wh, wm);
    const from = state === "nodata" ? at(today, 1, 10) : at(prev, 21, 30), to = state === "nodata" ? at(today, 3, 20) : at(today, 9, 30);
    const samples = [];
    for (let t = from; t < to; t += 1000) {
      const asleep = t >= tBed && t < tWake, x = (t - tBed) / (tWake - tBed), m = (t - tBed) / MIN;
      let hr = asleep ? rhr + 32 * (x - 0.6) ** 2 + 9 * Math.exp(-m / 8) + g() * 1.2 : 74 + g() * 6;
      hr = Math.max(42, Math.min(140, hr));
      const base = 60000 / hr, rr = [];
      for (let k = 0, acc = 0; acc < 1000 && k < 4; k++) { const r = Math.round(asleep ? base + g() * rmssd / Math.SQRT2 : base + g() * 25); rr.push(r); acc += r; }
      samples.push({ t: Math.floor(t / 1000), hr: Math.round(hr), rr });
    }
    const night = NT.computeNight(samples, today);
    night.confirmed = state !== "confirm";
    const nPrior = state === "learning" ? 3 : 21, prior = [];
    const hrHome = night.rhr || 54, hrvHome = night.hrv || 62;
    for (let i = 1; i <= nPrior; i++) {
      const d = NT.addDays(today, -i), b = at(d, 0, 5 + Math.round(g() * 20)), w = at(d, 7, 15 + Math.round(g() * 20));
      prior.push({ ok: true, date: d, bed: b, wake: w, sleepMin: (w - b) / MIN, rhr: Math.round(hrHome + g() * 1.5), hrv: Math.round(hrvHome + g() * 5) });
    }
    return { nights: [...prior.reverse(), night], meta: { lastSync: at(today, 7, 42), device: "WHOOP 4.0", battery: 82 } };
  }

  // ---------- the pieces
  function header(n, m, isSample) {
    const d = n ? new Date(n.wake || NT.windowFor(n.date).to) : new Date();
    const prevDay = new Date(d.getTime() - 86400000);
    const days = `${prevDay.toLocaleDateString([], { weekday: "short" })} → ${d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}`;
    const sync = m && m.lastSync ? `<span><b>WHOOP 4.0</b> · synced ${esc(when(m.lastSync))}</span>` : "";
    return `<header class="nt-top"><div><h1>Last night</h1><p class="nt-meta">${n ? `<span>${esc(days)}</span>` : ""}${sync}</p></div>${isSample ? `<span class="nt-sample">Sample data</span>` : ""}</header>${isSample && sample ? `<button class="nt-link nt-close" type="button" data-n="unsample">Close the sample night</button>` : ""}`;
  }
  const sameDay = (ms) => NT.dateKey(new Date(ms)) === NT.dateKey(new Date());
  const when = (ms) => (sameDay(ms) ? "" : new Date(ms).toLocaleDateString([], { weekday: "short" }) + " ") + clock(ms);
  const word = (c, kind, v) => {
    if (kind === "sleep" && v != null && v < 420) return c === "low" ? "Shorter than usual" : c === "high" ? "Longer than usual · under 7 h" : "Under 7 h · your usual lately";
    if (kind === "sleep" && c === "high") return "A full night · longer than usual";
    return c === "low" ? (kind === "sleep" ? "Shorter than usual" : "Lower than usual") : c === "high" ? "Higher than usual" : "Your usual";
  };

  function band(v, u, min, max) {
    const p = (x) => Math.max(0, Math.min(100, ((x - min) / (max - min)) * 100));
    return `<div class="nt-band" aria-hidden="true"><span class="u" style="left:${p(u.lo)}%;width:${Math.max(2, p(u.hi) - p(u.lo))}%"></span><span class="d" style="left:${p(v)}%"></span></div>`;
  }
  const dots = (n) => `<div class="nt-dots" role="img" aria-label="${n} of 7 nights so far">${Array.from({ length: 7 }, (_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</div>`;

  function rowsHtml(n, U) {
    const learning = U.learning;
    const row = (name, val, unit, kind, v, u, min, max, usualText, sentence, missing) => {
      if (missing) return `<div class="nt-row"><div class="nt-rh"><span class="nt-rn">${name}</span><span class="nt-rv nt-none">—</span></div><p class="nt-rs">${sentence}</p></div>`;
      const nth = Math.min(7, U.n + 1); // last night counts as one of the 7
      const meas = learning || !u ? dots(nth) : band(v, u, min, max);
      const w = learning || !u ? `<div class="nt-rw"><b>Learning your usual</b><span>${nth} of 7 nights</span></div>` : `<div class="nt-rw"><b>${word(NT.compare(v, u), kind, v)}</b><span>usual ${usualText}</span></div>`;
      return `<div class="nt-row"><div class="nt-rh"><span class="nt-rn">${name}</span><span class="nt-rv">${val}${unit ? `<small>${unit}</small>` : ""}</span></div>${sentence ? `<p class="nt-rs">${sentence}</p>` : ""}${w}${meas}</div>`;
    };
    const su = U.sleepMin, ru = U.rhr, hu = U.hrv;
    return `<section class="nt-rows" aria-label="Last night's three numbers">
      ${row("Sleep", hm(n.sleepMin), "", "sleep", n.sleepMin, su, 240, 600, su ? `${hm(su.lo)} – ${hm(su.hi)}` : "", "")}
      ${row("Resting heart rate", n.rhr, " bpm", "hr", n.rhr, ru, 35, 85, ru ? `${Math.round(ru.lo)}–${Math.round(ru.hi)} bpm` : "", n.lowAt ? `Your lowest 5 minutes of the night, around ${clock(n.lowAt)}.` : "Your lowest 5 minutes of the night.", n.rhr == null)}
      ${row("HRV", n.hrv, " ms", "hrv", n.hrv, hu, 15, 130, hu ? `${Math.round(hu.lo)}–${Math.round(hu.hi)} ms` : "",
        n.hrv == null ? (n.hrvReason === "few_beats" ? "Not enough beat-to-beat readings last night to work this out." : "The beat-to-beat readings were too uneven last night to trust.") : "How much the time between your heartbeats varied while you slept.", n.hrv == null)}
    </section>`;
  }

  function nightCard(n, U, isSample) {
    const usualBed = U.bedTod != null ? U.bedTod : null, usualWake = U.wakeTod != null ? U.wakeTod : null;
    const day0 = NT.atLocal(n.date, 0); // local midnight of the wake date (right across daylight-saving changes)
    const uBed = usualBed != null ? day0 + usualBed * MIN : null, uWake = usualWake != null ? day0 + usualWake * MIN : null;
    const hour = 60 * MIN;
    const lo = Math.floor((Math.min(n.bed, uBed || n.bed) - hour) / hour) * hour, hi = Math.ceil((Math.max(n.wake, uWake || n.wake) + hour) / hour) * hour;
    const pct = (t) => ((t - lo) / (hi - lo)) * 100;
    const raw = n.hr5 || [], pts = raw.map(([i], k) => { const w = raw.slice(Math.max(0, k - 1), k + 2); return [pct(n.bed + i * MIN + 2.5 * MIN), w.reduce((a, b) => a + b[1], 0) / w.length]; });
    let svg = "";
    if (pts.length > 2) {
      const vals = pts.map((p) => p[1]), mn = Math.min(...vals), mx = Math.max(...vals), y = (v) => 6 + (1 - (v - mn) / (mx - mn || 1)) * 52;
      const path = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${y(p[1]).toFixed(1)}`).join(" ");
      const lp = n.lowAt ? [pct(n.lowAt), n.rhr] : pts.reduce((a, b) => (b[1] < a[1] ? b : a));
      svg = `<svg viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/></svg>
        <span class="nt-lowdot" style="left:${Math.max(0, Math.min(100, lp[0]))}%;top:${y(Math.max(mn, Math.min(mx, lp[1])))}px"></span>`;
    }
    const ticks = []; for (let t = lo; t <= hi; t += 2 * hour) ticks.push(`<span>${clock(t).replace(":00", "").replace(" ", "")}</span>`);
    const aria = `Last night you slept from ${clock(n.bed)} to ${clock(n.wake)}${uBed ? `; usually ${clock(uBed)} to ${clock(uWake)}` : ""}.${n.rhr != null && n.lowAt ? ` Heart rate was lowest, ${n.rhr} beats a minute, around ${clock(n.lowAt)}.` : ""}`;
    let ask;
    if (editing && !isSample) {
      const tv = (ms) => { const d = new Date(ms); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
      ask = `<form class="nt-edit" data-n="edit"><p>When did you sleep?</p><div class="nt-fields"><label>Fell asleep<input type="time" id="nt-bed" value="${tv(n.bed)}" required></label><label>Woke up<input type="time" id="nt-wake" value="${tv(n.wake)}" required></label></div>
        ${editErr ? `<p class="nt-err" role="alert">${esc(editErr)}</p>` : ""}<div class="nt-btns"><button class="nt-btn" type="submit">Save</button><button class="nt-btn ghost" type="button" data-n="edit-cancel">Cancel</button></div></form>`;
    } else if (n.confirmed) ask = `<div class="nt-ask"><p><b>${clock(n.bed)} → ${clock(n.wake)}</b></p><span class="nt-ok">${n.edited ? "You set these times" : "You confirmed this"} · <button type="button" class="nt-link" data-n="change">Change</button></span></div>`;
    else ask = `<div class="nt-ask"><p>Is this when you slept?<br><b>${clock(n.bed)} → ${clock(n.wake)}</b></p><div class="nt-btns"><button class="nt-btn" type="button" data-n="yes">Yes</button><button class="nt-btn ghost" type="button" data-n="change">Change</button></div></div>`;
    return `<section class="nt-card" aria-label="Last night on a clock">
      <div class="nt-cardh"><b>Your night</b><span>heart rate while asleep</span></div>
      <div class="nt-night" role="img" aria-label="${esc(aria)}">
        <div class="nt-lane nt-chart"><span></span><div class="nt-plot">${svg}</div></div>
        <div class="nt-lane"><span>Last night</span><div class="nt-bar"><span class="l" style="left:${pct(n.bed)}%;width:${pct(n.wake) - pct(n.bed)}%"></span></div></div>
        ${uBed ? `<div class="nt-lane"><span>Your usual</span><div class="nt-bar"><span class="u" style="left:${pct(uBed)}%;width:${pct(uWake) - pct(uBed)}%"></span></div></div>` : ""}
        <div class="nt-lane nt-axis"><span></span><div>${ticks.join("")}</div></div>
      </div>
      ${ask}
    </section>`;
  }

  // what last night changes in today's breaks: the same numbers RULE v0 uses (assets/study.js)
  function voice(n, isToday) {
    if (!isToday) return `<div class="nt-voice nt-quiet"><i></i><p>This is an earlier night.<br><span>${isComputer() && hasBT() ? "Sync to bring in last night." : "Last night syncs on your laptop."} Until then, today's breaks use your typed sleep or the standard timing.</span></p></div>`;
    let step = null;
    try { step = window.STUDY && STUDY.RULE ? STUDY.RULE.decide({ sleepH: n.sleepMin / 60, startMs: Date.now(), endMin: null }).steps.find((s) => s.k === "sleep") : null; } catch { step = null; }
    if (!step || step.val === "no change") return `<div class="nt-voice nt-quiet"><i></i><p>Today's breaks keep their normal timing.<br><span>Nothing from last night changes them.</span></p></div>`;
    const why = /under 5/i.test(step.text) ? "you slept under 5 hours" : /under 6/i.test(step.text) ? "you slept under 6 hours" : /8 h/i.test(step.text) ? "you slept 8 hours or more" : "of last night's sleep";
    return `<div class="nt-voice"><i></i><p>Today your first break comes ${esc(step.val)}.<br><span>Because ${why}. Fixed-timer sessions don't change.</span></p></div>`;
  }

  // under 7 hours never reads as plain "your usual", even when it's been the usual lately (ICP testing 1); 7 h or more
  // is "a full night", never an outlier
  const FULL = 420;
  function finding(n, U) {
    const short = n.sleepMin < FULL;
    if (U.learning || !U.sleepMin) return `You slept ${dur(n.sleepMin)}.${short ? ` <span class="soft">That's under 7 hours.</span>` : ""}`;
    const c = NT.compare(n.sleepMin, U.sleepMin), gap = Math.abs(U.sleepMin.mid - n.sleepMin);
    if (c === "low") return `You slept ${dur(n.sleepMin)}, <span class="soft">about ${durShort(gap)} under your usual.</span>`;
    if (c === "high") return short ? `You slept ${dur(n.sleepMin)}, <span class="soft">about ${durShort(gap)} more than your usual lately, but still under 7 hours.</span>` : `You slept ${dur(n.sleepMin)}. <span class="soft">A full night, longer than your usual lately.</span>`;
    return short ? `You slept ${dur(n.sleepMin)}. <span class="soft">Short, and short has been your usual lately.</span>` : `You slept ${dur(n.sleepMin)}. <span class="soft">That's your usual.</span>`;
  }

  const foot = `<p class="nt-foot">Only sleep changes your break timing. Resting heart rate and HRV are here for context. Halftime is a wellness tool, not medical advice.</p>`;

  function howHtml(m, n, isSample) {
    return `<details class="nt-how"><summary>How these are worked out</summary>
      <p>Only sleep changes your break timing. Resting heart rate and HRV are here for context. Halftime is a wellness tool, not medical advice.</p>
      <ul>
        <li><b>Sleep:</b> the longest calm stretch of your heart rate between 6 pm and 2 pm, at least 3 hours. You can change the times.</li>
        <li><b>Resting heart rate:</b> your lowest 5-minute average while asleep.</li>
        <li><b>HRV:</b> how much the time between beats varies (RMSSD), in 5-minute pieces while asleep, averaged.</li>
        <li><b>Your usual:</b> the middle of your last 28 nights, once there are 7. Never a score, never one night on its own.</li>
        <li><b>Not enough data:</b> worn under 3 hours, no calm stretch of 3 hours, or too few clean beats.</li>
      </ul>
      ${!isSample && m && m.last ? `<p>Last sync read ${Number(m.last.records || 0).toLocaleString()} readings${m.last.from ? `, from ${esc(when(m.last.from))} to ${esc(when(m.last.to))}` : ""}${m.last.dropped ? ` (${Number(m.last.dropped).toLocaleString()} with no usable time were left out)` : ""}${m.last.complete ? "" : ", and the band may hold more"}.</p>` : ""}
      <p>${isSample ? "This is a sample night made from made-up readings." : `Read from your WHOOP 4.0 over Bluetooth, without a WHOOP account. The readings stay in this browser for 35 days and are never sent to Halftime's server.${n ? ` Method ${esc(n.v)}.` : ""}`} WHOOP's own scores aren't used.</p>
      ${isSample ? "" : `<button type="button" class="nt-link danger" data-n="wipe">Delete WHOOP data from this ${isComputer() ? "computer" : "phone"}</button>`}
    </details>`;
  }

  function syncPanel(m) {
    if (!isComputer()) return `<section class="nt-sync"><p class="nt-small">Your WHOOP syncs through Halftime on a laptop, in Chrome or Edge. It doesn't sync to this phone yet.</p></section>`;
    if (!hasBT()) return `<section class="nt-sync"><p class="nt-small">To read your WHOOP, open Halftime in <b>Chrome</b> or <b>Edge</b> on this computer. Safari and Firefox can't talk to Bluetooth bands.</p></section>`;
    const meta = m && m.lastSync ? `<p class="nt-small">${esc(m.device || "WHOOP")} · last synced ${esc(when(m.lastSync))}${m.battery != null ? ` · battery ${Math.round(m.battery)}%` : ""}</p>` : "";
    return `<section class="nt-sync">${meta}
      <button class="nt-btn wide" type="button" data-n="sync">Sync my WHOOP</button>
      <p class="nt-small">Take the band off the charger and keep it near this laptop. Keep the WHOOP app closed: it can update the band and lock it.</p></section>`;
  }

  const panel = (m, isSample) => (isSample ? "" : syncPanel(m));

  function errorBox() {
    if (!lastErr && !lastNote) return "";
    const T = {
      cancelled_pick: "No band was picked. If your WHOOP wasn't in the list, take it off the charger, put it on, and try again.",
      radio_off: "Bluetooth looks off, or Chrome isn't allowed to use it. Turn Bluetooth on (and allow your browser in System Settings → Privacy & Security → Bluetooth), then try again.",
      blocked: "This browser blocked Bluetooth for this page. Allow it in the site settings, then try again.",
      not_whoop4: "That device isn't a WHOOP 4.0. Halftime can only read a WHOOP 4.0 for now.",
      no_answer: "The band connected but didn't answer. Take it off the charger, wait a few seconds and try again.",
      lost: "The connection dropped. Everything that arrived is saved. Press Sync again to get the rest, with the band near the laptop.",
      save: "This browser couldn't save the readings, so nothing was cleared from the band. Check the browser's storage settings and try again.",
      unsupported: "This browser can't use Bluetooth. Open Halftime in Chrome or Edge on a computer.",
      connect: "Couldn't connect to the band. If the WHOOP app on your phone is connected to it, turn the phone's Bluetooth off, then try again.",
    };
    return `<div class="nt-note${lastErr ? " err" : ""}" role="${lastErr ? "alert" : "status"}">${esc(lastErr ? T[lastErr] || T.connect : lastNote)}</div>`;
  }

  // ---------- views
  function viewSyncing(s) {
    const T = { pick: "Pick your WHOOP in the list Chrome opened.", connect: "Connecting to the band…", check: "Checking the band's clock and battery…", history: "Reading what the band stored…", done: "Working out last night…" };
    return `<header class="nt-top"><div><h1>Last night</h1><p class="nt-meta"><span>Syncing your WHOOP 4.0</span></p></div>${sample ? `<span class="nt-sample">Sample data</span>` : ""}</header>
      <section class="nt-card nt-syncing" aria-live="polite"><div class="nt-spin" aria-hidden="true"></div><p class="nt-big">${esc(T[s.stage] || "Syncing…")}</p>
        ${s.stage === "history" ? `<p class="nt-small">${(s.records || 0).toLocaleString()} readings so far${s.battery != null ? ` · battery ${Math.round(s.battery)}%` : ""}. A full night is about 30,000 and can take a few minutes.</p>` : ""}
        ${s.charging ? `<p class="nt-small">The band says it's charging. Readings from while it charged won't count.</p>` : ""}
        <button class="nt-btn ghost wide" type="button" data-n="stop" ${s.stage === "pick" ? "hidden" : ""} ${stopAsked ? "disabled" : ""}>${stopAsked ? "Stopping after this batch…" : "Stop"}</button>
        <p class="nt-small">Keep this tab open until it finishes.</p></section>`;
  }

  function viewIntro() {
    const sampleBtn = `<button class="nt-link" type="button" data-n="sample">See a sample night</button>`;
    if (!isComputer()) return `<header class="nt-top"><div><h1>Last night</h1></div></header>
      <p class="nt-find">Your WHOOP connects on a laptop.</p>
      <div class="nt-voice nt-quiet"><i></i><p>Open Halftime on a laptop in Chrome or Edge, and press Sync my WHOOP.<br><span>A phone browser can't talk to the band. For now, last night shows on the laptop where you synced it.</span></p></div>
      <div class="nt-col"><button class="nt-btn wide" type="button" data-n="type">Type last night's sleep instead</button>${sampleBtn}</div>${foot}`;
    if (!hasBT()) return `<header class="nt-top"><div><h1>Last night</h1></div></header>
      <p class="nt-find">Open Halftime in Chrome or Edge to read your WHOOP.</p>
      <div class="nt-voice nt-quiet"><i></i><p>This browser can't talk to Bluetooth bands.<br><span>Chrome and Edge on a Mac or Windows laptop can. Safari and Firefox can't.</span></p></div>
      <div class="nt-col"><button class="nt-btn wide" type="button" data-n="type">Type last night's sleep instead</button>${sampleBtn}</div>${foot}`;
    return `<header class="nt-top"><div><h1>Last night</h1></div></header>
      <p class="nt-find">Connect your WHOOP 4.0 to see last night here.</p>
      <div class="nt-cols"><div class="nt-c1">
        <section class="nt-card"><ol class="nt-steps">
          <li><b>Take the band off the charger</b> and put it on. It doesn't show up while it charges.</li>
          <li><b>Keep the WHOOP app closed.</b> It can update the band and lock it. If your phone is still paired, turn its Bluetooth off.</li>
          <li><b>Press Sync my WHOOP</b> and pick the band in the list. The first time, your Mac may ask to let ${/Edg\//.test(navigator.userAgent) ? "Edge" : "Chrome"} use Bluetooth.</li>
        </ol></section></div>
      <div class="nt-c2">${errorBox()}<section class="nt-sync"><button class="nt-btn wide" type="button" data-n="sync">Sync my WHOOP</button>
        <p class="nt-small">Halftime reads the heart rate and beat-to-beat times the band stored. They stay in this browser and are never sent to Halftime's server. No WHOOP account is used.</p>${sampleBtn}</section></div></div>${foot}`;
  }

  // on a phone with nothing synced: what works here comes first, then the sample night
  const phoneLead = () => `<div class="nt-voice nt-quiet nt-lead"><i></i><p>Your WHOOP syncs on a laptop, in Chrome or Edge.<br><span>This phone can't talk to the band, so below is a sample night until then.</span></p></div>
    <button class="nt-btn wide" type="button" data-n="type">Type last night's sleep</button>`;
  function viewNight(nights, m, isSample, lead) {
    const today = NT.dateKey(new Date()), n = nights.find((x) => x.date === today) || nights[nights.length - 1];
    if (!n) return `${header(null, m, isSample)}<p class="nt-find">Nothing from last night yet.</p>
      <div class="nt-voice nt-quiet"><i></i><p>The band had nothing stored for a night.<br><span>Wear it to sleep and sync in the morning.</span></p></div>
      <div class="nt-cols"><div class="nt-c1">${errorBox()}</div><div class="nt-c2">${panel(m, isSample)}${howHtml(m, null, isSample)}</div></div>`;
    const isToday = n.date === today, U = NT.usual(nights, n.date);
    if (!n.ok) {
      const R = { worn: `Your WHOOP was on your wrist for ${dur(n.wornMin || 0)} between 6 pm and 2 pm. Halftime needs about 3 hours of sleep to say anything.`,
        short: "Halftime couldn't find 3 hours of calm sleep in your heart rate.", gaps: "The band lost contact too often during the night.", none: "There were no readings for that night." };
      return `${header(n, m, isSample)}
        <p class="nt-find">Not enough data for ${isToday ? "last night" : "that night"}.</p>
        <p class="nt-sub">${esc(R[n.reason] || R.short)}</p>
        <div class="nt-cols"><div class="nt-c1"><div class="nt-voice nt-quiet"><i></i><p>Today's breaks use the standard timing.<br><span>You can type last night's sleep when you start studying.</span></p></div>
          <section class="nt-rows">${["Sleep", "Resting heart rate", "HRV"].map((x) => `<div class="nt-row"><div class="nt-rh"><span class="nt-rn">${x}</span><span class="nt-rv nt-none">—</span></div><div class="nt-rw"><b>Not enough data</b><span>${n.wornMin ? "worn " + dur(n.wornMin) : ""}</span></div></div>`).join("")}</section>
          <button class="nt-btn wide" type="button" data-n="type">Type last night's sleep</button></div>
        <div class="nt-c2">${errorBox()}${panel(m, isSample)}${howHtml(m, n, isSample)}</div></div>`;
    }
    return `${header(n, m, isSample)}${lead || ""}
      <div class="nt-cols"><div class="nt-c1">
        ${!n.confirmed && !editing ? `<p class="nt-find">First, one check.</p><p class="nt-sub">Halftime reads when you slept from your heart rate. One tap keeps it honest.</p>` : `<p class="nt-find">${finding(n, U)}</p>${voice(n, isToday)}`}
        ${nightCard(n, U, isSample)}
      </div><div class="nt-c2">
        ${errorBox()}
        <div class="${!n.confirmed && !editing ? "nt-dim" : ""}">${rowsHtml(n, U)}</div>
        ${panel(m, isSample)}
        ${howHtml(m, n, isSample)}
      </div></div>`;
  }

  // ---------- draw
  function draw() {
    const st = sample || QA;
    let html;
    if (syncing) html = viewSyncing(syncing);
    else if (st === "syncing") html = viewSyncing({ stage: "history", records: 12840, battery: 82 });
    else if (st === "connect" || st === "nobt" || st === "phone") { FORCE = { computer: st !== "phone", bt: st === "connect" }; try { html = viewIntro(); } finally { FORCE = null; } }
    else if (st) { const d = sampleData(st === "error" ? "ok" : st); if (st === "error") lastErr = "lost"; html = viewNight(d.nights, d.meta, true); }
    else {
      const m = NT.meta(), nights = NT.nightsAll();
      if (!m && !isComputer()) { const d = sampleData("ok"); html = viewNight(d.nights, d.meta, true, phoneLead()); }
      else html = !m ? viewIntro() : viewNight(nights, m, false);
    }
    root.innerHTML = html;
    root.dataset.state = syncing ? "syncing" : st || "real";
    const f = root.querySelector(".nt-edit"); if (f) f.addEventListener("submit", onSave);
  }
  // the night the tab is about: last night if synced, otherwise the latest one
  const currentNight = () => { const all = NT.nightsAll(); return all.find((x) => x.date === NT.dateKey(new Date())) || all[all.length - 1] || null; };

  // ---------- actions
  async function doSync() {
    if (syncing || !WB) return;
    lastErr = null; lastNote = null; stopAsked = false; editing = false; sample = null;
    syncing = { stage: "pick" }; draw(); ev("night_sync", "start");
    const got = [];
    try {
      const r = await WB.sync({
        onProgress: (p) => { syncing = { ...syncing, ...p }; if (shown) draw(); },
        onBatch: async (recs) => { await NT.putSamples(recs); for (const x of recs) got.push(x); },
        cancelled: () => stopAsked,
      });
      let t0 = Infinity, t1 = -Infinity; for (const x of got) { if (x.t < t0) t0 = x.t; if (x.t > t1) t1 = x.t; } // a loop: a multi-day sync is 100,000s of readings
      NT.setMeta({ ...(NT.meta() || {}), owner: ownerKey(), lastSync: Date.now(), device: "WHOOP 4.0", name: r.device, battery: r.battery, firmware: r.firmware,
        last: { records: r.records, from: got.length ? t0 * 1000 : null, to: got.length ? t1 * 1000 : null, dropped: r.dropped, complete: !!r.complete } });
      const made = await NT.recompute(got);
      NT.prune().catch(() => {});
      const notes = [];
      if (!r.records) notes.push("The band had nothing new stored. Wear it to sleep and sync in the morning.");
      else if (!made.length) notes.push(`Read ${r.records.toLocaleString()} readings, but none covered a night yet.`);
      if (r.clockReset) notes.push("The band's clock had stopped, so it's set now. Readings from before that couldn't be placed in time.");
      if (!r.complete && !stopAsked && r.records) notes.push("The band stopped sending before the end. Press Sync again to get the rest.");
      if (stopAsked) notes.push("Stopped. What arrived is saved; the rest stays on the band for next time.");
      lastNote = notes.join(" ") || null;
      ev("night_sync", "done", { batches: r.batches, nights: made.length, complete: !!r.complete, stopped: stopAsked });
    } catch (e) {
      lastErr = (e && e.code) || "connect";
      if (got.length) { NT.setMeta({ ...(NT.meta() || {}), owner: ownerKey(), lastSync: Date.now(), device: "WHOOP 4.0" }); try { await NT.recompute(got); } catch {} }
      ev("night_sync", "fail", { code: lastErr });
    } finally {
      syncing = null; stopAsked = false; draw();
      try { window.dispatchEvent(new CustomEvent("halftime:night")); } catch {}
    }
  }
  async function onSave(e) {
    e.preventDefault();
    const n = currentNight();
    if (!n) { editing = false; return draw(); }
    const b = root.querySelector("#nt-bed").value, w = root.querySelector("#nt-wake").value;
    if (!b || !w) { editErr = "Pick both times."; return draw(); }
    const [y, mo, d] = n.date.split("-").map(Number);
    const [bh, bm] = b.split(":").map(Number), [wh, wm] = w.split(":").map(Number);
    let bed = new Date(y, mo - 1, d, bh, bm).getTime(); if (bh >= 15) bed -= 86400000; // an evening time belongs to the night before
    const wake = new Date(y, mo - 1, d, wh, wm).getTime();
    const W = NT.windowFor(n.date);
    if (bed < W.from || wake > W.to) { editErr = "Halftime looks for last night between 6 pm and 2 pm. Pick times inside that."; return draw(); }
    const len = (wake - bed) / MIN;
    if (len < 60) { editErr = "Waking up has to come at least an hour after falling asleep."; return draw(); }
    if (len > 16 * 60) { editErr = "That's more than 16 hours. Check the two times."; return draw(); }
    editErr = "";
    try { await NT.setWindow(n.date, bed, wake); ev("night_confirm", "change"); } catch { editErr = "Couldn't read the stored readings in this browser. Try again."; return draw(); }
    editing = false; draw(); try { window.dispatchEvent(new CustomEvent("halftime:night")); } catch {}
  }

  root.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-n]"); if (!b || b.tagName === "FORM") return;
    const k = b.dataset.n, isSample = !!(sample || QA);
    if (k === "sync") return doSync();
    if (k === "stop") { stopAsked = true; b.disabled = true; b.textContent = "Stopping after this batch…"; return; }
    if (k === "sample") { sample = "ok"; ev("night_sample", "open"); draw(); return scrollTo(0, 0); }
    if (k === "unsample") { sample = null; draw(); return scrollTo(0, 0); }
    if (k === "type") { if (window.APP) APP.setTab("now"); if (window.STUDY && STUDY.typeSleep) STUDY.typeSleep(); return; }
    if (isSample && (k === "yes" || k === "change" || k === "wipe")) { if (window.APP) APP.toast("This is a sample night. Your own night works the same way."); return; }
    if (k === "yes") { const t = currentNight(); if (t) NT.confirm(t.date); ev("night_confirm", "yes"); draw(); try { window.dispatchEvent(new CustomEvent("halftime:night")); } catch {} return; }
    if (k === "change") { editing = true; editErr = ""; draw(); const i = root.querySelector("#nt-bed"); if (i) i.focus(); return; }
    if (k === "edit-cancel") { editing = false; editErr = ""; return draw(); }
    if (k === "wipe") {
      if (!confirm("Delete all WHOOP readings and nights from this browser? This can't be undone. What's still on the band stays there.")) return;
      await NT.forget(); lastErr = null; lastNote = "WHOOP data deleted from this browser."; ev("night_wipe", "yes"); draw();
      try { window.dispatchEvent(new CustomEvent("halftime:night")); } catch {}
    }
  });

  // a different person signed in on this browser: their nights don't carry over. Checked when the tab opens, because
  // the profile (PROFILE) is defined by the page's script after this file runs. study.js also wipes on a new person.
  let ownerChecked = false;
  window.NIGHTTAB = {
    show() {
      shown = true; editing = false;
      if (!ownerChecked && !QA && ownerKey()) { ownerChecked = true; NT.checkOwner(ownerKey()).then(() => { if (shown) draw(); }, () => {}); }
      draw();
    },
    hide() { shown = false; },
    qa: QA,
  };
})();
