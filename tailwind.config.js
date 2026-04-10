/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "sans-serif"],
      },
      colors: {
        bg: "#0d0d0f",
        surface: "#141416",
        border: "rgba(255,255,255,0.08)",
        accent: "#ffffff",
        muted: "#666666",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "scroll-line": "scrollLine 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.4, transform: "scale(0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        scrollLine: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { transform: "translateY(100%)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
