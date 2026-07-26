import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type ColorBlindType =
  | 'none'
  | 'deuteranopia'
  | 'protanopia'
  | 'tritanopia'
  | 'achromatopsia'

interface SimulationState {
  activeSimulation: ColorBlindType
  isSimulating: boolean

  setSimulation: (type: ColorBlindType) => void
  toggleSimulation: () => void
  resetSimulation: () => void
}

export const useSimulationStore = create<SimulationState>()(
  devtools(
    (set) => ({
      activeSimulation: 'none',
      isSimulating: false,

      setSimulation: (type) =>
        set({ activeSimulation: type, isSimulating: type !== 'none' }),

      toggleSimulation: () =>
        set((state) => ({ isSimulating: !state.isSimulating })),

      resetSimulation: () =>
        set({ activeSimulation: 'none', isSimulating: false }),
    }),
    { name: 'simulation-store' }
  )
)
