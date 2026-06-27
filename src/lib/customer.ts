import { createClient } from '@/lib/supabase/server'
import { getPayloadClient } from '@/lib/cms'

/**
 * Owner-scoped customer access (M5). The end user is a Supabase auth user, NOT a
 * Payload user, so app-data collections stay locked on the public API and are read
 * here with the server-only Payload client (overrideAccess) filtered by the Supabase
 * user id. A CustomerProfiles row is auto-provisioned on first access.
 */
export type CustomerProfile = {
  id: number | string
  userId: string
  fullName?: string | null
  email?: string | null
  company?: string | null
  jobTitle?: string | null
  country?: string | null
  phone?: string | null
  plan?: string | null
  emailVerified?: boolean | null
  createdAt?: string | null
}

export type CurrentCustomer = {
  userId: string
  email: string
  emailVerified: boolean
  profile: CustomerProfile
}

/** The signed-in Supabase user + their (auto-provisioned) profile, or null. */
export async function getCurrentCustomer(): Promise<CurrentCustomer | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const payload = await getPayloadClient()
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>
  const metaName =
    (typeof meta.full_name === 'string' && meta.full_name) ||
    (typeof meta.name === 'string' && meta.name) ||
    ''

  const found = await payload.find({
    collection: 'customer-profiles',
    where: { userId: { equals: user.id } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  let profile = found.docs[0] as CustomerProfile | undefined

  if (!profile) {
    profile = (await payload.create({
      collection: 'customer-profiles',
      overrideAccess: true,
      data: {
        userId: user.id,
        email: user.email ?? '',
        fullName: metaName || (user.email ? user.email.split('@')[0] : ''),
        company: typeof meta.company === 'string' ? meta.company : undefined,
        plan: 'Customer',
        emailVerified: Boolean(user.email_confirmed_at),
        createdAt: user.created_at ?? undefined,
      },
    })) as CustomerProfile
  }

  return {
    userId: user.id,
    email: user.email ?? '',
    emailVerified: Boolean(user.email_confirmed_at),
    profile,
  }
}
