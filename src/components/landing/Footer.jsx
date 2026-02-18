import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white/60 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white">财界哨兵Pro</span>
        </div>
        <p className="text-sm text-center">AI驱动的智能财税风控平台 · 创新创业大赛参赛作品</p>
        <p className="text-xs">© 2024 财界哨兵Pro 团队 · 仅供演示</p>
      </div>
    </footer>
  )
}
