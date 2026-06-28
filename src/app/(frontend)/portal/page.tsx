import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'
import { getBillingState } from './stripe-actions'
import {
  PortalClient,
  type PortalProfile,
  type PortalOrder,
  type PortalTemplate,
} from './PortalClient'

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

function money(cents?: number | null): string {
  const n = typeof cents === 'number' ? cents : 0
  return '$' + (n / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function orderDate(value?: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/** The signed-in customer's orders (newest first) — owner-scoped, server-only. */
async function getMyOrders(userId: string): Promise<PortalOrder[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'orders',
    where: { userId: { equals: userId } },
    sort: '-createdAt',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })
  return (res.docs as unknown as Array<Record<string, unknown>>).map((o) => {
    const items = Array.isArray(o.items) ? (o.items as Array<Record<string, unknown>>) : []
    const first = (items[0]?.name as string) || 'Order'
    return {
      id: o.id as string | number,
      orderNumber: (o.orderNumber as string) || '',
      date: orderDate(o.createdAt as string | undefined),
      itemsSummary: items.length > 1 ? `${first} + ${items.length - 1} more` : first,
      itemCount: items.length,
      total: money(o.amountTotal as number | undefined),
      status: (o.status as string) || 'pending',
      receiptUrl: typeof o.receiptUrl === 'string' ? o.receiptUrl : null,
    }
  })
}

/** The signed-in customer's active entitlements → the Template Library. */
async function getMyTemplates(userId: string): Promise<PortalTemplate[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'entitlements',
    where: { and: [{ userId: { equals: userId } }, { active: { equals: true } }] },
    sort: '-grantedAt',
    limit: 100,
    depth: 1,
    overrideAccess: true,
  })
  return (res.docs as unknown as Array<Record<string, unknown>>).map((e) => {
    const product = (e.product && typeof e.product === 'object' ? e.product : {}) as Record<string, unknown>
    const standards = Array.isArray(product.standards)
      ? (product.standards as Array<Record<string, unknown> | string>)
          .map((s) => (typeof s === 'string' ? s : (s?.code as string)))
          .filter(Boolean)
      : []
    const format = product.format as string | undefined
    const fileType =
      format === 'Excel'
        ? 'XLSX'
        : format === 'Bundle' || product.type === 'bundle'
          ? 'BUNDLE'
          : 'DOCX'
    return {
      id: e.id as string | number,
      code: (product.code as string) || '',
      title: (product.title as string) || 'Template',
      fileType,
      version: typeof e.version === 'string' && e.version ? (e.version as string) : 'Latest revision',
      standards: standards as string[],
      downloadHref: `/download/${e.id}`,
      downloadable: Boolean(product.downloadableFile),
    }
  })
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

  const [billing, orders, templates] = await Promise.all([
    getBillingState(),
    getMyOrders(customer.userId),
    getMyTemplates(customer.userId),
  ])

  return (
    <PortalClient profile={profile} billing={billing} orders={orders} templates={templates} />
  )
}
