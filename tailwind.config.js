/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: ".8rem",
        xs: ".8rem",
        sm: "1rem",
        md: "2rem",
        lg: "5rem",
        xl: "7rem",
        "2xl": "10rem",
      },
    },
    extend: {
      screens: {
        xs: "425px",
        sm: "575px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        dark: "#051323",
        gray: "#B0B5C2",
        grayLight: "#F7F8FA",
        grayDark: "#606267",
        primary100: "#B2E1EE",
        primary200: "#61A7C6",
        primary300: "#2D7DA8",
        primary400: "#0E4970",
        primary500: "#05334C",
        primary600: "#001B26",
        primary700: "#000F14",
        secondary100: "#FFA18F",
        secondary200: "#F7896F",
        secondary300: "#E56548",
        secondary400: "#D8532E",
        secondary500: "#BA381A",
        secondary600: "#9E280D",
        secondary700: "#600F02",
        unitColor1: "#0f766e",
        unitColor2: "#312e81",
        unitColor3: "#7f1d1d",
        unitColor4: "#a16207",
      },
      transitionProperty: {
        height: "height",
      },
      scale: {
        99: "0.99",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-6px) rotateY(-9deg)",
          },
          "18.5%": {
            transform: "translateX(5px) rotateY(7deg)",
          },
          "31.5%": {
            transform: "translateX(-3px) rotateY(-5deg)",
          },
          43.5: {
            transform: "translateX(2px) rotateY(3deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        shake: "shake 1s linear forwards",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
