/**
 * attachTilt — edge-glitch-proof pointer 3D-tilt tracking.
 *
 * The naive approach (mousemove + mouseleave bound to the tilting element)
 * jitters near the edges: the element rotates so the hovered edge recedes from
 * the viewer and slips out from under the cursor, the browser fires a false
 * `mouseleave`, the card snaps flat, the cursor is now back over the flat card,
 * it re-tilts… a flicker loop the user sees as the card "glitching out" near its
 * edges.
 *
 * Fix: never trust the element's own mouseleave. On a genuine `mouseenter` we
 * start tracking at the DOCUMENT level and recompute the pointer position
 * against the element's bounding box on every move. While the pointer is inside
 * that box we tilt; we reset exactly once, when the pointer truly leaves the box
 * (not when a rotated edge happens to recede under it). The box is the stable,
 * axis-aligned footprint, so there is no flicker.
 *
 * onEnter/onLeave fire once per genuine enter/leave (after onReset) for callers
 * that mount/unmount hover-only affordances (e.g. liquid-metal rings, glows).
 */
export type TiltHandlers = {
  onTilt: (px: number, py: number) => void
  onReset: () => void
  onEnter?: () => void
  onLeave?: () => void
}

export function attachTilt(el: HTMLElement, h: TiltHandlers): () => void {
  let active = false

  const inBox = (x: number, y: number): { px: number; py: number } | null => {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) return null
    if (x < r.left || x > r.right || y < r.top || y > r.bottom) return null
    return { px: (x - r.left) / r.width, py: (y - r.top) / r.height }
  }

  const onDocMove = (e: MouseEvent) => {
    const p = inBox(e.clientX, e.clientY)
    if (!p) {
      stop()
      return
    }
    h.onTilt(p.px, p.py)
  }

  const start = (e: MouseEvent) => {
    if (active) return
    if (!inBox(e.clientX, e.clientY)) return
    active = true
    document.addEventListener('mousemove', onDocMove, true)
    h.onEnter?.()
  }

  function stop() {
    if (!active) return
    active = false
    document.removeEventListener('mousemove', onDocMove, true)
    h.onReset()
    h.onLeave?.()
  }

  el.addEventListener('mouseenter', start)

  return () => {
    el.removeEventListener('mouseenter', start)
    if (active) {
      active = false
      document.removeEventListener('mousemove', onDocMove, true)
    }
  }
}
