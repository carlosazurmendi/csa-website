/**
 * Seed — Consulting nav page-collection.
 *
 * One doc per sub-page, in nav order, with copy lifted verbatim from the design
 * export (design-reference/project/Consulting/*.html + assets/industry-page.jsx +
 * Overview.html). Field names/shapes match src/collections/pages/Consulting.ts.
 *
 * Media / relationship fields are omitted (seeded later). richText fields use the
 * Lexical editor-state shape via the `rt()` helper below.
 */

/** Minimal Lexical editor state for one or more plain paragraphs. */
const rt = (...paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      textFormat: 0,
      children: [
        {
          type: 'text',
          mode: 'normal',
          text,
          style: '',
          detail: 0,
          format: 0,
          version: 1,
        },
      ],
    })),
  },
})

export const seed = {
  collection: 'consulting',
  docs: [
    /* ============================================================
       01 · Overview
       ============================================================ */
    {
      title: 'Overview',
      slug: 'overview',
      order: 1,
      navLabel: 'Overview',

      // Hero
      heroIcon: '',
      heroEyebrow: 'Functional Safety Consulting',
      heroHeadline: 'Safety-Critical Systems Engineering & Consulting.',
      heroGhost: 'Consulting',
      heroTagline:
        'Move your advanced autonomous systems from concept to global market certification — with absolute confidence.',
      heroStandards: [
        { code: 'ISO 13849' },
        { code: 'IEC 61508' },
        { code: 'ISO 26262' },
        { code: 'IEC 62061' },
      ],
      heroCtaLabel: 'Book a Consultation',
      heroCtaHref: 'Book a Consultation',
      heroLifecycle: [
        {
          title: 'Concept & item definition',
          desc: 'Performance and operational boundaries, scoped early.',
        },
        {
          title: 'Hazard analysis',
          desc: 'HARA, FMEA, and fault tree analysis to size the risk.',
        },
        {
          title: 'Verification & validation',
          desc: 'V-model traceability across the engineering process.',
        },
        {
          title: 'Global market certification',
          desc: 'Evidence and interfaces ready for third-party assessors.',
        },
      ],

      // Quick Facts
      factsEyebrow: 'Technical Authority',
      factsHeading: 'Quick facts.',
      factsLead: 'The credentials and posture behind every CSA engagement.',
      factsItems: [
        {
          icon: 'flag',
          kicker: 'Established 2023',
          title: 'Built to democratize safety.',
          desc: 'Founded to make functional safety accessible across advanced automation — a strategic advantage, not a regulatory burden.',
        },
        {
          icon: 'scale',
          kicker: '100% Independent',
          title: 'A non-developmental challenger.',
          desc: 'We operate strictly as expert safety challengers. Because we never build the product we assess, our validation stays unbiased.',
        },
        {
          icon: 'search-check',
          kicker: 'Third-Party Auditing',
          title: 'Hardware-level validation.',
          desc: 'Specialists in hardware, interfaces, and physical system safety validation — the independent review certifiers expect.',
        },
      ],

      // About
      aboutEyebrow: 'About CSA',
      aboutHeading: 'An independent functional safety firm.',
      aboutBody: rt(
        'Critical Systems Analysis is an independent functional safety consulting firm. Led by principal safety engineers with TÜV certification and decades of combined experience, we act as an unbiased technical challenger for teams building autonomous and safety-critical systems across rail, robotics, machinery, automotive, defense, and process industries.',
      ),
      aboutQuote:
        'Because we never build the product we assess, our validation carries the independence that certifiers and regulators expect.',
      aboutCredsLabel: 'Why our validation holds',
      aboutCreds: [
        {
          icon: 'badge-check',
          title: 'TÜV-certified principals',
          desc: 'FS Engineer and IFSP credentials behind every engagement.',
        },
        {
          icon: 'scale',
          title: 'Strictly non-developmental',
          desc: 'We assess and validate — we don’t build what we review.',
        },
        {
          icon: 'layers',
          title: 'Six industries served',
          desc: 'Rail, robotics, machinery, automotive, defense, and process.',
        },
      ],

      // Engagement Options
      optsEyebrow: 'How We Provide Consulting',
      optsHeading: 'Three ways to work with us.',
      optsLead:
        'We offer flexible consulting frameworks and expert contract engineering models, tailored to your team’s exact resource needs.',
      optsItems: [
        {
          num: 'Option 01',
          icon: 'calendar-clock',
          title: 'Regular Advisory Meetings',
          desc: 'Weekly or bi-weekly sessions where your team brings active functional safety questions and our principal engineers provide immediate technical answers.',
          best: 'Teams that want expert backup on demand.',
        },
        {
          num: 'Option 02',
          icon: 'users-round',
          title: 'Embedded Engineering Support',
          desc: 'CSA acts directly as your internal engineering support — executing hands-on safety analysis, authoring required deliverables, and managing technical interfaces with third-party assessment bodies.',
          best: 'Teams without safety engineers, or those short on bandwidth.',
        },
        {
          num: 'Option 03',
          icon: 'clipboard-check',
          title: 'Process & Design Gap Auditing',
          desc: 'A rigorous independent audit of your existing safety processes, hardware designs, and documentation artifacts, followed by a clear roadmap to close technical gaps and achieve certification.',
          best: 'Teams with some artifacts that need a path to certification.',
        },
      ],

      // Capabilities (contract engineering)
      capsEyebrow: 'Contract Engineering',
      capsHeading: 'Expert contract engineering capabilities.',
      capsLead:
        'When you face critical resource gaps or severe schedule pressure, access principal-led safety engineering on a contract basis for high-stakes analytical tasks.',
      capsItems: [
        {
          icon: 'crosshair',
          code: 'HARA',
          title: 'Hazard Analysis & Risk Assessments',
          desc: 'Structured identification of hazards and operational risk to set defensible safety targets.',
        },
        {
          icon: 'list-checks',
          code: 'FMEA',
          title: 'Failure Mode & Effects Analysis Workshops',
          desc: 'Bottom-up decomposition to isolate failure modes and evaluate diagnostic coverage.',
        },
        {
          icon: 'git-fork',
          code: 'FTA',
          title: 'Top-Down Fault Tree Analysis',
          desc: 'Deductive evaluation that traces system-level hazards back to root causes.',
        },
        {
          icon: 'waypoints',
          code: 'V-MODEL',
          title: 'Requirements Traceability',
          desc: 'Complete V-model traceability across the full engineering process, concept to validation.',
        },
      ],

      // Industries Grid
      indEyebrow: 'Industries We Serve',
      indHeading: 'Tailored to your sector.',
      indLead: 'Functional safety consulting tailored to each sector’s standards and hazards.',
      indItems: [
        { icon: 'train-front', title: 'Rail', standards: 'EN 50126/8/9', href: 'Consulting/Rail' },
        { icon: 'bot', title: 'Robotics', standards: 'ISO 10218 · 3691-4', href: 'Consulting/Robotics' },
        { icon: 'cog', title: 'Industrial Machinery', standards: 'ISO 13849 · IEC 62061', href: 'Consulting/Machinery' },
        { icon: 'cpu', title: 'Physical AI', standards: 'ISO/PAS 8800', href: 'Consulting/Physical-AI' },
        { icon: 'construction', title: 'Construction & Mining', standards: 'ISO 17757 · 19014', href: 'Consulting/Construction-Mining-Equipment' },
        { icon: 'car', title: 'Automotive', standards: 'ISO 26262 · 21448', href: 'Consulting/Automotive' },
        { icon: 'shield', title: 'Defense', standards: 'MIL-STD-882', href: 'Consulting/Defense' },
        { icon: 'factory', title: 'Process', standards: 'IEC 61511 · 61508', href: 'Consulting/Process' },
      ],

      // Questions
      faqEyebrow: 'Common Questions',
      faqHeading: 'What teams ask first.',
      faqItems: [
        {
          q: 'How much does it cost to get certified?',
          a: 'Compliance costs scale with system complexity — but identifying design flaws early in the V-model architectural phase avoids the substantial penalties of late-stage redesign. Integrating safety from a project’s inception drastically reduces long-term compliance costs and total cost of ownership.',
        },
        {
          q: 'Do I need third-party certification?',
          a: 'If you’re developing advanced autonomous machinery, collaborative robots, or complex programmable electronic systems, global safety lifecycles require independent technical validation. Robust evidence from independent safety audits is a strategic imperative — it clears strict external compliance hurdles and protects your brand reputation.',
        },
      ],

      // Closing CTA
      ctaEyebrow: 'Concept to certification',
      ctaHeading: 'Validate with confidence.',
      ctaSub:
        'Bring us your toughest safety-critical program. We’ll map the path from where you are to certified.',
      ctaLabel: 'Book a Consultation',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Functional Safety Consulting & Contract Engineering | CSA',
        metaDescription:
          'Independent functional safety consulting and contract engineering for autonomous systems. Principal-led HARA, FMEA, FTA & V-model traceability — concept to certification.',
      },
    },

    /* ============================================================
       02 · Rail
       ============================================================ */
    {
      title: 'Rail',
      slug: 'rail',
      order: 2,
      navLabel: 'Rail',

      heroIcon: 'train-front',
      heroEyebrow: 'Functional Safety · Rail',
      heroHeadline: 'Functional Safety for Rail & Mass Transit Infrastructure',
      heroGhost: 'Rail',
      heroTagline:
        'Validating fail-safe signaling, train control architectures, and autonomous rail-robot integrations.',
      heroIntro: rt(
        'We support commuter, freight, transit, and autonomous rail providers worldwide in the strategic design, implementation, and auditing of processor-based fail-safe train control and signaling systems. Our team helps you define functional safety programs and Concepts of Operation (ConOps) so processor-based rail systems interact safely with human operators and existing infrastructure.',
      ),
      heroStandards: [
        { code: 'EN 50126' },
        { code: 'EN 50128' },
        { code: 'EN 50129' },
        { code: 'EN 50657' },
      ],
      heroCtaLabel: 'Discuss Your Rail Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent assessor',
      heroScopeFoot: 'EN 50126 / 50128 / 50129',

      capsEyebrow: 'Core Deliverables & Project Support',
      capsHeading: 'What we deliver for rail programs.',
      capsLead:
        'Independent functional safety analysis for autonomous and conventional rail systems, across every lifecycle phase.',
      capsItems: [
        {
          icon: 'clipboard-check',
          code: 'ISA',
          title: 'Independent Safety Assessment',
          desc: 'Objective ISA reviews and lifecycle management audits that give complete confidence in your rail architectures. We act as your independent assessor.',
        },
        {
          icon: 'crosshair',
          code: 'PHA · FMEA · FTA',
          title: 'Hazard Analysis & Safety Cases',
          desc: 'Specialized risk evaluations — PHA, FMEA, and FTA — to author certifiable, audit-ready safety cases.',
        },
        {
          icon: 'route',
          code: 'Applications',
          title: 'System Applications',
          desc: 'Hands-on expertise across signaling, rolling stock, commuter corridors, freight networks, and autonomous rail-robot integrations.',
        },
      ],

      stdEyebrow: 'Primary Standards We Navigate',
      stdHeading: 'The rail safety framework.',
      stdLead:
        'The CENELEC standards that govern RAMS, software integrity, and safety-case approval for processor-based rail systems.',
      stdItems: [
        {
          code: 'EN 50126',
          desc: 'System Reliability, Availability, Maintainability, and Safety (RAMS).',
        },
        {
          code: 'EN 50128 / EN 50657',
          desc: 'Independent software functional safety reviews and architectural validation.',
        },
        {
          code: 'EN 50129',
          desc: 'Structuring and auditing high-integrity safety cases for electronic signaling components.',
        },
      ],

      featKind: 'experience',
      featEyebrow: 'Hands-On Project Experience',
      featHeading: 'Where we have delivered.',
      featNote:
        'Real rail programs where CSA defined the safety strategy, ran the analysis, and authored the evidence regulators expect.',
      featItems: [
        {
          title: 'Processor-Based Fail-Safe Train Control & Signaling',
          desc: 'Defining and implementing functional safety programs that protect processor-based rail systems from random hardware and systematic failures.',
        },
        {
          title: 'Autonomous Rail-Robot Integrations',
          desc: 'Hands-on safety lifecycle management and hazard analysis for rail-automation and maintenance robotics.',
        },
        {
          title: 'Concepts of Operation (ConOps) Development',
          desc: 'Authoring full ConOps so autonomous rail infrastructure interacts seamlessly and safely with human operators.',
        },
      ],

      ctaEyebrow: 'Rail · Concept to certification',
      ctaHeading: 'Discuss your rail program.',
      ctaSub:
        'Bring us your signaling, train-control, or autonomous rail challenge. We’ll map the path from where you are to a certifiable safety case.',
      ctaLabel: 'Discuss Your Rail Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Functional Safety for Rail & Mass Transit | CSA',
        metaDescription:
          'Independent Safety Assessment and functional safety consulting for rail — fail-safe signaling, train control, and autonomous rail-robot integrations. EN 50126/50128/50129.',
      },
    },

    /* ============================================================
       03 · Robotics
       ============================================================ */
    {
      title: 'Robotics',
      slug: 'robotics',
      order: 3,
      navLabel: 'Robotics',

      heroIcon: 'bot',
      heroEyebrow: 'Functional Safety · Robotics',
      heroHeadline: 'Functional Safety for Robotics and Autonomous Mobile Robots',
      heroGhost: 'Robotics',
      heroTagline:
        'Safeguarding complex industrial, collaborative, and mobile robot integrations in human-shared spaces.',
      heroIntro: rt(
        'In modern automated facilities, rapid design cycles demand safety compliance that matches engineering speed. We resolve the manual-preparation bottleneck and help you design robust, defensible robot architectures from day one.',
      ),
      heroStandards: [
        { code: 'ISO 10218' },
        { code: 'ISO 3691-4' },
        { code: 'ISO 13849' },
        { code: 'IEC 61508' },
      ],
      heroCtaLabel: 'Discuss Your Robotics Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent assessor',
      heroScopeFoot: 'ISO 10218 / 3691-4',

      capsEyebrow: 'Core Robotics Capabilities',
      capsHeading: 'What we deliver for robotics programs.',
      capsLead:
        'End-to-end functional safety for industrial, collaborative, and mobile robots operating in human-shared spaces.',
      capsItems: [
        {
          icon: 'ruler',
          code: 'Scope',
          title: 'Item Definition',
          desc: 'Establishing clear performance and operational boundaries for the system.',
        },
        {
          icon: 'crosshair',
          code: 'FMEA',
          title: 'Hazard Analysis',
          desc: 'Bottom-up FMEA to isolate sensor, motor, and actuation failure modes.',
        },
        {
          icon: 'shield-check',
          code: 'Risk reduction',
          title: 'Risk Reduction',
          desc: 'Specifying functional safety requirements early to avoid late-stage hardware rework.',
        },
        {
          icon: 'badge-check',
          code: 'V&V',
          title: 'Verification & Validation',
          desc: 'Managing comprehensive physical system safety testing.',
        },
      ],

      stdEyebrow: 'Primary Standards We Navigate',
      stdHeading: 'The robotics safety framework.',
      stdLead:
        'The standards that govern collaborative operation, mobile autonomy, and Performance Level validation for robot systems.',
      stdItems: [
        {
          code: 'ISO 3691-4',
          desc: 'Driverless industrial trucks and mixed-zone personnel tracking.',
        },
        {
          code: 'ISO 10218-1 / ISO 10218-2',
          desc: 'Industrial and collaborative robotic environments.',
        },
        {
          code: 'ISO 13849-1 / ISO 13849-2',
          desc: 'Performance Level safety-related control system validation.',
        },
        {
          code: 'IEC 61508',
          desc: 'Foundational electronic functional safety and systematic capability.',
        },
      ],

      featKind: 'caseStudy',
      featEyebrow: 'Case Study Highlight',
      featHeading: 'Proof in the field.',
      featTag: 'Case study',
      featHeadline: 'Fortune 500 Collaborative AMR Certification',
      featBody:
        'CSA engineers facilitated the technical evidence and independent audit pathways to secure the first-ever IEC 61508 certification for a collaborative autonomous mobile robot.',
      featStatValue: '1st',
      featStatLabel: 'IEC 61508 certification for a collaborative AMR',

      ctaEyebrow: 'Robotics · Concept to certification',
      ctaHeading: 'Discuss your robotics program.',
      ctaSub:
        'Bring us your cobot, AMR, or industrial-robot integration. We’ll map the path from item definition to a certifiable safety case.',
      ctaLabel: 'Discuss Your Robotics Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Functional Safety for Robotics & AMRs | CSA',
        metaDescription:
          'Functional safety consulting for industrial, collaborative & mobile robots in human-shared spaces. Item definition, FMEA hazard analysis, ISO 10218 & ISO 3691-4 to V&V.',
      },
    },

    /* ============================================================
       04 · Machinery
       ============================================================ */
    {
      title: 'Machinery',
      slug: 'machinery',
      order: 4,
      navLabel: 'Machinery',

      heroIcon: 'cog',
      heroEyebrow: 'Functional Safety · Industrial Machinery',
      heroHeadline: 'Functional Safety for Industrial Machinery and Automated Workcells',
      heroGhost: 'Machinery',
      heroTagline:
        'Achieving compliant and defensible safety architectures for fixed and mobile machinery.',
      heroIntro: rt(
        'We help manufacturers and system integrators achieve compliant, control-reliable safety architectures for complex industrial machinery, mechatronic systems, and automated workcells — matching safety compliance to engineering speed.',
      ),
      heroStandards: [
        { code: 'ISO 12100' },
        { code: 'ISO 13849' },
        { code: 'IEC 62061' },
        { code: 'IEC 61508' },
      ],
      heroCtaLabel: 'Discuss Your Machinery Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent assessor',
      heroScopeFoot: 'ISO 12100 / 13849',

      capsEyebrow: 'Core Capabilities',
      capsHeading: 'What we deliver for machinery programs.',
      capsLead:
        'Compliant, control-reliable safety architectures for fixed and mobile machinery, mechatronic systems, and automated workcells.',
      capsItems: [
        {
          icon: 'crosshair',
          code: 'ISO 12100',
          title: 'Risk Assessment & Mitigation',
          desc: 'Independent machinery risk assessments under ISO 12100 to identify hazards and design functional risk-reduction strategies.',
        },
        {
          icon: 'gauge',
          code: 'PL · SISTEMA',
          title: 'Performance Level (PL) Verification',
          desc: 'Safety-related control system validation and SISTEMA-based, software-based PL verification (including software FMEA) to prove system integrity under ISO 13849.',
        },
        {
          icon: 'clipboard-check',
          code: 'SRS',
          title: 'Safety Requirements Specification',
          desc: 'Clear safety requirements and verification plans so your machinery architecture passes strict external compliance audits.',
        },
      ],

      stdEyebrow: 'Primary Standards We Navigate',
      stdHeading: 'The machinery safety framework.',
      stdLead:
        'The standards that govern risk assessment, Performance Level validation, and electronic control safety for industrial machinery.',
      stdItems: [
        {
          code: 'ISO 12100',
          desc: 'Global design principles for machinery risk assessment and risk reduction.',
        },
        {
          code: 'ISO 13849-1 / ISO 13849-2',
          desc: 'Performance Level validation for safety-related parts of control systems.',
        },
        {
          code: 'IEC 62061',
          desc: 'Functional safety of electrical, electronic, and programmable machinery control.',
        },
        {
          code: 'IEC 61508',
          desc: 'Foundational electronic and systematic safety lifecycle requirements.',
        },
      ],

      featKind: 'none',

      ctaEyebrow: 'Industrial Machinery · Concept to certification',
      ctaHeading: 'Discuss your machinery program.',
      ctaSub:
        'Bring us your machine, mechatronic system, or automated workcell. We’ll map the path from risk assessment to a defensible safety architecture.',
      ctaLabel: 'Discuss Your Machinery Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Functional Safety for Industrial Machinery | CSA',
        metaDescription:
          'Compliant, defensible safety architectures for fixed & mobile machinery and automated workcells. ISO 12100 risk assessment, ISO 13849 PL verification, IEC 62061.',
      },
    },

    /* ============================================================
       05 · Physical AI
       ============================================================ */
    {
      title: 'Physical AI',
      slug: 'physical-ai',
      order: 5,
      navLabel: 'Physical AI',

      heroIcon: 'cpu',
      heroEyebrow: 'Functional Safety · Physical AI',
      heroHeadline:
        'Functional Safety for Physical Artificial Intelligence and Adaptive Control',
      heroGhost: 'Physical AI',
      heroTagline:
        'Mitigating the added risk introduced by AI-driven perception, decision-making, and environmental adaptation.',
      heroIntro: rt(
        'We address and mitigate the added risk introduced by AI-driven perception, non-deterministic decision-making, and dynamic adaptation in physical safety-critical systems.',
      ),
      heroStandards: [
        { code: 'ISO/PAS 8800' },
        { code: 'ISO/IEC 22440' },
        { code: 'ISO/TR 5469' },
        { code: 'IEC 61508' },
      ],
      heroCtaLabel: 'Discuss Your Physical AI Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent assessor',
      heroScopeFoot: 'ISO/PAS 8800 · ISO/TR 5469',

      capsEyebrow: 'Core Capabilities',
      capsHeading: 'What we deliver for physical AI programs.',
      capsLead:
        'Integrating non-deterministic AI behavior into deterministic functional safety lifecycles and certifiable safety cases.',
      capsItems: [
        {
          icon: 'brain-circuit',
          code: 'AI functions',
          title: 'Safety Analysis of AI Functions',
          desc: 'Evaluating the unique failure modes of neural networks and complex machine-vision systems to design robust fallback strategies.',
        },
        {
          icon: 'shield-alert',
          code: 'Monitoring',
          title: 'Monitoring & Mitigation Concepts',
          desc: 'Independent hardware-based monitoring layers that wrap around AI components to force a safe state during an anomaly.',
        },
        {
          icon: 'git-merge',
          code: 'Lifecycle',
          title: 'Lifecycle Environmental Integration',
          desc: 'Seamlessly integrating non-deterministic AI behavior into conventional, deterministic functional safety lifecycles and safety cases.',
        },
      ],

      stdEyebrow: 'Primary Regulatory Guidance We Navigate',
      stdHeading: 'The physical AI safety framework.',
      stdLead:
        'The emerging guidance that governs safety-related applications of artificial intelligence in physical control systems.',
      stdItems: [
        {
          code: 'ISO/PAS 8800',
          desc: 'Road vehicles and safety-related applications of artificial intelligence.',
        },
        {
          code: 'ISO/IEC 22440',
          desc: 'Functional safety requirements for AI-equipped physical control systems.',
        },
        {
          code: 'ISO/TR 5469',
          desc: 'Artificial intelligence and foundational functional safety considerations.',
        },
        {
          code: 'IEC 61508 / ISO 13849',
          desc: 'Foundational systematic capability and Performance Level compliance targets.',
        },
      ],

      featKind: 'none',

      ctaEyebrow: 'Physical AI · Concept to certification',
      ctaHeading: 'Discuss your physical AI program.',
      ctaSub:
        'Bring us your perception stack, adaptive controller, or AI-equipped platform. We’ll map the path from AI failure-mode analysis to a defensible safety case.',
      ctaLabel: 'Discuss Your Physical AI Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Functional Safety for Physical AI & Adaptive Control | CSA',
        metaDescription:
          'Functional safety consulting for physical AI — managing the risk of AI perception, non-deterministic decisions & adaptation. ISO/PAS 8800, ISO/IEC 22440, ISO/TR 5469.',
      },
    },

    /* ============================================================
       06 · Construction & Mining Equipment
       ============================================================ */
    {
      title: 'Construction & Mining Equipment',
      slug: 'construction-mining-equipment',
      order: 6,
      navLabel: 'Construction & Mining Equipment',

      heroIcon: 'construction',
      heroEyebrow: 'Functional Safety · Construction & Mining',
      heroHeadline: 'Functional Safety for Construction and Mining Equipment',
      heroGhost: 'Heavy Equipment',
      heroTagline:
        'Reducing catastrophic risk and managing autonomy in harsh, high-energy environments.',
      heroIntro: rt(
        'Heavy machinery operates in unpredictable, high-power environments where functional safety is a fundamental design requirement — to protect human life and avoid catastrophic operational risk. We perform targeted safety engineering and identify operational risks for autonomous fleets, helping manufacturers move from concept to full international market certification.',
      ),
      heroStandards: [
        { code: 'ISO 17757' },
        { code: 'ISO 19014' },
        { code: 'ISO 21815' },
        { code: 'IEC 61508' },
      ],
      heroCtaLabel: 'Discuss Your Equipment Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent assessor',
      heroScopeFoot: 'ISO 17757 / 19014',

      capsEyebrow: 'Core Capabilities',
      capsHeading: 'What we deliver for heavy-equipment programs.',
      capsLead:
        'Targeted safety engineering for autonomous fleets in harsh, high-energy environments — concept to international market certification.',
      capsItems: [
        {
          icon: 'crosshair',
          code: 'PHA',
          title: 'Autonomous Fleet Hazard Analysis',
          desc: 'Preliminary Hazard Analysis and comprehensive risk assessments for machine autonomy, remote operation, and complex human-machine interaction.',
        },
        {
          icon: 'shield-check',
          code: 'Fail-safe',
          title: 'Fail-Safe Control Validation',
          desc: 'Verifying functional safety concepts for braking, steering, and high-energy fail-safe actuation, validating control systems under extreme operating conditions.',
        },
        {
          icon: 'route',
          code: 'Lifecycle',
          title: 'Lifecycle Safety Support',
          desc: 'Hands-on safety lifecycle management for autonomous haulage, drilling, and processing equipment to reduce long-term compliance costs.',
        },
      ],

      stdEyebrow: 'Primary Standards We Navigate',
      stdHeading: 'The heavy-equipment safety framework.',
      stdLead:
        'The standards that govern autonomous machine systems, control architectures, and collision avoidance for earth-moving equipment.',
      stdItems: [
        {
          code: 'ISO 17757',
          desc: 'Earth-moving machinery and autonomous machine system safety requirements.',
        },
        {
          code: 'ISO 19014 / ISO 21815',
          desc: 'Functional safety control architectures and collision avoidance for earth-moving equipment.',
        },
        {
          code: 'IEC 61508 / ISO 13849',
          desc: 'Foundational electronic functional safety and Performance Level validation.',
        },
      ],

      featKind: 'none',

      ctaEyebrow: 'Construction & Mining · Concept to certification',
      ctaHeading: 'Discuss your equipment program.',
      ctaSub:
        'Bring us your autonomous haulage, earth-moving, or processing platform. We’ll map the path from hazard analysis to international market certification.',
      ctaLabel: 'Discuss Your Equipment Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Functional Safety for Construction & Mining Equipment | CSA',
        metaDescription:
          'Functional safety consulting for autonomous construction and mining equipment. Hazard analysis, fail-safe control validation — ISO 17757, ISO 19014, ISO 21815, IEC 61508.',
      },
    },

    /* ============================================================
       07 · Automotive
       ============================================================ */
    {
      title: 'Automotive',
      slug: 'automotive',
      order: 7,
      navLabel: 'Automotive',

      heroIcon: 'car',
      heroEyebrow: 'Functional Safety · Automotive',
      heroHeadline: 'Functional Safety for Automotive and Next-Generation Mobility',
      heroGhost: 'Automotive',
      heroTagline:
        'Validating safety-critical requirements for autonomous vehicles, advanced ADAS, and electric vehicle platforms.',
      heroIntro: rt(
        'For the next generation of mobility, we provide deep subject-matter expertise as an independent challenger to your engineering team — validating the safety-critical requirements of autonomous delivery vehicles, heavy haul trucks, and advanced electronic architectures.',
      ),
      heroStandards: [{ code: 'ISO 26262' }, { code: 'ISO 21448' }, { code: 'IEC 61508' }],
      heroCtaLabel: 'Discuss Your Automotive Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent challenger',
      heroScopeFoot: 'ISO 26262 · SOTIF',

      capsEyebrow: 'Core Capabilities',
      capsHeading: 'What we deliver for automotive programs.',
      capsLead:
        'Independent challenge across HARA, autonomy software, and battery management for next-generation mobility platforms.',
      capsItems: [
        {
          icon: 'crosshair',
          code: 'HARA · FSC · TSC',
          title: 'Hazard Analysis & Concept Validation',
          desc: 'Automotive HARA plus complete Functional Safety Concept (FSC) and Technical Safety Concept (TSC) validation.',
        },
        {
          icon: 'code-2',
          code: 'ADAS · SW test',
          title: 'Autonomy Stack & Automotive Software Testing',
          desc: 'Independent safety analysis and software testing of ADAS, autonomy software stacks, and software-intensive electronic control layers.',
        },
        {
          icon: 'battery-charging',
          code: 'BMS',
          title: 'Battery Management Systems Assurance',
          desc: 'Functional safety validation and compliance plans for battery management systems, mitigating critical thermal and electrical hazards.',
        },
      ],

      stdEyebrow: 'Primary Standards We Navigate',
      stdHeading: 'The automotive safety framework.',
      stdLead:
        'The standards that govern E/E functional safety, safety of the intended functionality, and systematic software capability.',
      stdItems: [
        {
          code: 'ISO 26262',
          desc: 'The definitive standard for passenger and heavy-vehicle E/E functional safety.',
        },
        {
          code: 'ISO 21448 (SOTIF)',
          desc: 'Safety of the intended functionality against environmental non-determinism and operational risk.',
        },
        {
          code: 'IEC 61508',
          desc: 'Foundational electronic functional safety baseline used to verify systematic software capabilities.',
        },
      ],

      featKind: 'none',

      ctaEyebrow: 'Automotive · Concept to certification',
      ctaHeading: 'Discuss your automotive program.',
      ctaSub:
        'Bring us your autonomous vehicle, ADAS, or EV platform. We’ll act as the independent challenger from HARA through to validated safety evidence.',
      ctaLabel: 'Discuss Your Automotive Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Automotive Functional Safety & Software Testing | CSA',
        metaDescription:
          'Functional safety consulting for automotive and autonomous mobility — ISO 26262 HARA, SOTIF, ADAS and automotive software testing, plus battery management system assurance.',
      },
    },

    /* ============================================================
       08 · Defense
       ============================================================ */
    {
      title: 'Defense',
      slug: 'defense',
      order: 8,
      navLabel: 'Defense',

      heroIcon: 'shield',
      heroEyebrow: 'Functional Safety · Defense',
      heroHeadline: 'Functional Safety and Systems Assurance for Defense Platforms',
      heroGhost: 'Defense',
      heroTagline:
        'Rigorous, auditable safety analysis for mission-critical electromechanical and autonomous technologies.',
      heroIntro: rt(
        'In mission-critical defense applications, system reliability and safety-critical integrity are non-negotiable. We deliver the rigorous, auditable safety analysis and independent review high-stakes, MIL-SPEC technologies need to perform safely under pressure.',
      ),
      heroStandards: [{ code: 'MIL-STD-882' }, { code: 'DEF-STAN' }, { code: 'IEC 61508' }],
      heroCtaLabel: 'Discuss Your Defense Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent review',
      heroScopeFoot: 'MIL-STD-882',

      capsEyebrow: 'Core Capabilities',
      capsHeading: 'What we deliver for defense programs.',
      capsLead:
        'Rigorous, auditable safety analysis and independent review for high-stakes, MIL-SPEC electromechanical and autonomous technologies.',
      capsItems: [
        {
          icon: 'git-compare',
          code: 'V-model',
          title: 'Rigorous V-Model Validation',
          desc: 'Structured V-model verification and validation across complex hardware integrations, locking down system safety requirements early.',
        },
        {
          icon: 'clipboard-check',
          code: 'SSA',
          title: 'System Safety Assessments',
          desc: 'Comprehensive hazard tracking, independent safety audits, and systems-assurance evaluations across the full lifecycle.',
        },
        {
          icon: 'shield-check',
          code: 'Autonomy',
          title: 'Autonomous Platform Auditing',
          desc: 'Trusted third-party oversight and independent review for complex electromechanical and autonomous defense platforms.',
        },
      ],

      stdEyebrow: 'Primary Standards We Navigate',
      stdHeading: 'The defense safety framework.',
      stdLead:
        'The standards and program-specific guidelines that govern system safety and risk mitigation for defense platforms.',
      stdItems: [
        {
          code: 'MIL-STD-882',
          desc: 'DoD standard practice for system safety assessments and risk mitigation.',
        },
        {
          code: 'DEF-STANs',
          desc: 'Program-specific international defense safety guidelines and compliance targets.',
        },
        {
          code: 'IEC 61508',
          desc: 'Core electronic and programmable functional safety validation frameworks.',
        },
      ],

      featKind: 'none',

      ctaEyebrow: 'Defense · Concept to certification',
      ctaHeading: 'Discuss your defense program.',
      ctaSub:
        'Bring us your mission-critical electromechanical or autonomous platform. We’ll deliver the auditable safety analysis and independent review it demands.',
      ctaLabel: 'Discuss Your Defense Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Functional Safety & Systems Assurance for Defense | CSA',
        metaDescription:
          'Rigorous, auditable functional safety for defense platforms — MIL-STD-882 system safety assessments, V-model validation, and independent review of autonomous systems.',
      },
    },

    /* ============================================================
       09 · Process
       ============================================================ */
    {
      title: 'Process',
      slug: 'process',
      order: 9,
      navLabel: 'Process',

      heroIcon: 'factory',
      heroEyebrow: 'Functional Safety · Process Industry',
      heroHeadline: 'Functional Safety for the Process Industry',
      heroGhost: 'Process',
      heroTagline:
        'High-integrity protection systems that prevent catastrophic chemical and energy hazards.',
      heroIntro: rt(
        'Using IEC 61508 as our foundation, we help industrial firms manage the safety lifecycle of complex programmable electronic systems. We audit the requirements and architectures that protect people and the environment in high-stakes process industries — ensuring every potential failure mode is accounted for and mitigated.',
      ),
      heroStandards: [{ code: 'IEC 61511' }, { code: 'IEC 61508' }, { code: 'API RP 754' }],
      heroCtaLabel: 'Discuss Your Process Safety Program',
      heroCtaHref: 'Book a Consultation',
      heroScopeLabel: 'Engagement scope',
      heroScopeBadge: 'Independent auditor',
      heroScopeFoot: 'IEC 61511 / 61508',

      capsEyebrow: 'Core Capabilities',
      capsHeading: 'What we deliver for process programs.',
      capsLead:
        'Independent management of the safety lifecycle for complex programmable electronic systems in high-stakes process industries.',
      capsItems: [
        {
          icon: 'clipboard-check',
          code: 'Lifecycle audits',
          title: 'Safety Lifecycle Audits',
          desc: 'Independent audits of requirements, architectures, and safety processes against IEC 61511 / IEC 61508.',
        },
        {
          icon: 'gauge',
          code: 'SIL · LOPA',
          title: 'SIL Determination & LOPA',
          desc: 'Safety Integrity Level determination and Layer of Protection Analysis to size protection appropriately.',
        },
        {
          icon: 'shield-check',
          code: 'SIS / SIF',
          title: 'Safety Instrumented System (SIS/SIF) Validation',
          desc: 'Design review and compliance evidence for safety instrumented functions.',
        },
      ],

      stdEyebrow: 'Primary Standards We Navigate',
      stdHeading: 'The process safety framework.',
      stdLead:
        'The standards that govern the safety lifecycle, instrumented protection, and performance indicators for the process sector.',
      stdItems: [
        {
          code: 'IEC 61511',
          desc: 'Functional safety for the process industry sector.',
        },
        {
          code: 'IEC 61508',
          desc: 'Foundational electrical/electronic/programmable electronic safety lifecycle.',
        },
        {
          code: 'API RP 754',
          desc: 'Process safety performance indicators (supporting).',
        },
      ],

      featKind: 'none',

      ctaEyebrow: 'Process · Concept to certification',
      ctaHeading: 'Discuss your process safety program.',
      ctaSub:
        'Bring us your safety instrumented system, protection layer, or lifecycle audit. We’ll ensure every failure mode is accounted for and mitigated.',
      ctaLabel: 'Discuss Your Process Safety Program',
      ctaHref: 'Book a Consultation',

      seo: {
        metaTitle: 'Process Industry Functional Safety | IEC 61511 | CSA',
        metaDescription:
          'Functional safety consulting for process industries — IEC 61511/61508 safety lifecycle audits, SIL determination, LOPA, and safety instrumented system validation.',
      },
    },
  ],
}
