// Receives analytics batches from /assets/track.js, adds the visitor's IP address and approximate location
// (from Vercel's request headers), and appends the rows to the Google Sheet through its Apps Script web app.
// Env vars (set in Vercel, never committed): SHEET_WEBHOOK_URL, SHEET_SECRET.
// Many visitors can send at once: each request is independent, and the Apps Script locks the sheet while it writes.

const COLS = ["received_at", "ip", "country", "region", "city", "visitor_id", "session_id", "user_name", "device", "os", "browser",
  "screen", "viewport", "event", "page", "screen_state", "target", "x", "y", "scroll_pct", "dwell_ms", "value", "client_time", "seq", "referrer", "extra"];
const MAX_EVENTS = 200, MAX_STR = 1500;

// a cell that starts with = + - @ would run as a formula in the sheet: keep it as text
const cell = (v, max = 300) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return Number.isFinite(v) ? v : "";
  let s = String(v).slice(0, max).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
};
const header = (req, k) => { const v = req.headers[k]; return Array.isArray(v) ? v[0] : v || ""; };
const dec = (s) => { try { return decodeURIComponent(s); } catch { return s; } };

export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false }); }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body && req.on) { // sendBeacon blobs can arrive unparsed
    body = await new Promise((resolve) => { let d = ""; req.on("data", (c) => { d += c; if (d.length > 400000) req.destroy(); }); req.on("end", () => { try { resolve(JSON.parse(d)); } catch { resolve(null); } }); req.on("error", () => resolve(null)); });
  }
  const events = body && Array.isArray(body.events) ? body.events.slice(0, MAX_EVENTS) : null;
  if (!events || !events.length) return res.status(400).json({ ok: false, error: "no events" });

  const ip = (header(req, "x-forwarded-for").split(",")[0] || header(req, "x-real-ip") || (req.socket && req.socket.remoteAddress) || "").trim();
  const geo = { country: header(req, "x-vercel-ip-country"), region: dec(header(req, "x-vercel-ip-country-region")), city: dec(header(req, "x-vercel-ip-city")) };
  const now = new Date().toISOString();
  const rows = events.filter((e) => e && typeof e === "object").map((e) => [
    now, cell(ip, 60), cell(geo.country, 8), cell(geo.region, 40), cell(geo.city, 80),
    cell(e.visitor, 64), cell(e.session, 64), cell(e.name, 40), cell(e.device, 16), cell(e.os, 16), cell(e.browser, 24),
    cell(e.screen, 24), cell(e.viewport, 24), cell(e.event, 40), cell(e.page, 80), cell(e.state, 60), cell(e.target, 160),
    cell(e.x), cell(e.y), cell(e.scroll), cell(e.dwell), cell(e.value, 200), cell(e.t, 40), cell(e.seq), cell(e.ref, 120), cell(e.extra, MAX_STR),
  ]);

  const url = process.env.SHEET_WEBHOOK_URL, secret = process.env.SHEET_SECRET;
  if (!url || !secret) { console.log(JSON.stringify({ analytics: rows.length, cols: COLS, sample: rows[0] })); return res.status(202).json({ ok: true, stored: false }); }
  try {
    const r = await fetch(url, { method: "POST", headers: { "content-type": "text/plain" }, body: JSON.stringify({ secret, rows }), redirect: "follow" });
    if (!r.ok) { console.error("sheet write failed", r.status); return res.status(502).json({ ok: false }); }
    return res.status(200).json({ ok: true, stored: rows.length });
  } catch (err) {
    console.error("sheet write error", String(err));
    return res.status(502).json({ ok: false });
  }
}
