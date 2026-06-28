# Deployment — secrets, environment & data protection (M9)

Operator reference for a production CSA deploy. Pairs with the runbook in
[../README.md](../README.md). Covers the full environment-variable inventory, secrets
handling, encryption-at-rest responsibilities, the database TLS posture, and the
application-layer security guarantees.

---

## 1. Environment variable inventory

Three classes. **Only `NEXT_PUBLIC_*` reaches the browser** — everything else is
server-only. Set live values by reference in the real environment; never commit `.env`.

### 1a. Secrets — operator-set, rotate, never `NEXT_PUBLIC_`

| Variable | Required | Notes |
|---|---|---|
| `PAYLOAD_SECRET` | ✅ | Payload signing / JWT secret. Generate: `openssl rand -hex 32`. A fixed/known value forges admin sessions. |
| `DATABASE_URI` | ✅ | **Embeds the Postgres password.** Direct connection, port 5432. |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Server-only. **Bypasses RLS** — never expose. |
| `REDIS_PASSWORD` | ✅ | Used by the redis service + interpolated into `REDIS_URL`. Generate strong; the two **must match**. |
| `REDIS_URL` | ✅ | **Embeds the Redis password.** Keep in sync with `REDIS_PASSWORD`. |
| `SUPABASE_S3_ACCESS_KEY_ID` | ✅ (prod) | Storage S3 key id. |
| `SUPABASE_S3_SECRET_ACCESS_KEY` | ✅ (prod) | Storage S3 secret. |
| `STRIPE_SECRET_KEY` | optional¹ | Commerce. Empty → checkout inert. |
| `STRIPE_WEBHOOK_SECRET` | optional¹ | Verifies webhook signatures — required for grants to be issued. |
| `ANTHROPIC_API_KEY` | optional¹ | Safety Chat. Empty → assistant inert. |
| `SEED_ADMIN_PASSWORD` | seed-time | First admin password. **Unset falls back to a public default (`ChangeMe!2026`)** — always set before seeding a real deploy. |

¹ *Inert-when-empty by design: the feature degrades gracefully rather than crashing.*

### 1b. Server-only configuration (non-secret)

| Variable | Default | Notes |
|---|---|---|
| `DATABASE_SSL` | `true` | `false` disables TLS to Postgres (trusted private net only). |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | `false` | See §3 — set `true` to verify the server cert. |
| `SUPABASE_S3_ENDPOINT` / `SUPABASE_S3_REGION` | — / `us-east-1` | Storage S3 endpoint + region. |
| `S3_PUBLIC_BUCKET` | `marketing` | Public bucket (marketing imagery). |
| `S3_PROTECTED_BUCKET` | `course-assets` | **Private** bucket (deliverables + lesson videos). |
| `SUPABASE_INTERNAL_URL` | = public URL | Optional internal hostname for server→Supabase Auth. |
| `STRIPE_AUTOMATIC_TAX` | `false` | `true` enables Stripe Tax on checkout. |
| `SAFETY_CHAT_MODEL` | `claude-sonnet-4-6` | Safety Chat model override. |
| `CHECKOUT_ALLOWED_ORIGINS` | — | Comma-separated extra trusted redirect origins (see §4). |
| `SEED_ADMIN_EMAIL` | `admin@csa.local` | First admin email (seed-time). |
| `APP_DOMAIN` / `APP_PORT` | — / `3000` | Traefik host rule / port. |

### 1c. Browser-exposed (`NEXT_PUBLIC_*`) — intentionally public

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SERVER_URL` | **Canonical origin.** Trusted base for checkout + auth redirects (§4). Required in production. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key — public by design (RLS enforces access). |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key — public by design. |
| `NEXT_PUBLIC_AUTH_GOOGLE` | `true` shows the Google sign-in button. |

> The client layouts inject **only** the Supabase URL + anon key + Stripe publishable
> key into the page. No secret (service-role, Stripe secret, Anthropic, DB/Redis
> credentials) is ever serialized to the browser.

---

## 2. Encryption at rest — operator responsibility

The application performs **no field-level encryption**; data-at-rest protection is an
infrastructure concern at the disk/volume layer. Three stores hold data:

| Store | Where | What it holds | How to protect |
|---|---|---|---|
| **Postgres** | external self-hosted Supabase host | All user data, orders, entitlements, chat threads, bcrypt-hashed admin passwords | Encrypt the Postgres data volume at the host (LUKS / encrypted EBS / encrypted Lightsail disk). The app cannot enforce this. |
| **Redis** | `redis-data` volume on the app host | Ephemeral CMS cache + rate-limit counters (no long-term secrets) | Covered by host full-disk encryption. |
| **Storage buckets** | Supabase Storage host | Public marketing media; **private** deliverables + lesson videos | Inherit the Supabase host's disk encryption; keep the protected bucket private. |

**Recommendation:** enable full-disk encryption on the Lightsail instance(s), and
ensure the Supabase deployment's Postgres volume is on an encrypted disk. That single
lever covers Redis and any co-located Storage.

---

## 3. Database TLS posture

`src/payload.config.ts` derives the Postgres SSL setting from two vars:

- `DATABASE_SSL=true` (default) → TLS **on**.
- `DATABASE_SSL_REJECT_UNAUTHORIZED=false` (default) → the server certificate is **not
  verified** (tolerates Supabase's self-signed cert).

So out of the box the DB connection is **encrypted in transit but not authenticated** —
acceptable only when the app↔Postgres hop is on a **trusted private network** (same
host / Lightsail VPC). To harden:

1. Obtain the Supabase Postgres CA chain.
2. Install it in the app host's trust store (or point Node at it).
3. Set `DATABASE_SSL_REJECT_UNAUTHORIZED=true` so the cert is verified (defends against
   an active MITM on the DB path).

---

## 4. Application-layer security guarantees

Closed as part of M9 (folded-in M7 debt):

- **Protected media** — purchased template deliverables (`Products.downloadableFile`)
  and uploaded lesson videos (`Courses → lesson.video`) live in the **private**
  `protected-media` bucket (no public-read ACL). They are delivered only via
  **short-lived presigned GET URLs** (5 min for downloads, 6 h for video) minted
  *after* the owner/entitlement (`/download/[entitlementId]`) or enrollment (course
  player) check. There is no durable public URL. `src/lib/protectedMedia.ts`.
  > Self-hosted Supabase Storage: confirm presigned GET works against
  > `SUPABASE_S3_ENDPOINT` with path-style addressing at deploy time.
  > *Residual:* in-player lesson **resource handouts** still resolve from the public
  > bucket (lower-sensitivity, same fix pattern available) — tracked as a follow-up.
- **Checkout / auth redirects** — the Stripe `success_url` / `cancel_url` and the
  Supabase auth-callback base are pinned to `NEXT_PUBLIC_SERVER_URL` (plus the optional
  `CHECKOUT_ALLOWED_ORIGINS` allowlist). The inbound `Host` / `X-Forwarded-Host` header
  is honoured **only if allow-listed**; in production with no canonical origin set,
  checkout **fails closed** rather than echoing an attacker-controlled host. The auth
  callback's `next` param is constrained to a same-site path (no open redirect).
  `src/lib/origin.ts`.
- **Grant idempotency** — orders/enrollments/entitlements are granted **only** from the
  signature-verified Stripe webhook, with DB-level unique constraints
  (`orders.stripe_session_id`, `enrollments(user,course)`, active
  `entitlements(user,product)`) so a re-delivered or concurrent webhook can never create
  duplicate grants.

---

## 5. Pre-flight checklist

- [ ] `web` Docker network exists; Traefik running with `web`/`websecure` entrypoints + `letsencrypt` resolver.
- [ ] DNS A/AAAA for `APP_DOMAIN` → host.
- [ ] Public **and** private Storage buckets created; S3 keys set.
- [ ] `PAYLOAD_SECRET`, `REDIS_PASSWORD` (+ `REDIS_URL`), `SEED_ADMIN_PASSWORD` set to strong values (no template defaults).
- [ ] `NEXT_PUBLIC_SERVER_URL` = canonical origin; `CHECKOUT_ALLOWED_ORIGINS` set if multi-host.
- [ ] `DATABASE_URI` uses port 5432 (not the 6543 pooler).
- [ ] Host full-disk encryption on; Supabase Postgres volume encrypted.
- [ ] Migrate **before** first `up`; create the first admin; change its password on first login.
- [ ] Stripe webhook endpoint registered → `STRIPE_WEBHOOK_SECRET` set.
