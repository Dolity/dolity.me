import { getRelativeLocaleUrl } from 'astro:i18n';

/** Top-level site sections matched to main nav (including nested e.g. products/*). */
export type NavSection = 'home' | 'about' | 'resume' | 'products' | 'support';

/**
 * Map a path segment from {@link segmentFromPathname} to the active nav section.
 * Returns null when the route is not one of the main nav targets.
 */
export function navSectionFromSegment(segment: string): NavSection | null {
	if (!segment) return 'home';
	const root = segment.split('/')[0] ?? '';
	if (root === 'about') return 'about';
	if (root === 'resume') return 'resume';
	if (root === 'products') return 'products';
	if (root === 'support') return 'support';
	return null;
}

/**
 * Neutral path: "" for home, "about", "resume", "support", "products", …
 */
export function segmentFromPathname(pathname: string): string {
	const normalized = pathname.replace(/\/$/, '') || '/';
	if (normalized === '/th' || normalized === '/en') return '';
	if (normalized.startsWith('/th/')) return normalized.slice(4);
	if (normalized.startsWith('/en/')) return normalized.slice(4);
	return '';
}

export function hrefForLocale(locale: 'th' | 'en', segment: string): string {
	return getRelativeLocaleUrl(locale, segment || undefined);
}

export function otherLocale(current: string): 'th' | 'en' {
	return current === 'en' ? 'th' : 'en';
}
