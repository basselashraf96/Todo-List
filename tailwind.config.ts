import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // Include the `app` directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Include the `components` directory
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",       // Include the `lib` directory (if needed)
    "./db/**/*.{js,ts,jsx,tsx,mdx}",        // Include the `db` directory (if needed)
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",     // Include the `hooks` directory (if needed)
    "./util/**/*.{js,ts,jsx,tsx,mdx}",      // Include the `util` directory (if needed)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",     // If you still have a `pages` directory
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
