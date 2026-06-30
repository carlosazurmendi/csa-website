/**
 * Cache-busting version for fixed-name `/csa/*` assets (the shader engine, motion
 * engine, vendored JS). These are NOT hash-named, so a deploy's new bytes would
 * otherwise sit behind the browser/CDN cache until it expires. Appending `?v=`
 * makes every build's URLs unique, busting both layers — no Cloudflare purge
 * needed, and it works on any domain (with or without a CDN in front).
 *
 * NEXT_PUBLIC_ASSET_VERSION is stamped per build in next.config.mjs. In local dev
 * it falls back to a constant (cache-busting matters for deploys, not dev).
 */
export const ASSET_V = process.env.NEXT_PUBLIC_ASSET_VERSION || 'dev'

/** Append the build version to a fixed-name asset path: `/csa/x.js` → `/csa/x.js?v=<build>`. */
export const va = (path: string): string => `${path}?v=${ASSET_V}`
