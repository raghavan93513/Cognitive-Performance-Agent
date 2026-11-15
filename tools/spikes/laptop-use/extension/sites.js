// The sites a tester can pick. Each one must also be listed in manifest.json "optional_host_permissions":
// the browser lets the extension see a tab's address only on sites the tester has granted, so it can't see any other site.
// Adding a site = one line here + one line in the manifest + reload the extension.
export const SITES = [
  { label: "Instagram", domains: ["instagram.com"] },
  { label: "TikTok", domains: ["tiktok.com"] },
  { label: "YouTube", domains: ["youtube.com"] },
  { label: "X (Twitter)", domains: ["x.com", "twitter.com"] },
  { label: "Reddit", domains: ["reddit.com"] },
  { label: "Facebook", domains: ["facebook.com"] },
  { label: "Snapchat", domains: ["snapchat.com"] },
  { label: "Netflix", domains: ["netflix.com"] },
  { label: "Twitch", domains: ["twitch.tv"] },
  { label: "Pinterest", domains: ["pinterest.com"] },
  { label: "Discord", domains: ["discord.com"] },
];

// "*.instagram.com" also matches instagram.com itself; "*://" means http and https only.
export const originsFor = (site) => site.domains.map((d) => `*://*.${d}/*`);
