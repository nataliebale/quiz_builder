import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ui-danger": "rgb(var(--ui-danger) / <alpha-value>)",
        "ui-bg": "rgb(var(--ui-bg) / <alpha-value>)",
        "ui-text": "rgb(var(--ui-text) / <alpha-value>)",
        "ui-border": "rgb(var(--ui-border) / <alpha-value>)",
        "ui-surface": "rgb(var(--ui-surface) / <alpha-value>)",
        "ui-surface-2": "rgb(var(--ui-surface-2) / <alpha-value>)",
        "ui-muted": "rgb(var(--ui-muted) / <alpha-value>)",
        "ui-primary": "rgb(var(--ui-primary) / <alpha-value>)",
        "ui-primary-2": "rgb(var(--ui-primary-2) / <alpha-value>)",
      },
    },
  },
  plugins: [],
} satisfies Config;
