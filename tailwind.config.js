/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'mouride-green':      '#166534',
        'mouride-green-dark': '#14532d',
        'mouride-gold':       '#D4B558',
        'mouride-gold-light': '#E5CA7A',
        'mouride-cream':      '#FDF8F0',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans:    ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
