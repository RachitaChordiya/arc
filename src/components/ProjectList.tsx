import { useCallback, useEffect, useRef, useState } from 'react'
import { CATEGORIES, getProjectsByCategory } from '../data/projects'
import { ProjectRow } from './ProjectRow'
import './ProjectList.css'

export function ProjectList() {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [spotlightOn, setSpotlightOn] = useState(false)
  const rowRefs = useRef(new Map<string, HTMLElement>())
  const reducedMotionRef = useRef(false)
  const scheduleMeasureRef = useRef<() => void>(() => {})

  const registerRow = useCallback((id: string, el: HTMLElement | null) => {
    if (el) rowRefs.current.set(id, el)
    else rowRefs.current.delete(id)
    scheduleMeasureRef.current()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncMotionPreference = () => {
      const reduced = mq.matches
      reducedMotionRef.current = reduced
      setSpotlightOn(!reduced)
      if (reduced) setFocusedId(null)
    }

    let raf = 0
    const measure = () => {
      raf = 0
      if (reducedMotionRef.current) return

      // Prefer content center below sticky header
      const headerOffset =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--header-h',
          ),
        ) || 0
      const centerY = headerOffset + (window.innerHeight - headerOffset) * 0.5
      let bestId: string | null = null
      let bestDist = Number.POSITIVE_INFINITY

      for (const [id, el] of rowRefs.current) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue

        const mid = rect.top + rect.height / 2
        const dist = Math.abs(mid - centerY)
        if (dist < bestDist) {
          bestDist = dist
          bestId = id
        }
      }

      setFocusedId((prev) => (prev === bestId ? prev : bestId))
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(measure)
    }
    scheduleMeasureRef.current = schedule

    syncMotionPreference()
    schedule()

    const onMotionChange = () => {
      syncMotionPreference()
      schedule()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    mq.addEventListener('change', onMotionChange)

    return () => {
      scheduleMeasureRef.current = () => {}
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mq.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <main className={`project-list${spotlightOn ? ' has-spotlight' : ''}`}>
      {CATEGORIES.map((cat) => {
        const items = getProjectsByCategory(cat.id)
        if (items.length === 0) return null

        return (
          <section
            key={cat.id}
            id={cat.id}
            className="project-section"
            aria-labelledby={`${cat.id}-heading`}
          >
            <h2 id={`${cat.id}-heading`} className="visually-hidden">
              {cat.label}
            </h2>

            <div className="project-section__stack">
              {items.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  registerEl={registerRow}
                  spotlight={
                    !spotlightOn || !focusedId
                      ? 'none'
                      : focusedId === project.id
                        ? 'focused'
                        : 'dimmed'
                  }
                />
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
