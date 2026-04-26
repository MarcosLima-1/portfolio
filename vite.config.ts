import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// TODO: Add sentry plugin back when we have the Sentry project set up

export default defineConfig(() => {
	const plugins = [
		tanstackStart({
			router: { generatedRouteTree: "./types/routeTree.generated.ts", quoteStyle: "double" },
		}),
		nitro({
			output: { dir: "./build/frontend" },
			preset: "bun",
			plugins: ["./server/plugins/discord-bot.ts"],
		}),
		tailwindcss(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	];

	return {
		plugins,
		build: {
			outDir: "./build/frontend",
			reportCompressedSize: true,
			rollupOptions: {
				external: ["zlib-sync"],
			},
		},
		resolve: {
			tsconfigPaths: true,
		},
		server: {
			host: true,
			open: true,
		},
	};
});
