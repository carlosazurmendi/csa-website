import type { GlobalConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite } from '@/access'
import { ctaField } from '@/fields/link'

/**
 * Thank You / Order Confirmation (slug 'thank-you-page') — the post-checkout
 * landing page. Covers both states: the "confirming payment" pending state
 * (while the Stripe webhook finalizes the order) and the confirmed success
 * state with the download-library link and what-happens-next copy.
 */
export const ThankYouPage: GlobalConfig = {
  slug: 'thank-you-page',
  dbName: 'thanks',
  label: 'Thank You / Confirmation Page',
  versions: { drafts: true },
  access: { read: publishedOrAdmin, update: editorWrite },
  admin: {
    group: 'Pages',
    description: 'Copy for the order-confirmation page — pending and confirmed states.',
  },
  fields: [
    {
      type: 'group',
      name: 'pending',
      label: 'Confirming-payment (pending) state',
      admin: {
        description:
          'Shown briefly while the payment confirmation is processed before the order is finalized.',
      },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Almost there' },
        { name: 'heading', type: 'text', defaultValue: 'Confirming your payment…' },
        {
          name: 'body',
          type: 'textarea',
          defaultValue:
            'Hang tight — we’re confirming your payment and preparing your downloads. This usually takes just a few seconds and the page will update automatically.',
        },
      ],
    },
    {
      type: 'group',
      name: 'confirmed',
      label: 'Confirmed (success) state',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Order confirmed' },
        { name: 'heading', type: 'text', required: true, defaultValue: 'Thank you for your order!' },
        {
          name: 'body',
          type: 'textarea',
          defaultValue:
            'Your purchase is complete. A receipt and your download links are on their way to your email, and everything you bought is ready to access right now.',
        },
        {
          name: 'orderNumberLabel',
          type: 'text',
          label: 'Order-number label',
          defaultValue: 'Order number',
        },
        {
          name: 'downloadLibraryLabel',
          type: 'text',
          label: 'Download-library link label',
          defaultValue: 'Go to your download library',
        },
        ctaField('ctas', 'Confirmation buttons'),
      ],
    },
    {
      type: 'group',
      name: 'nextSteps',
      label: 'What happens next',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'What happens next' },
        {
          name: 'steps',
          type: 'array',
          label: 'Steps',
          fields: [
            { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
          defaultValue: [
            {
              icon: 'mail',
              title: 'Check your email',
              description:
                'Your receipt and secure download links are sent to the email on your order.',
            },
            {
              icon: 'folder-down',
              title: 'Download anytime',
              description:
                'Account holders can re-download every template they own from the Customer Portal library.',
            },
            {
              icon: 'graduation-cap',
              title: 'Start learning',
              description:
                'Any courses you purchased are unlocked now on your student dashboard.',
            },
          ],
        },
      ],
    },
    seoField,
  ],
}
