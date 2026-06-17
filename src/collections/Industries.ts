import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/**
 * The 8 Consulting industry pages (Rail, Robotics, Machinery, Physical AI,
 * Construction & Mining, Automotive, Defense, Process).
 *
 * Drives: /consulting/[slug], the Home "Industries" tab, and the Consulting
 * overview grid. Every field the client sees in the copy guide is editable.
 */
export const Industries: CollectionConfig = {
  slug: 'industries',
  labels: { singular: 'Industry', plural: 'Industries' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
    group: 'Consulting',
    // Reached via the custom "Pages" sidebar tree (Consulting → each industry).
    hidden: true,
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: { description: 'lucide icon name, e.g. "train-front", "bot", "cog".' },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: { width: '120px', description: 'Sort order (low → first).' },
        },
      ],
    },
    slugField(),
    // ---- Shared summary (used on Home tab + consulting grid) ----
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'One-line summary used on the Home tab and Consulting grid.' },
    },
    {
      name: 'highlights',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      admin: { description: 'Capability bullet points shown on the Home tab.' },
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'standards',
      type: 'array',
      admin: { description: 'Applicable standards (chips).' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    // ---- Detail page (/consulting/[slug]) ----
    {
      type: 'group',
      name: 'hero',
      label: 'Detail page hero',
      fields: [
        { name: 'headline', type: 'text' },
        { name: 'intro', type: 'textarea' },
      ],
    },
    {
      name: 'capabilities',
      type: 'array',
      label: 'Core capabilities',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'experienceHighlight',
      type: 'textarea',
      label: 'Experience / case-study highlight (optional)',
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', defaultValue: 'Book a Consultation' },
        { name: 'ctaHref', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}
