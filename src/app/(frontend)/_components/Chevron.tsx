/**
 * React-owned chevron icons (lucide geometry, inline SVG). Used in the carousel
 * prev/next arrows instead of `<i data-lucide>`: the runtime lucide swap recreates
 * the icon element on every carousel re-render, and a real click whose mousedown/
 * mouseup straddled that swap fired NO click — the "arrows sometimes don't work"
 * bug. A React-owned SVG never gets swapped, so the arrows are always clickable.
 */

type Props = { className?: string }

const SVG = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export function ChevronLeft({ className }: Props) {
  return (
    <svg {...SVG} className={'lucide lucide-chevron-left' + (className ? ' ' + className : '')}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

export function ChevronRight({ className }: Props) {
  return (
    <svg {...SVG} className={'lucide lucide-chevron-right' + (className ? ' ' + className : '')}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function ChevronDown({ className }: Props) {
  return (
    <svg {...SVG} className={'lucide lucide-chevron-down' + (className ? ' ' + className : '')}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
