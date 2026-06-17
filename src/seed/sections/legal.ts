/**
 * Seeds the three legal pages (Terms, Privacy, Refund Policy) that the footer
 * links to. The design export ships these as "in build" stubs (crumb + title
 * only), so the body copy below is standard, page-appropriate legal
 * boilerplate written for CSA — preserving the headings/titles the design
 * shows and giving the client editable, real-shaped content to refine.
 *
 * Slugs MUST stay exactly `terms`, `privacy`, `refund-policy` — the footer
 * links (/legal/terms, /legal/privacy, /legal/refund-policy) depend on them.
 */
import type { Payload } from 'payload'

// ---- Lexical rich-text helpers (paragraph + heading) ------------------------
type Run = { text: string; bold?: boolean }

const textNode = (r: Run) => ({
  type: 'text',
  text: r.text,
  format: r.bold ? 1 : 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  children: [textNode({ text })],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  textFormat: 0,
})

const heading = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  tag,
  children: [textNode({ text, bold: true })],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

type Block = { heading: string; body: string[] }

const richText = (intro: string, blocks: Block[]): unknown => ({
  root: {
    type: 'root',
    children: [
      paragraph(intro),
      ...blocks.flatMap((b) => [heading(b.heading), ...b.body.map(paragraph)]),
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

// ---- Page copy --------------------------------------------------------------
const LAST_UPDATED = '2026-06-01'

const pages = [
  {
    slug: 'terms',
    title: 'Terms of Service',
    intro:
      'These Terms of Service ("Terms") govern your access to and use of the website, services, training, templates, and other materials provided by Critical Systems Analysis ("CSA", "we", "us"). By accessing our site or engaging our services, you agree to be bound by these Terms.',
    blocks: [
      {
        heading: 'Acceptance of Terms',
        body: [
          'By accessing or using any part of the CSA website or services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use the site or services.',
        ],
      },
      {
        heading: 'Use of Services',
        body: [
          'CSA provides functional safety engineering consulting, auditing, training, and related digital materials. You agree to use these services only for lawful purposes and in accordance with these Terms and any engagement-specific agreements executed between you and CSA.',
          'You are responsible for ensuring that any information you provide to us is accurate, current, and complete, and for maintaining the confidentiality of any account credentials issued to you.',
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'All content on this site — including text, graphics, logos, templates, methodologies, and software — is the property of CSA or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent, except as expressly permitted by a purchased license or engagement agreement.',
        ],
      },
      {
        heading: 'Professional Disclaimer',
        body: [
          'Information and materials provided through the site are for general informational purposes and do not constitute a substitute for engagement-specific safety engineering, certification, or legal advice. Functional safety outcomes depend on the specific system, context, and applicable standards. CSA makes no warranty that any material will achieve a particular compliance or certification result.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        body: [
          'To the fullest extent permitted by law, CSA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the site or services. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim.',
        ],
      },
      {
        heading: 'Governing Law',
        body: [
          'These Terms are governed by the laws of the State of Florida, United States, without regard to its conflict-of-laws principles. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Florida.',
        ],
      },
      {
        heading: 'Changes to These Terms',
        body: [
          'We may update these Terms from time to time. Material changes will be posted on this page with an updated effective date. Your continued use of the site after changes take effect constitutes acceptance of the revised Terms.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Questions about these Terms can be directed to CSA at hello@criticalsystemsanalysis.com.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro:
      'This Privacy Policy explains how Critical Systems Analysis ("CSA", "we", "us") collects, uses, and protects the personal information you provide when you visit our website or engage our services. We are committed to handling your information responsibly and transparently.',
    blocks: [
      {
        heading: 'Information We Collect',
        body: [
          'We collect information you provide directly — such as your name, email address, company, and message — when you contact us, book a consultation, register for training, or purchase templates. We also collect limited technical information automatically, including IP address, browser type, and pages visited, through cookies and similar technologies.',
        ],
      },
      {
        heading: 'How We Use Your Information',
        body: [
          'We use your information to respond to inquiries, deliver and improve our services, process purchases and registrations, send relevant updates you have requested, and comply with legal obligations. We do not sell your personal information.',
        ],
      },
      {
        heading: 'Cookies and Analytics',
        body: [
          'Our site uses cookies and analytics tools to understand how visitors use the site and to improve performance. You can control or disable cookies through your browser settings, though some features of the site may not function as intended without them.',
        ],
      },
      {
        heading: 'Data Sharing',
        body: [
          'We may share information with trusted service providers who support our operations (for example, hosting, payment processing, and email delivery), under agreements that require them to protect your data. We may also disclose information where required by law or to protect our legal rights.',
        ],
      },
      {
        heading: 'Data Security',
        body: [
          'We implement reasonable technical and organizational measures to protect personal information against unauthorized access, loss, or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: 'Your Rights',
        body: [
          'Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the processing of your personal information, and to object to certain uses. To exercise these rights, contact us using the details below.',
        ],
      },
      {
        heading: 'Data Retention',
        body: [
          'We retain personal information only for as long as necessary to fulfill the purposes described in this policy, to satisfy legal and contractual obligations, and to resolve disputes.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'For privacy questions or to exercise your data rights, contact CSA at privacy@criticalsystemsanalysis.com.',
        ],
      },
    ],
  },
  {
    slug: 'refund-policy',
    title: 'Digital Refund Policy',
    intro:
      'This Digital Refund Policy applies to digital products and services purchased from Critical Systems Analysis ("CSA"), including downloadable templates, online courses, and other digital materials. Please review this policy carefully before completing a purchase.',
    blocks: [
      {
        heading: 'Digital Products',
        body: [
          'Because digital templates, documents, and downloadable resources are delivered electronically and can be accessed or copied immediately upon purchase, all sales of digital products are final and non-refundable once the download has been initiated or access has been granted.',
        ],
      },
      {
        heading: 'Online Courses and Training',
        body: [
          'For self-paced online courses, you may request a refund within fourteen (14) days of purchase provided you have completed no more than twenty percent (20%) of the course content. Once that threshold is exceeded, the purchase is non-refundable.',
          'For scheduled or live training, cancellations made at least ten (10) business days before the session date are eligible for a full refund or transfer. Cancellations within ten business days are non-refundable but may be transferred to a future session at CSA’s discretion.',
        ],
      },
      {
        heading: 'Defective or Incorrect Items',
        body: [
          'If a digital product is defective, corrupted, or materially different from its description, contact us within fourteen (14) days of purchase. We will work to correct the issue, provide a replacement, or, where appropriate, issue a refund.',
        ],
      },
      {
        heading: 'How to Request a Refund',
        body: [
          'To request a refund, email us at hello@criticalsystemsanalysis.com with your order details and the reason for the request. Approved refunds are issued to the original payment method within ten (10) business days.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        body: [
          'We may update this Digital Refund Policy from time to time. The policy in effect at the time of your purchase governs that transaction.',
        ],
      },
    ],
  },
]

export async function seedLegal(payload: Payload): Promise<void> {
  // Clear + reseed for idempotency.
  await payload.delete({ collection: 'legalPages', where: { id: { exists: true } } })

  for (const page of pages) {
    await payload.create({
      collection: 'legalPages',
      data: {
        title: page.title,
        slug: page.slug,
        lastUpdated: LAST_UPDATED,
        body: richText(page.intro, page.blocks) as never,
      },
    })
  }

  payload.logger.info(`Seeded ${pages.length} legal pages (terms, privacy, refund-policy)`)
}
