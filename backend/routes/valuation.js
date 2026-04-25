import { Router } from 'express'
import { q } from '../db.js'

const r = Router()

// GET /api/valuation/latest?company=greenviro
r.get('/latest', async (req, res) => {
  const company = req.query.company
  if (!company) return res.status(400).json({ error: 'company required' })
  const { rows: runs } = await q(
    `SELECT id, status, model, started_at, finished_at, error
       FROM valuation_runs
      WHERE company_id = $1 AND status = 'done'
      ORDER BY finished_at DESC NULLS LAST
      LIMIT 1`,
    [company]
  )
  if (!runs.length) return res.json({ run: null, metrics: [], findings: [] })
  const run = runs[0]
  const [{ rows: metrics }, { rows: findings }] = await Promise.all([
    q(`SELECT metric, value, source_file FROM valuation_metrics WHERE run_id = $1 ORDER BY sort_order`, [run.id]),
    q(`SELECT severity, category, quote, source_file, page FROM findings WHERE run_id = $1 ORDER BY id`, [run.id]),
  ])
  res.json({ run, metrics, findings })
})

export default r
