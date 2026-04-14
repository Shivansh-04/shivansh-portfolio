import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import Contact from "./sections/Contact";
import ToBeContinued from "./components/ToBeContinued";
import IntroAnimation from "./components/IntroAnimation";
import ThemeToggle from "./components/ThemeToggle";
import MangaProgress from "./components/MangaProgress";
import TimeAware from "./components/TimeAware";
import PlotTwist from "./components/PlotTwist";
import InkSplash from "./components/InkSplash";
import GitHubGraph from "./components/GithubGraph"; // !review
import VisitorCounter from "./components/VisitorCounter"; // !review
import ChapterLoader from "./components/ChapterLoader";
import CodingDNA from "./components/CodingDNA";
import HiringMode from "./components/HiringMode";
import MobileChapterCover from "./components/MobileChapterCover";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "paper",
    );
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "paper");
  }, []);

//   useEffect(() => {
//   if (!loaderComplete) return

//   let touchStartX = 0
//   let touchStartY = 0

//   const CHAPTER_IDS = ['hero', 'about', 'skills', 'projects', 'opensource', 'github', 'contact']

//   const getCurrentChapter = () => {
//     const scrollY = window.scrollY
//     let current = 0
//     CHAPTER_IDS.forEach((id, i) => {
//       const el = document.getElementById(id)
//       if (el && scrollY >= el.offsetTop - 200) current = i
//     })
//     return current
//   }

//   const onTouchStart = (e) => {
//     touchStartX = e.touches[0].clientX
//     touchStartY = e.touches[0].clientY
//   }

//   const onTouchEnd = (e) => {
//     const dx = e.changedTouches[0].clientX - touchStartX
//     const dy = e.changedTouches[0].clientY - touchStartY

//     // Only trigger on predominantly vertical swipes
//     if (Math.abs(dy) < Math.abs(dx)) return
//     if (Math.abs(dy) < 60) return

//     const current = getCurrentChapter()

//     if (dy < 0 && current < CHAPTER_IDS.length - 1) {
//       // Swipe up — next chapter
//       const next = document.getElementById(CHAPTER_IDS[current + 1])
//       if (next) next.scrollIntoView({ behavior: 'smooth' })
//     } else if (dy > 0 && current > 0) {
//       // Swipe down — previous chapter
//       const prev = document.getElementById(CHAPTER_IDS[current - 1])
//       if (prev) prev.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//   window.addEventListener('touchstart', onTouchStart, { passive: true })
//   window.addEventListener('touchend', onTouchEnd, { passive: true })

//   return () => {
//     window.removeEventListener('touchstart', onTouchStart)
//     window.removeEventListener('touchend', onTouchEnd)
//   }
// }, [loaderComplete])

  return (
    <>
      <IntroAnimation
        onComplete={() => {
          setIntroComplete(true)
          setLoaderComplete(true)
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div id="scroll-progress" />
        <CustomCursor />
        <ScrollProgress />
        {/* <ThemeToggle isDark={isDark} onToggle={toggleTheme} /> */}
        {/* <HiringMode /> */}
        <MangaProgress />
        {/* <MobileChapterCover /> */}
        <TimeAware />
        {/* <VisitorCounter /> */}
        <PlotTwist />

        <AnimatePresence>
          <main>
            <Hero />
            <div className="flex flex-col items-center w-full">
              <About />
              {/* <InkSplash /> */}
              <Skills />
              {/* <InkSplash /> */}
              <Projects />
              {/* <InkSplash /> */}
              <OpenSource />
              {/* <InkSplash /> */}
              <GitHubGraph />
              {/* <InkSplash /> */}
              {/* <CodingDNA /> */}
              {/* <InkSplash /> */}
              <Contact />
              {/* <InkSplash /> */}
              <ToBeContinued />
            </div>
          </main>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
