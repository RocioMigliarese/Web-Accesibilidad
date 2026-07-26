import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  {
    path: '/palette',
    label: 'Paletas',
    icon: '🎨',
    description: 'Gestión de colores',
  },
  {
    path: '/simulation',
    label: 'Simulación',
    icon: '👁️',
    description: 'Daltonismo',
  },
  {
    path: '/contrast',
    label: 'Contraste',
    icon: '📐',
    description: 'WCAG 2.1 / 2.2',
  },
  {
    path: '/patterns',
    label: 'Patrones',
    icon: '🧩',
    description: 'Sugerencias visuales',
  },
  {
    path: '/dyslexia',
    label: 'Dislexia',
    icon: '📖',
    description: 'Lectura accesible',
  },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0f1117] border-r border-white/10 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">
          🎨 <span className="text-[#aa3bff]">Tone</span>Safe
        </h1>
        <p className="text-xs text-slate-500 mt-1">Accesibilidad Web</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ path, label, icon, description }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-[#aa3bff]/20 text-white border border-[#aa3bff]/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`
            }
          >
            <span className="text-xl w-8 text-center">{icon}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">{label}</span>
              <span className="text-xs text-slate-500 mt-0.5">{description}</span>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-xs text-slate-600">v1.0.0 — ToneSafe</p>
      </div>
    </aside>
  )
}
