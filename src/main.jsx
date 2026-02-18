import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AIEngine from './pages/AIEngine'
import Workspace from './pages/Workspace'
import Reports from './pages/Reports'
import BigScreen from './pages/BigScreen'
import DemoLayout from './components/demo/DemoLayout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bigscreen" element={<BigScreen />} />
        <Route path="/demo" element={<DemoLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ai-engine" element={<AIEngine />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
