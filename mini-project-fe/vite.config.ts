import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // target: 'http://localhost:3101', // your backend server
        target: 'https://clint-be.mlhuillier.net', // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
