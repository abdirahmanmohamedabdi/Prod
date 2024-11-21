/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      
        'one': '#88C273',
        'two': '#1E3E62',
        'three': '#0B192C',
        'four': '#DFF2EB',
       
      },
      fontFamily: {
        font: ['Nunito',],
       },
    },
  },
  plugins: [],
};
