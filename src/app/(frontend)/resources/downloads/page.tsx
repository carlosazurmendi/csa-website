import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ResourceListing, type ListingCard } from '@/components/resources/ResourceListing'

// ISR: CMS edits surface within 60s without a redeploy.
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Downloadable Functional Safety Resources',
  description:
    'Engineer-reviewed functional safety checklists, framework guides, and template overviews to jumpstart your internal safety tracking. Free downloads across the lifecycle.',
}

// Map the Resources collection `category` enum to the design's filter labels
// and per-card icon/meta presentation.
const CATEGORY: Record<string, { filter: string; icon: string; metaIcon: string; meta: string }> = {
  checklist: { filter: 'Checklists', icon: 'clipboard-check', metaIcon: 'file-text', meta: 'PDF · Checklist' },
  guidebook: { filter: 'Guidebooks', icon: 'route', metaIcon: 'book-open', meta: 'PDF · Guidebook' },
  'free-template': { filter: 'Free Templates', icon: 'layout-grid', metaIcon: 'table', meta: 'XLSX · Template' },
  'standards-guide': { filter: 'Standards Guides', icon: 'book-marked', metaIcon: 'book-open', meta: 'PDF · Standards Guide' },
}

const fileUrl = (m: unknown): string | undefined =>
  m && typeof m === 'object' && 'url' in m ? ((m as { url?: string }).url ?? undefined) : undefined

export default async function DownloadsPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'resources', sort: 'order', limit: 100, depth: 1 })

  const cards: ListingCard[] = res.docs.map((d: any) => {
    const cat = CATEGORY[d.category] || { filter: d.category, icon: 'file', metaIcon: 'file', meta: 'Download' }
    const href = fileUrl(d.file)
    return {
      icon: cat.icon,
      cat: cat.filter,
      title: d.title,
      d: d.description,
      meta: cat.meta,
      metaIcon: cat.metaIcon,
      cta: 'Download',
      href: href || '#',
    }
  })

  return (
    <ResourceListing
      hero={{
        eyebrow: 'Downloadable Resources',
        eyebrowIcon: 'file-check',
        ghost: 'Downloads',
        title: 'Downloadable Functional Safety Resources',
        lead:
          'Access our repository of practical, engineer-reviewed checklists, framework guides, and template overviews to jumpstart your internal safety tracking.',
        cta: { label: 'Browse Downloads', href: '#library' },
      }}
      filters={['All', 'Checklists', 'Guidebooks', 'Free Templates', 'Standards Guides']}
      emptyTitle="More resources are being added."
      emptyText="New downloads are being created for each filter category. Check back soon, or talk to an engineer for what you need now."
      cards={cards}
      closing={{
        eyebrow: 'Beyond the downloads',
        title: 'Need it built for your program?',
        sub:
          'These templates accelerate your internal tracking — but certification takes principal-led engineering. Bring us your toughest safety-critical system.',
        cta: { label: 'Book a Consultation', href: '#' },
      }}
    />
  )
}
