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
        "light-main": "#DFF2EB",
        "light-card": "#B9E5E8",
        "light-heading": "#7AB2D3",
        "light-hover": "#84afc880",
        "light-hover-whole": "#6a93ab",
        "light-navigation-border": "#F5F4B3",
        light: "#4A628A",

        // Dark theme colors
        "dark-main": "#181C14",
        "dark-card": "#3C3D37",
        "dark-heading": "#697565",
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
