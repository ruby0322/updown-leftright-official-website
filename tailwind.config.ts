import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn-ui required colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // 自定義 brand 顏色系統 - 以藍色為主色調
        brand: {
          // 主色系 - 藍色系列
          primary: {
            50: "#f5f7fe",
            100: "#ebeffe",
            200: "#dce3fd",
            300: "#bcc9fb",
            400: "#8fa8fa",  // 主要使用色
            500: "#6d8bf8",  // hover 狀態
            600: "#4a6ef6",
            700: "#2d51f4",
            800: "#1537dd",
            900: "#1230c4",
            DEFAULT: "#8fa8fa", // primary-400
          },
          // 次要色系 - 橙色系列
          secondary: {
            50: "#fff8f5",
            100: "#fff1eb",
            200: "#fee2d7",
            300: "#fdcdb8",
            400: "#fc995c",  // 主要使用色
            500: "#fb7b3e",  // hover 狀態
            600: "#fa5d20",
            700: "#e64a0c",
            800: "#cc420b",
            900: "#a33509",
            DEFAULT: "#fc995c", // secondary-400
          },
        },

        // Rose color palette (Tailwind default) - 為了向後兼容
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
          DEFAULT: "#fb7185",
        },

        // 背景色系 - 與主題系統集成
        bg: {
          light: "#ffffff",
          dark: "#27272a",
          overlay: "rgba(0, 0, 0, 0.4)",
          glass: "rgba(255, 255, 255, 0.9)",
          DEFAULT: "hsl(var(--background))", // 使用主題變數
        },

        // 強調色系
        highlight: {
          primary: {
            light: "#bcc9fb",  // brand-primary-300
            DEFAULT: "#8fa8fa", // brand-primary-400
            dark: "#6d8bf8",   // brand-primary-500
          },
          overlay: {
            light: "rgba(143, 168, 250, 0.1)",  // primary-400/10
            DEFAULT: "rgba(143, 168, 250, 0.2)", // primary-400/20
            dark: "rgba(143, 168, 250, 0.3)",    // primary-400/30
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
