/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1FA2A6',
          DEFAULT: '#1FA2A6',
          dark: '#0F6B6E',
        },
        secondary: {
          light: '#A8DADC',
          DEFAULT: '#A8DADC',
          dark: '#457B9D',
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          text: '#F8FAFC',
          border: '#334155',
        },
        'sannaliya-teal': '#1FA2A6',
        'sannaliya-teal-dark': '#0F6B6E',
        'sannaliya-mint': '#A8DADC',
        'sannaliya-gray': '#2F3E46',
        'sannaliya-bg': '#F8F9FA',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(to right, #1FA2A6, #0F6B6E)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'premium': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'teal-glow': '0 0 15px rgba(31, 162, 166, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
