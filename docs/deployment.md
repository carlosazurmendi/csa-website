# Deployment — secrets, environment & data protection

Operator reference for a production CSA deploy of the **self-contained bundle** (app +
Postgres + GoTrue + MinIO + Redis behind an existing Traefik). Pairs with the runbook in
[../README.md](../README.md). Covers the environment-variable inventory, secrets
handling, persistence/backups, the database TLS posture, and the application-layer
security guarantees.

---

## 1. Environment variable inventory

**Only `NEXT_PUBLIC_*` reaches the browser** — everything else is server-only. Set live
values by reference in the real environment (or dockhand's env editor); never commit
`.env`.

### 1a. Operator-set secrets — strong, rotate, never `NEXT_PUBLIC_`

| Variable | Required | Notes |
|---|---|---|
| `PAYLOAD_SECRET` | ✅ | Payload signing / JWT secret. `openssl rand -hex 32`. A fixed/known value forges admin sessions. |
| `POSTGRES_PASSWORD` | ✅ | Bundled Postgres password. `DATABASE_URI` is **built from it** automatically. |
| `GOTRUE_JWT_SECRET` | ✅ | Signs/verifies all auth tokens. **Must** match the anon + service keys (generate the trio with `scripts/gen-supabase-keys.mjs`). |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Server-only `service_role` JWT. Bypasses RLS — never expose. From the same generator run. |
| `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` | ✅ | MinIO root creds; **double as the S3 access key/secret** the app uses. |
| `REDIS_PASSWORD` | ✅ | Used by the redis service + interpolated into `REDIS_URL`. The two **must match**. |
| `REDIS_URL` | ✅ | Embeds the Redis password. Keep in sync with `REDIS_PASSWORD`. |
| `GOTRUE_SMTP_PASS` | for email | SMTP password (with `_HOST`/`_PORT`/`_USER`) when `GOTRUE_MAILER_AUTOCONFIRM=false`. |
| `STRIPE_SECRET_KEY` | optional¹ | Commerce. Empty → checkout inert. |
| `STRIPE_WEBHOOK_SECRET` | optional¹ | Verifies webhook signatures — required for grants to be issued. |
| `ANTHROPIC_API_KEY` | optional¹ | Safety Chat. Empty → assistant inert. |
| `SEED_ADMIN_PASSWORD` | seed-time | First admin password. **Unset falls back to a public default (`ChangeMe!2026`)** — always set before the first deploy. |

¹ *Inert-when-empty by design: the feature degrades gracefully rather than crashing.*

### 1b. Server-only configuration (non-secret)

| Variable | Default | Notes |
|---|---|---|
| `APP_DOMAIN` | — | Public site host (Traefik rule). Drives the derived URLs in §1d. |
| `STORAGE_DOMAIN` | — | Storage subdomain (e.g. `files.<domain>`) for presigned downloads. **Needs its own DNS A record.** |
| `IMAGE_TAG` | `latest` | GHCR tag to pull. Pin a `sha-xxxxxxx` for an immutable deploy. |
| `DATABASE_SSL` | `false` | Same-box private network → TLS off. |
| `GOTRUE_MAILER_AUTOCONFIRM` | `false` | `true` confirms signups instantly (no SMTP) — launch shortcut; revert for real email confirmation. |
| `GOTRUE_SMTP_HOST`/`_PORT`/`_USER`/`_ADMIN_EMAIL`/`_SENDER_NAME` | — / `587` / — / — / CSA | SMTP delivery for confirmation/recovery email. |
| `SUPABASE_S3_REGION` | `us-east-1` | S3 region label. |
| `S3_PUBLIC_BUCKET` / `S3_PROTECTED_BUCKET` | `marketing` / `course-assets` | Public (proxied through app) / **private** (presigned-only) buckets. |
| `STRIPE_AUTOMATIC_TAX` | `false` | `true` enables Stripe Tax on checkout. |
| `SAFETY_CHAT_MODEL` | `claude-sonnet-4-6` | Safety Chat model override. |
| `CHECKOUT_ALLOWED_ORIGINS` | — | Comma-separated extra trusted redirect origins (see §4). |
| `SEED_ADMIN_EMAIL` | — | First admin email (seed-time). |
| `TRAEFIK_ENTRYPOINT_HTTP`/`_HTTPS`/`_CERTRESOLVER` | `web`/`websecure`/`letsencrypt` | Match your Traefik install. |

### 1c. Browser-exposed (`NEXT_PUBLIC_*`)

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon JWT — public by design. From the key generator. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key — public by design. |
| `NEXT_PUBLIC_AUTH_GOOGLE` | `true` shows the Google sign-in button. |

### 1d. Derived automatically — do NOT set

Built in `docker-compose.yml` from the values above; setting them has no effect:

`DATABASE_URI` (from `POSTGRES_PASSWORD`), `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SERVER_URL`
(`https://${APP_DOMAIN}`), `SUPABASE_INTERNAL_URL` (`http://auth-proxy:8000`),
`SUPABASE_S3_ENDPOINT` (`http://minio:9000`), `SUPABASE_S3_PUBLIC_ENDPOINT` (`https://${STORAGE_DOMAIN}`).

> The client layouts inject **only** the Supabase URL + anon key + Stripe publishable key
> into the page. No secret (service-role, Stripe secret, Anthropic, DB/MinIO/Redis
> credentials) is ever serialized to the browser.

---

## 2. Persistence & backups — operator responsibility

This stack is now the **system of record**. Three named volumes hold all state:

| Volume | Service | Holds |
|---|---|---|
| `pg-data` | `db` | All user data, orders, entitlements, chat threads, GoTrue `auth` schema, bcrypt-hashed admin passwords |
| `minio-data` | `minio` | **All uploaded media** — public marketing imagery **and** private deliverables + lesson videos |
| `redis-data` | `redis` | Cache + rate-limit counters (no long-term secrets) |

- **Never `docker compose down -v`** — it destroys the database and every media file.
- **Back up** on a schedule:
  - Postgres: `docker compose exec -T db pg_dump -U postgres postgres | gzip > csa-$(date +%F).sql.gz`
  - MinIO: mirror the volume off-box (e.g. `mc mirror` to remote S3, or snapshot the volume).
- **Encryption at rest:** enable full-disk encryption on the host (LUKS / encrypted EBS /
  encrypted Lightsail disk). That single lever covers all three volumes; the app performs
  no field-level encryption. Keep the `course-assets` bucket private (it is by default).

---

## 3. Database TLS posture

The app↔Postgres hop is on the **private `internal` bridge inside the same host**, so
`DATABASE_SSL=false` (default) is correct — there is no untrusted network segment to
protect. Only set `DATABASE_SSL=true` if you later move Postgres to a separate host across
an untrusted network, in which case also install its CA and set
`DATABASE_SSL_REJECT_UNAUTHORIZED=true`.

---

## 4. Application-layer security guarantees

- **Protected media** — purchased template deliverables (`Products.downloadableFile`) and
  uploaded lesson videos (`Courses → lesson.video`) live in the **private**
  `course-assets` bucket (no public-read ACL). They are delivered only via **short-lived
  presigned GET URLs** (5 min for downloads, 6 h for video) minted *after* the
  owner/entitlement (`/download/[entitlementId]`) or enrollment (course player) check.
  The presigner signs against `SUPABASE_S3_PUBLIC_ENDPOINT` (`https://${STORAGE_DOMAIN}`)
  so the browser can fetch the object through Traefik; the signature still validates
  because Traefik preserves the Host/path and MinIO uses path-style addressing.
  `src/lib/protectedMedia.ts`. Public marketing media is proxied through the app
  (`/api/media/file/**`), so the public bucket is never exposed directly.
  > *Residual:* in-player lesson **resource handouts** still resolve from the public
  > bucket (lower-sensitivity, same fix pattern available) — tracked as a follow-up.
- **Auth** — GoTrue runs behind `auth-proxy`; the browser reaches it same-origin at
  `${APP_DOMAIN}/auth/v1/*` (no CORS). Email confirmation is ON by default
  (`GOTRUE_MAILER_AUTOCONFIRM=false`) and requires SMTP. The callback
  (`src/app/(frontend)/auth/callback/route.ts`) handles both PKCE `code` and email
  `token_hash` verification, and constrains its `next` param to a same-site path.
- **Checkout / auth redirects** — the Stripe `success_url`/`cancel_url` and the auth
  callback base are pinned to `NEXT_PUBLIC_SERVER_URL` (plus the optional
  `CHECKOUT_ALLOWED_ORIGINS` allowlist); an attacker-controlled `Host` header is honoured
  only if allow-listed, else checkout fails closed. `src/lib/origin.ts`.
- **Grant idempotency** — orders/enrollments/entitlements are granted **only** from the
  signature-verified Stripe webhook, with DB-level unique constraints so a re-delivered or
  concurrent webhook can never create duplicate grants.

---

## 5. Pre-flight checklist

- [ ] Traefik `proxy` network exists; entrypoints `web`/`websecure` + `letsencrypt` resolver.
- [ ] DNS A records for **both** `APP_DOMAIN` and `STORAGE_DOMAIN` → the box.
- [ ] GHCR packages public (or a `read:packages` token configured in dockhand).
- [ ] Key trio generated (`scripts/gen-supabase-keys.mjs`): `GOTRUE_JWT_SECRET` +
      `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` from the same run.
- [ ] Strong `PAYLOAD_SECRET`, `POSTGRES_PASSWORD`, `MINIO_ROOT_PASSWORD`,
      `REDIS_PASSWORD` (+ matching `REDIS_URL`), `SEED_ADMIN_PASSWORD`.
- [ ] SMTP set (`GOTRUE_SMTP_*`) with `GOTRUE_MAILER_AUTOCONFIRM=false` — or autoconfirm
      `true` to launch first, then switch.
- [ ] Host full-disk encryption on; a backup job for `pg-data` + `minio-data` scheduled.
- [ ] Stripe webhook endpoint registered → `STRIPE_WEBHOOK_SECRET` set.
- [ ] **Never** `down -v`. First login: change the admin password; replace placeholder media.
