import { NavLink } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import type { IconName } from '../ui/Icon'

const NAV_ITEMS: {
  path: string
  label: string
  icon: IconName
}[] = [
  { path: '/palette', label: 'Paletas', icon: 'palette' },
  { path: '/simulation', label: 'Simulación', icon: 'eye' },
  { path: '/contrast', label: 'Contraste', icon: 'contrast' },
  { path: '/patterns', label: 'Patrones', icon: 'patterns' },
  { path: '/dyslexia', label: 'Dislexia', icon: 'book' },
]

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-surface-900">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple/15 text-brand-purple-light">
            <Icon name="palette" size={20} />
          </span>
          <h1 className="text-base font-bold leading-none text-white">
            <span className="text-brand-purple-light">Color</span>Ability
          </h1>
        </div>

        {/* Nav */}
        <nav
          className="flex flex-1 items-center gap-1 overflow-x-auto"
          aria-label="Navegación principal"
        >
          {NAV_ITEMS.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border-brand-purple/40 bg-brand-purple/20 text-white'
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    name={icon}
                    size={18}
                    className={
                      isActive
                        ? 'text-brand-purple-light'
                        : 'text-slate-400 group-hover:text-white'
                    }
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <span className="hidden shrink-0 text-xs text-slate-600 md:inline">
          v1.0.0
        </span>
      </div>
    </header>
  )
}
