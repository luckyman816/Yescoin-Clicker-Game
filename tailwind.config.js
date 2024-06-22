const plugin = require('tailwindcss/plugin')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif']
      },
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      animation: {
        fadeouttopright: 'fade-out-top-right 0.3s ease-in-out 0.2s 1',
        'slide-in-bottom': 'slide-in-bottom 0.3s ease-out',
        'slide-out-bottom': 'slide-out-bottom 0.3s ease-in',
      },
      backgroundImage: {
        'radial-ellipse': 'radial-gradient(circle at center, #E39431, transparent)',
      },
      boxShadow: {
        'custom': '0px 0px 24.01px 0px rgba(42, 171, 238, 0.58)'
      },
      keyframes: {
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-out-bottom': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const radialGradientUtilities = {
        '.radial-gradient': {
          background: 'radial-gradient(68.4% 68.4% at 51.16% 53.22%, #1E4759 0%, #020304 100%)',
        },
        '.linear-gradient': {
          background: 'linear-gradient(90deg, #00AEEF 0%, #D99748 100%)',
        }
      }
      addUtilities(radialGradientUtilities)
    })
  ],
};
