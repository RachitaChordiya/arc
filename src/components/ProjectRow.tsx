import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import './ProjectRow.css'

type SpotlightState = 'none' | 'focused' | 'dimmed'

type Props = {
  project: Project
  index: number
  spotlight?: SpotlightState
  registerEl?: (id: string, el: HTMLElement | null) => void
}

export function ProjectRow({
  project,
  index,
  spotlight = 'none',
  registerEl,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    registerEl?.(project.id, el)
    return () => registerEl?.(project.id, null)
  }, [project.id, registerEl])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const mediaStyle = {
    '--reveal-delay': `${Math.min(index, 4) * 60}ms`,
    '--img-zoom': String(project.zoom),
    '--img-position': project.position,
  } as CSSProperties

  const spotlightClass =
    spotlight === 'focused'
      ? ' is-spotlight'
      : spotlight === 'dimmed'
        ? ' is-dimmed'
        : ''

  return (
    <Link
      ref={ref}
      to={`/project/${project.id}`}
      className={`project-row${visible ? ' is-visible' : ''}${spotlightClass}`}
      style={mediaStyle}
      aria-label={`View project: ${project.title}`}
    >
      <div className="project-row__media-wrap">
        <div className={`project-row__media project-row__media--${project.fit}`}>
          <img
            src={project.image}
            alt=""
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className="project-row__meta">
            <h2 className="project-row__title">{project.title}</h2>
            <p className="project-row__subtitle">{project.subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
