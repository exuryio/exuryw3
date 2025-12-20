/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  /**
   * Vuetify already provides base styling and a lot of components.
   * Disabling Preflight avoids unexpected global CSS resets.
   */
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        exury: {
          black: "#000000",
          green: "#00BB72",
          offwhite: "#E5E5E5",
          greenDark: "#02321C",
          greenDark2: "#054629",
          greenDeep: "#011E0F",
        },
      },
      fontFamily: {
        exury: ['Futura', '"Futura PT"', "Avenir", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "accordion-down": {
          "0%": { maxHeight: "0px", opacity: "0" },
          "100%": { maxHeight: "var(--acc-max-h)", opacity: "1" },
        },
        "accordion-up": {
          "0%": { maxHeight: "var(--acc-max-h)", opacity: "1" },
          "100%": { maxHeight: "0px", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 520ms cubic-bezier(0.21, 1, 0.21, 1) both",
        "fade-in": "fade-in 600ms cubic-bezier(0.21, 1, 0.21, 1) both",
        "slide-up": "slide-up 600ms cubic-bezier(0.21, 1, 0.21, 1) both",
        "slide-in-right": "slide-in-right 600ms cubic-bezier(0.21, 1, 0.21, 1) both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      boxShadow: {
        "exury-glow": "0 0 0 1px rgba(0, 187, 114, 0.22), 0 12px 40px rgba(0, 187, 114, 0.12)",
      },
    },
  },
  plugins: [],
};


