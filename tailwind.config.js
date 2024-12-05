module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the src folder
  ],
  theme: {
    extend: {
      animation: {
        scan: 'scan 2s linear infinite', // Add the custom animation here
      },
      keyframes: {
        scan: {
          '0%': { top: '-100%' },
          '50%': { top: '50%' },
          '100%': { top: '100%' },
        },
      },
    },
  },
  plugins: [],
};
