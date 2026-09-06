/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0E7C4A',
          dark: '#0B1F2A',
          navy: '#102A38',
          light: '#F5F8F7'
        }
      }
    }
  },
  plugins: []
};
