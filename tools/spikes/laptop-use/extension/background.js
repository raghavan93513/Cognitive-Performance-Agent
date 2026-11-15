// Halftime laptop minutes (spike, 2026-11-15). Service worker.
// While a Halftime session runs, it puts every moment in one of four buckets (see tally.js): picked sites, other
// browser tabs, outside the browser, away (screen locked). It reads a tab's address only to get its hostname, and the
// browser shows it the address only on picked sites; every other tab is just "a tab that isn't picked".
// It never reads page content or titles and makes no network requests. At the end of a session the Halftime page asks
// and gets four whole-minute totals. Minutes per picked site stay on this laptop, for the student's own view.
import * as T from "./tally.js";

const ALLOWED = ["https://halftime-study.vercel.app", "http://localhost", "http://127.0.0.1"]; // must match manifest externally_connectable
const okOrigin = (o) => { try { const u = new URL(o); return ALLOWED.includes(u.protocol + "//" + u.hostname); } catch { return false; } };
const get = async (k) => (await chrome.storage.local.get(k))[k];

// One change at a time: Chrome fires tab and window events in bursts and every handler is async.
let chain = Promise.resolve();
const serial = (fn) => (chain = chain.then(fn).catch((e) => { console.warn("halftime-ext", e); }));

// Where is the student right now? { bucket: "away" | "outside" | "other" | "picked", site? }
async function where() {
  if ((await chrome.idle.queryState(60)) === "locked") return { bucket: "away" }; // locked or asleep
  const win = await chrome.windows.getLastFocused().catch(() => null);
  if (!win || !win.focused) return { bucket: "outside" }; // another app is in front (private windows land here too: the extension can't see them)
  const [tab] = await chrome.tabs.query({ active: true, windowId: win.id });
  let host = null;
  try { const u = new URL(tab && tab.url); if (u.protocol === "https:" || u.protocol === "http:") host = u.hostname; } catch { /* no address = not a picked site */ }
  const site = T.matchPick(host, (await get("picks")) || []);
  return site ? { bucket: "picked", site } : { bucket: "other" };
}

// Close a session: keep the full local result (with per-site minutes) and return what Halftime may get.
async function close(s, now) {
  const { share, local } = T.finish(s, now);
  await chrome.storage.local.set({ last: { id: s.id, ...local } });
  await chrome.storage.local.remove("session");
  return share;
}

// Re-check where the student is and update the session.
async function refresh() {
  const s = await get("session");
  if (!s) return;
  const now = Date.now();
  if (now >= s.endBy) return void (await close(s, now)); // the page never ended it: close at endBy, keep the result in case it asks later
  T.observe(s, now, await where());
  await chrome.storage.local.set({ session: s });
}

const validId = (id) => typeof id === "string" && /^[A-Za-z0-9-]{8,64}$/.test(id);
const shareOf = (last) => ({ picked_min: last.picked_min, other_min: last.other_min, outside_min: last.outside_min, away_min: last.away_min });

async function handle(msg) {
  const type = msg && msg.type;
  if (type === "hello") return { ok: true, v: 2, ready: ((await get("picks")) || []).length > 0 };
  if (type === "start") {
    if (!validId(msg.id)) return { ok: false };
    await chrome.storage.local.set({ session: T.start(Date.now(), msg.id, msg.maxMin) });
    await refresh();
    return { ok: true };
  }
  if (type === "end" || type === "discard") {
    if (!validId(msg.id)) return { ok: false };
    let s = await get("session");
    if (s && s.id === msg.id) {
      await refresh();
      s = await get("session"); // gone if refresh just closed it at endBy
      if (type === "discard") { await chrome.storage.local.remove(["session", "last"]); return { ok: true }; }
      if (s) return { ok: true, ...(await close(s, Date.now())) };
    }
    const last = await get("last");
    if (last && last.id === msg.id) {
      if (type === "discard") { await chrome.storage.local.remove("last"); return { ok: true }; }
      return { ok: true, ...shareOf(last) }; // never the per-site minutes
    }
    return { ok: false }; // the extension wasn't counting this session
  }
  return { ok: false };
}

// Only the Halftime page can ask (manifest externally_connectable; no other extension can connect either).
chrome.runtime.onMessageExternal.addListener((msg, sender, reply) => {
  if (!okOrigin(sender.origin || sender.url)) { reply({ ok: false }); return; }
  let out = { ok: false };
  serial(async () => { out = await handle(msg); }).then(() => reply(out));
  return true; // reply comes later
});

// The popup (this extension only) asks for the running counts and the last session, per-site minutes included.
chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (sender.id !== chrome.runtime.id || !msg || msg.type !== "status") return;
  serial(async () => {
    await refresh();
    const s = await get("session");
    reply({ running: !!s, now: T.snapshot(s, Date.now()), unitMs: T.UNIT_MS, last: (await get("last")) || null });
  });
  return true;
});

// Everything that can change where the student is. Listeners must be registered at the top level.
chrome.idle.setDetectionInterval(60);
chrome.tabs.onActivated.addListener(() => serial(refresh));
chrome.tabs.onUpdated.addListener((_id, info) => { if (info.url || info.status) serial(refresh); });
chrome.tabs.onRemoved.addListener(() => serial(refresh));
chrome.windows.onFocusChanged.addListener(() => serial(refresh));
chrome.idle.onStateChanged.addListener(() => serial(refresh));
chrome.storage.onChanged.addListener((ch, area) => { if (area === "local" && ch.picks) serial(refresh); });
// After a browser restart the open stretch can't be trusted: drop it rather than count the time Chrome was closed.
chrome.runtime.onStartup.addListener(() => serial(async () => {
  const s = await get("session"); if (s && s.cur) { T.forgetOpen(s); await chrome.storage.local.set({ session: s }); }
}));
