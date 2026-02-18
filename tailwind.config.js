/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        display: ['var(--font-clash)', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e',
        },
        accent: '#00d4ff',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 1s steps(3) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,212,255,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0,212,255,0.7)' },
        },
        typing: {
          '0%, 100%': { content: "'...'" },
          '33%': { content: "'.'" },
          '66%': { content: "'..'" },
        },
      },
    },
  },
  plugins: [],
};
