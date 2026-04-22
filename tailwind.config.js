/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:       '#0a0a0a',
        surface:  '#141414',
        surface2: '#1a1a1a',
        border:   '#262626',
        muted:    '#737373',
        muted2:   '#404040',
        red:      '#dc2626',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#d4d4d4',
            maxWidth: 'none',
          }
        }
      }
    },
  },
  plugins: [],
}
