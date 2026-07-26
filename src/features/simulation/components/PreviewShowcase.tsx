import { Icon } from '../../../shared/components/ui/Icon'
import { getReadableTextColor } from '../../../shared/utils/colorUtils'
import type { HexColor } from '../../../shared/types'

/**
 * A compact but realistic mini-interface (action button, product card, bar
 * chart) rendered entirely from a supplied palette so the effect of a
 * color-vision-deficiency transform is visible on real components.
 */
export function PreviewShowcase({ palette }: { palette: HexColor[] }) {
  // Guarantee at least 4 colors to draw the mockup with.
  const c = [...palette]
  while (c.length < 4) c.push('#888888')
  const [primary, secondary, tertiary, quaternary] = c

  const barData = [
    { label: 'Lun', value: 70, color: primary },
    { label: 'Mar', value: 45, color: secondary },
    { label: 'Mié', value: 88, color: tertiary },
    { label: 'Jue', value: 60, color: quaternary },
    { label: 'Vie', value: 34, color: primary },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Action buttons */}
      <div className="rounded-xl border border-white/10 bg-surface-900/60 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          Botones de acción
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: primary, color: getReadableTextColor(primary) }}
          >
            Comprar ahora
          </button>
          <button
            type="button"
            className="rounded-lg border px-4 py-2.5 text-sm font-semibold"
            style={{ borderColor: secondary, color: secondary }}
          >
            Ver detalles
          </button>
          <div className="flex gap-2">
            <span
              className="rounded-md px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: tertiary, color: getReadableTextColor(tertiary) }}
            >
              Nuevo
            </span>
            <span
              className="rounded-md px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: quaternary, color: getReadableTextColor(quaternary) }}
            >
              Oferta
            </span>
          </div>
        </div>
      </div>

      {/* Product card */}
      <div className="rounded-xl border border-white/10 bg-surface-900/60 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          Tarjeta de producto
        </p>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div
            className="flex h-20 items-center justify-center"
            style={{ backgroundColor: secondary, color: getReadableTextColor(secondary) }}
          >
            <Icon name="cart" size={28} />
          </div>
          <div className="bg-surface-800 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Auriculares</span>
              <span className="text-sm font-bold" style={{ color: primary }}>
                €59
              </span>
            </div>
            <div className="mt-1 flex items-center gap-0.5" style={{ color: tertiary }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" size={13} fill="currentColor" stroke="none" />
              ))}
              <span className="ml-1 text-xs text-slate-400">4.8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-xl border border-white/10 bg-surface-900/60 p-4 sm:col-span-2">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          Gráfico de barras
        </p>
        <div className="flex h-40 items-end justify-between gap-3">
          {barData.map((bar, i) => (
            <div
              key={i}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                className="w-full rounded-t-md transition-all"
                style={{ height: `${bar.value}%`, backgroundColor: bar.color }}
              />
              <span className="text-xs text-slate-400">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
