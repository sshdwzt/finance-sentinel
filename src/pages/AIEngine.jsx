import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Upload, FileImage, ScanLine } from 'lucide-react'
import StepFlow from '../components/demo/StepFlow'
import { invoices, processingSteps } from '../data/invoices'

const sampleThumbs = [
  { id: 'INV-2024-001', label: '专票·办公设备', color: 'from-cyan-500 to-blue-500' },
  { id: 'INV-2024-002', label: '普票·差旅费', color: 'from-amber-500 to-orange-500' },
  { id: 'INV-2024-003', label: '专票·原材料', color: 'from-emerald-500 to-green-500' },
]

export default function AIEngine() {
  const [selectedId, setSelectedId] = useState(invoices[0].id)
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [running, setRunning] = useState(false)
  const [showResult, setShowResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [uploadedName, setUploadedName] = useState(null)
  const fileInputRef = useRef(null)

  const invoice = invoices.find(inv => inv.id === selectedId)

  const reset = useCallback(() => {
    setCurrentStep(-1)
    setCompletedSteps([])
    setRunning(false)
    setShowResult(null)
    setScanning(false)
    setUploadedName(null)
  }, [])

  const runProcess = useCallback(() => {
    reset()
    setRunning(true)
    let step = 0
    const runStep = () => {
      if (step >= processingSteps.length) {
        setRunning(false)
        setShowResult('voucher')
        return
      }
      setCurrentStep(step)
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, step])
        if (step === 0) setShowResult('ocr')
        else if (step === 1) setShowResult('nlp')
        else if (step === 2) setShowResult('rule')
        else setShowResult('voucher')
        step++
        runStep()
      }, processingSteps[step].duration)
    }
    runStep()
  }, [reset])

  const handleUpload = useCallback((fileName) => {
    reset()
    setUploadedName(fileName || '已上传发票.pdf')
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      runProcess()
    }, 2000)
  }, [reset, runProcess])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer?.files?.[0]
    handleUpload(file?.name)
  }, [handleUpload])

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true) }
  const onDragLeave = () => setDragOver(false)

  const selectSample = (id) => {
    setSelectedId(id)
    reset()
    setUploadedName(sampleThumbs.find(s => s.id === id)?.label)
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setRunning(true)
      let step = 0
      const runStep = () => {
        if (step >= processingSteps.length) {
          setRunning(false)
          setShowResult('voucher')
          return
        }
        setCurrentStep(step)
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, step])
          if (step === 0) setShowResult('ocr')
          else if (step === 1) setShowResult('nlp')
          else if (step === 2) setShowResult('rule')
          else setShowResult('voucher')
          step++
          runStep()
        }, processingSteps[step].duration)
      }
      runStep()
    }, 1800)
  }

  useEffect(() => { reset() }, [selectedId, reset])

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div
          onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
          onClick={() => !scanning && !running && fileInputRef.current?.click()}
          className={`lg:col-span-2 relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all overflow-hidden ${
            dragOver ? 'border-cyan-400 bg-cyan-50' : scanning ? 'border-cyan-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/30'
          }`}>
          <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden"
            onChange={(e) => handleUpload(e.target.files?.[0]?.name)} />

          {/* Scan line animation */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                initial={{ top: 0 }} animate={{ top: '100%' }} exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10"
                style={{ boxShadow: '0 0 20px 4px rgba(6,182,212,0.4)' }} />
            )}
          </AnimatePresence>

          {scanning ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
              <ScanLine className="w-12 h-12 text-cyan-500 mx-auto mb-3 animate-pulse" />
              <p className="text-cyan-600 font-medium">OCR扫描识别中...</p>
              <p className="text-xs text-slate-400 mt-1">{uploadedName}</p>
            </motion.div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-600 font-medium mb-1">拖拽发票到此处上传</p>
              <p className="text-xs text-slate-400">或点击选择文件 · 支持 JPG / PNG / PDF</p>
              {uploadedName && (
                <p className="text-xs text-emerald-500 mt-2">✓ 已选择: {uploadedName}</p>
              )}
            </>
          )}
        </div>

        {/* Sample invoices */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-600 mb-2">示例发票（点击快速体验）</p>
          {sampleThumbs.map(s => (
            <motion.button key={s.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => selectSample(s.id)}
              disabled={running || scanning}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                selectedId === s.id ? 'border-cyan-400 bg-cyan-50' : 'border-slate-200 bg-white hover:border-slate-300'
              } disabled:opacity-50`}>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                <FileImage className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{s.label}</p>
                <p className="text-xs text-slate-400">{s.id}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
          {invoices.map(inv => <option key={inv.id} value={inv.id}>{inv.name}</option>)}
        </select>
        <button onClick={runProcess} disabled={running || scanning}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 disabled:opacity-50 transition-all">
          <Play className="w-4 h-4" /> {running ? '处理中...' : '开始AI处理'}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">
          <RotateCcw className="w-4 h-4" /> 重置
        </button>
      </div>

      {/* Step flow */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 overflow-x-auto">
        <h3 className="font-bold text-slate-800 mb-4">AI处理流程</h3>
        <StepFlow steps={processingSteps} currentStep={currentStep} completedSteps={completedSteps} />
        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
            animate={{ width: `${(completedSteps.length / processingSteps.length) * 100}%` }}
            transition={{ duration: 0.3 }} />
        </div>
      </div>

      {/* Result panels */}
      <div className="grid lg:grid-cols-2 gap-6">
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">OCR识别结果</h3>
            <div className="space-y-2 text-sm">
              {Object.entries({
                '发票代码': invoice.ocrResult.invoiceCode,
                '发票号码': invoice.ocrResult.invoiceNo,
                '开票日期': invoice.ocrResult.date,
                '销方名称': invoice.ocrResult.seller,
                '购方名称': invoice.ocrResult.buyer,
                '税率': invoice.ocrResult.taxRate,
                '税额': `¥${invoice.ocrResult.tax.toLocaleString()}`,
                '价税合计': `¥${invoice.ocrResult.total.toLocaleString()}`,
              }).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">{k}</span>
                  <span className="text-slate-800 font-medium">{v}</span>
                </div>
              ))}
              <div className="mt-3">
                <p className="text-slate-500 mb-2">明细项目</p>
                {invoice.ocrResult.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-1 text-xs text-slate-600">
                    <span>{item.name} × {item.qty}{item.unit}</span>
                    <span>¥{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {showResult && ['nlp', 'rule', 'voucher'].includes(showResult) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">
              {showResult === 'voucher' ? '生成凭证' : 'NLP分析 & 科目推荐'}
            </h3>

            {showResult !== 'voucher' ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">分类</span>
                  <span className="text-slate-800">{invoice.nlpResult.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">借方科目</span>
                  <span className="text-cyan-600 font-medium">{invoice.nlpResult.debitAccount}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">贷方科目</span>
                  <span className="text-cyan-600 font-medium">{invoice.nlpResult.creditAccount}</span>
                </div>
                {invoice.nlpResult.taxAccount && (
                  <div className="flex justify-between py-1.5 border-b border-slate-50">
                    <span className="text-slate-500">税金科目</span>
                    <span className="text-cyan-600 font-medium">{invoice.nlpResult.taxAccount}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">置信度</span>
                  <span className="font-kpi text-emerald-600">{(invoice.nlpResult.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {invoice.nlpResult.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded bg-cyan-50 text-cyan-600 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-500 mb-3">{invoice.voucher.summary}</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 text-slate-500 font-medium">方向</th>
                      <th className="text-left py-2 text-slate-500 font-medium">科目</th>
                      <th className="text-right py-2 text-slate-500 font-medium">金额</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.voucher.entries.map((e, i) => (
                      <tr key={i} className="border-b border-slate-50">
                        <td className={`py-2 font-medium ${e.direction === '借' ? 'text-cyan-600' : 'text-amber-600'}`}>{e.direction}</td>
                        <td className="py-2 text-slate-700">{e.account}</td>
                        <td className="py-2 text-right font-kpi text-slate-800">¥{e.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
