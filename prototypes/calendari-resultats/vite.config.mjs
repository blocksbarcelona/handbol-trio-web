import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

// Reuse the browser API configuration already published by the legacy site.
// Calendar rebuilds on the publishing server use this same configuration.
const socialFeed = readFileSync(new URL("../../js/social-feed.js", import.meta.url), "utf8");
const youtubeConfig = {
  apiKey: process.env.YOUTUBE_API_KEY || socialFeed.match(/API_KEY:\s*'([^']+)'/)?.[1],
  playlistId: socialFeed.match(/UPLOADS_PLAYLIST_ID:\s*'([^']+)'/)?.[1],
};
if (!youtubeConfig.apiKey || !youtubeConfig.playlistId) {
  throw new Error("Missing YouTube browser API configuration");
}

export default defineConfig({
  define: {
    __YOUTUBE_CONFIG__: JSON.stringify(youtubeConfig),
  },
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
