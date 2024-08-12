module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'transform': 'transform',
        'colors': 'background-color, color',
      },
    },
  },
  variants: {},
  plugins: [],
}
