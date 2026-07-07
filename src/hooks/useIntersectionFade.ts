import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useIntersectionFade(threshold = 0.08) {
	const ref = useRef<HTMLElement>(null);
	const reducedMotion = useReducedMotion();
	const [visible, setVisible] = useState(reducedMotion);

	useEffect(() => {
		if (reducedMotion) {
			setVisible(true);
			return;
		}

		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [reducedMotion, threshold]);

	return { ref, visible, reducedMotion };
}
