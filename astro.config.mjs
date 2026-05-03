// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = 'https://dolity.me';

export default defineConfig({
	site,
	adapter: cloudflare(),
	integrations: [sitemap()],
  output: 'server',
	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		defaultLocale: 'th',
		locales: ['th', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
