# Cloudflare CDN in front of Traefik (M8)

The CSA stack is self-hosted on a single AWS Lightsail box (Traefik ingress → the
Next/Payload app container → self-hosted Supabase + Redis). There is **no managed
CDN** (unlike Supabase Cloud), so static assets and public media are served from the
one origin. Putting **Cloudflare in front of Traefik** gives a global edge cache,
offloads TLS, and absorbs traffic spikes — for free, and it works with Lightsail.

> **Acceleration, not a dependency.** Everything below is optional. The app is fully
> correct served directly from Traefik with Cloudflare turned off (grey-cloud the DNS
> record and it still works). Cloudflare only makes it faster. Never move correctness
> logic (auth, entitlement checks, money) to the edge.

---

## 1. Topology

```
Browser ──TLS──▶ Cloudflare edge ──TLS──▶ Traefik (Let's Encrypt) ──▶ app:3000
                  (cache + WAF)            (HTTP→HTTPS, gzip/brotli)     (Next/Payload)
```

- DNS `A`/`AAAA` record for `APP_DOMAIN` → the Lightsail public IP, **proxied**
  (orange cloud ON).
- Traefik keeps doing Let's Encrypt for the origin certificate and the HTTP→HTTPS
  redirect + `csa-compress` (see `docker-compose.yml`). Cloudflare terminates TLS at
  the edge and re-encrypts to the origin.

### SSL/TLS mode — **Full (strict)**
Cloudflare → SSL/TLS → Overview → **Full (strict)**. This validates Traefik's
Let's Encrypt cert on the origin hop, so the connection is encrypted *and*
authenticated end to end. Do **not** use "Flexible" (it sends plaintext to the
origin and creates redirect loops with Traefik's HTTP→HTTPS).

- SSL/TLS → Edge Certificates → **Always Use HTTPS: On**, **Minimum TLS 1.2**.
- Keep Traefik's `letsencrypt` resolver; the HTTP-01 challenge still reaches the
  origin through Cloudflare. (If issuance ever stalls behind the proxy, grey-cloud
  the record until the cert is issued, then re-proxy — or use DNS-01.)

---

## 2. What to cache, what to bypass

The origin already sends correct `Cache-Control` (M8 Phase 3 — see
`next.config.mjs` `headers()` and the Next defaults). The golden rule for the edge:
**respect origin headers, and only "cache everything" on the narrow set of paths that
are genuinely public and static.** Everything else bypasses.

### ✅ Edge-cache (public, static, no per-user data)

Create **Cache Rules** (Cloudflare → Caching → Cache Rules) with
**Eligible for cache: Yes** and **Edge TTL: Use cache-control header from origin**:

| Path pattern | Why it's safe | Origin Cache-Control |
|---|---|---|
| `/_next/static/*` | Content-hashed by Next; filename changes on every build | `public, max-age=31536000, immutable` |
| `/_next/image*` | Optimized image proxy, keyed by the (public) source URL | `public, max-age=…` (Next) |
| `/api/media/file/*` | Public CMS media (Payload), strong ETag | `public, max-age=3600, s-maxage=86400, SWR` |
| `/csa/*` | Vendored runtime / self-hosted fonts / hero gifs in `/public` | `public, max-age=3600, SWR` |
| `/favicon.ico`, `/robots.txt`, `/sitemap.xml` | static | — |

`/_next/static/*` and `/csa/*` have file extensions, so Cloudflare's default static
caching already covers them; the Cache Rules above are still worth adding so
`/_next/image*` and `/api/media/file/*` (which have **no** file extension) get cached
too — those need an explicit "Eligible for cache" rule.

### ⛔ Bypass cache (dynamic / authenticated)

Add a Cache Rule **Bypass cache** (or simply do not make them eligible) for
everything per-user. Because the app sends `Cache-Control: private, no-cache,
no-store` on these, Cloudflare won't cache them anyway — the explicit bypass is a
belt-and-braces guard so a future "Cache Everything" page rule can't accidentally
swallow them:

- `/` and all marketing HTML pages — rendered dynamically (the layout reads the auth
  cookie to render logged-in vs logged-out chrome), so they are **per-user** and must
  not be shared-cached.
- `/admin*` — Payload CMS admin.
- `/api/*` **except** `/api/media/file/*` — Local API, auth, GraphQL.
- `/learn/*`, `/assessment/*`, `/certificate*`, `/safety-chat*`, `/dashboard`,
  `/portal`, `/cart`, `/login`, `/signup`, `/account*`, checkout — auth-gated app.
- `/stripe/webhook` — server-to-server, signature-verified; never cache.

### 🚫 NEVER edge-cache — protected / signed deliverables

- `/download/*` — the owner-gated streaming download route (M7). It serves a
  customer's **purchased** files after a per-request entitlement check. Caching it at
  the edge would let one buyer's file be served to another user. Force **Bypass
  cache** on `/download/*` and never relax it.
- Any future **presigned / signed-URL** responses (protected media bucket, M7
  follow-up): the URL itself is the credential. Never cache a signed-URL response,
  and never cache the object it points at if the bucket is private.

> **Cookie safety.** Auth responses carry `Set-Cookie`; Cloudflare will not cache a
> response with `Set-Cookie` under "Eligible for cache". Do not add a Cache Rule that
> strips cookies or ignores them on any path that can be authenticated.

---

## 3. Cloudflare feature settings (avoid breakage)

- **Rocket Loader: OFF.** It defers/reorders `<script>` execution, which breaks
  Next's hydration and the vendored `afterInteractive` runtime (`lucide`, `store.js`,
  `interactions.js`, the WebGL shader module). Leave it off.
- **Auto Minify (JS/CSS/HTML): OFF.** Next already minifies; double-minifying the
  vendored shader bundle / hydration payload risks subtle breakage. (Cloudflare has
  deprecated Auto Minify on new zones anyway.)
- **Brotli: ON** (Speed → Optimization). Cloudflare compresses to the client at the
  edge. The origin also offers gzip/brotli via Traefik `csa-compress`; either way the
  client gets a compressed response. (Next's own gzip is disabled — `compress: false`
  — so the edge/proxy owns compression.)
- **Early Hints: optional.** Safe with Next; can improve LCP via the preload links.
- **WAF / Bot Fight Mode:** fine to enable, but allow `/stripe/webhook` (Stripe's
  IPs) and `/api/*` server callers so legitimate machine traffic isn't challenged.

---

## 4. Purging on publish

Editors publish through Payload; the app's Redis read-cache is purged in-process by
the `afterChange`/`afterDelete` hooks (M8 Phase 1, `src/lib/revalidate.ts`). That
keeps the **origin** fresh. The **edge** copies of cached assets expire by TTL
(media: ≤1 day; `/_next/static`: immutable but the filename changes each deploy, so a
deploy auto-busts it).

- After a deploy, no edge purge is needed for hashed assets (new filenames).
- If you replace a CMS image **keeping the same filename** (rare — Payload normally
  de-dupes to a new filename), purge that one URL: Cloudflare → Caching →
  Configuration → **Purge by URL** (`https://APP_DOMAIN/api/media/file/<name>`), or
  wire a deploy/publish step to the Cloudflare purge API. Avoid "Purge Everything"
  except in emergencies.

---

## 5. Verifying it works

```bash
# Cached asset should show a Cloudflare HIT after the first request:
curl -sI https://APP_DOMAIN/csa/vendor/store.js | grep -i 'cf-cache-status\|cache-control'
curl -sI "https://APP_DOMAIN/api/media/file/<some-image>.png" | grep -i 'cf-cache-status'
#   expect: cf-cache-status: HIT (2nd hit), with the origin Cache-Control preserved.

# A dynamic page must NOT be cached:
curl -sI https://APP_DOMAIN/ | grep -i 'cf-cache-status\|cache-control'
#   expect: cf-cache-status: DYNAMIC (or BYPASS), Cache-Control: private, no-store.

# The protected download route must NEVER be cached:
curl -sI https://APP_DOMAIN/download/<id> | grep -i 'cf-cache-status'
#   expect: BYPASS / DYNAMIC — never HIT.
```

If `cf-cache-status` is absent, the record is grey-clouded (not proxied) — the app
still works, just without the edge. That is the intended graceful fallback.
