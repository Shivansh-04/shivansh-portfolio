import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

export default function ToBeContinued() {
  const linesRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Animate speed lines
      if (linesRef.current) {
        const lines = Array.from(linesRef.current.querySelectorAll('line'))
        if (lines.length > 0) {
          animate(lines, {
            strokeDashoffset: [1000, 0],
            ease: 'easeOutExpo',
            duration: 1000,
            delay: stagger(15, { start: 0 }),
          })
        }
      }

      // Animate text letters
      if (textRef.current) {
        const letters = Array.from(textRef.current.querySelectorAll('.tbc-letter'))
        if (letters.length > 0) {
          animate(letters, {
            scale: [1.5, 1],
            opacity: [0, 1],
            ease: 'easeOutElastic(1, .5)',
            duration: 600,
            delay: stagger(80, { start: 300 }),
          })
        }
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  const text = 'TO BE CONTINUED'

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        borderTop: '3px solid #0d0d0f',
        background: '#0d0d0f',
        minHeight: '280px',
      }}
    >
      {/* Speed lines SVG */}
      <div
        ref={linesRef}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 280"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * 360
            const rad = (angle * Math.PI) / 180
            const cx = 720
            const cy = 140
            const len = 1000
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(rad) * len}
                y2={cy + Math.sin(rad) * len}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            )
          })}
        </svg>
      </div>

      {/* Halftone dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Panel border */}
      <div
        className="absolute inset-3 pointer-events-none"
        style={{ border: '2px solid rgba(255,255,255,0.08)' }}
      />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span
          className="font-manga text-white opacity-20"
          style={{ fontSize: 10, letterSpacing: '0.25em' }}
        >
          VOL.01 · FIN
        </span>
        <span
          className="font-manga text-white opacity-20"
          style={{ fontSize: 10, letterSpacing: '0.25em' }}
        >
          END OF VOLUME 01
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full py-16 gap-6">

        {/* Chapter end label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <span
            className="font-manga text-white opacity-30"
            style={{ fontSize: 11, letterSpacing: '0.3em' }}
          >
            CHAPTER 06 · END
          </span>
          <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.2)' }} />
        </motion.div>

        {/* TO BE CONTINUED — letter by letter */}
        <div
          ref={textRef}
          className="flex items-center gap-1 flex-wrap justify-center px-8"
        >
          {text.split('').map((char, i) => (
            <span
              key={i}
              className="tbc-letter font-manga text-white inline-block"
              style={{
                fontSize: 'clamp(32px, 6vw, 72px)',
                letterSpacing: char === ' ' ? '0.5em' : '0.04em',
                opacity: 0,
                WebkitTextStroke: '1px rgba(255,255,255,0.8)',
                textShadow: '3px 3px 0px rgba(0,0,0,0.5)',
                lineHeight: 1,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Dramatic ellipsis */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex gap-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="font-manga text-white"
              style={{ fontSize: 'clamp(24px, 4vw, 48px)', opacity: 0.4 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            >
              ▸
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="font-display italic text-white text-center"
          style={{
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            opacity: 0.25,
            letterSpacing: '0.04em',
            maxWidth: 400,
          }}
        >
          The Developer Chronicles will return.
        </motion.p>
      </div>

      {/* Bottom right — next volume teaser */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-4 right-6 flex flex-col items-end gap-1"
      >
        <span
          className="font-manga text-white opacity-15"
          style={{ fontSize: 9, letterSpacing: '0.2em' }}
        >
          NEXT: V3 · 3D EDITION
        </span>
        <span
          className="font-manga text-white opacity-10"
          style={{ fontSize: 9, letterSpacing: '0.2em' }}
        >
          COMING SOON
        </span>
      </motion.div>
    </div>
  )
}