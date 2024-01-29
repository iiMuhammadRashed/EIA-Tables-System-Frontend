/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },

    extend: {},
  },
  plugins: [import('preline/plugin')],
};
