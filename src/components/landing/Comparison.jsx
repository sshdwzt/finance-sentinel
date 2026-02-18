import { motion, useInView } from 'framer-motion'
import { Check, X, Minus, TrendingUp, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'

const features = [
  '实时风险预警',
  'AI自动记账',
  'OCR发票识别',
  '人机协同审核',
  '信贷数据赋能',
  '税务优化建议',
  '行业对标分析',
  '7×24小时服务',
]

const competitors = [
  {
    name: '传统代账',
    highlight: false,
    values: [false, false, false, false, false, false, false, false],
    color: 'slate'
  },
  {
    name: '财税SaaS',
    highlight: false,
    values: ['partial', true, true, false, false, 'partial', false, true],
    color: 'blue'
  },
  {
    name: '平台代账',
    highlight: false,
    values: ['partial', 'partial', true, false, false, false, 'partial', true],
    color: 'purple'
  },
  {
    name: '财界哨兵Pro',
    highlight: true,
    values: [true, true, true, true, true, true, true, true],
    color: 'cyan'
  },
]

const colorConfig = {
  slate: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' }
}

function CellIcon({ value, isHighlight }) {
  if (value === true) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Check className="w-5 h-5 text-emerald-500" />
      </motion.div>
    )
  }
  if (value === false) {
    return <X className="w-5 h-5 text-slate-300" />
  }
  return <Minus className="w-5 h-5 text-amber-400" />
}

export default function Comparison() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredRow, setHoveredRow] = useState(null)

  return (
    <section id="compare" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-amber-500 to-green-500"></div>

      {/* 发光装饰 */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10" ref={containerRef}>
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-amber-600 font-medium">竞争优势</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            <span className="text-sentinel-cyan">财界哨兵Pro</span> vs 竞品对比
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            全方位领先的智能财税解决方案
          </p>
        </motion.div>

        {/* 对比表格 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* 发光边框 */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-amber-500/20 to-green-500/20 blur-xl"></div>

          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* 表头 */}
            <div className="grid grid-cols-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
              <div className="p-5 text-left">
                <span className="text-sm text-slate-500 font-medium">功能特性</span>
              </div>
              {competitors.map((c, i) => {
                const colors = colorConfig[c.color]
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-5 text-center ${c.highlight ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-x border-cyan-100' : ''}`}
                  >
                    <span className={`font-bold ${c.highlight ? 'text-sentinel-cyan text-lg' : 'text-slate-700'}`}>
                      {c.name}
                    </span>
                    {c.highlight && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="mt-1"
                      >
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-600 text-xs">
                          <Sparkles className="w-3 h-3" />
                          推荐
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* 表格内容 */}
            <div className="divide-y divide-slate-50">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`grid grid-cols-5 transition-colors duration-200 ${
                    hoveredRow === i ? 'bg-slate-50' : 'bg-white'
                  }`}
                >
                  {/* 功能名称 */}
                  <div className="p-4 flex items-center gap-3">
                    <motion.div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        hoveredRow === i ? 'bg-cyan-100' : 'bg-slate-100'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-sm font-bold text-cyan-600">{i + 1}</span>
                    </motion.div>
                    <span className="font-medium text-slate-700">{f}</span>
                  </div>

                  {/* 各竞品值 */}
                  {competitors.map((c, j) => (
                    <div
                      key={c.name}
                      className={`p-4 flex items-center justify-center transition-colors ${
                        c.highlight ? 'bg-cyan-50/50' : ''
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="flex items-center justify-center"
                      >
                        <CellIcon value={c.values[i]} isHighlight={c.highlight} />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* 底部总结 */}
            <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-t border-cyan-100">
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { value: '98%', label: '识别准确率', color: 'cyan' },
                  { value: '70%', label: '成本降低', color: 'green' },
                  { value: '10x', label: '效率提升', color: 'purple' },
                  { value: '24/7', label: '全天服务', color: 'amber' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className={`text-2xl font-bold ${
                      stat.color === 'cyan' ? 'text-cyan-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' : 'text-amber-600'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 图例说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-6"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-slate-500">完全支持</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-slate-500">部分支持</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-slate-300" />
            <span className="text-sm text-slate-500">不支持</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}