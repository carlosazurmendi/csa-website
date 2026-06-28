import Image from 'next/image'

/**
 * next/image wrapper for CMS-managed media (M8). Public media is served same-origin
 * under /api/media/file/** (Payload S3 plugin, default access-controlled URLs), which
 * next.config `images.localPatterns` already allows the optimizer to read — so these
 * get responsive srcset, modern formats, and lazy-loading with no extra config.
 *
 * Takes a pre-resolved `src` (every call site already computes one via mediaUrl /
 * resolveAuthor) and renders nothing when it is empty — the same graceful empty state
 * as the `{url && <img …>}` guards it replaces.
 *
 * Two modes, both pixel-faithful to the verbatim design CSS (which sizes the image via
 * a descendant `.container img { width:100%; height:100%; object-fit:… }` rule):
 *
 *  • fill (default) — for containers that are `position: relative|absolute` and sized
 *    (aspect-ratio or fixed). next/image absolutely fills them; pass `sizes` so the
 *    srcset matches the real rendered width instead of defaulting to 100vw.
 *  • fixed (pass width+height) — for the few small boxes that are NOT positioned
 *    (round avatars, the client-logo chip). We give intrinsic dims = the box size so
 *    there is no CLS and no aspect-ratio warning; the existing `… img{width/height
 *    :100%}` CSS then stretches it to fill, exactly as the plain <img> did. This
 *    avoids adding `position: relative` to the ported CSS, keeping it byte-for-byte.
 */
export function CmsImage({
  src,
  alt,
  sizes,
  objectFit = 'cover',
  priority = false,
  width,
  height,
}: {
  src: string | null | undefined
  alt: string
  sizes?: string
  objectFit?: 'cover' | 'contain'
  priority?: boolean
  width?: number
  height?: number
}) {
  if (!src) return null

  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        style={{ objectFit }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? '100vw'}
      priority={priority}
      style={{ objectFit }}
    />
  )
}
