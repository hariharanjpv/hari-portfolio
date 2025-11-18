module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lime: {
          50: '#f0ffcc',
          100: '#d2ff00',
          200: '#b8e600',
          300: '#9ecc00',
          off: '#b2c73a',
          zero: '#d2ff0000',
        },
        'dark-green': {
          DEFAULT: '#282c20',
          'tint-1': '#3b3c38',
          'tint-2': '#535450',
        },
        'green': {
          'off-white-1': '#dde1d2',
          'off-white-2': '#b4b8a5',
        },
        'grey': {
          'on-track': '#b9bbad',
          1: '#ebeee0',
          2: '#c8cbbd',
        },
        white: '#f4f4ed',
        black: '#111112',
        cream: '#efefe5',
        beige: '#f4f4ed',
        'muted': '#535450',
      },
      boxShadow: {
        lime: '0 6px 30px rgba(210,255,0,0.15), 0 0 20px rgba(210,255,0,0.1)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        'gap': 'var(--gap)',
        'padding-container': 'var(--padding--container)',
        'padding-small': 'var(--padding--small)',
        'padding-med': 'var(--padding--med)',
        'padding-large': 'var(--padding--large)',
        'padding-xlarge': 'var(--padding--xlarge)',
      },
      borderRadius: {
        'small': 'var(--radius--small)',
        'med': 'var(--radius--med)',
        'large': 'var(--radius--large)',
      },
    },
  },
  plugins: [],
}
