/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C2A5B",
        secondary: "#2C2A5B",
        baseBg: "#fff",
      },
    },
  },
  plugins: [],
};
