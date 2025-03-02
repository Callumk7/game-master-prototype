import { resolve } from "node:path";
import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

dotenv.config({ path: ".env.test" });

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		environment: "node",
		setupFiles: ["./test/setup.ts"],
	},
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src"),
		},
	},
});
