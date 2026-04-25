import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import companies from './routes/companies.js'
import files from './routes/files.js'
import valuation from './routes/valuation.js'
import refresh from './routes/refresh.js'
import run from './routes/run.js'
import chat from './routes/chat.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }))

app.use('/api/companies', companies)
app.use('/api/files', files)
app.use('/api/valuation', valuation)
app.use('/api/valuation/run', run)
app.use('/api/refresh', refresh)
app.use('/api/chat', chat)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Internal error' })
})

const port = +process.env.PORT || 3020
app.listen(port, '127.0.0.1', () => {
  console.log(`valuations backend on http://127.0.0.1:${port}`)
})
