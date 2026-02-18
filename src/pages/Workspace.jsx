import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react'
import { workloadSplit, taskQueue, reviewPanel } from '../data/workspace'

const statusConfig = {
  done: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'AI已完成' },
  review: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: '待审核' },
  pending: { icon: AlertCircle, color: 'text-slate-400', bg: 'bg-slate-50', label: '待处理' },
}

export default function Workspace() {
  return (
    <div className="space-y-6">
      {/* Top: Pie chart + Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col items-center">
          <h3 className="font-bold text-slate-800 mb-4">工作量分配</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={workloadSplit} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}>
                {workloadSplit.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-2">
            {workloadSplit.map(w => (
              <div key={w.name} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ background: w.color }} />
                <span className="text-slate-600">{w.name} {w.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Task queue */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">任务队列</h3>
          <div className="space-y-2">
            {taskQueue.map((task, i) => {
              const cfg = statusConfig[task.status]
              const Icon = cfg.icon
              return (
                <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${cfg.bg}`}>
                  <Icon className={`w-4 h-4 ${cfg.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 truncate">{task.title}</p>
                    <p className="text-xs text-slate-400">{task.handler} · {task.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${cfg.bg} ${cfg.color} font-medium`}>{cfg.label}</span>
                  <span className="font-kpi text-xs text-slate-500">{(task.confidence * 100).toFixed(0)}%</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Review panel */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">审核面板 — {reviewPanel.title}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* AI generated voucher */}
          <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-100">
            <p className="text-sm font-semibold text-cyan-700 mb-3">AI生成凭证</p>
            <table className="w-full text-sm mb-3">
              <tbody>
                {reviewPanel.aiVoucher.entries.map((e, i) => (
                  <tr key={i} className="border-b border-cyan-100/50">
                    <td className={`py-1.5 font-medium ${e.direction === '借' ? 'text-cyan-600' : 'text-amber-600'}`}>{e.direction}</td>
                    <td className="py-1.5 text-slate-700">{e.account}</td>
                    <td className="py-1.5 text-right font-kpi text-slate-800">¥{e.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-start gap-2 p-2 rounded bg-amber-50 border border-amber-100">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700">{reviewPanel.aiVoucher.aiNote}</p>
            </div>
          </div>

          {/* Accountant review */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-700 mb-3">会计师审核意见</p>
            <div className="flex items-start gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">{reviewPanel.accountantNote}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">已审批通过</span>
              <span className="text-xs text-slate-400">审核人：张会计</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
