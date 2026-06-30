import type { CollectionConfig } from 'payload'

import { normalizeUploadBuffers } from '@/lib/normalizeUploadBuffers'

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
  hooks: {
    // Normalize SharedArrayBuffer-backed upload buffers so the AWS SDK can hash them.
    beforeChange: [normalizeUploadBuffers],
  },
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    // Focal point + crop so editors control how each image fills its slot.
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumbnail',
    // Responsive variants generated on upload (sharp) and stored alongside the
    // original in the public bucket. Components pick the size their slot needs.
    imageSizes: [
      { name: 'thumbnail', width: 400, position: 'centre' },
      { name: 'card', width: 800, position: 'centre' },
      { name: 'hero', width: 1600, position: 'centre' },
    ],
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
