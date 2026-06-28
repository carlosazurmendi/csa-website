// First-run guard for bootstrap seeding. Exit 0 = already seeded (skip the seed),
// exit 1 = fresh (run the seed). The sentinel is CONTENT, not the admin user, so a
// half-finished first run (admin created but content seed failed) still re-seeds.
// `case_studies` is created+populated by `npm run seed`; >0 rows ⇒ content is in.
import { Pool } from 'pg'

const ssl =
  process.env.DATABASE_SSL === 'false'
    ? false
    : { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true' }
const pool = new Pool({ connectionString: process.env.DATABASE_URI, ssl, max: 1 })

try {
  const r = await pool.query('SELECT count(*)::int AS n FROM case_studies')
  await pool.end().catch(() => {})
  if ((r.rows[0]?.n ?? 0) > 0) {
    console.log(`[is-seeded] yes — content present (case_studies=${r.rows[0].n})`)
    process.exit(0)
  }
  console.log('[is-seeded] no — content table empty')
  process.exit(1)
} catch (e) {
  await pool.end().catch(() => {})
  // Table not present yet (pre-migrate / unexpected) → treat as fresh and seed.
  console.log(`[is-seeded] no — content table not queryable (${e.code || e.message})`)
  process.exit(1)
}
