import { useEffect, useState } from 'react'

export default function Footer() {
  const [now, setNow] = useState(new Date())
  const [geo, setGeo] = useState(null)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((d) => setGeo({ city: d.city, region: d.region, country: d.country_name, ip: d.ip }))
      .catch(() => setGeo({ city: '—', country: 'unknown' }))
    return () => clearInterval(t)
  }, [])

  return (
    <footer className="border-t border-ink-700/60 bg-ink-900/70 mt-4">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div>
          {geo
            ? <>📍 {geo.city || '—'}{geo.region ? `, ${geo.region}` : ''} · {geo.country} · <span className="text-slate-500">{geo.ip}</span></>
            : 'Locating…'}
        </div>
        <div>{now.toLocaleString()}</div>
        <div>© 2026 net1io · M&amp;A Valuations</div>
      </div>
    </footer>
  )
}
