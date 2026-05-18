import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#1A1410",
        "paper-light": "#1F1813",
        ink: "#F2EDE0",
        "ink-muted": "#A89578",
        accent: "#D4A437",
        rule: "#3A2D20",
      },
      fontFamily: {
        serif: [
          "'Iowan Old Style'",
          "'Apple Garamond'",
          "Baskerville",
          "'Times New Roman'",
          "Times",
          "serif",
        ],
        mono: [
          "'SF Mono'",
          "Menlo",
          "Consolas",
          "'Liberation Mono'",
          "monospace",
        ],
      },
    },
  },
  plugins: [typography],
};

export default config;
