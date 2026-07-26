import { hexToRgb } from '../../../shared/utils/colorUtils'
import type { HexColor } from '../../../shared/types'

/**
 * Relative luminance as per WCAG 2.x (IEC 61966-2-1)
 */
function linearize(channel: number): number {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

export function getLuminance(hex: HexColor): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const r = linearize(rgb.r)
  const g = linearize(rgb.g)
  const b = linearize(rgb.b)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getContrastRatio(hex1: HexColor, hex2: HexColor): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export type WCAGLevel = 'AAA' | 'AA' | 'AA Large' | 'Fail'

export function getWCAGLevel(ratio: number, isLargeText = false): WCAGLevel {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (isLargeText && ratio >= 3) return 'AA Large'
  return 'Fail'
}

export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`
}
