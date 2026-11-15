// GET /api/health: the wearable's readings for the prototype, read live from the Google Health API (Fitbit).
// It answers { connected: false } unless BOTH are true:
//   1. the credentials are set as env vars (see _gh.js); and
//   2. the request is local (localhost / 127.0.0.1), or HEALTH_PUBLIC=1 is set on purpose.
// Rule 2 is the safety catch: these are one real person's health readings, and the deployed site is public.
// Nothing is stored. The answer is cached in memory for 5 minutes so a page reload doesn't call Google again.
import { hasCreds, snapshot } from "./_gh.js";

const isLocal = (req) => /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(String(req.headers.host || ""));
let CACHE = { at: 0, body: null };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false }); }
  if (!hasCreds()) return res.status(200).json({ ok: true, connected: false, reason: "no_credentials" });
  if (!isLocal(req) && process.env.HEALTH_PUBLIC !== "1") return res.status(200).json({ ok: true, connected: false, reason: "local_only" });
  if (CACHE.body && Date.now() - CACHE.at < 5 * 60 * 1000) return res.status(200).json(CACHE.body);
  try {
    const snap = await snapshot();
    CACHE = { at: Date.now(), body: { ok: true, connected: true, fetchedAt: new Date().toISOString(), ...snap } };
    return res.status(200).json(CACHE.body);
  } catch (err) {
    // 400/401 from the helper or Google: the person must authorize again. 403: a scope wasn't granted. Never log tokens.
    console.error("health failed", String(err && err.message).slice(0, 120));
    const reason = err && (err.status === 400 || err.status === 401) ? "reauthorize" : err && err.status === 403 ? "scope_denied" : "unavailable";
    return res.status(200).json({ ok: true, connected: false, reason });
  }
}
