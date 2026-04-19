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
import MobileChapterDock from "./components/MobileChapterDock";
import AchievementWall from "./components/AchievementWall";
import ContextAwareFX from "./components/ContextAwareFX";
import SecretTerminal from "./components/SecretTerminal";
import JourneyMode from "./components/JourneyMode";

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
        <ContextAwareFX />
        <SecretTerminal />
        <ScrollProgress />
        {/* <ThemeToggle isDark={isDark} onToggle={toggleTheme} /> */}
        {/* <HiringMode /> */}
        <MangaProgress />
        {/* <MobileChapterCover /> */}
        <MobileChapterDock />
        <TimeAware />
        {/* <VisitorCounter /> */}
        <PlotTwist />

        <AnimatePresence>
          <main>
            <Hero />
            {/* <JourneyMode /> */}
            <div className="flex flex-col items-center w-full">
              <About />
              {/* <InkSplash /> */}
              <Skills />
              {/* <InkSplash /> */}
              <Projects />
              {/* <InkSplash /> */}
              <OpenSource />
              {/* <InkSplash /> */}
              <AchievementWall />
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
