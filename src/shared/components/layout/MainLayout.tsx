import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { ReadingGuide } from './ReadingGuide'
import { useGlobalAccessibility } from '../../hooks/useGlobalAccessibility'

/**
 * Root layout:
 * - Calls useGlobalAccessibility() once → applies font/calm-colors/spacing to <body>
 * - Renders ReadingGuide as a global DOM overlay
 * - Renders Sidebar + page content via <Outlet />
 */
export function MainLayout() {
  useGlobalAccessibility()

  return (
    <div className="flex min-h-screen bg-[--a11y-bg]">
      {/* Global overlays */}
      <ReadingGuide />

      <Sidebar />

      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
