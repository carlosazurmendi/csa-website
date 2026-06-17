import type { Payload } from 'payload'

/**
 * Seed for the Resources section:
 *  - upserts the 3 page globals (Resources Overview, Standards Identifier,
 *    Safety Chat) with the real copy from the design export, and
 *  - clears + seeds the `resources`, `events`, and `freeTrainings` collections
 *    with the sample entries shown on the listing pages.
 *
 * Articles are NOT seeded here — they're owned by the main seed (src/seed/
 * index.ts). Items with no real downloadable file / media asset leave
 * `file` / `media` unset.
 *
 * Idempotent: globals are upserted; the three collections are cleared and
 * recreated on each run.
 */
export async function seedResources(payload: Payload): Promise<void> {
  payload.logger.info('— Seeding Resources section —')

  // -------------------------------------------------------------- COLLECTIONS
  // Clear + reseed the three Resources-owned collections (articles excluded).
  for (const collection of ['resources', 'events', 'freeTrainings'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }

  // ---- Downloadable resources (4) ----
  const resources = [
    {
      title: 'Physical System & Hardware Safety Validation Checklist',
      category: 'checklist' as const,
      description:
        'A step-by-step validation checklist covering hardware fault tolerance, diagnostic coverage, and the evidence you need to close out a physical safety case.',
    },
    {
      title: 'V-Model Adherence Roadmap for Autonomous Vehicle Development',
      category: 'guidebook' as const,
      description:
        'A development roadmap mapping each V-model phase to its safety deliverables — so verification and validation stay aligned from concept to deployment.',
    },
    {
      title: 'Interface Safety Case & COTS Integration Tracking Framework',
      category: 'free-template' as const,
      description:
        'A working template for tracking interface safety requirements and COTS component integration across a multi-supplier system architecture.',
    },
    {
      title: 'IEC 61508 & ISO 13849 Standards Cross-Reference Guide',
      category: 'standards-guide' as const,
      description:
        'A side-by-side reference mapping SIL and Performance Level concepts across IEC 61508 and ISO 13849 to help you orient between the two frameworks.',
    },
  ]
  for (let i = 0; i < resources.length; i++) {
    const r = resources[i]
    await payload.create({
      collection: 'resources',
      data: { title: r.title, category: r.category, order: i, description: r.description },
    })
  }

  // ---- Events & webinars (5) ----
  const events = [
    {
      title: 'Robotics Summit & Expo — CSA Booth & Sessions',
      type: 'upcoming' as const,
      date: null,
      description:
        'Catch our engineering leaders presenting and at the booth. Session details and registration go live as each date is confirmed.',
      link: null,
    },
    {
      title: 'International Robot Safety Conference — Keynote',
      type: 'upcoming' as const,
      date: null,
      description:
        'A principal-led keynote on certifying safe autonomy for collaborative and mobile robotics. Registration opens closer to the date.',
      link: null,
    },
    {
      title: 'On-Demand Technical Webinar: Probabilistic Safety Fundamentals',
      type: 'webinar' as const,
      date: '2026-03-12',
      description:
        'A deep, practitioner-level session on functional safety practice — recorded and available to watch on your schedule.',
      link: null,
    },
    {
      title: 'Webinar: Drawing the Architectural Safety Boundary',
      type: 'webinar' as const,
      date: '2026-01-22',
      description:
        'Why hardware isolation and independent safety auditing matter, and how to scope the boundary of your safety case.',
      link: null,
    },
    {
      title: 'Past Keynote: Safe Autonomy on the Factory Floor',
      type: 'past-keynote' as const,
      date: '2025-10-08',
      description:
        'Highlights and the full recording from our recent conference keynote on safety-critical systems and certification.',
      link: null,
    },
  ]
  for (const e of events) {
    await payload.create({
      collection: 'events',
      data: { title: e.title, type: e.type, date: e.date, description: e.description, link: e.link },
    })
  }

  // ---- Free trainings (5) ----
  const freeTrainings = [
    {
      title:
        'Introduction to Probabilistic Safety: Calculating Average Probability of Failure on Demand (PFD)',
      category: 'video-overview' as const,
      description:
        'A plain-English video walkthrough of probabilistic safety and how Average Probability of Failure on Demand is calculated and applied.',
    },
    {
      title: 'Understanding Safety Integrity Levels (SIL) in 10 Minutes',
      category: 'video-overview' as const,
      description:
        'A short video overview of what a SIL is, where it comes from, and how it drives the rigor of your safety lifecycle.',
    },
    {
      title:
        'Defining the Architectural Boundary: Hardware Isolation & Independent Safety Auditing Explained',
      category: 'core-intro' as const,
      description:
        'An introductory presentation on drawing the architectural boundary — why hardware isolation and independent safety auditing matter.',
    },
    {
      title: 'The Safety Lifecycle: A Core Introduction',
      category: 'core-intro' as const,
      description:
        'A high-level introduction to the functional safety lifecycle — the phases, work products, and where independent review fits.',
    },
    {
      title: 'Technical Whitepaper Series: Safety-Lifecycle Fundamentals',
      category: 'whitepaper' as const,
      description:
        'In-depth written briefings on safety-lifecycle fundamentals, published alongside the video overviews as the series grows.',
    },
  ]
  for (let i = 0; i < freeTrainings.length; i++) {
    const t = freeTrainings[i]
    await payload.create({
      collection: 'freeTrainings',
      data: { title: t.title, category: t.category, order: i, description: t.description },
    })
  }

  // ------------------------------------------------------------------- GLOBALS
  // ---- Resources Overview hub ----
  await payload.updateGlobal({
    slug: 'resourcesOverview',
    data: {
      hero: {
        eyebrow: 'Functional Safety Resources',
        eyebrowIcon: 'library-big',
        ghost: 'Resources',
        title: 'Tools and knowledge for the safety lifecycle.',
        sub:
          'Practical, engineer-reviewed tools and knowledge to help you navigate the safety lifecycle faster — from an AI standards identifier to checklists, articles, and on-demand training.',
        jump: [
          { icon: 'sparkles', label: 'AI Tools', href: '#tools' },
          { icon: 'folder-open', label: 'Knowledge Library', href: '#library' },
          { icon: 'calendar-check', label: 'Talk to an Engineer', href: '#' },
        ],
      },
      tools: {
        eyebrow: 'AI-Augmented Tools',
        title: 'Start with a tool.',
        lead:
          'Two embedded assistants built to clear the early, time-consuming questions — so you reach your real engineering work faster.',
        items: [
          {
            icon: 'scan-search',
            tag: 'AI Tool',
            title: 'Standards Identifier',
            description:
              'Map your industry, mobility configuration, and operational environment to your exact compliance targets — instantly.',
            href: '/resources/standards-identifier',
          },
          {
            icon: 'message-square-text',
            tag: 'AI Tool',
            title: 'Safety Chat',
            description:
              'Immediate, high-level engineering insight on a specific SIL or a requirement buried in a complex standard.',
            href: '/resources/safety-chat',
          },
        ],
      },
      library: {
        eyebrow: 'Knowledge Library',
        title: 'Go deeper.',
        lead:
          'Engineer-reviewed references, articles, and training to support every phase of the safety lifecycle.',
        items: [
          {
            icon: 'file-check',
            title: 'Downloadable Resources',
            description: 'Engineer-reviewed checklists and safety-lifecycle templates.',
            href: '/resources/downloads',
          },
          {
            icon: 'newspaper',
            title: 'Articles',
            description: 'Plain-English guides to standards, requirements, and the safety lifecycle.',
            href: '/resources/articles',
          },
          {
            icon: 'calendar-days',
            title: 'Events & Webinars',
            description: 'Live sessions and recorded webinars on functional safety practice.',
            href: '/resources/events',
          },
          {
            icon: 'graduation-cap',
            title: 'Free Trainings',
            description: 'On-demand introductory training across the safety lifecycle.',
            href: '/resources/free-trainings',
          },
        ],
      },
      closing: {
        eyebrow: 'Beyond the tools',
        title: 'Need an expert in the room?',
        sub:
          'Our tools accelerate the early questions — but certification takes principal-led engineering. Bring us your toughest safety-critical program.',
        ctaLabel: 'Book a Consultation',
        ctaHref: '#',
      },
      meta: {
        title: 'Functional Safety Resources | Tools, Articles & Training | CSA',
        description:
          'Engineer-reviewed functional safety tools and knowledge — an AI standards identifier, checklists, templates, articles, and on-demand training across the safety lifecycle.',
      },
    },
  })

  // ---- Standards Identifier page ----
  await payload.updateGlobal({
    slug: 'standardsIdentifierPage',
    data: {
      hero: {
        eyebrow: 'Standards Identifier',
        eyebrowIcon: 'crosshair',
        ghost: 'Standards',
        title: 'Which safety standard applies to your project?',
        sub1:
          'Navigating international safety standards can be overwhelming. Use this quick guide to identify the primary regulatory frameworks for your industry — then let our embedded AI tool isolate your exact compliance targets automatically.',
        sub2:
          'Select your industry, mobility type, and operational environment to instantly isolate your compliance targets.',
        primaryCtaLabel: 'Try the Standards Identifier',
        primaryCtaHref: '#tool',
        secondaryCtaLabel: 'Talk to an Engineer',
        secondaryCtaHref: '#',
      },
      tool: {
        name: 'AI Standards Identifier',
        sub: 'Industry · Mobility · Environment',
        badge: 'UI Preview',
        selectors: [
          {
            step: '01',
            label: 'Industry vertical',
            options: [
              { label: 'Robotics' },
              { label: 'Automotive & EV' },
              { label: 'Rail' },
              { label: 'Machinery' },
              { label: 'Agriculture' },
              { label: 'Process' },
            ],
          },
          {
            step: '02',
            label: 'Mobility configuration',
            options: [
              { label: 'Fixed / stationary' },
              { label: 'Mobile (AMR)' },
              { label: 'On-road autonomous' },
              { label: 'Rail-bound' },
            ],
          },
          {
            step: '03',
            label: 'Operational environment',
            options: [
              { label: 'Human-shared' },
              { label: 'Caged / restricted' },
              { label: 'Public roadway' },
              { label: 'Harsh / high-energy' },
            ],
          },
        ],
        submitLabel: 'Identify My Standards',
        submitNote: 'Interactive preview — full AI mapping connects at launch.',
        resultLabel: 'Compliance roadmap',
        resultPreviewLabel: 'Sample output',
        roadmap: [
          { code: 'ISO 10218-2', meta: 'Industrial robot integration', pill: 'Primary' },
          { code: 'ISO 3691-4', meta: 'Driverless industrial trucks', pill: 'Primary' },
          { code: 'ISO 13849-1', meta: 'Performance Level · PL d', pill: 'Target PL' },
          { code: 'IEC 61508', meta: 'Foundational E/E/PE safety', pill: 'Baseline' },
        ],
        veilText:
          'Your roadmap — exact compliance targets, performance levels, and safety integrity baselines — generates here once the AI engine is live.',
      },
      frameworks: {
        eyebrow: 'Primary Regulatory Frameworks',
        title: 'Covered by our independent audits.',
        lead: 'The core frameworks our principal engineers navigate, mapped to the systems that fall under each.',
        items: [
          { icon: 'bot', title: 'Industrial Robotics', codes: [{ label: 'ISO 13849' }, { label: 'ISO 10218' }] },
          { icon: 'truck', title: 'Autonomous Mobile Robots', codes: [{ label: 'ISO 3691-4' }, { label: 'IEC 61508' }] },
          { icon: 'car', title: 'Automotive & Electric Vehicles', codes: [{ label: 'ISO 26262' }] },
          { icon: 'tractor', title: 'Agricultural Automation', codes: [{ label: 'ISO 25119' }] },
          {
            icon: 'train-front',
            title: 'Rail Signaling & Control',
            codes: [{ label: 'EN 50126' }, { label: 'EN 50128' }, { label: 'EN 50129' }],
          },
          { icon: 'cpu', title: 'General Electronic Safety', codes: [{ label: 'IEC 61508' }] },
        ],
      },
      howItWorks: {
        eyebrow: 'How It Works',
        title: 'From parameters to roadmap in three steps.',
        steps: [
          {
            number: '1',
            title: 'Input your system parameters',
            description:
              'Select your industry vertical, machine mobility configuration, and operational environment from the interactive menus.',
          },
          {
            number: '2',
            title: 'Automated regulatory mapping',
            description:
              'The AI tool instantly cross-references your parameters against our proprietary safety engineering database.',
          },
          {
            number: '3',
            title: 'Review your compliance roadmap',
            description:
              'The tool generates a clear summary of your exact compliance targets, target performance levels, and required safety integrity baselines.',
          },
        ],
      },
      closing: {
        eyebrow: 'Isolate your targets',
        title: 'Try the Standards Identifier.',
        sub:
          'Map your industry, mobility, and environment to your exact compliance targets — then bring the roadmap to a principal engineer.',
        ctaLabel: 'Try the Standards Identifier',
        ctaHref: '#tool',
      },
      meta: {
        title: 'Standards Identifier | Which Safety Standard Applies? | CSA',
        description:
          'Identify the functional safety standards for your project. Map your industry, mobility configuration, and operational environment to exact compliance targets across IEC 61508, ISO 13849, ISO 26262, and more.',
      },
    },
  })

  // ---- Safety Chat page ----
  await payload.updateGlobal({
    slug: 'safetyChatPage',
    data: {
      hero: {
        eyebrow: 'Safety Chat',
        eyebrowIcon: 'message-square-text',
        ghost: 'Safety Chat',
        title: 'Safety Chat: immediate engineering insight.',
        sub:
          'Have a quick question about a specific Safety Integrity Level (SIL) or a requirement buried in a complex standard? Our Safety Chat tool provides immediate, high-level engineering insight to help you navigate the safety lifecycle faster.',
        note:
          'Safety Chat is AI-augmented and designed to supplement — not replace — expert engineering audits.',
        primaryCtaLabel: 'Ask Safety Chat',
        primaryCtaHref: '#',
        secondaryCtaLabel: 'Talk to an Engineer',
        secondaryCtaHref: '#',
      },
      panel: {
        name: 'Safety Chat',
        status: 'AI Assistant',
        tag: 'AI-Augmented',
        thread: [
          {
            who: 'bot',
            text:
              "Hi — I'm Safety Chat. Ask me about a Safety Integrity Level, a Performance Level, or a requirement buried in a standard, and I'll give you a high-level engineering answer to point you in the right direction.",
          },
          { who: 'user', text: "What's the difference between SIL 2 and PL d?" },
          {
            who: 'bot',
            text:
              'They come from different standards — SIL (IEC 61508 / 62061) and PL (ISO 13849) — but they overlap. At a high level, PL d roughly corresponds to SIL 2 for many machinery control functions. The right target still depends on your risk assessment, so treat this as orientation, not a determination.',
          },
        ],
        suggestions: [
          { label: 'When do I need ISO 3691-4?' },
          { label: 'How is a Performance Level determined?' },
          { label: 'What goes in a HARA?' },
        ],
        placeholder: 'Ask a functional safety question…',
        lockText: 'Sign in to start chatting. Safety Chat is available to logged-in users.',
        lockCtaLabel: 'Sign in to chat',
        lockCtaHref: '#',
      },
      closing: {
        eyebrow: 'Move faster',
        title: 'Ask Safety Chat.',
        sub:
          'Sign in to ask quick functional safety questions and get immediate, high-level engineering insight — then escalate the hard ones to a principal engineer.',
        ctaLabel: 'Ask Safety Chat',
        ctaHref: '#',
      },
      meta: {
        title: 'Safety Chat | Immediate Functional Safety Insight | CSA',
        description:
          'Ask quick questions about a Safety Integrity Level, Performance Level, or a requirement buried in a standard, and get immediate, high-level engineering insight. AI-augmented, engineer-reviewed.',
      },
    },
  })

  payload.logger.info('— Resources section seeded —')
}
