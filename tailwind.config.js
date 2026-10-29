/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        thaw: {
          50: '#f4f7f6',
          100: '#e3eae7',
          200: '#c5d3ce',
          300: '#9cb5ad',
          400: '#73958a',
          500: '#54786d',
          600: '#426057',
          700: '#364e47',
          800: '#2e403b',
          900: '#273532',
          950: '#17201e',
        },
        sage: {
          50: '#f2f6f4',
          100: '#e2ece7',
          200: '#c5d8cf',
          300: '#9ebfaf',
          400: '#75a18c',
          500: '#54856c',
          600: '#406b53',
          700: '#345543',
          800: '#2b4437',
          900: '#25382e',
        },
        amber: {
          50: '#fbf8f2',
          100: '#f4ebde',
          200: '#e8d5bc',
          300: '#d9b990',
          400: '#c79963',
          500: '#b07e44',
          600: '#9a6737',
          700: '#7e522f',
          800: '#67432a',
          900: '#563825',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'forest-mist': 'radial-gradient(circle at 50% 20%, rgba(84, 120, 109, 0.15), rgba(39, 53, 50, 0.9))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
      }
    },
  },
  plugins: [],
};
