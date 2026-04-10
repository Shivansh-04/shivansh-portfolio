import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'

const PROJECTS = [
  {
  id: 1,
  name: 'MindSpace',
  tagline: 'AI-powered mental health support and monitoring system',
  description: 'A full-stack platform designed to provide accessible mental health support through AI-driven interactions, mood tracking, and guided resources. The system includes sentiment analysis, anonymous user support, and structured workflows for connecting users with relevant help, built with a scalable MERN architecture and privacy-focused design.',
  tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AI'],
  category: ['Full Stack', 'AI/ML'],
  featured: true,
  github: 'https://github.com/shivansh',
  live: '#',
  challenges: 'Balancing real-time AI interaction with user privacy, while designing a scalable architecture to handle sensitive data and modular feature integration.'
},
  {
  id: 2,
  name: 'SurakshaSetu',
  tagline: 'AI-assisted real-time crime reporting system',
  description: 'A MERN-based platform designed to streamline crime reporting by enabling users to submit incidents with location data, media, and descriptions. Integrated AI models assist in categorizing reports and prioritizing cases, while Socket.io enables real-time status updates and communication flow between users and the system.',
  tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'AI', 'Maps API',],
  category: ['Full Stack', 'AI/ML'],
  featured: true,
  github: 'https://github.com/shivansh',
  live: '#',
  challenges: 'Designing a scalable real-time communication system while ensuring accurate AI-based classification and efficient handling of location-based data.'
},
  {
  id: 3,
  name: 'Sorting Visualizer',
  tagline: 'Real-time algorithm visualization with dynamic controls',
  description: 'A full-stack sorting visualizer that demonstrates algorithms like Bubble, Merge, and Quick Sort through step-by-step animations. Users can control speed, input size, and algorithm selection while the backend processes and streams execution logic for accurate real-time visualization.',
  tags: ['React.js', 'Node.js', 'Express.js'],
  category: ['Visualizer'],
  featured: false,
  github: 'https://github.com/shivansh',
  live: '#',
  challenges: 'Maintaining smooth animations while synchronizing algorithm execution with UI updates and handling large datasets efficiently.'
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
      <SectionWrapper id="projects">
        <span className="section-label">003 — Projects</span>
        <h2 className="section-heading">Things I've Built.</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="relative px-5 py-2 text-[12px] uppercase tracking-[0.12em] font-body font-medium rounded-sm transition-all duration-300"
              style={{
                background: activeFilter === f ? 'white' : 'transparent',
                color: activeFilter === f ? 'black' : 'var(--muted)',
                border: `1px solid ${activeFilter === f ? 'white' : 'rgba(255,255,255,0.12)'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={`group relative cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: 28,
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-bold text-white">{project.name}</h3>
                    {project.featured && (
                      <span className="shimmer-badge px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-body font-medium text-white border border-white/20">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={e => e.stopPropagation()}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <SiGithub size={16} color="white" />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink size={16} color="white" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-sm mb-5" style={{ color: 'rgba(240,240,240,0.55)', lineHeight: 1.7 }}>
                  {project.tagline}
                </p>

                {/* Tags — slide up on hover */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  {project.tags.map(tag => (
                    <span key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-body uppercase tracking-wider"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionWrapper>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9980] flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: 40,
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={18} color="white" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display text-3xl font-bold text-white">{selectedProject.name}</h3>
                {selectedProject.featured && (
                  <span className="shimmer-badge px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-body font-medium text-white border border-white/20">
                    Featured
                  </span>
                )}
              </div>

              <p className="font-body text-sm mb-6" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>
                {selectedProject.tagline}
              </p>

              <p className="font-body text-[15px] mb-6 leading-relaxed" style={{ color: 'rgba(240,240,240,0.7)' }}>
                {selectedProject.description}
              </p>

              <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="section-label mb-2">Key Challenge</span>
                <p className="font-body text-sm" style={{ color: 'rgba(240,240,240,0.6)', lineHeight: 1.7 }}>
                  {selectedProject.challenges}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map(tag => (
                  <span key={tag}
                    className="px-3 py-1 rounded-full text-[11px] font-body uppercase tracking-wider"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                  className="btn-sweep flex items-center gap-2 px-5 py-3 text-[12px] uppercase tracking-wider font-body font-medium text-white rounded-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <SiGithub size={14} /> GitHub
                </a>
                <a href={selectedProject.live} target="_blank" rel="noopener noreferrer"
                  className="btn-sweep flex items-center gap-2 px-5 py-3 text-[12px] uppercase tracking-wider font-body font-medium bg-white text-black rounded-sm"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
