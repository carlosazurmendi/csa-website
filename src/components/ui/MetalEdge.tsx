'use client'

import { useState } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'

/**
 * Hosts a live liquid-metal SILVER ring (via the design system's data-metal
 * mechanism — csa-shaders.js mounts the WebGL ring and hides the CSS foil
 * fallback). When `goldOnHover` is set, a GOLD liquid-metal ring is mounted on
 * top while hovered and torn down on leave (so its WebGL context is released
 * between hovers — the design system's budget discipline).
 *
 * `as` lets the same edge wrap a button/link/div.
 */
const goldRing = {
  ring: '',
  thickness: '2px',
  contour: '0.92',
  repetition: '3',
  tint: '#F4D585',
  'color-back': '#7A5E2A',
  distortion: '0.15',
  'data-no-lazy': '',
  'aria-hidden': 'true',
  style: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    zIndex: 2,
    pointerEvents: 'none',
  } as CSSProperties,
}

type Props = {
  as?: ElementType
  className?: string
  goldOnHover?: boolean
  children?: ReactNode
  [key: string]: unknown
}

export function MetalEdge({ as, className, goldOnHover = false, children, ...rest }: Props) {
  const Tag = (as || 'div') as ElementType
  const [hover, setHover] = useState(false)
  return (
    <Tag
      className={className}
      data-metal="silver"
      onMouseEnter={goldOnHover ? () => setHover(true) : undefined}
      onMouseLeave={goldOnHover ? () => setHover(false) : undefined}
      {...rest}
    >
      {goldOnHover && hover ? <csa-liquid-metal {...goldRing} /> : null}
      {children}
    </Tag>
  )
}
