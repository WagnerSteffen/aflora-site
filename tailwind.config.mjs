// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fly: {
          "0%": {
            transform: "translateX(-100%) translateY(0%)", // Começa fora da tela à esquerda
            opacity: 0,
          },
          "25%": {
            transform: "translateX(50%) translateY(-50%) rotate(45deg)", // Sobe e gira
            opacity: 1,
          },
          "50%": {
            transform: "translateX(100%) translateY(0%) rotate(135deg)", // Faz a volta circular
            opacity: 1,
          },
          "75%": {
            transform: "translateX(50%) translateY(50%) rotate(225deg)", // Desce e gira
            opacity: 1,
          },
          "100%": {
            transform: "translate(0, 0) rotate(360deg)", // Posição final no centro, completando a rotação
            opacity: 1,
          },
        },
      },
      animation: {
        fly: "fly 3s ease-in-out", // Loop infinito alternando a direção
        flyOnce: "fly 3s ease-in-out forwards",
      },
      fontFamily: {
        "marck-script": ["Marck Script", "cursive"],
      },
    },
  },
  plugins: [],
};
