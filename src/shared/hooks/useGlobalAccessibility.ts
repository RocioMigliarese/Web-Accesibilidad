import { useEffect } from 'react'
import { useAccessibilityStore } from '../../features/dyslexia/store/useAccessibilityStore'

const COLOR_MODE_CLASSES = [
  'cm-deuteranopia',
  'cm-protanopia',
  'cm-tritanopia',
  'cm-achromatopsia',
] as const

/**
 * Applies accessibility preferences globally to document.body and :root CSS variables.
 * Must be called once at the layout/root level (MainLayout).
 *
 * Controls:
 * - body class: cm-deuteranopia | cm-protanopia | cm-tritanopia | cm-achromatopsia
 *   → overrides --color-brand-purple / --color-brand-purple-light in CSS
 * - body class: font-atkinson | font-opendyslexic | (none = Inter)
 * - body class: calm-colors
 * - :root CSS var: --a11y-line-height
 * - :root CSS var: --a11y-letter-spacing
 */
export function useGlobalAccessibility() {
  const { colorMode, font, fontSize, lineHeight, letterSpacing, calmColors } =
    useAccessibilityStore()

  // Color mode class on body
  useEffect(() => {
    const body = document.body
    COLOR_MODE_CLASSES.forEach((cls) => body.classList.remove(cls))
    if (colorMode !== 'default') {
      body.classList.add(`cm-${colorMode}`)
    }
  }, [colorMode])

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

  // CSS custom properties on :root
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--a11y-font-size', `${fontSize}px`)
    root.style.setProperty('--a11y-line-height', String(lineHeight))
    root.style.setProperty('--a11y-letter-spacing', `${letterSpacing}px`)
  }, [fontSize, lineHeight, letterSpacing])
}
