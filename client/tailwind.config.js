/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
