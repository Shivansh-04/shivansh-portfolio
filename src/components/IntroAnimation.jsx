import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate, stagger } from "animejs";

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState("speedlines"); // speedlines → stamp → ink → done
  const linesRef = useRef(null);
  const inkRef = useRef(null);

  useEffect(() => {
    // Phase 1 — Speed lines explode outward
    const timeout1 = setTimeout(() => {
      if (linesRef.current) {
        const lines = Array.from(linesRef.current.querySelectorAll("line"));
        if (lines.length > 0) {
          animate(lines, {
            strokeDashoffset: [800, 0],
            ease: "easeOutExpo",
            duration: 600,
            delay: stagger(10, { start: 0 }),
          });
        }
      }
    }, 100);

    // Phase 2 — S. stamp appears
    const timeout2 = setTimeout(() => {
      setPhase("stamp");
    }, 1200);
    const timeout3 = setTimeout(() => {
      setPhase("ink");
    }, 2400);
    const timeout4 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden"
          style={{ background: "#0d0d0f" }}
        >
          {/* ── Phase 1: Speed lines ── */}
          <div ref={linesRef} className="absolute inset-0 pointer-events-none">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * 360;
                const rad = (angle * Math.PI) / 180;
                const cx = 720;
                const cy = 450;
                const len = 1200;
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + Math.cos(rad) * len}
                    y2={cy + Math.sin(rad) * len}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={i % 4 === 0 ? "2" : "1"}
                    strokeDasharray="1200"
                    strokeDashoffset="800"
                  />
                );
              })}
            </svg>
          </div>

          {/* ── Phase 2: S. stamp ── */}
          <AnimatePresence>
            {(phase === "stamp" || phase === "ink") && (
              <motion.div
                initial={{ scale: 2.5, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  duration: 0.5,
                }}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                {/* Outer ring */}
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    border: "4px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxShadow:
                      "0 0 60px rgba(255,255,255,0.15), inset 0 0 30px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Inner ring */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 8,
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  />

                  {/* S letter */}
                  <span
                    className="font-manga text-white"
                    style={{
                      fontSize: 96,
                      lineHeight: 1,
                      WebkitTextStroke: "2px white",
                      textShadow: "4px 4px 0px rgba(0,0,0,0.5)",
                    }}
                  >
                    S
                  </span>
                </div>

                {/* Impact lines around stamp */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const r = 100;
                    return (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: 20,
                          height: 2,
                          background: "rgba(255,255,255,0.3)",
                          transformOrigin: "left center",
                          transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px) rotate(${angle}deg)`,
                        }}
                      />
                    );
                  })}
                </motion.div>

                {/* Subtitle */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="font-manga text-white"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.4em",
                    opacity: 0.4,
                    marginTop: 16,
                  }}
                >
                  SHIVANSH · PORTFOLIO
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Phase 3: Ink spreads ── */}
          <AnimatePresence>
            {phase === "ink" && (
              <>
                {/* Ink blobs spreading from corners */}
                {[
                  { top: 0, left: 0, origin: "0% 0%" },
                  { top: 0, right: 0, origin: "100% 0%" },
                  { bottom: 0, left: 0, origin: "0% 100%" },
                  { bottom: 0, right: 0, origin: "100% 100%" },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 8, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.04,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      position: "absolute",
                      width: 300,
                      height: 300,
                      borderRadius: "50%",
                      background: "#f0ebe0",
                      transformOrigin: pos.origin,
                      ...pos,
                    }}
                  />
                ))}

                {/* Center ink spread */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 12, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                    background: "#f0ebe0",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 20,
                  }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
