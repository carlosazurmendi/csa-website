import type { Payload } from 'payload'

/**
 * Seeds the Company section: upserts the four Company globals with the real
 * copy from the design export (Company/Overview|Experience|Services|Careers.html
 * + assets/company.jsx), and clears + reseeds the `teamMembers` and
 * `jobPostings` collections. Case studies are seeded elsewhere (src/seed/index.ts)
 * and are intentionally NOT touched here.
 *
 * Idempotent: globals are upserted; the two collections are deleted-then-created.
 */

// ---- Lexical rich-text helpers (mirrors src/seed/index.ts) ------------------
type Run = { text: string; bold?: boolean; italic?: boolean; color?: string }
const textNode = (r: Run) => ({
  type: 'text',
  text: r.text,
  // Lexical format bitmask: bold=1, italic=2.
  format: (r.bold ? 1 : 0) | (r.italic ? 2 : 0),
  detail: 0,
  mode: 'normal',
  style: r.color ? `color: ${r.color};` : '',
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

const labels = (items: string[]) => items.map((label) => ({ label }))

export async function seedCompany(payload: Payload): Promise<void> {
  payload.logger.info('— Seeding Company section —')

  // ===========================================================================
  // GLOBAL: companyAbout (Company → Overview)
  // ===========================================================================
  await payload.updateGlobal({
    slug: 'companyAbout',
    data: {
      hero: {
        ghost: 'CSA',
        icon: 'compass',
        eyebrow: 'About CSA',
        title: 'Engineering a Safer Future.',
        tagline:
          'An independent functional safety consulting firm — auditing, reviewing, and validating safety-critical systems with strict technical objectivity.',
        intro:
          'We move functional safety from a perceived regulatory burden to a core strategic advantage for technology leaders worldwide — bringing safety to advanced automation while maintaining a culture of integrity and professional respect.',
        primaryCtaLabel: 'See Our Experience',
        primaryCtaHref: '/company/experience',
        secondaryCtaLabel: 'Our Services',
        secondaryCtaHref: '/company/services',
        hud: {
          tag: 'Operating principle',
          badge: 'Technical objectivity',
          foot: 'Independent by design',
          rows: [
            { icon: 'gavel', t: 'Independent challenger', d: 'We never build the product we assess.' },
            { icon: 'file-check', t: 'We audit, review & validate', d: 'We do not write software or code.' },
            { icon: 'shield-check', t: 'Quality you can trace', d: 'Workflows built to the intent of ISO 9001.' },
          ],
        },
      },
      mission: {
        num: '01 — Mission',
        eyebrow: 'Our Mission',
        title: 'Democratizing functional safety.',
        body: richText([
          [
            { text: 'At CSA, we’re on a mission to ' },
            { text: 'democratize functional safety', bold: true },
            {
              text: ' — moving it from a perceived regulatory burden to a core strategic advantage for technology leaders worldwide.',
            },
          ],
          [
            { text: 'We bring safety to advanced automation while maintaining a culture of ' },
            { text: 'integrity and professional respect', italic: true },
            {
              text: ' — acting as a senior safety engineer in the room with you, not a vendor pitching from the outside.',
            },
          ],
        ]),
      },
      philosophy: {
        num: '02 — Philosophy',
        eyebrow: 'The CSA Philosophy',
        title: 'Safety is a design feature, not a cost center.',
        body: richText([
          [
            { text: 'Integrating safety requirements from a project’s inception ' },
            { text: 'improves reliability and reduces total cost of ownership', bold: true },
            { text: ' by avoiding expensive rework after a system has been prototyped.' },
          ],
        ]),
        boundary: {
          icon: 'git-fork',
          title: 'A clear professional boundary',
          body: richText([
            [
              { text: 'To maintain absolute technical objectivity, ' },
              { text: 'we do not write software or code.', bold: true, color: 'var(--fg-1)' },
              {
                text: ' Instead, we act as the independent expert challengers who audit, review, and validate the requirements and hardware architectures your team develops.',
              },
            ],
          ]),
        },
      },
      values: {
        eyebrow: 'Core Values',
        title: 'What we hold ourselves to.',
        lead: 'Four principles that govern every engagement, every audit, and every sign-off.',
        items: [
          {
            icon: 'shield-check',
            t: 'Safety as a Design Feature',
            d: 'We integrate safety early to improve system reliability and reduce long-term development costs — not as a late-stage cost center.',
          },
          {
            icon: 'scale',
            t: 'Integrity & Technical Objectivity',
            d: 'Our independence lets us provide unbiased assessments that hold every requirement to the highest standards of proof.',
          },
          {
            icon: 'graduation-cap',
            t: 'Democratizing Expertise',
            d: 'We simplify the complex safety lifecycle through practical training that empowers your internal teams.',
          },
          {
            icon: 'handshake',
            t: 'Professional Respect & Collaboration',
            d: 'We act as a technical bridge between developers, system integrators, and third-party assessors.',
          },
        ],
      },
      iso: {
        icon: 'badge-check',
        eyebrow: 'Quality management',
        body: richText([
          [
            {
              text: 'Our internal quality management protocols and engineering review workflows are explicitly structured to meet the ',
            },
            { text: 'intent of ISO 9001', bold: true },
            {
              text: '. We hold our independent safety audits and validation processes to the same rigorous benchmarks of traceability and quality assurance that we verify for our clients.',
            },
          ],
        ]),
      },
      closing: {
        eyebrow: 'About CSA · Get to know us',
        title: 'Trusted systems safety, end to end.',
        sub: 'Meet the principal engineers behind CSA, or see the certification work we’ve delivered across the world’s most critical systems.',
        primaryLabel: 'Meet the Team',
        primaryHref: '#',
        secondaryLabel: 'See Our Experience',
        secondaryHref: '/company/experience',
      },
      meta: {
        title: 'About CSA | Independent Functional Safety Firm',
        description:
          'Critical Systems Analysis is an independent functional safety consulting firm — auditing, reviewing, and validating safety-critical systems with strict technical objectivity.',
      },
    },
  })

  // ===========================================================================
  // GLOBAL: companyExperience (Company → Experience)
  // ===========================================================================
  await payload.updateGlobal({
    slug: 'companyExperience',
    data: {
      hero: {
        ghost: 'EXPERIENCE',
        icon: 'award',
        eyebrow: 'Company · Experience',
        title: 'Deep, Hands-On Certification Experience',
        tagline:
          'Our team brings proven functional safety certification experience across the world’s most innovative sectors.',
        standards: labels(['IEC 61508', 'ISO 13849', 'ISO 26262', 'ISO 3691-4', 'EN 50128']),
        primaryCtaLabel: 'Discuss Your Project',
        primaryCtaHref: '#',
        secondaryCtaLabel: 'Our Services',
        secondaryCtaHref: '/company/services',
        hud: {
          tag: 'Systems we have certified',
          badge: 'Proven record',
          foot: 'Decades of combined experience',
          rows: [
            { icon: 'bot', t: 'Humanoid & collaborative robots', d: 'Including a first-of-its-kind AMR certification.' },
            { icon: 'truck', t: 'Heavy haul & autonomous fleets', d: 'Mining, delivery, and on-road platforms.' },
            { icon: 'battery-charging', t: 'BMS & rail signaling systems', d: 'Across the U.S., Canada, and Europe.' },
          ],
        },
      },
      delivered: {
        eyebrow: "Where We’ve Delivered",
        title: 'Certification across high-stakes sectors.',
        lead: 'From bipedal humanoids to autonomous haul trucks, our principal engineers have validated the most advanced machinery in existence.',
        items: [
          {
            icon: 'bot',
            code: 'Robotics',
            t: 'Robotics',
            d: 'Autonomous mobile robots (AMRs), humanoid robots, and collaborative industrial systems.',
          },
          {
            icon: 'truck',
            code: 'Transport',
            t: 'Transport',
            d: 'Autonomous delivery vehicles, heavy haul trucks, and rail signaling systems.',
          },
          {
            icon: 'cpu',
            code: 'Infrastructure',
            t: 'Infrastructure',
            d: 'Battery management systems (BMS), agricultural automation, and industrial machinery.',
          },
          {
            icon: 'book-check',
            code: 'Standards',
            t: 'Standards Mastery',
            d: 'Expert navigation of IEC 61508, ISO 13849, ISO 26262, ISO 3691-4, and EN 50128.',
          },
        ],
      },
      cases: {
        eyebrow: 'Case Studies',
        title: 'Independent validation, proven in the field.',
        lead: 'High-level overviews of our independent validation work across high-stakes autonomous deployments.',
        note: {
          icon: 'folder-plus',
          bold: 'More case studies on the way.',
          text: 'Additional case studies to be added from the CSA case study library.',
        },
      },
      closing: {
        eyebrow: 'Experience · Your program next',
        title: 'Put this experience to work.',
        sub: 'Bring us your safety-critical program. We’ll map the path from where you are to a certifiable, audit-ready safety case.',
        primaryLabel: 'Discuss Your Project',
        primaryHref: '#',
      },
      meta: {
        title: 'Our Experience | Functional Safety Certification',
        description:
          'Proven functional safety certification experience across robotics, transport, and infrastructure — including a first-of-its-kind collaborative AMR certification under IEC 61508.',
      },
    },
  })

  // ===========================================================================
  // GLOBAL: companyServices (Company → Services)
  // ===========================================================================
  await payload.updateGlobal({
    slug: 'companyServices',
    data: {
      hero: {
        ghost: 'SERVICES',
        icon: 'settings-2',
        eyebrow: 'Company · Services',
        title: 'Flexible Functional Safety Engineering Services',
        tagline:
          'A flexible range of engagement models built around the specific safety-critical needs of engineering teams worldwide.',
        intro:
          'Whether you need a short-term audit or a long-term embedded partner, we provide the technical authority to navigate complex global standards with confidence.',
        standards: labels(['IEC 61508', 'ISO 26262', 'ISO 13849', 'IEC 62061']),
        primaryCtaLabel: 'Book a Consultation',
        primaryCtaHref: '#',
        secondaryCtaLabel: 'See Our Experience',
        secondaryCtaHref: '/company/experience',
        hud: {
          tag: 'How we engage',
          badge: 'Flexible',
          foot: 'Senior capacity, on your terms',
          rows: [
            { icon: 'git-compare', t: 'Audit to embedded partner', d: 'Scale from a one-time review to ongoing support.' },
            { icon: 'user-check', t: 'Principal-led throughout', d: 'Senior safety engineers, never juniors.' },
            { icon: 'shield-check', t: 'Independent & audit-ready', d: 'Evidence assessors and regulators expect.' },
          ],
        },
      },
      models: {
        eyebrow: 'Engagement Models',
        title: 'Four ways to bring CSA in.',
        lead: 'Each model delivers principal-led functional safety capacity — matched to your team’s resources, schedule, and certification goals.',
        items: [
          {
            icon: 'clipboard-check',
            t: 'Independent Safety Audit',
            d: 'The objective, independent review required by international standards like IEC 61508 and ISO 26262. We conduct thorough gap analyses and hardware safety validations to ensure your system architecture is robust and audit-ready.',
            best: 'Teams needing certifiable, independent validation.',
          },
          {
            icon: 'users-round',
            t: 'Embedded Engineering Support',
            d: 'For teams facing resource gaps or schedule pressure, we become a seamless extension of your internal design team — providing senior-level functional safety capacity that works reliably without constant oversight, acting in your best interest like an internal employee.',
            best: 'Teams without safety engineers, or short on bandwidth.',
          },
          {
            icon: 'git-pull-request-arrow',
            t: 'Technical Liaison for Assessors',
            d: 'We act as your technical bridge through the certification process — ensuring your safety arguments are well-documented and your technical evidence is presented clearly to satisfy global assessors.',
            best: 'Teams navigating third-party certification.',
          },
          {
            icon: 'crosshair',
            t: 'Expert Contract Engagement',
            d: 'Access principal-led safety engineering on a contract basis for specialized tasks, including independent facilitation of FMEA and FTA workshops to challenge internal assumptions and identify risks early in the design phase.',
            best: 'Teams with high-stakes, time-boxed analytical needs.',
          },
        ],
      },
      closing: {
        eyebrow: 'Services · Scope your engagement',
        title: 'Find the right model for your team.',
        sub: 'Tell us about your system and timeline. We’ll recommend the engagement model that gets you to a defensible safety case fastest.',
        primaryLabel: 'Book a Consultation',
        primaryHref: '#',
      },
      meta: {
        title: 'Our Services | Functional Safety Engagement Models',
        description:
          'Flexible functional safety engagement models — independent safety audits, embedded engineering support, technical liaison for assessors, and expert contract engagements.',
      },
    },
  })

  // ===========================================================================
  // GLOBAL: careersIntro (Company → Careers)
  // ===========================================================================
  await payload.updateGlobal({
    slug: 'careersIntro',
    data: {
      hero: {
        ghost: 'CAREERS',
        icon: 'compass',
        eyebrow: 'Company · Careers',
        title: 'Build the Future of Safe Automation',
        tagline: 'We don’t look for rigid corporate checkbox regulators.',
        intro:
          'We seek elite engineers, independent technical minds, and safety authorities who want to apply rigorous systems engineering to the world’s most innovative autonomous platforms.',
        primaryCtaLabel: 'View Open Roles',
        secondaryCtaLabel: 'Why CSA',
        secondaryCtaHref: '/company',
        hud: {
          tag: 'Who we hire',
          badge: "We're hiring",
          foot: 'Independence, applied',
          rows: [
            { icon: 'cpu', t: 'Elite engineers & independent minds', d: 'Not checkbox regulators.' },
            { icon: 'shield-check', t: 'Safety authorities', d: 'People who challenge internal assumptions.' },
            { icon: 'git-branch', t: 'Systems-engineering rigor', d: 'Applied to the most advanced platforms.' },
          ],
        },
      },
      why: {
        eyebrow: 'Why Elite Engineers Build Careers at CSA',
        title: 'Ownership, impact, and autonomy.',
        lead: 'We trust our people implicitly and put them on the most consequential safety work in the industry.',
        items: [
          {
            icon: 'key-round',
            code: 'Ownership',
            t: 'Complete Project Ownership',
            d: 'We trust our people implicitly, granting you total technical ownership to manage safety lifecycles and deliver audit-defensible results the way you know how.',
          },
          {
            icon: 'bot',
            code: 'Impact',
            t: 'Work on Revolutionary Systems',
            d: 'From bipedal humanoid robots and heavy autonomous haul trucks to cutting-edge EV battery management layers, you’ll evaluate the most advanced machinery in existence.',
          },
          {
            icon: 'clock',
            code: 'Autonomy',
            t: 'Schedule Autonomy & Balance',
            d: 'We trust our team to responsibly manage their own time and schedules. We value high-integrity safety outcomes over rigid office hours.',
          },
          {
            icon: 'trending-up',
            code: 'Growth',
            t: 'Elite Professional Growth',
            d: 'Work directly alongside recognized safety engineering authorities, with real career-development opportunities as we build something exceptional together.',
          },
        ],
      },
      roles: {
        eyebrow: 'Open Positions',
        title: 'Find your role.',
        lead: 'Open roles are managed in our CMS and populated from the current job descriptions. The cards below illustrate the structure — title, location, summary, and a direct apply link.',
        note: {
          icon: 'briefcase',
          bold: 'Roles update as we grow.',
          text: 'Live openings are populated from the CSA hiring system — check back, or reach out if you believe you belong here.',
        },
      },
      closing: {
        eyebrow: 'Careers · Join CSA',
        title: 'Apply rigorous engineering to what matters.',
        sub: 'If you want total ownership over the safety of the world’s most advanced autonomous systems, we want to hear from you.',
        primaryLabel: 'View Open Roles',
      },
      meta: {
        title: 'Careers | Build the Future of Safe Automation',
        description:
          'Join CSA. We seek elite engineers, independent technical minds, and safety authorities who want to apply rigorous systems engineering to the world’s most innovative autonomous platforms.',
      },
    },
  })

  // ===========================================================================
  // COLLECTION: teamMembers (clear + reseed)
  // ===========================================================================
  await payload.delete({ collection: 'teamMembers', where: { id: { exists: true } } })

  // Founder, mirrored from the Home About section copy.
  await payload.create({
    collection: 'teamMembers',
    data: {
      name: 'Ben Twombly',
      role: 'Founder & CEO',
      order: 0,
      bio: 'Ben Twombly is the CEO and founder of Critical Systems Analysis, a functional safety consulting firm based in Sarasota, Florida. He holds an FS Engineer certification from TÜV Rheinland and the Industrial Functional Safety Professional (IFSP) certification. Before co-founding CSA in May 2023, he spent six years as a Senior Safety Engineer at TÜV Rheinland, preparing clients for safety assessments across a wide range of safety-critical systems. He earned his degree in robotics from the Colorado School of Mines.',
      credentials: labels(['FS Engineer (TÜV Rheinland)', 'IFSP', 'B.S. Robotics — Colorado School of Mines']),
      location: 'Sarasota, FL',
    },
  })

  // ===========================================================================
  // COLLECTION: jobPostings (clear + reseed — sample roles from the design)
  // ===========================================================================
  await payload.delete({ collection: 'jobPostings', where: { id: { exists: true } } })

  const jobs = [
    {
      title: 'Senior Functional Safety Engineer — Robotics',
      location: 'Remote · U.S. / Canada / Europe',
      summary:
        'Lead hazard analysis, requirements traceability, and verification for AMRs and collaborative systems; interface directly with third-party assessors.',
      applyLink: '#',
    },
    {
      title: 'Independent Safety Assessor — Rail',
      location: 'Remote · U.S. / Canada / Europe',
      summary:
        'Own ISA reviews and lifecycle audits across signaling and train-control programs under EN 50126 / 50128 / 50129.',
      applyLink: '#',
    },
    {
      title: 'Safety Engineer — Autonomous Mobility',
      location: 'Remote · U.S. / Canada / Europe',
      summary:
        'Facilitate FMEA / FTA workshops and validate functional safety concepts for autonomous on- and off-road platforms.',
      applyLink: '#',
    },
  ]
  for (let i = 0; i < jobs.length; i++) {
    await payload.create({ collection: 'jobPostings', data: { ...jobs[i], order: i } })
  }

  payload.logger.info('— Company section seeded —')
}
