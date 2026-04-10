import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
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
import { VscVscodeInsiders } from "react-icons/vsc";

const techColors = {
  javascript: "#F7DF1E",
  java: "#007396",
  "c++": "#00599C",
  react: "#61DAFB",
  html5: "#E34F26",
  css3: "#1572B6",
  tailwind: "#38B2AC",
  framer: "#0055FF",
  "node.js": "#339933",
  express: "#888888",
  mongodb: "#47A248",
  git: "#F05032",
  github: "#ffffff",
  postman: "#FF6C37",
  figma: "#F24E1E",
  "vs code": "#007ACC",
};

const CATEGORIES = [
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Java", Icon: FaJava },
      { name: "C++", Icon: TbBrandCpp },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", Icon: SiReact },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "Framer", Icon: SiFramer },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "MongoDB", Icon: SiMongodb },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "VS Code", Icon: VscVscodeInsiders  },
      { name: "Postman", Icon: SiPostman },
      { name: "Figma", Icon: SiFigma },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function SkillCard({ name, Icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -4 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex flex-col items-center justify-center gap-2 cursor-default"
      style={{
        width: 72,
        height: 72,
        borderRadius: 12,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered ? "0 0 20px rgba(255,255,255,0.06)" : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Tooltip */}
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] uppercase tracking-wider whitespace-nowrap font-body"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          {name}
        </motion.span>
      )}
      <Icon
        size={22}
        style={{
          color: hovered
            ? techColors[name.toLowerCase()] || "white"
            : "rgba(255, 255, 255, 0.5)",
          transition: "color 0.3s ease",
        }}
      />
      <span
        className="text-[10px] font-body uppercase tracking-wide"
        style={{ color: "var(--muted)" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <span className="section-label">002 — Skills</span>
      <h2 className="section-heading">My Stack.</h2>

      <div className="flex flex-col gap-10">
        {CATEGORIES.map((cat, ci) => (
          <div key={cat.label}>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[11px] uppercase tracking-[0.18em] font-body font-medium"
                style={{ color: "var(--muted)" }}
              >
                {cat.label}
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
            </div>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {cat.skills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
