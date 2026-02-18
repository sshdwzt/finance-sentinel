import { useEffect, useState } from 'react'

export default function GaugeChart({ score = 85, size = 180, color = '#10B981' }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    let start = 0
    const step = score / (1000 / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= score) { setAnimatedScore(score); clearInterval(timer) }
      else setAnimatedScore(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [score])

  const level = score >= 90 ? '优秀' : score >= 80 ? '良好' : score >= 60 ? '一般' : '较差'

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-kpi text-3xl" style={{ color }}>{animatedScore}</span>
        <span className="text-sm text-slate-500">{level}</span>
      </div>
    </div>
  )
}
