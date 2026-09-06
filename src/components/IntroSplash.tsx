import { useEffect, useState } from 'react'
import { ARC_D } from '../data/arcPath'
import './IntroSplash.css'

type Props = {
  onComplete: () => void
}

export function IntroSplash({ onComplete }: Props) {
  const [phase, setPhase] = useState<'draw' | 'logo' | 'exit' | 'done'>('draw')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onComplete()
      return
    }

    const logoTimer = window.setTimeout(() => setPhase('logo'), 1400)
    const exitTimer = window.setTimeout(() => {
      setPhase('exit')
      onComplete()
    }, 3000)
    const doneTimer = window.setTimeout(() => setPhase('done'), 3800)

    return () => {
      window.clearTimeout(logoTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      className={`intro-splash intro-splash--${phase}`}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        className="intro-splash__canvas"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="intro-stone"
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

          <clipPath id="intro-brick-side" clipPathUnits="userSpaceOnUse">
            <path d={`${ARC_D} L 1000 1000 L 1000 0 Z`} />
          </clipPath>
        </defs>

        {/* Stone side of the arc split */}
        <rect
          className="intro-splash__brick-side"
          x="0"
          y="0"
          width="1000"
          height="1000"
          fill="url(#intro-stone)"
          clipPath="url(#intro-brick-side)"
        />
        {/* Soft wash so the stone reads lighter */}
        <rect
          x="0"
          y="0"
          width="1000"
          height="1000"
          fill="#ffffff"
          opacity="0.55"
          clipPath="url(#intro-brick-side)"
        />

        {/* Black line follows the same differentiation path */}
        <path
          className="intro-splash__arc-path"
          d={ARC_D}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>

      <div className="intro-splash__brand">
        <img
          className="intro-splash__logo"
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="ARC"
        />
      </div>
    </div>
  )
}
