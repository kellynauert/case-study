import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { CaseStudyMeta } from '../../lib/caseStudies';
import { imageSrc } from '../../lib/parseMarkdown';
import { FadeIn } from '../Layout/FadeIn';
import { tokens } from '../../theme/theme';

interface CaseStudyFeatureProps {
	study: CaseStudyMeta;
	index: number;
}

export function CaseStudyFeature({ study, index }: CaseStudyFeatureProps) {
	const label = `Showcase ${String(index + 1).padStart(2, '0')}`;
	const preview = study.hero ? imageSrc(study.hero) : null;

	return (
		<FadeIn delay={index * 40}>
			<Box
				component={Link}
				to={`/case-studies/${study.slug}`}
				aria-label={`${study.title}: ${study.subtitle}`}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
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
						'& .case-study-title': { color: tokens.accent },
						'& .case-study-cta': { color: tokens.accentPink, gap: '6px' },
					},
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 2,
					},
				}}>
				{preview && (
					<Box
						sx={{
							mb: 2.5,
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
								height: 'auto',
							}}
						/>
					</Box>
				)}

				<Typography
					variant='caption'
					sx={{
						display: 'block',
						mb: 1,
						color: tokens.accent,
						fontWeight: 600,
						letterSpacing: '0.06em',
						textTransform: 'uppercase',
					}}>
					{label}
				</Typography>

				<Typography
					className='case-study-title'
					variant='h2'
					component='h3'
					sx={{
						m: 0,
						mb: 1.5,
						fontSize: { xs: '1.25rem', md: '1.375rem' },
						lineHeight: 1.25,
						color: tokens.textPrimary,
						transition: 'color 200ms ease',
					}}>
					{study.title}
				</Typography>

				<Typography
					sx={{
						m: 0,
						mb: 2.5,
						flex: 1,
						fontSize: '1rem',
						lineHeight: 1.65,
						color: tokens.textSecondary,
					}}>
					{study.subtitle}
				</Typography>

				<Typography
					className='case-study-cta'
					sx={{
						display: 'inline-flex',
						alignItems: 'center',
						alignSelf: 'flex-start',
						gap: 0.5,
						fontSize: '0.875rem',
						fontWeight: 600,
						color: tokens.accent,
						transition: 'color 200ms ease, gap 200ms ease',
					}}>
					View Showcase →
				</Typography>
			</Box>
		</FadeIn>
	);
}
