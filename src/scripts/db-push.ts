/**
 * Dev-only: initialise Payload with the postgres adapter's `push` enabled
 * (NODE_ENV !== 'production') so it syncs the live schema to the current config.
 * Use to apply an additive schema change to the local DB when the Payload CLI
 * migrate generator is unavailable. Run via `npx tsx` with env sourced, e.g.:
 *   NODE_ENV=development npx tsx src/scripts/db-push.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
console.log('Schema push complete.', payload.db.pool ? '(pg pool active)' : '')
process.exit(0)
