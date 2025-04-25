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
        darkpurple: "rgb(101 77 123 / <alpha-value>)",
        purple: "rgb(154, 84, 186)",
      },
      backgroundImage: {
        "linear-primary":
              "linear-gradient(to top, #03003A, #252779, #23105A , #1C113A)", //background of page
        "linear-custom":
          "linear-gradient(to bottom right, #1C113A, #23105A, #252779)",
        "login-bg": "url('/src/assets/images/loginbg.jpg')", //background for the lopin page
        "text-gradient-ul": "linear-gradient(to top left, #C15DEF, #FFFFFF)",
      },
      fontFamily: {
        figtree: ["Figtree", "sans-serif"], // Primary font
        manjari: ["Manjari", "sans-serif"], // secon font
        // <div className="fixed inset-0 bg-black/60 z-0"></div> // for dark bg effect
      },
    },
  },
  plugins: [],
};
