import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, Loader, Link } from 'lucide-react'
import { SiGithub, SiLeetcode, SiCodechef } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'

const SOCIAL_LINKS = [
  { Icon: SiGithub, href: 'https://github.com/shivansh', label: 'GitHub' },
  { Icon: Link, href: 'https://linkedin.com/in/shivansh', label: 'LinkedIn' },
  { Icon: Mail, href: 'mailto:shivansh@email.com', label: 'Email' },
  { Icon: SiLeetcode, href: 'https://leetcode.com/shivansh', label: 'LeetCode' },
  { Icon: SiCodechef, href: 'https://codechef.com/users/shivansh', label: 'CodeChef' },
]

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

function FloatingLabelInput({ label, type = 'text', multiline = false, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  const baseStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 8,
    padding: multiline ? '24px 16px 12px' : '22px 16px 8px',
    color: 'white',
    fontSize: 15,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 0.3s ease',
    lineHeight: 1.6,
  }

  return (
    <div className="relative">
      <motion.label
        animate={lifted ? { y: -10, fontSize: '10px', color: 'rgba(255,255,255,0.6)' } : { y: 0, fontSize: '14px', color: 'var(--muted)' }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-4 pointer-events-none font-body uppercase tracking-wider origin-left"
        style={{ zIndex: 1 }}
      >
        {label}
      </motion.label>
      {multiline ? (
        <textarea
          rows={4}
          style={baseStyle}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          style={baseStyle}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | sent

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    setTimeout(() => setStatus('sent'), 1800)
  }

  const updateField = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <SectionWrapper id="contact">
      {/* Cinematic Heading */}
      <div className="mb-12">
        <span className="section-label">005 — Contact</span>
        <h2 className="font-display font-black text-white leading-[1.05]" style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}>
          {["Let's", 'build', 'something.'].map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-body text-base mt-4 mb-5"
          style={{ color: 'var(--muted)', lineHeight: 1.7 }}
        >
          Open to internships, freelance projects, and GSoC collaborations.
        </motion.p>

        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-[12px] uppercase tracking-wider"
          style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(240,240,240,0.7)' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: '#4ade80' }} />
          Available for opportunities
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-xl flex flex-col gap-4 mb-10"
      >
        <FloatingLabelInput label="Name" value={form.name} onChange={updateField('name')} />
        <FloatingLabelInput label="Email" type="email" value={form.email} onChange={updateField('email')} />
        <FloatingLabelInput label="Message" multiline value={form.message} onChange={updateField('message')} />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={status !== 'idle'}
          className="btn-sweep btn-sweep-dark relative w-full py-4 text-[13px] uppercase tracking-[0.15em] font-body font-medium rounded-sm overflow-hidden"
          style={{
            background: status === 'sent' ? 'rgba(74,222,128,0.15)' : 'white',
            color: status === 'sent' ? '#4ade80' : 'black',
            border: status === 'sent' ? '1px solid rgba(74,222,128,0.3)' : 'none',
            transition: 'background 0.4s ease, color 0.4s ease',
          }}
        >
          {status === 'idle' && 'Send Message'}
          {status === 'loading' && (
            <span className="flex items-center justify-center gap-2">
              <Loader size={14} className="animate-spin" /> Sending...
            </span>
          )}
          {status === 'sent' && (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle size={14} /> Message Sent ✓
            </span>
          )}
        </button>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex gap-3 mb-16"
      >
        {SOCIAL_LINKS.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
          >
            <motion.span whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
              <Icon size={16} style={{ color: 'rgba(255,255,255,0.5)' }} className="group-hover:text-white transition-colors duration-300" />
            </motion.span>
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="font-body text-[12px] text-center uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          Designed & Built by Shivansh · 2026
        </p>
      </div>
    </SectionWrapper>
  )
}
