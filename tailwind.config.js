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
        search: "0px 1px 10px 0px rgba(0, 0, 0, 0.3)",
      },
      width: {
        unset: "unset",
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
    },
    colors: {
      green: "#263a29",
      orange: "#e86a33",
      fond: "#f4f1ef",
      white: "#ffffff",
      skeleton: "#dcdedf",
      "card-green": "#008000",
      search: "#dee2e6",
      picto: "#8a8a8a",
      gris: "grey",
      transparent: "transparent",
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
          "max-height": "50rem",
        },
        ".hidden-transition": {
          visibility: "hidden",
          opacity: "0",
          "max-height": "0",
        },
        ".invertY": {
          transform: "rotateY(180deg)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
