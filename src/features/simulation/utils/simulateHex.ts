import { hexToRgb, rgbToHex } from '../../../shared/utils/colorUtils'
import { simulateColorBlindness } from './colorBlindMatrix'
import type { ColorBlindType } from '../store/useSimulationStore'
import type { HexColor } from '../../../shared/types'

/** Apply a color-vision-deficiency transform to a hex string. */
export function simulateHex(hex: HexColor, type: ColorBlindType): HexColor {
  if (type === 'none') return hex
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return rgbToHex(simulateColorBlindness(rgb, type))
}

export const SIMULATION_META: Record<
  ColorBlindType,
  { label: string; description: string; prevalence: string }
> = {
  none: {
    label: 'Visión Estándar',
    description: 'Sin ninguna deficiencia cromática aplicada.',
    prevalence: 'Referencia',
  },
  deuteranopia: {
    label: 'Deuteranopía',
    description: 'Ausencia de conos verdes. El tipo más común de daltonismo.',
    prevalence: '~6% de hombres',
  },
  protanopia: {
    label: 'Protanopía',
    description: 'Ausencia de conos rojos. Los rojos se ven apagados u oscuros.',
    prevalence: '~2% de hombres',
  },
  tritanopia: {
    label: 'Tritanopía',
    description: 'Ausencia de conos azules. Confusión entre azul y verde.',
    prevalence: '~0.01%',
  },
  achromatopsia: {
    label: 'Acromatopsia',
    description: 'Ausencia total de percepción del color (escala de grises).',
    prevalence: 'Muy raro',
  },
}
