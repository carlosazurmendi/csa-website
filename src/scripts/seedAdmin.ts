import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Idempotent first-admin seed. Run with: `payload run src/scripts/seedAdmin.ts`.
 * Uses TOP-LEVEL await so the process stays alive until the create resolves.
 * Credentials are overridable via env so production never bakes a known password.
 */
const payload = await getPayload({ config })

const email = process.env.SEED_ADMIN_EMAIL || 'admin@csa.local'
const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026'

const existing = await payload.count({ collection: 'users' })
if (existing.totalDocs > 0) {
  payload.logger.info('Users already exist — skipping admin seed.')
} else {
  await payload.create({
    collection: 'users',
    data: { email, password, name: 'CSA Admin', roles: ['admin'] },
  })
  payload.logger.info(`Seeded first admin user: ${email}`)
}

process.exit(0)
