// POST /api/collect: analytics batches from /assets/track.js. Adds what only the server knows (the IP address and the
// approximate place from Vercel's headers), then stores the batch with one database call (halftime_ingest in
// tools/site/supabase.sql). Many visitors can send at once: each call is one insert. If the database is busy or down,
// it answers 503 and the visitor's browser keeps the events and retries later.
import { rpc, configured, clientIp, header, readJson } from "./_db.js";

const MAX_EVENTS = 200;
const dec = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
const parseExtra = (x) => {
  if (x && typeof x === "object") return x;
  if (typeof x === "string" && x) { try { const o = JSON.parse(x); return o && typeof o === "object" ? o : { text: x.slice(0, 500) }; } catch { return { text: x.slice(0, 500) }; } }
  return null;
};

export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false }); }
  res.setHeader("Cache-Control", "no-store");
  const body = await readJson(req);
  const events = body && Array.isArray(body.events) ? body.events.slice(0, MAX_EVENTS).filter((e) => e && typeof e === "object") : null;
  if (!events || !events.length) return res.status(400).json({ ok: false, error: "no events" });

  const rows = events.map((e) => ({ ...e, extra: parseExtra(e.extra) }));
  const ip = clientIp(req);
  const p = {
    rows, ip,
    // load tests, and anything from this machine (local QA runs), are kept apart from real visitors
    test: body.test === true || /^(127\.|::1$|::ffff:127\.)/.test(ip),
    country: header(req, "x-vercel-ip-country"),
    region: dec(header(req, "x-vercel-ip-country-region")),
    city: dec(header(req, "x-vercel-ip-city")),
  };
  if (!configured()) { console.log(JSON.stringify({ analytics: rows.length, sample: rows[0] && rows[0].event })); return res.status(202).json({ ok: true, stored: 0 }); }
  try {
    const r = await rpc("halftime_ingest", { p });
    if (!r || r.ok !== true) { console.error("ingest refused", r && r.error); return res.status(400).json({ ok: false }); }
    return res.status(200).json({ ok: true, stored: r.stored });
  } catch (err) {
    console.error("ingest failed", String(err).slice(0, 300));
    return res.status(503).json({ ok: false });
  }
}
