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

/** Generate a random, reasonably saturated hex color. */
export function randomHex(): HexColor {
  const h = Math.floor(Math.random() * 360)
  const s = 55 + Math.floor(Math.random() * 35) // 55–90%
  const l = 40 + Math.floor(Math.random() * 30) // 40–70%
  return hslToHex(h, s, l)
}

export function hslToHex(h: number, s: number, l: number): HexColor {
  const sn = s / 100
  const ln = l / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) =>
    ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return rgbToHex({
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  })
}

/** Returns '#000000' or '#ffffff' — whichever reads better on the given background. */
export function getReadableTextColor(hex: HexColor): HexColor {
  const rgb = hexToRgb(normalizeHex(hex))
  if (!rgb) return '#ffffff'
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance > 0.55 ? '#000000' : '#ffffff'
}
