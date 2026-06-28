import Image from 'next/image'

// Static import → Next emits a hashed, immutable-cached asset under /_next/static
// and knows the intrinsic dimensions (126×54), so there is no layout shift. It also
// sidesteps next.config `images.localPatterns` (which restricts the optimizer to
// /api/media/file/**): a string `/csa/logo-white.png` would be BLOCKED, a static
// import is served straight from /_next/static. Display size is controlled by the
// per-surface CSS (`.navx__logo img`, `.ft__logo`, `.cp-top__logo`, …) which set a
// fixed height + `width: auto`; next/image does not warn when one dimension is auto.
import logoWhite from '../../../../public/csa/logo-white.png'

/**
 * The CSA wordmark. Single source for the logo so every surface (nav, footer, the
 * player / assessment / certificate top bars) renders the same statically-optimized
 * asset. Pass `priority` for above-the-fold placements (the header).
 */
export function BrandLogo({
  className,
  alt = 'CSA — Critical Systems Analysis',
  priority = false,
}: {
  className?: string
  alt?: string
  priority?: boolean
}) {
  return <Image src={logoWhite} alt={alt} className={className} priority={priority} />
}
