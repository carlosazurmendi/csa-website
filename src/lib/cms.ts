import { getPayload, type Payload } from 'payload'
import { cache } from 'react'
import config from '@payload-config'

import { cached, CACHE_ALL_TAG } from './cache'

/**
 * CMS data layer (server-only). Thin wrappers over the Payload Local API used by
 * the ported marketing pages. Reads are access-checked (overrideAccess:false) so
 * the public site only ever sees PUBLISHED content. Every helper is request-cached
 * (React `cache`) and fails soft (returns null/[]) so a cold-start or a missing
 * record degrades to an empty section rather than a 500.
 */

export const getPayloadClient = cache(async (): Promise<Payload> => getPayload({ config }))

/** Read a global (header, footer, site settings, …). Returns null on any error.
 *  Cached in Redis (tag `global:<slug>` + `all`); purged on publish. */
export async function getGlobalSafe<T = Record<string, unknown>>(slug: string): Promise<T | null> {
  try {
    return await cached<T | null>(`global:${slug}`, [`global:${slug}`, CACHE_ALL_TAG], async () => {
      const payload = await getPayloadClient()
      const data = await payload.findGlobal({ slug: slug as never, depth: 2 })
      return (data as unknown) as T
    })
  } catch {
    return null
  }
}

type FindOpts = {
  where?: Record<string, unknown>
  sort?: string
  limit?: number
  depth?: number
}

/** Find published docs in a collection. Returns [] on any error.
 *  Cached in Redis (tag `<collection>` + `all`); purged on publish. A live-read
 *  failure throws out of the cached() fn so the empty result is NOT cached. */
export async function findDocs<T = Record<string, unknown>>(
  collection: string,
  opts: FindOpts = {},
): Promise<T[]> {
  const key = `find:${collection}:${JSON.stringify(opts)}`
  try {
    return await cached<T[]>(key, [collection, CACHE_ALL_TAG], async () => {
      const payload = await getPayloadClient()
      const res = await payload.find({
        collection: collection as never,
        where: (opts.where ?? {}) as never,
        sort: (opts.sort ?? undefined) as never,
        limit: opts.limit ?? 100,
        depth: opts.depth ?? 1,
        overrideAccess: false,
        draft: false,
      })
      return (res.docs as unknown) as T[]
    })
  } catch {
    return []
  }
}

/** Find one published doc by slug. Returns null on any error / not found. */
export async function findBySlug<T = Record<string, unknown>>(
  collection: string,
  slug: string,
  depth = 2,
): Promise<T | null> {
  const docs = await findDocs<T>(collection, { where: { slug: { equals: slug } }, limit: 1, depth })
  return docs[0] ?? null
}

/** The single Home record (one-row page collection). */
export async function getHome<T = Record<string, unknown>>(): Promise<T | null> {
  const docs = await findDocs<T>('home', { limit: 1, depth: 2 })
  return docs[0] ?? null
}

// Lexical → plain-text helpers live in @/lib/lexical (dependency-free, client-safe).
export { lexicalToParagraphs, lexicalToText } from './lexical'
