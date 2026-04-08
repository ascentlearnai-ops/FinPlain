import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#ffffff',
        card: '#ffffff',
        elevated: '#f5f7fa',
        subtle: '#f8fafc',
        accent: '#1E88E5',
        'accent-light': '#42A5F5',
        'accent-lighter': '#90CAF9',
        'accent-bg': '#E3F2FD',
        primary: '#111827',
        secondary: '#4b5563',
        muted: '#6b7280',
        up: '#00C853',
        down: '#FF3B30',
        dark: '#ffffff',
        'dark-card': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(30,136,229,0.1)',
        glow: '0 4px 14px rgba(30, 136, 229, 0.25)',
        'glow-lg': '0 8px 30px rgba(30, 136, 229, 0.2)',
      },
      borderRadius: { '2xl': '12px', '3xl': '16px', '4xl': '24px' },
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
