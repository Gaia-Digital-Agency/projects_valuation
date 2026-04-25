import Logo from './Logo'
import { COMPANIES } from '../mock'

export default function Navbar({ company, setCompany, onLogout }) {
  return (
    <header className="sticky top-0 z-30 bg-ink-900/80 backdrop-blur border-b border-ink-700/60">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
        <a href="https://net1io.com" target="_blank" rel="noreferrer" className="flex-shrink-0">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm text-slate-300 ml-4">
          <a className="px-3 py-1.5 rounded hover:bg-ink-700/50">Dashboard</a>
          <a className="px-3 py-1.5 rounded hover:bg-ink-700/50">Reports</a>
          <a className="px-3 py-1.5 rounded hover:bg-ink-700/50">Settings</a>
        </nav>
        <div className="flex-1" />
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="bg-ink-800 border border-ink-700 text-slate-100 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-accent-500"
        >
          {COMPANIES.map((c) => (
            <option key={c.id} value={c.id} disabled={c.disabled}>{c.name}</option>
          ))}
        </select>
        <button className="bg-accent-600 hover:bg-accent-500 text-white text-sm px-3 py-1.5 rounded-md">
          Run Valuation
        </button>
        <button onClick={onLogout} className="text-xs text-slate-400 hover:text-slate-200 px-2">
          Sign out
        </button>
      </div>
    </header>
  )
}
