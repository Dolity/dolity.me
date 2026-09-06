/**
 * Pure path helpers — no `astro:i18n` import, so this module is safe to pull
 * into a client `<script>` (SiteHeader does exactly that to re-sync the active
 * nav item after a view transition).
 */

import type { UiKey } from './strings';

export type Locale = 'th' | 'en';

/**
 * The single source of truth for site sections.
 *
 * The header shows only `inHeader` entries — seven links in a row is a menu,
 * not a header. Everything else is reachable from the footer and ⌘K, which is
 * what the palette is for.
 *
 * Adding a page means adding one entry here: the nav, the footer, the palette,
 * and the active-state matching all read from this array.
 */
export const NAV_SECTIONS = [
	{ id: 'home', segment: '', labelKey: 'nav.home', inHeader: true, indexable: true },
	{ id: 'about', segment: 'about', labelKey: 'nav.about', inHeader: true, indexable: true },
	{ id: 'resume', segment: 'resume', labelKey: 'nav.resume', inHeader: true, indexable: true },
	{ id: 'products', segment: 'products', labelKey: 'nav.products', inHeader: true, indexable: true },
	{ id: 'uses', segment: 'uses', labelKey: 'nav.uses', inHeader: false, indexable: false },
	{ id: 'now', segment: 'now', labelKey: 'nav.now', inHeader: false, indexable: false },
	{ id: 'support', segment: 'support', labelKey: 'nav.support', inHeader: false, indexable: false },
] as const satisfies readonly {
	id: string;
	segment: string;
	labelKey: UiKey;
	inHeader: boolean;
	indexable: boolean;
}[];

export type NavSection = (typeof NAV_SECTIONS)[number]['id'];

export const HEADER_SECTIONS = NAV_SECTIONS.filter((s) => s.inHeader);

/**
 * The only pages search engines may list. Read by `SeoHead` (which emits the
 * robots meta) and by the sitemap filter in `astro.config.mjs` — one source, so
 * the sitemap can never invite a crawl the page itself refuses.
 */
const INDEXABLE_SEGMENTS: ReadonlySet<string> = new Set(
	NAV_SECTIONS.filter((s) => s.indexable).map((s) => s.segment)
);

/** Locale-free segment ('', 'about', 'products/billing') — may it be indexed? */
export function isIndexableSegment(segment: string): boolean {
	return INDEXABLE_SEGMENTS.has(segment);
}

const LOCALE_PATH = /^\/(th|en)(?:\/(.*))?$/;

/** Strip trailing slash and optional `.html` (build.format: 'file'). */
function normalizePathname(pathname: string): string {
	return pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/';
}

/** Locale-free path: "" for home, "about", "products/billing", … */
export function segmentFromPathname(pathname: string): string {
	const match = normalizePathname(pathname).match(LOCALE_PATH);
	if (!match) return '';
	return match[2] ?? '';
}

/**
 * Which nav section a path belongs to. Nested routes count as their parent, so
 * `/th/products/billing` still highlights "products".
 */
export function navSectionFromPathname(pathname: string): NavSection | null {
	const segment = segmentFromPathname(pathname);
	if (!segment) return 'home';
	const root = segment.split('/')[0]?.replace(/\.html$/, '') ?? '';
	return NAV_SECTIONS.find((s) => s.segment === root)?.id ?? null;
}
