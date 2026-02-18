import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, ScanLine, Brain, ShieldCheck, FileCheck, BarChart3, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: '上传票据',
    desc: '拖拽上传或拍照扫描，支持JPG/PDF/OFD等多种格式',
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-500',
  },
  {
    icon: ScanLine,
    title: 'OCR智能识别',
    desc: '多模型OCR引擎自动提取发票全字段信息，准确率98%+',
    color: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
  },
  {
    icon: Brain,
    title: 'NLP语义分析',
    desc: '自然语言处理理解业务语义，智能推荐会计科目与税种',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
  },
  {
    icon: ShieldCheck,
    title: '风险实时检测',
    desc: '200+条规则引擎实时扫描，三级预警机制即时触发',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
  },
  {
    icon: FileCheck,
    title: '自动生成凭证',
    desc: '借贷分录自动生成，高置信度直接过审，低置信度人工复核',
    color: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
  },
  {
    icon: BarChart3,
    title: '报告输出',
    desc: '财税健康雷达图、行业对标分析、信贷赋能数据包一键生成',
    color: 'from-rose-500 to-red-500',
    bg: 'bg-rose-500/10',
    text: 'text-rose-500',
  },
]

export default function HowItWorks() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-sm text-emerald-600 font-medium">使用流程</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            从票据到报告，<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500">全链路AI驱动</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            6个步骤，全程自动化，让财税管理从此告别手工时代
          </p>
        </motion.div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-slate-100" />
          <motion.div
            className="hidden lg:block absolute top-16 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step number + icon */}
                  <div className="relative mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center relative z-10 border border-white shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <Icon className={`w-6 h-6 ${step.text}`} />
                    </motion.div>
                    <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold flex items-center justify-center z-20`}>
                      {i + 1}
                    </span>
                    {/* Pulse ring on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${step.text} border-current opacity-0 group-hover:opacity-30`}
                      animate={{ scale: [1, 1.3, 1], opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Text */}
                  <h4 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { val: '< 3秒', label: '单张发票处理时间' },
            { val: '98%+', label: 'OCR识别准确率' },
            { val: '70%', label: '任务自动完成率' },
            { val: '0', label: '数据泄露事件' },
          ].map((s, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-kpi text-2xl text-cyan-600 mb-1">{s.val}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
