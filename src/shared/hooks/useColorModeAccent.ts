import { useAccessibilityStore } from '../../features/dyslexia/store/useAccessibilityStore'

interface ColorModeAccent {
  /** Primary accent — used for "pass", active states, and brand text */
  accent: string
  /** Lighter accent — used for hovers or secondary indicators */
  accentLight: string
  /** Background accent — soft translucent background for badges */
  accentBg: string
  /** Fail color — typically red, but orange for red-green blindness */
  failColor: string
  /** Background fail color — soft translucent background for fail badges */
  failBg: string
}

export function useColorModeAccent(): ColorModeAccent {
  const colorMode = useAccessibilityStore((s) => s.colorMode)

  switch (colorMode) {
    case 'deuteranopia':
      return {
        accent: '#38bdf8', // sky-400
        accentLight: '#7dd3fc', // sky-300
        accentBg: 'rgba(56, 189, 248, 0.15)',
        failColor: '#fb923c', // orange-400 (avoiding red for deutan)
        failBg: 'rgba(251, 146, 60, 0.15)',
      }
    case 'protanopia':
      return {
        accent: '#22d3ee', // cyan-400
        accentLight: '#67e8f9', // cyan-300
        accentBg: 'rgba(34, 211, 238, 0.15)',
        failColor: '#fb923c', // orange-400 (avoiding red for protan)
        failBg: 'rgba(251, 146, 60, 0.15)',
      }
    case 'tritanopia':
      return {
        accent: '#fb923c', // orange-400
        accentLight: '#fdba74', // orange-300
        accentBg: 'rgba(251, 146, 60, 0.15)',
        failColor: '#ef4444', // red-500
        failBg: 'rgba(239, 68, 68, 0.15)',
      }
    case 'achromatopsia':
      return {
        accent: '#fbbf24', // amber-400
        accentLight: '#fde68a', // amber-300
        accentBg: 'rgba(251, 191, 36, 0.15)',
        failColor: '#d4d4d8', // zinc-300 (grayscale fail)
        failBg: 'rgba(212, 212, 216, 0.15)',
      }
    case 'default':
    default:
      return {
        accent: '#aa3bff', // brand purple
        accentLight: '#c084fc', // purple-400
        accentBg: 'rgba(170, 59, 255, 0.15)',
        failColor: '#ef4444', // red-500
        failBg: 'rgba(239, 68, 68, 0.15)',
      }
  }
}
