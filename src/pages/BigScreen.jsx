import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar as ReRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from 'recharts'
import { ShieldCheck, Maximize2, Minimize2, AlertTriangle, Activity, Zap, TrendingUp } from 'lucide-react'
import { healthRadar } from '../data/reports'
import { revenueTrend } from '../data/dashboard'
import { coreMetrics, riskTrend, regionData, liveAlerts, taskDistribution, monthlyProcessing } from '../data/bigscreen'

function FlipNumber({ value, suffix = '', decimals = 0 }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const end = typeof value === 'number' ? value : parseFloat(value)
    const duration = 2000
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setDisplay(end); clearInterval(timer) }
      else setDisplay(start)
    }, 16)
    return () => clearInterval(timer)
  }, [value])
  return <span className="font-kpi">{decimals > 0 ? display.toFixed(decimals) : Math.floor(display)}{suffix}</span>
}

function RollingAlerts({ alerts }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % alerts.length), 3000)
    return () => clearInterval(timer)
  }, [alerts.length])

  const visible = [0, 1, 2, 3, 4].map(offset => alerts[(index + offset) % alerts.length])
  const levelColors = { high: 'text-red-400', medium: 'text-amber-400', low: 'text-emerald-400' }
  const levelBg = { high: 'bg-red-400', medium: 'bg-amber-400', low: 'bg-emerald-400' }

  return (
    <div className="space-y-2 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {visible.map((a, i) => (
          <motion.div key={`${a.id}-${index}-${i}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 - i * 0.15, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
            <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${levelBg[a.type]}`} />
            <div className="min-w-0 flex-1">
              <p className={`text-xs ${levelColors[a.type]} mb-0.5`}>{a.time}</p>
              <p className="text-xs text-slate-300 leading-relaxed truncate">{a.msg}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function GaugeBig({ score, size = 180 }) {
  const radius = (size - 20) / 2
  const circumference = Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 90 ? '#10B981' : score >= 80 ? '#06B6D4' : score >= 60 ? '#F59E0B' : '#EF4444'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size / 2 + 30 }}>
      <svg width={size} height={size / 2 + 10} className="overflow-visible">
        <path d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
        <motion.path d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }} transition={{ duration: 2, ease: 'easeOut' }} />
      </svg>
      <div className="absolute bottom-0 text-center">
        <span className="font-kpi text-4xl" style={{ color }}><FlipNumber value={score} /></span>
        <p className="text-xs text-slate-400 mt-1">税务健康分</p>
      </div>
    </div>
  )
}

const darkTooltipStyle = { contentStyle: { background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#e2e8f0' } }

export default function BigScreen() {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date())
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') navigate(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-hidden">
      {/* Decorative grid */}
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Corner glows */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 h-screen flex flex-col p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">财界哨兵 · 智能财税风控大屏</h1>
              <p className="text-xs text-slate-400">实时数据监控中心</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-sm text-emerald-400">系统运行正常</span>
            </div>
            <span className="font-kpi text-lg text-cyan-400">
              {time.getFullYear()}-{pad(time.getMonth() + 1)}-{pad(time.getDate())} {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
            </span>
            <button onClick={toggleFullscreen} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button onClick={() => navigate(-1)}
              className="px-3 py-1.5 rounded-lg border border-white/20 text-sm hover:bg-white/10 transition-colors">
              退出大屏
            </button>
          </div>
        </header>

        {/* Core metrics */}
        <div className="grid grid-cols-4 gap-4 mb-4 flex-shrink-0">
          {coreMetrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-4">
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="text-xs text-slate-400 mb-2">{m.label}</p>
              <p className="text-3xl font-kpi text-white mb-1">
                <FlipNumber value={m.value} suffix={m.suffix} decimals={m.suffix === '%' || m.suffix === '万' ? 1 : 0} />
              </p>
              <span className="text-xs text-emerald-400">{m.change} ↑</span>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left column */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Gauge */}
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex flex-col items-center">
              <GaugeBig score={85} />
            </div>
            {/* Live alerts */}
            <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold">实时风险预警</h3>
                <span className="ml-auto px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-kpi">LIVE</span>
              </div>
              <RollingAlerts alerts={liveAlerts} />
            </div>
          </div>

          {/* Center column */}
          <div className="col-span-6 flex flex-col gap-4">
            {/* Region overview */}
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold">区域业务分布</h3>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {regionData.map(r => (
                  <motion.div key={r.name} whileHover={{ scale: 1.05 }}
                    className="text-center p-3 rounded-lg bg-white/[0.04] border border-white/5 cursor-pointer hover:border-cyan-500/30 transition-colors">
                    <p className="text-xs text-slate-400 mb-1">{r.name}</p>
                    <p className="font-kpi text-lg text-cyan-400"><FlipNumber value={r.value} /></p>
                    <p className="text-xs text-slate-500">税负 {r.rate}</p>
                  </motion.div>
                ))}
              </div>
              {/* Risk trend area chart */}
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={riskTrend}>
                  <defs>
                    <linearGradient id="riskHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="riskMed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="riskLow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip {...darkTooltipStyle} />
                  <Area type="monotone" dataKey="high" stroke="#EF4444" fill="url(#riskHigh)" strokeWidth={2} name="高风险" />
                  <Area type="monotone" dataKey="medium" stroke="#F59E0B" fill="url(#riskMed)" strokeWidth={2} name="中风险" />
                  <Area type="monotone" dataKey="low" stroke="#10B981" fill="url(#riskLow)" strokeWidth={2} name="低风险" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly processing bar chart */}
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4" style={{ height: 200 }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold">月度处理量趋势</h3>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={monthlyProcessing}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip {...darkTooltipStyle} />
                  <Bar dataKey="invoices" name="发票处理" fill="#06B6D4" radius={[3, 3, 0, 0]} barSize={16} />
                  <Bar dataKey="vouchers" name="凭证生成" fill="#8B5CF6" radius={[3, 3, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Revenue trend */}
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4" style={{ height: 220 }}>
              <h3 className="text-sm font-semibold mb-3">营收趋势</h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip {...darkTooltipStyle} />
                  <Line type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={2} dot={{ r: 2, fill: '#06B6D4' }} name="营收(万)" />
                  <Line type="monotone" dataKey="tax" stroke="#F59E0B" strokeWidth={1.5} dot={false} name="税负率(%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Radar */}
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex-1">
              <h3 className="text-sm font-semibold mb-2">财税健康雷达</h3>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={healthRadar}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <ReRadar name="得分" dataKey="score" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Task distribution */}
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4" style={{ height: 160 }}>
              <h3 className="text-sm font-semibold mb-2">任务分配</h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={100} height={100}>
                  <PieChart>
                    <Pie data={taskDistribution} cx="50%" cy="50%" innerRadius={30} outerRadius={45} dataKey="value" paddingAngle={3}>
                      {taskDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {taskDistribution.map(d => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                      <span className="text-slate-400">{d.name}</span>
                      <span className="font-kpi text-white ml-auto">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
