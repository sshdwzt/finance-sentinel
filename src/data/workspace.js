export const workloadSplit = [
  { name: 'AI自动处理', value: 70, color: '#06B6D4' },
  { name: '人工审核', value: 30, color: '#1E3A8A' },
]

export const taskQueue = [
  { id: 'T-001', title: '2月增值税专票批量录入(32张)', status: 'done', handler: 'AI', time: '08:30', confidence: 0.97 },
  { id: 'T-002', title: '差旅费报销凭证生成(8笔)', status: 'done', handler: 'AI', time: '09:15', confidence: 0.94 },
  { id: 'T-003', title: '固定资产折旧计提', status: 'done', handler: 'AI', time: '09:45', confidence: 0.99 },
  { id: 'T-004', title: '关联交易定价审核', status: 'review', handler: '张会计', time: '10:00', confidence: 0.78 },
  { id: 'T-005', title: '研发费用加计扣除归集', status: 'review', handler: '李主管', time: '10:30', confidence: 0.82 },
  { id: 'T-006', title: '跨期费用调整分录', status: 'pending', handler: '待分配', time: '--', confidence: 0.65 },
  { id: 'T-007', title: '税务优惠政策适用性判断', status: 'pending', handler: '待分配', time: '--', confidence: 0.71 },
]

export const reviewPanel = {
  taskId: 'T-004',
  title: '关联交易定价审核',
  aiVoucher: {
    entries: [
      { direction: '借', account: '主营业务成本-关联采购', amount: 180000 },
      { direction: '贷', account: '应付账款-关联方A公司', amount: 180000 },
    ],
    aiNote: 'AI提示：该交易价格较市场价高15%，建议补充独立交易原则说明文档',
  },
  accountantNote: '已核实转让定价报告，价格差异在合理范围内，同意入账。建议下月补充同期资料备查。',
  status: 'approved',
}
