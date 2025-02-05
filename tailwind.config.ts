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
        secondColor: "#B9BCFF",
        starColor: "#FDF0CD",
        starIconColor: "#FFC700",
        startTextColor: "#FFB802",
        wygColor: "#F3F3F3",
        sideBarBgColo: "#1B1B1B",
        redColor: "#EE3D45",
        redColorHoverLight: "#FF5F68",
        succsseColor: "#45DA10",
        courseIconsSection: "#FF6636",
        courseTextSection: "#6E7485",
        courseStarColor: "#FD8E1F",
        courseConseptColor: "#E1F7E366",
        progressBarCourseColor: "#0DC7B1",
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
