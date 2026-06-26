import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findBySlug, findDocs } from '@/lib/cms'
import { LegalToc, type LegalSection } from './LegalToc'

export const dynamic = 'force-dynamic'

/* ============================================================
   Legal & Trust document — pixel-faithful port of design-reference/project/
   Legal/*.html + assets/legal.jsx + assets/legal.css (structure reference:
   assets/legal-data.js). One template renders every legal document at
   /legal/[slug] (terms-of-service, privacy-policy, digital-refund-policy)
   from the `legal-pages` collection (src/collections/LegalPages.ts).

   The document body is a Lexical rich-text value whose `h2` headings delimit
   the numbered sections; this server page walks that value into the export's
   `.lg-sec` markup and derives the section list for the on-page table of
   contents. The TOC scroll-spy is the only stateful piece — extracted to the
   co-located client component ./LegalToc.
   ============================================================ */

/* ---------- CMS shape ---------- */
type LegalDoc = {
  title?: string
  slug?: string
  subtitle?: string
  lastUpdated?: string
  effectiveDate?: string
  version?: string
  body?: unknown
  seo?: { metaTitle?: string; metaDescription?: string }
}

/* The three Legal & Trust documents — fixed design constant (CSA_LEGAL in
   assets/routes.js), used for the sibling cross-link grid. Order preserved. */
const LEGAL_SIBLINGS: { slug: string; label: string }[] = [
  { slug: 'terms-of-service', label: 'Terms of Service' },
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'digital-refund-policy', label: 'Digital Refund Policy' },
]

/* eyebrow is the same for every document in the export (legal-data.js). */
const EYEBROW = 'Legal & Trust'

/* Last-updated / effective dates → "June 23, 2026". */
const fmtDate = (value?: string): string => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/* ---------- Lexical → section markup ---------- */
type LexNode = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  listType?: 'bullet' | 'number'
  children?: LexNode[]
}

const IS_BOLD = 1 // Lexical bold format bitmask

const nodeText = (node: LexNode): string =>
  (node.text ?? '') + (node.children ?? []).map(nodeText).join('')

/** Slugify a heading into a stable anchor id (matches the export's anchors). */
const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Render inline runs (plain text + bold). */
function renderInline(nodes: LexNode[] | undefined, keyBase: string): React.ReactNode[] {
  if (!nodes) return []
  return nodes.map((n, i) => {
    const key = keyBase + '-' + i
    const t = n.text ?? ''
    if (typeof n.format === 'number' && (n.format & IS_BOLD) !== 0) {
      return <strong key={key}>{t}</strong>
    }
    return <span key={key}>{t}</span>
  })
}

/** One prose block inside a section — paragraph, sub-heading, or bullet list. */
function ProseBlock({ node, keyBase }: { node: LexNode; keyBase: string }): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return <p key={keyBase}>{renderInline(node.children, keyBase)}</p>
    case 'heading':
      // h2 starts a section; anything else (h3…) renders as a sub-heading.
      return <h3 key={keyBase}>{renderInline(node.children, keyBase)}</h3>
    case 'list': {
      const items = (node.children ?? []).map((li, j) => (
        <li key={keyBase + '-li' + j}>{renderInline(li.children, keyBase + '-li' + j)}</li>
      ))
      return <ul key={keyBase}>{items}</ul>
    }
    default:
      return null
  }
}

type Section = LegalSection & { blocks: LexNode[] }

/** Group the Lexical root into sections delimited by `h2` headings. */
function buildSections(value: unknown): Section[] {
  const root = (value as { root?: LexNode } | null | undefined)?.root
  if (!root?.children) return []
  const sections: Section[] = []
  let current: Section | null = null
  const used = new Set<string>()

  for (const node of root.children) {
    if (node.type === 'heading' && node.tag === 'h2') {
      const title = nodeText(node).trim()
      let id = slugify(title) || 'section-' + (sections.length + 1)
      // de-dupe anchors (e.g. two "Changes to This Policy")
      let n = 2
      const base = id
      while (used.has(id)) id = base + '-' + n++
      used.add(id)
      current = { id, title, blocks: [] }
      sections.push(current)
    } else if (current) {
      current.blocks.push(node)
    }
  }
  return sections
}

/* ---------- metadata + static params ---------- */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const docs = await findDocs<{ slug?: string }>('legal-pages', { limit: 100 })
  return docs
    .filter((d): d is { slug: string } => typeof d.slug === 'string')
    .map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = await findBySlug<LegalDoc>('legal-pages', slug, 1)
  if (!doc) return { title: 'Legal & Trust | CSA' }
  return {
    title: doc.seo?.metaTitle ?? (doc.title ? doc.title + ' | CSA' : 'Legal & Trust | CSA'),
    description: doc.seo?.metaDescription ?? doc.subtitle ?? undefined,
  }
}

/* ---------- page ---------- */
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await findBySlug<LegalDoc>('legal-pages', slug, 1)
  if (!doc) notFound()

  const sections = buildSections(doc.body)
  const tocSections: LegalSection[] = sections.map((s) => ({ id: s.id, title: s.title }))
  const updated = fmtDate(doc.lastUpdated)
  const effective = fmtDate(doc.effectiveDate)
  const title = doc.title ?? ''
  const contactWord = title.toLowerCase().includes('policy') ? 'policy' : 'agreement'

  return (
    <main className="lg">
      <div className="lg__haze"></div>

      {/* Header */}
      <header className="lg-head">
        <p className="lg-head__crumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <span className="here">Legal &amp; Trust</span>
        </p>
        <p className="csa-eyebrow lg-head__eyebrow" data-reveal="up">
          {EYEBROW}
        </p>
        <h1 className="csa-display lg-head__title" data-reveal="up" data-reveal-delay="60">
          {title}
        </h1>
        <p className="lg-head__sub" data-reveal="up" data-reveal-delay="120">
          {doc.subtitle}
        </p>
        <div className="lg-head__meta" data-reveal="up" data-reveal-delay="180">
          {updated && (
            <span className="lg-chip">
              <i data-lucide="calendar-clock"></i>Last updated <b>{updated}</b>
            </span>
          )}
          {effective && (
            <span className="lg-chip">
              <i data-lucide="circle-check"></i>Effective <b>{effective}</b>
            </span>
          )}
          {doc.version && (
            <span className="lg-chip">
              <i data-lucide="git-commit-horizontal"></i>Version <b>{doc.version}</b>
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="lg-body">
        <LegalToc sections={tocSections} />

        <article className="lg-doc">
          {sections.map((s, i) => (
            <section className="lg-sec" id={s.id} key={s.id}>
              <div className="lg-sec__head">
                <span className="lg-sec__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="lg-sec__title">{s.title}</h2>
              </div>
              <p className="lg-ph">
                <span className="d"></span>Placeholder — final copy in Payload CMS
              </p>
              <div className="lg-prose">
                {s.blocks.map((b, j) => (
                  <ProseBlock node={b} keyBase={s.id + '-b' + j} key={s.id + '-b' + j} />
                ))}
              </div>
            </section>
          ))}

          {/* Contact */}
          <div className="lg-contact">
            <p className="lg-contact__label">Questions?</p>
            <h3>Contact us about this {contactWord}</h3>
            <p>Reach the CSA team with any questions about this document, your data, or a specific clause.</p>
            <div className="lg-contact__rows">
              <span className="lg-contact__row">
                <i data-lucide="mail"></i>
                <a href="mailto:legal@criticalsystemsanalysis.com">legal@criticalsystemsanalysis.com</a>
              </span>
              <span className="lg-contact__row">
                <i data-lucide="message-square"></i>
                <Link href="/book-a-consultation">Book a consultation</Link>
              </span>
            </div>
          </div>
        </article>
      </div>

      {/* Sibling docs */}
      <section className="lg-siblings">
        <p className="lg-siblings__label">Legal &amp; Trust</p>
        <div className="lg-siblings__grid">
          {LEGAL_SIBLINGS.map((l, i) => {
            const isCurrent = l.slug === slug
            return (
              <Link
                key={l.slug}
                className="lg-sib"
                href={'/legal/' + l.slug}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className="lg-sib__k">Document {String(i + 1).padStart(2, '0')}</span>
                <span className="lg-sib__t">
                  {l.label} <i data-lucide="arrow-up-right"></i>
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
