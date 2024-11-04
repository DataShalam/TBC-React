/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode based on a CSS class
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        "light-main": "#BDBDBD",
        "light-card": "#99A7B5",
        "light-heading": "#6C87A8",
        "light-hover": "#84afc880",
        "light-hover-whole": "#6a93ab",
        "light-navigation-border": "#F5F4B3",
        light: "#243E61",

        // Dark theme colors
        "dark-main": "#181c14",
        "dark-card": "#2d3129",
        "dark-heading": "#757772",
        "dark-hover": "#596b5980",
        "dark-hover-whole": "#555b52",
        "dark-navigation-border": "#706657",
        dark: "#ECDFCC",
      },
      spacing: {
        "50vh": "50vh",
      },
    },
  },
  plugins: [],
};
