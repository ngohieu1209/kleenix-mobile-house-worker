/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFF5FF',
        secondary: {
          DEFAULT: '#0000FF',
          100: '#0066FF',
          200: '#008DFF',
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533',
        },
        gray: {
          100: '#CDCDE0',
        },
      },
      fontFamily: {
        pthin: ['BeVietnamPro-Thin', 'sans-serif'],
        pextralight: ['BeVietnamPro-ExtraLight', 'sans-serif'],
        plight: ['BeVietnamPro-Light', 'sans-serif'],
        pregular: ['BeVietnamPro-Regular', 'sans-serif'],
        pmedium: ['BeVietnamPro-Medium', 'sans-serif'],
        psemibold: ['BeVietnamPro-SemiBold', 'sans-serif'],
        pbold: ['BeVietnamPro-Bold', 'sans-serif'],
        pextrabold: ['BeVietnamPro-ExtraBold', 'sans-serif'],
        pblack: ['BeVietnamPro-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
