import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHAPTERS = [
  { id: 'hero', label: 'CH.01', title: 'HERO' },
  { id: 'about', label: 'CH.02', title: 'DEVELOPER' },
  { id: 'skills', label: 'CH.03', title: 'STATS' },
  { id: 'projects', label: 'CH.04', title: 'BUILT' },
  { id: 'opensource', label: 'CH.05', title: 'BEYOND' },
  { id: 'contact', label: 'CH.06', title: 'TALK' },
]

export default function MangaProgress() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setVisible(scrollY > 100)

      // Detect active chapter
      let current = 0
      CHAPTERS.forEach((ch, i) => {
        const el = document.getElementById(ch.id)
        if (el && scrollY >= el.offsetTop - 200) {
          current = i
        }
      })
      setActiveChapter(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToChapter = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setExpanded(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[9990] flex flex-col items-end gap-2"
        >
          {CHAPTERS.map((ch, i) => {
            const isActive = activeChapter === i
            const isPast = i < activeChapter

            return (
              <motion.button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
                className="flex items-center gap-2 group"
                style={{ cursor: 'none' }}
                whileHover={{ x: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Chapter label — shows on hover */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: 'auto' }}
                      exit={{ opacity: 0, x: 10, width: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 whitespace-nowrap"
                        style={{
                          background: isActive ? '#0d0d0f' : '#f0ebe0',
                          border: '2px solid #0d0d0f',
                          boxShadow: isActive
                            ? '3px 3px 0px rgba(13,13,15,0.3)'
                            : '2px 2px 0px rgba(13,13,15,0.15)',
                        }}
                      >
                        <span
                          className="font-manga"
                          style={{
                            fontSize: 9,
                            letterSpacing: '0.15em',
                            color: isActive ? 'white' : 'rgba(13,13,15,0.4)',
                          }}
                        >
                          {ch.label}
                        </span>
                        <span
                          className="font-manga"
                          style={{
                            fontSize: 11,
                            letterSpacing: '0.1em',
                            color: isActive ? 'white' : '#0d0d0f',
                          }}
                        >
                          {ch.title}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dot indicator */}
                <motion.div
                  animate={{
                    width: isActive ? 24 : 8,
                    height: isActive ? 8 : 8,
                    background: isActive
                      ? '#0d0d0f'
                      : isPast
                      ? 'rgba(13,13,15,0.4)'
                      : 'rgba(13,13,15,0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    borderRadius: isActive ? 4 : '50%',
                    border: '1.5px solid #0d0d0f',
                    flexShrink: 0,
                  }}
                />
              </motion.button>
            )
          })}

          {/* VOL.01 label at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2"
          >
            <span
              className="font-manga"
              style={{
                fontSize: 8,
                letterSpacing: '0.2em',
                color: 'rgba(13,13,15,0.2)',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              VOL.01
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}