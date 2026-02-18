import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react'

const testimonials = [
  {
    name: '王建国',
    role: '财务总监',
    company: '杭州创新科技有限公司',
    avatar: '王',
    avatarColor: 'from-cyan-500 to-blue-500',
    rating: 5,
    content: '使用财界哨兵Pro后，我们的月度结账时间从15天缩短到了3天。AI自动生成凭证的准确率非常高，让我们的财务团队可以把精力放在更有价值的分析工作上。',
  },
  {
    name: '李雪梅',
    role: '总经理',
    company: '深圳智联贸易有限公司',
    avatar: '李',
    avatarColor: 'from-purple-500 to-pink-500',
    rating: 5,
    content: '作为一家中小企业，之前税务方面总是提心吊胆。自从用了风险雷达功能，两次提前发现了税负异常，避免了可能的税务稽查。这个系统真的是我们的"税务守护神"！',
  },
  {
    name: '张鹏飞',
    role: '创始人',
    company: '南京云帆电子商务有限公司',
    avatar: '张',
    avatarColor: 'from-amber-500 to-orange-500',
    rating: 5,
    content: '信贷赋能报告帮我们拿到了银行500万的授信额度，利率比之前低了1.2个百分点。把财税数据转化为信用资产，这个思路太棒了！强烈推荐给所有创业公司。',
  },
  {
    name: '陈晓红',
    role: '合伙人',
    company: '上海德勤联合会计师事务所',
    avatar: '陈',
    avatarColor: 'from-emerald-500 to-green-500',
    rating: 4,
    content: '作为代账机构，我们用财界哨兵Pro批量处理客户的票据。人机协同模式让我们的人均服务企业数从30家提升到了80家，而且差错率反而降低了。',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })
  const intervalRef = useRef(null)

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const next = () => {
    setDirection(1)
    setCurrent(i => (i + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent(i => (i - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const resetTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 5000)
  }

  const t = testimonials[current]

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir < 0 ? 80 : -80, opacity: 0, transition: { duration: 0.3 } }),
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="text-sm text-purple-600 font-medium">用户好评</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            深受<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">企业信赖</span>的选择
          </h2>
          <p className="text-lg text-slate-500">来自不同行业客户的真实反馈</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 min-h-[280px] flex flex-col justify-between relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-100" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg text-slate-700 leading-relaxed mb-8 relative z-10">"{t.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => { prev(); resetTimer() }}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { goTo(i); resetTimer() }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button onClick={() => { next(); resetTimer() }}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
