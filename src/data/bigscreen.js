export const coreMetrics = [
  { label: '今日处理发票', value: 347, suffix: '张', change: '+23%' },
  { label: '累计风控扫描', value: 12860, suffix: '次', change: '+156' },
  { label: '本月节税金额', value: 49.8, suffix: '万', change: '+18.5%' },
  { label: 'AI处理准确率', value: 98.2, suffix: '%', change: '+0.3%' },
]

export const riskTrend = [
  { time: '00:00', high: 2, medium: 5, low: 12 },
  { time: '04:00', high: 1, medium: 3, low: 8 },
  { time: '08:00', high: 3, medium: 8, low: 15 },
  { time: '12:00', high: 5, medium: 12, low: 22 },
  { time: '16:00', high: 4, medium: 10, low: 18 },
  { time: '20:00', high: 3, medium: 7, low: 14 },
  { time: '24:00', high: 2, medium: 6, low: 11 },
]

export const regionData = [
  { name: '华东', value: 4520, rate: '3.2%' },
  { name: '华南', value: 3280, rate: '4.1%' },
  { name: '华北', value: 2960, rate: '3.8%' },
  { name: '西南', value: 1840, rate: '5.2%' },
  { name: '华中', value: 2100, rate: '4.5%' },
  { name: '西北', value: 960, rate: '6.1%' },
  { name: '东北', value: 1120, rate: '5.8%' },
]

export const liveAlerts = [
  { id: 1, time: '14:32:15', type: 'high', msg: '深圳XX科技有限公司 — 连续3月进项税额异常增长 +340%' },
  { id: 2, time: '14:28:03', type: 'medium', msg: '杭州XX贸易有限公司 — 增值税税负率降至0.8%，低于预警线' },
  { id: 3, time: '14:25:41', type: 'low', msg: '北京XX咨询有限公司 — Q1企业所得税预缴申报提醒（剩余12天）' },
  { id: 4, time: '14:20:17', type: 'high', msg: '上海XX实业集团 — 检测到大额关联交易，转让定价风险' },
  { id: 5, time: '14:15:09', type: 'medium', msg: '广州XX制造有限公司 — 存货周转天数超行业均值2.1倍' },
  { id: 6, time: '14:10:33', type: 'low', msg: '成都XX软件有限公司 — 研发费用归集建议优化（可增加加计扣除¥18万）' },
  { id: 7, time: '14:05:22', type: 'medium', msg: '武汉XX电子商务 — 个税代扣代缴差异预警' },
  { id: 8, time: '14:01:08', type: 'high', msg: '南京XX建设工程 — 发票认证期限即将届满（3张，合计¥52万）' },
]

export const taskDistribution = [
  { name: 'AI自动完成', value: 68, color: '#06B6D4' },
  { name: '人工审核中', value: 18, color: '#F59E0B' },
  { name: '待处理队列', value: 14, color: '#64748B' },
]

export const monthlyProcessing = [
  { month: '9月', invoices: 2800, vouchers: 2650, alerts: 45 },
  { month: '10月', invoices: 3100, vouchers: 2980, alerts: 38 },
  { month: '11月', invoices: 3400, vouchers: 3250, alerts: 52 },
  { month: '12月', invoices: 3200, vouchers: 3100, alerts: 41 },
  { month: '1月', invoices: 3600, vouchers: 3480, alerts: 35 },
  { month: '2月', invoices: 3470, vouchers: 3350, alerts: 28 },
]
