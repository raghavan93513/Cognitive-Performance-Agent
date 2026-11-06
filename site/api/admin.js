// /api/admin: the server behind /admin.
//   POST ?op=login    {user, pass}         sets the HttpOnly session cookie (checked in the database: bcrypt, and 8 wrong
//                                          tries from one IP in 15 minutes lock that IP out)
//   POST ?op=logout                        ends the session
//   POST ?op=password {old, new}           changes the password (12+ characters) and signs out other sessions
//   POST ?op=data     {view, args}         one dashboard view: halftime_admin_data in tools/site/supabase.sql
// Every request must carry the X-Admin header (a cross-site form can't set it), and the cookie is SameSite=Strict.
import { rpc, configured, clientIp, readJson } from "./_db.js";

const COOKIE = "ht_admin";
const VIEWS = new Set(["me", "pulse", "funnel", "screens", "tour", "taps", "heat", "visitors", "visitor", "devices", "health", "export"]);
const tokenOf = (req) => { const m = /(?:^|;\s*)ht_admin=([0-9a-f]{64})(?:;|$)/.exec(req.headers.cookie || ""); return m ? m[1] : null; };
const cookie = (value, maxAge) => {
  const secure = process.env.ADMIN_INSECURE_COOKIE === "1" ? "" : " Secure;"; // local http testing only
  return `${COOKIE}=${value}; Path=/api/admin; HttpOnly;${secure} SameSite=Strict; Max-Age=${maxAge}`;
};
const send = (res, status, body, cookieValue) => {
  res.setHeader("Cache-Control", "no-store");
  if (cookieValue !== undefined) res.setHeader("Set-Cookie", cookieValue);
  return res.status(status).json(body);
};

export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(res, 405, { error: "method" }); }
  if (req.headers["x-admin"] !== "1") return send(res, 403, { error: "forbidden" });
  if (!configured()) return send(res, 503, { error: "setup", message: "The analytics database isn't connected yet." });
  const op = new URL(req.url, "http://x").searchParams.get("op");
  const body = (await readJson(req, 20000)) || {};
  try {
    if (op === "login") {
      const r = await rpc("halftime_admin_login", { p_user: String(body.user || "").slice(0, 64), p_pass: String(body.pass || "").slice(0, 200), p_ip: clientIp(req) });
      if (!r || !r.ok) return send(res, r && r.error === "locked" ? 429 : 401, { error: (r && r.error) || "wrong" });
      return send(res, 200, { ok: true, user: r.user }, cookie(r.token, 7 * 24 * 3600));
    }
    if (op === "logout") {
      const t = tokenOf(req);
      if (t) await rpc("halftime_admin_logout", { p_token: t });
      return send(res, 200, { ok: true }, cookie("", 0));
    }
    const t = tokenOf(req);
    if (!t) return send(res, 401, { error: "auth" });
    if (op === "password") {
      const r = await rpc("halftime_admin_password", { p_token: t, p_old: String(body.old || "").slice(0, 200), p_new: String(body.new || "").slice(0, 200) });
      return send(res, r && r.ok ? 200 : r && r.error === "auth" ? 401 : 400, r || { error: "server" });
    }
    if (op === "data") {
      const view = String(body.view || "");
      if (!VIEWS.has(view)) return send(res, 400, { error: "unknown view" });
      const args = body.args && typeof body.args === "object" && !Array.isArray(body.args) ? body.args : {};
      const r = await rpc("halftime_admin_data", { p_token: t, p_view: view, p_args: args }, { timeout: 25000 });
      if (r && r.error === "auth") return send(res, 401, { error: "auth" }, cookie("", 0));
      return send(res, 200, r);
    }
    return send(res, 400, { error: "unknown op" });
  } catch (e) {
    console.error("[admin]", String(e).slice(0, 300));
    return send(res, 500, { error: "server" });
  }
}
