/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F0EA',
        ink: '#0B0B0B',
        accent: '#FF3D00',
        concrete: '#C9C6BE',
        line: '#141414',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest2: '-0.04em',
      },
    },
  },
  plugins: [],
};
