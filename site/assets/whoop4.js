/* Halftime: read a WHOOP 4.0 over Bluetooth (Web Bluetooth: Chrome or Edge on a computer; iPhone Safari can't).
 * No WHOOP account or app is used. One "sync" connects, checks the band's clock, collects the heart rate and
 * beat-to-beat intervals the band has stored since the last sync, then disconnects.
 *
 * The protocol is unofficial. It follows community notes: whoof-40 docs/PROTOCOL.md (MIT) and zordhalo/whoopsie-protocol.
 * The command framing reproduces 5 frames recorded from WHOOP's own app byte for byte (tools/qa/night-test.mjs).
 * Only commands that read, stream history, set the clock or buzz are used. Nothing reboots, erases or updates firmware.
 *
 * Stored history comes in batches. After a batch arrives we hand it to onBatch (which saves it) and only then tell the
 * band "received" (that lets the band free that memory, as WHOOP's app does). A batch that wasn't saved is never
 * acknowledged, so the band sends it again next time.
 */
(function (root) {
  "use strict";
  const UUID = {
    service: "61080001-8d6d-82b8-614a-1c8cb0f8dcc6",
    command: "61080002-8d6d-82b8-614a-1c8cb0f8dcc6",
    response: "61080003-8d6d-82b8-614a-1c8cb0f8dcc6",
    event: "61080004-8d6d-82b8-614a-1c8cb0f8dcc6",
    data: "61080005-8d6d-82b8-614a-1c8cb0f8dcc6",
  };
  const TYPE = { COMMAND: 0x23, RESPONSE: 0x24, REALTIME: 0x28, HISTORICAL: 0x2f, EVENT: 0x30, METADATA: 0x31 };
  const CMD = { TOGGLE_REALTIME_HR: 3, REPORT_VERSION_INFO: 7, SET_CLOCK: 10, GET_CLOCK: 11, SEND_HISTORICAL_DATA: 22, HISTORICAL_DATA_RESULT: 23, GET_BATTERY_LEVEL: 26, GET_HELLO_HARVARD: 35, RUN_HAPTICS_PATTERN: 79 };
  const META = { HISTORY_START: 1, HISTORY_END: 2, HISTORY_COMPLETE: 3 };
  const Y2020 = 1577836800; // a band whose clock ran flat reports times near 1970: those records can't be placed

  // ---------- checksums and bytes
  function crc8(bytes) { let c = 0; for (const b of bytes) { c ^= b; for (let i = 0; i < 8; i++) c = c & 0x80 ? ((c << 1) ^ 0x07) & 0xff : (c << 1) & 0xff; } return c; }
  const T32 = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(bytes) { let c = 0xffffffff; for (const b of bytes) c = T32[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
  const u16 = (d, o) => d[o] | (d[o + 1] << 8);
  const u32 = (d, o) => (d[o] | (d[o + 1] << 8) | (d[o + 2] << 16) | (d[o + 3] << 24)) >>> 0;
  const le32 = (v) => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
  const hex = (d) => Array.from(d, (b) => b.toString(16).padStart(2, "0")).join("");

  // AA | length u16 | crc8(length) | 0x23 seq cmd payload (zero-padded to 4 bytes) | crc32(inner)
  function frame(seq, cmd, payload = []) {
    const inner = [TYPE.COMMAND, seq & 0xff, cmd, ...payload];
    while (inner.length % 4) inner.push(0);
    const len = inner.length + 4, lb = [len & 255, len >> 8];
    return Uint8Array.from([0xaa, ...lb, crc8(lb), ...inner, ...le32(crc32(inner))]);
  }
  function parse(a) {
    if (a.length < 8 || a[0] !== 0xaa) return { ok: false, why: "start" };
    const len = u16(a, 1);
    if (crc8([a[1], a[2]]) !== a[3]) return { ok: false, why: "header" };
    if (a.length < 4 + len) return { ok: false, why: "short" };
    const inner = a.subarray(4, len), ok = crc32(inner) === u32(a, len);
    return { ok, why: ok ? "" : "body", type: inner[0], seq: inner[1], cmd: inner[2], data: inner.subarray(3) };
  }
  // one notification may hold a frame, part of one, or several; padding between frames is skipped
  function reassembler(onFrame) {
    let buf = new Uint8Array(0);
    return (chunk) => {
      const c = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      const m = new Uint8Array(buf.length + c.length); m.set(buf); m.set(c, buf.length); buf = m;
      for (let guard = 0; guard < 64 && buf.length; guard++) {
        while (buf.length && buf[0] !== 0xaa) buf = buf.subarray(1);
        if (buf.length < 4) break;
        if (crc8([buf[1], buf[2]]) !== buf[3]) { buf = buf.subarray(1); continue; }
        const total = 4 + u16(buf, 1);
        if (buf.length < total) break;
        onFrame(parse(buf.subarray(0, total)));
        buf = buf.subarray(total);
      }
      buf = buf.slice();
    };
  }

  // ---------- decoders (offsets into `data`, after type|seq|cmd)
  const okHr = (v) => (v >= 25 && v <= 230 ? v : null);
  const rrList = (d, at, n) => { const out = []; for (let i = 0; i < Math.min(4, n); i++) { if (at + i * 2 + 1 >= d.length) break; const v = u16(d, at + i * 2); if (v >= 250 && v <= 2400) out.push(v); } return out; };
  const decode = {
    realtime: (d) => (d.length < 7 ? null : { hr: okHr(d[5]), rr: rrList(d, 7, d[6]) }),
    historical: (d) => (d.length < 16 ? null : { t: u32(d, 4), hr: okHr(d[14]), rr: rrList(d, 16, d[15]) }),
    battery: (d) => (d.length >= 4 ? u16(d, 2) / 10 : null),
    clock: (d) => (d.length >= 6 ? u32(d, 2) : null),
    hello: (d) => {
      if (d.length < 19) return {};
      const s = d.subarray(9, 18), serial = Array.from(s).every((b) => b >= 0x20 && b < 0x7f) ? String.fromCharCode(...s).trim() : null;
      return { charging: d[7] === 1, serial, worn: d.length > 116 ? d[116] === 1 : null };
    },
    version: (d) => (d.length < 35 ? null : Array.from({ length: 4 }, (_, i) => u32(d, 3 + i * 4)).join(".")),
    metaEnd: (d) => (d.length >= 14 ? (d.length >= 18 ? Array.from(d.subarray(10, 18)) : [...le32(u32(d, 10)), 0, 0, 0, 0]) : null),
  };

  const supported = () => !!(root.navigator && root.navigator.bluetooth && root.isSecureContext);
  async function radioOn() { try { return root.navigator.bluetooth.getAvailability ? await root.navigator.bluetooth.getAvailability() : true; } catch { return true; } }

  // a typed error the Night tab can word plainly
  class SyncError extends Error { constructor(code, msg) { super(msg || code); this.code = code; } }

  /* sync({ onProgress, onBatch, cancelled, quietMs })
   *   onProgress({ stage, records, batches, battery, charging })   stage: pick | connect | check | history | done
   *   onBatch(records) → Promise   save a batch; resolve only once it is safely stored
   *   cancelled() → boolean         asked between steps; true stops after the current batch
   * Resolves { device, serial, firmware, battery, charging, clockReset, records, dropped, batches, complete }.
   * Rejects with SyncError: unsupported | radio_off | cancelled_pick | not_whoop4 | connect | lost */
  async function sync(opts = {}) {
    const onProgress = opts.onProgress || (() => {}), onBatch = opts.onBatch || (async () => {}), cancelled = opts.cancelled || (() => false);
    const quietMs = opts.quietMs || 20000, bt = root.navigator && root.navigator.bluetooth;
    if (!supported()) throw new SyncError("unsupported");
    // the picker first: Chrome only opens it straight after a click, so nothing may be awaited before it
    onProgress({ stage: "pick" });
    let device;
    try { device = await bt.requestDevice({ filters: [{ namePrefix: "WHOOP" }, { services: [UUID.service] }], optionalServices: [UUID.service] }); }
    catch (e) {
      if (!(await radioOn())) throw new SyncError("radio_off", e && e.message);
      throw new SyncError(e && e.name === "NotFoundError" ? "cancelled_pick" : e && e.name === "SecurityError" ? "blocked" : "radio_off", e && e.message);
    }

    let seq = 0xa0, chain = Promise.resolve(), gone = false, lastFrameAt = Date.now();
    const pending = new Map(), chars = {};
    const out = { device: device.name || "WHOOP", serial: null, firmware: null, battery: null, charging: null, clockReset: false, records: 0, dropped: 0, batches: 0, complete: false };
    let batch = [], histDone = null, histFail = null, ackChain = Promise.resolve(), failed = false;

    const onGone = () => { gone = true; for (const [, r] of pending) r(null); pending.clear(); if (histFail) histFail(new SyncError("lost")); };
    device.addEventListener("gattserverdisconnected", onGone);
    const write = (cmd, payload) => (chain = chain.then(() => {
      if (gone) throw new SyncError("lost");
      const f = frame(seq++, cmd, payload), c = chars.command;
      return c.properties.write ? c.writeValueWithResponse(f) : c.writeValueWithoutResponse(f);
    }));
    const ask = (cmd, payload = [0], ms = 5000) => new Promise((resolve) => {
      const t = setTimeout(() => { pending.delete(cmd); resolve(null); }, ms);
      pending.set(cmd, (d) => { clearTimeout(t); resolve(d); });
      write(cmd, payload).catch(() => { clearTimeout(t); pending.delete(cmd); resolve(null); });
    });

    function onFrame(p) {
      if (!p.ok) return;
      lastFrameAt = Date.now();
      if (p.type === TYPE.RESPONSE) { const r = pending.get(p.cmd); if (r) { pending.delete(p.cmd); r(p.data); } return; }
      if (p.type === TYPE.HISTORICAL) {
        const r = decode.historical(p.data); if (!r) return;
        if (r.t < Y2020) { out.dropped++; return; }
        batch.push(r); return;
      }
      if (p.type === TYPE.METADATA) {
        if (p.cmd === META.HISTORY_END) {
          const recs = batch; batch = [];
          const ack = decode.metaEnd(p.data);
          ackChain = ackChain.then(async () => {
            if (failed) return;                           // an earlier batch didn't save: acknowledge nothing more
            if (recs.length) await onBatch(recs);        // saved first ...
            out.records += recs.length; out.batches++;
            onProgress({ stage: "history", records: out.records, batches: out.batches, battery: out.battery, charging: out.charging });
            if (cancelled()) { if (histDone) histDone(false); return; }
            if (ack) await write(CMD.HISTORICAL_DATA_RESULT, [1, ...ack]); // ... then acknowledged
          }).catch((e) => { failed = true; if (histFail) histFail(e instanceof SyncError ? e : new SyncError("save", e && e.message)); });
        } else if (p.cmd === META.HISTORY_COMPLETE) {
          const recs = batch; batch = [];
          ackChain = ackChain.then(async () => { if (failed) return; if (recs.length) { await onBatch(recs); out.records += recs.length; } if (histDone) histDone(true); })
            .catch((e) => { failed = true; if (histFail) histFail(e instanceof SyncError ? e : new SyncError("save", e && e.message)); });
        }
      }
    }

    try {
      onProgress({ stage: "connect" });
      const server = await device.gatt.connect();
      let svc;
      try { svc = await server.getPrimaryService(UUID.service); } catch { throw new SyncError("not_whoop4"); }
      for (const k of ["command", "response", "event", "data"]) chars[k] = await svc.getCharacteristic(UUID[k]);
      for (const k of ["response", "event", "data"]) {
        const feed = reassembler(onFrame);
        chars[k].addEventListener("characteristicvaluechanged", (e) => feed(new Uint8Array(e.target.value.buffer, e.target.value.byteOffset, e.target.value.byteLength)));
        await chars[k].startNotifications();
      }

      onProgress({ stage: "check" });
      const hello = await ask(CMD.GET_HELLO_HARVARD);
      if (hello) { const h = decode.hello(hello); out.serial = h.serial || null; out.charging = h.charging == null ? null : h.charging; }
      const bat = await ask(CMD.GET_BATTERY_LEVEL); if (bat) out.battery = decode.battery(bat);
      const ver = await ask(CMD.REPORT_VERSION_INFO); if (ver) out.firmware = decode.version(ver);
      const clk = await ask(CMD.GET_CLOCK), now = Math.floor(Date.now() / 1000);
      if (clk) {
        const band = decode.clock(clk);
        if (band == null || band < Y2020 || Math.abs(band - now) > 60) { out.clockReset = band == null || band < Y2020; await write(CMD.SET_CLOCK, le32(now)); }
      }
      if (!hello && !bat && !clk) throw new SyncError("no_answer");

      onProgress({ stage: "history", records: 0, batches: 0, battery: out.battery, charging: out.charging });
      out.complete = await new Promise((resolve, reject) => {
        histDone = resolve; histFail = reject;
        write(CMD.SEND_HISTORICAL_DATA, [0]).catch(reject);
        const watch = setInterval(() => {
          if (gone) { clearInterval(watch); return; }
          if (Date.now() - lastFrameAt > quietMs) { clearInterval(watch); ackChain.then(() => resolve(false)); } // the band went quiet
        }, 1000);
        const stop = (v) => { clearInterval(watch); return v; };
        histDone = (v) => resolve(stop(v)); histFail = (e) => reject(stop(e));
      });
      onProgress({ stage: "done", records: out.records, batches: out.batches, battery: out.battery, charging: out.charging });
      return out;
    } catch (e) {
      if (e instanceof SyncError) { e.partial = out; throw e; }
      const err = new SyncError(gone ? "lost" : "connect", e && e.message); err.partial = out; throw err;
    } finally {
      device.removeEventListener("gattserverdisconnected", onGone);
      try { if (device.gatt && device.gatt.connected) device.gatt.disconnect(); } catch {}
    }
  }

  const api = { UUID, TYPE, CMD, META, crc8, crc32, frame, parse, reassembler, decode, hex, le32, supported, sync, SyncError };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.HalftimeWhoop = api;
})(typeof window !== "undefined" ? window : globalThis);
