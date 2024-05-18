const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#97E7E1",
        primaryHoverColor: "#6AD4DD",
        secondaryColor: "#7AA2E3",
        backgrounds: {
          light: "#F8F6E3",
          dark: "#29260a",
        },
        borders: {
          light: "#f0ebc2",
          dark: "#524b14",
        },
      },
      keyframes: {
        "background-scale": {
          "0%, 100%": { backgroundPosition: "50% 50%" },
          "50%": { backgroundPosition: "80% 50%" },
        },
      },
      animation: {
        "background-scale": "background-scale 10s ease-out infinite",
      },
      backgroundImage: {
        "gradient-24": "linear-gradient(132deg, var(--tw-gradient-stops))",
      },
      spacing: {
        "3xl": "25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
