#!/usr/bin/env node
// Checks site/api/_webpush.js against the worked example in RFC 8291, Appendix A (same keys, same salt → same bytes).
//   node tools/qa/webpush-test.mjs
import { encrypt, validEndpoint } from "../../site/api/_webpush.js";
const got = encrypt("When I grow up, I want to be a watermelon", "BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcxaOzi6-AYWXvTBHm4bjyPjs7Vd8pZGH6SRpkNtoIAiw4", "BTBZMqHH6r4Tts7J_aSIgg",
  { priv: "yfWPiYE-n46HLnH0KqZOF1fJJU3MYrct3AELtAQ-oRw", salt: "DGv6ra1nlYgDCS1FRnbzlw" }).toString("base64url");
const want = "DGv6ra1nlYgDCS1FRnbzlwAAEABBBP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A_yl95bQpu6cVPTpK4Mqgkf1CXztLVBSt2Ks3oZwbuwXPXLWyouBWLVWGNWQexSgSxsj_Qulcy4a-fN";
const ok = got === want && validEndpoint("https://web.push.apple.com/abc") && !validEndpoint("https://example.com/x") && !validEndpoint("http://web.push.apple.com/x");
console.log(ok ? "web push encryption matches RFC 8291; endpoint allow-list ok" : `MISMATCH\n got ${got}\nwant ${want}`);
process.exit(ok ? 0 : 1);
