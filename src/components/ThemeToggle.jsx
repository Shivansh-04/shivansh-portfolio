import { motion } from 'framer-motion'

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-[9995] flex items-center gap-2 font-manga"
      style={{
        background: isDark ? '#f0ebe0' : '#0d0d0f',
        border: `2px solid ${isDark ? '#0d0d0f' : 'rgba(255,255,255,0.3)'}`,
        boxShadow: isDark
          ? '3px 3px 0px #0d0d0f'
          : '3px 3px 0px rgba(255,255,255,0.1)',
        padding: '8px 14px',
        cursor: 'none',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Sun/Moon icon */}
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          fontSize: 14,
          color: isDark ? '#0d0d0f' : 'white',
        }}
      >
        {isDark ? '☀' : '◐'}
      </motion.span>

      <span
        style={{
          fontSize: 10,
          letterSpacing: '0.15em',
          color: isDark ? '#0d0d0f' : 'white',
          transition: 'color 0.3s ease',
        }}
      >
        {isDark ? 'PAPER' : 'DARK'}
      </span>
    </motion.button>
  )
}