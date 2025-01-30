import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#0F4C5C",
          "heading-color": "#f00",
        },
        javascriptEnabled: true,
      },
    },
  },
});
