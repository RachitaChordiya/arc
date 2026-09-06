import { useCallback, useEffect, useState } from 'react'
import './ImageCarousel.css'

const AUTO_MS = 4000

type Props = {
  images: string[]
  alt: string
  fit?: 'cover' | 'contain'
}

export function ImageCarousel({ images, alt, fit = 'cover' }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = images.length

  const go = useCallback(
    (next: number) => {
      if (count <= 1) return
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  useEffect(() => {
    setIndex(0)
  }, [images])

  useEffect(() => {
    if (count <= 1) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft') go(index - 1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count, go, index])

  useEffect(() => {
    if (count <= 1 || paused) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count)
    }, AUTO_MS)

    return () => window.clearInterval(id)
  }, [count, paused, images])

  if (count === 0) return null

  return (
    <div
      className="image-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="image-carousel__viewport">
        <div
          className="image-carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className={`image-carousel__slide image-carousel__slide--${fit}`}
              aria-hidden={i !== index}
            >
              <img
                src={src}
                alt={`${alt} - ${i + 1} of ${count}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="image-carousel__nav image-carousel__nav--prev"
            aria-label="Previous image"
            onClick={() => go(index - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="image-carousel__nav image-carousel__nav--next"
            aria-label="Next image"
            onClick={() => go(index + 1)}
          >
            ›
          </button>

          <div className="image-carousel__dots" role="tablist" aria-label="Gallery slides">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Image ${i + 1}`}
                className={`image-carousel__dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
