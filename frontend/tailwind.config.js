/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dominant: '#FEF3FF',
        secondary: '#1F0322',
        accent: '#8A1C7C',
      },
    },
  },
  plugins: [],
}
