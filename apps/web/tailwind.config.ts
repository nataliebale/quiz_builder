import type { Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
