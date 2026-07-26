// usePaletteStore lives in shared/ because it's global state consumed by
// simulation, contrast and patterns features — not just palette.
export { usePaletteStore } from '../../shared/store/usePaletteStore'
export type { PaletteColor } from '../../shared/store/usePaletteStore'
export { PalettePage } from './pages/PalettePage'
