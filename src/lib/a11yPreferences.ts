export type FontScale = 100 | 115 | 130;

export interface A11yPreferences {
	fontScale: FontScale;
	highContrast: boolean;
	reduceMotion: boolean;
	underlineLinks: boolean;
	readableSpacing: boolean;
}

export const DEFAULT_A11Y_PREFERENCES: A11yPreferences = {
	fontScale: 100,
	highContrast: false,
	reduceMotion: false,
	underlineLinks: false,
	readableSpacing: false,
};

const STORAGE_KEY = 'portfolio-a11y-preferences';

const FONT_SCALES: FontScale[] = [100, 115, 130];

function isFontScale(value: unknown): value is FontScale {
	return typeof value === 'number' && FONT_SCALES.includes(value as FontScale);
}

export function readA11yPreferences(): A11yPreferences {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { ...DEFAULT_A11Y_PREFERENCES };
		const parsed = JSON.parse(raw) as Partial<A11yPreferences>;
		if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_A11Y_PREFERENCES };
		return {
			fontScale: isFontScale(parsed.fontScale) ? parsed.fontScale : DEFAULT_A11Y_PREFERENCES.fontScale,
			highContrast: Boolean(parsed.highContrast),
			reduceMotion: Boolean(parsed.reduceMotion),
			underlineLinks: Boolean(parsed.underlineLinks),
			readableSpacing: Boolean(parsed.readableSpacing),
		};
	} catch {
		return { ...DEFAULT_A11Y_PREFERENCES };
	}
}

export function writeA11yPreferences(prefs: A11yPreferences) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
	} catch {
		// Ignore quota / private-mode failures
	}
}

/** Apply preference side-effects on the document root for CSS hooks. */
export function applyA11yToDocument(prefs: A11yPreferences) {
	const root = document.documentElement;
	root.style.setProperty('--a11y-font-scale', String(prefs.fontScale / 100));
	root.dataset.a11yContrast = prefs.highContrast ? 'high' : 'default';
	root.dataset.a11yMotion = prefs.reduceMotion ? 'reduce' : 'default';
	root.dataset.a11yUnderline = prefs.underlineLinks ? 'on' : 'off';
	root.dataset.a11ySpacing = prefs.readableSpacing ? 'on' : 'off';
}

export function nextFontScale(current: FontScale): FontScale {
	const index = FONT_SCALES.indexOf(current);
	return FONT_SCALES[Math.min(index + 1, FONT_SCALES.length - 1)]!;
}

export function prevFontScale(current: FontScale): FontScale {
	const index = FONT_SCALES.indexOf(current);
	return FONT_SCALES[Math.max(index - 1, 0)]!;
}

export function hasActiveA11yOverrides(prefs: A11yPreferences): boolean {
	return (
		prefs.fontScale !== DEFAULT_A11Y_PREFERENCES.fontScale ||
		prefs.highContrast ||
		prefs.reduceMotion ||
		prefs.underlineLinks ||
		prefs.readableSpacing
	);
}
