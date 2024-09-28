/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#085ACF",
      }
    },
    container:{
      center:"true",
      padding:{
        DEAFULT:'1rem',
        sm: '2rem',
        xl: '3rem'
      }
      }
  },
  plugins: [],
}

