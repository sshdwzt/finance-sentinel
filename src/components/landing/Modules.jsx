import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Radar, Brain, Users, BarChart3, ArrowRight, CheckCircle, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const modules = [
  {
    key: 'radar',
    icon: Radar,
    title: '风险雷达',
    subtitle: '实时税务风控中心',
    features: ['200+条税务规则实时扫描', '红/黄/绿三级预警机制', '四段式风险解释(What/Why/How/Impact)', '税务健康分动态评估'],
    desc: '基于规则引擎与AI模型的双重风控体系，实时监测企业税务健康状态，提前预警潜在风险。',
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    demoPath: '/demo/dashboard'
  },
  {
    key: 'ai',
    icon: Brain,
    title: 'AI智能引擎',
    subtitle: '票据智能处理中心',
    features: ['OCR发票自动识别(准确率98%+)', 'NLP语义理解与科目推荐', '智能凭证自动生成', '多模型协同推理'],
    desc: '融合OCR、NLP、规则引擎和大语言模型，实现从发票扫描到凭证生成的全自动化处理。',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    demoPath: '/demo/ai-engine'
  },
  {
    key: 'collab',
    icon: Users,
    title: '人机协同平台',
    subtitle: '智能工作流引擎',
    features: ['AI处理70%常规任务', '智能任务分发与优先级排序', '会计师审核批注系统', '置信度驱动的人机分工'],
    desc: '以AI置信度为核心的智能分工机制，高置信度任务自动完成，低置信度任务精准推送人工审核。',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    demoPath: '/demo/workspace'
  },
  {
    key: 'report',
    icon: BarChart3,
    title: '数据增值产品',
    subtitle: '财税数据价值挖掘',
    features: ['财税健康雷达图(5维度)', '行业对标分析报告', '信贷赋能数据包', '税务优化建议引擎'],
    desc: '将财税数据转化为企业决策支持和信贷增信工具，打通"数据→洞察→价值"链路。',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    demoPath: '/demo/reports'
  },
]

// 颜色配置
const colorConfig = {
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-500',
    shadow: 'shadow-green-500/20',
    light: 'bg-green-500/5',
    glow: 'shadow-green-500/30'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-500',
    shadow: 'shadow-cyan-500/20',
    light: 'bg-cyan-500/5',
    glow: 'shadow-cyan-500/30'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-500',
    shadow: 'shadow-purple-500/20',
    light: 'bg-purple-500/5',
    glow: 'shadow-purple-500/30'
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-500',
    shadow: 'shadow-amber-500/20',
    light: 'bg-amber-500/5',
    glow: 'shadow-amber-500/30'
  }
}

// 动画变体
const contentVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3 }
  })
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
}

export default function Modules() {
  const [active, setActive] = useState('radar')
  const [direction, setDirection] = useState(0)
  const [hoveredTab, setHoveredTab] = useState(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const current = modules.find(m => m.key === active)
  const colors = colorConfig[current.color]

  const handleTabChange = (key) => {
    const keys = modules.map(m => m.key)
    const currentIndex = keys.indexOf(active)
    const newIndex = keys.indexOf(key)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActive(key)
  }

  return (
    <section id="modules" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl"></div>

      {/* 动态背景光效 */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${current.color === 'green' ? 'rgba(34, 197, 94, 0.1)' : current.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : current.color === 'purple' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 50%)`
        }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sentinel-cyan/10 border border-sentinel-cyan/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-sentinel-cyan animate-pulse" />
            <span className="text-sm text-sentinel-cyan font-medium">核心功能</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            四大核心<span className="text-sentinel-cyan">智能模块</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            覆盖财税管理全链路的智能解决方案
          </p>
        </motion.div>

        {/* 增强版Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {modules.map((m) => {
            const mColors = colorConfig[m.color]
            const isActive = active === m.key
            const isHovered = hoveredTab === m.key

            return (
              <motion.button
                key={m.key}
                onClick={() => handleTabChange(m.key)}
                onMouseEnter={() => setHoveredTab(m.key)}
                onMouseLeave={() => setHoveredTab(null)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                  isActive
                    ? `${mColors.bg} ${mColors.border} border-2 ${mColors.text} shadow-lg ${mColors.shadow}`
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-2 border-transparent shadow-md'
                }`}
              >
                {/* 活跃状态的光效背景 */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className={`absolute inset-0 bg-gradient-to-r ${m.gradient} opacity-10`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* 悬停时的光效 */}
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-slate-100 to-white"
                  />
                )}

                <m.icon className={`w-4 h-4 relative z-10 ${isActive ? '' : 'text-slate-400'}`} />
                <span className="relative z-10">{m.title}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* 内容区域 */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative"
          >
            {/* 发光边框容器 */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${current.gradient} opacity-20 blur-xl`}></div>

            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              {/* 顶部渐变条 */}
              <div className={`h-1 bg-gradient-to-r ${current.gradient}`}></div>

              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* 左侧：图标和描述 */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      {/* 动画图标容器 */}
                      <motion.div
                        className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center relative overflow-hidden`}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        {/* 背景光效 */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${current.gradient} opacity-20`}></div>

                        {/* 旋转动画 */}
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <current.icon className={`w-8 h-8 ${colors.text} relative z-10`} />
                        </motion.div>

                        {/* 脉冲环 */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl border-2 ${colors.border}`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">{current.title}</h3>
                        <p className={`text-sm font-medium ${colors.text}`}>{current.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-6 text-lg">{current.desc}</p>

                    {/* 体验按钮 */}
                    <Link
                      to={current.demoPath}
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${current.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    >
                      <Zap className="w-4 h-4" />
                      立即体验
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* 右侧：功能列表 */}
                  <div className="space-y-3">
                    {current.features.map((f, i) => (
                      <motion.div
                        key={f}
                        custom={i}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        className={`group flex items-start gap-3 p-4 rounded-xl ${colors.light} border ${colors.border} hover:shadow-md transition-all duration-300 cursor-pointer`}
                      >
                        {/* 编号徽章 */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className={`mt-0.5 w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold`}
                        >
                          {i + 1}
                        </motion.div>

                        <div className="flex-1">
                          <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{f}</span>
                        </div>

                        {/* 悬停时显示勾选 */}
                        <CheckCircle className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 底部状态栏 */}
              <div className={`px-8 py-4 ${colors.light} border-t border-slate-100 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <motion.div
                    className={`w-2 h-2 rounded-full ${colors.text} bg-current`}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm text-slate-500">模块状态：正常运行</span>
                </div>
                <span className={`text-xs ${colors.text} font-medium`}>点击体验完整功能</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}