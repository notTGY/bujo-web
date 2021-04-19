module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ink': '#2f2235',
        'ink-highlighted' : '#3f3244',
        'paper-shaded': '#cca39d',
        'paper': '#edbfb7',
        'gray-special': '#c7e8f3',
        'back': '#60495a',
        'book-shade': '#0001',
        'book-cover': '#332730'
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
