module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ink': '#2f2235',
        'ink-highlighted' : '#3f3244',
        'paper': '#edbfb7',
        'gray-special': '#c7e8f3'
      }
    },
    gradientColorStops: theme => ({
      ...theme('colors')
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
