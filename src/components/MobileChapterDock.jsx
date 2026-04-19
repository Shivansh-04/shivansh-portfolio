import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sparkles, FolderKanban, Trophy, Award, GitBranch, Mail } from "lucide-react";

const CHAPTERS = [
  { id: "about", label: "ABOUT", Icon: User },
  { id: "skills", label: "STATS", Icon: Sparkles },
  { id: "projects", label: "WORK", Icon: FolderKanban },
  { id: "opensource", label: "OPEN", Icon: Trophy },
  { id: "achievements", label: "BADGES", Icon: Award },
  { id: "github", label: "LOG", Icon: GitBranch },
  { id: "contact", label: "TALK", Icon: Mail },
];

export default function MobileChapterDock() {
  const [visible, setVisible] = useState(false);
  const [activeChapter, setActiveChapter] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > window.innerHeight * 0.45);

      let current = "about";
      CHAPTERS.forEach((chapter) => {
        const el = document.getElementById(chapter.id);
        if (el && scrollY >= el.offsetTop - 180) current = chapter.id;
      });
      setActiveChapter(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-3 left-1/2 z-[9992] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 xl:hidden"
        >
          <div
            className="overflow-x-auto"
            style={{
              border: "2.5px solid #0d0d0f",
              background: "rgba(240,235,224,0.94)",
              backdropFilter: "blur(10px)",
              boxShadow: "4px 4px 0px rgba(13,13,15,0.16)",
            }}
          >
            <div className="flex items-stretch min-w-max">
              {CHAPTERS.map((chapter) => {
                const isActive = chapter.id === activeChapter;
                const Icon = chapter.Icon;

                return (
                  <button
                    key={chapter.id}
                    onClick={() => goToChapter(chapter.id)}
                    data-fx
                    data-fx-label={chapter.label}
                    className="flex flex-col items-center justify-center gap-1 px-4 py-3"
                    style={{
                      minWidth: 78,
                      borderRight: "1.5px solid #0d0d0f",
                      background: isActive ? "#0d0d0f" : "transparent",
                      color: isActive ? "white" : "#0d0d0f",
                      cursor: "none",
                    }}
                  >
                    <Icon size={15} color={isActive ? "white" : "#0d0d0f"} />
                    <span
                      className="font-manga"
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.16em",
                        opacity: isActive ? 1 : 0.45,
                      }}
                    >
                      {chapter.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
