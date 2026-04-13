import { motion } from "framer-motion";
import { Trophy, GitBranch } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";

const STATS = [
  {
    label: "DSA FOCUS",
    value: 200,
    suffix: "+",
    sub: "Problems across LeetCode & CodeChef",
    panel: "A",
  },
  {
    label: "FULL STACK",
    value: 3,
    suffix: "x",
    sub: "Production-grade MERN projects shipped",
    panel: "B",
  },
  {
    label: "AI INTEGRATION",
    value: 2,
    suffix: "x",
    sub: "Projects with real AI/ML pipelines",
    panel: "C",
  },
];

const HACKATHONS = [
  { name: "Smart India Hackathon", role: "Built & Presented", year: "2024" },
  { name: "Binary Hacks 2.0", role: "Competed", year: "2024" },
];

function StatCard({ label, value, suffix, sub, panel, index }) {
  const { ref, inView } = useScrollReveal();
  const count = useCountUp(value, 1500, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex flex-col"
      id="opensource"
      style={{
        border: "2px solid #0d0d0f",
        borderRight: index < 2 ? "1px solid #0d0d0f" : "2px solid #0d0d0f",
        background: index === 1 ? "#0d0d0f" : "#f8f4ec",
        padding: "32px 24px",
      }}
    >
      {/* Panel label */}
      <div
        className="absolute top-3 left-3"
        style={{
          border: `1.5px solid ${index === 1 ? "rgba(255,255,255,0.2)" : "#0d0d0f"}`,
          padding: "2px 8px",
          background: index === 1 ? "rgba(255,255,255,0.1)" : "#0d0d0f",
        }}
      >
        <span
          className="font-manga"
          style={{ fontSize: 9, letterSpacing: "0.15em", color: "white" }}
        >
          PANEL {panel}
        </span>
      </div>

      {/* Achievement unlock tag */}
      <div className="mb-3 mt-4">
        <span
          className="font-manga"
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: index === 1 ? "rgba(255,255,255,0.4)" : "rgba(13,13,15,0.4)",
          }}
        >
          ★ ACHIEVEMENT UNLOCKED
        </span>
      </div>

      {/* Count */}
      <div className="flex items-end gap-1 mb-2">
        <span
          className="font-manga leading-none"
          style={{
            fontSize: "clamp(48px, 6vw, 72px)",
            color: index === 1 ? "white" : "#0d0d0f",
            lineHeight: 1,
          }}
        >
          {count}
        </span>
        <span
          className="font-manga mb-2"
          style={{
            fontSize: 24,
            color: index === 1 ? "rgba(255,255,255,0.5)" : "rgba(13,13,15,0.4)",
          }}
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <span
        className="font-manga mb-2"
        style={{
          fontSize: 14,
          letterSpacing: "0.1em",
          color: index === 1 ? "white" : "#0d0d0f",
        }}
      >
        {label}
      </span>

      {/* Divider */}
      <div
        className="w-full h-px mb-3"
        style={{
          background:
            index === 1 ? "rgba(255,255,255,0.1)" : "rgba(13,13,15,0.12)",
        }}
      />

      {/* Sub text */}
      <span
        className="font-body"
        style={{
          fontSize: 12,
          lineHeight: 1.6,
          color: index === 1 ? "rgba(255,255,255,0.45)" : "rgba(13,13,15,0.5)",
          fontStyle: "italic",
        }}
      >
        {sub}
      </span>

      {/* Bottom panel number */}
      <div
        className="absolute bottom-3 right-4 font-manga"
        style={{
          fontSize: 9,
          opacity: 0.15,
          letterSpacing: "0.12em",
          color: index === 1 ? "white" : "#0d0d0f",
        }}
      >
        05 · 0{index + 1}
      </div>
    </motion.div>
  );
}

export default function OpenSource() {
  return (
    <div
      className="relative w-full paper-bg"
      style={{ borderBottom: "3px solid #0d0d0f" }}
    >
      {/* ── Chapter title bar ── */}
      <div
        className="w-full flex items-center overflow-hidden"
        style={{ borderBottom: "3px solid #0d0d0f" }}
      >
        <div
          className="px-8 py-4 flex-shrink-0"
          style={{ borderRight: "3px solid #0d0d0f", background: "#0d0d0f" }}
        >
          <span
            className="font-manga text-white tracking-widest"
            style={{ fontSize: 13 }}
          >
            CHAPTER 05
          </span>
        </div>
        <div className="flex-1 px-8 py-4">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-manga tracking-wide"
            style={{ fontSize: "clamp(22px, 4vw, 42px)", color: "#0d0d0f" }}
          >
            BEYOND THE CLASSROOM
          </motion.h2>
        </div>
      </div>

      {/* ── Stat cards — achievement unlock style ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ borderBottom: "3px solid #0d0d0f" }}
      >
        {STATS.map((stat, i) => (
          <StatCard key={i} {...stat} index={i} />
        ))}
      </div>

      {/* ── Hackathon panels ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ borderBottom: "3px solid #0d0d0f" }}
      >
        {HACKATHONS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative flex items-start gap-5 p-8"
            style={{
              borderRight: i === 0 ? "1.5px solid #0d0d0f" : "none",
              borderLeft: i === 1 ? "1.5px solid #0d0d0f" : "none",
              background: "#f0ebe0",
            }}
          >
            {/* Panel label */}
            <div
              className="absolute top-4 left-4"
              style={{
                border: "1.5px solid #0d0d0f",
                padding: "2px 8px",
                background: "#0d0d0f",
              }}
            >
              <span
                className="font-manga text-white"
                style={{ fontSize: 9, letterSpacing: "0.15em" }}
              >
                PANEL {i === 0 ? "D" : "E"}
              </span>
            </div>

            {/* Trophy icon in ink box */}
            <div
              className="flex-shrink-0 flex items-center justify-center mt-6"
              style={{
                width: 48,
                height: 48,
                border: "2.5px solid #0d0d0f",
                background: "white",
                boxShadow: "3px 3px 0px #0d0d0f",
              }}
            >
              <Trophy size={20} color="#0d0d0f" />
            </div>

            <div className="flex flex-col mt-6">
              {/* Stamp */}
              <div
                className="mb-2 self-start px-2 py-0.5"
                style={{ border: "1.5px solid #0d0d0f", background: "#0d0d0f" }}
              >
                <span
                  className="font-manga text-white"
                  style={{ fontSize: 9, letterSpacing: "0.2em" }}
                >
                  PARTICIPANT · {h.year}
                </span>
              </div>

              <p
                className="font-manga text-[#0d0d0f]"
                style={{
                  fontSize: "clamp(16px, 2vw, 22px)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.2,
                }}
              >
                {h.name}
              </p>

              <p
                className="font-body mt-2"
                style={{
                  fontSize: 12,
                  color: "rgba(13,13,15,0.45)",
                  fontStyle: "italic",
                }}
              >
                {h.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── GSoC card — full width ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-12"
        style={{ background: "#0d0d0f" }}
      >
        {/* Panel label */}
        <div
          className="absolute top-4 left-4"
          style={{
            border: "1.5px solid rgba(255,255,255,0.2)",
            padding: "2px 8px",
          }}
        >
          <span
            className="font-manga text-white opacity-40"
            style={{ fontSize: 9, letterSpacing: "0.15em" }}
          >
            PANEL F
          </span>
        </div>

        {/* Left content */}
        <div className="flex items-start gap-5 pt-4">
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 52,
              height: 52,
              border: "2.5px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              boxShadow: "3px 3px 0px rgba(255,255,255,0.08)",
            }}
          >
            <GitBranch size={22} color="white" style={{ opacity: 0.6 }} />
          </div>

          <div>
            {/* Quest label */}
            <div
              className="mb-2 self-start px-2 py-0.5 inline-block"
              style={{
                border: "1.5px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="font-manga text-white opacity-50"
                style={{ fontSize: 9, letterSpacing: "0.2em" }}
              >
                ACTIVE QUEST
              </span>
            </div>

            <p
              className="font-manga text-white"
              style={{
                fontSize: "clamp(18px, 2.5vw, 28px)",
                letterSpacing: "0.06em",
                lineHeight: 1.2,
              }}
            >
              Google Summer of Code
            </p>
            <p
              className="font-body mt-2"
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: 420,
              }}
            >
              Targeting GSoC 2026 — reading codebases, filing issues, and
              building context in web & AI orgs.
            </p>
          </div>
        </div>

        {/* Right — progress indicator */}
        <div className="flex flex-col gap-3 w-full md:w-56 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span
              className="font-manga text-white opacity-40"
              style={{ fontSize: 10, letterSpacing: "0.15em" }}
            >
              ACTIVE CONTRIBUTOR TRACK
            </span>
          </div>

          {/* Segmented progress bar — manga style */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((seg, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
                className="flex-1 h-4"
                style={{
                  background: i < 4 ? "white" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  transformOrigin: "bottom",
                }}
              />
            ))}
          </div>

          <span
            className="font-manga text-white opacity-25"
            style={{ fontSize: 10, letterSpacing: "0.12em" }}
          >
            4 / 8 MILESTONES
          </span>
        </div>

        {/* Bottom panel number */}
        <div
          className="absolute bottom-3 right-6 font-manga text-white"
          style={{ fontSize: 9, opacity: 0.1, letterSpacing: "0.12em" }}
        >
          05 · 06
        </div>
      </motion.div>
    </div>
  );
}
