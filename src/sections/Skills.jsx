import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiHtml5,
  SiCss,
  SiFramer,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { SiPython } from "react-icons/si";
import { animate, stagger } from "animejs";

const STATS = [
  {
    category: "LANGUAGES",
    code: "LNG",
    skills: [
      { name: "JavaScript", Icon: SiJavascript, level: 88, rank: "S" },
      { name: "Java", Icon: FaJava, level: 80, rank: "A" },
      { name: "C++", Icon: TbBrandCpp, level: 75, rank: "A" },
      { name: "Python", Icon: SiPython, level: 70, rank: "A" },
    ],
  },
  {
    category: "FRONTEND",
    code: "FRT",
    skills: [
      { name: "React", Icon: SiReact, level: 90, rank: "S" },
      { name: "HTML5", Icon: SiHtml5, level: 92, rank: "S" },
      { name: "CSS3", Icon: SiCss, level: 85, rank: "A" },
      { name: "Tailwind", Icon: SiTailwindcss, level: 88, rank: "S" },
      { name: "Framer", Icon: SiFramer, level: 72, rank: "A" },
    ],
  },
  {
    category: "BACKEND",
    code: "BKD",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, level: 83, rank: "A" },
      { name: "Express", Icon: SiExpress, level: 82, rank: "A" },
      { name: "MongoDB", Icon: SiMongodb, level: 78, rank: "A" },
    ],
  },
  {
    category: "TOOLS",
    code: "TLS",
    skills: [
      { name: "Git", Icon: SiGit, level: 85, rank: "A" },
      { name: "GitHub", Icon: SiGithub, level: 85, rank: "A" },
      { name: "Postman", Icon: SiPostman, level: 75, rank: "B" },
      { name: "Figma", Icon: SiFigma, level: 65, rank: "B" },
    ],
  },
];

const RANK_COLORS = {
  S: { bg: "#0d0d0f", text: "white" },
  A: { bg: "#1a1a1a", text: "white" },
  B: { bg: "#f0ebe0", text: "#0d0d0f" },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const burstRef = useRef(null);
  const contentRef = useRef(null);

  const active = STATS[activeCategory];

  const animateBars = () => {
    const bars = contentRef.current?.querySelectorAll(".stat-bar-fill");
    const badges = contentRef.current?.querySelectorAll(".rank-badge");
    const rows = contentRef.current?.querySelectorAll(".skill-row");
    const icons = contentRef.current?.querySelectorAll(".skill-icon-box");
    const numbers = contentRef.current?.querySelectorAll(".skill-level-number");

    if (bars?.length) {
      animate(Array.from(bars), {
        width: (el) => el.dataset.level + "%",
        ease: "easeOutElastic(1, .4)",
        duration: 900,
        delay: stagger(80, { start: 150 }),
      });
    }

    if (badges?.length) {
      animate(Array.from(badges), {
        scale: [0, 1],
        opacity: [0, 1],
        ease: "easeOutElastic(1, .5)",
        duration: 500,
        delay: stagger(60, { start: 100 }),
      });
    }

    if (rows?.length) {
      animate(Array.from(rows), {
        translateX: [-20, 0],
        opacity: [0, 1],
        ease: "easeOutExpo",
        duration: 380,
        delay: stagger(70, { start: 100 }),
      });
    }

    if (icons?.length) {
      animate(Array.from(icons), {
        scale: [0.84, 1],
        opacity: [0, 1],
        ease: "easeOutBack",
        duration: 420,
        delay: stagger(60, { start: 180 }),
      });
    }

    if (numbers?.length) {
      Array.from(numbers).forEach((el, index) => {
        const target = Number(el.dataset.level || 0);
        const counter = { value: 0 };
        el.textContent = "0/100";
        animate(counter, {
          value: target,
          round: 1,
          ease: "easeOutExpo",
          duration: 850,
          delay: 220 + index * 80,
          update: () => {
            el.textContent = `${counter.value}/100`;
          },
        });
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(animateBars, 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const lines = Array.from(burstRef.current?.querySelectorAll("line") || []);
        if (lines.length) {
          animate(lines, {
            strokeDashoffset: [480, 0],
            opacity: [0.55, 0],
            ease: "easeOutExpo",
            duration: 680,
            delay: stagger(16, { start: 0 }),
          });
        }

        observer.unobserve(section);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleCategoryChange = (index) => {
    if (index === activeCategory || isTransitioning) return;
    setIsTransitioning(true);

    animate(contentRef.current, {
      translateX: [0, -40],
      opacity: [1, 0],
      ease: "easeInExpo",
      duration: 200,
      onComplete: () => {
        setActiveCategory(index);
        animate(contentRef.current, {
          translateX: [40, 0],
          opacity: [0, 1],
          ease: "easeOutExpo",
          duration: 300,
          onComplete: () => {
            setIsTransitioning(false);
            animateBars();
          },
        });
      },
    });
  };

  return (
    <div
      ref={sectionRef}
      id="skills"
      className="relative w-full paper-bg overflow-hidden"
      style={{ borderBottom: "3px solid #0d0d0f" }}
    >
      <div
        ref={burstRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-50"
        style={{ zIndex: 0 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = 160 + (i / 18) * 40;
            const rad = (angle * Math.PI) / 180;
            const cx = 720;
            const cy = 110;
            const len = 620;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(rad) * len}
                y2={cy + Math.sin(rad) * len}
                stroke="rgba(13,13,15,0.12)"
                strokeWidth={i % 3 === 0 ? "2" : "1"}
                strokeDasharray="480"
                strokeDashoffset="480"
              />
            );
          })}
        </svg>
      </div>

      <div
        className="relative z-10 w-full flex items-center overflow-hidden"
        style={{ borderBottom: "3px solid #0d0d0f" }}
      >
        <div
          className="px-8 py-4 flex-shrink-0"
          style={{ borderRight: "3px solid #0d0d0f", background: "#0d0d0f" }}
        >
          <span
            className="font-manga text-white tracking-widest"
            style={{ fontSize: 13 }}
          >
            CHAPTER 03
          </span>
        </div>
        <div className="flex-1 px-8 py-4 flex items-center justify-between">
          <h2
            className="font-manga tracking-wide"
            style={{ fontSize: "clamp(22px, 4vw, 42px)", color: "#0d0d0f" }}
          >
            CHARACTER STATS
          </h2>
        </div>
        <div
          className="px-8 py-4 flex flex-col items-center justify-center flex-shrink-0"
          style={{ borderLeft: "3px solid #0d0d0f" }}
        >
          <span
            className="font-manga text-[#0d0d0f] opacity-40"
            style={{ fontSize: 10, letterSpacing: "0.15em" }}
          >
            OVERALL
          </span>
          <span
            className="font-manga text-[#0d0d0f]"
            style={{ fontSize: 32, lineHeight: 1 }}
          >
            A+
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row" style={{ minHeight: "60vh" }}>
        <div
          className="flex flex-row md:flex-col flex-shrink-0"
          style={{ borderRight: "3px solid #0d0d0f", minWidth: 160 }}
        >
          {STATS.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryChange(i)}
              className="relative flex flex-col items-start px-5 py-5 text-left transition-colors duration-150"
              style={{
                borderBottom: "2px solid #0d0d0f",
                background: activeCategory === i ? "#0d0d0f" : "transparent",
                color: activeCategory === i ? "white" : "#0d0d0f",
                cursor: "none",
              }}
            >
              <span
                className="font-manga"
                style={{ fontSize: 10, opacity: 0.5, letterSpacing: "0.12em" }}
              >
                {cat.code}
              </span>
              <span
                className="font-manga"
                style={{ fontSize: 14, letterSpacing: "0.08em" }}
              >
                {cat.category}
              </span>
              {activeCategory === i && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute right-0 top-0 bottom-0 w-1"
                  style={{ background: "white" }}
                />
              )}
            </button>
          ))}
        </div>

        <div ref={contentRef} className="flex-1 p-8 md:p-12">
          <div
            className="flex items-center justify-between px-5 py-3 mb-8"
            style={{ border: "2px solid #0d0d0f", background: "#0d0d0f" }}
          >
            <span
              className="font-manga text-white"
              style={{ fontSize: 13, letterSpacing: "0.15em" }}
            >
              {active.category} · {active.skills.length} SKILLS EQUIPPED
            </span>
            <span
              className="font-manga text-white opacity-40"
              style={{ fontSize: 11 }}
            >
              SHIVANSH · LVL 3
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {active.skills.map((skill) => (
              <div
                key={`${activeCategory}-${skill.name}`}
                className="skill-row flex items-center gap-5"
                style={{ opacity: 0 }}
              >
                <div
                  className="rank-badge flex-shrink-0 flex items-center justify-center font-manga"
                  style={{
                    width: 36,
                    height: 36,
                    background: RANK_COLORS[skill.rank].bg,
                    color: RANK_COLORS[skill.rank].text,
                    fontSize: 16,
                    border: "2px solid #0d0d0f",
                    boxShadow: "2px 2px 0px #0d0d0f",
                    opacity: 0,
                    transform: "scale(0)",
                  }}
                >
                  {skill.rank}
                </div>

                <div
                  className="skill-icon-box flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    border: "2px solid #0d0d0f",
                    background: "white",
                    boxShadow: "2px 2px 0px #0d0d0f",
                    opacity: 0,
                  }}
                >
                  <skill.Icon size={20} color="#0d0d0f" />
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-manga"
                      style={{
                        fontSize: 14,
                        color: "#0d0d0f",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="skill-level-number font-manga"
                      data-level={skill.level}
                      style={{
                        fontSize: 12,
                        color: "rgba(13,13,15,0.4)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {skill.level}/100
                    </span>
                  </div>
                  <div
                    className="relative h-2 w-full overflow-hidden"
                    style={{
                      background: "rgba(13,13,15,0.12)",
                      border: "1px solid rgba(13,13,15,0.2)",
                    }}
                  >
                    <div
                      className="stat-bar-fill absolute top-0 left-0 h-full"
                      data-level={skill.level}
                      style={{ width: "0%", background: "#0d0d0f" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 px-5 py-3 flex items-center gap-3"
            style={{
              border: "1.5px solid rgba(13,13,15,0.2)",
              background: "rgba(13,13,15,0.04)",
            }}
          >
            <span
              className="font-manga text-[#0d0d0f] opacity-30"
              style={{ fontSize: 10, letterSpacing: "0.2em" }}
            >
              DEV NOTE
            </span>
            <span
              className="font-body text-[12px]"
              style={{ color: "rgba(13,13,15,0.45)", fontStyle: "italic" }}
            >
              Stats reflect real-world project experience, not just tutorials.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
