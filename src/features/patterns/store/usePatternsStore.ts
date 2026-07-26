import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { HexColor } from '../../../shared/types'

export type PatternId =
  | 'dots'
  | 'lines'
  | 'crosshatch'
  | 'diamonds'
  | 'triangles'
  | 'waves'

interface PatternsState {
  selectedPattern: PatternId | null
  patternColor: HexColor
  backgroundColor: HexColor
  patternScale: number        // 0.5 – 3.0
  patternOpacity: number      // 0 – 1

  setPattern: (id: PatternId | null) => void
  setPatternColor: (hex: HexColor) => void
  setBackgroundColor: (hex: HexColor) => void
  setPatternScale: (scale: number) => void
  setPatternOpacity: (opacity: number) => void
  reset: () => void
}

const DEFAULTS = {
  selectedPattern: null as PatternId | null,
  patternColor: '#aa3bff',
  backgroundColor: '#0f1117',
  patternScale: 1,
  patternOpacity: 0.5,
}

export const usePatternsStore = create<PatternsState>()(
  devtools(
    (set) => ({
      ...DEFAULTS,

      setPattern: (id) => set({ selectedPattern: id }),
      setPatternColor: (hex) => set({ patternColor: hex }),
      setBackgroundColor: (hex) => set({ backgroundColor: hex }),
      setPatternScale: (scale) => set({ patternScale: scale }),
      setPatternOpacity: (opacity) => set({ patternOpacity: opacity }),
      reset: () => set(DEFAULTS),
    }),
    { name: 'patterns-store' }
  )
)
