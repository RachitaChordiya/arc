import { useCallback, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { IntroSplash } from './components/IntroSplash'
import { ScrollArcBackground } from './components/ScrollArcBackground'
import { ScrollArrows } from './components/ScrollArrows'
import { ScrollToTop } from './components/ScrollToTop'
import { SiteFooter } from './components/SiteFooter'
import './components/SiteFooter.css'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'
import { SocialsPage } from './pages/SocialsPage'
import './App.css'

export default function App() {
  const { pathname } = useLocation()
  // Splash only on the initial home visit for this app mount
  const [ready, setReady] = useState(() => pathname !== '/')
  const [showSplash, setShowSplash] = useState(() => pathname === '/')

  const handleIntroComplete = useCallback(() => {
    setReady(true)
    window.setTimeout(() => setShowSplash(false), 800)
  }, [])

  return (
    <div className={`app${ready ? ' is-ready' : ' is-intro'}`}>
      <ScrollToTop />
      {showSplash && <IntroSplash onComplete={handleIntroComplete} />}
      {ready && <ScrollArcBackground />}
      <div className="app__content">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/socials" element={<SocialsPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/project/:id/:variantId" element={<ProjectPage />} />
        </Routes>
        {ready && <SiteFooter />}
      </div>
      {ready && <ScrollArrows />}
    </div>
  )
}
