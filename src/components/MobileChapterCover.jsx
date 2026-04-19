import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHAPTERS = [
  { id: 'hero', number: '01', title: 'HOME', sub: 'The Beginning' },
  { id: 'about', number: '02', title: 'DEVELOPER', sub: 'Origin Story' },
  { id: 'skills', number: '03', title: 'STATS', sub: 'Character Sheet' },
  { id: 'projects', number: '04', title: 'PROJECTS', sub: 'Things Built' },
  { id: 'opensource', number: '05', title: 'BEYOND', sub: 'Open Source' },
  { id: 'achievements', number: '06', title: 'BADGES', sub: 'Unlock Wall' },
  { id: 'github', number: '07', title: 'ACTIVITY', sub: 'Battle Record' },
  { id: 'contact', number: '08', title: 'CONTACT', sub: 'Final Chapter' },
]

export default function MobileChapterCover() {
  const [activeChapter, setActiveChapter] = useState(null)
  const [isMobile, setIsMobile] = useState(true)
  const [lastChapter, setLastChapter] = useState(-1)

  useEffect(() => {

    const onScroll = () => {

      const scrollY = window.scrollY
      let current = -1

      CHAPTERS.forEach((ch, i) => {
        const el = document.getElementById(ch.id)
        if (el) {
          const top = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollY >= top - 50 && scrollY < bottom - 50) {
            current = i
          }
        }
      })

      if (current !== -1 && current !== lastChapter) {
        setLastChapter(current)
        setActiveChapter(current)
        setTimeout(() => setActiveChapter(null), 1200)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [lastChapter])


  

  return (
    <AnimatePresence>
      {activeChapter !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99980] flex items-center justify-center pointer-events-none"
          style={{ background: 'rgba(13,13,15,0.85)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-3 px-8"
          >
            {/* Faded number */}
            <span
              className="font-manga text-white"
              style={{ fontSize: 120, opacity: 0.05, lineHeight: 1, position: 'absolute' }}
            >
              {CHAPTERS[activeChapter].number}
            </span>

            {/* Chapter label */}
            <div
              className="px-4 py-1.5"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
            >
              <span
                className="font-manga text-white"
                style={{ fontSize: 10, letterSpacing: '0.25em', opacity: 0.5 }}
              >
                CHAPTER {CHAPTERS[activeChapter].number}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-manga text-white text-center"
              style={{
                fontSize: 48,
                letterSpacing: '0.06em',
                WebkitTextStroke: '1px rgba(255,255,255,0.5)',
                textShadow: '3px 3px 0px rgba(0,0,0,0.5)',
                lineHeight: 1,
              }}
            >
              {CHAPTERS[activeChapter].title}
            </h2>

            {/* Sub */}
            <span
              className="font-display italic text-white"
              style={{ fontSize: 13, opacity: 0.3, letterSpacing: '0.04em' }}
            >
              — {CHAPTERS[activeChapter].sub}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
