import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ResourceListing, type ListingCard } from '@/components/resources/ResourceListing'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Functional Safety Events & Webinars',
  description:
    "Meet CSA's engineering leaders and stay ahead of evolving functional safety regulations at top international automation and robotics safety conferences.",
}

// Map the Events collection `type` enum to the design's filter labels and
// per-card icon/cta presentation.
const TYPE: Record<string, { filter: string; icon: string; metaIcon: string; cta: string }> = {
  upcoming: { filter: 'Upcoming Events', icon: 'calendar-clock', metaIcon: 'map-pin', cta: 'Register' },
  'past-keynote': { filter: 'Past Keynotes', icon: 'mic', metaIcon: 'video', cta: 'Watch' },
  webinar: { filter: 'Technical Webinars', icon: 'monitor-play', metaIcon: 'video', cta: 'Watch' },
}

const longDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date to be announced'

export default async function EventsPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'events', sort: '-date', limit: 100, depth: 1 })

  const cards: ListingCard[] = res.docs.map((d: any) => {
    const t = TYPE[d.type] || { filter: d.type, icon: 'calendar-days', metaIcon: 'map-pin', cta: 'Learn more' }
    return {
      icon: t.icon,
      cat: t.filter,
      title: d.title,
      d: d.description || '',
      meta: longDate(d.date),
      metaIcon: t.metaIcon,
      cta: t.cta,
      href: d.link || '#',
      soon: !d.link,
    }
  })

  return (
    <ResourceListing
      hero={{
        eyebrow: 'Events & Webinars',
        eyebrowIcon: 'calendar-days',
        ghost: 'Events',
        title: 'Events & Webinars',
        lead:
          'Meet our engineering leaders, join open networking, and stay ahead of evolving functional safety regulations at top-tier international automation events and conferences.',
        cta: { label: 'See Upcoming Events', href: '#library' },
      }}
      filters={['All', 'Upcoming Events', 'Past Keynotes', 'Technical Webinars']}
      emptyTitle="Nothing scheduled here yet."
      emptyText="New sessions are added as our speaking calendar firms up. Check back, or reach out to arrange a private briefing."
      cards={cards}
      featured={{
        eyebrow: 'Featured Annual Appearances',
        title: "Where you'll find us each year.",
        lead:
          "CSA returns to the industry's leading automation and safety conferences. Come find our engineers on the floor and in the sessions.",
        items: [
          { icon: 'bot', t: 'Robotics Summit & Expo', d: 'Commercial robotics innovation and professional networking.' },
          { icon: 'cog', t: 'Automate', d: 'Motion control, machine vision, and advanced autonomous robotics integration.' },
          { icon: 'shield-check', t: 'International Robot Safety Conference', d: 'Deep dives into safe, highly effective industrial automation.' },
          { icon: 'train-front', t: 'Railway Interchange', d: 'Technical advances in mass transit safety, rail infrastructure, and signaling.' },
        ],
      }}
      closing={{
        eyebrow: 'Want us at your event?',
        title: 'Invite a CSA engineer to speak.',
        sub:
          'Our principals present on functional safety, certification, and safe autonomy. Reach out to arrange a keynote, panel, or private technical briefing.',
        cta: { label: 'Book a Consultation', href: '#' },
      }}
    />
  )
}
