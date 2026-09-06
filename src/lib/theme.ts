/**
 * Theme resolution, shared by the pre-paint inline script and the runtime.
 *
 * The stored value used to be a DaisyUI theme name; map the old values so a
 * returning visitor who explicitly chose light does not silently flip to dark.
 */
export type Theme = 'light' | 'dark';

export const THEME_LEGACY: Record<string, Theme> = { pastel: 'light', forest: 'dark' };

export function resolveTheme(stored: string | null): Theme {
	if (stored === 'light' || stored === 'dark') return stored;
	const migrated = stored ? THEME_LEGACY[stored] : undefined;
	if (migrated) return migrated;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function readStoredTheme(key: string): string | null {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}

export function writeStoredTheme(key: string, theme: Theme) {
	try {
		localStorage.setItem(key, theme);
	} catch {
		/* private mode, blocked storage — the page still works, it just forgets */
	}
}
