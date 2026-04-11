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
            filter: 'drop-shadow(1px 1px 0px rgba(13,13,15,0.3))',
          }}
        >
          {/* Pen nib shape */}
          <path
            d="M12 2 L18 10 L12 22 L6 10 Z"
            fill={isHovering ? '#0d0d0f' : '#0d0d0f'}
            stroke="white"
            strokeWidth={isHovering ? '1.5' : '1'}
          />
          {/* Nib center line */}
          <line
            x1="12" y1="6"
            x2="12" y2="18"
            stroke="white"
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Nib tip dot */}
          <circle
            cx="12" cy="21"
            r={isHovering ? '2' : '1.5'}
            fill="white"
          />
          {/* Ink drop on hover */}
          {isHovering && (
            <circle
              cx="12" cy="21"
              r="3.5"
              fill="none"
              stroke="#0d0d0f"
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
            background: '#0d0d0f',
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

// ---------------------------------------------------------------
// import { useEffect, useRef, useState } from 'react'

// export default function CustomCursor() {
//   const cursorRef = useRef(null)
//   const bubbleRef = useRef(null)
//   const mousePos = useRef({ x: -100, y: -100 })
//   const animRef = useRef(null)
//   const [isHovering, setIsHovering] = useState(false)

//   useEffect(() => {
//     const onMouseMove = (e) => {
//       mousePos.current = { x: e.clientX, y: e.clientY }
//     }

//     const onEnter = () => setIsHovering(true)
//     const onLeave = () => setIsHovering(false)

//     document.addEventListener('mousemove', onMouseMove, { passive: true })

//     const attach = () => {
//       document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
//         el.addEventListener('mouseenter', onEnter)
//         el.addEventListener('mouseleave', onLeave)
//       })
//     }

//     attach()
//     const observer = new MutationObserver(attach)
//     observer.observe(document.body, { childList: true, subtree: true })

//     const animate = () => {
//       const { x, y } = mousePos.current
//       if (cursorRef.current) {
//         cursorRef.current.style.left = x + 'px'
//         cursorRef.current.style.top = y + 'px'
//       }
//       animRef.current = requestAnimationFrame(animate)
//     }

//     animRef.current = requestAnimationFrame(animate)

//     return () => {
//       document.removeEventListener('mousemove', onMouseMove)
//       cancelAnimationFrame(animRef.current)
//       observer.disconnect()
//     }
//   }, [])

//   return (
//     <>
//       <div
//         ref={cursorRef}
//         style={{
//           position: 'fixed',
//           pointerEvents: 'none',
//           zIndex: 999999,
//           transform: 'translate(-50%, -50%)',
//           willChange: 'left, top',
//         }}
//       >
//         {/* Base dot — always visible */}
//         <div
//           style={{
//             width: 10,
//             height: 10,
//             borderRadius: '50%',
//             background: '#0d0d0f',
//             border: '2px solid white',
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             transition: 'transform 0.15s ease',
//             boxShadow: '1px 1px 0px rgba(13,13,15,0.3)',
//           }}
//         />

//         {/* Speech bubble — appears on hover */}
//         {isHovering && (
//           <div
//             ref={bubbleRef}
//             style={{
//               position: 'absolute',
//               bottom: 14,
//               left: 10,
//               background: 'white',
//               border: '2px solid #0d0d0f',
//               borderRadius: '10px 10px 10px 2px',
//               padding: '4px 8px',
//               whiteSpace: 'nowrap',
//               boxShadow: '2px 2px 0px #0d0d0f',
//               animation: 'bubblePop 0.15s ease forwards',
//             }}
//           >
//             <span
//               style={{
//                 fontFamily: 'Bangers, cursive',
//                 fontSize: 11,
//                 letterSpacing: '0.1em',
//                 color: '#0d0d0f',
//               }}
//             >
//               ...
//             </span>
//             {/* Bubble tail */}
//             <div style={{
//               position: 'absolute',
//               bottom: -7,
//               left: 4,
//               width: 0,
//               height: 0,
//               borderLeft: '5px solid transparent',
//               borderRight: '3px solid transparent',
//               borderTop: '7px solid #0d0d0f',
//             }} />
//             <div style={{
//               position: 'absolute',
//               bottom: -4,
//               left: 5,
//               width: 0,
//               height: 0,
//               borderLeft: '4px solid transparent',
//               borderRight: '2px solid transparent',
//               borderTop: '5px solid white',
//               zIndex: 1,
//             }} />
//           </div>
//         )}
//       </div>

//       <style>{`
//         *, *::before, *::after { cursor: none !important; }
//         @keyframes bubblePop {
//           0% { transform: scale(0.5); opacity: 0; }
//           70% { transform: scale(1.1); opacity: 1; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//       `}</style>
//     </>
//   )
// }