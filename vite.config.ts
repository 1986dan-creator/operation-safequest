import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGitHubPagesBuild ? "/operation-safequest/" : "/",
  plugins: isGitHubPagesBuild ? [react()] : [react(), cloudflare()],
});
