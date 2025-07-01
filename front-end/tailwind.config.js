/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px);",
            transform: "translateX(-500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": " translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
            borderRadius: "9999999px",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left2":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "rotate-center": "rotate-center 8s linear infinite",
        "rotate-center-pause": "rotate-center-pause 0.3s linear 2 reverse",
      },
      backgroundColor: {
        "main-100": "#FFFFFF",
        "main-200": "#F2F2F2",
        "overlay-30": "rgba(0,0,0,0.3)",
      },
      colors: {
        "main-100": "#666666",
        "main-200": "#7C7C83",
        primary: "#8A21BE",
      },
      flex: {
        4: "4 4 0%",
        6: "6 6 0%",
      },
    },
    screens: {
      1240: "1240px",
    },
  },
  plugins: [],
};
