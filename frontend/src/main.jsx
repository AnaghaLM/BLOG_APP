import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextAPI from './Context/ContextAPI.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextAPI>
        <App />
    </ContextAPI>
  
  </StrictMode>,
)
