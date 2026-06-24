import 'server-only'

import type { User } from '@supabase/supabase-js'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getPayloadClient } from '@/lib/payload'

/**
 * Server-side end-user identity helpers. End users authenticate via Supabase
 * (NOT Payload). Their app data lives in API-locked Payload collections and is
 * ONLY ever read/written here, server-side, filtered by the owning Supabase
 * user id — never via Payload's public REST/GraphQL API.
 */

const supabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

/** Current Supabase user, or null. Safe to call before Supabase env is set. */
export async function getSupabaseUser(): Promise<User | null> {
  if (!supabaseConfigured()) return null
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  return data.user ?? null
}

/**
 * Upsert the Payload `profiles` mirror for a Supabase user. Called after email
 * verification / first login (the auth callback). Uses overrideAccess because
 * the profiles collection is API-locked and this is trusted server code.
 */
export async function ensureProfile(user: User) {
  const payload = await getPayloadClient()
  const existing = await payload.find({
    collection: 'profiles',
    where: { authUserId: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs.length > 0) return existing.docs[0]

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>
  return payload.create({
    collection: 'profiles',
    overrideAccess: true,
    data: {
      authUserId: user.id,
      email: user.email ?? '',
      fullName: (meta.full_name as string) || (meta.name as string) || '',
    },
  })
}

/** The Payload profile for the current Supabase user, or null. */
export async function getCurrentProfile() {
  const user = await getSupabaseUser()
  if (!user) return null
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'profiles',
    where: { authUserId: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })
  return res.docs[0] ?? null
}
