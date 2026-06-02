/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          hud: {
            black: '#050505',
            card: '#0A0A0A',
            accent: '#0070f3', // Electric Blue
            success: '#00ff88', // Matrix Green
            error: '#ff3e3e',   // Warning Red
          }
        },
        fontFamily: {
          'mono': ['var(--font-roboto-mono)', 'monospace'],
        },
      },
    },
    plugins: [],
  }
  