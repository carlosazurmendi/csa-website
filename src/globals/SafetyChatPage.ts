import type { GlobalConfig } from 'payload'

/**
 * Copy for the Safety Chat tool page (Resources/Safety Chat.html). Phase 1
 * ships the chat area as a STATIC UI SHELL — the composer is inert (no live
 * model, inputs disabled), the thread renders a sample exchange, and a sign-in
 * lock overlays the composer. This global holds the hero copy, the panel
 * sample thread + suggestions + composer/lock copy, and the closing CTA.
 *
 * Registered in payload.config.ts under slug: 'safetyChatPage'. The seo plugin
 * adds a `meta` group (meta.title / meta.description) consumed by
 * generateMetadata.
 */
export const SafetyChatPage: GlobalConfig = {
  slug: 'safetyChatPage',
  label: 'Safety Chat Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ---------------------------------------------------------------- HERO
        {
          label: 'Hero',
          fields: [
            {
              type: 'group',
              name: 'hero',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Safety Chat' },
                { name: 'eyebrowIcon', type: 'text', defaultValue: 'message-square-text' },
                { name: 'ghost', type: 'text', defaultValue: 'Safety Chat', admin: { description: 'Large background watermark word.' } },
                { name: 'title', type: 'text', defaultValue: 'Safety Chat: immediate engineering insight.' },
                { name: 'sub', type: 'textarea' },
                { name: 'note', type: 'textarea', label: 'Inline note (info callout)' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Ask Safety Chat' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Talk to an Engineer' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },
        // ----------------------------------------------------------- CHAT PANEL
        {
          label: 'Chat Panel',
          fields: [
            {
              type: 'group',
              name: 'panel',
              label: 'Chat panel (static UI preview)',
              admin: { description: 'Phase 1: inert composer, no live model. Sample thread only.' },
              fields: [
                { name: 'name', type: 'text', defaultValue: 'Safety Chat' },
                { name: 'status', type: 'text', defaultValue: 'AI Assistant' },
                { name: 'tag', type: 'text', defaultValue: 'AI-Augmented' },
                {
                  name: 'thread',
                  type: 'array',
                  label: 'Sample thread',
                  fields: [
                    {
                      name: 'who',
                      type: 'select',
                      required: true,
                      defaultValue: 'bot',
                      options: [
                        { label: 'Bot', value: 'bot' },
                        { label: 'User', value: 'user' },
                      ],
                    },
                    { name: 'text', type: 'textarea', required: true },
                  ],
                },
                {
                  name: 'suggestions',
                  type: 'array',
                  label: 'Suggestion chips',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
                { name: 'placeholder', type: 'text', defaultValue: 'Ask a functional safety question…' },
                { name: 'lockText', type: 'textarea', label: 'Sign-in lock text', defaultValue: 'Sign in to start chatting. Safety Chat is available to logged-in users.' },
                {
                  type: 'row',
                  fields: [
                    { name: 'lockCtaLabel', type: 'text', defaultValue: 'Sign in to chat' },
                    { name: 'lockCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------------- CLOSING
        {
          label: 'Closing CTA',
          fields: [
            {
              type: 'group',
              name: 'closing',
              label: 'Closing CTA',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Move faster' },
                { name: 'title', type: 'text', defaultValue: 'Ask Safety Chat.' },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', defaultValue: 'Ask Safety Chat' },
                    { name: 'ctaHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
