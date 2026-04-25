import { Router } from 'express'
import { spawn } from 'node:child_process'
import path from 'node:path'

const r = Router()
const SCRIPT = path.resolve(process.cwd(), '..', 'scripts', 'sync_drive.py')

r.post('/', async (req, res) => {
  const company = req.body?.company
  if (!company) return res.status(400).json({ error: 'company required' })

  const proc = spawn('python3', [SCRIPT, company], { cwd: path.dirname(SCRIPT) })
  let out = '', err = ''
  proc.stdout.on('data', (d) => { out += d.toString() })
  proc.stderr.on('data', (d) => { err += d.toString() })
  proc.on('close', (code) => {
    if (code !== 0) return res.status(500).json({ error: err.trim() || `exit ${code}` })
    // Last line of stdout is JSON
    const lines = out.trim().split('\n')
    let result = { imported: 0 }
    try { result = JSON.parse(lines[lines.length - 1]) } catch {}
    res.json({ ok: true, ...result })
  })
})

export default r
