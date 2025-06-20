/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#FFFFFF",
        "main-200": "#F2F2F2",
      },
      colors: {
        "main-100": "#666666",
        "main-200": "#7C7C83",
        primary: "#8A21BE",
      },
    },
    screens: {
      1240: "1240px",
    },
  },
  plugins: [],
};
