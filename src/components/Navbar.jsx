import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#opensource' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)

      // Active section detection
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between px-8 md:px-12 h-[60px]"
            style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-white text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
            >
              S.
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace('#', '')
                const isActive = active === id
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="relative text-[13px] uppercase tracking-[0.1em] transition-all duration-200 hover:tracking-[0.15em]"
                    style={{ color: isActive ? 'white' : 'var(--muted)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* CV Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex btn-sweep items-center gap-2 px-4 py-2 text-[12px] uppercase tracking-[0.12em] font-medium text-white border border-white/20 rounded-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Download CV
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-white origin-center"
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-px bg-white"
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-white origin-center"
                transition={{ duration: 0.25 }}
              />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9989] flex flex-col items-center justify-center"
            style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                onClick={() => handleNav(link.href)}
                className="font-display text-4xl font-bold text-white mb-6 hover:opacity-50 transition-opacity"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
