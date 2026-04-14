import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HiringMode() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('mode') === 'recruiter') {
      setActive(true)
    }
  }, [])

  if (!active) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[9996] flex items-center justify-between px-6 py-2"
        style={{
          background: '#0d0d0f',
          borderBottom: '2px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full animate-pulse-dot"
            style={{ background: '#4ade80' }}
          />
          <span
            className="font-manga text-white"
            style={{ fontSize: 10, letterSpacing: '0.2em', opacity: 0.7 }}
          >
            RECRUITER MODE ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: 'STACK', value: 'MERN' },
            { label: 'STATUS', value: 'OPEN TO WORK' },
            { label: 'LOCATION', value: 'GHAZIABAD, IN' },
            { label: 'TYPE', value: 'INTERN / FREELANCE' },
          ].map((item, i) => (
            <div key={i} className="hidden md:flex items-center gap-2">
              <span
                className="font-manga text-white opacity-30"
                style={{ fontSize: 9, letterSpacing: '0.15em' }}
              >
                {item.label}:
              </span>
              <span
                className="font-manga text-white"
                style={{ fontSize: 10, letterSpacing: '0.12em' }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <a
          href="/shivansh-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-manga text-[#0d0d0f] px-4 py-1.5"
          style={{
            background: 'white',
            fontSize: 10,
            letterSpacing: '0.15em',
            border: '1.5px solid white',
            cursor: 'none',
          }}
        >
          DOWNLOAD CV
        </a>
      </motion.div>
    </AnimatePresence>
  )
}