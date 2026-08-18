'use client'

import { useEffect, useRef } from 'react'

/**
 * ScrollIndicator — custom page scrollbar for the marketing shell. The UA
 * scrollbar is hidden site-wide (colors_and_type.css), so this is the page's
 * only scroll affordance: a thin translucent bar on the right edge that
 * thickens to an opaque gold foil when hovered or grabbed. Dragging maps 1:1
 * to the window scroll position, routed through Lenis (immediate, no lerp)
 * when SmoothScroll is live so the two never fight over the same frame.
 *
 * Pointer-only chrome: hidden on coarse/touch pointers (native inertia scroll
 * needs no grab handle) and aria-hidden — keyboard and screen-reader users
 * scroll the document natively, exactly as with a UA scrollbar.
 */
export function ScrollIndicator() {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!track || !thumb) return
    // No JS gate for coarse pointers — only the CSS media query hides the
    // track. A mount-time matchMedia early-return bricked 2-in-1s: load in
    // tablet mode, dock the mouse, and the CSS shows a track that never got
    // listeners or a layout() pass. Keeping the wiring live costs one rAF of
    // two style writes per scroll frame on devices where it's hidden.

    const MIN_THUMB = 48
    let raf = 0
    let dragging = false
    let dragPointerId = -1
    let dragTrackTop = 0
    let dragTrackH = 0
    let grabOffset = 0
    let thumbH = MIN_THUMB

    const metrics = () => {
      const winH = window.innerHeight
      const docH = document.documentElement.scrollHeight
      return { winH, docH, range: docH - winH }
    }

    const layout = () => {
      raf = 0
      const { winH, docH, range } = metrics()
      if (range <= 1) {
        track.dataset.hidden = 'true'
        return
      }
      // Unhide BEFORE measuring — a display:none track has clientHeight 0,
      // which would park the thumb off-screen until the next scroll event.
      delete track.dataset.hidden
      const trackH = track.clientHeight
      thumbH = Math.max(MIN_THUMB, Math.round((winH / docH) * trackH))
      const maxTop = trackH - thumbH
      const top = Math.min(maxTop, Math.max(0, (window.scrollY / range) * maxTop))
      thumb.style.height = `${thumbH}px`
      thumb.style.transform = `translateY(${top}px)`
      track.dataset.ready = 'true'
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(layout)
    }

    const setScroll = (y: number) => {
      if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true })
      else window.scrollTo(0, y)
    }

    // Track geometry is cached at drag start (dragTrackTop/dragTrackH): it is
    // invariant for the gesture, and re-reading layout per pointermove can
    // flush pending style/layout work mid-drag. scrollHeight IS re-read each
    // move — content can lazy-mount while dragging and the mapping must stay
    // live. thumbH stays a closure read so a mid-drag layout() keeps both in
    // step.
    const dragTo = (clientY: number) => {
      const { range } = metrics()
      const maxTop = dragTrackH - thumbH
      if (maxTop <= 0 || range <= 0) return
      const top = Math.min(maxTop, Math.max(0, clientY - dragTrackTop - grabOffset))
      setScroll((top / maxTop) * range)
      schedule()
    }

    const onPointerDown = (e: PointerEvent) => {
      // One pointer owns a drag: a second pointerdown mid-drag must not clobber
      // grabOffset or steal the capture.
      if (e.button !== 0 || dragging) return
      e.preventDefault()
      // All geometry reads happen BEFORE the scrollx-dragging class lands —
      // its universal cursor rule style-invalidates the whole document, and a
      // layout read after it would force that recalc synchronously here.
      const trackRect = track.getBoundingClientRect()
      dragTrackTop = trackRect.top
      dragTrackH = trackRect.height
      // Grabbing the thumb keeps the grip point under the pointer; pressing the
      // empty track centres the thumb on the pointer and drags from there.
      grabOffset =
        e.target === thumb ? e.clientY - thumb.getBoundingClientRect().top : thumbH / 2
      dragging = true
      dragPointerId = e.pointerId
      track.setPointerCapture(e.pointerId)
      dragTo(e.clientY)
      track.dataset.drag = 'true'
      document.documentElement.classList.add('scrollx-dragging')
    }
    const onPointerMove = (e: PointerEvent) => {
      if (dragging && e.pointerId === dragPointerId) dragTo(e.clientY)
    }
    const endDrag = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== dragPointerId) return
      dragging = false
      dragPointerId = -1
      delete track.dataset.drag
      document.documentElement.classList.remove('scrollx-dragging')
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', endDrag)
    track.addEventListener('pointercancel', endDrag)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Content height changes without a resize (accordions, lazy sections).
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)
    layout()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', endDrag)
      track.removeEventListener('pointercancel', endDrag)
      document.documentElement.classList.remove('scrollx-dragging')
    }
  }, [])

  return (
    <div ref={trackRef} className="scrollx" aria-hidden="true">
      <div ref={thumbRef} className="scrollx__thumb" />
    </div>
  )
}
