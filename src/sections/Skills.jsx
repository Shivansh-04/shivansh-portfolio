import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiTailwindcss,
  SiExpress, SiGit, SiGithub, SiPostman, SiFigma, SiHtml5, SiCss, SiFramer
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { TbBrandCpp } from 'react-icons/tb'
import { SiPython } from "react-icons/si";

const STATS = [
  {
    category: 'LANGUAGES',
    code: 'LNG',
    skills: [
      { name: 'JavaScript', Icon: SiJavascript, level: 88, rank: 'S' },
      { name: 'Java', Icon: FaJava, level: 80, rank: 'A' },
      { name: 'C++', Icon: TbBrandCpp, level: 75, rank: 'A' },
      { name: 'Python', Icon: SiPython, level: 70, rank: 'A' },
    ]
  },
  {
    category: 'FRONTEND',
    code: 'FRT',
    skills: [
      { name: 'React', Icon: SiReact, level: 90, rank: 'S' },
      { name: 'HTML5', Icon: SiHtml5, level: 92, rank: 'S' },
      { name: 'CSS3', Icon: SiCss, level: 85, rank: 'A' },
      { name: 'Tailwind', Icon: SiTailwindcss, level: 88, rank: 'S' },
      { name: 'Framer', Icon: SiFramer, level: 72, rank: 'A' },
    ]
  },
  {
    category: 'BACKEND',
    code: 'BKD',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, level: 83, rank: 'A' },
      { name: 'Express', Icon: SiExpress, level: 82, rank: 'A' },
      { name: 'MongoDB', Icon: SiMongodb, level: 78, rank: 'A' },
    ]
  },
  {
    category: 'TOOLS',
    code: 'TLS',
    skills: [
      { name: 'Git', Icon: SiGit, level: 85, rank: 'A' },
      { name: 'GitHub', Icon: SiGithub, level: 85, rank: 'A' },
      { name: 'Postman', Icon: SiPostman, level: 75, rank: 'B' },
      { name: 'Figma', Icon: SiFigma, level: 65, rank: 'B' },
    ]
  },
]

const RANK_COLORS = {
  S: { bg: '#0d0d0f', text: 'white' },
  A: { bg: '#1a1a1a', text: 'white' },
  B: { bg: '#f0ebe0', text: '#0d0d0f' },
}

function StatBar({ level, delay }) {
  return (
    <div
      className="relative h-2 w-full overflow-hidden"
      style={{ background: 'rgba(13,13,15,0.12)', border: '1px solid rgba(13,13,15,0.2)' }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-0 left-0 h-full"
        style={{ background: '#0d0d0f' }}
      />
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const active = STATS[activeCategory]

  return (
    <div
      className="relative w-full paper-bg"
      style={{ borderBottom: '3px solid #0d0d0f' }}
    >
      {/* Chapter title card */}
      <div
        className="w-full flex items-center gap-0 overflow-hidden"
        style={{ borderBottom: '3px solid #0d0d0f' }}
      >
        <div
          className="px-8 py-4 flex items-center gap-4"
          style={{ borderRight: '3px solid #0d0d0f', background: '#0d0d0f', minWidth: 'fit-content' }}
        >
          <span className="font-manga text-white tracking-widest" style={{ fontSize: 13 }}>
            CHAPTER 03
          </span>
        </div>
        <div className="flex-1 px-8 py-4 overflow-hidden">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-manga tracking-wide"
            style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: '#0d0d0f', whiteSpace: 'nowrap' }}
          >
            CHARACTER STATS
          </motion.h2>
        </div>

        {/* Overall rank badge */}
        <div
          className="px-8 py-4 flex flex-col items-center justify-center flex-shrink-0"
          style={{ borderLeft: '3px solid #0d0d0f' }}
        >
          <span className="font-manga text-[#0d0d0f] opacity-40" style={{ fontSize: 10, letterSpacing: '0.15em' }}>
            OVERALL
          </span>
          <span className="font-manga text-[#0d0d0f]" style={{ fontSize: 32, lineHeight: 1 }}>
            A+
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row" style={{ minHeight: '60vh' }}>

        {/* Left — Category selector (like manga chapter tabs) */}
        <div
          className="flex flex-row md:flex-col flex-shrink-0"
          style={{ borderRight: '3px solid #0d0d0f', minWidth: 140 }}
        >
          {STATS.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className="relative flex flex-col items-start px-5 py-5 text-left transition-all duration-200"
              style={{
                borderBottom: '2px solid #0d0d0f',
                background: activeCategory === i ? '#0d0d0f' : 'transparent',
                color: activeCategory === i ? 'white' : '#0d0d0f',
                cursor: 'none',
              }}
            >
              <span className="font-manga" style={{ fontSize: 10, opacity: 0.5, letterSpacing: '0.12em' }}>
                {cat.code}
              </span>
              <span className="font-manga" style={{ fontSize: 14, letterSpacing: '0.08em' }}>
                {cat.category}
              </span>
              {activeCategory === i && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute right-0 top-0 bottom-0 w-1"
                  style={{ background: 'white' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right — Stats display */}
        <div className="flex-1 p-8 md:p-12">

          {/* Category heading */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Top status bar — like an RPG HUD */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ border: '2px solid #0d0d0f', background: '#0d0d0f' }}
            >
              <span className="font-manga text-white" style={{ fontSize: 13, letterSpacing: '0.15em' }}>
                {active.category} · {active.skills.length} SKILLS EQUIPPED
              </span>
              <span className="font-manga text-white opacity-40" style={{ fontSize: 11 }}>
                SHIVANSH · LVL 3
              </span>
            </div>

            {/* Skill rows */}
            <div className="flex flex-col gap-5">
              {active.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="flex items-center gap-5"
                >
                  {/* Rank badge */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center font-manga"
                    style={{
                      width: 36, height: 36,
                      background: RANK_COLORS[skill.rank].bg,
                      color: RANK_COLORS[skill.rank].text,
                      fontSize: 16,
                      border: '2px solid #0d0d0f',
                      boxShadow: '2px 2px 0px #0d0d0f',
                    }}
                  >
                    {skill.rank}
                  </div>

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 40, height: 40,
                      border: '2px solid #0d0d0f',
                      background: 'white',
                      boxShadow: '2px 2px 0px #0d0d0f',
                    }}
                  >
                    <skill.Icon size={20} color="#0d0d0f" />
                  </div>

                  {/* Name + bar */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-manga"
                        style={{ fontSize: 14, color: '#0d0d0f', letterSpacing: '0.06em' }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="font-manga"
                        style={{ fontSize: 12, color: 'rgba(13,13,15,0.4)', letterSpacing: '0.1em' }}
                      >
                        {skill.level}/100
                      </span>
                    </div>
                    <StatBar level={skill.level} delay={i * 0.07} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom flavor text — manga chapter note style */}
            <div
              className="mt-4 px-5 py-3 flex items-center gap-3"
              style={{ border: '1.5px solid rgba(13,13,15,0.2)', background: 'rgba(13,13,15,0.04)' }}
            >
              <span className="font-manga text-[#0d0d0f] opacity-30" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                DEV NOTE
              </span>
              <span className="font-body text-[12px]" style={{ color: 'rgba(13,13,15,0.45)', fontStyle: 'italic' }}>
                Stats reflect real-world project experience, not just tutorials.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}