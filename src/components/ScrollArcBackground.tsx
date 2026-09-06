import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { buildContentArcGeometry } from '../data/arcPath'
import './ScrollArcBackground.css'

type Size = { width: number; height: number }

function measurePageSize(): Size {
  const content = document.querySelector('.app__content') as HTMLElement | null
  const width = document.documentElement.clientWidth || window.innerWidth

  // Measure in-flow content only — the absolute arc must not feed back into height.
  const height = Math.max(
    content?.scrollHeight ?? 0,
    document.documentElement.clientHeight,
    window.innerHeight,
  )

  return { width, height }
}

/**
 * Brick/white longitudinal split behind content.
 * Absolute, full document height — scrolls with the page (not fixed viewport).
 * No stroke — unlike the intro black line.
 */
export function ScrollArcBackground() {
  const { pathname } = useLocation()
  const [size, setSize] = useState<Size>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }))

  useEffect(() => {
    let frame = 0

    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const next = measurePageSize()
        setSize((prev) =>
          prev.width === next.width && prev.height === next.height
            ? prev
            : next,
        )
      })
    }

    measure()

    const ro = new ResizeObserver(measure)
    const content = document.querySelector('.app__content')
    const root = document.getElementById('root')
    if (content) ro.observe(content)
    if (root) ro.observe(root)
    ro.observe(document.documentElement)

    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)

    // Images / late layout after route or intro
    const imgs = Array.from(document.images)
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true })
    })

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [pathname])

  const geom =
    size.width > 0 && size.height > 0
      ? buildContentArcGeometry(size.width, size.height)
      : null

  return (
    <div
      className="scroll-arc"
      style={{ height: size.height || '100%' }}
      aria-hidden="true"
    >
      {geom && (
        <svg
          className="scroll-arc__canvas"
          viewBox={geom.viewBox}
          width={geom.width}
          height={geom.height}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="scroll-stone"
              width="480"
              height="480"
              patternUnits="userSpaceOnUse"
            >
              <image
                href={`${import.meta.env.BASE_URL}images/stone-texture.jpg`}
                width="480"
                height="480"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>

          {/* White base (left of the curve) */}
          <rect
            x="0"
            y="0"
            width={geom.width}
            height={geom.height}
            fill="#ffffff"
          />

          {/* Stone on the right of the longitudinal curve */}
          <path d={geom.brickFillD} fill="url(#scroll-stone)" />
          <path d={geom.brickFillD} fill="#ffffff" opacity="0.55" />
        </svg>
      )}
    </div>
  )
}
