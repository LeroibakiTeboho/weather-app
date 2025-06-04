module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668A',
        'weather-secondary': '#004E71',
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
}