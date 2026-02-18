import { motion } from 'framer-motion'
import {
  RadarChart, Radar as ReRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Award, TrendingUp, Lightbulb, ArrowUpRight } from 'lucide-react'
import { healthRadar, industryBenchmark, creditReport, taxSuggestions } from '../data/reports'

const priorityConfig = {
  high: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  medium: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
}

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Top row: Radar + Benchmark */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Health radar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">财税健康雷达图</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={healthRadar}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <ReRadar name="得分" dataKey="score" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Industry benchmark */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">行业对标分析</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={industryBenchmark} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="metric" type="category" tick={{ fontSize: 12 }} width={70} />
              <Tooltip />
              <Legend />
              <Bar dataKey="self" name="本企业" fill="#06B6D4" radius={[0, 4, 4, 0]} barSize={14} />
              <Bar dataKey="industry" name="行业均值" fill="#CBD5E1" radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom row: Credit report + Tax suggestions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Credit report */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold">信贷赋能报告</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-xs text-white/50">信用评级</p>
              <p className="font-kpi text-2xl text-gold-400">{creditReport.creditScore}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">授信额度</p>
              <p className="font-kpi text-2xl text-cyan-400">{creditReport.maxLoan}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">参考利率</p>
              <p className="font-kpi text-2xl text-emerald-400">{creditReport.rate}</p>
            </div>
          </div>
          <div className="space-y-2">
            {creditReport.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {h}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tax suggestions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-gold-500" />
            <h3 className="font-bold text-slate-800">税务优化建议</h3>
          </div>
          <div className="space-y-3">
            {taxSuggestions.map((s, i) => {
              const cfg = priorityConfig[s.priority]
              return (
                <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl border ${cfg.border} ${cfg.bg} flex items-start justify-between gap-4`}>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-1">{s.title}</h4>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-kpi text-lg ${cfg.color}`}>{s.saving}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <ArrowUpRight className="w-3 h-3" />
                      预估节税
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
