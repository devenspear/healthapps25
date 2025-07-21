/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f6',
          100: '#c2ece8',
          200: '#9ddfd9',
          300: '#78d2ca',
          400: '#54b8ae', // main brand color
          500: '#3fa193',
          600: '#2a8a78',
          700: '#187e6b',
          800: '#0a7b6d', // deep accent
          900: '#06574b',
        },
        secondary: {
          50: '#f7faec',
          100: '#eaf5d0',
          200: '#d6eaa1',
          300: '#c2df72',
          400: '#99c66b', // lime accent
          500: '#7fa34e',
          600: '#668032',
          700: '#4d5d16',
          800: '#38440d',
          900: '#232b04',
        },
        lavender: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #54b8ae 0%, #0a7b6d 100%)',
        'card-gradient': 'linear-gradient(135deg, #99c66b 0%, #54b8ae 100%)',
        'success-gradient': 'linear-gradient(135deg, #99c66b 0%, #54b8ae 100%)',
        'warning-gradient': 'linear-gradient(135deg, #54b8ae 0%, #99c66b 100%)',
      }
    },
  },
  plugins: [],
} 