import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ScrollArrows.css'

const EDGE_PX = 4
const ROW_THRESHOLD_PX = 48

function headerOffset(): number {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
    ) || 0
  )
}

function contentCenterY(): number {
  const header = headerOffset()
  return header + (window.innerHeight - header) * 0.5
}

function projectRows(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.project-row'))
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
}

function scrollByViewport(direction: 1 | -1) {
  const amount = Math.max(240, (window.innerHeight - headerOffset()) * 0.85)
  window.scrollBy({ top: direction * amount, behavior: scrollBehavior() })
}

function scrollRowIntoFocus(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const mid = rect.top + rect.height / 2
  window.scrollBy({ top: mid - contentCenterY(), behavior: scrollBehavior() })
}

function findNextRow(rows: HTMLElement[]): HTMLElement | null {
  const center = contentCenterY()
  for (const row of rows) {
    const rect = row.getBoundingClientRect()
    const mid = rect.top + rect.height / 2
    if (mid > center + ROW_THRESHOLD_PX) return row
  }
  return null
}

function findPrevRow(rows: HTMLElement[]): HTMLElement | null {
  const center = contentCenterY()
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i]
    const rect = row.getBoundingClientRect()
    const mid = rect.top + rect.height / 2
    if (mid < center - ROW_THRESHOLD_PX) return row
  }
  return null
}

function scrollMetrics() {
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  )
  const y = window.scrollY
  return {
    maxScroll,
    canUp: y > EDGE_PX,
    canDown: y < maxScroll - EDGE_PX,
  }
}

export function ScrollArrows() {
  const { pathname } = useLocation()
  const [canUp, setCanUp] = useState(false)
  const [canDown, setCanDown] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const { maxScroll, canUp: up, canDown: down } = scrollMetrics()
      setVisible(maxScroll > EDGE_PX)
      setCanUp(up)
      setCanDown(down)
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    // Layout can settle after route paint / images
    const settle = window.setTimeout(schedule, 120)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    const ro = new ResizeObserver(schedule)
    ro.observe(document.documentElement)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.clearTimeout(settle)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      ro.disconnect()
    }
  }, [pathname])

  const scrollUp = () => {
    if (!canUp) return
    const prev = findPrevRow(projectRows())
    if (prev) scrollRowIntoFocus(prev)
    else scrollByViewport(-1)
  }

  const scrollDown = () => {
    if (!canDown) return
    const next = findNextRow(projectRows())
    if (next) scrollRowIntoFocus(next)
    else scrollByViewport(1)
  }

  if (!visible) return null

  return (
    <div className="scroll-arrows" role="group" aria-label="Page scroll">
      <button
        type="button"
        className="scroll-arrows__btn"
        aria-label="Scroll up"
        disabled={!canUp}
        onClick={scrollUp}
      >
        <svg
          className="scroll-arrows__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M12 7.5 5.75 13.75l1.5 1.5L12 10.5l4.75 4.75 1.5-1.5L12 7.5z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button
        type="button"
        className="scroll-arrows__btn"
        aria-label="Scroll down"
        disabled={!canDown}
        onClick={scrollDown}
      >
        <svg
          className="scroll-arrows__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M12 16.5 5.75 10.25l1.5-1.5L12 13.5l4.75-4.75 1.5 1.5L12 16.5z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}
