import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

export function useAnime(animationFn, deps = []) {
  useEffect(() => {
    const anim = animationFn(animate, stagger)
    return () => {
      if (anim && anim.pause) anim.pause()
    }
  }, deps)
}