/**
 * Seed: Partner Logos — certification bodies & technical collaborators.
 * Names, roles, and URLs lifted from the PARTNERS array in
 * design-reference/project/assets/partners.jsx. The logo upload field is
 * omitted here (media seeded separately); URLs are the icon-service domains
 * the export used as brand sources.
 */
export const seed = {
  collection: 'partner-logos',
  docs: [
    {
      name: 'SGS-TÜV Saar',
      role: 'Approved Training & Service Provider',
      url: 'https://www.sgs-tuev-saar.com',
      order: 0,
    },
    {
      name: 'TÜV Rheinland',
      role: 'Certification Partner',
      url: 'https://www.tuv.com',
      order: 1,
    },
    {
      name: 'Saphira',
      role: 'Technical Collaboration',
      url: 'https://saphira.ai',
      order: 2,
    },
    {
      name: 'Fennec Engineering',
      role: 'Technical Collaboration',
      url: 'https://www.fennec-engineering.com',
      order: 3,
    },
    {
      name: 'A3',
      role: 'Industry Partner',
      url: 'https://www.automate.org',
      order: 4,
    },
  ],
}
