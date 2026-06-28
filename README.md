# CSA — Critical Systems Analysis

Functional-safety marketing site, e-learning (LMS) and e-commerce, built on
**Next.js 16** (App Router) with an embedded **Payload CMS 3**. The deployment is a
**self-contained bundle** — it ships its own **Postgres**, **Supabase Auth (GoTrue)**
and **S3 storage (MinIO)** alongside the app and **Redis**, and runs behind an
**existing Traefik** on a single Docker host (AWS Lightsail). Nothing external is
required except the Traefik network. Images are **built in CI and pulled from GHCR** —
the box never builds.

This README is the operator runbook. Deeper references:

- [docs/deployment.md](docs/deployment.md) — env-var inventory, secrets, persistence/backups, security guarantees.
- [docs/cloudflare-cdn.md](docs/cloudflare-cdn.md) — optional Cloudflare edge in front of Traefik.
- [docs/performance.md](docs/performance.md) — rendering / caching / compression reference.

> **Secrets by reference.** Never commit `.env`. All live secret values are set by the
> operator in the real environment (or dockhand's env editor). [.env.example](.env.example)
> documents every variable.

---

## 1. Architecture

One Docker Compose project, behind your existing Traefik:

| Service | Image | Role |
|---|---|---|
| `app` | `ghcr.io/<owner>/csa-website` | Next.js + Payload (the site + `/admin`) |
| `init` | `ghcr.io/<owner>/csa-website-init` | one-shot: migrate + first-run seed, then exits |
| `db` | `postgres:16` | Postgres — **the system of record** (persistent volume) |
| `redis` | `redis:7` | cache + rate-limit counters |
| `minio` + `minio-init` | `minio/minio`, `minio/mc` | S3 storage; creates the two buckets |
| `gotrue` + `auth-proxy` | `supabase/gotrue`, `nginx` | Supabase Auth + its `/auth/v1` gateway |

Traefik routes three things on your host:

- `Host(APP_DOMAIN)` → the app (port 3000).
- `Host(APP_DOMAIN) && PathPrefix(/auth/v1)` → auth-proxy → GoTrue (higher priority).
- `Host(STORAGE_DOMAIN)` → MinIO — used **only** for presigned (signature-gated)
  protected downloads/videos. Public marketing media is proxied **through the app**, so
  MinIO is otherwise private.

Only one external network is used: the existing Traefik `proxy`. Everything else talks
on a private `internal` bridge created by the project.

---

## 2. Prerequisites (the box)

- **Docker** + the Compose v2/v5 plugin.
- A running **Traefik** on a shared external Docker network (default name `proxy`,
  HTTPS entrypoint `websecure`, cert resolver `letsencrypt` — all configurable in `.env`).
  Create the network if it doesn't exist: `docker network create proxy`.
- **Two DNS A records → the box:** `APP_DOMAIN` (the site) **and** `STORAGE_DOMAIN`
  (e.g. `files.<domain>`, for presigned protected downloads/videos). Traefik issues both
  certs automatically.

No external database, auth, or storage is needed — the bundle provides them.

---

## 3. Configure

Generate the three **linked** Supabase keys (the anon + service JWTs must be signed by
the same secret GoTrue uses):

```bash
node scripts/gen-supabase-keys.mjs
# -> prints GOTRUE_JWT_SECRET, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
```

Then set every value from [.env.example](.env.example) — in dockhand's env editor, or in
a `.env` file. Generate the remaining secrets:

```bash
openssl rand -hex 32      # PAYLOAD_SECRET
openssl rand -base64 30   # POSTGRES_PASSWORD, MINIO_ROOT_PASSWORD, REDIS_PASSWORD (one each)
```

Keep `REDIS_PASSWORD` and the password embedded in `REDIS_URL` identical. Set a strong
`SEED_ADMIN_PASSWORD` before the first deploy. For email confirmation, fill the
`GOTRUE_SMTP_*` values (or set `GOTRUE_MAILER_AUTOCONFIRM=true` to launch before SMTP is
ready, then switch back). Several vars (`DATABASE_URI`, `NEXT_PUBLIC_SUPABASE_URL`,
`SUPABASE_INTERNAL_URL`, `SUPABASE_S3_ENDPOINT`/`_PUBLIC_ENDPOINT`, `NEXT_PUBLIC_SERVER_URL`)
are **derived automatically** from `APP_DOMAIN` / `STORAGE_DOMAIN` / `POSTGRES_PASSWORD` —
do not set them.

---

## 4. Build (CI → GHCR)

Pushing to `main` triggers [.github/workflows/build-images.yml](.github/workflows/build-images.yml),
which builds both images on GitHub's runners (no OOM) and pushes them to GHCR:

```
ghcr.io/<owner>/csa-website        (the app)
ghcr.io/<owner>/csa-website-init   (the migrate/seed job)
```

Make those two GHCR packages **public** so the box pulls with no credentials (they hold
compiled app code, not secrets). If you keep them private, give dockhand a token with
`read:packages`. Tags: `latest` follows `main`; pin `IMAGE_TAG=sha-xxxxxxx` for an
immutable deploy.

---

## 5. First deploy (clean box)

On `up`, the **`init` job runs to completion before the app starts**: it waits for the
database, applies migrations, and — on a **fresh** database only — seeds the first admin,
the real CMS content, placeholder media, and the flagship course. It is idempotent and
first-run-guarded, so redeploys only re-migrate and **never re-seed over CMS edits**.

### Guided (SSH on the box)

```bash
git clone https://github.com/carlosazurmendi/csa-website && cd csa-website
bash scripts/deploy.sh   # prompts for the few non-generated values, mints the rest,
                         # writes .env, pulls the images, brings the stack up
```

### Via dockhand

Point the stack at this repo's `docker-compose.yml`, set the env from
[.env.example](.env.example) (incl. the generated keys), and deploy. dockhand pulls the
GHCR images and runs the init job, then the app. Watch `init` logs for migrate + seed.

Verify health once it's up:

```bash
docker compose -f docker-compose.yml exec app curl -fsS http://127.0.0.1:3000/api/health
# {"status":"ok","redis":"up","db":"up",...}
```

`/api/health` is fail-closed on **both** Redis and Postgres.

> **First-login tasks:** change the `/admin` password, replace placeholder media with
> real brand assets.

---

## 6. Subsequent deploys

```
push to main  →  CI builds + pushes images  →  on the box:
  docker compose -f docker-compose.yml pull
  docker compose -f docker-compose.yml up -d
```

The init job re-runs: it applies any **new** migrations and, because content already
exists, **skips seeding** — CMS edits are preserved.

---

## 7. Local development

The same bundle runs locally with a dev override (build instead of pull, published
ports, localhost URLs, email auto-confirm). Demo, non-secret values live in
[dev/dev.env](dev/dev.env):

```bash
docker compose --env-file dev/dev.env -f docker-compose.yml -f dev/docker-compose.yml up -d --build
# init migrates + seeds the local Postgres, then the app starts on http://localhost:3000
```

Generate a migration for production (Payload introspects in node22 — the host's Node 26
breaks `migrate:create`), then commit it:

```bash
docker compose --env-file dev/dev.env -f docker-compose.yml -f dev/docker-compose.yml \
  --profile tools run --rm migrator npm run migrate:create -- <name>
```

---

## 8. Operations notes

- **Persistent volumes are the system of record:** `pg-data` (Postgres) and `minio-data`
  (all uploaded media). **Never** `docker compose down -v` — it deletes the database and
  every media file. Back up regularly (`pg_dump` + a MinIO mirror) — see
  [docs/deployment.md](docs/deployment.md).
- **Migrations are additive-only** and must apply cleanly on an empty database.
- **Money & access**: order/enrollment/entitlement grants happen **only** from the
  signature-verified Stripe webhook (`/stripe/webhook`), never from the client.
- **Protected deliverables** (template files, lesson videos) live in the private bucket
  and are served only via short-lived presigned URLs (via `STORAGE_DOMAIN`) after an
  entitlement / enrollment check.
- **Logs**: `docker compose -f docker-compose.yml logs -f app` (or `init`, `gotrue`).
