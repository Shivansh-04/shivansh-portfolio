import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export default function SectionWrapper({ children, id, className = '' }) {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}
