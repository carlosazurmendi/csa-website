# Performance & caching (M8)

How the CSA site stays fast on a single self-hosted Lightsail box, and the evidence
behind the M8 optimization gate. Pairs with [cloudflare-cdn.md](./cloudflare-cdn.md)
(the optional edge layer).

## Rendering (M8 Phase 1)
- **Server Components + Payload Local API** — public content is read in-process (no
  client HTTP round-trip for content). See `src/lib/cms.ts`.
- **Redis read-cache + revalidate-on-publish** — hot CMS reads are cached in Redis
  with a short TTL; Payload `afterChange`/`afterDelete` hooks purge on publish, so
  edits appear without a redeploy. See `src/lib/cache.ts`, `src/lib/revalidate.ts`.
- Pages render `ƒ` (dynamic) by design: the `(frontend)` layout reads the auth cookie
  to render logged-in vs logged-out chrome, so HTML is per-user and not shared-cached.
  Detail routes that don't depend on auth (`[slug]`) are `●` SSG. This is why the
  HTTP layer keeps pages `private, no-store` and pushes caching to data (Redis) +
  assets (below) rather than full-page ISR.

## Assets (M8 Phase 2 + 3)
- **next/image** everywhere CMS/marketing imagery renders — responsive `srcset`,
  modern formats (WebP/AVIF), lazy-loading below the fold, intrinsic dimensions (no
  CLS). The brand logo is a **static import** → content-hashed, immutable asset.
  (Animated hero GIFs + third-party `.ico` favicons stay plain `<img>` by design —
  see the M8 Phase 2 commit.)
- **Self-hosted fonts** via `next/font` (`src/lib/fonts.ts`) — Archivo, IBM Plex
  Sans/Mono, Space Grotesk are built into `/_next/static` and **preloaded**; the two
  render-blocking Google Fonts `@import`s were removed.
- **Immutable hashed static** — `/_next/static/*` ships `Cache-Control: public,
  max-age=31536000, immutable`; filenames change every build so deploys self-bust.

## HTTP caching (M8 Phase 3) — `next.config.mjs` `headers()`

| Path | Cache-Control | Notes |
|---|---|---|
| `/_next/static/*` | `public, max-age=31536000, immutable` | Next default; content-hashed |
| `/api/media/file/*` | `public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800` | CMS media; Payload also sends a strong ETag |
| `/csa/*` | `public, max-age=3600, stale-while-revalidate=86400` | vendored runtime / fonts / hero gifs (unhashed → short cache + SWR) |
| HTML pages | `private, no-cache, no-store, must-revalidate` | per-user (auth) — never shared-cached |
| `/download/*` | (dynamic) | owner-gated; never cacheable |

## Compression (M8 Phase 3)
- Next's own gzip is **off** (`compress: false`). Compression is owned by the edge:
  Traefik `csa-compress` (gzip + brotli + zstd, Traefik v3) at the origin, and
  Cloudflare brotli at the edge when the CDN is enabled. This lets brotli actually
  apply — a Next gzip `Content-Encoding` would otherwise be passed through and shadow
  it.

## Gate evidence (lean build, no blocking resources)
- **Lean image:** `csa-website:latest` ≈ **515 MB** — Next `output: 'standalone'`
  (server + traced deps only) on `node:22-bookworm-slim`; `sharp` traced in for image
  optimization. `public/` + `.next/static` copied explicitly.
- **No render-blocking scripts:** every `/_next/static/chunks/*.js` in `<head>` is
  `async`; the only non-async tag is the `nomodule` legacy polyfill (modern browsers
  skip it). The vendored runtime (lucide, store, interactions, WebGL shaders) loads
  `afterInteractive` / `type=module`. No external/third-party blocking request.
- **No blocking webfont request:** fonts are self-hosted and preloaded (7 woff2
  preloads on the home page); 0 requests to `fonts.googleapis.com`.
- **CSS:** the design system minifies to a few parallel, cached, compressed chunks in
  `<head>` (CSS is render-blocking by nature — kept minimal and shared).
- **Build:** `next build` green; the CSS-fidelity guardrail
  (`scripts/check-css-fidelity.mjs`) passes (backdrop-filter, background-clip:text,
  mask, clip-path, mix-blend-mode all survive minification).
- **Local timing (warm cache, direct origin, no CDN):** DOMContentLoaded ≈ 380 ms,
  load ≈ 1.1 s. The edge (Cloudflare) further cuts asset latency globally.
