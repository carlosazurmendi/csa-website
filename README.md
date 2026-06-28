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
- A running **Traefik** instance on a shared external Docker network named `web`,
  with entrypoints named `web` (:80) and `websecure` (:443) and a cert resolver named
  `letsencrypt`. The app attaches to it via labels (it does **not** ship Traefik).
- A **DNS A/AAAA record** for `APP_DOMAIN` pointing at the host.

Create the shared network once (if Traefik didn't already):

```bash
docker network create web
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

Production uses **migrations** (schema `push` is off in production), so the database
schema is created by running the migration job — not by the app on boot.

### 3.0 Guided deploy (recommended)

One interactive script does the whole thing — prompts for every value (generating
`PAYLOAD_SECRET` + `REDIS_PASSWORD` for you), writes a locked-down `.env`, optionally
provisions the Supabase buckets, then builds → migrates → seeds → serves:

```bash
git clone https://github.com/carlosazurmendi/csa-website && cd csa-website
bash scripts/deploy.sh
```

It asks for your Traefik network / entrypoint / cert-resolver names (so it works with
an existing Traefik), and is re-runnable — on a later `git pull` it offers to reuse the
existing `.env` and just rebuild + migrate + redeploy. The manual equivalents are
§3.1–3.4 below.

### 3.1 Build

```bash
docker compose -f docker-compose.yml build
```

### 3.2 Migrate (apply the schema) — run BEFORE the app

The migration runner is a one-off service behind the `tools` profile (it is **not**
started by a normal `up`):

```bash
docker compose -f docker-compose.yml --profile tools run --rm migrator
```

This applies the committed, **additive** migrations to the external Supabase Postgres.
Re-running it is safe (already-applied migrations are skipped).

### 3.3 Seed the first admin + content

```bash
# 1. First Payload /admin user (uses SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD).
docker compose -f docker-compose.yml --profile tools run --rm migrator npm run seed:admin

# 2. Marketing + storefront content, pages, and globals (no file uploads).
docker compose -f docker-compose.yml --profile tools run --rm migrator npm run seed

# 3. Placeholder media — REQUIRES the public bucket to exist + S3 keys set.
docker compose -f docker-compose.yml --profile tools run --rm migrator npm run seed:media

# 4. (Optional) richer course-player content for the flagship course.
#    Must run AFTER `seed` (depends on the iec-61508-ifsp course existing).
docker compose -f docker-compose.yml --profile tools run --rm migrator npm run seed:lessons
docker compose -f docker-compose.yml --profile tools run --rm migrator npm run seed:assessment
```

> **Order matters.** `seed` must run before `seed:media` (it patches image fields on
> existing content) and before `seed:lessons` / `seed:assessment`. Do **not** re-run
> `npm run seed` after `seed:lessons` / `seed:assessment` — the generic seed would
> overwrite the richer lesson keyPoints / quiz / resources. `npm run reseed:globals`
> is a safe re-push of header/footer/site-settings only.
>
> `seed:admin` creates the Payload **/admin** content-team login only — it does **not**
> create Supabase end-users (those self-register at signup). **Change the admin
> password on first login** if you used the default.

### 3.4 Serve

```bash
docker compose -f docker-compose.yml up -d
```

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
docker compose -f docker-compose.yml --profile tools run --rm migrator   # apply any new migrations first
docker compose -f docker-compose.yml up -d --force-recreate app
```

Migrations are **additive** and idempotent; hashed static assets self-bust (new
filenames each build), so no CDN purge is needed for `_next/static`.

> ⚠️ Always pass **`-f docker-compose.yml`** in production. A bare `docker compose up`
> auto-merges `docker-compose.override.yml`, which spins up a throwaway Postgres,
> MinIO, and a demo GoTrue with hardcoded dev secrets — a serious footgun on a prod
> host. The override is **local-development only**.

---

## 5. Local development

The dev override (`docker-compose.override.yml`, auto-merged by a bare `docker compose`)
provides a complete self-contained stack — throwaway Postgres, MinIO (stands in for
Supabase Storage), a demo GoTrue, and the migration runner — so nothing external is
required:

```bash
docker compose build
docker compose run --rm migrator                 # apply migrations to the local Postgres
docker compose run --rm migrator npm run seed:admin
docker compose run --rm migrator npm run seed
docker compose up -d                             # app + redis + postgres + minio + gotrue
# app on http://localhost:3000 (published directly, no Traefik needed)
```

In development the app uses Payload schema `push` (auto-sync) instead of migrations,
so the local DB tracks collection changes without a migration step. When you change a
collection, generate a migration for production with
`docker compose run --rm migrator npm run migrate:create -- <name>` (Payload
introspects the diff), then commit it.

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
