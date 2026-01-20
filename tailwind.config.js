/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        primary: '#FFFFFF', 
        secondary: '#0F172A', 
        accent: '#6366F1', 
        muted: '#F1F5F9',
      },
    },
  },
  plugins: [],
}
