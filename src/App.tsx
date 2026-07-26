import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './shared/components/layout/MainLayout'
import { PalettePage } from './features/palette'
import { SimulationPage } from './features/simulation'
import { ContrastPage } from './features/contrast'
import { PatternsPage } from './features/patterns'
import { DyslexiaPage } from './features/dyslexia'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Default redirect */}
          <Route index element={<Navigate to="/palette" replace />} />

          {/* Feature routes */}
          <Route path="/palette" element={<PalettePage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/contrast" element={<ContrastPage />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/dyslexia" element={<DyslexiaPage />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/palette" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
