/**
 * ⌘K palette behaviour.
 *
 * Everything is delegated from `document` and re-queries the dialog at call
 * time, so this is initialised once and keeps working after a view transition
 * swaps the element out — no `astro:page-load` re-binding needed.
 */

import { gaEvent } from './analytics';

const DIALOG_ID = 'dolity-palette';

function dialog(): HTMLDialogElement | null {
	return document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
}

function visibleItems(el: HTMLDialogElement): HTMLAnchorElement[] {
	return [...el.querySelectorAll<HTMLElement>('[data-palette-item]')]
		.filter((li) => !li.hidden)
		.map((li) => li.querySelector('a'))
		.filter((a): a is HTMLAnchorElement => a !== null);
}

function highlight(el: HTMLDialogElement, next: HTMLAnchorElement | undefined) {
	if (!next) return;
	for (const a of visibleItems(el)) a.removeAttribute('aria-current');
	next.setAttribute('aria-current', 'true');
	next.scrollIntoView({ block: 'nearest' });
}

function filter(el: HTMLDialogElement, query: string) {
	const q = query.trim().toLowerCase();
	let shown = 0;

	for (const li of el.querySelectorAll<HTMLElement>('[data-palette-item]')) {
		const haystack = `${li.dataset.label ?? ''} ${li.dataset.hint ?? ''}`;
		const match = q === '' || haystack.includes(q);
		li.hidden = !match;
		if (match) shown += 1;
	}

	el.querySelector<HTMLElement>('#dolity-palette-empty')?.classList.toggle('hidden', shown > 0);
	highlight(el, visibleItems(el)[0]);
}

function open() {
	const el = dialog();
	if (!el || el.open) return;
	el.showModal();
	const input = el.querySelector<HTMLInputElement>('#dolity-palette-input');
	if (input) {
		input.value = '';
		filter(el, '');
		input.focus();
	}
}

export function closeCommandPalette() {
	const el = dialog();
	if (el?.open) el.close();
}

export function initCommandPalette() {
	document.addEventListener('keydown', (ev) => {
		if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
			ev.preventDefault();
			open();
			return;
		}

		const el = dialog();
		if (!el?.open) return;

		if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
			ev.preventDefault();
			const items = visibleItems(el);
			if (items.length === 0) return;
			const current = items.findIndex((a) => a.getAttribute('aria-current') === 'true');
			const step = ev.key === 'ArrowDown' ? 1 : -1;
			// Wrap around: from the last item, down goes back to the first.
			const nextIndex = (current + step + items.length) % items.length;
			highlight(el, items[nextIndex]);
		}

		if (ev.key === 'Enter') {
			const active = el.querySelector<HTMLAnchorElement>('a[aria-current="true"]');
			if (active) {
				ev.preventDefault();
				el.close();
				active.click();
			}
		}
	});

	document.addEventListener('click', (ev) => {
		const target = ev.target;
		if (target instanceof Element && target.closest('[data-palette-open]')) {
			ev.preventDefault();
			open();
		}
	});

	document.addEventListener('input', (ev) => {
		const target = ev.target;
		if (target instanceof HTMLInputElement && target.id === 'dolity-palette-input') {
			const el = dialog();
			if (el) filter(el, target.value);
		}
	});

	// `close` does not bubble, so catch it on the way down. One `search` per
	// visit to the palette — what they were looking for, not every keystroke.
	document.addEventListener(
		'close',
		(ev) => {
			if (!(ev.target instanceof HTMLDialogElement) || ev.target.id !== DIALOG_ID) return;
			const query = ev.target.querySelector<HTMLInputElement>('#dolity-palette-input')?.value.trim();
			if (query) gaEvent('search', { search_term: query });
		},
		true,
	);

	// An open dialog lives in the browser's top layer, which the view-transition
	// snapshot does not capture. Navigating with it open leaves an artifact.
	document.addEventListener('astro:before-preparation', closeCommandPalette);
}
