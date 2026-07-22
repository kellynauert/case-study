import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { alpha } from '@mui/material/styles';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { tokens } from '../../theme/theme';

const SCROLL_THRESHOLD = 320;

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	if (!visible) return null;

	return (
		<IconButton
			onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
			aria-label='Back to top'
			sx={{
				position: 'fixed',
				// Sit above the case-study pager on mobile so Next stays tappable
				bottom: {
					xs: 'max(6.75rem, calc(5.5rem + env(safe-area-inset-bottom)))',
					md: 28,
				},
				right: { xs: 'max(16px, env(safe-area-inset-right))', md: 28 },
				zIndex: 20,
				width: 44,
				height: 44,
				color: tokens.textNav,
				border: `1px solid ${tokens.border}`,
				borderRadius: 1,
				bgcolor: alpha(tokens.surface, 0.94),
				backdropFilter: 'blur(8px)',
				boxShadow: tokens.shadowSubtle,
				transition: 'color 180ms ease, border-color 180ms ease, background-color 180ms ease, opacity 180ms ease',
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
