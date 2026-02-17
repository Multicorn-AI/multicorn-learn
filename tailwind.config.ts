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
        pink: '#EC4899',
        indigo: '#6366F1',
        orange: '#F59E0B',
        green: '#22C55E',
        blue: '#3B82F6',
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
    },
  },
  plugins: [],
}

export default config
