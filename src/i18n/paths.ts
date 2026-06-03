import { getRelativeLocaleUrl } from 'astro:i18n';

export * from './path-utils';

export function hrefForLocale(locale: 'th' | 'en', segment: string): string {
	return getRelativeLocaleUrl(locale, segment || undefined);
}

export function otherLocale(current: string): 'th' | 'en' {
	return current === 'en' ? 'th' : 'en';
}
