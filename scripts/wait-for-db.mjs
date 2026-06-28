// Block until the Postgres in DATABASE_URI accepts a connection (or give up after
// ~60s). Lets the `init` job tolerate the DB/app starting in any order without a
// hard depends_on. Mirrors payload.config.ts SSL handling.
import { Pool } from 'pg'

const uri = process.env.DATABASE_URI
if (!uri) {
  console.error('[wait-for-db] DATABASE_URI is not set')
  process.exit(1)
}
const ssl =
  process.env.DATABASE_SSL === 'false'
    ? false
    : { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true' }

const pool = new Pool({ connectionString: uri, ssl, max: 1, connectionTimeoutMillis: 4000 })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let ok = false
for (let i = 1; i <= 30; i++) {
  try {
    await pool.query('SELECT 1')
    ok = true
    break
  } catch (e) {
    console.log(`[wait-for-db] attempt ${i}/30 not ready: ${e.code || e.message}`)
    await sleep(2000)
  }
}
await pool.end().catch(() => {})

if (!ok) {
  console.error('[wait-for-db] database unreachable after ~60s — aborting bootstrap')
  process.exit(1)
}
console.log('[wait-for-db] database is reachable.')
