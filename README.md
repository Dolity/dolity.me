# dolity.me

Dolity’s main marketing and portfolio site: a bilingual hub for resumes, product overviews, and links to live apps on subdomains (for example, URL shortening and billing tools). It is built as a fast, mostly static Astro experience, localized for Thai and English.

## What this project is

- A **public-facing site** at [dolity.me](https://dolity.me) that introduces Dolity, lists products with tech summaries, and routes visitors to dedicated apps where those products actually run.
- A **content surface** for the resume (`/resume`, `/en/resume`), about page, product detail pages, and a support / donation page.
- An **i18n site**: Thai is the default locale at the root path; English lives under `/en/…`.

## What it is used for

- Presenting **Dolity** and **linked products** (catalog-style pages with outbound links).
- Hosting **Markdown-backed resume** content and structured sections in one place.
- Offering a **single support entry point** (e.g. donations, contact flows).
- **SEO and sharing**: sitemap generation and metadata aligned with the production domain.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Astro](https://astro.build) 6.x (islands / static-first) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4.x + [@tailwindcss/vite](https://tailwindcss.com/docs/installation) |
| UI | [DaisyUI](https://daisyui.com) 5.x |
| i18n | Astro built-in i18n (`th` default, `en` prefixed) |
| Fonts | [IBM Plex Sans Thai](https://fontsource.org/fonts/ibm-plex-sans-thai) (Fontsource) |
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
| `bun build` | Production build to `./dist/` |
| `bun preview` | Build then preview locally |
| `bun run check` | Typecheck and diagnostics (`astro check`) |
| `bun run deploy` | Build and deploy with Wrangler |
| `bun run generate-types` / `bun run cf-typegen` | Generate Cloudflare types (`wrangler types`) |

## Project layout (high level)

```text
src/
  components/     # UI (layout, home, products, resume, …)
  pages/          # Routes (Thai at root, English under en/)
  content/        # Markdown etc. (resume / collections as configured)
  i18n/           # Strings and path helpers
  data/           # Product catalog and similar data
  styles/         # global.css (Tailwind + DaisyUI)
public/           # Static assets (favicons, logos, manifest)
```

## License / ownership

Private or team-specific terms apply; see repository settings for the authoritative license.
