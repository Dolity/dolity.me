/**
 * Brand marks for tech badges, inlined at build time.
 *
 * Named imports from `simple-icons` so Rollup tree-shakes everything but the
 * marks below; `TechBadge.astro` inlines the SVG path, so there is no CDN
 * request and no client JS. `TechIconSlug` is derived from this map, which
 * makes a mistyped slug in a catalog a build failure rather than a badge that
 * silently loses its icon.
 *
 * Adding a badge with a new icon = one import + one line here.
 * @see https://simpleicons.org/
 */
import {
	siAstro,
	siBootstrap,
	siBun,
	siCloudflare,
	siDaisyui,
	siDocker,
	siDrizzle,
	siEthereum,
	siExpress,
	siFirebase,
	siFlutter,
	siGit,
	siGooglegemini,
	siGo,
	siKubernetes,
	siLinux,
	siMongodb,
	siMysql,
	siNextdotjs,
	siNodedotjs,
	siNuxt,
	siPinia,
	siPostgresql,
	siRadixui,
	siReact,
	siRedis,
	siSelenium,
	siSocketdotio,
	siSqlite,
	siTailwindcss,
	siTypescript,
	siVuedotjs,
} from 'simple-icons';

/** Slug → the 24×24 SVG path data of its brand mark. */
export const TECH_ICONS = {
	astro: siAstro.path,
	bootstrap: siBootstrap.path,
	bun: siBun.path,
	cloudflare: siCloudflare.path,
	daisyui: siDaisyui.path,
	docker: siDocker.path,
	drizzle: siDrizzle.path,
	ethereum: siEthereum.path,
	express: siExpress.path,
	firebase: siFirebase.path,
	flutter: siFlutter.path,
	git: siGit.path,
	go: siGo.path,
	googlegemini: siGooglegemini.path,
	kubernetes: siKubernetes.path,
	linux: siLinux.path,
	mongodb: siMongodb.path,
	mysql: siMysql.path,
	nextdotjs: siNextdotjs.path,
	nodedotjs: siNodedotjs.path,
	nuxt: siNuxt.path,
	pinia: siPinia.path,
	postgresql: siPostgresql.path,
	radixui: siRadixui.path,
	react: siReact.path,
	redis: siRedis.path,
	selenium: siSelenium.path,
	socketdotio: siSocketdotio.path,
	sqlite: siSqlite.path,
	tailwindcss: siTailwindcss.path,
	typescript: siTypescript.path,
	vuedotjs: siVuedotjs.path,
} as const satisfies Record<string, string>;

export type TechIconSlug = keyof typeof TECH_ICONS;
