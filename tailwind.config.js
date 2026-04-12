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
        bg: '#0A0A0F',
        'bg-secondary': '#0F0F18',
        'bg-card': '#12121C',
        accent: '#00FF94',
        'accent-dim': 'rgba(0, 255, 148, 0.12)',
        'fg-muted': 'rgba(255, 255, 255, 0.5)',
        'fg-subtle': 'rgba(255, 255, 255, 0.18)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-accent': 'rgba(0, 255, 148, 0.3)',
      },
      fontFamily: {
        display: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};