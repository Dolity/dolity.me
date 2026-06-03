// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = 'https://dolity.me';

export default defineConfig({
	site,
	trailingSlash: 'never',
  build: {
    format: 'file'
  },
	adapter: cloudflare(),
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'th',
				locales: {
					th: 'th-TH',
					en: 'en-US',
				},
			},
			filter: (page) => page !== `${site}/` && page !== site,
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
	redirects: {
		'/about': '/th/about',
		'/resume': '/th/resume',
		'/support': '/th/support',
		'/products': '/th/products',
		'/products/billing': '/th/products/billing',
		'/products/url-shortener': '/th/products/url-shortener',
	},
});
