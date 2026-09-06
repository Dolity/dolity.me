/**
 * The only module that talks to gtag.
 *
 * Clicks are declarative: put `data-ga-event="name"` and optional
 * `data-ga-params='{"…"}'` on any element and the delegated listener fires it.
 * `gaEvent()` exists for the handful of events whose parameter is only known at
 * runtime (the chosen theme, the typed query, the section scrolled into view) —
 * nothing else should call it, and nothing at all should call `gtag` directly.
 *
 * The event schema is GA4's recommended vocabulary: one `select_content` for
 * every tracked link, distinguished by `content_type` / `content_id` /
 * `link_location`, rather than one event name per link.
 */
import { navSectionFromPathname } from '../i18n/path-utils';

export type GaEventParams = Record<string, string | number | boolean | undefined>;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export function gaEvent(name: string, params: GaEventParams = {}): void {
	window.gtag?.('event', name, params);
}

/** Consent Mode v2. Only analytics storage is ever granted — the site has no ads. */
export function setAnalyticsConsent(choice: 'granted' | 'denied'): void {
	window.gtag?.('consent', 'update', { analytics_storage: choice });
}

function parseParams(raw: string | null): GaEventParams {
	if (!raw) return {};
	try {
		const o = JSON.parse(raw) as Record<string, unknown>;
		const out: GaEventParams = {};
		for (const [k, v] of Object.entries(o)) {
			if (v === undefined || v === null) continue;
			if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
				out[k] = v;
			}
		}
		return out;
	} catch {
		return {};
	}
}

function onDocumentClick(ev: MouseEvent): void {
	const el = ev.target;
	if (!(el instanceof Element)) return;
	const clickable = el.closest<HTMLElement>('[data-ga-event]');
	if (!clickable) return;
	const name = clickable.getAttribute('data-ga-event');
	if (!name) return;
	gaEvent(name, parseParams(clickable.getAttribute('data-ga-params')));
}

/**
 * Persistent parameters. `gtag('set')` applies these to every later event, so
 * no call site has to thread the locale or the current section through.
 * `content_group` is a built-in GA4 dimension — it needs no registering.
 */
function sendPageView(): void {
	window.gtag?.('set', {
		page_locale: document.documentElement.lang,
		content_group: navSectionFromPathname(location.pathname) ?? 'other',
	});
	gaEvent('page_view', {
		page_location: location.href,
		page_title: document.title,
		page_referrer: document.referrer || undefined,
	});
}

let sectionObserver: IntersectionObserver | null = null;

function observeSections(): void {
	sectionObserver?.disconnect();
	const sections = document.querySelectorAll<HTMLElement>('[data-ga-section]');
	if (sections.length === 0) {
		sectionObserver = null;
		return;
	}
	sectionObserver = new IntersectionObserver(
		(entries, obs) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				// Once per page load: reaching a section twice is the same fact.
				obs.unobserve(entry.target);
				gaEvent('section_view', { section: (entry.target as HTMLElement).dataset.gaSection });
			}
		},
		// A section counts as read once it clears the bottom quarter of the
		// viewport, not the instant one pixel of it appears.
		{ rootMargin: '0px 0px -25% 0px' },
	);
	for (const section of sections) sectionObserver.observe(section);
}

let installed = false;

/**
 * One entry point, called once. Every listener is delegated from `document` or
 * re-bound on `astro:page-load`, so none of this needs re-initialising after a
 * view transition swaps the page out.
 */
export function initAnalytics(): void {
	if (installed) return;
	installed = true;
	document.addEventListener('click', onDocumentClick, true);
	// `astro:page-load` fires on the initial load too, so this one path covers
	// both a cold load and every client-side navigation. The gtag config sets
	// `send_page_view: false` precisely so this is the only source of page_view.
	document.addEventListener('astro:page-load', () => {
		sendPageView();
		observeSections();
	});
}
