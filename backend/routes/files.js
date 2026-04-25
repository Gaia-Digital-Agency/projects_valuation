import { Router } from 'express'
import { q } from '../db.js'

const r = Router()

r.get('/', async (req, res) => {
  const company = req.query.company
  if (!company) return res.status(400).json({ error: 'company query param required' })
  const { rows } = await q(
    `SELECT drive_id, name, mime_type, size_bytes, folder_path, web_view_link, modified_time
       FROM dd_files
      WHERE company_id = $1
      ORDER BY folder_path NULLS LAST, name`,
    [company]
  )
  res.json(rows)
})

export default r
