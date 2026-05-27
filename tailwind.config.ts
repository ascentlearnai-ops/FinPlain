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
        // Monochrome Base
        background: '#050505',
        surface: '#0f0f0f',
        card: '#171717',
        
        // TradingView Neon Palette
        primary: '#ffffff',
        secondary: '#a3a3a3',
        muted: '#737373',
        
        // Monochrome Accents
        accent: '#f5f5f5',
        neonBlue: '#d4d4d4',
        neonPurple: '#a3a3a3',
        neonPink: '#737373',

        // Trading Signals
        up: '#f5f5f5',
        down: '#737373',
        
        dark: '#030406',
        gold: '#e5e5e5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tradingview-glow': 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
      },
      boxShadow: {
        'neon-pink': 'none',
        'neon-blue': 'none',
        'glass': 'none',
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
