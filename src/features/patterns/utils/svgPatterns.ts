import type { PatternId } from '../store/usePatternsStore'
import type { HexColor } from '../../../shared/types'

interface PatternOptions {
  color: HexColor
  scale?: number
  opacity?: number
}

export function generateSVGPattern(id: PatternId, opts: PatternOptions): string {
  const { color, scale = 1, opacity = 0.5 } = opts
  const size = Math.round(20 * scale)

  const patterns: Record<PatternId, string> = {
    dots: `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
      <circle cx='${size / 2}' cy='${size / 2}' r='${size * 0.15}' fill='${color}' opacity='${opacity}'/>
    </svg>`,

    lines: `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
      <line x1='0' y1='${size / 2}' x2='${size}' y2='${size / 2}' stroke='${color}' stroke-width='1.5' opacity='${opacity}'/>
    </svg>`,

    crosshatch: `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
      <line x1='0' y1='0' x2='${size}' y2='${size}' stroke='${color}' stroke-width='1' opacity='${opacity}'/>
      <line x1='${size}' y1='0' x2='0' y2='${size}' stroke='${color}' stroke-width='1' opacity='${opacity}'/>
    </svg>`,

    diamonds: `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
      <polygon points='${size / 2},2 ${size - 2},${size / 2} ${size / 2},${size - 2} 2,${size / 2}'
        fill='none' stroke='${color}' stroke-width='1.5' opacity='${opacity}'/>
    </svg>`,

    triangles: `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
      <polygon points='${size / 2},2 ${size - 2},${size - 2} 2,${size - 2}'
        fill='${color}' opacity='${opacity}'/>
    </svg>`,

    waves: `<svg xmlns='http://www.w3.org/2000/svg' width='${size * 2}' height='${size}'>
      <path d='M0,${size / 2} Q${size / 2},0 ${size},${size / 2} Q${size + size / 2},${size} ${size * 2},${size / 2}'
        fill='none' stroke='${color}' stroke-width='1.5' opacity='${opacity}'/>
    </svg>`,
  }

  return `url("data:image/svg+xml,${encodeURIComponent(patterns[id])}")`
}

export const PATTERN_LABELS: Record<PatternId, string> = {
  dots: 'Puntos',
  lines: 'Líneas',
  crosshatch: 'Cuadrícula',
  diamonds: 'Diamantes',
  triangles: 'Triángulos',
  waves: 'Ondas',
}
