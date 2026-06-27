'use server'

import { revalidatePath } from 'next/cache'

import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'

/**
 * Owner-scoped profile save. Updates the signed-in customer's CustomerProfiles row
 * via the server-only Payload client (the collection is locked on the public API).
 */
export async function saveProfile(input: {
  fullName?: string
  jobTitle?: string
  company?: string
  phone?: string
  country?: string
}): Promise<{ ok?: true; error?: string }> {
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'You are not signed in.' }

  try {
    const payload = await getPayloadClient()
    await payload.update({
      collection: 'customer-profiles',
      id: customer.profile.id,
      overrideAccess: true,
      data: {
        fullName: input.fullName,
        jobTitle: input.jobTitle,
        company: input.company,
        phone: input.phone,
        country: input.country,
      },
    })
    revalidatePath('/portal')
    revalidatePath('/dashboard')
    return { ok: true }
  } catch {
    return { error: 'Could not save your profile. Please try again.' }
  }
}
