/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue
          light: '#93C5FD',
          dark: '#1E40AF',
        },
        accent: {
          DEFAULT: '#EC4899', // Pink
          light: '#F9A8D4',
          dark: '#BE185D',
        },
        neutral: {
          light: '#F9FAFB',
          DEFAULT: '#F3F4F6',
          dark: '#1F2937',
        },
        dreamland: {
          blue: '#0EA5E9',
          teal: '#14B8A6',
          purple: '#8B5CF6',
          pink: '#EC4899',
          cyan: '#22D3EE',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
        'glow-accent': '0 0 15px rgba(236, 72, 153, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};