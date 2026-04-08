import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#050505',
        card: '#0c0c0c',
        elevated: '#111111',
        subtle: '#18181b',
        accent: '#D4FF00',
        'accent-light': '#E9FF5C',
        'accent-lighter': '#F2FF99',
        'accent-bg': 'rgba(212, 255, 0, 0.1)',
        primary: '#ffffff',
        secondary: '#a1a1aa',
        muted: '#52525b',
        up: '#D4FF00', // Citrus Green/Yellow is Up
        down: '#FF3366', // Hot pink/red is Down
        dark: '#050505',
        'dark-card': '#0c0c0c',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,255,0,0.2)',
        glow: '0 4px 14px rgba(212, 255, 0, 0.15)',
        'glow-lg': '0 8px 30px rgba(212, 255, 0, 0.25)',
      },
      borderRadius: { '2xl': '16px', '3xl': '20px', '4xl': '24px' },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
export default config
