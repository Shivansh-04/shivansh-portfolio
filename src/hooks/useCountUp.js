import { useEffect, useState } from 'react'

export function useCountUp(target, duration = 1500, inView = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime = null
    const startValue = 0
    const endValue = parseInt(target)

    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOut(progress)
      setCount(Math.floor(startValue + (endValue - startValue) * easedProgress))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}
