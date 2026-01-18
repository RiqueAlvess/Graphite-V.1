import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: {
          primary: '#121826',
          secondary: '#1A1D23',
          tertiary: '#262B35',
        },
        // Action colors
        action: {
          purple: '#7C3AED',
          'purple-hover': '#6D28D9',
          blue: '#3B82F6',
          'blue-hover': '#2563EB',
          green: '#10B981',
          red: '#EF4444',
          yellow: '#F59E0B',
        },
        // Text colors
        text: {
          primary: '#F3F4F6',
          secondary: '#D1D5DB',
          disabled: '#6B7280',
        },
        // Borders & dividers
        border: '#374151',
        divider: '#1F2937',
        // Neutral
        neutral: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'Roboto', 'sans-serif'],
      },
      spacing: {
        xs: '0.25rem',  // 4px
        sm: '0.5rem',   // 8px
        md: '0.75rem',  // 12px
        lg: '1rem',     // 16px
        xl: '1.25rem',  // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '2rem',    // 32px
      },
      boxShadow: {
        'light': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'focus': '0 0 0 3px rgba(124, 58, 237, 0.1)',
        'lift': '0 8px 16px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
} satisfies Config
