import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findBySlug, findDocs } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'
import { mediaUrl } from '@/lib/media'
import { ArticleShare, ArticleToc, type TocSection } from './ArticleInteractive'

export const dynamic = 'force-dynamic'

/* ============================================================
   Article detail — pixel-faithful port of design-reference/project/
   Article.html + assets/article-detail.jsx. Reads one published row from
   the `articles` collection (src/collections/Articles.ts) and renders the
   long-form reading layout: header → body grid [TOC · article · share] →
   author bio → related → closing CTA. The interactive TOC scroll-spy and
   share rail are extracted to ./ArticleInteractive (client). The article
   body is server-rendered from the Lexical rich-text value, mapping node
   types onto the export's `ad-` markup.
   ============================================================ */

/* ---------- CMS shapes ---------- */
type Media = { url?: string; alt?: string }

type Credential = { icon?: string; title?: string; subtitle?: string }

type TeamMember = {
  name?: string
  slug?: string
  role?: string
  photo?: Media | string | null
  bio?: unknown
  credentials?: Credential[]
}

type RelatedArticle = {
  slug?: string
  title?: string
  category?: string
  date?: string
  heroImage?: { url?: string } | string | number | null
}

type Article = {
  title?: string
  slug?: string
  category?: string
  date?: string
  excerpt?: string
  heroImage?: Media | string | null
  heroCaption?: string
  body?: unknown
  authorMember?: TeamMember | string | null
  authorName?: string
  readingTime?: string
  topics?: { topic?: string }[]
  related?: (RelatedArticle | string)[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

/* Category select-value → human label (see Articles.ts options). */
const CATEGORY_LABELS: Record<string, string> = {
  robotics: 'Robotics',
  automotive: 'Automotive',
  rail: 'Rail',
  'off-road-agriculture': 'Off-Road & Agriculture',
  philosophy: 'Philosophy',
  standards: 'Standards',
  'field-notes': 'Field Notes',
  company: 'Company',
}
const categoryLabel = (value?: string): string =>
  (value && CATEGORY_LABELS[value]) || value || ''

/* Publication date → "June 18, 2026" (byline) / "Jun 2026" (related card). */
const fmtLong = (value?: string): string => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
const fmtShort = (value?: string): string => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

/* ---------- Lexical → editorial markup ---------- */
type LexNode = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  fields?: { url?: string }
  url?: string
  listType?: 'bullet' | 'number'
  children?: LexNode[]
}

const IS_BOLD = 1 // Lexical bold format bitmask

/** Map design-export link hrefs (.html) onto App Router routes. */
function mapHref(href?: string): string {
  if (!href) return '#'
  if (/^(https?:|mailto:|#)/.test(href)) return href
  const h = href.replace(/^\.?\//, '')
  const map: Record<string, string> = {
    'Home.html': '/',
    'Consulting/Overview.html': '/consulting',
    'Company/Overview.html': '/company',
    'Company/Services.html': '/company/services',
    'Company/Experience.html': '/company/experience',
    'Company/Careers.html': '/company/careers',
    'Resources/Overview.html': '/resources',
    'Resources/Articles.html': '/resources/articles',
    'Training - Templates/Purchase Templates.html': '/training/purchase-templates',
    'Book a Consultation.html': '/book-a-consultation',
  }
  if (map[h]) return map[h]
  return '/' + h.replace(/\.html$/, '')
}

/** Render inline children (text runs with bold + links). */
function renderInline(nodes: LexNode[] | undefined, keyBase: string): React.ReactNode[] {
  if (!nodes) return []
  return nodes.map((n, i) => {
    const key = keyBase + '-' + i
    if (n.type === 'link') {
      const url = mapHref(n.fields?.url ?? n.url)
      const inner = renderInline(n.children, key)
      if (/^\//.test(url)) {
        return (
          <Link key={key} href={url}>
            {inner}
          </Link>
        )
      }
      return (
        <a key={key} href={url}>
          {inner}
        </a>
      )
    }
    const t = n.text ?? ''
    if (typeof n.format === 'number' && (n.format & IS_BOLD) !== 0) {
      return <strong key={key}>{t}</strong>
    }
    return <span key={key}>{t}</span>
  })
}

type RenderedBody = { sections: TocSection[]; nodes: React.ReactNode[] }

/**
 * Walk the Lexical root and emit the export's `ad-` markup. Headings (h2)
 * carry a zero-padded index + an id and become TOC anchors; the first
 * paragraph gets the `ad-lead-p` drop-cap treatment.
 */
function renderBody(value: unknown): RenderedBody {
  const root = (value as { root?: LexNode } | null | undefined)?.root
  const sections: TocSection[] = []
  const nodes: React.ReactNode[] = []
  if (!root?.children) return { sections, nodes }

  let h2Count = 0
  let leadDone = false

  root.children.forEach((node, i) => {
    const key = 'b' + i
    switch (node.type) {
      case 'heading': {
        if (node.tag === 'h2') {
          h2Count += 1
          const id = 'sec-' + h2Count
          const heading = (node.text ?? '') || node.children?.map((c) => c.text ?? '').join('') || ''
          sections.push({ id, heading })
          nodes.push(
            <h2 id={id} key={key}>
              <span className="ad-h2-idx">{String(h2Count).padStart(2, '0')}</span>
              {renderInline(node.children, key)}
            </h2>,
          )
        } else {
          nodes.push(<h3 key={key}>{renderInline(node.children, key)}</h3>)
        }
        break
      }
      case 'quote': {
        nodes.push(
          <blockquote className="ad-quote" key={key}>
            <p>{renderInline(node.children, key)}</p>
          </blockquote>,
        )
        break
      }
      case 'list': {
        const num = node.listType === 'number'
        const items = (node.children ?? []).map((li, j) => (
          <li key={key + '-li' + j}>{renderInline(li.children, key + '-li' + j)}</li>
        ))
        nodes.push(
          num ? (
            <ol className="ad-list ad-list--num" key={key}>
              {items}
            </ol>
          ) : (
            <ul className="ad-list" key={key}>
              {items}
            </ul>
          ),
        )
        break
      }
      case 'paragraph': {
        const isLead = !leadDone
        leadDone = true
        nodes.push(
          <p className={isLead ? 'ad-lead-p' : undefined} key={key}>
            {renderInline(node.children, key)}
          </p>,
        )
        break
      }
      default:
        break
    }
  })

  return { sections, nodes }
}

/* ---------- author resolution ---------- */
function resolveAuthor(article: Article): {
  name: string
  role: string
  bioText: string
  photoUrl: string | undefined
} {
  const member = typeof article.authorMember === 'object' && article.authorMember ? article.authorMember : null
  const name = member?.name || article.authorName || ''
  const credentials = (member?.credentials ?? []).map((c) => c.title).filter(Boolean) as string[]
  const role = member?.role
    ? member.role + (credentials.length ? ' · ' + credentials.join(', ') : '')
    : credentials.join(', ')
  const bioText = lexicalToParagraphs(member?.bio).join(' ')
  const photoUrl = mediaUrl(member?.photo)
  return { name, role, bioText, photoUrl }
}

/* ---------- metadata + static params ---------- */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const docs = await findDocs<{ slug?: string }>('articles', { limit: 100 })
  return docs.filter((d): d is { slug: string } => typeof d.slug === 'string').map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await findBySlug<Article>('articles', slug, 2)
  if (!article) return { title: 'Article | CSA' }
  return {
    title: article.seo?.metaTitle ?? (article.title ? article.title + ' | CSA' : 'Article | CSA'),
    description: article.seo?.metaDescription ?? article.excerpt ?? undefined,
  }
}

/* ---------- page ---------- */
export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await findBySlug<Article>('articles', slug, 2)
  if (!article) notFound()

  const category = categoryLabel(article.category)
  const dateLong = fmtLong(article.date)
  const topics = (article.topics ?? []).map((t) => t.topic).filter(Boolean) as string[]
  const { name: authorName, role: authorRole, bioText, photoUrl: authorPhoto } = resolveAuthor(article)
  const heroUrl = mediaUrl(article.heroImage)
  const { sections, nodes } = renderBody(article.body)

  const related: RelatedArticle[] = (article.related ?? []).filter(
    (r): r is RelatedArticle => typeof r === 'object' && r !== null,
  )

  return (
    <main className="ad">
      {/* 1 · Header */}
      <header className="ad-head">
        <div className="ad-head__haze" aria-hidden="true"></div>
        <div className="ad-head__ghost" aria-hidden="true">
          {category}
        </div>
        <div className="ad-head__inner">
          <nav className="ad-breadcrumb" aria-label="Breadcrumb">
            <Link href="/resources">Resources</Link>
            <i data-lucide="chevron-right"></i>
            <Link href="/resources/articles">Articles</Link>
            <i data-lucide="chevron-right"></i>
            <span className="ad-breadcrumb__here">{category}</span>
          </nav>
          <div className="ad-head__tags">
            <span className="csa-tag csa-tag--gold">
              <span className="csa-tag__idx">#</span>
              {category}
            </span>
            {topics.map((t) => (
              <span className="csa-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="csa-display ad-head__title" data-reveal="up">
            {article.title}
          </h1>
          <p className="csa-lead ad-head__dek" data-reveal="up" data-reveal-delay="80">
            {article.excerpt}
          </p>
          <div className="ad-byline">
            <div className="ad-byline__author">
              <div className="ad-byline__avatar">
                {authorPhoto && <img src={authorPhoto} alt={authorName} />}
              </div>
              <div className="ad-byline__who">
                <div className="ad-byline__name">{authorName}</div>
                <div className="ad-byline__role">{authorRole}</div>
              </div>
            </div>
            <div className="ad-byline__meta">
              <span className="ad-mi">
                <i data-lucide="calendar"></i>
                {dateLong}
              </span>
              <span className="dot"></span>
              <span className="ad-mi">
                <i data-lucide="clock"></i>
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>
        <div className="ad-hero">
          <div className="ad-hero__frame">
            {heroUrl && <img src={heroUrl} alt={article.title ?? ''} />}
            <div className="ad-hero__scrim" aria-hidden="true"></div>
          </div>
          {article.heroCaption && (
            <p className="ad-hero__cap">
              <i data-lucide="image"></i>
              {article.heroCaption}
            </p>
          )}
        </div>
      </header>

      {/* 2 · Body grid */}
      <div className="ad-grid">
        <ArticleToc sections={sections} />
        <article className="ad-article">{nodes}</article>
        <ArticleShare title={article.title ?? ''} />
      </div>

      {/* 3 · Author bio */}
      {authorName && (
        <div className="ad-bio-wrap">
          <div className="ad-bio csa-glass">
            <div className="ad-bio__avatar">
              {authorPhoto && <img src={authorPhoto} alt={authorName} />}
            </div>
            <div className="ad-bio__body">
              <p className="ad-bio__kicker">Written by</p>
              <h3 className="ad-bio__name">{authorName}</h3>
              <p className="ad-bio__role">{authorRole}</p>
              {bioText && <p className="ad-bio__text">{bioText}</p>}
              <div className="ad-bio__links">
                <Link href="/company">
                  <i data-lucide="users"></i>Meet the team
                </Link>
                <Link href="/book-a-consultation">
                  <i data-lucide="calendar"></i>Book a call
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4 · Related articles */}
      {related.length > 0 && (
        <section className="ad-rel">
          <div className="ad-rel__haze" aria-hidden="true"></div>
          <div className="ad-rel__inner">
            <div className="ad-rel__head">
              <div>
                <p className="csa-eyebrow ad-rel__eyebrow" data-reveal="up" data-scramble>
                  More in {category}
                </p>
                <h2 className="csa-h2 ad-rel__title" data-reveal="up" data-reveal-delay="80">
                  Related articles.
                </h2>
              </div>
              <Link className="btn btn--link" href="/resources/articles">
                All articles <i data-lucide="arrow-right"></i>
              </Link>
            </div>
            <div className="ad-rel__grid">
              {related.map((a, i) => (
                <Link
                  className="ad-rcard"
                  href={a.slug ? '/resources/articles/' + a.slug : '#'}
                  key={a.slug ?? i}
                >
                  <div className="ad-rcard__cover">
                    {mediaUrl(a.heroImage) && <img src={mediaUrl(a.heroImage)} alt={a.title ?? ''} />}
                  </div>
                  <div className="ad-rcard__body">
                    <p className="ad-rcard__meta">
                      <span className="ad-rcard__cat">{categoryLabel(a.category)}</span>
                      <span className="ad-rcard__dot"></span>
                      <span className="ad-rcard__date">{fmtShort(a.date)}</span>
                    </p>
                    <h3 className="ad-rcard__title">{a.title}</h3>
                    <span className="ad-rcard__foot">
                      Read article <i data-lucide="arrow-right"></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5 · Closing CTA */}
      <section className="ad-close">
        <div className="ad-close__haze" aria-hidden="true"></div>
        <div className="ad-close__inner">
          <p className="csa-eyebrow ad-close__eyebrow" data-reveal="up" data-scramble>
            Sequence safety correctly
          </p>
          <h2 className="csa-display ad-close__title" data-reveal="up" data-reveal-delay="80">
            Build Safer. Scale Confidently.
          </h2>
          <p className="csa-lead ad-close__sub" data-reveal="up" data-reveal-delay="160">
            Integrate functional safety without slowing down development. Let&rsquo;s talk about your next
            safety-critical system.
          </p>
          <Link
            className="btn btn--gold-pill btn--lg"
            href="/book-a-consultation"
            data-metal="gold"
            data-reveal="up"
            data-reveal-delay="240"
          >
            Book a Consultation <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </section>
    </main>
  )
}
