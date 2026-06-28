import type { CollectionConfig } from 'payload'
import { editorWrite, adminOnly } from '@/access'

/**
 * Protected media — PRIVATE, purchase/enrolment-gated files: the actual template
 * deliverables (Products.downloadableFile) and uploaded lesson videos
 * (Courses → lesson.video). M9 / M7-debt #1.
 *
 * Backed by a separate PRIVATE Supabase Storage bucket (`S3_PROTECTED_BUCKET`,
 * acl: private — see the second s3Storage plugin in src/payload.config.ts), so
 * these objects have NO public URL. They are never served by Payload's public file
 * route (read access is admin-only); delivery happens exclusively through the
 * owner/enrolment-gated routes (/download/[entitlementId], the course player),
 * which mint a short-lived presigned GET and 302 the browser to it
 * (src/lib/protectedMedia.ts).
 *
 * Distinct from the public `media` collection (marketing imagery, thumbnails),
 * which is world-readable by design.
 */
export const ProtectedMedia: CollectionConfig = {
  slug: 'protected-media',
  labels: { singular: 'Protected file', plural: 'Protected files' },
  admin: {
    group: 'Media',
    useAsTitle: 'filename',
    description:
      'Private, purchase-gated files (template deliverables + lesson videos). Never public — delivered only via short-lived signed URLs after an entitlement / enrollment check.',
  },
  access: {
    // No public read. The /download route and the course player read with
    // overrideAccess AFTER their own owner/enrollment check, then hand back a
    // presigned URL. Editors manage the storefront, so they may upload/replace.
    read: adminOnly,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  upload: {
    // Deliverables + lesson videos: office docs, PDFs, archives, video. NOT display
    // images, so no focal point / crop / responsive image sizes are generated.
    mimeTypes: ['video/*', 'application/pdf', 'application/zip', 'application/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Internal label / description for this file (not shown publicly).' },
    },
  ],
}
