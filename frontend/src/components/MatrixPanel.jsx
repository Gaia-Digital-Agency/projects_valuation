import { useEffect, useState } from 'react'
import { api } from '../api'

export default function MatrixPanel({ company, refreshKey }) {
  const [data, setData] = useState({ run: null, metrics: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!company) return
    setLoading(true)
    api.valuationLatest(company)
      .then(setData)
      .catch(() => setData({ run: null, metrics: [] }))
      .finally(() => setLoading(false))
  }, [company, refreshKey])

  const metrics = data.metrics || []

  return (
    <section className="panel min-h-[420px]">
      <div className="panel-header">
        <h2 className="panel-title">Valuation Matrix</h2>
        <span className="text-xs text-slate-500">
          {metrics.length} metrics{data.run ? ` · ${new Date(data.run.finished_at).toLocaleDateString()}` : ''}
        </span>
      </div>
      <div className="panel-body">
        {loading && <div className="text-sm text-slate-500">Loading…</div>}
        {!loading && metrics.length === 0 && (
          <div className="text-sm text-slate-500">
            No valuation yet. Click <span className="text-accent-400">Run Valuation</span> to generate one.
          </div>
        )}
        {metrics.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="py-2 font-medium">Metric</th>
                <th className="py-2 font-medium text-right">Value</th>
                <th className="py-2 font-medium text-right hidden sm:table-cell">Source</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((row, i) => (
                <tr key={i} className="border-t border-ink-700/40 hover:bg-ink-800/40">
                  <td className="py-2 text-slate-200">{row.metric}</td>
                  <td className="py-2 text-right font-medium text-accent-400 tabular-nums">{row.value}</td>
                  <td className="py-2 text-right text-xs text-slate-500 hidden sm:table-cell truncate max-w-[180px]">{row.source_file || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
