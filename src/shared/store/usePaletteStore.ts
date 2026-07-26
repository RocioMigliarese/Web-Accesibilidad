import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface PaletteColor {
  id: string
  hex: string
  name?: string
}

interface PaletteState {
  colors: PaletteColor[]
  selectedColorId: string | null

  addColor: (hex: string, name?: string) => void
  removeColor: (id: string) => void
  updateColor: (id: string, hex: string) => void
  setSelectedColor: (id: string | null) => void
  resetPalette: () => void
}

const DEFAULT_COLORS: PaletteColor[] = [
  { id: '1', hex: '#aa3bff', name: 'Brand Purple' },
  { id: '2', hex: '#60a5fa', name: 'Sky Blue' },
  { id: '3', hex: '#2dd4bf', name: 'Teal' },
  { id: '4', hex: '#f472b6', name: 'Pink' },
]

/**
 * Global palette store — single source of truth for colors.
 * Consumed by: palette, simulation, contrast, patterns features.
 */
export const usePaletteStore = create<PaletteState>()(
  devtools(
    (set) => ({
      colors: DEFAULT_COLORS,
      selectedColorId: DEFAULT_COLORS[0].id,

      addColor: (hex, name) =>
        set((state) => ({
          colors: [...state.colors, { id: crypto.randomUUID(), hex, name }],
        })),

      removeColor: (id) =>
        set((state) => ({
          colors: state.colors.filter((c) => c.id !== id),
          selectedColorId:
            state.selectedColorId === id ? null : state.selectedColorId,
        })),

      updateColor: (id, hex) =>
        set((state) => ({
          colors: state.colors.map((c) => (c.id === id ? { ...c, hex } : c)),
        })),

      setSelectedColor: (id) => set({ selectedColorId: id }),

      resetPalette: () =>
        set({ colors: DEFAULT_COLORS, selectedColorId: DEFAULT_COLORS[0].id }),
    }),
    { name: 'palette-store' }
  )
)
