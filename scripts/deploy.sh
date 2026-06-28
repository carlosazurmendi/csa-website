#!/usr/bin/env bash
# ============================================================================
# CSA — guided production deploy for a single Docker host (AWS Lightsail etc.)
# behind an EXISTING Traefik, against an EXISTING self-hosted Supabase.
#
# Run it from the repo root ON THE SERVER:
#   git clone https://github.com/carlosazurmendi/csa-website && cd csa-website
#   bash scripts/deploy.sh
#
# It prompts for every required value (generating the secrets it can), writes a
# locked-down .env, optionally provisions the Supabase Storage buckets, then
# builds -> migrates -> seeds -> serves. Re-runnable: on a second run it offers
# to reuse the existing .env and just rebuild/redeploy.
#
# Secrets you type stay on THIS machine — they are written only to ./.env
# (chmod 600, gitignored). Nothing is sent anywhere except your own Supabase.
# ============================================================================
set -euo pipefail

COMPOSE="docker compose -f docker-compose.yml"   # prod file ONLY (dev/docker-compose.yml is opt-in, never auto-merged)
ENV_FILE=".env"

c_bold=$'\033[1m'; c_grn=$'\033[32m'; c_yel=$'\033[33m'; c_red=$'\033[31m'; c_dim=$'\033[2m'; c_rst=$'\033[0m'
say()  { printf '%s\n' "${c_bold}==>${c_rst} $*"; }
ok()   { printf '%s\n' "${c_grn}  ok${c_rst} $*"; }
warn() { printf '%s\n' "${c_yel}  !!${c_rst} $*"; }
die()  { printf '%s\n' "${c_red}error:${c_rst} $*" >&2; exit 1; }

# ---- prompt helpers (printf -v assigns to the named variable) ----
ask() { # ask VAR "Prompt" ["default"]
  local __var=$1 __prompt=$2 __default=${3:-} __val
  if [ -n "$__default" ]; then read -rp "  $__prompt [${__default}]: " __val; __val=${__val:-$__default}
  else read -rp "  $__prompt: " __val; fi
  printf -v "$__var" '%s' "$__val"
}
ask_secret() { # ask_secret VAR "Prompt"  (input hidden)
  local __var=$1 __prompt=$2 __val
  read -rsp "  $__prompt: " __val; echo
  printf -v "$__var" '%s' "$__val"
}
yesno() { # yesno "Question" default(Y/N) -> returns 0 for yes
  local __q=$1 __d=${2:-Y} __a
  read -rp "  $__q [$([ "$__d" = Y ] && echo 'Y/n' || echo 'y/N')]: " __a
  __a=${__a:-$__d}; [[ $__a =~ ^[Yy]$ ]]
}

# ---------------------------------------------------------------------------
# 0. Preflight
# ---------------------------------------------------------------------------
say "Preflight checks"
[ -f docker-compose.yml ] && [ -f Dockerfile ] || die "run this from the repo root (docker-compose.yml not found)."
command -v docker >/dev/null || die "docker is not installed."
docker compose version >/dev/null 2>&1 || die "the docker compose v2 plugin is required."
command -v openssl >/dev/null || die "openssl is required (for secret generation)."
ok "docker, compose v2, openssl present"

# ---------------------------------------------------------------------------
# 1. .env — reuse or build interactively
# ---------------------------------------------------------------------------
REUSE_ENV=0
if [ -f "$ENV_FILE" ]; then
  warn "A .env already exists here."
  if yesno "Reuse it as-is and skip straight to build/deploy?" Y; then REUSE_ENV=1; fi
fi

if [ "$REUSE_ENV" -eq 0 ]; then
  say "Configuration — answer each prompt (blank = the shown default)"
  echo "  ${c_dim}Secrets are typed hidden and written only to ./.env${c_rst}"

  echo; echo "${c_bold}Domain & Traefik${c_rst}"
  ask APP_DOMAIN "Public domain (APP_DOMAIN)"
  [ -n "${APP_DOMAIN:-}" ] || die "APP_DOMAIN is required."
  ask NEXT_PUBLIC_SERVER_URL "Canonical URL (NEXT_PUBLIC_SERVER_URL)" "https://${APP_DOMAIN}"
  ask CHECKOUT_ALLOWED_ORIGINS "Extra allowed origins, comma-sep (optional)" ""
  ask TRAEFIK_ENTRYPOINT_HTTP "Traefik HTTP entrypoint name" "web"
  ask TRAEFIK_ENTRYPOINT_HTTPS "Traefik HTTPS entrypoint name" "websecure"
  ask TRAEFIK_CERTRESOLVER "Traefik cert resolver name" "letsencrypt"

  echo; echo "${c_bold}Database (self-hosted Supabase Postgres — host = db, port 5432, NOT the 6543 pooler)${c_rst}"
  echo "  ${c_dim}The app joins the Supabase docker network, so the host is the 'db' container.${c_rst}"
  echo "  ${c_dim}PASSWORD = POSTGRES_PASSWORD from the Supabase stack's own .env.${c_rst}"
  ask_secret DATABASE_URI "DATABASE_URI (postgres://postgres:PASSWORD@db:5432/postgres)"
  [ -n "${DATABASE_URI:-}" ] || die "DATABASE_URI is required."
  ask DATABASE_SSL "DATABASE_SSL (true works with supabase/postgres; try false if it errors)" "true"
  ask DATABASE_SSL_REJECT_UNAUTHORIZED "Verify DB server cert? (true once a CA is trusted)" "false"

  echo; echo "${c_bold}Supabase Auth + Storage${c_rst}"
  ask NEXT_PUBLIC_SUPABASE_URL "NEXT_PUBLIC_SUPABASE_URL (https://supabase.your-domain)"
  ask NEXT_PUBLIC_SUPABASE_ANON_KEY "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  ask_secret SUPABASE_SERVICE_ROLE_KEY "SUPABASE_SERVICE_ROLE_KEY (server-only, bypasses RLS)"
  ask SUPABASE_INTERNAL_URL "SUPABASE_INTERNAL_URL (optional internal hostname)" ""
  ask NEXT_PUBLIC_AUTH_GOOGLE "Show Google sign-in button? (true/false)" "false"
  ask SUPABASE_S3_ENDPOINT "SUPABASE_S3_ENDPOINT (…/storage/v1/s3)" "${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3"
  ask SUPABASE_S3_REGION "SUPABASE_S3_REGION" "us-east-1"
  ask SUPABASE_S3_ACCESS_KEY_ID "SUPABASE_S3_ACCESS_KEY_ID"
  ask_secret SUPABASE_S3_SECRET_ACCESS_KEY "SUPABASE_S3_SECRET_ACCESS_KEY"
  ask S3_PUBLIC_BUCKET "Public bucket name" "marketing"
  ask S3_PROTECTED_BUCKET "Private (deliverables) bucket name" "course-assets"

  echo; echo "${c_bold}Stripe (leave blank to launch with checkout inert)${c_rst}"
  ask_secret STRIPE_SECRET_KEY "STRIPE_SECRET_KEY (sk_live_…)"
  ask_secret STRIPE_WEBHOOK_SECRET "STRIPE_WEBHOOK_SECRET (whsec_…)"
  ask NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (pk_live_…)" ""
  ask STRIPE_AUTOMATIC_TAX "Enable Stripe Tax? (true/false)" "false"

  echo; echo "${c_bold}Safety Chat (Anthropic — blank = assistant inert)${c_rst}"
  ask_secret ANTHROPIC_API_KEY "ANTHROPIC_API_KEY"
  ask SAFETY_CHAT_MODEL "SAFETY_CHAT_MODEL" "claude-sonnet-4-6"

  echo; echo "${c_bold}First admin (Payload /admin login)${c_rst}"
  ask SEED_ADMIN_EMAIL "SEED_ADMIN_EMAIL" "admin@${APP_DOMAIN}"
  ask_secret SEED_ADMIN_PASSWORD "SEED_ADMIN_PASSWORD (strong — change at first login)"
  [ -n "${SEED_ADMIN_PASSWORD:-}" ] || die "SEED_ADMIN_PASSWORD is required (no public default in prod)."

  # --- auto-generated secrets ---
  PAYLOAD_SECRET="$(openssl rand -hex 32)"
  REDIS_PASSWORD="$(openssl rand -base64 30 | tr -dc 'A-Za-z0-9' | cut -c1-40)"
  REDIS_URL="redis://default:${REDIS_PASSWORD}@redis:6379"
  ok "generated PAYLOAD_SECRET + REDIS_PASSWORD (written to .env, not shown)"

  say "Writing $ENV_FILE (chmod 600)"
  umask 177
  cat > "$ENV_FILE" <<EOF
# Generated by scripts/deploy.sh — DO NOT COMMIT. Secrets live here only.
PAYLOAD_SECRET=${PAYLOAD_SECRET}

DATABASE_URI=${DATABASE_URI}
DATABASE_SSL=${DATABASE_SSL}
DATABASE_SSL_REJECT_UNAUTHORIZED=${DATABASE_SSL_REJECT_UNAUTHORIZED}

NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
SUPABASE_INTERNAL_URL=${SUPABASE_INTERNAL_URL}
NEXT_PUBLIC_AUTH_GOOGLE=${NEXT_PUBLIC_AUTH_GOOGLE}

SUPABASE_S3_ENDPOINT=${SUPABASE_S3_ENDPOINT}
SUPABASE_S3_REGION=${SUPABASE_S3_REGION}
SUPABASE_S3_ACCESS_KEY_ID=${SUPABASE_S3_ACCESS_KEY_ID}
SUPABASE_S3_SECRET_ACCESS_KEY=${SUPABASE_S3_SECRET_ACCESS_KEY}
S3_PUBLIC_BUCKET=${S3_PUBLIC_BUCKET}
S3_PROTECTED_BUCKET=${S3_PROTECTED_BUCKET}

REDIS_PASSWORD=${REDIS_PASSWORD}
REDIS_URL=${REDIS_URL}

NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
CHECKOUT_ALLOWED_ORIGINS=${CHECKOUT_ALLOWED_ORIGINS}

STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
STRIPE_AUTOMATIC_TAX=${STRIPE_AUTOMATIC_TAX}

ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
SAFETY_CHAT_MODEL=${SAFETY_CHAT_MODEL}

APP_DOMAIN=${APP_DOMAIN}
APP_PORT=3000
TRAEFIK_ENTRYPOINT_HTTP=${TRAEFIK_ENTRYPOINT_HTTP}
TRAEFIK_ENTRYPOINT_HTTPS=${TRAEFIK_ENTRYPOINT_HTTPS}
TRAEFIK_CERTRESOLVER=${TRAEFIK_CERTRESOLVER}

SEED_ADMIN_EMAIL=${SEED_ADMIN_EMAIL}
SEED_ADMIN_PASSWORD=${SEED_ADMIN_PASSWORD}
EOF
  umask 022
  chmod 600 "$ENV_FILE"
  ok "$ENV_FILE written"
fi

# Re-read ONLY the values this script needs for its own logic (network checks, bucket
# provisioning, status messages). NEVER `source` the .env — a value may contain spaces or
# shell-special characters that bash would try to execute. Docker Compose reads .env
# itself for ${APP_DOMAIN}/${REDIS_PASSWORD}/${TRAEFIK_ENTRYPOINT_*} interpolation.
envget() { grep -E "^$1=" "$ENV_FILE" | head -n1 | cut -d= -f2-; }
APP_DOMAIN=$(envget APP_DOMAIN)
NEXT_PUBLIC_SUPABASE_URL=$(envget NEXT_PUBLIC_SUPABASE_URL)
SUPABASE_SERVICE_ROLE_KEY=$(envget SUPABASE_SERVICE_ROLE_KEY)
S3_PUBLIC_BUCKET=$(envget S3_PUBLIC_BUCKET)
S3_PROTECTED_BUCKET=$(envget S3_PROTECTED_BUCKET)
SEED_ADMIN_EMAIL=$(envget SEED_ADMIN_EMAIL)

# ---------------------------------------------------------------------------
# 2. Networks — Traefik `proxy` (may be created) + Supabase `supabase_default`
#    (must already exist). Both names are hardcoded in docker-compose.yml.
# ---------------------------------------------------------------------------
say "Ensuring Traefik network 'proxy' exists"
if docker network inspect proxy >/dev/null 2>&1; then ok "network exists"
else
  warn "network 'proxy' not found."
  if yesno "Create it now?" Y; then docker network create proxy >/dev/null && ok "created"; \
  else die "Traefik network 'proxy' missing — create it, or rename the proxy network in docker-compose.yml."; fi
fi

say "Checking Supabase network 'supabase_default' exists"
docker network inspect supabase_default >/dev/null 2>&1 \
  && ok "network exists (app + init reach Postgres at 'db' on it)" \
  || die "Supabase network 'supabase_default' not found — is the Supabase stack up? (rename it in docker-compose.yml if different)."

# ---------------------------------------------------------------------------
# 3. Build  (migrate + bucket-create + first-run seed all happen automatically in
#    the `init` job when the app starts below — see scripts/bootstrap.sh)
# ---------------------------------------------------------------------------
say "Building the images (runs next build + the CSS-fidelity check)"
$COMPOSE build
ok "images built"

# ---------------------------------------------------------------------------
# 4. Serve — `up` runs the init job (wait-for-db → migrate → buckets → first-run
#    seed) to completion, THEN starts the app.
# ---------------------------------------------------------------------------
say "Starting the stack (the init job migrates + seeds first; a fresh DB can take a few minutes)…"
$COMPOSE up -d
say "Waiting for health (Redis + Postgres)…"
healthy=0
for i in $(seq 1 45); do
  if $COMPOSE exec -T app curl -fsS http://127.0.0.1:3000/api/health >/tmp/csa_health.out 2>/dev/null; then
    healthy=1; break
  fi
  sleep 2
done
if [ "$healthy" -eq 1 ]; then ok "healthy: $(cat /tmp/csa_health.out)"; rm -f /tmp/csa_health.out
else warn "app not healthy yet — check init + app logs: $COMPOSE logs --tail 80 init app"; fi

# ---------------------------------------------------------------------------
# 8. Done
# ---------------------------------------------------------------------------
echo
say "${c_grn}Deploy complete.${c_rst}"
cat <<EOF
  Site:   https://${APP_DOMAIN}      (once Traefik issues the TLS cert)
  Admin:  https://${APP_DOMAIN}/admin   login: ${SEED_ADMIN_EMAIL}  — change this password now.

  The init job migrated the schema, created the buckets, and (on a fresh DB) seeded
  the real content + placeholder media. Replace the placeholder images with real
  brand assets in /admin.

  Still to do (outside this script):
    • Stripe webhook: add an endpoint https://${APP_DOMAIN}/stripe/webhook and put its
      signing secret in .env as STRIPE_WEBHOOK_SECRET, then re-run: $COMPOSE up -d
    • Confirm presigned downloads work against your Supabase S3 (a purchased template / lesson video).
    • Redeploy after a 'git pull':  bash scripts/deploy.sh   (reuse .env -> rebuild -> up;
      the init job re-migrates automatically and never re-seeds over your CMS edits)
EOF
