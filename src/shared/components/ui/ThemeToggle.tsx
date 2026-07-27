import { useState, useRef, useEffect } from 'react'
import { useAccessibilityStore } from '../../../features/dyslexia/store/useAccessibilityStore'
import { Icon } from './Icon'
import type { ColorMode } from '../../../features/dyslexia/store/useAccessibilityStore'

interface ModeOption {
  value: ColorMode
  label: string
  shortLabel: string
  color: string        // accent color for that mode
  lightColor: string   // lighter variant
  description: string
}

const MODES: ModeOption[] = [
  {
    value: 'default',
    label: 'Visión Estándar',
    shortLabel: 'Estándar',
    color: '#aa3bff',
    lightColor: '#c084fc',
    description: 'Paleta original',
  },
  {
    value: 'deuteranopia',
    label: 'Deuteranopia',
    shortLabel: 'Deutan',
    color: '#38bdf8',
    lightColor: '#7dd3fc',
    description: 'Sin receptores verdes',
  },
  {
    value: 'protanopia',
    label: 'Protanopia',
    shortLabel: 'Protan',
    color: '#22d3ee',
    lightColor: '#67e8f9',
    description: 'Sin receptores rojos',
  },
  {
    value: 'tritanopia',
    label: 'Tritanopia',
    shortLabel: 'Tritan',
    color: '#fb923c',
    lightColor: '#fdba74',
    description: 'Sin receptores azules',
  },
  {
    value: 'achromatopsia',
    label: 'Acromatopsia',
    shortLabel: 'Acro',
    color: '#fbbf24',
    lightColor: '#fde68a',
    description: 'Visión monocromática',
  },
]

export function ColorModeToggle() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { colorMode, setColorMode } = useAccessibilityStore()

  const active = MODES.find((m) => m.value === colorMode) ?? MODES[0]
  const isDefault = colorMode === 'default'

  // Close on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger — shows current mode color as a circle dot */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={`Modo de color: ${active.label}. Cambiar`}
        aria-expanded={open}
        title="Modo de visión del color"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20"
        style={!isDefault ? { boxShadow: `0 0 0 1px ${active.color}40` } : undefined}
      >
        <Icon
          name="settings"
          size="1.1rem"
          className="text-slate-400"
          style={{
            transition: 'transform 0.4s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-11 z-50 w-64 rounded-xl border border-white/10 bg-surface-800 p-2 shadow-2xl"
          role="dialog"
          aria-label="Selector de modo de color"
        >
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Modo de visión
          </p>

          {MODES.map((mode) => {
            const isActive = colorMode === mode.value
            return (
              <button
                key={mode.value}
                onClick={() => {
                  setColorMode(mode.value)
                  setOpen(false)
                }}
                className={`
                  flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                  text-left text-sm transition-all duration-150
                  ${isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                {/* Color swatch */}
                <span
                  className="h-4 w-4 shrink-0 rounded-full ring-1 ring-white/20"
                  style={{ backgroundColor: mode.color }}
                  aria-hidden="true"
                />
                <span className="flex flex-col">
                  <span className="font-medium leading-none">{mode.label}</span>
                  <span className="mt-0.5 text-[11px] text-slate-500">{mode.description}</span>
                </span>
                {/* Checkmark */}
                {isActive && (
                  <span className="ml-auto text-xs" style={{ color: mode.color }}>✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
