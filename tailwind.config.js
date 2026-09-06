/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7',
          600: '#0284c7',
          700: '#0369a1',
        },
        neon: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          violet: '#7f00ff',
          magenta: '#e100ff',
        },
        crisp: {
          white: '#F9FAFB',
        },
        silver: {
          muted: '#9CA3AF',
          light: '#D1D5DB',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 242, 254, 0.3)',
        'glow-violet': '0 0 25px rgba(127, 0, 255, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 242, 254, 0.4)',
      },
    },
  },
  plugins: [],
}
