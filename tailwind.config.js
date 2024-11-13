/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2d5500',
        'secondary': '#fece3e',
      }
    },
  },
  plugins: [],
}

