import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Obsidian Base
        background: '#040507',
        surface: '#0d1017',
        card: '#151921',
        
        // TradingView Neon Palette
        primary: '#ffffff',
        secondary: '#94a3b8',
        muted: '#475569',
        
        // Neon Accents
        accent: '#d946ef', // Pinkish-Purple
        neonBlue: '#3b82f6',
        neonPurple: '#8b5cf6',
        neonPink: '#ec4899',

        // Trading Signals
        up: '#00ffaa',    // Neon Green
        down: '#ff3366',  // Vivid Pinkish-Red
        
        dark: '#030406',
        gold: '#f0b90b',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tradingview-glow': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #d946ef 100%)',
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(217, 70, 239, 0.2)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
