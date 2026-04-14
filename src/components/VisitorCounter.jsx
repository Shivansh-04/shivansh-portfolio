import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    // Using countapi.xyz — free, no signup
    const namespace = 'iamshivansh'
    const key = 'portfolio-visitors'

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => setCount(data.value))
      .catch(() => setCount(null))
  }, [])

  if (count === null) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4.5, duration: 0.5 }}
      className="fixed bottom-0 left-6 z-[9993]"
      style={{
        background: '#0d0d0f',
        border: '2px solid rgba(255,255,255,0.1)',
        boxShadow: '3px 3px 0px rgba(255,255,255,0.05)',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
        style={{ background: '#4ade80', flexShrink: 0 }}
      />
      <span
        className="font-manga text-white"
        style={{ fontSize: 10, letterSpacing: '0.2em', opacity: 0.6 }}
      >
        READERS: {count.toLocaleString()}
      </span>
    </motion.div>
  )
}