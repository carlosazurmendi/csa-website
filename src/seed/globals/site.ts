/**
 * Seed: site-config globals — Header, Footer, Site Settings.
 * Structure lifted from design-reference/project/assets/routes.js + footer.jsx,
 * with hrefs mapped to the Next.js routes the marketing site uses.
 */

const CONSULTING_CHILDREN = [
  { label: 'Overview', href: '/consulting' },
  { label: 'Rail', href: '/consulting/rail' },
  { label: 'Robotics', href: '/consulting/robotics' },
  { label: 'Machinery', href: '/consulting/machinery' },
  { label: 'Physical AI', href: '/consulting/physical-ai' },
  { label: 'Construction & Mining Equipment', href: '/consulting/construction-mining-equipment' },
  { label: 'Automotive', href: '/consulting/automotive' },
  { label: 'Defense', href: '/consulting/defense' },
  { label: 'Process', href: '/consulting/process' },
]

const TRAINING_CHILDREN = [
  { label: 'Overview', href: '/training' },
  { label: 'Digital Courses', href: '/training/digital-courses' },
  { label: 'Course Catalog', href: '/training/course-catalog' },
  { label: 'Purchase Templates', href: '/training/purchase-templates' },
  { label: 'Browse All Templates', href: '/training/browse-all-templates' },
  { label: 'Request a Private Course', href: '/training/request-a-private-course', isCta: true },
]

const COMPANY_CHILDREN = [
  { label: 'Overview', href: '/company' },
  { label: 'Experience', href: '/company/experience' },
  { label: 'Services', href: '/company/services' },
  { label: 'Careers', href: '/company/careers' },
]

const RESOURCES_CHILDREN = [
  { label: 'Overview', href: '/resources' },
  { label: 'Standards Identifier', href: '/resources/standards-identifier' },
  { label: 'Safety Chat', href: '/resources/safety-chat' },
  { label: 'Downloadable Resources', href: '/resources/downloadable-resources' },
  { label: 'Articles', href: '/resources/articles' },
  { label: 'Events & Webinars', href: '/resources/events-webinars' },
  { label: 'Free Trainings', href: '/resources/free-trainings' },
]

export const header = {
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Consulting', href: '/consulting', children: CONSULTING_CHILDREN },
    { label: 'Training & Templates', href: '/training', children: TRAINING_CHILDREN },
    { label: 'Company', href: '/company', children: COMPANY_CHILDREN },
    { label: 'Resources', href: '/resources', children: RESOURCES_CHILDREN },
  ],
  utility: {
    login: { label: 'Login', href: '/login' },
    cart: { label: 'Cart', href: '/cart' },
  },
  cta: { label: 'Book a Consultation', href: '/book-a-consultation', style: 'silver' },
}

export const footer = {
  closingCta: {
    eyebrow: 'Ready when you are.',
    heading: 'Build Safer. Scale Confidently.',
    subtext:
      'Integrate functional safety without slowing down development. Let’s talk about your next safety-critical system.',
    ctas: [
      { label: 'Book a Consultation', href: '/book-a-consultation', style: 'primary' },
      { label: 'See Our Services', href: '/consulting', style: 'secondary' },
    ],
  },
  blurb:
    'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
  columns: [
    { heading: 'Consulting', links: CONSULTING_CHILDREN.map(({ label, href }) => ({ label, href })) },
    {
      heading: 'Training & Templates',
      links: TRAINING_CHILDREN.map(({ label, href }) => ({ label, href })),
    },
    { heading: 'Company', links: COMPANY_CHILDREN.map(({ label, href }) => ({ label, href })) },
    { heading: 'Resources', links: RESOURCES_CHILDREN.map(({ label, href }) => ({ label, href })) },
  ],
  standardsStrip: [
    { code: 'ISO 13849' },
    { code: 'IEC 61508' },
    { code: 'ISO 10218' },
    { code: 'IEC 62061' },
    { code: 'ISO 26262' },
  ],
  legalLinks: [
    { label: 'Terms of Service', href: '/legal/terms-of-service' },
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Digital Refund Policy', href: '/legal/digital-refund-policy' },
  ],
  copyright: '© 2026 Critical Systems Analysis · All rights reserved.',
}

export const siteSettings = {
  brand: {
    name: 'Critical Systems Analysis',
    shortName: 'CSA',
    tagline:
      'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
  },
  contact: {
    address: 'Sarasota, Florida',
  },
  socialLinks: [
    { platform: 'linkedin', url: 'https://www.linkedin.com/' },
    { platform: 'x', url: 'https://x.com/' },
    { platform: 'youtube', url: 'https://www.youtube.com/' },
  ],
  announcementBar: { enabled: false },
  seo: {
    metaTitle: 'Functional Safety Engineering Consulting | CSA',
    metaDescription:
      'Functional safety engineering consulting for autonomous rail, robotics & machinery. Principal-led HARA, FMEA, ISO 26262 & IEC 61508 support. Faster certification.',
  },
}

export const globals = { header, footer, 'site-settings': siteSettings }
