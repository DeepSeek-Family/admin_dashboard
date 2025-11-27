import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "10.10.7.42",
    port: 3014,
  },
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0",
//     port: 3016,
//   },
// });
