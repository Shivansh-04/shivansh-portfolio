import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger hook with automatic cleanup.
 *
 * @param {Function} animationFn - Receives (gsap, ScrollTrigger, container) — set up your animations here
 * @param {Object} options - { scope: ref (optional), deps: [] }
 * @returns {{ containerRef }} - Ref to attach to your container element
 */
export function useGSAPScroll(animationFn, options = {}) {
  const containerRef = useRef(null);
  const { deps = [] } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      animationFn(gsap, ScrollTrigger, containerRef.current);
    },
    {
      scope: containerRef,
      dependencies: deps,
    }
  );

  return { containerRef };
}

/**
 * Create a simple parallax effect on an element.
 *
 * @param {Object} options - { speed: number, direction: 'y'|'x', trigger: string }
 * @returns {{ ref, containerRef }}
 */
export function useParallax(options = {}) {
  const { speed = 50, direction = "y", scrub = true } = options;
  const elementRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    const trigger = triggerRef.current || elementRef.current;

    gsap.to(elementRef.current, {
      [direction]: speed,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: scrub === true ? 0.5 : scrub,
      },
    });
  }, { scope: triggerRef });

  return { elementRef, triggerRef };
}
