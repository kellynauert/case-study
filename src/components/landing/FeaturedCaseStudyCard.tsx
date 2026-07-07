import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { CaseStudyMeta } from '../../lib/caseStudies';
import { imageSrc } from '../../lib/parseMarkdown';
import { tokens } from '../../theme/theme';

interface FeaturedCaseStudyCardProps {
	study: CaseStudyMeta;
}

export function FeaturedCaseStudyCard({ study }: FeaturedCaseStudyCardProps) {
	const preview = study.hero ? imageSrc(study.hero) : null;

	return (
		<Box
			component={Link}
			to={`/case-studies/${study.slug}`}
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
				gap: { xs: 2, sm: 3 },
				alignItems: 'start',
				p: { xs: 2.5, sm: 3 },
				border: `1px solid ${tokens.border}`,
				borderRadius: 2,
				textDecoration: 'none',
				color: 'inherit',
				bgcolor: tokens.surface,
				transition: 'border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
				'&:hover': {
					borderColor: tokens.borderHover,
					boxShadow: tokens.shadowElevated,
					transform: 'translateY(-2px)',
					'& h3': { color: tokens.accent },
				},
				'&:focus-visible': {
					outline: `2px solid ${tokens.accent}`,
					outlineOffset: 2,
				},
			}}>
			<Box sx={{ minWidth: 0 }}>
				<Typography
					component='h3'
					sx={{
						m: 0,
						mb: 0.75,
						fontSize: '1.0625rem',
						fontWeight: 600,
						letterSpacing: '-0.02em',
						lineHeight: 1.35,
						color: tokens.textPrimary,
						transition: 'color 200ms ease',
					}}>
					{study.title}
				</Typography>

				<Typography
					sx={{
						m: 0,
						mb: 1.25,
						fontSize: '0.9375rem',
						lineHeight: 1.55,
						color: tokens.textSecondary,
					}}>
					{study.subtitle}
				</Typography>

				<Typography
					sx={{
						m: 0,
						fontSize: '0.875rem',
						lineHeight: 1.6,
						color: tokens.textMuted,
					}}>
					{study.summary}
				</Typography>
			</Box>

			{preview && (
				<Box
					sx={{
						width: { xs: '100%', sm: 88 },
						height: { xs: 120, sm: 88 },
						flexShrink: 0,
						borderRadius: 1.5,
						overflow: 'hidden',
						border: `1px solid ${tokens.border}`,
						bgcolor: tokens.surfaceRaised,
					}}>
					<Box
						component='img'
						src={preview}
						alt=''
						sx={{
							display: 'block',
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'top left',
						}}
					/>
				</Box>
			)}
		</Box>
	);
}
