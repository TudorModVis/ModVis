/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "index.html", "RO/*", "RU/*", "ENG/*"],
  theme: {
    extend: {
      screens: {
        '3xl': '2500px'
      }
    },
  },
  plugins: [],
}

