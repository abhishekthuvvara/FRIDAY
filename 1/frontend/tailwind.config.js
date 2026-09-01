/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        friday: {
          bg: '#05070D',
          surface: '#0B111C',
          accent: '#00E5FF',
          glow: 'rgba(0, 229, 255, 0.15)',
        }
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 15px rgba(0, 229, 255, 0.3)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(11, 17, 28, 0.8) 0%, rgba(5, 7, 13, 0.9) 100%)',
      }
    },
  },
  plugins: [],
}
