import type { CollectionConfig, GlobalConfig } from 'payload'

import { purgeTags, CACHE_ALL_TAG } from './cache'

/**
 * Revalidate-on-publish (M8). Wraps a PUBLIC content collection / global so any
 * create/update/delete purges the Redis CMS cache (src/lib/cache.ts) and busts
 * Next's router cache — so an admin publish appears on the live site immediately,
 * with no redeploy. Applied only to public content in payload.config (NOT to
 * owner/app-data collections, whose writes must not thrash the public cache).
 */
async function purgeAll(): Promise<void> {
  await purgeTags([CACHE_ALL_TAG])
  try {
    // Dynamic import so config load (build / importmap) never pulls next/cache.
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Outside a Next server context (e.g. a CLI seed) — Redis purge is enough.
  }
}

export function withRevalidate(c: CollectionConfig): CollectionConfig {
  return {
    ...c,
    hooks: {
      ...(c.hooks ?? {}),
      afterChange: [...(c.hooks?.afterChange ?? []), async () => void (await purgeAll())],
      afterDelete: [...(c.hooks?.afterDelete ?? []), async () => void (await purgeAll())],
    },
  }
}

export function withRevalidateGlobal(g: GlobalConfig): GlobalConfig {
  return {
    ...g,
    hooks: {
      ...(g.hooks ?? {}),
      afterChange: [...(g.hooks?.afterChange ?? []), async () => void (await purgeAll())],
    },
  }
}
