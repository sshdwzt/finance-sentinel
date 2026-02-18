export const invoices = [
  {
    id: 'INV-2024-001',
    name: '增值税专用发票 — 办公设备采购',
    image: null,
    ocrResult: {
      invoiceCode: '3200232130',
      invoiceNo: '08867234',
      date: '2024-02-15',
      seller: '苏州科技办公设备有限公司',
      buyer: '南京创新科技有限公司',
      items: [
        { name: '联想ThinkPad笔记本电脑', qty: 5, unit: '台', price: 6800, amount: 34000 },
        { name: '戴尔27寸显示器', qty: 5, unit: '台', price: 2200, amount: 11000 },
      ],
      taxRate: '13%',
      tax: 5850,
      total: 50850,
    },
    nlpResult: {
      category: '固定资产-电子设备',
      suggestedSubject: '固定资产',
      debitAccount: '1601 固定资产',
      creditAccount: '2202 应付账款',
      taxAccount: '2221 应交税费-应交增值税(进项税额)',
      confidence: 0.96,
      tags: ['可抵扣', '固定资产', '电子设备'],
    },
    voucher: {
      entries: [
        { direction: '借', account: '固定资产-电子设备', amount: 45000 },
        { direction: '借', account: '应交税费-进项税额', amount: 5850 },
        { direction: '贷', account: '应付账款-苏州科技', amount: 50850 },
      ],
      summary: '采购办公电子设备，取得增值税专用发票',
    },
  },
  {
    id: 'INV-2024-002',
    name: '增值税普通发票 — 差旅费报销',
    image: null,
    ocrResult: {
      invoiceCode: '032002100211',
      invoiceNo: '45892013',
      date: '2024-02-18',
      seller: '南京金陵大酒店',
      buyer: '南京创新科技有限公司',
      items: [
        { name: '商务标准间住宿费', qty: 3, unit: '晚', price: 480, amount: 1440 },
      ],
      taxRate: '6%',
      tax: 86.4,
      total: 1526.4,
    },
    nlpResult: {
      category: '管理费用-差旅费',
      suggestedSubject: '管理费用',
      debitAccount: '6602 管理费用-差旅费',
      creditAccount: '1001 库存现金',
      taxAccount: null,
      confidence: 0.92,
      tags: ['费用报销', '差旅', '不可抵扣'],
    },
    voucher: {
      entries: [
        { direction: '借', account: '管理费用-差旅费', amount: 1526.4 },
        { direction: '贷', account: '库存现金', amount: 1526.4 },
      ],
      summary: '报销出差住宿费用，普通发票不可抵扣',
    },
  },
  {
    id: 'INV-2024-003',
    name: '增值税专用发票 — 原材料采购',
    image: null,
    ocrResult: {
      invoiceCode: '3200241130',
      invoiceNo: '12045678',
      date: '2024-02-20',
      seller: '上海华东化工材料有限公司',
      buyer: '南京创新科技有限公司',
      items: [
        { name: '工业级聚乙烯颗粒', qty: 2000, unit: 'kg', price: 12.5, amount: 25000 },
        { name: '高纯度丙烯酸树脂', qty: 500, unit: 'kg', price: 38, amount: 19000 },
      ],
      taxRate: '13%',
      tax: 5720,
      total: 49720,
    },
    nlpResult: {
      category: '原材料-化工材料',
      suggestedSubject: '原材料',
      debitAccount: '1403 原材料',
      creditAccount: '2202 应付账款',
      taxAccount: '2221 应交税费-应交增值税(进项税额)',
      confidence: 0.98,
      tags: ['可抵扣', '原材料', '生产用'],
    },
    voucher: {
      entries: [
        { direction: '借', account: '原材料-化工材料', amount: 44000 },
        { direction: '借', account: '应交税费-进项税额', amount: 5720 },
        { direction: '贷', account: '应付账款-上海华东', amount: 49720 },
      ],
      summary: '采购生产用化工原材料，取得增值税专用发票',
    },
  },
]

export const processingSteps = [
  { key: 'ocr', label: 'OCR识别', duration: 1200, icon: 'ScanLine' },
  { key: 'nlp', label: 'NLP分析', duration: 800, icon: 'Brain' },
  { key: 'rule', label: '规则匹配', duration: 300, icon: 'ShieldCheck' },
  { key: 'voucher', label: '生成凭证', duration: 500, icon: 'FileCheck' },
]
