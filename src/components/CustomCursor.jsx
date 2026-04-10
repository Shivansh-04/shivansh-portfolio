import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      animId = requestAnimationFrame(animateRing)
    }

    const onMouseEnterClickable = () => document.body.classList.add('cursor-hover')
    const onMouseLeaveClickable = () => document.body.classList.remove('cursor-hover')

    document.addEventListener('mousemove', onMouseMove)
    animId = requestAnimationFrame(animateRing)

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterClickable)
        el.addEventListener('mouseleave', onMouseLeaveClickable)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return null
}
