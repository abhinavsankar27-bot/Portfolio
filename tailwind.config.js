/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'disruptor-black': '#000000',
        'disruptor-dark': '#121212',
        'disruptor-white': '#FFFFFF',
        'disruptor-volt': '#CCFF00',
      },
      fontFamily: {
        ranchers: ['var(--font-ranchers)', 'cursive'],
        space: ['var(--font-space-mono)', 'monospace'],
        jakarta: ['var(--font-plus-jakarta)', 'sans-serif'],
        archivo: ['var(--font-archivo)', 'sans-serif'],
      },
      boxShadow: {
        'neo-black': '8px 8px 0px 0px #000000',
        'neo-white': '8px 8px 0px 0px #FFFFFF',
      },
      letterSpacing: {
        'tech': '0.1em',
      },
      lineHeight: {
        'tight-heading': '0.85',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      }
    },
  },
  plugins: [],
};