/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "index.html", "RO/*", "RU/*", "ENG/*"],
  theme: {
    extend: {
      screens: {
        '3xl': '1800px',
        '4xl': '2500px'
      }
    },
  },
  plugins: [],
}

