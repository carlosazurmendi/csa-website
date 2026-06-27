import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentCustomer } from '@/lib/customer'
import { getBillingState } from './stripe-actions'
import { PortalClient, type PortalProfile } from './PortalClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Customer Portal | CSA',
  robots: { index: false, follow: false },
}

function initialsOf(name: string, email: string): string {
  const base = (name || '').trim() || email || ''
  const parts = base.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return (base.slice(0, 2) || 'CS').toUpperCase()
}

function memberSince(value?: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export default async function PortalPage() {
  const customer = await getCurrentCustomer()
  if (!customer) redirect('/login?next=/portal')

  const p = customer.profile
  const fullName = p.fullName || customer.email.split('@')[0] || 'Account'
  const profile: PortalProfile = {
    fullName,
    jobTitle: p.jobTitle ?? '',
    company: p.company ?? '',
    phone: p.phone ?? '',
    country: p.country ?? '',
    email: p.email || customer.email,
    emailVerified: customer.emailVerified,
    initials: initialsOf(fullName, customer.email),
    plan: p.plan || 'Customer',
    memberSince: memberSince(p.createdAt),
  }

  const billing = await getBillingState()

  return <PortalClient profile={profile} billing={billing} />
}
