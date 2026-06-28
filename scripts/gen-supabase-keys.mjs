#!/usr/bin/env node
// ============================================================================
// Generate the THREE linked Supabase secrets the bundled GoTrue + app need:
//   GOTRUE_JWT_SECRET          — the HS256 signing secret GoTrue verifies tokens with
//   NEXT_PUBLIC_SUPABASE_ANON_KEY    — a JWT { role: "anon" }         signed with it
//   SUPABASE_SERVICE_ROLE_KEY        — a JWT { role: "service_role" } signed with it
//
// All three MUST share the same secret or auth tokens won't validate. This mirrors
// how hosted/self-hosted Supabase derives the anon + service keys from the JWT secret.
//
// Usage:
//   node scripts/gen-supabase-keys.mjs            # generate a fresh random secret
//   node scripts/gen-supabase-keys.mjs <secret>   # derive keys from an existing secret
//
// Paste the printed values into your deploy env (e.g. dockhand's env editor). The
// secret values stay on your machine — nothing is written to disk by this script.
// ============================================================================
import crypto from 'node:crypto'

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

function signJwt(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const enc = (o) => b64url(JSON.stringify(o))
  const data = `${enc(header)}.${enc(payload)}`
  const sig = crypto.createHmac('sha256', secret).update(data).digest()
  return `${data}.${b64url(sig)}`
}

// A 40-byte (80 hex char) secret — comfortably above GoTrue's 32-char minimum.
const secret = process.argv[2] || crypto.randomBytes(40).toString('hex')

const iat = Math.floor(Date.now() / 1000)
const exp = iat + 10 * 365 * 24 * 60 * 60 // ~10 years; rotate by regenerating all three
const base = { iss: 'supabase', iat, exp }

const anon = signJwt({ ...base, role: 'anon' }, secret)
const service = signJwt({ ...base, role: 'service_role' }, secret)

const out = `
# ── Supabase keys (paste into your deploy env — keep SERVICE_ROLE server-only) ──
GOTRUE_JWT_SECRET=${secret}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anon}
SUPABASE_SERVICE_ROLE_KEY=${service}
`
process.stdout.write(out)
