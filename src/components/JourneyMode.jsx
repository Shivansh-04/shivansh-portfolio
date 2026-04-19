import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";

const JOURNEYS = {
  recruiter: {
    label: "RECRUITER ROUTE",
    stamp: "FAST READ",
    headline: "Show the strongest proof first.",
    description:
      "This route pushes the most decision-making chapters to the front: value, shipped work, proof of consistency, and a direct contact close.",
    route: ["about", "projects", "achievements", "github", "contact"],
    notes: [
      "Best for hiring managers and quick scans.",
      "Focuses on impact, readiness, and proof.",
    ],
  },
  developer: {
    label: "DEVELOPER ROUTE",
    stamp: "DEEP DIVE",
    headline: "Lead with systems, craft, and build detail.",
    description:
      "This path favors skills, project depth, open source intent, and the experimentation side of the portfolio.",
    route: ["skills", "projects", "opensource", "github", "contact"],
    notes: [
      "Best for engineers and technical reviewers.",
      "Focuses on stack choices and build thinking.",
    ],
  },
  collaborator: {
    label: "COLLABORATOR ROUTE",
    stamp: "TEAM MODE",
    headline: "Start with the person, then the mission.",
    description:
      "This route highlights story, shared energy, open source mindset, and the easiest ways to start a conversation.",
    route: ["about", "opensource", "achievements", "projects", "contact"],
    notes: [
      "Best for founders, communities, and teammates.",
      "Focuses on fit, momentum, and shared direction.",
    ],
  },
};

const CHAPTER_META = {
  about: { chapter: "CH.02", title: "DEVELOPER", sub: "Origin Story" },
  skills: { chapter: "CH.03", title: "STATS", sub: "Ability Cards" },
  projects: { chapter: "CH.04", title: "PROJECTS", sub: "Build Arc" },
  opensource: { chapter: "CH.05", title: "BEYOND", sub: "Open Source" },
  achievements: { chapter: "CH.06", title: "BADGES", sub: "Unlock Wall" },
  github: { chapter: "CH.07", title: "ACTIVITY", sub: "Battle Record" },
  contact: { chapter: "CH.08", title: "CONTACT", sub: "Final Transmission" },
};

const STORAGE_KEY = "portfolio-journey-mode";
const EVENT_NAME = "portfolio:set-journey";

function applyJourneyMode(mode) {
  document.documentElement.setAttribute("data-journey", mode);
  window.localStorage.setItem(STORAGE_KEY, mode);
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, {
      detail: { mode },
    }),
  );
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function JourneyMode() {
  const [mode, setMode] = useState("recruiter");
  const cardsRef = useRef(null);
  const activeJourney = useMemo(() => JOURNEYS[mode], [mode]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && JOURNEYS[stored]) {
      setMode(stored);
      document.documentElement.setAttribute("data-journey", stored);
      return;
    }
    document.documentElement.setAttribute("data-journey", "recruiter");
  }, []);

  useEffect(() => {
    const handleJourneyChange = (event) => {
      const nextMode = event.detail?.mode;
      if (!nextMode || !JOURNEYS[nextMode]) return;
      setMode(nextMode);
      document.documentElement.setAttribute("data-journey", nextMode);
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    };

    window.addEventListener(EVENT_NAME, handleJourneyChange);
    return () => window.removeEventListener(EVENT_NAME, handleJourneyChange);
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-journey-card]");
    animate(cards, {
      opacity: [0, 1],
      translateY: [24, 0],
      scale: [0.96, 1],
      easing: "easeOutExpo",
      duration: 550,
      delay: stagger(65),
    });
  }, [mode]);

  const handleSelectMode = (nextMode) => {
    setMode(nextMode);
    applyJourneyMode(nextMode);
  };

  return (
    <section
      id="journey-mode"
      className="relative w-full paper-bg overflow-hidden"
      style={{
        borderTop: "3px solid #0d0d0f",
        borderBottom: "3px solid #0d0d0f",
      }}
    >
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
            BONUS ARC
          </span>
        </div>
        <div className="flex-1 px-8 py-4">
          <h2
            className="font-manga tracking-wide text-[#0d0d0f]"
            style={{ fontSize: "clamp(22px, 4vw, 42px)" }}
          >
            CHOOSE YOUR JOURNEY
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr]">
        <div
          className="relative p-6 md:p-8 xl:p-10"
          style={{
            borderRight: "3px solid #0d0d0f",
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.55), transparent 35%), #f8f4ec",
          }}
        >
          <div
            className="absolute top-4 left-4"
            style={{
              border: "1.5px solid #0d0d0f",
              padding: "2px 10px",
              background: "#0d0d0f",
            }}
          >
            <span
              className="font-manga text-white"
              style={{ fontSize: 9, letterSpacing: "0.15em" }}
            >
              PANEL A
            </span>
          </div>

          <div className="pt-8 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="font-manga text-[#0d0d0f]"
                style={{ fontSize: 11, letterSpacing: "0.18em", opacity: 0.4 }}
              >
                STORY FILTER
              </span>
              <div
                className="px-3 py-1"
                style={{
                  border: "2px solid #0d0d0f",
                  background: "#0d0d0f",
                  transform: "rotate(-2deg)",
                }}
              >
                <span
                  className="font-manga text-white"
                  style={{ fontSize: 10, letterSpacing: "0.2em" }}
                >
                  {activeJourney.stamp}
                </span>
              </div>
            </div>

            <h3
              className="font-manga text-[#0d0d0f] leading-none"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "0.04em",
                textShadow: "3px 3px 0px rgba(13,13,15,0.12)",
              }}
            >
              {activeJourney.label}
            </h3>

            <p
              className="font-display italic mt-3"
              style={{
                fontSize: "clamp(15px, 2vw, 20px)",
                color: "rgba(13,13,15,0.58)",
              }}
            >
              {activeJourney.headline}
            </p>

            <p
              className="font-body mt-5 max-w-xl"
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "rgba(13,13,15,0.68)",
              }}
            >
              {activeJourney.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {Object.entries(JOURNEYS).map(([key, journey]) => {
                const selected = key === mode;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectMode(key)}
                    data-fx
                    data-fx-label={journey.label}
                    className="font-manga px-4 py-3 text-left transition-transform active:scale-95"
                    style={{
                      border: "2px solid #0d0d0f",
                      background: selected ? "#0d0d0f" : "white",
                      color: selected ? "white" : "#0d0d0f",
                      boxShadow: selected
                        ? "5px 5px 0px rgba(13,13,15,0.18)"
                        : "4px 4px 0px rgba(13,13,15,0.12)",
                      minWidth: 180,
                    }}
                  >
                    <div style={{ fontSize: 12, letterSpacing: "0.15em" }}>
                      {journey.label}
                    </div>
                    <div
                      className="font-body mt-1"
                      style={{
                        fontSize: 12,
                        opacity: selected ? 0.65 : 0.55,
                        fontStyle: "italic",
                      }}
                    >
                      {journey.notes[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {activeJourney.notes.map((note) => (
                <div
                  key={note}
                  className="px-4 py-3"
                  style={{
                    border: "1.5px solid rgba(13,13,15,0.12)",
                    background: "rgba(255,255,255,0.72)",
                  }}
                >
                  <span
                    className="font-body"
                    style={{
                      fontSize: 13,
                      color: "rgba(13,13,15,0.62)",
                      lineHeight: 1.7,
                    }}
                  >
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="relative p-6 md:p-8 xl:p-10"
          style={{ background: "#f0ebe0" }}
        >
          <div
            className="absolute top-4 left-4"
            style={{
              border: "1.5px solid #0d0d0f",
              padding: "2px 10px",
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

          <div className="pt-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span
                  className="font-manga block"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(13,13,15,0.36)",
                  }}
                >
                  RECOMMENDED READ ORDER
                </span>
                <span
                  className="font-manga block mt-1"
                  style={{
                    fontSize: 18,
                    letterSpacing: "0.08em",
                    color: "#0d0d0f",
                  }}
                >
                  Curated for {mode.toUpperCase()}
                </span>
              </div>

              <button
                onClick={() => scrollToSection(activeJourney.route[0])}
                data-fx
                data-fx-label="START ROUTE"
                className="font-manga px-4 py-3 transition-transform active:scale-95"
                style={{
                  border: "2.5px solid #0d0d0f",
                  background: "#0d0d0f",
                  color: "white",
                  boxShadow: "4px 4px 0px rgba(13,13,15,0.18)",
                  fontSize: 12,
                  letterSpacing: "0.16em",
                }}
              >
                START HERE
              </button>
            </div>

            <div ref={cardsRef} className="grid gap-3">
              {activeJourney.route.map((sectionId, index) => {
                const meta = CHAPTER_META[sectionId];

                return (
                  <button
                    key={`${mode}-${sectionId}`}
                    data-journey-card
                    onClick={() => scrollToSection(sectionId)}
                    data-fx
                    data-fx-label={meta.title}
                    className="w-full text-left p-4 transition-transform active:scale-[0.99]"
                    style={{
                      border: "2px solid #0d0d0f",
                      background: index === 0 ? "#0d0d0f" : "#f8f4ec",
                      color: index === 0 ? "white" : "#0d0d0f",
                      boxShadow: "4px 4px 0px rgba(13,13,15,0.12)",
                      opacity: 1,
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: 38,
                            height: 38,
                            border: `2px solid ${index === 0 ? "white" : "#0d0d0f"}`,
                            background:
                              index === 0
                                ? "rgba(255,255,255,0.08)"
                                : "white",
                            fontFamily: "Bangers, cursive",
                            letterSpacing: "0.08em",
                            fontSize: 16,
                          }}
                        >
                          {index + 1}
                        </div>

                        <div>
                          <span
                            className="font-manga block"
                            style={{
                              fontSize: 10,
                              letterSpacing: "0.18em",
                              opacity: index === 0 ? 0.55 : 0.38,
                            }}
                          >
                            {meta.chapter}
                          </span>
                          <span
                            className="font-manga block mt-1"
                            style={{ fontSize: 16, letterSpacing: "0.08em" }}
                          >
                            {meta.title}
                          </span>
                        </div>
                      </div>

                      <span
                        className="font-body"
                        style={{
                          fontSize: 12,
                          opacity: index === 0 ? 0.6 : 0.48,
                          fontStyle: "italic",
                        }}
                      >
                        {meta.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
