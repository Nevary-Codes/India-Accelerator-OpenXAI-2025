'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, Send } from 'lucide-react'

interface AICommand {
  topic: string
  content: string
  timestamp: Date
  responseTime: number
}

export default function ArticleGenerator() {
  const [topic, setTopic] = useState('')
  const [article, setArticle] = useState('')
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [commandHistory, setCommandHistory] = useState<AICommand[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  // Update word and character counts whenever article changes
  useEffect(() => {
    setWordCount(article.split(/\s+/).filter(Boolean).length)
    setCharCount(article.length)
  }, [article])

  const processTopic = async (topic: string) => {
    setIsProcessing(true)
    setError('')
    setArticle('')
    const startTime = Date.now()

    try {
      const res = await fetch('/api/process-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })

      if (!res.ok || !res.body) throw new Error('Failed to generate article')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        if (value) setArticle(prev => prev + decoder.decode(value))
      }

      const endTime = Date.now()
      const responseTime = (endTime - startTime) / 1000

      const newCommand: AICommand = {
        topic,
        content: article,
        timestamp: new Date(),
        responseTime,
      }

      setCommandHistory(prev => [newCommand, ...prev.slice(0, 9)])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim() || isProcessing) return
    processTopic(topic.trim())
  }

  const handleExampleClick = (example: string) => {
    if (isProcessing) return
    setTopic(example)
    setTimeout(() => processTopic(example), 100)
  }

  const exampleTopics = [
    'Future of AI in Healthcare',
    'Space colonization by 2050',
    'Impact of climate change on agriculture',
    'The next big cryptocurrency',
    'AI-generated art revolution',
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      {/* Title */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">✍️ AI Article Generator</h1>
        <p className="text-gray-400">
          Enter a topic and let <span className="text-blue-400 font-semibold">Ollama</span> create magic ✨
        </p>
      </header>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
        <input
          ref={inputRef}
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Type your topic here..."
          className="px-4 py-3 rounded-xl text-black text-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-lg font-medium transition ${
            isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing && <Loader2 className="animate-spin w-5 h-5" />}
          {isProcessing ? 'Generating...' : 'Generate Article'}
        </button>
      </form>

      {/* Example Topics */}
      <div className="mt-4 flex flex-wrap gap-2 max-w-2xl">
        {exampleTopics.map((ex, i) => (
          <button
            key={i}
            onClick={() => handleExampleClick(ex)}
            className="px-3 py-1 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}

      {/* Article Output */}
      {article && (
        <div className="mt-8 w-full max-w-3xl bg-gray-800/40 rounded-2xl p-6 text-gray-200 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">📰 Generated Article</h2>
          <p className="whitespace-pre-wrap">{article}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-400 border-t pt-3">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
        </div>
      )}

      {/* Command History */}
      {commandHistory.length > 0 && (
        <div className="mt-8 w-full max-w-3xl bg-gray-800/40 rounded-2xl p-4 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Recent Topics</h3>
          <ul className="space-y-2">
            {commandHistory.map((cmd, i) => (
              <li key={i} className="text-xs text-gray-400 border-l-2 border-blue-500 pl-2">
                <div>{cmd.topic}</div>
                <div className="text-gray-500">{cmd.timestamp.toLocaleTimeString()} • {cmd.responseTime.toFixed(1)}s</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}