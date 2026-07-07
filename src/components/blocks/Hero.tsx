import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useIntersectionFade } from '../../hooks/useIntersectionFade';
import { imageSrc } from '../../lib/parseMarkdown';
import { tokens } from '../../theme/theme';

interface HeroProps {
	title: string;
	subtitle: string;
	years?: string;
	heroImage?: string;
	children?: React.ReactNode;
}

export function Hero({ title, subtitle, heroImage, children }: HeroProps) {
	const { ref, visible, reducedMotion } = useIntersectionFade(0.05);

	return (
		<Box
			ref={ref}
			component='header'
			id='hero'
			sx={{
				pt: { xs: 1, md: 2 },
				pb: { xs: 3, md: 4 },
				mb: 2,
				borderBottom: `1px solid ${tokens.border}`,
				opacity: visible ? 1 : 0,
				transform: visible || reducedMotion ? 'none' : 'translateY(12px)',
				transition: reducedMotion ? 'none' : 'opacity 600ms ease, transform 600ms ease',
			}}>
			<Typography
				variant='h1'
				component='h1'
				sx={{ mb: 1.5, maxWidth: '22ch', fontSize: { xs: '2rem', md: '2.5rem' }, color: tokens.textPrimary }}>
				{title}
			</Typography>

			{subtitle && (
				<Typography
					sx={{
						maxWidth: tokens.layout.readableWidth,
						mb: heroImage ? 3 : 2,
						fontSize: { xs: '1.0625rem', md: '1.125rem' },
						lineHeight: 1.65,
						color: tokens.textSecondary,
					}}>
					{subtitle}
				</Typography>
			)}

			{heroImage && (
				<Box
					sx={{
						mb: 3,
						borderRadius: 2,
						overflow: 'hidden',
						border: `1px solid ${tokens.border}`,
						boxShadow: tokens.shadowImage,
						maxWidth: tokens.layout.wideWidth,
					}}>
					<Box component='img' src={imageSrc(heroImage)} alt='' sx={{ display: 'block', width: '100%', height: 'auto' }} />
				</Box>
			)}

			{children}
		</Box>
	);
}
