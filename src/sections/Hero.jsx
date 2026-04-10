import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

const TAGLINES = [
  "MERN Stack Developer building scalable apps.",
  "DSA-focused problem solver.",
  "Turning ideas into real-world products.",
  "Focused on performance, logic, and clean code.",
];

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineVisible(false);
      setTimeout(() => {
        setTaglineIndex((i) => (i + 1) % TAGLINES.length);
        setTaglineVisible(true);
      }, 400);
    }, 2900);
    return () => clearInterval(interval);
  }, []);
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 500], ["50%", "80%"]);

  const name = "Shivansh";

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle radial gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 60% 50%, rgba(80,60,255,0.06) 0%, transparent 70%)`,
          backgroundPositionY: glowY,
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-0">
        {/* Left — Text */}
        <div className="flex-1 flex flex-col">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-label mb-4"
          >
            Full Stack Developer
          </motion.span>

          {/* Name — character by character */}
          <h1
            className="font-display font-black text-white leading-none mb-4 overflow-hidden"
            style={{ fontSize: "clamp(56px, 9vw, 96px)" }}
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Rotating tagline */}
          <div className="h-8 mb-8 overflow-hidden">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: taglineVisible ? 1 : 0,
                y: taglineVisible ? 0 : -8,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-lg font-body font-light"
              style={{ color: "var(--muted)", letterSpacing: "0.02em" }}
            >
              {TAGLINES[taglineIndex]}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="flex items-center gap-6 mb-8"
          >
            {[
              { value: "3+", label: "Projects Shipped" },
              { value: "250+", label: "DSA Problems" },
              { value: "MERN", label: "Core Stack" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="font-display font-bold text-white"
                  style={{ fontSize: 20, lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-body text-[10px] uppercase tracking-wider mt-0.5"
                  style={{ color: "var(--muted)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-sweep px-7 py-3 text-[13px] uppercase tracking-[0.12em] font-medium bg-white text-black rounded-sm font-body"
            >
              View Work
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep px-7 py-3 text-[13px] uppercase tracking-[0.12em] font-medium text-white rounded-sm font-body"
              style={{ border: "1px solid rgba(255,255,255,0.3)" }}
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right — Photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ willChange: "transform" }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <div className="animate-floatee" style={{ willChange: "transform" }}>
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(240px, 30vw, 340px)",
                height: "clamp(280px, 36vw, 400px)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                transform: "translateZ(0)", // ✅ important
                backfaceVisibility: "hidden",
              }}
            >
              {/* Placeholder — replace src with real photo */}
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3"
                style={{ color: "var(--muted)" }}
              >
                <img
                  src="/src/assets/Shivansh.png"
                  alt="Shivansh"
                  className="w-full h-full object-cover"
                  style={{
                    transform: "translateZ(0)", // ✅ prevents flicker
                  }}
                />
                {/* Corner detail — adds editorial magazine feel */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  }}
                >
                  <span
                    className="font-body text-[10px] uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Ghaziabad, IN
                  </span>
                  <span
                    className="font-body text-[10px] uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    © 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em] font-body"
          style={{ color: "var(--muted)" }}
        >
          scroll
        </span>
        <div
          className="relative w-px h-10 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="absolute top-0 left-0 w-full bg-white"
            style={{
              height: "40%",
              // animation: "scrollLine 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
