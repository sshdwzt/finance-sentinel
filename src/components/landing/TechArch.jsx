import { motion, useInView } from 'framer-motion'
import { Database, Brain, Cog, Layout, ArrowRight, Cpu, Cloud, Zap, CheckCircle } from 'lucide-react'
import { useRef, useState } from 'react'

const layers = [
  {
    icon: Database,
    title: '数据采集层',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    items: ['发票OCR扫描', '银行流水导入', '税务系统对接', 'ERP数据同步'],
  },
  {
    icon: Brain,
    title: 'AI处理层',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    items: ['OCR文字识别', 'NLP语义分析', '大语言模型推理', '多模型协同'],
  },
  {
    icon: Cog,
    title: '业务逻辑层',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    items: ['200+税务规则引擎', '智能科目匹配', '风险评分模型', '置信度计算'],
  },
  {
    icon: Layout,
    title: '应用层',
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    items: ['风险雷达仪表盘', '人机协同平台', '数据增值报告', '移动端推送'],
  },
]

const colorConfig = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-500',
    shadow: 'shadow-cyan-500/20',
    light: 'bg-cyan-500/5'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-500',
    shadow: 'shadow-purple-500/20',
    light: 'bg-purple-500/5'
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-500',
    shadow: 'shadow-amber-500/20',
    light: 'bg-amber-500/5'
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-500',
    shadow: 'shadow-green-500/20',
    light: 'bg-green-500/5'
  }
}

// 处理流程步骤
const processSteps = [
  { step: '上传票据', desc: '多渠道采集' },
  { step: 'OCR识别', desc: 'AI提取信息' },
  { step: 'NLP分析', desc: '语义理解' },
  { step: '风险检测', desc: '实时预警' },
  { step: '凭证生成', desc: '一键记账' }
]

export default function TechArch() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeLayer, setActiveLayer] = useState(0)

  return (
    <section id="tech" className="py-24 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500"></div>

      {/* 动态光效 */}
      <motion.div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${colorConfig[layers[activeLayer].color].bg.includes('cyan') ? 'rgba(6, 182, 212, 0.1)' : colorConfig[layers[activeLayer].color].bg.includes('purple') ? 'rgba(168, 85, 247, 0.1)' : colorConfig[layers[activeLayer].color].bg.includes('amber') ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)'} 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={containerRef}>
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
          >
            <Cpu className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-purple-600 font-medium">技术架构</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            四层架构，<span className="text-sentinel-cyan">端到端智能处理</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            从数据采集到应用输出，全流程AI驱动
          </p>
        </motion.div>

        {/* 处理流程指示器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative flex items-center justify-between max-w-3xl mx-auto">
            {/* 连接线 */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 transform -translate-y-1/2" />

            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <span className="text-sm font-bold text-cyan-600">{i + 1}</span>
                </motion.div>
                <span className="mt-2 text-sm font-medium text-slate-700">{item.step}</span>
                <span className="text-xs text-slate-400">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 架构层卡片 */}
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {layers.map((layer, i) => {
            const colors = colorConfig[layer.color]
            return (
              <div key={i} className="flex-1 flex items-center gap-4">
                <motion.div
n                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  onMouseEnter={() => setActiveLayer(i)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="flex-1 p-6 rounded-2xl border bg-white transition-all duration-300 cursor-pointer group"
                  style={{
                    borderColor: activeLayer === i ? colors.border.replace('/30', '') : 'rgb(226 232 240)',
                    boxShadow: activeLayer === i ? `0 20px 40px -10px ${colors.text === 'text-cyan-500' ? 'rgba(6, 182, 212, 0.2)' : colors.text === 'text-purple-500' ? 'rgba(168, 85, 247, 0.2)' : colors.text === 'text-amber-500' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 197, 94, 0.2)'}` : undefined
                  }}
                >
                  {/* 发光背景 */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${layer.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>

                  {/* 图标 */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 relative overflow-hidden`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <layer.icon className={`w-7 h-7 ${colors.text} relative z-10`} />
                    {/* 脉冲效果 */}
                    {activeLayer === i && (
                      <motion.div
                        className={`absolute inset-0 rounded-xl ${colors.bg}`}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  <h3 className="font-bold text-slate-800 mb-3 text-lg">{layer.title}</h3>

                  <ul className="space-y-2">
                    {layer.items.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + j * 0.05 }}
                        className="text-sm text-slate-500 flex items-center gap-2 group-hover:text-slate-600 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* 箭头连接 */}
                {i < layers.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    className="hidden md:flex items-center"
                  >
                    <ArrowRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* 底部技术栈 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-cyan-500" />
              <span className="text-sm text-slate-600">云原生架构</span>
            </div>
            <div className="w-px h-5 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-slate-600">GPU加速推理</span>
            </div>
            <div className="w-px h-5 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-slate-600">微服务部署</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}