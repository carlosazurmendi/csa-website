#!/usr/bin/env bash
# ============================================================================
# Production bootstrap — runs as the `init` service BEFORE the app starts, and is
# idempotent on every redeploy. Brings a fresh self-hosted Supabase up to the same
# state the local docker stack had during the build:
#   1. wait for the database to accept connections
#   2. apply migrations (always — additive, tracked, no-op once applied)
#   3. ensure the public + private storage buckets exist
#   4. on a FRESH database only: seed the first admin, the real CMS content, the
#      placeholder media, and the flagship course content.
#
# The "fresh" guard (scripts/is-seeded.mjs) keys off whether content already exists,
# so a redeploy NEVER re-runs the content seed and clobbers the owner's CMS edits.
# Seeds can still be re-run on purpose:  docker compose run --rm init npm run seed
# ============================================================================
set -euo pipefail

echo "[bootstrap] waiting for the database…"
node scripts/wait-for-db.mjs

echo "[bootstrap] applying migrations…"
npm run migrate

echo "[bootstrap] ensuring storage buckets…"
node scripts/ensure-buckets.mjs \
  || echo "[bootstrap] WARN: bucket provisioning failed — create them in Supabase Studio; continuing"

if node scripts/is-seeded.mjs; then
  echo "[bootstrap] database already initialised — skipping seed (preserving CMS edits)."
else
  echo "[bootstrap] fresh database — seeding initial content…"
  npm run seed:admin
  npm run seed
  npm run seed:media      || echo "[bootstrap] WARN: seed:media failed (S3/bucket?) — replace media in /admin; continuing"
  npm run seed:lessons    || echo "[bootstrap] WARN: seed:lessons failed — continuing"
  npm run seed:assessment || echo "[bootstrap] WARN: seed:assessment failed — continuing"
  echo "[bootstrap] seed complete."
fi

echo "[bootstrap] done — handing off to the app."
