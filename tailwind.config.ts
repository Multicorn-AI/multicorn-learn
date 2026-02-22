import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        'primary-light': '#A78BFA',
        'primary-dark': '#7C3AED',
        shield: '#7C3AED',
        pink: '#EC4899',
        indigo: '#6366F1',
        orange: '#F59E0B',
        green: '#22C55E',
        blue: '#3B82F6',
        teal: '#14B8A6',
        red: '#EF4444',
        surface: '#FFFFFF',
        'surface-secondary': '#F9FAFB',
        'surface-tertiary': '#F3F4F6',
        border: '#E5E7EB',
        'border-light': '#F3F4F6',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
      },
      fontFamily: {
        sans: ['"Inter"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        relaxed: '1.75',
        loose: '2',
      },
      borderRadius: {
        card: '14px',
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.7' },
          '50%': { transform: 'translateY(-18px) rotate(12deg)', opacity: '1' },
        },
        'drift-reverse': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'translateY(14px) rotate(-8deg)', opacity: '0.6' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'flow-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(var(--flow-distance, 40px))', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        'drift-reverse': 'drift-reverse 7s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'flow-dot': 'flow-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
