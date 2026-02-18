import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'

const navLinks = [
  { label: '痛点分析', target: 'pain' },
  { label: '核心模块', target: 'modules' },
  { label: '技术架构', target: 'tech' },
  { label: '竞品对比', target: 'compare' },
  { label: '定价方案', target: 'pricing' },
  { label: '团队', target: 'team' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
          <Shield className={`w-7 h-7 ${scrolled ? 'text-navy-600' : 'text-cyan-400'}`} />
          <span className={`font-bold text-lg ${scrolled ? 'text-navy-600' : 'text-white'}`}>财界哨兵Pro</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <button key={l.target} onClick={() => scrollTo(l.target)} className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-navy-600' : 'text-white/80 hover:text-white'}`}>
              {l.label}
            </button>
          ))}
          <button onClick={() => navigate('/demo/dashboard')} className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            进入演示
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className={scrolled ? 'text-slate-800' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          {navLinks.map(l => (
            <button key={l.target} onClick={() => { setOpen(false); scrollTo(l.target) }} className="block text-sm text-slate-700 hover:text-navy-600 text-left">{l.label}</button>
          ))}
          <button onClick={() => { setOpen(false); navigate('/demo/dashboard') }} className="w-full py-2 rounded-lg bg-cyan-500 text-white text-sm font-medium">进入演示</button>
        </div>
      )}
    </nav>
  )
}
