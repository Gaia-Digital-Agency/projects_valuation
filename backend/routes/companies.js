import { Router } from 'express'
import { q } from '../db.js'

const r = Router()

r.get('/', async (_req, res) => {
  const { rows } = await q(`SELECT id, name, drive_folder_id FROM companies ORDER BY name`)
  res.json(rows)
})

export default r
