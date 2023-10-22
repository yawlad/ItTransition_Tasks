import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        noise: "url(/noise.png)",
        gradient:
          "linear-gradient(to right, #7b1fa2, #673ab7, #f48fb1, #7b1fa2);",
      },
      colors: {
        main: "#141414",
        "main-l": "#141414",
        secondary: "hsla(0,0%,100%,.1)",
      },
      keyframes: {
        "bubble-keys-v1": {
          "0%, 100%": { transform: "translate(-25%,-25%) scale(1)" },
          "50%": { transform: "translate(-25%,-15%) scale(1.3)" },
        },
        "bubble-keys-v2": {
          "0%, 100%": { transform: "translate(25%,-25%) scale(1)" },
          "50%": { transform: "translate(25%,-15%) scale(1.3)" },
        },
        "bg-gradient-keys": {
          "0%": { "background-position": "0% 0%" },
          "100%": { "background-position": "200% 0%" },
        },
      },
      animation: {
        "buble-anim-v1": "bubble-keys-v1 16s infinite",
        "buble-anim-v2": "bubble-keys-v2 14s infinite",
        "bg-gradient-anim": "bg-gradient-keys 5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
