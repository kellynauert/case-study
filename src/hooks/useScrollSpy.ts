import { useEffect, useState } from 'react';
import { whenScrollAtTop, type ScrollTopWaitSignal } from '../lib/whenScrollAtTop';

function idsEqual(a: string[], b: string[]) {
	return a.length === b.length && a.every((id, i) => id === b[i]);
}

/**
 * Last outline heading whose top has scrolled past the sticky offset.
 * Keeps a highlight while reading a long section whose title has left the viewport.
 */
function lastPassedId(sectionIds: string[], offset: number): string | null {
	let passed: string | null = null;
	for (const id of sectionIds) {
		const el = document.getElementById(id);
		if (!el) continue;
		if (el.getBoundingClientRect().top <= offset) passed = id;
	}
	return passed;
}

/**
 * Returns active section ids for the page TOC.
 * Prefer headings currently intersecting below the sticky offset; if none,
 * keep the last heading that has scrolled past so the nav highlight never clears.
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
				const intersecting = sectionIds.filter((id) => visible.has(id));
				let next = intersecting;
				if (next.length === 0) {
					const fallback = lastPassedId(sectionIds, offset) ?? sectionIds[0] ?? null;
					next = fallback ? [fallback] : [];
				}
				setActiveIds((prev) => (idsEqual(prev, next) ? prev : next));
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
			sync();

			window.addEventListener('scroll', sync, { passive: true });
			window.addEventListener('resize', sync);
			signal.onCancel = () => {
				window.removeEventListener('scroll', sync);
				window.removeEventListener('resize', sync);
			};
		});

		return () => {
			signal.cancelled = true;
			signal.onCancel?.();
			observer?.disconnect();
		};
	}, [sectionIds, offset]);

	return activeIds;
}
