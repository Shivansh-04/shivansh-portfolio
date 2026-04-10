import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

const CODE_SYMBOLS = [
  { symbol: '{ }', top: '10%', left: '5%', duration: 9 },
  { symbol: '</ >', top: '20%', right: '8%', duration: 12 },
  { symbol: '[ ]', bottom: '25%', left: '3%', duration: 10 },
  { symbol: '=>', top: '60%', right: '5%', duration: 14 },
  { symbol: '( )', bottom: '10%', right: '15%', duration: 11 },
  { symbol: '&&', top: '40%', left: '1%', duration: 8 },
]

const FUN_FACTS = [
  { icon: '⚡', label: 'Competitive Programmer' },
  { icon: '🌿', label: 'Spiritual Traveler' },
  { icon: '☕', label: 'Chai over Coffee' },
  { icon: '🎯', label: 'GSoC Aspirant' },
]

export default function About() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Floating code symbols */}
      {CODE_SYMBOLS.map((s, i) => (
        <motion.span
          key={i}
          className="code-symbol hidden md:block"
          style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
        >
          {s.symbol}
        </motion.span>
      ))}

      <SectionWrapper id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left — Bio */}
          <div>
            <span className="section-label">001 — About</span>
            <h2 className="section-heading">Building things<br />that matter.</h2>

            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'rgba(240,240,240,0.7)', lineHeight: '1.85' }}>
              I'm Shivansh, a Full Stack Developer and CS student at RKGIT, Ghaziabad. I build production-grade web applications with the MERN stack and actively contribute to open source.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(240,240,240,0.5)', lineHeight: '1.85' }}>
              Currently preparing for GSoC while sharpening my competitive programming skills on LeetCode and CodeChef.
            </p>
          </div>

          {/* Right — Card + Fun Facts */}
          <div className="flex flex-col gap-6">
            {/* Currently working on */}
            <div className="card">
              <span className="section-label mb-3">Currently working on</span>
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse-do8t"
                  style={{ background: '#4ade80' }}
                />
                <p className="font-body text-white text-[15px] leading-snug">
                  SurakshaSetu — AI-powered crime reporting platform
                </p>
              </div>
            </div>

            {/* Fun Fact Chips */}
            <div className="flex flex-wrap gap-3">
              {FUN_FACTS.map((fact, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-[13px]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(240,240,240,0.7)',
                    letterSpacing: '0.02em'
                  }}
                >
                  <span>{fact.icon}</span>
                  <span>{fact.label}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
