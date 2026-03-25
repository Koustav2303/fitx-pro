// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: "#39FF14",
        darkBg: "#0a0a0a",
        darkSurface: "#1a1a1a",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Or any premium font like 'Oswald' for headings
      },
    },
  },
  plugins: [],
}