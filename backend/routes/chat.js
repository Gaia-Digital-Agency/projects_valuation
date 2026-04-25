import { Router } from 'express'
import { anthropic, MODEL_CHAT } from '../services/anthropic.js'
import { buildCorpus } from '../services/corpus.js'
import { q } from '../db.js'

const r = Router()

const corpusCache = new Map()  // companyId -> { text, fileCount, ts }
const TTL_MS = 5 * 60 * 1000

async function getCorpus(company) {
  const hit = corpusCache.get(company)
  if (hit && Date.now() - hit.ts < TTL_MS) return hit
  const c = await buildCorpus(company)
  const entry = { ...c, ts: Date.now() }
  corpusCache.set(company, entry)
  return entry
}

r.post('/', async (req, res) => {
  const { company, message, history = [] } = req.body || {}
  if (!company || !message) return res.status(400).json({ error: 'company and message required' })

  const { rows: cRows } = await q('SELECT name FROM companies WHERE id=$1', [company])
  if (!cRows.length) return res.status(404).json({ error: 'unknown company' })

  const corpus = await getCorpus(company)

  const systemBlocks = [
    { type: 'text', text: `You are an M&A analyst assistant for ${cRows[0].name}. Answer concisely (under 200 words unless detail is requested). Cite source file names when referencing facts. If unsure, say so.` },
    {
      type: 'text',
      text: `===== DUE-DILIGENCE CORPUS (${corpus.fileCount} files) =====\n${corpus.text}`,
      cache_control: { type: 'ephemeral' },
    },
  ]

  const msgs = [
    ...history.filter((m) => m.role && m.content).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ]

  try {
    const resp = await anthropic.messages.create({
      model: MODEL_CHAT,
      max_tokens: 1024,
      system: systemBlocks,
      messages: msgs,
    })
    const reply = resp.content.map((c) => c.text || '').join('').trim()

    // Persist
    await q(`INSERT INTO chat_messages (company_id, role, content) VALUES ($1, 'user', $2), ($1, 'assistant', $3)`,
            [company, message.slice(0, 4000), reply.slice(0, 8000)])

    res.json({ reply, usage: resp.usage })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default r
