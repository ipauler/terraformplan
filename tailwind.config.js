/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui'],
        'sans': ['Inter', 'system-ui'],
      },
    },
  },
  plugins: [],
}
