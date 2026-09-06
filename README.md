# dolity.me

Dolity’s main marketing and portfolio site: a bilingual hub for the resume, product overviews, and links to live apps on subdomains (for example, URL shortening and billing tools). It is built as a fast, mostly static Astro experience, localized for Thai and English.

## What this project is

- A **public-facing site** at [dolity.me](https://dolity.me) that introduces Dolity, lists products with tech summaries, and routes visitors to dedicated apps where those products actually run.
- A **content surface** for the resume (`/th/resume`, `/en/resume`), about, the product catalog and per-product detail pages, `/uses`, `/now`, and a support page.
- An **i18n site**: Thai is the default locale, but both locales are prefixed — every content route lives under `/th/…` or `/en/…`, and `/` plus the bare top-level paths redirect into `/th/…`.

## What it is used for

- Presenting **Dolity** and **linked products** (catalog-style pages with outbound links).
- Hosting **Markdown-backed resume** content and structured sections in one place, with print styles so the page prints as a usable PDF.
- Offering a **single support entry point** (e.g. donations, contact flows).
- **SEO and sharing**: sitemap generation, `hreflang` alternates, and metadata aligned with the production domain.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Astro](https://astro.build) 6.x (islands / static-first) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4.x (CSS-first, own design tokens — no component library) |
| i18n | Astro built-in i18n (`th` default, both locales prefixed) |
| Fonts | [IBM Plex Sans Thai](https://fontsource.org/fonts/ibm-plex-sans-thai) + [IBM Plex Mono](https://fontsource.org/fonts/ibm-plex-mono) (Fontsource) |
| Icons | [Simple Icons](https://simpleicons.org) — inlined at build time, no client JS |
| Analytics | Google Analytics 4 (gtag) with Consent Mode v2 |
| Deploy / runtime | [Cloudflare](https://developers.cloudflare.com/) via [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) |
| Tooling | [Bun](https://bun.sh) (package manager & scripts), [TypeScript](https://www.typescriptlang.org/), [Wrangler](https://developers.cloudflare.com/workers/wrangler/) |
| Quality | [`astro check`](https://docs.astro.build/en/guides/typescript/) (@astrojs/check) |
| SEO | [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) |

## Requirements

- **Node.js** `>=22.12.0` (see `package.json` `engines`)
- **Bun** `1.3.9` (see `packageManager`)

## Commands

Run from the project root:

| Command | Description |
| --- | --- |
| `bun install` | Install dependencies |
| `bun dev` | Dev server (default [localhost:4321](http://localhost:4321)) |
| `bun run build` | Production build to `./dist/` |
| `bun run preview` | Build then preview locally |
| `bun run check` | Typecheck and diagnostics (`astro check`) |
| `bun run deploy` | Build and deploy with Wrangler |
| `bun run cf-typegen` | Generate Cloudflare types (`wrangler types`) |

`bun run check` is the only verification gate — there is no test suite or linter.

## Routes

| Path | Notes |
| --- | --- |
| `/` | Worker-rendered 301 to `/th` |
| `/{th,en}` | Home |
| `/{th,en}/about` | About |
| `/{th,en}/resume` | Resume — Markdown-backed, print-ready |
| `/{th,en}/products` | Product catalog |
| `/{th,en}/products/[slug]` | Per-product detail, generated from the catalog |
| `/{th,en}/uses` · `/now` · `/support` | Context and support pages (not indexed) |
| `404` | Worker-rendered, so Cloudflare's fallback always finds it |

Bare paths (`/about`, `/resume`, `/products/billing`, …) are static redirects into `/th/…`, declared in `astro.config.mjs`.

## Project layout (high level)

```text
src/
  components/ui/  # Panel, Prompt, Row, Button, NextSteps, CommandPalette
  components/     # layout + one folder per page section
  pages/th|en/    # Route shells; both locales, same shape
  pages/          # index.astro (redirect) + 404.astro — the only worker routes
  content/        # experience, education, certifications, now (locale in path)
  content.config.ts # Collection schemas
  i18n/           # strings.ts (all copy), NAV_SECTIONS, path helpers
  data/           # products catalog, resume tech stack, tech icons, workbench
  constants/      # asset paths, profile URLs, theme + consent storage keys
  lib/            # client-side: GA delegation, command palette, theme
  styles/         # global.css — design tokens, terminal vernacular, print
public/           # Static assets (favicons, logos, robots.txt, manifest)
```

See `CLAUDE.md` for the architectural rules behind this layout.

## License / ownership

Private or team-specific terms apply; see repository settings for the authoritative license.
