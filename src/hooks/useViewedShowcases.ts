import { useEffect } from 'react';
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

export function useMarkShowcaseViewed(slug: string | undefined) {
	useEffect(() => {
		if (!slug) return;
		markShowcaseViewed(slug);
		emitChange();
	}, [slug]);
}
