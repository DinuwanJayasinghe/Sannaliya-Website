/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sannaliya-teal': '#1FA2A6',
        'sannaliya-teal-dark': '#0F6B6E',
        'sannaliya-mint': '#A8DADC',
        'sannaliya-gray': '#2F3E46',
        'sannaliya-bg': '#F8F9FA',
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(to right, #1FA2A6, #0F6B6E)',
      }
    },
  },
  plugins: [],
}
