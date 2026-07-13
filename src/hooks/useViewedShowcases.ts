import { useSyncExternalStore } from 'react';
import { getViewedShowcases, markShowcaseViewed } from '../lib/viewedShowcases';

const listeners = new Set<() => void>();
const empty: string[] = [];

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

function emitChange() {
	listeners.forEach((listener) => listener());
}

function getSnapshot() {
	return getViewedShowcases();
}

function getServerSnapshot() {
	return empty;
}

export function useViewedShowcases() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Persist study-level completion and notify subscribers (nav / landing cards). */
export function markShowcaseViewedAndNotify(slug: string) {
	if (markShowcaseViewed(slug)) {
		emitChange();
	}
}
