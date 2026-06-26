# syntax=docker/dockerfile:1

# ============================================================================
# CSA — production image. Multi-stage, slim glibc runtime, Next standalone.
# Base is Debian bookworm-slim (NOT alpine) so sharp's prebuilt glibc binary loads.
# ============================================================================

# ---- base ----
FROM node:22-bookworm-slim AS base
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# ---- deps (full install incl. dev deps for the build) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ----
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate the admin import map, then build (output:'standalone').
RUN npm run generate:importmap && npm run build

# ---- runner (standalone runtime) ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Without HOSTNAME, Next's server.js binds loopback and Traefik can't reach it.
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# standalone output does NOT include public/ or .next/static — copy both explicitly.
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
