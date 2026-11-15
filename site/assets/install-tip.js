/* On an iPhone in Safari (not yet the Home Screen app): a short note at the top of the landing and setup pages.
   Halftime can only notify a locked iPhone from the Home Screen app, and that app keeps its own storage, so the
   smooth order is: add it to the Home Screen first, then set up there. Shown once per tab; "Not now" hides it. */
(() => {
  "use strict";
  try {
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const alone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (!ios || alone || /[?&]preview=1/.test(location.search) || sessionStorage.getItem("ht-tip-off") === "1") return;
    // the landing page and setup's first step only (ICP testing 1: it sat on top of every setup step)
    const first = () => location.pathname !== "/start" || /^#(account|login)?$/.test(location.hash || "");
    if (!first()) return;
    const el = document.createElement("aside");
    el.setAttribute("aria-label", "Add Halftime to your Home Screen");
    el.style.cssText = "background:#141414;color:#F4F3EF;font:400 .875rem/1.45 Geist,system-ui,-apple-system,sans-serif;padding:calc(env(safe-area-inset-top,0px) + 12px) 16px 12px;display:flex;gap:12px;align-items:flex-start";
    el.innerHTML = '<p style="margin:0;flex:1"><b style="font-weight:600">Testing on your iPhone?</b> Add Halftime to your Home Screen first: tap <b style="font-weight:600">•••</b> or <b style="font-weight:600">Share</b>, then <b style="font-weight:600">Add to Home Screen</b>. Open it from there and set up. That is how it can reach you on a locked phone.</p><button type="button" style="flex:none;min-height:44px;padding:0 12px;border-radius:22px;border:1px solid rgba(255,255,255,.4);background:none;color:inherit;font:500 .875rem/1 inherit;cursor:pointer">Not now</button>';
    el.querySelector("button").addEventListener("click", () => { try { sessionStorage.setItem("ht-tip-off", "1"); } catch (e) {} el.remove(); if (window.HT) HT.event("install_tip", { value: "dismiss" }); });
    const put = () => { document.body.prepend(el); if (window.HT) HT.event("install_tip", { value: "shown" }); };
    // setup moves between steps with history.pushState/replaceState (no hashchange), so watch those too
    const check = () => { if (!first()) el.remove(); };
    addEventListener("hashchange", check); addEventListener("popstate", check);
    for (const k of ["pushState", "replaceState"]) { const f = history[k]; history[k] = function () { const r = f.apply(this, arguments); check(); return r; }; }
    if (document.body) put(); else document.addEventListener("DOMContentLoaded", put);
  } catch (e) {}
})();
