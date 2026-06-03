/** Top-level site sections matched to main nav (including nested e.g. products/*). */
export type NavSection = 'home' | 'about' | 'resume' | 'products' | 'support';

const LOCALE_PATH = /^\/(th|en)(?:\/(.*))?$/;

/** Strip trailing slash and optional `.html` (build.format: 'file' / static assets). */
export function normalizePathname(pathname: string): string {
	return pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/';
}

/**
 * Map a path segment from {@link segmentFromPathname} to the active nav section.
 * Returns null when the route is not one of the main nav targets.
 */
export function navSectionFromSegment(segment: string): NavSection | null {
	if (!segment) return 'home';
	const root = segment.split('/')[0]?.replace(/\.html$/, '') ?? '';
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
	const normalized = normalizePathname(pathname);
	const match = normalized.match(LOCALE_PATH);
	if (!match) return '';
	return match[2] ?? '';
}

export function navSectionFromPathname(pathname: string): NavSection | null {
	return navSectionFromSegment(segmentFromPathname(pathname));
}
