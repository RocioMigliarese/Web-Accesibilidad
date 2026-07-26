import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getContrastRatio, getWCAGLevel } from '../utils/wcag'
import type { WCAGLevel } from '../utils/wcag'
import type { HexColor } from '../../../shared/types'

interface ContrastEntry {
  id: string
  foreground: HexColor
  background: HexColor
  ratio: number
  level: WCAGLevel
  timestamp: number
}

interface ContrastState {
  foreground: HexColor
  background: HexColor
  isLargeText: boolean
  history: ContrastEntry[]

  // Derived (computed on demand, not stored)
  setForeground: (hex: HexColor) => void
  setBackground: (hex: HexColor) => void
  swapColors: () => void
  toggleLargeText: () => void
  saveToHistory: () => void
  clearHistory: () => void
}

export const useContrastStore = create<ContrastState>()(
  devtools(
    (set, get) => ({
      foreground: '#ffffff',
      background: '#0f1117',
      isLargeText: false,
      history: [],

      setForeground: (hex) => set({ foreground: hex }),
      setBackground: (hex) => set({ background: hex }),

      swapColors: () =>
        set((state) => ({
          foreground: state.background,
          background: state.foreground,
        })),

      toggleLargeText: () =>
        set((state) => ({ isLargeText: !state.isLargeText })),

      saveToHistory: () => {
        const { foreground, background, isLargeText, history } = get()
        const ratio = getContrastRatio(foreground, background)
        const level = getWCAGLevel(ratio, isLargeText)
        const entry: ContrastEntry = {
          id: crypto.randomUUID(),
          foreground,
          background,
          ratio,
          level,
          timestamp: Date.now(),
        }
        set({ history: [entry, ...history].slice(0, 20) })
      },

      clearHistory: () => set({ history: [] }),
    }),
    { name: 'contrast-store' }
  )
)
