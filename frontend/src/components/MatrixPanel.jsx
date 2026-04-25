import { MATRIX } from '../mock'

export default function MatrixPanel() {
  return (
    <section className="panel min-h-[420px]">
      <div className="panel-header">
        <h2 className="panel-title">Valuation Matrix</h2>
        <span className="text-xs text-slate-500">10 metrics</span>
      </div>
      <div className="panel-body">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
              <th className="py-2 font-medium">Metric</th>
              <th className="py-2 font-medium text-right">Value</th>
              <th className="py-2 font-medium text-right hidden sm:table-cell">Source</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => (
              <tr key={row.metric} className="border-t border-ink-700/40 hover:bg-ink-800/40">
                <td className="py-2 text-slate-200">{row.metric}</td>
                <td className="py-2 text-right font-medium text-accent-400 tabular-nums">{row.value}</td>
                <td className="py-2 text-right text-xs text-slate-500 hidden sm:table-cell truncate max-w-[180px]">{row.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
