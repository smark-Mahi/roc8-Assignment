import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "open-menu": {
          "0%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1.2)" },
          "100%": { transform: "scaleY(1)" },
        },
        loader: {
          "0%": { transformOrigin: "50% -100%", transform: "rotate(0deg)" },
          "50%": {
            transformOrigin: "50% -100%",
            transform: "rotate(360deg)",
          },
          "50.1%": {
            transformOrigin: "50% 200%",
            transform: "rotate(0deg)",
          },
          "100%": {
            transformOrigin: "50% 200%",
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-in-out forwards",
        loading: "loader 3s  ease-in-out infinite",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      screens: {
        // Default 390px
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
  },

  plugins: [],
};
export default config
