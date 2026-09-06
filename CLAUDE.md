# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this site is

A personal portfolio / "this is me" site for Dolity (dolity.me). Three purposes:

1. **Identity** — home + about pages presenting who the author is.
2. **Resume** (`/th/resume`, `/en/resume`) — a shareable resume URL to hand out when applying for jobs, backed by Markdown so it can be edited without touching components. Print styles make it a usable PDF.
3. **Showcase** (`/th/products`, `/en/products` + per-product detail pages) — apps and sites the author built, each linking out to the live product on a subdomain (e.g. `shorturl.dolity.me`, `bill.dolity.me`).
4. **Context** (`/uses`, `/now`) — the working setup, and what the author is focused on lately.

Marketing/portfolio content only — no user accounts, no forms, no backend data. Everything is prerendered except the root redirect.

## Commands

Bun is the package manager (`packageManager: bun@1.3.9`, Node >= 22.12).

| Command | Purpose |
| --- | --- |
| `bun install` | Install deps |
| `bun dev` | Dev server on :4321 |
| `bun run build` | Build to `./dist/` |
| `bun run preview` | Build + preview |
| `bun run check` | `astro check` — typecheck + diagnostics. **This is the only verification gate; there is no test suite or linter.** |
| `bun run deploy` | Build + `wrangler deploy` to Cloudflare |
| `bun run cf-typegen` | Regenerate `worker-configuration.d.ts` after changing `wrangler.jsonc` bindings |

## Architecture

**Astro 6 + Tailwind 4 (own design tokens, no component library), `output: 'server'` on the Cloudflare adapter.** Despite `output: 'server'`, every real page sets `export const prerender = true`; only `src/pages/index.astro` runs on the worker, where it 301-redirects `/` → `/th`. Keep new pages prerendered unless they genuinely need request-time data.

`build.format: 'file'` + `trailingSlash: 'never'` means routes emit as `about.html`, not `about/index.html` — which is why path helpers strip both `.html` and trailing slashes.

### i18n is the central constraint

Thai is the default locale but `prefixDefaultLocale: true`, so **there is no unprefixed content route** — everything lives under `/th/…` or `/en/…`. Unprefixed paths are covered by static `redirects` in `astro.config.mjs`; adding a new top-level page means adding its redirect entry there too.

Routes are **duplicated per locale by hand**: `src/pages/th/resume.astro` and `src/pages/en/resume.astro` are the same file with `const loc = 'th' | 'en'`. The page file is a thin shell — it computes title/description from `t()` and renders a shared component from `src/components/<section>/`. Add a page in both locales or not at all.

Two ways components learn the locale, both in use:
- Layout/section components call `toLocale(Astro.currentLocale)` from `src/i18n/`.
- Leaf/presentational components take `loc` as a prop (see `ProductsPage` → `ProductCard`).

`NAV_SECTIONS` in `path-utils.ts` is the single source for site sections — the header (`inHeader` entries only), the footer, the ⌘K palette, `NextSteps`, and active-nav matching all derive from it. Adding a page means one entry there plus the two page shells and an `astro.config.mjs` redirect.

`src/i18n/`:
- `strings.ts` — `th` is declared `as const` and defines `UiKey`; `en` is typed `Record<keyof typeof th, string>`, so a missing or renamed English string is a **build failure**, not a silent fallback. Add every key to `th` first. Keys under `cmd.*` are shell commands rendered in mono and are deliberately identical in both locales.
- `paths.ts` — `hrefForLocale(loc, segment)` wraps `getRelativeLocaleUrl`; components alias it as `const h = (s) => hrefForLocale(loc, s)` and pass locale-free segments (`''`, `'about'`, `'products/billing'`). Never hardcode `/th/...` in a link.
- `path-utils.ts` — pure, no `astro:i18n` import, so it can be imported from client `<script>` blocks (`SiteHeader` does this to re-highlight nav after view transitions).

### Content vs. data

Two content sources, deliberately split:

- **`src/content/`** (Astro content collections, schemas in `src/content.config.ts`): `experience`, `education`, `certifications`, `now`. Locale is encoded in the file path, so entry ids look like `th/woxa`, and queries filter with `id.startsWith(loc + "/")`. Ordering comes from the `order` frontmatter field, sorted in the consuming component (`ResumeBody.astro`). Adding an item = add the `.md` in **both** `th/` and `en/`.
- **`src/data/`** (plain TS): `products-catalog.ts` and `resume-tech-stack.ts` hold bilingual strings inline as `Record<Locale, …>` because they're structured (logos, URLs, Simple Icons slugs) rather than prose. The product catalog is the single source for both `/products` and the resume's projects section — edit it once.

`src/constants/` holds public asset paths, profile URLs, and the theme storage key; import from there instead of writing string literals.

### Layout & client behavior

`BaseLayout.astro` is the only layout: `SeoHead` + `ClientRouter` (view transitions) + `SiteHeader` / `SiteFooter` around a `SiteContainer`. It also carries all global client JS:

- **Theme** — `light` / `dark` on `<html data-theme>`, persisted in `localStorage` under `THEME_STORAGE_KEY` (legacy DaisyUI values `pastel`/`forest` are mapped on read). An `is:inline` script applies it before paint. The swap copies `<html>` attributes from the incoming document, so the repair runs on **`astro:before-swap`** against `event.newDocument` — doing it on `astro:page-load` is too late and flashes. Any DOM state that must survive a view transition needs the same before-swap treatment.
- **Active nav** — a `data-active` attribute; the styling lives only in `SiteHeader`'s `<style>`. The client script toggles the attribute and never writes class names. Do not `transition:persist` the header: it would carry the previous page's language and active state across a locale switch.
- **⌘K palette** — a native `<dialog>` in `ui/CommandPalette.astro`, driven by `src/lib/command-palette.ts`. All listeners are delegated from `document` and re-query the dialog, so it survives swaps with no re-init.
- **Analytics** — gtag loaded `is:inline` (deliberately unbundled), with Consent Mode v2 defaults queued *before* `config` (see `src/constants/consent.ts` for the deny-by-default regions). `src/lib/analytics.ts` is the only module allowed to touch `gtag`. Click tracking is fully delegated: add `data-ga-event="name"` and `data-ga-params='{"…"}'` to any element — `Button.astro` and `Row.astro` take `gaEvent` / `gaParams` props for the same thing. Events whose parameter is only known at runtime go through the exported `gaEvent()`; nothing writes a `gtag` call of its own.
  The schema is GA4's recommended vocabulary — **one event name, rich parameters**, not a name per link. `select_content` (`content_type` / `content_id` / `link_location`) covers every tracked link; `generate_lead` covers `mailto:`; the rest are `page_view`, `search`, `resume_print`, `section_view`, `language_switch`, `theme_change`. `page_view` is sent manually from `astro:page-load` (`config` sets `send_page_view: false`) because the inline head script never re-runs after a view transition; `gtag('set')` there attaches `page_locale` and `content_group` to every later event. Adding a tracked link means picking a `content_type`/`link_location`, not inventing an event name; a new parameter needs registering as a custom dimension in GA4 Admin before it shows in reports.

`SeoHead` derives canonical + `hreflang` alternates from a locale-free `seoPath` prop matching the page's segment; pass it whenever you add a page or the canonical URL will be wrong.

Styling is Tailwind 4 CSS-first: `src/styles/global.css` holds the palette (custom properties on `:root`, redefined under `prefers-color-scheme` and `[data-theme='dark']`), `@theme inline` mapping them to Tailwind, the `container` and `prose-measure` utilities, the terminal vernacular classes, the reduced-motion kill switch, and the print block. No `tailwind.config.js`.

**Do not use `@apply` in a component's scoped `<style>`** — Tailwind 4 requires `@reference` there, which re-parses the whole stylesheet per component. Write plain CSS against the custom properties instead; they are global.

Two typefaces, one rule: **mono is the machine's voice** (`$`, `▸`, `↗`, `⌘K`, paths, domains, dates — Latin/symbol only, because IBM Plex Mono has no Thai glyphs), **IBM Plex Sans Thai is the human's voice** (all prose, nav labels, buttons, in both locales).
