import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { getAllCaseStudies } from '../lib/caseStudies';
import { hero, links } from '../lib/site';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { FadeIn } from '../components/Layout/FadeIn';
import { CaseStudyFeature } from '../components/landing/CaseStudyFeature';
import { tokens } from '../theme/theme';

function SectionShell({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) {
	return (
		<Box
			sx={{
				maxWidth: narrow ? tokens.layout.contentMaxWidth : tokens.layout.pageMaxWidth,
				mx: 'auto',
				px: { xs: 2, sm: 3 },
			}}>
			{children}
		</Box>
	);
}

const secondaryButtonSx = {
	display: 'inline-flex',
	alignItems: 'center',
	px: 2,
	py: 1,
	fontSize: '0.875rem',
	fontWeight: 500,
	color: tokens.textPrimary,
	border: `1px solid ${tokens.border}`,
	borderRadius: 1.5,
	textDecoration: 'none',
	transition: 'border-color 200ms ease, background-color 200ms ease',
	'&:hover': {
		borderColor: tokens.borderHover,
		bgcolor: alpha(tokens.accent, 0.04),
	},
	'&:focus-visible': {
		outline: `2px solid ${tokens.accent}`,
		outlineOffset: 2,
	},
} as const;

export function LandingPage() {
	const caseStudies = getAllCaseStudies();

	return (
		<SiteLayout>
			<SectionShell>
				<FadeIn>
					<Box
						component='section'
						aria-label='Introduction'
						sx={{
							pt: { xs: 6, md: 10 },
							pb: { xs: 6, md: 8 },
							maxWidth: '40rem',
						}}>
						<Typography variant='h1' component='h1' sx={{ mb: 2.5, color: tokens.textPrimary }}>
							{hero.headline}
						</Typography>

						<Typography
							sx={{
								m: 0,
								mb: 4,
								fontSize: { xs: '1.125rem', md: '1.1875rem' },
								lineHeight: 1.65,
								color: tokens.textSecondary,
							}}>
							{hero.subheading}
						</Typography>

						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
							<Box component='a' href={links.resume} sx={secondaryButtonSx}>
								{hero.secondaryCta}
							</Box>
						</Box>
					</Box>
				</FadeIn>
			</SectionShell>

			<SectionShell>
				<Box
					component='section'
					id='case-studies'
					aria-label='Case studies'
					sx={{
						pb: { xs: 4, md: 6 },
						scrollMarginTop: '5rem',
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
						gap: { xs: 5, md: 6, lg: 7 },
						alignItems: 'start',
					}}>
					{caseStudies.map((study, index) => (
						<CaseStudyFeature key={study.slug} study={study} index={index} />
					))}
				</Box>
			</SectionShell>
		</SiteLayout>
	);
}
