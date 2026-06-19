/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1a5276', light: '#2e86c1', pale: '#d6eaf8' }
      }
    }
  },
  plugins: []
}
