/**
 * Seed — Legal Pages content collection.
 *
 * The Legal & Trust documents rendered at /legal/[slug]: Terms of Service,
 * Privacy Policy, and the Digital Refund Policy. Structure (titles, ordering,
 * anchors, dates, version) lifted verbatim from the design export:
 *   design-reference/project/assets/legal-data.js
 *   (CSA_LEGAL_DOCS — TERMS, PRIVACY, REFUND).
 *
 * IMPORTANT: the body copy in the export is DELIBERATE PLACEHOLDER LOREM. The
 * export's own header comment states "Final legal text is authored and managed
 * in Payload CMS — this file defines the section scaffold the template renders."
 * We faithfully reproduce that scaffold: each section becomes an <h2> heading
 * (which the template turns into the on-page table of contents) followed by the
 * export's neutral lorem blocks (paragraphs / bullet lists). Replace the body
 * copy with real, lawyer-reviewed language before publishing.
 *
 * Body richText uses the default Lexical editor state shape. Helpers below build
 * heading, paragraph, and unordered-list nodes; `para()` / `paraList()` mirror
 * the export's two body builders.
 */

/* ---- Lexical node builders ---- */

const textNode = (text: string) => ({
  type: 'text',
  version: 1,
  text,
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
})

const heading = (text: string) => ({
  type: 'heading',
  tag: 'h2' as const,
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [textNode(text)],
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [textNode(text)],
})

const listItem = (text: string, value: number) => ({
  type: 'listitem',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  value,
  children: [textNode(text)],
})

const bulletList = (items: string[]) => ({
  type: 'list',
  listType: 'bullet' as const,
  tag: 'ul' as const,
  start: 1,
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: items.map((t, i) => listItem(t, i + 1)),
})

/* ---- Placeholder copy, lifted from legal-data.js (const L) ---- */

const L = {
  p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Final clause language for this section is authored and maintained in Payload CMS; the layout below is representative of how that copy will render at length.',
  p2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  p3: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  li: [
    'Placeholder clause item — final text supplied via the CMS.',
    'Placeholder clause item describing scope, obligations, or rights.',
    'Placeholder clause item; bullet lists render as shown here.',
    'Placeholder clause item covering exceptions and edge cases.',
  ],
}

/** Mirrors legal-data.js `para()` — two paragraphs. */
const para = (title: string) => [heading(title), paragraph(L.p1), paragraph(L.p2)]

/** Mirrors legal-data.js `paraList()` — paragraph, bullet list, paragraph. */
const paraList = (title: string) => [
  heading(title),
  paragraph(L.p1),
  bulletList(L.li),
  paragraph(L.p3),
]

/** Build a full Lexical editor state from a flat list of section block arrays. */
const body = (...sections: Array<Array<Record<string, unknown>>>) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: sections.flat(),
  },
})

export const seed = {
  collection: 'legal-pages',
  docs: [
    /* ============================================================
       Terms of Service
       ============================================================ */
    {
      title: 'Terms of Service',
      slug: 'terms-of-service',
      subtitle:
        'The agreement governing your use of the CSA website, digital products, training courses, and consulting services.',
      lastUpdated: '2026-06-23T00:00:00.000Z',
      effectiveDate: '2026-06-23T00:00:00.000Z',
      version: 'v1.0',
      body: body(
        para('Acceptance of Terms'),
        paraList('Definitions'),
        para('Use of Our Services'),
        paraList('Accounts & Registration'),
        para('Digital Products & Licensing'),
        paraList('Purchases & Payment'),
        para('Intellectual Property'),
        paraList('Acceptable Use'),
        para('Disclaimers'),
        para('Limitation of Liability'),
        para('Indemnification'),
        para('Termination'),
        para('Governing Law & Disputes'),
        para('Changes to These Terms'),
      ),
      seo: {
        metaTitle: 'Terms of Service | CSA',
        metaDescription:
          'The agreement governing your use of the CSA website, digital products, training courses, and consulting services.',
      },
    },

    /* ============================================================
       Privacy Policy
       ============================================================ */
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      subtitle:
        'How Critical Systems Analysis collects, uses, shares, and protects your information across our website and services.',
      lastUpdated: '2026-06-23T00:00:00.000Z',
      effectiveDate: '2026-06-23T00:00:00.000Z',
      version: 'v1.0',
      body: body(
        para('Overview'),
        paraList('Information We Collect'),
        paraList('How We Use Your Information'),
        para('Cookies & Tracking Technologies'),
        paraList('How We Share Information'),
        para('Data Retention'),
        para('Data Security'),
        paraList('Your Rights & Choices'),
        para('International Data Transfers'),
        para("Children's Privacy"),
        para('Third-Party Links & Services'),
        para('Changes to This Policy'),
      ),
      seo: {
        metaTitle: 'Privacy Policy | CSA',
        metaDescription:
          'How Critical Systems Analysis collects, uses, shares, and protects your information across our website and services.',
      },
    },

    /* ============================================================
       Digital Refund Policy
       ============================================================ */
    {
      title: 'Digital Refund Policy',
      slug: 'digital-refund-policy',
      subtitle:
        'Our refund terms for digital templates, downloadable resources, and online training courses purchased through CSA.',
      lastUpdated: '2026-06-23T00:00:00.000Z',
      effectiveDate: '2026-06-23T00:00:00.000Z',
      version: 'v1.0',
      body: body(
        para('Overview'),
        paraList('Scope — Digital Products & Courses'),
        paraList('Eligibility for Refunds'),
        paraList('Non-Refundable Items'),
        para('How to Request a Refund'),
        para('Processing & Timing'),
        para('Training & Course Cancellations'),
        para('Template & Bundle Purchases'),
        para('Chargebacks & Disputes'),
        para('Changes to This Policy'),
      ),
      seo: {
        metaTitle: 'Digital Refund Policy | CSA',
        metaDescription:
          'Our refund terms for digital templates, downloadable resources, and online training courses purchased through CSA.',
      },
    },
  ],
}
