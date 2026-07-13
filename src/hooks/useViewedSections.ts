import { useEffect, useSyncExternalStore, type RefObject } from 'react';
import { whenScrollAtTop, type ScrollTopWaitSignal } from '../lib/whenScrollAtTop';
import { getAllViewedSections, getViewedSections, markSectionViewed, SECTION_COMPLETE_ATTR } from '../lib/viewedSections';
import { markShowcaseViewedAndNotify } from './useViewedShowcases';

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

export function markSectionViewedAndNotify(slug: string, sectionId: string) {
	if (markSectionViewed(slug, sectionId)) {
		emitChange();
	}
}

function sectionIdsFromRoot(root: HTMLElement): string[] {
	const ids: string[] = [];
	root.querySelectorAll(`[${SECTION_COMPLETE_ATTR}]`).forEach((el) => {
		const id = el.getAttribute(SECTION_COMPLETE_ATTR);
		if (id) ids.push(id);
	});
	return ids;
}

/** Study title is complete only once every section sentinel has been seen. */
function tryMarkStudyComplete(slug: string, root: HTMLElement) {
	const sectionIds = sectionIdsFromRoot(root);
	if (sectionIds.length === 0) return;
	const viewed = new Set(getViewedSections(slug));
	if (sectionIds.every((id) => viewed.has(id))) {
		markShowcaseViewedAndNotify(slug);
	}
}

/**
 * Marks a top-level section read when its end sentinel enters the viewport.
 * When every section on the page is read, marks the study itself complete.
 * Waits until scroll is at the top so a previous page's Y can't false-trigger.
 */
export function useSectionReadTracker(slug: string | undefined, rootRef: RefObject<HTMLElement | null>, watchKey?: unknown) {
	useEffect(() => {
		const root = rootRef.current;
		if (!slug || !root) return;

		const signal: ScrollTopWaitSignal = { cancelled: false };
		let observer: IntersectionObserver | null = null;
		let mutationObserver: MutationObserver | null = null;
		const observed = new WeakSet<Element>();

		whenScrollAtTop(signal).then(() => {
			if (signal.cancelled) return;

			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (!entry.isIntersecting) continue;
						const sectionId = entry.target.getAttribute(SECTION_COMPLETE_ATTR);
						if (!sectionId) continue;
						markSectionViewedAndNotify(slug, sectionId);
						tryMarkStudyComplete(slug, root);
					}
				},
				{
					// Section end must reach the upper ~88% of the viewport so short
					// above-the-fold sections are not auto-completed on load.
					root: null,
					rootMargin: '0px 0px -12% 0px',
					threshold: 0,
				}
			);

			const observeNew = () => {
				root.querySelectorAll(`[${SECTION_COMPLETE_ATTR}]`).forEach((el) => {
					if (observed.has(el)) return;
					observed.add(el);
					observer!.observe(el);
				});
				tryMarkStudyComplete(slug, root);
			};

			observeNew();

			mutationObserver = new MutationObserver(observeNew);
			mutationObserver.observe(root, { childList: true, subtree: true });
		});

		return () => {
			signal.cancelled = true;
			signal.onCancel?.();
			observer?.disconnect();
			mutationObserver?.disconnect();
		};
	}, [slug, rootRef, watchKey]);
}

export function getViewedSectionsSnapshot(slug: string) {
	return getViewedSections(slug);
}
