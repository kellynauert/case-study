import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { CaseStudyMeta } from '../../lib/caseStudies';
import { tokens } from '../../theme/theme';

interface FeatureShowcaseNavProps {
	studies: CaseStudyMeta[];
}

function scrollToFeature(slug: string) {
	const el = document.getElementById(`feature-${slug}`);
	if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function FeatureShowcaseNav({ studies }: FeatureShowcaseNavProps) {
	return (
		<Box
			component='nav'
			aria-label='Showcase'
			sx={{
				display: { xs: 'none', md: 'block' },
				position: 'sticky',
				top: '1.5rem',
				alignSelf: 'start',
				width: tokens.layout.navWidth,
				flexShrink: 0,
				maxHeight: 'calc(100vh - 3rem)',
				overflowY: 'auto',
				pr: 1.5,
				borderRight: `1px solid ${tokens.border}`,
			}}>
			<Typography
				sx={{
					display: 'block',
					px: 1,
					mb: 1.5,
					fontSize: '0.75rem',
					fontWeight: 600,
					letterSpacing: '0.06em',
					textTransform: 'uppercase',
					color: tokens.accent,
				}}>
				Showcases
			</Typography>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
				{studies.map((study, index) => {
					const number = String(index + 1).padStart(2, '0');

					return (
						<Box
							key={study.slug}
							component='a'
							href={`#feature-${study.slug}`}
							onClick={(e) => {
								e.preventDefault();
								scrollToFeature(study.slug);
							}}
							sx={{
								display: 'grid',
								gridTemplateColumns: '2rem 1fr',
								gap: 0.75,
								alignItems: 'start',
								py: 0.75,
								pl: 1,
								pr: 1,
								textDecoration: 'none',
								borderLeft: '2px solid transparent',
								transition: 'color 200ms ease, border-color 200ms ease',
								'&:hover': {
									borderLeftColor: tokens.accent,
									'& .feature-nav-title': { color: tokens.accent },
									'& .feature-nav-num': { color: tokens.accent },
								},
								'&:focus-visible': {
									outline: `2px solid ${tokens.accent}`,
									outlineOffset: 2,
								},
							}}>
							<Typography
								className='feature-nav-num'
								sx={{
									m: 0,
									pt: '0.1em',
									fontSize: '0.75rem',
									fontWeight: 600,
									lineHeight: 1.4,
									color: tokens.textMuted,
									transition: 'color 200ms ease',
								}}>
								{number}
							</Typography>
							<Typography
								className='feature-nav-title'
								sx={{
									m: 0,
									fontSize: '0.8125rem',
									fontWeight: 400,
									lineHeight: 1.4,
									color: tokens.textMuted,
									transition: 'color 200ms ease',
								}}>
								{study.title}
							</Typography>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
