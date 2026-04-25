import { useEffect, useRef, useState } from 'react'
import { INITIAL_CHAT } from '../mock'

const SUGGESTIONS = [
  'Summarize the top 3 risks',
  'How was the EV/EBITDA derived?',
  'Walk me through the DCF assumptions',
]

function mockReply(q) {
  return `*(mock response — backend not wired yet)*\n\nYou asked: **${q}**\n\nOnce the backend is connected, I'll answer using the Drive corpus and cite the exact source files.`
}

export default function ChatPanel() {
  const [messages, setMessages] = useState(INITIAL_CHAT)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = (text) => {
    const q = (text ?? input).trim()
    if (!q || sending) return
    setMessages((m) => [...m, { role: 'user', content: q }])
    setInput('')
    setSending(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: mockReply(q) }])
      setSending(false)
    }, 600)
  }

  return (
    <section className="panel min-h-[420px]">
      <div className="panel-header">
        <h2 className="panel-title">AI Chat — Claude</h2>
        <span className="text-xs text-slate-500">claude-opus-4-7</span>
      </div>
      <div className="panel-body space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                m.role === 'user'
                  ? 'bg-accent-600 text-white'
                  : 'bg-ink-800/70 border border-ink-700/60 text-slate-200'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending && <div className="text-xs text-slate-500">Claude is thinking…</div>}
        <div ref={endRef} />
      </div>
      <div className="px-4 py-2 border-t border-ink-700/40">
        <div className="flex flex-wrap gap-1 mb-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)}
              className="text-[11px] px-2 py-1 rounded border border-ink-700 text-slate-300 hover:bg-ink-700/50">
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the valuation…"
            className="flex-1 bg-ink-800 border border-ink-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent-500"
          />
          <button type="submit" disabled={sending || !input.trim()}
            className="bg-accent-600 hover:bg-accent-500 disabled:opacity-40 text-white text-sm px-4 rounded-md">
            Send
          </button>
        </form>
      </div>
    </section>
  )
}
