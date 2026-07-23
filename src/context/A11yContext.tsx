import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
	applyA11yToDocument,
	DEFAULT_A11Y_PREFERENCES,
	nextFontScale,
	prevFontScale,
	readA11yPreferences,
	writeA11yPreferences,
	type A11yPreferences,
	type FontScale,
} from '../lib/a11yPreferences';

interface A11yContextValue {
	prefs: A11yPreferences;
	setFontScale: (scale: FontScale) => void;
	increaseFontScale: () => void;
	decreaseFontScale: () => void;
	toggleHighContrast: () => void;
	toggleReduceMotion: () => void;
	toggleUnderlineLinks: () => void;
	toggleReadableSpacing: () => void;
	reset: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

function readInitialPreferences(): A11yPreferences {
	if (typeof window === 'undefined') return { ...DEFAULT_A11Y_PREFERENCES };
	const initial = readA11yPreferences();
	applyA11yToDocument(initial);
	return initial;
}

export function A11yProvider({ children }: { children: ReactNode }) {
	const [prefs, setPrefs] = useState<A11yPreferences>(readInitialPreferences);

	useEffect(() => {
		writeA11yPreferences(prefs);
		applyA11yToDocument(prefs);
	}, [prefs]);

	const value: A11yContextValue = {
		prefs,
		setFontScale: (fontScale) => setPrefs((current) => ({ ...current, fontScale })),
		increaseFontScale: () => setPrefs((current) => ({ ...current, fontScale: nextFontScale(current.fontScale) })),
		decreaseFontScale: () => setPrefs((current) => ({ ...current, fontScale: prevFontScale(current.fontScale) })),
		toggleHighContrast: () => setPrefs((current) => ({ ...current, highContrast: !current.highContrast })),
		toggleReduceMotion: () => setPrefs((current) => ({ ...current, reduceMotion: !current.reduceMotion })),
		toggleUnderlineLinks: () => setPrefs((current) => ({ ...current, underlineLinks: !current.underlineLinks })),
		toggleReadableSpacing: () => setPrefs((current) => ({ ...current, readableSpacing: !current.readableSpacing })),
		reset: () => setPrefs({ ...DEFAULT_A11Y_PREFERENCES }),
	};

	return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y(): A11yContextValue {
	const ctx = useContext(A11yContext);
	if (!ctx) {
		throw new Error('useA11y must be used within A11yProvider');
	}
	return ctx;
}
