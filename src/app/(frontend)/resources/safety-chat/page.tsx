import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { SafetyChat } from '@/components/resources/SafetyChat'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'safetyChatPage' })) as any
  return {
    title: page?.meta?.title || 'Safety Chat — AI Functional Safety Assistant',
    description: page?.meta?.description || undefined,
  }
}

export default async function SafetyChatRoute() {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'safetyChatPage', depth: 1 })) as any

  const hero = page?.hero || {}
  const panel = page?.panel || {}
  const closing = page?.closing || {}

  return (
    <SafetyChat
      hero={{
        eyebrow: hero.eyebrow,
        eyebrowIcon: hero.eyebrowIcon,
        ghost: hero.ghost,
        title: hero.title,
        sub: hero.sub,
        note: hero.note,
        primaryCtaLabel: hero.primaryCtaLabel,
        primaryCtaHref: hero.primaryCtaHref || '#',
        secondaryCtaLabel: hero.secondaryCtaLabel,
        secondaryCtaHref: hero.secondaryCtaHref || '#',
      }}
      panel={{
        name: panel.name,
        status: panel.status,
        tag: panel.tag,
        thread: (panel.thread || []).map((m: any) => ({ who: m.who, text: m.text })),
        suggestions: (panel.suggestions || []).map((s: any) => s.label),
        placeholder: panel.placeholder,
        lockText: panel.lockText,
        lockCtaLabel: panel.lockCtaLabel,
        lockCtaHref: panel.lockCtaHref || '#',
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
