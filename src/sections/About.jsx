import { motion } from "framer-motion";

const FUN_FACTS = [
  { icon: "★", label: "Competitive Programmer" },
  { icon: "◈", label: "Spiritual Traveler" },
  { icon: "◉", label: "Chai over Coffee" },
  { icon: "◎", label: "GSoC Aspirant" },
];

export default function About() {
  return (
    <div
      id="about"
      className="relative w-full paper-bg"
      style={{
        borderTop: "3px solid #0d0d0f",
        borderBottom: "3px solid #0d0d0f",
      }}
    >
      {/* Chapter title card */}
      <div
        className="w-full flex items-center gap-0 overflow-hidden"
        style={{ borderBottom: "3px solid #0d0d0f" }}
      >
        <div
          className="px-8 py-4 flex items-center gap-4"
          style={{
            borderRight: "3px solid #0d0d0f",
            background: "#0d0d0f",
            minWidth: "fit-content",
          }}
        >
          <span
            className="font-manga text-white tracking-widest"
            style={{ fontSize: 13 }}
          >
            CHAPTER 02
          </span>
        </div>
        <div className="flex-1 px-8 py-4 overflow-hidden">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-manga tracking-wide"
            style={{
              fontSize: "clamp(24px, 4vw, 42px)",
              color: "#0d0d0f",
              whiteSpace: "nowrap",
            }}
          >
            THE DEVELOPER
          </motion.h2>
        </div>
      </div>

      {/* Two-panel manga layout */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: "70vh" }}>
        {/* Panel 1 — Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex-shrink-0 flex items-end justify-center overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRight: "3px solid #0d0d0f",
            background: "#f8f4ec",
            minHeight: "420px",
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
              className="font-manga text-white"
              style={{ fontSize: 10, letterSpacing: "0.15em" }}
            >
              PANEL A
            </span>
          </div>

          {/* Halftone dot bg */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0d0d0f 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Character image */}
          <img
            src="/about-character.png"
            alt="About — manga character"
            className="relative z-10 w-full object-contain object-bottom"
            style={{ maxHeight: "100%", minHeight: "400px" }}
          />

          {/* Speech bubble — positioned top right of image */}
          <div className="absolute top-4 right-3 z-20">
            <div className="speech-bubble" style={{ maxWidth: 140 }}>
              <p
                className="font-manga text-[#0d0d0f]"
                style={{ fontSize: 13, lineHeight: 1.4 }}
              >
                Let's build something.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Panel 2 — Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex-1 flex flex-col p-8 md:p-12"
          style={{ background: "#f0ebe0", gap: 24 }}
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
              className="font-manga text-white"
              style={{ fontSize: 10, letterSpacing: "0.15em" }}
            >
              PANEL B
            </span>
          </div>

          <div className="flex flex-col gap-8 pt-8">
            {/* Section label */}
            <div>
              <span
                className="font-manga text-[#0d0d0f] opacity-30"
                style={{ fontSize: 11, letterSpacing: "0.2em" }}
              >
                001 — ABOUT
              </span>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-4" style={{ maxWidth: 520 }}>
              <p
                className="font-body"
                style={{
                  color: "rgba(13,13,15,0.75)",
                  lineHeight: 1.85,
                  fontSize: 15,
                }}
              >
                I'm Shivansh, a Full Stack Developer and CS student at RKGIT,
                Ghaziabad. I build production-grade web applications with the
                MERN stack and actively contribute to open source.
              </p>
              <p
                className="font-body"
                style={{
                  color: "rgba(13,13,15,0.5)",
                  lineHeight: 1.85,
                  fontSize: 15,
                }}
              >
                Currently preparing for GSoC while sharpening my competitive
                programming skills on LeetCode and CodeChef.
              </p>
            </div>

            {/* Currently working on — ink panel style */}
            <div className="ink-panel p-5" style={{ background: "#0d0d0f" }}>
              <span
                className="font-manga text-white opacity-50 block mb-2"
                style={{ fontSize: 10, letterSpacing: "0.2em" }}
              >
                CURRENTLY WORKING ON
              </span>
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse-dot"
                  style={{ background: "#4ade80" }}
                />
                <p className="font-body text-white text-[14px] leading-snug">
                  SurakshaSetu — AI-powered crime reporting platform
                </p>
              </div>
            </div>

            {/* Fun fact chips */}
            <div className="flex flex-wrap gap-2">
              {FUN_FACTS.map((fact, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-3 py-1.5 font-body text-[12px]"
                  style={{
                    border: "1.5px solid #0d0d0f",
                    background: "white",
                    color: "#0d0d0f",
                    boxShadow: "2px 2px 0px #0d0d0f",
                    cursor: "default",
                  }}
                >
                  <span>{fact.icon}</span>
                  <span className="font-medium">{fact.label}</span>
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom-right panel decoration */}
          <div
            className="absolute bottom-4 right-4 font-manga opacity-10"
            style={{ fontSize: 11, color: "#0d0d0f", letterSpacing: "0.1em" }}
          >
            PANEL B · 02
          </div>
        </motion.div>
      </div>
    </div>
  );
}
