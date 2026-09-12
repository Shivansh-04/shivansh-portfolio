import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiHtml5,
  SiCss,
  SiFramer,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { SiPython } from "react-icons/si";
import { animate, stagger } from "animejs";

const STATS = [
  {
    category: "LANGUAGES",
    code: "LNG",
    summary: "Core syntax, problem solving, and product logic",
    skills: [
      { name: "JavaScript", Icon: SiJavascript, level: 88, rank: "S" },
      { name: "Java", Icon: FaJava, level: 80, rank: "A" },
      { name: "C++", Icon: TbBrandCpp, level: 75, rank: "A" },
      { name: "Python", Icon: SiPython, level: 70, rank: "A" },
    ],
  },
  {
    category: "FRONTEND",
    code: "FRT",
    summary: "Modern interfaces, UI polish, and motion systems",
    skills: [
      { name: "React", Icon: SiReact, level: 90, rank: "S" },
      { name: "HTML5", Icon: SiHtml5, level: 92, rank: "S" },
      { name: "CSS3", Icon: SiCss, level: 85, rank: "A" },
      { name: "Tailwind", Icon: SiTailwindcss, level: 88, rank: "S" },
      { name: "Framer", Icon: SiFramer, level: 72, rank: "A" },
    ],
  },
  {
    category: "BACKEND",
    code: "BKD",
    summary: "Scalable APIs, auth flows, and data architecture",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, level: 83, rank: "A" },
      { name: "Express", Icon: SiExpress, level: 82, rank: "A" },
      { name: "MongoDB", Icon: SiMongodb, level: 78, rank: "A" },
    ],
  },
  {
    category: "TOOLS",
    code: "TLS",
    summary: "Versioning, APIs, design, and collaboration flow",
    skills: [
      { name: "Git", Icon: SiGit, level: 85, rank: "A" },
      { name: "GitHub", Icon: SiGithub, level: 85, rank: "A" },
      { name: "Postman", Icon: SiPostman, level: 75, rank: "B" },
      { name: "Figma", Icon: SiFigma, level: 65, rank: "B" },
    ],
  },
];

const RANK_STYLES = {
  S: { bg: "var(--reverse-bg)", text: "var(--reverse-text)" },
  A: { bg: "var(--reverse-bg)", text: "var(--reverse-text)" },
  B: { bg: "var(--surface-2)", text: "var(--text)" },
};

const SKILL_RENDER = [
  { label: "Frontend", value: 90 },
  { label: "Backend", value: 83 },
  { label: "DSA", value: 78 },
  { label: "AI Flow", value: 72 },
  { label: "Open Src", value: 70 },
  { label: "Product", value: 76 },
];

function getRadarPoint(value, index, total, size = 240) {
  const center = size / 2;
  const radius = (size / 2 - 26) * (value / 100);
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const x = center + Math.cos(angle) * radius;
  const y = center + Math.sin(angle) * radius;
  return `${x},${y}`;
}

function getLabelPosition(index, total, size = 240) {
  const center = size / 2;
  const radius = size / 2 - 8;
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    left: center + Math.cos(angle) * radius,
    top: center + Math.sin(angle) * radius,
  };
}

function LiveSkillRender() {
  const size = 190;

  const polygon = SKILL_RENDER.map((stat, index) =>
    getRadarPoint(stat.value, index, SKILL_RENDER.length, size),
  ).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden rounded-[20px] border-[3px] border-[color:var(--line-strong)] bg-[color:var(--surface)] p-4"
      style={{ boxShadow: "6px 6px 0 var(--shadow)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--line),_transparent_55%)]" />
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 0%, var(--line) 45%, transparent 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative flex items-start justify-between gap-2">
        <div>
          <span
            className="block font-manga text-[color:var(--text)] opacity-35"
            style={{ fontSize: 9, letterSpacing: "0.18em" }}
          >
            LIVE POWER CORE
          </span>
          <span
            className="mt-1 block font-manga text-[color:var(--text)]"
            style={{ fontSize: 18, letterSpacing: "0.05em", lineHeight: 1 }}
          >
            POWER SCAN
          </span>
        </div>
        <div
          className="rounded-full border-[2px] border-[color:var(--line-strong)] px-2.5 py-1 flex-shrink-0"
          style={{ background: "var(--reverse-bg)", color: "var(--reverse-text)" }}
        >
          <span className="font-manga" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
            A+
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-4" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {[0.25, 0.5, 0.75, 1].map((scale) => {
            const ring = SKILL_RENDER.map((_, index) =>
              getRadarPoint(scale * 100, index, SKILL_RENDER.length, size),
            ).join(" ");
            return (
              <polygon key={scale} points={ring} fill="none" stroke="var(--line)" strokeWidth="1" />
            );
          })}

          {SKILL_RENDER.map((_, index) => (
            <line
              key={index}
              x1={size / 2}
              y1={size / 2}
              x2={getRadarPoint(100, index, SKILL_RENDER.length, size).split(",")[0]}
              y2={getRadarPoint(100, index, SKILL_RENDER.length, size).split(",")[1]}
              stroke="var(--line)"
              strokeWidth="1"
            />
          ))}

          <motion.polygon
            points={polygon}
            fill="var(--line)"
            stroke="var(--text)"
            strokeWidth="2.5"
            initial={{ opacity: 0, scale: 0.75, transformOrigin: "center" }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {SKILL_RENDER.map((stat, index) => {
            const [cx, cy] = getRadarPoint(stat.value, index, SKILL_RENDER.length, size).split(",");
            return (
              <motion.circle
                key={stat.label}
                cx={cx}
                cy={cy}
                r="3.5"
                fill="var(--text)"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.04, duration: 0.35 }}
              />
            );
          })}
        </svg>

        {SKILL_RENDER.map((stat, index) => {
          const pos = getLabelPosition(index, SKILL_RENDER.length, size);
          return (
            <div
              key={stat.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: pos.left, top: pos.top, width: 54 }}
            >
              <span className="block font-manga text-[color:var(--text)]" style={{ fontSize: 8, letterSpacing: "0.06em" }}>
                {stat.label}
              </span>
              <span className="block font-manga text-[color:var(--text)] opacity-35" style={{ fontSize: 8 }}>
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-2">
        {[
          ["Builds", "4"],
          ["DSA", "200+"],
          ["Stack", "MERN"],
        ].map(([label, value], index) => (
          <div
            key={label}
            className="rounded-[12px] border-[2px] border-[color:var(--line-strong)] px-2 py-1.5"
            style={{ background: index === 1 ? "var(--reverse-bg)" : "var(--surface-2)", color: index === 1 ? "var(--reverse-text)" : "var(--text)" }}
          >
            <span className="block font-manga opacity-40" style={{ fontSize: 8, letterSpacing: "0.1em" }}>
              {label}
            </span>
            <span className="mt-1 block font-manga" style={{ fontSize: 13 }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillCard({ skill, index }) {
  const rankStyle = RANK_STYLES[skill.rank];
  const Icon = skill.Icon;
  const barDelay = 0.2 + index * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: "6px 6px 0 var(--shadow)" }}
      className="group relative overflow-hidden rounded-[22px] border-[2px] border-[color:var(--line-strong)] bg-[color:var(--surface)] p-4 shadow-[4px_4px_0_var(--shadow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_0%,_var(--line)_100%)] opacity-60" />
      <div className="relative flex items-center gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-[2px] border-[color:var(--line-strong)] font-manga"
          style={{ background: rankStyle.bg, color: rankStyle.text }}
        >
          {skill.rank}
        </div>

        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] border-[2px] border-[color:var(--line-strong)] bg-[color:var(--surface-2)]">
          <Icon size={20} color="var(--text)" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-manga text-[color:var(--text)]" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
              {skill.name}
            </span>
            <motion.span
              className="font-manga"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: barDelay, duration: 0.3 }}
              style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.1em" }}
            >
              {skill.level}/100
            </motion.span>
          </div>

          <div
            className="mt-2 h-2.5 w-full overflow-hidden rounded-full border border-[color:var(--line)]"
            style={{ background: "var(--line)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--text)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: barDelay }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef(null);
  const burstRef = useRef(null);

  const active = STATS[activeCategory];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const lines = Array.from(burstRef.current?.querySelectorAll("line") || []);
        if (lines.length) {
          animate(lines, {
            strokeDashoffset: [480, 0],
            opacity: [0.55, 0],
            ease: "easeOutExpo",
            duration: 700,
            delay: stagger(16, { start: 0 }),
          });
        }

        observer.unobserve(section);
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden bg-[color:var(--bg)]"
      style={{ borderBottom: "3px solid var(--line-strong)" }}
    >
      <div ref={burstRef} className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-50" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = 160 + (i / 18) * 40;
            const rad = (angle * Math.PI) / 180;
            const cx = 720;
            const cy = 110;
            const len = 620;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(rad) * len}
                y2={cy + Math.sin(rad) * len}
                stroke="var(--line)"
                strokeWidth={i % 3 === 0 ? "2" : "1"}
                strokeDasharray="480"
                strokeDashoffset="480"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 w-full overflow-hidden" style={{ borderBottom: "3px solid var(--line-strong)" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8 md:py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full border-[2px] border-[color:var(--line-strong)] bg-[color:var(--reverse-bg)] px-3 py-1">
              <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 10, letterSpacing: "0.2em" }}>
                CHAPTER 05
              </span>
            </div>
            <h2 className="font-manga tracking-wide text-[color:var(--text)]" style={{ fontSize: "clamp(22px, 4vw, 40px)" }}>
              SKILL MATRIX
            </h2>
          </div>
          <div className="rounded-full border-[2px] border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-2">
            <span className="font-manga text-[color:var(--text)]" style={{ fontSize: 11, letterSpacing: "0.18em" }}>
              OVERALL · A+
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-0 xl:grid-cols-[10%_70%_20%]">
        <div className="border-b-[2px] xl:border-b-0 xl:border-r-[2px] border-[color:var(--line-strong)]">
          <div className="flex flex-row xl:flex-col overflow-x-auto xl:overflow-visible">
            {STATS.map((cat, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(i)}
                className={`relative flex flex-col items-start px-4 py-4 xl:py-5 text-left flex-shrink-0 ${
                  i < STATS.length - 1 ? "border-r-[2px] xl:border-r-0 xl:border-b-[2px] border-[color:var(--line-strong)]" : ""
                }`}
                style={{
                  background: activeCategory === i ? "var(--reverse-bg)" : "transparent",
                  color: activeCategory === i ? "var(--reverse-text)" : "var(--text)",
                  cursor: "pointer",
                }}
              >
                <span className="font-manga" style={{ fontSize: 10, opacity: 0.58, letterSpacing: "0.12em" }}>
                  {cat.code}
                </span>
                <span className="mt-1 font-manga" style={{ fontSize: 13, letterSpacing: "0.06em" }}>
                  {cat.category}
                </span>
                {activeCategory === i && (
                  <motion.div layoutId="category-indicator" className="absolute right-0 top-0 bottom-0 w-1" style={{ background: "var(--reverse-text)" }} />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="border-b-[2px] xl:border-b-0 xl:border-r-[2px] border-[color:var(--line-strong)] p-6 md:p-8">
          <div className="mb-6 rounded-[20px] border-[2px] border-[color:var(--line-strong)] bg-[color:var(--reverse-bg)] px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="block font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 12, letterSpacing: "0.16em" }}>
                  {active.category} · {active.skills.length} SKILLS
                </span>
                <p className="mt-1 text-sm text-[color:var(--reverse-text-muted)]" style={{ fontStyle: "italic" }}>
                  {active.summary}
                </p>
              </div>
              <div className="rounded-full border border-[color:var(--reverse-line)] bg-[color:var(--reverse-line)] px-3 py-1">
                <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
                  SHIVANSH · LVL 3
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              {active.skills.map((skill, index) => (
                <SkillCard key={`${active.category}-${skill.name}`} skill={skill} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 rounded-[20px] border-[1.5px] border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-manga text-[color:var(--text)] opacity-35" style={{ fontSize: 10, letterSpacing: "0.2em" }}>
                DEV NOTE
              </span>
              <span className="text-[12px] text-[color:var(--text-muted)]" style={{ fontStyle: "italic" }}>
                These stats reflect hands-on build experience, not just tutorials.
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5 flex items-center justify-center xl:h-full">
          <LiveSkillRender />
        </div>
      </div>
    </div>
  );
}
