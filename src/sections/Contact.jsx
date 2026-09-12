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
    href: "https://leetcode.com/u/Shivansh-04/",
    label: "LeetCode",
  },
  {
    Icon: SiCodechef,
    href: "https://www.codechef.com/users/its_dev_04",
    label: "CodeChef",
  },
];

const CONTACT_EMAIL = "shivanshgupta0987@gmail.com";
const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

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
            ? { y: -22, fontSize: "10px", color: "var(--text)" }
            : { y: 0, fontSize: "13px", color: "var(--text-muted)" }
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
            background: "var(--surface)",
            border: `2px solid ${focused ? "var(--line-strong)" : "var(--line)"}`,
            boxShadow: focused
              ? "3px 3px 0px var(--line-strong)"
              : "2px 2px 0px var(--shadow)",
            padding: "24px 16px 12px",
            color: "var(--text)",
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
            background: "var(--surface)",
            border: `2px solid ${focused ? "var(--line-strong)" : "var(--line)"}`,
            boxShadow: focused
              ? "3px 3px 0px var(--line-strong)"
              : "2px 2px 0px var(--shadow)",
            padding: "22px 16px 8px",
            color: "var(--text)",
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
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (status === "loading") return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setFeedback("Please fill every field before sending.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Message delivery failed.");
      }

      setStatus("sent");
      setFeedback("Message sent. I will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback(
        "Could not send right now. Please email me directly at shivanshgupta0987@gmail.com.",
      );
    }
  };

  const update = (field) => (e) => {
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }

    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div
      id="contact"
      className="relative w-full paper-bg"
      style={{ borderBottom: "3px solid var(--line-strong)" }}
    >
      {/* ── Chapter title bar ── */}
      <div
        className="w-full flex items-center overflow-hidden"
        style={{ borderBottom: "3px solid var(--line-strong)" }}
      >
        <div
          className="px-8 py-4 flex-shrink-0"
          style={{ borderRight: "3px solid var(--line-strong)", background: "var(--reverse-bg)" }}
        >
          <span
            className="font-manga text-[color:var(--reverse-text)] tracking-widest"
            style={{ fontSize: 13 }}
          >
            CHAPTER 10
          </span>
        </div>
        <div className="flex-1 px-8 py-4">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-manga tracking-wide"
            style={{ fontSize: "clamp(22px, 4vw, 42px)", color: "var(--text)" }}
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
            borderRight: "3px solid var(--line-strong)",
            background: "var(--reverse-bg)",
            minWidth: "340px",
            maxWidth: "420px",
          }}
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4"
            style={{
              border: "1.5px solid var(--reverse-line)",
              padding: "2px 8px",
            }}
          >
            <span
              className="font-manga text-[color:var(--reverse-text)] opacity-40"
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
                className="font-manga text-[color:var(--reverse-text)] leading-none"
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  WebkitTextStroke: "1.5px var(--reverse-text-muted)",
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
                color: "var(--reverse-text-muted)",
                lineHeight: 1.7,
              }}
            >
              Open to internships, freelance projects, and GSoC collaborations.
            </p>

            {/* Availability pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 self-start"
              style={{
                border: "1.5px solid var(--reverse-line)",
                background: "var(--reverse-line)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                style={{ background: "#4ade80" }}
              />
              <span
                className="font-manga text-[color:var(--reverse-text)] opacity-60"
                style={{ fontSize: 10, letterSpacing: "0.18em" }}
              >
                AVAILABLE NOW
              </span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-4 mt-8">
            <span
              className="font-manga text-[color:var(--reverse-text)] opacity-30"
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
                    border: "2px solid var(--reverse-line)",
                    background: "var(--reverse-line)",
                    boxShadow: "2px 2px 0px var(--reverse-line)",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--reverse-text)";
                    e.currentTarget.style.borderColor = "var(--reverse-text)";
                    e.currentTarget.querySelector("svg").style.color =
                      "var(--reverse-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--reverse-line)";
                    e.currentTarget.style.borderColor =
                      "var(--reverse-line)";
                    e.currentTarget.querySelector("svg").style.color =
                      "var(--reverse-text-muted)";
                  }}
                >
                  <Icon
                    size={15}
                    style={{
                      color: "var(--reverse-text-muted)",
                      transition: "color 0.2s",
                    }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Panel number */}
          <div
            className="absolute bottom-4 right-5 font-manga text-[color:var(--reverse-text)]"
            style={{ fontSize: 9, opacity: 0.1, letterSpacing: "0.12em" }}
          >
            10 / 01
          </div>
        </motion.div>

        {/* PANEL B — Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative flex-1 flex flex-col justify-center p-8 md:p-12"
          style={{ background: "var(--surface)" }}
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4"
            style={{
              border: "1.5px solid var(--line-strong)",
              padding: "2px 8px",
              background: "var(--reverse-bg)",
            }}
          >
            <span
              className="font-manga text-[color:var(--reverse-text)]"
              style={{ fontSize: 9, letterSpacing: "0.15em" }}
            >
              PANEL B
            </span>
          </div>

          {/* Form heading */}
          <div className="mb-8 pt-6">
            <span
              className="font-manga text-[color:var(--text)] opacity-40"
              style={{ fontSize: 10, letterSpacing: "0.2em" }}
            >
              010 - CONTACT
            </span>
            <p
              className="font-manga text-[color:var(--text)] mt-1"
              style={{ fontSize: 18, letterSpacing: "0.08em" }}
            >
              Send a transmission.
            </p>
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
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
              type="submit"
              disabled={status === "loading"}
              className="font-manga w-full py-4 transition-all duration-200 active:scale-95"
              style={{
                fontSize: 14,
                letterSpacing: "0.18em",
                background: status === "sent" ? "var(--surface)" : "var(--reverse-bg)",
                color:
                  status === "sent"
                    ? "#4ade80"
                    : status === "error"
                      ? "#f87171"
                      : "var(--reverse-text)",
                border:
                  status === "sent"
                    ? "2.5px solid #4ade80"
                    : status === "error"
                      ? "2.5px solid #f87171"
                    : "2.5px solid var(--line-strong)",
                boxShadow:
                  status === "sent"
                    ? "4px 4px 0px rgba(74,222,128,0.2)"
                    : status === "error"
                      ? "4px 4px 0px rgba(248,113,113,0.2)"
                    : "4px 4px 0px var(--shadow)",
                cursor: "none",
              }}
            >
              {(status === "idle" || status === "error") && "TRANSMIT MESSAGE"}
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

            {feedback && (
              <p
                className="font-body"
                style={{
                  fontSize: 13,
                  color: status === "error" ? "#dc2626" : "#15803d",
                  lineHeight: 1.7,
                }}
              >
                {feedback}
              </p>
            )}
          </form>

          {/* Panel number */}
          <div
            className="absolute bottom-4 right-5 font-manga text-[color:var(--text)]"
            style={{ fontSize: 9, opacity: 0.12, letterSpacing: "0.12em" }}
          >
            10 / 02
          </div>
        </motion.div>
      </div>

      {/* ── Footer strip ── */}
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{ borderTop: "3px solid var(--line-strong)", background: "var(--reverse-bg)" }}
      >
        <span
          className="font-manga text-[color:var(--reverse-text)] opacity-30"
          style={{ fontSize: 10, letterSpacing: "0.2em" }}
        >
          VOL.01 · FIN
        </span>
        <span
          className="font-manga text-[color:var(--reverse-text)] opacity-20"
          style={{ fontSize: 10, letterSpacing: "0.2em" }}
        >
          DESIGNED & BUILT BY SHIVANSH · 2026
        </span>
        <span
          className="font-manga text-[color:var(--reverse-text)] opacity-30"
          style={{ fontSize: 10, letterSpacing: "0.2em" }}
        >
          SHIVANSH · WORLD
        </span>
      </div>
    </div>
  );
}
