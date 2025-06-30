import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Para o Docker funcionar corretamente
    port: 5173 // Define a porta interna do contêiner
  }
});
