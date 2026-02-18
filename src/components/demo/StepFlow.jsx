import { motion } from 'framer-motion'
import { ScanLine, Brain, ShieldCheck, FileCheck, Loader2 } from 'lucide-react'

const iconMap = { ScanLine, Brain, ShieldCheck, FileCheck }

export default function StepFlow({ steps, currentStep, completedSteps }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => {
        const Icon = iconMap[step.icon] || ScanLine
        const isCompleted = completedSteps.includes(i)
        const isCurrent = currentStep === i
        const isPending = !isCompleted && !isCurrent

        return (
          <div key={step.key} className="flex items-center gap-2">
            <motion.div
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isCompleted ? 'bg-emerald-100 text-emerald-700' :
                isCurrent ? 'bg-cyan-100 text-cyan-700 shadow-md shadow-cyan-200/50' :
                'bg-slate-100 text-slate-400'
              }`}>
              {isCurrent ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
              {step.label}
              {isCompleted && <span className="text-xs">✓</span>}
            </motion.div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${isCompleted ? 'bg-emerald-300' : 'bg-slate-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
