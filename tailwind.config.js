/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "blue": "#2E266D",
        "green": "#87CB28"
      },
      fontFamily: {
        "primary": ["Amaranth", "sans-serif"],
        "secondary": ["Lato", "sans-serif"]
      },
      btn: {
        "blue": "#2E266D",
        "green": "#87CB28"
      },
    },
  },
  plugins: [],
}

