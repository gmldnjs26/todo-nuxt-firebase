module.exports = {
  mode: 'jit',
  purge: [
    './src/components/**/*.{vue,js}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // https://www.color-hex.com/color-palette/35476
        primary_one: '#eec07b',
        primary_two: '#f0d1a0',
        primary_three: '#d8c4aa',
        primary_four: '#422308',
        primary_five: '#6d3200',
        red_one: '#f73c47',
        red_two: '#f74429',
        red_three: '#e63624',
        red_four: '#ee3931',
        red_five: '#ed4123',
        blue_one: '#379ae0',
        blue_two: '#2790de',
        blue_three: '#278fcf',
        blue_four: '#357bdf',
        blue_five: '#378bd1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
