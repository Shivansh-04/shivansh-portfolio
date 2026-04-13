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
import TimeAware from './components/TimeAware'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

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

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div id="scroll-progress" />
        <CustomCursor />
        <ScrollProgress />
        {/* <ThemeToggle isDark={isDark} onToggle={toggleTheme} /> */}
        <MangaProgress />
        <TimeAware />

        <AnimatePresence>
          <main>
            <Hero />
            <div className="flex flex-col items-center w-full">
              <About />
              <Skills />
              <Projects />
              <OpenSource />
              <Contact />
              <ToBeContinued />
            </div>
          </main>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
