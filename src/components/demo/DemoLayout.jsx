import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import AIChat from './AIChat'
import NotificationPanel from './NotificationPanel'
import { Bell, User } from 'lucide-react'

const titles = {
  '/demo/dashboard': '风险雷达仪表盘',
  '/demo/ai-engine': 'AI智能引擎',
  '/demo/workspace': '人机协同平台',
  '/demo/reports': '数据增值报告',
}

export default function DemoLayout() {
  const { pathname } = useLocation()
  const title = titles[pathname] || 'Demo'
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="font-bold text-slate-800">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </button>
              <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-slate-600">演示账户</span>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <AIChat />
    </div>
  )
}
