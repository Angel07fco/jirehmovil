/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#B9D5DE",
        secondaryBlue: "#00263E",
        fondoApp: "#E7EEF8",
        verde: "#a8d5ba",
        footer: "#002339",
        alertError: "#fef2f2",
        alertTextError: "#a22e2e",
        alertSuccess: "#f0fdf4",
        alertTextSuccess: "#166534",
        alertAdvertention: "#fefce8",
        alertTextAdvertention: "#ae7827",
      },
    },
  },
  plugins: [],
};
