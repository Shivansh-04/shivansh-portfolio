import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { SiGithub } from 'react-icons/si'

const PROJECTS = [
  {
    id: 1,
    name: 'MindSpace',
    tagline: 'AI-driven mental health support platform',
    description: 'A full-stack AI-powered platform providing anonymous mental health support, mood tracking, and personalized recommendations with a strong focus on privacy and scalability.',
    tags: ['React', 'Node.js', 'MongoDB', 'AI', 'Express'],
    category: ['Full Stack', 'AI/ML'],
    featured: true,
    github: 'https://github.com/Shivansh-04/mental-health.git',
    live: 'https://mental-health-beta.vercel.app/',
    challenges: 'Built real-time AI interactions while maintaining low latency and ensuring strict data privacy.',
    panel: 'A',
  },
  {
    id: 2,
    name: 'SurakshaSetu',
    tagline: 'AI-powered crime reporting system',
    description: 'An intelligent reporting platform that classifies crime reports using AI, routes them to authorities, and provides real-time tracking with location-based insights.',
    tags: ['MERN', 'AI', 'Maps API', 'Socket.io'],
    category: ['Full Stack', 'AI/ML'],
    featured: true,
    github: 'https://github.com/Shivansh-04',
    live: '#',
    challenges: 'Handled multi-API integration and built a reliable real-time communication pipeline.',
    panel: 'B',
  },
  {
    id: 3,
    name: 'Sorting Visualizer',
    tagline: 'Interactive algorithm visualization tool',
    description: 'A web-based visualizer demonstrating sorting algorithms like Bubble, Merge, and Quick Sort with step-by-step animations and performance comparison.',
    tags: ['JavaScript', 'React', 'Node.js', 'CSS'],
    category: ['Visualizer'],
    featured: false,
    github: 'https://github.com/Shivansh-04/sort-scape-animations.git',
    live: 'https://sortingvisualizer-zeta.vercel.app/',
    challenges: 'Optimized rendering logic to achieve smooth animations for large datasets.',
    panel: 'C',
  },
  {
    id: 4,
    name: 'Image Upload & Storage Service',
    tagline: 'Backend service for file uploads using ImageKit',
    description: 'A backend service built with Express and Multer to handle image uploads, process files, and store them securely using ImageKit with efficient API integration.',
    tags: ['Node.js', 'Express', 'Multer', 'ImageKit API'],
    category: ['Backend'],
    featured: false,
    github: 'https://github.com/Shivansh-04',
    live: '#',
    challenges: 'Handled file processing, base64 conversion, and secure cloud storage integration.',
    panel: 'D',
  },
]

const FILTERS = ['All', 'Full Stack', 'AI/ML', 'Visualizer']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(activeFilter))

  return (
    <>
      <div
        className="relative w-full paper-bg"
        style={{ borderBottom: '3px solid #0d0d0f' }}
      >
        {/* ── Chapter title bar ── */}
        <div
          className="w-full flex items-center overflow-hidden"
          style={{ borderBottom: '3px solid #0d0d0f' }}
        >
          <div
            className="px-8 py-4 flex items-center gap-4 flex-shrink-0"
            style={{ borderRight: '3px solid #0d0d0f', background: '#0d0d0f' }}
          >
            <span className="font-manga text-white tracking-widest" style={{ fontSize: 13 }}>
              CHAPTER 04
            </span>
          </div>
          <div className="flex-1 px-8 py-4 flex items-center justify-between overflow-hidden">
            <motion.h2
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-manga tracking-wide"
              style={{ fontSize: 'clamp(22px, 4vw, 42px)', color: '#0d0d0f' }}
            >
              THINGS I'VE BUILT
            </motion.h2>

            {/* projects-action.png decorative */}
            <div className="relative flex-shrink-0 hidden md:block" style={{ height: 110, width: 110 }}>
              <img
                src="/projects-action.png"
                alt=""
                className="h-full w-full object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div
          className="flex items-center"
          style={{ borderBottom: '3px solid #0d0d0f' }}
        >
          {FILTERS.map((f, i) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="relative px-6 py-3 font-manga transition-all duration-200"
              style={{
                fontSize: 12,
                letterSpacing: '0.15em',
                borderRight: '2px solid #0d0d0f',
                background: activeFilter === f ? '#0d0d0f' : 'transparent',
                color: activeFilter === f ? 'white' : 'rgba(13,13,15,0.5)',
                cursor: 'none',
              }}
            >
              {f}
              {activeFilter === f && (
                <motion.div
                  layoutId="filter-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: 'white' }}
                />
              )}
            </button>
          ))}
          <div className="flex-1" />
          <span
            className="font-manga px-6 py-3"
            style={{ fontSize: 11, color: 'rgba(13,13,15,0.3)', letterSpacing: '0.15em' }}
          >
            {filtered.length} PROJECTS
          </span>
        </div>

        {/* ── Project panels grid ── */}
        <div className="p-0">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className={`relative group cursor-none ${project.featured && filtered.length === PROJECTS.length ? 'md:col-span-2' : ''}`}
                  style={{
                    border: '1.5px solid #0d0d0f',
                    borderTop: 'none',
                    borderLeft: i % 2 !== 0 ? '1.5px solid #0d0d0f' : '3px solid #0d0d0f',
                    background: '#f8f4ec',
                  }}
                  whileHover={{ background: '#ede8dc' }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Panel label */}
                  <div
                    className="absolute top-4 left-4 z-10"
                    style={{ border: '1.5px solid #0d0d0f', padding: '2px 8px', background: '#0d0d0f' }}
                  >
                    <span className="font-manga text-white" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
                      PANEL {project.panel}
                    </span>
                  </div>

                  {/* Featured stamp */}
                  {project.featured && (
                    <div
                      className="absolute top-4 right-4 z-10"
                      style={{
                        border: '2px solid #0d0d0f',
                        padding: '2px 10px',
                        transform: 'rotate(2deg)',
                        background: '#0d0d0f',
                      }}
                    >
                      <span className="font-manga text-white" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
                        FEATURED
                      </span>
                    </div>
                  )}

                  <div className="p-6 pt-12">
                    {/* Project name */}
                    <h3
                      className="font-manga text-[#0d0d0f] mb-1 leading-tight"
                      style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '0.04em' }}
                    >
                      {project.name}
                    </h3>

                    {/* Divider line */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-px" style={{ background: '#0d0d0f', opacity: 0.15 }} />
                    </div>

                    {/* Tagline */}
                    <p
                      className="font-body mb-6"
                      style={{ fontSize: 14, color: 'rgba(13,13,15,0.6)', lineHeight: 1.7 }}
                    >
                      {project.tagline}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-manga"
                          style={{
                            fontSize: 10,
                            letterSpacing: '0.12em',
                            border: '1.5px solid #0d0d0f',
                            padding: '2px 8px',
                            color: '#0d0d0f',
                            background: 'white',
                            boxShadow: '1.5px 1.5px 0px #0d0d0f',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom row — links + read more */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={e => e.stopPropagation()}
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 transition-colors"
                          style={{ border: '1.5px solid #0d0d0f', background: 'white', boxShadow: '2px 2px 0px #0d0d0f' }}
                        >
                          <SiGithub size={14} color="#0d0d0f" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 transition-colors"
                          style={{ border: '1.5px solid #0d0d0f', background: 'white', boxShadow: '2px 2px 0px #0d0d0f' }}
                        >
                          <ExternalLink size={14} color="#0d0d0f" />
                        </a>
                      </div>

                      <motion.span
                        className="font-manga"
                        style={{ fontSize: 11, color: 'rgba(13,13,15,0.35)', letterSpacing: '0.15em' }}
                        whileHover={{ color: '#0d0d0f' }}
                      >
                        READ MORE →
                      </motion.span>
                    </div>
                  </div>

                  {/* Bottom panel number */}
                  <div
                    className="absolute bottom-3 right-4 font-manga"
                    style={{ fontSize: 9, color: '#0d0d0f', opacity: 0.15, letterSpacing: '0.12em' }}
                  >
                    04 · {String(i + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9980] flex items-center justify-center p-6"
            style={{ background: 'rgba(13,13,15,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl paper-bg"
              style={{ border: '3px solid #0d0d0f', boxShadow: '8px 8px 0px #0d0d0f' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal top bar */}
              <div
                className="flex items-center justify-between px-6 py-3"
                style={{ borderBottom: '3px solid #0d0d0f', background: '#0d0d0f' }}
              >
                <span className="font-manga text-white" style={{ fontSize: 11, letterSpacing: '0.2em' }}>
                  PROJECT FILE · CLASSIFIED
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1"
                  style={{ cursor: 'none' }}
                >
                  <X size={16} color="white" />
                </button>
              </div>

              <div className="p-8">
                {/* Name */}
                <div className="flex items-start justify-between mb-2 gap-4">
                  <h3
                    className="font-manga text-[#0d0d0f] leading-tight"
                    style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '0.04em' }}
                  >
                    {selectedProject.name}
                  </h3>
                  {selectedProject.featured && (
                    <div
                      className="flex-shrink-0 mt-1"
                      style={{
                        border: '2px solid #0d0d0f',
                        padding: '2px 10px',
                        transform: 'rotate(2deg)',
                        background: '#0d0d0f',
                      }}
                    >
                      <span className="font-manga text-white" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                <p
                  className="font-body mb-6"
                  style={{ fontSize: 13, color: 'rgba(13,13,15,0.5)', letterSpacing: '0.02em' }}
                >
                  {selectedProject.tagline}
                </p>

                <div className="h-px w-full mb-6" style={{ background: '#0d0d0f', opacity: 0.12 }} />

                <p
                  className="font-body mb-6"
                  style={{ fontSize: 15, color: 'rgba(13,13,15,0.7)', lineHeight: 1.8 }}
                >
                  {selectedProject.description}
                </p>

                {/* Challenge box */}
                <div
                  className="mb-6 p-4"
                  style={{ border: '2px solid #0d0d0f', background: '#0d0d0f', boxShadow: '4px 4px 0px rgba(13,13,15,0.2)' }}
                >
                  <span className="font-manga text-white opacity-50 block mb-1" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                    KEY CHALLENGE
                  </span>
                  <p className="font-body text-white" style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.75 }}>
                    {selectedProject.challenges}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-manga"
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.12em',
                        border: '1.5px solid #0d0d0f',
                        padding: '2px 8px',
                        color: '#0d0d0f',
                        background: 'white',
                        boxShadow: '1.5px 1.5px 0px #0d0d0f',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manga flex items-center gap-2 px-5 py-3"
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.12em',
                      border: '2.5px solid #0d0d0f',
                      color: '#0d0d0f',
                      boxShadow: '3px 3px 0px #0d0d0f',
                      background: 'white',
                    }}
                  >
                    <SiGithub size={14} /> GITHUB
                  </a>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manga flex items-center gap-2 px-5 py-3"
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.12em',
                      border: '2.5px solid #0d0d0f',
                      color: 'white',
                      background: '#0d0d0f',
                      boxShadow: '3px 3px 0px rgba(13,13,15,0.3)',
                    }}
                  >
                    <ExternalLink size={14} /> LIVE DEMO
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}