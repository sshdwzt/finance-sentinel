import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Brain, Users, BarChart3, ArrowLeft, Monitor, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

const links = [
  { to: '/demo/dashboard', icon: LayoutDashboard, label: '风险雷达' },
  { to: '/demo/ai-engine', icon: Brain, label: 'AI引擎' },
  { to: '/demo/workspace', icon: Users, label: '协同平台' },
  { to: '/demo/reports', icon: BarChart3, label: '数据报告' },
  { to: '/bigscreen', icon: Monitor, label: '数据大屏' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 224 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="bg-navy-800 text-white flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-hidden"
    >
      <div className={`p-5 border-b border-white/10 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div>
            <h2 className="font-bold text-lg whitespace-nowrap">财界哨兵Pro</h2>
            <p className="text-xs text-white/40 mt-0.5">Demo 演示环境</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors flex-shrink-0"
          title={collapsed ? '展开侧边栏' : '收起侧边栏'}>
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map(l => (
          <NavLink key={l.to} to={l.to}
            title={collapsed ? l.label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg text-sm font-medium transition-all ${
                collapsed ? 'justify-center px-2 py-2.5' : 'px-4 py-2.5'
              } ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/60 hover:text-white hover:bg-white/5'}`
            }>
            <l.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{l.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <NavLink to="/"
          title={collapsed ? '返回官网' : undefined}
          className={`flex items-center gap-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all ${
            collapsed ? 'justify-center px-2 py-2.5' : 'px-4 py-2.5'
          }`}>
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">返回官网</span>}
        </NavLink>
      </div>
    </motion.aside>
  )
}
