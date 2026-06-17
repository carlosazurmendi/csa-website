# syntax=docker/dockerfile:1
# Production image for the CSA site (Next.js standalone + Payload).
# Node 22 (matches .node-version; avoids the Node 26 tsx issue).

# ---- deps: install dependencies ----
FROM node:22-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: produce the standalone server ----
FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The build does NOT touch the database (pages render dynamically), but the
# Payload config still instantiates the adapter, so provide harmless placeholders.
ENV DATABASE_URI="postgresql://build:build@localhost:5432/build"
ENV PAYLOAD_SECRET="build-only-secret-not-used-at-runtime"
RUN npm run build

# ---- runner: minimal runtime ----
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd -r nodejs && useradd -r -g nodejs nextjs

# Next standalone bundle + the static assets and public dir it does NOT include.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Local-disk media dir (used only when S3_* env is unset). Mount a volume here
# to persist uploads across container restarts.
RUN mkdir -p /app/media && chown nextjs:nodejs /app/media

USER nextjs
EXPOSE 3000

# Payload applies pending migrations on init (prodMigrations), so the schema is
# created/updated automatically against DATABASE_URI on first boot.
CMD ["node", "server.js"]
