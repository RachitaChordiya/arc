/**
 * Intro / loading-page arc (viewBox 0 0 1000 1000).
 * Keep this geometry stable — content-page tuning uses buildContentArcGeometry below.
 */
export const ARC_D = 'M 140 180 A 780 780 0 0 1 820 860'

/** Approximate path length for intro stroke-dash animation */
export const ARC_LENGTH = 980

export type ContentArcGeometry = {
  viewBox: string
  width: number
  height: number
  /** Open curve top → bottom (no stroke on content; kept for sampling/debug). */
  curveD: string
  /** Closed path: curve + right edge → brick fill (white is the complement). */
  brickFillD: string
}

/** Use the mid portion of a half-sine so end tangents stay gentle (less diagonal). */
const SINE_T0 = 0.14
const SINE_T1 = 0.86

/**
 * Longitudinal content-page split in page pixels.
 *
 * Built in width × scrollHeight space (viewBox matches CSS size 1:1) so the
 * curve is never flattened by stretching a square viewBox over a tall page.
 *
 * Geometry: half-sine bow along Y (mid-phase only) — start/end share the same
 * lateral offset, clear mid-page bow. Fitted as a cubic Bézier via Hermite
 * using the sine’s endpoint derivatives.
 */
export function buildContentArcGeometry(
  width: number,
  height: number,
): ContentArcGeometry {
  const w = Math.max(1, width)
  const h = Math.max(1, height)

  const amp = w * 0.28
  const x0 = contentArcXAt(w, 0)
  const x1 = contentArcXAt(w, 1)

  // dx/du where u ∈ [0,1] maps into sine phase [SINE_T0, SINE_T1]
  const span = SINE_T1 - SINE_T0
  const dx0 = amp * Math.PI * span * Math.cos(Math.PI * SINE_T0)
  const dx1 = amp * Math.PI * span * Math.cos(Math.PI * SINE_T1)

  const c1x = x0 + dx0 / 3
  const c1y = h / 3
  const c2x = x1 - dx1 / 3
  const c2y = (2 * h) / 3

  const curveD = `M ${round(x0)} 0 C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(x1)} ${round(h)}`
  const brickFillD = `${curveD} L ${round(w)} ${round(h)} L ${round(w)} 0 Z`

  return {
    viewBox: `0 0 ${round(w)} ${round(h)}`,
    width: w,
    height: h,
    curveD,
    brickFillD,
  }
}

/** Evaluate the content-arc x at normalized y ∈ [0,1] (sine model). */
export function contentArcXAt(width: number, t: number): number {
  const w = Math.max(1, width)
  const mid = w * 0.42
  const amp = w * 0.28
  const u = Math.min(1, Math.max(0, t))
  const phase = SINE_T0 + (SINE_T1 - SINE_T0) * u
  return mid + amp * Math.sin(Math.PI * phase)
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}
