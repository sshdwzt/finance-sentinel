/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF2FF',
          100: '#D8E0F7',
          200: '#B0C1EF',
          300: '#7A9AE3',
          400: '#4A73D4',
          500: '#2B56B8',
          600: '#1E3A8A',
          700: '#172E6E',
          800: '#112252',
          900: '#0B1636',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        'sentinel-cyan': '#06B6D4',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
