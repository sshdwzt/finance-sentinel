// 财税健康雷达图（5维度）
export const healthRadar = [
  { dimension: '税务合规', score: 88, fullMark: 100 },
  { dimension: '发票管理', score: 75, fullMark: 100 },
  { dimension: '成本控制', score: 82, fullMark: 100 },
  { dimension: '现金流', score: 90, fullMark: 100 },
  { dimension: '风险防控', score: 85, fullMark: 100 },
]

// 行业对标
export const industryBenchmark = [
  { metric: '税负率', self: 3.82, industry: 4.5 },
  { metric: '费用率', self: 12.5, industry: 15.2 },
  { metric: '利润率', self: 18.3, industry: 14.8 },
  { metric: '周转天数', self: 45, industry: 62 },
  { metric: '合规评分', self: 88, industry: 76 },
]

// 信贷赋能报告
export const creditReport = {
  creditScore: 'A+',
  maxLoan: '500万',
  rate: '3.85%',
  highlights: [
    '连续24个月纳税信用A级',
    '增值税申报零差错',
    '财务报表数据完整度98%',
    '无税务行政处罚记录',
  ],
}

// 税务优化建议
export const taxSuggestions = [
  {
    id: 1,
    title: '研发费用加计扣除',
    saving: '¥23.4万/年',
    desc: '符合高新技术企业条件，研发费用可享受100%加计扣除',
    priority: 'high',
  },
  {
    id: 2,
    title: '小微企业所得税优惠',
    saving: '¥8.6万/年',
    desc: '年应纳税所得额不超过300万部分，实际税负5%',
    priority: 'high',
  },
  {
    id: 3,
    title: '固定资产加速折旧',
    saving: '¥5.2万/年',
    desc: '新购设备单价≤500万可一次性税前扣除',
    priority: 'medium',
  },
  {
    id: 4,
    title: '增值税留抵退税',
    saving: '¥12.8万',
    desc: '增量留抵税额符合退税条件，建议申请退还',
    priority: 'medium',
  },
]
