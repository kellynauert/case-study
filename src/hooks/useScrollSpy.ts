import { useEffect, useState } from 'react';
import { whenScrollAtTop, type ScrollTopWaitSignal } from '../lib/whenScrollAtTop';

/**
 * Returns every section id whose element currently intersects the viewport
 * (below the sticky offset). Multiple sections can be active at once.
 * Waits until scroll is at the top so a previous page's Y can't false-highlight.
 */
export function useScrollSpy(sectionIds: string[], offset = 120) {
	const [activeIds, setActiveIds] = useState<string[]>([]);

	useEffect(() => {
		setActiveIds([]);

		if (sectionIds.length === 0) return;

		const signal: ScrollTopWaitSignal = { cancelled: false };
		let observer: IntersectionObserver | null = null;
		const visible = new Set<string>();

		whenScrollAtTop(signal).then(() => {
			if (signal.cancelled) return;

			const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
			if (elements.length === 0) return;

			const sync = () => {
				setActiveIds(sectionIds.filter((id) => visible.has(id)));
			};

			observer = new IntersectionObserver(
				(entries) => {
					let changed = false;
					for (const entry of entries) {
						const id = entry.target.id;
						if (!id) continue;
						if (entry.isIntersecting) {
							if (!visible.has(id)) {
								visible.add(id);
								changed = true;
							}
						} else if (visible.delete(id)) {
							changed = true;
						}
					}
					if (changed) sync();
				},
				{
					rootMargin: `-${offset}px 0px 0px 0px`,
					threshold: 0,
				}
			);

			elements.forEach((el) => observer!.observe(el));
		});

		return () => {
			signal.cancelled = true;
			signal.onCancel?.();
			observer?.disconnect();
		};
	}, [sectionIds, offset]);

	return activeIds;
}
