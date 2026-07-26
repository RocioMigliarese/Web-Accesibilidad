import type { ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

/* ---------------------------------- Page --------------------------------- */

export function PageHeader({
  icon,
  title,
  description,
  children,
}: {
  icon: IconName
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-purple/15 text-brand-purple-light">
          <Icon name={icon} size={24} />
        </span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white text-balance">
            {title}
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400 text-pretty">
            {description}
          </p>
        </div>
      </div>
      {children ? <div className="flex items-center gap-3">{children}</div> : null}
    </header>
  )
}

/* ---------------------------------- Card --------------------------------- */

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-surface-800 p-5 ${className}`}
    >
      {children}
    </section>
  )
}

export function CardTitle({
  children,
  hint,
}: {
  children: ReactNode
  hint?: string
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        {children}
      </h3>
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </div>
  )
}

/* --------------------------------- Button -------------------------------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const BTN_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-purple text-white hover:bg-brand-purple-light hover:text-surface-900',
  secondary:
    'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
}

export function Button({
  children,
  variant = 'secondary',
  icon,
  className = '',
  ...props
}: {
  children?: ReactNode
  variant?: ButtonVariant
  icon?: IconName
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-light disabled:cursor-not-allowed disabled:opacity-40 ${BTN_STYLES[variant]} ${className}`}
      {...props}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      {children}
    </button>
  )
}

/* --------------------------------- Toggle -------------------------------- */

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  description?: string
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-surface-900/60 px-4 py-3">
      <span className="flex flex-col">
        <span className="text-sm font-medium text-slate-100">{label}</span>
        {description ? (
          <span className="text-xs text-slate-500">{description}</span>
        ) : null}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-light ${
          checked ? 'bg-brand-purple' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  )
}

/* --------------------------------- Slider -------------------------------- */

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  display?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <span className="font-mono text-xs text-brand-purple-light">
          {display ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="a11y-range h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
      />
    </div>
  )
}

/* ------------------------------- Color Field ------------------------------ */

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (hex: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface-900/60 p-2">
        <input
          type="color"
          value={value}
          aria-label={`${label} color picker`}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
        <input
          type="text"
          value={value.toUpperCase()}
          aria-label={`${label} hex value`}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-sm uppercase text-slate-100 outline-none"
        />
      </div>
    </div>
  )
}

export { Icon }
export type { IconName }
