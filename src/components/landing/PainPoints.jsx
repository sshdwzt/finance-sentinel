import { motion } from 'framer-motion'
import { DollarSign, AlertTriangle, Clock } from 'lucide-react'

const pains = [
  {
    icon: DollarSign,
    title: '人力成本高',
    desc: '中小企业平均每年花费6-12万元用于基础财税处理，占运营成本8%-15%',
    stat: '¥6-12万/年',
  },
  {
    icon: AlertTriangle,
    title: '税务风险大',
    desc: '73%的中小企业曾因财税差错被税务预警，平均补税金额达营收的2.3%',
    stat: '73%被预警',
  },
  {
    icon: Clock,
    title: '处理效率低',
    desc: '传统代账模式下，月均处理周期15-20天，信息滞后导致决策延迟',
    stat: '15-20天/月',
  },
]

export default function PainPoints() {
  return (
    <section id="pain" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-navy-600 mb-3">中小企业财税之痛</h2>
        <p className="text-center text-slate-500 mb-12">来自对200+中小微企业的深度调研</p>
        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="relative p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-100 transition-colors">
                <p.icon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.desc}</p>
              <span className="font-kpi text-2xl text-red-500">{p.stat}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
