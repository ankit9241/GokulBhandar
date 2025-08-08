/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color, #10b981)',
          hover: 'var(--primary-hover, #059669)',
        },
        secondary: 'var(--secondary-color, #3b82f6)',
        accent: 'var(--accent-color, #f59e0b)',
        text: {
          primary: 'var(--text-primary, #1f2937)',
          secondary: 'var(--text-secondary, #4b5563)',
        },
        background: {
          DEFAULT: 'var(--background, #ffffff)',
          secondary: 'var(--background-secondary, #f9fafb)',
        },
      },
    },
  },
  plugins: [],
}

