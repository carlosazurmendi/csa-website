// Post-migrate sanity gate. `payload migrate` can report success while the resulting
// schema is incomplete if the box hit disk/resource pressure mid-migration. Before we
// seed (or hand off to the app), assert the core content tables actually exist — fail
// LOUD with an actionable message instead of letting a half-built schema slip through.
import { Pool } from 'pg'

const REQUIRED = ['users', 'instructors', 'case_studies', 'courses', 'products', 'media']

const ssl =
  process.env.DATABASE_SSL === 'false'
    ? false
    : { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true' }
const pool = new Pool({ connectionString: process.env.DATABASE_URI, ssl, max: 1 })

try {
  const missing = []
  for (const t of REQUIRED) {
    const r = await pool.query('SELECT to_regclass($1) AS reg', [`public.${t}`])
    if (!r.rows[0]?.reg) missing.push(t)
  }
  await pool.end().catch(() => {})
  if (missing.length) {
    console.error(
      `[assert-schema] FATAL: migrations reported success but these tables are missing: ${missing.join(', ')}.\n` +
        `  The migrate did not fully apply (often disk/resource pressure on a small box).\n` +
        `  Fix: free disk (df -h / docker system prune), then redeploy on a CLEAN database\n` +
        `  (remove the pg-data volume) so the schema is built from scratch.`,
    )
    process.exit(1)
  }
  console.log(`[assert-schema] ok — ${REQUIRED.length} core tables present.`)
  process.exit(0)
} catch (e) {
  await pool.end().catch(() => {})
  console.error(`[assert-schema] FATAL: could not verify schema (${e.code || e.message}).`)
  process.exit(1)
}
