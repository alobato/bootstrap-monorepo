/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './components/**/*.{js,jsx}',
    './src/**/*.{js,jsx}'
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        }
      }
    },
  },
  plugins: [],
}
