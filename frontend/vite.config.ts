import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

export default defineConfig({
  base: "/",

  plugins: [vue()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `,
      },
    },
  },
});
