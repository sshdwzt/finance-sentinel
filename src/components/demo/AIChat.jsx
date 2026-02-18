import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { quickQuestions, qaDatabase, fallbackAnswer } from '../../data/chatbot'

function findAnswer(input) {
  const lower = input.toLowerCase()
  for (const qa of qaDatabase) {
    if (qa.keywords.some(kw => lower.includes(kw))) return qa.answer
  }
  return fallbackAnswer
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map(i => (
        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }} />
      ))}
    </div>
  )
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是财界哨兵AI助手，有什么可以帮您？', done: true }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, 50)
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, typing, scrollToBottom])
  useEffect(() => { if (open) inputRef.current?.focus() }, [open])

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', content: text.trim(), done: true }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    const answer = findAnswer(text)

    setTimeout(() => {
      setTyping(false)
      const aiMsg = { role: 'ai', content: '', done: false, fullContent: answer }
      setMessages(prev => [...prev, aiMsg])

      let idx = 0
      const typeTimer = setInterval(() => {
        idx++
        setMessages(prev => {
          const msgs = [...prev]
          const last = { ...msgs[msgs.length - 1] }
          last.content = answer.slice(0, idx)
          if (idx >= answer.length) last.done = true
          msgs[msgs.length - 1] = last
          return msgs
        })
        if (idx >= answer.length) clearInterval(typeTimer)
      }, 15)
    }, 800 + Math.random() * 500)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-medium">AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-navy-700 to-navy-600 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-navy-700" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-navy-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold">财界哨兵AI助手</p>
                  <p className="text-xs text-white/50">在线 · 随时为您服务</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'ai' ? (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-navy-700" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[280px] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-cyan-500 text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-700 rounded-tl-sm'
                  }`}>
                    {msg.content}
                    {!msg.done && <span className="inline-block w-0.5 h-4 bg-cyan-500 ml-0.5 animate-pulse" />}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-navy-700" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            <div className="px-4 py-2 border-t border-slate-100 flex-shrink-0">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {quickQuestions.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-xs font-medium hover:bg-cyan-100 transition-colors whitespace-nowrap">
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-slate-100 flex gap-2 flex-shrink-0">
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                placeholder="输入您的问题..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all" />
              <button type="submit" disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 disabled:opacity-40 transition-colors flex-shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
