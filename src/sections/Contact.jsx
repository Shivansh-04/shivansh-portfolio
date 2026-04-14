import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Loader, Link } from "lucide-react";
import { SiGithub, SiLeetcode, SiCodechef } from "react-icons/si";

const SOCIAL_LINKS = [
  { Icon: SiGithub, href: "https://github.com/Shivansh-04", label: "GitHub" },
  {
    Icon: Link,
    href: "https://www.linkedin.com/in/gupta-shivansh/",
    label: "LinkedIn",
  },
  { Icon: Mail, href: "mailto:shivanshgupta0987@gmail.com", label: "Email" },
  {
    Icon: SiLeetcode,
    href: "https://leetcode.com/shivansh",
    label: "LeetCode",
  },
  {
    Icon: SiCodechef,
    href: "https://www.codechef.com/users/its_dev_04",
    label: "CodeChef",
  },
];

function FloatingLabelInput({
  label,
  type = "text",
  multiline = false,
  value,
  onChange,
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        animate={
          lifted
            ? { y: -22, fontSize: "10px", color: "#0d0d0f" }
            : { y: 0, fontSize: "13px", color: "rgba(13,13,15,0.4)" }
        }
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-4 pointer-events-none font-manga uppercase tracking-wider origin-left"
        style={{ zIndex: 1, letterSpacing: "0.15em" }}
      >
        {label}
      </motion.label>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: "#f8f4ec",
            border: `2px solid ${focused ? "#0d0d0f" : "rgba(13,13,15,0.2)"}`,
            boxShadow: focused
              ? "3px 3px 0px #0d0d0f"
              : "2px 2px 0px rgba(13,13,15,0.1)",
            padding: "24px 16px 12px",
            color: "#0d0d0f",
            fontSize: 14,
            fontFamily: "Inter, sans-serif",
            outline: "none",
            resize: "none",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: "#f8f4ec",
            border: `2px solid ${focused ? "#0d0d0f" : "rgba(13,13,15,0.2)"}`,
            boxShadow: focused
              ? "3px 3px 0px #0d0d0f"
              : "2px 2px 0px rgba(13,13,15,0.1)",
            padding: "22px 16px 8px",
            color: "#0d0d0f",
            fontSize: 14,
            fontFamily: "Inter, sans-serif",
            outline: "none",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          }}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1800);
  };

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div
      id="contact"
      className="relative w-full paper-bg"
      style={{ borderBottom: "3px solid #0d0d0f" }}
    >
      {/* ── Chapter title bar ── */}
      <div
        className="w-full flex items-center overflow-hidden"
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
            CHAPTER 06
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
            LET'S TALK
          </motion.h2>
        </div>
      </div>

      {/* ── Two panel layout ── */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: "70vh" }}>
        {/* PANEL A — Left: Big action word + social + availability */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col justify-between p-8 md:p-12"
          style={{
            borderRight: "3px solid #0d0d0f",
            background: "#0d0d0f",
            minWidth: "340px",
            maxWidth: "420px",
          }}
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4"
            style={{
              border: "1.5px solid rgba(255,255,255,0.15)",
              padding: "2px 8px",
            }}
          >
            <span
              className="font-manga text-white opacity-40"
              style={{ fontSize: 9, letterSpacing: "0.15em" }}
            >
              PANEL A
            </span>
          </div>

          <div className="flex flex-col gap-6 pt-8">
            {/* Big manga action heading */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3
                className="font-manga text-white leading-none"
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.6)",
                  textShadow: "4px 4px 0px rgba(0,0,0,0.5)",
                  letterSpacing: "0.04em",
                  lineHeight: 0.9,
                }}
              >
                LET'S
                <br />
                BUILD
                <br />
                SOME
                <br />
                THING.
              </h3>
            </motion.div>

            {/* Tagline */}
            <p
              className="font-body"
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
              }}
            >
              Open to internships, freelance projects, and GSoC collaborations.
            </p>

            {/* Availability pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 self-start"
              style={{
                border: "1.5px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                style={{ background: "#4ade80" }}
              />
              <span
                className="font-manga text-white opacity-60"
                style={{ fontSize: 10, letterSpacing: "0.18em" }}
              >
                AVAILABLE NOW
              </span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-4 mt-8">
            <span
              className="font-manga text-white opacity-30"
              style={{ fontSize: 10, letterSpacing: "0.2em" }}
            >
              FIND ME ON
            </span>
            <div className="flex gap-3 flex-wrap">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: 40,
                    height: 40,
                    border: "2px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "2px 2px 0px rgba(255,255,255,0.06)",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.borderColor = "white";
                    e.currentTarget.querySelector("svg").style.color =
                      "#0d0d0f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.15)";
                    e.currentTarget.querySelector("svg").style.color =
                      "rgba(255,255,255,0.5)";
                  }}
                >
                  <Icon
                    size={15}
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      transition: "color 0.2s",
                    }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Panel number */}
          <div
            className="absolute bottom-4 right-5 font-manga text-white"
            style={{ fontSize: 9, opacity: 0.1, letterSpacing: "0.12em" }}
          >
            06 · 01
          </div>
        </motion.div>

        {/* PANEL B — Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative flex-1 flex flex-col justify-center p-8 md:p-12"
          style={{ background: "#f8f4ec" }}
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4"
            style={{
              border: "1.5px solid #0d0d0f",
              padding: "2px 8px",
              background: "#0d0d0f",
            }}
          >
            <span
              className="font-manga text-white"
              style={{ fontSize: 9, letterSpacing: "0.15em" }}
            >
              PANEL B
            </span>
          </div>

          {/* Form heading */}
          <div className="mb-8 pt-6">
            <span
              className="font-manga text-[#0d0d0f] opacity-40"
              style={{ fontSize: 10, letterSpacing: "0.2em" }}
            >
              005 — CONTACT
            </span>
            <p
              className="font-manga text-[#0d0d0f] mt-1"
              style={{ fontSize: 18, letterSpacing: "0.08em" }}
            >
              Send a transmission.
            </p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4 max-w-lg">
            <FloatingLabelInput
              label="Name"
              value={form.name}
              onChange={update("name")}
            />
            <FloatingLabelInput
              label="Email"
              type="email"
              value={form.email}
              onChange={update("email")}
            />
            <FloatingLabelInput
              label="Message"
              multiline
              value={form.message}
              onChange={update("message")}
            />

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={status !== "idle"}
              className="font-manga w-full py-4 transition-all duration-200 active:scale-95"
              style={{
                fontSize: 14,
                letterSpacing: "0.18em",
                background: status === "sent" ? "#f8f4ec" : "#0d0d0f",
                color: status === "sent" ? "#4ade80" : "white",
                border:
                  status === "sent"
                    ? "2.5px solid #4ade80"
                    : "2.5px solid #0d0d0f",
                boxShadow:
                  status === "sent"
                    ? "4px 4px 0px rgba(74,222,128,0.2)"
                    : "4px 4px 0px rgba(13,13,15,0.3)",
                cursor: "none",
              }}
            >
              {status === "idle" && "TRANSMIT MESSAGE"}
              {status === "loading" && (
                <span className="flex items-center justify-center gap-2">
                  <Loader size={14} className="animate-spin" /> SENDING...
                </span>
              )}
              {status === "sent" && (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle size={14} /> TRANSMISSION RECEIVED ✓
                </span>
              )}
            </button>
          </div>

          {/* Panel number */}
          <div
            className="absolute bottom-4 right-5 font-manga text-[#0d0d0f]"
            style={{ fontSize: 9, opacity: 0.12, letterSpacing: "0.12em" }}
          >
            06 · 02
          </div>
        </motion.div>
      </div>

      {/* ── Footer strip ── */}
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{ borderTop: "3px solid #0d0d0f", background: "#0d0d0f" }}
      >
        <span
          className="font-manga text-white opacity-30"
          style={{ fontSize: 10, letterSpacing: "0.2em" }}
        >
          VOL.01 · FIN
        </span>
        <span
          className="font-manga text-white opacity-20"
          style={{ fontSize: 10, letterSpacing: "0.2em" }}
        >
          DESIGNED & BUILT BY SHIVANSH · 2026
        </span>
        <span
          className="font-manga text-white opacity-30"
          style={{ fontSize: 10, letterSpacing: "0.2em" }}
        >
          SHIVANSH · WORLD
        </span>
      </div>
    </div>
  );
}
