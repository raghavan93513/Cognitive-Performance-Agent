// The one door to the analytics database: a Supabase RPC call. The logic lives in tools/site/supabase.sql.
// The key is the project's *publishable* key, which is safe to publish by design: the tables are locked (row-level
// security, unexposed schema), so all it can do is call the halftime_* functions, and the admin ones need a session.
// Env vars override the defaults: SUPABASE_URL, SUPABASE_KEY.
export const SUPABASE_URL = process.env.SUPABASE_URL || "https://ggxqauebvxnjdyfkajjw.supabase.co";
const KEY = process.env.SUPABASE_KEY || "sb_publishable_x70lt97JS6OKgE44FKufQA_LPnfNZ58"; // publishable: safe to publish
export const configured = () => Boolean(SUPABASE_URL && KEY);

export async function rpc(fn, args, { timeout = 15000 } = {}) {
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(), timeout);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST", signal: ac.signal,
      headers: { apikey: KEY, "Content-Type": "application/json", ...(KEY.startsWith("eyJ") ? { Authorization: `Bearer ${KEY}` } : {}) },
      body: JSON.stringify(args),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`${fn}: ${res.status} ${text.slice(0, 300)}`);
    return text ? JSON.parse(text) : null;
  } finally { clearTimeout(timer); }
}

const header = (req, k) => { const v = req.headers[k]; return Array.isArray(v) ? v[0] : v || ""; };
export { header };
// Vercel sets x-real-ip and overwrites x-forwarded-for, so the browser can't fake either.
export const clientIp = (req) => (header(req, "x-real-ip") || header(req, "x-forwarded-for").split(",")[0] || (req.socket && req.socket.remoteAddress) || "").trim().slice(0, 64);

export async function readJson(req, max = 400000) {
  let body = req.body;
  if (body && typeof body === "object" && !Buffer.isBuffer(body)) return body;
  if (typeof body === "string") { try { return JSON.parse(body); } catch { return null; } }
  if (Buffer.isBuffer(body)) { try { return JSON.parse(body.toString("utf8")); } catch { return null; } }
  if (!req.on) return null;
  return new Promise((resolve) => {
    let d = "";
    req.on("data", (c) => { d += c; if (d.length > max) { resolve(null); req.destroy(); } });
    req.on("end", () => { try { resolve(JSON.parse(d || "null")); } catch { resolve(null); } });
    req.on("error", () => resolve(null));
  });
}
