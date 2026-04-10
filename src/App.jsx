import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import ScrollMarquee from './components/ScrollMarquee'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import OpenSource from './sections/OpenSource'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <div id="scroll-progress" />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <AnimatePresence>
        <main>
          <Hero />
          <ScrollMarquee direction={1} />
          <div className="flex flex-col items-center w-full">
            <About />
            <ScrollMarquee direction={-1} />
            <Skills />
            <Projects />
            <ScrollMarquee direction={1} />
            <OpenSource />
            <Contact />
          </div>
        </main>
      </AnimatePresence>
    </>
  )
}