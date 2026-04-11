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
      setVisible(window.scrollY > window.innerHeight * 0.6)
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
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between"
            style={{
              background: '#f0ebe0',
              borderBottom: '3px solid #0d0d0f',
              height: 52,
            }}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-manga text-[#0d0d0f] flex items-center h-full px-6"
              style={{
                fontSize: 16,
                letterSpacing: '0.12em',
                borderRight: '3px solid #0d0d0f',
                cursor: 'none',
                background: '#0d0d0f',
                color: 'white',
              }}
            >
              S.
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center h-full flex-1">
              {NAV_LINKS.map((link, i) => {
                const id = link.href.replace('#', '')
                const isActive = active === id
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="relative h-full flex items-center px-5 font-manga transition-all duration-150"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      borderRight: '1px solid rgba(13,13,15,0.1)',
                      background: isActive ? '#0d0d0f' : 'transparent',
                      color: isActive ? 'white' : 'rgba(13,13,15,0.5)',
                      cursor: 'none',
                    }}
                  >
                    {link.label.toUpperCase()}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: 'white' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right side — CV + chapter indicator */}
            <div className="hidden md:flex items-center h-full">
              {/* Current chapter indicator */}
              <div
                className="h-full flex items-center px-4"
                style={{ borderLeft: '1px solid rgba(13,13,15,0.1)' }}
              >
                <span
                  className="font-manga text-[#0d0d0f] opacity-25"
                  style={{ fontSize: 10, letterSpacing: '0.2em' }}
                >
                  VOL.01
                </span>
              </div>

              {/* CV button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga h-full flex items-center px-6 text-white transition-all duration-150"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  borderLeft: '3px solid #0d0d0f',
                  background: '#0d0d0f',
                  cursor: 'none',
                  boxShadow: 'inset -3px 0 0 rgba(255,255,255,0.05)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.background = '#0d0d0f'}
              >
                DOWNLOAD CV
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-4 h-full items-center justify-center"
              style={{ borderLeft: '3px solid #0d0d0f', cursor: 'none' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-[#0d0d0f] origin-center"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-[#0d0d0f]"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-[#0d0d0f] origin-center"
                transition={{ duration: 0.2 }}
              />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9989] flex flex-col"
            style={{ background: '#f0ebe0', borderTop: '3px solid #0d0d0f' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                onClick={() => handleNav(link.href)}
                className="font-manga text-[#0d0d0f] text-left px-10 py-6 flex items-center justify-between"
                style={{
                  fontSize: 'clamp(28px, 5vw, 40px)',
                  letterSpacing: '0.06em',
                  borderBottom: '2px solid rgba(13,13,15,0.1)',
                  cursor: 'none',
                }}
              >
                <span>{link.label.toUpperCase()}</span>
                <span
                  className="font-manga opacity-20"
                  style={{ fontSize: 13 }}
                >
                  0{i + 1}
                </span>
              </motion.button>
            ))}

            {/* Mobile footer */}
            <div
              className="mt-auto px-10 py-6 flex items-center justify-between"
              style={{ borderTop: '2px solid rgba(13,13,15,0.1)' }}
            >
              <span className="font-manga text-[#0d0d0f] opacity-25" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                VOL.01 · SHIVANSH
              </span>
              <a
                href="./Shivansh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga px-4 py-2 text-white"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  background: '#0d0d0f',
                  border: '2px solid #0d0d0f',
                  boxShadow: '3px 3px 0px rgba(13,13,15,0.2)',
                  cursor: 'none',
                }}
              >
                DOWNLOAD CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}