import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import emdash, { local, s3 } from "emdash/astro";
import { sqlite } from "emdash/db";
import { publicOriginConfig } from "./scripts/public-origin.mjs";

export default defineConfig({
	// Behind a TLS-terminating proxy: the public origin from EMDASH_SITE_URL (EmDash's reverse proxy setup).
	...publicOriginConfig(process.env.EMDASH_SITE_URL),
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: sqlite({ url: "file:./data.db" }),
			// S3-compatible storage (R2) when EMDASH_MEDIA_STORAGE=s3 at build and at run; s3() reads the S3_* variables.
			storage:
				process.env.EMDASH_MEDIA_STORAGE === "s3"
					? s3()
					: local({
							directory: "./uploads",
							baseUrl: "/_emdash/api/media/file",
						}),
		}),
	],
	devToolbar: { enabled: false },
});
