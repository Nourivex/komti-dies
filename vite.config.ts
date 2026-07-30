import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
      },
      pages: [
        { path: "/" },
        { path: "/tika" },
        { path: "/cyber" },
        { path: "/navigator" },
      ],
      server: { entry: "server" },
    }),
    react(),
  ],
});
