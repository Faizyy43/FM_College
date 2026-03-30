/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        adminblue: {
          primary: "#0284c7",      // sky blue
          secondary: "#1e40af",    // dark blue
          accent: "#38bdf8",       // light accent
          neutral: "#1f2937",
          "base-100": "#ffffff",   // background
        },
      },
    ],
  },
};