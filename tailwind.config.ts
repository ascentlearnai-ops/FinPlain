import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0b0e11',
        card: '#161a1e',
        elevated: '#1b2028',
        surface: '#1e2329',
        subtle: '#2b3139',
        accent: '#f0b90b',
        'accent-light': '#f7d060',
        'accent-bg': 'rgba(240, 185, 11, 0.12)',
        primary: '#eaecef',
        secondary: '#848e9c',
        muted: '#5e6673',
        up: '#0ecb81',
        'up-bg': 'rgba(14, 203, 129, 0.1)',
        down: '#f6465d',
        'down-bg': 'rgba(246, 70, 93, 0.1)',
        dark: '#070a0d',
        'dark-card': '#0d1117',
        border: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.5)',
        glow: '0 4px 14px rgba(240, 185, 11, 0.15)',
        'glow-lg': '0 8px 30px rgba(240, 185, 11, 0.12)',
        blue: '0 4px 14px rgba(33, 150, 243, 0.25)',
      },
      borderRadius: { '2xl': '16px', '3xl': '20px', '4xl': '24px' },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2s infinite',
        'pulse-dot': 'pulse-dot 2s infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'pulse-dot': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
    },
  },
  plugins: [],
}
export default config
