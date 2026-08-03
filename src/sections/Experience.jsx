import { motion } from "framer-motion";
import { BriefcaseBusiness, Cpu, GitBranch, Rocket } from "lucide-react";

const EXPERIENCE = [
    {
  company: "NPTI - National Power Training Institute (An Autonomous Institute under Ministry of Power, Govt. of India)",
  short: "NPTI",
  role: "Technical Intern",
  period: "Jul 2026 - Present",
  location: "Hybrid",
  summary:
    "Supporting the modernization and quality assurance of NPTI's official website through GIGW 3.0 compliance, website auditing, content validation, and technical documentation.",
  points: [
    "Studied GIGW 3.0 guidelines and contributed to aligning npti.gov.in with Government of India web standards.",
    "Performed comprehensive website QA, identified and documented 35+ bugs including broken links, UI inconsistencies, and content issues.",
    "Audited Hindi and English website versions, reporting URL and content mismatches to improve bilingual consistency.",
    "Assisted in updating RTI documentation and validating website content to ensure accuracy, accessibility, and compliance."
  ]
}
  
];

const IMPACT_CARDS = [
  { label: "ROLE", value: "Intern", Icon: BriefcaseBusiness },
  { label: "TRACK", value: "Technical", Icon: Cpu },
  { label: "MODE", value: "Shipping", Icon: Rocket },
  { label: "FOCUS", value: "AI Product", Icon: GitBranch },
];

export default function Experience() {
  const current = EXPERIENCE[0];

  return (
    <section
      id="experience"
      className="relative w-full paper-bg overflow-hidden"
      style={{ borderBottom: "3px solid #0d0d0f" }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(13,13,15,0.16) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Chapter title bar — same as About's convention */}
      <div
        className="relative z-10 w-full flex items-center overflow-hidden"
        style={{ borderBottom: "3px solid #0d0d0f" }}
      >
        <div
          className="px-8 py-4 flex-shrink-0"
          style={{ borderRight: "3px solid #0d0d0f", background: "#0d0d0f" }}
        >
          <span className="font-manga text-white tracking-widest" style={{ fontSize: 13 }}>
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
            style={{ fontSize: "clamp(22px, 4vw, 42px)", color: "#0d0d0f" }}
          >
            EXPERIENCE ARC
          </motion.h2>
          <span
            className="hidden md:block font-manga text-[#0d0d0f] opacity-30"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            REAL-WORLD QUEST ACTIVE
          </span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        {/* PANEL A — narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative p-8 md:p-12"
          style={{ background: "#f8f4ec", borderRight: "3px solid #0d0d0f", minHeight: 420 }}
        >
          <div
            className="absolute top-4 left-4"
            style={{ border: "1.5px solid #0d0d0f", padding: "2px 10px", background: "#0d0d0f" }}
          >
            <span className="font-manga text-white" style={{ fontSize: 10, letterSpacing: "0.15em" }}>
              PANEL A
            </span>
          </div>

          <div className="pt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="font-manga text-[#0d0d0f]"
                style={{ fontSize: 12, letterSpacing: "0.2em", opacity: 0.4 }}
              >
                ACTIVE INTERNSHIP
              </span>
              <span
                className="inline-flex items-center gap-2 px-3 py-1"
                style={{ border: "2px solid #0d0d0f", background: "#0d0d0f" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                  style={{ background: "#4ade80" }}
                />
                <span className="font-manga text-white" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
                  {current.period}
                </span>
              </span>
            </div>

            {/* company — short label big, full name as caption, same manga stroke feel just legible */}
            <h3
              className="font-manga text-[#0d0d0f] leading-none"
              style={{
                fontSize: "clamp(48px, 7vw, 84px)",
                letterSpacing: "0.04em",
                WebkitTextStroke: "1.5px #0d0d0f",
                textShadow: "4px 4px 0px rgba(13,13,15,0.14)",
              }}
            >
              {current.short}
            </h3>
            <p
              className="font-body mt-2"
              style={{ fontSize: 12.5, lineHeight: 1.6, color: "rgba(13,13,15,0.45)", maxWidth: 480 }}
            >
              {current.company}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="font-manga text-[#0d0d0f]" style={{ fontSize: 20, letterSpacing: "0.08em" }}>
                {current.role}
              </span>
              <span className="font-body" style={{ fontSize: 13, color: "rgba(13,13,15,0.45)" }}>
                {current.location}
              </span>
            </div>

            <p
              className="font-body mt-6"
              style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(13,13,15,0.68)", maxWidth: 620 }}
            >
              {current.summary}
            </p>

            <div className="mt-8 grid gap-3">
              {current.points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + index * 0.08, duration: 0.45 }}
                  className="flex items-start gap-3 p-4"
                  style={{
                    border: "1.5px solid rgba(13,13,15,0.18)",
                    background: index === 1 ? "#0d0d0f" : "white",
                    boxShadow:
                      index === 1
                        ? "3px 3px 0px rgba(13,13,15,0.16)"
                        : "3px 3px 0px rgba(13,13,15,0.1)",
                  }}
                >
                  <span
                    className="font-manga flex-shrink-0"
                    style={{
                      fontSize: 13,
                      color: index === 1 ? "white" : "#0d0d0f",
                      opacity: index === 1 ? 0.7 : 0.4,
                    }}
                  >
                    0{index + 1}
                  </span>
                  <p
                    className="font-body"
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: index === 1 ? "rgba(255,255,255,0.72)" : "rgba(13,13,15,0.62)",
                    }}
                  >
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PANEL B — impact cards */}
        <div className="relative grid grid-cols-2" style={{ background: "#f0ebe0" }}>
          <div
            className="absolute top-4 left-4 z-10"
            style={{ border: "1.5px solid #0d0d0f", padding: "2px 10px", background: "#0d0d0f" }}
          >
            <span className="font-manga text-white" style={{ fontSize: 10, letterSpacing: "0.15em" }}>
              PANEL B
            </span>
          </div>

          {IMPACT_CARDS.map(({ label, value, Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="relative flex min-h-[210px] flex-col justify-between p-6 pt-14"
              style={{
                borderRight: index % 2 === 0 ? "1.5px solid #0d0d0f" : "none",
                borderBottom: index < 2 ? "1.5px solid #0d0d0f" : "none",
                background: index === 0 ? "#0d0d0f" : "transparent",
                color: index === 0 ? "white" : "#0d0d0f",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 46,
                  height: 46,
                  border: `2px solid ${index === 0 ? "rgba(255,255,255,0.2)" : "#0d0d0f"}`,
                  background: index === 0 ? "rgba(255,255,255,0.08)" : "white",
                  boxShadow:
                    index === 0
                      ? "3px 3px 0px rgba(255,255,255,0.08)"
                      : "3px 3px 0px rgba(13,13,15,0.14)",
                }}
              >
                <Icon size={20} color={index === 0 ? "white" : "#0d0d0f"} />
              </div>

              <div>
                <span
                  className="font-manga block"
                  style={{ fontSize: 10, letterSpacing: "0.2em", opacity: index === 0 ? 0.35 : 0.4 }}
                >
                  {label}
                </span>
                <span
                  className="font-manga block mt-2"
                  style={{ fontSize: "clamp(22px, 4vw, 36px)", letterSpacing: "0.05em", lineHeight: 1 }}
                >
                  {value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}