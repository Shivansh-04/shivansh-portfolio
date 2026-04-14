// import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'

// // Replace with your actual GitHub username
// const GITHUB_USERNAME = 'Shivansh-04'

// export default function GitHubGraph() {
//   const [contributions, setContributions] = useState([])
//   const [total, setTotal] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     const fetchContributions = async () => {
//       try {
//         // Use GitHub contributions API via a proxy service
//         const res = await fetch(
//           `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
//         )
//         const data = await res.json()

//         if (data.contributions) {
//           setContributions(data.contributions)
//           setTotal(data.total?.lastYear || 0)
//         }
//         setLoading(false)
//       } catch (err) {
//         setError(true)
//         setLoading(false)
//       }
//     }

//     fetchContributions()
//   }, [])

//   // Get last 182 days (26 weeks)
//   const recentDays = contributions.slice(-182)

//   // Group into weeks
//   const weeks = []
//   for (let i = 0; i < recentDays.length; i += 7) {
//     weeks.push(recentDays.slice(i, i + 7))
//   }

//   const getIntensity = (count) => {
//     if (count === 0) return 0
//     if (count <= 2) return 1
//     if (count <= 5) return 2
//     if (count <= 9) return 3
//     return 4
//   }

//   const intensityStyles = {
//     0: { background: 'rgba(13,13,15,0.06)', border: '1px solid rgba(13,13,15,0.08)' },
//     1: { background: 'rgba(13,13,15,0.2)', border: '1px solid rgba(13,13,15,0.15)' },
//     2: { background: 'rgba(13,13,15,0.45)', border: '1px solid rgba(13,13,15,0.3)' },
//     3: { background: 'rgba(13,13,15,0.7)', border: '1px solid rgba(13,13,15,0.5)' },
//     4: { background: '#0d0d0f', border: '1px solid #0d0d0f' },
//   }

//   return (
//     <div
//       className="relative w-full paper-bg"
//       style={{ borderBottom: '3px solid #0d0d0f', borderTop: '3px solid #0d0d0f' }}
//     >
//       {/* Chapter bar */}
//       <div
//         className="w-full flex items-center overflow-hidden"
//         style={{ borderBottom: '3px solid #0d0d0f' }}
//       >
//         <div
//           className="px-8 py-4 flex-shrink-0"
//           style={{ borderRight: '3px solid #0d0d0f', background: '#0d0d0f' }}
//         >
//           <span className="font-manga text-white tracking-widest" style={{ fontSize: 13 }}>
//             ACTIVITY
//           </span>
//         </div>
//         <div className="flex-1 px-8 py-4 flex items-center justify-between">
//           <motion.h2
//             initial={{ x: -40, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="font-manga tracking-wide"
//             style={{ fontSize: 'clamp(18px, 3vw, 32px)', color: '#0d0d0f' }}
//           >
//             GITHUB CONTRIBUTION MAP
//           </motion.h2>
//           {!loading && !error && (
//             <div
//               className="flex-shrink-0 px-4 py-2"
//               style={{ border: '2px solid #0d0d0f', background: '#0d0d0f' }}
//             >
//               <span className="font-manga text-white" style={{ fontSize: 13, letterSpacing: '0.1em' }}>
//                 {total}+ COMMITS
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Graph */}
//       <div className="p-8 md:p-12">
//         {loading && (
//           <div className="flex items-center gap-3">
//             <div
//               className="w-4 h-4 animate-spin"
//               style={{ border: '2px solid rgba(13,13,15,0.2)', borderTopColor: '#0d0d0f', borderRadius: '50%' }}
//             />
//             <span className="font-manga text-[#0d0d0f] opacity-40" style={{ fontSize: 12, letterSpacing: '0.15em' }}>
//               LOADING ACTIVITY...
//             </span>
//           </div>
//         )}

//         {error && (
//           <div
//             className="inline-flex items-center gap-3 px-5 py-3"
//             style={{ border: '2px solid rgba(13,13,15,0.15)', background: 'rgba(13,13,15,0.03)' }}
//           >
//             <span className="font-manga text-[#0d0d0f] opacity-40" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
//               ACTIVITY DATA UNAVAILABLE
//             </span>
//           </div>
//         )}

//         {!loading && !error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* Day labels */}
//             <div className="flex gap-1 mb-2 ml-1">
//               {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
//                 <div key={day} style={{ width: 12, flexShrink: 0 }}>
//                   <span
//                     className="font-manga text-[#0d0d0f]"
//                     style={{ fontSize: 7, opacity: 0.3, letterSpacing: '0.05em', writingMode: 'horizontal-tb' }}
//                   >
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Grid */}
//             <div className="flex gap-1 overflow-x-auto pb-2">
//               {weeks.map((week, wi) => (
//                 <div key={wi} className="flex flex-col gap-1">
//                   {week.map((day, di) => (
//                     <motion.div
//                       key={di}
//                       title={`${day.date}: ${day.count} contributions`}
//                       initial={{ scale: 0, opacity: 0 }}
//                       whileInView={{ scale: 1, opacity: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: wi * 0.01 + di * 0.005, duration: 0.2 }}
//                       style={{
//                         width: 12,
//                         height: 12,
//                         borderRadius: 2,
//                         flexShrink: 0,
//                         ...intensityStyles[getIntensity(day.count)],
//                       }}
//                     />
//                   ))}
//                 </div>
//               ))}
//             </div>

//             {/* Legend */}
//             <div className="flex items-center gap-2 mt-4">
//               <span className="font-manga text-[#0d0d0f] opacity-30" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
//                 LESS
//               </span>
//               {[0, 1, 2, 3, 4].map(level => (
//                 <div
//                   key={level}
//                   style={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: 2,
//                     ...intensityStyles[level],
//                   }}
//                 />
//               ))}
//               <span className="font-manga text-[#0d0d0f] opacity-30" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
//                 MORE
//               </span>

//               <div className="flex-1" />

//               <span
//                 className="font-manga text-[#0d0d0f] opacity-25"
//                 style={{ fontSize: 9, letterSpacing: '0.15em' }}
//               >
//                 {GITHUB_USERNAME} · LAST 26 WEEKS
//               </span>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// src/components/GitHubGraph.jsx
// Drop-in replacement — paste into src/components/ and import in App.jsx or wherever needed
// Usage: <GitHubGraph /> (no props needed)

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animate, stagger } from 'animejs'

const GITHUB_USERNAME = 'Shivansh-04'

// ── Intensity → manga ink shade ──────────────────────────────────────────────
const INTENSITY = {
  0: { bg: 'rgba(13,13,15,0.05)', border: 'rgba(13,13,15,0.08)', label: 'IDLE' },
  1: { bg: 'rgba(13,13,15,0.18)', border: 'rgba(13,13,15,0.15)', label: 'WARM UP' },
  2: { bg: 'rgba(13,13,15,0.42)', border: 'rgba(13,13,15,0.3)', label: 'ACTIVE' },
  3: { bg: 'rgba(13,13,15,0.72)', border: 'rgba(13,13,15,0.5)', label: 'LOCKED IN' },
  4: { bg: '#0d0d0f', border: '#0d0d0f', label: 'ULTRA' },
}

function getLevel(count) {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

// Find the longest streak
function calcStreaks(days) {
  let best = 0, cur = 0, curStart = '', bestStart = '', bestEnd = ''
  days.forEach(d => {
    if (d.count > 0) {
      cur++
      if (!curStart) curStart = d.date
      if (cur > best) { best = cur; bestStart = curStart; bestEnd = d.date }
    } else {
      cur = 0; curStart = ''
    }
  })
  return { best, bestStart, bestEnd }
}

function calcCurrentStreak(days) {
  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++
    else break
  }
  return streak
}

function getBusiestDay(days) {
  return days.reduce((a, b) => (b.count > a.count ? b : a), { count: 0, date: '' })
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ day, visible, x, y }) {
  if (!visible || !day) return null
  return (
    <div
      style={{
        position: 'fixed',
        left: x + 12,
        top: y - 40,
        zIndex: 99999,
        pointerEvents: 'none',
        background: '#0d0d0f',
        border: '2px solid #0d0d0f',
        padding: '6px 12px',
        boxShadow: '3px 3px 0px rgba(13,13,15,0.3)',
        minWidth: 140,
      }}
    >
      <span
        className="font-manga text-white block"
        style={{ fontSize: 11, letterSpacing: '0.1em' }}
      >
        {day.count} COMMIT{day.count !== 1 ? 'S' : ''}
      </span>
      <span
        className="font-body text-white block"
        style={{ fontSize: 10, opacity: 0.5, marginTop: 2 }}
      >
        {day.date}
      </span>
      {/* bubble tail */}
      <div style={{
        position: 'absolute', bottom: -8, left: 10,
        width: 0, height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '4px solid transparent',
        borderTop: '8px solid #0d0d0f',
      }} />
    </div>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCell({ label, value, sub, accent = false, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative flex flex-col p-5"
      style={{
        border: '2px solid #0d0d0f',
        background: accent ? '#0d0d0f' : '#f8f4ec',
        boxShadow: '3px 3px 0px rgba(13,13,15,0.15)',
        minWidth: 120,
        flex: 1,
      }}
    >
      <span
        className="font-manga"
        style={{
          fontSize: 9,
          letterSpacing: '0.2em',
          color: accent ? 'rgba(255,255,255,0.4)' : 'rgba(13,13,15,0.4)',
          marginBottom: 4,
        }}
      >
        {label}
      </span>
      <span
        className="font-manga"
        style={{
          fontSize: 'clamp(22px, 3vw, 32px)',
          lineHeight: 1,
          color: accent ? 'white' : '#0d0d0f',
        }}
      >
        {value}
      </span>
      {sub && (
        <span
          className="font-body mt-1"
          style={{
            fontSize: 10,
            fontStyle: 'italic',
            color: accent ? 'rgba(255,255,255,0.35)' : 'rgba(13,13,15,0.4)',
          }}
        >
          {sub}
        </span>
      )}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function GitHubGraph() {
  const [contributions, setContributions] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tooltip, setTooltip] = useState({ visible: false, day: null, x: 0, y: 0 })
  const [hoveredWeek, setHoveredWeek] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [view, setView] = useState('26w') // '26w' | '52w'
  const gridRef = useRef(null)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        )
        const data = await res.json()
        if (data.contributions) {
          setContributions(data.contributions)
          setTotal(data.total?.lastYear || 0)
        }
        setLoading(false)
      } catch {
        setError(true)
        setLoading(false)
      }
    }
    fetchContributions()
  }, [])

  // Animate cells when data arrives
  useEffect(() => {
    if (!loading && !error && gridRef.current) {
      const timer = setTimeout(() => {
        const cells = Array.from(gridRef.current?.querySelectorAll('.gh-cell') || [])
        if (cells.length === 0) return
        animate(cells, {
          scale: [0, 1],
          opacity: [0, 1],
          ease: 'easeOutElastic(1, .6)',
          duration: 400,
          delay: stagger(4, { start: 100 }),
        })
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [loading, error, view])

  const weeks = (() => {
    const count = view === '26w' ? 182 : 364
    const recent = contributions.slice(-count)
    const result = []
    for (let i = 0; i < recent.length; i += 7) result.push(recent.slice(i, i + 7))
    return result
  })()

  // Month labels: for each week, check if it starts a new month
  const monthLabels = weeks.map((week, wi) => {
    const firstDay = week.find(d => d?.date)
    if (!firstDay) return null
    const date = new Date(firstDay.date)
    const isFirst = wi === 0 || (() => {
      const prev = weeks[wi - 1]?.find(d => d?.date)
      return prev ? new Date(prev.date).getMonth() !== date.getMonth() : true
    })()
    return isFirst ? date.toLocaleString('default', { month: 'short' }).toUpperCase() : null
  })

  // Flatten for stats
  const allDays = contributions.slice(-(view === '26w' ? 182 : 364))
  const streakInfo = calcStreaks(allDays)
  const currentStreak = calcCurrentStreak(allDays)
  const busiestDay = getBusiestDay(allDays)
  const activeDays = allDays.filter(d => d.count > 0).length
  const totalCommitsInView = allDays.reduce((s, d) => s + d.count, 0)
  const avgRate = activeDays > 0 ? (totalCommitsInView / activeDays).toFixed(1) : '0'
  const todayStr = new Date().toISOString().slice(0, 10)

  // Day of week heatmap
  const dowData = Array(7).fill(0)
  allDays.forEach(d => {
    if (d.date) {
      const dow = new Date(d.date).getDay()
      dowData[dow] += d.count
    }
  })
  const maxDow = Math.max(...dowData, 1)
  const DOW_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return (
    <div
      id="github"
      className="relative w-full paper-bg"
      style={{ borderBottom: '3px solid #0d0d0f' }}
    >
      {/* ── Chapter title bar ── */}
      <div
        className="w-full flex items-center overflow-hidden"
        style={{ borderBottom: '3px solid #0d0d0f' }}
      >
        <div
          className="px-8 py-4 flex-shrink-0"
          style={{ borderRight: '3px solid #0d0d0f', background: '#0d0d0f' }}
        >
          <span className="font-manga text-white tracking-widest" style={{ fontSize: 13 }}>
            ACTIVITY LOG
          </span>
        </div>

        <div className="flex-1 px-8 py-4 flex items-center justify-between gap-4 overflow-hidden">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-manga tracking-wide"
            style={{ fontSize: 'clamp(18px, 3vw, 36px)', color: '#0d0d0f', whiteSpace: 'nowrap' }}
          >
            GITHUB BATTLE RECORD
          </motion.h2>

          {/* View toggle */}
          <div className="flex items-center flex-shrink-0" style={{ border: '2px solid #0d0d0f' }}>
            {['26w', '52w'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="font-manga px-4 py-2 transition-all"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  background: view === v ? '#0d0d0f' : 'transparent',
                  color: view === v ? 'white' : 'rgba(13,13,15,0.5)',
                  cursor: 'none',
                  borderRight: v === '26w' ? '2px solid #0d0d0f' : 'none',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {!loading && !error && (
          <div
            className="flex-shrink-0 px-6 py-4 flex flex-col items-center justify-center"
            style={{ borderLeft: '3px solid #0d0d0f', background: '#0d0d0f' }}
          >
            <span className="font-manga text-white" style={{ fontSize: 22, lineHeight: 1 }}>
              {total}+
            </span>
            <span className="font-manga text-white opacity-40" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
              COMMITS
            </span>
          </div>
        )}
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="p-12 flex items-center gap-4">
          <div
            style={{
              width: 18, height: 18,
              border: '2.5px solid rgba(13,13,15,0.2)',
              borderTopColor: '#0d0d0f',
              borderRadius: '50%',
              animation: 'spin360 0.7s linear infinite',
            }}
          />
          <span className="font-manga text-[#0d0d0f] opacity-40" style={{ fontSize: 13, letterSpacing: '0.2em' }}>
            FETCHING BATTLE DATA...
          </span>
          <style>{`@keyframes spin360 { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="p-12">
          <div
            className="inline-flex items-center gap-3 px-6 py-4"
            style={{ border: '2px solid rgba(13,13,15,0.2)', background: 'rgba(13,13,15,0.03)' }}
          >
            <span className="font-manga text-[#0d0d0f] opacity-40" style={{ fontSize: 12, letterSpacing: '0.2em' }}>
              BATTLE DATA UNAVAILABLE
            </span>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* ── Stat strip ── */}
          <div
            className="flex flex-wrap"
            style={{ borderBottom: '3px solid #0d0d0f' }}
          >
            <StatCell label="CURRENT STREAK" value={`${currentStreak}d`} sub="days in a row" accent index={0} />
            <StatCell label="BEST STREAK" value={`${streakInfo.best}d`} sub={streakInfo.bestStart ? streakInfo.bestStart.slice(5) : '—'} index={1} />
            <StatCell label="ACTIVE DAYS" value={activeDays} sub={`of ${allDays.length} tracked`} index={2} />
            <StatCell label="BUSIEST DAY" value={busiestDay.count} sub={busiestDay.date?.slice(5) || '—'} index={3} />
            <StatCell label="AVG / ACTIVE DAY" value={avgRate} sub="commits per day" index={4} />
          </div>

          {/* ── Contribution grid + Peak Days side by side ── */}
          <div className="flex flex-col md:flex-row" style={{ borderBottom: '3px solid #0d0d0f' }}>
          <div className="flex-1 p-6 md:p-10 min-w-0">
            {/* Panel label */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ border: '1.5px solid #0d0d0f', padding: '2px 10px', background: '#0d0d0f', display: 'inline-block' }}>
                <span className="font-manga text-white" style={{ fontSize: 9, letterSpacing: '0.15em' }}>COMMIT MAP</span>
              </div>
              <span className="font-manga text-[#0d0d0f] opacity-30" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
                {view === '26w' ? 'LAST 26 WEEKS' : 'LAST 52 WEEKS'}
              </span>
            </div>

            {/* Month labels row — above grid */}
            <div className="flex gap-[3px] mb-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {weeks.map((_, wi) => (
                <div key={wi} style={{ width: 14, flexShrink: 0, textAlign: 'left' }}>
                  {monthLabels[wi] && (
                    <span
                      className="font-manga text-[#0d0d0f]"
                      style={{ fontSize: 7, opacity: 0.45, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
                    >
                      {monthLabels[wi]}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Day-of-week labels + Grid side by side */}
            <div className="flex gap-2">
              {/* DOW labels column */}
              <div className="flex flex-col gap-[3px] flex-shrink-0" style={{ paddingTop: 1 }}>
                {DOW_LABELS.map((d, i) => (
                  <div key={d} style={{ width: 14, height: 14, display: 'flex', alignItems: 'center' }}>
                    {i % 2 !== 0 && (
                      <span className="font-manga text-[#0d0d0f]" style={{ fontSize: 6, opacity: 0.3, letterSpacing: '0.03em' }}>
                        {d.slice(0, 2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div
                ref={gridRef}
                className="flex gap-[3px] overflow-x-auto pb-2"
                style={{ scrollbarWidth: 'thin' }}
              >
                {weeks.map((week, wi) => (
                  <div
                    key={wi}
                    className="flex flex-col gap-[3px] flex-shrink-0"
                    onMouseEnter={() => setHoveredWeek(wi)}
                    onMouseLeave={() => setHoveredWeek(null)}
                    style={{
                      opacity: hoveredWeek !== null && hoveredWeek !== wi ? 0.45 : 1,
                      transition: 'opacity 0.15s ease',
                    }}
                  >
                    {week.map((day, di) => {
                      const level = getLevel(day.count)
                      const isSelected = selectedDay?.date === day.date
                      const isToday = day.date === todayStr
                      return (
                        <div key={di} style={{ position: 'relative', width: 14, height: 14 }}>
                          <motion.div
                            className="gh-cell"
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: 2,
                              background: INTENSITY[level].bg,
                              border: isSelected
                                ? '2px solid #0d0d0f'
                                : isToday
                                ? '2px solid rgba(13,13,15,0.6)'
                                : `1px solid ${INTENSITY[level].border}`,
                              boxShadow: isSelected ? '2px 2px 0px #0d0d0f' : 'none',
                              cursor: 'none',
                              transition: 'border 0.1s, box-shadow 0.1s',
                            }}
                            whileHover={{ scale: 1.35 }}
                            onClick={() => setSelectedDay(isSelected ? null : day)}
                            onMouseEnter={e => setTooltip({ visible: true, day, x: e.clientX, y: e.clientY })}
                            onMouseMove={e => setTooltip(t => ({ ...t, x: e.clientX, y: e.clientY }))}
                            onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
                          />
                          {/* Today dot */}
                          {isToday && (
                            <span style={{
                              position: 'absolute', bottom: -5, left: '50%',
                              transform: 'translateX(-50%)',
                              width: 3, height: 3, borderRadius: '50%',
                              background: '#0d0d0f', opacity: 0.6, display: 'block',
                            }} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="font-manga text-[#0d0d0f] opacity-30" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
                LESS
              </span>
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: INTENSITY[level].bg,
                    border: `1px solid ${INTENSITY[level].border}`,
                  }}
                />
              ))}
              <span className="font-manga text-[#0d0d0f] opacity-30" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
                MORE
              </span>
              <div className="flex-1" />
              <span className="font-manga text-[#0d0d0f] opacity-20" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
                {GITHUB_USERNAME} · HOVER TO INSPECT
              </span>
              <span className="font-manga text-[#0d0d0f] opacity-25" style={{ fontSize: 9, letterSpacing: '0.12em' }}>·</span>
              <div style={{ width: 12, height: 12, borderRadius: 2, border: '2px solid rgba(13,13,15,0.6)', background: 'rgba(13,13,15,0.05)' }} />
              <span className="font-manga text-[#0d0d0f] opacity-25" style={{ fontSize: 9, letterSpacing: '0.12em' }}>TODAY</span>
            </div>
          </div>

            {/* Peak Days — right side, same row as grid */}
            <div
              className="flex-shrink-0 p-6 md:p-8 flex flex-col justify-center"
              style={{ borderLeft: '3px solid #0d0d0f', minWidth: 220 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div style={{ border: '1.5px solid #0d0d0f', padding: '2px 10px', background: '#0d0d0f', display: 'inline-block' }}>
                  <span className="font-manga text-white" style={{ fontSize: 9, letterSpacing: '0.15em' }}>PEAK DAYS</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {DOW_LABELS.map((label, i) => {
                  const pct = (dowData[i] / maxDow) * 100
                  return (
                    <div key={label} className="flex items-center gap-3">
                      <span className="font-manga text-[#0d0d0f]" style={{ fontSize: 9, letterSpacing: '0.08em', opacity: 0.45, width: 28, flexShrink: 0 }}>
                        {label}
                      </span>
                      <div className="flex-1 relative" style={{ height: 10, background: 'rgba(13,13,15,0.07)', border: '1px solid rgba(13,13,15,0.1)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
                          style={{ height: '100%', background: pct > 80 ? '#0d0d0f' : `rgba(13,13,15,${0.2 + pct * 0.006})` }}
                        />
                      </div>
                      <span className="font-manga text-[#0d0d0f]" style={{ fontSize: 9, opacity: 0.3, width: 24, textAlign: 'right', flexShrink: 0 }}>
                        {dowData[i]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Selected day detail ── */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
                style={{ borderBottom: '3px solid #0d0d0f' }}
              >
                <div className="flex items-center gap-6 px-8 py-4" style={{ background: '#0d0d0f' }}>
                  <div
                    style={{
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      padding: '2px 10px',
                    }}
                  >
                    <span className="font-manga text-white opacity-40" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
                      SELECTED
                    </span>
                  </div>
                  <span className="font-manga text-white" style={{ fontSize: 18, letterSpacing: '0.08em' }}>
                    {selectedDay.count} COMMIT{selectedDay.count !== 1 ? 'S' : ''}
                  </span>
                  <span className="font-body text-white opacity-40" style={{ fontSize: 13 }}>
                    {selectedDay.date}
                  </span>
                  <span className="font-manga text-white opacity-30" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
                    ★ {INTENSITY[getLevel(selectedDay.count)].label}
                  </span>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="ml-auto font-manga text-white opacity-30 hover:opacity-60 transition-opacity"
                    style={{ fontSize: 11, letterSpacing: '0.1em', cursor: 'none' }}
                  >
                    CLOSE ×
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Footer strip ── */}
          <div
            className="flex items-center justify-between px-8 py-3"
            style={{ borderTop: '2px solid rgba(13,13,15,0.12)', background: 'rgba(13,13,15,0.03)' }}
          >
            <span className="font-manga text-[#0d0d0f] opacity-25" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
              DATA VIA GITHUB CONTRIBUTIONS API
            </span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-manga text-[#0d0d0f] opacity-40 hover:opacity-80 transition-opacity"
              style={{ fontSize: 10, letterSpacing: '0.15em', cursor: 'none' }}
            >
              @{GITHUB_USERNAME} →
            </a>
          </div>
        </motion.div>
      )}

      {/* Global tooltip */}
      <Tooltip {...tooltip} />
    </div>
  )
}