import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MatrixPanel from '../components/MatrixPanel'
import FindingsPanel from '../components/FindingsPanel'
import FilesPanel from '../components/FilesPanel'
import ChatPanel from '../components/ChatPanel'
import { api } from '../api'

export default function Dashboard({ onLogout }) {
  const [company, setCompany] = useState('greenviro')
  const [busy, setBusy] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [toast, setToast] = useState('')

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 4000) }

  const onRefresh = async () => {
    setBusy('refresh')
    try { const r = await api.refresh(company); flash(`Drive synced — ${r.imported || 0} files`); setRefreshKey((k) => k+1) }
    catch (e) { flash(`Sync failed: ${e.message}`) }
    finally { setBusy(null) }
  }
  const onRun = async () => {
    setBusy('run')
    try { await api.runValuation(company); flash('Valuation complete'); setRefreshKey((k) => k+1) }
    catch (e) { flash(`Run failed: ${e.message}`) }
    finally { setBusy(null) }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar company={company} setCompany={setCompany} onLogout={onLogout}
        onRefresh={onRefresh} onRun={onRun} busy={busy} />
      {toast && <div className="bg-accent-600/20 border-b border-accent-500/40 text-sm text-accent-200 px-4 py-2 text-center">{toast}</div>}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MatrixPanel company={company} refreshKey={refreshKey} />
          <FindingsPanel company={company} refreshKey={refreshKey} />
          <FilesPanel company={company} refreshKey={refreshKey} />
          <ChatPanel company={company} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
