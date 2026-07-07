import Box from '@mui/material/Box';
import { useIntersectionFade } from '../../hooks/useIntersectionFade';

interface SectionProps {
	children: React.ReactNode;
}

export function Section({ children }: SectionProps) {
	const { ref, visible, reducedMotion } = useIntersectionFade();

	return (
		<Box
			ref={ref}
			sx={{
				py: { xs: 2, md: 3 },
				opacity: visible ? 1 : 0,
				transform: visible || reducedMotion ? 'none' : 'translateY(16px)',
				transition: reducedMotion ? 'none' : 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
			}}>
			{children}
		</Box>
	);
}
