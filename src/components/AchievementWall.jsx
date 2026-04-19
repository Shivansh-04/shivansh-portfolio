import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { Trophy, Flame, Medal, Sparkles, Target, Rocket } from "lucide-react";

const BADGES = [
  {
    code: "A-01",
    title: "DSA HUNTER",
    subtitle: "200+ problems solved",
    detail: "Consistent problem solving across LeetCode and CodeChef.",
    Icon: Target,
    tone: "#0d0d0f",
    invert: true,
  },
  {
    code: "A-02",
    title: "SHIP MODE",
    subtitle: "MERN builds in production",
    detail: "Portfolio projects move beyond tutorials into complete product thinking.",
    Icon: Rocket,
    tone: "#f8f4ec",
    invert: false,
  },
  {
    code: "A-03",
    title: "OPEN ARC",
    subtitle: "GSoC preparation in motion",
    detail: "Reading codebases, building context, and preparing for open source contribution.",
    Icon: Sparkles,
    tone: "#0d0d0f",
    invert: true,
  },
];

const STAMPS = [
  { label: "HACKATHONS", value: "2", Icon: Trophy },
  { label: "FEATURED BUILDS", value: "4", Icon: Medal },
  { label: "ACTIVE STREAK", value: "2026", Icon: Flame },
];

function BadgeCard({ badge }) {
  const text = badge.invert ? "white" : "#0d0d0f";
  const sub = badge.invert ? "rgba(255,255,255,0.5)" : "rgba(13,13,15,0.45)";
  const border = badge.invert ? "rgba(255,255,255,0.14)" : "#0d0d0f";

  return (
    <div
      className="achievement-card relative flex h-full flex-col p-5 md:p-6"
      style={{
        background: badge.tone,
        color: text,
        border: `2px solid ${border}`,
        boxShadow: badge.invert
          ? "4px 4px 0px rgba(255,255,255,0.08)"
          : "4px 4px 0px rgba(13,13,15,0.18)",
        opacity: 1,
        transform: "scale(1) rotate(0deg)",
      }}
    >
      <div
        className="achievement-code absolute top-3 left-3"
        style={{
          border: `1.5px solid ${border}`,
          padding: "2px 8px",
          background: badge.invert ? "rgba(255,255,255,0.08)" : "#0d0d0f",
          opacity: 1,
          transform: "scale(1)",
        }}
      >
        <span
          className="font-manga"
          style={{
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "white",
            opacity: badge.invert ? 0.75 : 1,
          }}
        >
          {badge.code}
        </span>
      </div>

      <div
        className="achievement-ring pointer-events-none absolute inset-0"
        style={{
          border: `2px solid ${badge.invert ? "rgba(255,255,255,0.18)" : "rgba(13,13,15,0.18)"}`,
          opacity: 0,
          transform: "scale(0.75)",
        }}
      />

      <div className="flex flex-1 items-start justify-between gap-4 pt-8">
        <div className="flex min-h-full flex-1 flex-col">
          <span
            className="achievement-label font-manga block"
            style={{ fontSize: 10, letterSpacing: "0.2em", color: sub, opacity: 1 }}
          >
            BADGE UNLOCKED
          </span>
          <h3
            className="achievement-title font-manga mt-2"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              letterSpacing: "0.05em",
              opacity: 1,
              transform: "translateY(0px)",
            }}
          >
            {badge.title}
          </h3>
          <p
            className="achievement-subtitle font-body mt-3"
            style={{
              fontSize: 13,
              lineHeight: 1.75,
              color: sub,
              maxWidth: 320,
              opacity: 1,
            }}
          >
            {badge.subtitle}
          </p>
          <div
            className="mt-auto pt-4"
            style={{
              borderTop: `1px solid ${
                badge.invert ? "rgba(255,255,255,0.12)" : "rgba(13,13,15,0.12)"
              }`,
            }}
          >
            <p
              className="achievement-detail font-body"
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                color: badge.invert ? "rgba(255,255,255,0.7)" : "rgba(13,13,15,0.65)",
                opacity: 1,
              }}
            >
              {badge.detail}
            </p>
          </div>
        </div>

        <div
          className="achievement-icon flex items-center justify-center flex-shrink-0"
          style={{
            width: 52,
            height: 52,
            border: `2px solid ${border}`,
            background: badge.invert ? "rgba(255,255,255,0.08)" : "white",
            opacity: 1,
            transform: "scale(1)",
          }}
        >
          <badge.Icon size={22} color={text} />
        </div>
      </div>
    </div>
  );
}

export default function AchievementWall() {
  const sectionRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const runAnimation = () => {
      const lines = Array.from(linesRef.current?.querySelectorAll("line") || []);
      const cards = Array.from(section.querySelectorAll(".achievement-card"));
      const codes = Array.from(section.querySelectorAll(".achievement-code"));
      const icons = Array.from(section.querySelectorAll(".achievement-icon"));
      const titles = Array.from(section.querySelectorAll(".achievement-title"));
      const labels = Array.from(section.querySelectorAll(".achievement-label"));
      const subtitles = Array.from(section.querySelectorAll(".achievement-subtitle"));
      const details = Array.from(section.querySelectorAll(".achievement-detail"));
      const rings = Array.from(section.querySelectorAll(".achievement-ring"));
      const stampBoard = section.querySelector(".stamp-board");
      const stampItems = Array.from(section.querySelectorAll(".stamp-item"));

      if (lines.length) {
        animate(lines, {
          strokeDashoffset: [700, 0],
          opacity: [0.7, 0],
          ease: "easeOutExpo",
          duration: 800,
          delay: stagger(18, { start: 0 }),
        });
      }

      if (cards.length) {
        animate(cards, {
          scale: [0.94, 1.03, 1],
          rotate: ["-2deg", "1deg", "0deg"],
          ease: "easeOutElastic(1, .6)",
          duration: 850,
          delay: stagger(150, { start: 120 }),
        });
      }

      if (codes.length) {
        animate(codes, {
          scale: [1.2, 1],
          ease: "easeOutBack",
          duration: 420,
          delay: stagger(150, { start: 260 }),
        });
      }

      if (icons.length) {
        animate(icons, {
          scale: [0.7, 1.12, 1],
          ease: "easeOutElastic(1, .5)",
          duration: 650,
          delay: stagger(150, { start: 300 }),
        });
      }

      if (rings.length) {
        animate(rings, {
          opacity: [0, 0.45, 0],
          scale: [0.75, 1.12, 1.24],
          ease: "easeOutExpo",
          duration: 780,
          delay: stagger(150, { start: 240 }),
        });
      }

      if (labels.length) {
        animate(labels, {
          translateY: [8, 0],
          ease: "easeOutExpo",
          duration: 300,
          delay: stagger(150, { start: 380 }),
        });
      }

      if (titles.length) {
        animate(titles, {
          translateY: [12, 0],
          ease: "easeOutExpo",
          duration: 420,
          delay: stagger(150, { start: 440 }),
        });
      }

      if (subtitles.length) {
        animate(subtitles, {
          translateY: [10, 0],
          ease: "easeOutExpo",
          duration: 360,
          delay: stagger(150, { start: 520 }),
        });
      }

      if (details.length) {
        animate(details, {
          translateY: [10, 0],
          ease: "easeOutExpo",
          duration: 380,
          delay: stagger(150, { start: 620 }),
        });
      }

      if (stampBoard) {
        animate(stampBoard, {
          translateX: [-30, 0],
          ease: "easeOutExpo",
          duration: 520,
          delay: 520,
        });
      }

      if (stampItems.length) {
        animate(stampItems, {
          scale: [0.86, 1.04, 1],
          translateY: [18, 0],
          ease: "easeOutElastic(1, .55)",
          duration: 720,
          delay: stagger(110, { start: 700 }),
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.unobserve(section);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full paper-bg overflow-hidden"
      style={{ borderBottom: "3px solid #0d0d0f" }}
    >
      <div
        ref={linesRef}
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ zIndex: 0 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 22 }).map((_, i) => {
            const angle = (i / 22) * 360;
            const rad = (angle * Math.PI) / 180;
            const cx = 720;
            const cy = 110;
            const len = 900;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(rad) * len}
                y2={cy + Math.sin(rad) * len}
                stroke="rgba(13,13,15,0.14)"
                strokeWidth={i % 4 === 0 ? "2" : "1"}
                strokeDasharray="700"
                strokeDashoffset="700"
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
            BONUS STAGE
          </span>
        </div>
        <div className="flex-1 px-8 py-4">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-manga tracking-wide"
            style={{ fontSize: "clamp(22px, 4vw, 42px)", color: "#0d0d0f" }}
          >
            ACHIEVEMENTS & BADGE WALL
          </motion.h2>
        </div>
      </div>

      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-3"
        style={{ borderBottom: "3px solid #0d0d0f" }}
      >
        {BADGES.map((badge, index) => (
          <div
            key={badge.code}
            className="h-full"
            style={{
              borderRight: index < BADGES.length - 1 ? "1.5px solid #0d0d0f" : "none",
              borderLeft: index === 0 ? "3px solid #0d0d0f" : "none",
            }}
          >
            <BadgeCard badge={badge} />
          </div>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="stamp-board relative p-6 md:p-8"
          style={{
            borderRight: "3px solid #0d0d0f",
            background: "#0d0d0f",
            opacity: 1,
          }}
        >
          <div
            className="absolute top-4 left-4"
            style={{ border: "1.5px solid rgba(255,255,255,0.18)", padding: "2px 8px" }}
          >
            <span
              className="font-manga text-white opacity-50"
              style={{ fontSize: 9, letterSpacing: "0.18em" }}
            >
              STAMP BOARD
            </span>
          </div>

          <div className="pt-8">
            <h3
              className="font-manga text-white"
              style={{ fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.05em" }}
            >
              PROGRESS LOOKS BETTER WHEN IT FEELS EARNED.
            </h3>
            <p
              className="font-body mt-4"
              style={{
                fontSize: 13,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.52)",
                maxWidth: 420,
              }}
            >
              This wall turns the portfolio into a record of momentum, not just a list of
              technologies. It gives mobile users a clearer sense of growth at a glance too.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {STAMPS.map((stamp, index) => (
            <div
              key={stamp.label}
              className="stamp-item relative flex flex-col items-start justify-between p-6"
              style={{
                borderLeft: index === 0 ? "none" : "1.5px solid #0d0d0f",
                borderTop: "none",
                background: index % 2 === 0 ? "#f8f4ec" : "white",
                minHeight: 220,
                opacity: 1,
                transform: "translateY(0px) scale(1)",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  border: "2px solid #0d0d0f",
                  background: "#0d0d0f",
                  boxShadow: "3px 3px 0px rgba(13,13,15,0.16)",
                }}
              >
                <stamp.Icon size={20} color="white" />
              </div>

              <div className="mt-10">
                <span
                  className="font-manga text-[#0d0d0f] block"
                  style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.35 }}
                >
                  {stamp.label}
                </span>
                <span
                  className="font-manga text-[#0d0d0f] block mt-2"
                  style={{ fontSize: "clamp(38px, 4vw, 54px)", lineHeight: 1 }}
                >
                  {stamp.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
