import type { GlobalConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite } from '@/access'
import { ctaField } from '@/fields/link'

/**
 * Cart (slug 'cart-page') — the shopping-cart page copy. Heading, the
 * empty-cart state, order-summary labels, the checkout button copy, and the
 * trust/reassurance line. Line items + totals are computed at runtime.
 */
export const CartPage: GlobalConfig = {
  slug: 'cart-page',
  dbName: 'cart_pg',
  label: 'Cart Page',
  versions: { drafts: true },
  access: { read: publishedOrAdmin, update: editorWrite },
  admin: {
    group: 'Pages',
    description: 'Copy for the cart page — headings, empty-cart state, summary labels, trust copy.',
  },
  fields: [
    {
      type: 'group',
      name: 'header',
      label: 'Header',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Your order' },
        { name: 'title', type: 'text', required: true, defaultValue: 'Your cart.' },
        {
          name: 'subheading',
          type: 'textarea',
          defaultValue:
            'Review the templates and courses in your cart, then continue to secure checkout.',
        },
      ],
    },
    {
      type: 'group',
      name: 'emptyCart',
      label: 'Empty-cart state',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Your cart is empty.' },
        {
          name: 'body',
          type: 'textarea',
          defaultValue:
            'Browse functional-safety templates and on-demand courses to get started — everything you add shows up here, ready for one secure checkout.',
        },
        ctaField('ctas', 'Empty-cart buttons'),
      ],
    },
    {
      type: 'group',
      name: 'summary',
      label: 'Order summary',
      fields: [
        { name: 'heading', type: 'text', label: 'Summary title', defaultValue: 'Order summary' },
        { name: 'subtotalLabel', type: 'text', defaultValue: 'Subtotal' },
        {
          name: 'taxLabel',
          type: 'text',
          defaultValue: 'Tax',
        },
        {
          name: 'taxNote',
          type: 'text',
          label: 'Tax note',
          defaultValue: 'Calculated at checkout',
        },
        { name: 'totalLabel', type: 'text', defaultValue: 'Total' },
        {
          name: 'checkoutButtonLabel',
          type: 'text',
          label: 'Checkout button',
          defaultValue: 'Proceed to Checkout',
        },
        {
          name: 'continueShoppingLabel',
          type: 'text',
          label: 'Continue-shopping link',
          defaultValue: 'Continue shopping',
        },
      ],
    },
    {
      type: 'group',
      name: 'trust',
      label: 'Trust / reassurance copy',
      fields: [
        {
          name: 'secureLine',
          type: 'text',
          defaultValue: 'Secure checkout powered by Stripe — your card details never touch CSA servers.',
        },
        {
          name: 'deliveryLine',
          type: 'text',
          defaultValue: 'Instant digital delivery. 14-day refund policy.',
        },
      ],
    },
    seoField,
  ],
}
