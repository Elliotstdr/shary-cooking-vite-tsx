/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        home: "repeat(auto-fit, minmax(18rem, 20rem))",
      },
      boxShadow: {
        home: "0px 1px 10px 0px rgba(0, 0, 0, 0.35)",
        nav: "0px 2px 20px 0px rgba(0, 0, 0, 0.4)",
        searchbar: "0px 1px 10px 0px rgba(0, 0, 0, 0.3)",
        card: "0px 1px 10px 0px rgba(0, 0, 0, 0.75)",
      },
      width: {
        unset: "unset",
        120: "480px",
        150: "600px",
        160: "640px",
      },
      height: {
        62: "248px",
        100: "400px",
        125: "500px",
        150: "600px",
      },
      zIndex: {
        1: 1,
        2: 2,
      },
      animation: {
        loader: "rotation 1s linear infinite",
        "reverse-loader": "rotation 0.5s linear infinite reverse",
        navbar: "navbar 0.6s ease forwards",
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        navbar: {
          to: { width: "100%" },
        },
      },
    },
    fontFamily: {
      dilgante: ["Dilgante Rocks", "sans-serif"],
      apple: [
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"',
        "sans-serif",
      ],
    },
    screens: {
      mobile: "340px",
      tablet: "650px",
      laptop: "900px",
      desktop: "1100px",
      nav: "990px",
    },
    colors: {
      green: "#263a29",
      orange: "#e86a33",
      fond: "#f4f1ef",
      white: "#ffffff",
      skeleton: "#dcdedf",
      "card-green": "#008000",
      "card-red": "red",
      search: "#dee2e6",
      picto: "#8a8a8a",
      gris: "grey",
      transparent: "transparent",
      icon: "#6c757d",
    },
    lineHeight: {
      12: "3rem",
      16: "4rem",
      20: "5rem",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".absolute-centering": {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        },
        ".visible-transition": {
          visibility: "visible",
          opacity: "1",
          "max-height": "30rem",
        },
        ".hidden-transition": {
          visibility: "hidden",
          opacity: "0",
          "max-height": "0",
        },
        ".visible-slide": {
          visibility: "visible",
          transform: "translateX(0)",
          "background-color": "rgb(0, 0, 0, 0.5)",
        },
        ".hidden-slide": {
          visibility: "hidden",
          transform: "translateX(-50%)",
          "background-color": "rgb(0, 0, 0, 0)",
        },
        ".flex-center": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
        ".invertY": {
          transform: "rotateY(180deg)",
        },
        ".transition-300": {
          transition: "all 0.3s ease-in-out",
        },
        ".border-detail": {
          border: "2px solid #e86a33",
        },
        ".bouton-svg": {
          "margin-right": "0.5rem",
          width: "1.5rem",
          height: "1.5rem",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
