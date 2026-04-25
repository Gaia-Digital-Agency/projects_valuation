import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

const DEMO_EMAIL = 'azlan@net1io.com'
const DEMO_PASSWORD = 'Valuations@123'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (email.trim().toLowerCase() === DEMO_EMAIL && pw === DEMO_PASSWORD) {
      onLogin()
      nav('/')
    } else {
      setErr('Invalid credentials. See helper below.')
    }
  }

  const fill = () => { setEmail(DEMO_EMAIL); setPw(DEMO_PASSWORD); setErr('') }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6"><Logo className="h-10" /></div>
        <div className="panel p-6">
          <h1 className="text-xl font-semibold text-slate-100 mb-1">Sign in</h1>
          <p className="text-xs text-slate-400 mb-5">M&amp;A Valuations Console</p>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-400">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-ink-800 border border-ink-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Password</label>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
                className="mt-1 w-full bg-ink-800 border border-ink-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent-500" />
            </div>
            {err && <div className="text-xs text-red-400">{err}</div>}
            <button type="submit" className="w-full bg-accent-600 hover:bg-accent-500 text-white rounded-md py-2 text-sm font-medium">
              Sign in
            </button>
          </form>

          <div className="mt-5 border border-amber-500/40 bg-amber-500/10 rounded-md p-3 text-xs text-amber-200">
            <div className="font-semibold mb-1">🔑 Demo credentials</div>
            <div>Email: <code className="text-amber-100">{DEMO_EMAIL}</code></div>
            <div>Password: <code className="text-amber-100">{DEMO_PASSWORD}</code></div>
            <button type="button" onClick={fill}
              className="mt-2 text-[11px] underline hover:text-amber-50">Auto-fill</button>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-4">© 2026 net1io</p>
      </div>
    </div>
  )
}
