import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import MangaProgress from "./components/MangaProgress";
import TimeAware from "./components/TimeAware";
import PlotTwist from "./components/PlotTwist";
import GitHubGraph from "./components/GithubGraph";
import MobileChapterDock from "./components/MobileChapterDock";
import AchievementWall from "./components/AchievementWall";
import ContextAwareFX from "./components/ContextAwareFX";
import SecretTerminal from "./components/SecretTerminal";
import IntroAnimation from "./components/IntroAnimation";
import ToBeContinued from "./components/ToBeContinued";
import ThemeToggle from "./components/ThemeToggle";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import Contact from "./sections/Contact";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "paper";
  const stored = localStorage.getItem("theme");
  if (stored === "paper" || stored === "ink") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "ink"
    : "paper";
};

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "ink" ? "paper" : "ink"));

  return (
    <>
      <IntroAnimation
        onComplete={() => {
          setIntroComplete(true);
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div id="scroll-progress" />

        <CustomCursor />
        <ContextAwareFX />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        {/* <SecretTerminal /> */}
        {/* <ScrollProgress /> */}
        {/* <MangaProgress /> */}
        {/* <MobileChapterDock /> */}
        <TimeAware />
        {/* <PlotTwist /> */}

        <AnimatePresence>
          <main>
            <Hero/>

            <div className="flex flex-col items-center w-full">
              <About />
              <Experience />
              <Skills />
              <Projects />
              <OpenSource />
              <AchievementWall />
              <GitHubGraph />
              <Contact />
              <ToBeContinued />
            </div>
          </main>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
