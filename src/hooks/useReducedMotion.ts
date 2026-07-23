import { useEffect, useState } from 'react';

function readReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return (
		window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
		document.documentElement.dataset.a11yMotion === 'reduce'
	);
}

export function useReducedMotion(): boolean {
	const [reduced, setReduced] = useState(readReducedMotion);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => setReduced(readReducedMotion());

		mq.addEventListener('change', update);
		const observer = new MutationObserver(update);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-a11y-motion'],
		});
		update();

		return () => {
			mq.removeEventListener('change', update);
			observer.disconnect();
		};
	}, []);

	return reduced;
}
