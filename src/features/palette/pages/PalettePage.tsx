import { usePaletteStore } from '../../../shared/store/usePaletteStore'
import { randomHex } from '../../../shared/utils/colorUtils'
import { PageHeader, Card, Button } from '../../../shared/components/ui'
import { Icon } from '../../../shared/components/ui/Icon'
import { ColorCard } from '../components/ColorCard'

export function PalettePage() {
  const { colors, addColor, removeColor, updateColor, resetPalette } =
    usePaletteStore()

  const handleRandomPalette = () => {
    resetPalette()
    // Replace defaults with a fresh random set of the same size
    const count = 5
    usePaletteStore.setState({
      colors: Array.from({ length: count }, (_, i) => ({
        id: crypto.randomUUID(),
        hex: randomHex(),
        name: `Color ${i + 1}`,
      })),
    })
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        icon="palette"
        title="Gestión de Paletas"
        description="Crea y administra tu paleta de colores accesibles. Se sincroniza automáticamente con las herramientas de simulación, contraste y patrones."
      >
        <Button icon="shuffle" onClick={handleRandomPalette}>
          Paleta aleatoria
        </Button>
        <Button
          icon="plus"
          variant="primary"
          onClick={() => addColor(randomHex(), `Color ${colors.length + 1}`)}
        >
          Añadir color
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-6 px-6 py-6 md:px-8">
        {/* Legend: what the AA / AAA / Bajo badges mean */}
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Icon name="info" size={16} className="text-brand-purple-light" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              ¿Qué significan las insignias?
            </h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            Cada color muestra una insignia según el nivel de contraste WCAG que
            alcanza con texto legible encima. A mayor contraste, más fácil de
            leer para todas las personas.
          </p>
          <ul className="grid gap-3 sm:grid-cols-3">
            <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface-800 p-3">
              <span className="shrink-0 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                AAA
              </span>
              <span className="text-xs leading-relaxed text-slate-400">
                Contraste óptimo (≥ 7:1). Cumple el nivel más exigente de la WCAG
                para texto normal.
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface-800 p-3">
              <span className="shrink-0 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                AA
              </span>
              <span className="text-xs leading-relaxed text-slate-400">
                Contraste suficiente (≥ 4.5:1). Es el mínimo recomendado para
                texto normal accesible.
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface-800 p-3">
              <span className="shrink-0 rounded-md bg-red-500/15 px-2 py-0.5 text-xs font-semibold text-red-300">
                Bajo
              </span>
              <span className="text-xs leading-relaxed text-slate-400">
                Contraste insuficiente (&lt; 4.5:1). Puede dificultar la lectura;
                conviene ajustar el color.
              </span>
            </li>
          </ul>
        </Card>

        {/* Palette grid */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Paleta actual
            </h3>
            <span className="text-xs text-slate-500">
              {colors.length} {colors.length === 1 ? 'color' : 'colores'}
            </span>
          </div>

          {colors.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-500">
                <Icon name="palette" size={24} />
              </span>
              <p className="text-sm text-slate-400">
                Tu paleta está vacía. Añade tu primer color para empezar.
              </p>
              <Button
                icon="plus"
                variant="primary"
                onClick={() => addColor(randomHex(), 'Color 1')}
              >
                Añadir color
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {colors.map((color) => (
                <ColorCard
                  key={color.id}
                  color={color}
                  canRemove={colors.length > 1}
                  onUpdate={(hex) => updateColor(color.id, hex)}
                  onRemove={() => removeColor(color.id)}
                />
              ))}
              <button
                type="button"
                onClick={() => addColor(randomHex(), `Color ${colors.length + 1}`)}
                className="flex min-h-[13rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-slate-500 transition-colors hover:border-brand-purple/50 hover:text-brand-purple-light"
              >
                <Icon name="plus" size={24} />
                <span className="text-sm font-medium">Añadir color</span>
              </button>
            </div>
          )}
        </Card>

        {/* Live strip preview */}
        <Card>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
            Vista de banda
          </h3>
          <div className="flex h-24 overflow-hidden rounded-xl border border-white/10">
            {colors.map((c) => (
              <div
                key={c.id}
                className="flex-1 transition-all"
                style={{ backgroundColor: c.hex }}
                title={c.hex.toUpperCase()}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Consejo: mantén al menos un color con contraste AA sobre tu fondo
            para textos y elementos interactivos.
          </p>
        </Card>
      </div>
    </div>
  )
}
