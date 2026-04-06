import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#ffffff',
        card: '#ffffff',
        elevated: '#f8fafc',
        subtle: '#f1f5f9',
        accent: '#2563eb',
        'accent-light': '#3b82f6',
        'accent-lighter': '#60a5fa',
        'accent-bg': '#eff6ff',
        primary: '#000000',
        secondary: '#1e293b',
        muted: '#1e293b',
        up: '#16a34a',
        down: '#dc2626',
        dark: '#010409',
        'dark-card': '#0d1117',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08)',
        glow: '0 4px 14px rgba(37, 99, 235, 0.25)',
        'glow-lg': '0 8px 30px rgba(37, 99, 235, 0.2)',
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
