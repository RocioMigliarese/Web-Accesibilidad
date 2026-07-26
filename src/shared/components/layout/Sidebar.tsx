import { NavLink } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import type { IconName } from '../ui/Icon'

const NAV_ITEMS: {
  path: string
  label: string
  icon: IconName
  description: string
}[] = [
  { path: '/palette', label: 'Paletas', icon: 'palette', description: 'Gestión de colores' },
  { path: '/simulation', label: 'Simulación', icon: 'eye', description: 'Daltonismo' },
  { path: '/contrast', label: 'Contraste', icon: 'contrast', description: 'WCAG 2.1 / 2.2' },
  { path: '/patterns', label: 'Patrones', icon: 'patterns', description: 'Texturas visuales' },
  { path: '/dyslexia', label: 'Dislexia', icon: 'book', description: 'Lectura accesible' },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-white/10 bg-surface-900">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/15 text-brand-purple-light">
          <Icon name="palette" size={22} />
        </span>
        <div>
          <h1 className="text-lg font-bold leading-none text-white">
            <span className="text-brand-purple-light">Color</span>Ability
          </h1>
          <p className="mt-1 text-xs text-slate-500">Accesibilidad Web</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Navegación principal">
        {NAV_ITEMS.map(({ path, label, icon, description }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 ${
                isActive
                  ? 'border-brand-purple/40 bg-brand-purple/20 text-white'
                  : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? 'bg-brand-purple/30 text-brand-purple-light'
                      : 'bg-white/5 text-slate-400 group-hover:text-white'
                  }`}
                >
                  <Icon name={icon} size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-none">{label}</span>
                  <span className="mt-1 text-xs text-slate-500">{description}</span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-6 py-4">
        <p className="text-xs text-slate-600">v1.0.0 — ColorAbility</p>
      </div>
    </aside>
  )
}
