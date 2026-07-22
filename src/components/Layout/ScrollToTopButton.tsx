import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { alpha } from '@mui/material/styles';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { tokens } from '../../theme/theme';

const SCROLL_THRESHOLD = 320;
const BUTTON_SIZE = 44;
const AVOID_GAP = 12;
const MD_BREAKPOINT = 900;

function readSafeAreaBottom() {
	const probe = document.createElement('div');
	probe.style.cssText = 'position:fixed;visibility:hidden;padding-bottom:env(safe-area-inset-bottom)';
	document.body.appendChild(probe);
	const value = Number.parseFloat(getComputedStyle(probe).paddingBottom) || 0;
	probe.remove();
	return value;
}

function restingBottomPx(viewportWidth: number, safeAreaBottom: number) {
	if (viewportWidth >= MD_BREAKPOINT) return 28;
	return Math.max(20, safeAreaBottom);
}

function computeBottom(viewportWidth: number, viewportHeight: number, safeAreaBottom: number): number {
	const resting = restingBottomPx(viewportWidth, safeAreaBottom);
	const avoid = document.querySelector<HTMLElement>('[data-scroll-top-avoid]');
	if (!avoid) return resting;

	const rect = avoid.getBoundingClientRect();
	const restingTop = viewportHeight - resting - BUTTON_SIZE;

	// Only lift while the pager intersects the button's resting slot
	if (rect.top >= viewportHeight - resting || rect.bottom <= restingTop - AVOID_GAP) {
		return resting;
	}

	return Math.max(resting, viewportHeight - rect.top + AVOID_GAP);
}

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);
	const [bottom, setBottom] = useState(20);
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		let safeAreaBottom = readSafeAreaBottom();

		const update = () => {
			const { scrollY, innerWidth, innerHeight } = window;
			setVisible(scrollY > SCROLL_THRESHOLD);
			setBottom(computeBottom(innerWidth, innerHeight, safeAreaBottom));
		};

		const onResize = () => {
			safeAreaBottom = readSafeAreaBottom();
			update();
		};

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', onResize);
		};
	}, []);

	if (!visible) return null;

	return (
		<IconButton
			onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
			aria-label='Back to top'
			sx={{
				position: 'fixed',
				bottom,
				right: { xs: 'max(16px, env(safe-area-inset-right))', md: 28 },
				zIndex: 20,
				width: BUTTON_SIZE,
				height: BUTTON_SIZE,
				color: tokens.textNav,
				border: `1px solid ${tokens.border}`,
				borderRadius: 1,
				bgcolor: alpha(tokens.surface, 0.94),
				backdropFilter: 'blur(8px)',
				boxShadow: tokens.shadowSubtle,
				transition: reducedMotion
					? 'color 180ms ease, border-color 180ms ease, background-color 180ms ease'
					: 'bottom 280ms cubic-bezier(0.34, 1.4, 0.64, 1), color 180ms ease, border-color 180ms ease, background-color 180ms ease',
				'&:hover': {
					color: tokens.accent,
					borderColor: tokens.borderHover,
					bgcolor: tokens.surfaceRaised,
				},
				'&:focus-visible': {
					outline: `2px solid ${tokens.accent}`,
					outlineOffset: 2,
				},
			}}>
			<KeyboardArrowUpIcon sx={{ fontSize: '1.125rem' }} />
		</IconButton>
	);
}
