import { useContrastStore } from '../store/useContrastStore'
import { getContrastRatio, formatRatio } from '../utils/wcag'
import { usePaletteStore } from '../../../shared/store/usePaletteStore'
import { PageHeader, Card, Button, ColorField, Toggle } from '../../../shared/components/ui'
import { Icon } from '../../../shared/components/ui/Icon'

/* A single pass/fail compliance chip. */
function ComplianceBadge({
  label,
  threshold,
  ratio,
}: {
  label: string
  threshold: number
  ratio: number
}) {
  const pass = ratio >= threshold
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
        pass
          ? 'border-emerald-500/30 bg-emerald-500/10'
          : 'border-red-500/30 bg-red-500/10'
      }`}
    >
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-xs text-slate-400">Mín. {threshold}:1</span>
      </div>
      <span
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
          pass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
        }`}
      >
        <Icon name={pass ? 'check' : 'x'} size={14} />
        {pass ? 'Cumple' : 'Falla'}
      </span>
    </div>
  )
}

export function ContrastPage() {
  const {
    foreground,
    background,
    isLargeText,
    history,
    setForeground,
    setBackground,
    swapColors,
    toggleLargeText,
    saveToHistory,
    clearHistory,
  } = useContrastStore()
  const paletteColors = usePaletteStore((s) => s.colors)

  const ratio = getContrastRatio(foreground, background)

  return (
    <div className="flex flex-col">
      <PageHeader
        icon="contrast"
        title="Validación de Contraste WCAG"
        description="Verifica el ratio de contraste entre texto y fondo según los niveles AA y AAA de las normativas WCAG 2.1 / 2.2."
      >
        <Button icon="swap" onClick={swapColors}>
          Invertir
        </Button>
        <Button icon="plus" variant="primary" onClick={saveToHistory}>
          Guardar
        </Button>
      </PageHeader>

      <div className="grid gap-6 px-6 py-6 md:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: controls */}
        <div className="flex flex-col gap-6">
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Colores
            </h3>
            <div className="flex flex-col gap-4">
              <ColorField label="Texto (primer plano)" value={foreground} onChange={setForeground} />
              <ColorField label="Fondo" value={background} onChange={setBackground} />
            </div>

            {paletteColors.length > 0 ? (
              <div className="mt-4">
                <p className="mb-2 text-xs text-slate-500">Desde tu paleta</p>
                <div className="flex flex-wrap gap-2">
                  {paletteColors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      title={`Fondo: ${c.hex} · Shift+clic para texto`}
                      onClick={(e) =>
                        e.shiftKey ? setForeground(c.hex) : setBackground(c.hex)
                      }
                      className="h-8 w-8 rounded-lg border border-white/15 transition-transform hover:scale-110"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Clic para fondo · Mayús + clic para texto
                </p>
              </div>
            ) : null}

            <div className="mt-4">
              <Toggle
                checked={isLargeText}
                onChange={toggleLargeText}
                label="Texto grande"
                description="≥ 18.66px negrita o ≥ 24px normal"
              />
            </div>
          </Card>

          {/* History */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Historial
              </h3>
              {history.length > 0 ? (
                <Button variant="ghost" icon="trash" onClick={clearHistory} className="px-2 py-1">
                  Limpiar
                </Button>
              ) : null}
            </div>
            {history.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-500">
                Guarda combinaciones para compararlas aquí.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {history.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-surface-900/60 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-8 w-12 items-center justify-center rounded-md text-xs font-bold"
                        style={{ color: h.foreground, backgroundColor: h.background }}
                      >
                        Aa
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {formatRatio(h.ratio)}
                      </span>
                    </div>
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        h.level === 'Fail'
                          ? 'bg-red-500/15 text-red-300'
                          : 'bg-emerald-500/15 text-emerald-300'
                      }`}
                    >
                      {h.level}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Right: results */}
        <div className="flex flex-col gap-6">
          {/* Live preview */}
          <div
            className="flex min-h-[13rem] flex-col justify-center gap-2 rounded-2xl border border-white/10 p-6"
            style={{ backgroundColor: background, color: foreground }}
          >
            <p className={isLargeText ? 'text-3xl font-bold' : 'text-lg font-bold'}>
              Texto de ejemplo accesible
            </p>
            <p className={isLargeText ? 'text-xl' : 'text-sm'}>
              The quick brown fox jumps over the lazy dog. 1234567890
            </p>
            <span
              className="mt-2 w-fit rounded-lg border px-3 py-1.5 text-sm font-semibold"
              style={{ borderColor: foreground }}
            >
              Botón de ejemplo
            </span>
          </div>

          {/* Ratio */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Ratio de contraste
                </p>
                <p className="mt-1 font-mono text-4xl font-bold text-white">
                  {formatRatio(ratio)}
                </p>
              </div>
              <div
                className={`rounded-2xl px-4 py-3 text-center ${
                  ratio >= 7
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : ratio >= 4.5
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-red-500/15 text-red-300'
                }`}
              >
                <p className="text-2xl font-bold">
                  {ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : '✕'}
                </p>
                <p className="text-xs">
                  {ratio >= 7 ? 'Excelente' : ratio >= 4.5 ? 'Bueno' : 'Insuficiente'}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ComplianceBadge label="Texto normal AA" threshold={4.5} ratio={ratio} />
              <ComplianceBadge label="Texto normal AAA" threshold={7} ratio={ratio} />
              <ComplianceBadge label="Texto grande AA" threshold={3} ratio={ratio} />
              <ComplianceBadge label="Texto grande AAA" threshold={4.5} ratio={ratio} />
              <ComplianceBadge label="Componentes UI" threshold={3} ratio={ratio} />
              <ComplianceBadge label="Objetos gráficos" threshold={3} ratio={ratio} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
