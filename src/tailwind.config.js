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
        primary: '#448aff',
        primary_light: '#83b9ff',
        primary_dark: '#005ecb',
        secondary: '#ffd180',
        secondary_light: '#ffffb1',
        secondary_dark: '#caa052',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
