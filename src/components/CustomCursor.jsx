import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 6

export default function CustomCursor() {
  const nibRef = useRef(null)
  const trailRefs = useRef([])
  const mousePos = useRef({ x: -100, y: -100 })
  const prevPos = useRef({ x: -100, y: -100 })
  const animRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const onMouseMove = (e) => {
      const dx = e.clientX - prevPos.current.x
      const dy = e.clientY - prevPos.current.y
      const newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      setAngle(newAngle)
      prevPos.current = { x: e.clientX, y: e.clientY }
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    document.addEventListener('mousemove', onMouseMove, { passive: true })

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    // Trail positions history
    const trail = Array(TRAIL_LENGTH).fill({ x: -100, y: -100 })
    let trailIndex = 0

    const animate = () => {
      const { x, y } = mousePos.current

      // Update nib position
      if (nibRef.current) {
        nibRef.current.style.left = x + 'px'
        nibRef.current.style.top = y + 'px'
      }

      // Update trail
      trail[trailIndex] = { x, y }
      trailIndex = (trailIndex + 1) % TRAIL_LENGTH

      trailRefs.current.forEach((el, i) => {
        if (!el) return
        const trailPos = trail[(trailIndex - i - 1 + TRAIL_LENGTH) % TRAIL_LENGTH]
        if (trailPos) {
          el.style.left = trailPos.x + 'px'
          el.style.top = trailPos.y + 'px'
          el.style.opacity = ((TRAIL_LENGTH - i) / TRAIL_LENGTH) * 0.5
          const size = Math.max(2, 5 - i * 0.7)
          el.style.width = size + 'px'
          el.style.height = size + 'px'
        }
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Ink pen nib SVG cursor */}
      <div
        ref={nibRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          transition: 'transform 0.08s ease',
          willChange: 'transform, left, top',
        }}
      >
        <svg
          width={isHovering ? 28 : 22}
          height={isHovering ? 28 : 22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition: 'width 0.2s ease, height 0.2s ease',
            filter: 'drop-shadow(1px 1px 0px var(--shadow))',
          }}
        >
          {/* Pen nib shape */}
          <path
            d="M12 2 L18 10 L12 22 L6 10 Z"
            style={{ fill: 'var(--text)', stroke: 'var(--bg)' }}
            strokeWidth={isHovering ? '1.5' : '1'}
          />
          {/* Nib center line */}
          <line
            x1="12" y1="6"
            x2="12" y2="18"
            style={{ stroke: 'var(--bg)' }}
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Nib tip dot */}
          <circle
            cx="12" cy="21"
            r={isHovering ? '2' : '1.5'}
            style={{ fill: 'var(--bg)' }}
          />
          {/* Ink drop on hover */}
          {isHovering && (
            <circle
              cx="12" cy="21"
              r="3.5"
              fill="none"
              style={{ stroke: 'var(--text)' }}
              strokeWidth="1"
              opacity="0.4"
            />
          )}
        </svg>
      </div>

      {/* Ink dot trail */}
      {Array(TRAIL_LENGTH).fill(null).map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 999998,
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--text)',
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top, opacity',
            transition: 'opacity 0.1s ease',
          }}
        />
      ))}

      {/* Hide default cursor globally */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>
    </>
  )
}
