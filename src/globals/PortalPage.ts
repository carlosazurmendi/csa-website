import type { GlobalConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite } from '@/access'

/**
 * Customer Portal (slug 'portal-page') — the post-login account area. Copy
 * for the portal header and its four sections (Account, Billing, Purchased
 * Template Library, Order History): section headings, intros, and the
 * per-section empty states. The data itself (profile, invoices, library,
 * orders) is loaded per-user at runtime.
 */
export const PortalPage: GlobalConfig = {
  slug: 'portal-page',
  dbName: 'portal_pg',
  label: 'Customer Portal Page',
  versions: { drafts: true },
  access: { read: publishedOrAdmin, update: editorWrite },
  admin: {
    group: 'Pages',
    description: 'Copy for the customer portal — section headings, labels, and empty states.',
  },
  fields: [
    {
      type: 'group',
      name: 'header',
      label: 'Portal header',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Your account' },
        { name: 'title', type: 'text', required: true, defaultValue: 'Customer Portal.' },
        {
          name: 'subheading',
          type: 'textarea',
          defaultValue:
            'Manage your account and billing, download the templates you own, and review your order history — all in one place.',
        },
      ],
    },
    {
      type: 'group',
      name: 'navLabels',
      label: 'Sidebar nav labels',
      admin: { description: 'Labels for the four portal sections.' },
      fields: [
        { name: 'account', type: 'text', defaultValue: 'Account Settings' },
        { name: 'billing', type: 'text', defaultValue: 'Billing' },
        { name: 'templates', type: 'text', defaultValue: 'Template Library' },
        { name: 'orders', type: 'text', defaultValue: 'Order History' },
      ],
    },
    {
      type: 'group',
      name: 'account',
      label: 'Account Settings section',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Account' },
        { name: 'heading', type: 'text', defaultValue: 'Account settings.' },
        {
          name: 'intro',
          type: 'textarea',
          defaultValue:
            'Manage your profile, sign-in email, and password. These details are stored against your account and sync everywhere you use CSA.',
        },
      ],
    },
    {
      type: 'group',
      name: 'billing',
      label: 'Billing section',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Billing' },
        { name: 'heading', type: 'text', defaultValue: 'Billing & payments.' },
        {
          name: 'intro',
          type: 'textarea',
          defaultValue:
            'Your saved payment method, billing details, and every invoice and receipt. Card data is held by Stripe — CSA never stores raw card numbers.',
        },
        {
          name: 'noPaymentMethod',
          type: 'textarea',
          label: 'Empty state — no payment method',
          defaultValue:
            'No payment method on file. Add a card to check out faster. We use Stripe for secure, PCI-compliant payments — your card details never touch CSA servers.',
        },
        {
          name: 'noInvoices',
          type: 'textarea',
          label: 'Empty state — no invoices',
          defaultValue:
            'No invoices yet. When you purchase a template, bundle, or course, the paid invoice and receipt will appear here as downloadable PDFs.',
        },
      ],
    },
    {
      type: 'group',
      name: 'templates',
      label: 'Purchased Template Library section',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Library' },
        { name: 'heading', type: 'text', defaultValue: 'Purchased templates.' },
        {
          name: 'intro',
          type: 'textarea',
          defaultValue:
            'Every documentation template you own, ready to download anytime. Files are served from secure storage and you always get the latest revision you’re entitled to.',
        },
        {
          name: 'emptyState',
          type: 'textarea',
          label: 'Empty state — library empty',
          defaultValue:
            'Your library is empty. Templates and bundles you purchase appear here as downloadable Word and Excel files — with version and format details, re-downloadable whenever you need them.',
        },
      ],
    },
    {
      type: 'group',
      name: 'orders',
      label: 'Order History section',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Orders' },
        { name: 'heading', type: 'text', defaultValue: 'Order history.' },
        {
          name: 'intro',
          type: 'textarea',
          defaultValue:
            'A record of every purchase on your account — templates, bundles, and courses — with totals, status, and downloadable receipts.',
        },
        {
          name: 'emptyState',
          type: 'textarea',
          label: 'Empty state — no orders',
          defaultValue:
            'No orders yet. Once you make your first purchase, it’ll show up here with the date, order number, items, total, and a receipt you can download.',
        },
      ],
    },
    seoField,
  ],
}
