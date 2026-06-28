# CSA — Critical Systems Analysis

Functional-safety marketing site, e-learning (LMS) and e-commerce, built on
**Next.js 16** (App Router) with an embedded **Payload CMS 3**, **self-hosted
Supabase** (Postgres + Auth + Storage), **Stripe** hosted checkout, and **Redis**,
deployed as a single standalone container behind **Traefik** on **AWS Lightsail**.

This README is the operator runbook: prerequisites, configuration, and the exact
clean-machine sequence to **build → migrate → seed → serve**. Deeper references:

- [docs/deployment.md](docs/deployment.md) — env-var inventory, secrets, encryption-at-rest, DB TLS hardening.
- [docs/cloudflare-cdn.md](docs/cloudflare-cdn.md) — optional Cloudflare edge in front of Traefik.
- [docs/performance.md](docs/performance.md) — rendering / caching / compression reference.

> **Secrets by reference.** Never commit `.env`. All live secret values are set by
> the operator in the real environment. [.env.example](.env.example) documents every
> variable; copy it to `.env` and fill it in.

---

## 1. Prerequisites (the box)

A single Linux host (AWS Lightsail or similar) with:

- **Docker** + the Compose plugin.
- A reachable **self-hosted Supabase**: Postgres (`DATABASE_URI`), Auth (GoTrue), and
  Storage (S3-compatible). Postgres is **external** to this stack — `docker-compose.yml`
  deliberately does **not** run a database.
- A running **Traefik** instance on a shared external Docker network. The app attaches
  to it via labels (it does **not** ship Traefik). The names are configurable in `.env`
  (`scripts/deploy.sh` prompts for them); defaults: network `proxy`, HTTPS entrypoint
  `websecure`, cert resolver `letsencrypt`. The HTTP→HTTPS redirect router uses
  `TRAEFIK_ENTRYPOINT_HTTP` (default `web`) and is ignored if your Traefik redirects
  globally or has no `:80` entrypoint.
- A **DNS A/AAAA record** for `APP_DOMAIN` pointing at the host (needed before Traefik
  can issue the TLS cert).

The shared network normally already exists (created by Traefik). If not:

```bash
docker network create proxy
```

Supabase setup (one-time, in Supabase Studio):

1. Create two Storage buckets — a **public** one (`S3_PUBLIC_BUCKET`, e.g. `marketing`)
   and a **private** one (`S3_PROTECTED_BUCKET`, e.g. `course-assets`). The private
   bucket holds purchased deliverables + lesson videos; it must **not** be public.
2. Generate **S3 access keys** (Storage → Settings → S3 access keys).
3. Use the **direct** Postgres connection on **port 5432** in `DATABASE_URI` — not the
   6543 transaction pooler (Payload runs DDL + prepared statements the pooler breaks).

---

## 2. Configure

```bash
cp .env.example .env
# then edit .env — see docs/deployment.md for the full variable table.
```

Generate the secrets that must not ship with template defaults:

```bash
openssl rand -hex 32      # PAYLOAD_SECRET
openssl rand -base64 32   # REDIS_PASSWORD  (also update the password embedded in REDIS_URL to match)
```

Set a strong `SEED_ADMIN_PASSWORD` before seeding (else the first admin is created
with a publicly-known default — see §3.3).

> `.env` must live in the compose project directory so Compose can interpolate
> `${APP_DOMAIN}` / `${REDIS_PASSWORD}` into `docker-compose.yml`.

---

## 3. First deploy (clean machine)

On `docker compose up`, an **`init` job runs to completion before the app starts**: it
waits for the database, applies migrations (schema `push` is off in production),
creates the storage buckets, and — on a **fresh** database only — seeds the first
admin, the real CMS content, placeholder media, and the flagship course
(`scripts/bootstrap.sh`). It is idempotent and first-run-guarded, so redeploys only
re-migrate and **never re-seed over your CMS edits**. A clean box therefore comes up
fully populated with no manual migrate/seed step.

### 3.0 Guided deploy (recommended)

One interactive script prompts for every value (generating `PAYLOAD_SECRET` +
`REDIS_PASSWORD`), writes a locked-down `.env`, then builds and brings the stack up —
the init job migrates + seeds automatically:

```bash
git clone https://github.com/carlosazurmendi/csa-website && cd csa-website
bash scripts/deploy.sh
```

It asks for your Traefik network / entrypoint / cert-resolver names so it binds to an
existing Traefik, and is re-runnable (reuse `.env` → rebuild → redeploy).

### 3.1 Manual equivalent

```bash
docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d
```

`up` runs the **init** job to completion (wait-for-db → migrate → create buckets →
first-run seed of admin + content + media + course), then starts the app. Follow it
with `docker compose -f docker-compose.yml logs -f init`.

> `seed:admin` creates the Payload **/admin** login (`SEED_ADMIN_EMAIL` /
> `SEED_ADMIN_PASSWORD`) — not a Supabase end-user (those self-register at signup).
> **Change the admin password on first login.** Replace the placeholder media with real
> brand assets in /admin. To re-run one seed by hand:
> `docker compose -f docker-compose.yml run --rm init npm run seed:media`.

Wait for health, then it's live at `https://APP_DOMAIN` (via Traefik):

```bash
docker compose -f docker-compose.yml exec app curl -fsS http://127.0.0.1:3000/api/health
# {"status":"ok","redis":"up","db":"up",...}
```

`/api/health` is fail-closed on **both** Redis and Postgres, so an unmigrated /
unreachable database keeps the container unhealthy and out of rotation.

---

## 4. Subsequent deploys

```bash
git pull
docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d
```

The init job re-runs on deploy: it applies any **new** migrations (additive,
idempotent) and, because content already exists, **skips seeding** — your CMS edits are
preserved. Hashed static assets self-bust (new filenames each build), so no CDN purge
is needed for `_next/static`.

> The dev stack lives in **`docker-compose.dev.yml`** — deliberately **not** named
> `docker-compose.override.yml`, so a bare `docker compose up` (and stack managers like
> dockhand) use **only** `docker-compose.yml` (production). Running the dev stack is
> opt-in (§5). This prevents the dev Postgres/MinIO/GoTrue and local-bridge networks
> from ever leaking into a production deploy.

---

## 5. Local development

The dev stack (`docker-compose.dev.yml`) provides a complete self-contained
environment — throwaway Postgres, MinIO (stands in for Supabase Storage), and a demo
GoTrue — so nothing external is required. **You must pass both files** (it is not
auto-merged):

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml build
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
# init migrates + seeds the local Postgres, then the app starts on http://localhost:3000
```

When you change a collection, generate a migration for production with the
profile-gated migrator (Payload introspects the diff in node22 — the host's Node 26
breaks `migrate:create`), then commit it:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile tools \
  run --rm migrator npm run migrate:create -- <name>
```

(In dev the app also uses Payload schema `push` to auto-sync local schema edits; the
committed migrations are what production applies via the init job.)

---

## 6. Operations notes

- **Migrations are additive-only** and must apply cleanly on an empty database (the
  committed chain is verified to replay from scratch). Never edit an applied migration;
  add a new one.
- **Money & access**: order/enrollment/entitlement grants happen **only** from the
  signature-verified Stripe webhook (`/stripe/webhook`), never from the client. DB
  unique constraints make duplicate-delivery idempotent.
- **Protected deliverables** (template files, lesson videos) live in the private bucket
  and are served only via short-lived presigned URLs after an entitlement / enrollment
  check — see [docs/deployment.md](docs/deployment.md).
- **Logs**: `docker compose -f docker-compose.yml logs -f app`.
