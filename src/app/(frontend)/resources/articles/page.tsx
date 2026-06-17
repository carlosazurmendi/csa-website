import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ResourceListing, type ListingCard } from '@/components/resources/ResourceListing'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Functional Safety Articles & Insights',
  description:
    'Expert functional safety publications on real-world compliance pathways and best practices for high-stakes physical systems — robotics, automotive, rail, and more.',
}

const monthYear = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''

export default async function ArticlesPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    sort: '-publishedDate',
    limit: 100,
    depth: 1,
    where: { _status: { equals: 'published' } },
  })

  const cards: ListingCard[] = res.docs.map((a: any) => ({
    icon: 'newspaper',
    cat: a.category,
    title: a.title,
    d: a.excerpt || '',
    meta: monthYear(a.publishedDate),
    metaIcon: 'calendar',
    cta: 'Read article',
    href: `/resources/articles/${a.slug}`,
  }))

  // Filter chips: "All" plus each distinct category present, in first-seen order.
  const categories = Array.from(new Set(res.docs.map((a: any) => a.category as string)))
  const filters = ['All', ...categories]

  return (
    <ResourceListing
      hero={{
        eyebrow: 'Articles',
        eyebrowIcon: 'newspaper',
        ghost: 'Articles',
        title: 'Functional Safety Articles & Insights',
        lead:
          'Explore our library of expert safety engineering publications detailing real-world compliance pathways and best practices for high-stakes physical systems.',
        cta: { label: 'Read the Latest', href: '#library' },
      }}
      filters={filters}
      emptyTitle="First articles publishing soon."
      emptyText="Our publication pipeline is spinning up. New articles will appear here as each is reviewed and released."
      cards={cards}
      closing={{
        eyebrow: "Can't wait for the next article?",
        title: 'Ask an engineer directly.',
        sub:
          'Our publications cover the patterns — your program is specific. Bring your compliance questions to a principal safety engineer.',
        cta: { label: 'Book a Consultation', href: '#' },
      }}
    />
  )
}
