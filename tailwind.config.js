/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "index.html", "pages/*"],
  theme: {
    extend: {
      screens: {
        '3xl': '2500px'
      }
    },
  },
  plugins: [],
}

