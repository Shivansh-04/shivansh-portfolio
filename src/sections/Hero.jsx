import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const PHOTO_SRC = "/hero.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const avatarY = useTransform(scrollY, [0, 500], [0, 40]);
  const buildingY = useTransform(scrollY, [0, 500], [0, -30]);
  const halftoneY = useTransform(scrollY, [0, 500], [0, 20]);

  const speedLinesRef = useRef(null);
  const titleRef = useRef(null);
  const panelBorderRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // ── 1. Speed lines draw outward ──
      if (speedLinesRef.current) {
        const lines = Array.from(
          speedLinesRef.current.querySelectorAll("line"),
        );
        if (lines.length > 0) {
          animate(lines, {
            strokeDashoffset: [1000, 0],
            ease: "easeOutExpo",
            duration: 800,
            delay: stagger(20, { start: 200 }),
          });
        }
      }

      // ── 2. SHIVANSH letter ink-stamp ──
      if (titleRef.current) {
        const letters = Array.from(
          titleRef.current.querySelectorAll(".manga-letter"),
        );
        if (letters.length > 0) {
          animate(letters, {
            scale: [1.4, 1],
            opacity: [0, 1],
            ease: "easeOutElastic(1, .5)",
            duration: 600,
            delay: stagger(60, { start: 400 }),
          });
        }
      }

      // ── 3. Panel border draw-on ──
      if (panelBorderRef.current) {
        animate(panelBorderRef.current, {
          clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
          ease: "easeInOutExpo",
          duration: 900,
          delay: 300,
        });
      }
    }, 100); // wait for DOM to fully render

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen paper-bg overflow-hidden"
      style={{ borderBottom: "3px solid #0d0d0f" }}
    >
      {/* ── Halftone dot texture ── */}
      <motion.div
  className="absolute inset-0 opacity-20"
  style={{
    backgroundImage: 'radial-gradient(circle, #0d0d0f 1px, transparent 1px)',
    backgroundSize: '10px 10px',
    y: halftoneY,
  }}
/>

      {/* ── Outer panel border ── */}
      <div
        ref={panelBorderRef}
        className="absolute inset-3 md:inset-6 pointer-events-none z-10"
        style={{
          border: "3px solid #0d0d0f",
          clipPath: "inset(0 100% 0 0)",
        }}
      />

      {/* ── TOP BAR — volume info ── */}
      <div
        className="absolute top-3 md:top-6 left-3 md:left-6 right-3 md:right-6 z-30 flex items-center justify-between px-6 py-3"
        style={{ borderBottom: "2px solid #0d0d0f", background: "#f0ebe0" }}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-manga text-[#0d0d0f]"
            style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.5 }}
          >
            VOL.01
          </span>
          <span
            className="w-px h-3 inline-block"
            style={{ background: "#0d0d0f", opacity: 0.2 }}
          />
          <span
            className="font-manga text-[#0d0d0f]"
            style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.5 }}
          >
            CHAPTER 01
          </span>
        </div>

        {/* Availability pill */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1"
          style={{ border: "2px solid #0d0d0f", background: "#0d0d0f" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
            style={{ background: "#4ade80" }}
          />
          <span
            className="font-manga text-white"
            style={{ fontSize: 10, letterSpacing: "0.2em" }}
          >
            AVAILABLE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="font-manga text-[#0d0d0f]"
            style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.5 }}
          >
            SHIVANSH
          </span>
          <span
            className="w-px h-3 inline-block"
            style={{ background: "#0d0d0f", opacity: 0.2 }}
          />
          <span
            className="font-manga text-[#0d0d0f]"
            style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.5 }}
          >
            PORTFOLIO
          </span>
        </div>
      </div>

      {/* ── MAIN LAYOUT — 3 panel grid like manga page ── */}
      <div
        className="relative z-20 w-full min-h-screen pt-20 pb-8 px-6 md:px-12 grid gap-0"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          paddingTop: "80px",
        }}
      >
        {/* PANEL 1 — Top left: Name + genre (spans 2 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative flex flex-col justify-between p-6 md:p-10"
          style={{
            gridColumn: "1 / 3",
            gridRow: "1",
            border: "3px solid #0d0d0f",
            borderRight: "1.5px solid #0d0d0f",
            background: "#f8f4ec",
            minHeight: "280px",
          }}
        >
          {/* Panel label */}
          <div className="flex items-center justify-between mb-4">
            <div
              style={{
                border: "1.5px solid #0d0d0f",
                padding: "2px 10px",
                background: "#0d0d0f",
                display: "inline-block",
              }}
            >
              <span
                className="font-manga  text-white"
                style={{ fontSize: 10, letterSpacing: "0.15em" }}
              >
                PANEL A
              </span>
            </div>
            <div className="px-3 py-1" style={{ background: "#0d0d0f" }}>
              <span
                className="font-manga text-white"
                style={{ fontSize: 10, letterSpacing: "0.18em" }}
              >
                FULL STACK · OPEN SOURCE
              </span>
            </div>
          </div>

          {/* SHIVANSH — full manga title */}
          <div className="flex-1 flex flex-col justify-center">
            <h1
              ref={titleRef}
              className="font-manga text-[#0d0d0f] leading-none"
              style={{
                fontSize: "clamp(60px, 9vw, 130px)",
                letterSpacing: "0.04em",
                WebkitTextStroke: "2px #0d0d0f",
                textShadow: "4px 4px 0px rgba(0,0,0,0.15)",
                lineHeight: 0.9,
              }}
            >
              {"SHIVANSH".split("").map((char, i) => (
                <span
                  key={i}
                  className="manga-letter inline-block"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-3 flex items-center gap-3"
            >
              <div
                className="h-px flex-shrink-0 w-8"
                style={{ background: "#0d0d0f" }}
              />
              <span
                className="font-display italic"
                style={{
                  fontSize: "clamp(13px, 1.6vw, 18px)",
                  color: "rgba(13,13,15,0.4)",
                  letterSpacing: "0.02em",
                }}
              >
                The Developer Chronicles
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-6 mb-4 mt-4"
          >
            {[
              { value: "3+", label: "Projects" },
              { value: "200+", label: "DSA" },
              { value: "MERN", label: "Stack" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="font-manga text-[#0d0d0f]"
                  style={{ fontSize: 22, lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-manga text-[#0d0d0f] opacity-40"
                  style={{ fontSize: 9, letterSpacing: "0.15em" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Bottom — tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="font-body mt-4"
            style={{
              fontSize: 14,
              color: "rgba(13,13,15,0.55)",
              lineHeight: 1.8,
              maxWidth: 420,
            }}
          >
            Building full-stack products that solve real problems — from Complex
            Problems to clean, fast web apps.
          </motion.p>
        </motion.div>

        {/* PANEL 2 — Top right: Character image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative overflow-hidden flex items-end justify-center"
          style={{
            gridColumn: "3",
            gridRow: "1 / 3",
            border: "3px solid #0d0d0f",
            borderLeft: "1.5px solid #0d0d0f",
            background: "#f0ebe0",
            minHeight: "100vh",
          }}
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4 z-10"
            style={{
              border: "1.5px solid #0d0d0f",
              padding: "2px 10px",
              background: "#0d0d0f",
            }}
          >
            <span
              className="font-manga  text-white"
              style={{ fontSize: 10, letterSpacing: "0.15em" }}
            >
              PANEL B
            </span>
          </div>

          {/* Halftone behind character */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0d0d0f 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />

          {/* Speed lines */}
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            ref={speedLinesRef}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1440 900"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", inset: 0 }}
            >
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (i / 32) * 360;
                const rad = (angle * Math.PI) / 180;
                const cx = 1080;
                const cy = 450;
                const len = 1200;
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + Math.cos(rad) * len}
                    y2={cy + Math.sin(rad) * len}
                    stroke="rgba(13,13,15,0.06)"
                    strokeWidth="1"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                  />
                );
              })}
            </svg>
          </div>

          {/* BUILDING!! action word */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            style={{ y: buildingY }}
            transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="absolute top-6 right-4 z-20"
          >
            <span
              className="font-manga text-[#0d0d0f] block"
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                WebkitTextStroke: "1.5px #0d0d0f",
                textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
                letterSpacing: "0.06em",
              }}
            >
              BUILDING!!
            </span>
          </motion.div>

          {/* Character */}
          <motion.img
            src={PHOTO_SRC}
            alt="Shivansh manga avatar"
            className="relative z-10 bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              y: avatarY,
              willChange: "transform",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center bottom",
              position: "absolute",
              inset: 0,
            }}
          />

          {/* Bottom metadata */}
          <div className="absolute bottom-3 right-4 z-20 flex flex-col items-end gap-0.5">
            <span
              className="font-manga text-[#0d0d0f] opacity-20"
              style={{ fontSize: 9, letterSpacing: "0.15em" }}
            >
              Shivansh · WORLD
            </span>
          </div>
        </motion.div>

        {/* PANEL 3 — Bottom left: Stats table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
          style={{
            gridColumn: "1",
            gridRow: "2",
            minHeight: "200px",
            border: "3px solid #0d0d0f",
            borderRight: "1.5px solid #0d0d0f",
            borderTop: "1.5px solid #0d0d0f",
            background: "#f8f4ec",
          }}
        >
          {/* Panel label */}
          <div
            className="absolute top-3 left-3"
            style={{
              border: "1.5px solid #0d0d0f",
              padding: "2px 10px",
              background: "#0d0d0f",
            }}
          >
            <span
              className="font-manga text-white"
              style={{ fontSize: 10, letterSpacing: "0.15em" }}
            >
              PANEL C
            </span>
          </div>

          <div className="pt-10">
            {[
              { label: "CLASS", value: "Full Stack Dev" },
              { label: "STACK", value: "MERN" },
              { label: "DSA", value: "200+ Problems" },
              { label: "STATUS", value: "Open to Work" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center"
                style={{ borderTop: "1px solid rgba(13,13,15,0.1)" }}
              >
                <div
                  className="px-4 py-3 flex-shrink-0"
                  style={{
                    borderRight: "1px solid rgba(13,13,15,0.1)",
                    width: 80,
                    background: "rgba(13,13,15,0.04)",
                  }}
                >
                  <span
                    className="font-manga text-[#0d0d0f] opacity-50"
                    style={{ fontSize: 10, letterSpacing: "0.12em" }}
                  >
                    {row.label}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <span
                    className="font-manga text-[#0d0d0f]"
                    style={{ fontSize: 12, letterSpacing: "0.08em" }}
                  >
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PANEL 4 — Bottom middle: CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="relative flex flex-col items-start justify-center gap-4 p-6 md:p-8"
          style={{
            gridColumn: "2",
            gridRow: "2",
            minHeight: "200px",
            border: "3px solid #0d0d0f",
            borderLeft: "1.5px solid #0d0d0f",
            borderRight: "1.5px solid #0d0d0f",
            borderTop: "1.5px solid #0d0d0f",
            background: "#f8f4ec",
          }}
        >
          {/* Panel label */}
          <div
            className="absolute top-3 left-3"
            style={{
              border: "1.5px solid #0d0d0f",
              padding: "2px 10px",
              background: "#0d0d0f",
            }}
          >
            <span
              className="font-manga text-white"
              style={{ fontSize: 10, letterSpacing: "0.15em" }}
            >
              PANEL D
            </span>
          </div>

          <div className="pt-6 flex flex-col gap-3 w-full">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-manga w-full py-3 text-white bg-[#0d0d0f] transition-all duration-150 active:scale-95"
              style={{
                fontSize: 14,
                letterSpacing: "0.15em",
                border: "2.5px solid #0d0d0f",
                boxShadow: "4px 4px 0px #0d0d0f",
              }}
            >
              VIEW WORK
            </button>
            <a
              href="./Shivansh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-manga w-full py-3 text-[#0d0d0f] text-center transition-all duration-150 active:scale-95 block"
              style={{
                fontSize: 14,
                letterSpacing: "0.15em",
                border: "2.5px solid #0d0d0f",
                boxShadow: "4px 4px 0px rgba(13,13,15,0.3)",
                background: "transparent",
              }}
            >
              RESUME
            </a>

            {/* Scroll cue */}
            <div className="flex items-center gap-2 mt-2">
              <div
                className="flex-1 h-px"
                style={{ background: "#0d0d0f", opacity: 0.15 }}
              />
              <span
                className="font-manga text-[#0d0d0f] opacity-30"
                style={{ fontSize: 9, letterSpacing: "0.2em" }}
              >
                NEXT PAGE ↓
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "#0d0d0f", opacity: 0.15 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .paper-bg {
          background-color: #f0ebe0;
          color: #0d0d0f;
        }
        .speed-lines {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Cg stroke='rgba(13,13,15,0.08)' stroke-width='1'%3E%3Cline x1='300' y1='300' x2='0' y2='0'/%3E%3Cline x1='300' y1='300' x2='150' y2='0'/%3E%3Cline x1='300' y1='300' x2='300' y2='0'/%3E%3Cline x1='300' y1='300' x2='450' y2='0'/%3E%3Cline x1='300' y1='300' x2='600' y2='0'/%3E%3Cline x1='300' y1='300' x2='600' y2='150'/%3E%3Cline x1='300' y1='300' x2='600' y2='300'/%3E%3Cline x1='300' y1='300' x2='600' y2='450'/%3E%3Cline x1='300' y1='300' x2='600' y2='600'/%3E%3Cline x1='300' y1='300' x2='450' y2='600'/%3E%3Cline x1='300' y1='300' x2='300' y2='600'/%3E%3Cline x1='300' y1='300' x2='150' y2='600'/%3E%3Cline x1='300' y1='300' x2='0' y2='600'/%3E%3Cline x1='300' y1='300' x2='0' y2='450'/%3E%3Cline x1='300' y1='300' x2='0' y2='300'/%3E%3Cline x1='300' y1='300' x2='0' y2='150'/%3E%3C/g%3E%3C/svg%3E");
          background-size: cover;
          background-position: center;
        }
        .font-manga { font-family: 'Bangers', cursive; letter-spacing: 0.05em; }
        .manga-action {
          font-family: 'Bangers', cursive;
          letter-spacing: 0.08em;
          -webkit-text-stroke: 2px #0d0d0f;
          text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
        }
        .animate-pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
