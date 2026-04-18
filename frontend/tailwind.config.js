/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sannaliya-teal': '#2A9D8F',
        'sannaliya-dark': '#1B4332',
      }
    },
  },
  plugins: [],
}
