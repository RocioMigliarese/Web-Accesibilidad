import { useEffect } from 'react'
import { useAccessibilityStore } from '../../features/dyslexia/store/useAccessibilityStore'

/**
 * Applies accessibility preferences globally to document.body and :root CSS variables.
 * Must be called once at the layout/root level (MainLayout or App).
 *
 * Controls:
 * - body class: font-atkinson | font-opendyslexic | (none = Inter)
 * - body class: calm-colors
 * - :root CSS var: --a11y-line-height
 * - :root CSS var: --a11y-letter-spacing
 */
export function useGlobalAccessibility() {
  const { font, lineHeight, letterSpacing, calmColors } =
    useAccessibilityStore()

  // Font class on body
  useEffect(() => {
    const body = document.body
    body.classList.remove('font-atkinson', 'font-opendyslexic')
    if (font === 'atkinson') body.classList.add('font-atkinson')
    if (font === 'opendyslexic') body.classList.add('font-opendyslexic')
  }, [font])

  // Calm Colors class on body
  useEffect(() => {
    document.body.classList.toggle('calm-colors', calmColors)
  }, [calmColors])

  // CSS custom properties on :root for line-height and letter-spacing
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--a11y-line-height', String(lineHeight))
    root.style.setProperty('--a11y-letter-spacing', `${letterSpacing}px`)
  }, [lineHeight, letterSpacing])
}
