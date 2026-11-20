// Astro's Node adapter ignores Host and X-Forwarded-* unless allowedDomains is explicit. Bind it to the configured
// public origin (EMDASH_SITE_URL), never to a request header or a wildcard.
export function publicOriginConfig(value) {
	// Local builds and dev on loopback work without a public origin.
	if (!value) return {};
	let url;
	try {
		url = new URL(value);
	} catch {
		throw new Error("EMDASH_SITE_URL must be an HTTP(S) origin.");
	}
	if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.hostname.includes("*")) {
		throw new Error("EMDASH_SITE_URL must be an HTTP(S) origin without credentials, path or wildcard.");
	}
	if (url.protocol !== "https:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
		throw new Error("A public EMDASH_SITE_URL must use HTTPS. HTTP is allowed only on loopback.");
	}
	return {
		site: url.origin,
		security: { allowedDomains: [{ protocol: url.protocol.slice(0, -1), hostname: url.hostname, port: url.port }] },
	};
}
