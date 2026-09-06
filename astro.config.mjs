// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { isIndexableSegment, segmentFromPathname } from './src/i18n/path-utils.ts';

const site = 'https://dolity.me';

export default defineConfig({
	site,
	trailingSlash: 'never',
  build: {
    format: 'file'
  },
	// Adapter v13 defaults `imageService` to 'cloudflare-binding', which provisions
	// an IMAGES binding and bundles the transform endpoint. This site transforms no
	// images — every <Image> is a public path that passes straight through.
	adapter: cloudflare({ imageService: 'compile' }),
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'th',
				locales: {
					th: 'th',
					en: 'en',
				},
			},
			// Same source of truth as the robots meta tag: NAV_SECTIONS' `indexable`.
			// The two root checks stay — '/' has an empty segment, which *is* indexable,
			// but the URL itself only redirects.
			filter: (page) =>
				page !== `${site}/` &&
				page !== site &&
				isIndexableSegment(segmentFromPathname(new URL(page).pathname)),
		}),
	],
	output: 'server',
	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		defaultLocale: 'th',
		locales: ['th', 'en'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	// prefixDefaultLocale means there is no unprefixed content route, so every
	// top-level path needs an entry here. Adding a page = adding a line.
	redirects: {
		'/about': '/th/about',
		'/resume': '/th/resume',
		'/support': '/th/support',
		'/uses': '/th/uses',
		'/now': '/th/now',
		'/products': '/th/products',
		'/products/billing': '/th/products/billing',
		'/products/url-shortener': '/th/products/url-shortener',
		'/products/phiboon-tour': '/th/products/phiboon-tour',
		'/products/dolity': '/th/products/dolity',
	},
});
