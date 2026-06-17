import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ResourcesHub } from '@/components/resources/ResourcesHub'

// ISR: CMS edits surface within 60s without a redeploy.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'resourcesOverview' })) as any
  return {
    title: page?.meta?.title || 'Functional Safety Resources & Tools',
    description: page?.meta?.description || undefined,
  }
}

export default async function ResourcesPage() {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'resourcesOverview', depth: 1 })) as any

  const hero = page?.hero || {}
  const tools = page?.tools || {}
  const library = page?.library || {}
  const closing = page?.closing || {}

  return (
    <ResourcesHub
      hero={{
        eyebrow: hero.eyebrow,
        eyebrowIcon: hero.eyebrowIcon,
        ghost: hero.ghost,
        title: hero.title,
        sub: hero.sub,
        jump: (hero.jump || []).map((j: any) => ({ icon: j.icon, label: j.label, href: j.href })),
      }}
      tools={{
        eyebrow: tools.eyebrow,
        title: tools.title,
        lead: tools.lead,
        items: (tools.items || []).map((t: any) => ({
          icon: t.icon,
          tag: t.tag,
          title: t.title,
          description: t.description,
          href: t.href,
        })),
      }}
      library={{
        eyebrow: library.eyebrow,
        title: library.title,
        lead: library.lead,
        items: (library.items || []).map((l: any) => ({
          icon: l.icon,
          title: l.title,
          description: l.description,
          href: l.href,
        })),
      }}
      closing={{
        eyebrow: closing.eyebrow,
        title: closing.title,
        sub: closing.sub,
        cta: { label: closing.ctaLabel, href: closing.ctaHref || '#' },
      }}
    />
  )
}
