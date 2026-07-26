/**
 * LMS (linearized) color transformation matrices for color vision deficiency simulation.
 * Based on Brettel, Viénot & Mollon (1997) and Machado, Oliveira & Fernandes (2009).
 */

import type { RGB } from '../../../shared/types'

type Matrix3x3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
]

const MATRICES: Record<string, Matrix3x3> = {
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.011820, 0.042940, 0.968881],
  ],
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  tritanopia: [
    [1.0, 0.1273989, -0.1273989],
    [0.0, 0.8739093, 0.1260907],
    [0.0, -0.8739093 * 0.1, 1.0],
  ],
}

function applyMatrix(rgb: RGB, matrix: Matrix3x3): RGB {
  const { r, g, b } = rgb
  return {
    r: Math.round(matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b),
    g: Math.round(matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b),
    b: Math.round(matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b),
  }
}

function toGrayscale(rgb: RGB): RGB {
  const luminance = Math.round(0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b)
  return { r: luminance, g: luminance, b: luminance }
}

function clamp(rgb: RGB): RGB {
  return {
    r: Math.max(0, Math.min(255, rgb.r)),
    g: Math.max(0, Math.min(255, rgb.g)),
    b: Math.max(0, Math.min(255, rgb.b)),
  }
}

export function simulateColorBlindness(
  rgb: RGB,
  type: 'deuteranopia' | 'protanopia' | 'tritanopia' | 'achromatopsia'
): RGB {
  if (type === 'achromatopsia') return toGrayscale(rgb)
  const matrix = MATRICES[type]
  if (!matrix) return rgb
  return clamp(applyMatrix(rgb, matrix))
}
