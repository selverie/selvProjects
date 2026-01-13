/** @type {import('tailwindcss').Config} */
export default {
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
                primary: '#FFFFFF', // White
                secondary: '#0F172A', // Slate 900 (Dark Text)
                accent: '#6366F1', // Indigo 500
                muted: '#F1F5F9', // Slate 100 (Light Gray for backgrounds)
            },
        },
    },
    plugins: [],
}
