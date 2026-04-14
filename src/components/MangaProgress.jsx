import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHAPTERS = [
  { id: 'hero', label: 'CH.01', title: 'HERO', sub: 'Opening Spread' },
  { id: 'about', label: 'CH.02', title: 'DEVELOPER', sub: 'Origin Story' },
  { id: 'skills', label: 'CH.03', title: 'STATS', sub: 'Ability Cards' },
  { id: 'projects', label: 'CH.04', title: 'PROJECTS', sub: 'Built Things' },
  { id: 'opensource', label: 'CH.05', title: 'BEYOND', sub: 'Achievements' },
  { id: 'github', label: 'CH.06', title: 'ACTIVITY', sub: 'Battle Record' },
  { id: 'contact', label: 'CH.07', title: 'CONTACT', sub: 'Final Chapter' },
]

export default function MangaProgress() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setVisible(scrollY > window.innerHeight * 0.35)

      let current = 0
      CHAPTERS.forEach((chapter, index) => {
        const el = document.getElementById(chapter.id)
        if (el && scrollY >= el.offsetTop - 220) current = index
      })
      setActiveChapter(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToChapter = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setExpanded(false)
  }

  const activeMeta = CHAPTERS[activeChapter]

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 32 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed right-4 top-1/2 z-[9991] hidden -translate-y-1/2 xl:flex"
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          <div
            className="flex items-stretch"
            style={{
              border: '2.5px solid #0d0d0f',
              background: '#f0ebe0',
              boxShadow: '5px 5px 0px rgba(13,13,15,0.18)',
            }}
          >
            <div
              className="flex flex-col items-center justify-between px-3 py-4"
              style={{ borderRight: '2.5px solid #0d0d0f', background: '#0d0d0f' }}
            >
              <span
                className="font-manga text-white"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  opacity: 0.75,
                }}
              >
                VOLUME INDEX
              </span>
              <span
                className="font-manga text-white"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  opacity: 0.25,
                }}
              >
                VOL.01
              </span>
            </div>

            <div className="flex flex-col p-3 gap-2">
              <div
                className="px-3 py-2"
                style={{
                  border: '1.5px solid #0d0d0f',
                  background: activeChapter % 2 === 0 ? '#f8f4ec' : 'white',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-manga text-[#0d0d0f]"
                    style={{ fontSize: 10, letterSpacing: '0.18em', opacity: 0.45 }}
                  >
                    {activeMeta.label}
                  </span>
                  <span
                    className="font-manga text-[#0d0d0f]"
                    style={{ fontSize: 9, letterSpacing: '0.18em', opacity: 0.25 }}
                  >
                    ACTIVE
                  </span>
                </div>
                <div className="mt-1">
                  <span
                    className="font-manga text-[#0d0d0f] block"
                    style={{ fontSize: 15, letterSpacing: '0.08em' }}
                  >
                    {activeMeta.title}
                  </span>
                  <span
                    className="font-body block"
                    style={{ fontSize: 11, color: 'rgba(13,13,15,0.5)', fontStyle: 'italic' }}
                  >
                    {activeMeta.sub}
                  </span>
                </div>
              </div>

              {CHAPTERS.map((chapter, index) => {
                const isActive = index === activeChapter
                const isPast = index < activeChapter

                return (
                  <motion.button
                    key={chapter.id}
                    onClick={() => scrollToChapter(chapter.id)}
                    className="flex items-center gap-3 text-left"
                    style={{ cursor: 'none' }}
                    whileHover={{ x: -4 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  >
                    <motion.div
                      animate={{
                        width: isActive ? 30 : 12,
                        background: isActive
                          ? '#0d0d0f'
                          : isPast
                          ? 'rgba(13,13,15,0.35)'
                          : 'rgba(13,13,15,0.12)',
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      style={{
                        height: 12,
                        borderRadius: isActive ? 4 : 999,
                        border: '1.5px solid #0d0d0f',
                        flexShrink: 0,
                      }}
                    />

                    <AnimatePresence mode="wait">
                      {expanded ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 180 }}
                          exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="flex items-center justify-between px-3 py-2 whitespace-nowrap"
                            style={{
                              border: '1.5px solid #0d0d0f',
                              background: isActive ? '#0d0d0f' : 'transparent',
                              color: isActive ? 'white' : '#0d0d0f',
                            }}
                          >
                            <div className="flex flex-col">
                              <span
                                className="font-manga"
                                style={{
                                  fontSize: 9,
                                  letterSpacing: '0.18em',
                                  opacity: isActive ? 0.5 : 0.35,
                                }}
                              >
                                {chapter.label}
                              </span>
                              <span
                                className="font-manga"
                                style={{ fontSize: 12, letterSpacing: '0.08em' }}
                              >
                                {chapter.title}
                              </span>
                            </div>
                            <span
                              className="font-body"
                              style={{
                                fontSize: 10,
                                opacity: isActive ? 0.45 : 0.35,
                                fontStyle: 'italic',
                              }}
                            >
                              {chapter.sub}
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-manga"
                          style={{
                            fontSize: 10,
                            letterSpacing: '0.16em',
                            color: isActive ? '#0d0d0f' : 'rgba(13,13,15,0.35)',
                          }}
                        >
                          {chapter.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
