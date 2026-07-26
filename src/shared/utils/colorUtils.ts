import type { RGB, HexColor } from '../types'

export function hexToRgb(hex: HexColor): RGB | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

export function rgbToHex({ r, g, b }: RGB): HexColor {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
  )
}

export function isValidHex(hex: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)
}

export function normalizeHex(hex: string): HexColor {
  const clean = hex.replace('#', '')
  if (clean.length === 3) {
    return '#' + clean.split('').map((c) => c + c).join('')
  }
  return '#' + clean.toLowerCase()
}
