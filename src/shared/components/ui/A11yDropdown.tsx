import { useState, useRef, useEffect } from 'react'
import { useAccessibilityStore } from '../../../features/dyslexia/store/useAccessibilityStore'
import { Icon } from '../ui/Icon'
import type { AccessibilityFont } from '../../../features/dyslexia/store/useAccessibilityStore'

const FONTS: { value: AccessibilityFont; label: string; hint: string }[] = [
  { value: 'default', label: 'Inter', hint: 'Fuente por defecto' },
  { value: 'atkinson', label: 'Atkinson', hint: 'Hyperlegible — alta legibilidad' },
  { value: 'opendyslexic', label: 'OpenDyslexic', hint: 'Optimizada para dislexia' },
]

const FONT_SIZES = [
  { value: 19, label: 'Aa', hint: 'Normal (19px)' },
  { value: 22, label: 'Aa', hint: 'Grande (22px)' },
  { value: 26, label: 'Aa', hint: 'Extra grande (26px)' },
]


/**
 * Gear dropdown with quick accessibility controls:
 * - Font selector (Default / Atkinson / OpenDyslexic)
 * - Line-height slider (1.0 – 2.5)
 * - Calm Colors toggle
 */
export function A11yDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const {
    font, setFont,
    fontSize, setFontSize,
    lineHeight, setLineHeight,
    calmColors, toggleCalmColors,
  } = useAccessibilityStore()

  const isActive = font !== 'default' || calmColors || lineHeight !== 1.5 || fontSize !== 19

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
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Opciones de accesibilidad"
        aria-expanded={open}
        title="Accesibilidad"
        className={`
          relative flex h-9 items-center justify-center rounded-lg border px-2.5
          transition-all duration-200 select-none
          ${
            isActive
              ? 'border-brand-purple/40 bg-brand-purple/20 text-brand-purple-light'
              : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
          }
        `}
      >
        {/* 'aA' typographic label */}
        <span className="font-semibold tracking-tight leading-none" aria-hidden="true">
          <span className="text-[0.7em]">a</span>
          <span className="text-[1em]">A</span>
        </span>
        {/* Active dot indicator */}
        {isActive && (
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand-purple-light ring-2 ring-surface-900" />
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-11 z-50 w-72 rounded-xl border border-white/10 bg-surface-800 p-4 shadow-2xl"
          role="dialog"
          aria-label="Panel de accesibilidad"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Accesibilidad
          </p>

          {/* ── Font selector ── */}
          <div className="mb-4">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs text-slate-400">
              <Icon name="type" size={13} />
              Fuente
            </label>
            <div className="flex gap-1.5">
              {FONTS.map(({ value, label, hint }) => (
                <button
                  key={value}
                  onClick={() => setFont(value)}
                  title={hint}
                  className={`
                    flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-150
                    ${
                      font === value
                        ? 'border-brand-purple/40 bg-brand-purple/20 text-brand-purple-light'
                        : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Font Size selector ── */}
          <div className="mb-4">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs text-slate-400">
              <Icon name="type" size={13} />
              Tamaño de texto
            </label>
            <div className="flex gap-1.5">
              {FONT_SIZES.map(({ value, label, hint }, index) => (
                <button
                  key={value}
                  onClick={() => setFontSize(value)}
                  title={hint}
                  className={`
                    flex-1 flex items-center justify-center rounded-lg border py-1.5 font-medium transition-all duration-150
                    ${index === 0 ? 'text-sm' : index === 1 ? 'text-xl' : 'text-2xl font-semibold'}
                    ${
                      fontSize === value
                        ? 'border-brand-purple/40 bg-brand-purple/20 text-brand-purple-light'
                        : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Line height slider ── */}
          <div className="mb-4">
            <label className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Icon name="contrast" size={13} />
                Interlineado
              </span>
              <span className="tabular-nums text-white">{lineHeight.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min={1.0}
              max={2.5}
              step={0.1}
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-purple-light"
              aria-label="Ajustar interlineado"
            />
            <div className="mt-0.5 flex justify-between text-[10px] text-slate-600">
              <span>1.0</span><span>2.5</span>
            </div>
          </div>

          {/* ── Calm Colors toggle ── */}
          <button
            onClick={toggleCalmColors}
            className={`
              flex w-full items-center justify-between rounded-lg border px-3 py-2.5
              text-sm transition-all duration-150
              ${
                calmColors
                  ? 'border-teal-500/30 bg-teal-500/15 text-teal-300'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <span className="text-base">🎨</span>
              Calm Colors
            </span>
            {/* Pill switch */}
            <span
              className={`
                relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                ${calmColors ? 'bg-teal-500' : 'bg-white/10'}
              `}
            >
              <span
                className={`
                  inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200
                  ${calmColors ? 'translate-x-4' : 'translate-x-1'}
                `}
              />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
