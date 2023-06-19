/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-highlight": "#F4EEE4",
        anzac: {
          50: "#FBF9EB",
          100: "#F7F1CA",
          200: "#F0E398",
          300: "#E8CC5C",
          400: "#E1BA3D",
          500: "#CF9F23",
          600: "#B37C1B",
          700: "#8F5B19",
          800: "#77491C",
          900: "#663D1D",
        },
        pomegranate: {
          50: "#FEF4F2",
          100: "#FFE5E1",
          200: "#FFD1C9",
          300: "#FEB0A3",
          400: "#FB836E",
          500: "#F1492C",
          600: "#E03E22",
          700: "#BC3119",
          800: "#9B2C19",
          900: "#812A1B",
        },
        goblin: {
          50: "#F3FAF3",
          100: "#E3F5E4",
          200: "#C9E9CA",
          300: "#9ED7A2",
          400: "#6CBC71",
          500: "#47A04E",
          600: "#317736",
          700: "#2D6831",
          800: "#28532B",
          900: "#224526",
        },
      },
      borderRadius: {
        "4xl": "30px",
        "5xl": "40px",
      },
      fontFamily: {
        IBM: ["IBM Plex Sans", "sans-serif"],
        IBMArabic: ["IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        nccTheme: {
          primary: "#594E38",
          secondary: "#BB9869",
          accent: "#A1A4A3",
          neutral: "#736C5B",
          "base-100": "#EEF1F4",
          info: "#446B7E",
          success: "#63D390",
          warning: "#D9BE5D",
          error: "#DA5B55",
        },

        // nccTheme: {
        //   primary: "#534731",
        //   secondary: "#A9823A",
        //   accent: "#A1A4A3",
        //   neutral: "#6E6E6E",
        //   "base-100": "#EEF1F4",
        //   info: "#446B7E",
        //   success: "#3ECE78",
        //   warning: "#CCAC3C",
        //   error: "#CE352C",
        // },
        // nccTheme: {
        //   primary: "#D0AB6A",
        //   secondary: "#08265C",
        //   accent: "#A1A4A3",
        //   neutral: "#6E6E6E",
        //   "base-100": "#EEF1F4",
        //   info: "#3ABFF8",
        //   success: "#36D399",
        //   warning: "#FBBD23",
        //   error: "#F87272",
        // },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-flip"),
  ],
};
