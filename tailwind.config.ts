import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jinro: {
          dark: '#1a1a2e',
          mid: '#16213e',
          accent: '#0f3460',
          highlight: '#e94560',
          gold: '#f5a623',
          silver: '#c0c0c0',
        },
      },
    },
  },
  plugins: [],
};

export default config;
