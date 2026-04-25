import { useMemo, useState } from 'react'
import { FILES } from '../mock'

const typeIcon = { pdf: '📕', xlsx: '📊', docx: '📄' }

export default function FilesPanel() {
  const [q, setQ] = useState('')
  const filtered = useMemo(
    () => FILES.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()) || f.folder.toLowerCase().includes(q.toLowerCase())),
    [q]
  )
  const grouped = useMemo(() => {
    const g = {}
    for (const f of filtered) (g[f.folder] ||= []).push(f)
    return g
  }, [filtered])

  return (
    <section className="panel min-h-[420px]">
      <div className="panel-header">
        <h2 className="panel-title">DD Files (Google Drive)</h2>
        <span className="text-xs text-slate-500">{filtered.length} / {FILES.length}</span>
      </div>
      <div className="px-4 py-2 border-b border-ink-700/40">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search files…"
          className="w-full bg-ink-800 border border-ink-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-accent-500"
        />
      </div>
      <div className="panel-body">
        {Object.entries(grouped).map(([folder, files]) => (
          <div key={folder} className="mb-4">
            <div className="text-xs font-semibold text-accent-400 uppercase tracking-wider mb-1">📁 {folder}</div>
            <ul className="divide-y divide-ink-700/40">
              {files.map((f) => (
                <li key={f.name} className="py-2 flex items-center gap-3 text-sm hover:bg-ink-800/40 px-2 rounded">
                  <span>{typeIcon[f.type] || '📄'}</span>
                  <span className="flex-1 truncate text-slate-200">{f.name}</span>
                  <span className="text-xs text-slate-500 hidden sm:inline tabular-nums">{f.size}</span>
                  <span className="text-xs text-slate-500 hidden md:inline">{f.modified}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
