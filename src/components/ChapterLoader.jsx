import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHAPTERS = [
  { number: '01', title: 'THE DEVELOPER', sub: 'Origin Story' },
//   { number: '02', title: 'CHARACTER STATS', sub: 'Skills & Arsenal' },
//   { number: '03', title: 'THINGS BUILT', sub: 'Project Arc' },
//   { number: '04', title: 'BEYOND CLASS', sub: 'Open Source' },
//   { number: '05', title: 'Github Stats', sub: 'Open Source' },
//   { number: '06', title: 'LET\'S TALK', sub: 'Final Chapter' },
]

export default function ChapterLoader({ onComplete }) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [phase, setPhase] = useState('enter') // enter | hold | exit

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < CHAPTERS.length; i++) {
        setCurrentChapter(i)
        setPhase('enter')
        await delay(300)
        setPhase('hold')
        await delay(400)
        setPhase('exit')
        await delay(250)
      }
      onComplete()
    }
    sequence()
  }, [])

  const ch = CHAPTERS[currentChapter]

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[999990] overflow-hidden"
      style={{ background: '#0d0d0f' }}
    >
      {/* Speed lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * 360
          const rad = (angle * Math.PI) / 180
          return (
            <line
              key={i}
              x1={720} y1={450}
              x2={720 + Math.cos(rad) * 1000}
              y2={450 + Math.sin(rad) * 1000}
              stroke="white"
              strokeWidth="1"
            />
          )
        })}
      </svg>

      {/* Panel border */}
      <div
        className="absolute inset-4"
        style={{ border: '2px solid rgba(255,255,255,0.08)' }}
      />

      {/* Chapter content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={phase === 'enter' ? { y: 40, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Chapter number */}
            <span
              className="font-manga text-white"
              style={{
                fontSize: 'clamp(80px, 15vw, 160px)',
                opacity: 0.06,
                lineHeight: 1,
                position: 'absolute',
              }}
            >
              {ch.number}
            </span>

            {/* Label */}
            <div
              className="px-4 py-1.5"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
            >
              <span
                className="font-manga text-white"
                style={{ fontSize: 11, letterSpacing: '0.25em', opacity: 0.5 }}
              >
                CHAPTER {ch.number}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-manga text-white text-center"
              style={{
                fontSize: 'clamp(28px, 5vw, 56px)',
                letterSpacing: '0.06em',
                WebkitTextStroke: '1px rgba(255,255,255,0.6)',
                textShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                lineHeight: 1.1,
              }}
            >
              {ch.title}
            </h2>

            {/* Subtitle */}
            <span
              className="font-display italic text-white"
              style={{ fontSize: 14, opacity: 0.3, letterSpacing: '0.04em' }}
            >
              — {ch.sub}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {CHAPTERS.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === currentChapter ? 24 : 8,
              background: i <= currentChapter
                ? 'rgba(255,255,255,0.8)'
                : 'rgba(255,255,255,0.15)',
            }}
            transition={{ duration: 0.2 }}
            style={{
              height: 3,
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      {/* VOL.01 label */}
      <div className="absolute top-8 left-8">
        <span
          className="font-manga text-white opacity-20"
          style={{ fontSize: 10, letterSpacing: '0.25em' }}
        >
          VOL.01 · LOADING
        </span>
      </div>
    </motion.div>
  )
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}