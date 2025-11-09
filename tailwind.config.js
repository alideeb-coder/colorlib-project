/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./*.{html,js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      colors: {
        myblack: "#333333",
        white_lighter:"#9B9B9B",
        b_light:"#444",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};