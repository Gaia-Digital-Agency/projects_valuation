import { Router } from 'express'
import { q, pool } from '../db.js'
import { anthropic, MODEL_ANALYSIS } from '../services/anthropic.js'
import { buildCorpus } from '../services/corpus.js'

const r = Router()

const SYSTEM = `You are an expert M&A analyst producing a valuation report from a corpus of due-diligence files.
Return STRICT JSON ONLY (no markdown, no prose). Schema:
{
  "metrics": [
    { "metric": "Revenue (FY2025)", "value": "MYR 48.2M", "source_file": "Audited FS 2025.pdf" },
    ...  // 10–15 most important metrics: revenue, EBITDA, margins, net debt, EV, DCF, WACC, comps multiples, equity value, etc.
  ],
  "findings": [
    { "severity": "high|med|low", "category": "Customer concentration", "quote": "exact quote from source", "source_file": "Mgmt Pres.pdf", "page": 14 },
    ...  // 6–10 risks/opportunities, each with a verbatim quote (may be paraphrased only if no exact quote exists)
  ]
}
Rules:
- Use figures actually present in the corpus. If a number is derived (e.g. margin), say "derived" in source_file.
- Currency: keep the currency used in the docs (MYR, USD, etc.).
- Findings: prioritize material risks first; severity reflects impact on valuation.
- Maximum 15 metrics, maximum 10 findings.`

r.post('/', async (req, res) => {
  const company = req.body?.company
  if (!company) return res.status(400).json({ error: 'company required' })

  const { rows: cRows } = await q('SELECT id, name FROM companies WHERE id = $1', [company])
  if (!cRows.length) return res.status(404).json({ error: 'unknown company' })

  const corpus = await buildCorpus(company)
  if (!corpus.fileCount) return res.status(400).json({ error: 'no extracted files — run Sync Drive first' })

  const { rows: runRows } = await q(
    `INSERT INTO valuation_runs (company_id, status, model) VALUES ($1, 'running', $2) RETURNING id`,
    [company, MODEL_ANALYSIS]
  )
  const runId = runRows[0].id

  try {
    const userMsg = `Company: ${cRows[0].name}\n\nDue-diligence corpus (${corpus.fileCount} files, ${corpus.charCount} chars):\n${corpus.text}\n\nReturn the JSON now.`

    const resp = await anthropic.messages.create({
      model: MODEL_ANALYSIS,
      max_tokens: 8000,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMsg }],
    })

    const raw = resp.content.map((c) => c.text || '').join('')
    const jsonStr = raw.replace(/^```json\s*|\s*```$/g, '').trim()
    let parsed
    try { parsed = JSON.parse(jsonStr) }
    catch {
      const m = jsonStr.match(/\{[\s\S]*\}/)
      parsed = m ? JSON.parse(m[0]) : null
    }
    if (!parsed) throw new Error('Model did not return valid JSON')

    const metrics = (parsed.metrics || []).slice(0, 15)
    const findings = (parsed.findings || []).slice(0, 10)

    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      for (let i = 0; i < metrics.length; i++) {
        const m = metrics[i]
        await client.query(
          `INSERT INTO valuation_metrics (run_id, sort_order, metric, value, source_file)
           VALUES ($1, $2, $3, $4, $5)`,
          [runId, i, String(m.metric || '').slice(0, 200), String(m.value ?? '').slice(0, 200), m.source_file?.slice(0, 200) || null]
        )
      }
      for (const f of findings) {
        const sev = ['high','med','low'].includes(f.severity) ? f.severity : 'med'
        await client.query(
          `INSERT INTO findings (run_id, severity, category, quote, source_file, page)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [runId, sev, String(f.category || 'General').slice(0, 120),
           String(f.quote || '').slice(0, 2000), f.source_file?.slice(0, 200) || null,
           Number.isInteger(f.page) ? f.page : null]
        )
      }
      await client.query(
        `UPDATE valuation_runs SET status='done', finished_at=NOW() WHERE id=$1`, [runId]
      )
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }

    res.json({ ok: true, run_id: runId, metrics: metrics.length, findings: findings.length })
  } catch (e) {
    await q(`UPDATE valuation_runs SET status='error', error=$2, finished_at=NOW() WHERE id=$1`,
            [runId, e.message?.slice(0, 1000) || 'unknown'])
    res.status(500).json({ error: e.message })
  }
})

export default r
