import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ITEMS = [
  'MERN Stack', '✦', 'Open Source', '✦',
  'GSoC Aspirant', '✦', 'Competitive Programmer', '✦',
  'Full Stack Dev', '✦', 'Problem Solver', '✦',
  'RKGIT · Ghaziabad', '✦', 'Building Things That Matter', '✦',
]

export default function ScrollMarquee({ direction = 1 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Scroll drives the marquee — scrolling down moves it left (or right for direction=-1)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `${direction * -30}%`])

  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden py-5 border-y"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <motion.div style={{ x }} className="flex gap-10 whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-display text-sm font-semibold uppercase tracking-[0.18em]"
            style={{
              color: item === '✦' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.12)',
              fontSize: item === '✦' ? '10px' : '13px',
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}