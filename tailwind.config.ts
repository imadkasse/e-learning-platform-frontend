import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#3D45EE",
        mainColorHoverLight: "#2E36C0",
        mainColorHoverDark: "#5C66FF",
        starColor: "#FDF0CD",
        starIconColor: "#FFC700",
        startTextColor: "#FFB802",
        wygColor:"#F3F3F3"
      },
      screens: {
        xs: "330px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
export default config;
