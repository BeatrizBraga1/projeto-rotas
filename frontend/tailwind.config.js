/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'placeholder': '#BCBCBC',
        'grey': '#616161',
        'grey-dk': '#4E4E4E',
        'bg-white-lg': '#FFFFFF',
        'bg-white': '#F3F3F5',
        'bg-form': '#D9D9D9',
        'border-line': '#E9ECEF',
        'success-check': '#5CBB5C',
        'warning': '#FFB22B',
        'danger': '#FC4B6C',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
