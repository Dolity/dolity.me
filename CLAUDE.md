# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this site is

A personal portfolio / "this is me" site for Dolity (dolity.me). Four purposes:

1. **Identity** — home + about pages presenting who the author is.
2. **Resume** (`/th/resume`, `/en/resume`) — a shareable resume URL to hand out when applying for jobs, backed by Markdown so it can be edited without touching components. Print styles make it a usable PDF.
3. **Showcase** (`/th/products`, `/en/products` + per-product detail pages) — apps and sites the author built, each linking out to the live product on a subdomain (e.g. `shorturl.dolity.me`, `bill.dolity.me`).
4. **Context** (`/uses`, `/now`) — the working setup, and what the author is focused on lately.

Marketing/portfolio content only — no user accounts, no forms, no backend data. Everything is prerendered except the root redirect and the 404.

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

**Astro 6 + Tailwind 4 (own design tokens, no component library), `output: 'server'` on the Cloudflare adapter.** Despite `output: 'server'`, every real page sets `export const prerender = true`. Only two routes run on the worker: `src/pages/index.astro`, which 301-redirects `/` → `/th`, and `src/pages/404.astro`, which is `prerender = false` so Cloudflare's worker fallback serves it without depending on the `not_found_handling` asset setting. Keep new pages prerendered unless they genuinely need request-time data.

`build.format: 'file'` + `trailingSlash: 'never'` means routes emit as `about.html`, not `about/index.html` — which is why path helpers strip both `.html` and trailing slashes.

The adapter is configured `cloudflare({ imageService: 'compile' })` on purpose: the v13 default (`'cloudflare-binding'`) provisions an IMAGES binding and bundles a transform endpoint, and this site transforms nothing — every image is a public path passing straight through.

### i18n is the central constraint

Thai is the default locale but `prefixDefaultLocale: true`, so **there is no unprefixed content route** — everything lives under `/th/…` or `/en/…`. Unprefixed paths are covered by static `redirects` in `astro.config.mjs`; adding a new top-level page means adding its redirect entry there too.

Routes are **duplicated per locale by hand**: `src/pages/th/resume.astro` and `src/pages/en/resume.astro` are the same file with `const loc = 'th' | 'en'`. The page file is a thin shell — it computes title/description from `t()` and renders a shared component from `src/components/<section>/`. Add a page in both locales or not at all.

The one exception is product detail: `pages/{th,en}/products/[slug].astro` builds its `getStaticPaths()` from the catalog, so **adding a product needs no new page file** — one catalog entry plus one `astro.config.mjs` redirect line.

Two ways components learn the locale, both in use:
- Layout/section components call `toLocale(Astro.currentLocale)` from `src/i18n/`.
- Leaf/presentational components take `loc` as a prop (see `ProductsPage` → `ProductCard`, `[slug].astro` → `ProductDetail`).

`NAV_SECTIONS` in `path-utils.ts` is the single source for site sections — the header (`inHeader` entries only), the footer, the ⌘K palette, `NextSteps`, active-nav matching, and **indexability** all derive from it. Adding a page means one entry there plus the two page shells and an `astro.config.mjs` redirect.

The `indexable` flag on each section feeds two consumers that must never disagree: `isIndexableSegment()` decides the `robots` meta tag in `SeoHead`, and the same function filters the sitemap in `astro.config.mjs`. That is why the sitemap can never invite a crawl of a page that refuses it. `/uses`, `/now` and `/support` are deliberately `indexable: false`; `BaseLayout`'s `noindex` prop is only an override for routes with no `seoPath` of their own (the 404).

`src/i18n/`:
- `strings.ts` — `th` is declared `as const` and defines `UiKey`; `en` is typed `Record<keyof typeof th, string>`, so a missing or renamed English string is a **build failure**, not a silent fallback. Add every key to `th` first. Keys under `cmd.*` are shell commands rendered in mono and are deliberately identical in both locales.
- `paths.ts` — `hrefForLocale(loc, segment)` wraps `getRelativeLocaleUrl`; components alias it as `const h = (s) => hrefForLocale(loc, s)` and pass locale-free segments (`''`, `'about'`, `'products/billing'`). Never hardcode `/th/...` in a link.
- `path-utils.ts` — pure, no `astro:i18n` import, so it can be imported from client `<script>` blocks (`SiteHeader` and `analytics.ts` both do this).

### Content vs. data

Two content sources, deliberately split:

- **`src/content/`** (Astro content collections, schemas in `src/content.config.ts`): `experience`, `education`, `certifications`, `now`. Locale is encoded in the file path, so entry ids look like `th/woxa`, and queries filter with `id.startsWith(loc + "/")`. Ordering comes from the `order` frontmatter field, sorted in the consuming component (`ResumeBody.astro`). Adding an item = add the `.md` in **both** `th/` and `en/`.
- **`src/data/`** (plain TS) holds bilingual strings inline as `Record<Locale, …>` because they're structured (logos, URLs, Simple Icons slugs) rather than prose:
  - `products-catalog.ts` — the single source for `/products`, the per-product detail routes, the ⌘K palette's product list, and the resume's projects section. Edit it once. `id` and `slug` are stable identifiers (anchor targets and URLs) — do not rename them.
  - `resume-tech-stack.ts` — the resume's expertise sections.
  - `tech-icons.ts` — named `simple-icons` imports so Rollup tree-shakes the rest; `TechBadge.astro` inlines the SVG path (no CDN, no client JS). `TechIconSlug` is derived from this map, so a mistyped badge slug is a build failure. New icon = one import + one line.
  - `workbench.ts` — the `/uses` page. Languages and frameworks are *not* repeated here; they come from `resume-tech-stack.ts`.

`src/constants/` holds public asset paths (`site-assets.ts`), profile/contact URLs (`social.ts`), the theme storage key (`theme.ts`), and the consent key + deny-by-default regions (`consent.ts`); import from there instead of writing string literals.

### Layout & client behavior

`BaseLayout.astro` is the only layout: `SeoHead` + `ClientRouter` (view transitions) + `SiteHeader` / `SiteFooter` around a `SiteContainer`, with `CommandPalette` and `ConsentBanner` at the end of the body. It also carries all global client JS:

- **Theme** — `light` / `dark` on `<html data-theme>`, persisted in `localStorage` under `THEME_STORAGE_KEY` (legacy DaisyUI values `pastel`/`forest` are mapped on read, in `src/lib/theme.ts`, which both the inline pre-paint script and the runtime share). The swap copies `<html>` attributes from the incoming document, so the repair runs on **`astro:before-swap`** against `event.newDocument` — doing it on `astro:page-load` is too late and flashes. Any DOM state that must survive a view transition needs the same before-swap treatment.
- **`<html data-kbd>`** — the second thing set before paint and carried across `astro:before-swap`: `mac` / `touch` / `ctrl` decides whether the header hints `⌘K` or `Ctrl K`. The platform can't change mid-session, so the value is copied forward rather than re-sniffed. Which hint is visible is decided only in `SiteHeader`'s `<style>`.
- **Active nav** — a `data-active` attribute; the styling lives only in `SiteHeader`'s `<style>`. The client script toggles the attribute and never writes class names. Do not `transition:persist` the header: it would carry the previous page's language and active state across a locale switch.
- **⌘K palette** — a native `<dialog>` in `ui/CommandPalette.astro`, driven by `src/lib/command-palette.ts`. All listeners are delegated from `document` and re-query the dialog, so it survives swaps with no re-init. `ConsentBanner` is written the same way.
- **Consent** — Consent Mode v2. Ad signals are denied permanently (no ads have ever run here); `analytics_storage` defaults to denied only in `CONSENT_DENY_REGIONS` (EEA + UK/CH + TH), granted elsewhere, so the banner is a courtesy rather than a gate. Google's tag resolves the region itself — no worker involved. A stored answer is replayed before the first hit; `ConsentBanner.astro` renders `hidden` and reveals itself on `astro:page-load` only when nothing is stored.
- **Analytics** — gtag loaded `is:inline` (deliberately unbundled), with the Consent Mode defaults queued *before* `config`. `src/lib/analytics.ts` is the only module allowed to touch `gtag`. Click tracking is fully delegated: add `data-ga-event="name"` and `data-ga-params='{"…"}'` to any element — `Button.astro` and `Row.astro` take `gaEvent` / `gaParams` props for the same thing. Scroll depth is delegated too: `data-ga-section="name"` fires one `section_view` per page load via an IntersectionObserver. Events whose parameter is only known at runtime go through the exported `gaEvent()`; nothing writes a `gtag` call of its own.
  The schema is GA4's recommended vocabulary — **one event name, rich parameters**, not a name per link. `select_content` (`content_type` / `content_id` / `link_location`) covers every tracked link; `generate_lead` covers `mailto:`; the rest are `page_view`, `search`, `resume_print`, `section_view`, `language_switch`, `theme_change`. `page_view` is sent manually from `astro:page-load` (`config` sets `send_page_view: false`) because the inline head script never re-runs after a view transition; `gtag('set')` there attaches `page_locale` and `content_group` to every later event. Adding a tracked link means picking a `content_type`/`link_location`, not inventing an event name; a new parameter needs registering as a custom dimension in GA4 Admin before it shows in reports.
  The measurement ID comes from `import.meta.env.GA_MEASUREMENT_ID` with a hardcoded fallback, and `debug_mode` is on in dev so the schema can be checked in GA4 DebugView.

`SeoHead` derives canonical + `hreflang` alternates (including `x-default`, always the Thai URL) from a locale-free `seoPath` prop matching the page's segment; pass it whenever you add a page or the canonical URL will be wrong. The `<title>` is assembled there as `"<title> | Dolity (EN)"` — one shape for every page, with the locale tag included because several page names are identical across locales and GA4's `page_title` would otherwise merge them. Share cards keep the bare title. `twitter:card` is `summary`, not `summary_large_image`, because the share images are square and portrait — a large card would crop both. The Person JSON-LD describes the human, not the brand.

### Styling

Tailwind 4 CSS-first: `src/styles/global.css` holds the palette (custom properties on `:root`, redefined under `prefers-color-scheme` and `[data-theme='dark']`), `@theme inline` mapping them to Tailwind, the `container` and `prose-measure` utilities, the terminal vernacular classes (`.prompt-line`, `.caret`, `.boot`, the brand lockup), the reduced-motion kill switch, and the print block. No `tailwind.config.js`.

**Do not use `@apply` in a component's scoped `<style>`** — Tailwind 4 requires `@reference` there, which re-parses the whole stylesheet per component. Write plain CSS against the custom properties instead; they are global. (`global.css` itself uses `@apply` freely — it is the stylesheet, not a component.)

Two typefaces, one rule: **mono is the machine's voice** (`$`, `▸`, `↗`, `⌘K`, paths, domains, dates — Latin/symbol only, because IBM Plex Mono has no Thai glyphs), **IBM Plex Sans Thai is the human's voice** (all prose, nav labels, buttons, in both locales).

### Print

The resume is meant to be handed to people, so print is a supported output, driven by three attributes read only by the `@media print` block in `global.css`:

- `data-print="hide"` — chrome that has no business on paper (header, footer, consent banner, `NextSteps`, the resume's action buttons).
- `data-print="keep"` — `break-inside: avoid`, so an entry is not split across a page break.
- `data-print="expand-link"` — appends `(href)` after the text, because paper has no hyperlinks. `Button.astro` sets this automatically for `external` links.

The print block re-declares the palette under both `:root` and `:root[data-theme]` — the plain selector alone loses on specificity to the dark-theme block and printed grey-on-white for every dark-mode reader.

### UI vernacular

`src/components/ui/` holds the five primitives the whole site is built from; reach for these before writing new markup:

- `Panel` — a terminal window (title bar + body). `label` is a path in mono and is never translated.
- `Prompt` — `$ <command>` followed by a heading. The command *is* the section label; do not add an eyebrow above it.
- `Row` — one line of a directory listing. `▸` marks a navigable child, `↗` a link that leaves the site.
- `Button` — the only button. `primary` is the single accented action per view; everything else is `ghost`.
- `NextSteps` — `$ cd ..`. Takes `NavSection` ids and reads labels from `NAV_SECTIONS`, so a renamed page updates itself.

`layout/SiteContainer.astro` is the only width container — use it rather than repeating `container` classes.
