module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'pink': '#e6007a',
      'blue': '#1da1f2',
      'green': '#0dbd8b',
      'gray': '#f8fafc',
    }),
    boxShadow: {
      gray: '0 15px 40px 0px rgba(28, 0, 207, 0.05)',
      pink: '0 2px 4px 20px rgba(175, 0, 93, 0.27)'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
