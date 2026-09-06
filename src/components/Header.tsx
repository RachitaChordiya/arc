import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CATEGORIES, getProjectsByCategory, type Category } from '../data/projects'
import './Header.css'

const NAV_CATEGORIES = CATEGORIES.filter(
  (cat) => getProjectsByCategory(cat.id).length > 0,
)

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const isAbout = location.pathname === '/about'
  const isSocials = location.pathname === '/socials'
  const [active, setActive] = useState<Category>(
    NAV_CATEGORIES[0]?.id ?? 'architecture',
  )

  useEffect(() => {
    if (!isHome) return

    const sections = NAV_CATEGORIES.map((cat) =>
      document.getElementById(cat.id),
    ).filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as Category)
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  const goToSection = (id: Category) => {
    if (!isHome) {
      navigate(`/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  useEffect(() => {
    if (!isHome || !location.hash) return
    const id = location.hash.replace('#', '') as Category
    const el = document.getElementById(id)
    if (!el) return
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
    })
  }, [isHome, location.hash])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-brand" aria-label="ARC home">
          <img
            className="site-brand__logo"
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="arc"
          />
        </Link>

        <nav className="site-nav" aria-label="Project categories">
          {NAV_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`site-nav__link${isHome && active === cat.id ? ' is-active' : ''}`}
              onClick={() => goToSection(cat.id)}
            >
              <span className="site-nav__dot" aria-hidden="true" />
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="site-header__links">
          <Link
            to="/about"
            className={`site-header__meta-link${isAbout ? ' is-active' : ''}`}
          >
            About
          </Link>
          <Link
            to="/socials"
            className={`site-header__meta-link${isSocials ? ' is-active' : ''}`}
          >
            Socials
          </Link>
        </div>
      </div>
    </header>
  )
}
