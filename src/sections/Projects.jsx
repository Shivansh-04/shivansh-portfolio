import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
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
    github: "https://github.com/Shivansh-04/mental-health.git",
    live: "https://mental-health-beta.vercel.app/",
    challenges:
      "Built real-time AI interactions while maintaining low latency and ensuring strict data privacy.",
    panel: "A",
  },
  {
    id: 2,
    name: "Options Pricing Engine",
    tagline: "Black-Scholes · Greeks · Monte Carlo — built from scratch",
    description:
      "A full-stack financial derivatives calculator implementing three industry-standard pricing models in pure JavaScript — zero external math libraries. Black-Scholes, all 5 Greeks, and 10,000-path Monte Carlo simulation. The two models converge to the same answer, validating the math engine.",
    tags: ["Node.js", "Express", "MongoDB", "React", "Vite", "Recharts", "JWT"],
    category: ["Full Stack", "Fintech"],
    featured: true,
    github: "https://github.com/Shivansh-04/options-engine",
    live: "https://options-engine-red.vercel.app",
    challenges:
      "Implementing Normal CDF, Box-Muller transform, and Geometric Brownian Motion from scratch in pure JavaScript without any external math libraries — then validating correctness by proving Black-Scholes and Monte Carlo converge to the same price.",
    panel: "B",
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
    github: "https://github.com/Shivansh-04/sort-scape-animations.git",
    live: "https://sortingvisualizer-zeta.vercel.app/",
    challenges:
      "Optimized rendering logic to achieve smooth animations for large datasets.",
    panel: "C",
  },
  {
    id: 4,
    name: "Image Upload & Storage Service",
    tagline: "Backend service for file uploads using ImageKit",
    description:
      "A backend service built with Express and Multer to handle image uploads, process files, and store them securely using ImageKit with efficient API integration.",
    tags: ["Node.js", "Express", "Multer", "ImageKit API"],
    category: ["Backend"],
    featured: false,
    github: "https://github.com/Shivansh-04",
    live: "#",
    challenges:
      "Handled file processing, base64 conversion, and secure cloud storage integration.",
    panel: "D",
  },
];

const FILTERS = ["All", "Full Stack", "Visualizer", "Backend", "AI/ML", "Fintech"];

function ProjectCard({ project, index, onOpen }) {
  const isFeatured = project.featured;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.01, boxShadow: "0 20px 40px rgba(13,13,15,0.08)" }}
      onClick={() => onOpen(project)}
      className={`group relative cursor-pointer overflow-hidden rounded-[24px] border border-[#0d0d0f]/15 bg-[#f8f4ec] ${isFeatured ? "md:col-span-2" : ""}`}
      style={{ boxShadow: "0 10px 30px rgba(13,13,15,0.05)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,13,15,0.06),_transparent_60%)]" />
      <div className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50" style={{ background: "linear-gradient(120deg, transparent 0%, rgba(13,13,15,0.04) 50%, transparent 100%)" }} />

      <div className="relative flex h-full flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-full border border-[#0d0d0f] bg-[#0d0d0f] px-3 py-1">
            <span className="font-manga text-[10px] uppercase tracking-[0.18em] text-white">
              PANEL {project.panel}
            </span>
          </div>
          {isFeatured && (
            <div className="rounded-full border border-[#0d0d0f] bg-[#f0ebe0] px-3 py-1">
              <span className="font-manga text-[9px] uppercase tracking-[0.2em] text-[#0d0d0f]">
                FEATURED
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 flex-1">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-manga text-[11px] uppercase tracking-[0.2em] text-[#0d0d0f]/40">
              0{index + 1}
            </span>
            <div className="h-[2px] w-20 rounded-full bg-[#0d0d0f]/20" />
          </div>

          <h3 className="font-manga leading-[0.95] text-[#0d0d0f]" style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[rgba(13,13,15,0.62)]" style={{ fontStyle: "italic" }}>
            {project.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-manga rounded-full border border-[#0d0d0f]/15 bg-white px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#0d0d0f]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#0d0d0f]/10 pt-4">
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full border border-[#0d0d0f] bg-white p-2 transition-transform duration-200 hover:scale-105"
            >
              <SiGithub size={14} color="#0d0d0f" />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full border border-[#0d0d0f] bg-white p-2 transition-transform duration-200 hover:scale-105"
            >
              <ExternalLink size={14} color="#0d0d0f" />
            </a>
          </div>
          <span className="font-manga text-[10px] uppercase tracking-[0.18em] text-[#0d0d0f]/40">
            OPEN CASE →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.includes(activeFilter));

  return (
    <>
      <div id="projects" className="relative w-full overflow-hidden bg-[#f0ebe0]" style={{ borderBottom: "3px solid #0d0d0f" }}>
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(13,13,15,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,15,0.04) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#0d0d0f]/15 px-6 py-4 md:px-8 md:py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#0d0d0f] bg-[#0d0d0f] px-3 py-1">
              <span className="font-manga text-[10px] uppercase tracking-[0.2em] text-white">
                CHAPTER 06
              </span>
            </div>
            <motion.h2
              initial={{ x: -24, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-manga tracking-wide text-[#0d0d0f]"
              style={{ fontSize: "clamp(22px, 4vw, 40px)" }}
            >
              THINGS I'VE BUILT
            </motion.h2>
          </div>
          <div className="rounded-full border border-[#0d0d0f] bg-[#0d0d0f] px-4 py-2">
            <span className="font-manga text-[11px] uppercase tracking-[0.18em] text-white">
              {filtered.length} PROJECTS
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-[#0d0d0f]/15 px-4 py-4 md:px-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="relative rounded-full border border-transparent px-4 py-2 font-manga text-[11px] uppercase tracking-[0.16em] transition-all duration-200"
              style={{
                background: activeFilter === f ? "#0d0d0f" : "transparent",
                color: activeFilter === f ? "white" : "#0d0d0f",
              }}
            >
              {f}
              {activeFilter === f && <motion.div layoutId="filter-indicator" className="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-white" />}
            </button>
          ))}
        </div>

        <div className="relative z-10 p-4 md:p-8">
          <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onOpen={setSelectedProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9980] flex items-center justify-center bg-[rgba(13,13,15,0.72)] p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 18 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[26px] border border-[#0d0d0f] bg-[#f8f4ec]"
              style={{ boxShadow: "0 20px 50px rgba(13,13,15,0.16)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#0d0d0f]/15 bg-[#0d0d0f] px-6 py-3">
                <span className="font-manga text-[11px] uppercase tracking-[0.2em] text-white">
                  PROJECT FILE · CLASSIFIED
                </span>
                <button onClick={() => setSelectedProject(null)} className="rounded-full border border-white/20 p-1.5">
                  <X size={15} color="white" />
                </button>
              </div>

              <div className="p-7 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-manga leading-[0.95] text-[#0d0d0f]" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
                      {selectedProject.name}
                    </h3>
                    <p className="mt-2 text-sm text-[rgba(13,13,15,0.55)]" style={{ fontStyle: "italic" }}>
                      {selectedProject.tagline}
                    </p>
                  </div>
                  {selectedProject.featured && (
                    <div className="rounded-full border border-[#0d0d0f] bg-[#f0ebe0] px-3 py-1">
                      <span className="font-manga text-[9px] uppercase tracking-[0.2em] text-[#0d0d0f]">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 h-[1px] w-full bg-[#0d0d0f]/10" />

                <p className="mt-6 text-[15px] leading-8 text-[rgba(13,13,15,0.72)]">
                  {selectedProject.description}
                </p>

                <div className="mt-6 rounded-[18px] border border-[#0d0d0f]/15 bg-[#0d0d0f] p-4">
                  <span className="mb-2 block font-manga text-[10px] uppercase tracking-[0.2em] text-white/50">
                    KEY CHALLENGE
                  </span>
                  <p className="text-[13px] leading-7 text-white/75">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="font-manga rounded-full border border-[#0d0d0f]/15 bg-white px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#0d0d0f]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manga flex items-center gap-2 rounded-full border border-[#0d0d0f] bg-white px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[#0d0d0f]"
                  >
                    <SiGithub size={13} /> GitHub
                  </a>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manga flex items-center gap-2 rounded-full border border-[#0d0d0f] bg-[#0d0d0f] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white"
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}