export const CONSENT_STORAGE_KEY = 'dolity-consent';

/**
 * Where analytics storage defaults to denied until the visitor says yes: the
 * EEA, plus the UK and Switzerland, plus Thailand (PDPA). Everywhere else
 * defaults to granted, so the banner is a courtesy rather than a gate. Google's
 * tag resolves the visitor's region itself — nothing here needs a worker.
 */
export const CONSENT_DENY_REGIONS = [
	'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
	'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO',
	'SE', 'SI', 'SK', 'ES', 'GB', 'CH', 'TH',
];
