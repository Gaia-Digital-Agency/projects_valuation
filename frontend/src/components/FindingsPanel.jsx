import { FINDINGS } from '../mock'

const sevColor = {
  high: 'bg-red-500/15 text-red-300 border-red-500/40',
  med:  'bg-amber-500/15 text-amber-300 border-amber-500/40',
  low:  'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
}

export default function FindingsPanel() {
  return (
    <section className="panel min-h-[420px]">
      <div className="panel-header">
        <h2 className="panel-title">Verbatim Findings</h2>
        <span className="text-xs text-slate-500">{FINDINGS.length} items</span>
      </div>
      <div className="panel-body space-y-3">
        {FINDINGS.map((f, i) => (
          <article key={i} className="border border-ink-700/50 rounded-lg p-3 bg-ink-800/40">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${sevColor[f.severity]}`}>
                {f.severity}
              </span>
              <span className="text-xs text-slate-400">{f.category}</span>
            </div>
            <blockquote className="text-sm text-slate-200 italic leading-relaxed">{f.quote}</blockquote>
            <div className="mt-2 text-[11px] text-slate-500">
              📄 {f.file} · p.{f.page}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
