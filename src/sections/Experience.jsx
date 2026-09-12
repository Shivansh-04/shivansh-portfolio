import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Bot,
  FileCheck,
  Bug,
  Languages,
  FileText,
  Calendar,
  Phone,
  TestTube,
  ChevronRight,
} from "lucide-react";

const EXPERIENCE = [
  {
    id: "npti",
    code: "NPTI",
    company: "National Power Training Institute",
    fullCompany:
      "NPTI — National Power Training Institute (An Autonomous Institute under Ministry of Power, Govt. of India)",
    role: "IT Intern",
    period: "JULY 2026 - OCTOBER 2026",
    mode: "HYBRID",
    Icon: Zap,
    tagline: "Government web standards, QA, and bilingual accuracy.",
    summary:
      "Supporting the modernization and quality assurance of NPTI's official website through GIGW 3.0 compliance, structured bug audits, and bilingual content validation.",
    achievements: [
      {
        rank: "S",
        Icon: FileCheck,
        title: "GIGW 3.0 Compliance Audit",
        desc: "Studied the Guidelines for Indian Government Websites and helped align npti.gov.in's structure and content with the standard.",
        metric: "GIGW 3.0",
      },
      {
        rank: "S",
        Icon: Bug,
        title: "Full-Site Bug Audit",
        desc: "Ran a comprehensive QA pass across npti.gov.in — broken links, UI inconsistencies, and content issues, tracked in a live report.",
        metric: "35+ bugs",
      },
      {
        rank: "A",
        Icon: Languages,
        title: "Bilingual Consistency Check",
        desc: "Audited the Hindi and English versions of the site side by side, flagging URL and content mismatches between them.",
        metric: "2 locales",
      },
      {
        rank: "A",
        Icon: FileText,
        title: "RTI Documentation Update",
        desc: "Assisted in updating the Right to Information documentation, checking accuracy, accessibility and compliance.",
        metric: "RTI docs",
      },
    ],
    note: "Hybrid role — in office Monday & Friday, remote the rest of the week.",
  },
  {
    id: "cati",
    code: "CATI AI",
    company: "CATI AI",
    fullCompany: "CATI AI — Voice AI Agent Platform",
    role: "Technical Intern",
    period: "Part-time, 2026 - PRESENT",
    mode: "REMOTE",
    Icon: Bot,
    tagline: "Tool-calling infrastructure for a live voice AI agent.",
    summary:
      "Building the Cal.com integration that lets CATI's voice AI agent check availability, book meetings, and manage schedules through natural conversation.",
    achievements: [
      {
        rank: "S",
        Icon: Calendar,
        title: "Cal.com Tool-Calling Integration",
        desc: "Building services/calcomService.js following CATI's architecture pattern — a service layer the voice agent calls mid-conversation.",
        metric: "Core task",
      },
      {
        rank: "S",
        Icon: Phone,
        title: "Voice-Driven Scheduling",
        desc: "Implementing Get Availability, Create Booking and List Bookings so the agent can schedule appointments live, on a call.",
        metric: "3 tools",
      },
      {
        rank: "A",
        Icon: TestTube,
        title: "Independent Test Environment",
        desc: "Set up a standalone testing environment to validate the full appointment-booking workflow end to end.",
        metric: "QA pass",
      },
      {
        rank: "A",
        Icon: FileText,
        title: "Architecture Documentation",
        desc: "Documented env vars, tool definitions and the test()/execute() pattern for the wider engineering team.",
        metric: "Docs",
      },
    ],
    note: "Remote internship, shipping production features for a live voice AI product.",
  },
];

export default function Experience() {
  const [activeId, setActiveId] = useState(EXPERIENCE[0].id);
  const active = EXPERIENCE.find((e) => e.id === activeId);

  return (
    <section
      id="experience"
      className="relative w-full paper-bg overflow-hidden"
      style={{ borderBottom: "3px solid var(--line-strong)" }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Chapter title bar */}
      <div
        className="relative z-10 w-full flex items-center overflow-hidden"
        style={{ borderBottom: "3px solid var(--line-strong)" }}
      >
        <div
          className="px-8 py-4 flex-shrink-0"
          style={{ borderRight: "3px solid var(--line-strong)", background: "var(--reverse-bg)" }}
        >
          <span className="font-manga text-[color:var(--reverse-text)] tracking-widest" style={{ fontSize: 13 }}>
            CHAPTER 03
          </span>
        </div>
        <div className="flex-1 px-8 py-4 flex items-center justify-between gap-4">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-manga tracking-wide"
            style={{ fontSize: "clamp(22px, 4vw, 42px)", color: "var(--text)" }}
          >
            EXPERIENCE ARC
          </motion.h2>
          <span
            className="hidden md:block font-manga text-[color:var(--text)] opacity-30"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            {EXPERIENCE.length} QUESTS ACTIVE
          </span>
        </div>
      </div>

      {/* Body: 20% company list / 80% details */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_4fr] lg:items-stretch">
        {/* LEFT — company selector, tabs fill full height */}
        <div
          className="relative flex lg:flex-col lg:h-full overflow-x-auto lg:overflow-visible"
          style={{ borderRight: "3px solid var(--line-strong)", background: "var(--bg)" }}
        >
          {EXPERIENCE.map((exp, i) => {
            const isActive = exp.id === activeId;
            const isLast = i === EXPERIENCE.length - 1;
            return (
              <motion.button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                whileHover={{ x: isActive ? 0 : 3 }}
                className="group relative flex-shrink-0 lg:flex-1 lg:flex lg:flex-col justify-between text-left px-6 py-6 overflow-hidden transition-colors"
                style={{
                  borderBottom: isLast ? "none" : "1.5px solid var(--line)",
                  borderRight: "1.5px solid var(--line)",
                  minWidth: 168,
                }}
              >
                {/* sliding active background */}
                {isActive && (
                  <motion.div
                    layoutId="exp-tab-bg"
                    className="absolute inset-0"
                    style={{ background: "var(--reverse-bg)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}

                {/* watermark icon */}
                <exp.Icon
                  className="absolute -right-4 -bottom-4 pointer-events-none transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  size={104}
                  style={{
                    opacity: isActive ? 0.1 : 0.05,
                    color: isActive ? "var(--reverse-text)" : "var(--text)",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="font-body"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: isActive ? "var(--reverse-text-muted)" : "var(--text-muted)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ChevronRight
                    size={15}
                    style={{
                      color: isActive ? "var(--reverse-text)" : "var(--text-muted)",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(-4px)",
                      transition: "all 0.25s ease",
                    }}
                  />
                </div>

                <div className="relative z-10 mt-5 lg:mt-0">
                  <span
                    className="font-manga block"
                    style={{
                      fontSize: 24,
                      letterSpacing: "0.02em",
                      color: isActive ? "var(--reverse-text)" : "var(--text)",
                    }}
                  >
                    {exp.code}
                  </span>
                  <span
                    className="font-body block mt-3"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: "0.18em",
                      color: isActive ? "var(--reverse-text-muted)" : "var(--text-muted)",
                    }}
                  >
                    INTERNSHIP
                  </span>
                  <span
                    className="font-body block mt-1.5"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: isActive ? "var(--reverse-text)" : "var(--text-muted)",
                    }}
                  >
                    {exp.period}
                  </span>
                  <span
                    className="font-body block mt-0.5"
                    style={{
                      fontSize: 10.5,
                      color: isActive ? "var(--reverse-text-muted)" : "var(--text-muted)",
                    }}
                  >
                    {exp.mode}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* RIGHT — active company detail */}
        <div className="relative p-6 md:p-10">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* header bar */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6"
              style={{ background: "var(--reverse-bg)" }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.05 }}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    border: "2px solid var(--reverse-line)",
                    background: "var(--reverse-line)",
                  }}
                >
                  <active.Icon size={22} color="var(--reverse-text)" />
                </motion.div>
                <div>
                  <h3
                    className="font-manga text-[color:var(--reverse-text)]"
                    style={{ fontSize: "clamp(20px, 3vw, 30px)", letterSpacing: "0.03em" }}
                  >
                    {active.code} · {active.role}
                  </h3>
                  <p className="font-body" style={{ fontSize: 12.5, color: "var(--reverse-text-muted)" }}>
                    {active.tagline}
                  </p>
                </div>
              </div>

              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 flex-shrink-0"
                style={{ border: "1.5px solid var(--reverse-line)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                  style={{ background: "#4ade80" }}
                />
                <span className="font-manga text-[color:var(--reverse-text)]" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
                  {active.period} · {active.mode}
                </span>
              </span>
            </div>

            {/* company + summary */}
            <p className="font-body mt-4" style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
              {active.fullCompany}
            </p>
            <p
              className="font-body mt-3"
              style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-muted)", maxWidth: 640 }}
            >
              {active.summary}
            </p>

            {/* achievement rows */}
            <div className="mt-7 grid gap-3">
              {active.achievements.map((a, index) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3, boxShadow: "5px 5px 0px var(--shadow)" }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="flex items-center gap-4 p-4"
                  style={{
                    borderTop: "1.5px solid var(--line)",
                    borderRight: "1.5px solid var(--line)",
                    borderBottom: "1.5px solid var(--line)",
                    borderLeft: a.rank === "S" ? "4px solid var(--line-strong)" : "1.5px solid var(--line)",
                    background: "var(--surface-2)",
                    boxShadow: "3px 3px 0px var(--shadow)",
                  }}
                >
                  <span
                    className="font-manga flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "2px solid var(--line-strong)",
                      fontSize: 13,
                      color: "var(--text)",
                      boxShadow: a.rank === "S" ? "0 0 0 3px var(--shadow)" : "none",
                    }}
                  >
                    {a.rank}
                  </span>

                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 38, height: 38, border: "1.5px solid var(--line)" }}
                  >
                    <a.Icon size={17} color="var(--text)" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold" style={{ fontSize: 13.5, color: "var(--text)" }}>
                      {a.title}
                    </p>
                    <p className="font-body mt-0.5" style={{ fontSize: 12.5, lineHeight: 1.6, color: "var(--text-muted)" }}>
                      {a.desc}
                    </p>
                  </div>

                  <span
                    className="font-manga flex-shrink-0 px-3 py-1"
                    style={{ fontSize: 10, letterSpacing: "0.1em", border: "1.5px solid var(--line-strong)", color: "var(--text)" }}
                  >
                    {a.metric}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* dev note */}
            <div
              className="mt-6 p-4 flex items-start gap-3"
              style={{ border: "1.5px dashed var(--line)", background: "transparent" }}
            >
              <span
                className="font-manga flex-shrink-0"
                style={{ fontSize: 10, letterSpacing: "0.15em", color: "var(--text-muted)" }}
              >
                NOTE
              </span>
              <p className="font-body italic" style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
                {active.note}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}