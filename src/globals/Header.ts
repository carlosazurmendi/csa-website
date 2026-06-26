import type { GlobalConfig } from 'payload'
import { editorWrite } from '@/access'

/**
 * Header — the top navigation bar. Edit the main menu, its dropdown items, the
 * utility links (Login, Cart), and the silver "Book a Consultation" button.
 *
 * Mirrors the NAV + UTIL trees in design-reference/project/assets/routes.js and
 * how they render in assets/nav.jsx. The "Request a Private Course" dropdown item
 * is a CTA button (cta:true) — a button styling, NOT a separate page.
 *
 * Site-config global: structural and always live (no drafts).
 */
export const Header: GlobalConfig = {
  slug: 'header',
  dbName: 'nav_hdr',
  access: {
    read: () => true,
    update: editorWrite,
  },
  admin: {
    group: 'Site Configuration',
    description: 'The top navigation menu, dropdowns, and utility links.',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Main menu items',
      admin: {
        description:
          'Top-level menu links, left to right. Add child links to turn an item into a dropdown.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Menu text, e.g. "Consulting".' },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: { description: 'Where the top-level link goes (internal path or external URL).' },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown links',
          admin: { description: 'Sub-links shown in this item’s dropdown. Leave empty for a plain link.' },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'Dropdown link text.' },
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              admin: { description: 'Where this dropdown link goes.' },
            },
            {
              name: 'isCta',
              type: 'checkbox',
              defaultValue: false,
              label: 'Show as a button',
              admin: {
                description:
                  'When on, this item renders as a gold button instead of a link (used for "Request a Private Course").',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'utility',
      label: 'Utility links',
      admin: { description: 'The Login and Cart links on the right side of the header.' },
      fields: [
        {
          type: 'group',
          name: 'login',
          label: 'Login link',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Login', admin: { description: 'Login link text.' } },
            { name: 'href', type: 'text', defaultValue: '/login', admin: { description: 'Login destination.' } },
          ],
        },
        {
          type: 'group',
          name: 'cart',
          label: 'Cart link',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Cart', admin: { description: 'Cart link text.' } },
            { name: 'href', type: 'text', defaultValue: '/cart', admin: { description: 'Cart destination.' } },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'cta',
      label: 'Header button',
      admin: {
        description:
          'The primary call-to-action button on the right of the header (e.g. "Book a Consultation").',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Book a Consultation',
          admin: { description: 'Button text.' },
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/book-a-consultation',
          admin: { description: 'Where the button goes.' },
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'silver',
          options: [
            { label: 'Silver pill', value: 'silver' },
            { label: 'Gold pill', value: 'gold' },
          ],
          admin: { description: 'Visual treatment of the button.' },
        },
      ],
    },
  ],
}
