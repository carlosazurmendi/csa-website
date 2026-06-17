import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ResourceListing, type ListingCard } from '@/components/resources/ResourceListing'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Free Functional Safety Training & Videos',
  description:
    'Free on-demand functional safety training — video summaries and introductory presentations on the core fundamentals of the safety lifecycle.',
}

// Map the FreeTrainings collection `category` enum to the design's filter
// labels and per-card icon/meta/cta presentation.
const CATEGORY: Record<string, { filter: string; icon: string; metaIcon: string; meta: string; cta: string }> = {
  'video-overview': { filter: 'Video Overviews', icon: 'play-circle', metaIcon: 'video', meta: 'Video · Overview', cta: 'Watch free' },
  whitepaper: { filter: 'Technical Whitepapers', icon: 'file-text', metaIcon: 'pen-line', meta: 'Whitepaper · Briefing', cta: 'Read free' },
  'core-intro': { filter: 'Core Introductions', icon: 'layers', metaIcon: 'presentation', meta: 'Presentation · Intro', cta: 'Start free' },
}

export default async function FreeTrainingsPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'freeTrainings', sort: 'order', limit: 100, depth: 1 })

  const cards: ListingCard[] = res.docs.map((d: any) => {
    const cat = CATEGORY[d.category] || { filter: d.category, icon: 'graduation-cap', metaIcon: 'file', meta: 'On demand', cta: 'Start free' }
    return {
      icon: cat.icon,
      cat: cat.filter,
      title: d.title,
      d: d.description,
      meta: cat.meta,
      metaIcon: cat.metaIcon,
      cta: cat.cta,
      href: d.link || '#',
    }
  })

  return (
    <ResourceListing
      hero={{
        eyebrow: 'Free Trainings',
        eyebrowIcon: 'graduation-cap',
        ghost: 'Trainings',
        title: 'Free Functional Safety Trainings',
        lead:
          'Access on-demand technical video summaries and high-level introductory presentations exploring the core fundamentals of the safety lifecycle.',
        cta: { label: 'Start Learning Free', href: '#library' },
      }}
      filters={['All', 'Video Overviews', 'Technical Whitepapers', 'Core Introductions']}
      emptyTitle="More briefings on the way."
      emptyText="New on-demand material is being produced for this category. Check back soon for the next release."
      cards={cards}
      closing={{
        eyebrow: 'Ready for the full lifecycle?',
        title: 'Go from fundamentals to certified.',
        sub:
          'These introductions cover the core ideas. When your program needs principal-led validation and certification, our engineers take it from here.',
        cta: { label: 'Book a Consultation', href: '#' },
      }}
    />
  )
}
