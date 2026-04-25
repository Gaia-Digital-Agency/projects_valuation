import { useEffect, useState } from 'react'
import Logo from './Logo'
import { api } from '../api'

export default function Navbar({ company, setCompany, onLogout, onRefresh, onRun, busy }) {
  const [companies, setCompanies] = useState([])
  useEffect(() => { api.companies().then(setCompanies).catch(() => setCompanies([])) }, [])

  return (
    <header className="sticky top-0 z-30 bg-ink-900/80 backdrop-blur border-b border-ink-700/60">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
        <a href="https://net1io.com" target="_blank" rel="noreferrer" className="flex-shrink-0">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm text-slate-300 ml-4">
          <a className="px-3 py-1.5 rounded hover:bg-ink-700/50">Dashboard</a>
        </nav>
        <div className="flex-1" />
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="bg-ink-800 border border-ink-700 text-slate-100 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-accent-500"
        >
          {companies.length === 0 && <option>Loading…</option>}
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          <option disabled>— placeholder —</option>
        </select>
        <button onClick={onRefresh} disabled={busy}
          className="text-sm border border-ink-700 hover:bg-ink-700/50 disabled:opacity-40 text-slate-200 px-3 py-1.5 rounded-md">
          {busy === 'refresh' ? 'Syncing…' : 'Sync Drive'}
        </button>
        <button onClick={onRun} disabled={busy}
          className="bg-accent-600 hover:bg-accent-500 disabled:opacity-40 text-white text-sm px-3 py-1.5 rounded-md">
          {busy === 'run' ? 'Running…' : 'Run Valuation'}
        </button>
        <button onClick={onLogout} className="text-xs text-slate-400 hover:text-slate-200 px-2">Sign out</button>
      </div>
    </header>
  )
}
