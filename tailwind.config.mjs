/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors for Pricing section
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        mint: {
          300: '#6EE7B7',
          500: '#10B981',
        },
        brand: {
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
        },
        calm: {
          500: '#8B5CF6',
        },
        indigo: {
          600: '#4F46E5',
          800: '#3730A3',
        },
        primary: {
          50: '#FFF5F5',
          100: '#FFE4E1',
          200: '#F5D0CD',
          300: '#E8A5A0',
          400: '#E8847C',
          500: '#D4605A',
          600: '#C44D47',
        },
        secondary: {
          50: '#F0FDF4',
          100: '#D4E9D7',
          200: '#B8DBC0',
          300: '#7CB686',
          400: '#5A9463',
          500: '#3F7A4A',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#F59E0B',
          400: '#D97706',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
