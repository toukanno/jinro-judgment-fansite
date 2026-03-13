/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          hover: '#1c2129',
          lighter: '#21262d',
        },
        text: {
          primary: '#e6edf3',
          secondary: '#8b949e',
          muted: '#484f58',
          body: '#c9d1d9',
        },
        accent: {
          blue: '#58a6ff',
          'blue-hover': '#79c0ff',
          green: '#7ee787',
          red: '#f85149',
          orange: '#d29922',
          purple: '#db7ff7',
          'light-purple': '#a78bfa',
        },
        team: {
          village: '#7ee787',
          werewolf: '#f85149',
          fox: '#d29922',
          lovers: '#db7ff7',
          other: '#8b949e',
        },
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "'Hiragino Sans'", "'Yu Gothic'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
