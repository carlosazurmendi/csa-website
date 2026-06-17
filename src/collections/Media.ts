import type { CollectionConfig } from 'payload'

/**
 * Media upload collection. Storage backend is abstracted in payload.config.ts:
 * Supabase Storage (S3-compatible) when S3_* env is set, else local disk
 * (./media) for zero-config local dev. Phase 2 only flips env vars.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  upload: {
    // staticDir is used only by the local-disk adapter (dev fallback).
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text',
      admin: {
        description: 'Describe the image for accessibility and SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
