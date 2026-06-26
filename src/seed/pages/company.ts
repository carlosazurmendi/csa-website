/**
 * Seed — Company nav section page-collection.
 * One doc per sub-page (Overview, Experience, Services, Careers) in nav order.
 * Copy lifted verbatim from the design export:
 *   design-reference/project/Company/*.html + assets/company.jsx
 *   (Services categories also from assets/services.jsx).
 *
 * richText fields use the default Lexical editor state shape. `rt()` builds a
 * minimal valid SerializedEditorState from one or more paragraph strings.
 */

const para = (text: string) => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [
    {
      type: 'text',
      version: 1,
      text,
      detail: 0,
      format: 0,
      mode: 'normal' as const,
      style: '',
    },
  ],
})

const rt = (...paragraphs: string[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: paragraphs.map(para),
  },
})

export const seed = {
  collection: 'company',
  docs: [
    /* ============================================================
       1 · OVERVIEW
       ============================================================ */
    {
      title: 'Overview',
      slug: 'overview',
      order: 1,
      navLabel: 'Overview',

      heroGhost: 'CSA',
      heroIcon: 'compass',
      heroEyebrow: 'About CSA',
      heroTitle: 'Engineering a Safer Future.',
      heroTagline:
        'An independent functional safety consulting firm — auditing, reviewing, and validating safety-critical systems with strict technical objectivity.',
      heroIntro:
        'We move functional safety from a perceived regulatory burden to a core strategic advantage for technology leaders worldwide — bringing safety to advanced automation while maintaining a culture of integrity and professional respect.',
      heroActions: [
        { label: 'See Our Experience', href: 'Company/Experience.html', style: 'gold' },
        { label: 'Our Services', href: 'Company/Services.html', style: 'link' },
      ],
      hudTag: 'Operating principle',
      hudBadge: 'Technical objectivity',
      hudFoot: 'Independent by design',
      hudRows: [
        { icon: 'gavel', title: 'Independent challenger', description: 'We never build the product we assess.' },
        { icon: 'file-check', title: 'We audit, review & validate', description: 'We do not write software or code.' },
        { icon: 'shield-check', title: 'Quality you can trace', description: 'Workflows built to the intent of ISO 9001.' },
      ],

      missionNum: '01 — Mission',
      missionEyebrow: 'Our Mission',
      missionTitle: 'Democratizing functional safety.',
      missionBody: rt(
        'At CSA, we’re on a mission to democratize functional safety — moving it from a perceived regulatory burden to a core strategic advantage for technology leaders worldwide.',
        'We bring safety to advanced automation while maintaining a culture of integrity and professional respect — acting as a senior safety engineer in the room with you, not a vendor pitching from the outside.',
      ),

      philNum: '02 — Philosophy',
      philEyebrow: 'The CSA Philosophy',
      philTitle: 'Safety is a design feature, not a cost center.',
      philBody: rt(
        'Integrating safety requirements from a project’s inception improves reliability and reduces total cost of ownership by avoiding expensive rework after a system has been prototyped.',
      ),
      philBoundaryTitle: 'A clear professional boundary',
      philBoundaryBody: rt(
        'To maintain absolute technical objectivity, we do not write software or code. Instead, we act as the independent expert challengers who audit, review, and validate the requirements and hardware architectures your team develops.',
      ),

      valEyebrow: 'Core Values',
      valTitle: 'What we hold ourselves to.',
      valLead: 'Four principles that govern every engagement, every audit, and every sign-off.',
      valItems: [
        {
          icon: 'shield-check',
          title: 'Safety as a Design Feature',
          description:
            'We integrate safety early to improve system reliability and reduce long-term development costs — not as a late-stage cost center.',
        },
        {
          icon: 'scale',
          title: 'Integrity & Technical Objectivity',
          description:
            'Our independence lets us provide unbiased assessments that hold every requirement to the highest standards of proof.',
        },
        {
          icon: 'graduation-cap',
          title: 'Democratizing Expertise',
          description:
            'We simplify the complex safety lifecycle through practical training that empowers your internal teams.',
        },
        {
          icon: 'handshake',
          title: 'Professional Respect & Collaboration',
          description:
            'We act as a technical bridge between developers, system integrators, and third-party assessors.',
        },
      ],

      isoEyebrow: 'Quality management',
      isoBody: rt(
        'Our internal quality management protocols and engineering review workflows are explicitly structured to meet the intent of ISO 9001. We hold our independent safety audits and validation processes to the same rigorous benchmarks of traceability and quality assurance that we verify for our clients.',
      ),

      closeEyebrow: 'About CSA · Get to know us',
      closeTitle: 'Trusted systems safety, end to end.',
      closeSub:
        'Meet the principal engineers behind CSA, or see the certification work we’ve delivered across the world’s most critical systems.',
      closeActions: [
        { label: 'Meet the Team', href: 'Company/Overview.html', style: 'gold' },
        { label: 'See Our Experience', href: 'Company/Experience.html', style: 'silver' },
      ],

      seo: {
        metaTitle: 'About CSA | Independent Functional Safety Firm',
        metaDescription:
          'Critical Systems Analysis is an independent functional safety consulting firm — auditing, reviewing, and validating safety-critical systems with strict technical objectivity.',
      },
    },

    /* ============================================================
       2 · EXPERIENCE
       ============================================================ */
    {
      title: 'Experience',
      slug: 'experience',
      order: 2,
      navLabel: 'Experience',

      heroGhost: 'EXPERIENCE',
      heroIcon: 'award',
      heroEyebrow: 'Company · Experience',
      heroTitle: 'Deep, Hands-On Certification Experience',
      heroTagline:
        'Our team brings proven functional safety certification experience across the world’s most innovative sectors.',
      heroStandards: [
        { code: 'IEC 61508' },
        { code: 'ISO 13849' },
        { code: 'ISO 26262' },
        { code: 'ISO 3691-4' },
        { code: 'EN 50128' },
      ],
      heroActions: [
        { label: 'Discuss Your Project', href: 'Book a Consultation.html', style: 'gold' },
        { label: 'Our Services', href: 'Company/Services.html', style: 'link' },
      ],
      hudTag: 'Systems we have certified',
      hudBadge: 'Proven record',
      hudFoot: 'Decades of combined experience',
      hudRows: [
        { icon: 'bot', title: 'Humanoid & collaborative robots', description: 'Including a first-of-its-kind AMR certification.' },
        { icon: 'truck', title: 'Heavy haul & autonomous fleets', description: 'Mining, delivery, and on-road platforms.' },
        { icon: 'battery-charging', title: 'BMS & rail signaling systems', description: 'Across the U.S., Canada, and Europe.' },
      ],

      capsEyebrow: 'Where We’ve Delivered',
      capsTitle: 'Certification across high-stakes sectors.',
      capsLead:
        'From bipedal humanoids to autonomous haul trucks, our principal engineers have validated the most advanced machinery in existence.',
      capsItems: [
        {
          icon: 'bot',
          code: 'Robotics',
          title: 'Robotics',
          description: 'Autonomous mobile robots (AMRs), humanoid robots, and collaborative industrial systems.',
        },
        {
          icon: 'truck',
          code: 'Transport',
          title: 'Transport',
          description: 'Autonomous delivery vehicles, heavy haul trucks, and rail signaling systems.',
        },
        {
          icon: 'cpu',
          code: 'Infrastructure',
          title: 'Infrastructure',
          description: 'Battery management systems (BMS), agricultural automation, and industrial machinery.',
        },
        {
          icon: 'book-check',
          code: 'Standards',
          title: 'Standards Mastery',
          description: 'Expert navigation of IEC 61508, ISO 13849, ISO 26262, ISO 3691-4, and EN 50128.',
        },
      ],

      caseEyebrow: 'Case Studies',
      caseTitle: 'Independent validation, proven in the field.',
      caseLead:
        'High-level overviews of our independent validation work across high-stakes autonomous deployments.',
      caseItems: [
        {
          tag: 'Robotics · IEC 61508',
          title: 'Collaborative Autonomous Mobile Robot Certification',
          problem:
            'Deploying AMRs into high-speed, human-shared facility environments without a mature regulatory blueprint or independent validation framework.',
          solution:
            'Executed rigorous safety audits, managed requirements traceability, and led third-party assessment interfaces to achieve the first-ever IEC 61508 certification for a collaborative AMR.',
        },
        {
          tag: 'Construction & Mining · International market',
          title: 'Heavy Mining Equipment Autonomous Fleet Certification',
          problem:
            'Transitioning high-energy haulage and drilling machinery to full autonomy in harsh, unpredictable environments with zero legacy safety infrastructure.',
          solution:
            'Established full functional safety lifecycles, performed systematic Preliminary Hazard Analyses, and guided the platform to full international market certification.',
        },
      ],
      caseNote:
        'More case studies on the way. Additional case studies to be added from the CSA case study library.',

      closeEyebrow: 'Experience · Your program next',
      closeTitle: 'Put this experience to work.',
      closeSub:
        'Bring us your safety-critical program. We’ll map the path from where you are to a certifiable, audit-ready safety case.',
      closeActions: [{ label: 'Discuss Your Project', href: 'Book a Consultation.html', style: 'gold' }],

      seo: {
        metaTitle: 'Our Experience & Case Studies | CSA',
        metaDescription:
          'Hands-on functional safety certification experience across robotics, transport, and infrastructure — including the first-ever IEC 61508 certification for a collaborative AMR.',
      },
    },

    /* ============================================================
       3 · SERVICES
       ============================================================ */
    {
      title: 'Services',
      slug: 'services',
      order: 3,
      navLabel: 'Services',

      heroGhost: 'SERVICES',
      heroIcon: 'settings-2',
      heroEyebrow: 'Company · Services',
      heroTitle: 'Flexible Functional Safety Engineering Services',
      heroTagline:
        'A flexible range of engagement models built around the specific safety-critical needs of engineering teams worldwide.',
      heroIntro:
        'Whether you need a short-term audit or a long-term embedded partner, we provide the technical authority to navigate complex global standards with confidence.',
      heroStandards: [
        { code: 'IEC 61508' },
        { code: 'ISO 26262' },
        { code: 'ISO 13849' },
        { code: 'IEC 62061' },
      ],
      heroActions: [
        { label: 'Book a Consultation', href: 'Book a Consultation.html', style: 'gold' },
        { label: 'See Our Experience', href: 'Company/Experience.html', style: 'link' },
      ],
      hudTag: 'How we engage',
      hudBadge: 'Flexible',
      hudFoot: 'Senior capacity, on your terms',
      hudRows: [
        { icon: 'git-compare', title: 'Audit to embedded partner', description: 'Scale from a one-time review to ongoing support.' },
        { icon: 'user-check', title: 'Principal-led throughout', description: 'Senior safety engineers, never juniors.' },
        { icon: 'shield-check', title: 'Independent & audit-ready', description: 'Evidence assessors and regulators expect.' },
      ],

      svcEyebrow: 'What we do',
      svcTitle: 'Functional safety services.',
      svcLead: 'Principal-led functional safety engineering consulting across the full system lifecycle.',
      svcCategories: [
        {
          icon: 'wrench',
          title: 'Engineering',
          description:
            'We embed directly with your team to execute safety work products and analysis as if we were internal staff.',
          points: [
            { text: 'Hands-on safety engineering: HARA, FMEA/FMEDA, fault tree analysis (FTA), and requirements traceability' },
            { text: 'Develop, complete, and maintain required safety artifacts and documentation' },
            { text: 'Work closely with systems, software, hardware, and operations teams to influence design decisions early' },
            { text: 'Interface directly with third-party assessors, certifiers, and auditors' },
            { text: 'Support compliance, certification, and regulator-facing activities' },
          ],
          bestFor: 'Teams without safety engineers, or safety teams short on bandwidth.',
        },
        {
          icon: 'compass',
          title: 'Consulting',
          description:
            'Strategic and technical safety guidance across the full system lifecycle — from concept through deployment and operation.',
          points: [
            { text: 'Functional and system safety strategy' },
            { text: 'Safety architecture and requirements advisory' },
            { text: 'Compliance strategy for international standards (IEC 61508, ISO 26262, ISO 13849, IEC 62061)' },
            { text: 'Safety support for novel, autonomous, and public-facing systems' },
          ],
          bestFor:
            'Teams with existing safety knowledge seeking expert backup to avoid mistakes, or a second opinion alongside other consultants.',
        },
        {
          icon: 'clipboard-check',
          title: 'Auditing',
          description:
            'Independent, objective assessments that build confidence in both technical safety and organizational competence.',
          points: [
            { text: 'Safety gap analyses and maturity assessments' },
            { text: 'Independent safety audits and technical reviews' },
            { text: 'Certification and regulatory readiness evaluations' },
            { text: 'Review of safety processes, artifacts, and governance' },
            { text: 'Trusted third-party oversight for critical programs' },
          ],
          bestFor:
            'Teams with some safety artifacts but needing direction to reach their safety goals — and industries where external review is required by the safety lifecycle.',
        },
        {
          icon: 'graduation-cap',
          title: 'Training',
          description:
            'Practical, engineering-driven functional safety training that translates standards into real-world practice.',
          points: [
            { text: 'Functional and system safety training (introductory to advanced)' },
            { text: 'Customized training for specific industries, products, or technologies' },
            { text: 'Workshops for engineering teams and technical leadership' },
            { text: 'Focus on failure modes, lessons learned, and defensible decision-making' },
          ],
        },
      ],

      engEyebrow: 'Engagement Models',
      engTitle: 'Four ways to bring CSA in.',
      engLead:
        'Each model delivers principal-led functional safety capacity — matched to your team’s resources, schedule, and certification goals.',
      engModels: [
        {
          icon: 'clipboard-check',
          title: 'Independent Safety Audit',
          description:
            'The objective, independent review required by international standards like IEC 61508 and ISO 26262. We conduct thorough gap analyses and hardware safety validations to ensure your system architecture is robust and audit-ready.',
          bestFor: 'Teams needing certifiable, independent validation.',
        },
        {
          icon: 'users-round',
          title: 'Embedded Engineering Support',
          description:
            'For teams facing resource gaps or schedule pressure, we become a seamless extension of your internal design team — providing senior-level functional safety capacity that works reliably without constant oversight, acting in your best interest like an internal employee.',
          bestFor: 'Teams without safety engineers, or short on bandwidth.',
        },
        {
          icon: 'git-pull-request-arrow',
          title: 'Technical Liaison for Assessors',
          description:
            'We act as your technical bridge through the certification process — ensuring your safety arguments are well-documented and your technical evidence is presented clearly to satisfy global assessors.',
          bestFor: 'Teams navigating third-party certification.',
        },
        {
          icon: 'crosshair',
          title: 'Expert Contract Engagement',
          description:
            'Access principal-led safety engineering on a contract basis for specialized tasks, including independent facilitation of FMEA and FTA workshops to challenge internal assumptions and identify risks early in the design phase.',
          bestFor: 'Teams with high-stakes, time-boxed analytical needs.',
        },
      ],

      closeEyebrow: 'Services · Scope your engagement',
      closeTitle: 'Find the right model for your team.',
      closeSub:
        'Tell us about your system and timeline. We’ll recommend the engagement model that gets you to a defensible safety case fastest.',
      closeActions: [{ label: 'Book a Consultation', href: 'Book a Consultation.html', style: 'gold' }],

      seo: {
        metaTitle: 'Functional Safety Services & Engagement Models | CSA',
        metaDescription:
          'Flexible functional safety engineering consulting — independent safety audits, embedded engineering support, assessor liaison, and contract FMEA/FTA facilitation.',
      },
    },

    /* ============================================================
       4 · CAREERS
       ============================================================ */
    {
      title: 'Careers',
      slug: 'careers',
      order: 4,
      navLabel: 'Careers',

      heroGhost: 'CAREERS',
      heroIcon: 'compass',
      heroEyebrow: 'Company · Careers',
      heroTitle: 'Build the Future of Safe Automation',
      heroTagline: 'We don’t look for rigid corporate checkbox regulators.',
      heroIntro:
        'We seek elite engineers, independent technical minds, and safety authorities who want to apply rigorous systems engineering to the world’s most innovative autonomous platforms.',
      heroActions: [
        { label: 'View Open Roles', href: '#roles', style: 'gold' },
        { label: 'Why CSA', href: 'Company/Overview.html', style: 'link' },
      ],
      hudTag: 'Who we hire',
      hudBadge: 'We’re hiring',
      hudFoot: 'Independence, applied',
      hudRows: [
        { icon: 'cpu', title: 'Elite engineers & independent minds', description: 'Not checkbox regulators.' },
        { icon: 'shield-check', title: 'Safety authorities', description: 'People who challenge internal assumptions.' },
        { icon: 'git-branch', title: 'Systems-engineering rigor', description: 'Applied to the most advanced platforms.' },
      ],

      capsEyebrow: 'Why Elite Engineers Build Careers at CSA',
      capsTitle: 'Ownership, impact, and autonomy.',
      capsLead:
        'We trust our people implicitly and put them on the most consequential safety work in the industry.',
      capsItems: [
        {
          icon: 'key-round',
          code: 'Ownership',
          title: 'Complete Project Ownership',
          description:
            'We trust our people implicitly, granting you total technical ownership to manage safety lifecycles and deliver audit-defensible results the way you know how.',
        },
        {
          icon: 'bot',
          code: 'Impact',
          title: 'Work on Revolutionary Systems',
          description:
            'From bipedal humanoid robots and heavy autonomous haul trucks to cutting-edge EV battery management layers, you’ll evaluate the most advanced machinery in existence.',
        },
        {
          icon: 'clock',
          code: 'Autonomy',
          title: 'Schedule Autonomy & Balance',
          description:
            'We trust our team to responsibly manage their own time and schedules. We value high-integrity safety outcomes over rigid office hours.',
        },
        {
          icon: 'trending-up',
          code: 'Growth',
          title: 'Elite Professional Growth',
          description:
            'Work directly alongside recognized safety engineering authorities, with real career-development opportunities as we build something exceptional together.',
        },
      ],

      roleEyebrow: 'Open Positions',
      roleTitle: 'Find your role.',
      roleLead:
        'Open roles are managed in our CMS and populated from the current job descriptions. The cards below illustrate the structure — title, location, summary, and a direct apply link.',
      roleItems: [
        {
          dept: 'Robotics',
          loc: 'Remote · U.S. / Canada / Europe',
          type: 'Full-time',
          title: 'Senior Functional Safety Engineer — Robotics',
          description:
            'Lead hazard analysis, requirements traceability, and verification for AMRs and collaborative systems; interface directly with third-party assessors.',
        },
        {
          dept: 'Rail',
          loc: 'Remote · U.S. / Canada / Europe',
          type: 'Full-time',
          title: 'Independent Safety Assessor — Rail',
          description:
            'Own ISA reviews and lifecycle audits across signaling and train-control programs under EN 50126 / 50128 / 50129.',
        },
        {
          dept: 'Autonomy',
          loc: 'Remote · U.S. / Canada / Europe',
          type: 'Contract',
          title: 'Safety Engineer — Autonomous Mobility',
          description:
            'Facilitate FMEA / FTA workshops and validate functional safety concepts for autonomous on- and off-road platforms.',
        },
      ],
      roleNote:
        'Roles update as we grow. Live openings are populated from the CSA hiring system — check back, or reach out if you believe you belong here.',

      closeEyebrow: 'Careers · Join CSA',
      closeTitle: 'Apply rigorous engineering to what matters.',
      closeSub:
        'If you want total ownership over the safety of the world’s most advanced autonomous systems, we want to hear from you.',
      closeActions: [{ label: 'View Open Roles', href: '#roles', style: 'gold' }],

      seo: {
        metaTitle: 'Careers in Functional Safety Engineering | CSA',
        metaDescription:
          'Build the future of safe automation. CSA hires elite safety engineers and independent technical minds for the world’s most advanced autonomous platforms. Explore open roles.',
      },
    },
  ],
}
