import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, Bot, CheckCircle, X } from 'lucide-react'

const notifications = [
  { id: 1, type: 'risk', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50',
    title: '高风险：进项发票集中作废', desc: '近30天作废12张，金额¥86,400', time: '2分钟前', read: false, link: '/demo/dashboard' },
  { id: 2, type: 'risk', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50',
    title: '中风险：增值税税负率偏低', desc: '当前1.2%，低于行业均值2.8%', time: '15分钟前', read: false, link: '/demo/dashboard' },
  { id: 3, type: 'ai', icon: Bot, color: 'text-cyan-500', bg: 'bg-cyan-50',
    title: 'AI已完成12张发票处理', desc: '置信度均>95%，已自动生成凭证', time: '30分钟前', read: false, link: '/demo/ai-engine' },
  { id: 4, type: 'system', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50',
    title: 'Q1预缴申报提醒', desc: '距截止日还有12天，预估应缴¥45,200', time: '1小时前', read: true, link: '/demo/reports' },
  { id: 5, type: 'ai', icon: Bot, color: 'text-cyan-500', bg: 'bg-cyan-50',
    title: '税务优化建议更新', desc: '发现新的加计扣除机会，预估节税¥5.2万', time: '2小时前', read: true, link: '/demo/reports' },
  { id: 6, type: 'system', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50',
    title: '月度报告已生成', desc: '2月财税健康报告可供下载', time: '3小时前', read: true, link: '/demo/reports' },
]

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'risk', label: '风险预警' },
  { key: 'system', label: '系统通知' },
  { key: 'ai', label: 'AI提醒' },
]

export default function NotificationPanel({ open, onClose }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [items, setItems] = useState(notifications)

  const filtered = activeTab === 'all' ? items : items.filter(n => n.type === activeTab)
  const unreadCount = items.filter(n => !n.read).length

  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })))

  const handleClick = (notif) => {
    setItems(items.map(n => n.id === notif.id ? { ...n, read: true } : n))
    navigate(notif.link)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-40 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-800">通知中心</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-medium">{unreadCount}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-cyan-600 hover:text-cyan-700 font-medium">
                    全部已读
                  </button>
                )}
                <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 transition-colors">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-4 py-2 border-b border-slate-50">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeTab === t.key ? 'bg-cyan-500 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Notifications */}
            <div className="max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400">暂无通知</div>
              ) : (
                filtered.map((n, i) => {
                  const Icon = n.icon
                  return (
                    <motion.button key={n.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                      onClick={() => handleClick(n)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 ${!n.read ? 'bg-cyan-50/30' : ''}`}>
                      <div className={`w-8 h-8 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${n.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm truncate ${!n.read ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{n.title}</p>
                          {!n.read && <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{n.desc}</p>
                        <p className="text-xs text-slate-300 mt-1">{n.time}</p>
                      </div>
                    </motion.button>
                  )
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
