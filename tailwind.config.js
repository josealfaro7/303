/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        textMain: "var(--color-text)",
        accentMain: "var(--color-primary)",
        accentSecondary: "var(--color-secondary)"
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
