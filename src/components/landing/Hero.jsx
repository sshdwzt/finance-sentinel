import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Brain, TrendingUp, ChevronDown } from 'lucide-react'

const stats = [
  { icon: ShieldCheck, end: 200, suffix: '+', label: '风控规则' },
  { icon: Brain, end: 95, suffix: '%', label: 'AI准确率' },
  { icon: TrendingUp, end: 70, suffix: '%', label: '成本降低' },
]

function Counter({ end, suffix }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 2000
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end])
  return <span className="font-kpi text-4xl md:text-5xl text-white">{count}{suffix}</span>
}

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = 60
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: 1 + Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: 0.2 + Math.random() * 0.4,
      })
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default function Hero() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouse = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    setTilt({ x, y })
  }, [])

  const resetTilt = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-600 to-cyan-600">
      <div className="absolute inset-0 hero-grid opacity-40" />
      <ParticleCanvas />

      <div ref={containerRef} onMouseMove={handleMouse} onMouseLeave={resetTilt}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{
          perspective: '1000px',
        }}>
        <motion.div
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-white/70">v2.0 全新升级 · AI引擎已就绪</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              财界哨兵<span className="text-gradient">Pro</span>
            </h1>
            <p className="text-lg md:text-xl text-cyan-100/80 mb-3">AI驱动的智能财税风控平台</p>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto mb-10">
              融合OCR · NLP · 规则引擎 · 大语言模型，为中小微企业提供全链路智能财税管理与风险预警
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex flex-wrap justify-center gap-10 mb-12">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <s.icon className="w-6 h-6 text-gold-400" />
                <Counter end={s.end} suffix={s.suffix} />
                <span className="text-sm text-white/60">{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/login')} className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all">
              立即体验Demo
            </button>
            <button onClick={() => navigate('/bigscreen')} className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all">
              数据大屏
            </button>
            <a href="#modules" className="px-8 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all">
              了解更多
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <span className="text-xs text-white/40">向下滚动</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
