/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "small": ".65rem",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      keyframes: {
        showDialog: {
          '0%': { opacity: 0, top: '-50%' },
          '100%': { opacity: 1, top: '50%' },
        }
      },
      animation: {
        showDialog: 'showDialog 0.8s ease-in-out'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ],
}