/**
 * Seed — Resources nav section landing pages.
 *
 * One doc per sub-page, in nav order:
 *   Overview, Standards Identifier, Safety Chat, Downloadable Resources,
 *   Articles, Events & Webinars, Free Trainings.
 *
 * Copy lifted verbatim from the design export under
 * design-reference/project/Resources/*.html (and the shared resource-listing.jsx
 * config objects). Media/relationship fields are omitted — seeded later.
 */
export const seed = {
  collection: 'resources',
  docs: [
    /* ============================================================
       1. Overview
       ============================================================ */
    {
      title: 'Overview',
      slug: 'overview',
      order: 1,
      navLabel: 'Overview',

      // Hero (hub)
      heroEyebrow: 'Functional Safety Resources',
      heroEyebrowIcon: 'library-big',
      heroGhost: 'Resources',
      heroHeadline: 'Tools and knowledge for the safety lifecycle.',
      heroSub:
        'Practical, engineer-reviewed tools and knowledge to help you navigate the safety lifecycle faster — from an AI standards identifier to checklists, articles, and on-demand training.',
      heroJumpLinks: [
        { label: 'AI Tools', icon: 'sparkles', anchor: '#tools' },
        { label: 'Knowledge Library', icon: 'folder-open', anchor: '#library' },
        { label: 'Talk to an Engineer', icon: 'calendar-check', anchor: 'Book a Consultation.html' },
      ],

      // AI Tools band
      toolsEyebrow: 'AI-Augmented Tools',
      toolsHeading: 'Start with a tool.',
      toolsLead:
        'Two embedded assistants built to clear the early, time-consuming questions — so you reach your real engineering work faster.',
      toolsItems: [
        {
          icon: 'scan-search',
          tag: 'AI Tool',
          title: 'Standards Identifier',
          desc: 'Map your industry, mobility configuration, and operational environment to your exact compliance targets — instantly.',
        },
        {
          icon: 'message-square-text',
          tag: 'AI Tool',
          title: 'Safety Chat',
          desc: 'Immediate, high-level engineering insight on a specific SIL or a requirement buried in a complex standard.',
        },
      ],

      // Knowledge Library band
      libEyebrow: 'Knowledge Library',
      libHeading: 'Go deeper.',
      libLead:
        'Engineer-reviewed references, articles, and training to support every phase of the safety lifecycle.',
      libItems: [
        {
          icon: 'file-check',
          title: 'Downloadable Resources',
          desc: 'Engineer-reviewed checklists and safety-lifecycle templates.',
        },
        {
          icon: 'newspaper',
          title: 'Articles',
          desc: 'Plain-English guides to standards, requirements, and the safety lifecycle.',
        },
        {
          icon: 'calendar-days',
          title: 'Events & Webinars',
          desc: 'Live sessions and recorded webinars on functional safety practice.',
        },
        {
          icon: 'graduation-cap',
          title: 'Free Trainings',
          desc: 'On-demand introductory training across the safety lifecycle.',
        },
      ],

      // Closing
      closeEyebrow: 'Beyond the tools',
      closeHeading: 'Need an expert in the room?',
      closeSub:
        'Our tools accelerate the early questions — but certification takes principal-led engineering. Bring us your toughest safety-critical program.',
      closeCtaLabel: 'Book a Consultation',
      closeCtaHref: 'Book a Consultation.html',

      seo: {
        metaTitle: 'Functional Safety Resources & Tools | CSA',
        metaDescription:
          'Free functional safety resources — an AI standards identifier, Safety Chat, engineer-reviewed checklists, articles, and on-demand trainings across the safety lifecycle.',
      },
    },

    /* ============================================================
       2. Standards Identifier
       ============================================================ */
    {
      title: 'Standards Identifier',
      slug: 'standards-identifier',
      order: 2,
      navLabel: 'Standards Identifier',

      // Hero (split)
      heroEyebrow: 'Standards Identifier',
      heroEyebrowIcon: 'crosshair',
      heroGhost: 'Standards',
      heroHeadline: 'Which safety standard applies to your project?',
      heroSub:
        'Navigating international safety standards can be overwhelming. Use this quick guide to identify the primary regulatory frameworks for your industry — then let our embedded AI tool isolate your exact compliance targets automatically.',
      heroSub2:
        'Select your industry, mobility type, and operational environment to instantly isolate your compliance targets.',
      heroCtaLabel: 'Try the Standards Identifier',
      heroCtaHref: '#tool',
      heroSecondaryLabel: 'Talk to an Engineer',

      // Identifier tool intro + disclaimer
      toolName: 'AI Standards Identifier',
      toolSub: 'Industry · Mobility · Environment',
      toolBadge: 'UI Preview',
      toolCtaLabel: 'Identify My Standards',
      toolNote: 'Interactive preview — full AI mapping connects at launch.',
      toolResultLabel: 'Compliance roadmap',
      toolResultVeil:
        'Your roadmap — exact compliance targets, performance levels, and safety integrity baselines — generates here once the AI engine is live.',

      // Frameworks
      fwEyebrow: 'Primary Regulatory Frameworks',
      fwHeading: 'Covered by our independent audits.',
      fwLead:
        'The core frameworks our principal engineers navigate, mapped to the systems that fall under each.',
      fwItems: [
        { icon: 'bot', title: 'Industrial Robotics', codes: [{ code: 'ISO 13849' }, { code: 'ISO 10218' }] },
        { icon: 'truck', title: 'Autonomous Mobile Robots', codes: [{ code: 'ISO 3691-4' }, { code: 'IEC 61508' }] },
        { icon: 'car', title: 'Automotive & Electric Vehicles', codes: [{ code: 'ISO 26262' }] },
        { icon: 'tractor', title: 'Agricultural Automation', codes: [{ code: 'ISO 25119' }] },
        {
          icon: 'train-front',
          title: 'Rail Signaling & Control',
          codes: [{ code: 'EN 50126' }, { code: 'EN 50128' }, { code: 'EN 50129' }],
        },
        { icon: 'cpu', title: 'General Electronic Safety', codes: [{ code: 'IEC 61508' }] },
      ],

      // How it works
      howEyebrow: 'How It Works',
      howHeading: 'From parameters to roadmap in three steps.',
      howSteps: [
        {
          num: '1',
          title: 'Input your system parameters',
          desc: 'Select your industry vertical, machine mobility configuration, and operational environment from the interactive menus.',
        },
        {
          num: '2',
          title: 'Automated regulatory mapping',
          desc: 'The AI tool instantly cross-references your parameters against our proprietary safety engineering database.',
        },
        {
          num: '3',
          title: 'Review your compliance roadmap',
          desc: 'The tool generates a clear summary of your exact compliance targets, target performance levels, and required safety integrity baselines.',
        },
      ],

      // Closing
      closeEyebrow: 'Isolate your targets',
      closeHeading: 'Try the Standards Identifier.',
      closeSub:
        'Map your industry, mobility, and environment to your exact compliance targets — then bring the roadmap to a principal engineer.',
      closeCtaLabel: 'Try the Standards Identifier',
      closeCtaHref: '#tool',

      seo: {
        metaTitle: 'Safety Standards Identifier Tool | CSA',
        metaDescription:
          'Not sure which safety standard applies to your project? Use our AI Standards Identifier to map your industry, mobility, and environment to exact compliance targets.',
      },
    },

    /* ============================================================
       3. Safety Chat
       ============================================================ */
    {
      title: 'Safety Chat',
      slug: 'safety-chat',
      order: 3,
      navLabel: 'Safety Chat',

      // Hero (split)
      heroEyebrow: 'Safety Chat',
      heroEyebrowIcon: 'message-square-text',
      heroGhost: 'Safety Chat',
      heroHeadline: 'Safety Chat: immediate engineering insight.',
      heroSub:
        'Have a quick question about a specific Safety Integrity Level (SIL) or a requirement buried in a complex standard? Our Safety Chat tool provides immediate, high-level engineering insight to help you navigate the safety lifecycle faster.',
      heroNote:
        'Safety Chat is AI-augmented and designed to supplement — not replace — expert engineering audits.',
      heroCtaLabel: 'Ask Safety Chat',
      heroCtaHref: 'Login.html',
      heroSecondaryLabel: 'Talk to an Engineer',

      // Identifier-tool tab reused as the chat-shell intro labels
      toolName: 'Safety Chat',
      toolSub: 'AI Assistant',
      toolBadge: 'AI-Augmented',
      toolNote:
        'Sign in to start chatting. Safety Chat is available to logged-in users.',
      toolCtaLabel: 'Sign in to chat',

      // Closing
      closeEyebrow: 'Move faster',
      closeHeading: 'Ask Safety Chat.',
      closeSub:
        'Sign in to ask quick functional safety questions and get immediate, high-level engineering insight — then escalate the hard ones to a principal engineer.',
      closeCtaLabel: 'Ask Safety Chat',
      closeCtaHref: 'Login.html',

      seo: {
        metaTitle: 'Safety Chat — AI Functional Safety Assistant | CSA',
        metaDescription:
          'Have a quick question about a SIL or a complex standard? Safety Chat gives immediate, high-level functional safety engineering insights to help you move faster.',
      },
    },

    /* ============================================================
       4. Downloadable Resources
       ============================================================ */
    {
      title: 'Downloadable Resources',
      slug: 'downloadable-resources',
      order: 4,
      navLabel: 'Downloadable Resources',

      // Hero (listing)
      heroEyebrow: 'Downloadable Resources',
      heroEyebrowIcon: 'file-check',
      heroGhost: 'Downloads',
      heroHeadline: 'Downloadable Functional Safety Resources',
      heroSub:
        'Access our repository of practical, engineer-reviewed checklists, framework guides, and template overviews to jumpstart your internal safety tracking.',
      heroCtaLabel: 'Browse Downloads',
      heroCtaHref: '#library',

      // Listing
      listFilters: [
        { label: 'All' },
        { label: 'Checklists' },
        { label: 'Guidebooks' },
        { label: 'Free Templates' },
        { label: 'Standards Guides' },
      ],
      listEmptyTitle: 'More resources are being added.',
      listEmptyText:
        'New downloads are being created for each filter category. Check back soon, or talk to an engineer for what you need now.',
      listCards: [
        {
          icon: 'clipboard-check',
          cat: 'Checklists',
          title: 'Physical System & Hardware Safety Validation Checklist',
          desc: 'A step-by-step validation checklist covering hardware fault tolerance, diagnostic coverage, and the evidence you need to close out a physical safety case.',
          meta: 'PDF · Checklist',
          metaIcon: 'file-text',
          ctaLabel: 'Download',
        },
        {
          icon: 'route',
          cat: 'Guidebooks',
          title: 'V-Model Adherence Roadmap for Autonomous Vehicle Development',
          desc: 'A development roadmap mapping each V-model phase to its safety deliverables — so verification and validation stay aligned from concept to deployment.',
          meta: 'PDF · Guidebook',
          metaIcon: 'book-open',
          ctaLabel: 'Download',
        },
        {
          icon: 'layout-grid',
          cat: 'Free Templates',
          title: 'Interface Safety Case & COTS Integration Tracking Framework',
          desc: 'A working template for tracking interface safety requirements and COTS component integration across a multi-supplier system architecture.',
          meta: 'XLSX · Template',
          metaIcon: 'table',
          ctaLabel: 'Download',
        },
      ],

      // Closing
      closeEyebrow: 'Beyond the downloads',
      closeHeading: 'Need it built for your program?',
      closeSub:
        'These templates accelerate your internal tracking — but certification takes principal-led engineering. Bring us your toughest safety-critical system.',
      closeCtaLabel: 'Book a Consultation',
      closeCtaHref: 'Book a Consultation.html',

      seo: {
        metaTitle: 'Downloadable Functional Safety Resources | CSA',
        metaDescription:
          'Engineer-reviewed functional safety checklists, framework guides, and template overviews to jumpstart your internal safety tracking. Free downloads across the lifecycle.',
      },
    },

    /* ============================================================
       5. Articles
       ============================================================ */
    {
      title: 'Articles',
      slug: 'articles',
      order: 5,
      navLabel: 'Articles',

      // Hero (listing)
      heroEyebrow: 'Articles',
      heroEyebrowIcon: 'newspaper',
      heroGhost: 'Articles',
      heroHeadline: 'Functional Safety Articles & Insights',
      heroSub:
        'Explore our library of expert safety engineering publications detailing real-world compliance pathways and best practices for high-stakes physical systems.',
      heroCtaLabel: 'Read the Latest',
      heroCtaHref: '#library',

      // Listing
      listFilters: [
        { label: 'All' },
        { label: 'Robotics' },
        { label: 'Automotive' },
        { label: 'Rail' },
        { label: 'Off-Road & Agriculture' },
        { label: 'Philosophy' },
      ],
      listEmptyTitle: 'First articles publishing soon.',
      listEmptyText:
        'Our publication pipeline is spinning up. New articles will appear here as each is reviewed and released.',
      listCards: [
        {
          icon: 'bot',
          cat: 'Robotics',
          title: 'Robotics & Autonomous Systems',
          desc: 'In-depth pieces on ISO 13849, ISO 10218, and ISO 3691-4 compliance pathways for industrial and mobile robotics.',
          meta: 'Publication pipeline',
          metaIcon: 'pen-line',
          ctaLabel: 'Coming soon',
          soon: true,
        },
        {
          icon: 'car-front',
          cat: 'Automotive',
          title: 'Automotive & EV Safety',
          desc: 'ISO 26262 functional safety, battery-management-system safety, and the V-model put into real-world practice.',
          meta: 'Publication pipeline',
          metaIcon: 'pen-line',
          ctaLabel: 'Coming soon',
          soon: true,
        },
        {
          icon: 'scale',
          cat: 'Philosophy',
          title: 'Safety Engineering Philosophy',
          desc: 'How we think about requirements, independence, and the true cost of getting safety-critical work right the first time.',
          meta: 'Publication pipeline',
          metaIcon: 'pen-line',
          ctaLabel: 'Coming soon',
          soon: true,
        },
      ],

      // Closing
      closeEyebrow: 'Can’t wait for the next article?',
      closeHeading: 'Ask an engineer directly.',
      closeSub:
        'Our publications cover the patterns — your program is specific. Bring your compliance questions to a principal safety engineer.',
      closeCtaLabel: 'Book a Consultation',
      closeCtaHref: 'Book a Consultation.html',

      seo: {
        metaTitle: 'Functional Safety Articles & Insights | CSA',
        metaDescription:
          'Expert functional safety publications on real-world compliance pathways and best practices for high-stakes physical systems — robotics, automotive, rail, and more.',
      },
    },

    /* ============================================================
       6. Events & Webinars
       ============================================================ */
    {
      title: 'Events & Webinars',
      slug: 'events-webinars',
      order: 6,
      navLabel: 'Events & Webinars',

      // Hero (listing)
      heroEyebrow: 'Events & Webinars',
      heroEyebrowIcon: 'calendar-days',
      heroGhost: 'Events',
      heroHeadline: 'Events & Webinars',
      heroSub:
        'Meet our engineering leaders, join open networking, and stay ahead of evolving functional safety regulations at top-tier international automation events and conferences.',
      heroCtaLabel: 'See Upcoming Events',
      heroCtaHref: '#library',

      // Listing
      listFilters: [
        { label: 'All' },
        { label: 'Upcoming Events' },
        { label: 'Past Keynotes' },
        { label: 'Technical Webinars' },
      ],
      listEmptyTitle: 'Nothing scheduled here yet.',
      listEmptyText:
        'New sessions are added as our speaking calendar firms up. Check back, or reach out to arrange a private briefing.',
      listCards: [
        {
          icon: 'calendar-clock',
          cat: 'Upcoming Events',
          title: 'Upcoming conference appearance',
          desc: 'Catch our engineering leaders presenting and at the booth. Session details and registration go live as each date is confirmed.',
          meta: 'Date to be announced',
          metaIcon: 'map-pin',
          ctaLabel: 'Register',
          soon: true,
        },
        {
          icon: 'monitor-play',
          cat: 'Technical Webinars',
          title: 'On-demand technical webinar',
          desc: 'Deep, practitioner-level sessions on functional safety practice — recorded and available to watch on your schedule.',
          meta: 'Recording · On demand',
          metaIcon: 'video',
          ctaLabel: 'Watch',
          soon: true,
        },
        {
          icon: 'mic',
          cat: 'Past Keynotes',
          title: 'Past keynote recording',
          desc: 'Highlights and full recordings from our recent conference keynotes on safety-critical systems and certification.',
          meta: 'Recording · Archive',
          metaIcon: 'video',
          ctaLabel: 'Watch',
          soon: true,
        },
      ],

      // Featured annual appearances band
      featEyebrow: 'Featured Annual Appearances',
      featHeading: 'Where you’ll find us each year.',
      featLead:
        'CSA returns to the industry’s leading automation and safety conferences. Come find our engineers on the floor and in the sessions.',
      featItems: [
        { icon: 'bot', title: 'Robotics Summit & Expo', desc: 'Commercial robotics innovation and professional networking.' },
        { icon: 'cog', title: 'Automate', desc: 'Motion control, machine vision, and advanced autonomous robotics integration.' },
        {
          icon: 'shield-check',
          title: 'International Robot Safety Conference',
          desc: 'Deep dives into safe, highly effective industrial automation.',
        },
        {
          icon: 'train-front',
          title: 'Railway Interchange',
          desc: 'Technical advances in mass transit safety, rail infrastructure, and signaling.',
        },
      ],

      // Closing
      closeEyebrow: 'Want us at your event?',
      closeHeading: 'Invite a CSA engineer to speak.',
      closeSub:
        'Our principals present on functional safety, certification, and safe autonomy. Reach out to arrange a keynote, panel, or private technical briefing.',
      closeCtaLabel: 'Book a Consultation',
      closeCtaHref: 'Book a Consultation.html',

      seo: {
        metaTitle: 'Functional Safety Events & Webinars | CSA',
        metaDescription:
          "Meet CSA's engineering leaders and stay ahead of evolving functional safety regulations at top international automation and robotics safety conferences.",
      },
    },

    /* ============================================================
       7. Free Trainings
       ============================================================ */
    {
      title: 'Free Trainings',
      slug: 'free-trainings',
      order: 7,
      navLabel: 'Free Trainings',

      // Hero (listing)
      heroEyebrow: 'Free Trainings',
      heroEyebrowIcon: 'graduation-cap',
      heroGhost: 'Trainings',
      heroHeadline: 'Free Functional Safety Trainings',
      heroSub:
        'Access on-demand technical video summaries and high-level introductory presentations exploring the core fundamentals of the safety lifecycle.',
      heroCtaLabel: 'Start Learning Free',
      heroCtaHref: '#library',

      // Listing
      listFilters: [
        { label: 'All' },
        { label: 'Video Overviews' },
        { label: 'Technical Whitepapers' },
        { label: 'Core Introductions' },
      ],
      listEmptyTitle: 'More briefings on the way.',
      listEmptyText:
        'New on-demand material is being produced for this category. Check back soon for the next release.',
      listCards: [
        {
          icon: 'play-circle',
          cat: 'Video Overviews',
          title: 'Introduction to Probabilistic Safety: Calculating Average Probability of Failure on Demand (PFD)',
          desc: 'A plain-English video walkthrough of probabilistic safety and how Average Probability of Failure on Demand is calculated and applied.',
          meta: 'Video · Overview',
          metaIcon: 'video',
          ctaLabel: 'Watch free',
        },
        {
          icon: 'layers',
          cat: 'Core Introductions',
          title: 'Defining the Architectural Boundary: Hardware Isolation & Independent Safety Auditing Explained',
          desc: 'An introductory presentation on drawing the architectural boundary — why hardware isolation and independent safety auditing matter.',
          meta: 'Presentation · Intro',
          metaIcon: 'presentation',
          ctaLabel: 'Start free',
        },
        {
          icon: 'file-text',
          cat: 'Technical Whitepapers',
          title: 'Technical whitepaper series',
          desc: 'In-depth written briefings on safety-lifecycle fundamentals, published alongside the video overviews as the series grows.',
          meta: 'Publishing soon',
          metaIcon: 'pen-line',
          ctaLabel: 'Coming soon',
          soon: true,
        },
      ],

      // Closing
      closeEyebrow: 'Ready for the full lifecycle?',
      closeHeading: 'Go from fundamentals to certified.',
      closeSub:
        'These introductions cover the core ideas. When your program needs principal-led validation and certification, our engineers take it from here.',
      closeCtaLabel: 'Book a Consultation',
      closeCtaHref: 'Book a Consultation.html',

      seo: {
        metaTitle: 'Free Functional Safety Training & Videos | CSA',
        metaDescription:
          'Free on-demand functional safety training — video summaries and introductory presentations on the core fundamentals of the safety lifecycle.',
      },
    },
  ],
}
