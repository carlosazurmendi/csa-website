#!/usr/bin/env bash
# ============================================================================
# CSA — guided production deploy for the SELF-CONTAINED bundle on a single Docker
# host (AWS Lightsail etc.) behind an EXISTING Traefik. This stack brings its OWN
# Postgres + Supabase Auth (GoTrue) + S3 storage (MinIO) — nothing external is
# needed except the Traefik `proxy` network.
#
# The app + init images are PREBUILT in CI and pulled from GHCR (this script does
# NOT build — see .github/workflows/build-images.yml). Run it from the repo root ON
# THE SERVER:
#   git clone https://github.com/carlosazurmendi/csa-website && cd csa-website
#   bash scripts/deploy.sh
#
# It prompts for the few values it can't generate, MINTS every secret it can
# (Payload secret, DB/MinIO/Redis passwords, and the linked Supabase JWT trio),
# writes a locked-down .env, then pulls the images and brings the stack up — the
# init job migrates + seeds automatically. Re-runnable: reuse .env -> pull -> up.
#
# Secrets you type stay on THIS machine — written only to ./.env (chmod 600,
# gitignored). Nothing is sent anywhere.
# ============================================================================
set -euo pipefail

COMPOSE="docker compose -f docker-compose.yml"   # prod file ONLY (dev/ is opt-in)
ENV_FILE=".env"

c_bold=$'\033[1m'; c_grn=$'\033[32m'; c_yel=$'\033[33m'; c_red=$'\033[31m'; c_dim=$'\033[2m'; c_rst=$'\033[0m'
say()  { printf '%s\n' "${c_bold}==>${c_rst} $*"; }
ok()   { printf '%s\n' "${c_grn}  ok${c_rst} $*"; }
warn() { printf '%s\n' "${c_yel}  !!${c_rst} $*"; }
die()  { printf '%s\n' "${c_red}error:${c_rst} $*" >&2; exit 1; }

ask() { # ask VAR "Prompt" ["default"]
  local __var=$1 __prompt=$2 __default=${3:-} __val
  if [ -n "$__default" ]; then read -rp "  $__prompt [${__default}]: " __val; __val=${__val:-$__default}
  else read -rp "  $__prompt: " __val; fi
  printf -v "$__var" '%s' "$__val"
}
ask_secret() { # ask_secret VAR "Prompt"  (hidden)
  local __var=$1 __prompt=$2 __val
  read -rsp "  $__prompt: " __val; echo
  printf -v "$__var" '%s' "$__val"
}
yesno() { local __q=$1 __d=${2:-Y} __a; read -rp "  $__q [$([ "$__d" = Y ] && echo 'Y/n' || echo 'y/N')]: " __a; __a=${__a:-$__d}; [[ $__a =~ ^[Yy]$ ]]; }

# --- secret helpers ---
randpw() { openssl rand -base64 30 | tr -dc 'A-Za-z0-9' | cut -c1-40; }
b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }
mint_jwt() { # mint_jwt ROLE SECRET  -> a supabase-style HS256 JWT (~10y)
  local role=$1 secret=$2 iat exp header payload data sig
  iat=$(date +%s); exp=$((iat + 315360000))
  header='{"alg":"HS256","typ":"JWT"}'
  payload="{\"role\":\"$role\",\"iss\":\"supabase\",\"iat\":$iat,\"exp\":$exp}"
  data="$(printf '%s' "$header" | b64url).$(printf '%s' "$payload" | b64url)"
  sig="$(printf '%s' "$data" | openssl dgst -binary -sha256 -hmac "$secret" | b64url)"
  printf '%s.%s' "$data" "$sig"
}

# ---------------------------------------------------------------------------
# 0. Preflight
# ---------------------------------------------------------------------------
say "Preflight checks"
[ -f docker-compose.yml ] && [ -f Dockerfile ] || die "run this from the repo root."
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
  if yesno "Reuse it as-is and skip to pull/deploy?" Y; then REUSE_ENV=1; fi
fi

if [ "$REUSE_ENV" -eq 0 ]; then
  say "Configuration — answer each prompt (blank = the shown default)"

  echo; echo "${c_bold}Domain & Traefik${c_rst}"
  ask APP_DOMAIN "Public site domain (APP_DOMAIN)"
  [ -n "${APP_DOMAIN:-}" ] || die "APP_DOMAIN is required."
  ask STORAGE_DOMAIN "Storage subdomain for protected downloads (needs its own DNS A record)" "files.${APP_DOMAIN}"
  ask TRAEFIK_ENTRYPOINT_HTTP "Traefik HTTP entrypoint name" "web"
  ask TRAEFIK_ENTRYPOINT_HTTPS "Traefik HTTPS entrypoint name" "websecure"
  ask TRAEFIK_CERTRESOLVER "Traefik cert resolver name" "letsencrypt"
  ask IMAGE_TAG "Image tag to deploy (latest, or a sha-xxxxxxx for an immutable deploy)" "latest"

  echo; echo "${c_bold}Email confirmation (GoTrue SMTP)${c_rst}"
  echo "  ${c_dim}Production requires email confirmation. Answer N to launch with auto-confirm${c_rst}"
  echo "  ${c_dim}(no email sent) until your SMTP is ready, then re-run and answer Y.${c_rst}"
  if yesno "Require email confirmation (need SMTP)?" Y; then
    GOTRUE_MAILER_AUTOCONFIRM=false
    ask GOTRUE_SMTP_HOST "SMTP host"
    ask GOTRUE_SMTP_PORT "SMTP port" "587"
    ask GOTRUE_SMTP_USER "SMTP username"
    ask_secret GOTRUE_SMTP_PASS "SMTP password"
    ask GOTRUE_SMTP_ADMIN_EMAIL "From address" "no-reply@${APP_DOMAIN}"
    ask GOTRUE_SMTP_SENDER_NAME "Sender name" "Critical Systems Analysis"
  else
    GOTRUE_MAILER_AUTOCONFIRM=true
    GOTRUE_SMTP_HOST=""; GOTRUE_SMTP_PORT="587"; GOTRUE_SMTP_USER=""; GOTRUE_SMTP_PASS=""
    GOTRUE_SMTP_ADMIN_EMAIL="no-reply@${APP_DOMAIN}"; GOTRUE_SMTP_SENDER_NAME="Critical Systems Analysis"
    warn "auto-confirm ON — switch to SMTP before public launch."
  fi

  echo; echo "${c_bold}Auth options${c_rst}"
  ask NEXT_PUBLIC_AUTH_GOOGLE "Show Google sign-in button? (true/false)" "false"
  ask CHECKOUT_ALLOWED_ORIGINS "Extra allowed origins, comma-sep (optional)" ""

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

  # --- generated secrets (DB / MinIO / Redis / Payload) ---
  PAYLOAD_SECRET="$(openssl rand -hex 32)"
  POSTGRES_PASSWORD="$(randpw)"
  MINIO_ROOT_USER="csa-$(openssl rand -hex 4)"
  MINIO_ROOT_PASSWORD="$(randpw)"
  REDIS_PASSWORD="$(randpw)"
  REDIS_URL="redis://default:${REDIS_PASSWORD}@redis:6379"
  # --- linked Supabase JWT trio (anon + service_role signed by the same secret) ---
  GOTRUE_JWT_SECRET="$(openssl rand -hex 40)"
  NEXT_PUBLIC_SUPABASE_ANON_KEY="$(mint_jwt anon "$GOTRUE_JWT_SECRET")"
  SUPABASE_SERVICE_ROLE_KEY="$(mint_jwt service_role "$GOTRUE_JWT_SECRET")"
  ok "generated Payload/DB/MinIO/Redis secrets + Supabase JWT trio (written to .env)"

  say "Writing $ENV_FILE (chmod 600)"
  umask 177
  cat > "$ENV_FILE" <<EOF
# Generated by scripts/deploy.sh — DO NOT COMMIT. Secrets live here only.
PAYLOAD_SECRET=${PAYLOAD_SECRET}

APP_DOMAIN=${APP_DOMAIN}
STORAGE_DOMAIN=${STORAGE_DOMAIN}
APP_PORT=3000
IMAGE_TAG=${IMAGE_TAG}
TRAEFIK_ENTRYPOINT_HTTP=${TRAEFIK_ENTRYPOINT_HTTP}
TRAEFIK_ENTRYPOINT_HTTPS=${TRAEFIK_ENTRYPOINT_HTTPS}
TRAEFIK_CERTRESOLVER=${TRAEFIK_CERTRESOLVER}

POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
DATABASE_SSL=false
DATABASE_SSL_REJECT_UNAUTHORIZED=false

GOTRUE_JWT_SECRET=${GOTRUE_JWT_SECRET}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
NEXT_PUBLIC_AUTH_GOOGLE=${NEXT_PUBLIC_AUTH_GOOGLE}

GOTRUE_MAILER_AUTOCONFIRM=${GOTRUE_MAILER_AUTOCONFIRM}
GOTRUE_SMTP_HOST=${GOTRUE_SMTP_HOST}
GOTRUE_SMTP_PORT=${GOTRUE_SMTP_PORT}
GOTRUE_SMTP_USER=${GOTRUE_SMTP_USER}
GOTRUE_SMTP_PASS=${GOTRUE_SMTP_PASS}
GOTRUE_SMTP_ADMIN_EMAIL=${GOTRUE_SMTP_ADMIN_EMAIL}
GOTRUE_SMTP_SENDER_NAME=${GOTRUE_SMTP_SENDER_NAME}

MINIO_ROOT_USER=${MINIO_ROOT_USER}
MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}
SUPABASE_S3_REGION=us-east-1
S3_PUBLIC_BUCKET=marketing
S3_PROTECTED_BUCKET=course-assets

REDIS_PASSWORD=${REDIS_PASSWORD}
REDIS_URL=${REDIS_URL}

CHECKOUT_ALLOWED_ORIGINS=${CHECKOUT_ALLOWED_ORIGINS}

STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
STRIPE_AUTOMATIC_TAX=${STRIPE_AUTOMATIC_TAX}

ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
SAFETY_CHAT_MODEL=${SAFETY_CHAT_MODEL}

SEED_ADMIN_EMAIL=${SEED_ADMIN_EMAIL}
SEED_ADMIN_PASSWORD=${SEED_ADMIN_PASSWORD}
EOF
  umask 022
  chmod 600 "$ENV_FILE"
  ok "$ENV_FILE written"
fi

envget() { grep -E "^$1=" "$ENV_FILE" | head -n1 | cut -d= -f2-; }
APP_DOMAIN=$(envget APP_DOMAIN)
STORAGE_DOMAIN=$(envget STORAGE_DOMAIN)
SEED_ADMIN_EMAIL=$(envget SEED_ADMIN_EMAIL)

# ---------------------------------------------------------------------------
# 2. Network — only the existing Traefik `proxy` is external now.
# ---------------------------------------------------------------------------
say "Ensuring Traefik network 'proxy' exists"
if docker network inspect proxy >/dev/null 2>&1; then ok "network exists"
else
  warn "network 'proxy' not found."
  if yesno "Create it now?" Y; then docker network create proxy >/dev/null && ok "created"
  else die "Traefik network 'proxy' missing — create it, or rename the proxy network in docker-compose.yml."; fi
fi

# ---------------------------------------------------------------------------
# 3. Pull the prebuilt images (built in CI; the box never builds).
# ---------------------------------------------------------------------------
say "Pulling app + init images from GHCR"
$COMPOSE pull app init redis db minio gotrue auth-proxy minio-init 2>/dev/null || \
  $COMPOSE pull || warn "pull reported errors — if the GHCR packages are private, log in:
    echo <PAT-with-read:packages> | docker login ghcr.io -u <github-user> --password-stdin
  or make the ghcr.io/.../csa-website[-init] packages public, then re-run."
ok "images pulled"

# ---------------------------------------------------------------------------
# 4. Serve — `up` runs db/minio/gotrue, then the init job (wait-for-db → migrate →
#    first-run seed) to completion, then starts the app.
# ---------------------------------------------------------------------------
say "Starting the stack (init migrates + seeds first; a fresh DB can take a few minutes)…"
$COMPOSE up -d
say "Waiting for app health (Redis + Postgres)…"
healthy=0
for i in $(seq 1 60); do
  if $COMPOSE exec -T app curl -fsS http://127.0.0.1:3000/api/health >/tmp/csa_health.out 2>/dev/null; then
    healthy=1; break
  fi
  sleep 3
done
if [ "$healthy" -eq 1 ]; then ok "healthy: $(cat /tmp/csa_health.out)"; rm -f /tmp/csa_health.out
else warn "app not healthy yet — check init + app logs: $COMPOSE logs --tail 80 init app"; fi

# ---------------------------------------------------------------------------
# 5. Done
# ---------------------------------------------------------------------------
echo
say "${c_grn}Deploy complete.${c_rst}"
cat <<EOF
  Site:    https://${APP_DOMAIN}          (once Traefik issues the TLS cert)
  Admin:   https://${APP_DOMAIN}/admin    login: ${SEED_ADMIN_EMAIL}  — change this password now.
  Storage: https://${STORAGE_DOMAIN}      (add a DNS A record for it -> this box)

  The init job migrated the schema, created the buckets, and (on a fresh DB) seeded the
  real content + placeholder media. Replace placeholder images with real assets in /admin.

  Still to do (outside this script):
    • DNS: A record for ${STORAGE_DOMAIN} -> this box (protected downloads/videos need it).
    • Stripe webhook: endpoint https://${APP_DOMAIN}/stripe/webhook -> STRIPE_WEBHOOK_SECRET, then: $COMPOSE up -d
    • New release: push to main -> CI builds images -> here run: $COMPOSE pull && $COMPOSE up -d
      (the init job re-migrates automatically and never re-seeds over your CMS edits)

  Persistent data lives in named volumes (pg-data, minio-data, redis-data) — this stack is
  now the system of record. NEVER run '$COMPOSE down -v' (it deletes the DB + all media).
EOF
