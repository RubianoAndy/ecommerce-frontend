/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': 'green',
        'secondary': '#fece3e',
      }
    },
  },
  plugins: [],
}

