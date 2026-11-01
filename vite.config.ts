import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
// Build timestamp, baked in at build/deploy time so the footer's "Updated"
// date always reflects the last deploy (not the visitor's clock).
const BUILD_DATE = JSON.stringify(new Date());

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // This ensures assets are loaded from the root domain
  define: {
    __BUILD_DATE__: BUILD_DATE,
  },
});
