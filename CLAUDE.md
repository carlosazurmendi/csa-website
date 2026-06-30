# CLAUDE.md — working rules for this repo

Authoritative instructions for any AI agent working in this project. Read fully before editing.

## How to work here (behavioral contract — these prevent the mistakes that have actually happened)

1. **Confirm interpretation before any wide or ambiguous change.** If a request touches many
   files/elements, or the wording could parse two ways (especially *which* items are
   included vs *excluded*), restate the interpretation in one line and get a "yes" before
   editing. A single clarifying question is always cheaper than a wrong sweep.
   - Real example that broke: "Excluding A, the other buttons (B…) and C, make everything
     static." The named items were the **keep-animated exclusions**, not the targets. Do
     not guess the exclude/include direction — confirm it.

2. **Verify against the live, running state before claiming anything works.** Reading the
   source is not verification. Before saying "done" / "fixed" / "this will help":
   - For runtime/visual/perf behavior, inspect the actual page (connected browser, or a
     static harness served from `public/` — `next dev` needs the DB and won't boot for
     this).
   - Confirm the deployed asset is the one running (see the cache trap below).

3. **STOP and surface on real conflicts or decisions.** Don't paper over a contradiction
   between the request and what the code/design shows — quote it and ask.

4. **Don't declare CI-green as behavior-correct.** CI only gates the build. It passed on a
   change whose *behavior* was the exact opposite of what was asked. Behavior is verified
   in a browser, not by a green check.

## Deploy + cache trap (this has masked multiple correct deploys)

- Deploy flow: push to `main` → GitHub Actions builds images to **GHCR** → redeploy in
  **dockhand** (pull `latest` or pin `IMAGE_TAG=sha-<sha>`). There is **no local runtime**
  (the bundled Postgres/GoTrue/MinIO stack is the system of record; the old Supabase is gone).
- **`/csa/*` static assets are fixed-name and cached `max-age` (hours, browser) + Cloudflare
  (~24h).** They are NOT hash-busted like `_next/static/*`, so historically a changed file
  did not reach users until the cache expired — this masked multiple deploys.
- **Now mostly fixed by URL versioning.** The vendored `<Script>` tags in the layouts append
  `?v=<build>` via `va()` (`src/lib/assetVersion.ts`, stamped per build by
  `NEXT_PUBLIC_ASSET_VERSION` in `next.config.mjs`), so each deploy ships fresh URLs that bust
  the browser AND any CDN — no Cloudflare purge needed, on any domain. Hero posters are now
  content-named `.webp`. **Two things stay unversioned on purpose:** `paper-shaders.bundle.js`
  (its `<link modulepreload>` must match `csa-shaders.js`'s internal import path; the bundle is
  stable), and any raw `/csa/*` asset referenced from a plain static file rather than a layout.
  If you change one of those, bump it manually or rely on the boot-time Cloudflare purge
  (`src/instrumentation.ts`, when CF creds are set).
  - Still verify the *running* asset, not just origin, when debugging: compare the page's loaded
    byte size vs an origin cache-busted fetch (`?cb=<n>`), and `Cf-Cache-Status`.

## WebGL / liquid-metal shaders (`public/csa/vendor/csa-shaders.js`)

- Each `<csa-liquid-metal>` / `<csa-grain>` / `<csa-pulsing-border>` = **one WebGL context**
  running a fragment shader every frame. They are the site's dominant runtime cost.
- Canvas is sized to **2× the host's longest side** (`MetalEl`), so a 2px border can render a
  multi-megapixel canvas. Measured idle home page: ~8 contexts, ~31 Mpx/frame. This is the
  "freezes my whole computer" symptom. Shrinking the square / clamping resolution is the
  highest perf-per-effort fix.
- Metal modes: hover-activated is the **default** for `data-metal` edges; opt back into
  always-on with `data-metal-mode="always"` OR a `book-a-consultation` link (href rule).
  React-owned `data-no-lazy` rings hover-gate themselves inside the element.
- **Keep continuously animated (do not gate):** the named CTAs marked `data-metal-mode="always"`,
  the header nav CTA, and every "Book a Consultation" CTA.

## Global product rules (non-negotiable)

- **Pixel-faithful** to the design export — never redesign or "improve" visuals unasked.
- **CMS-driven** — nothing client-editable may be hardcoded; it comes from Payload.
- **Server-authoritative money / entitlements** — only via verified Stripe webhook.
- **Additive migrations**; build green at every gate.
- **Secrets by reference only** — the operator sets live secret values (DB/MinIO/JWT/SMTP/
  Stripe) in dockhand. Never invent or commit credentials/tokens.
