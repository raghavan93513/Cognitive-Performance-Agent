// POST /api/forget {visitor}: "Delete my data". Removes every row stored for this browser's visitor id (analytics
// events, study sessions and check-ins, the push address and anything queued for it) with one database call:
// halftime_forget in tools/site/supabase.sql. The visitor id is a random id made on the phone, so only that phone
// (or an admin) knows it.
import { rpc, configured, readJson } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false }); }
  const body = (await readJson(req, 2000)) || {};
  const visitor = String(body.visitor || "").slice(0, 64);
  if (visitor.length < 16) return res.status(400).json({ ok: false, error: "no visitor" });
  if (!configured()) return res.status(200).json({ ok: true, deleted: 0 });
  try {
    const r = await rpc("halftime_forget", { p_visitor: visitor });
    return res.status(r && r.ok ? 200 : 400).json(r || { ok: false });
  } catch (e) {
    console.error("[forget]", String(e).slice(0, 300));
    return res.status(503).json({ ok: false });
  }
}
