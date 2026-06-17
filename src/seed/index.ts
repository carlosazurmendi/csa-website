/**
 * Idempotent seed: fills every global and collection with the real copy from
 * the design export so the client opens the CMS to a fully-populated site.
 *
 * Run with:  npm run seed   (→ payload run ./src/seed/index.ts)
 *
 * Idempotency: content collections are cleared and recreated each run; globals
 * are upserted; the logo media + admin user are created only if missing.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

import { seedConsulting } from './sections/consulting'
import { seedCompany } from './sections/company'
import { seedResources } from './sections/resources'
import { seedTraining } from './sections/training'
import { seedLegal } from './sections/legal'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '..', '..')

// ---- Lexical rich-text helpers ----------------------------------------------
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

const arr = (items: string[]) => items.map((label) => ({ label }))

// =============================================================================
const payload = await getPayload({ config })
payload.logger.info('— CSA seed starting —')

// ---- Admin user -------------------------------------------------------------
const userCount = await payload.count({ collection: 'users' })
if (userCount.totalDocs === 0) {
  await payload.create({
    collection: 'users',
    data: { email: 'admin@csa.test', password: 'changeme123', name: 'CSA Admin' },
  })
  payload.logger.info('Created admin user admin@csa.test / changeme123')
} else {
  payload.logger.info('Admin user already present — skipping')
}

// ---- Media (idempotent by filename) -----------------------------------------
const ensureMedia = async (relPath: string, alt: string): Promise<number> => {
  const filename = relPath.split('/').pop() as string
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
  if (existing.docs.length > 0) return existing.docs[0].id as number
  const doc = await payload.create({
    collection: 'media',
    filePath: path.join(projectRoot, 'public', ...relPath.split('/')),
    data: { alt },
  })
  payload.logger.info(`Uploaded media: ${filename}`)
  return doc.id as number
}

const logoId = await ensureMedia('assets/logo-white.png', 'CSA — Critical Systems Analysis')
const benPhotoId = await ensureMedia('assets/seed/about-ben.webp', 'Ben Twombly, Founder & CEO of Critical Systems Analysis')
// Case-study cover images extracted from the design export.
const coverIds = [
  await ensureMedia('assets/seed/cs-cover-meridian.webp', 'Case study cover'),
  await ensureMedia('assets/seed/cs-cover-vantage.webp', 'Case study cover'),
  await ensureMedia('assets/seed/cs-cover-halden.webp', 'Case study cover'),
]

// ---- Clear content collections (idempotent) ---------------------------------
const clearCollections = ['industries', 'services', 'partners', 'articles', 'caseStudies', 'testimonials'] as const
for (const collection of clearCollections) {
  await payload.delete({ collection, where: { id: { exists: true } } })
}
payload.logger.info('Cleared content collections')

// ---- Industries (8) ---------------------------------------------------------
const industries = [
  {
    title: 'Rail',
    slug: 'rail',
    icon: 'train-front',
    shortDescription:
      'Independent functional safety analysis for autonomous and conventional rail systems across every lifecycle phase.',
    highlights: [
      'Independent Safety Assessment (ISA), safety lifecycle management, hazard analysis (PHA, FMEA, FTA), and safety case authoring',
      'Commuter, freight, signaling, rolling stock, autonomous, and rail-robot integrations',
    ],
    standards: ['EN 50126', 'EN 50128', 'EN 50129', 'EN 50657'],
  },
  {
    title: 'Robotics',
    slug: 'robotics',
    icon: 'bot',
    shortDescription:
      'Safe design for industrial, mobile, and collaborative robots operating in unstructured, human-shared environments.',
    highlights: ['Item definition, hazard analysis, risk reduction, requirements, and verification & validation'],
    standards: ['ISO 10218-1/-2', 'ISO 3691-4', 'ISO 13849-1/-2', 'IEC 61508'],
  },
  {
    title: 'Machinery',
    slug: 'machinery',
    icon: 'cog',
    shortDescription: 'Compliant, defensible safety architectures for fixed and mobile machinery.',
    highlights: [
      'Risk assessment, SRP/CS validation, and SISTEMA-based PL verification',
      'Safety requirements specification and verification planning',
    ],
    standards: ['ISO 12100', 'ISO 13849-1/-2', 'IEC 62061', 'IEC 61508'],
  },
  {
    title: 'Physical AI',
    slug: 'physical-ai',
    icon: 'cpu',
    shortDescription:
      'Addressing the added risk of AI-driven perception, decision-making, and adaptation in safety-critical systems.',
    highlights: [
      'Safety analysis of AI functions, fallback strategies, and monitoring concepts',
      'Integration of AI behavior into conventional functional safety lifecycles',
    ],
    standards: ['IEC 61508', 'ISO 13849', 'ISO/TR 5469', 'ISO/IEC 23894', 'ISO/PAS 8800', 'ISO/IEC CD TS 22440-1'],
  },
  {
    title: 'Construction & Mining Equipment',
    slug: 'construction-mining',
    icon: 'construction',
    shortDescription:
      'Safe automation and autonomy for on-site machinery operating near workers and the public, plus catastrophic-risk reduction in harsh, high-energy environments.',
    highlights: [
      'Hazard analysis for autonomy, remote operation, and human-machine interaction',
      'Functional safety concepts for braking, steering, and fail-safe actuation; safety-related control system verification under extreme conditions',
    ],
    standards: ['ISO 19014', 'ISO 21815 (emerging)', 'ISO 17757', 'ISO 13849', 'IEC 62061', 'IEC 61508'],
  },
  {
    title: 'Automotive',
    slug: 'automotive',
    icon: 'car',
    shortDescription:
      'Compliant, scalable safety engineering for E/E systems up to autonomous functions, including automotive software testing and validation.',
    highlights: [
      'HARA, FSC/TSC development, and safety concept validation',
      'Safety analysis of ADAS, autonomy stacks, and software-intensive systems',
    ],
    standards: ['ISO 26262', 'ISO 21448 (SOTIF)', 'IEC 61508 (foundational)'],
  },
  {
    title: 'Defense',
    slug: 'defense',
    icon: 'shield',
    shortDescription:
      'Rigorous, auditable safety analysis aligned with mission-critical and MIL-SPEC regulatory expectations.',
    highlights: [
      'System safety assessments, hazard tracking, and independent review',
      'Support for complex electromechanical and autonomous defense platforms',
    ],
    standards: ['MIL-STD-882', 'IEC 61508', 'DEF-STANs (program-specific)'],
  },
  {
    title: 'Process Industry',
    slug: 'process',
    icon: 'factory',
    shortDescription: 'High-integrity protection systems that prevent catastrophic chemical and energy hazards.',
    highlights: [
      'SIL determination, LOPA, SIF design review, and safety lifecycle audits',
      'Safety instrumented system validation and compliance evidence',
    ],
    standards: ['IEC 61511', 'IEC 61508', 'API RP 754 (supporting)'],
  },
]
for (let i = 0; i < industries.length; i++) {
  const ind = industries[i]
  await payload.create({
    collection: 'industries',
    data: {
      title: ind.title,
      slug: ind.slug,
      icon: ind.icon,
      order: i,
      shortDescription: ind.shortDescription,
      highlights: ind.highlights.map((text) => ({ text })),
      standards: arr(ind.standards),
      hero: { headline: ind.title, intro: ind.shortDescription },
    },
  })
}

// ---- Services (4) -----------------------------------------------------------
const services = [
  {
    title: 'Engineering',
    icon: 'wrench',
    description:
      'We embed directly with your team to execute safety work products and analysis as if we were internal staff.',
    points: [
      'Hands-on safety engineering: HARA, FMEA/FMEDA, fault tree analysis (FTA), and requirements traceability',
      'Develop, complete, and maintain required safety artifacts and documentation',
      'Work closely with systems, software, hardware, and operations teams to influence design decisions early',
      'Interface directly with third-party assessors, certifiers, and auditors',
      'Support compliance, certification, and regulator-facing activities',
    ],
    bestFor: 'Teams without safety engineers, or safety teams short on bandwidth.',
  },
  {
    title: 'Consulting',
    icon: 'compass',
    description:
      'Strategic and technical safety guidance across the full system lifecycle — from concept through deployment and operation.',
    points: [
      'Functional and system safety strategy',
      'Safety architecture and requirements advisory',
      'Compliance strategy for international standards (IEC 61508, ISO 26262, ISO 13849, IEC 62061)',
      'Safety support for novel, autonomous, and public-facing systems',
    ],
    bestFor:
      'Teams with existing safety knowledge seeking expert backup to avoid mistakes, or a second opinion alongside other consultants.',
  },
  {
    title: 'Auditing',
    icon: 'clipboard-check',
    description:
      'Independent, objective assessments that build confidence in both technical safety and organizational competence.',
    points: [
      'Safety gap analyses and maturity assessments',
      'Independent safety audits and technical reviews',
      'Certification and regulatory readiness evaluations',
      'Review of safety processes, artifacts, and governance',
      'Trusted third-party oversight for critical programs',
    ],
    bestFor:
      'Teams with some safety artifacts but needing direction to reach their safety goals — and industries where external review is required by the safety lifecycle.',
  },
  {
    title: 'Training',
    icon: 'graduation-cap',
    description:
      'Practical, engineering-driven functional safety training that translates standards into real-world practice.',
    points: [
      'Functional and system safety training (introductory to advanced)',
      'Customized training for specific industries, products, or technologies',
      'Workshops for engineering teams and technical leadership',
      'Focus on failure modes, lessons learned, and defensible decision-making',
    ],
    bestFor: null,
  },
]
for (let i = 0; i < services.length; i++) {
  const s = services[i]
  await payload.create({
    collection: 'services',
    data: {
      title: s.title,
      icon: s.icon,
      order: i,
      description: s.description,
      points: s.points.map((text) => ({ text })),
      bestFor: s.bestFor,
    },
  })
}

// ---- Partners + customers ---------------------------------------------------
const customers = [
  { name: 'Association of American Railroads', domain: 'aar.org', mono: 'AAR' },
  { name: 'Alaska Railroad', domain: 'alaskarailroad.com', mono: 'ARR' },
  { name: 'Caltrain', domain: 'caltrain.com', mono: 'CT' },
  { name: 'MxV Rail', domain: 'mxvrail.com', mono: 'MxV' },
  { name: 'Railway Association of Canada', domain: 'railcan.ca', mono: 'RAC' },
  { name: 'RSE Corporation', domain: 'rsecorp.com', mono: 'RSE' },
  { name: 'Saphira.AI', domain: 'saphira.ai', mono: 'SA' },
  { name: 'Unbox Robotics', domain: 'unboxrobotics.com', mono: 'UB' },
  { name: 'John Deere', domain: 'deere.com', mono: 'JD' },
  { name: 'Keolis', domain: 'keolisna.com', mono: 'KE' },
]
const certPartners = [
  { name: 'SGS-TÜV Saar', domain: 'sgs-tuev-saar.com', mono: 'SGS', role: 'Approved Training & Service Provider' },
  { name: 'TÜV Rheinland', domain: 'tuv.com', mono: 'TÜV', role: 'Certification Partner' },
  { name: 'Saphira', domain: 'saphira.ai', mono: 'SA', role: 'Technical Collaboration' },
  { name: 'Fennec Engineering', domain: 'fennec-engineering.com', mono: 'FE', role: 'Technical Collaboration' },
  { name: 'A3', domain: 'automate.org', mono: 'A3', role: 'Industry Partner' },
]
let order = 0
for (const c of customers) {
  await payload.create({
    collection: 'partners',
    data: { name: c.name, type: 'customer', domain: c.domain, mono: c.mono, order: order++ },
  })
}
order = 0
for (const p of certPartners) {
  await payload.create({
    collection: 'partners',
    data: { name: p.name, type: 'partner', domain: p.domain, mono: p.mono, role: p.role, order: order++ },
  })
}

// ---- Articles (3, published) ------------------------------------------------
const articles = [
  {
    title: 'ISO/PAS 8800 and the road to certifying AI in safety-critical systems.',
    slug: 'iso-pas-8800-certifying-ai',
    category: 'Standards',
    publishedDate: '2026-06-01',
    excerpt:
      'How the new ISO/PAS 8800 framework reshapes the path to certifying AI functions in safety-critical systems.',
  },
  {
    title: 'What we learned certifying a collaborative humanoid for the factory floor.',
    slug: 'certifying-collaborative-humanoid',
    category: 'Field Notes',
    publishedDate: '2026-05-01',
    excerpt: 'Field notes from a functional safety engagement on a collaborative humanoid robot.',
  },
  {
    title: 'CSA joins the program committee for the International Robot Safety Conference.',
    slug: 'csa-joins-irsc-program-committee',
    category: 'Company',
    publishedDate: '2026-04-01',
    excerpt: 'CSA deepens its commitment to advancing robot safety standards.',
  },
]
for (const a of articles) {
  await payload.create({
    collection: 'articles',
    data: {
      title: a.title,
      slug: a.slug,
      category: a.category,
      publishedDate: a.publishedDate,
      excerpt: a.excerpt,
      _status: 'published',
    },
  })
}

// ---- Case studies (6) -------------------------------------------------------
const caseStudies = [
  {
    sector: 'Mining Equipment',
    name: 'Liebherr Mining Equipment',
    description:
      'Safety-lifecycle and compliance-pathway guidance that brought clarity to a challenging program — with clear documentation, leadership, and actionable insights that improved both design and process.',
    standards: [],
    quote:
      'CSA’s understanding of the safety lifecycle and compliance pathways gave our organization clarity during a challenging project. They provided clear documentation, leadership, and actionable insights that improved both our design and our processes.',
    author: 'Erin Dalby',
    affiliation: 'Liebherr Mining Equipment Newport News Co.',
  },
  {
    sector: 'Autonomous Mobile Robots',
    name: 'AMR Manufacturer',
    description:
      'End-to-end functional safety lifecycle support — from hazard analysis through verification — anchored in IEC 61508 and real-world implementation that kept the program ahead of schedule.',
    standards: ['IEC 61508'],
    quote:
      'Ben’s safety engineers supported us through the entire functional safety lifecycle, from hazard analysis to verification. CSA’s expertise in IEC 61508 and real-world implementation helped our engineering team avoid costly mistakes and stay ahead of schedule.',
    author: 'AMR Manufacturer',
    affiliation: null,
  },
  {
    sector: 'Robotic Workcells',
    name: 'Workcell Integrator',
    description:
      'A safety-critical robotic system delivered with clear documentation, expert leadership, and actionable insights — without needing constant oversight from the engineering team.',
    standards: [],
    quote:
      'We partnered with CSA on a safety-critical robotic system, and the experience was outstanding. They delivered clear documentation, expert leadership, and actionable insights that improved both our design and our processes — without needing constant oversight from our engineers.',
    author: 'Workcell Integrator',
    affiliation: null,
  },
  {
    sector: 'Machinery',
    name: 'Machine Designer',
    description:
      'Safety-lifecycle and compliance-pathway guidance that made a difficult certification smooth and stress-free.',
    standards: [],
    quote:
      'CSA’s grasp of the safety lifecycle and compliance pathways gave us clarity during a difficult project. Their guidance made certification smooth and stress-free.',
    author: 'Machine Designer',
    affiliation: null,
  },
  {
    sector: 'Safety-Critical Components',
    name: 'Component Manufacturer',
    description:
      'A knowledgeable, dependable functional safety partner — always willing to go the extra mile, and now the go-to for all functional safety needs.',
    standards: [],
    quote:
      'Ben is incredibly easy to work with — knowledgeable, dependable, and always willing to go the extra mile. CSA is now our go-to partner for all functional safety needs.',
    author: 'Safety-Critical Component Manufacturer',
    affiliation: null,
  },
  {
    sector: 'Robotics',
    name: 'Robotics Manufacturer',
    description:
      'Honesty and commitment that went beyond checking the boxes — helping build a safer, more reliable product.',
    standards: [],
    quote:
      'What stood out most was their honesty and commitment. Beyond checking the boxes, CSA helped us build a safer, more reliable product.',
    author: 'Robotics Manufacturer',
    affiliation: null,
  },
]
for (let i = 0; i < caseStudies.length; i++) {
  const c = caseStudies[i]
  await payload.create({
    collection: 'caseStudies',
    data: {
      name: c.name,
      sector: c.sector,
      order: i,
      description: c.description,
      standards: arr(c.standards),
      coverImage: coverIds[i] ?? undefined,
      testimonial: { quote: c.quote, author: c.author, affiliation: c.affiliation },
    },
  })
}

// ---- Standalone testimonials ------------------------------------------------
const testimonials = [
  {
    quote:
      'CSA’s understanding of the safety lifecycle and compliance pathways gave our organization clarity during a challenging project.',
    attribution: 'Erin Dalby',
    company: 'Liebherr Mining Equipment Newport News Co.',
  },
  {
    quote:
      'CSA’s expertise in IEC 61508 and real-world implementation helped our engineering team avoid costly mistakes and stay ahead of schedule.',
    attribution: 'AMR Manufacturer',
    company: null,
  },
  {
    quote: 'CSA is now our go-to partner for all functional safety needs.',
    attribution: 'Safety-Critical Component Manufacturer',
    company: null,
  },
]
for (let i = 0; i < testimonials.length; i++) {
  await payload.create({ collection: 'testimonials', data: { ...testimonials[i], order: i } })
}

// ---- Globals ----------------------------------------------------------------
await payload.updateGlobal({
  slug: 'siteSettings',
  data: {
    siteName: 'Critical Systems Analysis',
    logo: logoId,
    defaultSeo: {
      title: 'Functional Safety Engineering Consulting | CSA',
      description:
        'Functional safety engineering consulting for autonomous rail, robotics & machinery. Principal-led HARA, FMEA, ISO 26262 & IEC 61508 support. Faster certification.',
    },
    social: {
      linkedin: 'https://www.linkedin.com/',
      x: 'https://x.com/',
      youtube: 'https://www.youtube.com/',
    },
  },
})

await payload.updateGlobal({
  slug: 'header',
  data: {
    nav: [
      { label: 'Home', href: '/' },
      {
        label: 'Consulting',
        href: '/consulting',
        children: [
          { label: 'Overview', href: '/consulting' },
          { label: 'Rail', href: '/consulting/rail' },
          { label: 'Robotics', href: '/consulting/robotics' },
          { label: 'Machinery', href: '/consulting/machinery' },
          { label: 'Physical AI', href: '/consulting/physical-ai' },
          { label: 'Construction & Mining Equipment', href: '/consulting/construction-mining' },
          { label: 'Automotive', href: '/consulting/automotive' },
          { label: 'Defense', href: '/consulting/defense' },
          { label: 'Process', href: '/consulting/process' },
        ],
      },
      {
        label: 'Training & Templates',
        href: '/training-templates',
        children: [
          { label: 'Overview', href: '/training-templates' },
          { label: 'Course Catalog', href: '/training-templates/courses' },
          { label: 'Purchase Templates', href: '/training-templates/templates' },
          { label: 'Request a Private Course', href: '#', isCTA: true },
        ],
      },
      {
        label: 'Company',
        href: '/company',
        children: [
          { label: 'Overview', href: '/company' },
          { label: 'Experience', href: '/company/experience' },
          { label: 'Services', href: '/company/services' },
          { label: 'Careers', href: '/company/careers' },
        ],
      },
      {
        label: 'Resources',
        href: '/resources',
        children: [
          { label: 'Overview', href: '/resources' },
          { label: 'Standards Identifier', href: '/resources/standards-identifier' },
          { label: 'Safety Chat', href: '/resources/safety-chat' },
          { label: 'Downloadable Resources', href: '/resources/downloads' },
          { label: 'Articles', href: '/resources/articles' },
          { label: 'Events & Webinars', href: '/resources/events' },
          { label: 'Free Trainings', href: '/resources/free-trainings' },
        ],
      },
    ],
    utility: {
      loginLabel: 'Login',
      loginHref: '#',
      cartHref: '#',
      consultationLabel: 'Book a Consultation',
      consultationHref: '#',
    },
  },
})

await payload.updateGlobal({
  slug: 'footer',
  data: {
    closingCta: {
      eyebrow: 'Ready when you are.',
      title: 'Build Safer.\nScale Confidently.',
      sub: 'Integrate functional safety without slowing down development. Let’s talk about your next safety-critical system.',
      primaryLabel: 'Book a Consultation',
      primaryHref: '#',
      secondaryLabel: 'See Our Services',
      secondaryHref: '/consulting',
    },
    brandBlurb:
      'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
    legalLinks: [
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Digital Refund Policy', href: '/legal/refund-policy' },
    ],
    copyright: '© 2026 Critical Systems Analysis · All rights reserved.',
  },
})

await payload.updateGlobal({
  slug: 'homePage',
  data: {
    hero: {
      titleLine1: 'Safer Systems.',
      titleLine2: 'Accelerated Innovation.',
      highlightWord: 'Innovation',
      subhead: 'Expert functional safety engineering consulting for the world’s most critical systems.',
      sub: 'At Critical Systems Analysis (CSA), we bridge the gap between advanced autonomous innovation and the rigorous demands of global safety standards. We empower engineering teams worldwide to transform complex compliance from a regulatory burden into a core strategic advantage.',
      primaryCtaLabel: 'Book a Consultation',
      primaryCtaHref: '#',
      secondaryCtaLabel: 'Explore Our Services',
      secondaryCtaHref: '/consulting',
      backgroundVideoUrl: '/assets/hero.mp4',
      systems: [
        {
          category: 'Humanoid Robotics',
          name: 'Atlas-Class Humanoid',
          blurb:
            'Collaborative humanoids working in shared human spaces — validated for safe force, speed, and separation monitoring.',
          videoUrl: '/assets/sys-1.webm',
          posterUrl: '/assets/sys-1-fit.png',
          isGif: false,
          metricLabel: 'Performance Level',
          metricValue: 'PL d',
          standards: arr(['ISO 10218-1', 'ISO/TS 15066', 'ISO 13849-1']),
          sizeK: 1.12,
          offsetY: 235,
          activeRY: 0,
        },
        {
          category: 'Rail Transit',
          name: 'High-Speed Trainset',
          blurb:
            'Mainline and metro rolling stock — signalling, braking, and door control certified across the railway safety lifecycle.',
          videoUrl: '/assets/sys-2.gif',
          posterUrl: null,
          isGif: true,
          metricLabel: 'Safety Integrity',
          metricValue: 'SIL 4',
          standards: arr(['EN 50126', 'EN 50128', 'IEC 61508']),
          sizeK: 1.22,
          offsetY: -260,
          activeRY: -19,
        },
        {
          category: 'Industrial Automation',
          name: 'Six-Axis Robotic Arm',
          blurb:
            'High-payload manipulators on the factory floor — safety-rated stop, zoning, and speed-and-separation monitoring.',
          videoUrl: '/assets/sys-3.webm',
          posterUrl: '/assets/sys-3-fit.png',
          isGif: false,
          metricLabel: 'Performance Level',
          metricValue: 'PL e',
          standards: arr(['ISO 10218-2', 'IEC 62061', 'ISO 13849-1']),
          sizeK: 0.78,
          offsetY: -180,
          activeRY: 0,
        },
        {
          category: 'Autonomous Mobile Robots',
          name: 'FleetBot AMR · 09',
          blurb:
            'Warehouse AMRs navigating among people — obstacle detection, protective stops, and safe fleet coordination by design.',
          videoUrl: '/assets/sys-4.webm',
          posterUrl: '/assets/sys-4-fit.png',
          isGif: false,
          metricLabel: 'Performance Level',
          metricValue: 'PL d',
          standards: arr(['ISO 3691-4', 'ISO 13849-1', 'IEC 61508']),
          sizeK: 0.93,
          offsetY: -180,
          activeRY: 0,
        },
        {
          category: 'Autonomous Vehicles',
          name: 'NX-42 Driverless Shuttle',
          blurb:
            'Driverless passenger shuttles — functional safety and safety of the intended function validated end to end.',
          videoUrl: '/assets/sys-5.webm',
          posterUrl: '/assets/sys-5-fit.png',
          isGif: false,
          metricLabel: 'Automotive SIL',
          metricValue: 'ASIL D',
          standards: arr(['ISO 26262', 'ISO 21448', 'UL 4600']),
          sizeK: 0.83,
          offsetY: -180,
          activeRY: 0,
        },
      ],
      tickerStandards: arr([
        'ISO 13849-1',
        'IEC 61508',
        'ISO 10218-1',
        'IEC 62061',
        'ISO 26262',
        'EN 50126',
        'EN 50128',
        'ISO/TS 15066',
        'ISO 3691-4',
        'UL 4600',
        'ISO 21448',
      ]),
    },
    problem: {
      eyebrow: 'The problem',
      title: 'Real expertise for rapid innovation.',
      lead: 'In an era of continuous, fast-moving design cycles, you need a functional safety partner who can keep pace with your engineering team. Too many organizations end up drowning in manual preparation work — or stuck with consultants who oversell their technical depth.',
      solutionLabel: 'The CSA solution',
      solutions: [
        {
          icon: 'git-merge',
          title: 'Embedded Partnership',
          description: 'We become an extension of your design team, working reliably without constant oversight.',
        },
        {
          icon: 'user-check',
          title: 'Principal-Led Projects',
          description:
            'Every engagement is run by a principal safety engineer with decades of experience, acting in your best interest like an internal employee.',
        },
        {
          icon: 'cpu',
          title: 'AI-Augmented Accuracy',
          description:
            'We pair a systematic methodology with AI tooling to accelerate development lifecycles while raising accuracy.',
        },
        {
          icon: 'scale',
          title: 'Strict Technical Objectivity',
          description:
            'By staying independent, we provide the unbiased validation that proves your hardware and software are functionally safe.',
        },
      ],
    },
    servicesSection: {
      eyebrow: 'What we do',
      servicesTitle: 'Functional safety services.',
      industriesTitle: 'Industries we serve.',
      servicesLead: 'Principal-led functional safety engineering consulting across the full system lifecycle.',
      industriesLead:
        'Functional safety engineering consulting tailored to the standards and hazards of your sector.',
      servicesCta: 'See All Services',
      industriesCta: 'Explore Industries',
    },
    standingApart: {
      eyebrow: 'Standing apart',
      title: 'How we work.',
      lead: 'We operate as an embedded extension of your team, using an advanced AI-augmented approach to deliver release-ready safety cases faster — and with unmatched precision.',
      mandateKicker: 'Human expertise + AI acceleration.',
      mandateTag: 'Our human-in-the-loop mandate',
      oldWayLabel: 'The old way',
      newWayLabel: 'The CSA AI-augmented way',
      rows: [
        {
          theme: 'Speed',
          oldTitle: 'Slow & manual',
          oldDesc: 'Teams spend weeks gathering raw inputs and drowning in manual preparation work.',
          newTitle: 'Accelerated core baseline',
          newDesc:
            'Specialized AI tools immediately extract initial data and automate preparation, clearing engineering bottlenecks.',
        },
        {
          theme: 'Accuracy',
          oldTitle: 'Imprecise & inconsistent',
          oldDesc: 'Manual checking leaves programs vulnerable to systematic failures or misaligned design requirements.',
          newTitle: 'Data-driven & consistent',
          newDesc: 'Automated consistency checks maintain absolute accuracy across complex, multi-layered requirements.',
        },
        {
          theme: 'Cost',
          oldTitle: 'Expensive rework',
          oldDesc: 'Safety is treated as a late-stage checkbox, forcing delays and redesigns at the end of a project.',
          newTitle: 'Continuous integration',
          newDesc:
            'Identifying architectural safety concerns early in the V-model phase cuts your long-term cost of ownership.',
        },
        {
          theme: 'Utility',
          oldTitle: 'Academic & disconnected',
          oldDesc: 'Dense compliance summaries delivered without real-world, machine-building utility.',
          newTitle: 'Expert, actionable auditing',
          newDesc:
            'Senior safety engineers directly guide and verify every output — a strict human-in-the-loop mandate.',
        },
      ],
      neverAiLabel: 'Where we never rely on AI',
      neverAi: [
        { icon: 'user-round-check', label: 'Expert review' },
        { icon: 'stamp', label: 'Expert approvals' },
        { icon: 'shield-check', label: 'Final sign-off' },
      ],
      humanNote: 'A qualified safety engineer is always in the loop.',
    },
    about: {
      eyebrow: 'About CSA',
      title: 'Meet the founder.',
      portrait: benPhotoId,
      name: 'Ben Twombly',
      role: 'Founder & CEO',
      location: 'Sarasota, FL',
      calloutLabel: 'Principal-led',
      bio: richText([
        [
          { text: 'Ben Twombly is the CEO and founder of ' },
          { text: 'Critical Systems Analysis', bold: true },
          {
            text: ', a functional safety consulting firm based in Sarasota, Florida. He holds an FS Engineer certification from ',
          },
          { text: 'TÜV Rheinland', bold: true },
          {
            text: ' and the Industrial Functional Safety Professional (IFSP) certification. Before co-founding CSA in May 2023, he spent six years as a Senior Safety Engineer at TÜV Rheinland, preparing clients for safety assessments across a wide range of safety-critical systems. He earned his degree in robotics from the Colorado School of Mines.',
          },
        ],
        [
          {
            text: 'At CSA, Ben and his team work with robotics companies, autonomous vehicle manufacturers, industrial machinery firms, battery management system developers, and rail transit organizations across the ',
          },
          { text: 'U.S., Canada, and Europe', bold: true },
          { text: '.' },
        ],
      ]),
      certs: [
        { icon: 'badge-check', title: 'FS Engineer', subtitle: 'Certified by TÜV Rheinland' },
        { icon: 'award', title: 'IFSP', subtitle: 'Industrial Functional Safety Professional' },
      ],
      experienceLabel: 'Hands-on certification experience',
      experienceTags: arr([
        'Autonomous mobile robots',
        'Humanoid robots',
        'Autonomous agricultural equipment',
        'Heavy haul trucks',
        'Autonomous delivery vehicles',
        'AGVs',
        'Battery management systems',
        'Industrial machinery',
        'Rail signaling systems',
      ]),
      activeLabel: 'Active in the field',
      activeNote:
        'CSA contributes to the development of functional safety standards and is present at the industry’s leading events each year.',
      conferences: [
        { icon: 'bot', label: 'Robotics Summit & Expo' },
        { icon: 'cpu', label: 'Automate' },
        { icon: 'shield-check', label: 'International Robot Safety Conference' },
      ],
      ctaLabel: 'Meet the Team',
      ctaHref: '/company',
    },
    caseStudiesSection: {
      eyebrow: 'Proof, not promises.',
      title: 'Case studies.',
      sub: 'Real results from teams shipping safety-critical systems.',
      ctaLabel: 'Read the Full Case Studies',
    },
    partnersSection: {
      eyebrow: 'Trusted by.',
      title: 'The teams building critical systems.',
      sub: 'Railroads, robotics innovators, and equipment manufacturers across North America rely on CSA to validate their most safety-critical systems.',
      partnersLabel: 'Partners',
      partnersIntro: 'We work alongside the industry’s leading certification bodies and technical collaborators.',
    },
    newsSection: {
      eyebrow: 'Insights',
      title: 'Latest news.',
      lead: 'Field notes, standards updates, and what we’re learning at the frontier of functional safety.',
      ctaLabel: 'Visit the Resource Center',
      ctaHref: '/resources',
    },
  },
})

// ---- Section pages (globals + their collections) ----------------------------
await seedConsulting(payload)
await seedCompany(payload)
await seedResources(payload)
await seedTraining(payload)
await seedLegal(payload)
payload.logger.info('Seeded section pages: consulting, company, resources, training, legal')

payload.logger.info('— CSA seed complete —')
process.exit(0)
