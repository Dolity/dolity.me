export type GaEventParams = Record<string, string | number | boolean | undefined>;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

let installed = false;

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
	const gtag = window.gtag;
	if (typeof gtag !== 'function') return;
	const params = parseParams(clickable.getAttribute('data-ga-params'));
	gtag('event', name, params);
}

export function initGaDelegatedClicks(): void {
	if (installed) return;
	installed = true;
	document.addEventListener('click', onDocumentClick, true);
}
