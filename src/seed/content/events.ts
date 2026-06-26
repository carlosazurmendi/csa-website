/**
 * Seed — Events & Webinars content collection.
 *
 * Conference appearances, keynotes, and webinars on /resources/events.
 * Copy lifted verbatim from the design export:
 *   design-reference/project/Resources/Events - Webinars.html
 *   (CONFIG.cards — the listing placeholders — and CONFIG.featured.items —
 *   the "Featured Annual Appearances" CSA returns to each year).
 *
 * `type` maps the export filter categories onto the schema enum
 * (upcoming-event | past-keynote | technical-webinar). The export marks the
 * three listing cards "Date to be announced" / on-demand, so startDate is left
 * blank there. The four featured annual conferences are seeded as upcoming
 * events. Upload fields (thumbnail) are omitted — seeded later.
 *
 * richText `description` uses the default Lexical editor state shape via rt().
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
  collection: 'events',
  docs: [
    /* ---- Listing placeholders (CONFIG.cards) ---- */
    {
      title: 'Upcoming conference appearance',
      slug: 'upcoming-conference-appearance',
      type: 'upcoming-event',
      location: 'To be announced',
      description: rt(
        'Catch our engineering leaders presenting and at the booth. Session details and registration go live as each date is confirmed.',
      ),
      seo: {
        metaTitle: 'Upcoming Conference Appearance | CSA',
        metaDescription:
          'Catch our engineering leaders presenting and at the booth. Session details and registration go live as each date is confirmed.',
      },
    },
    {
      title: 'On-demand technical webinar',
      slug: 'on-demand-technical-webinar',
      type: 'technical-webinar',
      location: 'Online / Virtual',
      description: rt(
        'Deep, practitioner-level sessions on functional safety practice — recorded and available to watch on your schedule.',
      ),
      seo: {
        metaTitle: 'On-Demand Technical Webinar | CSA',
        metaDescription:
          'Deep, practitioner-level sessions on functional safety practice — recorded and available to watch on your schedule.',
      },
    },
    {
      title: 'Past keynote recording',
      slug: 'past-keynote-recording',
      type: 'past-keynote',
      location: 'Recording · Archive',
      description: rt(
        'Highlights and full recordings from our recent conference keynotes on safety-critical systems and certification.',
      ),
      seo: {
        metaTitle: 'Past Keynote Recording | CSA',
        metaDescription:
          'Highlights and full recordings from our recent conference keynotes on safety-critical systems and certification.',
      },
    },

    /* ---- Featured annual appearances (CONFIG.featured.items) ---- */
    {
      title: 'Robotics Summit & Expo',
      slug: 'robotics-summit-expo',
      type: 'upcoming-event',
      location: 'To be announced',
      description: rt('Commercial robotics innovation and professional networking.'),
      seo: {
        metaTitle: 'Robotics Summit & Expo | CSA',
        metaDescription:
          'Find CSA engineers at the Robotics Summit & Expo — commercial robotics innovation and professional networking.',
      },
    },
    {
      title: 'Automate',
      slug: 'automate',
      type: 'upcoming-event',
      location: 'To be announced',
      description: rt(
        'Motion control, machine vision, and advanced autonomous robotics integration.',
      ),
      seo: {
        metaTitle: 'Automate | CSA',
        metaDescription:
          'Find CSA engineers at Automate — motion control, machine vision, and advanced autonomous robotics integration.',
      },
    },
    {
      title: 'International Robot Safety Conference',
      slug: 'international-robot-safety-conference',
      type: 'upcoming-event',
      location: 'To be announced',
      description: rt('Deep dives into safe, highly effective industrial automation.'),
      seo: {
        metaTitle: 'International Robot Safety Conference | CSA',
        metaDescription:
          'Find CSA engineers at the International Robot Safety Conference — deep dives into safe, highly effective industrial automation.',
      },
    },
    {
      title: 'Railway Interchange',
      slug: 'railway-interchange',
      type: 'upcoming-event',
      location: 'To be announced',
      description: rt(
        'Technical advances in mass transit safety, rail infrastructure, and signaling.',
      ),
      seo: {
        metaTitle: 'Railway Interchange | CSA',
        metaDescription:
          'Find CSA engineers at Railway Interchange — technical advances in mass transit safety, rail infrastructure, and signaling.',
      },
    },
  ],
}
