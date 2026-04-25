# projects_valuation

M&A Valuations console for net1io — reads due-diligence files from a per-company Google Drive folder, runs a Claude-powered analysis, and presents a 4-quadrant dashboard:

- **Top-left** — Valuation Matrix (key metrics)
- **Top-right** — Verbatim Findings (cited risk quotes)
- **Bottom-left** — DD Files (Drive listing)
- **Bottom-right** — AI Chat (Claude over the corpus)

## Stack
PostgreSQL · Vite + React + TailwindCSS · Node/Express · Python (Drive crawler & extractors) · Anthropic SDK (Claude opus-4-7).

## Status
Phase 1 — frontend with mock data. Backend wiring in progress.

## Run (frontend)
```
cd frontend
npm install
npm run dev   # http://localhost:5173
```

Demo login: `azlan@net1io.com` / `Valuations@123`

## Deployment
Served at https://valuations.net1io.space (nginx reverse proxy, Let's Encrypt).
