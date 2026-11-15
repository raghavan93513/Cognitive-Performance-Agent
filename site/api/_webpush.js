// Web Push with no dependencies: VAPID (RFC 8292) and the aes128gcm message encryption (RFC 8291), on node:crypto.
// The public key is public by design (the browser needs it to subscribe). The private key is the only secret:
// it lives in the Vercel env var VAPID_PRIVATE_KEY and nowhere in the repo. With no private key set, nothing is sent
// and the app falls back to showing the suggestion when it is next opened.
import crypto from "node:crypto";

export const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY || "BESYygMjOX1-pSAen8S6qXp8VedQwicA4ty7FU1bpoDoOQyIAVGtmVjdCHMnRIV_7cIT1HCaZuo-c0Bq2P7NzVI";
const SUBJECT = process.env.VAPID_SUBJECT || "https://halftime-study.vercel.app";
export const pushConfigured = () => Boolean(process.env.VAPID_PRIVATE_KEY);

const b64u = (b) => Buffer.from(b).toString("base64url");
const unb64u = (s) => Buffer.from(String(s || ""), "base64url");

// Only real browser push services: the endpoint comes from the browser, so it is never fetched blindly.
const HOSTS = [/(^|\.)push\.apple\.com$/, /^fcm\.googleapis\.com$/, /(^|\.)push\.services\.mozilla\.com$/, /(^|\.)notify\.windows\.com$/];
export function validEndpoint(endpoint) {
  try { const u = new URL(endpoint); return u.protocol === "https:" && !u.port && HOSTS.some((re) => re.test(u.hostname)); } catch { return false; }
}

function vapidHeader(endpoint) {
  const pub = unb64u(VAPID_PUBLIC);
  const key = crypto.createPrivateKey({ format: "jwk", key: { kty: "EC", crv: "P-256", x: b64u(pub.subarray(1, 33)), y: b64u(pub.subarray(33, 65)), d: process.env.VAPID_PRIVATE_KEY } });
  const head = b64u(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const claims = b64u(JSON.stringify({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: SUBJECT }));
  const sig = crypto.sign("sha256", Buffer.from(`${head}.${claims}`), { key, dsaEncoding: "ieee-p1363" });
  return `vapid t=${head}.${claims}.${b64u(sig)}, k=${VAPID_PUBLIC}`;
}

// RFC 8291. `test` fixes the salt and the sender key so the RFC's worked example can be checked (tools/qa/webpush-test.mjs).
export function encrypt(plaintext, p256dh, auth, test) {
  const ua = unb64u(p256dh), secret = unb64u(auth);
  if (ua.length !== 65 || ua[0] !== 4 || secret.length < 16) throw new Error("bad subscription keys");
  const ecdh = crypto.createECDH("prime256v1");
  if (test && test.priv) ecdh.setPrivateKey(unb64u(test.priv)); else ecdh.generateKeys();
  const as = ecdh.getPublicKey(), shared = ecdh.computeSecret(ua);
  const salt = test && test.salt ? unb64u(test.salt) : crypto.randomBytes(16);
  const ikm = Buffer.from(crypto.hkdfSync("sha256", shared, secret, Buffer.concat([Buffer.from("WebPush: info\0"), ua, as]), 32));
  const cek = Buffer.from(crypto.hkdfSync("sha256", ikm, salt, Buffer.from("Content-Encoding: aes128gcm\0"), 16));
  const nonce = Buffer.from(crypto.hkdfSync("sha256", ikm, salt, Buffer.from("Content-Encoding: nonce\0"), 12));
  const c = crypto.createCipheriv("aes-128-gcm", cek, nonce);
  const body = Buffer.concat([c.update(Buffer.concat([Buffer.from(plaintext), Buffer.from([2])])), c.final(), c.getAuthTag()]);
  const rs = Buffer.alloc(4); rs.writeUInt32BE(4096);
  return Buffer.concat([salt, rs, Buffer.from([as.length]), as, body]);
}

// → { status } from the push service: 201 accepted, 404 or 410 the subscription is gone, 0 not sent
export async function sendPush(sub, payload, { ttl = 900, timeout = 8000 } = {}) {
  if (!pushConfigured()) return { status: 0, error: "unconfigured" };
  if (!sub || !validEndpoint(sub.endpoint)) return { status: 0, error: "endpoint" };
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(), timeout);
  try {
    const res = await fetch(sub.endpoint, {
      method: "POST", signal: ac.signal, redirect: "error",
      headers: { Authorization: vapidHeader(sub.endpoint), "Content-Encoding": "aes128gcm", "Content-Type": "application/octet-stream", TTL: String(ttl), Urgency: "high" },
      body: encrypt(JSON.stringify(payload), sub.p256dh, sub.auth),
    });
    return { status: res.status, error: res.ok ? "" : (await res.text().catch(() => "")).slice(0, 200) };
  } catch (e) { return { status: 0, error: String(e).slice(0, 200) }; } finally { clearTimeout(timer); }
}
