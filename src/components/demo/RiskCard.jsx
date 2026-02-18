import { AlertTriangle, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const levelConfig = {
  high: { icon: AlertTriangle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', badge: 'bg-red-500', label: '高风险' },
  medium: { icon: AlertCircle, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', badge: 'bg-amber-500', label: '中风险' },
  low: { icon: CheckCircle, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', badge: 'bg-emerald-500', label: '低风险' },
}

export default function RiskCard({ alert }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = levelConfig[alert.level]
  const Icon = cfg.icon

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4 transition-all`}>
      <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 mt-0.5 ${cfg.text}`} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-xs text-white font-medium ${cfg.badge}`}>{cfg.label}</span>
              <span className="text-xs text-slate-400">{alert.time}</span>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">{alert.title}</h4>
            <p className="text-xs text-slate-500 mt-1">{alert.desc}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3 ml-8 space-y-2">
            {[
              { label: '现象', key: 'what' },
              { label: '原因', key: 'why' },
              { label: '建议', key: 'how' },
              { label: '影响', key: 'impact' },
            ].map(item => (
              <div key={item.key} className="text-xs">
                <span className={`font-semibold ${cfg.text}`}>{item.label}：</span>
                <span className="text-slate-600">{alert[item.key]}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
