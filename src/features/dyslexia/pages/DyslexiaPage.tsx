import { useState } from 'react'
import { useAccessibilityStore } from '../store/useAccessibilityStore'
import type { AccessibilityFont } from '../store/useAccessibilityStore'
import { PageHeader, Card, Button, Slider, Toggle } from '../../../shared/components/ui'
import { Icon } from '../../../shared/components/ui/Icon'

const FONTS: { id: AccessibilityFont; label: string; sample: string }[] = [
  { id: 'default', label: 'Atkinson', sample: 'Aa' },
  { id: 'opendyslexic', label: 'OpenDyslexic', sample: 'Aa' },
  { id: 'atkinson', label: 'Hyperlegible', sample: 'Aa' },
]

const SAMPLE_TEXT =
  'La accesibilidad web garantiza que las personas con distintas capacidades puedan percibir, comprender, navegar e interactuar con los sitios web. Un buen contraste, una tipografía legible y un espaciado cómodo reducen la fatiga visual y mejoran la comprensión lectora para todos.'

export function DyslexiaPage() {
  const {
    font,
    lineHeight,
    letterSpacing,
    calmColors,
    readingGuide,
    tts,
    setFont,
    setLineHeight,
    setLetterSpacing,
    toggleCalmColors,
    toggleReadingGuide,
    toggleTTS,
    resetAccessibility,
  } = useAccessibilityStore()

  const [speaking, setSpeaking] = useState(false)

  const readAloud = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(SAMPLE_TEXT)
    utterance.lang = 'es-ES'
    utterance.rate = 0.95
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        icon="book"
        title="Dislexia y Lectura Accesible"
        description="Tipografías de alta legibilidad, ajustes de espaciado, guía de lectura, modo de colores suaves y lectura en voz alta. Los cambios se aplican a toda la aplicación."
      >
        <Button icon="reset" onClick={resetAccessibility}>
          Restablecer
        </Button>
      </PageHeader>

      <div className="grid gap-6 px-6 py-6 md:px-8 lg:grid-cols-[1fr_1.15fr]">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          {/* Fonts */}
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Tipografía
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {FONTS.map((f) => {
                const active = font === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFont(f.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 transition-all ${
                      active
                        ? 'border-brand-purple bg-brand-purple/15'
                        : 'border-white/10 hover:border-white/25'
                    } ${f.id === 'opendyslexic' ? 'font-opendyslexic' : ''}`}
                  >
                    <span className="text-2xl font-bold text-white">{f.sample}</span>
                    <span className="text-xs font-medium text-slate-300">{f.label}</span>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Spacing */}
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Espaciado del texto
            </h3>
            <div className="flex flex-col gap-5">
              <Slider
                label="Altura de línea"
                min={1}
                max={2.5}
                step={0.1}
                value={lineHeight}
                onChange={setLineHeight}
                display={lineHeight.toFixed(1)}
              />
              <Slider
                label="Espaciado entre letras"
                min={0}
                max={10}
                step={0.5}
                value={letterSpacing}
                onChange={setLetterSpacing}
                display={`${letterSpacing}px`}
              />
            </div>
          </Card>

          {/* Toggles */}
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Ayudas de lectura
            </h3>
            <div className="flex flex-col gap-3">
              <Toggle
                checked={calmColors}
                onChange={toggleCalmColors}
                label="Colores suaves (Calm)"
                description="Reduce el contraste extremo del fondo"
              />
              <Toggle
                checked={readingGuide}
                onChange={toggleReadingGuide}
                label="Guía de lectura"
                description="Barra que sigue el cursor al leer"
              />
              <Toggle
                checked={tts}
                onChange={toggleTTS}
                label="Lectura en voz alta"
                description="Activa el botón de texto a voz"
              />
            </div>
          </Card>
        </div>

        {/* Live reading preview */}
        <Card className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Vista previa de lectura
            </h3>
            {tts ? (
              <Button
                variant="primary"
                icon="volume"
                onClick={readAloud}
                className="px-3 py-1.5"
              >
                {speaking ? 'Detener' : 'Leer'}
              </Button>
            ) : null}
          </div>

          <article
            className="flex-1 rounded-xl border border-white/10 bg-surface-900/60 p-6"
            style={{
              lineHeight,
              letterSpacing: `${letterSpacing}px`,
            }}
          >
            <h4 className="mb-3 text-xl font-bold text-white">
              ¿Qué es la accesibilidad?
            </h4>
            <p className="text-slate-200">{SAMPLE_TEXT}</p>
            <p className="mt-4 text-slate-200">
              Ajusta los controles de la izquierda y observa cómo cambia este
              texto en tiempo real. La configuración se guarda automáticamente y
              se aplica a toda la interfaz de ColorAbility.
            </p>
          </article>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-purple/25 bg-brand-purple/10 px-4 py-3">
            <span className="mt-0.5 text-brand-purple-light">
              <Icon name="sparkles" size={18} />
            </span>
            <p className="text-sm leading-relaxed text-slate-300">
              Recomendación: una altura de línea de 1.5 y un ligero espaciado
              entre letras mejoran la legibilidad para la mayoría de lectores
              con dislexia.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
