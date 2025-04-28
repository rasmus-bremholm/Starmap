import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	// Har ingen aning om vad detta gör, men fick en jobbig varning som jag inte fattade. Detta verkar vara enda läsningen.
	// https://github.com/vitejs/vite/discussions/17738
	optimizeDeps: { force: true, exclude: ["node_modules/.cache"] },
});
