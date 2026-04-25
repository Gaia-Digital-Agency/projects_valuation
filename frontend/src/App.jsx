import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const KEY = 'valuations.auth'

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(KEY) === '1')

  useEffect(() => {
    if (authed) sessionStorage.setItem(KEY, '1')
    else sessionStorage.removeItem(KEY)
  }, [authed])

  return (
    <Routes>
      <Route path="/login" element={authed ? <Navigate to="/" replace /> : <Login onLogin={() => setAuthed(true)} />} />
      <Route path="/" element={authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
