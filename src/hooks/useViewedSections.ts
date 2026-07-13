import { useEffect, useSyncExternalStore } from 'react';
import { getAllViewedSections, getViewedSections, markSectionViewed } from '../lib/viewedSections';

const listeners = new Set<() => void>();
const emptyMap: Record<string, string[]> = {};
const emptyList: string[] = [];

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
	return getAllViewedSections();
}

function getServerSnapshot() {
	return emptyMap;
}

/** All viewed section ids keyed by case-study slug. */
export function useViewedSectionsMap() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useViewedSections(slug: string | undefined) {
	const map = useViewedSectionsMap();
	if (!slug) return emptyList;
	return map[slug] ?? emptyList;
}

/** Mark the active section as read after a short dwell. */
export function useMarkSectionViewed(slug: string | undefined, activeSectionId: string, dwellMs = 900) {
	useEffect(() => {
		if (!slug || !activeSectionId) return;
		const timer = window.setTimeout(() => {
			if (markSectionViewed(slug, activeSectionId)) {
				emitChange();
			}
		}, dwellMs);
		return () => window.clearTimeout(timer);
	}, [slug, activeSectionId, dwellMs]);
}

export function markSectionViewedAndNotify(slug: string, sectionId: string) {
	if (markSectionViewed(slug, sectionId)) {
		emitChange();
	}
}

export function getViewedSectionsSnapshot(slug: string) {
	return getViewedSections(slug);
}
