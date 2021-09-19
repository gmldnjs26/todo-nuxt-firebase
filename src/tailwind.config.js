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
        primary: '#69f0ae',
        primary_light: '#9fffe0',
        primary_dark: '#2bbd7e',
        secondary: '#ffd180',
        secondary_light: '#ffffb1',
        secondary_dark: '#caa052',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
