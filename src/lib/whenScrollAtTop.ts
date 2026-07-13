export type ScrollTopWaitSignal = {
	cancelled: boolean;
	onCancel?: () => void;
};

/** Resolves once the window is at (or back at) the top after navigation. */
export function whenScrollAtTop(signal: ScrollTopWaitSignal): Promise<void> {
	return new Promise((resolve) => {
		const finish = () => {
			if (!signal.cancelled) resolve();
		};

		if (window.scrollY <= 1) {
			requestAnimationFrame(() => requestAnimationFrame(finish));
			return;
		}

		const onScroll = () => {
			if (window.scrollY > 1) return;
			window.removeEventListener('scroll', onScroll);
			requestAnimationFrame(finish);
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		signal.onCancel = () => window.removeEventListener('scroll', onScroll);
	});
}
