import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	envDir: "./environments",
	base: "/TODO_REPLACE_ME",
	server: {
		port: 3000,
	},
	// @ts-expect-error This is "test" object is not expected in defineConfig from "vite", but in defineConfig from "vitest/config"
	// But it still works!
	test: {
		coverage: {
			reporter: ["lcov"],
			reportsDirectory: ".coverage",
		},
	},
});
