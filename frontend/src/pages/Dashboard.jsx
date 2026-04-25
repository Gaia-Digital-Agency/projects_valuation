import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MatrixPanel from '../components/MatrixPanel'
import FindingsPanel from '../components/FindingsPanel'
import FilesPanel from '../components/FilesPanel'
import ChatPanel from '../components/ChatPanel'

export default function Dashboard({ onLogout }) {
  const [company, setCompany] = useState('acme')
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar company={company} setCompany={setCompany} onLogout={onLogout} />
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MatrixPanel />
          <FindingsPanel />
          <FilesPanel />
          <ChatPanel />
        </div>
      </main>
      <Footer />
    </div>
  )
}
