import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wolf: {
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#ddd0ff',
          300: '#c3abff',
          400: '#a47aff',
          500: '#8b45ff',
          600: '#7e22f7',
          700: '#6f11e3',
          800: '#5d0fbf',
          900: '#4d0f9c',
          950: '#2f0069',
        },
        blood: {
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
