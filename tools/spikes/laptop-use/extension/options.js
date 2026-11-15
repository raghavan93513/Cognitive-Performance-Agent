import { SITES, originsFor } from "./sites.js";

const list = document.getElementById("sites"), msg = document.getElementById("msg");
const getPicks = async () => (await chrome.storage.local.get("picks")).picks || [];

// A pick counts only while the browser still grants the site (the tester can take access away in the browser's settings).
async function reconcile() {
  const picks = await getPicks(), keep = [];
  for (const d of picks) if (await chrome.permissions.contains({ origins: [`*://*.${d}/*`] })) keep.push(d);
  if (keep.length !== picks.length) await chrome.storage.local.set({ picks: keep });
  return keep;
}

async function draw() {
  const picks = await reconcile();
  list.innerHTML = "";
  for (const site of SITES) {
    const on = site.domains.every((d) => picks.includes(d));
    const li = document.createElement("li"), b = document.createElement("button");
    b.type = "button"; b.className = "site"; b.textContent = site.label; b.setAttribute("aria-pressed", String(on));
    b.dataset.label = site.label;
    b.addEventListener("click", () => toggle(site, !on));
    li.append(b); list.append(li);
  }
}

async function toggle(site, on) {
  const origins = originsFor(site);
  let picks = await getPicks();
  if (on) {
    // must run straight from the click: the browser shows its own "allow" prompt here
    const granted = await chrome.permissions.request({ origins }).catch(() => false);
    if (!granted) { msg.textContent = `Not added: the browser didn't get your OK for ${site.label}.`; return draw(); }
    picks = [...new Set([...picks, ...site.domains])];
    msg.textContent = `${site.label} added.`;
  } else {
    await chrome.permissions.remove({ origins }).catch(() => false);
    picks = picks.filter((d) => !site.domains.includes(d));
    msg.textContent = `${site.label} removed. The extension can no longer see when you're on it.`;
  }
  await chrome.storage.local.set({ picks });
  draw();
}

document.getElementById("forget").addEventListener("click", async () => {
  const picks = await getPicks();
  for (const site of SITES) if (site.domains.some((d) => picks.includes(d))) await chrome.permissions.remove({ origins: originsFor(site) }).catch(() => false);
  await chrome.storage.local.clear();
  msg.textContent = "Forgotten. Nothing is stored now.";
  draw();
});

draw();
