import { motion } from "framer-motion";
import { Trophy, GitBranch } from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";

const STATS = [
  {
    label: "DSA Focus",
    value: 250,
    suffix: "+",
    sub: "Problems across LeetCode & CodeChef",
  },
  {
    label: "Full Stack",
    value: 3,
    suffix: "x",
    sub: "Production-grade MERN projects shipped",
  },
  {
    label: "AI Integration",
    value: 2,
    suffix: "x",
    sub: "Projects with real AI/ML pipelines",
  },
];

const HACKATHONS = [
  { name: "Smart India Hackathon", role: "Built & Presented", year: "2024" },
  { name: "Binary Hacks 2.0", role: "Competed", year: "2024" },
];

function StatCard({ label, value, suffix, sub }) {
  const { ref, inView } = useScrollReveal();
  const count = useCountUp(value, 1500, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card flex flex-col gap-1"
    >
      <span className="section-label mb-1">{label}</span>
      <span
        className="font-display font-bold text-white"
        style={{ fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1 }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="font-body text-[12px] uppercase tracking-wider mt-1"
        style={{ color: "var(--muted)" }}
      >
        {sub}
      </span>
    </motion.div>
  );
}

export default function OpenSource() {
  return (
    <SectionWrapper id="opensource">
      <span className="section-label">004 — Open Source</span>
      <h2 className="section-heading">
        Beyond the
        <br />
        Classroom.
      </h2>

      {/* Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {STATS.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Hackathon Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {HACKATHONS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="card flex items-center gap-4"
            style={{ borderLeft: "2px solid rgba(255,255,255,0.5)" }}
          >
            <Trophy
              size={20}
              style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }}
            />
            <div>
              <p className="font-body text-white text-[15px] font-medium">
                {h.name}
              </p>
              <p
                className="font-body text-[12px] uppercase tracking-wider mt-0.5"
                style={{ color: "var(--muted)" }}
              >
                {h.role} · {h.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GSoC Intent Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="card flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ borderLeft: "2px solid rgba(255,255,255,0.5)", padding: 32 }}
      >
        <div className="flex items-start gap-4">
          <GitBranch
            size={22}
            style={{
              color: "rgba(255,255,255,0.4)",
              flexShrink: 0,
              marginTop: 2,
            }}
          />
          <div>
            <p className="font-display text-white text-xl font-semibold mb-1">
              Google Summer of Code
            </p>
            <p
              className="font-body text-sm"
              style={{
                color: "rgba(240,240,240,0.55)",
                lineHeight: 1.7,
                maxWidth: 420,
              }}
            >
              Targeting GSoC 2026 — reading codebases, filing issues, and
              building context in web & AI orgs.
            </p>
          </div>
        </div>

        {/* Indeterminate progress indicator */}
        <div className="flex flex-col gap-2 w-full md:w-48 flex-shrink-0">
          <span
            className="font-body text-[11px] uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Active Contributor Track
          </span>
          <div
            className="relative h-px w-full overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-white rounded-full"
              style={{ width: "40%" }}
              animate={{ x: ["−100%", "300%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
