/* Halftime service worker: makes the app installable, keeps a copy for when the network drops, and shows the one
   suggestion as a notification on a locked phone (Web Push; on iPhone it needs iOS 16.4+ and the Home Screen app).
   Pages and files are always fetched fresh first; the saved copy is only used when the network fails. */
const CACHE = "halftime-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin") || url.search.includes("preview=1")) return;
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res.ok && !res.redirected && res.type === "basic") { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(url.pathname, copy)).catch(() => {}); }
      return res;
    } catch (err) {
      const hit = await caches.match(url.pathname);
      if (hit) return hit;
      throw err;
    }
  })());
});

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { title: "Halftime", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Halftime", {
    body: d.body || "Open Halftime.", tag: d.tag || "halftime", renotify: true,
    icon: "/icon-192.png", badge: "/icon-192.png", data: { url: d.url || "/app?from=push", study: d.study || "", kind: d.kind || "" },
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const kind = (e.notification.data && e.notification.data.kind) || "";
  const url = "/app?from=push" + (/^[a-z_]{1,24}$/.test(kind) ? "&k=" + kind : "");
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // the app itself, never an /app preview framed inside /admin, /desktop or /preview (those have no session)
    const open = all.find((c) => { const u = new URL(c.url); return u.pathname === "/app" && (!c.frameType || c.frameType === "top-level") && !u.searchParams.has("preview"); });
    if (open) { open.postMessage({ type: "push_open", kind }); return open.focus(); }
    return self.clients.openWindow(url);
  })());
});
