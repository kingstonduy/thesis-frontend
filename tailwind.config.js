/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            Gray: "#F5F5F5", // Define your custom color
        },
        fontFamily: {
            jost: ['"Jost"', "sans-serif"], // Add Jost as a font option
        },
      },
    },
    plugins: [],
  }