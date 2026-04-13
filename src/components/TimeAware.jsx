import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function getTimeContext() {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 9) return {
    period: 'MORNING',
    greeting: 'Good morning.',
    subtext: 'Early bird catches the bug.',
    activity: 'DRINKING CHAI',
    mood: 'FOCUSED',
    emoji: '☕',
    bgAccent: 'rgba(255,255,255,0.03)',
  }

  if (hour >= 9 && hour < 13) return {
    period: 'WORKING HOURS',
    greeting: 'In the zone.',
    subtext: 'Currently shipping something.',
    activity: 'DEEP WORK',
    mood: 'LOCKED IN',
    emoji: '⚡',
    bgAccent: 'rgba(255,255,255,0.03)',
  }

  if (hour >= 13 && hour < 17) return {
    period: 'AFTERNOON',
    greeting: 'Still building.',
    subtext: 'No bugs survived.',
    activity: 'PROBLEM SOLVING',
    mood: 'DETERMINED',
    emoji: '💻',
    bgAccent: 'rgba(255,255,255,0.03)',
  }

  if (hour >= 17 && hour < 21) return {
    period: 'EVENING',
    greeting: 'Winding down.',
    subtext: 'Or starting something new.',
    activity: 'CODE REVIEW',
    mood: 'REFLECTIVE',
    emoji: '🌙',
    bgAccent: 'rgba(255,255,255,0.03)',
  }

  return {
    period: 'LATE NIGHT',
    greeting: 'Still coding.',
    subtext: 'Sleep is optional apparently.',
    activity: 'DEBUGGING',
    mood: 'UNHINGED',
    emoji: '👾',
    bgAccent: 'rgba(255,255,255,0.03)',
  }
}

function getLocalTime() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  })
}

export default function TimeAware() {
  const [ctx, setCtx] = useState(getTimeContext())
  const [time, setTime] = useState(getLocalTime())
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Show after intro
    const showTimer = setTimeout(() => setVisible(true), 4000)

    // Update clock every second
    const clockInterval = setInterval(() => {
      setTime(getLocalTime())
      setCtx(getTimeContext())
    }, 1000)

    return () => {
      clearTimeout(showTimer)
      clearInterval(clockInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 left-6 z-[9994]"
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          style={{ cursor: 'none' }}
        >
          <motion.div
            animate={{
              width: expanded ? 'auto' : 'auto',
            }}
            style={{
              background: '#0d0d0f',
              border: '2px solid rgba(255,255,255,0.15)',
              boxShadow: '4px 4px 0px rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}
          >

            {/* Collapsed state — always visible */}
            <div className="flex items-center gap-3 px-4 py-3">
              {/* Live clock */}
              <span
                className="font-manga text-white"
                style={{ fontSize: 13, letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums' }}
              >
                {time}
              </span>

              <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.15)' }} />

              {/* Period */}
              <span
                className="font-manga text-white opacity-40"
                style={{ fontSize: 10, letterSpacing: '0.2em' }}
              >
                {ctx.period}
              </span>

              {/* Pulse dot — live indicator */}
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot flex-shrink-0"
                style={{ background: '#4ade80' }}
              />
            </div>

            {/* Expanded state — hover reveals */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="px-4 py-4 flex flex-col gap-3">

                    {/* Greeting */}
                    <div>
                      <span
                        className="font-manga text-white"
                        style={{ fontSize: 18, letterSpacing: '0.06em', display: 'block' }}
                      >
                        {ctx.greeting}
                      </span>
                      <span
                        className="font-body text-white opacity-40"
                        style={{ fontSize: 11, fontStyle: 'italic', display: 'block', marginTop: 2 }}
                      >
                        {ctx.subtext}
                      </span>
                    </div>

                    {/* Status rows */}
                    <div
                      className="flex flex-col"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {[
                        { label: 'ACTIVITY', value: ctx.activity },
                        { label: 'MOOD', value: ctx.mood },
                        { label: 'TIMEZONE', value: 'IST · DELHI' },
                      ].map((row, i) => (
                        <div
                          key={i}
                          className="flex items-center"
                          style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                        >
                          <div
                            className="px-3 py-2 flex-shrink-0"
                            style={{
                              borderRight: '1px solid rgba(255,255,255,0.06)',
                              width: 90,
                              background: 'rgba(255,255,255,0.02)',
                            }}
                          >
                            <span
                              className="font-manga text-white opacity-30"
                              style={{ fontSize: 9, letterSpacing: '0.15em' }}
                            >
                              {row.label}
                            </span>
                          </div>
                          <div className="px-3 py-2">
                            <span
                              className="font-manga text-white"
                              style={{ fontSize: 11, letterSpacing: '0.1em' }}
                            >
                              {row.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom note */}
                    <span
                      className="font-body text-white"
                      style={{ fontSize: 10, opacity: 0.2, fontStyle: 'italic', letterSpacing: '0.02em' }}
                    >
                      * Based on Shivansh's local time
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}