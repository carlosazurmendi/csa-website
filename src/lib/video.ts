/**
 * Map an external lesson video URL to an embeddable iframe src. Returns null for
 * URLs we play directly in a <video> element (e.g. an .mp4). Dependency-free →
 * safe in client components.
 */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return null
}
