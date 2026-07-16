import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TipPage from './pages/TipPage.jsx'
import { initAnalytics } from './lib/analytics'
import { initAdsense } from './lib/adsense'

initAnalytics()
initAdsense()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/tips/:slug" element={<TipPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
