import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { SiGithub } from "react-icons/si";

const PROJECTS = [
  {
    id: 1,
    name: "Options Pricing Engine",
    project_banner: "/Project/Optimous engine.png",
    tagline: "Black-Scholes · Greeks · Monte Carlo — built from scratch",
    description:
      "A full-stack financial derivatives calculator implementing three industry-standard pricing models in pure JavaScript — zero external math libraries. Black-Scholes, all 5 Greeks, and 10,000-path Monte Carlo simulation. The two models converge to the same answer, validating the math engine.",
    tags: ["Node.js", "Express", "MongoDB", "React", "Vite", "Recharts", "JWT"],
    category: ["Full Stack", "Fintech"],
    featured: false,
    github: "https://github.com/Shivansh-04/options-engine",
    live: "https://options-engine-red.vercel.app",
    challenges:
      "Implementing Normal CDF, Box-Muller transform, and Geometric Brownian Motion from scratch in pure JavaScript — then validating correctness by proving Black-Scholes and Monte Carlo converge to the same price.",
  },
  {
    id: 2,
    name: "Algorithm Visualizer",
    project_banner: "/Project/Algorithm.png",
    tagline: "Sorting algorithms, visualized in real time",
    description:
      "A web app that visualizes sorting algorithms in real time with a dark, cinematic aesthetic. 8 algorithms animated at 60fps, with side-by-side code in JS/Java/Python and a live Big-O complexity readout as the animation runs.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "GSAP", "Three.js", "Zustand"],
    category: ["Visualizer"],
    featured: false,
    github: "https://github.com/Shivansh-04/sort-scape-animations.git",
    live: "https://sortingvisualizer-zeta.vercel.app/",
    challenges:
      "Keeping animations smooth at 60fps across 8 different algorithms while rendering synced multi-language code panels without frame drops.",
  },
  {
    id: 3,
    name: "DualGuard",
    project_banner: "/Project/DualGuard.png",
    tagline: "Dual-stream CNN for deepfake detection — SF2-Net",
    description:
      "A dual-stream spatial-frequency CNN, built as my final-year major project, that detects deepfakes by reading both the spatial content and the frequency signature of an image. EfficientNet-B4 handles the spatial stream, MobileNetV3 handles the frequency (FFT/DCT) stream, fused through a custom network with Grad-CAM explainability on every prediction.",
    tags: ["PyTorch", "FastAPI", "Node.js", "React","GSAP", "Three.js", "Tailwind"],
    category: ["AI/ML"],
    featured: false,
    github: "", // TODO: add repo link
    live: "#",
    challenges:
      "Fusing two very different signal domains — spatial and frequency-domain features — without one stream overwhelming the other; validated with an ablation study across two datasets.",
  },
  {
    id: 4,
    name: "SatQuery AI",
    project_banner: "/Project/Sat.png",
    tagline: "Agentic AI for reading satellite imagery",
    description:
      "A solo project inspired by an ISRO hackathon problem statement — an agentic AI system for satellite imagery: answering questions about a single image, detecting change between two, and cross-referencing optical with radar (SAR) data. Currently a working skeleton, with real models being swapped in one capability at a time.",
    tags: ["React", "FastAPI", "Python"],
    category: ["AI/ML"],
    featured: false,
    github: "", // TODO: add repo link
    live: "#",
    challenges:
      "Scoping a large multi-capability research problem down to something one person can realistically build, without losing the ambition of the original brief.",
  },
  {
    id: 5,
    name: "Image Upload & Storage Service",
    project_banner: "/Project/Image.png",
    tagline: "Backend service for file uploads using ImageKit",
    description:
      "A backend service built with Express and Multer to handle image uploads, process files, and store them securely using ImageKit with efficient API integration.",
    tags: ["Node.js", "Express", "Multer", "ImageKit API"],
    category: ["Backend"],
    featured: false,
    github: "https://github.com/Shivansh-04", // TODO: replace with the actual repo link
    live: "#",
    challenges:
      "Handled file processing, base64 conversion, and secure cloud storage integration.",
  },
];

const FILTERS = ["All", "Full Stack", "Visualizer", "Backend", "AI/ML", "Fintech"];

function ProjectCard({ project, index, onOpen }) {
  const isFeatured = project.featured;
  const hasLiveDemo = project.live && project.live !== "#";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.01, boxShadow: "0 20px 40px rgba(13,13,15,0.08)" }}
      onClick={() => onOpen(project)}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#0d0d0f]/15 bg-[#f8f4ec] md:flex-row ${isFeatured ? "md:col-span-2" : ""}`}
      style={{ boxShadow: "0 10px 30px rgba(13,13,15,0.05)" }}
    >
      {/* Left spine: project number + name */}
      <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-b border-[#0d0d0f]/10 p-4 md:w-[90px] md:flex-col md:items-start md:justify-start md:border-b-0 md:border-r">
        <span className="font-manga text-[11px] uppercase tracking-[0.2em] text-[#0d0d0f]/40">
          0{index + 1}
        </span>
        <h3
          className="font-manga leading-[0.95] text-[#0d0d0f] md:[writing-mode:vertical-rl] md:rotate-180"
          style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
        >
          {project.name}
        </h3>
      </div>

      {/* Right side: banner + footer */}
      <div className="flex flex-1 flex-col">
        <div className="relative min-h-[200px] flex-1 bg-[#0d0d0f]/5">
          {project.project_banner ? (
            <img
              src={project.project_banner}
              alt={`${project.name} banner`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[200px] w-full items-center justify-center border-2 border-dashed border-[#0d0d0f]/20">
              <span className="font-manga text-[11px] uppercase tracking-[0.18em] text-[#0d0d0f]/30">
                Banner pending
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#0d0d0f]/10 px-4 py-3">
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
            {hasLiveDemo && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full border border-[#0d0d0f] bg-white p-2 transition-transform duration-200 hover:scale-105"
              >
                <ExternalLink size={14} color="#0d0d0f" />
              </a>
            )}
          </div>

          {hasLiveDemo ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-manga flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-[#0d0d0f] transition-opacity hover:opacity-60"
            >
              Take me to the project →
            </a>
          ) : (
            <span className="font-manga rounded-full border border-[#0d0d0f]/20 bg-[#0d0d0f]/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#0d0d0f]/40">
              In Progress
            </span>
          )}
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