import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Production-only anti-tamper: right-click, text selection, and DevTools
// keyboard shortcuts. The module only activates when import.meta.env.PROD is
// true (vite sets this to "true" for --mode production builds). Safe to keep
// in the tree during `npm run dev`; it is a no-op in development.
if (import.meta.env.PROD) {
  import('./stealth.js').then(({ enableStealthMode }) => enableStealthMode());
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
