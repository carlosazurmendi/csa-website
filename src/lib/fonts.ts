import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'

/**
 * Self-hosted webfonts (M8). next/font downloads these at BUILD time and serves the
 * woff2 from /_next/static (hashed, immutable) — replacing the two render-blocking
 * `@import url(fonts.googleapis.com…)` requests the design's CSS used to make on every
 * page load. Each face exposes a CSS variable that the design tokens point at
 * (colors_and_type.css `--font-display/-body/-mono`; the hero HUD uses
 * `--font-space-grotesk` directly). `display: 'swap'` mirrors the old `&display=swap`.
 *
 * Families + weights match exactly what the export loaded:
 *   Archivo 500–900 (display) · IBM Plex Sans 400–700 (body) ·
 *   IBM Plex Mono 400–700 (mono) · Space Grotesk 300–700 (hero labels).
 */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

/** Space-joined `.variable` classNames — set on each route group's <html> so the
 *  four font CSS variables resolve everywhere the design system renders. */
export const fontVariables = `${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable}`
