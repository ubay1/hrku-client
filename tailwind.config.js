module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'phone': '576px',
      'tablet': '768px',
      'laptop': '992px',
      'desktop': '1200px',
      'lg-desktop': '1400px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
