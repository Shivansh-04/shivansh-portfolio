import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAPTERS = [
  "hero",
  "about",
  "skills",
  "projects",
  "opensource",
  "achievements",
  "github",
  "contact",
];

const HELP_LINES = [
  "help",
  "goto <chapter>",
  "journey <recruiter|developer|collaborator>",
  "chapters",
  "plottwist",
  "time",
  "clear",
  "close",
];

function scrollToChapter(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SecretTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "shivansh-terminal v1.0",
    "Type `help` to reveal hidden commands.",
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      const isShortcut = event.key === "`" || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k");
      if (!isShortcut) return;
      event.preventDefault();
      setOpen((prev) => !prev);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const prompt = useMemo(() => "shivansh@chronicles:~$", []);

  const runCommand = (raw) => {
    const command = raw.trim();
    if (!command) return;

    setLines((prev) => [...prev, `${prompt} ${command}`]);

    const [head, ...rest] = command.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    if (head === "help") {
      setLines((prev) => [...prev, ...HELP_LINES]);
      return;
    }

    if (head === "clear") {
      setLines(["shivansh-terminal v1.0", "Console cleared."]);
      return;
    }

    if (head === "close" || head === "exit") {
      setOpen(false);
      return;
    }

    if (head === "chapters") {
      setLines((prev) => [...prev, `Available chapters: ${CHAPTERS.join(", ")}`]);
      return;
    }

    if (head === "journey") {
      if (!arg) {
        setLines((prev) => [
          ...prev,
          "Usage: journey <recruiter|developer|collaborator>",
        ]);
        return;
      }

      const allowedModes = ["recruiter", "developer", "collaborator"];
      if (!allowedModes.includes(arg)) {
        setLines((prev) => [...prev, `Unknown journey mode: ${arg}`]);
        return;
      }

      window.dispatchEvent(
        new CustomEvent("portfolio:set-journey", {
          detail: { mode: arg },
        }),
      );
      setLines((prev) => [...prev, `Journey mode updated: ${arg}`]);
      return;
    }

    if (head === "goto") {
      if (!arg) {
        setLines((prev) => [...prev, "Usage: goto <chapter>"]);
        return;
      }
      if (!CHAPTERS.includes(arg)) {
        setLines((prev) => [...prev, `Unknown chapter: ${arg}`]);
        return;
      }
      scrollToChapter(arg);
      setLines((prev) => [...prev, `Navigating to ${arg}...`]);
      return;
    }

    if (head === "plottwist") {
      const trigger = document.querySelector("[data-plot-twist-trigger]");
      if (trigger) {
        trigger.click();
        setLines((prev) => [...prev, "Shock panel deployed."]);
      } else {
        setLines((prev) => [...prev, "Plot twist trigger unavailable."]);
      }
      return;
    }

    if (head === "time") {
      const now = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setLines((prev) => [...prev, `IST status: ${now}`]);
      return;
    }

    setLines((prev) => [...prev, `Unknown command: ${command}`]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99993] flex items-center justify-center px-4"
          style={{ background: "rgba(13,13,15,0.72)", backdropFilter: "blur(10px)" }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 24, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-3xl overflow-hidden"
            style={{
              border: "3px solid #f0ebe0",
              background: "#0d0d0f",
              boxShadow: "8px 8px 0px rgba(240,235,224,0.12)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: "2px solid rgba(240,235,224,0.14)" }}
            >
              <span
                className="font-manga text-white"
                style={{ fontSize: 11, letterSpacing: "0.18em", opacity: 0.8 }}
              >
                SECRET TERMINAL · DIRECTOR'S CONSOLE
              </span>
              <span
                className="font-manga text-white"
                style={{ fontSize: 10, letterSpacing: "0.18em", opacity: 0.35 }}
              >
                ` OR CTRL+K
              </span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
              {lines.map((line, index) => (
                <div
                  key={`${line}-${index}`}
                  className="font-mono"
                  style={{
                    fontSize: 13,
                    color: line.startsWith(prompt) ? "#f0ebe0" : "rgba(240,235,224,0.72)",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {line}
                </div>
              ))}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  runCommand(input);
                  setInput("");
                }}
                className="mt-3 flex items-center gap-3"
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 13, color: "#f0ebe0" }}
                >
                  {prompt}
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    color: "#f0ebe0",
                    fontFamily: "monospace",
                    fontSize: 13,
                    caretColor: "#f0ebe0",
                  }}
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
