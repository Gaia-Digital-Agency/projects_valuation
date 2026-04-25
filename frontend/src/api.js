const BASE = import.meta.env.DEV ? 'http://localhost:3020' : ''

async function get(path) {
  const r = await fetch(`${BASE}${path}`)
  if (!r.ok) throw new Error(`${r.status} ${path}`)
  return r.json()
}
async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  })
  if (!r.ok) throw new Error(`${r.status} ${path}`)
  return r.json()
}

export const api = {
  companies: () => get('/api/companies'),
  files: (company) => get(`/api/files?company=${encodeURIComponent(company)}`),
  valuationLatest: (company) => get(`/api/valuation/latest?company=${encodeURIComponent(company)}`),
  refresh: (company) => post('/api/refresh', { company }),
  runValuation: (company) => post('/api/valuation/run', { company }),
  chat: (company, message, history) => post('/api/chat', { company, message, history }),
}
