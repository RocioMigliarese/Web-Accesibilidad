import { usePaletteStore } from '../../../shared/store/usePaletteStore'
import { useSimulationStore } from '../store/useSimulationStore'
import type { ColorBlindType } from '../store/useSimulationStore'
import { simulateHex, SIMULATION_META } from '../utils/simulateHex'
import { PageHeader, Card } from '../../../shared/components/ui'
import { PreviewShowcase } from '../components/PreviewShowcase'

const TABS: ColorBlindType[] = [
  'none',
  'deuteranopia',
  'protanopia',
  'tritanopia',
  'achromatopsia',
]

export function SimulationPage() {
  const colors = usePaletteStore((s) => s.colors)
  const { activeSimulation, setSimulation } = useSimulationStore()

  const originalPalette = colors.map((c) => c.hex)
  const simulatedPalette = originalPalette.map((hex) =>
    simulateHex(hex, activeSimulation)
  )
  const meta = SIMULATION_META[activeSimulation]

  return (
    <div className="flex flex-col">
      <PageHeader
        icon="eye"
        title="Simulación de Daltonismo"
        description="Visualiza tu paleta e interfaz bajo diferentes tipos de deficiencia cromática para asegurar que la información no dependa solo del color."
      />

      <div className="flex flex-col gap-6 px-6 py-6 md:px-8">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Tipos de daltonismo"
          className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-surface-800 p-2"
        >
          {TABS.map((type) => {
            const active = activeSimulation === type
            return (
              <button
                key={type}
                role="tab"
                aria-selected={active}
                onClick={() => setSimulation(type)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-purple text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {SIMULATION_META[type].label}
              </button>
            )
          })}
        </div>

        {/* Info banner */}
        <div className="flex flex-col gap-1 rounded-2xl border border-brand-purple/25 bg-brand-purple/10 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-white">{meta.label}</h3>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-slate-200">
              {meta.prevalence}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            {meta.description}
          </p>
        </div>

        {/* Palette comparison */}
        <Card>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
            Comparación de paleta
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-slate-500">Original</p>
              <div className="flex h-16 overflow-hidden rounded-xl border border-white/10">
                {originalPalette.map((hex, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-slate-500">
                {activeSimulation === 'none' ? 'Sin filtro' : meta.label}
              </p>
              <div className="flex h-16 overflow-hidden rounded-xl border border-white/10">
                {simulatedPalette.map((hex, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Live UI preview */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Simulador en vivo
            </h3>
            <span className="text-xs text-slate-500">
              Interfaz renderizada con la paleta simulada
            </span>
          </div>
          <PreviewShowcase palette={simulatedPalette} />
        </Card>
      </div>
    </div>
  )
}
