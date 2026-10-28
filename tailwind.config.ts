import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bugatti: {
          blue: '#0048FF',
          'blue-light': '#2F70FF',
          'blue-dark': '#00257A',
          'blue-glow': '#00B4FF',
          black: '#07080A',
          charcoal: '#0F1117',
          surface: '#141721',
          card: '#181C28',
          border: '#262D3D',
          muted: '#8C96A8',
          silver: '#E4E7EB',
          gold: '#C5A059',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
