// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "marck-script": ["Marck Script", "cursive"],
        "amatic-sc": ["Amatic SC", "coursive"],
      },
    },
  },
  plugins: [],
};
