import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPayloadClient } from '@/lib/payload'

// ISR: CMS edits to legal copy surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

const getLegalPage = async (slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'legalPages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return res.docs[0] as
    | { title: string; lastUpdated?: string | null; body?: unknown }
    | undefined
}

const formatDate = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getLegalPage(slug)
  if (!page) return {}
  return {
    title: page.title,
    description: `${page.title} — Critical Systems Analysis. Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.`,
  }
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getLegalPage(slug)
  if (!page) notFound()

  const lastUpdated = formatDate(page.lastUpdated)

  return (
    <main className="legal" data-screen-label={page.title}>
      <div className="legal__inner">
        <header className="legal__head">
          <p className="csa-eyebrow legal__crumb">Legal</p>
          <h1 className="csa-display legal__title">{page.title}</h1>
          {lastUpdated && (
            <p className="legal__updated">Last updated · {lastUpdated}</p>
          )}
        </header>

        {page.body ? (
          <div className="legal__prose csa-body">
            <RichText data={page.body as never} />
          </div>
        ) : null}
      </div>

      {/* Centered prose column styled on the design's tokens (already global). */}
      <style>{`
        .legal {
          position: relative;
          background:
            radial-gradient(60% 60% at 50% 0%, rgba(52,70,94,0.22) 0%, rgba(10,14,20,0) 60%),
            var(--bg-base);
          padding: 170px 24px 130px;
        }
        .legal__inner { max-width: 760px; margin: 0 auto; }
        .legal__head {
          border-bottom: 1px solid var(--border-2);
          padding-bottom: 34px;
          margin-bottom: 44px;
        }
        .legal__crumb { margin: 0 0 18px; }
        .legal__title {
          margin: 0;
          font-size: clamp(38px, 5vw, 64px);
          line-height: 1.0;
          letter-spacing: -0.025em;
        }
        .legal__updated {
          margin: 18px 0 0;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .legal__prose { color: var(--fg-2); font-size: 16px; line-height: 1.7; }
        .legal__prose > * + * { margin-top: 1.05em; }
        .legal__prose h2 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(22px, 2.6vw, 30px);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: var(--fg-1);
          margin-top: 2.4em;
        }
        .legal__prose h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 19px;
          color: var(--fg-1);
          margin-top: 1.8em;
        }
        .legal__prose h2:first-child,
        .legal__prose h3:first-child { margin-top: 0; }
        .legal__prose strong { color: var(--fg-1); font-weight: 600; }
        .legal__prose a { color: var(--gold-400); text-decoration: underline; text-underline-offset: 3px; }
        .legal__prose ul, .legal__prose ol { padding-left: 1.4em; }
        .legal__prose li + li { margin-top: 0.5em; }
      `}</style>
    </main>
  )
}
