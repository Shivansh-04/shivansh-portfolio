import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLOT_TWISTS = [
  "PLOT TWIST: He solved 200+ problems AND plans spiritual pilgrimages to Braj Dham.",
  "PLOT TWIST: The portfolio you're reading was built section by section from scratch from pen and paper to site.",
  "PLOT TWIST: He drinks chai, not coffee. Every. Single. Day.",
  "PLOT TWIST: The manga character? That's actually him. Bucket hat and all.",
  "PLOT TWIST: He's been awake since 2am debugging this portfolio.",
  "PLOT TWIST: GSoC 2026 arc has already begun. The grind is real.",
]

export default function PlotTwist() {
  const [triggered, setTriggered] = useState(false)
  const [twistIndex, setTwistIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  const trigger = () => {
    const next = Math.floor(Math.random() * PLOT_TWISTS.length)
    setTwistIndex(next)
    setTriggered(true)
    setVisible(true)
    setTimeout(() => setVisible(false), 4000)
  }

  return (
    <>
      {/* Hidden button — subtle, easy to miss */}
      <motion.button
        onClick={trigger}
        className="fixed bottom-16 right-6 z-[9993] font-manga"
        style={{
          background: 'transparent',
          border: '1.5px solid rgba(13,13,15,0.15)',
          padding: '6px 12px',
          fontSize: 9,
          letterSpacing: '0.2em',
          color: 'rgba(13,13,15,0.25)',
          cursor: 'none',
          boxShadow: '2px 2px 0px rgba(13,13,15,0.06)',
        }}
        whileHover={{
          color: '#0d0d0f',
          borderColor: '#0d0d0f',
          boxShadow: '3px 3px 0px #0d0d0f',
        }}
        transition={{ duration: 0.15 }}
      >
        PLOT TWIST?
      </motion.button>

      {/* Full screen flash + reveal */}
      <AnimatePresence>
        {visible && (
          <>
            {/* White flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, times: [0, 0.3, 1] }}
              className="fixed inset-0 z-[99990] pointer-events-none"
              style={{ background: '#f0ebe0' }}
            />

            {/* Speed lines burst */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="fixed inset-0 z-[99989] pointer-events-none flex items-center justify-center"
            >
              <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i / 24) * 360
                  const rad = (angle * Math.PI) / 180
                  return (
                    <line
                      key={i}
                      x1={720} y1={450}
                      x2={720 + Math.cos(rad) * 900}
                      y2={450 + Math.sin(rad) * 900}
                      stroke="#0d0d0f"
                      strokeWidth={i % 3 === 0 ? '3' : '1'}
                    />
                  )
                })}
              </svg>
            </motion.div>

            {/* Plot twist card */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
              className="fixed inset-0 z-[99991] flex items-center justify-center pointer-events-none px-8"
            >
              <div
                style={{
                  background: '#0d0d0f',
                  border: '4px solid #f0ebe0',
                  boxShadow: '8px 8px 0px rgba(240,235,224,0.2)',
                  padding: '40px 48px',
                  maxWidth: 600,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {/* Top label */}
                <div
                  style={{
                    position: 'absolute',
                    top: -16,
                    left: 24,
                    background: '#f0ebe0',
                    border: '2px solid #0d0d0f',
                    padding: '2px 12px',
                  }}
                >
                  <span className="font-manga text-[#0d0d0f]" style={{ fontSize: 11, letterSpacing: '0.2em' }}>
                    !! PLOT TWIST !!
                  </span>
                </div>

                {/* Twist text */}
                <p
                  className="font-manga text-white text-center"
                  style={{
                    fontSize: 'clamp(18px, 3vw, 28px)',
                    lineHeight: 1.4,
                    letterSpacing: '0.04em',
                    WebkitTextStroke: '0.5px rgba(255,255,255,0.5)',
                  }}
                >
                  {PLOT_TWISTS[twistIndex]}
                </p>

                {/* Bottom panel number */}
                <div className="flex justify-end mt-6">
                  <span
                    className="font-manga text-white opacity-20"
                    style={{ fontSize: 10, letterSpacing: '0.2em' }}
                  >
                    TAP AGAIN FOR MORE
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}