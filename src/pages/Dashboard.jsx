import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, ClipboardList, Clock, CheckCircle, FileText, Brain, Upload, Shield } from 'lucide-react'
import GaugeChart from '../components/demo/GaugeChart'
import RiskCard from '../components/demo/RiskCard'
import { healthScore, kpiCards, riskAlerts, revenueTrend } from '../data/dashboard'

const kpiIcons = [TrendingUp, TrendingDown, AlertTriangle, ClipboardList]

const activityLog = [
  { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'AI自动处理12张增值税专票', time: '3分钟前' },
  { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', title: '检测到进项发票集中作废风险', time: '5分钟前' },
  { icon: Brain, color: 'text-cyan-500', bg: 'bg-cyan-50', title: 'NLP引擎完成科目推荐(置信度96%)', time: '12分钟前' },
  { icon: Upload, color: 'text-blue-500', bg: 'bg-blue-50', title: '批量导入发票38张(OCR识别完成)', time: '25分钟前' },
  { icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50', title: '自动生成记账凭证8份', time: '30分钟前' },
  { icon: Shield, color: 'text-amber-500', bg: 'bg-amber-50', title: '增值税税负率预警规则触发', time: '45分钟前' },
]

function SkeletonBlock({ className }) {
  return <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
}

function Skeleton() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-5 gap-6">
        <SkeletonBlock className="lg:col-span-1 h-40" />
        <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <SkeletonBlock key={i} className="h-28" />)}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <SkeletonBlock className="lg:col-span-2 h-80" />
        <SkeletonBlock className="h-80" />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Skeleton />

  return (
    <div className="space-y-6">
      {/* Top row: Gauge + KPIs */}
      <div className="grid lg:grid-cols-5 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 mb-3">税务健康分</p>
          <GaugeChart score={healthScore.score} color={healthScore.color} />
        </motion.div>

        <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, i) => {
            const Icon = kpiIcons[i]
            return (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-500">{kpi.label}</span>
                  <Icon className={`w-4 h-4 ${kpi.warn ? 'text-amber-500' : 'text-slate-400'}`} />
                </div>
                <p className="font-kpi text-2xl text-slate-800">{kpi.value}</p>
                <p className={`text-xs mt-1 ${kpi.warn ? 'text-amber-500' : kpi.up ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {kpi.change} 较上月
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Middle row: Chart + Risks */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">营收趋势（近12月）</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 3 }} name="营收(万)" />
              <Line type="monotone" dataKey="tax" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} name="税负率(%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">风险预警</h3>
          <div className="space-y-3">
            {riskAlerts.map(alert => (
              <RiskCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>

      {/* Activity log */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-400" />
          <h3 className="font-bold text-slate-800">最近操作日志</h3>
        </div>
        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-100" />
          <div className="space-y-4">
            {activityLog.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-start gap-3 relative"
                >
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 z-10`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm text-slate-700">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
