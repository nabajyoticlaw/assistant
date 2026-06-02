/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          hud: {
            black: '#050505',
            card: '#0A0A0A',
            accent: '#0070f3',
            success: '#00ff88',
            error: '#ff3e3e',
          }
        },
      },
    },
    plugins: [],
  }
  