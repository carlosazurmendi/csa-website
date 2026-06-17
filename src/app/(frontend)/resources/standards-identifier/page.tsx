import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { StandardsIdentifier } from '@/components/resources/StandardsIdentifier'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'standardsIdentifierPage' })) as any
  return {
    title: page?.meta?.title || 'Safety Standards Identifier Tool',
    description: page?.meta?.description || undefined,
  }
}

export default async function StandardsIdentifierRoute() {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'standardsIdentifierPage', depth: 1 })) as any

  const hero = page?.hero || {}
  const tool = page?.tool || {}
  const frameworks = page?.frameworks || {}
  const howItWorks = page?.howItWorks || {}
  const closing = page?.closing || {}

  return (
    <StandardsIdentifier
      hero={{
        eyebrow: hero.eyebrow,
        eyebrowIcon: hero.eyebrowIcon,
        ghost: hero.ghost,
        title: hero.title,
        sub1: hero.sub1,
        sub2: hero.sub2,
        primaryCtaLabel: hero.primaryCtaLabel,
        primaryCtaHref: hero.primaryCtaHref || '#tool',
        secondaryCtaLabel: hero.secondaryCtaLabel,
        secondaryCtaHref: hero.secondaryCtaHref || '#',
      }}
      tool={{
        name: tool.name,
        sub: tool.sub,
        badge: tool.badge,
        selectors: (tool.selectors || []).map((s: any, i: number) => ({
          key: `sel-${i}`,
          step: s.step,
          label: s.label,
          options: (s.options || []).map((o: any) => o.label),
        })),
        submitLabel: tool.submitLabel,
        submitNote: tool.submitNote,
        resultLabel: tool.resultLabel,
        resultPreviewLabel: tool.resultPreviewLabel,
        roadmap: (tool.roadmap || []).map((r: any) => ({ code: r.code, meta: r.meta, pill: r.pill })),
        veilText: tool.veilText,
      }}
      frameworks={{
        eyebrow: frameworks.eyebrow,
        title: frameworks.title,
        lead: frameworks.lead,
        items: (frameworks.items || []).map((f: any) => ({
          icon: f.icon,
          t: f.title,
          codes: (f.codes || []).map((c: any) => c.label),
        })),
      }}
      howItWorks={{
        eyebrow: howItWorks.eyebrow,
        title: howItWorks.title,
        steps: (howItWorks.steps || []).map((s: any) => ({ n: s.number, t: s.title, d: s.description })),
      }}
      closing={{
        eyebrow: closing.eyebrow,
        title: closing.title,
        sub: closing.sub,
        cta: { label: closing.ctaLabel, href: closing.ctaHref || '#tool' },
      }}
    />
  )
}
