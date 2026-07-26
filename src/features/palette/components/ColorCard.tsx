import { useRef, useState } from 'react'
import { Icon } from '../../../shared/components/ui/Icon'
import { getReadableTextColor } from '../../../shared/utils/colorUtils'
import { getContrastRatio, getWCAGLevel } from '../../contrast/utils/wcag'
import type { PaletteColor } from '../../../shared/store/usePaletteStore'

export function ColorCard({
  color,
  onUpdate,
  onRemove,
  canRemove,
}: {
  color: PaletteColor
  onUpdate: (hex: string) => void
  onRemove: () => void
  canRemove: boolean
}) {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)
  const textColor = getReadableTextColor(color.hex)

  // Contrast of a readable label against this swatch — the higher, the better
  const ratio = getContrastRatio(textColor, color.hex)
  const level = getWCAGLevel(ratio)

  const copyHex = async () => {
    await navigator.clipboard?.writeText(color.hex.toUpperCase())
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-800">
      {/* Swatch */}
      <div
        className="relative flex h-32 items-end justify-between p-3"
        style={{ backgroundColor: color.hex }}
      >
        <span
          className="rounded-lg px-2 py-1 font-mono text-sm font-bold"
          style={{ color: textColor, backgroundColor: `${textColor}1a` }}
        >
          {color.hex.toUpperCase()}
        </span>
        <div className="flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => colorInputRef.current?.click()}
            aria-label={`Editar ${color.name ?? color.hex}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-sm transition-transform hover:scale-105"
            style={{ color: textColor, backgroundColor: `${textColor}26` }}
          >
            <Icon name="edit" size={15} />
          </button>
          <button
            type="button"
            onClick={copyHex}
            aria-label={`Copiar ${color.hex}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-sm transition-transform hover:scale-105"
            style={{ color: textColor, backgroundColor: `${textColor}26` }}
          >
            <Icon name={copied ? 'check' : 'copy'} size={15} />
          </button>
          {canRemove ? (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Eliminar ${color.name ?? color.hex}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-sm transition-transform hover:scale-105"
              style={{ color: textColor, backgroundColor: `${textColor}26` }}
            >
              <Icon name="trash" size={15} />
            </button>
          ) : null}
        </div>
        <input
          ref={colorInputRef}
          type="color"
          value={color.hex}
          onChange={(e) => onUpdate(e.target.value)}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        <span className="truncate text-sm font-medium text-slate-200">
          {color.name ?? 'Sin nombre'}
        </span>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${
            level === 'Fail'
              ? 'bg-red-500/15 text-red-300'
              : 'bg-emerald-500/15 text-emerald-300'
          }`}
          title={`Contraste del texto sobre el color: ${ratio.toFixed(1)}:1`}
        >
          {level === 'Fail' ? 'Bajo' : level}
        </span>
      </div>
    </div>
  )
}
