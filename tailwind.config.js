/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          dark: '#050505',
          card: '#111111',
          primary: '#8B5CF6',
          secondary: '#A855F7',
          muted: '#A1A1AA'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        sora: ['var(--font-sora)', 'sans-serif'],
      },
      borderRadius: {
        'xl': '20px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
