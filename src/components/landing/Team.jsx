import { motion } from 'framer-motion'

const members = [
  { name: '龚彦丞', role: '首席执行官', major: '战略管理', skill: '战略规划与团队管理' },
  { name: '方翔', role: '首席运营官', major: '运营管理', skill: '业务运营与流程优化' },
  { name: '雷汶鑫', role: '首席技术官', major: '计算机科学', skill: 'AI算法与系统架构' },
  { name: '曹庆', role: '首席合规官', major: '财税合规', skill: '税务筹划与合规审计' },
  { name: '段震阳', role: '首席营销官', major: '市场营销', skill: '品牌推广与市场拓展' },
  { name: '吴桐', role: '客户成功总监', major: '客户服务', skill: '客户关系与成功管理' },
  { name: '刘姝含', role: '市场运营经理', major: '市场运营', skill: '市场运营与活动策划' },
]

const colors = ['bg-cyan-500', 'bg-navy-600', 'bg-gold-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-indigo-500']

export default function Team() {
  return (
    <section id="team" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-navy-600 mb-3">核心团队</h2>
        <p className="text-center text-slate-500 mb-12">跨学科复合型创业团队</p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {members.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 text-center border border-slate-100 hover:shadow-lg transition-all">
              <div className={`w-14 h-14 rounded-full ${colors[i]} mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg`}>
                {m.name[0]}
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{m.name}</h4>
              <p className="text-xs text-cyan-600 font-medium mb-1">{m.role}</p>
              <p className="text-xs text-slate-400">{m.major}</p>
              <p className="text-xs text-slate-500 mt-2">{m.skill}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
