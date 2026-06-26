import type { CollectionConfig } from 'payload'

/**
 * Public media (marketing imagery, thumbnails, partner logos).
 * Backed by the PUBLIC Supabase Storage bucket when S3 env is present, else local disk.
 * Upload MIME/size hardening and the PROTECTED media collection land in Milestones 5/6.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
  },
  access: {
    // Marketing imagery is world-readable; mutations are admin-only by default (M5 refines).
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Alternative text for accessibility and SEO.',
      },
    },
  ],
}
