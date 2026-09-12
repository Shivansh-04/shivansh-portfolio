import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { animate, stagger } from "animejs";
import { ExternalLink, X, Github, ArrowUpRight, Zap, Clock, Code2 } from "lucide-react";
import { SiGithub } from "react-icons/si";

const PROJECTS = [
  {
    id: 1,
    name: "MindSpace",
    tagline: "AI-driven mental health support platform",
    description:
      "A full-stack AI-powered platform providing anonymous mental health support, mood tracking, and personalized recommendations with a strong focus on privacy and scalability.",
    tags: ["React", "Node.js", "MongoDB", "AI", "Express"],
    category: ["Full Stack", "AI/ML"],
    featured: true,
    status: "Live",
    github: "https://github.com/Shivansh-04/mental-health.git",
    live: "https://mental-health-beta.vercel.app/",
    challenges:
      "Built real-time AI interactions while maintaining low latency and ensuring strict data privacy.",
    highlights: [
      "Real-time AI chat with sub-2s response time",
      "End-to-end encrypted mood tracking",
      "Deployed to 500+ beta users",
    ],
    accent: "#6366f1",
  },
  {
    id: 2,
    name: "Options Pricing Engine",
    tagline: "Black-Scholes · Greeks · Monte Carlo — built from scratch",
    description:
      "A full-stack financial derivatives calculator implementing three industry-standard pricing models in pure JavaScript — zero external math libraries. Black-Scholes, all 5 Greeks, and 10,000-path Monte Carlo simulation.",
    tags: ["Node.js", "Express", "MongoDB", "React", "Vite", "Recharts", "JWT"],
    category: ["Full Stack", "Fintech"],
    featured: true,
    status: "Live",
    github: "https://github.com/Shivansh-04/options-engine",
    live: "https://options-engine-red.vercel.app",
    challenges:
      "Implementing Normal CDF, Box-Muller transform, and Geometric Brownian Motion from scratch in pure JavaScript without any external math libraries.",
    highlights: [
      "Pure JS math engine — zero dependencies",
      "Black-Scholes + Monte Carlo convergence",
      "Interactive Greeks visualization",
    ],
    accent: "#10b981",
  },
  {
    id: 3,
    name: "Sorting Visualizer",
    tagline: "Interactive algorithm visualization tool",
    description:
      "A web-based visualizer demonstrating sorting algorithms like Bubble, Merge, and Quick Sort with step-by-step animations and performance comparison.",
    tags: ["JavaScript", "React", "Node.js", "CSS"],
    category: ["Visualizer"],
    featured: false,
    status: "Live",
    github: "https://github.com/Shivansh-04/sort-scape-animations.git",
    live: "https://sortingvisualizer-zeta.vercel.app/",
    challenges:
      "Optimized rendering logic to achieve smooth animations for large datasets.",
    highlights: [
      "6 sorting algorithms visualized",
      "Adjustable speed and dataset size",
      "Step-by-step mode for learning",
    ],
    accent: "#f59e0b",
  },
  {
    id: 4,
    name: "Image Upload Service",
    tagline: "Backend service for file uploads using ImageKit",
    description:
      "A backend service built with Express and Multer to handle image uploads, process files, and store them securely using ImageKit with efficient API integration.",
    tags: ["Node.js", "Express", "Multer", "ImageKit API"],
    category: ["Backend"],
    featured: false,
    status: "Live",
    github: "https://github.com/Shivansh-04",
    live: "#",
    challenges:
      "Handled file processing, base64 conversion, and secure cloud storage integration.",
    highlights: [
      "Secure file upload pipeline",
      "ImageKit cloud integration",
      "RESTful API design",
    ],
    accent: "#8b5cf6",
  },
];

const FILTERS = ["All", "Full Stack", "AI/ML", "Fintech", "Visualizer", "Backend"];

// Animated number badge
function NumberBadge({ number, inView }) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!inView || !pathRef.current) return;
    animate(pathRef.current, {
      strokeDashoffset: [60, 0],
      ease: "easeOutExpo",
      duration: 800,
      delay: 200,
    });
  }, [inView]);

  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <svg
        ref={pathRef}
        className="absolute inset-0"
        viewBox="0 0 56 56"
        style={{ strokeDasharray: 60, strokeDashoffset: 60 }}
      >
        <rect
          x="2"
          y="2"
          width="52"
          height="52"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="2"
        />
      </svg>
      <span className="font-manga text-[color:var(--text)]" style={{ fontSize: 22 }}>
        {String(number).padStart(2, "0")}
      </span>
    </div>
  );
}

// Featured project card (spans 2 columns)
function FeaturedProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onClick={() => onOpen(project)}
      className="group relative col-span-1 cursor-pointer overflow-hidden md:col-span-2"
      style={{
        background: "var(--surface-2)",
        border: "3px solid var(--line-strong)",
      }}
    >
      {/* Gradient visual area */}
      <div className="grid md:grid-cols-[1fr_1.2fr]">
        {/* Left: Visual */}
        <div
          className="relative flex min-h-[200px] items-center justify-center overflow-hidden md:min-h-[320px]"
          style={{
            background: `linear-gradient(135deg, ${project.accent}15 0%, transparent 50%), var(--surface)`,
          }}
        >
          {/* Pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--text) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Large number watermark */}
          <span
            className="font-manga absolute text-[color:var(--text)]"
            style={{
              fontSize: 180,
              lineHeight: 1,
              opacity: 0.06,
              WebkitTextStroke: "2px var(--text)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Number badge */}
          <div className="relative z-10">
            <NumberBadge number={index + 1} inView={inView} />
          </div>

          {/* Category badge */}
          <div
            className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5"
            style={{ background: "var(--reverse-bg)" }}
          >
            <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 9, letterSpacing: "0.15em" }}>
              {project.category[0].toUpperCase()}
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="relative flex flex-col justify-between p-6 md:p-8">
          {/* Top row */}
          <div>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1" style={{ background: "var(--accent)" }}>
                  <span className="font-manga text-[color:var(--on-accent)]" style={{ fontSize: 9, letterSpacing: "0.18em" }}>
                    FEATURED
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1"
                  style={{ border: "1.5px solid var(--line)", background: "var(--surface)" }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "#4ade80" }} />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80" }} />
                  </span>
                  <span className="font-manga text-[color:var(--text)]" style={{ fontSize: 9, letterSpacing: "0.1em" }}>
                    {project.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <h3
              className="font-manga text-[color:var(--text)]"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.01em", lineHeight: 1.1 }}
            >
              {project.name}
            </h3>
            <p className="mt-2 text-[color:var(--text-muted)]" style={{ fontSize: 14, fontStyle: "italic" }}>
              {project.tagline}
            </p>
            <p className="mt-4 text-[color:var(--text-muted)]" style={{ fontSize: 14, lineHeight: 1.7 }}>
              {project.description.slice(0, 120)}...
            </p>
          </div>

          {/* Bottom row */}
          <div className="mt-6">
            {/* Tech strip */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="font-mono px-2 py-0.5 text-[color:var(--text)]"
                  style={{ fontSize: 10, background: "var(--surface)", border: "1px solid var(--line)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--line)" }}>
              <div className="flex items-center gap-2">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2"
                  style={{ border: "1.5px solid var(--line-strong)", background: "var(--surface)" }}
                >
                  <SiGithub size={14} className="text-[color:var(--text)]" />
                  <span className="font-manga text-[color:var(--text)]" style={{ fontSize: 10 }}>Code</span>
                </motion.a>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2"
                  style={{ background: "var(--reverse-bg)" }}
                >
                  <ExternalLink size={14} className="text-[color:var(--reverse-text)]" />
                  <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 10 }}>Live</span>
                </motion.a>
              </div>
              <span className="font-manga flex items-center gap-1 text-[color:var(--text-muted)]" style={{ fontSize: 10 }}>
                View Details <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Standard project card
function StandardProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.2 });
  const panelLabel = String.fromCharCode(65 + index); // A, B, C...

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      onClick={() => onOpen(project)}
      className="group relative cursor-pointer overflow-hidden"
      style={{
        background: "var(--surface-2)",
        border: "2px solid var(--line-strong)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: project.accent }}
      />

      {/* Content */}
      <div className="flex flex-col p-5">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div
            className="px-2 py-0.5"
            style={{ background: "var(--reverse-bg)" }}
          >
            <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 9, letterSpacing: "0.15em" }}>
              PANEL {panelLabel}
            </span>
          </div>
          <span className="font-manga text-[color:var(--text-muted)]" style={{ fontSize: 11, opacity: 0.5 }}>
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-manga text-[color:var(--text)]"
          style={{ fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "0.02em" }}
        >
          {project.name}
        </h3>
        <p className="mt-1.5 text-[color:var(--text-muted)]" style={{ fontSize: 12, fontStyle: "italic" }}>
          {project.tagline}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono px-2 py-0.5 text-[color:var(--text)]"
              style={{ fontSize: 9, background: "var(--surface)", border: "1px solid var(--line)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              className="flex h-8 w-8 items-center justify-center"
              style={{ border: "1.5px solid var(--line)", background: "var(--surface)" }}
            >
              <SiGithub size={14} className="text-[color:var(--text)]" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              className="flex h-8 w-8 items-center justify-center"
              style={{ border: "1.5px solid var(--line)", background: "var(--surface)" }}
            >
              <ExternalLink size={14} className="text-[color:var(--text)]" />
            </motion.a>
          </div>
          <span className="font-mono text-[color:var(--text-muted)]" style={{ fontSize: 9 }}>
            {project.status}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// Full viewport modal
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{
          background: "rgba(13, 13, 15, 0.85)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Modal content */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto my-8 min-h-[calc(100vh-64px)] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="overflow-hidden"
          style={{
            background: "var(--bg)",
            border: "3px solid var(--line-strong)",
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between p-4 md:p-5"
            style={{ background: "var(--reverse-bg)", borderBottom: "3px solid var(--line-strong)" }}
          >
            <div className="flex items-center gap-3">
              <div className="px-3 py-1" style={{ background: "var(--accent)" }}>
                <span className="font-manga text-[color:var(--on-accent)]" style={{ fontSize: 10, letterSpacing: "0.15em" }}>
                  {project.featured ? "FEATURED PROJECT" : "PROJECT FILE"}
                </span>
              </div>
              <span className="font-manga text-[color:var(--reverse-text-muted)]" style={{ fontSize: 10 }}>
                {project.category.join(" · ")}
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center transition-colors"
              style={{ border: "1.5px solid var(--reverse-line)" }}
            >
              <X size={18} className="text-[color:var(--reverse-text)]" />
            </button>
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-[1fr_1.2fr]">
            {/* Left: Visual */}
            <div
              className="relative flex min-h-[280px] items-center justify-center md:min-h-[500px]"
              style={{
                background: `linear-gradient(135deg, ${project.accent}15 0%, transparent 60%), var(--surface)`,
                borderBottom: "3px solid var(--line-strong)",
              }}
            >
              {/* Pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--text) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />

              {/* Large number */}
              <span
                className="font-manga absolute text-[color:var(--text)]"
                style={{
                  fontSize: 280,
                  lineHeight: 1,
                  opacity: 0.04,
                  WebkitTextStroke: "2px var(--text)",
                }}
              >
                {String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}
              </span>

              {/* Status badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2" style={{ background: "var(--reverse-bg)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "#4ade80" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#4ade80" }} />
                </span>
                <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 10, letterSpacing: "0.15em" }}>
                  {project.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col p-6 md:p-8">
              {/* Title */}
              <h2
                className="font-manga text-[color:var(--text)]"
                style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                {project.name}
              </h2>
              <p className="mt-2 text-[color:var(--text-muted)]" style={{ fontSize: 15, fontStyle: "italic" }}>
                {project.tagline}
              </p>

              {/* Description */}
              <p className="mt-6 text-[color:var(--text-muted)]" style={{ fontSize: 15, lineHeight: 1.8 }}>
                {project.description}
              </p>

              {/* Challenges */}
              <div
                className="mt-6 p-4"
                style={{ background: "var(--reverse-bg)", border: "2px solid var(--line-strong)" }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Zap size={14} className="text-[color:var(--reverse-text-muted)]" />
                  <span className="font-manga text-[color:var(--reverse-text-muted)]" style={{ fontSize: 9, letterSpacing: "0.2em" }}>
                    KEY CHALLENGE
                  </span>
                </div>
                <p className="text-[color:var(--reverse-text)]" style={{ fontSize: 13, lineHeight: 1.7 }}>
                  {project.challenges}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-6">
                <span className="font-manga text-[color:var(--text-muted)]" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
                  HIGHLIGHTS
                </span>
                <ul className="mt-3 space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[color:var(--text-muted)]" style={{ fontSize: 13 }}>
                      <span style={{ color: "var(--accent)" }}>→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="mt-6">
                <span className="font-manga text-[color:var(--text-muted)]" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
                  TECH STACK
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono px-3 py-1.5 text-[color:var(--text)]"
                      style={{ fontSize: 11, background: "var(--surface)", border: "1.5px solid var(--line)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-2 px-5 py-3"
                  style={{ border: "2px solid var(--line-strong)", background: "var(--surface-2)" }}
                >
                  <SiGithub size={16} className="text-[color:var(--text)]" />
                  <span className="font-manga text-[color:var(--text)]" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
                    VIEW CODE
                  </span>
                </motion.a>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-2 px-5 py-3"
                  style={{ background: "var(--reverse-bg)" }}
                >
                  <ExternalLink size={16} className="text-[color:var(--reverse-text)]" />
                  <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
                    LIVE DEMO
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const headerRef = useRef(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.includes(activeFilter));

  const featuredProjects = filtered.filter((p) => p.featured);
  const standardProjects = filtered.filter((p) => !p.featured);

  // Speed lines animation
  useEffect(() => {
    if (!headerRef.current) return;
    const lines = headerRef.current.querySelectorAll("line");
    if (lines.length) {
      animate(lines, {
        strokeDashoffset: [300, 0],
        opacity: [0.4, 0],
        ease: "easeOutExpo",
        duration: 1000,
        delay: stagger(20, { start: 0 }),
      });
    }
  }, []);

  return (
    <>
      <section
        id="projects"
        className="relative w-full overflow-hidden"
        style={{ background: "var(--bg)", borderBottom: "3px solid var(--line-strong)" }}
      >
        {/* Speed lines */}
        <svg
          ref={headerRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full opacity-40"
          viewBox="0 0 1440 120"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 100 + i * 110;
            return (
              <line
                key={i}
                x1={x}
                y1={60}
                x2={x + 200}
                y2={60 + (i % 2 === 0 ? -20 : 20)}
                stroke="var(--line-strong)"
                strokeWidth={i % 3 === 0 ? "2" : "1"}
                strokeDasharray="300"
                strokeDashoffset="300"
              />
            );
          })}
        </svg>

        {/* Chapter header */}
        <div
          className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10"
          style={{ borderBottom: "3px solid var(--line-strong)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="px-4 py-2"
              style={{ background: "var(--reverse-bg)", borderRight: "3px solid var(--line-strong)" }}
            >
              <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
                CHAPTER 06
              </span>
            </div>
            <motion.h2
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-manga text-[color:var(--text)]"
              style={{ fontSize: "clamp(22px, 4vw, 38px)" }}
            >
              THINGS I'VE BUILT
            </motion.h2>
          </div>
          <div className="px-4 py-2" style={{ background: "var(--surface)", border: "2px solid var(--line-strong)" }}>
            <span className="font-manga text-[color:var(--text)]" style={{ fontSize: 11, letterSpacing: "0.15em" }}>
              {filtered.length} PROJECT{filtered.length !== 1 ? "S" : ""}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div
          className="relative z-10 flex flex-wrap items-center gap-2 px-6 py-4 md:px-10"
          style={{ borderBottom: "2px solid var(--line)" }}
        >
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-4 py-2 font-manga transition-colors"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                background: activeFilter === filter ? "var(--reverse-bg)" : "transparent",
                color: activeFilter === filter ? "var(--reverse-text)" : "var(--text)",
                border: activeFilter === filter ? "2px solid var(--line-strong)" : "2px solid transparent",
              }}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-2 right-2 h-0.5"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="relative z-10 p-6 md:p-10">
          <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {featuredProjects.map((project, i) => (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpen={setSelectedProject}
                />
              ))}
              {standardProjects.map((project, i) => (
                <StandardProjectCard
                  key={project.id}
                  project={project}
                  index={i + featuredProjects.length}
                  onOpen={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
