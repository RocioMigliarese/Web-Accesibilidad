import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { ReadingGuide } from './ReadingGuide'
import { useGlobalAccessibility } from '../../hooks/useGlobalAccessibility'

/**
 * Root layout:
 * - Calls useGlobalAccessibility() once → applies font/calm-colors/spacing to <body>
 * - Renders ReadingGuide as a global DOM overlay
 * - Renders top Navbar + page content via <Outlet />
 */
export function MainLayout() {
  useGlobalAccessibility()

  return (
    <div className="min-h-screen bg-[--a11y-bg]">
      {/* Global overlays */}
      <ReadingGuide />

      <Navbar />

      <main className="mx-auto min-h-screen max-w-[1600px] overflow-y-auto pt-16">
        <Outlet />
      </main>
    </div>
  )
}
