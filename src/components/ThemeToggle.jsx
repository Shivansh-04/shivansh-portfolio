import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/**
 * Ink ⟷ Paper theme toggle — a small manga "stamp" button.
 * Shows the icon of the theme you'll switch TO; the FX label matches.
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isInk = theme === "ink";

  return (
    <motion.button
      onClick={onToggle}
      data-fx
      data-fx-label={isInk ? "PAPER" : "INK"}
      aria-label={
        isInk ? "Switch to paper (light) theme" : "Switch to ink (dark) theme"
      }
      whileHover={{ rotate: -6, scale: 1.06 }}
      whileTap={{ scale: 0.9 }}
      className="fixed z-[9995] flex items-center justify-center"
      style={{
        top: 14,
        right: 14,
        width: 44,
        height: 44,
        background: "var(--reverse-bg)",
        color: "var(--reverse-text)",
        border: "2.5px solid var(--line-strong)",
        boxShadow: "3px 3px 0px var(--line-strong)",
        cursor: "none",
      }}
    >
      {isInk ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
}
