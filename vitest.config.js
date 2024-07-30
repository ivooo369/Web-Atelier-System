import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Ensure you have this

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    globals: true,
  },
});
