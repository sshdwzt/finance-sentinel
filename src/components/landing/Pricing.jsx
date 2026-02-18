import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: '基础版',
    price: 99,
    period: '/月',
    desc: '适合初创微型企业',
    features: ['AI自动记账(50笔/月)', 'OCR发票识别', '基础风险预警', '月度财税报告', '邮件支持'],
    highlight: false,
  },
  {
    name: '专业版',
    price: 199,
    period: '/月',
    desc: '适合成长型中小企业',
    features: ['AI自动记账(不限量)', 'OCR+NLP智能处理', '全量风险预警+四段式解释', '行业对标分析', '信贷赋能报告', '专属客服'],
    highlight: true,
  },
  {
    name: '企业版',
    price: 299,
    period: '/月',
    desc: '适合规模化企业',
    features: ['全部专业版功能', '多主体管理', 'API对接ERP/银行', '定制化规则引擎', '税务优化顾问', '7×24专属服务'],
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-navy-600 mb-3">定价方案</h2>
        <p className="text-center text-slate-500 mb-12">灵活定价，按需选择</p>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all ${plan.highlight ? 'border-navy-600 shadow-xl shadow-navy-600/10 scale-105' : 'border-slate-200 hover:shadow-lg'}`}>
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-navy-600 text-white text-xs font-medium">
                  推荐
                </span>
              )}
              <h3 className="text-lg font-bold text-slate-800 mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="font-kpi text-4xl text-navy-600">¥{plan.price}</span>
                <span className="text-slate-400 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${plan.highlight ? 'bg-navy-600 text-white hover:bg-navy-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                选择方案
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
