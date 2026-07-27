import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type AccessibilityFont = 'default' | 'opendyslexic' | 'atkinson'

/**
 * Color mode adapts the brand accent to the most accessible color
 * for each type of color vision deficiency.
 *
 * default       → #aa3bff  (brand purple — original)
 * deuteranopia  → #38bdf8  (sky blue    — blue channel intact)
 * protanopia    → #22d3ee  (cyan        — blue channel intact, more luminous)
 * tritanopia    → #fb923c  (orange      — red/yellow channel intact)
 * achromatopsia → #fbbf24  (amber       — maximum luminance contrast)
 */
export type ColorMode =
  | 'default'
  | 'deuteranopia'
  | 'protanopia'
  | 'tritanopia'
  | 'achromatopsia'

interface AccessibilityState {
  colorMode: ColorMode
  font: AccessibilityFont
  fontSize: number         // 19 | 22 | 26
  lineHeight: number       // 1.0 – 2.5
  letterSpacing: number    // 0 – 10 (px)
  calmColors: boolean
  readingGuide: boolean
  tts: boolean

  setColorMode: (mode: ColorMode) => void
  setFont: (font: AccessibilityFont) => void
  setFontSize: (size: number) => void
  setLineHeight: (value: number) => void
  setLetterSpacing: (value: number) => void
  toggleCalmColors: () => void
  toggleReadingGuide: () => void
  toggleTTS: () => void
  resetAccessibility: () => void
}

const DEFAULTS = {
  colorMode: 'default' as ColorMode,
  font: 'default' as AccessibilityFont,
  fontSize: 19,
  lineHeight: 1.5,
  letterSpacing: 0,
  calmColors: false,
  readingGuide: false,
  tts: false,
}

export const useAccessibilityStore = create<AccessibilityState>()(
  devtools(
    persist(
      (set) => ({
        ...DEFAULTS,

        setColorMode: (colorMode) => set({ colorMode }),
        setFont: (font) => set({ font }),
        setFontSize: (fontSize) => set({ fontSize }),
        setLineHeight: (lineHeight) => set({ lineHeight }),
        setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
        toggleCalmColors: () =>
          set((state) => ({ calmColors: !state.calmColors })),
        toggleReadingGuide: () =>
          set((state) => ({ readingGuide: !state.readingGuide })),
        toggleTTS: () => set((state) => ({ tts: !state.tts })),
        resetAccessibility: () => set(DEFAULTS),
      }),
      { name: 'toneSafe-accessibility' }
    ),
    { name: 'accessibility-store' }
  )
)
