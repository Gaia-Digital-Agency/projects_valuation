import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'

const typeIcon = (mime, name) => {
  const n = (name || '').toLowerCase()
  if (mime?.includes('pdf') || n.endsWith('.pdf')) return '📕'
  if (mime?.includes('spreadsheet') || /\.(xlsx?|csv|tsv)$/.test(n)) return '📊'
  if (mime?.includes('document') || /\.docx?$/.test(n)) return '📄'
  if (mime?.includes('folder')) return '📁'
  return '📄'
}
const fmtSize = (b) => !b ? '—' : b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(0)} KB` : `${(b/1048576).toFixed(1)} MB`
const fmtDate = (s) => s ? new Date(s).toISOString().slice(0, 10) : '—'

export default function FilesPanel({ company, refreshKey }) {
  const [files, setFiles] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!company) return
    setLoading(true); setErr('')
    api.files(company)
      .then((d) => setFiles(d))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }, [company, refreshKey])

  const filtered = useMemo(
    () => files.filter((f) =>
      f.name.toLowerCase().includes(q.toLowerCase()) ||
      (f.folder_path || '').toLowerCase().includes(q.toLowerCase())
    ), [files, q])

  const grouped = useMemo(() => {
    const g = {}
    for (const f of filtered) (g[f.folder_path || '/'] ||= []).push(f)
    return g
  }, [filtered])

  return (
    <section className="panel min-h-[420px]">
      <div className="panel-header">
        <h2 className="panel-title">DD Files (Google Drive)</h2>
        <span className="text-xs text-slate-500">{filtered.length} / {files.length}</span>
      </div>
      <div className="px-4 py-2 border-b border-ink-700/40">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search files…"
          className="w-full bg-ink-800 border border-ink-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-accent-500" />
      </div>
      <div className="panel-body">
        {loading && <div className="text-sm text-slate-500">Loading…</div>}
        {err && <div className="text-sm text-red-400">Error: {err}</div>}
        {!loading && !err && files.length === 0 && (
          <div className="text-sm text-slate-500">
            No files indexed yet. Click <span className="text-accent-400">Sync Drive</span> in the navbar.
          </div>
        )}
        {Object.entries(grouped).map(([folder, items]) => (
          <div key={folder} className="mb-4">
            <div className="text-xs font-semibold text-accent-400 uppercase tracking-wider mb-1">📁 {folder}</div>
            <ul className="divide-y divide-ink-700/40">
              {items.map((f) => (
                <li key={f.drive_id} className="py-2 flex items-center gap-3 text-sm hover:bg-ink-800/40 px-2 rounded">
                  <span>{typeIcon(f.mime_type, f.name)}</span>
                  <a href={f.web_view_link || '#'} target="_blank" rel="noreferrer"
                     className="flex-1 truncate text-slate-200 hover:text-accent-400">{f.name}</a>
                  <span className="text-xs text-slate-500 hidden sm:inline tabular-nums">{fmtSize(f.size_bytes)}</span>
                  <span className="text-xs text-slate-500 hidden md:inline">{fmtDate(f.modified_time)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
