module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./store/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          "0%": {
            width: "5%",
            opacity: 0
          },
          "80%": {
            width: "100%",
            opacity: 0.25
          },
          "100%": {
            opacity: 0
          }
        }
      },
      animation: {
        ripple: "ripple .5s linear",
        "spin-slow": "spin 4s linear infinite",
        "spin-medium": "spin 2s linear infinite"
      }
    }
  },
  plugins: []
};
