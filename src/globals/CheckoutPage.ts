import type { GlobalConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite } from '@/access'

/**
 * Checkout (slug 'checkout-page') — the checkout-flow copy. Header, the
 * guest-checkout vs. create-an-account choice, contact + billing field-group
 * headings, payment + place-order copy, and the trust line. The order summary
 * mirrors the cart; the actual payment runs through Stripe.
 */
export const CheckoutPage: GlobalConfig = {
  slug: 'checkout-page',
  dbName: 'checkout',
  label: 'Checkout Page',
  versions: { drafts: true },
  access: { read: publishedOrAdmin, update: editorWrite },
  admin: {
    group: 'Pages',
    description: 'Copy for the checkout flow — headings, guest/account choice, billing labels.',
  },
  fields: [
    {
      type: 'group',
      name: 'header',
      label: 'Header',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Secure checkout' },
        { name: 'title', type: 'text', required: true, defaultValue: 'Checkout.' },
        {
          name: 'subheading',
          type: 'textarea',
          defaultValue:
            'A few details and you’re done. Your templates and courses are delivered instantly after payment.',
        },
      ],
    },
    {
      type: 'group',
      name: 'accountChoice',
      label: 'Guest checkout / account creation',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'How would you like to check out?' },
        {
          name: 'guestLabel',
          type: 'text',
          label: 'Guest option — label',
          defaultValue: 'Check out as a guest',
        },
        {
          name: 'guestBody',
          type: 'textarea',
          label: 'Guest option — body',
          defaultValue:
            'Buy with just your email. We’ll send your receipt and download links there — no account required.',
        },
        {
          name: 'createAccountLabel',
          type: 'text',
          label: 'Create-account option — label',
          defaultValue: 'Create an account',
        },
        {
          name: 'createAccountBody',
          type: 'textarea',
          label: 'Create-account option — body',
          defaultValue:
            'Set a password to keep every template you own in one re-downloadable library, with your order history and billing in your Customer Portal.',
        },
        {
          name: 'signInPrompt',
          type: 'text',
          label: 'Existing-customer prompt',
          defaultValue: 'Already have an account? Sign in for faster checkout.',
        },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact details',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Contact' },
        {
          name: 'emailNote',
          type: 'text',
          defaultValue: 'Your receipt and download links are sent here.',
        },
      ],
    },
    {
      type: 'group',
      name: 'billing',
      label: 'Billing details',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Billing details' },
        {
          name: 'intro',
          type: 'text',
          defaultValue: 'Appears on your invoice. Card data is handled securely by Stripe.',
        },
        {
          name: 'fieldLabels',
          type: 'group',
          label: 'Field labels',
          fields: [
            { name: 'fullName', type: 'text', defaultValue: 'Full name' },
            { name: 'company', type: 'text', defaultValue: 'Company (optional)' },
            { name: 'country', type: 'text', defaultValue: 'Country' },
            { name: 'addressLine1', type: 'text', defaultValue: 'Address' },
            { name: 'addressLine2', type: 'text', defaultValue: 'Apartment, suite, etc. (optional)' },
            { name: 'city', type: 'text', defaultValue: 'City' },
            { name: 'state', type: 'text', defaultValue: 'State / Province' },
            { name: 'postalCode', type: 'text', defaultValue: 'Postal code' },
            { name: 'taxId', type: 'text', defaultValue: 'Tax ID / VAT (optional)' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'payment',
      label: 'Payment & place order',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Payment' },
        {
          name: 'placeOrderLabel',
          type: 'text',
          label: 'Place-order button',
          defaultValue: 'Place order',
        },
        {
          name: 'processingLabel',
          type: 'text',
          label: 'Processing button label',
          defaultValue: 'Processing…',
        },
        {
          name: 'trustLine',
          type: 'text',
          defaultValue:
            'Payments are processed securely by Stripe. CSA never sees or stores your card details.',
        },
        {
          name: 'termsLine',
          type: 'textarea',
          label: 'Terms / consent copy',
          defaultValue:
            'By placing your order you agree to CSA’s Terms of Service and Privacy Policy. Digital goods are delivered instantly and covered by our 14-day refund policy.',
        },
      ],
    },
    seoField,
  ],
}
