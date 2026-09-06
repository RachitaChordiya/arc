import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on pathname changes (keep hash scrolls for category nav). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
