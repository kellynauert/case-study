import Box from '@mui/material/Box';
import { useIntersectionFade } from '../../hooks/useIntersectionFade';

interface FadeInProps {
	children: React.ReactNode;
	delay?: number;
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
	const { ref, visible, reducedMotion } = useIntersectionFade(0.1);

	return (
		<Box
			ref={ref}
			sx={{
				opacity: visible ? 1 : 0,
				transform: visible || reducedMotion ? 'none' : 'translateY(12px)',
				transition:
					reducedMotion ? 'none' : (
						`opacity 600ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 600ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
					),
			}}>
			{children}
		</Box>
	);
}
