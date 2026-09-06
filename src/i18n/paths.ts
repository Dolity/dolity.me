import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './path-utils';

export * from './path-utils';

/** Build a locale-prefixed href from a locale-free segment ('', 'about', 'products/billing'). */
export function hrefForLocale(locale: Locale, segment: string): string {
	return getRelativeLocaleUrl(locale, segment || undefined);
}

export function otherLocale(current: string): Locale {
	return current === 'en' ? 'th' : 'en';
}

/** Narrow whatever `Astro.currentLocale` gives us to a locale we actually have. */
export function toLocale(value: string | undefined): Locale {
	return value === 'en' ? 'en' : 'th';
}
