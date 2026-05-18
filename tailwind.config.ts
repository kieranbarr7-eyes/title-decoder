import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0A0A", body: "#1A1A1A", muted: "#6B6B6B" },
        vermillion: "#D62828",
        rule: "#E5E5E5",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: [
          '"Iowan Old Style"',
          '"Apple Garamond"',
          "Baskerville",
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
        mono: [
          '"SF Mono"',
          "Menlo",
          "Consolas",
          '"Liberation Mono"',
          "monospace",
        ],
      },
    },
  },
  plugins: [typography],
};

export default config;
