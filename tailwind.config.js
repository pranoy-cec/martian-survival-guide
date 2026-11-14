/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mars: {
          darkest: '#0b0c10',
          dark: '#1f1b18',
          surface: '#181210',
          panel: '#151313',
          border: '#3a2b25',
          red: '#c1440e',
          rust: '#e76f51',
          orange: '#f4a261',
          sand: '#e9c46a',
          cyan: '#00f0ff',
          neon: '#0df',
          emerald: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
