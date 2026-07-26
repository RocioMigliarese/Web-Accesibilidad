import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type AccessibilityFont = 'default' | 'opendyslexic' | 'atkinson'

interface AccessibilityState {
  font: AccessibilityFont
  lineHeight: number       // 1.0 – 2.5
  letterSpacing: number    // 0 – 10 (px)
  calmColors: boolean
  readingGuide: boolean
  tts: boolean

  setFont: (font: AccessibilityFont) => void
  setLineHeight: (value: number) => void
  setLetterSpacing: (value: number) => void
  toggleCalmColors: () => void
  toggleReadingGuide: () => void
  toggleTTS: () => void
  resetAccessibility: () => void
}

const DEFAULTS = {
  font: 'default' as AccessibilityFont,
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

        setFont: (font) => set({ font }),
        setLineHeight: (lineHeight) => set({ lineHeight }),
        setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
        toggleCalmColors: () =>
          set((state) => ({ calmColors: !state.calmColors })),
        toggleReadingGuide: () =>
          set((state) => ({ readingGuide: !state.readingGuide })),
        toggleTTS: () => set((state) => ({ tts: !state.tts })),
        resetAccessibility: () => set(DEFAULTS),
      }),
      { name: 'colorability-accessibility' }
    ),
    { name: 'accessibility-store' }
  )
)
