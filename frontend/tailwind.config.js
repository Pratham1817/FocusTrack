/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-color": "var(--accent-color)",
      },
    },
  },
  darkMode: "selector",
  plugins: [tailwindScrollbar],
};
