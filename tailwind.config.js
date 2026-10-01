/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        textMain: "var(--text-main)",
        accentMain: "var(--accent-main)",
        accentSecondary: "var(--accent-secondary)",
        navBg: "var(--nav-bg)",
        cardBg: "var(--card-bg)"
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
