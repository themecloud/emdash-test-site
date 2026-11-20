This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
pnpm dev              # Start the Astro dev server
pnpm build            # Build the server into dist/
npx emdash types      # Regenerate TypeScript types from a running site
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- When Astro's cache is enabled, pass content-query hints to `Astro.cache.set(cacheHint)`. Use the `WithCacheHint` variants for site settings, menus, taxonomies, and widget areas rendered by cached routes.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## This Template

The most minimal template. A single `index.astro` page with EmDash wired up and no user seed, styles, components, or layouts beyond what Astro provides by default.

Without a user seed, EmDash applies its built-in posts/pages/categories/tags schema. Start here if you want to replace that baseline and control the public design from the beginning.

## Pages

| Page | Path | What it shows                          |
| ---- | ---- | -------------------------------------- |
| Home | `/`  | A single Astro page with EmDash wiring |

## Schema

There is no template-owned `seed/seed.json`. EmDash applies its built-in posts/pages schema with category and tag taxonomies. Add a user seed when the project needs a different schema or reproducible starter content.

## What to do here

This template is a substrate, not a starting design. The natural first steps are:

1. Decide whether the built-in posts/pages schema fits. Define changes in the admin under Schema, or add `seed/seed.json` when the project needs a reproducible custom schema.
2. Add the pages that render that content (e.g. `src/pages/posts/index.astro`).
3. Add a layout in `src/layouts/` for shared chrome.
4. Add styles -- this template has no `theme.css` and no fonts configured.

If any of that sounds like work you don't want to do, start from `starter`, `blog`, `portfolio`, or `marketing` instead. They make these decisions for you.

## What not to do

- Don't expect this template to render a designed site out of the box. It won't.
- Don't add features here that should live in the EmDash core or in a plugin. This template is meant to stay small.

## Hosting on Kubengine

This site starts empty: no schema, no demo content, one page. The project's agent designs the content model and pages.
It is EmDash's standard install, with two additions in `astro.config.mjs`:

- Media go to the environment's R2 bucket when the platform sets `EMDASH_MEDIA_STORAGE=s3` (at build and at run);
  `s3()` then reads its `S3_*` variables. Keep `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner` installed.
- Behind the platform's proxy, the public origin comes from `EMDASH_SITE_URL` (`scripts/public-origin.mjs`).

The platform runs the server with its working directory on the environment's data disk: `data.db`, `uploads/` and the
sessions land there and are backed up. Keep the paths the site writes relative. The deployed code is read-only.

Upgrade EmDash with `npx upgrade-emdash@latest`, which also refreshes `.agents/skills`, then follow `.emdash/UPGRADE.md`.
