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

## Phase 2 (out of scope here)

Phase 2 plugs in where these seams already exist: **Supabase Storage** (flip the `S3_*`
env vars — no code change), **Supabase Auth** + customer portal, **Stripe**/checkout/cart
(the Login and Cart UI currently link to `#`), and the **course player / student
dashboard / quizzes / certificates**. The `templates`, `courses`, `resources`, `events`,
`freeTrainings`, `teamMembers`, and `jobPostings` collections are introduced as the
corresponding pages are built out.
```
