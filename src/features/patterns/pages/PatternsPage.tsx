import { usePatternsStore } from '../store/usePatternsStore'
import type { PatternId } from '../store/usePatternsStore'
import { generateSVGPattern, PATTERN_LABELS } from '../utils/svgPatterns'
import { PageHeader, Card, Button, ColorField, Slider } from '../../../shared/components/ui'
import { Icon } from '../../../shared/components/ui/Icon'

const PATTERN_IDS: PatternId[] = [
  'dots',
  'lines',
  'crosshatch',
  'diamonds',
  'triangles',
  'waves',
]

export function PatternsPage() {
  const {
    selectedPattern,
    patternColor,
    backgroundColor,
    patternScale,
    patternOpacity,
    setPattern,
    setPatternColor,
    setBackgroundColor,
    setPatternScale,
    setPatternOpacity,
    reset,
  } = usePatternsStore()

  const previewImage = selectedPattern
    ? generateSVGPattern(selectedPattern, {
        color: patternColor,
        scale: patternScale,
        opacity: patternOpacity,
      })
    : undefined

  return (
    <div className="flex flex-col">
      <PageHeader
        icon="patterns"
        title="Texturas y Patrones"
        description="Añade patrones SVG a los elementos para distinguir categorías sin depender únicamente del color — una técnica clave para usuarios con daltonismo."
      >
        <Button icon="reset" onClick={reset}>
          Restablecer
        </Button>
      </PageHeader>

      <div className="grid gap-6 px-6 py-6 md:px-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Pattern picker + preview */}
        <div className="flex flex-col gap-6">
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Biblioteca de patrones
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PATTERN_IDS.map((id) => {
                const active = selectedPattern === id
                const swatch = generateSVGPattern(id, {
                  color: patternColor,
                  scale: 1,
                  opacity: patternOpacity,
                })
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPattern(active ? null : id)}
                    className={`flex flex-col overflow-hidden rounded-xl border transition-all ${
                      active
                        ? 'border-brand-purple ring-2 ring-brand-purple/40'
                        : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    <span
                      className="h-16 w-full"
                      style={{
                        backgroundColor,
                        backgroundImage: swatch,
                      }}
                    />
                    <span className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-200">
                      {PATTERN_LABELS[id]}
                      {active ? (
                        <Icon name="check" size={14} className="text-brand-purple-light" />
                      ) : null}
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Big preview */}
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Vista previa
            </h3>
            <div
              className="flex h-56 items-center justify-center rounded-xl border border-white/10"
              style={{
                backgroundColor,
                backgroundImage: previewImage,
              }}
            >
              {!selectedPattern ? (
                <p className="text-sm text-slate-500">
                  Selecciona un patrón para previsualizarlo.
                </p>
              ) : null}
            </div>
          </Card>
        </div>

        {/* Controls + applied example */}
        <div className="flex flex-col gap-6">
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Ajustes
            </h3>
            <div className="flex flex-col gap-4">
              <ColorField label="Color del patrón" value={patternColor} onChange={setPatternColor} />
              <ColorField label="Color de fondo" value={backgroundColor} onChange={setBackgroundColor} />
              <Slider
                label="Escala"
                min={0.5}
                max={3}
                step={0.1}
                value={patternScale}
                onChange={setPatternScale}
                display={`${patternScale.toFixed(1)}×`}
              />
              <Slider
                label="Opacidad"
                min={0.1}
                max={1}
                step={0.05}
                value={patternOpacity}
                onChange={setPatternOpacity}
                display={`${Math.round(patternOpacity * 100)}%`}
              />
            </div>
          </Card>

          {/* Applied to a chart legend */}
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Ejemplo: leyenda de gráfico
            </h3>
            <div className="flex flex-col gap-3">
              {['Categoría A', 'Categoría B', 'Categoría C'].map((label, i) => {
                const id = PATTERN_IDS[i]
                const img = generateSVGPattern(id, {
                  color: patternColor,
                  scale: patternScale,
                  opacity: 0.9,
                })
                return (
                  <div key={label} className="flex items-center gap-3">
                    <span
                      className="h-8 w-8 rounded-md border border-white/15"
                      style={{ backgroundColor, backgroundImage: img }}
                    />
                    <span className="text-sm text-slate-200">{label}</span>
                    <span className="ml-auto text-xs text-slate-500">
                      {PATTERN_LABELS[id]}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Al combinar color con textura, cada serie sigue siendo
              distinguible incluso en escala de grises o para usuarios con
              acromatopsia.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
