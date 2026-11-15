// /api/push: delivery of a suggestion to a locked phone (Web Push; on iPhone it needs iOS 16.4+ and the Home Screen app).
//   GET  ?op=config                       { configured, key }: whether the server can send, and the public key to subscribe with
//   POST ?op=subscribe {visitor, sub}     saves this phone's push address (one per visitor)
//   POST ?op=unsubscribe {visitor}        forgets it and cancels anything waiting
//   POST ?op=schedule {visitor, study, jobs: [{kind, at, m}], replace}   queues notifications for a study session
//   POST ?op=cancel {visitor, study, kinds}                            cancels the ones not sent yet
//   POST ?op=send {jobs: [{id, token}]}   called by the database's 30-second timer (halftime._push_tick in
//                                         tools/site/supabase.sql) when notifications are due. Each id comes with a
//                                         one-time token the database made, so nobody else can trigger or read a job.
// The words on the lock screen are fixed templates chosen by `kind` (below): a caller can't make this server send
// free text. They never include sleep or any other reading: the reasons stay inside the app.
import { rpc, configured, clientIp, readJson } from "./_db.js";
import { VAPID_PUBLIC, pushConfigured, validEndpoint, sendPush } from "./_webpush.js";

const mins = (m) => (m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")} min` : `${m} min`);
export const TEMPLATES = {
  suggest_walk: (m) => ({ title: "Short walk now?", body: `${mins(m)} in. Open Halftime to see why.` }),
  suggest_break: (m) => ({ title: "Take a longer break?", body: `${mins(m)} in. Open Halftime to see why.` }),
  suggest_keep: (m) => ({ title: "Keep going.", body: `${mins(m)} in, and you're close to done. Open Halftime to see why.` }),
  break_over: () => ({ title: "Break's over", body: "Back to it when you're ready." }),
  pomo_break: (m) => ({ title: "25 minutes done", body: `Take 5. Fixed-timer session, ${mins(m)} in.` }),
  pomo_work: () => ({ title: "5 minutes are up", body: "Back to it. Next break in 25 minutes." }),
};
// Are the push functions installed in the database (tools/site/supabase.sql)? Asked at most once a minute per server
// instance; until they are, the app says notifications aren't switched on instead of failing when someone turns them on.
let ready = { at: 0, ok: false };
async function dbReady() {
  if (Date.now() - ready.at < (ready.ok ? 600000 : 60000)) return ready.ok;
  let ok = false;
  try { const r = await rpc("halftime_push_cancel", { p: { visitor: "config-probe-0000000000", study: "none" } }, { timeout: 5000 }); ok = !!(r && r.ok); } catch { ok = false; }
  ready = { at: Date.now(), ok }; return ok;
}
const isTest = (req, body) => body.test === true || /^(127\.|::1$|::ffff:127\.)/.test(clientIp(req));
const str = (v, n) => String(v == null ? "" : v).slice(0, n);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const op = new URL(req.url, "http://x").searchParams.get("op");
  if (req.method === "GET" && op === "config") return res.status(200).json({ configured: pushConfigured() && configured() && (await dbReady()), key: VAPID_PUBLIC });
  if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return res.status(405).json({ ok: false }); }
  if (!configured()) return res.status(503).json({ ok: false, error: "setup" });
  const body = (await readJson(req, 60000)) || {};
  try {
    if (op === "subscribe") {
      const s = body.sub || {}, k = s.keys || {};
      if (!body.visitor || !validEndpoint(s.endpoint) || !k.p256dh || !k.auth) return res.status(400).json({ ok: false, error: "bad subscription" });
      const r = await rpc("halftime_push_save", { p: { visitor: str(body.visitor, 64), endpoint: str(s.endpoint, 600), p256dh: str(k.p256dh, 200), auth: str(k.auth, 80), test: isTest(req, body) } });
      return res.status(r && r.ok ? 200 : 400).json(r || { ok: false });
    }
    if (op === "unsubscribe") return res.status(200).json(await rpc("halftime_push_remove", { p_visitor: str(body.visitor, 64) }));
    if (op === "schedule") {
      const jobs = (Array.isArray(body.jobs) ? body.jobs : []).slice(0, 24).filter((j) => j && TEMPLATES[j.kind])
        .map((j) => ({ kind: j.kind, at: str(j.at, 40), m: Math.max(0, Math.min(720, Math.round(+j.m || 0))) }));
      const r = await rpc("halftime_push_schedule", { p: { visitor: str(body.visitor, 64), study: str(body.study, 64), jobs, replace: body.replace !== false, test: isTest(req, body) } });
      return res.status(r && r.ok ? 200 : 400).json({ ...(r || { ok: false }), configured: pushConfigured() });
    }
    if (op === "cancel") {
      const r = await rpc("halftime_push_cancel", { p: { visitor: str(body.visitor, 64), study: str(body.study, 64), kinds: Array.isArray(body.kinds) ? body.kinds.slice(0, 8).map((k) => str(k, 24)) : null } });
      return res.status(200).json(r || { ok: false });
    }
    if (op === "send") {
      const jobs = (Array.isArray(body.jobs) ? body.jobs : []).slice(0, 100);
      const out = await Promise.all(jobs.map(async (j) => {
        const id = Math.round(+j.id), token = str(j.token, 80);
        const job = await rpc("halftime_push_take", { p_id: id, p_token: token });
        if (!job || !job.ok) return { id, status: -1 };
        const t = TEMPLATES[job.kind]; if (!t) return { id, status: -2 };
        const r = await sendPush({ endpoint: job.endpoint, p256dh: job.p256dh, auth: job.auth }, { ...t(job.m || 0), tag: "halftime-" + job.kind.split("_")[0], url: "/app?from=push", study: job.study, kind: job.kind });
        const done = () => rpc("halftime_push_result", { p_id: id, p_token: token, p_status: r.status, p_error: str(r.error, 200) });
        await done().catch(() => done()).catch(() => {}); // recorded, so a notification that went out isn't sent again
        return { id, status: r.status };
      }));
      return res.status(200).json({ ok: true, sent: out });
    }
    return res.status(400).json({ ok: false, error: "unknown op" });
  } catch (e) {
    console.error("[push]", String(e).slice(0, 300));
    return res.status(503).json({ ok: false });
  }
}
