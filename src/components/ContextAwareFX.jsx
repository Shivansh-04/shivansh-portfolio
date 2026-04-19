import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate, stagger } from "animejs";

const SECTION_LABELS = {
  hero: "OPENING SPREAD",
  about: "ORIGIN STORY",
  skills: "STAT SHIFT",
  projects: "BUILD ARC",
  opensource: "QUEST LOG",
  achievements: "BADGE UNLOCK",
  github: "BATTLE RECORD",
  contact: "FINAL TRANSMISSION",
};

function getSectionId(node) {
  let current = node;
  while (current && current !== document.body) {
    if (current.id) return current.id;
    current = current.parentElement;
  }
  return "";
}

function getLabel(target) {
  const explicit = target.getAttribute("data-fx-label");
  if (explicit) return explicit;

  const sectionId = getSectionId(target);
  if (SECTION_LABELS[sectionId]) return SECTION_LABELS[sectionId];

  if (target.tagName === "A") return "OPEN LINK";
  if (target.tagName === "BUTTON") return "PANEL ACTION";
  return "INTERACT";
}

export default function ContextAwareFX() {
  const [hoverFx, setHoverFx] = useState(null);
  const [burstFx, setBurstFx] = useState(null);
  const burstRef = useRef(null);
  const burstIdRef = useRef(0);

  useEffect(() => {
    const onPointerMove = (event) => {
      const target = event.target.closest("button, a, [data-fx]");
      if (!target) {
        setHoverFx(null);
        return;
      }

      const rect = target.getBoundingClientRect();
      setHoverFx({
        x: rect.left + rect.width / 2,
        y: rect.top - 14,
        label: getLabel(target),
      });
    };

    const onPointerLeave = (event) => {
      const related = event.relatedTarget?.closest?.("button, a, [data-fx]");
      if (!related) setHoverFx(null);
    };

    const onPointerDown = (event) => {
      const target = event.target.closest("button, a, [data-fx]");
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const nextId = burstIdRef.current + 1;
      burstIdRef.current = nextId;
      setBurstFx({
        id: nextId,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, true);
    document.addEventListener("pointerdown", onPointerDown, true);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  useEffect(() => {
    if (!burstFx || !burstRef.current) return;

    const lines = Array.from(burstRef.current.querySelectorAll("line"));
    const ring = burstRef.current.querySelector(".fx-ring");
    const dot = burstRef.current.querySelector(".fx-dot");

    if (lines.length) {
      animate(lines, {
        strokeDashoffset: [80, 0],
        opacity: [0.85, 0],
        ease: "easeOutExpo",
        duration: 420,
        delay: stagger(12, { start: 0 }),
      });
    }

    if (ring) {
      animate(ring, {
        scale: [0.4, 1.25],
        opacity: [0.65, 0],
        ease: "easeOutExpo",
        duration: 520,
      });
    }

    if (dot) {
      animate(dot, {
        scale: [0.6, 1.4, 0],
        opacity: [0.85, 0.5, 0],
        ease: "easeOutExpo",
        duration: 420,
      });
    }

    const timeout = setTimeout(() => setBurstFx(null), 520);
    return () => clearTimeout(timeout);
  }, [burstFx]);

  return (
    <>
      <AnimatePresence>
        {hoverFx && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.14 }}
            className="pointer-events-none fixed z-[99996]"
            style={{
              left: hoverFx.x,
              top: hoverFx.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div
              className="px-3 py-1"
              style={{
                border: "1.5px solid #0d0d0f",
                background: "#f0ebe0",
                boxShadow: "3px 3px 0px rgba(13,13,15,0.12)",
              }}
            >
              <span
                className="font-manga text-[#0d0d0f]"
                style={{ fontSize: 9, letterSpacing: "0.18em" }}
              >
                {hoverFx.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {burstFx && (
          <motion.div
            key={burstFx.id}
            ref={burstRef}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed z-[99995]"
            style={{
              left: burstFx.x,
              top: burstFx.y,
              width: 120,
              height: 120,
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i / 10) * 360;
                const rad = (angle * Math.PI) / 180;
                const cx = 60;
                const cy = 60;
                const len = 48;
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + Math.cos(rad) * len}
                    y2={cy + Math.sin(rad) * len}
                    stroke="rgba(13,13,15,0.7)"
                    strokeWidth={i % 3 === 0 ? "2" : "1"}
                    strokeDasharray="80"
                    strokeDashoffset="80"
                  />
                );
              })}
            </svg>
            <div
              className="fx-ring absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(13,13,15,0.35)",
                transform: "scale(0.4)",
                opacity: 0.6,
              }}
            />
            <div
              className="fx-dot absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
              style={{
                background: "#0d0d0f",
                transform: "translate(-50%, -50%) scale(0.6)",
                opacity: 0.85,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
