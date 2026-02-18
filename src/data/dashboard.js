// 税务健康分
export const healthScore = { score: 85, level: '良好', color: '#10B981' }

// KPI 卡片
export const kpiCards = [
  { label: '本月营收', value: '¥128.6万', change: '+12.3%', up: true },
  { label: '综合税负率', value: '3.82%', change: '-0.15%', up: false },
  { label: '发票异常', value: '3笔', change: '+2笔', up: true, warn: true },
  { label: '待处理任务', value: '7项', change: '-3项', up: false },
]

// 风险预警列表
export const riskAlerts = [
  {
    id: 1,
    level: 'high',
    title: '进项发票集中作废预警',
    desc: '近30天内作废发票12张，金额合计¥86,400，超过行业均值3倍',
    what: '本月作废发票数量和金额异常偏高',
    why: '集中作废可能触发税务局"虚开发票"风控模型',
    how: '建议立即核查作废原因，保留完整业务凭证链',
    impact: '若被税务稽查立案，可能面临补税+0.5‰/天滞纳金',
    time: '2分钟前',
  },
  {
    id: 2,
    level: 'medium',
    title: '增值税税负率偏低提醒',
    desc: '当前增值税税负率1.2%，低于行业均值2.8%',
    what: '增值税实际税负率显著低于同行业平均水平',
    why: '税负率持续偏低是税务局重点监控指标之一',
    how: '检查进项抵扣是否合规，评估是否存在提前认证情况',
    impact: '可能被列入税务异常名单，触发纳税评估',
    time: '15分钟前',
  },
  {
    id: 3,
    level: 'low',
    title: '企业所得税季度预缴提醒',
    desc: '距Q1预缴申报截止还有12天，预估应缴¥45,200',
    what: '第一季度企业所得税预缴申报即将到期',
    why: '逾期申报将产生滞纳金并影响纳税信用等级',
    how: '系统已自动生成预缴计算表，请确认后提交',
    impact: '按时申报可维持A级纳税信用评级',
    time: '1小时前',
  },
]

// 营收趋势（近12月）
export const revenueTrend = [
  { month: '3月', revenue: 98, tax: 3.7 },
  { month: '4月', revenue: 105, tax: 3.9 },
  { month: '5月', revenue: 112, tax: 4.1 },
  { month: '6月', revenue: 95, tax: 3.5 },
  { month: '7月', revenue: 108, tax: 3.8 },
  { month: '8月', revenue: 115, tax: 4.0 },
  { month: '9月', revenue: 120, tax: 3.9 },
  { month: '10月', revenue: 110, tax: 3.6 },
  { month: '11月', revenue: 118, tax: 3.8 },
  { month: '12月', revenue: 125, tax: 4.2 },
  { month: '1月', revenue: 122, tax: 3.9 },
  { month: '2月', revenue: 128.6, tax: 3.82 },
]
