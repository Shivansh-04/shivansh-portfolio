import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const DNA_DATA = [
  { lang: 'JavaScript', percent: 45, trait: 'Frontend Brain', rank: 'S' },
  { lang: 'CSS/Tailwind', percent: 20, trait: 'Visual Instinct', rank: 'A' },
  { lang: 'Node.js', percent: 18, trait: 'Backend Core', rank: 'A' },
  { lang: 'MongoDB', percent: 10, trait: 'Data Memory', rank: 'B' },
  { lang: 'Java/C++', percent: 7, trait: 'DSA Engine', rank: 'B' },
]

const CHARACTER_PARTS = [
  { part: 'HOODIE', lang: 'JavaScript', position: 'top: 15%, left: 50%' },
  { part: 'GLASSES', lang: 'CSS/Tailwind', position: 'top: 8%, left: 50%' },
  { part: 'LAPTOP', lang: 'Node.js', position: 'top: 45%, left: 50%' },
  { part: 'BUCKET HAT', lang: 'MongoDB', position: 'top: 2%, left: 50%' },
  { part: 'SNEAKERS', lang: 'Java/C++', position: 'top: 85%, left: 50%' },
]

export default function CodingDNA() {
  return (
    <div
      className="relative w-full paper-bg"
      style={{ borderBottom: '3px solid #0d0d0f' }}
    >
      {/* Chapter bar */}
      <div
        className="w-full flex items-center overflow-hidden"
        style={{ borderBottom: '3px solid #0d0d0f' }}
      >
        <div
          className="px-8 py-4 flex-shrink-0"
          style={{ borderRight: '3px solid #0d0d0f', background: '#0d0d0f' }}
        >
          <span className="font-manga text-white tracking-widest" style={{ fontSize: 13 }}>
            DNA
          </span>
        </div>
        <div className="flex-1 px-8 py-4">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-manga tracking-wide"
            style={{ fontSize: 'clamp(18px, 3vw, 36px)', color: '#0d0d0f' }}
          >
            CODING DNA
          </motion.h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* Left — DNA helix visualization */}
        <div
          className="relative flex-shrink-0 flex flex-col justify-center items-center p-8"
          style={{
            borderRight: '3px solid #0d0d0f',
            width: '100%',
            maxWidth: 320,
            minHeight: 400,
            background: '#f8f4ec',
          }}
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4"
            style={{ border: '1.5px solid #0d0d0f', padding: '2px 8px', background: '#0d0d0f' }}
          >
            <span className="font-manga text-white" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
              GENOME MAP
            </span>
          </div>

          {/* SVG DNA helix */}
          <svg
            viewBox="0 0 200 360"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', maxWidth: 200 }}
          >
            {/* Left strand */}
            <path
              d="M 60,20 C 60,60 140,80 140,120 C 140,160 60,180 60,220 C 60,260 140,280 140,320 C 140,340 100,350 100,360"
              fill="none"
              stroke="#0d0d0f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Right strand */}
            <path
              d="M 140,20 C 140,60 60,80 60,120 C 60,160 140,180 140,220 C 140,260 60,280 60,320 C 60,340 100,350 100,360"
              fill="none"
              stroke="#0d0d0f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* DNA rungs — each one represents a language */}
            {DNA_DATA.map((item, i) => {
              const y = 40 + i * 64
              return (
                <g key={i}>
                  <motion.line
                    x1="60" y1={y} x2="140" y2={y}
                    stroke="#0d0d0f"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.4 }}
                  />
                  {/* Left node */}
                  <motion.circle
                    cx="60" cy={y} r="5"
                    fill="#0d0d0f"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.3, type: 'spring' }}
                  />
                  {/* Right node */}
                  <motion.circle
                    cx="140" cy={y} r="5"
                    fill="white"
                    stroke="#0d0d0f"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.25, duration: 0.3, type: 'spring' }}
                  />
                  {/* Language label */}
                  <text
                    x="100" y={y - 8}
                    textAnchor="middle"
                    fontFamily="Bangers, cursive"
                    fontSize="9"
                    letterSpacing="1"
                    fill="rgba(13,13,15,0.4)"
                  >
                    {item.lang.toUpperCase()}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Right — Breakdown */}
        <div className="flex-1 flex flex-col">
          {DNA_DATA.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-4 p-6"
              style={{
                borderBottom: i < DNA_DATA.length - 1 ? '1.5px solid rgba(13,13,15,0.08)' : 'none',
              }}
            >
              {/* Rank */}
              <div
                className="flex-shrink-0 flex items-center justify-center font-manga"
                style={{
                  width: 36, height: 36,
                  background: i === 0 ? '#0d0d0f' : 'white',
                  color: i === 0 ? 'white' : '#0d0d0f',
                  border: '2px solid #0d0d0f',
                  boxShadow: '2px 2px 0px #0d0d0f',
                  fontSize: 16,
                }}
              >
                {item.rank}
              </div>

              {/* Name + bar */}
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-manga text-[#0d0d0f]" style={{ fontSize: 14, letterSpacing: '0.06em' }}>
                    {item.lang}
                  </span>
                  <span className="font-manga text-[#0d0d0f] opacity-40" style={{ fontSize: 11 }}>
                    {item.percent}%
                  </span>
                </div>

                {/* Bar */}
                <div
                  className="relative h-2 w-full overflow-hidden"
                  style={{ background: 'rgba(13,13,15,0.08)', border: '1px solid rgba(13,13,15,0.12)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-0 left-0 h-full"
                    style={{ background: '#0d0d0f' }}
                  />
                </div>

                <span
                  className="font-body"
                  style={{ fontSize: 11, color: 'rgba(13,13,15,0.4)', fontStyle: 'italic' }}
                >
                  {item.trait}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Bottom note */}
          <div
            className="flex items-center gap-3 px-6 py-4 mt-auto"
            style={{ borderTop: '1.5px solid rgba(13,13,15,0.08)', background: 'rgba(13,13,15,0.02)' }}
          >
            <span className="font-manga text-[#0d0d0f] opacity-25" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
              DNA NOTE
            </span>
            <span className="font-body" style={{ fontSize: 11, color: 'rgba(13,13,15,0.35)', fontStyle: 'italic' }}>
              Estimated from real project usage, not line counts.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}