export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ae: {
          DEFAULT: "#4F7A33",
          dark: "#36561F",
          lime: "#D6EE76",
          bg: "#F3F4F0",
          soft: "#EEF3E5",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        urbanist: ["Urbanist", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
