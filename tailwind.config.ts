import { Config } from "tailwindcss";

const config: Config = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          200: "#ecfccb",
          300: "#d9f99d",
          400: "#bef264",
          500: "#a3e635",
          600: "#84cc16",
          700: "#65a30d",
          800: "#4d7c0f",
          900: "#365314",
        },
        secondary: {
          200: "#dbeafe",
          300: "#bfdbfe",
          400: "#93c5fd",
          500: "#60a5fa",
          600: "#3b82f6",
          700: "#2563eb",
          800: "#1d4ed8",
          900: "#1e40af",
        },
        neutral: {
          200: "#f5f5f5",
          300: "#e5e5e5",
          400: "#d4d4d4",
          500: "#a3a3a3",
          600: "#737373",
          700: "#525252",
          800: "#404040",
          900: "#262626",
        },
        success: {
          400: "#dcfce7",
          600: "#4ade80",
          700: "#16a34a",
          800: "#15803d",
          900: "#14532d",
        },
        danger: {
          400: "#fee2e2",
          600: "#f87171",
          700: "#dc2626",
          800: "#b91c1c",
          900: "#7f1d1d",
        },
        warning: {
          400: "#fef9c3",
          600: "#facc15",
          700: "#ca8a04",
          800: "#a16207",
          900: "#713f12",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam", "sans-serif"],
      },
      fontSize: {
        heading1: ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        heading2: ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        heading3: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        heading4: ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-large-bold": ["20px", { fontWeight: "700" }],
        "body-large-semibold": ["20px", { fontWeight: "600" }],
        "body-large-medium": ["20px", { fontWeight: "500" }],
        "body-large-regular": ["20px", { fontWeight: "400" }],
        "body-base-bold": ["16px", { fontWeight: "700" }],
        "body-base-semibold": ["16px", { fontWeight: "600" }],
        "body-base-medium": ["16px", { fontWeight: "500" }],
        "body-base-regular": ["16px", { fontWeight: "400" }],
        "body-small-bold": ["12px", { fontWeight: "700" }],
        "body-small-semibold": ["12px", { fontWeight: "600" }],
        "body-small-medium": ["12px", { fontWeight: "500" }],
        "body-small-regular": ["12px", { fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;
