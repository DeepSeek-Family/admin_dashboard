import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // allows access from outside (e.g., EC2, domain)
//     port: 5175, // change this to your desired port
//     allowedHosts: ["admin.glassfile.xyz"], // optional: prevent "host not allowed" errors
//   },
// });

export default defineConfig({
  plugins: [react()],
  server: {
    host: "10.10.7.42",
    port: 3014,
  },
});
