# Spike: phone use from iOS Shortcuts (route B)

Throwaway prototype for the 2026-11 phone-use spike. **Not** wired to `site/` or the live `site/api/`.
The write-up and verdict are in the wiki: `Wiki/Cognitive Perf Agent Wiki/25-journal/2026-11-15-spike-phone-use.md`.

| File | What it is |
|---|---|
| `minutes.mjs` | `pullMinutes(events, session)`: open/close pings → minutes in the tester's picked apps during a session, with flags for missed closes |
| `pull-endpoint.mjs` | Local HTTP stand-in for the endpoint (in memory, nothing on disk). Accepts only `code` + `kind` |
| `minutes-test.mjs` | 11 synthetic tests: clean visits, direct switches, the reported Control Center false close, screen lock, clipping, and the endpoint refusing an app name |

```bash
node tools/spikes/phone-use/minutes-test.mjs
```

```bash
node tools/spikes/phone-use/pull-endpoint.mjs
```

## What is stored (the privacy line)

Per ping: the tester's pairing code, `open` or `close`, and the **server's** receive time. Nothing else is accepted: a body with any other key (an app name, a URL, the phone's clock) gets `400`. Per session, Halftime keeps one number, *minutes in your picked apps*, plus a visit count and a "check" flag. Never which app, never per-app minutes, never a list of picked apps. iOS 27.2 reportedly lets an app trigger hand the shortcut the closed app's name. The shortcut must not send it, and the endpoint refuses it if it does.

## The shortcut (what a tester's phone would run)

One shortcut, "Halftime pull", with two app triggers on iOS 27 (or two personal automations on iOS 17–26):

1. **Trigger:** App → *Choose* → the tester's own picks (e.g. Instagram, TikTok) → **Is Opened**. Run without asking (iOS 27: Info → Privacy → Allow Running When Locked; iOS 17–26: Run Immediately, then Notify When Run off).
2. **Action:** Get Contents of URL → `https://<endpoint>/pull-event`, Method **POST**, Request Body **JSON**: `code` = the pairing code (an import question, so it never sits in the shared link), `kind` = `open`.
3. Same again with **Is Closed** and `kind` = `close`.

On the first run iOS asks whether the shortcut may connect to the endpoint's domain. The tester taps **Always Allow** once.

## On-device test (the part this spike could not do from a Mac)

Two team iPhones on the current iOS, `HOST=0.0.0.0` on a laptop on the same Wi-Fi (or a temporary HTTPS tunnel), 20 minutes each:

| # | Do this in a picked app | Expect |
|---|---|---|
| 1 | Open it, use for 2 min, swipe up to Home | open + close |
| 2 | Open it, switch to Safari from the app switcher | open + close |
| 3 | Open it, lock the screen with the side button | close? **undocumented** |
| 4 | Open it, pull down Control Center, back to the app | no close (iOS 26.6 reportedly sends one) |
| 5 | Restart the phone, open the app | open still fires? (reported broken after restart on 26.6) |
| 6 | Phone locked 5 min, unlock straight into the app | open |
| 7 | Airplane mode, open + close, airplane off | lost pings (no queue) |
| 8 | Any banner or prompt on screen at any point? | none after Always Allow |

### Running it

1. On the Mac, start the endpoint on the network: `HOST=0.0.0.0 node tools/spikes/phone-use/pull-endpoint.mjs`. Open `http://localhost:8787/watch`. It shows pings live, has a "Start check N" button per row, and **Save this run** writes `results/run-*.json`. That folder is git-ignored.
2. On the iPhone (same Wi-Fi as the Mac), make shortcut **HT open**:
   - Add the **Get Contents of URL** action.
   - URL: `http://<Mac's Wi-Fi IP>:8787/pull-event`.
   - Show More → Method **POST** → Request Body **JSON**.
   - Add two **Text** fields: `code` = `phonetest01` and `kind` = `open`.
   - Run it once by hand and allow any prompts (connect to this address, local network). The watch page should show `open`.
3. Duplicate it as **HT close** with `kind` = `close`.
4. Attach the triggers:
   - **iOS 17–26:** Automation tab → **+** → App → Choose (one test app) → Done → Is Opened → Run Immediately → Notify When Run off → Next → pick **HT open**. Repeat with Is Closed → **HT close**.
   - **iOS 27:** open HT open → Edit → Automation → App → that app, Is Opened → let it run without asking. Repeat for HT close.
5. Note the iOS version and roughly how many taps steps 2–4 took. Then do the 8 checks, tapping each check's button on the watch page first.

Kill rule: if 1, 2 or 8 fails on either phone, or 3 never fires and the cap makes most sessions "check", route B is dead and the pilot uses A + F.
