/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03003A",
        secondary: "#252779",
        tertiary: "#23105A",
        fourtiary: "#1C113A",
      },
      backgroundImage: {
        "linear-primary":
          "linear-gradient(to right, #03003A, #252779, #23105A)",
        "linear-custom":
          "linear-gradient(to bottom right, #1C113A, #23105A, #252779)",
        "login-bg": "url('/src/assets/loginbg.jpg')",
        "text-gradient-ul": "linear-gradient(to top left, #C15DEF, #FFFFFF)",
      },
      fontFamily: {
        figtree: ["Figtree", "sans-serif"], // Primary font
        manjari: ["Manjari", "sans-serif"], // Fallback font
      },
    },
  },
  plugins: [],
};
