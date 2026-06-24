# CSA Website — Next.js + Payload CMS

Marketing website for Critical Systems Analysis. **Phase 1: marketing site + CMS only.**
A non-technical client edits all copy, media, and dynamic content through the Payload
admin at `/admin`; the public site renders it via Payload's Local API in React Server
Components.

- **Framework:** Next.js 16 (App Router, TypeScript)
- **CMS:** Payload 3.x — embedded in the same app (admin at `/admin`, Payload routes under `src/app/(payload)`)
- **Database:** Postgres (Payload Postgres adapter; connection string from `DATABASE_URI`)
- **Editor:** Lexical rich text · **SEO:** `@payloadcms/plugin-seo`
- **Media:** Supabase Storage (S3-compatible) when configured, else local disk for dev

---

## Prerequisites

- **Node 22 LTS** (see `.node-version`). The repo runs on Node 18.20.2+ / 20.9+, but use
  **22**: the build/dev work on newer Node, but the Payload CLI (`payload run`, used by
  `npm run seed`) hits a `tsx` loader bug on Node 26. With `fnm`/`nvm` installed, the
  `.node-version` file selects 22 automatically.
- **Docker** (for a local Postgres) or any reachable Postgres instance.

## Setup

```bash
# 1. Install deps
npm install

# 2. Local Postgres (Docker). Skip if you already have a Postgres URI.
docker run -d --name csa-postgres \
  -e POSTGRES_USER=csa -e POSTGRES_PASSWORD=csa_dev_pw -e POSTGRES_DB=csa \
  -p 5432:5432 -v csa_pgdata:/var/lib/postgresql/data postgres:16

# 3. Env
cp .env.example .env      # then edit values (see below)

# 4. Seed the CMS with all current copy (idempotent)
npm run seed

# 5. Dev server — site at http://localhost:3000, admin at /admin
npm run dev
```

Default admin login created by the seed: **admin@csa.test** / **changeme123** (change it
in the admin after first login).

## Environment variables (`.env`)

| Var | Purpose |
| --- | --- |
| `DATABASE_URI` | Postgres connection string. Local dev default points at the Docker container above. Swap to your Supabase Postgres URI for prod — nothing else changes. |
| `PAYLOAD_SECRET` | Secret for signing Payload auth tokens. Use a long random string in prod. |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL (SEO canonical/OG). |
| `S3_*` + `NEXT_PUBLIC_S3_PUBLIC_URL` | Supabase Storage (S3-compatible) credentials. **Leave blank for local-disk media in dev.** Fill all to enable Supabase Storage. |

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server (site + `/admin`). |
| `npm run build` / `npm start` | Production build / serve. |
| `npm run seed` | Idempotent seed: fills every global + collection with the export's copy, uploads the logo, ensures an admin user. Re-run any time to reset content. |
| `npm run generate:types` | Regenerate `src/payload-types.ts` from the schema. |
| `npm run generate:importmap` | Regenerate the admin import map (after adding custom admin components). |

## Content model

**Globals** (one-off, singleton pages/settings): `siteSettings`, `header`, `footer`,
`homePage`. **Collections** (repeatable, client add/edit/remove): `industries`,
`services`, `partners`, `articles`, `caseStudies`, `testimonials`, `media`, `users`.
SEO meta fields are attached to `homePage`, `articles`, `industries`, and `caseStudies`.

The Postgres connection is read only from `DATABASE_URI`, and the media storage adapter is
abstracted in `src/lib/storage.ts`, so both are swappable without code changes.

## Architecture notes

- Pages are **Server Components** that query Payload's **Local API** (`src/lib/payload.ts`)
  — no HTTP round-trips. The homepage uses **ISR** (`revalidate = 60`), so CMS edits appear
  within ~60s without a redeploy. (On-demand revalidation via collection hooks is a small
  follow-up.)
- The design is a faithful port of the Claude Design export: the original stylesheets live
  in `src/styles/csa/`, runtime assets (images, video, the `interactions.js` motion engine
  and `csa-shaders.js` material system) in `public/assets/`. Section components in
  `src/components/` preserve the original markup/classes and are fed by Payload data.

## Deployment (Docker on a VPS, behind Traefik)

The app ships as a single container (`Dockerfile`, Next.js standalone, Node 22) connecting to
**Supabase** for Postgres and Storage. `docker-compose.yml` is wired for Traefik (TLS via the
external `proxy` network, host `csa-website-staging.handistack.com`, app port 3000).

**Rendering / build.** Pages render dynamically via Payload's Local API (`force-dynamic`), so
the image builds with **no database connection** and CMS edits are always live. Schema is
managed by **migrations** under `src/migrations/`; the Payload config runs them automatically
on container boot (`prodMigrations`), so the container migrates the Supabase schema itself.
After changing collections/globals: `npm run payload migrate:create <name>` and commit it.

**Config (`.env`, host-side only — never committed or baked into the image):**
- `DATABASE_URI` — Supabase **Session pooler** URI (port 5432; not the 6543 transaction pooler).
- `PAYLOAD_SECRET` — long random string.
- `NEXT_PUBLIC_SERVER_URL` — public site URL.
- `S3_*` + `NEXT_PUBLIC_S3_PUBLIC_URL` — Supabase Storage (public `media` bucket + S3 access key).
  If blank, media falls back to the `csa_media` Docker volume.

**Deploy:**
```bash
# on the VPS, with .env present next to docker-compose.yml:
docker compose up -d --build
```
The container boots, applies migrations to Supabase, and serves on the `proxy` network for
Traefik. The DB was seeded once during setup (below), so content is live immediately.

**Seeding (one-time, already done for staging).** Against a migrated Supabase DB, seed in
**production mode** so it inserts without dev-pushing the schema (a dev-mode seed makes the
production container detect a schema mismatch and stall on a prompt):
```bash
npm run migrate      # apply migrations to Supabase (DATABASE_URI in .env)
npm run seed:prod    # NODE_ENV=production — insert content + upload media to Supabase Storage
```
⚠️ The seed **clears and recreates** content collections — run it ONCE on initial setup, never
after the client has started editing. `npm run payload migrate:fresh --force-accept-warning`
drops + re-migrates if you need a clean reset.

If you later serve CMS images via `next/image` directly from the bucket URL, add the Supabase
Storage hostname to `images.remotePatterns` in `next.config.mjs`.

## Phase 2 — Accounts, learning & portal

Phase 2 adds end-user accounts, the LMS (courses/lessons/assessments/certificates), and the
customer portal (orders/entitlements/gated downloads). It is built in checkpoints; this
section is the standing architecture reference.

### Two separate auth populations (do not conflate)

- **Payload admin** (`/admin`) — the content team. Email/password against Payload's `users`
  collection. Unchanged. `users` now carries a `roles` field: `admin` (full control),
  `editor` (content only), `instructor` (courses/lessons/assessments only).
- **End users** (students/customers) — authenticate via **Supabase Auth**, the identity
  source of truth. Sign-up / login / password reset / email verification + Google SSO live
  under `/login`, `/signup`, `/forgot-password`, `/reset-password`; the OAuth/verification/
  recovery landing is `/auth/callback`; sign-out is `POST /auth/signout`. Session refresh and
  route-gating for `/dashboard`, `/portal`, `/account`, `/learn`, `/assessment` are handled in
  `src/middleware.ts` (redirects to `/login?returnTo=…`).
- Each Supabase user is mirrored into a Payload **`profiles`** row keyed by the Supabase
  `auth.users.id` (`src/lib/auth.ts → ensureProfile`). All app data references that id.
  (`profiles`, not `customers` — `customers` is the marketing "Trusted By" logo wall.)

### The RLS ↔ Payload access-control boundary (important)

- **Payload-managed tables** (everything Payload owns, incl. `profiles`, `enrollments`,
  `lesson_progress`, `assessment_attempts`, `certificates`, `orders`, `entitlements`):
  **do NOT enable Supabase RLS on these.** Payload's Local API connects with a privileged
  role and RLS would break it. They are secured by **Payload access control** (API locked to
  admins) **+ server-mediation**: end users have no Payload session, so every end-user read/
  write goes through trusted server code (Server Components / route handlers / server actions)
  that reads the Supabase session and filters strictly by the owning user id. A user can never
  read another user's data.
- **Supabase-native objects** — **Storage buckets/objects** (and the `auth` schema) — *do* get
  **Supabase RLS** policies, as defense-in-depth alongside the server-side entitlement check.

### Secrets

`SUPABASE_SERVICE_ROLE_KEY` and `PAYLOAD_SECRET` are **server-only** and never reach the
client bundle (the service-role client lives in `src/lib/supabase/admin.ts`, guarded by
`import 'server-only'`). The browser uses only `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Media storage tiers (signed-URL flow)

- **PUBLIC bucket** (`media`) — marketing imagery, thumbnails, partner logos. Public CDN read.
- **PROTECTED bucket(s)** — course videos, purchased templates, gated resources. Never a
  public/permanent URL. Server code verifies the requesting user's **entitlement** (enrollment
  for course video; ownership/order for templates; access rule for gated resources) and only
  then mints a **short-lived signed URL** via the service-role client. *(Wired in the storage
  checkpoint.)*

### Migrations

Additive only — never destructive against real data. New collections/fields ship as Payload
migrations in `src/migrations/` and apply automatically on container boot (`prodMigrations`).
Locally: `npm run payload migrate` (run under Node 22). Existing rows are backfilled in the
migration (e.g. `users.roles → ['admin']`, content `_status → 'published'`) so nothing is
lost or hidden.

### Where Stripe attaches (Phase-2 payment pass — not built yet)

Orders/entitlements are modeled so the portal works and downloads gate **without** any charge
logic. Cart / express-buy create the order + entitlement(s) server-side; the **Billing**
section and checkout are a clearly-marked seam. Stripe attaches at: checkout (PaymentIntent),
the order/entitlement creation point, and a **webhook with signature verification** (the seam
to build later) that flips an order to paid and grants entitlements.
