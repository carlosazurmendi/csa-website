import type { Payload } from 'payload'

/**
 * Seeds the `consultingOverview` global with the real copy from the design
 * export (Consulting/Overview.html). Idempotent — upserts the global.
 *
 * Industries and Services are seeded elsewhere (src/seed/index.ts); this only
 * populates the overview global, so the page's hero, lifecycle HUD, quick
 * facts, about, engagement options, contract-engineering capabilities, FAQ,
 * and closing CTA are CMS-driven.
 */
export async function seedConsulting(payload: Payload): Promise<void> {
  // ---- Lexical rich-text helpers (mirrors src/seed/index.ts) ----------------
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
  const paragraph = (runs: Run[]) => ({
    type: 'paragraph',
    children: runs.map(textNode),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
  })
  const richText = (paras: Run[][]): any => ({
    root: {
      type: 'root',
      children: paras.map(paragraph),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  })

  // `consultingOverview` is registered in payload.config.ts; cast the client so
  // this compiles before `payload generate:types` is re-run.
  await (payload as any).updateGlobal({
    slug: 'consultingOverview',
    data: {
      hero: {
        eyebrow: 'Functional Safety Consulting',
        ghost: 'Consulting',
        title: 'Safety-Critical Systems\nEngineering & Consulting.',
        sub: 'Move your advanced autonomous systems from concept to global market certification — with absolute confidence.',
        primaryCtaLabel: 'Book a Consultation',
        primaryCtaHref: '#',
        secondaryCtaLabel: 'See How We Work',
        secondaryCtaHref: '#how-we-work',
        standards: [
          { label: 'ISO 13849' },
          { label: 'IEC 61508' },
          { label: 'ISO 26262' },
          { label: 'IEC 62061' },
        ],
        hud: {
          tag: 'Concept → Certification',
          badge: 'Independent',
          foot: 'Principal-led · Decades of combined experience',
          steps: [
            {
              title: 'Concept & item definition',
              description: 'Performance and operational boundaries, scoped early.',
            },
            {
              title: 'Hazard analysis',
              description: 'HARA, FMEA, and fault tree analysis to size the risk.',
            },
            {
              title: 'Verification & validation',
              description: 'V-model traceability across the engineering process.',
            },
            {
              title: 'Global market certification',
              description: 'Evidence and interfaces ready for third-party assessors.',
            },
          ],
        },
      },
      facts: {
        eyebrow: 'Technical Authority',
        title: 'Quick facts.',
        lead: 'The credentials and posture behind every CSA engagement.',
        items: [
          {
            icon: 'flag',
            kicker: 'Established 2023',
            title: 'Built to democratize safety.',
            description:
              'Founded to make functional safety accessible across advanced automation — a strategic advantage, not a regulatory burden.',
          },
          {
            icon: 'scale',
            kicker: '100% Independent',
            title: 'A non-developmental challenger.',
            description:
              'We operate strictly as expert safety challengers. Because we never build the product we assess, our validation stays unbiased.',
          },
          {
            icon: 'search-check',
            kicker: 'Third-Party Auditing',
            title: 'Hardware-level validation.',
            description:
              'Specialists in hardware, interfaces, and physical system safety validation — the independent review certifiers expect.',
          },
        ],
      },
      about: {
        eyebrow: 'About CSA',
        title: 'An independent functional safety firm.',
        prose: richText([
          [
            {
              text: 'Critical Systems Analysis is an independent functional safety consulting firm. Led by principal safety engineers with ',
            },
            { text: 'TÜV certification', bold: true },
            {
              text: ' and decades of combined experience, we act as an unbiased technical challenger for teams building autonomous and safety-critical systems across rail, robotics, machinery, automotive, defense, and process industries.',
            },
          ],
        ]),
        quote:
          'Because we never build the product we assess, our validation carries the independence that certifiers and regulators expect.',
        credsLabel: 'Why our validation holds',
        creds: [
          {
            icon: 'badge-check',
            title: 'TÜV-certified principals',
            description: 'FS Engineer and IFSP credentials behind every engagement.',
          },
          {
            icon: 'scale',
            title: 'Strictly non-developmental',
            description: 'We assess and validate — we don’t build what we review.',
          },
          {
            icon: 'layers',
            title: 'Six industries served',
            description: 'Rail, robotics, machinery, automotive, defense, and process.',
          },
        ],
      },
      options: {
        eyebrow: 'How We Provide Consulting',
        title: 'Three ways to work with us.',
        lead: 'We offer flexible consulting frameworks and expert contract engineering models, tailored to your team’s exact resource needs.',
        items: [
          {
            number: 'Option 01',
            icon: 'calendar-clock',
            title: 'Regular Advisory Meetings',
            description:
              'Weekly or bi-weekly sessions where your team brings active functional safety questions and our principal engineers provide immediate technical answers.',
            bestFor: 'Teams that want expert backup on demand.',
          },
          {
            number: 'Option 02',
            icon: 'users-round',
            title: 'Embedded Engineering Support',
            description:
              'CSA acts directly as your internal engineering support — executing hands-on safety analysis, authoring required deliverables, and managing technical interfaces with third-party assessment bodies.',
            bestFor: 'Teams without safety engineers, or those short on bandwidth.',
          },
          {
            number: 'Option 03',
            icon: 'clipboard-check',
            title: 'Process & Design Gap Auditing',
            description:
              'A rigorous independent audit of your existing safety processes, hardware designs, and documentation artifacts, followed by a clear roadmap to close technical gaps and achieve certification.',
            bestFor: 'Teams with some artifacts that need a path to certification.',
          },
        ],
      },
      capabilities: {
        eyebrow: 'Contract Engineering',
        title: 'Expert contract engineering capabilities.',
        lead: 'When you face critical resource gaps or severe schedule pressure, access principal-led safety engineering on a contract basis for high-stakes analytical tasks.',
        items: [
          {
            icon: 'crosshair',
            code: 'HARA',
            title: 'Hazard Analysis & Risk Assessments',
            description:
              'Structured identification of hazards and operational risk to set defensible safety targets.',
          },
          {
            icon: 'list-checks',
            code: 'FMEA',
            title: 'Failure Mode & Effects Analysis Workshops',
            description:
              'Bottom-up decomposition to isolate failure modes and evaluate diagnostic coverage.',
          },
          {
            icon: 'git-fork',
            code: 'FTA',
            title: 'Top-Down Fault Tree Analysis',
            description:
              'Deductive evaluation that traces system-level hazards back to root causes.',
          },
          {
            icon: 'waypoints',
            code: 'V-MODEL',
            title: 'Requirements Traceability',
            description:
              'Complete V-model traceability across the full engineering process, concept to validation.',
          },
        ],
      },
      industriesSection: {
        eyebrow: 'Industries We Serve',
        title: 'Tailored to your sector.',
        lead: 'Functional safety consulting tailored to each sector’s standards and hazards.',
      },
      faq: {
        eyebrow: 'Common Questions',
        title: 'What teams ask first.',
        items: [
          {
            question: 'How much does it cost to get certified?',
            answer:
              'Compliance costs scale with system complexity — but identifying design flaws early in the V-model architectural phase avoids the substantial penalties of late-stage redesign. Integrating safety from a project’s inception drastically reduces long-term compliance costs and total cost of ownership.',
          },
          {
            question: 'Do I need third-party certification?',
            answer:
              'If you’re developing advanced autonomous machinery, collaborative robots, or complex programmable electronic systems, global safety lifecycles require independent technical validation. Robust evidence from independent safety audits is a strategic imperative — it clears strict external compliance hurdles and protects your brand reputation.',
          },
        ],
      },
      closing: {
        eyebrow: 'Concept to certification',
        title: 'Validate with confidence.',
        sub: 'Bring us your toughest safety-critical program. We’ll map the path from where you are to certified.',
        ctaLabel: 'Book a Consultation',
        ctaHref: '#',
      },
    },
  })

  payload.logger.info('Seeded consultingOverview global')
}
