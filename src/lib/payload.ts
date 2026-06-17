import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Payload Local API client for use in React Server Components — no HTTP
 * round-trip, queries hit the database directly. Cached per request.
 */
export const getPayloadClient = async () => getPayload({ config })
