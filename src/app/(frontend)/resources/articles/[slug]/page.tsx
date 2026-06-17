import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPayloadClient } from '@/lib/payload'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

const mediaUrl = (m: unknown): string | undefined =>
  m && typeof m === 'object' && 'url' in m ? ((m as { url?: string }).url ?? undefined) : undefined

const longDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''

async function getArticle(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return (res.docs[0] as any) || null
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt || undefined,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const heroUrl = mediaUrl(article.heroImage)

  return (
    <main className="res">
      <article className="res-article">
        <header className="res-hero res-hero--listing" data-screen-label="Article Hero">
          <div className="res-hero__ghost" aria-hidden="true">Article</div>
          <div className="res-hero__inner">
            <p className="csa-eyebrow">
              <span className="res-hero__eyebrow-ico"><i data-lucide="newspaper"></i></span>
              {article.category}
              {article.publishedDate ? <span className="res-article__date"> · {longDate(article.publishedDate)}</span> : null}
            </p>
            <h1 className="csa-display res-hero__title">{article.title}</h1>
            {article.excerpt ? <p className="csa-lead res-hero__sub">{article.excerpt}</p> : null}
            <div className="res-hero__cta">
              <a className="btn btn--link" href="/resources/articles">
                <i data-lucide="arrow-left"></i> Back to Articles
              </a>
            </div>
          </div>
        </header>

        <div className="res-sec res-band-top">
          <div className="res-sec__inner res-article__body">
            {heroUrl ? (
              <img className="res-article__hero" src={heroUrl} alt={article.title} />
            ) : null}
            {article.body ? (
              <div className="res-article__prose">
                <RichText data={article.body} />
              </div>
            ) : null}
          </div>
        </div>
      </article>

      <section className="res-close" data-screen-label="Closing CTA">
        <div className="res-close__haze" aria-hidden="true"></div>
        <div className="res-close__inner">
          <span className="csa-eyebrow">Have a specific program?</span>
          <h2 className="csa-display res-close__title">Talk to a principal engineer.</h2>
          <p className="csa-lead res-close__sub">
            Our articles cover the patterns — your program is specific. Bring your compliance questions to a principal safety engineer.
          </p>
          <a className="btn btn--gold-pill btn--lg" href="#">Book a Consultation <i data-lucide="arrow-right"></i></a>
        </div>
      </section>
    </main>
  )
}
