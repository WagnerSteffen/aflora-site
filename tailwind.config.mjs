// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["work-sans", "sans-serif"],
        "amatic-sc": ["'Amatic SC'", "cursive"],
        "amatic-sc-bold": ["'Amatic SC'", "cursive"],
        "dm-serif-text": ["'DM Serif Text'", "serif"],
        "dm-serif-text-italic": ["'DM Serif Text'", "serif"],
        waterfall: ["Waterfall", "cursive"],
        "lexend-giga": ["Lexend Giga", "serif"],
        "noto-sans-jp": ["Noto Sans JP", "serif"],
        "work-sans": ["Work Sans", "sans-serif"],
        "work-sans-bold": ["Work Sans", "sans-serif"],
      },
      fontWeight: {
        "amatic-sc-regular": 400,
        "amatic-sc-bold": 700,
        "dm-serif-text-regular": 400,
        "dm-serif-text-italic": 400,
        "waterfall-regular": 400,
        "lexend-giga": 400,
        "noto-sans-jp": 400,
        "work-sans": 400,
        "work-sans-bold": 500,
      },
      fontStyle: {
        "dm-serif-text-regular": "normal",
        "dm-serif-text-italic": "italic",
        "work-sans-bold": "bold",
        "work-sans": "regular",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate", "tailwind-scrollbar-hide", "@tailwindcss/typography"),
  ],
};
