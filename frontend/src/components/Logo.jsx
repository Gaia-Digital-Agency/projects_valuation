export default function Logo({ className = 'h-8' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-full w-auto" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#lg)" />
        <path d="M11 28 L11 12 L20 24 L20 12 M24 12 L24 28 M28 12 L32 12 M28 20 L31 20 M28 28 L32 28"
              stroke="#0B1B2B" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="leading-none">
        <div className="text-lg font-semibold tracking-tight text-slate-100">net1io</div>
        <div className="text-[10px] tracking-[0.2em] text-accent-400 uppercase">Valuations</div>
      </div>
    </div>
  )
}
